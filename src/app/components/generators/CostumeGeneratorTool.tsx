/**
 * CostumeGeneratorTool — shared embeddable widget used across all generator pages.
 * Fetches real Amazon products via the Supabase edge function with bot protection.
 */
import { useState, useCallback, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Wand2, Shuffle, ShoppingCart, ExternalLink, Loader2,
  Sparkles, Search, RotateCcw, Star, Shield, ShieldCheck, Check, GripVertical,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

// ── Bot protection ──────────────────────────────────────────────────────────
async function solveChallenge() {
  const res = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15/challenge`,
    { headers: { Authorization: `Bearer ${publicAnonKey}` } }
  );
  if (!res.ok) throw new Error("challenge fetch failed");
  const { challenge, ts } = await res.json();
  const enc = new TextEncoder();
  for (let i = 0; i < 5_000_000; i++) {
    const nonce = i.toString(36);
    const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(challenge + nonce)));
    if (hash[0] === 0 && (hash[1] & 0xf0) === 0) return { challenge, nonce, challengeTs: ts };
  }
  throw new Error("Could not solve challenge");
}

const TAG = "cplanet0c-20";
const amzSearch = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

/** Extract ASIN from any Amazon URL. */
function extractAsin(url: string): string | null {
  const m =
    url.match(/\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i) ||
    url.match(/\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i) ||
    url.match(/[?&](?:ASIN|asin)=([A-Z0-9]{10})(?:&|$)/i);
  return m ? m[1].toUpperCase() : null;
}

/**
 * Client-side URL guard — extracts ASIN and strips broken session params
 * (linkCode=sl1, linkId, qid, crid, sprefix, ref_) to build a clean
 * /dp/ASIN?tag= direct product link. Falls back to keyword search if no ASIN.
 */
function safeUrl(url: string, fallbackTitle: string): string {
  if (!url) return amzSearch(fallbackTitle);
  // Already a clean dp link → keep
  if (/amazon\.com\/dp\/[A-Z0-9]{10}\?tag=/.test(url)) return url;
  // Extract ASIN → clean direct link
  const asin = extractAsin(url);
  if (asin) return `https://www.amazon.com/dp/${asin}?tag=${TAG}`;
  // Clean search URL → keep
  if (url.includes("amazon.com/s?k=") && url.includes(`tag=${TAG}`)) return url;
  // Fallback
  return amzSearch(fallbackTitle || "Halloween costume");
}

// ── Archetypes ───────────────────────────────────────────────────────────────
const ARCHETYPES: Record<string, { emoji: string; queries: string[] }> = {
  superhero:    { emoji: "🦸", queries: ["mask helmet","bodysuit","cape","gloves","boots","weapon prop"] },
  halloween:    { emoji: "🎃", queries: ["mask","costume","wig","makeup sfx","fake blood","boots"] },
  anime:        { emoji: "🎌", queries: ["wig","costume set","headband","pants","boots","prop weapon"] },
  villain:      { emoji: "😈", queries: ["mask","costume","cape robe","gloves","boots","weapon staff"] },
  princess:     { emoji: "👸", queries: ["tiara crown","gown dress","wig","long gloves","heels","wand"] },
  warrior:      { emoji: "⚔️",  queries: ["helmet","armor chestplate","tunic","gauntlets","boots","sword"] },
  wizard:       { emoji: "🧙", queries: ["pointed hat","robe cloak","wig","wand","belt pouch","boots"] },
  animal:       { emoji: "🐾", queries: ["ears headband","onesie","tail","paw gloves","face paint","slippers"] },
  couple:       { emoji: "💑", queries: ["matching costume set","couples costume","his hers","duo outfit","accessories"] },
  random:       { emoji: "🎲", queries: ["halloween costume","superhero outfit","anime cosplay","villain costume","princess dress","scary mask"] },
};

function detectArchetype(input: string): string {
  const l = input.toLowerCase();
  if (/superhero|spider|batman|iron man|captain|avenger|marvel|dc|flash|wonder|hulk|thor|deadpool|venom/.test(l)) return "superhero";
  if (/anime|naruto|goku|tanjiro|demon slayer|sailor moon|dragon ball|deku|cosplay|jujutsu/.test(l)) return "anime";
  if (/villain|joker|thanos|maleficent|cruella|ursula|voldemort|darth|sith|evil/.test(l)) return "villain";
  if (/princess|queen|cinderella|belle|elsa|rapunzel|jasmine|ariel|aurora|fairy/.test(l)) return "princess";
  if (/warrior|knight|viking|samurai|gladiator|spartan|medieval|barbarian|valkyrie/.test(l)) return "warrior";
  if (/wizard|witch|sorcerer|harry potter|gandalf|hermione|merlin|hogwarts|magic/.test(l)) return "wizard";
  if (/cat|dog|bunny|bear|fox|wolf|lion|tiger|dinosaur|dragon|unicorn|animal/.test(l)) return "animal";
  if (/couple|duo|pair|partner|matching|his|hers/.test(l)) return "couple";
  if (/zombie|ghost|skeleton|vampire|werewolf|freddy|jason|pennywise|horror|scary|demon|devil/.test(l)) return "halloween";
  return "halloween";
}

interface Product { asin: string; title: string; image: string; price: string; url: string; }
interface Slot { label: string; query: string; products: Product[]; loading: boolean; }

const RANDOM_IDEAS = [
  "Vampire","Witch","Superhero","Pirate","Zombie","Princess","Ninja",
  "Alien","Werewolf","Robot","Mermaid","Dragon","Knight","Fairy",
  "Cowboy","Ghost","Clown","Wizard","Viking","Samurai",
];

// ── Slider verification ──────────────────────────────────────────────────────
function SliderVerify({ onVerified }: { onVerified: (token: any) => void }) {
  const [val, setVal] = useState(0);
  const [solving, setSolving] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const target = useRef(85 + Math.floor(Math.random() * 10));

  const handleSlide = async (v: number) => {
    setVal(v);
    if (v >= target.current && !solving && !done) {
      setSolving(true);
      setErr("");
      try {
        const token = await solveChallenge();
        setDone(true);
        setTimeout(() => onVerified(token), 500);
      } catch {
        setErr("Verification failed. Try again.");
        setSolving(false);
        setVal(0);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-3">
        {done ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <Shield className="w-4 h-4 text-[#FF9900]" />}
        <span className="text-white text-sm font-semibold" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
          {done ? "Verified! Fetching products…" : "Quick human check"}
        </span>
      </div>
      <p className="text-white/40 text-xs mb-4">Slide to verify you're human before we search Amazon.</p>
      <div className="relative h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] overflow-hidden">
        <div className="absolute inset-y-0 left-0 transition-all duration-75 rounded-xl"
          style={{ width: `${val}%`, background: done ? "rgba(52,211,153,0.3)" : "rgba(255,153,0,0.25)" }} />
        <div className="absolute top-1 bottom-1 w-9 rounded-lg flex items-center justify-center transition-colors"
          style={{ left: `calc(${val}% - ${val * 0.36}px)`, background: done ? "#34d399" : solving ? "#FF9900" : "#e5e7eb" }}>
          {done ? <Check className="w-3.5 h-3.5 text-white" /> : solving ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <GripVertical className="w-3.5 h-3.5 text-gray-600" />}
        </div>
        <input type="range" min={0} max={100} value={val}
          onChange={e => handleSlide(Number(e.target.value))}
          disabled={solving || done}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" style={{ zIndex: 10 }} />
      </div>
      {err && <p className="text-red-400 text-xs mt-2">{err}</p>}
    </motion.div>
  );
}

// ── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ p }: { p: Product }) {
  const [imgErr, setImgErr] = useState(false);
  // Always sanitize the URL — never trust /dp/ASIN or linkCode= URLs from cache
  const href = safeUrl(p.url, p.title);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer sponsored"
      className="group flex flex-col rounded-xl border border-white/[0.07] bg-white/[0.04] hover:border-[#FF9900]/40 hover:bg-white/[0.07] transition-all overflow-hidden">
      <div className="aspect-square bg-white/[0.04] overflow-hidden">
        {!imgErr && p.image
          ? <img src={p.image} alt={p.title} className="w-full h-full object-contain p-2" onError={() => setImgErr(true)} loading="lazy" />
          : <div className="w-full h-full flex items-center justify-center text-3xl">🎭</div>
        }
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <p className="text-white/80 text-[11px] leading-snug line-clamp-2">{p.title}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[#FF9900] font-bold text-sm">{p.price || "View Price"}</span>
          <span className="flex items-center gap-1 text-[#FF9900] text-[10px] font-semibold bg-[#FF9900]/15 px-2 py-1 rounded-lg group-hover:bg-[#FF9900]/25 transition-all">
            <ShoppingCart className="w-3 h-3" /> Amazon
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Main widget ──────────────────────────────────────────────────────────────
interface Props {
  defaultTheme?: string;
  placeholder?: string;
  presets?: string[];
  title?: string;
  subtitle?: string;
}

export function CostumeGeneratorTool({ defaultTheme = "", placeholder = "e.g. Spider-Man, Witch, Pirate…", presets, title = "Costume Generator", subtitle = "Type a character or theme to get real Amazon products for every piece." }: Props) {
  const [input, setInput] = useState(defaultTheme);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [phase, setPhase] = useState<"idle" | "verify" | "loading" | "done">("idle");
  const [spinning, setSpinning] = useState(false);
  const [spinLabel, setSpinLabel] = useState("");
  const pendingToken = useRef<any>(null);
  const pendingInput = useRef<string>("");

  const spin = useCallback(() => {
    setSpinning(true);
    let count = 0;
    const max = 18;
    const iv = setInterval(() => {
      setSpinLabel(RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)]);
      count++;
      if (count >= max) {
        clearInterval(iv);
        const pick = RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)];
        setInput(pick);
        setSpinLabel(pick);
        setSpinning(false);
      }
    }, 80);
  }, []);

  const generate = useCallback((costumeName: string) => {
    const name = costumeName.trim() || "Halloween";
    pendingInput.current = name;
    const arch = detectArchetype(name);
    const cfg = ARCHETYPES[arch] || ARCHETYPES.halloween;
    const initialSlots: Slot[] = cfg.queries.map((q, i) => ({
      label: q.charAt(0).toUpperCase() + q.slice(1),
      query: `${name} ${q} costume`,
      products: [],
      loading: true,
    }));
    setSlots(initialSlots);

    // Check if we already have a valid cached token
    try {
      const cached = sessionStorage.getItem("cp_challenge");
      if (cached) {
        const tok = JSON.parse(cached);
        if (Date.now() - tok.challengeTs < 270_000) {
          pendingToken.current = tok;
          setPhase("loading");
          fetchAll(initialSlots, tok, name);
          return;
        }
      }
    } catch {}

    setPhase("verify");
  }, []);

  const onVerified = useCallback((token: any) => {
    try { sessionStorage.setItem("cp_challenge", JSON.stringify(token)); } catch {}
    pendingToken.current = token;
    setPhase("loading");
    fetchAll(slots, token, pendingInput.current);
  }, [slots]);

  const fetchAll = useCallback(async (currentSlots: Slot[], token: any, name: string) => {
    const queries = currentSlots.map(s => s.query);
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15/product-search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ queries, ...token }),
        }
      );
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      const results: Record<string, Product[]> = data.products || {};
      setSlots(prev => prev.map((s, i) => ({
        ...s,
        loading: false,
        products: (results[queries[i]] || []).slice(0, 4),
      })));
    } catch (err) {
      console.error("Product search error:", err);
      setSlots(prev => prev.map(s => ({ ...s, loading: false })));
    }
    setPhase("done");
  }, []);

  const reset = () => { setSlots([]); setPhase("idle"); setInput(""); };

  const hasContent = phase === "loading" || phase === "done" || phase === "verify";

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          <input
            type="text"
            value={spinning ? spinLabel : input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && input.trim()) { reset(); setTimeout(() => generate(input), 50); } }}
            placeholder={placeholder}
            disabled={spinning}
            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#FF9900]/40 focus:bg-white/[0.08] transition-all"
            style={{ fontFamily: "'Inter',sans-serif" }}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { reset(); setTimeout(() => generate(input || "Halloween"), 50); }}
            disabled={spinning}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm transition-all text-black disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#FF9900,#ffb84d)", fontFamily: "'Space Grotesk',sans-serif" }}
          >
            <Wand2 className="w-4 h-4" /> Generate
          </button>
          <button
            onClick={() => { spin(); }}
            disabled={spinning}
            className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
            title="Random costume"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset quick-picks */}
      {presets && presets.length > 0 && phase === "idle" && (
        <div className="flex flex-wrap gap-2 mb-4">
          {presets.map(p => (
            <button key={p} onClick={() => { setInput(p); generate(p); }}
              className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/50 hover:text-white hover:border-[#FF9900]/30 hover:bg-[#FF9900]/10 transition-all"
              style={{ fontFamily: "'Inter',sans-serif" }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Verify */}
      {phase === "verify" && (
        <div className="my-6">
          <SliderVerify onVerified={onVerified} />
        </div>
      )}

      {/* Loading skeleton */}
      {phase === "loading" && (
        <div className="my-6">
          <div className="flex items-center gap-2 mb-4 text-[#FF9900]">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Searching Amazon for {pendingInput.current} costume pieces…</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 animate-pulse">
                <div className="aspect-square bg-white/[0.06] rounded-lg mb-3" />
                <div className="h-3 bg-white/[0.06] rounded mb-2 w-3/4" />
                <div className="h-3 bg-white/[0.06] rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {phase === "done" && slots.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-6 space-y-8">
          {slots.map((slot, si) => (
            <div key={si}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-sm capitalize" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  {slot.label}
                </h3>
                <a href={amzSearch(slot.query)} target="_blank" rel="noopener noreferrer sponsored"
                  className="text-[#FF9900] text-xs flex items-center gap-1 hover:underline">
                  See all on Amazon <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {slot.products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {slot.products.map((p, pi) => <ProductCard key={pi} p={p} />)}
                </div>
              ) : (
                <a href={amzSearch(slot.query)} target="_blank" rel="noopener noreferrer sponsored"
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-[#FF9900]/30 transition-all group">
                  <ShoppingCart className="w-5 h-5 text-[#FF9900]" />
                  <span className="text-white/60 text-sm group-hover:text-white transition-colors">Search "{slot.query}" on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/30 ml-auto" />
                </a>
              )}
            </div>
          ))}

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <p className="text-white/30 text-xs">Results via Amazon Associates · Tag: {TAG}</p>
            <button onClick={reset}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors">
              <RotateCcw className="w-3 h-3" /> Start over
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}