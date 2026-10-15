/**
 * Cloudflare Pages Function — /sitemap-categories-1.xml
 */

const BODY = `<?xml version="1.0" encoding="UTF-8"?>
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
