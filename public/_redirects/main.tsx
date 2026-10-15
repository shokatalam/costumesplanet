# CostumesPlanet.com — Cloudflare Pages redirect rules
# These fire BEFORE the SPA catch-all, sending sitemap/robots paths
# to the Supabase edge function which returns real application/xml.
# Google follows 301 redirects for sitemaps — this is the fix.

/sitemap.xml               https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/sitemap.xml               301
/sitemap-posts-1.xml       https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/sitemap-posts-1.xml       301
/sitemap-pages-1.xml       https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/sitemap-pages-1.xml       301
/sitemap-categories-1.xml  https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/sitemap-categories-1.xml  301
/sitemap-posts.xml         https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/sitemap-posts.xml         301
/sitemap-pages.xml         https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/sitemap-pages.xml         301
/sitemap-categories.xml    https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/sitemap-categories.xml    301
/robots.txt                https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/robots.txt                301
/llms.txt                  https://zfyzswugzpcqeloupbdb.supabase.co/functions/v1/make-server-0d51dc15/llms.txt                  301

# SPA catch-all — must be LAST
/*                         /index.html                                                                                           200
