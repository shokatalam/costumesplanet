// =============================================================================
// CostumesPlanet.com — Real Product Items + Amazon Affiliate Links
//
// Items are scraped from WordPress post content server-side. Each article's
// actual product names and their Amazon affiliate URLs are extracted and stored.
// This module loads them and provides them to components so they replace the
// generated placeholder items entirely.
// =============================================================================

import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;
const LOCAL_CACHE_KEY = "cp_item_map_v2";

export interface ScrapedItem {
  name: string;
  url: string;
}

interface SlugData {
  items: ScrapedItem[];
  title: string;
  itemCount: number;
}

// ── In-memory item map ──
let itemMap: Record<string, SlugData> = {};
let mapLoaded = false;
let mapLoadPromise: Promise<void> | null = null;

// Load from localStorage on init (instant)
try {
  const cached = localStorage.getItem(LOCAL_CACHE_KEY);
  if (cached) {
    itemMap = JSON.parse(cached);
    if (Object.keys(itemMap).length > 0) {
      mapLoaded = true;
    }
  }
} catch { /* ignore */ }

// ── Listeners ──
type Listener = () => void;
const listeners: Listener[] = [];

export function onItemMapUpdate(fn: Listener): () => void {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

// ── Fetch from server ──
async function fetchItemMapFromServer(): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/item-map`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    if (!res.ok) {
      console.error(`[costumeLinks] item-map response ${res.status}`);
      return;
    }
    const data = await res.json();
    if (data?.items && typeof data.items === "object") {
      itemMap = data.items;
      mapLoaded = true;
      try {
        localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(itemMap));
      } catch { /* quota exceeded */ }
      const totalItems = Object.values(itemMap).reduce((sum, d) => sum + (d.itemCount || 0), 0);
      console.log(`[costumeLinks] Loaded ${Object.keys(itemMap).length} slugs with ${totalItems} total items`);
      notifyListeners();
    }
  } catch (err) {
    console.warn("[costumeLinks] Failed to fetch item map:", err);
  }
}

/** Initialize. Call once on app start. */
export function loadItemMap(): Promise<void> {
  if (!mapLoadPromise) {
    mapLoadPromise = fetchItemMapFromServer();
  }
  return mapLoadPromise;
}

/** 
 * Get real scraped items for a slug.
 * Returns the array of {name, url} if available, or null if not scraped yet.
 * Only returns items that have valid URLs to prevent broken links.
 */
export function getScrapedItems(slug: string): ScrapedItem[] | null {
  const data = itemMap[slug];
  if (!data || !data.items || data.items.length === 0) return null;
  // Filter to only items with valid URLs — safety net against broken links
  const valid = data.items.filter(
    (item) => item.url && item.name && item.url.startsWith("http")
  );
  return valid.length > 0 ? valid : null;
}

/** Get item map size */
export function getItemMapSize(): number {
  return Object.keys(itemMap).length;
}

/** Get total items across all slugs */
export function getTotalItemCount(): number {
  return Object.values(itemMap).reduce((sum, d) => sum + (d.itemCount || 0), 0);
}

/** Check if loaded */
export function isItemMapLoaded(): boolean {
  return mapLoaded;
}

/**
 * Trigger server-side scraping of product items from WP content.
 * Requires admin key for authentication.
 */
export async function triggerItemScrape(
  onProgress?: (info: { page: number; totalPages: number; saved: number; totalItems: number; done: boolean; errors: string[]; debug: string[] }) => void,
  adminKey?: string
): Promise<{ totalSaved: number; totalItems: number }> {
  let page = 1;
  let totalSaved = 0;
  let totalItems = 0;
  let hasMore = true;

  while (hasMore) {
    let res: Response;
    try {
      res = await fetch(`${API_BASE}/scrape-items?page=${page}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
          ...(adminKey ? { "X-Admin-Key": adminKey } : {}),
        },
      });
    } catch (fetchErr: any) {
      throw new Error(`Network error on page ${page}: ${fetchErr?.message || fetchErr}`);
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Item scrape failed on page ${page}: ${res.status} ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    totalSaved += data.saved || 0;
    totalItems += data.totalItems || 0;
    hasMore = data.hasMore || false;

    console.log(`[item-scrape] Page ${page}/${data.totalPages}: saved=${data.saved}, items=${data.totalItems}`, data.debug);

    onProgress?.({
      page,
      totalPages: data.totalPages || 1,
      saved: totalSaved,
      totalItems,
      done: !hasMore,
      errors: data.errors || [],
      debug: data.debug || [],
    });

    page++;
  }

  // Refresh item map
  mapLoadPromise = null;
  await loadItemMap();

  return { totalSaved, totalItems };
}