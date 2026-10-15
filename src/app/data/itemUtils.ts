// Pure helpers for product lists scraped from the original WordPress posts.
// Shared by the app (BlogPost) and the build-time prerender script.

export interface ProductLink {
  name: string;
  url: string;
  note?: string;
}

export function cleanItemName(name: string): string {
  return name
    .replace(/\s*(See|Buy|View|Check|Shop|Get) on\s*(Amazon)?\.?\s*$/i, "")
    .replace(/\s*on Amazon\s*$/i, "")
    .replace(/\s*- Amazon\.com.*$/i, "")
    .replace(/\s*\| Amazon\.com.*$/i, "")
    .replace(/\s*:.*Amazon.*$/i, "")
    .replace(/\s*:\s*$/, "")
    .trim();
}

// Scraped lists repeat products (a summary list and a detailed list in the
// same post) and include post headings captured as "items". Clean both.
export function tidyProductList(items: { name: string; url: string }[]): ProductLink[] {
  const seen = new Set<string>();
  const out: ProductLink[] = [];
  for (const raw of items) {
    if (!raw?.url?.startsWith("http") || !raw.name) continue;
    const name = cleanItemName(raw.name);
    if (!name || /^(how to|the .* costume idea|.*(dressing guide|costume guide|a guide to))/i.test(name)) continue;
    const key = raw.url.split("?")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name, url: raw.url });
  }
  return out;
}
