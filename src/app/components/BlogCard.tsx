import { useNavigate } from "react-router";
import { Calendar, ExternalLink } from "lucide-react";
import { useRef, useState, startTransition } from "react";
import { motion } from "motion/react";
import { CostumeBlog } from "../data/costumes";
import { CostumeImage } from "./CostumeImage";
import { StarRatingCompact } from "./StarRating";

interface BlogCardProps {
  costume: CostumeBlog;
  featured?: boolean;
}

export function BlogCard({ costume, featured = false }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  const wpUrl = `https://costumesplanet.com/${costume.slug}/`;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if user clicked the WP Original link
    if ((e.target as HTMLElement).closest("[data-wp-link]")) return;
    startTransition(() => navigate(`/${costume.slug}`));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-[800px]"
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: tilt.active ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          onClick={handleCardClick}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") startTransition(() => navigate(`/${costume.slug}`)); }}
          className={`group block bg-white rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer ${
            featured
              ? "shadow-xl shadow-[#1a237e]/8 ring-1 ring-[#FF9900]/15 hover:shadow-2xl hover:shadow-[#1a237e]/15"
              : "shadow-md shadow-gray-200/60 hover:shadow-xl hover:shadow-[#1a237e]/10"
          }`}
        >
          <div className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[16/11]"}`}>
            <CostumeImage
              slug={costume.slug}
              alt={`${costume.title} — expert-reviewed ${costume.category} costume guide with verified Amazon picks | CostumesPlanet`}
              className="w-full h-full object-cover group-hover:scale-[1.12] transition-transform duration-[800ms] ease-out"
              priority={featured}
            />
            {/* Cinematic overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_-60px_60px_-30px_rgba(0,0,0,0.15)]" />

            {/* Category pill */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-block px-3 py-1.5 text-[11px] bg-white/95 backdrop-blur-md text-[#1a237e] rounded-full shadow-lg tracking-wide uppercase" style={{ fontWeight: 600 }}>
                {costume.category}
              </span>
            </div>

            {/* Hover CTA — slides up */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm" style={{ fontWeight: 500 }}>
                  View Full Guide
                </span>
                <span className="w-8 h-8 rounded-full bg-[#FF9900] flex items-center justify-center shadow-lg">
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
            </div>

            {featured && (
              <div className="absolute top-3 right-3 z-10">
                <span className="relative inline-block px-3 py-1.5 text-[10px] bg-gradient-to-r from-[#FF9900] to-[#ffb84d] text-white rounded-full shadow-lg uppercase tracking-widest overflow-hidden" style={{ fontWeight: 700 }}>
                  Featured
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </span>
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="text-gray-900 group-hover:text-[#1a237e] transition-colors duration-300 mb-2 line-clamp-2 leading-snug" style={{ fontWeight: 600 }}>
              {costume.title}
            </h3>
            <p className="text-[13px] text-gray-400 line-clamp-2 mb-4 leading-relaxed">
              {costume.excerpt}
            </p>
            <StarRatingCompact slug={costume.slug} className="mb-3" />
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{new Date(costume.dateModified).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              <a
                data-wp-link
                href={wpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-[#1a237e]/50 hover:text-[#1a237e] transition-colors px-2 py-1 rounded-lg hover:bg-[#1a237e]/5"
                style={{ fontWeight: 500 }}
              >
                <ExternalLink className="w-3 h-3" />
                WP Original
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}