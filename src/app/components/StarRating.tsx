import { Star } from "lucide-react";

// Always 5 stars, always full gold — simple and consistent for Google & AI

interface StarRatingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function StarRating({ size = "sm", className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${sizeMap[size]} text-[#FFB800] fill-[#FFB800]`} />
      ))}
    </div>
  );
}

export function StarRatingCompact({ className = "" }: { slug?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-3 h-3 text-[#FFB800] fill-[#FFB800]" />
      ))}
    </div>
  );
}

/** Schema helper — always returns 5.0 / 5 */
export function getRating(_slug?: string) {
  return { rating: 5, reviewCount: 1 };
}
