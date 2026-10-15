// =============================================================================
// CostumesPlanet.com — Image Resolution
//
// Primary: fetches slug→URL map from our edge function (/image-map).
// Fallback: if server returns 0 images, fetches directly from WordPress REST API.
// Uses DIRECT URLs in <img> tags — no proxy redirect hops.
// =============================================================================

import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;
const WP_POSTS_API = "https://demo1.rankupai.com/wp-json/wp/v2/posts";
const WP_MEDIA_API = "https://demo1.rankupai.com/wp-json/wp/v2/media";
const LOCAL_CACHE_KEY = "cp_image_urls_v8";

// ── In-memory URL map: slug → direct image URL ──
let imageMap: Record<string, string> = {};
let mapLoaded = false;
let mapLoadPromise: Promise<void> | null = null;

// Load from localStorage on init (instant, before server fetch)
try {
  const cached = localStorage.getItem(LOCAL_CACHE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (parsed && typeof parsed === "object" && Object.keys(parsed).length > 0) {
      imageMap = parsed;
      mapLoaded = true;
      console.log(`[costumeImages] Loaded ${Object.keys(parsed).length} images from localStorage cache`);
    }
  }
} catch { /* ignore */ }

/**
 * Fetch featured image URLs directly from WordPress REST API.
 * Uses per_page=100 (WP max) so ~195 posts = 2 page fetches + 2 media fetches = ~4 HTTP calls.
 */
async function fetchFromWordPressDirect(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};

  try {
    console.log("[costumeImages] Fetching images directly from WordPress REST API...");

    // Step 1: Fetch all posts with their featured_media IDs
    const postMedia: { slug: string; mediaId: number }[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const url = `${WP_POSTS_API}?per_page=100&page=${page}&_fields=slug,featured_media&orderby=date&order=desc`;
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`[costumeImages] WP posts page ${page} failed: ${res.status}`);
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

    if (postMedia.length === 0) {
      console.log("[costumeImages] No posts with featured media found from WP");
      return map;
    }

    console.log(`[costumeImages] Found ${postMedia.length} WP posts with featured media`);

    // Step 2: Fetch media URLs in batches
    const uniqueMediaIds = [...new Set(postMedia.map((p) => p.mediaId))];
    const mediaUrlMap = new Map<number, string>();

    for (let i = 0; i < uniqueMediaIds.length; i += 100) {
      const batch = uniqueMediaIds.slice(i, i + 100);
      const mediaUrl = `${WP_MEDIA_API}?include=${batch.join(",")}&per_page=100&_fields=id,source_url`;

      const mediaRes = await fetch(mediaUrl);
      if (!mediaRes.ok) {
        console.error(`[costumeImages] WP media batch failed: ${mediaRes.status}`);
        continue;
      }

      const mediaItems: any[] = await mediaRes.json();
      for (const m of mediaItems) {
        if (m.id && m.source_url) {
          mediaUrlMap.set(m.id, m.source_url);
        }
      }
    }

    // Step 3: Build slug → URL map
    for (const { slug, mediaId } of postMedia) {
      const wpUrl = mediaUrlMap.get(mediaId);
      if (wpUrl) {
        map[slug] = wpUrl;
      }
    }

    console.log(`[costumeImages] Resolved ${Object.keys(map).length} image URLs from WordPress`);
  } catch (err) {
    console.warn("[costumeImages] WordPress direct fetch failed:", err);
  }

  return map;
}

// ── Fetch image map from server, with WP fallback ──
async function fetchImageMapFromServer(): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/image-map`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.images && typeof data.images === "object") {
        const entries = Object.entries(data.images);
        if (entries.length > 0) {
          imageMap = data.images;
          mapLoaded = true;
          try {
            localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(imageMap));
          } catch { /* quota */ }
          console.log(`[costumeImages] Loaded ${entries.length} image URLs from server`);
          notifyListeners();
          return;
        }
      }
    } else {
      console.error(`[costumeImages] Server image-map failed: ${res.status}`);
    }
  } catch (err) {
    console.warn("[costumeImages] Server fetch failed:", err);
  }

  // ── Fallback: fetch directly from WordPress ──
  // Only if we don't already have cached data
  if (Object.keys(imageMap).length === 0) {
    console.log("[costumeImages] Server returned empty — falling back to WordPress direct fetch");
    const wpMap = await fetchFromWordPressDirect();
    if (Object.keys(wpMap).length > 0) {
      imageMap = wpMap;
      mapLoaded = true;
      try {
        localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(imageMap));
      } catch { /* quota */ }
      notifyListeners();
    } else {
      mapLoaded = true;
      notifyListeners();
    }
  }
}

/**
 * Initialize the image map. Call once on app start.
 */
export function loadImageMap(): Promise<void> {
  if (!mapLoadPromise) {
    mapLoadPromise = fetchImageMapFromServer();
  }
  return mapLoadPromise;
}

/** Get the DIRECT image URL for a slug (empty string if not found) */
export function getCostumeImage(slug: string): string {
  return imageMap[slug] || "";
}

/** Check if the map has been loaded */
export function isImageMapLoaded(): boolean {
  return mapLoaded;
}

/** Get count of loaded images */
export function getImageMapSize(): number {
  return Object.keys(imageMap).length;
}

/** Subscribe to map updates */
type Listener = () => void;
const listeners: Listener[] = [];

export function onImageMapUpdate(fn: Listener): () => void {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

/**
 * Trigger server-side scraping of WordPress images.
 */
export async function triggerScrape(
  onProgress?: (info: { page: number; totalPages: number; saved: number; done: boolean; errors: string[]; debug: string[] }) => void,
  adminKey?: string
): Promise<{ totalSaved: number }> {
  let page = 1;
  let totalSaved = 0;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`${API_BASE}/scrape-images?page=${page}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${publicAnonKey}`,
        ...(adminKey ? { "X-Admin-Key": adminKey } : {}),
      },
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Scrape failed on page ${page}: ${res.status} ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    totalSaved += data.saved || 0;
    hasMore = data.hasMore || false;

    onProgress?.({
      page,
      totalPages: data.totalPages || 1,
      saved: totalSaved,
      done: !hasMore,
      errors: data.errors || [],
      debug: data.debug || [],
    });

    page++;
  }

  // Refresh image map after scraping
  mapLoadPromise = null;
  await loadImageMap();
  return { totalSaved };
}

// ── Legacy exports ──
export function preloadImages(): Promise<void> { return loadImageMap(); }
export function imagesReady(): boolean { return mapLoaded; }
export function getImageCacheSize(): number { return getImageMapSize(); }
export function cacheImageUrl(_slug: string, _url: string) {}
export function getCachedImageUrl(slug: string): string { return getCostumeImage(slug); }
export function getImageUrlGuesses(slug: string): string[] {
  const url = getCostumeImage(slug);
  return url ? [url] : [];
}