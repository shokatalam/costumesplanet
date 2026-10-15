// =============================================================================
// Server-side WordPress image scraper → Supabase Storage
//
// 1. Fetches featured image URLs from the WP REST API
// 2. Downloads the actual image binary
// 3. Uploads to a private Supabase Storage bucket
// 4. Stores metadata (storagePath + originalWpUrl) in kv_store
// 5. getImageMap() generates signed URLs from storage for the frontend
//
// This means images survive even after WordPress goes down.
// =============================================================================

import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const WP_POSTS_API = "https://demo1.rankupai.com/wp-json/wp/v2/posts";
const WP_MEDIA_API = "https://demo1.rankupai.com/wp-json/wp/v2/media";
const KV_PREFIX = "costume_img:";
const BUCKET_NAME = "make-0d51dc15-costume-images";
const BATCH_SIZE = 20;
const SIGNED_URL_EXPIRY = 60 * 60 * 24 * 365; // 1 year in seconds

// ── Server-side caches ──
let cachedImageMap: Record<string, string> | null = null;
let cachedImageMapTimestamp = 0;
const IMAGE_MAP_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Per-slug signed URL cache (slug → { signedUrl, expiresAt })
const signedUrlCache = new Map<string, { signedUrl: string; expiresAt: number }>();
const SIGNED_URL_CACHE_TTL = 60 * 60 * 1000; // 1 hour

/** Invalidate the in-memory image map cache (call after scraping). */
export function invalidateImageMapCache() {
  cachedImageMap = null;
  cachedImageMapTimestamp = 0;
  signedUrlCache.clear();
  console.log("[image-map] Cache invalidated");
}

// ── Supabase Storage client (service role for full access) ──
function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

// ── Ensure bucket exists (idempotent) ──
let bucketReady = false;
async function ensureBucket(): Promise<void> {
  if (bucketReady) return;
  const supabase = getSupabase();
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some((b: any) => b.name === BUCKET_NAME);
    if (!exists) {
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 10 * 1024 * 1024, // 10MB max per image
      });
      if (error) {
        console.log(`[image-scraper] Bucket creation error: ${error.message}`);
      } else {
        console.log(`[image-scraper] Created bucket: ${BUCKET_NAME}`);
      }
    }
    bucketReady = true;
  } catch (err: any) {
    console.log(`[image-scraper] ensureBucket error: ${err?.message}`);
  }
}

/**
 * Determine file extension from URL or content-type.
 */
function getExtension(url: string, contentType: string): string {
  // From content-type first
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("svg")) return "svg";
  // From URL
  const match = url.match(/\.(jpe?g|png|webp|gif|svg)(\?|$)/i);
  if (match) return match[1].toLowerCase().replace("jpeg", "jpg");
  return "jpg"; // default
}

/**
 * Download image binary from a URL.
 */
async function downloadImage(url: string): Promise<{ data: ArrayBuffer; contentType: string } | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "CostumesPlanet-Scraper/2.0" },
      redirect: "follow",
    });
    if (!res.ok) {
      console.log(`[image-scraper] Download failed for ${url}: ${res.status}`);
      return null;
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const data = await res.arrayBuffer();
    if (data.byteLength < 100) {
      console.log(`[image-scraper] Image too small (${data.byteLength} bytes): ${url}`);
      return null;
    }
    return { data, contentType };
  } catch (err: any) {
    console.log(`[image-scraper] Download error for ${url}: ${err?.message}`);
    return null;
  }
}

/**
 * Upload image to Supabase Storage.
 * Returns the storage path on success, null on failure.
 */
async function uploadToStorage(slug: string, imageData: ArrayBuffer, contentType: string, ext: string): Promise<string | null> {
  const supabase = getSupabase();
  const storagePath = `${slug}.${ext}`;

  try {
    // Upsert: overwrite if exists
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, imageData, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.log(`[image-scraper] Storage upload error for ${slug}: ${error.message}`);
      return null;
    }

    return storagePath;
  } catch (err: any) {
    console.log(`[image-scraper] Storage upload exception for ${slug}: ${err?.message}`);
    return null;
  }
}

interface ScrapeResult {
  page: number;
  fetched: number;
  saved: number;
  uploaded: number;
  hasMore: boolean;
  totalPages: number;
  errors: string[];
  debug: string[];
}

/**
 * Scrape one page of WP posts:
 * 1. Fetch post slugs + featured media IDs
 * 2. Fetch media URLs
 * 3. Download actual image binaries
 * 4. Upload to Supabase Storage
 * 5. Store metadata in kv_store
 */
export async function scrapeWpImages(page: number = 1): Promise<ScrapeResult> {
  const errors: string[] = [];
  const debug: string[] = [];
  let uploaded = 0;

  try {
    await ensureBucket();

    // ── Step 1: Fetch posts ──
    const postsUrl = `${WP_POSTS_API}?per_page=${BATCH_SIZE}&page=${page}&_fields=slug,featured_media&orderby=date&order=desc`;
    debug.push(`Fetching: ${postsUrl}`);
    console.log(`[scraper] ${postsUrl}`);

    const postsRes = await fetch(postsUrl, {
      headers: { "User-Agent": "CostumesPlanet-Scraper/2.0" },
    });

    if (!postsRes.ok) {
      const body = await postsRes.text().catch(() => "");
      throw new Error(`WP posts API returned ${postsRes.status}: ${body.slice(0, 300)}`);
    }

    const totalPages = Number(postsRes.headers.get("X-WP-TotalPages") || "1");
    const totalPosts = Number(postsRes.headers.get("X-WP-Total") || "0");
    const posts: Array<{ slug: string; featured_media: number }> = await postsRes.json();

    if (!Array.isArray(posts)) {
      throw new Error("WP API did not return an array");
    }

    debug.push(`Page ${page}/${totalPages}: ${posts.length} posts, ${totalPosts} total`);

    // Collect media IDs that need fetching
    const mediaMap = new Map<number, string[]>();
    for (const post of posts) {
      if (!post.slug) continue;
      if (!post.featured_media || post.featured_media === 0) {
        errors.push(`${post.slug}: no featured_media ID`);
        continue;
      }
      const existing = mediaMap.get(post.featured_media) || [];
      existing.push(post.slug);
      mediaMap.set(post.featured_media, existing);
    }

    debug.push(`Need to fetch ${mediaMap.size} unique media items`);

    if (mediaMap.size === 0) {
      return { page, fetched: posts.length, saved: 0, uploaded: 0, hasMore: page < totalPages, totalPages, errors, debug };
    }

    // ── Step 2: Fetch media metadata from WP ──
    const mediaIds = Array.from(mediaMap.keys());
    const kvKeys: string[] = [];
    const kvValues: any[] = [];

    for (let i = 0; i < mediaIds.length; i += 20) {
      const batchIds = mediaIds.slice(i, i + 20);
      const mediaUrl = `${WP_MEDIA_API}?include=${batchIds.join(",")}&per_page=${batchIds.length}&_fields=id,source_url,media_details`;
      debug.push(`Fetching media: ${mediaUrl}`);

      try {
        const mediaRes = await fetch(mediaUrl, {
          headers: { "User-Agent": "CostumesPlanet-Scraper/2.0" },
        });

        if (!mediaRes.ok) {
          const errBody = await mediaRes.text().catch(() => "");
          errors.push(`Media batch fetch failed: ${mediaRes.status} ${errBody.slice(0, 100)}`);
          continue;
        }

        const mediaItems: any[] = await mediaRes.json();
        if (!Array.isArray(mediaItems)) {
          errors.push("Media response not an array");
          continue;
        }

        debug.push(`Got ${mediaItems.length} media items`);

        // ���─ Step 3 & 4: Download + Upload each image ──
        for (const media of mediaItems) {
          const mediaId = media?.id;
          if (!mediaId) continue;

          // Pick best WP image size: medium_large (768px) > large > full
          const wpImageUrl: string =
            media?.media_details?.sizes?.medium_large?.source_url ||
            media?.media_details?.sizes?.large?.source_url ||
            media?.media_details?.sizes?.full?.source_url ||
            media?.source_url ||
            "";

          if (!wpImageUrl) {
            errors.push(`Media ${mediaId}: no source_url found`);
            continue;
          }

          // Download the actual image binary
          const downloaded = await downloadImage(wpImageUrl);
          if (!downloaded) {
            errors.push(`Media ${mediaId}: download failed from ${wpImageUrl}`);
            // Fall back to storing just the URL (will break when WP goes down, but at least we tried)
            const slugs = mediaMap.get(mediaId) || [];
            for (const slug of slugs) {
              kvKeys.push(`${KV_PREFIX}${slug}`);
              kvValues.push({
                slug,
                imageUrl: wpImageUrl,      // legacy fallback
                originalWpUrl: wpImageUrl,
                storagePath: null,          // not uploaded
                scrapedAt: new Date().toISOString(),
              });
            }
            continue;
          }

          const ext = getExtension(wpImageUrl, downloaded.contentType);

          // Upload to Supabase Storage for each slug that uses this media
          const slugs = mediaMap.get(mediaId) || [];
          for (const slug of slugs) {
            const storagePath = await uploadToStorage(slug, downloaded.data, downloaded.contentType, ext);

            if (storagePath) {
              uploaded++;
              debug.push(`✓ ${slug} → stored as ${storagePath} (${(downloaded.data.byteLength / 1024).toFixed(0)}KB)`);
            } else {
              errors.push(`${slug}: storage upload failed`);
            }

            kvKeys.push(`${KV_PREFIX}${slug}`);
            kvValues.push({
              slug,
              storagePath: storagePath || null,
              originalWpUrl: wpImageUrl,
              contentType: downloaded.contentType,
              fileSize: downloaded.data.byteLength,
              imageUrl: "", // will be generated as signed URL on read
              scrapedAt: new Date().toISOString(),
            });
          }
        }
      } catch (err: any) {
        errors.push(`Media batch error: ${err?.message || err}`);
      }
    }

    // ── Step 5: Save metadata to kv_store ──
    if (kvKeys.length > 0) {
      for (let i = 0; i < kvKeys.length; i += 25) {
        const kBatch = kvKeys.slice(i, i + 25);
        const vBatch = kvValues.slice(i, i + 25);
        await kv.mset(kBatch, vBatch);
      }
      debug.push(`Saved ${kvKeys.length} entries to KV (${uploaded} uploaded to storage)`);
      console.log(`[scraper] Saved ${kvKeys.length} entries, ${uploaded} uploaded to storage`);
    } else {
      debug.push("No images saved this batch");
    }

    return {
      page,
      fetched: posts.length,
      saved: kvKeys.length,
      uploaded,
      hasMore: page < totalPages,
      totalPages,
      errors,
      debug,
    };
  } catch (err: any) {
    console.log(`[scraper] Fatal error on page ${page}:`, err?.message || err);
    return {
      page,
      fetched: 0,
      saved: 0,
      uploaded: 0,
      hasMore: false,
      totalPages: 1,
      errors: [`Fatal: ${err?.message || err}`],
      debug,
    };
  }
}

// ── Lazy WP fetch state (only runs once if KV is empty) ──
let lazyFetchDone = false;
let lazyFetchPromise: Promise<void> | null = null;

/**
 * When KV has zero image entries, lazily fetch all featured image URLs from
 * the WordPress REST API and save them to KV (originalWpUrl only — no download).
 * This makes images work immediately before the full scraper is run.
 * Uses per_page=100 to minimize requests (WP REST API max).
 */
async function lazyFetchWpImageUrls(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  const kvKeys: string[] = [];
  const kvValues: any[] = [];

  try {
    console.log("[image-map] KV empty — lazily fetching image URLs from WordPress...");

    // Fetch all posts (per_page=100, max 2-3 pages for ~195 posts)
    let page = 1;
    let hasMore = true;
    const postMedia: { slug: string; mediaId: number }[] = [];

    while (hasMore) {
      const url = `${WP_POSTS_API}?per_page=100&page=${page}&_fields=slug,featured_media&orderby=date&order=desc`;
      const res = await fetch(url, {
        headers: { "User-Agent": "CostumesPlanet-Scraper/2.0" },
      });

      if (!res.ok) {
        console.log(`[lazy-fetch] Posts page ${page} failed: ${res.status}`);
        break;
      }

      const totalPages = parseInt(res.headers.get("x-wp-totalpages") || "1", 10);
      const posts: any[] = await res.json();

      for (const p of posts) {
        if (p.slug && p.featured_media && p.featured_media > 0) {
          postMedia.push({ slug: p.slug, mediaId: p.featured_media });
        }
      }

      hasMore = page < totalPages;
      page++;
    }

    console.log(`[lazy-fetch] Found ${postMedia.length} posts with featured media`);

    // Collect unique media IDs
    const uniqueMediaIds = [...new Set(postMedia.map((p) => p.mediaId))];

    // Fetch media details in batches of 100
    const mediaUrlMap = new Map<number, string>(); // mediaId → source_url

    for (let i = 0; i < uniqueMediaIds.length; i += 100) {
      const batch = uniqueMediaIds.slice(i, i + 100);
      const mediaUrl = `${WP_MEDIA_API}?include=${batch.join(",")}&per_page=100&_fields=id,source_url`;

      const mediaRes = await fetch(mediaUrl, {
        headers: { "User-Agent": "CostumesPlanet-Scraper/2.0" },
      });

      if (!mediaRes.ok) {
        console.log(`[lazy-fetch] Media batch failed: ${mediaRes.status}`);
        continue;
      }

      const mediaItems: any[] = await mediaRes.json();
      for (const m of mediaItems) {
        if (m.id && m.source_url) {
          mediaUrlMap.set(m.id, m.source_url);
        }
      }
    }

    console.log(`[lazy-fetch] Resolved ${mediaUrlMap.size} media URLs`);

    // Build map and KV entries
    for (const { slug, mediaId } of postMedia) {
      const wpUrl = mediaUrlMap.get(mediaId);
      if (!wpUrl) continue;

      map[slug] = wpUrl;
      kvKeys.push(`${KV_PREFIX}${slug}`);
      kvValues.push({
        slug,
        storagePath: null,
        originalWpUrl: wpUrl,
        contentType: "",
        fileSize: 0,
        imageUrl: "",
        scrapedAt: new Date().toISOString(),
        lazyFetched: true,
      });
    }

    // Save to KV in batches of 25
    for (let i = 0; i < kvKeys.length; i += 25) {
      await kv.mset(kvKeys.slice(i, i + 25), kvValues.slice(i, i + 25));
    }

    console.log(`[lazy-fetch] Saved ${kvKeys.length} image URL entries to KV`);
  } catch (err: any) {
    console.log(`[lazy-fetch] Error: ${err?.message || err}`);
  }

  return map;
}

/**
 * Load the full slug → imageUrl map from kv_store.
 * Generates signed URLs for images stored in Supabase Storage.
 * Falls back to originalWpUrl for images that weren't uploaded.
 *
 * Returns { [slug]: signedUrl | wpUrl }
 */
export async function getImageMap(): Promise<Record<string, string>> {
  const now = Date.now();

  // Check cache
  if (cachedImageMap && now - cachedImageMapTimestamp < IMAGE_MAP_CACHE_TTL) {
    console.log(`[image-map] Returning cached image map (${Object.keys(cachedImageMap).length} entries)`);
    return cachedImageMap;
  }

  const rows = await kv.getByPrefix(KV_PREFIX);
  const map: Record<string, string> = {};

  // If KV is completely empty and we haven't lazy-fetched yet,
  // fetch image URLs from WordPress and save to KV
  if (rows.length === 0 && !lazyFetchDone) {
    lazyFetchDone = true;
    if (!lazyFetchPromise) {
      lazyFetchPromise = (async () => {
        const wpMap = await lazyFetchWpImageUrls();
        Object.assign(map, wpMap);
      })();
    }
    await lazyFetchPromise;

    // Cache and return
    cachedImageMap = map;
    cachedImageMapTimestamp = now;
    console.log(`[image-map] Returning ${Object.keys(map).length} image URLs from lazy WP fetch`);
    return map;
  }

  // Separate: images in storage vs legacy WP-only URLs
  const storagePaths: string[] = [];
  const storageSlugMap: Record<string, string> = {}; // path → slug

  for (const row of rows) {
    if (!row || typeof row !== "object" || !row.slug) continue;

    if (row.storagePath) {
      storagePaths.push(row.storagePath);
      storageSlugMap[row.storagePath] = row.slug;
    } else if (row.originalWpUrl) {
      // Fallback: WP URL only (not yet uploaded to storage)
      map[row.slug] = row.originalWpUrl;
    } else if (row.imageUrl) {
      // Legacy format
      map[row.slug] = row.imageUrl;
    }
  }

  // Batch-generate signed URLs for all storage images
  if (storagePaths.length > 0) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrls(storagePaths, SIGNED_URL_EXPIRY);

      if (error) {
        console.log(`[image-map] Error creating signed URLs: ${error.message}`);
        // Fallback: try to serve WP URLs for failed ones
      }

      if (data && Array.isArray(data)) {
        for (const item of data) {
          if (item.error) {
            console.log(`[image-map] Signed URL error for ${item.path}: ${item.error}`);
            continue;
          }
          if (item.signedUrl && item.path) {
            const slug = storageSlugMap[item.path];
            if (slug) {
              map[slug] = item.signedUrl;
            }
          }
        }
      }
    } catch (err: any) {
      console.log(`[image-map] Signed URL generation failed: ${err?.message}`);
    }
  }

  // Update cache
  cachedImageMap = map;
  cachedImageMapTimestamp = now;

  console.log(`[image-map] Returning ${Object.keys(map).length} image URLs (${storagePaths.length} from storage)`);
  return map;
}

/**
 * Get the WP URL → Storage URL redirect mapping.
 * Used to redirect old WordPress image URLs to Supabase Storage.
 */
export async function getWpRedirectMap(): Promise<Record<string, { slug: string; storagePath: string }>> {
  const rows = await kv.getByPrefix(KV_PREFIX);
  const redirects: Record<string, { slug: string; storagePath: string }> = {};

  for (const row of rows) {
    if (!row || typeof row !== "object" || !row.slug || !row.storagePath || !row.originalWpUrl) continue;
    redirects[row.originalWpUrl] = {
      slug: row.slug,
      storagePath: row.storagePath,
    };
  }

  return redirects;
}

/**
 * Resolve a single WP URL to a signed Supabase Storage URL.
 * Used for the redirect endpoint.
 */
export async function resolveWpUrlToSigned(wpUrl: string): Promise<string | null> {
  // Search kv for matching originalWpUrl
  const rows = await kv.getByPrefix(KV_PREFIX);

  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    if (row.originalWpUrl === wpUrl && row.storagePath) {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .createSignedUrl(row.storagePath, SIGNED_URL_EXPIRY);

        if (error || !data?.signedUrl) {
          console.log(`[wp-redirect] Signed URL error for ${row.storagePath}: ${error?.message}`);
          return null;
        }

        return data.signedUrl;
      } catch (err: any) {
        console.log(`[wp-redirect] Exception: ${err?.message}`);
        return null;
      }
    }
  }

  return null;
}

/**
 * Resolve a slug to an image URL.
 * Prefers signed Supabase Storage URL, falls back to originalWpUrl or legacy imageUrl.
 */
export async function resolveSlugToSigned(slug: string): Promise<string | null> {
  const now = Date.now();

  // Check cache
  const cached = signedUrlCache.get(slug);
  if (cached && now < cached.expiresAt) {
    console.log(`[resolve-slug] Returning cached URL for ${slug}`);
    return cached.signedUrl;
  }

  const row = await kv.get(`${KV_PREFIX}${slug}`);
  if (!row) return null;

  // Case 1: Image uploaded to Supabase Storage → generate signed URL
  if (row.storagePath) {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(row.storagePath, SIGNED_URL_EXPIRY);

      if (!error && data?.signedUrl) {
        signedUrlCache.set(slug, { signedUrl: data.signedUrl, expiresAt: now + SIGNED_URL_CACHE_TTL });
        return data.signedUrl;
      }
      console.log(`[resolve-slug] Signed URL error for ${slug}: ${error?.message}`);
    } catch (err: any) {
      console.log(`[resolve-slug] Exception for ${slug}: ${err?.message}`);
    }
  }

  // Case 2: Fallback to original WordPress URL (scraper saved URL but hasn't uploaded to storage yet)
  if (row.originalWpUrl) {
    // Cache the WP URL too so we don't hit KV repeatedly
    signedUrlCache.set(slug, { signedUrl: row.originalWpUrl, expiresAt: now + SIGNED_URL_CACHE_TTL });
    return row.originalWpUrl;
  }

  // Case 3: Legacy format (imageUrl field)
  if (row.imageUrl) {
    signedUrlCache.set(slug, { signedUrl: row.imageUrl, expiresAt: now + SIGNED_URL_CACHE_TTL });
    return row.imageUrl;
  }

  return null;
}