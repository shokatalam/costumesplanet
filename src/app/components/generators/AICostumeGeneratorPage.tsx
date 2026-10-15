import { useEffect } from "react";
import { Link } from "react-router";
import { CostumeGeneratorTool } from "./CostumeGeneratorTool";
import { Sparkles, Cpu, Zap, ChevronDown } from "lucide-react";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://costumesplanet.com/ai-costume-generator",
      "url": "https://costumesplanet.com/ai-costume-generator",
      "name": "AI Costume Generator Free — Find Costumes with Real Amazon Products",
      "description": "Free AI costume generator. Type any character or theme and get AI-matched Amazon product suggestions for every part of your costume. No sign-up required.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://costumesplanet.com/" },
          { "@type": "ListItem", "position": 2, "name": "AI Costume Generator", "item": "https://costumesplanet.com/ai-costume-generator" }
        ]
      }
    },
    {
      "@type": "WebApplication",
      "name": "AI Costume Generator",
      "url": "https://costumesplanet.com/ai-costume-generator",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Is the AI costume generator completely free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our AI costume generator is 100% free with no account required. It uses AI-based keyword matching to identify your costume type (superhero, horror, anime, fantasy, etc.) and searches Amazon for real products in every category." } },
        { "@type": "Question", "name": "How is this different from Photoleap's AI costume generator?", "acceptedAnswer": { "@type": "Answer", "text": "Photoleap's AI costume generator creates AI-generated images of you in a costume. Our AI costume generator instead finds real, purchasable Amazon products for every piece of your costume — so you can actually buy and wear the look, not just see a digital rendering." } },
        { "@type": "Question", "name": "Can I use the AI costume generator for cosplay?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. The AI costume generator works great for cosplay. Type any anime character, video game hero, movie character, or comic book figure and the AI will identify the costume archetype (anime, superhero, sci-fi, villain, etc.) and find matching Amazon products for each piece." } },
        { "@type": "Question", "name": "What AI does the costume generator use?", "acceptedAnswer": { "@type": "Answer", "text": "The generator uses a rule-based AI archetype detection system trained on hundreds of costume types. It identifies your character's category (superhero, horror, princess, warrior, anime, etc.), then uses smart keyword queries to search Amazon's product catalog for the most relevant costume pieces." } },
        { "@type": "Question", "name": "How do I use the AI costume design generator?", "acceptedAnswer": { "@type": "Answer", "text": "Type the character name or costume theme in the search box and click Generate. The AI analyzes your input, detects the costume category, and searches Amazon for 6 essential costume pieces (head, torso, legs, feet, hands, props). Results include product images, prices, and direct Amazon links." } },
        { "@type": "Question", "name": "Does the AI costume generator work for OC (original character) costumes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! For original characters (like MHA OC hero costume generator searches), type a description of your character's style — 'red armor superhero', 'dark wizard with staff', 'futuristic cyborg'. The AI matches to the closest archetype and finds relevant Amazon costume pieces." } },
        { "@type": "Question", "name": "What's the best free AI Halloween costume generator?", "acceptedAnswer": { "@type": "Answer", "text": "Our tool is one of the best free AI Halloween costume generators because it finds real, shoppable products (not just images). Type any Halloween theme — vampire, zombie, witch, horror movie character — and get AI-curated Amazon product listings with prices and next-day delivery options." } }
      ]
    }
  ]
};

const RELATED_POSTS = [
  { slug: "homelander-cosplay", title: "Homelander Cosplay Guide" },
  { slug: "deadpool-cosplay", title: "Deadpool Costume Guide" },
  { slug: "tanjiro-kamado-costume", title: "Tanjiro Kamado Costume" },
  { slug: "darth-revan-cosplay", title: "Darth Revan Cosplay" },
  { slug: "jinx-cosplay-costume", title: "Jinx Cosplay Guide" },
  { slug: "tracer-cosplay", title: "Tracer Overwatch Cosplay" },
  { slug: "levi-ackerman-cosplay", title: "Levi Ackerman Cosplay" },
  { slug: "link-cosplay", title: "Link Cosplay Guide" },
];

const PRESETS = ["Spider-Man", "Elsa Frozen", "Darth Vader", "Tanjiro", "Wonder Woman", "Joker", "Link Zelda", "Goku", "Harry Potter", "Black Panther"];

export function AICostumeGeneratorPage() {
  useEffect(() => {
    document.title = "AI Costume Generator Free — Real Amazon Products for Any Character | CostumesPlanet";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Free AI costume generator. Type any character, theme, or original idea and get AI-matched Amazon costume products instantly. Works for Halloween, cosplay, and costume design.");
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#0a0a0f 0%,#0d0d1a 100%)" }}>
        {/* Hero */}
        <section className="relative pt-16 pb-10 px-4">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%,rgba(99,102,241,0.1) 0%,transparent 70%)" }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-5">
              <Cpu className="w-3.5 h-3.5" /> AI-Powered Costume Finder
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              AI Costume Generator — Free
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-8" style={{ fontFamily: "'Inter',sans-serif" }}>
              Our AI detects your costume's character type and finds every Amazon product you need — head to toe. Works for Halloween, cosplay, MHA OC heroes, fantasy characters, and more. 100% free, no sign-up.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/30 text-xs mb-8">
              <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-indigo-400" /> AI Archetype Detection</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#FF9900]" /> Real Amazon Products</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-emerald-400" /> 12+ Costume Categories</span>
            </div>
          </div>
        </section>

        {/* Generator */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
            <CostumeGeneratorTool
              placeholder="e.g. Iron Man, Sailor Moon, MHA Hero OC, Dark Elf…"
              presets={PRESETS}
              title="AI Costume Generator"
            />
          </div>
        </section>

        {/* SEO Content */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                How the AI Costume Generator Works
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                When people search for an <strong className="text-white/80">AI costume generator</strong> on Google or Reddit, they're typically looking for one of two things: either a tool that <em>creates images</em> of them in a costume (like Photoleap's AI costume generator or Snapchat's costume filters), or a tool that helps them <em>actually buy</em> a costume. We do the latter — and we do it better.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                Our AI costume design generator uses <strong className="text-white/80">archetype detection</strong> — a machine learning-inspired keyword matching system trained on hundreds of costume categories. When you type "Tanjiro Kamado," the AI instantly recognizes the Demon Slayer anime archetype and generates wig, costume set, headband, prop sword, and boots queries — all tailored specifically for that character. It then searches Amazon's live product catalog for each piece.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                The AI handles 12 major costume archetypes: <strong className="text-white/80">Superhero, Princess/Queen, Villain, Warrior/Knight, Wizard/Witch, Pirate, Horror/Zombie, Anime/Manga, Sci-Fi, Animal/Creature, Retro/Decade, and Profession.</strong> For anything it doesn't recognize, it defaults to a smart general Halloween costume search.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                AI Costume Generator vs. Other Tools
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="text-left text-white/50 font-medium py-2 pr-4">Tool</th>
                      <th className="text-left text-white/50 font-medium py-2 pr-4">What It Does</th>
                      <th className="text-left text-white/50 font-medium py-2">Buy Products?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["CostumesPlanet AI Generator (this tool)", "Finds real Amazon costume products by character", "✅ Yes — direct Amazon links"],
                      ["Photoleap AI Costume Generator", "AI-generates your photo in a costume", "❌ No — images only"],
                      ["Google Halloween Costume Generator", "Google Doodle / costume ideas list", "❌ No shopping"],
                      ["Spirit Halloween Costume Generator Meme", "Spirit Halloween branded meme tool", "❌ No real products"],
                      ["ChatGPT Costume Suggestions", "Text suggestions for costume ideas", "❌ No shopping"],
                    ].map(([tool, desc, buy], i) => (
                      <tr key={i} className="border-b border-white/[0.04]">
                        <td className="py-2.5 pr-4 text-white/70">{tool}</td>
                        <td className="py-2.5 pr-4 text-white/50">{desc}</td>
                        <td className="py-2.5 text-white/70">{buy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Best Uses for the AI Costume Generator
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "🎭", t: "MHA & Anime OC Costumes", d: "Searching 'MHA hero costume generator' or 'BNHA OC costume'? Type your OC's powers and aesthetic and let the AI find matching Amazon pieces — armor, wigs, contact lenses, props." },
                  { icon: "🎨", t: "Costume Design Generator", d: "Need a costume design generator for a school project, drama production, or convention? Type the character style and the AI produces a shopping list of building blocks." },
                  { icon: "🤖", t: "AI Image Costume Preview", d: "While we don't generate AI images, our tool shows Amazon product photos for each piece — giving you a visual preview of how the full costume will look assembled." },
                  { icon: "🆓", t: "Free AI Halloween Costume Generator", d: "Unlike paid AI costume apps, this is completely free. No tokens, no subscription, no watermarks. Just type, generate, and shop." },
                ].map((c, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-2xl shrink-0">{c.icon}</span>
                    <div>
                      <h3 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{c.t}</h3>
                      <p className="text-white/50 text-xs leading-relaxed">{c.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal links */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Detailed Cosplay & Costume Guides</h2>
              <p className="text-white/50 text-sm mb-4">For specific characters, our full guides include every product, step-by-step dressing instructions, and character background:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RELATED_POSTS.map(p => (
                  <Link key={p.slug} to={`/${p.slug}/`}
                    className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-white/60 text-xs hover:text-[#FF9900] hover:border-[#FF9900]/20 transition-all leading-snug">
                    {p.title}
                  </Link>
                ))}
              </div>
              <p className="text-white/35 text-xs mt-3"><Link to="/" className="text-[#FF9900] hover:underline">See all 241 costume guides →</Link></p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>FAQ</h2>
            <div className="space-y-3">
              {SCHEMA["@graph"][2].mainEntity.map((faq: any, i: number) => (
                <details key={i} className="group rounded-xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-white font-medium text-sm list-none" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                    {faq.name}
                    <ChevronDown className="w-4 h-4 text-white/30 group-open:rotate-180 transition-transform shrink-0 ml-3" />
                  </summary>
                  <p className="px-4 pb-4 text-white/55 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
