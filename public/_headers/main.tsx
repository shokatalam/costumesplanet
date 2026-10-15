# Cloudflare Pages / Netlify _headers file
# Forces correct Content-Type for SEO files served as static assets.
# Without this, some CDNs serve .xml files as text/html → browser/crawler confusion.

/sitemap.xml
  Content-Type: application/xml; charset=utf-8
  X-Robots-Tag: noindex
  Cache-Control: public, max-age=3600

/sitemap-posts-1.xml
  Content-Type: application/xml; charset=utf-8
  X-Robots-Tag: noindex
  Cache-Control: public, max-age=3600

/sitemap-pages-1.xml
  Content-Type: application/xml; charset=utf-8
  X-Robots-Tag: noindex
  Cache-Control: public, max-age=3600

/sitemap-categories-1.xml
  Content-Type: application/xml; charset=utf-8
  X-Robots-Tag: noindex
  Cache-Control: public, max-age=3600

/sitemap-posts.xml
  Content-Type: application/xml; charset=utf-8
  X-Robots-Tag: noindex
  Cache-Control: public, max-age=3600

/sitemap-pages.xml
  Content-Type: application/xml; charset=utf-8
  X-Robots-Tag: noindex
  Cache-Control: public, max-age=3600

/sitemap-categories.xml
  Content-Type: application/xml; charset=utf-8
  X-Robots-Tag: noindex
  Cache-Control: public, max-age=3600

/robots.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=86400

/llms.txt
  Content-Type: text/plain; charset=utf-8
  Cache-Control: public, max-age=86400
