import { useEffect, useState } from "react";
import { Check, Copy, Share2, ShoppingCart, PartyPopper } from "lucide-react";
import type { ProductLink } from "../data/itemUtils";

// "What do you already own?" checklist. Ticks are remembered per browser
// (localStorage, best effort) so a reader can come back to the same list.
export function ShoppingChecklist({
  slug,
  name,
  items,
  fastestFirst,
  BuyButton,
}: {
  slug: string;
  name: string;
  items: ProductLink[];
  fastestFirst: boolean;
  BuyButton: (p: { url: string; name: string }) => JSX.Element;
}) {
  const key = `cp-owned-${slug}`;
  const [owned, setOwned] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      setOwned(new Set(raw ? (JSON.parse(raw) as number[]) : []));
    } catch {
      setOwned(new Set());
    }
  }, [key]);

  const toggle = (i: number) => {
    setOwned((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {
        /* storage unavailable: keep in memory only */
      }
      return next;
    });
  };

  const remaining = items.filter((_, i) => !owned.has(i));
  const pct = items.length ? Math.round((owned.size / items.length) * 100) : 0;
  const listText = `${name} costume — still to get:\n${remaining.map((it) => `• ${it.name}: ${it.url}`).join("\n")}\n\nFull guide: https://costumesplanet.com/${slug}/`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(listText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${name} costume shopping list`, text: listText });
      } catch {
        /* cancelled */
      }
    } else copy();
  };

  return (
    <div>
      {/* Progress */}
      <div className="sticky top-16 z-10 mb-4 rounded-2xl bg-[#111b63] text-white p-4 md:p-5 shadow-lg shadow-[#1a237e]/15">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm md:text-[15px]" style={{ fontWeight: 600 }}>
            {owned.size === 0 ? (
              <>Tick what you already own to see what's left to buy.</>
            ) : remaining.length === 0 ? (
              <span className="inline-flex items-center gap-2"><PartyPopper className="w-4 h-4 text-[#FF9900]" /> You have everything. Jump to the dressing guide.</span>
            ) : (
              <>You have <span className="text-[#FF9900]">{owned.size} of {items.length}</span> · {remaining.length} left to get</>
            )}
          </p>
          <div className="flex gap-2">
            <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15" style={{ fontWeight: 600 }}>
              <Copy className="w-3.5 h-3.5" /> {copied ? "Copied" : "Copy list"}
            </button>
            <button onClick={share} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15" style={{ fontWeight: 600 }}>
              <Share2 className="w-3.5 h-3.5" /> Send to a friend
            </button>
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-white/15 overflow-hidden" aria-hidden>
          <div className="h-full bg-[#FF9900] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <ol className="space-y-3">
        {items.map((item, i) => {
          const have = owned.has(i);
          return (
            <li
              key={i}
              className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 md:p-5 rounded-2xl border transition-colors ${
                have ? "bg-green-50/60 border-green-200" : "bg-white border-gray-100 hover:border-[#FF9900]/40"
              }`}
            >
              <div className="flex gap-4 flex-1 min-w-0">
                <button
                  onClick={() => toggle(i)}
                  aria-pressed={have}
                  aria-label={have ? `Mark ${item.name} as not owned` : `I already have ${item.name}`}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border-2 transition-colors ${
                    have ? "bg-green-600 border-green-600 text-white" : "border-gray-300 text-gray-400 hover:border-[#FF9900] hover:text-[#FF9900]"
                  }`}
                >
                  {have ? <Check className="w-5 h-5" /> : <span className="text-sm" style={{ fontWeight: 700 }}>{i + 1}</span>}
                </button>
                <div className="min-w-0">
                  <p className={`${have ? "text-gray-500 line-through" : "text-gray-900"}`} style={{ fontWeight: 700 }}>{item.name}</p>
                  {item.note && !have && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.note}</p>}
                  {i === 0 && fastestFirst && !have && (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 rounded-md px-2 py-0.5" style={{ fontWeight: 600 }}>
                      <Check className="w-3 h-3" /> Fastest complete option
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:shrink-0 flex items-center gap-2 pl-13 sm:pl-0">
                {have ? (
                  <span className="text-xs text-green-700" style={{ fontWeight: 700 }}>Got it</span>
                ) : (
                  <>
                    <button onClick={() => toggle(i)} className="text-xs text-gray-500 hover:text-gray-800 px-2 py-2" style={{ fontWeight: 600 }}>
                      I have this
                    </button>
                    <BuyButton url={item.url} name={item.name} />
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {owned.size > 0 && remaining.length > 0 && (
        <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <ShoppingCart className="w-4 h-4 text-[#1a237e]" />
          Still to get: {remaining.map((r) => r.name.replace(/\s*\(.*?\)/g, "")).join(", ")}.
        </p>
      )}
    </div>
  );
}
