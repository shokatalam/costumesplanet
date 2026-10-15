/**
 * Cloudflare Pages Function — /sitemap.xml
 * Runs server-side at the edge before the React SPA.
 * Returns the sitemap index as real application/xml.
 */

const BODY = `<?xml version="1.0" encoding="UTF-8"?>
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

export async function onRequestGet() {
  return new Response(BODY, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Robots-Tag": "noindex",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
