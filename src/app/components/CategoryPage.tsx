import { useParams, Link } from "react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { getCostumesByCategory } from "../data/costumes";
import { BlogCard } from "./BlogCard";
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

// Map old WordPress category slugs → internal category names for GSC URL compat
const categorySlugMap: Record<string, string> = {
  "game-of-thrones-costumes": "Game of Thrones",
  "game-of-thrones": "Game of Thrones",
  "steven-universe": "Steven Universe",
  "marvel-costumes": "Marvel & DC",
  "marvel": "Marvel & DC",
  "dc": "Marvel & DC",
  "star-wars-costumes": "Star Wars",
  "star-wars": "Star Wars",
  "disney": "Disney",
  "anime": "Anime",
  "gaming": "Gaming",
  "league-of-legends": "Gaming",
  "animated-tv": "Animated TV",
  "movie-characters": "Movie Characters",
  "cartoon-characters": "Cartoon Characters",
  "pop-culture": "Pop Culture",
  "diy-dance": "DIY & Dance",
  "halloween": "Pop Culture",
  "horror": "Horror",
  "80s-retro": "80s & Retro",
  "smurfs": "Smurfs",
  "classic-tv-film": "Classic TV & Film",
  // Gender-based category slugs from WordPress → show all costumes in that filter
  "female": "Female",
  "male": "Male",
};

export function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const rawName = decodeURIComponent(name || "");
  // Resolve WP slug to internal category name, or use as-is
  const decodedName = categorySlugMap[rawName.toLowerCase()] || rawName;
  const posts = getCostumesByCategory(decodedName);

  useDocumentMeta({
    title: `Best ${decodedName} Costumes (2026) — ${posts.length} Expert-Verified Guides | CostumesPlanet`,
    description: `Browse ${posts.length} expert-curated ${decodedName} costume guides. Each features verified Amazon picks, step-by-step dressing instructions, and cosplay community ratings. Updated for 2026.`,
  });

  if (posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gray-50 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-gray-900 text-3xl mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
            Category Not Found
          </h1>
          <Link to="/categories" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white rounded-2xl shadow-lg shadow-[#1a237e]/20 hover:-translate-y-0.5 transition-all">
            &larr; Browse All Categories
          </Link>
        </motion.div>
      </div>
    );
  }

  const emoji = categoryEmojis[decodedName] || "🎭";

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 text-sm text-gray-400 mb-10"
      >
        <Link to="/" className="hover:text-[#1a237e] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/categories" className="hover:text-[#1a237e] transition-colors">Categories</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600" style={{ fontWeight: 500 }}>{decodedName}</span>
      </motion.nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a237e]/10 to-[#3949ab]/5 flex items-center justify-center"
          >
            <span className="text-4xl">{emoji}</span>
          </motion.div>
          <div>
            <h1
              className="text-3xl md:text-4xl text-gray-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
            >
              {decodedName}
            </h1>
            <p className="text-gray-400 mt-1">
              {posts.length} costume {posts.length === 1 ? "guide" : "guides"}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((costume, i) => (
          <motion.div
            key={costume.slug}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.5 }}
          >
            <BlogCard costume={costume} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-14"
      >
        <Link
          to="/categories"
          className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#1a237e] transition-all"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
          Back to All Categories
        </Link>
      </motion.div>
    </div>
  );
}
