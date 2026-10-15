/**
 * ============================================================
 * CostumesPlanet.com — Cloudflare Worker (static sitemap)
 * ============================================================
 *
 * QUICK DEPLOY (3 steps)
 * ────────────────────────────────────────────────────────────
 *  1.  npx wrangler login
 *  2.  Edit wrangler.toml → paste your Cloudflare account_id
 *  3.  npx wrangler deploy
 *
 * That's it. No environment variables. No Supabase dependency.
 * The sitemap XML is baked directly into this Worker.
 *
 * WHAT IT DOES
 * ────────────
 *  Intercepts SEO paths at costumesplanet.com and returns
 *  statically embedded XML/text with the correct Content-Type.
 *  Every other path passes through to the React SPA origin.
 *
 *   GET /sitemap.xml              → sitemap index (this file)
 *   GET /sitemap-posts-1.xml      → all 241 costume post URLs
 *   GET /sitemap-pages-1.xml      → static page URLs
 *   GET /sitemap-categories-1.xml → category taxonomy URLs
 *   GET /sitemap-posts.xml        → alias for sitemap-posts-1.xml
 *   GET /sitemap-pages.xml        → alias for sitemap-pages-1.xml
 *   GET /sitemap-categories.xml   → alias for sitemap-categories-1.xml
 *   GET /robots.txt               → crawler directives
 *   GET /llms.txt                 → AI crawler guide
 *   everything else               → origin (React SPA)
 *
 * VERIFY AFTER DEPLOYING
 * ────────────────────────────────────────────────────────────
 *   curl -sI https://costumesplanet.com/sitemap.xml
 *     ✓  HTTP/2 200
 *     ✓  content-type: application/xml; charset=utf-8
 *     ✓  x-served-by: CostumesPlanet-StaticWorker
 *
 *   curl -s https://costumesplanet.com/sitemap.xml | head -3
 *     ✓  <?xml version="1.0" encoding="UTF-8"?>
 *     ✓  <sitemapindex ...>
 *
 *   curl -sI https://costumesplanet.com/
 *     ✓  content-type: text/html  (SPA — not intercepted)
 * ============================================================
 */

// ─── Static Content ───────────────────────────────────────────────────────────

const SITEMAP_INDEX = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://costumesplanet.com/sitemap-index.xsl" ?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<sitemap>
\t\t<loc>https://costumesplanet.com/sitemap-posts-1.xml</loc>
\t\t<lastmod>2026-02-28T12:00:00+00:00</lastmod>
\t</sitemap>
\t<sitemap>
\t\t<loc>https://costumesplanet.com/sitemap-pages-1.xml</loc>
\t\t<lastmod>2026-02-28T12:00:00+00:00</lastmod>
\t</sitemap>
\t<sitemap>
\t\t<loc>https://costumesplanet.com/sitemap-categories-1.xml</loc>
\t\t<lastmod>2026-02-28T12:00:00+00:00</lastmod>
\t</sitemap>
</sitemapindex>`;

const SITEMAP_POSTS = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://costumesplanet.com/sitemap.xsl" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<url><loc>https://costumesplanet.com/evil-dead-ash-costume/</loc><lastmod>2026-02-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/spider-web-woman-costume/</loc><lastmod>2026-02-27T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/maeve-millay-costume/</loc><lastmod>2026-02-26T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/nooshy-sing-2-costume/</loc><lastmod>2026-02-25T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/emporio-cosplay/</loc><lastmod>2026-02-24T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/uncle-fester-costume-plus-size/</loc><lastmod>2026-02-23T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/ratcatcher-2-costume/</loc><lastmod>2026-02-22T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/evil-morty-costume/</loc><lastmod>2026-02-21T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/talisman-ballet-costume/</loc><lastmod>2026-02-20T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/diy-dude-costume/</loc><lastmod>2026-02-19T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/phantom-of-the-opera-red-death-costume/</loc><lastmod>2026-02-18T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/lord-farquaad-halloween-costume/</loc><lastmod>2026-02-17T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/queen-oona-costume/</loc><lastmod>2026-02-16T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/diy-ginny-weasley-costume/</loc><lastmod>2026-02-15T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/night-king-costume/</loc><lastmod>2026-02-14T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jaime-lannister-costume/</loc><lastmod>2026-02-13T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/chloe-decker-costume/</loc><lastmod>2026-02-12T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/moose-finbar-costume/</loc><lastmod>2026-02-11T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/allison-costume-for-cosplay/</loc><lastmod>2026-02-10T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/sansa-stark-halloween-costume/</loc><lastmod>2026-02-09T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/lucy-wilde-despicable-me-costume/</loc><lastmod>2026-02-08T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/daniel-tiger-costume-diy/</loc><lastmod>2026-02-07T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/nathan-drake-halloween-costume/</loc><lastmod>2026-02-06T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/padme-sexy-costume/</loc><lastmod>2026-02-05T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/be-our-guest-costumes/</loc><lastmod>2026-02-04T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/dorothy-dance-costume/</loc><lastmod>2026-02-03T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mr-bill-costume/</loc><lastmod>2026-02-02T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mary-poppins-dance-costume/</loc><lastmod>2026-02-01T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/lucifer-morningstar-costume/</loc><lastmod>2026-01-31T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/deadshot-cosplay/</loc><lastmod>2026-01-30T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jon-snow-costume/</loc><lastmod>2026-01-29T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/linkle-cosplay-costume/</loc><lastmod>2026-01-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/brian-griffin-costume/</loc><lastmod>2026-01-27T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jinx-cosplay-costume/</loc><lastmod>2026-01-26T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/homelander-cosplay/</loc><lastmod>2026-01-25T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/best-ariel-costume/</loc><lastmod>2026-01-24T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/melisandre-costume/</loc><lastmod>2026-01-23T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/gru-costume-cosplay/</loc><lastmod>2026-01-22T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/khal-drogo-costume/</loc><lastmod>2026-01-21T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/hamburglar-costume/</loc><lastmod>2026-01-20T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/slash-guns-n-roses-costume/</loc><lastmod>2026-01-19T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/scarface-costume/</loc><lastmod>2026-01-18T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/blues-brothers-costume/</loc><lastmod>2026-01-17T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/dr-evil-costume-diy/</loc><lastmod>2026-01-16T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/yelena-belova-costume/</loc><lastmod>2026-01-15T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/natasha-romanoff-costume-diy/</loc><lastmod>2026-01-14T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/best-cammy-costume/</loc><lastmod>2026-01-13T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jesse-pinkman-outfits/</loc><lastmod>2026-01-12T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/young-justice-robin-cosplay-costume/</loc><lastmod>2026-01-11T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/joyce-byers-costume/</loc><lastmod>2026-01-10T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/ember-mclain-cosplay/</loc><lastmod>2026-01-09T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/best-amanda-costume/</loc><lastmod>2026-01-08T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/princess-isabel-costume/</loc><lastmod>2026-01-07T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/rick-astley-costume/</loc><lastmod>2026-01-06T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/taskmaster-cosplay-costume/</loc><lastmod>2026-01-05T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/diy-starlight-costume/</loc><lastmod>2026-01-04T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/tyler-durden-costume/</loc><lastmod>2026-01-03T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/diy-sloane-peterson-costume/</loc><lastmod>2026-01-02T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/ferb-costume-for-cosplay/</loc><lastmod>2026-01-01T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/perry-the-platypus-costume/</loc><lastmod>2025-12-31T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jane-jetson-costume/</loc><lastmod>2025-12-30T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/katniss-everdeen-costume/</loc><lastmod>2025-12-29T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/spinelli-costume/</loc><lastmod>2025-12-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/dora-the-explorer-costume/</loc><lastmod>2025-12-27T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/she-ra-cosplay-costume/</loc><lastmod>2025-12-26T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/blade-costume/</loc><lastmod>2025-12-25T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/angela-abar-costume/</loc><lastmod>2025-12-24T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/dick-dastardly-costume/</loc><lastmod>2025-12-23T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/tanjiro-kamado-costume/</loc><lastmod>2025-12-22T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/barbara-maitland-costume/</loc><lastmod>2025-12-21T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/xayah-costume-cosplay/</loc><lastmod>2025-12-20T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/hawkeye-cosplay-costume/</loc><lastmod>2025-12-19T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jorgen-von-strangle-costume/</loc><lastmod>2025-12-18T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/shy-guy-costume/</loc><lastmod>2025-12-17T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/dexters-laboratory-halloween-costume/</loc><lastmod>2025-12-16T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/misty-pokemon-cosplay/</loc><lastmod>2025-12-15T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/joe-exotic-costume/</loc><lastmod>2025-12-14T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/van-helsing-costume/</loc><lastmod>2025-12-13T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/atomic-blonde-costume/</loc><lastmod>2025-12-12T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/sombra-costume-cosplay/</loc><lastmod>2025-12-11T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/wild-card-costume/</loc><lastmod>2025-12-10T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/deathstroke-costume/</loc><lastmod>2025-12-09T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/max-mayfield-costume/</loc><lastmod>2025-12-08T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/captain-hook-costume/</loc><lastmod>2025-12-07T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/lily-houghton-costume/</loc><lastmod>2025-12-06T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/wendy-darling-costume/</loc><lastmod>2025-12-05T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/iron-spider-costume/</loc><lastmod>2025-12-04T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/king-bob-halloween-costume/</loc><lastmod>2025-12-03T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mr-smee-costume/</loc><lastmod>2025-12-02T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/daenerys-targaryen-cosplay/</loc><lastmod>2025-12-01T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/diy-peter-pan-costume/</loc><lastmod>2025-11-30T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/cersei-lannister-costume/</loc><lastmod>2025-11-29T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/tinkerbell-cosplay-costume/</loc><lastmod>2025-11-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/joffrey-baratheon-costume/</loc><lastmod>2025-11-27T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/inosuke-hashibira-costume/</loc><lastmod>2025-11-26T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/arya-stark-costume/</loc><lastmod>2025-11-25T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mitsuri-kanroji-cosplay/</loc><lastmod>2025-11-24T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/giyu-tomioka-costume/</loc><lastmod>2025-11-23T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/iron-man-age-of-ultron-suit/</loc><lastmod>2025-11-22T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/fat-thor-costume/</loc><lastmod>2025-11-21T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/tj-detweiler-costume/</loc><lastmod>2025-11-20T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/manjiro-sano-costume/</loc><lastmod>2025-11-19T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/chifuyu-matsuno-cosplay/</loc><lastmod>2025-11-18T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/thanos-cosplay/</loc><lastmod>2025-11-17T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/pirate-steve-costume/</loc><lastmod>2025-11-16T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/gamora-costume/</loc><lastmod>2025-11-15T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/hinata-tachibana-cosplay/</loc><lastmod>2025-11-14T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/captain-america-costume/</loc><lastmod>2025-11-13T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/takemichi-hanagaki-cosplay/</loc><lastmod>2025-11-12T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/daredevil-black-suit/</loc><lastmod>2025-11-11T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/diy-blossom-costume/</loc><lastmod>2025-11-10T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/darth-revan-cosplay/</loc><lastmod>2025-11-09T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/link-cosplay/</loc><lastmod>2025-11-08T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/diy-ferris-bueller-costume/</loc><lastmod>2025-11-07T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/tracer-cosplay/</loc><lastmod>2025-11-06T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/cad-bane-costume/</loc><lastmod>2025-11-05T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/ashe-costume/</loc><lastmod>2025-11-04T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/anakin-cosplay/</loc><lastmod>2025-11-03T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/cal-kestis-cosplay/</loc><lastmod>2025-11-02T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/brigitte-costume/</loc><lastmod>2025-11-01T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/grillmaster-76-cosplay/</loc><lastmod>2025-10-31T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/ygritte-costume/</loc><lastmod>2025-10-30T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/steven-universe-costume/</loc><lastmod>2025-10-29T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/elena-avalor-cosplay/</loc><lastmod>2025-10-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/tyrell-cosplay/</loc><lastmod>2025-10-27T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jack-torrance-costume/</loc><lastmod>2025-10-26T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/wendy-torrance-costume/</loc><lastmod>2025-10-25T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/gray-worm-costume/</loc><lastmod>2025-10-24T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/briar-rose-cosplay-dress/</loc><lastmod>2025-10-23T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/prince-phillip-cosplay/</loc><lastmod>2025-10-22T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/princess-aurora-cosplay/</loc><lastmod>2025-10-21T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/missandei-costume/</loc><lastmod>2025-10-20T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/rose-quartz-cosplay/</loc><lastmod>2025-10-19T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/stevonnie-costume/</loc><lastmod>2025-10-18T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/levi-ackerman-cosplay/</loc><lastmod>2025-10-17T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/buck-dewey-cosplay/</loc><lastmod>2025-10-16T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/direwolf-costume/</loc><lastmod>2025-10-15T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/opal-costume/</loc><lastmod>2025-10-14T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/lapis-lazuli-dress/</loc><lastmod>2025-10-13T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/puma-costume/</loc><lastmod>2025-10-12T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/yellow-pearl-cosplay/</loc><lastmod>2025-10-11T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/gene-belcher-costume/</loc><lastmod>2025-10-10T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/amethyst-costume/</loc><lastmod>2025-10-09T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/sardonyx-costume/</loc><lastmod>2025-10-08T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/chris-griffin-costume/</loc><lastmod>2025-10-07T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/meg-griffin-costume/</loc><lastmod>2025-10-06T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/stewie-griffin-costume/</loc><lastmod>2025-10-05T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/queen-miranda-costume/</loc><lastmod>2025-10-04T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/lol-evelynn-cosplay/</loc><lastmod>2025-10-03T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/miss-fortune-costume/</loc><lastmod>2025-10-02T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/cameron-frye-costume/</loc><lastmod>2025-10-01T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/harley-quinn-cosplay/</loc><lastmod>2025-09-30T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/killer-croc-costume/</loc><lastmod>2025-09-29T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/captain-boomerangs-cosplay/</loc><lastmod>2025-09-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/honeydew-mei-costume/</loc><lastmod>2025-09-27T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mccree-costume/</loc><lastmod>2025-09-26T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/pink-diamond-dress/</loc><lastmod>2025-09-25T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/timmy-turner-costume/</loc><lastmod>2025-09-24T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/lucio-costume/</loc><lastmod>2025-09-23T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/soldier-76-costume/</loc><lastmod>2025-09-22T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/reaper-cosplay/</loc><lastmod>2025-09-21T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/gretchen-grundler-cosplay/</loc><lastmod>2025-09-20T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/princess-zelda-dress/</loc><lastmod>2025-09-19T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/ahri-costume/</loc><lastmod>2025-09-18T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/janna-costume/</loc><lastmod>2025-09-17T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/katarina-cosplay/</loc><lastmod>2025-09-16T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/zoe-costume/</loc><lastmod>2025-09-15T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/ezreal-costume/</loc><lastmod>2025-09-14T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/star-guardian-soraka-costume/</loc><lastmod>2025-09-13T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/akali-cosplay/</loc><lastmod>2025-09-12T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/alice-in-wonderland-dance-costume/</loc><lastmod>2025-09-11T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/stefan-salvatore-outfits/</loc><lastmod>2025-09-10T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/ned-stark-costume/</loc><lastmod>2025-09-09T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/zombie-spiderman-costume/</loc><lastmod>2025-09-08T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/tyrion-lannister-costume/</loc><lastmod>2025-09-07T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/linda-belcher-costume/</loc><lastmod>2025-09-06T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/oliver-twist-costume/</loc><lastmod>2025-09-05T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/katherine-pierce-outfits/</loc><lastmod>2025-09-04T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/fix-it-felix-costume/</loc><lastmod>2025-09-03T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/brock-pokemon-costume/</loc><lastmod>2025-09-02T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/blue-diamond-cosplay/</loc><lastmod>2025-09-01T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/troy-bolton-cosplay/</loc><lastmod>2025-08-31T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/gabriella-montez-costume/</loc><lastmod>2025-08-30T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/puss-in-boots-costume/</loc><lastmod>2025-08-29T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/peter-griffin-costume/</loc><lastmod>2025-08-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jar-jar-binks-costume/</loc><lastmod>2025-08-27T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/johnny-cage-costumes/</loc><lastmod>2025-08-26T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/professor-utonium-costume/</loc><lastmod>2025-08-25T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/christine-daae-costume/</loc><lastmod>2025-08-24T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/white-goodman-costume/</loc><lastmod>2025-08-23T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/bo-katan-kryze-costume/</loc><lastmod>2025-08-22T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/miss-bellum-costume/</loc><lastmod>2025-08-21T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mommy-long-legs-costume/</loc><lastmod>2025-08-20T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mojo-jojo-costume/</loc><lastmod>2025-08-19T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/carl-spackler-costume/</loc><lastmod>2025-08-18T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/the-cousin-eddie-dickie-costume/</loc><lastmod>2025-08-17T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/dolores-umbridge-costume/</loc><lastmod>2025-08-16T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/sing-ash-costume/</loc><lastmod>2025-08-15T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mike-ditka-costume/</loc><lastmod>2025-08-14T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/gargamel-costume/</loc><lastmod>2025-08-13T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/the-goonies-adult-sloth-costume/</loc><lastmod>2025-08-12T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/vexy-smurf-costume/</loc><lastmod>2025-08-11T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/tower-of-terror-costume/</loc><lastmod>2025-08-10T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/pablo-escobar-costume/</loc><lastmod>2025-08-09T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/dr-heinz-doofenshmirtz-costume/</loc><lastmod>2025-08-08T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/diy-kim-possible-costume/</loc><lastmod>2025-08-07T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/dexter-morgan-costume/</loc><lastmod>2025-08-06T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/he-man-costume/</loc><lastmod>2025-08-05T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/captain-marvel-costume/</loc><lastmod>2025-08-04T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/adult-skeletor-costume/</loc><lastmod>2025-08-03T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/foxy-cleopatra-outfit/</loc><lastmod>2025-08-02T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/casey-becker-costume/</loc><lastmod>2025-08-01T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/sexy-cupid-costume/</loc><lastmod>2025-07-31T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/the-deep-costume/</loc><lastmod>2025-07-30T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/laurie-strode-costume/</loc><lastmod>2025-07-29T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/jordan-belfort-costume/</loc><lastmod>2025-07-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/midas-costume/</loc><lastmod>2025-07-27T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/mean-girls-christmas-costume/</loc><lastmod>2025-07-26T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/omega-fortnite-costume/</loc><lastmod>2025-07-25T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/joe-biden-costume/</loc><lastmod>2025-07-24T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/a-train-costume/</loc><lastmod>2025-07-23T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/namaari-costume/</loc><lastmod>2025-07-22T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/george-jetson-costume/</loc><lastmod>2025-07-21T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/trolls-dj-suki-costume-for-toddlers/</loc><lastmod>2025-07-20T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/elroy-jetson-costume/</loc><lastmod>2025-07-19T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/brainy-smurf-costume/</loc><lastmod>2025-07-18T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/killer-frost-costume/</loc><lastmod>2025-07-17T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/blippi-mascot-costume/</loc><lastmod>2025-07-16T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/female-marvin-the-martian-costume/</loc><lastmod>2025-07-15T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/deadpool-cosplay/</loc><lastmod>2025-07-14T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/hackus-smurf-costume/</loc><lastmod>2025-07-13T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/deluxe-grinch-costume/</loc><lastmod>2025-07-12T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/grady-twins-costume/</loc><lastmod>2025-07-11T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/smurfette-plus-size-costume/</loc><lastmod>2025-07-10T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/nightwing-young-justice-costume/</loc><lastmod>2025-07-09T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/free-guy-costume/</loc><lastmod>2025-07-08T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/moana-running-costume/</loc><lastmod>2025-07-07T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/emma-frost-costume/</loc><lastmod>2025-07-06T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/barney-rubble-costume/</loc><lastmod>2025-07-05T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/zoey-cosplay/</loc><lastmod>2025-07-04T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/the-exorcist-costume/</loc><lastmod>2025-07-03T12:00:00+00:00</lastmod></url>
</urlset>`;

const SITEMAP_PAGES = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://costumesplanet.com/sitemap.xsl" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<url><loc>https://costumesplanet.com/</loc><lastmod>2026-02-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/categories/</loc><lastmod>2026-02-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/search/</loc><lastmod>2026-02-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/sitemap/</loc><lastmod>2026-02-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/build/</loc><lastmod>2026-02-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/about-us/</loc><lastmod>2026-02-28T12:00:00+00:00</lastmod></url>
\t<url><loc>https://costumesplanet.com/terms-of-use/</loc><lastmod>2026-02-28T12:00:00+00:00</lastmod></url>
</urlset>`;

const SITEMAP_CATEGORIES = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://costumesplanet.com/sitemap.xsl" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\t<url><loc>https://costumesplanet.com/category/Anime/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Cartoon%20Characters/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Classic%20TV%20%26%20Film/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Disney/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Game%20of%20Thrones/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Gaming/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Horror/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Marvel%20%26%20DC/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Movie%20Characters/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Pop%20Culture/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Smurfs/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Star%20Wars/</loc></url>
\t<url><loc>https://costumesplanet.com/category/Steven%20Universe/</loc></url>
</urlset>`;

const ROBOTS_TXT = `# CostumesPlanet.com Robots.txt
# https://costumesplanet.com

User-agent: *
Allow: /
Disallow: /search?*
Disallow: /api/

# Sitemap
Sitemap: https://costumesplanet.com/sitemap.xml

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

User-agent: anthropic-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /
`;

const LLMS_TXT = `# CostumesPlanet.com

> CostumesPlanet is the ultimate costume guide directory with 241+ detailed blog posts covering costumes for Halloween, cosplay conventions, and themed events. Each guide includes product recommendations with Amazon affiliate links, step-by-step dressing instructions, character background info, and FAQs.

## Site Structure

- **Homepage** (https://costumesplanet.com/) — Browse all 241 costume guides
- **Blog Posts** (https://costumesplanet.com/{slug}) — Individual costume guides
- **Categories** (https://costumesplanet.com/categories) — Browse by franchise/genre
- **Search** (https://costumesplanet.com/search?q={query}) — Full-text search

## Categories

  - Anime (10 costumes)
  - Cartoon Characters (7 costumes)
  - Classic TV & Film (6 costumes)
  - Disney (24 costumes)
  - Game of Thrones (16 costumes)
  - Gaming (34 costumes)
  - Horror (5 costumes)
  - Marvel & DC (27 costumes)
  - Movie Characters (4 costumes)
  - Pop Culture (90 costumes)
  - Smurfs (6 costumes)
  - Star Wars (4 costumes)
  - Steven Universe (11 costumes)

## Content Per Guide

Each costume guide includes:
1. Hero section with featured image
2. Product table with Amazon affiliate "Buy on Amazon" buttons (tag: cplanet0c-20)
3. Step-by-step dressing guide (timeline format)
4. "About the Character" section
5. 7 frequently asked questions with detailed answers
6. Related costume suggestions
7. Full JSON-LD structured data (Article, Product, FAQPage, HowTo, BreadcrumbList)

## Contact

Website: https://costumesplanet.com
`;

// ─── Route Map ───────────────────────────────────────────────────────────────

const STATIC_ROUTES = {
  "/sitemap.xml":              { body: SITEMAP_INDEX,      ct: "application/xml; charset=utf-8",  cc: "public, max-age=3600,  s-maxage=3600",  robots: true  },
  "/sitemap-posts-1.xml":      { body: SITEMAP_POSTS,      ct: "application/xml; charset=utf-8",  cc: "public, max-age=3600,  s-maxage=3600",  robots: true  },
  "/sitemap-posts.xml":        { body: SITEMAP_POSTS,      ct: "application/xml; charset=utf-8",  cc: "public, max-age=3600,  s-maxage=3600",  robots: true  },
  "/sitemap-pages-1.xml":      { body: SITEMAP_PAGES,      ct: "application/xml; charset=utf-8",  cc: "public, max-age=3600,  s-maxage=3600",  robots: true  },
  "/sitemap-pages.xml":        { body: SITEMAP_PAGES,      ct: "application/xml; charset=utf-8",  cc: "public, max-age=3600,  s-maxage=3600",  robots: true  },
  "/sitemap-categories-1.xml": { body: SITEMAP_CATEGORIES, ct: "application/xml; charset=utf-8",  cc: "public, max-age=3600,  s-maxage=3600",  robots: true  },
  "/sitemap-categories.xml":   { body: SITEMAP_CATEGORIES, ct: "application/xml; charset=utf-8",  cc: "public, max-age=3600,  s-maxage=3600",  robots: true  },
  "/robots.txt":               { body: ROBOTS_TXT,         ct: "text/plain; charset=utf-8",       cc: "public, max-age=86400, s-maxage=86400", robots: false },
  "/llms.txt":                 { body: LLMS_TXT,           ct: "text/plain; charset=utf-8",       cc: "public, max-age=86400, s-maxage=86400", robots: false },
};

// ─── Worker ──────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    const url  = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";  // strip trailing slash

    // CORS pre-flight
    if (request.method === "OPTIONS") {
      const route = STATIC_ROUTES[path];
      if (route) {
        return new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin":  "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }
    }

    // Static SEO route — return baked-in content immediately
    const route = STATIC_ROUTES[path];
    if (route && request.method === "GET") {
      const headers = new Headers({
        "Content-Type":                route.ct,
        "Cache-Control":               route.cc,
        "Access-Control-Allow-Origin": "*",
        "X-Served-By":                 "CostumesPlanet-StaticWorker",
        "Vary":                        "Accept-Encoding",
      });
      if (route.robots) {
        headers.set("X-Robots-Tag", "noindex");
      }
      return new Response(route.body, { status: 200, headers });
    }

    // Everything else → pass through to the origin (React SPA)
    return fetch(request);
  },
};
