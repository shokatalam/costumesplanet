// =============================================================================
// Reddit Question Scraper for CostumesPlanet.com
//
// Searches Reddit for real questions people ask about each costume character.
// Uses Reddit's public JSON API (no auth required for basic search).
// Extracts questions from post titles in cosplay/halloween/costume subreddits.
//
// Storage:  kv key = "costume_reddit:{slug}"
//           kv value = { slug, questions: [{question, source, score}], scrapedAt }
// =============================================================================

import * as kv from "./kv_store.tsx";

const KV_PREFIX = "costume_reddit:";
const REDDIT_SEARCH = "https://www.reddit.com/search.json";
const USER_AGENT = "CostumesPlanet-RedditScraper/1.0 (by CostumesPlanet.com)";
const BATCH_SIZE = 5; // Fewer per batch — Reddit rate limits aggressively

export interface RedditQuestion {
  question: string;
  source: string; // subreddit
  score: number;
}

interface RedditScrapeResult {
  page: number;
  processed: number;
  saved: number;
  totalQuestions: number;
  hasMore: boolean;
  errors: string[];
  debug: string[];
}

// Slug list to iterate in batches
const ALL_SLUGS = [
  "evil-dead-ash-costume", "spider-web-woman-costume", "maeve-millay-costume",
  "nooshy-sing-2-costume", "emporio-cosplay", "uncle-fester-costume-plus-size",
  "ratcatcher-2-costume", "evil-morty-costume", "talisman-ballet-costume",
  "diy-dude-costume", "phantom-of-the-opera-red-death-costume", "lord-farquaad-halloween-costume",
  "queen-oona-costume", "diy-ginny-weasley-costume", "night-king-costume",
  "jaime-lannister-costume", "chloe-decker-costume", "moose-finbar-costume",
  "allison-costume-for-cosplay", "sansa-stark-halloween-costume", "lucy-wilde-despicable-me-costume",
  "daniel-tiger-costume-diy", "nathan-drake-halloween-costume", "padme-sexy-costume",
  "be-our-guest-costumes", "dorothy-dance-costume", "mr-bill-costume",
  "mary-poppins-dance-costume", "lucifer-morningstar-costume", "deadshot-cosplay",
  "jon-snow-costume", "linkle-cosplay-costume", "brian-griffin-costume",
  "jinx-cosplay-costume", "homelander-cosplay", "best-ariel-costume",
  "melisandre-costume", "gru-costume-cosplay", "khal-drogo-costume",
  "hamburglar-costume", "slash-guns-n-roses-costume", "scarface-costume",
  "blues-brothers-costume", "dr-evil-costume-diy", "yelena-belova-costume",
  "natasha-romanoff-costume-diy", "best-cammy-costume", "jesse-pinkman-outfits",
  "young-justice-robin-cosplay-costume", "joyce-byers-costume", "ember-mclain-cosplay",
  "best-amanda-costume", "princess-isabel-costume", "rick-astley-costume",
  "taskmaster-cosplay-costume", "diy-starlight-costume", "tyler-durden-costume",
  "diy-sloane-peterson-costume", "ferb-costume-for-cosplay", "perry-the-platypus-costume",
  "jane-jetson-costume", "katniss-everdeen-costume", "spinelli-costume",
  "dora-the-explorer-costume", "she-ra-cosplay-costume", "blade-costume",
  "angela-abar-costume", "dick-dastardly-costume", "tanjiro-kamado-costume",
  "barbara-maitland-costume", "xayah-costume-cosplay", "hawkeye-cosplay-costume",
  "jorgen-von-strangle-costume", "shy-guy-costume", "dexters-laboratory-halloween-costume",
  "misty-pokemon-cosplay", "joe-exotic-costume", "van-helsing-costume",
  "atomic-blonde-costume", "sombra-costume-cosplay", "wild-card-costume",
  "deathstroke-costume", "max-mayfield-costume", "captain-hook-costume",
  "lily-houghton-costume", "wendy-darling-costume", "iron-spider-costume",
  "king-bob-halloween-costume", "mr-smee-costume", "daenerys-targaryen-cosplay",
  "diy-peter-pan-costume", "cersei-lannister-costume", "tinkerbell-cosplay-costume",
  "joffrey-baratheon-costume", "inosuke-hashibira-costume", "arya-stark-costume",
  "mitsuri-kanroji-cosplay", "giyu-tomioka-costume", "iron-man-age-of-ultron-suit",
  "fat-thor-costume", "tj-detweiler-costume", "manjiro-sano-costume",
  "chifuyu-matsuno-cosplay", "thanos-cosplay", "pirate-steve-costume",
  "gamora-costume", "hinata-tachibana-cosplay", "captain-america-costume",
  "takemichi-hanagaki-cosplay", "daredevil-black-suit", "diy-blossom-costume",
  "darth-revan-cosplay", "link-cosplay", "diy-ferris-bueller-costume",
  "tracer-cosplay", "cad-bane-costume", "ashe-costume",
  "anakin-cosplay", "cal-kestis-cosplay", "brigitte-costume",
  "grillmaster-76-cosplay", "ygritte-costume", "steven-universe-costume",
  "elena-avalor-cosplay", "tyrell-cosplay", "jack-torrance-costume",
  "wendy-torrance-costume", "gray-worm-costume", "briar-rose-cosplay-dress",
  "prince-phillip-cosplay", "princess-aurora-cosplay", "missandei-costume",
  "rose-quartz-cosplay", "stevonnie-costume", "levi-ackerman-cosplay",
  "buck-dewey-cosplay", "direwolf-costume", "opal-costume",
  "lapis-lazuli-dress", "puma-costume", "yellow-pearl-cosplay",
  "gene-belcher-costume", "amethyst-costume", "sardonyx-costume",
  "chris-griffin-costume", "meg-griffin-costume", "stewie-griffin-costume",
  "queen-miranda-costume", "lol-evelynn-cosplay", "miss-fortune-costume",
  "cameron-frye-costume", "harley-quinn-cosplay", "killer-croc-costume",
  "captain-boomerangs-cosplay", "honeydew-mei-costume", "mccree-costume",
  "pink-diamond-dress", "timmy-turner-costume", "lucio-costume",
  "soldier-76-costume", "reaper-cosplay", "gretchen-grundler-cosplay",
  "princess-zelda-dress", "ahri-costume", "janna-costume",
  "katarina-cosplay", "zoe-costume", "ezreal-costume",
  "star-guardian-soraka-costume", "akali-cosplay", "alice-in-wonderland-dance-costume",
  "stefan-salvatore-outfits", "ned-stark-costume", "zombie-spiderman-costume",
  "tyrion-lannister-costume", "linda-belcher-costume", "oliver-twist-costume",
  "katherine-pierce-outfits", "fix-it-felix-costume", "brock-pokemon-costume",
  "blue-diamond-cosplay", "troy-bolton-cosplay", "gabriella-montez-costume",
  "puss-in-boots-costume", "peter-griffin-costume", "jar-jar-binks-costume",
  "johnny-cage-costumes", "professor-utonium-costume", "christine-daae-costume",
  "white-goodman-costume", "bo-katan-kryze-costume", "miss-bellum-costume",
  "mommy-long-legs-costume", "mojo-jojo-costume", "carl-spackler-costume",
  "the-cousin-eddie-dickie-costume", "dolores-umbridge-costume", "sing-ash-costume",
  "mike-ditka-costume", "gargamel-costume",
];

/**
 * Extract clean character name from slug for Reddit search.
 */
function slugToSearchQuery(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b(costume|cosplay|diy|halloween|outfits?|dress|suit|plus size|for cosplay|best|sexy|dance)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Check if a Reddit title is a question (contains question patterns).
 */
function isQuestion(title: string): boolean {
  const t = title.toLowerCase().trim();
  // Starts with question word
  if (/^(how|what|where|which|can|does|is|are|should|would|could|will|do|has|have|any|anyone|anybody|need|looking|help|tips|advice|recommendations?)\b/.test(t)) return true;
  // Ends with question mark
  if (t.endsWith("?")) return true;
  // Common Reddit patterns
  if (/\b(help me|need help|any tips|any advice|looking for|recommendations?|suggest|where (to|can|do|should)|how (to|do|can|should))\b/i.test(t)) return true;
  return false;
}

/**
 * Clean up a Reddit question title for use as an FAQ.
 */
function cleanQuestion(title: string): string {
  let q = title
    // Remove Reddit formatting
    .replace(/\[([^\]]*)\]/g, "")
    .replace(/\(([^)]*)\)/g, "")
    // Remove sub-specific prefixes
    .replace(/^(question|help|advice|tips|diy|request|discussion)\s*[:\-–—]\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();

  // Ensure it ends with question mark if it's a question
  if (!q.endsWith("?") && isQuestion(q)) {
    q += "?";
  }

  // Capitalize first letter
  q = q.charAt(0).toUpperCase() + q.slice(1);

  return q;
}

/**
 * Search Reddit for questions about a specific costume.
 */
async function searchReddit(charName: string): Promise<RedditQuestion[]> {
  const questions: RedditQuestion[] = [];
  const seenTitles = new Set<string>();

  // Search queries — try multiple angles
  const queries = [
    `${charName} costume`,
    `${charName} cosplay`,
    `${charName} halloween costume`,
  ];

  for (const query of queries) {
    try {
      const url = `${REDDIT_SEARCH}?q=${encodeURIComponent(query)}&sort=relevance&limit=25&type=link&restrict_sr=false`;

      const res = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          "Accept": "application/json",
        },
      });

      if (res.status === 429) {
        // Rate limited — wait and skip
        console.log(`[reddit-scraper] Rate limited on query: ${query}`);
        await new Promise((r) => setTimeout(r, 3000));
        continue;
      }

      if (!res.ok) {
        console.log(`[reddit-scraper] Reddit returned ${res.status} for: ${query}`);
        continue;
      }

      const data = await res.json();
      const posts = data?.data?.children || [];

      for (const post of posts) {
        const d = post.data;
        if (!d?.title) continue;

        const title = d.title;
        const sub = d.subreddit || "unknown";
        const score = d.score || 0;
        const titleLower = title.toLowerCase();

        // Skip if already seen
        if (seenTitles.has(titleLower)) continue;
        seenTitles.add(titleLower);

        // Only keep questions or helpful discussion titles
        if (!isQuestion(title) && score < 10) continue;

        // Skip irrelevant or NSFW
        if (d.over_18) continue;
        if (titleLower.length < 15 || titleLower.length > 300) continue;

        const cleaned = cleanQuestion(title);
        if (cleaned.length < 15) continue;

        questions.push({
          question: cleaned,
          source: sub,
          score,
        });
      }

      // Small delay between queries to be respectful
      await new Promise((r) => setTimeout(r, 1200));
    } catch (err: any) {
      console.log(`[reddit-scraper] Error searching "${query}": ${err?.message}`);
    }
  }

  // Sort by score (most upvoted = most relevant)
  questions.sort((a, b) => b.score - a.score);

  // Return top 5 unique questions
  return questions.slice(0, 5);
}

/**
 * Scrape Reddit questions for a batch of costumes.
 */
export async function scrapeRedditQuestions(page: number = 1): Promise<RedditScrapeResult> {
  const errors: string[] = [];
  const debug: string[] = [];
  let totalQuestions = 0;

  const totalPages = Math.ceil(ALL_SLUGS.length / BATCH_SIZE);
  const startIdx = (page - 1) * BATCH_SIZE;
  const endIdx = Math.min(startIdx + BATCH_SIZE, ALL_SLUGS.length);
  const batch = ALL_SLUGS.slice(startIdx, endIdx);

  if (batch.length === 0) {
    return { page, processed: 0, saved: 0, totalQuestions: 0, hasMore: false, errors: ["No more slugs to process"], debug: [] };
  }

  debug.push(`Page ${page}/${totalPages}: processing slugs ${startIdx + 1}-${endIdx} of ${ALL_SLUGS.length}`);

  const keys: string[] = [];
  const values: any[] = [];

  for (const slug of batch) {
    const charName = slugToSearchQuery(slug);
    debug.push(`Searching Reddit for: "${charName}" (${slug})`);

    try {
      const questions = await searchReddit(charName);
      totalQuestions += questions.length;

      debug.push(`  → Found ${questions.length} questions${questions.length > 0 ? ": " + questions[0].question.slice(0, 60) + "..." : ""}`);

      keys.push(`${KV_PREFIX}${slug}`);
      values.push({
        slug,
        charName,
        questions,
        questionCount: questions.length,
        scrapedAt: new Date().toISOString(),
      });

      // Delay between slugs to respect Reddit rate limits
      await new Promise((r) => setTimeout(r, 2000));
    } catch (err: any) {
      errors.push(`${slug}: ${err?.message || err}`);
      console.log(`[reddit-scraper] Error for ${slug}: ${err?.message}`);
    }
  }

  // Batch save to kv
  if (keys.length > 0) {
    await kv.mset(keys, values);
    debug.push(`Saved ${keys.length} slugs to KV store`);
  }

  return {
    page,
    processed: batch.length,
    saved: keys.length,
    totalQuestions,
    hasMore: endIdx < ALL_SLUGS.length,
    errors,
    debug,
  };
}

/**
 * Get all Reddit questions from kv store.
 */
export async function getRedditMap(): Promise<Record<string, any>> {
  const allKeys = ALL_SLUGS.map((s) => `${KV_PREFIX}${s}`);
  const results = await kv.mget(allKeys);

  const map: Record<string, any> = {};
  for (const item of results) {
    if (item && item.slug) {
      map[item.slug] = {
        questions: item.questions || [],
        questionCount: item.questionCount || 0,
      };
    }
  }
  return map;
}
