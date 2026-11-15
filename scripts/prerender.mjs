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
let catPath; // set after site.ts loads
const catUrl = (name) => `${SITE}${catPath(name)}`;

// ── Load app data through Vite (handles TS + path aliases) ──
const vite = await createServer({
  root: ROOT,
  logLevel: "error",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
let costumes, categories, getCostumesByCategory, getExternalLinks, tidyProductList, heroSlugs;
let hubs, hubFor, isIndexable, relatedGuides, anchorName, quickFact, legacyHubSlugs;
try {
  ({ costumes, categories, getCostumesByCategory } = await vite.ssrLoadModule("/src/app/data/costumes.ts"));
  ({ getExternalLinks } = await vite.ssrLoadModule("/src/app/data/costumeAuthLinks.ts"));
  ({ tidyProductList } = await vite.ssrLoadModule("/src/app/data/itemUtils.ts"));
  ({ heroSlugs } = await vite.ssrLoadModule("/src/app/data/heroImages.ts"));
  ({ hubs, hubFor, isIndexable, relatedGuides, anchorName, quickFact, legacyHubSlugs, categoryPath: catPath } =
    await vite.ssrLoadModule("/src/app/data/site.ts"));
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
  .replace(/\s*<meta\s+property="og:(type|title|description)"[\s\S]*?\/>/g, "")
  .replace(/\s*<meta\s+name="robots"[\s\S]*?\/>/, "")
  .replace(/\s*<link\s+rel="canonical"[\s\S]*?\/>/, "");

const PRERENDER_CSS = `<style>
#root .pr{max-width:860px;margin:0 auto;padding:24px 16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;color:#1f2937}
#root .pr h1{font-size:2rem;line-height:1.2;margin:16px 0}#root .pr h2{font-size:1.4rem;margin:28px 0 8px}
#root .pr h3{font-size:1.1rem;margin:16px 0 4px}#root .pr a{color:#7c3aed}#root .pr img{max-width:100%;height:auto;border-radius:12px}
#root .pr nav a{margin-right:12px}#root .pr table{border-collapse:collapse;width:100%;margin:12px 0}#root .pr th,#root .pr td{border:1px solid #e5e7eb;padding:6px 10px;text-align:left;vertical-align:top}#root .pr ul,#root .pr ol{padding-left:22px}#root .pr .muted{color:#6b7280;font-size:.9rem}
</style>`;

const INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NOINDEX = "noindex, follow";
function renderPage({ route, title, description, image, ogType = "website", schemas = [], body, robots = INDEX, canonical, extraHead = "" }) {
  const url = canonical || `${SITE}${route}`;
  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="robots" content="${robots}" />`,
    extraHead,
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

// ── Shared fragments ──
const sectionId = (h) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const sectionsHtml = (c, where) =>
  (c.sections || [])
    .filter((x) => (x.placement || "middle") === where)
    .map(
      (x) =>
        `<h2 id="${sectionId(x.heading)}">${esc(x.heading)}</h2>${(x.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join("")}${
          x.table
            ? `<table><thead><tr>${x.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${x.table.rows
                .map((r) => `<tr>${r.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`)
                .join("")}</tbody></table>`
            : ""
        }${x.bullets ? `<ul>${x.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}`
    )
    .join("");
const sectionsText = (c) =>
  (c.sections || [])
    .map((x) => `## ${x.heading}\n${[...(x.paragraphs || []), ...(x.bullets || []).map((b) => `- ${b}`), ...(x.table ? [x.table.head.join(" | "), ...x.table.rows.map((r) => r.join(" | "))] : [])].join("\n")}`)
    .join("\n\n");
const updatedLabel = (d) => new Date(d + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const firstSentence = (t) => (t.match(/^.+?[.!?](\s|$)/) || [t])[0].trim();
const indexable = () => costumes.filter(isIndexable);
const guideImage = (c) => (heroSlugs.has(c.slug) ? `${SITE}/images/costumes/${c.slug}.jpg` : imageMap[c.slug] || "");
const guideLinks = (list) =>
  `<ul>${list.map((c) => `<li><a href="/${c.slug}/">${esc(anchorName(c))} costume</a>${c.handwritten ? ` — ${esc(c.excerpt)}` : ""}</li>`).join("")}</ul>`;

// ── Guides ──
for (const c of costumes) {
  const route = `/${c.slug}/`;
  const url = `${SITE}${route}`;
  const image = guideImage(c);
  const items = itemsFor(c);
  const related = relatedGuides(c, costumes, 6);
  const hub = hubFor(c.category);
  const external = getExternalLinks(c.slug, c.category);
  const name = anchorName(c);
  const intro = c.introSection.split("\n\n");
  const hw = isIndexable(c);

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: c.h1Title,
      description: c.metaDescription,
      datePublished: c.date,
      dateModified: c.dateModified,
      author: { ...ORG, "@type": "Organization" },
      publisher: ORG,
      ...(image ? { image: { "@type": "ImageObject", url: image, width: 1200, height: 630 } } : {}),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      articleSection: c.category,
      about: { "@type": "Thing", name },
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to put on a ${name} costume`,
      description: firstSentence(intro[0] || c.excerpt),
      ...(quickFact(c, "budget") ? { estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: quickFact(c, "budget") } } : {}),
      supply: items.map((it) => ({ "@type": "HowToSupply", name: it.name })),
      step: c.dressingGuide.map((d, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: d.itemName,
        text: d.steps.join(" "),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${name} costume shopping list`,
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: it.url })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
    crumbs([["Home", `${SITE}/`], [hub ? hub.h1.split(":")[0] : c.category, catUrl(c.category)], [c.h1Title, url]]),
  ];

  const body = `
<article>
  <p class="muted"><a href="/">Home</a> › <a href="${catPath(c.category)}">${esc(hub ? hub.h1.split(":")[0] : c.category)}</a></p>
  <h1>${esc(c.h1Title)}</h1>
  <p class="muted">By the CostumesPlanet editors · Updated <time datetime="${c.dateModified}">${updatedLabel(c.dateModified)}</time></p>
  <section id="quick-answer"><h2>Quick answer</h2><p><strong>${esc(intro[0] || c.excerpt)}</strong></p></section>
  ${image ? `<img src="${esc(image)}" alt="${esc(name)} costume: what you need" width="1200" height="630" loading="eager" />` : ""}
  ${c.quickFacts?.length ? `<h2>At a glance</h2><table><tbody>${c.quickFacts.map((f) => `<tr><th scope="row">${esc(f.label)}</th><td>${esc(f.value)}</td></tr>`).join("")}</tbody></table>` : ""}
  <nav aria-label="On this page"><strong>On this page:</strong> <a href="#shopping-list">Shopping list</a> <a href="#how-to-wear">How to put it on</a> <a href="#about">About ${esc(name)}</a> <a href="#faq">FAQ</a> <a href="#related">Related costumes</a></nav>
  ${intro.slice(1).map((p) => `<p>${esc(p)}</p>`).join("")}
  ${sectionsHtml(c, "top")}
  <h2 id="shopping-list">${esc(name)} costume shopping list</h2>
  <ol>${items.map((it) => `<li><a href="${esc(it.url)}" rel="sponsored nofollow noopener" target="_blank">${esc(it.name)}</a>${it.note ? ` — ${esc(it.note)}` : ""}</li>`).join("")}</ol>
  ${sectionsHtml(c, "middle")}
  <h2 id="how-to-wear">How to put on a ${esc(name)} costume</h2>
  ${c.dressingGuide.map((d, i) => `<h3>Step ${i + 1}: ${esc(d.itemName)}</h3><ol>${d.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>`).join("")}
  ${sectionsHtml(c, "end")}
  <h2 id="about">About ${esc(name)}</h2>
  ${paras(c.aboutSection)}
  <h2 id="faq">${esc(name)} costume FAQ</h2>
  ${c.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("")}
  ${external.length ? `<h2>Sources</h2><ul>${external.map((l) => `<li><a href="${esc(l.url)}" rel="noopener" target="_blank">${esc(l.label)}</a></li>`).join("")}</ul>` : ""}
  <h2 id="related">Related costume guides</h2>
  ${guideLinks(related)}
  ${hub ? `<p>See every guide in <a href="${catPath(c.category)}">${esc(hub.h1.split(":")[0])}</a>.</p>` : ""}
</article>`;

  renderPage({
    route,
    title: c.seoTitle,
    description: c.metaDescription,
    image,
    ogType: "article",
    schemas,
    body,
    robots: hw ? INDEX : NOINDEX,
    extraHead: `<meta property="article:modified_time" content="${c.dateModified}" />`,
  });
  count++;
}

// ── Hub (pillar) pages ──
const hubTable = (list) =>
  `<table><thead><tr><th>Character</th><th>Difficulty</th><th>Budget</th><th>Time to put on</th></tr></thead><tbody>${list
    .map((c) => `<tr><td><a href="/${c.slug}/">${esc(anchorName(c))} costume</a></td><td>${esc(quickFact(c, "difficulty").split(/[;(]/)[0].trim())}</td><td>${esc(quickFact(c, "budget"))}</td><td>${esc(quickFact(c, "time"))}</td></tr>`)
    .join("")}</tbody></table>`;

for (const hub of hubs) {
  const posts = getCostumesByCategory(hub.name);
  const hw = posts.filter(isIndexable);
  const tpl = posts.filter((p) => !isIndexable(p));
  const route = `/category/${hub.slug}/`;
  const relHubs = hub.related.map((s) => hubs.find((h) => h.slug === s)).filter(Boolean);
  renderPage({
    route,
    title: hub.seoTitle,
    description: hub.metaDescription,
    image: hw[0] ? guideImage(hw[0]) : "",
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: hub.h1,
        description: hub.metaDescription,
        url: `${SITE}${route}`,
        isPartOf: { "@type": "WebSite", name: "CostumesPlanet", url: `${SITE}/` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: hw.length,
          itemListElement: hw.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/${p.slug}/`, name: p.h1Title })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: hub.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      },
      crumbs([["Home", `${SITE}/`], ["Categories", `${SITE}/categories/`], [hub.h1.split(":")[0], `${SITE}${route}`]]),
    ],
    body: `<p class="muted"><a href="/">Home</a> › <a href="/categories/">Categories</a></p>
<h1>${esc(hub.h1)}</h1>
${hub.intro.map((p, i) => (i === 0 ? `<p><strong>${esc(p)}</strong></p>` : `<p>${esc(p)}</p>`)).join("")}
${hw.length ? `<h2>Compare ${hw.length} ${esc(hub.name)} costume guides</h2>${hubTable(hw)}` : ""}
<h2>How to choose your ${esc(hub.name)} costume</h2><ul>${hub.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
<h2>${esc(hub.name)} costume guides</h2>${guideLinks(hw)}
${tpl.length ? `<h2>More ${esc(hub.name)} characters</h2>${guideLinks(tpl)}` : ""}
<h2>${esc(hub.name)} costume FAQ</h2>${hub.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join("")}
${relHubs.length ? `<h2>Related costume categories</h2><ul>${relHubs.map((h) => `<li><a href="/category/${h.slug}/">${esc(h.h1.split(":")[0])}</a></li>`).join("")}</ul>` : ""}`,
  });
  count++;
}

// Old category URLs (encoded names and legacy slugs) → canonical hub. Vercel
// 301s these first; the stub is a fallback that still consolidates signals.
const legacyRoutes = [
  ...hubs.filter((h) => encodeURIComponent(h.name) !== h.slug).map((h) => [`/category/${encodeURIComponent(h.name)}/`, h.slug]),
  ...Object.entries(legacyHubSlugs).map(([old, slug]) => [`/category/${old}/`, slug]),
];
for (const [route, slug] of legacyRoutes) {
  const to = `${SITE}/category/${slug}/`;
  renderPage({
    route,
    title: "Moved | CostumesPlanet",
    description: "This category has moved.",
    robots: NOINDEX,
    canonical: to,
    extraHead: `<meta http-equiv="refresh" content="0; url=${to}" /><script>location.replace(${JSON.stringify(to)})</script>`,
    body: `<p>This page has moved to <a href="${to}">${to}</a>.</p>`,
  });
}

// ── Static pages ──
const hubList = `<ul>${hubs
  .map((h) => `<li><a href="/category/${h.slug}/">${esc(h.h1.split(":")[0])}</a> — ${esc(firstSentence(h.intro[0]))}</li>`)
  .join("")}</ul>`;
const latest = indexable().sort((a, b) => b.dateModified.localeCompare(a.dateModified));

const staticPages = [
  {
    route: "/",
    title: "Costume Guides for Every Character: What to Buy & How to Wear It | CostumesPlanet",
    description: `${indexable().length} hand-written costume and cosplay guides: the exact pieces for each character, the fastest complete option, budgets and how to put it on. Game of Thrones, Marvel, anime, gaming, Disney and more.`,
    image: latest[0] ? guideImage(latest[0]) : "",
    schemas: [
      { "@context": "https://schema.org", "@type": "WebSite", name: "CostumesPlanet", url: `${SITE}/`,
        potentialAction: { "@type": "SearchAction", target: `${SITE}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } },
      { "@context": "https://schema.org", ...ORG },
    ],
    body: `<h1>Costume guides for every character</h1>
<p><strong>CostumesPlanet tells you exactly what to buy for a character costume, the fastest complete option, what it costs and how to put it on.</strong> Every guide is written per character, not generated, and lists the one or two pieces that make the look recognisable so you can spend there and save on the rest.</p>
<h2>Browse by franchise</h2>${hubList}
<h2>Latest costume guides</h2>${guideLinks(latest.slice(0, 30))}`,
  },
  {
    route: "/categories/",
    title: `Costume Categories: Browse ${hubs.length} Franchises | CostumesPlanet`,
    description: `Browse costume guides by franchise: ${hubs.slice(0, 6).map((h) => h.name).join(", ")} and more.`,
    schemas: [crumbs([["Home", `${SITE}/`], ["Categories", `${SITE}/categories/`]])],
    body: `<h1>Costume categories</h1>${hubList}`,
  },
  {
    route: "/about-us/",
    title: "About CostumesPlanet: How We Write Costume Guides",
    description: "Who writes CostumesPlanet's costume guides, how we choose the pieces we recommend, and how the site is funded.",
    body: `<h1>About CostumesPlanet</h1><p>CostumesPlanet publishes costume and cosplay guides for film, TV, anime and gaming characters. Each guide is written for one character: we work from the source material, identify the pieces that make the look recognisable, and list the fastest complete option alongside cheaper DIY routes.</p><p>We don't test-wear every product. Links go to Amazon search results or listings that match the piece described, and we say so. The site is supported by Amazon affiliate commissions, which never change what we recommend.</p>`,
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
    description: "Every costume category and guide on CostumesPlanet.com in one list.",
    body: `<h1>Sitemap</h1><h2>Categories</h2>${hubList}<h2>Costume guides</h2>${guideLinks(indexable())}`,
  },
  { route: "/build/", title: "Build Your Costume — CostumesPlanet", description: "Mix and match pieces to plan your own costume, then shop the items.", body: `<h1>Build Your Costume</h1>`, robots: NOINDEX },
  { route: "/search/", title: "Search Costume Guides | CostumesPlanet", description: "Search CostumesPlanet's costume and cosplay guides by character, franchise or category.", body: `<h1>Search Costume Guides</h1>${hubList}`, robots: NOINDEX },
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
    body: `<h1>${esc(h1)}</h1><p>${esc(description)}</p><h2>Popular costume guides</h2>${guideLinks(latest.slice(0, 20))}`,
  })),
];
for (const p of staticPages) {
  renderPage(p);
  count++;
}

// ── Sitemaps: indexable URLs only ──
const urlset = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl" ?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries
    .map(([loc, lastmod, img]) => `\t<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}${img ? `<image:image><image:loc>${img}</image:loc></image:image>` : ""}</url>`)
    .join("\n")}\n</urlset>\n`;
const latestPost = latest[0]?.dateModified || BUILD_DATE;
const postEntries = latest.map((c) => [`${SITE}/${c.slug}/`, c.dateModified, heroSlugs.has(c.slug) ? guideImage(c) : ""]);
const pageEntries = staticPages.filter((p) => p.robots !== NOINDEX).map((p) => [`${SITE}${p.route}`]);
const catEntries = hubs.map((h) => {
  const d = getCostumesByCategory(h.name).filter(isIndexable).map((c) => c.dateModified).sort().at(-1);
  return [`${SITE}/category/${h.slug}/`, d];
});
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
files["sitemap-posts.xml"] = files["sitemap-posts-1.xml"];
files["sitemap-pages.xml"] = files["sitemap-pages-1.xml"];
files["sitemap-categories.xml"] = files["sitemap-categories-1.xml"];
for (const [name, xml] of Object.entries(files)) fs.writeFileSync(path.join(DIST, name), xml);

// ── llms.txt: a curated, answer-first index for AI assistants ──
const llms = `# CostumesPlanet

> CostumesPlanet publishes hand-written costume and cosplay guides for film, TV, anime and gaming characters. Each guide answers "what do I need for a [character] costume?" in its first sentence, then lists every piece (with Amazon links), the fastest complete option, a budget, the time it takes to put on, step-by-step dressing instructions and FAQs.

Guides live at ${SITE}/{slug}/ and are grouped into franchise hubs at ${SITE}/category/{hub}/. Every page is server-rendered HTML.

## Franchise hubs

${hubs.map((h) => `- [${h.h1.split(":")[0]}](${SITE}/category/${h.slug}/): ${firstSentence(h.intro[0])}`).join("\n")}

## Costume guides

${latest.map((c) => `- [${c.h1Title}](${SITE}/${c.slug}/): ${firstSentence(c.introSection.split("\n\n")[0])}${quickFact(c, "budget") ? ` Budget ${quickFact(c, "budget")}.` : ""}`).join("\n")}

## Tools

${staticPages.filter((p) => p.route.includes("generator")).map((p) => `- [${p.title.split(" — ")[0].split(" | ")[0]}](${SITE}${p.route}): ${p.description}`).join("\n")}

## Optional

- [About](${SITE}/about-us/)
- [Sitemap](${SITE}/sitemap.xml)
`;
fs.writeFileSync(path.join(DIST, "llms.txt"), llms);

// ── llms-full.txt: full text of every indexable guide ──
const llmsFull = latest
  .map((c) => {
    const items = itemsFor(c);
    return `# ${c.h1Title}\nURL: ${SITE}/${c.slug}/\nUpdated: ${c.dateModified}\n\n${c.introSection}\n\n${(c.quickFacts || []).map((f) => `- ${f.label}: ${f.value}`).join("\n")}\n\n## Shopping list\n${items.map((it) => `- ${it.name}${it.note ? `: ${it.note}` : ""}`).join("\n")}\n\n## How to put it on\n${c.dressingGuide.map((d) => `### ${d.itemName}\n${d.steps.map((s) => `- ${s}`).join("\n")}`).join("\n")}\n\n${sectionsText(c)}\n\n## About\n${c.aboutSection}\n\n## FAQ\n${c.faqs.map((f) => `**${f.question}**\n${f.answer}`).join("\n\n")}\n`;
  })
  .join("\n---\n\n");
fs.writeFileSync(path.join(DIST, "llms-full.txt"), `# CostumesPlanet — full guide text\n\n${llmsFull}`);

console.log(
  `[prerender] ${count} pages (${indexable().length} indexable guides), ${legacyRoutes.length} legacy redirects, ${Object.keys(imageMap).length} images; sitemaps + llms.txt written`
);
