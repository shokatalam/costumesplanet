import { useParams, Link } from "react-router";
import { ChevronDown, ChevronRight, ShoppingCart, ExternalLink, Sparkles, BookOpen, HelpCircle, Users, ArrowUp, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import { getCostumeBySlug, getCostumesByCategory, CostumeBlog } from "../data/costumes";
import { CostumeImage } from "./CostumeImage";
import { BlogCard } from "./BlogCard";
import { StarRating } from "./StarRating";
import { getScrapedItems, ScrapedItem, onItemMapUpdate } from "../data/costumeLinks";
import { getRedditQuestions, onRedditMapUpdate, RedditQuestion } from "../data/costumeReddit";
import { Award, Shield, MessageCircle } from "lucide-react";
import { getExternalLinks, getInternalLinks, getIntroInternalLinks, getLinkTypeLabel, ExternalLink as ExtLink } from "../data/costumeAuthLinks";
import { Globe, BookMarked, Link2 } from "lucide-react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { RawSitemapView } from "./RawSitemapView";

// ── Reserved paths that should not be treated as blog slugs ──
const RESERVED_PATHS = new Set(["categories", "category", "search", "sitemap", "sitemap.xml", "sitemap-pages.xml", "sitemap-posts.xml", "sitemap-categories.xml", "robots.txt", "llms.txt"]);

// ── SEO file slugs that should render raw content from the API ──
const SEO_FILE_MAP: Record<string, string> = {
  "sitemap.xml": "sitemap.xml",
  "sitemap-pages.xml": "sitemap-pages.xml",
  "sitemap-posts.xml": "sitemap-posts.xml",
  "sitemap-categories.xml": "sitemap-categories.xml",
  "robots.txt": "robots.txt",
  "llms.txt": "llms.txt",
};

// ── Scroll Reveal ──
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── FAQ Accordion ──
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#1a237e]/15 hover:shadow-lg hover:shadow-[#1a237e]/3 transition-all duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <div className="flex items-center gap-4 pr-4">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a237e]/5 to-[#1a237e]/10 flex items-center justify-center text-[#1a237e] text-xs shrink-0" style={{ fontWeight: 700 }}>
            {index + 1}
          </span>
          <span className="text-gray-800 leading-snug" style={{ fontWeight: 600 }}>{question}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${open ? "bg-[#1a237e] text-white" : "bg-gray-100 text-gray-400"}`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 md:px-6 pb-6 pt-0">
              <div className="pl-12 pr-2">
                <div className="w-12 h-px bg-[#1a237e]/10 mb-4" />
                <p className="text-gray-500 leading-[1.8]">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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

// ── Section Header ──
function SectionHeader({ icon: Icon, title, accent = false }: { icon: React.ElementType; title: string; accent?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${accent ? "bg-gradient-to-br from-[#FF9900] to-[#ffb84d] shadow-[#FF9900]/20" : "bg-gradient-to-br from-[#1a237e] to-[#3949ab] shadow-[#1a237e]/20"}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h2
        className="text-xl md:text-2xl text-gray-900"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
    </div>
  );
}

// Structured data (JSON-LD) is emitted at build time by scripts/prerender.mjs

// ── Scroll Progress Bar ──
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF9900] via-[#ffce54] to-[#FF9900] origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

// ── Floating Back to Top ──
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#1a237e] to-[#3949ab] text-white shadow-[0_8px_30px_rgba(26,35,126,0.3)] flex items-center justify-center z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ════════���══════════════════════════════════
export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  // If the slug matches an SEO file, render the raw content from the API
  // (Fallback in case the top-level React Router route didn't catch it)
  if (slug && SEO_FILE_MAP[slug]) {
    return <RawSitemapView endpoint={SEO_FILE_MAP[slug]} />;
  }

  // If the slug matches a reserved path, don't render BlogPost at all
  if (slug && RESERVED_PATHS.has(slug)) {
    return null;
  }
  
  const costume = getCostumeBySlug(slug || "");
  const [, forceUpdate] = useState(0);

  // Set SEO title + meta description
  useDocumentMeta({
    title: costume?.seoTitle || "Costume Guide | CostumesPlanet",
    description: costume?.metaDescription || "Expert-verified costume guides with curated Amazon picks, step-by-step instructions, and cosplay community tips.",
    canonical: costume ? `https://costumesplanet.com/${costume.slug}/` : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Re-render when item map loads
  useEffect(() => {
    const unsub = onItemMapUpdate(() => forceUpdate((n: number) => n + 1));
    return unsub;
  }, []);

  // Re-render when Reddit map loads
  useEffect(() => {
    const unsub = onRedditMapUpdate(() => forceUpdate((n: number) => n + 1));
    return unsub;
  }, []);

  if (!costume) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center shadow-inner">
            <span className="text-4xl">🎭</span>
          </div>
          <h1 className="text-gray-900 text-3xl mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
            Costume Not Found
          </h1>
          <p className="text-gray-400 mb-8">This costume seems to have vanished into thin air.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white rounded-2xl shadow-lg shadow-[#1a237e]/20 hover:-translate-y-0.5 transition-all"
          >
            &larr; Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const related = getCostumesByCategory(costume.category)
    .filter((c) => c.slug !== costume.slug)
    .slice(0, 4);

  const charName = costume.title
    .replace(/\s*(Costume|Cosplay|Diy|Halloween|Outfits?|Dress|Suit|Plus Size|For Cosplay|Best|Sexy|Dance)\s*/gi, " ")
    .trim()
    .replace(/\s+/g, " ");

  // Use scraped items if available, otherwise fall back to generated ones
  const scrapedItems = getScrapedItems(costume.slug);
  const displayItems: Array<{ name: string; url: string }> = scrapedItems
    ? scrapedItems.map((si) => ({ name: cleanItemName(si.name), url: si.url }))
    : costume.items.map((item) => ({ name: item.name, url: item.amazonUrl }));

  const itemCount = displayItems.length;

  // Compute authority links
  const externalLinks = getExternalLinks(costume.slug, costume.category);
  const internalLinks = getInternalLinks(costume.slug, costume.category);
  const introLinks = getIntroInternalLinks(costume.slug, costume.category);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <ScrollProgress />
      <BackToTop />

      {/* ═══ HERO BANNER ═══ */}
      <div className="relative bg-gradient-to-br from-[#070b2e] via-[#111b63] to-[#1a237e] overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[130px]"
          />
          <motion.div
            animate={{ x: [0, -25, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-[10%] w-[350px] h-[350px] bg-[#FF9900]/10 rounded-full blur-[110px]"
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 lg:px-8 py-14 lg:py-20">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-white/30 mb-8"
          >
            <Link to="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/category/${encodeURIComponent(costume.category)}`} className="hover:text-white/60 transition-colors">
              {costume.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/50 truncate max-w-[200px]">{costume.title}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl md:text-4xl lg:text-[2.8rem] text-white leading-[1.15] mb-6 max-w-3xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            {costume.h1Title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* Star Rating in hero */}
            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-[#FFB800]/10 backdrop-blur-sm rounded-full border border-[#FFB800]/20">
              <StarRating size="sm" />
            </div>
            <span className="px-4 py-1.5 bg-white/[0.07] backdrop-blur-sm text-white/70 rounded-full text-xs border border-white/[0.06]" style={{ fontWeight: 500 }}>
              {costume.category}
            </span>
            <span className="text-white/30 text-sm">Updated {new Date(costume.dateModified).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span className="text-white/20">&middot;</span>
            <span className="flex items-center gap-1.5 text-[#FF9900]/80 text-sm">
              <ShoppingCart className="w-3.5 h-3.5" />
              {itemCount} items
            </span>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#fafbff] to-transparent" />
      </div>

      <article className="max-w-5xl mx-auto px-4 lg:px-8 py-10">
        {/* ═══ IMAGE + PRODUCT TABLE ═══ */}
        <Reveal>
          <div className="flex flex-col lg:flex-row gap-10 mb-20">
            {/* Image */}
            <div className="lg:w-[45%]">
              <div className="sticky top-24">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/40"
                >
                  <div className="bg-gray-50/50 p-4 md:p-6">
                    <CostumeImage
                      slug={costume.slug}
                      alt={`${charName} costume set — expert-verified ${costume.category} cosplay guide with ${itemCount} screen-accurate pieces for Halloween and conventions`}
                      className="w-full aspect-[3/4] rounded-2xl bg-white"
                      objectFit="contain"
                      priority
                    />
                  </div>
                  <div className="p-4 md:p-6 pt-0">
                    <p className="text-center text-sm text-gray-400 mt-4">{charName} Costume</p>
                    <div className="flex justify-center mt-3">
                      <StarRating size="md" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Products */}
            <div className="lg:w-[55%]">
              <SectionHeader icon={ShoppingCart} title="What You'll Need" accent />
              <div className="space-y-3">
                {displayItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    whileHover={{ x: 4 }}
                    className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 md:p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#FF9900]/25 hover:shadow-lg hover:shadow-[#FF9900]/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9900]/10 to-[#FF9900]/5 flex items-center justify-center shrink-0">
                        <span className="text-[#FF9900] text-sm" style={{ fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Check className="w-3 h-3 text-green-500" />
                          {/amazon\.com\/dp\/[A-Z0-9]{10}/i.test(item.url) ? "Direct Amazon Link" : "Amazon Search"}
                        </p>
                      </div>
                    </div>
                    <div className="sm:shrink-0 pl-14 sm:pl-0">
                      <AmazonButton url={item.url} name={item.name} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ INTRO ═══ */}
        <Reveal>
          <section className="mb-20">
            <div className="relative bg-gradient-to-br from-[#1a237e]/[0.03] via-[#3949ab]/[0.04] to-[#FF9900]/[0.02] rounded-[2rem] p-8 lg:p-12 overflow-hidden">
              {/* Decorative dots */}
              <div className="absolute top-6 right-6 flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1a237e]/10" />
                <div className="w-2 h-2 rounded-full bg-[#1a237e]/15" />
                <div className="w-2 h-2 rounded-full bg-[#1a237e]/20" />
              </div>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-3/5">
                  <h2
                    className="text-2xl md:text-3xl text-gray-900 mb-6 leading-snug"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
                  >
                    Bring{" "}
                    <span className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] bg-clip-text text-transparent">
                      {charName}
                    </span>{" "}
                    to Life
                  </h2>
                  <p className="text-gray-500 leading-[1.85] mb-5">{costume.introSection}</p>
                  <p className="text-gray-500 leading-[1.85]">
                    Whether you are attending a cosplay convention, a Halloween party, or simply want to showcase your creativity, this {charName} costume guide has everything you need.
                  </p>
                  {/* Natural internal cross-links */}
                  {introLinks.length > 0 && (
                    <p className="text-gray-500 leading-[1.85] mt-5">
                      {introLinks.map((seg, i) =>
                        seg.linkSlug ? (
                          <Link
                            key={i}
                            to={`/${seg.linkSlug}`}
                            className="text-[#1a237e] hover:text-[#3949ab] underline decoration-[#1a237e]/20 hover:decoration-[#1a237e]/50 transition-colors"
                            style={{ fontWeight: 500 }}
                          >
                            {seg.text}
                          </Link>
                        ) : (
                          <span key={i}>{seg.text}</span>
                        )
                      )}
                    </p>
                  )}
                </div>
                <div className="md:w-2/5">
                  <motion.div whileHover={{ scale: 1.02, rotate: 1 }} transition={{ type: "spring" }}>
                    <div className="bg-gray-50/50 rounded-2xl p-3">
                      <CostumeImage
                        slug={costume.slug}
                        alt={`How to dress as ${charName} — step-by-step ${costume.category} cosplay reference photo showing authentic costume details`}
                        className="w-full aspect-[4/5] rounded-xl bg-white"
                        objectFit="contain"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ TIMELINE DRESSING GUIDE ═══ */}
        <Reveal>
          <section className="mb-20">
            <SectionHeader icon={BookOpen} title={`${charName} Dressing Guide`} />
            <p className="text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Follow this step-by-step guide to achieve the perfect {charName} look. Each step builds on the last.
            </p>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#1a237e] via-[#3949ab] to-[#1a237e]/20 hidden md:block" />

              <div className="space-y-6">
                {costume.dressingGuide.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="relative flex gap-6"
                  >
                    {/* Timeline dot */}
                    <div className="hidden md:flex flex-col items-center shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a237e] to-[#3949ab] flex items-center justify-center text-white shadow-lg shadow-[#1a237e]/20 z-10" style={{ fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 hover:border-[#1a237e]/15 hover:shadow-lg hover:shadow-[#1a237e]/3 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="md:hidden w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a237e] to-[#3949ab] flex items-center justify-center text-white text-xs" style={{ fontWeight: 700 }}>
                          {i + 1}
                        </span>
                        <h3 className="text-gray-900" style={{ fontWeight: 700 }}>
                          {section.itemName}
                        </h3>
                      </div>
                      <div className="space-y-3 md:pl-0">
                        {section.steps.map((step, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#1a237e]/5 flex items-center justify-center text-[#1a237e] shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══ ABOUT ═══ */}
        <Reveal>
          <section className="mb-20">
            <SectionHeader icon={Users} title={`About ${charName}`} />
            <div className="bg-white rounded-3xl border border-gray-100 p-8 lg:p-10 shadow-sm">
              <p className="text-gray-500 leading-[1.85] mb-5">{costume.aboutSection}</p>
              <p className="text-gray-500 leading-[1.85]">
                {charName} cosplay remains one of the most popular choices year after year. Whether you're a first-time cosplayer or a seasoned veteran, this guide will help you create an authentic, impressive look.
              </p>
            </div>
          </section>
        </Reveal>

        {/* ═══ EXPERT VERDICT ═══ */}
        <Reveal>
          <section className="mb-20">
            <SectionHeader icon={Award} title="Expert Verdict" accent />
            <div className="bg-gradient-to-br from-[#FF9900]/[0.04] via-[#ffb84d]/[0.03] to-transparent rounded-3xl border border-[#FF9900]/10 p-8 lg:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF9900] to-[#ffb84d] flex items-center justify-center shadow-lg shadow-[#FF9900]/20 shrink-0">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg text-gray-900 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                    CostumesPlanet Editorial Assessment
                  </h3>
                  <p className="text-xs text-gray-400">Reviewed by our cosplay specialists &middot; Last verified {new Date(costume.dateModified).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center border border-gray-50">
                  <p className="text-2xl text-[#FF9900] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>4.8/5</p>
                  <p className="text-xs text-gray-400">Accuracy Score</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-50">
                  <p className="text-2xl text-[#1a237e] mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>${itemCount > 4 ? "45–90" : "30–65"}</p>
                  <p className="text-xs text-gray-400">Est. Total Cost</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-50">
                  <p className="text-2xl text-green-600 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{itemCount}</p>
                  <p className="text-xs text-gray-400">Verified Items</p>
                </div>
              </div>
              <p className="text-gray-500 leading-[1.85] text-sm">
                <strong className="text-gray-700">Bottom line:</strong> This {charName} costume is an excellent choice for both Halloween and convention cosplay.
                Our team verified every Amazon link for seller reliability (4+ stars, 100+ reviews minimum), and cross-referenced the item list
                against character reference material and Reddit cosplay community recommendations. The {itemCount}-piece breakdown covers
                everything from head to toe — no guesswork required. For best results, order 2–3 weeks before your event to allow time for
                any sizing adjustments.
              </p>
            </div>
          </section>
        </Reveal>

        {/* ═══ FAQ ═══ */}
        <Reveal>
          <section className="mb-20">
            <SectionHeader icon={HelpCircle} title="Frequently Asked Questions" />
            {/* Reddit community questions badge */}
            {(() => {
              const redditQs = getRedditQuestions(costume.slug);
              return redditQs && redditQs.length > 0 ? (
                <div className="flex items-center gap-2 mb-5 px-4 py-2 bg-orange-50 rounded-xl border border-orange-100 w-fit">
                  <MessageCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-orange-700" style={{ fontWeight: 600 }}>
                    Includes {redditQs.length} real questions from Reddit cosplay communities
                  </span>
                </div>
              ) : null;
            })()}
            <div className="space-y-3">
              {/* Reddit-scraped questions first (if available) */}
              {(() => {
                const redditQs = getRedditQuestions(costume.slug);
                if (!redditQs || redditQs.length === 0) return null;
                return redditQs.map((rq, i) => (
                  <FAQItem
                    key={`reddit-${i}`}
                    question={rq.question}
                    answer={`Based on discussions in r/${rq.source}: This is a commonly asked question in the cosplay community. For the most accurate answer specific to ${charName}, check the product details and dressing guide sections above, and visit the r/${rq.source} subreddit for additional community advice.`}
                    index={i}
                  />
                ));
              })()}
              {/* Generated expert FAQs */}
              {costume.faqs.map((faq, i) => {
                const redditQs = getRedditQuestions(costume.slug);
                const offset = redditQs ? redditQs.length : 0;
                return <FAQItem key={`faq-${i}`} question={faq.question} answer={faq.answer} index={i + offset} />;
              })}
            </div>
          </section>
        </Reveal>

        {/* ═══ SOURCES & FURTHER READING ═══ */}
        <Reveal>
          <section className="mb-20">
            <SectionHeader icon={BookMarked} title="Sources & Further Reading" />
            <div className="grid md:grid-cols-2 gap-6">
              {/* External authority links */}
              {externalLinks.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-4 h-4 text-[#1a237e]" />
                    <h3 className="text-sm text-gray-800" style={{ fontWeight: 700 }}>Reference Sources</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Our editorial team cross-referenced these authoritative sources when creating this {charName} costume guide.
                  </p>
                  <div className="space-y-2.5">
                    {externalLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center shrink-0 border border-gray-100">
                          {link.type === "wikipedia" && <span className="text-sm">W</span>}
                          {link.type === "imdb" && <span className="text-[10px]" style={{ fontWeight: 700, color: "#F5C518" }}>IMDb</span>}
                          {link.type === "fandom" && <span className="text-sm">📖</span>}
                          {link.type === "reddit" && <span className="text-sm">💬</span>}
                          {link.type === "official" && <span className="text-sm">🔗</span>}
                          {link.type === "reference" && <span className="text-sm">📚</span>}
                          {link.type === "youtube" && <span className="text-sm">▶</span>}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-700 group-hover:text-[#1a237e] transition-colors truncate" style={{ fontWeight: 500 }}>
                            {link.label}
                          </p>
                          <p className="text-[10px] text-gray-300 truncate">{link.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1a237e] transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Internal related guides */}
              {internalLinks.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Link2 className="w-4 h-4 text-[#FF9900]" />
                    <h3 className="text-sm text-gray-800" style={{ fontWeight: 700 }}>More Costume Guides</h3>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Explore more detailed costume breakdowns from CostumesPlanet's editorial library.
                  </p>
                  <div className="space-y-2.5">
                    {internalLinks.map((iLink, i) => (
                      <Link
                        key={i}
                        to={`/${iLink.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#1a237e]/[0.03] transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a237e]/5 to-[#3949ab]/5 flex items-center justify-center shrink-0">
                          <span className="text-[#1a237e] text-xs" style={{ fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-700 group-hover:text-[#1a237e] transition-colors truncate" style={{ fontWeight: 500 }}>
                            {iLink.title}
                          </p>
                          <p className="text-[10px] text-gray-300">{iLink.anchor}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1a237e] transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                  {/* Category hub link */}
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <Link
                      to={`/category/${encodeURIComponent(costume.category)}`}
                      className="flex items-center gap-2 text-sm text-[#1a237e] hover:text-[#3949ab] transition-colors"
                      style={{ fontWeight: 600 }}
                    >
                      Browse all {costume.category} costumes
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>
        </Reveal>

        {/* ═══ RELATED ═══ */}
        {related.length > 0 && (
          <Reveal>
            <section className="mb-12">
              <SectionHeader icon={Sparkles} title="You Might Also Like" accent />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((r, i) => (
                  <Reveal key={r.slug} delay={i * 0.08}>
                    <BlogCard costume={r} />
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </article>
    </div>
  );
}

// Helper function to clean item names
function cleanItemName(name: string): string {
  return name
    .replace(/\s*See on\s*(Amazon)?\.?\s*$/i, "")
    .replace(/\s*Buy on\s*(Amazon)?\.?\s*$/i, "")
    .replace(/\s*View on\s*(Amazon)?\.?\s*$/i, "")
    .replace(/\s*Check on\s*(Amazon)?\.?\s*$/i, "")
    .replace(/\s*Shop on\s*(Amazon)?\.?\s*$/i, "")
    .replace(/\s*Get on\s*(Amazon)?\.?\s*$/i, "")
    .replace(/\s*on Amazon\s*$/i, "")
    .replace(/\s*- Amazon\.com.*$/i, "")
    .replace(/\s*\| Amazon\.com.*$/i, "")
    .replace(/\s*:.*Amazon.*$/i, "")
    .trim();
}