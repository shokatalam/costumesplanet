// =============================================================================
// Server-side WP content scraper — extracts REAL product items + Amazon links
//
// Parses each WordPress article's rendered HTML to find product names paired
// with their Amazon affiliate URLs. Handles multiple common WP patterns:
//   1. Headings (h2/h3/h4) followed by Amazon links in the next section
//   2. Table rows with product name + Amazon link
//   3. List items containing Amazon links
//   4. Paragraphs/divs with Amazon buttons/links and nearby text
//
// Storage:  kv key = "costume_items:{slug}"
//           kv value = { slug, items: [{name, url}], scrapedAt }
// =============================================================================

import * as kv from "./kv_store.tsx";

const WP_POSTS_API = "https://demo1.rankupai.com/wp-json/wp/v2/posts";
const KV_PREFIX = "costume_items:";
const BATCH_SIZE = 10;
const AFFILIATE_TAG = "cplanet0c-20";

/**
 * Extract Amazon ASIN (10-char alphanumeric code) from any Amazon URL.
 * Handles /dp/ASIN, /gp/product/ASIN, and ?ASIN= query param formats.
 */
function extractAsin(url: string): string | null {
  const m =
    url.match(/\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i) ||
    url.match(/\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i) ||
    url.match(/[?&](?:ASIN|asin)=([A-Z0-9]{10})(?:&|$)/i);
  return m ? m[1].toUpperCase() : null;
}

/**
 * Resolve amzn.to short URLs by following redirects to get the real Amazon URL.
 * Returns the final URL after redirect(s).
 */
async function resolveShortUrl(url: string): Promise<string> {
  try {
    // Only resolve amzn.to / amzn.com short URLs
    if (!/amzn\.(to|com)\//i.test(url)) return url;
    
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": "CostumesPlanet-LinkResolver/1.0" },
    });
    // The final URL after redirects
    const finalUrl = res.url || url;
    console.log(`[link-resolver] ${url} → ${finalUrl}`);
    return finalUrl;
  } catch (err: any) {
    console.log(`[link-resolver] Failed to resolve ${url}: ${err?.message}`);
    return url;
  }
}

/**
 * Build a clean, permanent Amazon direct-product URL from any raw Amazon URL.
 *
 * The 500 error comes from SESSION-SPECIFIC query params (qid, crid, linkCode=sl1,
 * linkId, sprefix, ref_) that expire. The ASIN itself is fine — we just strip
 * the broken params and rebuild a clean /dp/ASIN?tag= link that always works.
 *
 * If no ASIN can be extracted, preserves the original URL with affiliate tag appended.
 */
function toCleanAmazonUrl(rawUrl: string, productName: string): string {
  const asin = extractAsin(rawUrl);
  if (asin) {
    return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
  }
  // No ASIN found — preserve the original Amazon URL, just ensure our tag is present
  // Strip any existing tag parameter and add ours
  try {
    const parsed = new URL(rawUrl.startsWith("http") ? rawUrl : "https://" + rawUrl);
    if (isAmazonUrl(rawUrl)) {
      parsed.searchParams.delete("tag");
      parsed.searchParams.set("tag", AFFILIATE_TAG);
      return parsed.toString();
    }
  } catch { /* URL parsing failed */ }
  // Last resort — keyword search
  const q = (productName || "Halloween costume").trim();
  return `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;
}

export interface ScrapedItem {
  name: string;
  url: string;
}

interface ItemScrapeResult {
  page: number;
  fetched: number;
  saved: number;
  totalItems: number;
  hasMore: boolean;
  totalPages: number;
  errors: string[];
  debug: string[];
}

/**
 * Strip all HTML tags and decode entities, returning clean text.
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Check if a URL is an Amazon affiliate link.
 */
function isAmazonUrl(url: string): boolean {
  return /amazon\.com|amzn\.to|amzn\.com/i.test(url);
}

/**
 * Decode HTML entities in a URL and ensure it has a protocol.
 * WP REST API returns serialized HTML, so hrefs contain &amp; instead of &, etc.
 * This is THE critical step to prevent broken affiliate links.
 */
function cleanUrl(raw: string): string {
  let url = raw
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#38;/g, "&")
    .trim();

  // Ensure protocol
  if (url.startsWith("//")) {
    url = "https:" + url;
  } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  return url;
}

/**
 * Clean up a product name — remove numbering, extra whitespace, "Buy on Amazon" text, etc.
 */
function cleanProductName(raw: string): string {
  let name = raw
    // Remove leading numbers like "1.", "1)", "01.", "#1"
    .replace(/^[\s#]*\d+[\.\)\-\:\s]+/, "")
    // Remove "Buy on Amazon", "Check Price", "View on Amazon" etc.
    .replace(/\b(buy|check|view|get|shop|see|order)\s+(on|at|from)?\s*(amazon|price).*$/i, "")
    .replace(/\bamazon\s*(link|button|price|buy)?\b/gi, "")
    // Remove common filler
    .replace(/\b(click here|read more|learn more|see more)\b/gi, "")
    .replace(/[→►▶❯»›]/g, "")
    .trim();

  // If it's too short after cleaning, it's probably not useful
  if (name.length < 3) return "";

  return name;
}

/**
 * Main extraction: parse HTML content and extract product items with their Amazon URLs.
 * Uses multiple strategies in priority order.
 * Now also collects raw URLs for later amzn.to resolution.
 */
function extractProductItems(html: string): { items: ScrapedItem[]; rawUrls: Map<number, string> } {
  const items: ScrapedItem[] = [];
  const rawUrls = new Map<number, string>(); // index → raw URL for amzn.to resolution
  const seenUrls = new Set<string>();
  const seenNames = new Set<string>();

  // ── Strategy 1: Headings (h2, h3, h4) followed by Amazon links ──
  // Pattern: <h2>Product Name</h2> ... <a href="amazon...">...</a>
  // Split HTML by headings and look for Amazon links in each section
  const sectionRegex = /<(h[2-4])[^>]*>([\s\S]*?)<\/\1>/gi;
  const sections: { heading: string; startIdx: number }[] = [];
  let match;

  while ((match = sectionRegex.exec(html)) !== null) {
    const headingText = stripHtml(match[2]);
    if (headingText.length > 2 && headingText.length < 200) {
      sections.push({ heading: headingText, startIdx: match.index + match[0].length });
    }
  }

  // For each section, find the first Amazon link before the next heading
  for (let i = 0; i < sections.length; i++) {
    const start = sections[i].startIdx;
    const end = i + 1 < sections.length ? sections[i + 1].startIdx - 200 : html.length;
    const sectionHtml = html.slice(start, Math.min(end, start + 3000));

    // Find the first Amazon link in this section — we extract the ASIN from it and
    // build a clean /dp/ASIN?tag= URL, stripping all session-specific params.
    const linkMatch = sectionHtml.match(/<a\s[^>]*href\s*=\s*["']((?:https?:\/\/)?(?:www\.)?(?:amazon\.com|amzn\.to|amzn\.com)[^"']*)['"][^>]*>/i);
    if (linkMatch) {
      const name = cleanProductName(sections[i].heading);
      if (name && !seenNames.has(name.toLowerCase())) {
        const rawUrlCleaned = cleanUrl(linkMatch[1]);
        const safeUrl = toCleanAmazonUrl(rawUrlCleaned, name);
        const idx = items.length;
        items.push({ name, url: safeUrl });
        // Track if this was an amzn.to link or has no ASIN for later resolution
        if (/amzn\.(to|com)\//i.test(rawUrlCleaned) || !extractAsin(rawUrlCleaned)) {
          rawUrls.set(idx, rawUrlCleaned);
        }
        seenUrls.add(safeUrl);
        seenNames.add(name.toLowerCase());
      }
    }
  }

  // ── Strategy 2: Table rows with Amazon links ──
  // Pattern: <tr>...<td>Product Name</td>...<td><a href="amazon...">...</a></td>...</tr>
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  while ((match = rowRegex.exec(html)) !== null) {
    const rowHtml = match[1];
    // Find Amazon link in this row — extract ASIN and build clean /dp/ASIN?tag= URL.
    const linkMatch = rowHtml.match(/<a\s[^>]*href\s*=\s*["']((?:https?:\/\/)?(?:www\.)?(?:amazon\.com|amzn\.to|amzn\.com)[^"']*)['"][^>]*>/i);
    if (!linkMatch) continue;

    // Get all <td> cells
    const cells: string[] = [];
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowHtml)) !== null) {
      cells.push(stripHtml(cellMatch[1]));
    }

    // The product name is usually the first non-empty cell that isn't "Buy on Amazon" or a price
    let name = "";
    for (const cell of cells) {
      const clean = cleanProductName(cell);
      if (clean && clean.length > 3 && !/^\$?\d+/.test(clean) && !seenNames.has(clean.toLowerCase())) {
        name = clean;
        break;
      }
    }

    if (name) {
      const rawUrlCleaned = cleanUrl(linkMatch[1]);
      const safeUrl = toCleanAmazonUrl(rawUrlCleaned, name);
      const idx = items.length;
      items.push({ name, url: safeUrl });
      if (/amzn\.(to|com)\//i.test(rawUrlCleaned) || !extractAsin(rawUrlCleaned)) {
        rawUrls.set(idx, rawUrlCleaned);
      }
      seenUrls.add(safeUrl);
      seenNames.add(name.toLowerCase());
    }
  }

  // ── Strategy 3: <a> tags with Amazon URLs that have meaningful anchor text ──
  const anchorRegex = /<a\s[^>]*href\s*=\s*["']((?:https?:\/\/)?(?:www\.)?(?:amazon\.com|amzn\.to|amzn\.com)[^"']*)['"][^>]*>([\s\S]*?)<\/a>/gi;
  while ((match = anchorRegex.exec(html)) !== null) {
    let anchorText = stripHtml(match[2]);
    // Skip generic button text
    if (/^(buy|check|view|get|shop|see|click|order|amazon|price|here)\b/i.test(anchorText) && anchorText.length < 30) {
      // Look backwards from this link for a heading or strong/bold text
      const beforeLink = html.slice(Math.max(0, match.index - 500), match.index);

      // Try to find the nearest heading
      const headingBefore = beforeLink.match(/<(?:h[2-6]|strong|b)[^>]*>([\s\S]*?)<\/(?:h[2-6]|strong|b)>/gi);
      if (headingBefore && headingBefore.length > 0) {
        const lastHeading = headingBefore[headingBefore.length - 1];
        anchorText = stripHtml(lastHeading);
      } else {
        continue;
      }
    }

    const name = cleanProductName(anchorText);
    if (name && name.length > 3 && !seenNames.has(name.toLowerCase())) {
      const rawUrlCleaned = cleanUrl(match[1]);
      const safeUrl = toCleanAmazonUrl(rawUrlCleaned, name);
      const idx = items.length;
      items.push({ name, url: safeUrl });
      if (/amzn\.(to|com)\//i.test(rawUrlCleaned) || !extractAsin(rawUrlCleaned)) {
        rawUrls.set(idx, rawUrlCleaned);
      }
      seenUrls.add(safeUrl);
      seenNames.add(name.toLowerCase());
    }
  }

  // ── Strategy 4: WooCommerce / affiliate plugin product blocks ──
  const productBlockRegex = /<div[^>]*class="[^"]*(?:product|affiliate|aawp|lasso|amazon)[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/div>)?/gi;
  while ((match = productBlockRegex.exec(html)) !== null) {
    const blockHtml = match[1];
    const linkMatch = blockHtml.match(/<a\s[^>]*href\s*=\s*["']((?:https?:\/\/)?(?:www\.)?(?:amazon\.com|amzn\.to|amzn\.com)[^"']*)['"][^>]*>/i);
    if (!linkMatch) continue;

    // Look for product title in the block
    const titleMatch = blockHtml.match(/<(?:h[2-6]|span|div|p|a)[^>]*class="[^"]*(?:title|name|heading|product-title)[^"]*"[^>]*>([\s\S]*?)<\/(?:h[2-6]|span|div|p|a)>/i)
      || blockHtml.match(/<(?:h[2-6])[^>]*>([\s\S]*?)<\/h[2-6]>/i);

    if (titleMatch) {
      const name = cleanProductName(stripHtml(titleMatch[1]));
      if (name && name.length > 3 && !seenNames.has(name.toLowerCase())) {
        const rawUrlCleaned = cleanUrl(linkMatch[1]);
        const safeUrl = toCleanAmazonUrl(rawUrlCleaned, name);
        const idx = items.length;
        items.push({ name, url: safeUrl });
        if (/amzn\.(to|com)\//i.test(rawUrlCleaned) || !extractAsin(rawUrlCleaned)) {
          rawUrls.set(idx, rawUrlCleaned);
        }
        seenUrls.add(safeUrl);
        seenNames.add(name.toLowerCase());
      }
    }
  }

  return { items, rawUrls };
}

/**
 * Scrape one page of WP posts for product items + Amazon links.
 */
export async function scrapeProductItems(page: number = 1): Promise<ItemScrapeResult> {
  const errors: string[] = [];
  const debug: string[] = [];
  let totalItemCount = 0;

  try {
    const postsUrl = `${WP_POSTS_API}?per_page=${BATCH_SIZE}&page=${page}&_fields=slug,content,title&orderby=date&order=desc`;
    debug.push(`Fetching: ${postsUrl}`);
    console.log(`[item-scraper] ${postsUrl}`);

    const postsRes = await fetch(postsUrl, {
      headers: { "User-Agent": "CostumesPlanet-ItemScraper/1.0" },
    });

    if (!postsRes.ok) {
      const body = await postsRes.text().catch(() => "");
      throw new Error(`WP API returned ${postsRes.status}: ${body.slice(0, 300)}`);
    }

    const totalPages = Number(postsRes.headers.get("X-WP-TotalPages") || "1");
    const totalPosts = Number(postsRes.headers.get("X-WP-Total") || "0");
    const posts: Array<{ slug: string; content?: { rendered: string }; title?: { rendered: string } }> = await postsRes.json();

    if (!Array.isArray(posts)) throw new Error("WP API did not return an array");

    debug.push(`Page ${page}/${totalPages}: ${posts.length} posts, ${totalPosts} total`);

    const keys: string[] = [];
    const values: any[] = [];

    for (const post of posts) {
      if (!post.slug) continue;

      const html = post.content?.rendered || "";
      if (!html) {
        errors.push(`${post.slug}: no rendered content`);
        continue;
      }

      const { items, rawUrls } = extractProductItems(html);
      
      // Resolve amzn.to short URLs to get real product ASINs
      if (rawUrls.size > 0) {
        const resolvePromises: Promise<void>[] = [];
        for (const [idx, rawUrl] of rawUrls.entries()) {
          resolvePromises.push(
            resolveShortUrl(rawUrl).then((resolved) => {
              if (resolved !== rawUrl) {
                const asin = extractAsin(resolved);
                if (asin) {
                  items[idx].url = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
                } else {
                  // Still no ASIN but keep the resolved URL with tag
                  items[idx].url = toCleanAmazonUrl(resolved, items[idx].name);
                }
              }
            })
          );
        }
        // Resolve in parallel (with a small concurrency limit via batching)
        for (let b = 0; b < resolvePromises.length; b += 5) {
          await Promise.all(resolvePromises.slice(b, b + 5));
        }
        debug.push(`${post.slug}: resolved ${rawUrls.size} short/ASIN-less URLs`);
      }

      totalItemCount += items.length;
      debug.push(`${post.slug}: ${items.length} items found${items.length > 0 ? " → " + items.map(i => `${i.name.slice(0, 30)} [${i.url.slice(0, 60)}]`).join(" | ") : ""}`);

      keys.push(`${KV_PREFIX}${post.slug}`);
      values.push({
        slug: post.slug,
        title: stripHtml(post.title?.rendered || post.slug),
        items,
        itemCount: items.length,
        scrapedAt: new Date().toISOString(),
      });
    }

    // Save to kv_store
    if (keys.length > 0) {
      for (let i = 0; i < keys.length; i += 25) {
        const kBatch = keys.slice(i, i + 25);
        const vBatch = values.slice(i, i + 25);
        await kv.mset(kBatch, vBatch);
      }
      debug.push(`Saved item data for ${keys.length} slugs (${totalItemCount} total items)`);
      console.log(`[item-scraper] Saved ${keys.length} slugs with ${totalItemCount} items`);
    }

    return {
      page,
      fetched: posts.length,
      saved: keys.length,
      totalItems: totalItemCount,
      hasMore: page < totalPages,
      totalPages,
      errors,
      debug,
    };
  } catch (err: any) {
    console.log(`[item-scraper] Fatal error on page ${page}:`, err?.message || err);
    return {
      page,
      fetched: 0,
      saved: 0,
      totalItems: 0,
      hasMore: false,
      totalPages: 1,
      errors: [`Fatal: ${err?.message || err}`],
      debug,
    };
  }
}

/**
 * Load the full slug → items map from kv_store.
 */
export async function getItemMap(): Promise<Record<string, { items: ScrapedItem[]; title: string; itemCount: number }>> {
  const rows = await kv.getByPrefix(KV_PREFIX);
  const map: Record<string, { items: ScrapedItem[]; title: string; itemCount: number }> = {};

  for (const row of rows) {
    if (row && typeof row === "object" && row.slug) {
      map[row.slug] = {
        items: row.items || [],
        title: row.title || row.slug,
        itemCount: row.itemCount || 0,
      };
    }
  }

  console.log(`[item-map] Returning data for ${Object.keys(map).length} slugs`);
  return map;
}