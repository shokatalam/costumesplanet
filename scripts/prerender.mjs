// =============================================================================
// CostumesPlanet.com — Build-time prerender
//
// Runs after `vite build`. For every route it writes dist/<route>/index.html
// containing real HTML: per-page <title>, meta description, canonical, Open
// Graph, JSON-LD, and the page's text content inside #root. Crawlers that do
// not run JavaScript (GPTBot, ClaudeBot, PerplexityBot, …) can read the page;
// in the browser, React's createRoot() replaces #root with the interactive app.
//
// Also regenerates sitemap XML files and llms.txt from the same data, so they
// can never drift from the site again.
// =============================================================================

import { createServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SITE = "https://costumesplanet.com";
const BUILD_DATE = new Date().toISOString().split("T")[0];

// ── Helpers ──
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const catUrl = (name) => `${SITE}/category/${encodeURIComponent(name)}/`;
const catPath = (name) => `/category/${encodeURIComponent(name)}/`;

// ── Load app data through Vite (handles TS + path aliases) ──
const vite = await createServer({
  root: ROOT,
  logLevel: "error",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
let costumes, categories, getCostumesByCategory, getExternalLinks, tidyProductList;
try {
  ({ costumes, categories, getCostumesByCategory } = await vite.ssrLoadModule("/src/app/data/costumes.ts"));
  ({ getExternalLinks } = await vite.ssrLoadModule("/src/app/data/costumeAuthLinks.ts"));
  ({ tidyProductList } = await vite.ssrLoadModule("/src/app/data/itemUtils.ts"));
} finally {
  await vite.close();
}

// ── Pull image + real product data from Supabase (same source the app uses) ──
const infoSrc = fs.readFileSync(path.join(ROOT, "utils/supabase/info.tsx"), "utf8");
const projectId = infoSrc.match(/projectId\s*=\s*"([^"]+)"/)?.[1];
const anonKey = infoSrc.match(/publicAnonKey\s*=\s*"([^"]+)"/)?.[1];
const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;

async function fetchMap(endpoint, key) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      headers: { Authorization: `Bearer ${anonKey}` },
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data?.[key] && typeof data[key] === "object" ? data[key] : {};
  } catch (err) {
    console.warn(`[prerender] ${endpoint} unavailable (${err.message}); continuing without it`);
    return {};
  }
}
const [imageMap, itemMap] = await Promise.all([fetchMap("image-map", "images"), fetchMap("item-map", "items")]);

// ── HTML template from the Vite build ──
const templatePath = path.join(DIST, "index.html");
const template = fs.readFileSync(templatePath, "utf8");
// Untouched SPA shell — used by the Vercel rewrite for routes we don't prerender
fs.writeFileSync(path.join(DIST, "spa-shell.html"), template);

// Strip the template's default per-page tags; we inject per-route ones.
const baseHead = template
  .replace(/\s*<title>[\s\S]*?<\/title>/, "")
  .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, "")
  .replace(/\s*<meta\s+property="og:(type|title|description)"[\s\S]*?\/>/g, "");

const PRERENDER_CSS = `<style>
#root .pr{max-width:860px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1f2937}
#root .pr h1{font-size:2rem;line-height:1.2;margin:16px 0}#root .pr h2{font-size:1.4rem;margin:28px 0 8px}
#root .pr h3{font-size:1.1rem;margin:16px 0 4px}#root .pr a{color:#7c3aed}#root .pr img{max-width:100%;height:auto;border-radius:12px}
#root .pr nav a{margin-right:12px}#root .pr ul,#root .pr ol{padding-left:22px}#root .pr .muted{color:#6b7280;font-size:.9rem}
</style>`;

function renderPage({ route, title, description, image, ogType = "website", schemas = [], body }) {
  const url = `${SITE}${route}`;
  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    image ? `<meta property="og:image" content="${esc(image)}" />` : "",
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    image ? `<meta name="twitter:image" content="${esc(image)}" />` : "",
    ...schemas.map(jsonLd),
    PRERENDER_CSS,
  ]
    .filter(Boolean)
    .join("\n    ");

  const nav = `<nav><a href="/">Home</a><a href="/categories/">Categories</a><a href="/costume-generator/">Costume Generator</a><a href="/about-us/">About</a></nav>`;
  const footer = `<footer class="muted"><p>CostumesPlanet is reader-supported. As an Amazon Associate we earn from qualifying purchases.</p><p><a href="/about-us/">About</a> · <a href="/terms-of-use/">Terms of Use</a> · <a href="/sitemap/">Sitemap</a></p></footer>`;

  const html = baseHead
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"><div class="pr">${nav}<main>${body}</main>${footer}</div></div>`);

  const file = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, decodeURIComponent(route), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const ORG = {
  "@type": "Organization",
  name: "CostumesPlanet",
  url: `${SITE}/`,
  logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
};
const crumbs = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
});
const listOfCostumes = (list) =>
  `<ul>${list.map((c) => `<li><a href="/${c.slug}/">${esc(c.title)}</a> — ${esc(c.category)}</li>`).join("")}</ul>`;

// Same priority as BlogPost: curated list, then scraped products, then generated items
function itemsFor(c) {
  if (c.curatedItems) return c.curatedItems;
  const scraped = tidyProductList(itemMap[c.slug]?.items || []);
  return scraped.length ? scraped : c.items.map((i) => ({ name: i.name, url: i.amazonUrl }));
}
const paras = (text) => text.split("\n\n").map((p) => `<p>${esc(p)}</p>`).join("");

let count = 0;

// ── Blog posts ──
for (const c of costumes) {
  const route = `/${c.slug}/`;
  const url = `${SITE}${route}`;
  const image = imageMap[c.slug] || "";
  const items = itemsFor(c);
  const related = c.relatedSlugs.map((s) => costumes.find((x) => x.slug === s)).filter(Boolean);
  const external = getExternalLinks(c.slug, c.category);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.h1Title,
      description: c.metaDescription,
      datePublished: c.date,
      dateModified: c.dateModified,
      author: ORG,
      publisher: ORG,
      ...(image ? { image } : {}),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: c.category,
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${c.title} — items`,
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: it.url })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
    crumbs([["Home", `${SITE}/`], [c.category, catUrl(c.category)], [c.title, url]]),
  ];

  const body = `
<article>
  <p class="muted"><a href="/">Home</a> › <a href="${catPath(c.category)}">${esc(c.category)}</a></p>
  <h1>${esc(c.h1Title)}</h1>
  <p class="muted">Published <time datetime="${c.date}">${c.date}</time>${c.dateModified !== c.date ? ` · Updated <time datetime="${c.dateModified}">${c.dateModified}</time>` : ""}</p>
  ${image ? `<img src="${esc(image)}" alt="${esc(c.title)}" width="1200" height="630" loading="eager" />` : ""}
  ${paras(c.introSection)}
  ${c.quickFacts?.length ? `<h2>At a glance</h2><ul>${c.quickFacts.map((f) => `<li><strong>${esc(f.label)}:</strong> ${esc(f.value)}</li>`).join("")}</ul>` : ""}
  <h2>What you need</h2>
  <ul>${items.map((it) => `<li><a href="${esc(it.url)}" rel="sponsored nofollow noopener" target="_blank">${esc(it.name)}</a>${it.note ? ` — ${esc(it.note)}` : ""}</li>`).join("")}</ul>
  <h2>How to put it together</h2>
  ${c.dressingGuide.map((d) => `<h3>${esc(d.itemName)}</h3><ol>${d.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`).join("")}
  <h2>About the character</h2>
  ${paras(c.aboutSection)}
  <h2>Frequently asked questions</h2>
  ${c.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("")}
  ${external.length ? `<h2>Further reading</h2><ul>${external.map((l) => `<li><a href="${esc(l.url)}" rel="noopener" target="_blank">${esc(l.label)}</a></li>`).join("")}</ul>` : ""}
  ${related.length ? `<h2>More ${esc(c.category)} costumes</h2>${listOfCostumes(related)}` : ""}
</article>`;

  renderPage({ route, title: c.seoTitle, description: c.metaDescription, image, ogType: "article", schemas, body });
  count++;
}

// ── Category pages ──
for (const cat of categories) {
  const posts = getCostumesByCategory(cat);
  const route = catPath(cat);
  renderPage({
    route,
    title: `${cat} Costume Guides (${posts.length}) | CostumesPlanet`,
    description: `Browse ${posts.length} ${cat} costume and cosplay guides with item lists, dressing steps, and FAQs.`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${cat} Costumes`,
        url: `${SITE}${route}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/${p.slug}/`, name: p.title })),
        },
      },
      crumbs([["Home", `${SITE}/`], ["Categories", `${SITE}/categories/`], [cat, `${SITE}${route}`]]),
    ],
    body: `<h1>${esc(cat)} Costumes</h1><p>${posts.length} costume guides in the ${esc(cat)} category.</p>${listOfCostumes(posts)}`,
  });
  count++;
}

// ── Static pages ──
const categoryList = `<ul>${categories
  .map((cat) => `<li><a href="${catPath(cat)}">${esc(cat)}</a> (${getCostumesByCategory(cat).length})</li>`)
  .join("")}</ul>`;

const staticPages = [
  {
    route: "/",
    title: "CostumesPlanet — Costume & Cosplay Guides for Every Character",
    description: `${costumes.length} costume and cosplay guides with item lists, dressing steps, and FAQs, organised by franchise: Marvel & DC, Game of Thrones, Star Wars, Disney, anime, gaming and more.`,
    schemas: [
      { "@context": "https://schema.org", "@type": "WebSite", name: "CostumesPlanet", url: `${SITE}/`,
        potentialAction: { "@type": "SearchAction", target: `${SITE}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } },
      { "@context": "https://schema.org", ...ORG },
    ],
    body: `<h1>Costume &amp; Cosplay Guides</h1><p>${costumes.length} character costume guides, organised by franchise.</p><h2>Categories</h2>${categoryList}<h2>All costume guides</h2>${listOfCostumes(costumes)}`,
  },
  {
    route: "/categories/",
    title: `All Costume Categories (${categories.length}) | CostumesPlanet`,
    description: `Browse ${categories.length} costume categories including Marvel & DC, Game of Thrones, Star Wars, Disney, anime and gaming.`,
    schemas: [crumbs([["Home", `${SITE}/`], ["Categories", `${SITE}/categories/`]])],
    body: `<h1>Costume Categories</h1>${categoryList}`,
  },
  {
    route: "/about-us/",
    title: "About Us — CostumesPlanet.com",
    description: "About CostumesPlanet.com: who we are, how we put together our costume and cosplay guides, and how the site is funded.",
    body: `<h1>About CostumesPlanet</h1><p>CostumesPlanet publishes costume and cosplay guides for film, TV, anime and gaming characters, listing the pieces you need and how to wear them. The site is supported by Amazon affiliate commissions.</p>`,
  },
  {
    route: "/terms-of-use/",
    title: "Terms of Use — CostumesPlanet.com",
    description: "Read the terms of use for CostumesPlanet.com including content usage, affiliate disclosure, and intellectual property guidelines.",
    body: `<h1>Terms of Use</h1><p>Terms governing use of CostumesPlanet.com, including our Amazon affiliate disclosure.</p>`,
  },
  {
    route: "/sitemap/",
    title: "Sitemap — CostumesPlanet.com",
    description: "Every costume guide and category on CostumesPlanet.com in one list.",
    body: `<h1>Sitemap</h1><h2>Categories</h2>${categoryList}<h2>Costume guides</h2>${listOfCostumes(costumes)}`,
  },
  { route: "/build/", title: "Build Your Costume — CostumesPlanet", description: "Mix and match pieces to plan your own costume, then shop the items.", body: `<h1>Build Your Costume</h1>` },
  { route: "/search/", title: "Search Costume Guides | CostumesPlanet", description: "Search CostumesPlanet's costume and cosplay guides by character, franchise or category.", body: `<h1>Search Costume Guides</h1>${categoryList}` },
  ...[
    ["costume-generator", "Costume Generator — Free Costume Idea Finder | CostumesPlanet", "Costume Generator", "Get a random costume idea and the pieces to build it."],
    ["halloween-costume-generator", "Halloween Costume Generator — Random Ideas | CostumesPlanet", "Halloween Costume Generator", "Generate Halloween costume ideas: classic horror, funny, scary, couples and superhero."],
    ["ai-costume-generator", "AI Costume Generator — Ideas for Any Character | CostumesPlanet", "AI Costume Generator", "Describe a character and get a costume breakdown with the pieces you need."],
    ["random-costume-generator", "Random Costume Generator — Spin for Instant Ideas | CostumesPlanet", "Random Costume Generator", "Spin for a random costume idea when you can't decide what to be."],
    ["superhero-costume-generator", "Superhero Costume Generator — Marvel, DC & MHA | CostumesPlanet", "Superhero Costume Generator", "Generate superhero and villain costume ideas from Marvel, DC and My Hero Academia."],
    ["spirit-halloween-costume-generator", "Spirit Halloween Costume Generator | CostumesPlanet", "Spirit Halloween Costume Generator", "Ideas inspired by Spirit Halloween costumes and the Spirit Halloween meme."],
  ].map(([slug, title, h1, description]) => ({
    route: `/${slug}/`,
    title,
    description,
    schemas: [{ "@context": "https://schema.org", "@type": "WebApplication", name: h1, url: `${SITE}/${slug}/`, applicationCategory: "LifestyleApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }],
    body: `<h1>${esc(h1)}</h1><p>${esc(description)}</p><h2>Popular costume guides</h2>${listOfCostumes(costumes.slice(0, 20))}`,
  })),
];
for (const p of staticPages) {
  renderPage(p);
  count++;
}

// ── Sitemaps (generated from the same data) ──
const urlset = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl" ?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(([loc, lastmod]) => `\t<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`)
    .join("\n")}\n</urlset>\n`;
const latestPost = costumes.map((c) => c.dateModified).sort().at(-1);
const postEntries = costumes.map((c) => [`${SITE}/${c.slug}/`, c.dateModified]);
const pageEntries = staticPages.filter((p) => p.route !== "/search/").map((p) => [`${SITE}${p.route}`]);
const catEntries = categories.map((cat) => [catUrl(cat)]);
const files = {
  "sitemap-posts-1.xml": urlset(postEntries),
  "sitemap-pages-1.xml": urlset(pageEntries),
  "sitemap-categories-1.xml": urlset(catEntries),
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap-index.xsl" ?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ["sitemap-posts-1.xml", latestPost],
    ["sitemap-pages-1.xml", BUILD_DATE],
    ["sitemap-categories-1.xml", latestPost],
  ]
    .map(([f, d]) => `\t<sitemap>\n\t\t<loc>${SITE}/${f}</loc>\n\t\t<lastmod>${d}</lastmod>\n\t</sitemap>`)
    .join("\n")}\n</sitemapindex>\n`,
};
// Legacy sitemap names point at the same content
files["sitemap-posts.xml"] = files["sitemap-posts-1.xml"];
files["sitemap-pages.xml"] = files["sitemap-pages-1.xml"];
files["sitemap-categories.xml"] = files["sitemap-categories-1.xml"];
for (const [name, xml] of Object.entries(files)) fs.writeFileSync(path.join(DIST, name), xml);

// ── llms.txt (markdown index for AI assistants, per llmstxt.org) ──
const llms = `# CostumesPlanet

> CostumesPlanet publishes ${costumes.length} costume and cosplay guides for film, TV, anime and gaming characters. Each guide lists the pieces needed for the look (with Amazon affiliate links), how to put the costume on, and answers to common questions.

Every page is available as plain HTML. Guides live at ${SITE}/{slug}/ and are grouped into ${categories.length} categories.

## Categories

${categories.map((cat) => `- [${cat}](${catUrl(cat)}): ${getCostumesByCategory(cat).length} guides`).join("\n")}

## Costume guides

${costumes.map((c) => `- [${c.title}](${SITE}/${c.slug}/): ${c.category}`).join("\n")}

## Tools

${staticPages.filter((p) => p.route.includes("generator")).map((p) => `- [${p.title.split(" — ")[0].split(" | ")[0]}](${SITE}${p.route}): ${p.description}`).join("\n")}

## Optional

- [About](${SITE}/about-us/)
- [Terms of Use](${SITE}/terms-of-use/)
- [Sitemap](${SITE}/sitemap.xml)
`;
fs.writeFileSync(path.join(DIST, "llms.txt"), llms);

console.log(
  `[prerender] ${count} pages, ${Object.keys(imageMap).length} images, ${Object.keys(itemMap).length} product lists; sitemaps + llms.txt written`
);
