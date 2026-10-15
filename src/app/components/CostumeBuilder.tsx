import { useState, useEffect, useRef, useCallback, useMemo, startTransition } from "react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";

import {
  Wand2, ShoppingCart, ExternalLink, Check,
  Sparkles, Search, Zap, Share2, ArrowRight, X, Info,
  RotateCcw, ChevronDown, GripVertical, Layers,
  Crown, Shirt, Footprints, Sword,
  Star, Package, Plus, Loader2, ChefHat, Shield, ShieldCheck,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

/* ===============================================================
   BOT PROTECTION: proof-of-work solver + slider verification
   =============================================================== */
interface ChallengeToken { challenge: string; nonce: string; challengeTs: number; }

/** Fetch a challenge from the server then solve the proof-of-work in a Web Worker-like loop */
async function solveChallenge(): Promise<ChallengeToken> {
  const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15/challenge`, {
    headers: { Authorization: `Bearer ${publicAnonKey}` },
  });
  if (!res.ok) throw new Error("Failed to fetch challenge");
  const { challenge, ts } = await res.json();
  // Solve: find nonce where SHA-256(challenge + nonce) starts with 000 (first byte=0, second byte<16)
  const enc = new TextEncoder();
  for (let i = 0; i < 5_000_000; i++) {
    const nonce = i.toString(36);
    const data = enc.encode(challenge + nonce);
    const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", data));
    if (hash[0] === 0 && (hash[1] & 0xF0) === 0) {
      return { challenge, nonce, challengeTs: ts };
    }
  }
  throw new Error("Could not solve challenge in time");
}

/** Slider verification component — user drags a slider to verify they're human,
 *  while proof-of-work runs in the background */
function HumanVerification({ onVerified }: { onVerified: () => void }) {
  const [sliderVal, setSliderVal] = useState(0);
  const [solving, setSolving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const targetRef = useRef(85 + Math.floor(Math.random() * 10)); // 85-94

  const handleSlide = async (val: number) => {
    setSliderVal(val);
    if (val >= targetRef.current && !solving && !done) {
      setSolving(true);
      setError("");
      try {
        const token = await solveChallenge();
        // Store the solved token for later use
        sessionStorage.setItem("cp_challenge", JSON.stringify(token));
        setDone(true);
        setTimeout(onVerified, 600);
      } catch (e: any) {
        console.log("Challenge solve error:", e);
        setError("Verification failed. Please try again.");
        setSolving(false);
        setSliderVal(0);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          {done ? (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          ) : (
            <Shield className="w-5 h-5 text-[#FF9900]" />
          )}
          <h3 className="text-white text-sm" style={{ fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>
            {done ? "Verified! Building your costume..." : "Quick Verification"}
          </h3>
        </div>

        <p className="text-white/40 text-xs mb-5">
          Slide to verify you're a real costume enthusiast, not a bot.
        </p>

        <div className="relative">
          {/* Track */}
          <div className="relative h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] overflow-hidden">
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 transition-all duration-75"
              style={{
                width: `${sliderVal}%`,
                background: done
                  ? "linear-gradient(90deg, rgba(52,211,153,0.2), rgba(52,211,153,0.4))"
                  : sliderVal >= targetRef.current
                  ? "linear-gradient(90deg, rgba(255,153,0,0.2), rgba(255,153,0,0.5))"
                  : "linear-gradient(90deg, rgba(255,153,0,0.1), rgba(255,153,0,0.25))",
              }}
            />
            {/* Target zone indicator */}
            <div className="absolute inset-y-0 right-0 w-[15%] flex items-center justify-center">
              {!done && !solving && (
                <span className="text-white/10 text-xs" style={{ fontWeight: 500 }}>
                  {sliderVal < 40 ? "Slide →" : "Almost..."}
                </span>
              )}
            </div>
            {/* Thumb */}
            <div
              className="absolute top-1 bottom-1 w-10 rounded-lg flex items-center justify-center transition-colors"
              style={{
                left: `calc(${sliderVal}% - ${sliderVal * 0.4}px)`,
                background: done
                  ? "linear-gradient(135deg, #34d399, #10b981)"
                  : solving
                  ? "linear-gradient(135deg, #FF9900, #ffb84d)"
                  : "linear-gradient(135deg, #e5e7eb, #d1d5db)",
              }}
            >
              {done ? (
                <Check className="w-4 h-4 text-white" />
              ) : solving ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <GripVertical className="w-4 h-4 text-gray-600" />
              )}
            </div>
          </div>
          {/* Invisible range input on top */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={e => handleSlide(Number(e.target.value))}
            disabled={solving || done}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            style={{ zIndex: 10 }}
          />
        </div>

        {solving && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#FF9900] text-[11px] mt-3 flex items-center gap-2"
          >
            <Loader2 className="w-3 h-3 animate-spin" /> Verifying...
          </motion.p>
        )}
        {error && (
          <p className="text-red-400 text-[11px] mt-3">{error}</p>
        )}
        {done && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-emerald-400 text-[11px] mt-3 flex items-center gap-2"
          >
            <ShieldCheck className="w-3 h-3" /> Human verified — loading products with real prices
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

/* ===============================================================
   CONFIG
   =============================================================== */
const TAG = "cplanet0c-20";
const amzUrl = (q: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=${TAG}`;

/** Extract ASIN from any Amazon URL. */
function extractAsin(url: string): string | null {
  const m =
    url.match(/\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i) ||
    url.match(/\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i) ||
    url.match(/[?&](?:ASIN|asin)=([A-Z0-9]{10})(?:&|$)/i);
  return m ? m[1].toUpperCase() : null;
}

/**
 * Safe Amazon URL — extracts ASIN and strips broken session params
 * (qid, crid, linkCode=sl1, linkId, sprefix, ref_) to build a clean
 * /dp/ASIN?tag= direct product link. Falls back to keyword search if no ASIN.
 */
function safeAmzUrl(url: string, fallbackSearch: string): string {
  if (!url) return amzUrl(fallbackSearch);
  // Already a clean dp link → keep
  if (/amazon\.com\/dp\/[A-Z0-9]{10}\?tag=/.test(url)) return url;
  // Extract ASIN → clean direct link
  const asin = extractAsin(url);
  if (asin) return `https://www.amazon.com/dp/${asin}?tag=${TAG}`;
  // Clean search URL → keep
  if (url.includes("amazon.com/s?k=") && url.includes(`tag=${TAG}`)) return url;
  // Fallback: keyword search
  return amzUrl(fallbackSearch);
}
/** Build an Amazon cart URL — falls back to search since scraped ASINs are unreliable */
function amzCartUrl(asins: string[], fallbackQuery = "Halloween costume"): string {
  return amzUrl(fallbackQuery);
}
const API = `https://${projectId}.supabase.co/functions/v1/make-server-0d51dc15`;

/* ===============================================================
   FALLBACK IMAGES
   =============================================================== */
const FB: Record<string, string> = {
  mask:     "https://images.unsplash.com/photo-1759532047744-6b5f1b15d52f?w=300&h=300&fit=crop&q=80",
  wig:      "https://images.unsplash.com/photo-1663582816182-15cf69d87665?w=300&h=300&fit=crop&q=80",
  armor:    "https://images.unsplash.com/photo-1734122373993-36745ac6b688?w=300&h=300&fit=crop&q=80",
  cape:     "https://images.unsplash.com/photo-1711174496189-dd8f2d2389b1?w=300&h=300&fit=crop&q=80",
  gloves:   "https://images.unsplash.com/photo-1762288707193-6873d4545f00?w=300&h=300&fit=crop&q=80",
  boots:    "https://images.unsplash.com/photo-1762339107598-c3bf3036559f?w=300&h=300&fit=crop&q=80",
  crown:    "https://images.unsplash.com/photo-1673640525972-3c0dd5e6a933?w=300&h=300&fit=crop&q=80",
  sword:    "https://images.unsplash.com/photo-1717436426327-dd8f2d2389b1?w=300&h=300&fit=crop&q=80",
  gown:     "https://images.unsplash.com/photo-1641565351838-e68792525f58?w=300&h=300&fit=crop&q=80",
  makeup:   "https://images.unsplash.com/photo-1600358281917-a68ae634fb2b?w=300&h=300&fit=crop&q=80",
  belt:     "https://images.unsplash.com/photo-1684510334550-0c4fa8aaffd1?w=300&h=300&fit=crop&q=80",
  bodysuit: "https://images.unsplash.com/photo-1712574794508-9f6a31dbc9c8?w=300&h=300&fit=crop&q=80",
  jewelry:  "https://images.unsplash.com/photo-1763256614642-9dedc87763c7?w=300&h=300&fit=crop&q=80",
  hat:      "https://images.unsplash.com/photo-1697041273673-056e098cc3f2?w=300&h=300&fit=crop&q=80",
  pants:    "https://images.unsplash.com/photo-1760578359962-70d66d493aeb?w=300&h=300&fit=crop&q=80",
  heels:    "https://images.unsplash.com/photo-1760473004054-eb0fd50ea9ae?w=300&h=300&fit=crop&q=80",
  robe:     "https://images.unsplash.com/photo-1750190321589-b4d842964b6d?w=300&h=300&fit=crop&q=80",
  contacts: "https://images.unsplash.com/photo-1671810456796-48fd984dd413?w=300&h=300&fit=crop&q=80",
};
const FB_RULES: [RegExp, string][] = [
  [/mask|helmet|visor|prosthetic/i,"mask"],[/wig|hair/i,"wig"],[/tiara|crown/i,"crown"],
  [/hat|cap|headband|pointed|tricorn|ear/i,"hat"],[/armor|chest|breastplate/i,"armor"],
  [/cape|cloak/i,"cape"],[/robe/i,"robe"],[/gown|dress/i,"gown"],
  [/bodysuit|jumpsuit|uniform|costume|onesie|outfit|tunic|shirt|coat/i,"bodysuit"],
  [/glove|gauntlet|bracer|paw/i,"gloves"],[/boot/i,"boots"],[/heel|slipper|shoe|platform/i,"heels"],
  [/pants|breeches|skirt|leg|tail/i,"pants"],[/sword|cutlass|weapon|axe|blaster|staff|wand|scepter/i,"sword"],
  [/shield/i,"sword"],[/belt|sash|pouch|holster/i,"belt"],[/jewelry|necklace|chain|pendant/i,"jewelry"],
  [/makeup|face paint|sfx/i,"makeup"],[/contact|blood|led|padding|book|boom/i,"contacts"],
  [/badge|eye patch|sunglasses/i,"jewelry"],
];
function fallbackImg(name: string) {
  for (const [re, k] of FB_RULES) if (re.test(name)) return FB[k];
  return FB.bodysuit;
}

/* ===============================================================
   TYPES
   =============================================================== */
type ZoneId = "head" | "torso" | "legs" | "feet" | "hands" | "props";

interface ProductImg {
  asin: string; title: string; image: string; thumbnail: string;
  price: string; url: string;
}

interface Item {
  id: string; name: string; search: string; url: string;
  zone: ZoneId; emoji: string; price: string;
  img: string; asin: string;
  productImages: ProductImg[];
  loadingProducts: boolean;
  equipped: boolean;
}

interface ZoneDef {
  id: ZoneId; label: string; short: string; emoji: string; icon: any; color: string;
}
const ZONES: ZoneDef[] = [
  { id: "head",  label: "Head & Hair",    short: "Head",  emoji: "\u{1F451}", icon: Crown,      color: "#a855f7" },
  { id: "torso", label: "Upper Body",     short: "Torso", emoji: "\u{1F454}", icon: Shirt,      color: "#3b82f6" },
  { id: "hands", label: "Hands & Arms",   short: "Hands", emoji: "\u{1F9E4}", icon: Star,       color: "#ec4899" },
  { id: "legs",  label: "Lower Body",     short: "Legs",  emoji: "\u{1F456}", icon: Package,    color: "#f59e0b" },
  { id: "feet",  label: "Footwear",       short: "Feet",  emoji: "\u{1F462}", icon: Footprints, color: "#10b981" },
  { id: "props", label: "Props & Extras", short: "Props", emoji: "\u2694\uFE0F", icon: Sword,      color: "#ef4444" },
];
const ZM = Object.fromEntries(ZONES.map(z => [z.id, z])) as Record<ZoneId, ZoneDef>;

/* ===============================================================
   ARCHETYPES
   =============================================================== */
interface Archetype {
  label: string; emoji: string; keywords: string[];
  palette: [string, string];
  items: (n: string) => Pick<Item, "name"|"search"|"zone"|"emoji"|"price">[];
}
function mk(name: string, search: string, zone: ZoneId, emoji: string, price: string) {
  return { name, search, zone, emoji, price };
}

const ARCHETYPES: Archetype[] = [
  { label:"Superhero",emoji:"\u{1F9B8}",palette:["#dc2626","#1d4ed8"],
    keywords:["superhero","spider","batman","superman","captain","iron man","avenger","marvel","dc","flash","wonder woman","hulk","thor","wolverine","deadpool","venom","black panther"],
    items:n=>[mk(`${n} Mask/Helmet`,`${n} costume mask helmet`,"head","\u{1F3AD}","$12-25"),mk(`${n} Bodysuit`,`${n} costume bodysuit`,"torso","\u{1F454}","$25-55"),mk(`${n} Cape`,`${n} costume cape`,"torso","\u{1F9B8}","$10-20"),mk(`${n} Gloves`,`${n} costume gloves`,"hands","\u{1F9E4}","$8-15"),mk(`${n} Belt`,`${n} costume utility belt`,"hands","\u{1F397}\uFE0F","$10-18"),mk(`${n} Boots`,`${n} costume boots cosplay`,"feet","\u{1F462}","$20-45"),mk(`${n} Shield/Weapon`,`${n} cosplay prop weapon`,"props","\u{1F6E1}\uFE0F","$15-35"),mk(`Muscle Padding`,`muscle padding superhero`,"torso","\u{1F4AA}","$15-30")]},
  { label:"Princess/Queen",emoji:"\u{1F451}",palette:["#ec4899","#eab308"],
    keywords:["princess","queen","elsa","anna","cinderella","belle","rapunzel","jasmine","mulan","moana","tiana","ariel","aurora","snow white","frozen","fairy","goddess"],
    items:n=>[mk(`${n} Tiara/Crown`,`${n} tiara crown costume`,"head","\u{1F451}","$8-18"),mk(`${n} Wig`,`${n} wig cosplay`,"head","\u{1F487}","$15-30"),mk(`${n} Gown/Dress`,`${n} costume dress gown`,"torso","\u{1F457}","$30-65"),mk(`${n} Long Gloves`,`${n} costume long gloves`,"hands","\u{1F9E4}","$8-15"),mk(`${n} Jewelry Set`,`${n} costume jewelry`,"hands","\u{1F48E}","$10-20"),mk(`${n} Heels/Slippers`,`${n} costume shoes heels`,"feet","\u{1F460}","$18-35"),mk(`${n} Wand/Scepter`,`${n} wand scepter prop`,"props","\u2728","$8-15"),mk(`${n} Makeup Kit`,`${n} character makeup`,"props","\u{1F484}","$12-25")]},
  { label:"Villain",emoji:"\u{1F608}",palette:["#7c3aed","#16a34a"],
    keywords:["villain","joker","thanos","maleficent","cruella","ursula","voldemort","darth","sith","evil","dark lord"],
    items:n=>[mk(`${n} Mask`,`${n} mask face paint villain`,"head","\u{1F3AD}","$12-28"),mk(`${n} Wig`,`${n} wig cosplay villain`,"head","\u{1F487}","$15-30"),mk(`${n} Costume`,`${n} villain costume`,"torso","\u{1F454}","$25-55"),mk(`${n} Cape/Robe`,`${n} villain cape robe`,"torso","\u{1F9E5}","$15-30"),mk(`${n} Gloves`,`${n} costume gloves`,"hands","\u{1F9E4}","$8-15"),mk(`${n} Dark Boots`,`${n} costume boots dark`,"feet","\u{1F462}","$20-40"),mk(`${n} Weapon/Staff`,`${n} costume weapon staff`,"props","\u2694\uFE0F","$15-35"),mk(`Colored Contacts`,`colored contact lenses cosplay`,"props","\u{1F441}\uFE0F","$10-20")]},
  { label:"Warrior/Knight",emoji:"\u2694\uFE0F",palette:["#78716c","#a16207"],
    keywords:["warrior","knight","viking","gladiator","samurai","spartan","medieval","barbarian","valkyrie","game of thrones"],
    items:n=>[mk(`${n} Helmet`,`${n} costume helmet`,"head","\u26D1\uFE0F","$15-35"),mk(`${n} Armor`,`${n} costume armor chestplate`,"torso","\u{1F6E1}\uFE0F","$25-50"),mk(`${n} Tunic`,`${n} medieval tunic costume`,"torso","\u{1F454}","$15-25"),mk(`${n} Gauntlets`,`${n} costume gauntlets bracers`,"hands","\u{1F9E4}","$12-22"),mk(`${n} Pants`,`${n} costume pants medieval`,"legs","\u{1F456}","$15-25"),mk(`${n} Boots`,`${n} medieval warrior boots`,"feet","\u{1F462}","$25-45"),mk(`${n} Sword/Axe`,`${n} costume sword weapon prop`,"props","\u2694\uFE0F","$15-35"),mk(`${n} Shield`,`${n} costume shield prop`,"props","\u{1F6E1}\uFE0F","$18-35")]},
  { label:"Wizard/Witch",emoji:"\u{1F9D9}",palette:["#6d28d9","#1e40af"],
    keywords:["wizard","witch","sorcerer","mage","harry potter","gandalf","hermione","merlin","hogwarts","magical"],
    items:n=>[mk(`${n} Pointed Hat`,`${n} wizard witch hat`,"head","\u{1F3A9}","$8-18"),mk(`${n} Wig`,`${n} wig long hair cosplay`,"head","\u{1F487}","$12-25"),mk(`${n} Robe/Cloak`,`${n} costume robe wizard`,"torso","\u{1F9E5}","$25-50"),mk(`${n} Wand`,`${n} magic wand prop`,"props","\u2728","$8-20"),mk(`${n} Belt/Pouch`,`${n} leather belt pouch`,"hands","\u{1F397}\uFE0F","$10-18"),mk(`${n} Boots`,`${n} medieval boots costume`,"feet","\u{1F462}","$20-40"),mk(`Spell Book Prop`,`spell book prop cosplay`,"props","\u{1F4D6}","$10-20")]},
  { label:"Pirate",emoji:"\u{1F3F4}\u200D\u2620\uFE0F",palette:["#92400e","#991b1b"],
    keywords:["pirate","captain hook","jack sparrow","buccaneer","corsair","blackbeard"],
    items:n=>[mk(`Pirate Hat`,`${n} pirate hat tricorn`,"head","\u{1F3A9}","$10-20"),mk(`Pirate Coat`,`${n} pirate coat jacket`,"torso","\u{1F9E5}","$25-50"),mk(`Pirate Shirt`,`pirate ruffle shirt`,"torso","\u{1F454}","$12-22"),mk(`Pirate Pants`,`pirate pants breeches`,"legs","\u{1F456}","$15-25"),mk(`Eye Patch`,`pirate eye patch costume`,"head","\u{1F3F4}\u200D\u2620\uFE0F","$5-10"),mk(`Belt/Sash`,`pirate belt sash costume`,"hands","\u{1F397}\uFE0F","$8-15"),mk(`Pirate Boots`,`pirate boots costume leather`,"feet","\u{1F462}","$20-40"),mk(`Cutlass/Sword`,`pirate sword cutlass prop`,"props","\u2694\uFE0F","$12-25")]},
  { label:"Horror/Zombie",emoji:"\u{1F9DF}",palette:["#450a0a","#365314"],
    keywords:["zombie","horror","ghost","skeleton","vampire","dracula","werewolf","mummy","freddy","jason","pennywise","scream","ghostface","demon","devil","grim reaper"],
    items:n=>[mk(`${n} Mask`,`${n} horror mask`,"head","\u{1F3AD}","$12-30"),mk(`${n} Costume`,`${n} horror costume`,"torso","\u{1F454}","$20-45"),mk(`Torn Pants`,`zombie ripped pants costume`,"legs","\u{1F456}","$12-22"),mk(`SFX Makeup Kit`,`sfx makeup kit horror`,"props","\u{1F484}","$15-30"),mk(`Fake Blood`,`fake blood halloween`,"props","\u{1FA78}","$5-10"),mk(`${n} Weapon`,`${n} horror weapon prop`,"props","\u{1F52A}","$10-22"),mk(`${n} Wig`,`${n} horror wig`,"head","\u{1F487}","$12-25"),mk(`${n} Boots`,`${n} costume boots`,"feet","\u{1F462}","$18-35")]},
  { label:"Anime/Manga",emoji:"\u{1F38C}",palette:["#e11d48","#2563eb"],
    keywords:["anime","manga","naruto","goku","luffy","demon slayer","tanjiro","nezuko","sailor moon","dragon ball","jujutsu kaisen","gojo","one piece","my hero academia","deku","cosplay"],
    items:n=>[mk(`${n} Wig`,`${n} anime cosplay wig`,"head","\u{1F487}","$15-30"),mk(`${n} Headband`,`${n} cosplay headband`,"head","\u{1F380}","$6-12"),mk(`${n} Costume Set`,`${n} anime cosplay costume`,"torso","\u{1F454}","$25-55"),mk(`${n} Pants/Skirt`,`${n} cosplay pants skirt`,"legs","\u{1F456}","$15-28"),mk(`${n} Shoes`,`${n} cosplay boots shoes`,"feet","\u{1F462}","$20-40"),mk(`${n} Weapon/Prop`,`${n} cosplay weapon prop`,"props","\u2694\uFE0F","$15-30"),mk(`Cosplay Contacts`,`anime cosplay colored contacts`,"props","\u{1F441}\uFE0F","$10-18"),mk(`${n} Gloves`,`${n} cosplay gloves`,"hands","\u{1F9E4}","$8-15")]},
  { label:"Sci-Fi",emoji:"\u{1F680}",palette:["#0891b2","#6366f1"],
    keywords:["sci-fi","space","astronaut","alien","robot","star wars","star trek","mandalorian","stormtrooper","jedi","cyberpunk","matrix","futuristic"],
    items:n=>[mk(`${n} Helmet/Visor`,`${n} sci-fi helmet visor`,"head","\u26D1\uFE0F","$18-40"),mk(`${n} Jumpsuit`,`${n} sci-fi costume jumpsuit`,"torso","\u{1F454}","$25-55"),mk(`${n} Armor`,`${n} costume armor pieces`,"torso","\u{1F6E1}\uFE0F","$20-40"),mk(`${n} Gloves`,`${n} sci-fi costume gloves`,"hands","\u{1F9E4}","$8-15"),mk(`${n} Boots`,`${n} sci-fi costume boots`,"feet","\u{1F462}","$22-45"),mk(`${n} Blaster`,`${n} sci-fi blaster prop`,"props","\u{1F52B}","$12-28"),mk(`LED Lights`,`LED lights cosplay costume`,"props","\u{1F4A1}","$8-18")]},
  { label:"Animal/Creature",emoji:"\u{1F43E}",palette:["#c2410c","#a16207"],
    keywords:["animal","cat","dog","bunny","rabbit","bear","fox","wolf","lion","tiger","dinosaur","dragon","unicorn"],
    items:n=>[mk(`${n} Ears/Headband`,`${n} ears headband costume`,"head","\u{1F431}","$6-12"),mk(`${n} Onesie`,`${n} costume onesie kigurumi`,"torso","\u{1F454}","$20-40"),mk(`${n} Tail`,`${n} tail costume accessory`,"legs","\u{1F98A}","$6-12"),mk(`${n} Paw Gloves`,`${n} paw gloves costume`,"hands","\u{1F9E4}","$8-15"),mk(`${n} Face Paint`,`${n} face paint costume`,"props","\u{1F3A8}","$8-15"),mk(`${n} Slippers`,`${n} animal slippers costume`,"feet","\u{1F43E}","$12-22")]},
  { label:"Retro/Decade",emoji:"\u{1F57A}",palette:["#db2777","#f97316"],
    keywords:["80s","90s","retro","disco","hippie","70s","60s","neon","punk","grunge","rockstar","elvis","pop star"],
    items:n=>[mk(`${n} Wig`,`${n} retro wig big hair`,"head","\u{1F487}","$12-25"),mk(`${n} Outfit`,`${n} retro costume outfit`,"torso","\u{1F454}","$20-45"),mk(`${n} Pants`,`${n} retro pants flares`,"legs","\u{1F456}","$15-28"),mk(`${n} Sunglasses`,`${n} retro sunglasses`,"head","\u{1F576}\uFE0F","$6-12"),mk(`${n} Jewelry`,`${n} retro jewelry chains`,"hands","\u{1F48E}","$8-18"),mk(`${n} Platform Shoes`,`${n} retro platform shoes`,"feet","\u{1F462}","$20-38"),mk(`Boom Box Prop`,`inflatable boom box prop`,"props","\u{1F4FB}","$10-20")]},
  { label:"Profession",emoji:"\u{1F468}\u200D\u2695\uFE0F",palette:["#1e3a5f","#44403c"],
    keywords:["doctor","nurse","police","cop","firefighter","pilot","chef","soldier","army","cowboy","cowgirl","sailor","spy","detective","scientist"],
    items:n=>[mk(`${n} Hat/Cap`,`${n} costume hat cap`,"head","\u{1F3A9}","$8-18"),mk(`${n} Uniform`,`${n} costume uniform`,"torso","\u{1F454}","$20-45"),mk(`${n} Pants`,`${n} costume uniform pants`,"legs","\u{1F456}","$15-28"),mk(`${n} Badge/ID`,`${n} costume badge prop`,"hands","\u{1FAAA}","$5-10"),mk(`${n} Tool/Equip`,`${n} costume prop tool`,"props","\u{1F527}","$8-18"),mk(`${n} Boots`,`${n} costume boots shoes`,"feet","\u{1F462}","$20-40")]},
];
const FALLBACK_ARCH: Archetype = {
  label:"Custom",emoji:"\u{1F3AD}",palette:["#FF9900","#6366f1"],keywords:[],
  items:n=>[mk(`${n} Headwear`,`${n} costume hat headpiece`,"head","\u{1F3A9}","$8-20"),mk(`${n} Main Outfit`,`${n} costume`,"torso","\u{1F454}","$20-50"),mk(`${n} Bottoms`,`${n} costume pants bottoms`,"legs","\u{1F456}","$15-30"),mk(`${n} Accessories`,`${n} costume accessories gloves`,"hands","\u{1F397}\uFE0F","$8-18"),mk(`${n} Shoes`,`${n} costume shoes boots`,"feet","\u{1F462}","$18-38"),mk(`${n} Props`,`${n} costume prop`,"props","\u2694\uFE0F","$10-25")],
};

function detect(input: string): Archetype {
  const l = input.toLowerCase(); let best: Archetype | null = null, bs = 0;
  for (const a of ARCHETYPES) { let s = 0; for (const k of a.keywords) if (l.includes(k)) s += k.length; if (s > bs) { bs = s; best = a; } }
  return best && bs > 0 ? best : FALLBACK_ARCH;
}

let _n = 0; const uid = () => `i${++_n}_${Date.now()}`;

function inflate(raw: Pick<Item, "name"|"search"|"zone"|"emoji"|"price">): Item {
  return { ...raw, id: uid(), url: amzUrl(raw.search), img: fallbackImg(raw.name), asin: "", productImages: [], loadingProducts: false, equipped: false };
}
/** Parse a price string into [lo, hi] range.
 *  Handles: "$24.99", "$12-25", "$12.99-$25.50", "12.99" */
function parsePriceRange(p: string): [number, number] {
  const rangeMatch = p.match(/\$?\s*(\d+\.?\d*)\s*[-\u2013]\s*\$?\s*(\d+\.?\d*)/);
  if (rangeMatch) return [parseFloat(rangeMatch[1]), parseFloat(rangeMatch[2])];
  const dec = p.match(/\$?\s*(\d+\.?\d*)/);
  if (dec) { const v = parseFloat(dec[1]); return [v, v]; }
  return [15, 30];
}
/** Format currency using user's locale */
function fmtPrice(v: number): string {
  try {
    return new Intl.NumberFormat(navigator.language || "en-US", {
      style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(v);
  } catch { return `$${v.toFixed(2)}`; }
}

/* ===============================================================
   DnD + Image helpers
   =============================================================== */
// Module-level tracker so dragover handlers can inspect the current drag item
// (dataTransfer.getData is only readable inside "drop", not "dragover")
let _dragItem: { id: string; zone: ZoneId } | null = null;

function Img({ src, alt, size = 52, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
  const [e, setE] = useState(false);
  return (
    <div className={`rounded-lg overflow-hidden bg-white/[0.06] shrink-0 ${className}`} style={{ width: size, height: size }}>
      {!e ? <img src={src} alt={alt} loading="lazy" onError={() => setE(true)} className="w-full h-full object-cover" draggable={false} />
        : <div className="w-full h-full flex items-center justify-center text-white/20 text-lg">{"\u{1F3AD}"}</div>}
    </div>
  );
}

/* ===============================================================
   RECIPE STEP DESCRIPTIONS
   =============================================================== */
const STEP_INSTRUCTIONS: Record<ZoneId, string> = {
  head:  "Start at the top \u2014 the headpiece sets the character instantly. Masks, wigs, crowns, helmets.",
  torso: "The showpiece. This core garment defines the silhouette \u2014 suit, gown, armor, or robe.",
  hands: "Details that sell the look. Gloves, gauntlets, jewelry, or bracers add authenticity.",
  legs:  "Complete the lower half \u2014 pants, leggings, skirts, or tails to match the theme.",
  feet:  "Ground the costume with the right footwear \u2014 boots, heels, slippers, or paws.",
  props: "The finishing touch. Weapons, wands, shields, or signature accessories steal the show.",
};

const STEP_TITLES: Record<ZoneId, string> = {
  head: "The Headpiece", torso: "The Outfit", hands: "The Accessories",
  legs: "The Bottoms", feet: "The Footwear", props: "The Finishing Touch",
};

/* ===============================================================
   DRAGGABLE PRODUCT MINI CARD (for catalog inside each step)
   =============================================================== */
function DraggableProductCard({ item, onEquip }: { item: Item; onEquip: (id: string, pi?: ProductImg) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const hasProducts = item.productImages.length > 0;

  return (
    <div className="relative">
      <div
        draggable
        onDragStart={e => {
          _dragItem = { id: item.id, zone: item.zone };
          e.dataTransfer.effectAllowed = "move";
          setIsDragging(true);
        }}
        onDragEnd={() => { _dragItem = null; setIsDragging(false); }}
        className={`group flex items-center gap-2.5 p-2.5 rounded-xl border cursor-grab active:cursor-grabbing select-none transition-all duration-200 ${
          isDragging ? "opacity-20 scale-95 border-white/5"
            : "bg-white/[0.03] border-white/[0.06] hover:border-[#FF9900]/30 hover:bg-white/[0.06]"
        }`} style={{ touchAction: "none" }}>
        <GripVertical className="w-3 h-3 text-white/10 shrink-0" />
        <Img src={item.img} alt={item.name} size={56} className="rounded-xl" />
        <div className="flex-1 min-w-0">
          <p className="text-white text-[12px] leading-tight truncate" style={{ fontWeight: 600 }}>{item.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[#FF9900] text-[11px]" style={{ fontWeight: 700 }}>
              {item.productImages[0]?.price || item.price}
            </span>
            {item.loadingProducts && <Loader2 className="w-3 h-3 text-[#FF9900]/50 animate-spin" />}
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1.5">
          {hasProducts && (
            <button onClick={e => { e.stopPropagation(); setShowPicker(!showPicker); }}
              className="text-[9px] text-white/30 hover:text-white/60 px-1.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-all"
              style={{ fontWeight: 600 }}>{item.productImages.length} options</button>
          )}
          <button onClick={() => onEquip(item.id)}
            className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#FF9900]/15 hover:bg-[#FF9900]/30 text-[#FF9900] transition-all">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showPicker && hasProducts && (
          <motion.div initial={{ opacity: 0, y: -5, scaleY: .9 }} animate={{ opacity: 1, y: 0, scaleY: 1 }} exit={{ opacity: 0, y: -5, scaleY: .9 }}
            className="absolute left-0 right-0 top-full mt-1 bg-[#0c1042] border border-white/[0.1] rounded-xl p-2.5 z-40 shadow-2xl">
            <p className="text-[10px] text-white/30 mb-2 px-1" style={{ fontWeight: 600 }}>Choose a product:</p>
            <div className="grid grid-cols-3 gap-2">
              {item.productImages.slice(0, 6).map((pi, idx) => (
                <button key={idx} onClick={() => { onEquip(item.id, pi); setShowPicker(false); }}
                  className="rounded-lg overflow-hidden border border-white/[0.06] hover:border-[#FF9900]/40 transition-all bg-white">
                  <img src={pi.thumbnail || pi.image} alt={pi.title}
                    className="w-full aspect-square object-contain bg-white p-0.5"
                    onError={e => (e.currentTarget.style.display = "none")} />
                  {pi.price && <p className="text-[9px] text-[#FF9900] text-center py-0.5 bg-black/80" style={{ fontWeight: 700 }}>{pi.price}</p>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===============================================================
   RECIPE STEP COMPONENT
   =============================================================== */
function RecipeStep({
  zone, stepNum, totalSteps, zoneItems, equippedItems, palette, onEquip, onUnequip,
}: {
  zone: ZoneDef; stepNum: number; totalSteps: number;
  zoneItems: Item[]; equippedItems: Item[];
  palette: [string, string];
  onEquip: (id: string, pi?: ProductImg) => void;
  onUnequip: (id: string) => void;
}) {
  const [isOver, setIsOver] = useState(false);

  const catalog = zoneItems.filter(i => !i.equipped);
  const equipped = equippedItems.filter(i => i.zone === zone.id);
  const isComplete = equipped.length > 0;
  const isLast = stepNum === totalSteps;
  const [c1, c2] = palette;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: stepNum * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 md:gap-8"
      onDragOver={e => { if (_dragItem?.zone === zone.id) { e.preventDefault(); setIsOver(true); } }}
      onDragLeave={() => setIsOver(false)}
      onDrop={e => { e.preventDefault(); setIsOver(false); if (_dragItem?.zone === zone.id) onEquip(_dragItem.id); }}
    >
      {/* LEFT: Step number + vertical line */}
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          animate={isComplete ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4 }}
          className={`relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-lg md:text-xl border-2 transition-all duration-500 ${
            isComplete
              ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : isOver
                ? "bg-[#FF9900]/15 border-[#FF9900]/40 text-[#FF9900] shadow-[0_0_20px_rgba(255,153,0,0.15)]"
                : "bg-white/[0.04] border-white/[0.08] text-white/25"
          }`}
          style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800 }}
        >
          {isComplete ? <Check className="w-6 h-6" /> : stepNum}
        </motion.div>
        {!isLast && (
          <div className={`w-0.5 flex-1 min-h-[40px] mt-3 transition-colors duration-500 ${
            isComplete ? "bg-gradient-to-b from-emerald-500/30 to-emerald-500/5" : "bg-white/[0.06]"
          }`} />
        )}
      </div>

      {/* RIGHT: Content */}
      <div className={`flex-1 pb-10 ${isLast ? "pb-0" : ""}`}>
        {/* Step header */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{zone.emoji}</span>
            <h3 className={`text-base md:text-lg transition-colors ${isComplete ? "text-white" : "text-white/60"}`}
              style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>
              Step {stepNum}: {STEP_TITLES[zone.id]}
            </h3>
            {isComplete && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" style={{ fontWeight: 600 }}>
                Done
              </motion.span>
            )}
          </div>
          <p className="text-white/30 text-xs md:text-sm leading-relaxed">{STEP_INSTRUCTIONS[zone.id]}</p>
        </div>

        {/* Equipped items */}
        <AnimatePresence mode="popLayout">
          {equipped.map(item => (
            <motion.div key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              layout
              className="mb-3 rounded-2xl border border-emerald-500/15 bg-gradient-to-r from-emerald-500/[0.04] to-transparent p-3 md:p-4"
            >
              <div className="flex items-start gap-3 md:gap-4">
                {/* Product image */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-white border border-white/10 shadow-lg">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain bg-white p-1" onError={e => (e.currentTarget.style.display = "none")} />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-white text-sm md:text-base truncate" style={{ fontWeight: 600 }}>{item.name}</p>
                  <p className="text-[#FF9900] text-sm mt-1" style={{ fontWeight: 700 }}>
                    {item.productImages[0]?.price || item.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <a href={safeAmzUrl(item.url, item.search)} target="_blank" rel="noopener noreferrer nofollow sponsored"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#FF9900] to-[#ffb84d] text-white text-[11px] rounded-lg hover:shadow-lg transition-all"
                      style={{ fontWeight: 700 }}>
                      <ShoppingCart className="w-3 h-3" /> Buy on Amazon <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                    <button onClick={() => onUnequip(item.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] text-white/30 hover:text-red-400 bg-white/[0.04] hover:bg-red-500/10 rounded-lg border border-white/[0.06] transition-all"
                      style={{ fontWeight: 500 }}>
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Drop zone highlight */}
        {isOver && !isComplete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-3 rounded-2xl border-2 border-dashed border-[#FF9900]/40 bg-[#FF9900]/[0.05] p-6 text-center">
            <Sparkles className="w-5 h-5 text-[#FF9900] mx-auto mb-1.5" />
            <p className="text-[#FF9900] text-xs" style={{ fontWeight: 600 }}>Drop to equip!</p>
          </motion.div>
        )}

        {/* Available products catalog for this zone */}
        {catalog.length > 0 && (
          <div className={`space-y-1.5 ${isComplete ? "opacity-50 hover:opacity-100 transition-opacity" : ""}`}>
            {!isComplete && (
              <p className="text-[10px] text-white/20 uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>
                Available pieces \u2014 click + or drag
              </p>
            )}
            {isComplete && (
              <p className="text-[10px] text-white/15 uppercase tracking-wider mb-2" style={{ fontWeight: 600 }}>
                Swap with another option:
              </p>
            )}
            {catalog.map(item => (
              <DraggableProductCard key={item.id} item={item} onEquip={onEquip} />
            ))}
          </div>
        )}

        {/* No items and not equipped */}
        {catalog.length === 0 && !isComplete && (
          <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] p-6 text-center">
            <p className="text-white/15 text-xs">No items available for this zone</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ===============================================================
   MAIN BUILDER
   =============================================================== */
const SUGGESTIONS = ["Jack Sparrow", "Darth Vader", "Elsa", "Spider-Man", "Wednesday Addams", "Pirate Captain", "Zombie Nurse", "Samurai Warrior", "Sailor Moon", "Cowboy", "Cyberpunk", "Viking"];

export function CostumeBuilder() {
  const [sp, setSp] = useSearchParams();
  const initQ = sp.get("q") || "";
  const [input, setInput] = useState(initQ);
  const [name, setName] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [arch, setArch] = useState<Archetype | null>(null);
  const [building, setBuilding] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showArch, setShowArch] = useState(false);
  const [verified, setVerified] = useState(() => !!sessionStorage.getItem("cp_challenge"));
  const [pendingQuery, setPendingQuery] = useState("");
  const resRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (initQ && !items.length) { if (verified) go(initQ); else setPendingQuery(initQ); } }, []);

  async function fetchProductImages(newItems: Item[]) {
    const queries = newItems.map(i => i.search);
    // Solve a fresh challenge for each product search (challenges are one-time use)
    let challengeData: ChallengeToken | null = null;
    try { challengeData = await solveChallenge(); } catch (e) { console.log("Challenge solve failed:", e); }
    try {
      const res = await fetch(`${API}/product-search`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${publicAnonKey}` },
        body: JSON.stringify({ queries, ...challengeData }),
      });
      if (!res.ok) { console.log("Product search failed:", res.status); return; }
      const data = await res.json();
      const productMap: Record<string, ProductImg[]> = data.products || {};
      setItems(prev => prev.map(item => {
        const results = productMap[item.search];
        if (results && results.length > 0) {
          return {
            ...item, productImages: results,
            img: results[0].thumbnail || results[0].image || item.img,
            price: results[0].price || item.price,
            url: results[0].url || item.url,
            asin: results[0].asin || item.asin,
            loadingProducts: false,
          };
        }
        return { ...item, loadingProducts: false };
      }));
    } catch (err) {
      console.log("Product search error:", err);
      setItems(prev => prev.map(i => ({ ...i, loadingProducts: false })));
    }
  }

  function go(n: string, force?: Archetype, skipVerify?: boolean) {
    if (!n.trim()) return;
    // If not verified yet, queue the build and show verification
    if (!verified && !skipVerify) {
      setPendingQuery(n.trim());
      return;
    }
    setBuilding(true);
    const t = n.trim();
    setName(t);
    startTransition(() => {
      setSp({ q: t }, { replace: true });
    });
    const a = force || detect(t);
    setArch(a);
    setTimeout(() => {
      _n = 0;
      const newItems = a.items(t).map(i => inflate(i)).map(i => ({ ...i, loadingProducts: true }));
      setItems(newItems);
      setBuilding(false);
      fetchProductImages(newItems);
      setTimeout(() => resRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }, 900);
  }

  const equip = (id: string, pi?: ProductImg) => setItems(p => p.map(i => {
    if (i.id !== id) return i;
    const update: Partial<Item> = { equipped: true };
    if (pi) { update.img = pi.thumbnail || pi.image; update.price = pi.price || i.price; update.url = pi.url || i.url; update.asin = pi.asin || i.asin; }
    return { ...i, ...update };
  }));
  const unequip = (id: string) => setItems(p => p.map(i => i.id === id ? { ...i, equipped: false } : i));
  const equipAll = () => setItems(p => p.map(i => ({ ...i, equipped: true })));
  const share = () => { navigator.clipboard.writeText(`${location.origin}/build?q=${encodeURIComponent(name)}`); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  /** Called when HumanVerification slider completes */
  const onHumanVerified = useCallback(() => {
    setVerified(true);
    if (pendingQuery) {
      const q = pendingQuery;
      setPendingQuery("");
      // skipVerify=true to bypass the verified state check (React hasn't re-rendered yet)
      setTimeout(() => go(q, undefined, true), 100);
    }
  }, [pendingQuery]);

  const eq = useMemo(() => items.filter(i => i.equipped), [items]);
  const eqAsins = useMemo(() => eq.map(i => i.asin).filter((a): a is string => !!a && /^[A-Z0-9]{10}$/.test(a)), [eq]);
  const filledSet = useMemo(() => new Set(ZONES.filter(z => eq.some(i => i.zone === z.id)).map(z => z.id)) as Set<ZoneId>, [eq]);
  const pct = Math.round((filledSet.size / ZONES.length) * 100);
  const budget = eq.reduce((a, i) => { const [lo, hi] = parsePriceRange(i.price); return [a[0] + lo, a[1] + hi]; }, [0, 0] as [number, number]);
  const isSinglePrice = budget[0] === budget[1];
  const budgetDisplay = isSinglePrice ? fmtPrice(budget[0]) : `${fmtPrice(budget[0])} \u2013 ${fmtPrice(budget[1])}`;

  /* Zones that actually have items */
  const activeZones = ZONES.filter(z => items.some(i => i.zone === z.id));

  /* Amazon Add-to-Cart URL with all equipped items that have ASINs */
  const cartLink = amzUrl(`${name} costume complete set`);

  return (
    <div className="w-full">
      {/* SEARCH */}
      <div className="max-w-3xl mx-auto">
        <form onSubmit={e => { e.preventDefault(); go(input); }} className="relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF9900] via-[#ffce54] to-[#FF9900] rounded-3xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500" />
            <div className="relative flex items-center bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl overflow-hidden group-hover:border-[#FF9900]/30 transition-all">
              <div className="pl-5"><Wand2 className="w-5 h-5 text-[#FF9900]" /></div>
              <input value={input} onChange={e => setInput(e.target.value)}
                placeholder="Type any costume... Jack Sparrow, Elsa, Zombie Nurse..."
                className="flex-1 bg-transparent text-white placeholder-white/30 px-4 py-5 text-lg outline-none"
                style={{ fontFamily: "'Inter',sans-serif" }} />
              <motion.button type="submit" disabled={!input.trim() || building}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}
                className="m-2 px-6 py-3 bg-gradient-to-r from-[#FF9900] to-[#ffb84d] text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#FF9900]/20"
                style={{ fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>
                {building
                  ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Sparkles className="w-5 h-5" /></motion.div>
                  : <span className="flex items-center gap-2">Build It <ArrowRight className="w-4 h-4" /></span>}
              </motion.button>
            </div>
          </div>
        </form>
        {!name && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5 }} className="mt-5 flex flex-wrap gap-2 justify-center">
            <span className="text-white/30 text-xs uppercase tracking-wider mr-2 self-center" style={{ fontWeight: 500 }}>Try:</span>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => { setInput(s); go(s); }}
                className="px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] hover:border-[#FF9900]/30 rounded-full text-white/60 hover:text-white text-xs transition-all"
                style={{ fontWeight: 500 }}>{s}</button>
            ))}
          </motion.div>
        )}
      </div>

      {/* HUMAN VERIFICATION GATE */}
      <AnimatePresence>
        {pendingQuery && !verified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8"
          >
            <HumanVerification onVerified={onHumanVerified} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BUILDING ANIMATION */}
      <AnimatePresence>
        {building && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto mt-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-5">
              {["\u{1F9F5}", "\u2702\uFE0F", "\u{1F3A8}", "\u{1F457}", "\u2728"].map((e, i) => (
                <motion.span key={i} className="text-4xl" animate={{ y: [0, -25, 0], opacity: [.3, 1, .3], rotate: [0, 10, -10, 0] }} transition={{ duration: .7, delay: i * .12, repeat: Infinity }}>{e}</motion.span>
              ))}
            </div>
            <p className="text-white/60 text-lg" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Crafting your <span className="text-[#FF9900]" style={{ fontWeight: 600 }}>{name}</span> costume recipe...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =============================================
           COSTUME RECIPE
         ============================================= */}
      <AnimatePresence>
        {items.length > 0 && !building && (
          <motion.div ref={resRef} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }} className="mt-10 scroll-mt-8">

            {/* Recipe Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto mb-10 rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden"
            >
              {/* Color accent bar */}
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${arch?.palette[0] || '#FF9900'}, ${arch?.palette[1] || '#6366f1'})` }} />

              <div className="p-5 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  {/* Left: Title */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-white/50 border border-white/[0.06]" style={{ fontWeight: 600 }}>
                        {arch?.emoji} {arch?.label}
                      </span>
                      <div className="relative">
                        <button onClick={() => setShowArch(!showArch)}
                          className="text-[10px] text-white/25 hover:text-white/50 flex items-center gap-0.5 transition-colors" style={{ fontWeight: 500 }}>
                          Change <ChevronDown className="w-3 h-3" />
                        </button>
                        <AnimatePresence>
                          {showArch && (
                            <motion.div initial={{ opacity: 0, y: -8, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .95 }}
                              className="absolute left-0 top-full mt-2 w-48 bg-[#0a0e3d] border border-white/[0.1] rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto">
                              {ARCHETYPES.map(a => (
                                <button key={a.label} onClick={() => { setShowArch(false); go(name, a); }}
                                  className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-white/[0.06] text-left ${arch?.label === a.label ? "text-[#FF9900]" : "text-white/60"} text-xs transition-colors`}>
                                  <span>{a.emoji}</span><span style={{ fontWeight: 500 }}>{a.label}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl text-white leading-tight" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>
                      {name} <span className="text-white/20">Costume Recipe</span>
                    </h2>
                    <p className="text-white/30 text-sm mt-2 max-w-lg">
                      Follow these {activeZones.length} steps to assemble your perfect {name} costume. Each step includes real Amazon products you can buy instantly.
                    </p>
                  </div>

                  {/* Right: Stats + actions */}
                  <div className="flex flex-col items-end gap-3">
                    {/* Progress ring */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16">
                        <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                          <motion.circle cx="22" cy="22" r="18" fill="none"
                            stroke={pct >= 80 ? "#10b981" : pct >= 40 ? "#FF9900" : "#6366f1"}
                            strokeWidth="3" strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 18}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 18 * (1 - pct / 100) }}
                            transition={{ duration: 1, ease: "easeOut" }} />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-white/70" style={{ fontWeight: 700 }}>{pct}%</span>
                      </div>
                      <div>
                        <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                          {pct === 100 ? "Complete! \u{1F389}" : `${filledSet.size}/${activeZones.length} steps`}
                        </p>
                        {eq.length > 0 && (
                          <p className="text-[#FF9900] text-lg" style={{ fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif" }}>
                            {budgetDisplay}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <button onClick={equipAll} className="flex items-center gap-1.5 px-3 py-2 bg-[#FF9900]/10 hover:bg-[#FF9900]/20 border border-[#FF9900]/20 rounded-xl text-[#FF9900] text-xs transition-all" style={{ fontWeight: 600 }}>
                        <Sparkles className="w-3.5 h-3.5" /> Equip All
                      </button>
                      <button onClick={() => go(name, arch!)} className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] rounded-xl text-white/70 text-xs transition-all" style={{ fontWeight: 500 }}>
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                      </button>
                      <button onClick={share} className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] rounded-xl text-white/70 text-xs transition-all" style={{ fontWeight: 500 }}>
                        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Share"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mini progress bar */}
                <div className="mt-5 flex items-center gap-1.5">
                  {activeZones.map((z, i) => (
                    <div key={z.id} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: filledSet.has(z.id) ? "100%" : "0%" }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        style={{ background: filledSet.has(z.id) ? "#10b981" : "transparent" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recipe Steps */}
            <div className="max-w-3xl mx-auto">
              {activeZones.map((zone, i) => (
                <RecipeStep
                  key={zone.id}
                  zone={zone}
                  stepNum={i + 1}
                  totalSteps={activeZones.length}
                  zoneItems={items.filter(item => item.zone === zone.id)}
                  equippedItems={eq}
                  palette={arch?.palette || ["#FF9900", "#6366f1"]}
                  onEquip={equip}
                  onUnequip={unequip}
                />
              ))}
            </div>

            {/* Bottom: Shopping summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-3xl mx-auto mt-8"
            >
              {eq.length > 0 && (
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 md:p-8">
                  <h3 className="text-white text-lg mb-4 flex items-center gap-2" style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
                    <ShoppingCart className="w-5 h-5 text-[#FF9900]" /> Shopping Summary
                  </h3>

                  <div className="space-y-2.5 mb-5">
                    {eq.map(item => (
                      <div key={item.id} className="flex items-center gap-3 group/ci">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shrink-0 border border-white/10">
                          <img src={item.img} alt={item.name} className="w-full h-full object-contain bg-white" onError={e => (e.currentTarget.style.display = "none")} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/60 text-xs truncate" style={{ fontWeight: 500 }}>{item.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[#FF9900] text-xs" style={{ fontWeight: 700 }}>{item.price}</span>
                            <span className="text-[9px] text-white/15">{ZM[item.zone]?.emoji}</span>
                          </div>
                        </div>
                        <a href={safeAmzUrl(item.url, item.search)} target="_blank" rel="noopener noreferrer nofollow sponsored"
                          className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-[#FF9900] to-[#ffb84d] text-white text-[10px] rounded-lg hover:shadow-lg transition-all"
                          style={{ fontWeight: 700 }}>
                          <ShoppingCart className="w-2.5 h-2.5" /> Buy
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/[0.06] pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-white/40 text-xs">Estimated Total</span>
                      <p className="text-[#FF9900] text-2xl" style={{ fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif" }}>
                        {budgetDisplay}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <a href={cartLink} target="_blank" rel="noopener noreferrer nofollow sponsored"
                        className="group relative inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#FF9900] to-[#ffb84d] text-white rounded-xl shadow-[0_8px_32px_rgba(255,153,0,.25)] hover:shadow-[0_12px_40px_rgba(255,153,0,.4)] hover:-translate-y-0.5 transition-all overflow-hidden"
                        style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px" }}>
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <ShoppingCart className="w-4 h-4" />
                        {eqAsins.length > 0
                          ? <>Add All {eqAsins.length} to Amazon Cart</>
                          : <>Shop Complete Set on Amazon</>
                        }
                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                      {eqAsins.length > 0 && (
                        <p className="text-[10px] text-emerald-400/60 flex items-center gap-1">
                          <Check className="w-3 h-3" /> {eqAsins.length} of {eq.length} items will be added directly to your Amazon cart
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Pro tips */}
              <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <h3 className="text-white text-xs mb-3 flex items-center gap-2" style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
                  <Zap className="w-3.5 h-3.5 text-[#FF9900]" /> Pro Tips
                </h3>
                {[
                  { t: "Click \"options\" on any product to choose between different Amazon listings", i: "\u{1F446}" },
                  { t: "Drag items directly onto any step to equip them", i: "\u270B" },
                  { t: "Buying a complete costume set often saves 30-50% vs individual pieces", i: "\u{1F4B0}" },
                  { t: "Share the recipe link so friends can build their matching costumes", i: "\u{1F517}" },
                ].map((x, i) => (
                  <div key={i} className="flex items-start gap-2 text-white/30 text-[11px] mb-1.5">
                    <span className="shrink-0">{x.i}</span><p>{x.t}</p>
                  </div>
                ))}
              </div>

              <p className="text-white/10 text-[8px] flex items-center gap-1 justify-center mt-4">
                <Info className="w-3 h-3" /> As an Amazon Associate, we earn from qualifying purchases
              </p>

              <div className="mt-10 text-center pb-8">
                <p className="text-white/25 text-sm mb-3">Want a detailed expert guide for this costume?</p>
                <Link to="/search" className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl text-white/70 hover:text-white text-sm transition-all" style={{ fontWeight: 500 }}>
                  <Search className="w-4 h-4" /> Search 195+ Expert Guides <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===============================================================
   PAGE WRAPPER
   =============================================================== */
export function CostumeBuilderPage() {
  useEffect(() => { document.title = "Build Your Costume \u2014 CostumesPlanet"; }, []);
  return (
    <div style={{ fontFamily: "'Inter',sans-serif" }}>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#070b2e] via-[#111b63] to-[#1a237e] min-h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]" />
            <motion.div animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[5%] right-[10%] w-[450px] h-[450px] bg-blue-500/15 rounded-full blur-[130px]" />
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [.08, .15, .08] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#FF9900]/15 rounded-full blur-[100px]" />
          </div>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-16">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] backdrop-blur-md border border-white/[0.08] text-white/70 text-xs mb-5">
                <ChefHat className="w-3.5 h-3.5 text-[#FF9900]" /> Costume Recipe Builder
              </div>
              <h1 className="text-3xl md:text-5xl text-white leading-tight mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700 }}>
                Build Your{" "}
                <span className="bg-gradient-to-r from-[#FF9900] via-[#ffce54] to-[#FF9900] bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                  Costume Recipe
                </span>
              </h1>
              <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto">
                A step-by-step guide to assembling any costume with real Amazon products. Follow the recipe, click to equip, shop when ready.
              </p>
            </motion.div>
            <CostumeBuilder />
          </div>
        </section>
      </div>
  );
}
