import { Link, Outlet, useLocation } from "react-router";
import { Search, Menu, X, Sparkles, ChevronRight, Heart, Wand2 } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "../data/costumes";
import { preloadImages } from "../data/costumeImages";
import { loadItemMap } from "../data/costumeLinks";
import { loadRedditMap } from "../data/costumeReddit";

const SiteLogo = ({ variant = "light" }: { variant?: "light" | "dark" }) => {
  const isDark = variant === "dark";
  return (
    <div className="flex items-center gap-2.5">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? "bg-white/10" : "bg-[#1a237e]"}`}>
        <span className="text-white text-base leading-none">🎭</span>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span
          className={`text-[17px] tracking-[0.02em] ${isDark ? "text-white/90" : "text-[#1a237e]"}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          Costumes
        </span>
        <span
          className={`text-[17px] tracking-[0.02em] ${isDark ? "text-[#FF9900]/80" : "text-[#FF9900]"}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}
        >
          Planet
        </span>
      </div>
    </div>
  );
};

const navLinks = [
  { label: "Home", to: "/", emoji: "🏠" },
  { label: "Build Costume", to: "/build", emoji: "✨" },
  { label: "Marvel & DC", to: "/category/Marvel%20%26%20DC", emoji: "🦸" },
  { label: "Game of Thrones", to: "/category/Game%20of%20Thrones", emoji: "🐉" },
  { label: "Star Wars", to: "/category/Star%20Wars", emoji: "⚔️" },
  { label: "Disney", to: "/category/Disney", emoji: "🏰" },
  { label: "Anime", to: "/category/Anime", emoji: "🎌" },
  { label: "Gaming", to: "/category/Gaming", emoji: "🎮" },
];

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    preloadImages();
    loadItemMap();
    loadRedditMap();
  }, []);

  // Microsoft Clarity analytics
  useEffect(() => {
    if (!(window as any).clarity) {
      (function (c: any, l: any, a: string, r: string, i: string, t?: any, y?: any) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "vq31xr6tdk");
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Site-wide structured data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CostumesPlanet",
    alternateName: "Costumes Planet",
    url: "https://costumesplanet.com",
    description: "Your ultimate destination for costume guides, cosplay tips, and the best curated deals on Amazon. 195+ detailed costume guides with step-by-step instructions.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://costumesplanet.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "CostumesPlanet",
      url: "https://costumesplanet.com",
      logo: {
        "@type": "ImageObject",
        url: "https://costumesplanet.com/logo.png",
        width: 200,
        height: 200,
      },
      sameAs: [],
    },
    inLanguage: "en-US",
  };

  return (
    <div id="site-layout" className="min-h-screen flex flex-col bg-[#fafbff]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Site-wide structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      {/* ═══ HEADER ═══ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-white/70 backdrop-blur-2xl shadow-[0_1px_30px_rgba(26,35,126,0.06)] border-b border-white/40"
            : "bg-white/40 backdrop-blur-lg border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <SiteLogo />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to.replace(/%20/g, " ")));
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="relative px-4 py-2 text-sm rounded-full transition-all duration-300 whitespace-nowrap group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-[#1a237e] to-[#3949ab] rounded-full shadow-md shadow-[#1a237e]/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-white" : "text-gray-600 group-hover:text-[#1a237e]"}`} style={{ fontWeight: isActive ? 600 : 400 }}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
              <Link
                to="/categories"
                className="px-4 py-2 text-sm rounded-full text-gray-400 hover:text-[#1a237e] hover:bg-[#1a237e]/5 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                More
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/search"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100/70 hover:bg-[#1a237e]/5 text-gray-500 hover:text-[#1a237e] transition-all text-sm group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-xs text-gray-400">Search</span>
                <span className="hidden md:inline text-[10px] text-gray-300 bg-gray-200/70 px-1.5 py-0.5 rounded">⌘K</span>
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100/70 hover:bg-[#1a237e]/5 text-gray-600 hover:text-[#1a237e] transition-all"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-gray-100/50 bg-white/95 backdrop-blur-2xl"
            >
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className="flex items-center gap-4 px-4 py-3.5 text-sm text-gray-700 hover:bg-[#1a237e]/5 rounded-2xl transition-colors"
                    >
                      <span className="text-xl w-8 text-center">{link.emoji}</span>
                      <span style={{ fontWeight: 500 }}>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <p className="px-4 text-[10px] text-gray-400 mb-3 uppercase tracking-[0.2em]" style={{ fontWeight: 600 }}>
                    All Categories
                  </p>
                  <div className="flex flex-wrap gap-2 px-4">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${encodeURIComponent(cat)}`}
                        className="px-3 py-2 text-xs text-gray-600 bg-gray-50 hover:bg-[#1a237e]/5 hover:text-[#1a237e] rounded-xl transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main */}
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-2 border-[#1a237e]/20 border-t-[#1a237e] rounded-full animate-spin" />
              <p className="text-gray-400 text-sm">Loading...</p>
            </div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>


      {/* ═══ FOOTER ═══ */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-[#070b2e] via-[#111b63] to-[#1a237e] text-white">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-[20%] w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[150px]" />
          <div className="absolute -bottom-20 right-[20%] w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[130px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FF9900]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <Link to="/" className="inline-block mb-5">
                <SiteLogo variant="dark" />
              </Link>
              <p className="text-white/40 text-sm leading-[1.8] max-w-sm mb-6">
                Your ultimate destination for costume guides, cosplay tips, and the best curated deals on Amazon. Transform into anyone you imagine.
              </p>
              <div className="flex items-center gap-2 text-white/25 text-xs">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-400/60 fill-red-400/60" />
                <span>for cosplay enthusiasts</span>
              </div>
            </div>

            {/* Categories */}
            <div className="md:col-span-4">
              <h4 className="text-white/80 text-xs mb-5 uppercase tracking-[0.2em]" style={{ fontWeight: 600 }}>Categories</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/category/${encodeURIComponent(cat)}`}
                    className="text-white/35 hover:text-[#FF9900] text-sm transition-colors duration-300"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-3">
              <h4 className="text-white/80 text-xs mb-5 uppercase tracking-[0.2em]" style={{ fontWeight: 600 }}>Resources</h4>
              <div className="space-y-3">
                <Link to="/sitemap" className="block text-white/35 hover:text-[#FF9900] text-sm transition-colors">Sitemap</Link>
                <Link to="/search" className="block text-white/35 hover:text-[#FF9900] text-sm transition-colors">Search Costumes</Link>
                <Link to="/build" className="block text-white/35 hover:text-[#FF9900] text-sm transition-colors">Costume Builder</Link>
                <Link to="/about-us" className="block text-white/35 hover:text-[#FF9900] text-sm transition-colors">About Us</Link>
                <Link to="/terms-of-use" className="block text-white/35 hover:text-[#FF9900] text-sm transition-colors">Terms of Use</Link>
                <p className="text-white/25 text-xs leading-relaxed pt-2 border-t border-white/[0.06]">
                  As an Amazon Associate, we earn from qualifying purchases. Prices and availability subject to change.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/25 text-sm">
                &copy; 2026 CostumesPlanet.com
              </p>
              <div className="flex items-center gap-6 text-white/25 text-xs">
                <Link to="/sitemap" className="hover:text-white/50 transition-colors">Sitemap</Link>
                <Link to="/categories" className="hover:text-white/50 transition-colors">Categories</Link>
                <Link to="/about-us" className="hover:text-white/50 transition-colors">About</Link>
                <Link to="/terms-of-use" className="hover:text-white/50 transition-colors">Terms</Link>
                <Link to="/search" className="hover:text-white/50 transition-colors">Search</Link>
                <Link to="/" className="hover:text-white/50 transition-colors">Home</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}