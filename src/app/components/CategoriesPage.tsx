import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { categories, getCostumesByCategory } from "../data/costumes";
import { CostumeImage } from "./CostumeImage";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

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
  "80s & Retro": "📼",
  "Smurfs": "🔵",
  "Horror": "🔪",
  "Classic TV & Film": "📺",
};

function CategoryCard({ cat, index }: { cat: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const posts = getCostumesByCategory(cat);
  const preview = posts.slice(0, 3);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
    >
      <Link
        to={`/category/${encodeURIComponent(cat)}`}
        className="group block bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#1a237e]/8"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ border: "1px solid rgba(0,0,0,0.04)" }}
      >
        {/* Image collage */}
        <div className="relative h-36 overflow-hidden">
          <div className="flex h-full">
            {preview.map((c, j) => (
              <div key={c.slug} className="flex-1 overflow-hidden relative">
                <CostumeImage
                  slug={c.slug}
                  alt={`${c.title} — browse ${cat} costume guides at CostumesPlanet`}
                  className="w-full h-full object-cover group-hover:scale-[1.15] transition-transform duration-700 ease-out"
                />
                {j < preview.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-white/30" />
                )}
              </div>
            ))}
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Count badge */}
          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[11px] text-gray-700 rounded-full shadow" style={{ fontWeight: 600 }}>
              {posts.length} guides
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 10 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-3xl"
              >
                {categoryEmojis[cat] || "🎭"}
              </motion.span>
              <h3 className="text-gray-900 group-hover:text-[#1a237e] transition-colors duration-300" style={{ fontWeight: 700 }}>
                {cat}
              </h3>
            </div>
            <motion.div
              animate={{ x: hovered ? 4 : 0 }}
              className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-gradient-to-r group-hover:from-[#1a237e] group-hover:to-[#3949ab] flex items-center justify-center transition-all duration-300"
            >
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoriesPage() {
  useDocumentMeta({
    title: "All Costume Categories | CostumesPlanet",
    description: "Browse costume guides by category: Marvel & DC, Game of Thrones, Star Wars, Disney, anime, gaming and more.",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a237e]/5 text-[#1a237e] text-xs mb-5" style={{ fontWeight: 600 }}>
          <Sparkles className="w-3.5 h-3.5" />
          {categories.length} Categories
        </div>
        <h1
          className="text-3xl md:text-4xl text-gray-900 mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          Browse All{" "}
          <span className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] bg-clip-text text-transparent">
            Categories
          </span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Explore costume guides organized by your favorite franchises and themes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <CategoryCard key={cat} cat={cat} index={i} />
        ))}
      </div>
    </div>
  );
}