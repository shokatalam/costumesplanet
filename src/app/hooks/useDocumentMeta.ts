import { useEffect } from "react";

const DEFAULT_TITLE = "CostumesPlanet — #1 Costume & Cosplay Guide Directory";
const DEFAULT_DESC = "Expert-verified costume guides with curated Amazon picks, step-by-step instructions, and cosplay community tips.";

/**
 * Sets document.title, meta description, and Open Graph tags for SEO.
 * Does NOT restore previous title on unmount — prevents flash of
 * platform-injected default title during SPA navigation.
 */
export function useDocumentMeta({
  title,
  description,
  canonical,
}: {
  title: string;
  description: string;
  canonical?: string;
}) {
  useEffect(() => {
    // ── Title ──
    document.title = title;

    // ── Meta description ──
    let metaDesc = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    const prevDesc = metaDesc?.getAttribute("content") || "";
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // ── Open Graph title ──
    let ogTitle = document.querySelector(
      'meta[property="og:title"]'
    ) as HTMLMetaElement | null;
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    // ── Open Graph description ──
    let ogDesc = document.querySelector(
      'meta[property="og:description"]'
    ) as HTMLMetaElement | null;
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    // ── Canonical ──
    let canonicalEl = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    const prevCanonical = canonicalEl?.getAttribute("href") || "";
    if (canonical) {
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.rel = "canonical";
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", canonical);
    }

    // ── Robots (index, follow) ──
    let robots = document.querySelector(
      'meta[name="robots"]'
    ) as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1");

    return () => {
      // Restore to our own default — never let the platform title leak through
      document.title = DEFAULT_TITLE;
      if (metaDesc) metaDesc.setAttribute("content", DEFAULT_DESC);
      if (canonicalEl && canonical) canonicalEl.setAttribute("href", "");
    };
  }, [title, description, canonical]);
}