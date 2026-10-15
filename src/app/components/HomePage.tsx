import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, ArrowRight, Sparkles, TrendingUp, Star, ChevronLeft, ChevronRight, Zap, Wand2 } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { costumes, categories, getCostumesByCategory } from "../data/costumes";
import { BlogCard } from "./BlogCard";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

// ── Quick costume builder suggestions for hero ──
const HERO_SUGGESTIONS = [
  "Pirate Captain", "Spider-Man", "Elsa", "Wednesday Addams",
  "Zombie", "Samurai", "Sailor Moon", "Cowboy",
];

const POSTS_PER_PAGE = 24;

const categoryEmojis: Record<string, string> = {
  "Marvel & DC": "🦸",
  "Game of Thrones": "🐉",
  "Star Wars": "⚔️",
  "Disney": "🏰",
  "Anime": "🎌",
  "Gaming": "🎮",
  "Steven Universe": "💎",
  "Animated TV": "📺",
  "Movie Characters": "🎬",
  "Cartoon Characters": "🎨",
  "Pop Culture": "🌟",
  "DIY & Dance": "✂️",
};

// ── Animated counter ──
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
      {count}{suffix}
    </span>
  );
}

// ── Scroll-reveal wrapper ──
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Trending horizontal scroll ──
function TrendingCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trending = costumes.slice(0, 12);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {trending.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="snap-start shrink-0 w-[280px] md:w-[300px]"
          >
            <BlogCard costume={c} />
          </motion.div>
        ))}
      </div>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-[#fafbff] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#fafbff] to-transparent pointer-events-none z-10" />
      {/* Scroll buttons */}
      <button
        onClick={() => scroll(-1)}
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg shadow-gray-200/80 flex items-center justify-center hover:shadow-xl transition-shadow z-20"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={() => scroll(1)}
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg shadow-gray-200/80 flex items-center justify-center hover:shadow-xl transition-shadow z-20"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}

export function HomePage() {
  useDocumentMeta({
    title: "CostumesPlanet — #1 Expert-Rated Costume & Cosplay Guide Hub (2026)",
    description: "195+ expert-verified costume guides with curated Amazon picks, step-by-step dressing instructions, and community-sourced cosplay tips. Trusted by 50K+ cosplayers worldwide.",
  });

  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [builderInput, setBuilderInput] = useState("");
  const navigate = useNavigate();
  const featured = costumes.slice(0, 6);
  const allPosts = costumes.slice(6);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#070b2e] via-[#111b63] to-[#1a237e] min-h-[600px] lg:min-h-[680px] flex items-center"
      >
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[5%] right-[10%] w-[450px] h-[450px] bg-blue-500/15 rounded-full blur-[130px]"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#FF9900]/15 rounded-full blur-[100px]"
          />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Floating costume emojis */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["🦸", "🐉", "⚔️", "🏰", "🎭", "🎮", "🎌", "🌟"].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl md:text-3xl opacity-10"
              style={{
                left: `${10 + (i * 12) % 80}%`,
                top: `${15 + ((i * 17) % 60)}%`,
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{
                duration: 5 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-32 w-full"
        >
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/[0.08] text-white/70 text-xs mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF9900] animate-pulse" />
              <span>{costumes.length}+ Costume Guides &middot; Updated Daily</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] text-white leading-[1.08] tracking-tight mb-7"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
            >
              Become{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#FF9900] via-[#ffce54] to-[#FF9900] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                  Anyone
                </span>
              </span>
              <br />
              You Imagine
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl text-white/50 mb-10 max-w-xl leading-relaxed"
            >
              Type any costume idea and we'll build your complete look
              <br className="hidden md:block" />
              piece by piece, ready to shop.
            </motion.p>

            {/* ── BUILD YOUR COSTUME LIVE ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (builderInput.trim()) {
                    navigate(`/build?q=${encodeURIComponent(builderInput.trim())}`);
                  }
                }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9900] via-[#ffce54] to-[#FF9900] rounded-3xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500" />
                <div className="relative flex items-center bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl overflow-hidden transition-all group-hover:border-[#FF9900]/30">
                  <div className="pl-5">
                    <Wand2 className="w-5 h-5 text-[#FF9900]" />
                  </div>
                  <input
                    type="text"
                    value={builderInput}
                    onChange={(e) => setBuilderInput(e.target.value)}
                    placeholder="Type any costume... Pirate, Elsa, Zombie, Ninja..."
                    className="flex-1 bg-transparent text-white placeholder-white/30 px-4 py-5 text-lg outline-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  <motion.button
                    type="submit"
                    disabled={!builderInput.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="m-2 px-6 py-3 bg-gradient-to-r from-[#FF9900] to-[#ffb84d] text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#FF9900]/20"
                    style={{ fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="flex items-center gap-2">
                      Build It <ArrowRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </div>
              </form>

              {/* Quick suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-white/25 text-xs uppercase tracking-wider mr-1 self-center" style={{ fontWeight: 500 }}>
                  Try:
                </span>
                {HERO_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => navigate(`/build?q=${encodeURIComponent(s)}`)}
                    className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] hover:border-[#FF9900]/25 rounded-full text-white/40 hover:text-white/80 text-xs transition-all duration-200"
                    style={{ fontWeight: 500 }}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Secondary links */}
              <div className="mt-6 flex items-center gap-4">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <Search className="w-4 h-4" />
                  Search {costumes.length}+ guides
                </Link>
                <span className="text-white/15">|</span>
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <Sparkles className="w-4 h-4" />
                  Browse categories
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-10 mt-20"
          >
            {[
              { icon: Star, label: "Costume Guides", target: costumes.length, suffix: "+" },
              { icon: TrendingUp, label: "Categories", target: categories.length, suffix: "" },
              { icon: Zap, label: "Amazon Links", target: 1000, suffix: "+" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] backdrop-blur-sm flex items-center justify-center border border-white/[0.06]">
                  <stat.icon className="w-5 h-5 text-[#FF9900]" />
                </div>
                <div>
                  <p className="text-white text-2xl">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/30 text-xs tracking-wide uppercase">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fafbff] to-transparent" />
      </section>

      {/* ═══════════════ TRENDING CAROUSEL ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-9 rounded-full bg-gradient-to-b from-[#FF9900] to-[#ffb84d]" />
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
              Trending Now
            </h2>
            <Zap className="w-5 h-5 text-[#FF9900]" />
          </div>
        </Reveal>
        <TrendingCarousel />
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-14">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-9 rounded-full bg-gradient-to-b from-[#1a237e] to-[#3949ab]" />
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
              Explore Categories
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {categories.map((cat, i) => {
            const count = getCostumesByCategory(cat).length;
            return (
              <Reveal key={cat} delay={i * 0.04}>
                <Link
                  to={`/category/${encodeURIComponent(cat)}`}
                  className="group relative flex flex-col items-center gap-2 px-4 py-6 bg-white rounded-2xl border border-gray-100 hover:border-[#1a237e]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1a237e]/5 overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e]/[0.02] to-[#3949ab]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">{categoryEmojis[cat] || "🎭"}</span>
                  <p className="text-gray-800 text-sm text-center group-hover:text-[#1a237e] transition-colors" style={{ fontWeight: 600 }}>{cat}</p>
                  <p className="text-[11px] text-gray-400">{count} guides</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ FEATURED ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-9 rounded-full bg-gradient-to-b from-[#FF9900] to-[#ffb84d]" />
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
              Editor's Picks
            </h2>
            <span className="px-3 py-1 bg-[#FF9900]/10 text-[#e68a00] rounded-full text-[11px] uppercase tracking-wider" style={{ fontWeight: 600 }}>
              Curated
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((costume, i) => (
            <Reveal key={costume.slug} delay={i * 0.08}>
              <BlogCard costume={costume} featured={i < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ ALL GUIDES ═══════════════ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-24">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-9 rounded-full bg-gradient-to-b from-gray-400 to-gray-300" />
            <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
              All Costume Guides
            </h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-[11px]" style={{ fontWeight: 500 }}>
              {allPosts.length} guides
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allPosts.slice(0, visibleCount).map((costume, i) => (
            <Reveal key={costume.slug} delay={Math.min(i * 0.025, 0.2)}>
              <BlogCard costume={costume} />
            </Reveal>
          ))}
        </div>

        {visibleCount < allPosts.length && (
          <div className="text-center mt-14">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setVisibleCount((c) => c + POSTS_PER_PAGE)}
              className="group relative px-10 py-4 bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white rounded-2xl shadow-[0_8px_30px_rgba(26,35,126,0.2)] hover:shadow-[0_12px_40px_rgba(26,35,126,0.35)] transition-all overflow-hidden"
              style={{ fontWeight: 600 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Load More
              <span className="ml-2 text-white/50">
                ({allPosts.length - visibleCount} remaining)
              </span>
            </motion.button>
          </div>
        )}
      </section>
    </div>
  );
}