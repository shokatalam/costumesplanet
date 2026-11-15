import { useParams, Link } from "react-router";
import { ChevronRight, ShoppingCart, ExternalLink, BookOpen, HelpCircle, Users, Check, ListChecks, Zap, Layers } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { getCostumeBySlug, costumes } from "../data/costumes";
import { getOriginalPhoto, getHeroGraphic, onImageMapUpdate, refreshImageMap } from "../data/costumeImages";
import { BlogCard } from "./BlogCard";
import { ShoppingChecklist } from "./ShoppingChecklist";
import { getScrapedItems, onItemMapUpdate } from "../data/costumeLinks";
import { tidyProductList, type ProductLink } from "../data/itemUtils";
import type { GuideSection } from "../data/guides";
import { getExternalLinks } from "../data/costumeAuthLinks";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { RawSitemapView } from "./RawSitemapView";
import { hubFor, categoryPath, relatedGuides, anchorName, isIndexable } from "../data/site";

const RESERVED_PATHS = new Set(["categories", "category", "search", "sitemap", "sitemap.xml", "sitemap-pages.xml", "sitemap-posts.xml", "sitemap-categories.xml", "robots.txt", "llms.txt"]);
const SEO_FILE_MAP: Record<string, string> = {
  "sitemap.xml": "sitemap.xml",
  "sitemap-pages.xml": "sitemap-pages.xml",
  "sitemap-posts.xml": "sitemap-posts.xml",
  "sitemap-categories.xml": "sitemap-categories.xml",
  "robots.txt": "robots.txt",
  "llms.txt": "llms.txt",
};

const display = { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 } as const;

// ── Amazon CTA ──
const AFFILIATE_TAG = "cplanet0c-20";

/**
 * Extract ASIN from any Amazon URL (10-char alphanumeric after /dp/ or /gp/product/).
 */
function extractAsin(url: string): string | null {
  const m =
    url.match(/\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i) ||
    url.match(/\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i) ||
    url.match(/[?&](?:ASIN|asin)=([A-Z0-9]{10})(?:&|$)/i);
  return m ? m[1].toUpperCase() : null;
}

/**
 * Final client-side URL guard.
 * - Already a clean dp link → keep it
 * - Has an ASIN anywhere in the URL → strip broken session params, rebuild clean dp link
 * - No ASIN → keyword search fallback
 * This handles linkCode=sl1, qid=, crid=, sprefix=, ref_= and all other expired session params.
 */
function toSafeUrl(url: string, productName: string): string {
  if (!url) {
    const q = (productName || "Halloween costume").trim();
    return `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;
  }
  // Already a clean direct dp link with our tag → keep
  if (/amazon\.com\/dp\/[A-Z0-9]{10}\?tag=/i.test(url)) return url;
  // Extract ASIN and build clean link
  const asin = extractAsin(url);
  if (asin) return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
  // Already an Amazon URL (any format) with our tag → keep as-is
  if (/amazon\.com/i.test(url) && url.includes(`tag=${AFFILIATE_TAG}`)) return url;
  // Amazon URL without our tag → add it
  if (/amazon\.com/i.test(url)) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.delete("tag");
      parsed.searchParams.set("tag", AFFILIATE_TAG);
      return parsed.toString();
    } catch { /* fall through */ }
  }
  // Fallback: keyword search
  const q = (productName || "Halloween costume").trim();
  return `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${AFFILIATE_TAG}`;
}

function AmazonButton({ url, name }: { url: string; name?: string }) {
  const safeHref = toSafeUrl(url, name || "Halloween costume");
  return (
    <motion.a
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF9900] to-[#ffb84d] text-white text-sm rounded-xl shadow-[0_4px_16px_rgba(255,153,0,0.25)] hover:shadow-[0_6px_24px_rgba(255,153,0,0.4)] transition-all whitespace-nowrap overflow-hidden"
      style={{ fontWeight: 600 }}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600" />
      <ShoppingCart className="w-4 h-4" />
      Buy on Amazon
    </motion.a>
  );
}

function H2({ id, icon: Icon, children }: { id: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 flex items-center gap-3 text-2xl md:text-[1.7rem] text-gray-900 mb-6" style={display}>
      <span className="w-10 h-10 rounded-xl bg-[#1a237e] text-white flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </span>
      {children}
    </h2>
  );
}

export const sectionId = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

function Sections({ list }: { list: GuideSection[] }) {
  if (!list.length) return null;
  return (
    <>
      {list.map((sec) => (
        <section key={sec.heading} className="mt-14">
          <h2 id={sectionId(sec.heading)} className="scroll-mt-24 text-2xl md:text-[1.7rem] text-gray-900 mb-5" style={display}>
            {sec.heading}
          </h2>
          {sec.paragraphs?.map((p, i) => (
            <p key={i} className="text-gray-700 leading-[1.85] text-[1.02rem] mb-5">{p}</p>
          ))}
          {sec.table && (
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white mb-5">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="bg-gray-50 text-gray-500 text-left">
                  <tr>{sec.table.head.map((h) => <th key={h} className="px-4 py-3" style={{ fontWeight: 600 }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {sec.table.rows.map((r, i) => (
                    <tr key={i} className="border-t border-gray-100 align-top">
                      {r.map((cell, j) => (
                        <td key={j} className={`px-4 py-3 ${j === 0 ? "text-gray-900" : "text-gray-600"}`} style={j === 0 ? { fontWeight: 600 } : undefined}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {sec.bullets && (
            <ul className="space-y-3 mb-5">
              {sec.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                  <Check className="w-4 h-4 text-[#FF9900] shrink-0 mt-1.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </>
  );
}

/**
 * The original costume photo (Supabase). Renders nothing if there is no photo
 * or it fails to load, so the header never shows an empty frame.
 */
function CharacterPhoto({ slug, alt }: { slug: string; alt: string }) {
  const [url, setUrl] = useState(() => getOriginalPhoto(slug));
  const [failed, setFailed] = useState(false);
  const retried = useRef(false);
  useEffect(() => {
    setUrl(getOriginalPhoto(slug));
    setFailed(false);
    retried.current = false;
    return onImageMapUpdate(() => {
      const next = getOriginalPhoto(slug);
      setUrl(next);
      if (next) setFailed(false);
    });
  }, [slug]);
  if (!url || failed) return null;
  return (
    <figure className="mt-8 lg:mt-0 rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl shadow-black/30 aspect-[768/461] bg-white">
      <img
        src={url}
        alt={alt}
        className="w-full h-full object-contain"
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => {
          setFailed(true);
          if (!retried.current) {
            retried.current = true;
            void refreshImageMap();
          }
        }}
      />
    </figure>
  );
}

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const costume = getCostumeBySlug(slug || "");
  const [, forceUpdate] = useState(0);
  const hw = costume ? isIndexable(costume) : false;

  useDocumentMeta({
    title: costume?.seoTitle || "Costume Guide | CostumesPlanet",
    description: costume?.metaDescription || "Costume and cosplay guides: the pieces you need and how to put them together.",
    canonical: costume ? `https://costumesplanet.com/${costume.slug}/` : undefined,
    robots: costume && !hw ? "noindex, follow" : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  useEffect(() => onItemMapUpdate(() => forceUpdate((n: number) => n + 1)), []);

  if (slug && SEO_FILE_MAP[slug]) return <RawSitemapView endpoint={SEO_FILE_MAP[slug]} />;
  if (slug && RESERVED_PATHS.has(slug)) return null;

  if (!costume) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <h1 className="text-gray-900 text-3xl mb-4" style={display}>Costume not found</h1>
        <p className="text-gray-500 mb-8">We couldn't find that guide.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a237e] text-white rounded-xl">&larr; Back to home</Link>
      </div>
    );
  }

  const name = anchorName(costume);
  const hub = hubFor(costume.category);
  const hubLabel = hub ? hub.h1.split(":")[0] : costume.category;
  const related = relatedGuides(costume, costumes, 6);
  const siblings = related.filter((r) => r.category === costume.category && r.handwritten).slice(0, 5);

  const scraped = getScrapedItems(costume.slug);
  const tidied = scraped ? tidyProductList(scraped) : [];
  const items: ProductLink[] =
    costume.curatedItems ?? (tidied.length > 0 ? tidied : costume.items.map((it) => ({ name: it.name, url: it.amazonUrl })));

  const intro = costume.introSection.split("\n\n");
  const external = getExternalLinks(costume.slug, costume.category);
  const sections = costume.sections ?? [];
  const at = (p: "top" | "middle" | "end") => sections.filter((x) => (x.placement ?? "middle") === p);
  const sectionText = sections.flatMap((x) => [...(x.paragraphs ?? []), ...(x.bullets ?? []), ...(x.table?.rows.flat() ?? [])]);
  const words = [costume.introSection, costume.aboutSection, ...sectionText, ...costume.faqs.map((f) => f.answer), ...items.map((i) => i.note || "")].join(" ").split(/\s+/).length;
  const minutes = Math.max(2, Math.round(words / 220));

  const toc = [
    ...at("top").map((x) => [sectionId(x.heading), x.heading]),
    ["shopping-list", "Shopping list"],
    ...at("middle").map((x) => [sectionId(x.heading), x.heading]),
    ["how-to-wear", "How to put it on"],
    ...at("end").map((x) => [sectionId(x.heading), x.heading]),
    ["about", `About ${name}`],
    ["faq", "FAQ"],
    ["related", "Related costumes"],
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-[#fafbff]">
      {/* ═══ HEADER ═══ */}
      <header className="bg-gradient-to-br from-[#070b2e] via-[#111b63] to-[#1a237e] text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-8 pb-10 lg:grid lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-10 lg:items-center">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/50 mb-6 min-w-0">
              <Link to="/" className="hover:text-white shrink-0">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link to={categoryPath(costume.category)} className="hover:text-white truncate">{hubLabel}</Link>
            </nav>
            <h1 className="text-3xl md:text-[2.6rem] leading-[1.12] max-w-4xl" style={display}>{costume.h1Title}</h1>
            <p className="mt-4 text-sm text-white/60">
              By the CostumesPlanet editors · Updated <time dateTime={costume.dateModified}>{fmt(costume.dateModified)}</time> · {minutes} min read
            </p>
          </div>
          <CharacterPhoto slug={costume.slug} alt={`${name} costume`} />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-10 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
        <article className="min-w-0">
          {/* ═══ QUICK ANSWER ═══ */}
          <section id="quick-answer" className="bg-white rounded-2xl border border-gray-200 border-l-4 border-l-[#FF9900] p-6 md:p-7 shadow-sm">
            <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF9900] mb-3" style={{ fontWeight: 800 }}>
              <Zap className="w-4 h-4" /> Quick answer
            </p>
            <p className="text-gray-900 text-[1.05rem] leading-relaxed" style={{ fontWeight: 500 }}>{intro[0]}</p>
            {costume.quickFacts && costume.quickFacts.length > 0 && (
              <dl className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-gray-100 pt-5">
                {costume.quickFacts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs text-gray-400">{f.label}</dt>
                    <dd className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <a href="#shopping-list" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a237e] text-white text-sm hover:bg-[#283593]" style={{ fontWeight: 600 }}>
              <ShoppingCart className="w-4 h-4" /> Check what you already own ({items.length} pieces)
            </a>
          </section>

          {/* ═══ INTRO ═══ */}
          {intro.length > 1 && (
            <div className="mt-8 space-y-5">
              {intro.slice(1).map((p, i) => (
                <p key={i} className="text-gray-700 leading-[1.85] text-[1.02rem]">{p}</p>
              ))}
            </div>
          )}

          <Sections list={at("top")} />

          {/* ═══ SHOPPING LIST ═══ */}
          <section className="mt-12">
            <H2 id="shopping-list" icon={ShoppingCart}>{name} costume shopping list</H2>
            {getHeroGraphic(costume.slug) && (
              <figure className="mb-6 rounded-2xl overflow-hidden border border-gray-100 bg-[#0b1240]">
                <img
                  src={getHeroGraphic(costume.slug)}
                  alt={`${name} costume: what you need at a glance`}
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block"
                />
              </figure>
            )}
            <ShoppingChecklist slug={costume.slug} name={name} items={items} fastestFirst={!!costume.handwritten} BuyButton={AmazonButton} />
            <p className="mt-4 text-xs text-gray-400">As an Amazon Associate we earn from qualifying purchases. Links open Amazon results for the piece described.</p>
          </section>

          <Sections list={at("middle")} />

          {/* ═══ HOW TO WEAR ═══ */}
          <section className="mt-14">
            <H2 id="how-to-wear" icon={BookOpen}>How to put on a {name} costume</H2>
            <ol className="space-y-4">
              {costume.dressingGuide.map((section, i) => (
                <li key={i} className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6">
                  <h3 className="text-gray-900 mb-3 flex items-center gap-3" style={{ fontWeight: 700 }}>
                    <span className="text-xs px-2 py-1 rounded-md bg-[#1a237e] text-white">Step {i + 1}</span>
                    {section.itemName}
                  </h3>
                  <ul className="space-y-2">
                    {section.steps.map((step, j) => (
                      <li key={j} className="flex gap-3 text-gray-700 leading-relaxed">
                        <Check className="w-4 h-4 text-[#FF9900] shrink-0 mt-1" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <Sections list={at("end")} />

          {/* ═══ ABOUT ═══ */}
          <section className="mt-14">
            <H2 id="about" icon={Users}>About {name}</H2>
            <div className="space-y-5">
              {costume.aboutSection.split("\n\n").map((p, i) => (
                <p key={i} className="text-gray-700 leading-[1.85]">{p}</p>
              ))}
            </div>
          </section>

          {/* ═══ FAQ (always visible; matches FAQPage schema) ═══ */}
          <section className="mt-14">
            <H2 id="faq" icon={HelpCircle}>{name} costume FAQ</H2>
            <div className="divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100">
              {costume.faqs.map((f, i) => (
                <div key={i} className="p-5 md:p-6">
                  <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>{f.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ SOURCES ═══ */}
          {external.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 700 }}>Sources</h2>
              <ul className="flex flex-wrap gap-2">
                {external.map((l, i) => (
                  <li key={i}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:text-[#1a237e]">
                      {l.label} <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        {/* ═══ SIDEBAR ═══ */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <nav aria-label="On this page" className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 700 }}>
                <ListChecks className="w-4 h-4" /> On this page
              </p>
              <ul className="space-y-2 text-sm">
                {toc.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-gray-600 hover:text-[#1a237e]">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            {items[0] && (
              <div className="bg-[#111b63] text-white rounded-2xl p-5">
                <p className="text-xs uppercase tracking-wider text-[#FF9900] mb-2" style={{ fontWeight: 800 }}>Short on time?</p>
                <p className="text-sm text-white/80 mb-4">{items[0].name}</p>
                <AmazonButton url={items[0].url} name={items[0].name} />
              </div>
            )}
            {siblings.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 700 }}>
                  <Layers className="w-4 h-4" /> More from {hub?.name ?? costume.category}
                </p>
                <ul className="space-y-2 text-sm">
                  {siblings.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/${s.slug}/`} className="text-gray-700 hover:text-[#1a237e]">{anchorName(s)} costume</Link>
                    </li>
                  ))}
                </ul>
                <Link to={categoryPath(costume.category)} className="mt-4 inline-flex items-center gap-1 text-sm text-[#1a237e]" style={{ fontWeight: 600 }}>
                  All {hubLabel} <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ═══ RELATED ═══ */}
      {related.length > 0 && (
        <section className="bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
            <h2 id="related" className="scroll-mt-24 text-2xl text-gray-900 mb-2" style={display}>Related costume guides</h2>
            <p className="text-gray-500 mb-8">
              More from{" "}
              <Link to={categoryPath(costume.category)} className="text-[#1a237e] hover:underline" style={{ fontWeight: 600 }}>{hubLabel}</Link>{" "}
              and similar franchises.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <BlogCard key={r.slug} costume={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
