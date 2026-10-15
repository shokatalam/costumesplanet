import { useEffect } from "react";
import { Link } from "react-router";
import { CostumeGeneratorTool } from "./CostumeGeneratorTool";
import { Ghost, ChevronDown, Star } from "lucide-react";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://costumesplanet.com/spirit-halloween-costume-generator",
      "url": "https://costumesplanet.com/spirit-halloween-costume-generator",
      "name": "Spirit Halloween Costume Generator — Find Costumes with Amazon Products",
      "description": "Alternative to the Spirit Halloween costume meme generator. Find real Halloween costumes with Amazon product links. Scary, funny, and classic Halloween costume ideas.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://costumesplanet.com/" },
          { "@type": "ListItem", "position": 2, "name": "Spirit Halloween Costume Generator", "item": "https://costumesplanet.com/spirit-halloween-costume-generator" }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is the Spirit Halloween costume meme generator?", "acceptedAnswer": { "@type": "Answer", "text": "The Spirit Halloween costume meme generator is a viral social media tool that generates fake Spirit Halloween store costume labels for any text you input — like 'Sexy Spreadsheet' or 'Depressed Millennial'. The memes mimic Spirit Halloween's product packaging and became a popular Halloween meme format. Our generator is different — we find real, shoppable costumes instead." } },
        { "@type": "Question", "name": "How do I make a Spirit Halloween costume meme?", "acceptedAnswer": { "@type": "Answer", "text": "The original Spirit Halloween costume meme generator lets you type any concept and it creates a fake Spirit Halloween package label. You can search 'Spirit Halloween costume meme generator' to find the viral tool. Our site offers a different service — finding real Halloween costume products on Amazon for any character or theme." } },
        { "@type": "Question", "name": "What are the best Spirit Halloween costumes?", "acceptedAnswer": { "@type": "Answer", "text": "Spirit Halloween is known for exclusive horror and pop culture costumes. Their best-sellers typically include licensed horror costumes (Michael Myers, Ghostface, Pennywise), exclusive character costumes, and their famous animatronic decorations. For the actual costumes, you can find equivalent or better options on Amazon at competitive prices — type the character name in our generator." } },
        { "@type": "Question", "name": "Is Spirit Halloween the only place to buy Halloween costumes?", "acceptedAnswer": { "@type": "Answer", "text": "No — Amazon often has the same costume styles at better prices with faster shipping (especially with Prime). Our costume generator searches Amazon directly so you can compare prices and read reviews before buying. Many Amazon sellers replicate popular Spirit Halloween styles at 30-50% lower prices." } },
        { "@type": "Question", "name": "Can I find Spirit Halloween style costumes on Amazon?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Type any character from Spirit Halloween's lineup into our generator — horror movie villains, pop culture characters, classic monsters — and we'll find comparable Amazon listings. Many Amazon products are the same manufacturer as Spirit Halloween's private labels, just sold directly." } },
        { "@type": "Question", "name": "What is the Spirit Halloween costume generator Google?", "acceptedAnswer": { "@type": "Answer", "text": "The 'Spirit Halloween costume generator Google' search often refers to finding the meme generator through Google search, or finding Spirit Halloween's official costume quiz on Google. Our tool is an alternative that finds purchasable costumes via Amazon rather than generating memes." } },
        { "@type": "Question", "name": "How do I use a Halloween costume meme generator?", "acceptedAnswer": { "@type": "Answer", "text": "Halloween costume meme generators let you create joke costume labels mimicking store packaging. They're usually found by searching 'Spirit Halloween meme generator' on Google or social media. For actually buying a costume (rather than making a meme), use our generator to find real Amazon products for any Halloween character." } }
      ]
    }
  ]
};

const SPIRIT_CLASSICS = [
  "Michael Myers", "Ghostface Scream", "Pennywise", "Freddy Krueger", "Jason Voorhees",
  "Chucky", "Beetlejuice", "Wednesday Addams", "Cruella de Vil", "Maleficent",
];

const RELATED_POSTS = [
  { slug: "laurie-strode-costume", title: "Laurie Strode Costume" },
  { slug: "grady-twins-costume", title: "Grady Twins Costume" },
  { slug: "jack-torrance-costume", title: "Jack Torrance Costume" },
  { slug: "the-exorcist-costume", title: "The Exorcist Costume" },
  { slug: "casey-becker-costume", title: "Casey Becker Scream Costume" },
  { slug: "dolores-umbridge-costume", title: "Dolores Umbridge Costume" },
  { slug: "deadpool-cosplay", title: "Deadpool Costume" },
  { slug: "mean-girls-christmas-costume", title: "Mean Girls Costume" },
];

export function SpiritHalloweenGeneratorPage() {
  useEffect(() => {
    document.title = "Spirit Halloween Costume Generator — Real Costumes & Meme Generator Guide | CostumesPlanet";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Spirit Halloween costume generator alternative. Find real Halloween costumes on Amazon for any character. Plus: what the Spirit Halloween meme costume generator is and how to use it.");
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#0a0a0f 0%,#0d0d1a 100%)" }}>
        {/* Hero */}
        <section className="relative pt-16 pb-10 px-4">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%,rgba(124,58,237,0.08) 0%,transparent 70%)" }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-xs font-semibold mb-5">
              <Ghost className="w-3.5 h-3.5" /> Spirit Halloween Style Costume Finder
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Spirit Halloween Costume Generator
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-4" style={{ fontFamily: "'Inter',sans-serif" }}>
              Looking for the <strong className="text-white/70">Spirit Halloween costume meme generator</strong>? We explain that below. But if you actually want to <em>buy</em> a Halloween costume — our tool finds real Amazon products for any Spirit Halloween-style character instantly.
            </p>
            <div className="inline-flex items-center gap-2 text-white/30 text-xs bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-2 mb-8">
              <Star className="w-3.5 h-3.5 text-[#FF9900]" /> Real costumes · Amazon products · Free · No sign-up
            </div>
          </div>
        </section>

        {/* Generator */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
            <p className="text-white/40 text-xs mb-4">Type any Spirit Halloween-style character to find it on Amazon:</p>
            <CostumeGeneratorTool
              placeholder="e.g. Michael Myers, Ghostface, Pennywise, Wednesday Addams…"
              presets={SPIRIT_CLASSICS}
              title="Halloween Costume Finder"
            />
          </div>
        </section>

        {/* SEO Content */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                What Is the Spirit Halloween Costume Meme Generator?
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                The <strong className="text-white/80">Spirit Halloween costume meme generator</strong> is one of Halloween's most viral internet tools. It lets you type any phrase and generates a fake Spirit Halloween store product label in their signature orange-and-purple style — complete with an absurd costume name like <em>"Sexy Quarantine Protocol"</em>, <em>"Gaslighting Millennial"</em>, or <em>"Burnt-Out Remote Worker"</em>.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                The original tool went viral on Reddit's <em>r/memes</em>, <em>r/halloween</em>, and Twitter/X every October. Users share the generated costume labels as commentary on their lives, jobs, relationships, or current events — wrapped in Spirit Halloween's familiar packaging. Searches for <strong className="text-white/80">spirit halloween meme costume generator</strong>, <strong className="text-white/80">spirit of halloween costume meme generator</strong>, and <strong className="text-white/80">adult costume meme generator</strong> spike every September and October.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <p className="text-purple-200 text-sm">
                  <strong>Looking for the meme generator specifically?</strong> Search "Spirit Halloween meme generator" on Google to find the original viral tool. Our site is focused on finding <em>real, shoppable</em> costumes with Amazon product links — which is what you need once you've finished making the meme.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Spirit Halloween vs. Amazon for Halloween Costumes
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Quora has multiple threads comparing Spirit Halloween prices to Amazon. The consensus from Halloween enthusiasts:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {[
                  { t: "Spirit Halloween Advantages", pts: ["Exclusive licensed costumes", "Try before you buy in-store", "Famous for animatronics & decor", "One-stop physical Halloween shop", "Strong brand recognition"], col: "purple" },
                  { t: "Amazon Advantages", pts: ["Often 30-50% cheaper same styles", "Prime next-day delivery", "Customer reviews & star ratings", "Year-round availability", "Easier returns & size exchanges"], col: "FF9900" },
                ].map((side, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-white/[0.03] border border-${side.col === "purple" ? "purple-500/20" : "[#FF9900]/20"}`}>
                    <h3 className={`text-${side.col === "purple" ? "purple-300" : "[#FF9900]"} text-sm font-semibold mb-3`} style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{side.t}</h3>
                    <ul className="space-y-1.5">
                      {side.pts.map(pt => (
                        <li key={pt} className="text-white/60 text-xs flex items-center gap-2">
                          <span className={side.col === "purple" ? "text-purple-400" : "text-[#FF9900]"}>•</span>{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Popular Spirit Halloween-Style Costumes on Amazon
              </h2>
              <p className="text-white/55 text-sm mb-4">These are the most popular Spirit Halloween character types — all findable on Amazon via our generator:</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  "Horror Movie Villains", "Classic Monsters", "Sci-Fi Characters", "Disney Villains", "Superheroes",
                  "Historical Figures", "Sexy Costumes", "Funny Costumes", "Group Themes", "Decade Costumes",
                ].map((c, i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/55 text-xs text-center">{c}</div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Horror & Halloween Costume Guides</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RELATED_POSTS.map(p => (
                  <Link key={p.slug} to={`/${p.slug}/`}
                    className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-white/60 text-xs hover:text-[#FF9900] hover:border-[#FF9900]/20 transition-all leading-snug">
                    {p.title}
                  </Link>
                ))}
              </div>
              <p className="text-white/35 text-xs mt-3"><Link to="/" className="text-[#FF9900] hover:underline">Browse all 241 costume guides →</Link></p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>FAQ</h2>
            <div className="space-y-3">
              {SCHEMA["@graph"][1].mainEntity.map((faq: any, i: number) => (
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

        {/* Cross-link to other generators */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-white mb-4 text-center" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>More Costume Generators</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { path: "/halloween-costume-generator", label: "🎃 Halloween Generator" },
                { path: "/ai-costume-generator", label: "🤖 AI Generator" },
                { path: "/random-costume-generator", label: "🎲 Random Generator" },
                { path: "/superhero-costume-generator", label: "🦸 Superhero Generator" },
              ].map(g => (
                <Link key={g.path} to={g.path}
                  className="p-3 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/60 text-xs text-center hover:text-white hover:border-white/20 transition-all">
                  {g.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
