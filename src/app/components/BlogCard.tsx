import { Link } from "react-router";
import { ArrowRight, Clock, Wallet } from "lucide-react";
import { CostumeBlog } from "../data/costumes";
import { CostumeImage } from "./CostumeImage";
import { anchorName, quickFact } from "../data/site";

interface BlogCardProps {
  costume: CostumeBlog;
  featured?: boolean;
}

// A real <a href> (via <Link>) so search engines can follow every card.
export function BlogCard({ costume, featured = false }: BlogCardProps) {
  const name = anchorName(costume);
  const difficulty = quickFact(costume, "difficulty").split(/[;(,]/)[0].trim();
  const budget = (quickFact(costume, "budget").match(/\$[\d,]+(?:\s*[–-]\s*\$?[\d,]+)?/) || [""])[0];
  const time = quickFact(costume, "time");

  return (
    <Link
      to={`/${costume.slug}/`}
      className={`group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9900]/40 hover:shadow-xl hover:shadow-[#1a237e]/10 ${
        featured ? "ring-1 ring-[#FF9900]/20" : ""
      }`}
    >
      <div className="relative overflow-hidden aspect-[1200/630] bg-[#0b1240]">
        <CostumeImage
          slug={costume.slug}
          alt={`${name} costume: what you need`}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          priority={featured}
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] uppercase tracking-wider text-[#FF9900] mb-2" style={{ fontWeight: 700 }}>
          {costume.category}
        </p>
        <h3 className="text-gray-900 group-hover:text-[#1a237e] transition-colors mb-2 leading-snug line-clamp-2" style={{ fontWeight: 700 }}>
          {name} Costume
        </h3>
        <p className="text-[13px] text-gray-500 line-clamp-3 leading-relaxed mb-4">{costume.excerpt}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
          {difficulty && <span className="px-2 py-1 rounded-md bg-gray-50 border border-gray-100" style={{ fontWeight: 600 }}>{difficulty}</span>}
          {budget && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-50 border border-gray-100" style={{ fontWeight: 600 }}>
              <Wallet className="w-3 h-3" />
              {budget}
            </span>
          )}
          {time && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-50 border border-gray-100" style={{ fontWeight: 600 }}>
              <Clock className="w-3 h-3" />
              {time.replace(/^About\s+/i, "")}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-[#1a237e]" style={{ fontWeight: 700 }}>
            Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
