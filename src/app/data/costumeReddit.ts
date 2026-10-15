// =============================================================================
// CostumesPlanet.com — Reddit Questions Data Layer
//
// Loads real Reddit questions scraped per costume slug. These get prepended
// to each blog post's FAQ section, giving real community-sourced Q&As.
// =============================================================================

import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;
const LOCAL_CACHE_KEY = "cp_reddit_map_v1";

export interface RedditQuestion {
  question: string;
  source: string;
  score: number;
}

interface SlugRedditData {
  questions: RedditQuestion[];
  questionCount: number;
}

// ── In-memory store ──
let redditMap: Record<string, SlugRedditData> = {};
let mapLoaded = false;
let mapLoadPromise: Promise<void> | null = null;

// Load from localStorage on init
try {
  const cached = localStorage.getItem(LOCAL_CACHE_KEY);
  if (cached) {
    redditMap = JSON.parse(cached);
    if (Object.keys(redditMap).length > 0) mapLoaded = true;
  }
} catch { /* ignore */ }

// ── Listeners ──
type Listener = () => void;
const listeners: Listener[] = [];

export function onRedditMapUpdate(fn: Listener): () => void {
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
async function fetchRedditMap(): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/reddit-map`, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    if (!res.ok) {
      console.error(`[costumeReddit] reddit-map response ${res.status}`);
      return;
    }
    const data = await res.json();
    if (data?.questions && typeof data.questions === "object") {
      redditMap = data.questions;
      mapLoaded = true;
      try {
        localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(redditMap));
      } catch { /* quota */ }
      console.log(`[costumeReddit] Loaded Reddit questions for ${Object.keys(redditMap).length} slugs`);
      notifyListeners();
    }
  } catch (err) {
    console.warn("[costumeReddit] Failed to fetch Reddit map:", err);
  }
}

/** Initialize — call on app start */
export function loadRedditMap(): Promise<void> {
  if (!mapLoadPromise) {
    mapLoadPromise = fetchRedditMap();
  }
  return mapLoadPromise;
}

/** Get Reddit questions for a slug */
export function getRedditQuestions(slug: string): RedditQuestion[] | null {
  const data = redditMap[slug];
  if (!data || !data.questions || data.questions.length === 0) return null;
  return data.questions;
}

/** Get map size */
export function getRedditMapSize(): number {
  return Object.keys(redditMap).length;
}

/** Check if loaded */
export function isRedditMapLoaded(): boolean {
  return mapLoaded;
}

/**
 * Trigger Reddit scraping from the ScrapePanel.
 * Requires admin key for authentication.
 */
export async function triggerRedditScrape(
  onProgress?: (info: { page: number; processed: number; saved: number; totalQuestions: number; done: boolean; errors: string[]; debug: string[]; totalPages: number }) => void,
  adminKey?: string
): Promise<{ totalSaved: number; totalQuestions: number }> {
  let page = 1;
  let totalSaved = 0;
  let totalQuestions = 0;
  let hasMore = true;

  while (hasMore) {
    let res: Response;
    try {
      res = await fetch(`${API_BASE}/scrape-reddit?page=${page}`, {
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
      throw new Error(`Reddit scrape failed on page ${page}: ${res.status} ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    totalSaved += data.saved || 0;
    totalQuestions += data.totalQuestions || 0;
    hasMore = data.hasMore || false;

    console.log(`[reddit-scrape] Page ${page}: processed=${data.processed}, questions=${data.totalQuestions}`, data.debug);

    onProgress?.({
      page,
      processed: data.processed || 0,
      saved: totalSaved,
      totalQuestions,
      done: !hasMore,
      errors: data.errors || [],
      debug: data.debug || [],
      totalPages: Math.ceil(195 / 5), // ~39 batches of 5
    });

    page++;
  }

  // Refresh map
  mapLoadPromise = null;
  await loadRedditMap();

  return { totalSaved, totalQuestions };
}