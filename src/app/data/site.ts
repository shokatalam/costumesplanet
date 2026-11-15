// =============================================================================
// CostumesPlanet.com — Site architecture
//
// One place for: hub (pillar) page content, clean hub URLs, which guides are
// indexable, and how guides link to each other. Used by the React app AND by
// scripts/prerender.mjs, so the HTML Google sees and the app always agree.
//
// Indexing rule: only hand-written guides are indexable. Template guides stay
// reachable for visitors but carry noindex,follow and are left out of the
// sitemap until they are rewritten (adding a guide to guides.ts flips it).
// =============================================================================

import type { CostumeBlog } from "./costumes";

export interface HubFAQ {
  question: string;
  answer: string;
}

export interface Hub {
  name: string; // internal category name used in costumes.ts
  slug: string; // clean URL segment: /category/<slug>/
  h1: string;
  seoTitle: string;
  metaDescription: string;
  intro: string[]; // first sentence answers the hub query directly
  tips: string[]; // "how to choose" bullets
  faqs: HubFAQ[];
  related: string[]; // other hub slugs
}

export const hubs: Hub[] = [
  {
    name: "Game of Thrones",
    slug: "game-of-thrones",
    h1: "Game of Thrones Costumes: Character Guides for Every House",
    seoTitle: "Game of Thrones Costumes: Stark, Lannister & Targaryen Guides",
    metaDescription:
      "Game of Thrones costume guides for Arya, Ned, Jaime, Joffrey, Ygritte, Missandei and more: what to buy, what to skip, budgets and how to wear each look.",
    intro: [
      "The best Game of Thrones costumes are built from three things: a house colour, a texture (fur, leather or wool rather than shiny satin) and one signature prop, such as Needle for Arya, the gold hand for Jaime or a Stark cloak with fur shoulders. Get those three right and the costume reads instantly, even on a small budget.",
      "Every guide below lists the exact pieces for one character, the fastest complete option, a rough budget and how to put it on. Start with the house: Starks wear grey and brown with fur, Lannisters wear crimson and gold, Targaryens wear black, red and silver, and Free Folk wear layered hides.",
    ],
    tips: [
      "Matte beats shiny: wool, linen, suede and faux fur look like the show; costume satin looks like a party store.",
      "Pick the season. Jaime in white Kingsguard and Jaime with the gold hand are two different shopping lists.",
      "One good prop (a sword, a cloak pin, a crown) does more than a full cheap costume set.",
      "Couples and groups work best within one house or one rivalry, like Jaime and Cersei or Jon and Ygritte.",
    ],
    faqs: [
      { question: "What is the easiest Game of Thrones costume?", answer: "Arya Stark. A brown or grey tunic, a belt, boots and a thin sword (Needle) are enough, and most people already own the basics." },
      { question: "What colours should a Stark costume use?", answer: "Grey, charcoal, brown and off-white, with fur or faux fur at the shoulders. The Stark sigil is a grey direwolf on white." },
      { question: "How do I make a Game of Thrones costume look less cheap?", answer: "Swap shiny fabrics for matte ones, distress edges lightly, add a real leather belt and replace the plastic sword with a heavier foam or steel-look prop." },
    ],
    related: ["movie-characters", "pop-culture", "horror"],
  },
  {
    name: "Marvel & DC",
    slug: "marvel-dc",
    h1: "Marvel & DC Costumes: Superhero and Villain Guides",
    seoTitle: "Marvel & DC Costumes: Hero & Villain Costume Guides",
    metaDescription:
      "Superhero costume guides for Marvel, DC and The Boys: Blade, Captain Marvel, Taskmaster, Fat Thor, The Deep and more, with the fastest complete option and a budget for each.",
    intro: [
      "A good superhero costume starts with choosing one specific version of the character, such as a particular film, comic run or series, and matching its colours and emblem exactly. Mixing details from several versions is the most common reason a superhero costume looks off.",
      "Each guide below names the version it covers, the one piece that matters most (usually the suit or the emblem), the fastest ready-made option and a DIY route if you'd rather build it. Bodysuits run small, so size up and check the return policy before the event.",
    ],
    tips: [
      "Decide film vs comic first; colours and emblems differ between them.",
      "The emblem and the silhouette carry recognition; fine texture detail rarely does.",
      "Bodysuits and printed muscle suits run small. Size up.",
      "Villains and anti-heroes (Taskmaster, The Deep) are less common, so you won't be one of five at the party.",
    ],
    faqs: [
      { question: "What is the easiest superhero costume to make?", answer: "Blade or Fat Thor. Blade is a long black coat, sunglasses and a sword prop; Fat Thor is a bathrobe, a fat suit, a beard and a hammer." },
      { question: "Should I buy a full superhero costume or build one?", answer: "Buy the suit if the character wears a printed or patterned bodysuit, since that is hard to make. Build it if the character wears street clothes, armor pieces or a coat, where thrift-store pieces look better than a costume set." },
      { question: "Where do The Boys characters belong?", answer: "We group The Boys with Marvel & DC because the costumes follow the same superhero rules: a suit, an emblem and one signature accessory." },
    ],
    related: ["movie-characters", "gaming", "anime"],
  },
  {
    name: "Anime",
    slug: "anime",
    h1: "Anime Cosplay Guides: Demon Slayer, Attack on Titan & More",
    seoTitle: "Anime Cosplay Guides: Wigs, Uniforms & Props by Character",
    metaDescription:
      "Anime cosplay guides covering Levi Ackerman, Demon Slayer and Tokyo Revengers characters: the wig, uniform and prop each one needs, budgets and styling tips.",
    intro: [
      "Anime cosplay lives or dies on two things: the wig and the colour blocking. Anime designs use flat, bold colours and distinctive hairstyles, so a well-styled wig and the right uniform colours do more for recognition than expensive fabric.",
      "The guides below cover the specific uniform, the wig style and the signature prop for each character, plus the fastest complete option for first-time cosplayers. Most anime characters are best bought as a uniform set and finished with a separately bought, better-quality wig.",
    ],
    tips: [
      "Budget more for the wig than the outfit; it is what people recognise first.",
      "Heat-resistant wigs can be restyled with a straightener; cheap ones cannot.",
      "Check event rules before carrying a sword prop; many conventions require foam or wood.",
      "Uniform-based characters (Survey Corps, Demon Slayer Corps, Toman) are the best value: one set, many characters.",
    ],
    faqs: [
      { question: "What is a good first anime cosplay?", answer: "A uniform character such as Levi Ackerman or a Demon Slayer Corps member. The uniform set does most of the work and only the wig and one prop change between characters." },
      { question: "How much does an anime cosplay cost?", answer: "Most uniform-based cosplays come in at $60–$150 for the uniform, wig and prop. Hand-made or commissioned pieces cost far more." },
      { question: "Do I need a wig for anime cosplay?", answer: "Almost always. Anime hair colours and shapes rarely match natural hair, and the hairstyle is often the most recognisable part of the character." },
    ],
    related: ["gaming", "cartoon-characters", "marvel-dc"],
  },
  {
    name: "Gaming",
    slug: "gaming",
    h1: "Video Game Costumes: Street Fighter, Mario, Overwatch & League Guides",
    seoTitle: "Video Game Costumes & Cosplay: Character Guides",
    metaDescription:
      "Video game costume and cosplay guides, from Cammy and Shy Guy to Overwatch and League of Legends characters: the pieces you need, budgets and how to wear them.",
    intro: [
      "A video game costume works when you pick one specific outfit or skin and match its silhouette and colours. Games give characters many skins, so decide early which one you're recreating and use in-game screenshots as your reference.",
      "The guides below list the pieces for each character, the fastest complete option and the detail that matters most, whether that's Cammy's braids, Shy Guy's mask or an Overwatch hero's weapon.",
    ],
    tips: [
      "Screenshot the exact skin you want from the game or its wiki before shopping.",
      "Oversized props read well in photos but check venue rules for size and material.",
      "Mascot-style characters (Shy Guy) are the most comfortable to wear for a whole night.",
      "Group costumes from one game, such as an Overwatch team, are easy to coordinate.",
    ],
    faqs: [
      { question: "What is an easy video game costume?", answer: "Shy Guy: a red hooded top, a white mask with black eye holes and mouth, a dark belt and blue trousers. It is comfortable and immediately recognisable." },
      { question: "How do I choose which skin to cosplay?", answer: "Pick the default or most famous skin unless you are going to a fan event, where rarer skins get more attention from people who know the game." },
      { question: "Are game costumes better bought or made?", answer: "Buy printed bodysuits and complex armor; build anything based on everyday clothes. Most game costumes end up a mix of both." },
    ],
    related: ["anime", "marvel-dc", "cartoon-characters"],
  },
  {
    name: "Star Wars",
    slug: "star-wars",
    h1: "Star Wars Costumes: Jedi, Sith, Bounty Hunter & Gungan Guides",
    seoTitle: "Star Wars Costumes: Character Costume Guides",
    metaDescription:
      "Star Wars costume guides for Jar Jar Binks, Anakin, Padmé, Cad Bane, Bo-Katan and Darth Revan: the pieces you need, budgets and how to put each look together.",
    intro: [
      "A Star Wars costume needs the right era and the right texture. Jedi robes are rough-woven browns and creams, Sith and bounty hunters lean on black leather and armor, and Naboo royalty is all about elaborate gowns and hair. Star Wars fans know the costumes well, so check reference images from the specific film or series.",
      "Each guide names the film or show it follows, the fastest ready-made option, the signature prop (usually a lightsaber or blaster) and how to wear it.",
    ],
    tips: [
      "Jedi robes look best in linen or cotton, not polyester sheen.",
      "A good lightsaber prop lifts any Jedi or Sith costume.",
      "Masks and helmets limit vision and hearing; plan for that at crowded events.",
      "Star Wars costumes have the most knowledgeable audience. Small details get noticed.",
    ],
    faqs: [
      { question: "What is the easiest Star Wars costume?", answer: "A Jedi: a cream tunic, a brown robe, a belt, boots and a lightsaber. Every Jedi from Obi-Wan to Anakin starts there." },
      { question: "Do I need a helmet for a Mandalorian costume?", answer: "Yes. Mandalorians like Bo-Katan are recognised by the T-visor helmet and the painted armor; the rest of the costume is a dark flight suit." },
      { question: "How do I make Jedi robes look screen-accurate?", answer: "Use matte, slightly rough fabric in brown, cream and tan, layer the tunic and tabards, and let the robe hang loose with a wide sleeve." },
    ],
    related: ["movie-characters", "marvel-dc", "80s-retro"],
  },
  {
    name: "Disney",
    slug: "disney",
    h1: "Disney Costumes: Peter Pan, Princess and Despicable Me Guides",
    seoTitle: "Disney Costumes: Character Costume Guides for Adults & Kids",
    metaDescription:
      "Disney and family-film costume guides for Peter Pan, Mr. Smee, Lucy Wilde and more: the pieces you need, budgets and how to put each look together.",
    intro: [
      "Disney costumes are built on a few strong colours and one or two signature accessories, which is what people recognise first: Peter Pan's green tunic and feathered cap, Mr. Smee's red cap and striped shirt, Lucy Wilde's teal dress and red hair.",
      "The guides below list exactly which pieces deliver that recognition, the fastest ready-made option, and a cheaper build from clothes you may already own. Many of these work as family or group costumes, so related characters are linked from each guide.",
    ],
    tips: [
      "Match the animated colour palette closely; flat, saturated colours read best.",
      "Group costumes from one film (Peter Pan, Wendy, Hook and Smee) are the easiest to coordinate.",
      "For kids, prioritise comfort: soft fabrics and no tight masks.",
      "Princess gowns photograph better with a petticoat underneath.",
    ],
    faqs: [
      { question: "What is the easiest Disney costume for adults?", answer: "Peter Pan or Mr. Smee. Both use everyday-style clothes (a green tunic and tights, or a striped shirt and red cap) plus one accessory." },
      { question: "What is a good Disney group costume?", answer: "Peter Pan, Wendy, Captain Hook, Mr. Smee and Tinker Bell. Every age can join and each costume is cheap to build." },
      { question: "Are Despicable Me characters Disney?", answer: "No, they are from Illumination, but we group family-animation characters together here because the costumes follow the same rules." },
    ],
    related: ["cartoon-characters", "animated-tv", "diy-dance"],
  },
  {
    name: "Steven Universe",
    slug: "steven-universe",
    h1: "Steven Universe Costumes: Steven, the Crystal Gems & the Diamonds",
    seoTitle: "Steven Universe Costumes & Cosplay Guides",
    metaDescription:
      "Steven Universe costume and cosplay guides: Steven, Rose Quartz, Amethyst, Lapis Lazuli, Stevonnie, the Diamonds and more, with the pieces, gem placement and colours for each.",
    intro: [
      "Steven Universe costumes come down to colour palette and gem placement. The show uses flat colours and simple shapes, so matching each character's colours and putting their gem in the right spot (Steven's on his belly, Amethyst's on her chest, Lapis's on her back) is what makes the cosplay recognisable.",
      "Start with Steven's guide: a pink star T-shirt, a red jacket, jeans and the pink gem. The other Crystal Gems and Diamonds are linked from there.",
    ],
    tips: [
      "Gem placement matters as much as the outfit; check the character's design sheet.",
      "Flat-colour fabrics read better than patterned ones.",
      "Crystal Gems group costumes are easy to coordinate and fan-favourite at cons.",
    ],
    faqs: [
      { question: "What is the easiest Steven Universe costume?", answer: "Steven himself: a pink T-shirt with a yellow star, a red jacket, blue jeans, pink flip-flops and a pink gem on the belly." },
      { question: "Where is each Crystal Gem's gem?", answer: "Steven's and Rose's are on the belly, Amethyst's on the chest, Pearl's on the forehead, Garnet has one in each palm and Lapis Lazuli's is on her back." },
    ],
    related: ["cartoon-characters", "animated-tv", "anime"],
  },
  {
    name: "Animated TV",
    slug: "animated-tv",
    h1: "Family Guy & Bob's Burgers Costumes: Animated TV Character Guides",
    seoTitle: "Family Guy & Animated TV Costumes: Character Guides",
    metaDescription:
      "Costume guides for Peter, Stewie and Brian Griffin and other adult-animated TV characters: the clothes, props and accessories that make each one recognisable.",
    intro: [
      "Adult animated-TV costumes are the easiest wins at a party because the characters wear everyday clothes: Peter Griffin is a white shirt, green trousers and round glasses; Stewie is a red overall and yellow shirt. Exact colours and one prop do all the work.",
      "Each guide lists those pieces, a fastest-option buy and how to make the look read in photos.",
    ],
    tips: [
      "Exaggerate: animation reads better slightly bigger and brighter than real life.",
      "A family group (the Griffins or the Belchers) is easy to coordinate.",
      "Stewie and Brian work as a duo costume.",
    ],
    faqs: [
      { question: "What is the easiest Family Guy costume?", answer: "Peter Griffin: white button-up shirt, green trousers, black shoes, round glasses and a padded belly if you want it." },
      { question: "What's a good Family Guy couples costume?", answer: "Stewie and Brian, or Peter and Lois." },
    ],
    related: ["cartoon-characters", "pop-culture", "movie-characters"],
  },
  {
    name: "Movie Characters",
    slug: "movie-characters",
    h1: "Movie Character Costumes: Classic & Cult Film Guides",
    seoTitle: "Movie Character Costumes: Scarface, Ferris Bueller & More",
    metaDescription:
      "Costume guides for iconic movie characters: Tony Montana, Tyler Durden, Ferris Bueller, the Blues Brothers, Jordan Belfort, Cousin Eddie and more, with the pieces and budgets for each.",
    intro: [
      "The best movie costumes are the ones built from real clothes: a white suit, a red leather jacket, a sweater vest. Film characters wear clothing you can actually buy or thrift, so these are some of the most convincing and cheapest costumes on the site.",
      "Each guide below names the scene the look comes from, the exact pieces, the fastest option and how to style hair and props so the costume reads without explanation.",
    ],
    tips: [
      "Name the scene: Tony Montana in the white suit is different from the final-scene look.",
      "Thrift stores beat costume shops for film looks.",
      "A prop or quote card helps for less-famous characters.",
      "Duos (the Blues Brothers, Jack and Wendy Torrance) are crowd favourites.",
    ],
    faqs: [
      { question: "What is the easiest movie character costume?", answer: "The Blues Brothers: black suit, white shirt, thin black tie, black fedora and black sunglasses. It also works for one or two people." },
      { question: "What movie costume can I make from my own closet?", answer: "Ferris Bueller, Tyler Durden or Cousin Eddie. Each is mostly everyday clothes with one distinctive piece." },
    ],
    related: ["pop-culture", "horror", "classic-tv-film"],
  },
  {
    name: "Cartoon Characters",
    slug: "cartoon-characters",
    h1: "Cartoon Character Costumes: Powerpuff Girls, Phineas and Ferb & More",
    seoTitle: "Cartoon Character Costumes: Easy DIY Guides",
    metaDescription:
      "Cartoon costume guides for Mojo Jojo, Professor Utonium, Perry the Platypus, Doofenshmirtz, Kim Possible, Timmy Turner and more: the pieces, budgets and DIY options.",
    intro: [
      "Cartoon costumes are the easiest to DIY because cartoon characters are drawn in a few flat colours with one or two signature features: Perry's fedora, Doofenshmirtz's lab coat and hunch, Kim Possible's black crop top and cargo pants.",
      "Each guide below gives the shopping list, the fastest complete option and the detail that makes the character recognisable, plus who to pair them with for couples or groups.",
    ],
    tips: [
      "Match colours exactly and keep fabrics plain.",
      "Hero-and-villain pairs (Perry and Doofenshmirtz, Powerpuff Girls and Mojo Jojo) make great couples costumes.",
      "Most cartoon looks can be built from thrift-store basics plus one bought accessory.",
    ],
    faqs: [
      { question: "What is the easiest cartoon costume to DIY?", answer: "Kim Possible: black long-sleeve crop top, olive cargo pants, black gloves, a utility belt and long red hair." },
      { question: "What are good cartoon couples costumes?", answer: "Perry the Platypus and Dr. Doofenshmirtz, Professor Utonium and Mojo Jojo, or Timmy Turner with Cosmo and Wanda." },
    ],
    related: ["animated-tv", "disney", "steven-universe"],
  },
  {
    name: "Pop Culture",
    slug: "pop-culture",
    h1: "Pop Culture Costumes: TV, Music and Viral Character Guides",
    seoTitle: "Pop Culture Costumes: TV, Music & Viral Character Guides",
    metaDescription:
      "Pop culture costume guides for Jesse Pinkman, Rick Astley, Slash, Dexter Morgan, Pablo Escobar, The Vampire Diaries, High School Musical, Pokémon and more.",
    intro: [
      "Pop culture costumes work because people recognise them in a second: Rick Astley's trench coat and quiff, Slash's top hat and curls, Jesse Pinkman's baggy hoodie and beanie. They are usually built from real clothes, which makes them cheap and comfortable.",
      "The guides below cover TV, music and internet-famous characters. Each lists the exact pieces, the fastest option and one detail to nail so you don't have to explain who you are all night.",
    ],
    tips: [
      "Recognition comes from the one signature item. Spend there, thrift the rest.",
      "Music icons need the hair. Budget for a good wig.",
      "TV duos (Troy and Gabriella, Stefan and Katherine) make easy couples costumes.",
    ],
    faqs: [
      { question: "What is a funny pop culture costume?", answer: "Rick Astley, for anyone who knows the meme. A trench coat, a shirt and tie, and a red quiff are all it takes." },
      { question: "What is an easy last-minute pop culture costume?", answer: "Jesse Pinkman: a baggy hoodie, a beanie, oversized jeans and a few 'yo' references." },
    ],
    related: ["movie-characters", "animated-tv", "80s-retro"],
  },
  {
    name: "DIY & Dance",
    slug: "diy-dance",
    h1: "DIY & Dance Costumes: Homemade and Recital-Ready Guides",
    seoTitle: "DIY & Dance Costumes: Homemade Character Guides",
    metaDescription:
      "DIY and dance costume guides: Ginny Weasley, Dr. Evil and dance-recital looks, built from clothes you own plus one or two bought pieces.",
    intro: [
      "A good DIY costume starts with what's in your closet and buys only the pieces that make the character recognisable. Dr. Evil is a grey suit and a bald cap; Ginny Weasley is a school uniform, a Gryffindor tie and red hair.",
      "Each guide marks which pieces you probably already own and which to buy, with a rough budget.",
    ],
    tips: [
      "List what you own before buying anything.",
      "Dance costumes need stretch and secure fastenings; test them in motion.",
      "Fabric paint and iron-on vinyl cover most emblem and logo needs.",
    ],
    faqs: [
      { question: "What is the cheapest DIY costume?", answer: "Dr. Evil: a grey suit or grey clothes, a bald cap and a pinky raised to the corner of your mouth." },
    ],
    related: ["disney", "movie-characters", "pop-culture"],
  },
  {
    name: "80s & Retro",
    slug: "80s-retro",
    h1: "80s & Retro Costumes: He-Man, Skeletor and Masters of the Universe",
    seoTitle: "80s Retro Costumes: He-Man & Skeletor Guides",
    metaDescription:
      "80s costume guides for He-Man and Skeletor: the harness, power sword, Havoc Staff and the pieces for each, plus how to pair them.",
    intro: [
      "80s cartoon heroes and villains make bold, nostalgic costumes. He-Man is a chest harness, furry briefs and the Power Sword; Skeletor is a skull face, a blue body and the ram-headed Havoc Staff.",
      "Each guide lists the fastest option, the DIY route and how to pair the characters as a couple or rivals.",
    ],
    tips: [
      "He-Man and Skeletor are a natural duo; plan them together.",
      "Props (the Power Sword, the Havoc Staff) carry the costume.",
    ],
    faqs: [
      { question: "What do I need for a He-Man costume?", answer: "A chest harness with the iron-cross emblem, furry briefs, fur boots, a blond bob wig and the Power Sword." },
    ],
    related: ["star-wars", "classic-tv-film", "movie-characters"],
  },
  {
    name: "Smurfs",
    slug: "smurfs",
    h1: "Smurfs Costumes: Gargamel, Smurfette and the Smurf Village",
    seoTitle: "Smurfs Costumes: Gargamel, Smurfette & Smurf Guides",
    metaDescription:
      "Smurfs costume guides for Gargamel, Smurfette, Brainy Smurf, Vexy and Hackus: robes, hats, blue makeup and the pieces each one needs.",
    intro: [
      "A Smurf costume needs three things: blue skin (makeup or a blue bodysuit), white trousers or a white dress and the white Phrygian hat. Gargamel, the villain, is the opposite: a patched black robe, a bald cap, a hooked nose and Azrael the cat.",
      "Start with Gargamel's guide; the Smurf characters are linked from it, so you can build a group around him.",
    ],
    tips: [
      "Blue body paint takes time; a blue long-sleeve top and leggings are the quicker route.",
      "A Gargamel-and-Smurfs group costume is easy and recognisable.",
    ],
    faqs: [
      { question: "What do I need for a Gargamel costume?", answer: "A black hooded robe, a bald cap with a black hair fringe, red shoes, a prosthetic nose and an orange cat plush for Azrael." },
    ],
    related: ["cartoon-characters", "classic-tv-film", "disney"],
  },
  {
    name: "Horror",
    slug: "horror",
    h1: "Horror Movie Costumes: Scream, Halloween and The Exorcist Guides",
    seoTitle: "Horror Movie Costumes: Scream & Halloween Character Guides",
    metaDescription:
      "Horror costume guides for Casey Becker (Scream), Laurie Strode (Halloween) and more: the outfits, props and makeup that make each horror look recognisable.",
    intro: [
      "The best horror costumes are the victims and final girls, not just the killers: Casey Becker's cream sweater and cordless phone, Laurie Strode's 1978 babysitter look or her later shotgun-ready survivor look. They are cheaper than masks and get recognised by horror fans immediately.",
      "Each guide lists the outfit, the one prop that tells people which film you're from and optional makeup for blood or bruising.",
    ],
    tips: [
      "Pair a victim with the killer for a couples costume (Casey Becker and Ghostface, Laurie and Michael Myers).",
      "The prop names the film: a cordless phone for Scream, a kitchen knife or coat hanger for Halloween.",
      "Fake blood stains fabric; use washable blood or a costume you don't mind ruining.",
    ],
    faqs: [
      { question: "What is a good horror couples costume?", answer: "Laurie Strode and Michael Myers, or Casey Becker and Ghostface." },
    ],
    related: ["movie-characters", "pop-culture", "classic-tv-film"],
  },
  {
    name: "Classic TV & Film",
    slug: "classic-tv-film",
    h1: "Classic TV & Film Costumes: The Goonies, The Jetsons & The Flintstones",
    seoTitle: "Classic TV & Film Costumes: Goonies, Jetsons & Flintstones",
    metaDescription:
      "Classic TV and film costume guides: Sloth from The Goonies, George and Elroy Jetson, Barney Rubble and more, with the pieces and budgets for each.",
    intro: [
      "Classic TV and film costumes trade on nostalgia: Sloth's Baby Ruth T-shirt, George Jetson's turtleneck and Barney Rubble's brown tunic. They work across age groups and are usually simple to build.",
      "Each guide lists the exact pieces, the fastest complete option and who to pair the character with.",
    ],
    tips: [
      "Families can do a whole cast (the Jetsons or the Flintstones).",
      "Mask-based characters like Sloth need good ventilation for a long night.",
    ],
    faqs: [
      { question: "What do I need for a Sloth costume from The Goonies?", answer: "A Sloth mask, a ripped Superman T-shirt, a pirate-style hat or bandana and brown trousers with suspenders. A Baby Ruth bar is the finishing touch." },
    ],
    related: ["80s-retro", "movie-characters", "cartoon-characters"],
  },
];

const byName = new Map(hubs.map((h) => [h.name, h]));
const bySlug = new Map(hubs.map((h) => [h.slug, h]));

/** Legacy WordPress / old-app category URL segments → hub slug */
export const legacyHubSlugs: Record<string, string> = {
  "game-of-thrones-costumes": "game-of-thrones",
  "marvel-costumes": "marvel-dc",
  marvel: "marvel-dc",
  dc: "marvel-dc",
  "star-wars-costumes": "star-wars",
  "league-of-legends": "gaming",
  halloween: "pop-culture",
};

export function hubFor(categoryName: string): Hub | undefined {
  return byName.get(categoryName);
}

/** Resolve any category URL segment (clean slug, legacy slug or old encoded name). */
export function resolveHub(segment: string): Hub | undefined {
  const s = decodeURIComponent(segment || "").trim();
  return bySlug.get(s.toLowerCase()) || bySlug.get(legacyHubSlugs[s.toLowerCase()] || "") || byName.get(s);
}

export function categoryPath(categoryName: string): string {
  const hub = byName.get(categoryName);
  return hub ? `/category/${hub.slug}/` : `/category/${encodeURIComponent(categoryName)}/`;
}

export function isIndexable(c: CostumeBlog): boolean {
  return !!c.handwritten;
}

/** Character name used in anchor text: "Arya Stark costume" */
export function anchorName(c: CostumeBlog): string {
  if (c.characterName) return c.characterName;
  return c.title
    .replace(/\s*\b(Costume|Costumes|Cosplay|Diy|DIY|Halloween|Outfits?|For|Best|Sexy|Plus Size|Adult|Deluxe)\b\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Related guides for internal linking. Hand-written guides in the same hub
 * first, then hand-written guides from related hubs. Template guides are only
 * used to fill if nothing else exists.
 */
export function relatedGuides(c: CostumeBlog, all: CostumeBlog[], n = 6): CostumeBlog[] {
  const hub = hubFor(c.category);
  const others = all.filter((x) => x.slug !== c.slug);
  const sameHw = others.filter((x) => x.category === c.category && x.handwritten);
  const relHubs = new Set((hub?.related || []).map((s) => bySlug.get(s)?.name));
  const relHw = others.filter((x) => relHubs.has(x.category) && x.handwritten);
  const sameTpl = others.filter((x) => x.category === c.category && !x.handwritten);
  // Stable rotation so each guide links to a different subset of its siblings
  const seed = [...c.slug].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  const rotate = <T,>(arr: T[]) => (arr.length ? [...arr.slice(seed % arr.length), ...arr.slice(0, seed % arr.length)] : arr);
  const out: CostumeBlog[] = [];
  for (const x of [...rotate(sameHw), ...rotate(relHw), ...sameTpl]) {
    if (out.length >= n) break;
    if (!out.includes(x)) out.push(x);
  }
  return out;
}

export function quickFact(c: CostumeBlog, label: string): string {
  return c.quickFacts?.find((f) => f.label.toLowerCase().includes(label))?.value || "";
}
