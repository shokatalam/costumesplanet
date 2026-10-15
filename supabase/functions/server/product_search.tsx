// =============================================================================
// Product Image Search — fetches real product images from Amazon search results
//
// For each costume item, searches Amazon and extracts:
//   - Product image URL
//   - Product title
//   - Price (if available)
//   - ASIN
//   - Direct product link with affiliate tag
//
// Results are cached in KV for 48 hours to minimize requests.
// =============================================================================

import * as kv from "./kv_store.tsx";

const AFFILIATE_TAG = "cplanet0c-20";
// v4: restore direct /dp/ASIN links — strip broken session params, keep ASIN
const KV_PREFIX = "product_search_v4:";
const CACHE_TTL_MS = 48 * 60 * 60 * 1000; // 48 hours

export interface ProductResult {
  asin: string;
  title: string;
  image: string;       // full-size image URL
  thumbnail: string;   // smaller version
  price: string;
  url: string;
  rating: string;
}

interface CachedSearch {
  query: string;
  results: ProductResult[];
  cachedAt: number;
}

/**
 * Build a clean, permanent Amazon direct-product link from an ASIN.
 * Only the ASIN + affiliate tag — no session params that expire.
 */
function buildAmazonUrl(asin: string, searchQuery: string): string {
  // If we have a real ASIN (10 uppercase alphanumeric), use direct dp link
  if (asin && /^[A-Z0-9]{10}$/.test(asin) && !asin.startsWith("SEARCH_")) {
    return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
  }
  // No valid ASIN → keyword search fallback
  const q = (searchQuery || "Halloween costume").trim();
  return `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;
}

/**
 * Extract ASIN from any Amazon URL and sanitize to a clean dp or search URL.
 * Used to fix stale cache entries that may contain session-specific params.
 */
function sanitizeUrl(url: string, asin: string, fallbackQuery: string): string {
  // Extract ASIN from URL if our stored asin is a placeholder
  const realAsin = /^[A-Z0-9]{10}$/.test(asin) && !asin.startsWith("SEARCH_")
    ? asin
    : (url.match(/\/dp\/([A-Z0-9]{10})/i)?.[1]?.toUpperCase() || null);

  if (realAsin) return `https://www.amazon.com/dp/${realAsin}?tag=${AFFILIATE_TAG}`;
  const q = (fallbackQuery || "Halloween costume").trim();
  return `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;
}

/**
 * Normalize query for cache key — lowercase, trimmed, collapsed spaces
 */
function cacheKey(query: string): string {
  return KV_PREFIX + query.toLowerCase().replace(/\s+/g, " ").trim().replace(/[^a-z0-9 ]/g, "");
}

/**
 * Fetch Amazon search results page and extract product data.
 * Uses a realistic browser User-Agent to avoid bot detection.
 */
async function fetchAmazonProducts(query: string): Promise<ProductResult[]> {
  // Fetch the search results page (we need HTML to extract ASINs and images)
  const searchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${AFFILIATE_TAG}`;

  try {
    const res = await fetch(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      console.log(`[product-search] Amazon returned ${res.status} for query: "${query}"`);
      return [];
    }

    const html = await res.text();
    return parseSearchResults(html, query);
  } catch (err: any) {
    console.log(`[product-search] Fetch error for "${query}": ${err?.message}`);
    return [];
  }
}

/**
 * Parse Amazon search results HTML to extract product data.
 * ONLY extracts image URLs and titles — never extracts href links from the HTML
 * (those are session-specific and frequently return Amazon 500 errors).
 */
function parseSearchResults(html: string, query: string): ProductResult[] {
  const products: ProductResult[] = [];
  const seenAsins = new Set<string>();

  // Strategy 1: Find data-asin blocks with images
  // Amazon search results have data-asin="XXXXXXXXXX" on result containers.
  // We extract: ASIN (for dedup), image URL, and alt text (for title + search query).
  // We NEVER extract href attributes — only synthetic search URLs are safe.
  const asinBlockRegex = /data-asin="([A-Z0-9]{10})"[\s\S]*?<img[\s\S]*?src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"[\s\S]*?(?:alt="([^"]*)")?/g;

  let match;
  while ((match = asinBlockRegex.exec(html)) !== null && products.length < 8) {
    const asin = match[1];
    const image = match[2];
    const alt = match[3] || query;

    if (seenAsins.has(asin)) continue;
    if (!image || image.includes("sprite") || image.includes("icon")) continue;

    seenAsins.add(asin);

    // Try to extract price near this ASIN
    const asinIdx = match.index;
    const nearbyHtml = html.slice(asinIdx, asinIdx + 3000);
    const priceMatch = nearbyHtml.match(/\$[\d,]+\.?\d{0,2}/);

    const title = cleanTitle(alt);
    // Use product title as search query for best relevance;
    // fall back to the original query if alt text is too short or looks like a URL.
    const searchQuery = title && title.length > 5 && !title.startsWith("http") ? title : query;

    products.push({
      asin,
      title,
      image: image.replace(/\._[A-Z][A-Z]\d+_/, "._AC_SL500_"),
      thumbnail: image.replace(/\._[A-Z][A-Z]\d+_/, "._AC_UL200_"),
      price: priceMatch ? priceMatch[0] : "",
      url: buildAmazonUrl(asin, searchQuery),  // ← always a safe search URL
      rating: "",
    });
  }

  // Strategy 2: Broader image extraction if Strategy 1 found nothing
  if (products.length === 0) {
    const imgRegex = /https:\/\/m\.media-amazon\.com\/images\/I\/[A-Za-z0-9._%-]+\.(?:jpg|png)/g;
    const allImages = [...new Set(html.match(imgRegex) || [])];
    const productImages = allImages.filter(
      (url) => !url.includes("sprite") && !url.includes("icon") && !url.includes("logo")
    );

    for (let i = 0; i < Math.min(productImages.length, 6); i++) {
      products.push({
        asin: `SEARCH_${i}`,
        title: query,
        image: productImages[i].replace(/\._[A-Z][A-Z]\d+_/, "._AC_SL500_"),
        thumbnail: productImages[i].replace(/\._[A-Z][A-Z]\d+_/, "._AC_UL200_"),
        price: "",
        url: buildAmazonUrl("", query),  // no ASIN → falls back to search URL
        rating: "",
      });
    }
  }

  return products;
}

function cleanTitle(raw: string): string {
  return raw
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
    .slice(0, 120);
}

/**
 * Search for products — checks cache first, then fetches.
 * IMPORTANT: sanitizes URLs even on cache hits so old broken URLs are fixed
 * before they reach the client.
 */
export async function searchProducts(query: string): Promise<ProductResult[]> {
  if (!query || query.trim().length < 2) return [];

  const key = cacheKey(query);

  // Check cache
  try {
    const cached = await kv.get(key) as CachedSearch | null;
    if (cached && cached.results && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
      console.log(`[product-search] Cache hit for "${query}" (${cached.results.length} results)`);
      // Sanitize URLs on every cache hit — ensures old /dp/ or linkCode URLs are fixed
      return cached.results.map(r => ({
        ...r,
        url: sanitizeUrl(r.url, r.asin, r.title || query),
      }));
    }
  } catch {
    // Cache miss — proceed to fetch
  }

  // Fetch from Amazon
  console.log(`[product-search] Fetching from Amazon for "${query}"`);
  const results = await fetchAmazonProducts(query);

  // Cache results
  if (results.length > 0) {
    try {
      await kv.set(key, {
        query,
        results,
        cachedAt: Date.now(),
      } as CachedSearch);
      console.log(`[product-search] Cached ${results.length} results for "${query}"`);
    } catch (err: any) {
      console.log(`[product-search] Cache write error: ${err?.message}`);
    }
  }

  return results;
}

/**
 * Batch search — search for multiple queries in parallel.
 * Returns a map of query → results.
 */
export async function batchSearchProducts(
  queries: string[]
): Promise<Record<string, ProductResult[]>> {
  const results: Record<string, ProductResult[]> = {};

  // Process in batches of 3 to avoid overwhelming Amazon
  const BATCH = 3;
  for (let i = 0; i < queries.length; i += BATCH) {
    const batch = queries.slice(i, i + BATCH);
    const batchResults = await Promise.all(
      batch.map(async (q) => {
        const r = await searchProducts(q);
        return { q, r };
      })
    );
    for (const { q, r } of batchResults) {
      results[q] = r;
    }
    // Small delay between batches
    if (i + BATCH < queries.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return results;
}