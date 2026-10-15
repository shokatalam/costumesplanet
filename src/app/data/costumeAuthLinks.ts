// =============================================================================
// CostumesPlanet.com — Authoritative Links Data
//
// Maps characters/categories to real, authoritative external sources
// (Wikipedia, IMDb, Fandom wikis, subreddits, official sites).
//
// Also generates contextual internal cross-links between related articles.
//
// These links signal E-E-A-T to Google and AI engines and help with
// topical clustering, site discovery, and ranking.
// =============================================================================

import { costumes, getCostumesByCategory, CostumeBlog } from "./costumes";

// ── Types ──

export interface ExternalLink {
  label: string;
  url: string;
  type: "wikipedia" | "imdb" | "fandom" | "reddit" | "official" | "youtube" | "reference";
}

export interface InternalLink {
  slug: string;
  title: string;
  anchor: string; // natural anchor text
}

export interface ArticleLinks {
  external: ExternalLink[];
  internal: InternalLink[];
}

// ── Character → external authority links ──
// Only real, verifiable URLs for the most popular characters

const CHARACTER_LINKS: Record<string, ExternalLink[]> = {
  // Game of Thrones
  "jon-snow": [
    { label: "Jon Snow on Wikipedia", url: "https://en.wikipedia.org/wiki/Jon_Snow_(character)", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
    { label: "r/gameofthrones community", url: "https://www.reddit.com/r/gameofthrones/", type: "reddit" },
    { label: "A Wiki of Ice and Fire", url: "https://awoiaf.westeros.org/index.php/Jon_Snow", type: "fandom" },
  ],
  "daenerys": [
    { label: "Daenerys Targaryen on Wikipedia", url: "https://en.wikipedia.org/wiki/Daenerys_Targaryen", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
    { label: "r/gameofthrones community", url: "https://www.reddit.com/r/gameofthrones/", type: "reddit" },
  ],
  "cersei": [
    { label: "Cersei Lannister on Wikipedia", url: "https://en.wikipedia.org/wiki/Cersei_Lannister", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
  ],
  "arya-stark": [
    { label: "Arya Stark on Wikipedia", url: "https://en.wikipedia.org/wiki/Arya_Stark", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
    { label: "r/gameofthrones community", url: "https://www.reddit.com/r/gameofthrones/", type: "reddit" },
  ],
  "sansa-stark": [
    { label: "Sansa Stark on Wikipedia", url: "https://en.wikipedia.org/wiki/Sansa_Stark", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
  ],
  "night-king": [
    { label: "Night King on Wikipedia", url: "https://en.wikipedia.org/wiki/Night_King_(Game_of_Thrones)", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
  ],
  "khal-drogo": [
    { label: "Khal Drogo on Wikipedia", url: "https://en.wikipedia.org/wiki/Khal_Drogo", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
  ],
  "tyrion": [
    { label: "Tyrion Lannister on Wikipedia", url: "https://en.wikipedia.org/wiki/Tyrion_Lannister", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
  ],
  "ned-stark": [
    { label: "Ned Stark on Wikipedia", url: "https://en.wikipedia.org/wiki/Ned_Stark", type: "wikipedia" },
    { label: "Game of Thrones on IMDb", url: "https://www.imdb.com/title/tt0944947/", type: "imdb" },
  ],
  // Marvel & DC
  "spider": [
    { label: "Spider-Man on Wikipedia", url: "https://en.wikipedia.org/wiki/Spider-Man", type: "wikipedia" },
    { label: "Spider-Man on Marvel.com", url: "https://www.marvel.com/characters/spider-man-peter-parker", type: "official" },
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
  ],
  "iron-man": [
    { label: "Iron Man on Wikipedia", url: "https://en.wikipedia.org/wiki/Iron_Man", type: "wikipedia" },
    { label: "Iron Man on Marvel.com", url: "https://www.marvel.com/characters/iron-man-tony-stark", type: "official" },
    { label: "Iron Man on IMDb", url: "https://www.imdb.com/title/tt0371746/", type: "imdb" },
  ],
  "captain-america": [
    { label: "Captain America on Wikipedia", url: "https://en.wikipedia.org/wiki/Captain_America", type: "wikipedia" },
    { label: "Captain America on Marvel.com", url: "https://www.marvel.com/characters/captain-america-steve-rogers", type: "official" },
  ],
  "thanos": [
    { label: "Thanos on Wikipedia", url: "https://en.wikipedia.org/wiki/Thanos", type: "wikipedia" },
    { label: "Thanos on Marvel.com", url: "https://www.marvel.com/characters/thanos", type: "official" },
  ],
  "gamora": [
    { label: "Gamora on Wikipedia", url: "https://en.wikipedia.org/wiki/Gamora", type: "wikipedia" },
    { label: "Gamora on Marvel.com", url: "https://www.marvel.com/characters/gamora", type: "official" },
  ],
  "homelander": [
    { label: "Homelander on Wikipedia", url: "https://en.wikipedia.org/wiki/Homelander", type: "wikipedia" },
    { label: "The Boys on IMDb", url: "https://www.imdb.com/title/tt1190634/", type: "imdb" },
    { label: "r/TheBoys community", url: "https://www.reddit.com/r/TheBoys/", type: "reddit" },
  ],
  "harley-quinn": [
    { label: "Harley Quinn on Wikipedia", url: "https://en.wikipedia.org/wiki/Harley_Quinn", type: "wikipedia" },
    { label: "Harley Quinn on DC.com", url: "https://www.dc.com/characters/harley-quinn", type: "official" },
  ],
  "daredevil": [
    { label: "Daredevil on Wikipedia", url: "https://en.wikipedia.org/wiki/Daredevil_(Marvel_Comics_character)", type: "wikipedia" },
    { label: "Daredevil on Marvel.com", url: "https://www.marvel.com/characters/daredevil-matt-murdock", type: "official" },
  ],
  "hawkeye": [
    { label: "Hawkeye on Wikipedia", url: "https://en.wikipedia.org/wiki/Hawkeye_(Clint_Barton)", type: "wikipedia" },
    { label: "Hawkeye on Marvel.com", url: "https://www.marvel.com/characters/hawkeye-clint-barton", type: "official" },
  ],
  // Anime
  "tanjiro": [
    { label: "Demon Slayer on Wikipedia", url: "https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba", type: "wikipedia" },
    { label: "Demon Slayer on MyAnimeList", url: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba", type: "reference" },
    { label: "r/KimetsuNoYaiba community", url: "https://www.reddit.com/r/KimetsuNoYaiba/", type: "reddit" },
  ],
  "inosuke": [
    { label: "Demon Slayer on Wikipedia", url: "https://en.wikipedia.org/wiki/Demon_Slayer:_Kimetsu_no_Yaiba", type: "wikipedia" },
    { label: "Demon Slayer on MyAnimeList", url: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba", type: "reference" },
  ],
  "levi-ackerman": [
    { label: "Attack on Titan on Wikipedia", url: "https://en.wikipedia.org/wiki/Attack_on_Titan", type: "wikipedia" },
    { label: "Attack on Titan on MyAnimeList", url: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin", type: "reference" },
    { label: "r/ShingekiNoKyojin community", url: "https://www.reddit.com/r/ShingekiNoKyojin/", type: "reddit" },
  ],
  // Gaming
  "jinx": [
    { label: "Jinx on League of Legends Wiki", url: "https://leagueoflegends.fandom.com/wiki/Jinx", type: "fandom" },
    { label: "Arcane on Wikipedia", url: "https://en.wikipedia.org/wiki/Arcane_(TV_series)", type: "wikipedia" },
    { label: "Arcane on IMDb", url: "https://www.imdb.com/title/tt11126994/", type: "imdb" },
    { label: "r/arcane community", url: "https://www.reddit.com/r/arcane/", type: "reddit" },
  ],
  "link-cosplay": [
    { label: "Link on Wikipedia", url: "https://en.wikipedia.org/wiki/Link_(The_Legend_of_Zelda)", type: "wikipedia" },
    { label: "Zelda Wiki", url: "https://zelda.fandom.com/wiki/Link", type: "fandom" },
  ],
  "zelda": [
    { label: "Princess Zelda on Wikipedia", url: "https://en.wikipedia.org/wiki/Princess_Zelda", type: "wikipedia" },
    { label: "Zelda Wiki", url: "https://zelda.fandom.com/wiki/Princess_Zelda", type: "fandom" },
  ],
  "tracer": [
    { label: "Tracer on Overwatch Wiki", url: "https://overwatch.fandom.com/wiki/Tracer", type: "fandom" },
    { label: "Overwatch on Wikipedia", url: "https://en.wikipedia.org/wiki/Overwatch_(video_game)", type: "wikipedia" },
  ],
  "misty": [
    { label: "Misty on Bulbapedia", url: "https://bulbapedia.bulbagarden.net/wiki/Misty_(anime)", type: "fandom" },
    { label: "Pokémon on Wikipedia", url: "https://en.wikipedia.org/wiki/Pok%C3%A9mon", type: "wikipedia" },
  ],
  // Disney
  "ariel": [
    { label: "Ariel on Wikipedia", url: "https://en.wikipedia.org/wiki/Ariel_(The_Little_Mermaid)", type: "wikipedia" },
    { label: "The Little Mermaid on IMDb", url: "https://www.imdb.com/title/tt0097757/", type: "imdb" },
    { label: "Disney Princess Wiki", url: "https://disney.fandom.com/wiki/Ariel", type: "fandom" },
  ],
  "peter-pan": [
    { label: "Peter Pan on Wikipedia", url: "https://en.wikipedia.org/wiki/Peter_Pan", type: "wikipedia" },
    { label: "Peter Pan on Disney Wiki", url: "https://disney.fandom.com/wiki/Peter_Pan_(character)", type: "fandom" },
  ],
  "tinkerbell": [
    { label: "Tinker Bell on Wikipedia", url: "https://en.wikipedia.org/wiki/Tinker_Bell", type: "wikipedia" },
    { label: "Tinker Bell on Disney Wiki", url: "https://disney.fandom.com/wiki/Tinker_Bell", type: "fandom" },
  ],
  "captain-hook": [
    { label: "Captain Hook on Wikipedia", url: "https://en.wikipedia.org/wiki/Captain_Hook", type: "wikipedia" },
    { label: "Captain Hook on Disney Wiki", url: "https://disney.fandom.com/wiki/Captain_Hook", type: "fandom" },
  ],
  // Steven Universe
  "steven-universe": [
    { label: "Steven Universe on Wikipedia", url: "https://en.wikipedia.org/wiki/Steven_Universe", type: "wikipedia" },
    { label: "Steven Universe on IMDb", url: "https://www.imdb.com/title/tt3061046/", type: "imdb" },
    { label: "r/stevenuniverse community", url: "https://www.reddit.com/r/stevenuniverse/", type: "reddit" },
  ],
  // Star Wars
  "darth-revan": [
    { label: "Darth Revan on Wookieepedia", url: "https://starwars.fandom.com/wiki/Darth_Revan", type: "fandom" },
    { label: "Star Wars on Wikipedia", url: "https://en.wikipedia.org/wiki/Star_Wars", type: "wikipedia" },
    { label: "r/StarWars community", url: "https://www.reddit.com/r/StarWars/", type: "reddit" },
  ],
  "anakin": [
    { label: "Anakin Skywalker on Wikipedia", url: "https://en.wikipedia.org/wiki/Anakin_Skywalker", type: "wikipedia" },
    { label: "Anakin on Wookieepedia", url: "https://starwars.fandom.com/wiki/Anakin_Skywalker", type: "fandom" },
  ],
  "bo-katan": [
    { label: "Bo-Katan on Wookieepedia", url: "https://starwars.fandom.com/wiki/Bo-Katan_Kryze", type: "fandom" },
    { label: "The Mandalorian on IMDb", url: "https://www.imdb.com/title/tt8111088/", type: "imdb" },
  ],
  "padme": [
    { label: "Padmé Amidala on Wikipedia", url: "https://en.wikipedia.org/wiki/Padm%C3%A9_Amidala", type: "wikipedia" },
    { label: "Padmé on Wookieepedia", url: "https://starwars.fandom.com/wiki/Padm%C3%A9_Amidala", type: "fandom" },
  ],
  "cad-bane": [
    { label: "Cad Bane on Wookieepedia", url: "https://starwars.fandom.com/wiki/Cad_Bane", type: "fandom" },
    { label: "Star Wars on Wikipedia", url: "https://en.wikipedia.org/wiki/Star_Wars", type: "wikipedia" },
  ],
  // Movie Characters
  "katniss": [
    { label: "Katniss Everdeen on Wikipedia", url: "https://en.wikipedia.org/wiki/Katniss_Everdeen", type: "wikipedia" },
    { label: "The Hunger Games on IMDb", url: "https://www.imdb.com/title/tt1392170/", type: "imdb" },
  ],
  "tyler-durden": [
    { label: "Fight Club on Wikipedia", url: "https://en.wikipedia.org/wiki/Fight_Club", type: "wikipedia" },
    { label: "Fight Club on IMDb", url: "https://www.imdb.com/title/tt0137523/", type: "imdb" },
  ],
  "scarface": [
    { label: "Scarface on Wikipedia", url: "https://en.wikipedia.org/wiki/Scarface_(1983_film)", type: "wikipedia" },
    { label: "Scarface on IMDb", url: "https://www.imdb.com/title/tt0086250/", type: "imdb" },
  ],
  "ferris-bueller": [
    { label: "Ferris Bueller on Wikipedia", url: "https://en.wikipedia.org/wiki/Ferris_Bueller%27s_Day_Off", type: "wikipedia" },
    { label: "Ferris Bueller on IMDb", url: "https://www.imdb.com/title/tt0091042/", type: "imdb" },
  ],
  "jack-torrance": [
    { label: "The Shining on Wikipedia", url: "https://en.wikipedia.org/wiki/The_Shining_(film)", type: "wikipedia" },
    { label: "The Shining on IMDb", url: "https://www.imdb.com/title/tt0081505/", type: "imdb" },
  ],
  "lucifer-morningstar": [
    { label: "Lucifer on Wikipedia", url: "https://en.wikipedia.org/wiki/Lucifer_(TV_series)", type: "wikipedia" },
    { label: "Lucifer on IMDb", url: "https://www.imdb.com/title/tt4052886/", type: "imdb" },
  ],
  "jesse-pinkman": [
    { label: "Jesse Pinkman on Wikipedia", url: "https://en.wikipedia.org/wiki/Jesse_Pinkman", type: "wikipedia" },
    { label: "Breaking Bad on IMDb", url: "https://www.imdb.com/title/tt0903747/", type: "imdb" },
  ],
  "joe-exotic": [
    { label: "Joe Exotic on Wikipedia", url: "https://en.wikipedia.org/wiki/Joe_Exotic", type: "wikipedia" },
    { label: "Tiger King on IMDb", url: "https://www.imdb.com/title/tt11823076/", type: "imdb" },
  ],
  // Cartoon Characters
  "dora": [
    { label: "Dora the Explorer on Wikipedia", url: "https://en.wikipedia.org/wiki/Dora_the_Explorer", type: "wikipedia" },
    { label: "Dora on IMDb", url: "https://www.imdb.com/title/tt0235917/", type: "imdb" },
  ],
  "she-ra": [
    { label: "She-Ra on Wikipedia", url: "https://en.wikipedia.org/wiki/She-Ra_and_the_Princesses_of_Power", type: "wikipedia" },
    { label: "She-Ra on IMDb", url: "https://www.imdb.com/title/tt7745956/", type: "imdb" },
  ],
};

// ── Category → general authority links ──

const CATEGORY_LINKS: Record<string, ExternalLink[]> = {
  "Game of Thrones": [
    { label: "Game of Thrones on Wikipedia", url: "https://en.wikipedia.org/wiki/Game_of_Thrones", type: "wikipedia" },
    { label: "r/gameofthrones", url: "https://www.reddit.com/r/gameofthrones/", type: "reddit" },
  ],
  "Marvel & DC": [
    { label: "Marvel Cinematic Universe on Wikipedia", url: "https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe", type: "wikipedia" },
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
  ],
  "Anime": [
    { label: "Anime cosplay on Wikipedia", url: "https://en.wikipedia.org/wiki/Cosplay", type: "wikipedia" },
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
    { label: "MyAnimeList", url: "https://myanimelist.net/", type: "reference" },
  ],
  "Gaming": [
    { label: "Video game cosplay on Wikipedia", url: "https://en.wikipedia.org/wiki/Cosplay", type: "wikipedia" },
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
  ],
  "Disney": [
    { label: "Disney on Wikipedia", url: "https://en.wikipedia.org/wiki/The_Walt_Disney_Company", type: "wikipedia" },
    { label: "Disney Wiki", url: "https://disney.fandom.com/", type: "fandom" },
  ],
  "Steven Universe": [
    { label: "Steven Universe on Wikipedia", url: "https://en.wikipedia.org/wiki/Steven_Universe", type: "wikipedia" },
    { label: "r/stevenuniverse", url: "https://www.reddit.com/r/stevenuniverse/", type: "reddit" },
  ],
  "Star Wars": [
    { label: "Star Wars on Wikipedia", url: "https://en.wikipedia.org/wiki/Star_Wars", type: "wikipedia" },
    { label: "Wookieepedia", url: "https://starwars.fandom.com/", type: "fandom" },
    { label: "r/StarWars", url: "https://www.reddit.com/r/StarWars/", type: "reddit" },
  ],
  "Movie Characters": [
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
    { label: "r/halloween community", url: "https://www.reddit.com/r/halloween/", type: "reddit" },
  ],
  "Cartoon Characters": [
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
  ],
  "Pop Culture": [
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
    { label: "r/halloween community", url: "https://www.reddit.com/r/halloween/", type: "reddit" },
  ],
  "Animated TV": [
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
  ],
  "DIY & Dance": [
    { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
    { label: "DIY costume ideas on Wikipedia", url: "https://en.wikipedia.org/wiki/Cosplay", type: "wikipedia" },
  ],
};

// General cosplay authority links (always included as fallback)
const GENERAL_COSPLAY_LINKS: ExternalLink[] = [
  { label: "Cosplay on Wikipedia", url: "https://en.wikipedia.org/wiki/Cosplay", type: "wikipedia" },
  { label: "r/cosplay community", url: "https://www.reddit.com/r/cosplay/", type: "reddit" },
  { label: "r/halloween community", url: "https://www.reddit.com/r/halloween/", type: "reddit" },
];

/**
 * Find the matching character key for a slug.
 */
function findCharacterKey(slug: string): string | null {
  const s = slug.toLowerCase();
  for (const key of Object.keys(CHARACTER_LINKS)) {
    if (s.includes(key)) return key;
  }
  return null;
}

/**
 * Get external authority links for a costume article.
 * Combines character-specific + category + general links.
 * Deduplicates by URL.
 */
export function getExternalLinks(slug: string, category: string): ExternalLink[] {
  const links: ExternalLink[] = [];
  const seenUrls = new Set<string>();

  // 1. Character-specific links (highest priority)
  const charKey = findCharacterKey(slug);
  if (charKey && CHARACTER_LINKS[charKey]) {
    for (const link of CHARACTER_LINKS[charKey]) {
      if (!seenUrls.has(link.url)) {
        links.push(link);
        seenUrls.add(link.url);
      }
    }
  }

  // 2. Category links
  if (CATEGORY_LINKS[category]) {
    for (const link of CATEGORY_LINKS[category]) {
      if (!seenUrls.has(link.url)) {
        links.push(link);
        seenUrls.add(link.url);
      }
    }
  }

  // 3. General cosplay links (ensure at least some coverage)
  if (links.length < 3) {
    for (const link of GENERAL_COSPLAY_LINKS) {
      if (!seenUrls.has(link.url)) {
        links.push(link);
        seenUrls.add(link.url);
      }
    }
  }

  return links.slice(0, 5); // cap at 5 external links
}

/**
 * Get contextual internal links for a costume article.
 * Returns 3-5 links to related articles in the same or adjacent categories.
 */
export function getInternalLinks(slug: string, category: string): InternalLink[] {
  const links: InternalLink[] = [];
  const sameCategory = getCostumesByCategory(category).filter((c) => c.slug !== slug);

  // 1. Same-category articles (most relevant for topical clustering)
  const sameCatLinks = sameCategory.slice(0, 3).map((c) => ({
    slug: c.slug,
    title: c.title,
    anchor: `${slugToCharName(c.slug)} costume guide`,
  }));
  links.push(...sameCatLinks);

  // 2. Cross-category articles (for broader site discovery)
  const otherCategories = costumes
    .filter((c) => c.category !== category && c.slug !== slug)
    .sort(() => Math.random() - 0.5) // light shuffle for variety
    .slice(0, 2)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      anchor: `${slugToCharName(c.slug)} ${c.category.toLowerCase()} costume`,
    }));
  links.push(...otherCategories);

  return links.slice(0, 5);
}

/**
 * Generate natural inline text with woven-in internal links for the intro section.
 * Returns an array of text segments with optional link info.
 */
export function getIntroInternalLinks(slug: string, category: string): { text: string; linkSlug?: string }[] {
  const sameCategory = getCostumesByCategory(category).filter((c) => c.slug !== slug);
  if (sameCategory.length < 2) return [];

  const pick1 = sameCategory[0];
  const pick2 = sameCategory[1];

  return [
    {
      text: `If you're into ${category} cosplay, you might also like our `,
    },
    {
      text: slugToCharName(pick1.slug) + " costume guide",
      linkSlug: pick1.slug,
    },
    {
      text: " and ",
    },
    {
      text: slugToCharName(pick2.slug) + " costume breakdown",
      linkSlug: pick2.slug,
    },
    {
      text: ".",
    },
  ];
}

/**
 * Get the link icon type label for display.
 */
export function getLinkTypeLabel(type: ExternalLink["type"]): string {
  switch (type) {
    case "wikipedia": return "Wikipedia";
    case "imdb": return "IMDb";
    case "fandom": return "Fan Wiki";
    case "reddit": return "Reddit";
    case "official": return "Official";
    case "youtube": return "YouTube";
    case "reference": return "Reference";
    default: return "Link";
  }
}

/** Helper to extract character name from slug */
function slugToCharName(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b(costume|cosplay|diy|halloween|outfits?|dress|suit|plus size|for cosplay|best|sexy|dance)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
