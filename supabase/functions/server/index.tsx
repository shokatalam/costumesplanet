import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";
import { scrapeWpImages, getImageMap, resolveWpUrlToSigned, resolveSlugToSigned, invalidateImageMapCache } from "./image_scraper.tsx";
import { scrapeProductItems, getItemMap } from "./link_scraper.tsx";
import { scrapeRedditQuestions, getRedditMap } from "./reddit_scraper.tsx";
import { searchProducts, batchSearchProducts } from "./product_search.tsx";
import {
  generateSitemapIndex,
  generatePagesSitemap,
  generatePostsSitemap,
  generateCategoriesSitemap,
  generateRobotsTxt,
  generateLlmsTxt,
} from "./sitemap.tsx";

const app = new Hono();

// ── Allowed origins for CORS ──
// Public read endpoints (image-map, item-map, reddit-map) serve non-sensitive data.
// Admin/scrape endpoints are protected by requireAdmin() auth check.
// CORS is permissive so the site works from any preview or custom domain.

// Enable logger
app.use("*", logger(console.log));

// ── Security headers middleware ──
app.use("/*", async (c, next) => {
  await next();
  // Prevent clickjacking
  c.header("X-Frame-Options", "DENY");
  // Prevent MIME-type sniffing
  c.header("X-Content-Type-Options", "nosniff");
  // XSS protection
  c.header("X-XSS-Protection", "1; mode=block");
  // Referrer policy
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
  // HSTS — force HTTPS for 1 year
  c.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  // Permissions policy — disable sensitive APIs
  c.header("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
});

// Enable CORS — open for all origins; admin endpoints are auth-gated separately
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Admin-Key"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ── Admin authentication middleware ──
// Verifies the request carries the service role key (admin) or a valid user session.
// Used to protect destructive/sensitive endpoints.
async function requireAdmin(c: any): Promise<Response | null> {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return c.json({ error: "Unauthorized: missing Authorization header" }, 401);
  }

  // Check if it's the service role key (admin)
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (token === serviceKey) {
    return null; // authorized
  }

  // Check if it's the dedicated scrape admin key (via Authorization header or X-Admin-Key)
  const scrapeKey = Deno.env.get("SCRAPE_ADMIN_KEY") || "";
  const xAdminKey = (c.req.header("X-Admin-Key") || "").trim();
  if (scrapeKey && (token === scrapeKey || xAdminKey === scrapeKey)) {
    return null; // authorized
  }

  // Check if it's the anon key — for admin routes this is NOT enough
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

  // Try to verify as a user session
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      anonKey,
    );
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user?.id) {
      console.log("[auth] Admin auth rejected — not service key, not scrape key, not valid user session");
      return c.json({ error: "Unauthorized: invalid credentials for admin access" }, 401);
    }
    return null;
  } catch (err: any) {
    console.log("[auth] Admin auth check failed:", err?.message);
    return c.json({ error: "Unauthorized: authentication failed" }, 401);
  }
}

// ── Rate limiting (simple in-memory) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30; // max requests per window for public endpoints

function checkRateLimit(c: any): Response | null {
  const ip = c.req.header("x-forwarded-for") || c.req.header("cf-connecting-ip") || "unknown";
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return null;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    c.header("Retry-After", "60");
    return c.json({ error: "Rate limit exceeded. Try again in 60 seconds." }, 429);
  }

  return null;
}

// Clean up rate limit map periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
}, 60_000);

// ── Bot protection: challenge-response system ──
// Issues a time-limited challenge that requires a small proof-of-work (SHA-256 prefix match)
import { crypto } from "jsr:@std/crypto";

const CHALLENGE_SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.slice(0, 32) || "default-challenge-secret-key-cp";
const CHALLENGE_EXPIRY = 300_000; // 5 minutes

function generateChallenge(): { challenge: string; ts: number } {
  const ts = Date.now();
  const data = `${CHALLENGE_SECRET}:${ts}:${Math.random().toString(36).slice(2)}`;
  // Simple challenge: find a nonce where SHA-256(challenge + nonce) starts with "00"
  return { challenge: data, ts };
}

async function verifyChallenge(challenge: string, nonce: string, ts: number): Promise<boolean> {
  // Check expiry
  if (Date.now() - ts > CHALLENGE_EXPIRY) return false;
  // Verify the challenge string contains our secret prefix
  if (!challenge.startsWith(CHALLENGE_SECRET.slice(0, 8))) return false;
  // Verify proof of work: SHA-256(challenge + nonce) must start with "000"
  const encoder = new TextEncoder();
  const data = encoder.encode(challenge + nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = new Uint8Array(hashBuffer);
  // First byte must be 0 and second byte < 16 (i.e., first 2.5 hex chars are 0)
  // This takes ~500-2000 iterations on average — trivial for humans but costly at scale for bots
  return hashArray[0] === 0 && (hashArray[1] & 0xF0) === 0;
}

// Tighter rate limit for product search specifically
const productRateLimitMap = new Map<string, { count: number; resetAt: number }>();
const PRODUCT_RATE_LIMIT_WINDOW = 300_000; // 5 minutes
const PRODUCT_RATE_LIMIT_MAX = 8; // max product searches per 5 min

function checkProductRateLimit(c: any): Response | null {
  const ip = c.req.header("x-forwarded-for") || c.req.header("cf-connecting-ip") || "unknown";
  const now = Date.now();
  const entry = productRateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    productRateLimitMap.set(ip, { count: 1, resetAt: now + PRODUCT_RATE_LIMIT_WINDOW });
    return null;
  }

  entry.count++;
  if (entry.count > PRODUCT_RATE_LIMIT_MAX) {
    c.header("Retry-After", "300");
    return c.json({ error: "Too many costume builds. Please wait a few minutes.", code: "RATE_LIMITED" }, 429);
  }

  return null;
}

// Clean up product rate limit map
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of productRateLimitMap) {
    if (now > val.resetAt) productRateLimitMap.delete(key);
  }
}, 60_000);

// ── Health check endpoint ──
app.get("/make-server-0d51dc15/health", (c) => {
  return c.json({ status: "ok" });
});

// ═══════════════════════════════════════
// PUBLIC ENDPOINTS (rate-limited)
// ═══════════════════════════════════════

app.get("/make-server-0d51dc15/image-map", async (c) => {
  const rl = checkRateLimit(c);
  if (rl) return rl;
  try {
    const map = await getImageMap();
    // Cache for 5 minutes  image map changes rarely (only after scraping)
    c.header("Cache-Control", "public, max-age=300, s-maxage=600");
    return c.json({ images: map });
  } catch (err: any) {
    console.log("Error in /image-map:", err?.message || err);
    return c.json({ error: `Failed to load image map: ${err?.message || err}` }, 500);
  }
});

// ── Diagnostic: list all image KV entries (admin only) ──
app.get("/make-server-0d51dc15/image-diagnostics", async (c) => {
  const authErr = await requireAdmin(c);
  if (authErr) return authErr;

  try {
    const rows = await kv.getByPrefix("costume_img:");
    const entries: Record<string, { storagePath: string | null; originalWpUrl: string; hasStorage: boolean; scrapedAt: string }> = {};
    const slugsWithStorage: string[] = [];
    const slugsWithoutStorage: string[] = [];
    const slugsTotal: string[] = [];

    for (const row of rows) {
      if (!row || typeof row !== "object" || !row.slug) continue;
      slugsTotal.push(row.slug);
      const hasStorage = !!row.storagePath;
      if (hasStorage) {
        slugsWithStorage.push(row.slug);
      } else {
        slugsWithoutStorage.push(row.slug);
      }
      entries[row.slug] = {
        storagePath: row.storagePath || null,
        originalWpUrl: row.originalWpUrl || row.imageUrl || "",
        hasStorage,
        scrapedAt: row.scrapedAt || "",
      };
    }

    return c.json({
      totalEntries: slugsTotal.length,
      withStorage: slugsWithStorage.length,
      withoutStorage: slugsWithoutStorage.length,
      slugsWithStorage: slugsWithStorage.sort(),
      slugsWithoutStorage: slugsWithoutStorage.sort(),
      allSlugs: slugsTotal.sort(),
      entries,
    });
  } catch (err: any) {
    console.log("Error in /image-diagnostics:", err?.message || err);
    return c.json({ error: `Diagnostics failed: ${err?.message || err}` }, 500);
  }
});

app.get("/make-server-0d51dc15/item-map", async (c) => {
  const rl = checkRateLimit(c);
  if (rl) return rl;
  try {
    const map = await getItemMap();
    return c.json({ items: map });
  } catch (err: any) {
    console.log("Error in /item-map:", err?.message || err);
    return c.json({ error: `Failed to load item map: ${err?.message || err}` }, 500);
  }
});

app.get("/make-server-0d51dc15/reddit-map", async (c) => {
  const rl = checkRateLimit(c);
  if (rl) return rl;
  try {
    const map = await getRedditMap();
    return c.json({ questions: map });
  } catch (err: any) {
    console.log("Error in /reddit-map:", err?.message || err);
    return c.json({ error: `Failed to load Reddit map: ${err?.message || err}` }, 500);
  }
});

// ── Image redirect (public, rate-limited) ──
app.get("/make-server-0d51dc15/wp-redirect", async (c) => {
  const rl = checkRateLimit(c);
  if (rl) return rl;
  const wpUrl = c.req.query("url");
  if (!wpUrl) {
    return c.json({ error: "Missing 'url' query parameter" }, 400);
  }
  // Validate URL domain — only allow costumesplanet.com WP URLs
  try {
    const parsed = new URL(wpUrl);
    if (!parsed.hostname.endsWith("costumesplanet.com") && !parsed.hostname.endsWith("rankupai.com")) {
      return c.json({ error: "Invalid URL domain — only costumesplanet.com or demo1.rankupai.com URLs accepted" }, 400);
    }
  } catch {
    return c.json({ error: "Invalid URL format" }, 400);
  }
  try {
    const signedUrl = await resolveWpUrlToSigned(wpUrl);
    if (signedUrl) {
      return c.redirect(signedUrl, 301);
    }
    return c.json({ error: "No stored image found for this WordPress URL" }, 404);
  } catch (err: any) {
    console.log("Error in /wp-redirect:", err?.message || err);
    return c.json({ error: `Redirect resolution failed: ${err?.message || err}` }, 500);
  }
});

app.get("/make-server-0d51dc15/image/:slug", async (c) => {
  const rl = checkRateLimit(c);
  if (rl) return rl;
  const slug = c.req.param("slug");
  if (!slug) {
    return c.json({ error: "Missing slug parameter" }, 400);
  }
  // Validate slug format — alphanumeric + hyphens only
  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return c.json({ error: "Invalid slug format" }, 400);
  }
  try {
    const signedUrl = await resolveSlugToSigned(slug);
    if (signedUrl) {
      // Cache aggressively — images don't change; 24 hours browser, 7 days CDN
      c.header("Cache-Control", "public, max-age=86400, s-maxage=604800, immutable");
      return c.redirect(signedUrl, 302);
    }
    return c.json({ error: `No stored image found for slug: ${slug}` }, 404);
  } catch (err: any) {
    console.log("Error in /image/:slug:", err?.message || err);
    return c.json({ error: `Image resolution failed: ${err?.message || err}` }, 500);
  }
});

// ── Product search endpoint (public, rate-limited) ──
// ── Bot challenge endpoint — issues a proof-of-work challenge ──
app.get("/make-server-0d51dc15/challenge", (c) => {
  const rl = checkRateLimit(c);
  if (rl) return rl;
  const { challenge, ts } = generateChallenge();
  // No cache — each challenge must be unique
  c.header("Cache-Control", "no-store");
  return c.json({ challenge, ts, difficulty: "000" });
});

app.post("/make-server-0d51dc15/product-search", async (c) => {
  const rl = checkProductRateLimit(c);
  if (rl) return rl;
  try {
    const body = await c.req.json();

    // ── Bot protection: verify challenge token ──
    const { challenge, nonce, challengeTs } = body;
    if (!challenge || !nonce || !challengeTs) {
      return c.json({ error: "Human verification required. Please complete the verification challenge.", code: "CHALLENGE_REQUIRED" }, 403);
    }
    const valid = await verifyChallenge(challenge, nonce, challengeTs);
    if (!valid) {
      return c.json({ error: "Verification failed or expired. Please try again.", code: "CHALLENGE_FAILED" }, 403);
    }

    const queries: string[] = body.queries || [];
    if (!queries.length || queries.length > 12) {
      return c.json({ error: "Provide 1-12 search queries" }, 400);
    }
    const results = await batchSearchProducts(queries);
    c.header("Cache-Control", "public, max-age=1800");
    return c.json({ products: results });
  } catch (err: any) {
    console.log("Error in /product-search:", err?.message || err);
    return c.json({ error: `Product search failed: ${err?.message || err}` }, 500);
  }
});

app.get("/make-server-0d51dc15/product-search", async (c) => {
  const rl = checkProductRateLimit(c);
  if (rl) return rl;
  try {
    const query = c.req.query("q") || "";
    if (!query || query.length < 2) {
      return c.json({ error: "Provide a 'q' search query" }, 400);
    }
    const results = await searchProducts(query);
    c.header("Cache-Control", "public, max-age=1800");
    return c.json({ products: results });
  } catch (err: any) {
    console.log("Error in /product-search GET:", err?.message || err);
    return c.json({ error: `Product search failed: ${err?.message || err}` }, 500);
  }
});

// ════════════════════════════════════���══
// ADMIN-ONLY ENDPOINTS (auth required)
// ═══════════════════════════════════════

app.post("/make-server-0d51dc15/scrape-images", async (c) => {
  const authErr = await requireAdmin(c);
  if (authErr) return authErr;
  try {
    const page = Number(c.req.query("page") || "1");
    const result = await scrapeWpImages(page);
    // Invalidate server-side image map cache so next fetch gets fresh data
    invalidateImageMapCache();
    return c.json(result);
  } catch (err: any) {
    console.log("Error in /scrape-images:", err?.message || err);
    return c.json({ error: `Scrape failed: ${err?.message || err}` }, 500);
  }
});

app.post("/make-server-0d51dc15/scrape-items", async (c) => {
  const authErr = await requireAdmin(c);
  if (authErr) return authErr;
  try {
    const page = Number(c.req.query("page") || "1");
    const result = await scrapeProductItems(page);
    return c.json(result);
  } catch (err: any) {
    console.log("Error in /scrape-items:", err?.message || err);
    return c.json({ error: `Item scrape failed: ${err?.message || err}` }, 500);
  }
});

app.post("/make-server-0d51dc15/scrape-reddit", async (c) => {
  const authErr = await requireAdmin(c);
  if (authErr) return authErr;
  try {
    const page = Number(c.req.query("page") || "1");
    const result = await scrapeRedditQuestions(page);
    return c.json(result);
  } catch (err: any) {
    console.log("Error in /scrape-reddit:", err?.message || err);
    return c.json({ error: `Reddit scrape failed: ${err?.message || err}` }, 500);
  }
});

// wp-redirect-map — ADMIN ONLY (exposes internal storage paths)
app.get("/make-server-0d51dc15/wp-redirect-map", async (c) => {
  const authErr = await requireAdmin(c);
  if (authErr) return authErr;
  try {
    const { getWpRedirectMap } = await import("./image_scraper.tsx");
    const map = await getWpRedirectMap();
    return c.json({
      count: Object.keys(map).length,
      redirects: map,
    });
  } catch (err: any) {
    console.log("Error in /wp-redirect-map:", err?.message || err);
    return c.json({ error: `Failed to load redirect map: ${err?.message || err}` }, 500);
  }
});

// ═══════════════════════════════════════
// SITEMAP & SEO ENDPOINTS (public, cached)
// ═══════════════════════════════════════

// Helper to set standard sitemap headers
function setSitemapHeaders(c: any) {
  c.header("Content-Type", "application/xml; charset=utf-8");
  c.header("Cache-Control", "public, max-age=3600, s-maxage=3600");
  c.header("X-Robots-Tag", "noindex");
  c.header("Access-Control-Allow-Origin", "*");
}

app.get("/make-server-0d51dc15/sitemap.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generateSitemapIndex());
});

// Canonical sub-sitemaps (with -1, WordPress-style)
app.get("/make-server-0d51dc15/sitemap-posts-1.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generatePostsSitemap());
});

app.get("/make-server-0d51dc15/sitemap-pages-1.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generatePagesSitemap());
});

app.get("/make-server-0d51dc15/sitemap-categories-1.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generateCategoriesSitemap());
});

// Backward-compat aliases (without -1) — match old public/sitemap.xml links
app.get("/make-server-0d51dc15/sitemap-posts.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generatePostsSitemap());
});

app.get("/make-server-0d51dc15/sitemap-pages.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generatePagesSitemap());
});

app.get("/make-server-0d51dc15/sitemap-categories.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generateCategoriesSitemap());
});

app.get("/make-server-0d51dc15/robots.txt", (c) => {
  c.header("Content-Type", "text/plain; charset=utf-8");
  c.header("Cache-Control", "public, max-age=86400, s-maxage=86400");
  c.header("Access-Control-Allow-Origin", "*");
  return c.body(generateRobotsTxt());
});

app.get("/make-server-0d51dc15/llms.txt", (c) => {
  c.header("Content-Type", "text/plain; charset=utf-8");
  c.header("Cache-Control", "public, max-age=86400, s-maxage=86400");
  c.header("Access-Control-Allow-Origin", "*");
  return c.body(generateLlmsTxt());
});

app.get("/make-server-0d51dc15/sitemap-data", (c) => {
  const rl = checkRateLimit(c);
  if (rl) return rl;
  return c.json({
    sitemapIndex: generateSitemapIndex(),
    pages: generatePagesSitemap(),
    posts: generatePostsSitemap(),
    categories: generateCategoriesSitemap(),
    robots: generateRobotsTxt(),
    llms: generateLlmsTxt(),
  });
});

// ── Catch-all: 404 for unknown routes ──
app.all("/make-server-0d51dc15/*", (c) => {
  return c.json({ error: "Not found" }, 404);
});

// =============================================================================
// ROOT-LEVEL SEO ROUTES (no prefix)
// These handle requests coming via the Cloudflare Worker proxy or any
// reverse-proxy that strips the /make-server-0d51dc15/ prefix, serving
// real application/xml directly at the path Google expects.
// =============================================================================

app.get("/sitemap.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generateSitemapIndex());
});

app.get("/sitemap-posts-1.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generatePostsSitemap());
});

app.get("/sitemap-pages-1.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generatePagesSitemap());
});

app.get("/sitemap-categories-1.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generateCategoriesSitemap());
});

app.get("/sitemap-posts.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generatePostsSitemap());
});

app.get("/sitemap-pages.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generatePagesSitemap());
});

app.get("/sitemap-categories.xml", (c) => {
  setSitemapHeaders(c);
  return c.body(generateCategoriesSitemap());
});

app.get("/robots.txt", (c) => {
  c.header("Content-Type", "text/plain; charset=utf-8");
  c.header("Cache-Control", "public, max-age=86400, s-maxage=86400");
  c.header("Access-Control-Allow-Origin", "*");
  return c.body(generateRobotsTxt());
});

app.get("/llms.txt", (c) => {
  c.header("Content-Type", "text/plain; charset=utf-8");
  c.header("Cache-Control", "public, max-age=86400, s-maxage=86400");
  c.header("Access-Control-Allow-Origin", "*");
  return c.body(generateLlmsTxt());
});

Deno.serve(app.fetch);