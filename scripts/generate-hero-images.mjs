// =============================================================================
// CostumesPlanet.com — Hero image generator
//
// Builds an original 1200x630 "what you need" graphic for each hand-written
// guide from the guide's own data (title, category, difficulty, budget, item
// list). Nothing is fetched from Amazon or any third party, and no character
// is drawn: the images show generic item icons only.
//
// Output: public/images/costumes/<slug>.jpg   (served from our own domain)
//         src/app/data/heroImages.ts          (manifest of slugs that have one)
//
// Usage:  node scripts/generate-hero-images.mjs gargamel-costume [more-slugs…]
//         node scripts/generate-hero-images.mjs --all   (every hand-written guide)
//
// Run locally and commit the JPGs. This is NOT part of `npm run build`.
// =============================================================================

import { createServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public/images/costumes");
const MANIFEST = path.join(ROOT, "src/app/data/heroImages.ts");

// ── Load guide data through Vite ──
const vite = await createServer({
  root: ROOT,
  logLevel: "error",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
let costumes;
try {
  ({ costumes } = await vite.ssrLoadModule("/src/app/data/costumes.ts"));
} finally {
  await vite.close();
}

const args = process.argv.slice(2);
const wanted = args.includes("--all")
  ? costumes.filter((c) => c.handwritten).map((c) => c.slug)
  : args;
if (!wanted.length) {
  console.error("Pass one or more slugs, or --all");
  process.exit(1);
}

// ── Icons (48x48 viewBox, filled with currentColor) ──
const ICONS = {
  garment: `<path d="M15 7l5-2c1 3 7 3 8 0l5 2 9 10-6 5-3-3v24H15V19l-3 3-6-5z"/>`,
  hat: `<path d="M8 30C8 14 16 11 24 11s16 3 16 19z"/><rect x="4" y="33" width="40" height="5" rx="2.5"/>`,
  shoe: `<path d="M10 8h12v17c0 4 4 5 8 6l11 3c3 1 4 3 4 6v2H10z"/>`,
  hair: `<path d="M24 7C12 7 7 19 9 35c4-4 6-10 8-14 4 4 10 4 14 0 2 4 4 10 8 14 2-16-3-28-15-28z"/>`,
  mask: `<path fill-rule="evenodd" d="M7 16q17-7 34 0v10q0 11-9 11-5 0-8-6-3 6-8 6-9 0-9-11zM13 24a4.5 3.2 0 109 0 4.5 3.2 0 10-9 0zm13 0a4.5 3.2 0 109 0 4.5 3.2 0 10-9 0z"/>`,
  prop: `<path d="M8.5 40.5l18-18 3 3-18 18z"/><path d="M34 4l2.7 5.8 6.3.8-4.6 4.3 1.2 6.3L34 18l-5.6 3.2 1.2-6.3L25 10.6l6.3-.8z"/>`,
  toy: `<circle cx="13" cy="13" r="6"/><circle cx="35" cy="13" r="6"/><circle cx="24" cy="29" r="15"/>`,
  bag: `<path fill-rule="evenodd" d="M10 17h28l2 26H8zM17 17v-3a7 7 0 0114 0v3h-3v-3a4 4 0 00-8 0v3z"/>`,
};
const iconFor = (name) => {
  const n = name.toLowerCase();
  if (/(wig|hair|beard|mustache|moustache|fringe)/.test(n)) return "hair";
  if (/(mask|nose|makeup|paint|teeth|glasses|sunglasses|shades)/.test(n)) return "mask";
  if (/(plush|doll|teddy|cat\b|dog\b|toy\b|puppet)/.test(n)) return "toy";
  if (/(shoe|boot|sneaker|slipper|flip|sandal|loafer)/.test(n)) return "shoe";
  if (/(hat|cap\b|beret|helmet|crown|hood\b|beanie|headband)/.test(n)) return "hat";
  if (/(sword|staff|trident|gun|blade|axe|wand|bow\b|shield|dagger|cauldron|net\b|prop|guitar|microphone|saber|ball\b)/.test(n)) return "prop";
  if (/(robe|coat|jacket|vest|shirt|dress|tunic|suit|hoodie|sweater|cardigan|cloak|cape|jersey|top\b|skirt|trouser|pants|jeans|jumper|tracksuit|overalls|leotard|bodysuit|harness|armor|apron)/.test(n)) return "garment";
  return "bag";
};

// ── Text helpers ──
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const shortLabel = (name) => {
  let s = name.replace(/\s*\([^)]*\)/g, "").trim();
  const alt = s.match(/^(.+?)\s+or\s+(.+)$/i);
  if (alt) {
    const tail = alt[2].trim().split(/\s+/);
    // "Black hooded monk or wizard robe" -> "Black hooded monk robe"; "X or wig" -> "X"
    s = tail.length > 1 ? `${alt[1]} ${tail[tail.length - 1]}` : alt[1];
  }
  s = s.split(/\s+with\s+|\s*\/\s*|,/i)[0].trim();
  if (/\b(costume|cosplay)\s+set\b/i.test(s)) return "Complete costume set";
  s = s.replace(/^(?:[A-Z][\w.'-]*\s){1,3}(?=(cosplay|costume)\b)/, "").replace(/^(cosplay|costume)\s+/i, "");
  s = s.charAt(0).toUpperCase() + s.slice(1);
  if (s.length > 28) {
    const words = s.split(" ");
    while (words.join(" ").length > 26 && words.length > 1) words.pop();
    while (words.length > 1 && /^(for|the|and|of|with|to|a|or|in|on)$/i.test(words[words.length - 1])) words.pop();
    s = words.join(" ");
  }
  return s;
};
const fact = (c, label) => c.quickFacts?.find((f) => f.label.toLowerCase().includes(label))?.value || "";
const budget = (c) => (fact(c, "budget").match(/\$[\d,]+(?:\s*[–-]\s*\$?[\d,]+)?/) || [""])[0].replace(/\s/g, "");
const difficulty = (c) => fact(c, "difficulty").split(/[;(]| with /)[0].trim();

function html(c) {
  const [main, sub] = (() => {
    const m = c.h1Title.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    return m ? [m[1], m[2]] : [c.h1Title, ""];
  })();
  const items = (c.curatedItems || []).slice(0, 6);
  const more = (c.curatedItems || []).length;
  const chips = [difficulty(c), budget(c) && `${budget(c)} budget`].filter(Boolean);
  const tiles = items
    .map(
      (it) => `<div class="tile"><span class="ic"><svg viewBox="0 0 48 48" fill="currentColor">${ICONS[iconFor(it.name)]}</svg></span><span class="lb">${esc(shortLabel(it.name))}</span></div>`
    )
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;font-family:Inter,system-ui,sans-serif;color:#fff;overflow:hidden;
 background:radial-gradient(900px 520px at 88% -10%,rgba(255,153,0,.22),transparent 60%),linear-gradient(135deg,#070b2e 0%,#111b63 55%,#1a237e 100%);position:relative}
.left{position:absolute;left:64px;top:64px;bottom:64px;width:500px;display:flex;flex-direction:column}
.pill{align-self:flex-start;font-weight:700;font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:#FF9900;border:2px solid rgba(255,153,0,.55);border-radius:999px;padding:8px 18px}
h1{margin-top:26px;font-size:66px;line-height:1.04;font-weight:800;letter-spacing:-.02em}
.sub{margin-top:14px;font-size:30px;font-weight:500;color:rgba(255,255,255,.72)}
.chips{display:flex;gap:12px;margin-top:30px;flex-wrap:wrap}
.chip{font-size:20px;font-weight:600;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:9px 16px}
.brand{margin-top:auto;display:flex;align-items:center;gap:12px;font-size:24px;font-weight:700}
.brand i{display:block;width:44px;height:6px;border-radius:3px;background:#FF9900}
.card{position:absolute;right:64px;top:64px;bottom:64px;width:520px;background:#fff;border-radius:28px;padding:30px 30px 26px;color:#111b63;box-shadow:0 24px 60px rgba(0,0,0,.35);display:flex;flex-direction:column}
.hd{font-size:18px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#6b7280}
.grid{margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:14px;flex:1}
.tile{display:flex;align-items:center;gap:14px;background:#f4f6ff;border-radius:18px;padding:0 16px}
.ic{flex:none;width:56px;height:56px;border-radius:50%;background:#FF9900;color:#111b63;display:flex;align-items:center;justify-content:center}
.ic svg{width:32px;height:32px}
.lb{font-size:21px;font-weight:700;line-height:1.15}
.ft{margin-top:16px;font-size:18px;font-weight:600;color:#6b7280}
</style></head><body>
<div class="left"><span class="pill">${esc(c.category)}</span><h1>${esc(main)}</h1>${sub ? `<div class="sub">${esc(sub)}</div>` : ""}<div class="chips">${chips.map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div><div class="brand"><i></i>CostumesPlanet.com</div></div>
<div class="card"><div class="hd">What you need</div><div class="grid">${tiles}</div><div class="ft">${more} pieces with step-by-step dressing guide</div></div>
</body></html>`;
}

// ── Render ──
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const done = [];
for (const slug of wanted) {
  const c = costumes.find((x) => x.slug === slug);
  if (!c?.curatedItems) {
    console.warn(`skip ${slug}: no hand-written guide`);
    continue;
  }
  await page.setContent(html(c), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(OUT, `${slug}.jpg`), type: "jpeg", quality: 90 });
  done.push(slug);
  console.log(`wrote public/images/costumes/${slug}.jpg`);
}
await browser.close();

// ── Manifest: every slug that has a JPG on disk ──
const have = fs.readdirSync(OUT).filter((f) => f.endsWith(".jpg")).map((f) => f.replace(/\.jpg$/, "")).sort();
fs.writeFileSync(
  MANIFEST,
  `// Generated by scripts/generate-hero-images.mjs — do not edit by hand.\n// Slugs that have a self-hosted hero image in public/images/costumes/.\nexport const heroSlugs: ReadonlySet<string> = new Set(${JSON.stringify(have, null, 2)});\n`
);
console.log(`manifest: ${have.length} slug(s)`);
