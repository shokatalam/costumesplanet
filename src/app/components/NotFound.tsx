import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, Search } from "lucide-react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function NotFound() {
  useDocumentMeta({
    title: "Page Not Found — CostumesPlanet.com",
    description: "The page you're looking for doesn't exist. Browse 195+ expert-verified costume guides at CostumesPlanet.com.",
  });

  return (
    <div
      className="min-h-[75vh] flex items-center justify-center px-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Animated 404 */}
        <div className="relative mb-10">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-[8rem] leading-none text-gray-100 select-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900 }}
          >
            404
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1a237e] to-[#3949ab] flex items-center justify-center shadow-2xl shadow-[#1a237e]/30">
              <span className="text-4xl">🎭</span>
            </div>
          </motion.div>
        </div>

        <h1
          className="text-2xl text-gray-900 mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          Page Not Found
        </h1>
        <p className="text-gray-400 mb-10 leading-relaxed">
          This costume seems to have vanished into thin air.
          <br />
          Let's get you back to the wardrobe.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white rounded-2xl shadow-[0_8px_30px_rgba(26,35,126,0.25)] transition-all"
              style={{ fontWeight: 600 }}
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-700 rounded-2xl border border-gray-200 hover:border-[#1a237e]/20 transition-all shadow-sm"
              style={{ fontWeight: 500 }}
            >
              <Search className="w-4 h-4" />
              Search Costumes
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}