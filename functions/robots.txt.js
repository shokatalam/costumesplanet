/**
 * Cloudflare Pages Function — /robots.txt
 */

const BODY = `# CostumesPlanet.com Robots.txt
User-agent: *
Allow: /
Disallow: /search?*
Disallow: /api/

Sitemap: https://costumesplanet.com/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: YandexBot
Allow: /
Crawl-delay: 2

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

export async function onRequestGet() {
  return new Response(BODY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
