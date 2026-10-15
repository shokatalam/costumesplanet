import { useState, useEffect, useRef, useCallback } from "react";
import {
  getCostumeImage,
  onImageMapUpdate,
} from "../data/costumeImages";

interface CostumeImageProps {
  slug: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

/**
 * Displays a costume image with lazy loading via IntersectionObserver.
 * Uses direct URLs from the image map (WordPress or Supabase Storage).
 * Falls back to a branded placeholder if no image URL is available.
 */
export function CostumeImage({
  slug,
  alt,
  className = "",
  loading = "lazy",
  priority = false,
  objectFit = "cover",
}: CostumeImageProps) {
  const [imageUrl, setImageUrl] = useState(() => getCostumeImage(slug));
  const [imgError, setImgError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority || loading === "eager");
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set up IntersectionObserver — re-observe whenever the ref element changes
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Disconnect previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;

      if (!node || priority || loading === "eager" || isVisible) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [priority, loading, isVisible]
  );

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Listen for image map updates
  useEffect(() => {
    const unsub = onImageMapUpdate(() => {
      const url = getCostumeImage(slug);
      setImageUrl(url);
      if (url) setImgError(false);
    });
    return unsub;
  }, [slug]);

  // Re-check when slug changes
  useEffect(() => {
    setImageUrl(getCostumeImage(slug));
    setImgError(false);
  }, [slug]);

  const showImage = imageUrl && !imgError;

  if (showImage) {
    return (
      <div ref={setRef} className={`relative overflow-hidden ${className}`}>
        {isVisible ? (
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full"
            style={{ objectFit }}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 animate-pulse" />
        )}
      </div>
    );
  }

  // Branded placeholder
  const hash = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue = hash % 360;

  const initials = alt
    .replace(/costume|cosplay|diy|halloween|complete|set/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

  return (
    <div
      ref={setRef}
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 30%, 90%), hsl(${hue}, 40%, 82%))`,
        minHeight: 200,
      }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative text-center p-4">
        <div
          className="text-4xl mb-2 opacity-60"
          style={{ color: `hsl(${hue}, 40%, 45%)` }}
        >
          🎭
        </div>
        <div
          className="text-lg opacity-40 mb-1"
          style={{
            color: `hsl(${hue}, 40%, 35%)`,
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {initials}
        </div>
        <p
          className="text-[10px] opacity-30 max-w-[120px] truncate"
          style={{ color: `hsl(${hue}, 40%, 30%)` }}
        >
          {alt}
        </p>
      </div>
    </div>
  );
}