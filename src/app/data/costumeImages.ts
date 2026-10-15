// =============================================================================
// CostumesPlanet.com — Image Resolution
//
// Single source: our Supabase edge function (/image-map), which returns a
// slug -> signed Storage URL map for the private "costume-images" bucket.
//
// Images live in a PRIVATE bucket, so signed URLs are required — the public
// object URL returns "Bucket not found". Signed tokens are refreshed on every
// server response, which is why this module must never permanently cache a
// failure or trust a stale cache forever.
//
// Resilience rules (do not weaken these):
//   1. A failed fetch must NOT be memoised forever — it retries with backoff.
//   2. Cached URLs from a different host are discarded (they are dead).
//   3. A failed image load requests one fresh map, to pick up new tokens.
// =============================================================================

import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;
const STORAGE_HOST = `${projectId}.supabase.co`;

// Bumped v8 -> v9: v8 caches may still hold URLs from the retired WordPress
// host, which is suspended and can never serve images again.
const LOCAL_CACHE_KEY = "cp_image_urls_v9";

const MAX_ATTEMPTS = 4;
const BACKOFF_MS = [400, 900, 2000];
const AUTO_RETRY_DELAY_MS = 6000;
const MAX_AUTO_RETRIES = 4;

// ── In-memory URL map: slug -> signed image URL ──
let imageMap: Record<string, string> = {};
let mapLoaded = false;
let mapLoadPromise: Promise<void> | null = null;
let autoRetries = 0;
let inFlight = false;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Only accept URLs pointing at our own Storage host; anything else is stale. */
function isUsableUrl(url: unknown): url is string {
  return typeof url === "string" && url.startsWith(`https://${STORAGE_HOST}/`);
}

function readCache(): Record<string, string> {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const clean: Record<string, string> = {};
    for (const [slug, url] of Object.entries(parsed)) {
      if (isUsableUrl(url)) clean[slug] = url;
    }

    const dropped = Object.keys(parsed).length - Object.keys(clean).length;
    if (dropped > 0) {
      console.warn(`[costumeImages] Discarded ${dropped} stale cached URLs (wrong host)`);
    }
    return clean;
  } catch {
    return {};
  }
}

function writeCache(map: Record<string, string>): void {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(map));
  } catch {
    /* quota or private mode — caching is optional */
  }
}

// Seed from cache for instant first paint. The server fetch replaces it.
imageMap = readCache();
mapLoaded = Object.keys(imageMap).length > 0;
if (mapLoaded) {
  console.log(`[costumeImages] Seeded ${Object.keys(imageMap).length} images from localStorage`);
}

async function fetchImageMapOnce(): Promise<Record<string, string> | null> {
  const res = await fetch(`${API_BASE}/image-map`, {
    headers: { Authorization: `Bearer ${publicAnonKey}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  if (!data?.images || typeof data.images !== "object") return null;

  const clean: Record<string, string> = {};
  for (const [slug, url] of Object.entries(data.images)) {
    if (isUsableUrl(url)) clean[slug] = url;
  }
  return clean;
}

async function fetchImageMapFromServer(): Promise<void> {
  if (inFlight) return;
  inFlight = true;

  try {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        const map = await fetchImageMapOnce();

        if (map && Object.keys(map).length > 0) {
          imageMap = map;
          mapLoaded = true;
          autoRetries = 0;
          writeCache(imageMap);
          console.log(`[costumeImages] Loaded ${Object.keys(imageMap).length} images from server`);
          notifyListeners();
          return;
        }
        console.warn(`[costumeImages] Attempt ${attempt}: server returned no usable images`);
      } catch (err) {
        console.warn(`[costumeImages] Attempt ${attempt} failed:`, (err as Error).message);
      }

      if (attempt < MAX_ATTEMPTS) await sleep(BACKOFF_MS[attempt - 1] ?? 2000);
    }

    // Every attempt failed. Keep any cached map so the UI still has a chance,
    // but leave the door open for a later retry rather than latching failure.
    console.error("[costumeImages] All attempts failed — will retry in background");
    scheduleAutoRetry();
  } finally {
    inFlight = false;
  }
}

/**
 * A transient network failure must not pin the site to placeholders forever.
 * Retries a bounded number of times, then stops (no infinite request loop).
 */
function scheduleAutoRetry(): void {
  if (autoRetries >= MAX_AUTO_RETRIES) return;
  autoRetries++;
  setTimeout(() => {
    mapLoadPromise = null; // clear the memoised result so loadImageMap() re-fetches
    void loadImageMap();
  }, AUTO_RETRY_DELAY_MS);
}

/** Initialize the image map. Safe to call repeatedly — retries after failure. */
export function loadImageMap(): Promise<void> {
  if (!mapLoadPromise) {
    mapLoadPromise = fetchImageMapFromServer();
  }
  return mapLoadPromise;
}

/**
 * Force a re-fetch, e.g. after an image 403s because its signed token expired.
 *
 * Rate-limited: many <img> elements can fail at once (e.g. a batch of expired
 * tokens), and we must not turn that into a request storm.
 */
const REFRESH_COOLDOWN_MS = 10000;
let lastRefreshAt = 0;

/** Unconditional re-fetch — bypasses the cooldown. */
function forceRefreshImageMap(): Promise<void> {
  lastRefreshAt = Date.now();
  mapLoadPromise = null;
  autoRetries = 0;
  return loadImageMap();
}

export function refreshImageMap(): Promise<void> {
  if (Date.now() - lastRefreshAt < REFRESH_COOLDOWN_MS) {
    return mapLoadPromise ?? Promise.resolve();
  }
  return forceRefreshImageMap();
}

/** Get the signed image URL for a slug (empty string if unavailable) */
export function getCostumeImage(slug: string): string {
  return imageMap[slug] || "";
}

/** Check whether we currently hold any image URLs */
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

function notifyListeners(): void {
  for (const fn of listeners.slice()) {
    try {
      fn();
    } catch (err) {
      console.warn("[costumeImages] listener threw:", err);
    }
  }
}

/**
 * Trigger server-side scraping of WordPress images.
 */
export async function triggerScrape(
  onProgress?: (info: {
    page: number;
    totalPages: number;
    saved: number;
    done: boolean;
    errors: string[];
    debug: string[];
  }) => void,
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

  await forceRefreshImageMap();
  return { totalSaved };
}

// ── Legacy exports ──
export function preloadImages(): Promise<void> {
  return loadImageMap();
}
export function imagesReady(): boolean {
  return mapLoaded;
}
export function getImageCacheSize(): number {
  return getImageMapSize();
}
export function cacheImageUrl(_slug: string, _url: string): void {}
export function getCachedImageUrl(slug: string): string {
  return getCostumeImage(slug);
}
export function getImageUrlGuesses(slug: string): string[] {
  const url = getCostumeImage(slug);
  return url ? [url] : [];
}
