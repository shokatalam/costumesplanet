import { useEffect } from "react";
import { Link } from "react-router";
import { CostumeGeneratorTool } from "./CostumeGeneratorTool";
import { Shuffle, Dices, ChevronDown, Zap } from "lucide-react";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://costumesplanet.com/random-costume-generator",
      "url": "https://costumesplanet.com/random-costume-generator",
      "name": "Random Costume Generator — Spin the Wheel for Halloween & Cosplay Ideas",
      "description": "Free random costume generator with spin-the-wheel functionality. Can't decide what to wear? Get a random Halloween costume idea instantly with Amazon product links.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://costumesplanet.com/" },
          { "@type": "ListItem", "position": 2, "name": "Random Costume Generator", "item": "https://costumesplanet.com/random-costume-generator" }
        ]
      }
    },
    {
      "@type": "WebApplication",
      "name": "Random Costume Generator Wheel",
      "url": "https://costumesplanet.com/random-costume-generator",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "How does the random costume generator work?", "acceptedAnswer": { "@type": "Answer", "text": "Click the shuffle button (🔀) to spin through 20+ costume ideas at random. The generator cycles rapidly through characters and themes, then lands on one. Click Generate to instantly find Amazon products for that costume. It's like a costume wheel spinner — without the physical wheel." } },
        { "@type": "Question", "name": "What costumes can the random generator suggest?", "acceptedAnswer": { "@type": "Answer", "text": "The random costume generator pulls from 20+ ideas including Vampire, Witch, Zombie, Ghost, Princess, Ninja, Pirate, Robot, Mermaid, Dragon, Knight, Fairy, Cowboy, Werewolf, Clown, Skeleton, Angel, Alien, Viking, and Samurai. Each random pick then generates real Amazon product results." } },
        { "@type": "Question", "name": "Is there a random Halloween costume generator wheel?", "acceptedAnswer": { "@type": "Answer", "text": "Our shuffle feature works like a random costume generator wheel — it spins through ideas and lands on a random pick. While it's not a literal spinning wheel graphic, it randomizes through the same set of costume ideas you'd find on a Halloween costume wheel spinner." } },
        { "@type": "Question", "name": "What's the best random costume idea generator for indecisive people?", "acceptedAnswer": { "@type": "Answer", "text": "If you're totally indecisive, here's the move: click the shuffle button 3 times and go with whatever it lands on the third time. No more overthinking. The random costume generator takes the decision out of your hands entirely — just click and commit." } },
        { "@type": "Question", "name": "Can I use the random generator for a group costume theme?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Pass the phone around — each person clicks shuffle and whatever it lands on, they wear. This is a fun way to create a randomized group costume theme at a party. Or use the random costume theme generator for a single theme and have each person play a different character from that world." } },
        { "@type": "Question", "name": "How do I make a random costume generator in Scratch?", "acceptedAnswer": { "@type": "Answer", "text": "To make a random costume generator in Scratch, create a list of costume names, then use the 'pick random 1 to (length of list)' block to select a random item from the list and display it. Use the 'when flag clicked' event to trigger a new random pick each time. Our online version does this instantly with real shopping results." } },
        { "@type": "Question", "name": "What if I don't like the random costume it picks?", "acceptedAnswer": { "@type": "Answer", "text": "Just click shuffle again! There's no limit on how many times you can randomize. Each click spins through a new sequence and lands on a different costume idea. You can also type a theme you prefer (scary, funny, cute) and click Generate instead of using the random picker." } }
      ]
    }
  ]
};

const RELATED_POSTS = [
  { slug: "evil-morty-costume", title: "Evil Morty Costume" },
  { slug: "pirate-steve-costume", title: "Pirate Steve Costume" },
  { slug: "brian-griffin-costume", title: "Brian Griffin Costume" },
  { slug: "stewie-griffin-costume", title: "Stewie Griffin Costume" },
  { slug: "peter-griffin-costume", title: "Peter Griffin Costume" },
  { slug: "hamburger-costume", title: "Hamburglar Costume" },
  { slug: "the-exorcist-costume", title: "Exorcist Costume" },
  { slug: "deluxe-grinch-costume", title: "Deluxe Grinch Costume" },
];

const PRESETS = ["Random!", "Random!", "Random!", "Surprise me", "Surprise me", "Any costume", "Something scary", "Something funny", "Something cute"];

export function RandomCostumeGeneratorPage() {
  useEffect(() => {
    document.title = "Random Costume Generator — Spin the Wheel for Instant Ideas | CostumesPlanet";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Can't decide what to wear? Use our free random costume generator to spin through ideas and find your perfect Halloween or cosplay costume. Real Amazon products included.");
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#0a0a0f 0%,#0d0d1a 100%)" }}>
        {/* Hero */}
        <section className="relative pt-16 pb-10 px-4">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%,rgba(16,185,129,0.08) 0%,transparent 70%)" }} />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-xs font-semibold mb-5">
              <Dices className="w-3.5 h-3.5" /> Random Costume Generator Wheel
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
              Random Costume Generator
            </h1>
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-4" style={{ fontFamily: "'Inter',sans-serif" }}>
              Can't decide what to wear? Hit the <strong className="text-white/70">🔀 Random</strong> button and the generator spins through 20+ costume ideas and picks one for you. Then we find every Amazon product you need — instantly.
            </p>
            <p className="text-white/30 text-sm mb-8">The online random costume generator wheel — no indecision, no overthinking.</p>
          </div>
        </section>

        {/* Generator — with big shuffle CTA */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Shuffle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>Random Costume Generator</p>
                <p className="text-white/40 text-xs">Hit 🔀 to spin — or type your own idea and click Generate</p>
              </div>
            </div>
            <CostumeGeneratorTool
              placeholder="Or type a theme: scary, funny, cute, steampunk…"
              title="Random Costume Generator"
            />
          </div>
        </section>

        {/* SEO Content */}
        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-8">

            <div>
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Why Use a Random Costume Generator?
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Every October, Reddit's <em>r/halloween</em>, <em>r/AskReddit</em>, and Quora fill up with the same question: <strong className="text-white/80">"What should I be for Halloween?"</strong> The top comments always suggest the same thing: stop searching, pick something, and commit. The best Halloween costumes aren't the ones agonized over for weeks — they're the ones worn with confidence.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                That's exactly what a <strong className="text-white/80">random costume generator</strong> is for. Instead of scrolling through endless listicles, you click one button, get one idea, and immediately see exactly what to buy on Amazon to make it happen. The decision is made in five seconds. The shopping takes another five minutes. Done.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                Random Costume Generator Categories
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: "🎃", t: "Random Halloween Costumes", d: "Classic Halloween characters: vampires, witches, zombies, ghosts, skeletons, and more. Hit random and get a classic that always works." },
                  { icon: "🎲", t: "Random Costume Theme Generator", d: "For groups or events — spin for a theme (Pirates, Horror, Sci-Fi, Fairy Tale) and each person dresses as a different character from that world." },
                  { icon: "😂", t: "Random Funny Costume", d: "Land on something hilarious — the generator draws from pop culture, puns, and internet memes for funny random costume picks." },
                  { icon: "👻", t: "Random Scary Costume", d: "Type 'scary' before hitting Generate to filter random results to horror and spooky characters only." },
                  { icon: "💑", t: "Random Couples Costume", d: "Both people hit random separately — sometimes the most memorable couples costumes are the ones that weren't planned at all." },
                  { icon: "🎨", t: "Random Costume Idea Generator", d: "For when you have no idea where to start. Let randomness guide you — you can always refine the idea once you have a starting point." },
                ].map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-2xl mb-2">{c.icon}</div>
                    <h3 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>{c.t}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
                The "Commit to Random" Method — From Reddit
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                One of the most upvoted posts on <em>r/halloween</em> about costume selection uses what Redditors call the "commit to random" method: use a random costume generator, go with whatever it picks on the first spin (no re-spinning allowed), and build the best possible version of that costume. The constraint makes it more fun — and the costume always becomes a conversation starter because you can tell people "I let a random generator decide."
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                Our random costume generator is built for exactly this method. One click of the shuffle button, one random costume, full Amazon shopping list. No second-guessing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>More Costume Guides to Explore</h2>
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
