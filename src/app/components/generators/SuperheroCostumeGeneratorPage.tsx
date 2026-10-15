import { useEffect } from "react";
import { Link } from "react-router";
import { CostumeGeneratorTool } from "./CostumeGeneratorTool";
import { Zap, Shield, Star, ChevronDown } from "lucide-react";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://costumesplanet.com/superhero-costume-generator",
      "url": "https://costumesplanet.com/superhero-costume-generator",
      "name": "Superhero Costume Generator — MHA, Marvel, DC & Custom Hero Costumes",
      "description": "Free superhero costume generator for Marvel, DC, My Hero Academia (MHA), BNHA, Power Rangers, and custom hero OC costumes. Find real Amazon products for every piece.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://costumesplanet.com/" },
          { "@type": "ListItem", "position": 2, "name": "Superhero Costume Generator", "item": "https://costumesplanet.com/superhero-costume-generator" }
        ]
      }
    },
    {
      "@type": "WebApplication",
      "name": "Superhero Costume Generator",
      "url": "https://costumesplanet.com/superhero-costume-generator",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How does the superhero costume generator work?", "acceptedAnswer": { "@type": "Answer", "text": "Type any superhero name — Spider-Man, Wonder Woman, Captain America, Deku, Iron Man — and click Generate. The AI identifies it as a superhero archetype and searches Amazon for mask/helmet, bodysuit, cape, gloves, utility belt, boots, and prop weapon. Each category shows real Amazon products with prices and direct buy links." } },
        { "@type": "Question", "name": "Does the MHA hero costume generator work for original characters?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! The MHA hero costume generator (also searched as BNHA hero costume generator or MHA OC costume generator) works for original characters. Describe your OC's quirk or aesthetic — 'fire hero red armor', 'ice hero blue costume', 'shadow villain dark cloak' — and the generator finds matching Amazon pieces for your custom MHA hero costume." } },
        { "@type": "Question", "name": "What's the best superhero costume for adults?", "acceptedAnswer": { "@type": "Answer", "text": "According to Amazon's best-seller lists and Reddit's r/cosplay, the most popular adult superhero costumes are Spider-Man (especially the No Way Home suit), Wonder Woman, Captain America, Black Panther, Thor, Deadpool, and Harley Quinn. Type any of these into the generator to find the full costume on Amazon." } },
        { "@type": "Question", "name": "Can the generator make a female superhero costume?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. For female superhero costumes, type the character name directly (Wonder Woman, Black Widow, She-Hulk, Supergirl, Captain Marvel, Batgirl) or type 'female superhero' for general results. The generator searches Amazon for women's sizing specifically." } },
        { "@type": "Question", "name": "Does it work for villain costume generation too?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. The superhero costume generator handles both heroes and villains — Joker, Thanos, Loki, Magneto, Darth Vader, Maleficent, Killmonger. Just type the villain's name and the AI switches to the villain archetype, searching for darker costume pieces." } },
        { "@type": "Question", "name": "Can I generate a Power Rangers costume?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — type 'Red Power Ranger', 'Blue Power Ranger', or any specific ranger. The superhero archetype applies perfectly to Power Rangers. The generator finds helmets, bodysuits, gloves, boots, and props (Power Morphers, weapons) on Amazon." } },
        { "@type": "Question", "name": "How do I make a cool DIY superhero costume without buying an expensive set?", "acceptedAnswer": { "@type": "Answer", "text": "Use the generator to build your costume piece by piece instead of buying a full set. This lets you pick quality items for each zone: a proper mask, a separate bodysuit, real gloves, and actual boots. Mixing and matching Amazon pieces often results in a better-looking costume than an all-in-one set at the same price." } }
      ]
    }
  ]
};

const RELATED_POSTS = [
  { slug: "homelander-cosplay", title: "Homelander Cosplay" },
  { slug: "deadpool-cosplay", title: "Deadpool Costume" },
  { slug: "iron-spider-costume", title: "Iron Spider Costume" },
  { slug: "captain-america-costume", title: "Captain America Costume" },
  { slug: "thanos-cosplay", title: "Thanos Cosplay" },
  { slug: "gamora-costume", title: "Gamora Costume" },
  { slug: "yelena-belova-costume", title: "Yelena Belova Costume" },
  { slug: "daredevil-black-suit", title: "Daredevil Black Suit" },
  { slug: "hawkeye-cosplay-costume", title: "Hawkeye Cosplay" },
  { slug: "natasha-romanoff-costume-diy", title: "Black Widow Costume" },
  { slug: "taskmaster-cosplay-costume", title: "Taskmaster Cosplay" },
  { slug: "fat-thor-costume", title: "Fat Thor Costume" },
];

const PRESETS = ["Spider-Man", "Wonder Woman", "Captain America", "Thor", "Black Panther", "Iron Man", "Deadpool", "Supergirl", "Batman", "Deku MHA", "Killmonger", "Loki"];

export function SuperheroCostumeGeneratorPage() {
  useEffect(() => {
    document.title = "Superhero Costume Generator — MHA, Marvel, DC Hero & Villain Costumes | CostumesPlanet";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Free superhero costume generator. Find Amazon products for any Marvel, DC, MHA, BNHA, or original hero/villain costume. Works for adults, kids, and OC characters.");
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#0a0a0f 0%,#0d0d1a 100%)" }}>
        {/* Hero */}
        <section className="relative pt-16 pb-10 px-4">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%,rgba(220,38,38,0.08) 0%,transparent 60%),radial-gradient(ellipse 50% 30% at 80% 0%,rgba(29,78,216,0.08) 0%,transparent 50%)" }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 text-red-300 text-xs font-semibold mb-5">
              <Zap className="w-3.5 h-3.5" /> Hero & Villain Costume Generator
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Superhero Costume Generator
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-4" style={{ fontFamily: "'Inter',sans-serif" }}>
              Marvel, DC, My Hero Academia, BNHA, Power Rangers, or your own original hero OC — type any superhero and get real Amazon products for every piece of the costume.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-white/30 text-xs mb-8">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-red-400" /> Marvel & DC</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-blue-400" /> MHA / BNHA OC</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#FF9900]" /> Villain Costumes</span>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
            <CostumeGeneratorTool
              placeholder="e.g. Spider-Man, Deku, Wonder Woman, Thanos, Power Ranger…"
              presets={PRESETS}
              defaultTheme=""
              title="Superhero Costume Generator"
            />
          </div>
        </section>

        {/* SEO Content */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Superhero Costume Generator — Marvel, DC, Anime & Beyond
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Superhero costumes are consistently the #1 Halloween costume category in the US, according to the National Retail Federation. Between Marvel's MCU releases, DC's ongoing roster, and the explosion of anime hero content from <em>My Hero Academia</em> and <em>Demon Slayer</em>, there's never been more demand for a real <strong className="text-white/80">superhero costume generator</strong> that actually finds you shoppable products.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                This generator handles the full superhero spectrum: classic comic heroes, MCU movie versions, DCEU characters, MHA/BNHA heroes and villains, anime fighters, video game heroes, and custom OC characters. The AI archetype detection system recognizes hundreds of character names and automatically configures the right product search queries for each costume zone.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                MHA Hero Costume Generator — My Hero Academia OC Costumes
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                One of the most searched variants is the <strong className="text-white/80">MHA hero costume generator</strong> (also searched as BNHA costume generator, BNHA OC hero costume generator, and My Hero Academia costume generator). The MHA fandom creates countless original character (OC) hero costumes for cosplay — and they need specific parts: quirk-themed armor, hero suits in specific colors, supporting gear, and unique props.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                For MHA OC costumes, describe your hero's aesthetic in the search box: <em>"fire hero red and orange armor"</em>, <em>"electric hero yellow suit"</em>, <em>"ice quirk white and blue costume"</em>, <em>"explosion hero dark orange"</em>. The generator maps your description to superhero archetype searches and finds armor pieces, bodysuits, props, and accessories on Amazon.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {["Deku / Izuku Midoriya", "Bakugo", "Todoroki", "All Might", "Uraraka", "Froppy / Tsuyu", "Kirishima", "Tokoyami"].map(h => (
                  <div key={h} className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/60 text-xs">{h}</div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                What the Superhero Costume Generator Finds on Amazon
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { emoji: "🎭", z: "Mask / Helmet", d: "Movie-accurate masks, full helmets, and face shields for any hero or villain." },
                  { emoji: "🦺", z: "Bodysuit", d: "Full superhero jumpsuits, muscle-padded suits, and character-specific uniform tops." },
                  { emoji: "🦸", z: "Cape", d: "Character capes and cloaks — Superman, Thor, Batman, and more." },
                  { emoji: "🧤", z: "Gloves", d: "Hero gloves, gauntlets, and bracers. Infinity Gauntlet included." },
                  { emoji: "👢", z: "Boots", d: "Superhero boots and shoe covers that match the color scheme." },
                  { emoji: "⚔️", z: "Weapon / Prop", d: "Shields, blasters, hammers, bows, energy swords, and other hero props." },
                ].map((z, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xl">{z.emoji}</span>
                    <div>
                      <p className="text-white text-xs font-semibold mb-0.5" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{z.z}</p>
                      <p className="text-white/45 text-xs">{z.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal links */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Detailed Superhero Costume Guides on CostumesPlanet
              </h2>
              <p className="text-white/50 text-sm mb-4">Want every product listed out with a step-by-step guide? These full costume guides cover exact Amazon products, sizing tips, and dressing instructions:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RELATED_POSTS.map(p => (
                  <Link key={p.slug} to={`/${p.slug}/`}
                    className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-white/60 text-xs hover:text-[#FF9900] hover:border-[#FF9900]/20 transition-all leading-snug">
                    {p.title}
                  </Link>
                ))}
              </div>
              <p className="text-white/35 text-xs mt-3">
                <Link to="/category/Marvel%20%26%20DC/" className="text-[#FF9900] hover:underline">Browse all Marvel & DC costume guides →</Link>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>FAQ — Superhero Costume Generator</h2>
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
