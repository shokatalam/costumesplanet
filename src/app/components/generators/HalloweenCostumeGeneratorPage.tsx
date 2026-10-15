import { useEffect } from "react";
import { Link } from "react-router";
import { CostumeGeneratorTool } from "./CostumeGeneratorTool";
import { Sparkles, Star, Users, Clock, ChevronDown } from "lucide-react";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://costumesplanet.com/halloween-costume-generator",
      "url": "https://costumesplanet.com/halloween-costume-generator",
      "name": "Halloween Costume Generator — Random Ideas & Amazon Products",
      "description": "Free Halloween costume generator. Type any character or click Random for instant ideas with real Amazon product links. Find scary, funny, or cute Halloween costumes in seconds.",
      "isPartOf": { "@id": "https://costumesplanet.com" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://costumesplanet.com/" },
          { "@type": "ListItem", "position": 2, "name": "Halloween Costume Generator", "item": "https://costumesplanet.com/halloween-costume-generator" }
        ]
      }
    },
    {
      "@type": "WebApplication",
      "name": "Halloween Costume Generator",
      "url": "https://costumesplanet.com/halloween-costume-generator",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Free AI-powered Halloween costume generator that finds real Amazon products for any character or theme."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How does the Halloween costume generator work?", "acceptedAnswer": { "@type": "Answer", "text": "Enter any character name, theme (scary, funny, cute), or click the shuffle button for a random Halloween costume idea. The generator detects the costume type, then fetches real Amazon product listings for each piece of the outfit — mask, costume, wig, props, and more — with live pricing and direct buy links." } },
        { "@type": "Question", "name": "Is the Halloween costume generator free to use?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, completely free. There's no sign-up, no subscription, and no hidden fees. Simply type a costume name or click Random and get instant results with Amazon product links." } },
        { "@type": "Question", "name": "Can I use this as a last-minute Halloween costume generator?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. The generator is built for last-minute situations. Results show Amazon products with Prime delivery options, so many costumes can arrive in 1–2 days. Just type what you have in mind — or hit Random — and buy what you need tonight." } },
        { "@type": "Question", "name": "What kinds of Halloween costumes does it generate?", "acceptedAnswer": { "@type": "Answer", "text": "The generator covers all major Halloween costume categories: scary (zombies, vampires, ghosts, horror movie characters), funny (pop culture, memes, food), cute (animals, Disney characters, fairies), couples costumes, group themes, and DIY-friendly ideas." } },
        { "@type": "Question", "name": "How do I use the random Halloween costume generator?", "acceptedAnswer": { "@type": "Answer", "text": "Click the shuffle (🔀) button and the generator will spin through dozens of costume ideas and land on one at random. You can then click Generate to find all the Amazon products you need for that costume." } },
        { "@type": "Question", "name": "Does it work for female Halloween costumes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Simply add 'female', 'women's', or 'girls' to your search (e.g. 'female vampire', 'women's witch') and the generator will tailor the results accordingly. It searches Amazon for women's sizing and female-specific costume options." } },
        { "@type": "Question", "name": "Can it generate funny Halloween costume ideas?", "acceptedAnswer": { "@type": "Answer", "text": "Definitely. Try typing 'funny Halloween costume', 'punny costume', or specific funny ideas like 'cereal killer', 'salt shaker', 'error 404 costume'. The generator finds matching Amazon products for whatever makes you laugh." } }
      ]
    }
  ]
};

const RELATED_POSTS = [
  { slug: "laurie-strode-costume", title: "Laurie Strode Costume Guide" },
  { slug: "the-exorcist-costume", title: "Exorcist Costume Guide" },
  { slug: "grady-twins-costume", title: "Grady Twins Costume" },
  { slug: "jack-torrance-costume", title: "Jack Torrance Costume" },
  { slug: "wendy-torrance-costume", title: "Wendy Torrance Costume" },
  { slug: "max-mayfield-costume", title: "Max Mayfield Stranger Things Costume" },
  { slug: "dexter-morgan-costume", title: "Dexter Morgan Costume" },
  { slug: "deadpool-cosplay", title: "Deadpool Costume" },
];

const PRESETS = ["Vampire", "Witch", "Zombie", "Ghost", "Dracula", "Werewolf", "Mummy", "Clown", "Skeleton", "Devil", "Freddy Krueger", "Jason Voorhees"];

export function HalloweenCostumeGeneratorPage() {
  useEffect(() => {
    document.title = "Halloween Costume Generator — Random Ideas & Amazon Products | CostumesPlanet";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Free Halloween costume generator with random ideas. Type any character or theme — witch, vampire, zombie, funny, cute — and get real Amazon product links instantly. No sign-up needed.");
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#0a0a0f 0%,#0d0d1a 100%)" }}>
        {/* Hero */}
        <section className="relative pt-16 pb-10 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 70% 40% at 50% 0%,rgba(255,153,0,0.08) 0%,transparent 70%)"
          }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF9900]/20 bg-[#FF9900]/10 text-[#FF9900] text-xs font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Free Halloween Costume Generator
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Halloween Costume Generator
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-3" style={{ fontFamily: "'Inter',sans-serif" }}>
              Type any character, theme, or vibe — scary, funny, cute, couples — and get real Amazon products for every piece of your Halloween costume. Or hit <strong className="text-white/70">Random</strong> for instant inspiration.
            </p>
            <div className="flex items-center justify-center gap-6 text-white/30 text-xs mb-8">
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#FF9900]" /> 241+ Costume Guides</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Real Amazon Products</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Last-Minute Friendly</span>
            </div>
          </div>
        </section>

        {/* Generator */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
            <CostumeGeneratorTool
              placeholder="e.g. Vampire, Witch, Funny Pun, Couples Zombie…"
              presets={PRESETS}
              title="Halloween Costume Generator"
            />
          </div>
        </section>

        {/* SEO Content */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto prose prose-invert prose-sm max-w-none">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-8">

              <div>
                <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  The Ultimate Halloween Costume Generator — Find Your Perfect Look
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Staring at your closet three days before Halloween, completely stumped? You're not alone — Reddit's <em>r/halloween</em> and <em>r/femalefashionadvice</em> are flooded every October with "help me pick a Halloween costume" threads. The most upvoted answer is always the same: <strong className="text-white/80">start with a theme, not a character</strong>. Are you going scary? Funny? Punny? Cute? Once you know the vibe, narrowing down is easy.
                </p>
                <p className="text-white/60 text-sm leading-relaxed mt-3">
                  Our free Halloween costume generator skips the overwhelm. Type a character name or theme above — or smash the shuffle button for a completely random Halloween costume idea — and we'll instantly surface every piece you need on Amazon with live pricing. Whether you want a <strong className="text-white/80">last-minute Halloween costume</strong> that ships overnight, a <strong className="text-white/80">DIY Halloween costume</strong> starting point, or a full <strong className="text-white/80">couples Halloween costume set</strong>, this tool has you covered.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  Popular Halloween Costume Categories for 2025
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: "🧛", title: "Classic Horror Costumes", desc: "Vampires, Dracula, Frankenstein, Mummies, and Werewolves never go out of style. These timeless Halloween costume ideas are always recognized and easy to assemble from Amazon basics." },
                    { icon: "🎃", title: "Funny Halloween Costumes", desc: "Punny costumes (cereal killer, formal apology) and pop culture memes are huge on Reddit each October. The funnier the better — people remember the costume that made them laugh." },
                    { icon: "👻", title: "Scary Halloween Costumes", desc: "From Ghostface to Pennywise, horror movie characters dominate the scary costume category. Search any horror villain in our generator to find masks, costumes, and props on Amazon." },
                    { icon: "💑", title: "Couples Halloween Costumes", desc: "Matching couples costumes — Bonnie & Clyde, Romeo & Juliet, any TV duo — are the most shared Halloween photos. Our generator handles couples themes with coordinated Amazon results." },
                    { icon: "🐱", title: "Cute Animal Costumes", desc: "Cat, bunny, fox, and unicorn costumes are perennially popular, especially for adults. Simple, flattering, and comfortable — perfect for long Halloween parties." },
                    { icon: "🦸", title: "Superhero Halloween Costumes", desc: "Marvel and DC characters dominate every Halloween. Superheroes are instantly recognizable and come in every size. Try Spider-Man, Wonder Woman, or Black Panther in the generator." },
                  ].map((c, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-2xl shrink-0">{c.icon}</span>
                      <div>
                        <h3 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{c.title}</h3>
                        <p className="text-white/50 text-xs leading-relaxed">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  How to Use the Random Halloween Costume Generator
                </h2>
                <ol className="space-y-3">
                  {[
                    { n: "1", t: "Type or spin", d: "Enter any character name, theme, or adjective (scary, funny, cute, sexy, couples). Or hit the 🔀 button to let the random Halloween costume generator spin through 20+ ideas and land on something unexpected." },
                    { n: "2", t: "Verify & generate", d: "A quick drag-slider confirms you're human (not a bot). Once verified, we search Amazon for every piece of your costume: head, torso, legs, feet, hands, and props." },
                    { n: "3", t: "Shop with one click", d: "Each product card links directly to Amazon with our affiliate tag (cplanet0c-20). Filter by Prime for next-day Halloween delivery. Amazon Prime members can often get full costumes in 1–2 days." },
                    { n: "4", t: "Mix & match", d: "Not happy with the first result? Run the generator again or tweak your search. Try 'female vampire' vs 'classic vampire' or 'funny skeleton' vs 'scary skeleton' for very different results." },
                  ].map(s => (
                    <li key={s.n} className="flex gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#FF9900]/20 text-[#FF9900] text-xs font-bold flex items-center justify-center shrink-0">{s.n}</span>
                      <div>
                        <span className="text-white text-sm font-semibold">{s.t} — </span>
                        <span className="text-white/55 text-sm">{s.d}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  Halloween Costume Ideas by Search Volume (What People Are Actually Looking For)
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  Based on Reddit, Quora, and Google Trends data, here are the most searched Halloween costume ideas each year. All of them work with our generator — just type the name:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["Vampire","Witch","Zombie","Ghost","Frankenstein","Mummy","Werewolf","Skeleton","Clown","Devil","Angel","Pirate","Nurse","Police","Superhero","Princess","Fairy","Ninja","Robot","Alien","Cowboy","Sailor","Chef","Mermaid","Joker","Harley Quinn","Spider-Man","Wonder Woman","Black Cat","Catwoman"].map(idea => (
                    <button key={idea}
                      onClick={() => document.querySelector("input")?.focus()}
                      className="text-left px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:border-[#FF9900]/20 hover:bg-[#FF9900]/5 transition-all">
                      <span className="text-white/60 text-xs">{idea}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Links */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                  Detailed Halloween Costume Guides
                </h2>
                <p className="text-white/55 text-sm mb-4">Want a step-by-step guide for a specific character? We've written 241+ detailed costume guides with every product you need:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {RELATED_POSTS.map(p => (
                    <Link key={p.slug} to={`/${p.slug}/`}
                      className="px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-white/60 text-xs hover:text-[#FF9900] hover:border-[#FF9900]/20 transition-all leading-snug">
                      {p.title}
                    </Link>
                  ))}
                </div>
                <p className="text-white/40 text-xs mt-3">
                  <Link to="/" className="text-[#FF9900] hover:underline">Browse all 241 costume guides →</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Frequently Asked Questions
            </h2>
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

        {/* Bottom CTA */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/30 text-sm">
              Looking for the full costume builder with drag-and-drop?{" "}
              <Link to="/build" className="text-[#FF9900] hover:underline">Try CostumeBuilder →</Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
