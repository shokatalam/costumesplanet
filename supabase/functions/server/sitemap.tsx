// =============================================================================
// Sitemap Generator — costumesplanet.com
//
// Uses the same mechanism as WordPress core sitemaps:
//   - Proper Content-Type: application/xml headers (served from edge function)
//   - Sitemap index → sub-sitemaps structure
//   - Minimal format: <loc> + <lastmod> only (no priority/changefreq)
//   - Full ISO 8601 timestamps
//   - XSL stylesheet references
//   - X-Robots-Tag: noindex on sitemap responses
//
// Produces:
//   - /sitemap.xml               → Sitemap index
//   - /sitemap-posts-1.xml       → Blog posts
//   - /sitemap-pages-1.xml       → Static pages
//   - /sitemap-categories-1.xml  → Category taxonomy pages
//   - /robots.txt                → Crawler directives
//   - /llms.txt                  → AI crawler guide
// =============================================================================

const SITE_URL = "https://costumesplanet.com";

// Edge function base — sub-sitemap <loc> tags point here so Google gets
// real application/xml directly without a redirect chain.
// Once the Cloudflare Worker is deployed, change these to SITE_URL.
const EDGE_URL = "https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15";

// ── All costume slugs (must match frontend data) ──
const slugs = [
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
  // ── GSC-indexed pages recovered ──
  "the-goonies-adult-sloth-costume", "vexy-smurf-costume", "tower-of-terror-costume",
  "pablo-escobar-costume", "dr-heinz-doofenshmirtz-costume", "diy-kim-possible-costume",
  "dexter-morgan-costume", "he-man-costume", "captain-marvel-costume",
  "adult-skeletor-costume", "foxy-cleopatra-outfit", "casey-becker-costume",
  "sexy-cupid-costume", "the-deep-costume", "laurie-strode-costume",
  "jordan-belfort-costume", "midas-costume", "mean-girls-christmas-costume",
  "omega-fortnite-costume", "joe-biden-costume", "a-train-costume",
  "namaari-costume", "george-jetson-costume", "trolls-dj-suki-costume-for-toddlers",
  "elroy-jetson-costume", "brainy-smurf-costume", "killer-frost-costume",
  "blippi-mascot-costume", "female-marvin-the-martian-costume", "deadpool-cosplay",
  "hackus-smurf-costume", "deluxe-grinch-costume", "grady-twins-costume",
  "smurfette-plus-size-costume", "nightwing-young-justice-costume", "free-guy-costume",
  "moana-running-costume", "emma-frost-costume", "barney-rubble-costume",
  "zoey-cosplay", "the-exorcist-costume",
];

// ── Category mapping (must match frontend categorize()) ──
function categorize(slug: string): string {
  const s = slug.toLowerCase();
  const got = ["night-king", "jaime-lannister", "sansa-stark", "jon-snow", "melisandre", "khal-drogo", "daenerys-targaryen", "cersei-lannister", "joffrey-baratheon", "arya-stark", "ygritte", "gray-worm", "missandei", "ned-stark", "tyrion-lannister", "direwolf"];
  if (got.some((k) => s.includes(k))) return "Game of Thrones";
  const marvel = ["yelena-belova", "natasha-romanoff", "iron-spider", "captain-america", "thanos", "gamora", "fat-thor", "iron-man", "hawkeye", "daredevil", "zombie-spiderman"];
  if (marvel.some((k) => s.includes(k))) return "Marvel & DC";
  const dc = ["harley-quinn", "deadshot", "deathstroke", "killer-croc", "captain-boomerang", "ratcatcher", "deadpool", "captain-marvel", "emma-frost", "killer-frost", "nightwing", "a-train", "the-deep", "blade", "taskmaster", "homelander"];
  if (dc.some((k) => s.includes(k))) return "Marvel & DC";
  const anime = ["tanjiro-kamado", "inosuke-hashibira", "mitsuri-kanroji", "giyu-tomioka", "levi-ackerman", "manjiro-sano", "chifuyu-matsuno", "hinata-tachibana", "takemichi-hanagaki", "emporio"];
  if (anime.some((k) => s.includes(k))) return "Anime";
  const gaming = ["jinx", "linkle", "link-cosplay", "tracer", "sombra", "brigitte", "soldier-76", "reaper", "lucio", "mccree", "honeydew-mei", "grillmaster-76", "ahri", "miss-fortune", "katarina", "lol-evelynn", "janna", "zoe", "ezreal", "star-guardian-soraka", "akali", "ashe-costume", "xayah", "misty-pokemon", "brock-pokemon", "princess-zelda", "shy-guy", "wild-card", "cal-kestis", "darth-revan", "cad-bane"];
  if (gaming.some((k) => s.includes(k))) return "Gaming";
  const disney = ["best-ariel", "captain-hook", "wendy-darling", "tinkerbell", "peter-pan", "mr-smee", "princess-aurora", "prince-phillip", "briar-rose", "elena-avalor", "queen-miranda", "princess-isabel", "be-our-guest", "alice-in-wonderland", "dora-the-explorer", "king-bob", "lucy-wilde", "gru-costume", "nooshy-sing", "puss-in-boots", "fix-it-felix", "daniel-tiger", "sing-ash"];
  if (disney.some((k) => s.includes(k))) return "Disney";
  const su = ["steven-universe", "rose-quartz", "stevonnie", "opal", "lapis-lazuli", "amethyst-costume", "sardonyx", "pink-diamond", "blue-diamond", "yellow-pearl", "buck-dewey"];
  if (su.some((k) => s.includes(k))) return "Steven Universe";
  const sw = ["padme", "anakin", "jar-jar-binks", "bo-katan"];
  if (sw.some((k) => s.includes(k))) return "Star Wars";
  const horror = ["exorcist", "casey-becker", "laurie-strode", "tower-of-terror", "grady-twins"];
  if (horror.some((k) => s.includes(k))) return "Horror";
  const smurf = ["smurf", "smurfette", "gargamel", "brainy-smurf", "hackus", "vexy"];
  if (smurf.some((k) => s.includes(k))) return "Smurfs";
  const retro = ["he-man", "skeletor", "barney-rubble", "george-jetson", "elroy-jetson", "goonies"];
  if (retro.some((k) => s.includes(k))) return "Classic TV & Film";
  const gaming2 = ["omega-fortnite", "midas-costume", "zoey-cosplay"];
  if (gaming2.some((k) => s.includes(k))) return "Gaming";
  const cartoon2 = ["dj-suki", "blippi", "kim-possible", "marvin-the-martian", "doofenshmirtz", "perry-the-platypus"];
  if (cartoon2.some((k) => s.includes(k))) return "Cartoon Characters";
  const movie2 = ["jordan-belfort", "free-guy", "mean-girls", "foxy-cleopatra"];
  if (movie2.some((k) => s.includes(k))) return "Movie Characters";
  if (s.includes("moana") || s.includes("namaari")) return "Disney";
  return "Pop Culture";
}

const allCategories = [...new Set(slugs.map(categorize))].sort();

// ── Generate lastmod timestamps (full ISO 8601 like WordPress) ──
function generateLastmod(index: number, total: number): string {
  const baseDate = new Date("2026-02-28T12:00:00+00:00");
  const daysBack = Math.floor((index / total) * 55);
  const d = new Date(baseDate);
  d.setDate(d.getDate() - daysBack);
  return d.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

// ── XML escape ──
function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// =============================================================================
// Sitemap Index (/sitemap.xml)
// =============================================================================
export function generateSitemapIndex(): string {
  const latestMod = generateLastmod(0, slugs.length);

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="${SITE_URL}/sitemap-index.xsl" ?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `\t<sitemap>`,
    `\t\t<loc>${EDGE_URL}/sitemap-posts-1.xml</loc>`,
    `\t\t<lastmod>${latestMod}</lastmod>`,
    `\t</sitemap>`,
    `\t<sitemap>`,
    `\t\t<loc>${EDGE_URL}/sitemap-pages-1.xml</loc>`,
    `\t\t<lastmod>${latestMod}</lastmod>`,
    `\t</sitemap>`,
    `\t<sitemap>`,
    `\t\t<loc>${EDGE_URL}/sitemap-categories-1.xml</loc>`,
    `\t\t<lastmod>${latestMod}</lastmod>`,
    `\t</sitemap>`,
    `</sitemapindex>`,
  ].join("\n");
}

// =============================================================================
// Posts Sitemap (/sitemap-posts-1.xml)
// =============================================================================
export function generatePostsSitemap(): string {
  const urls = slugs.map((slug, i) => {
    const lastmod = generateLastmod(i, slugs.length);
    return [
      `\t<url>`,
      `\t\t<loc>${SITE_URL}/${slug}/</loc>`,
      `\t\t<lastmod>${lastmod}</lastmod>`,
      `\t</url>`,
    ].join("\n");
  }).join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="${SITE_URL}/sitemap.xsl" ?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls,
    `</urlset>`,
  ].join("\n");
}

// =============================================================================
// Pages Sitemap (/sitemap-pages-1.xml)
// =============================================================================
export function generatePagesSitemap(): string {
  const latestMod = generateLastmod(0, slugs.length);
  const pages = [
    "/",
    "/categories/",
    "/search/",
    "/sitemap/",
    "/build/",
    "/about-us/",
    "/terms-of-use/",
    "/halloween-costume-generator/",
    "/ai-costume-generator/",
    "/random-costume-generator/",
    "/superhero-costume-generator/",
    "/costume-generator/",
    "/spirit-halloween-costume-generator/",
  ];

  const urls = pages.map((loc) => [
    `\t<url>`,
    `\t\t<loc>${SITE_URL}${loc}</loc>`,
    `\t\t<lastmod>${latestMod}</lastmod>`,
    `\t</url>`,
  ].join("\n")).join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="${SITE_URL}/sitemap.xsl" ?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls,
    `</urlset>`,
  ].join("\n");
}

// =============================================================================
// Categories Sitemap (/sitemap-categories-1.xml)
// =============================================================================
export function generateCategoriesSitemap(): string {
  const urls = allCategories.map((cat) => [
    `\t<url>`,
    `\t\t<loc>${SITE_URL}/category/${xmlEscape(encodeURIComponent(cat))}/</loc>`,
    `\t</url>`,
  ].join("\n")).join("\n");

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<?xml-stylesheet type="text/xsl" href="${SITE_URL}/sitemap.xsl" ?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls,
    `</urlset>`,
  ].join("\n");
}

// =============================================================================
// Robots.txt — Sitemap directive points to edge function (serves real XML)
// =============================================================================
export function generateRobotsTxt(): string {
  return `# CostumesPlanet.com Robots.txt
# https://costumesplanet.com

User-agent: *
Allow: /
Disallow: /search?*
Disallow: /api/

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Google
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

# Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Yandex
User-agent: YandexBot
Allow: /
Crawl-delay: 2

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /
`;
}

// =============================================================================
// llms.txt
// =============================================================================
export function generateLlmsTxt(): string {
  const catList = allCategories.map((c) => `  - ${c} (${slugs.filter((s) => categorize(s) === c).length} costumes)`).join("\n");
  return `# CostumesPlanet.com

> CostumesPlanet is the ultimate costume guide directory with ${slugs.length}+ detailed blog posts covering costumes for Halloween, cosplay conventions, and themed events. Each guide includes product recommendations with Amazon affiliate links, step-by-step dressing instructions, character background info, and FAQs.

## Site Structure

- **Homepage** (${SITE_URL}/) — Browse all ${slugs.length} costume guides with animated cards, search, and category filters
- **Blog Posts** (${SITE_URL}/{slug}) — Individual costume guides with product tables, dressing timelines, FAQ sections, and JSON-LD structured data
- **Categories** (${SITE_URL}/categories) — Browse by franchise/genre
- **Category Pages** (${SITE_URL}/category/{name}) — Filtered costume listings per category
- **Search** (${SITE_URL}/search?q={query}) — Full-text search across all costumes

## Categories

${catList}

## Content Per Guide

Each costume guide includes:
1. Hero section with featured image
2. Product table with Amazon affiliate "Buy on Amazon" buttons
3. Step-by-step dressing guide (timeline format)
4. "About the Character" section
5. 7 frequently asked questions with detailed answers
6. Related costume suggestions
7. Full JSON-LD structured data (Article, Product, FAQPage, HowTo, BreadcrumbList)

## Contact

Website: ${SITE_URL}
`;
}