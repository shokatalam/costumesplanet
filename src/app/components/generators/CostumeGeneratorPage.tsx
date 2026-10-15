import { useEffect } from "react";
import { Link } from "react-router";
import { CostumeGeneratorTool } from "./CostumeGeneratorTool";
import { Wand2, Layers, ChevronDown, ArrowRight } from "lucide-react";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://costumesplanet.com/costume-generator",
      "url": "https://costumesplanet.com/costume-generator",
      "name": "Costume Generator — Free Costume Idea Finder with Amazon Products",
      "description": "Free costume generator for any theme: fantasy, steampunk, anime, couples, villain, magical girl, DIY, and more. Get real Amazon product links for every piece of your costume.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://costumesplanet.com/" },
          { "@type": "ListItem", "position": 2, "name": "Costume Generator", "item": "https://costumesplanet.com/costume-generator" }
        ]
      }
    },
    {
      "@type": "WebApplication",
      "name": "Costume Generator",
      "url": "https://costumesplanet.com/costume-generator",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "What is a costume generator?", "acceptedAnswer": { "@type": "Answer", "text": "A costume generator is a tool that helps you find costume ideas and the products needed to create them. Our costume generator uses AI archetype detection to identify your character type from a search query, then finds real Amazon products for every piece of the costume — head, torso, legs, feet, hands, and props." } },
        { "@type": "Question", "name": "What is the best free costume generator?", "acceptedAnswer": { "@type": "Answer", "text": "The best free costume generator is one that both suggests ideas AND helps you shop for them. Our costume generator does both — it's free, requires no account, and links to real Amazon products with live pricing. It covers 12 costume archetypes including fantasy, anime, superhero, horror, steampunk, magical girl, and more." } },
        { "@type": "Question", "name": "How does the costume idea generator work?", "acceptedAnswer": { "@type": "Answer", "text": "Type any character name, theme, or costume style in the search box and click Generate. The AI detects whether it's a superhero, villain, princess, warrior, wizard, anime character, horror figure, animal costume, retro style, or profession costume. It then searches Amazon for 6 essential pieces in each body zone category." } },
        { "@type": "Question", "name": "Does the costume generator work for couples costumes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Type 'couples costume' or a specific duo like 'Bonnie and Clyde costume', 'Romeo and Juliet costume', 'Batman and Catwoman', or 'zombie couple costume'. The generator finds matching and coordinated Amazon products for a cohesive couples look." } },
        { "@type": "Question", "name": "Can I use this as a costume quiz generator?", "acceptedAnswer": { "@type": "Answer", "text": "Our costume generator quiz works by theme: type your personality or aesthetic — 'dark academic', 'cottagecore', 'Y2K', 'grunge', 'maximalist goth' — and the generator interprets the aesthetic and finds matching costume pieces. It's better than a multiple-choice quiz because you describe exactly what you want." } },
        { "@type": "Question", "name": "Does it work for fantasy costume generation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — fantasy costume generation is one of our strongest categories. Type 'dark elf', 'forest fairy', 'ice queen', 'dragon rider', 'goblin', 'orc warrior', 'elven ranger', or any fantasy archetype. The generator matches to warrior, wizard, princess, or villain archetypes and finds fantasy-appropriate Amazon products." } },
        { "@type": "Question", "name": "How do I use the steampunk costume generator?", "acceptedAnswer": { "@type": "Answer", "text": "Type 'steampunk' alone or combined with a role: 'steampunk explorer', 'steampunk inventor', 'steampunk airship captain', 'steampunk witch'. The generator identifies the warrior or profession archetype and finds goggles, corsets, leather pieces, mechanical props, boots, and accessories on Amazon." } }
      ]
    }
  ]
};

const ALL_GENERATORS = [
  { path: "/halloween-costume-generator", label: "🎃 Halloween Costume Generator", desc: "Scary, funny, cute — all themes" },
  { path: "/ai-costume-generator", label: "🤖 AI Costume Generator", desc: "AI-powered character detection" },
  { path: "/random-costume-generator", label: "🎲 Random Costume Generator", desc: "Spin the wheel for random ideas" },
  { path: "/superhero-costume-generator", label: "🦸 Superhero Costume Generator", desc: "Marvel, DC, MHA, OC heroes" },
  { path: "/spirit-halloween-costume-generator", label: "👻 Spirit Halloween Generator", desc: "Spirit Halloween themed generator" },
];

const RELATED_POSTS = [
  { slug: "fantasy-costume-ideas", title: "Fantasy Costume Ideas" },
  { slug: "couples-costume-ideas", title: "Couples Costume Ideas" },
  { slug: "she-ra-cosplay-costume", title: "She-Ra Cosplay" },
  { slug: "link-cosplay", title: "Link from Zelda Cosplay" },
  { slug: "daenerys-targaryen-cosplay", title: "Daenerys Costume" },
  { slug: "cersei-lannister-costume", title: "Cersei Lannister Costume" },
  { slug: "jon-snow-costume", title: "Jon Snow Costume" },
  { slug: "arya-stark-costume", title: "Arya Stark Costume" },
];

const PRESETS = ["Fantasy Elf", "Steampunk Explorer", "Magical Girl", "Villain", "Couples Zombie", "DIY Pirate", "Anime Hero", "Among Us", "Apocalypse Survivor", "Couples Halloween"];

export function CostumeGeneratorPage() {
  useEffect(() => {
    document.title = "Costume Generator — Free Costume Idea Finder with Amazon Products | CostumesPlanet";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Free costume generator for any theme. Fantasy, steampunk, anime, couples, villain, magical girl, DIY, and more. Type any idea and get real Amazon product links for every piece.");
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#0a0a0f 0%,#0d0d1a 100%)" }}>
        {/* Hero */}
        <section className="relative pt-16 pb-10 px-4">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%,rgba(26,35,126,0.15) 0%,transparent 70%)" }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1a237e]/40 bg-[#1a237e]/20 text-blue-300 text-xs font-semibold mb-5">
              <Wand2 className="w-3.5 h-3.5" /> Costume Idea Generator — All Themes
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Costume Generator
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-4" style={{ fontFamily: "'Inter',sans-serif" }}>
              The complete costume generator for every theme — Halloween, cosplay, couples, fantasy, steampunk, anime, villain, magical girl, profession, animal, and more. Type anything, get instant Amazon products.
            </p>
            <p className="text-white/30 text-sm mb-8">Free · No sign-up · 12 costume archetypes · Real Amazon product links</p>
          </div>
        </section>

        {/* Other generators nav */}
        <section className="px-4 pb-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/30 text-xs mb-3 text-center">Specific generator pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {ALL_GENERATORS.map(g => (
                <Link key={g.path} to={g.path}
                  className="px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 text-xs hover:text-white hover:border-white/20 transition-all">
                  {g.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
            <CostumeGeneratorTool
              placeholder="e.g. Steampunk Explorer, Magical Girl, Couples Zombie, Fantasy Elf…"
              presets={PRESETS}
              title="Costume Generator"
            />
          </div>
        </section>

        {/* SEO Content */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                The Complete Costume Generator — Every Theme, Real Products
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Whether you're searching for a <strong className="text-white/80">costume idea generator</strong>, a <strong className="text-white/80">costume theme generator</strong> for a themed party, a <strong className="text-white/80">couples costume generator</strong> for you and your partner, or a <strong className="text-white/80">DIY costume generator</strong> to build from scratch — this is the tool that does it all.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                The secret is our 12-archetype AI system. When you type a costume idea, it doesn't just search Amazon blindly — it identifies what kind of character you're describing and builds a targeted shopping list for each body zone. Type "steampunk airship captain" and it recognizes the warrior/profession blend, searching for goggles, leather corsets, mechanical accessories, and Victorian-style boots. Type "magical girl" and it maps to princess archetype, finding wands, frilly dresses, tiaras, and long gloves.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                All Costume Generator Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: "🧙", t: "Fantasy Costume Generator", d: "Dark elves, forest fairies, dragon riders, ice queens, orcs, and elven rangers." },
                  { icon: "⚙️", t: "Steampunk Costume Generator", d: "Victorian inventors, airship captains, time travelers, and mechanical engineers." },
                  { icon: "✨", t: "Magical Girl Costume Generator", d: "Sailor Moon style magical girls, anime witches, and enchanted heroines." },
                  { icon: "😈", t: "Villain Costume Generator", d: "Supervillains, dark lords, evil queens, sith, and antagonists of all kinds." },
                  { icon: "💑", t: "Couples Costume Generator", d: "Matching and coordinated costume pairs for couples, best friends, or any duo." },
                  { icon: "🎭", t: "Character Costume Generator", d: "Any movie, TV, game, or book character. Type the name and get the full costume." },
                  { icon: "🧟", t: "Apocalypse Costume Generator", d: "Post-apocalyptic survivors, wasteland warriors, and zombie apocalypse costumes." },
                  { icon: "🐕", t: "Dog Costume Generator", d: "Yes — type your dog's vibe or size and find fun Amazon pet costumes too." },
                  { icon: "🎮", t: "Video Game Costume Generator", d: "Among Us crewmates, Minecraft characters, Fortnite skins, and gaming icons." },
                  { icon: "🔨", t: "DIY Costume Generator", d: "Find individual Amazon pieces to build a costume from scratch instead of buying a full set." },
                  { icon: "🏷️", t: "Costume Name Generator", d: "Not sure what your character is called? Describe the look and let the generator match it." },
                  { icon: "🏪", t: "Costume Store Name Generator", d: "Building a costume business? Type your shop concept and get branding inspiration." },
                ].map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-xl mb-1">{c.icon}</div>
                    <h3 className="text-white text-xs font-semibold mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{c.t}</h3>
                    <p className="text-white/45 text-xs leading-relaxed">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Costume Generator vs. Full Costume Builder
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-[#FF9900]/20">
                  <h3 className="text-[#FF9900] text-sm font-semibold mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>This Generator (You're Here)</h3>
                  <ul className="space-y-1.5">
                    {["Quick search interface — type and go", "Instant Amazon product results", "6 costume zones per character", "Great for new ideas or quick shopping", "Works on any device"].map(f => (
                      <li key={f} className="text-white/60 text-xs flex items-center gap-2"><span className="text-emerald-400">✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <h3 className="text-white/70 text-sm font-semibold mb-2" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                    <Link to="/build" className="hover:text-[#FF9900] transition-colors">Full Costume Builder →</Link>
                  </h3>
                  <ul className="space-y-1.5">
                    {["Drag-and-drop costume assembly", "Equip items to a mannequin", "Save and share your build", "Add to cart in bulk", "More product options per zone"].map(f => (
                      <li key={f} className="text-white/60 text-xs flex items-center gap-2"><span className="text-blue-400">✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Costume Guides for Every Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RELATED_POSTS.map(p => (
                  <Link key={p.slug} to={`/${p.slug}/`}
                    className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-white/60 text-xs hover:text-[#FF9900] hover:border-[#FF9900]/20 transition-all leading-snug">
                    {p.title}
                  </Link>
                ))}
              </div>
              <p className="text-white/35 text-xs mt-3"><Link to="/categories" className="text-[#FF9900] hover:underline">Browse all costume categories →</Link></p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>FAQ — Costume Generator</h2>
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
