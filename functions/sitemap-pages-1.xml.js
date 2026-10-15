/**
 * Cloudflare Pages Function — /sitemap-pages-1.xml
 */

const BODY = `<?xml version="1.0" encoding="UTF-8"?>
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
