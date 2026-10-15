import { useState, useRef, useEffect } from "react";
import { Search, X, Sparkles, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { searchCostumes, costumes, categories } from "../data/costumes";
import { BlogCard } from "./BlogCard";
import { Link } from "react-router";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const popularSearches = ["Jon Snow", "Spider-Man", "Anime", "Disney Princess", "Harley Quinn", "Star Wars", "Zelda", "Cosplay"];

// ── Typing placeholder effect ──
function useTypingPlaceholder(phrases: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const phrase = phrases[index % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (text.length < phrase.length) {
        timeout = setTimeout(() => setText(phrase.slice(0, text.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), speed / 2);
      } else {
        setIndex((i) => i + 1);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, typing, index, phrases, speed, pause]);

  return text;
}

export function SearchPage() {
  useDocumentMeta({
    title: "Search 195+ Costume Guides — Find Your Perfect Cosplay | CostumesPlanet",
    description: "Search our library of 195+ expert-verified costume guides. Find detailed breakdowns, Amazon product links, and step-by-step dressing instructions for any character.",
  });

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = query.trim() ? searchCostumes(query) : [];
  const placeholder = useTypingPlaceholder([
    "Search for Jon Snow...",
    "Try 'Marvel costume'...",
    "Find your perfect cosplay...",
    "Search Anime characters...",
    "Looking for Disney?...",
  ]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-[75vh]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Search Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#070b2e]/[0.04] via-[#1a237e]/[0.03] to-transparent py-16">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -15, 0], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-[20%] left-[10%] text-5xl"
          >
            🎭
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute top-[30%] right-[15%] text-4xl"
          >
            🦸
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a237e]/5 text-[#1a237e] text-xs mb-5" style={{ fontWeight: 600 }}>
              <Search className="w-3.5 h-3.5" />
              {costumes.length}+ Costumes Available
            </div>
            <h1
              className="text-3xl md:text-4xl text-gray-900 mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
            >
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] bg-clip-text text-transparent">
                Costume
              </span>
            </h1>
            <p className="text-gray-400">
              Search by character name, franchise, or category
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(26,35,126,0.08)] border border-gray-100 overflow-hidden group focus-within:shadow-[0_12px_50px_rgba(26,35,126,0.14)] focus-within:border-[#1a237e]/20 transition-all duration-300">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#1a237e] transition-colors" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-16 pr-14 py-5 bg-transparent text-gray-900 placeholder:text-gray-300 focus:outline-none text-lg"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    onClick={() => setQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gray-100 hover:bg-[#1a237e]/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Popular searches */}
          {!query.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-400 uppercase tracking-wider" style={{ fontWeight: 600 }}>Trending</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + i * 0.04 }}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuery(s)}
                    className="px-4 py-2 text-sm bg-white text-gray-600 rounded-xl border border-gray-100 hover:border-[#1a237e]/20 hover:text-[#1a237e] hover:shadow-md transition-all"
                    style={{ fontWeight: 500 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        {query.trim() ? (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-400 mb-8"
            >
              <span className="text-gray-900" style={{ fontWeight: 600 }}>{results.length}</span>{" "}
              {results.length === 1 ? "result" : "results"} for{" "}
              <span className="text-[#1a237e]" style={{ fontWeight: 600 }}>"{query}"</span>
            </motion.p>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((costume, i) => (
                  <motion.div
                    key={costume.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <BlogCard costume={costume} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gray-50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-200" />
                </div>
                <p className="text-gray-800 text-xl mb-2" style={{ fontWeight: 600 }}>No costumes found</p>
                <p className="text-gray-400 text-sm mb-8">Try a different keyword or browse categories below.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat}
                      to={`/category/${encodeURIComponent(cat)}`}
                      className="px-4 py-2 text-sm bg-white rounded-xl border border-gray-100 text-gray-600 hover:text-[#1a237e] hover:border-[#1a237e]/20 transition-all"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-12"
          >
            <Sparkles className="w-10 h-10 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-300 text-sm">Start typing to discover costumes...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
