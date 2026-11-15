// =============================================================================
// CostumesPlanet.com — Hand-written guide content, batch 5 (Nov 2026)
// Fills the thinnest hubs: Anime, Gaming, Marvel & DC, Game of Thrones,
// Star Wars, Disney, Pop Culture. Answer-first intros, fastest complete option
// first, question FAQs. Character-specific facts only.
// =============================================================================

import type { GuideContent } from "./guides";

const search = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=cplanet0c-20`;
const U = "2026-11-15";

export const guidesBatch5: Record<string, GuideContent> = {
  // ───────────────────────────────────────────────────────────────────────────
  "tanjiro-kamado-costume": {
    characterName: "Tanjiro Kamado",
    updated: U,
    seoTitle: "Tanjiro Kamado Costume: Checkered Haori, Uniform & Earrings",
    metaDescription:
      "A Tanjiro costume needs the green-and-black checkered haori, the black Demon Slayer Corps uniform, hanafuda earrings, a forehead scar and a black-bladed sword. Fastest set, wig tips and the Nezuko box.",
    h1Title: "Tanjiro Kamado Costume Guide (Demon Slayer)",
    excerpt:
      "Tanjiro is the green-and-black checkered haori over a black Corps uniform, hanafuda earrings, a scar on the left of his forehead and a black nichirin sword.",
    intro: [
      "A Tanjiro Kamado costume needs: a green-and-black checkered haori, the black Demon Slayer Corps uniform (high-collared jacket and wide trousers), white leg wraps, hanafuda earrings (a red sun on a white card), a burgundy scar on the left side of the forehead, dark red hair and a black-bladed katana. The checkered haori is what people recognise first, so if you buy one piece of quality, make it that.",
      "Most cosplay sets bundle the haori and uniform together and cost less than buying them separately, which makes Tanjiro one of the cheapest anime cosplays to do well. Add a wooden box on your back and you are also carrying Nezuko; our Inosuke, Giyu and Mitsuri guides cover the rest of the group.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$45–$110" },
      { label: "Time to put on", value: "20 minutes" },
      { label: "What people recognise first", value: "The green-and-black checkered haori" },
    ],
    items: [
      { name: "Tanjiro cosplay set (haori, uniform jacket, trousers, belt)", url: search("Tanjiro Kamado cosplay costume set haori uniform"), note: "Fastest complete option. Check that the checks are dark green and black, not teal, and that the jacket has the high collar." },
      { name: "Tanjiro wig (short, dark burgundy)", url: search("Tanjiro Kamado wig"), note: "Short, spiky and dark red-brown with lighter red tips. Skip it if your hair is dark and short." },
      { name: "Hanafuda earrings (clip-on available)", url: search("Tanjiro hanafuda earrings clip on"), note: "White rectangular cards with a red sun and rays. Clip-ons work if your ears aren't pierced." },
      { name: "Black nichirin katana prop", url: search("Tanjiro sword nichirin katana cosplay"), note: "Black blade, black-and-gold guard. Wooden or foam versions are usually allowed at conventions." },
      { name: "White leg wraps (kyahan) and tabi socks", url: search("white kyahan leg wraps tabi socks cosplay"), note: "Wrapped from ankle to knee over the trousers." },
      { name: "Zori sandals", url: search("zori sandals men cosplay"), note: "Straw or black. Any flat thong sandal works with tabi socks." },
      { name: "Wooden box backpack (Nezuko's box)", url: search("Nezuko box backpack cosplay"), note: "Optional, but it turns a Tanjiro costume into the Tanjiro costume." },
      { name: "Burgundy face paint or scar wax", url: search("burgundy face paint cosplay"), note: "For the scar on the left side of the forehead." },
    ],
    dressingGuide: [
      { itemName: "Uniform", steps: [
        "Trousers on, tucked into the leg wraps from ankle to knee.",
        "Black jacket closed to the collar, white belt at the waist.",
        "Haori over the top, left open at the front.",
      ] },
      { itemName: "Head and face", steps: [
        "Wig on, fringe swept slightly to the side so the scar shows.",
        "Paint the scar on the left of the forehead in burgundy.",
        "Earrings last so the wig doesn't catch them.",
      ] },
      { itemName: "Props", steps: [
        "Sword on the left hip, tucked through the belt.",
        "Box on your back if you're bringing Nezuko along.",
      ] },
    ],
    about: [
      "Tanjiro Kamado is the protagonist of Demon Slayer: Kimetsu no Yaiba, Koyoharu Gotouge's manga and the anime by Ufotable. After demons kill his family and turn his sister Nezuko into one, he joins the Demon Slayer Corps to find a cure. He fights with Water Breathing and later Sun Breathing (Hinokami Kagura), and carries Nezuko on his back in a wooden box during the day.",
      "His look is tied to his family: the checkered haori, the hanafuda earrings passed down from his father, and the scar on his forehead that later becomes a demon slayer mark.",
    ],
    faqs: [
      { question: "What colour is Tanjiro's haori?", answer: "Dark green and black checks in a regular grid (ichimatsu pattern). Teal or bright green looks wrong next to official art." },
      { question: "Which side is Tanjiro's scar on?", answer: "The left side of his forehead (on the right as you face him). It is burgundy and roughly flame-shaped." },
      { question: "What do Tanjiro's earrings look like?", answer: "White rectangular hanafuda cards with a red sun and radiating lines." },
      { question: "What's a good Demon Slayer group costume?", answer: "Tanjiro, Nezuko, Zenitsu and Inosuke are the core four. Add Giyu or Mitsuri for a Hashira." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "inosuke-hashibira-costume": {
    characterName: "Inosuke Hashibira",
    updated: U,
    seoTitle: "Inosuke Costume: Boar Mask, Twin Swords & Fur Belt (Demon Slayer)",
    metaDescription:
      "An Inosuke Hashibira costume needs a boar head mask, a bare chest, navy uniform trousers, a fur belt, leg wraps and two jagged swords. Fastest set, coverage options and how to wear the mask.",
    h1Title: "Inosuke Hashibira Costume Guide (Demon Slayer)",
    excerpt:
      "Inosuke is a boar's head mask, bare chest, dark blue trousers with a fur belt, white leg wraps and two chipped, jagged swords.",
    intro: [
      "An Inosuke Hashibira costume needs: a boar head mask, a bare chest, dark navy Corps trousers, a brown fur belt or pelt around the waist, white leg wraps and two jagged, chipped swords. The boar mask does almost all the work; the rest is simple.",
      "If you'd rather not go shirtless, a skin-tone muscle shirt under the trousers is the standard workaround. Inosuke is the easiest Demon Slayer character to make look good in photos because the mask hides everything; pair him with Tanjiro and Zenitsu for the trio.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$45–$100" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "The boar head mask" },
    ],
    items: [
      { name: "Inosuke boar head mask", url: search("Inosuke boar mask"), note: "The essential piece. Look for one with a foam or latex snout and grey-brown fur; check the eye holes are big enough to see stairs." },
      { name: "Inosuke cosplay set (trousers, fur belt, leg wraps)", url: search("Inosuke Hashibira cosplay costume"), note: "Fastest option; most sets include the trousers and fur skirt." },
      { name: "Two jagged sword props", url: search("Inosuke swords cosplay"), note: "Inosuke chips his blades on purpose so they're serrated. Foam versions are safer at events." },
      { name: "Skin-tone muscle shirt (optional)", url: search("muscle suit shirt skin tone"), note: "For coverage and warmth. Inosuke is very muscular, so a padded one also helps the silhouette." },
      { name: "Zori sandals and tabi socks", url: search("zori sandals tabi socks"), note: "Flat sandals keep you mobile in the mask." },
    ],
    dressingGuide: [
      { itemName: "Body", steps: [
        "Muscle shirt on first if you're wearing one.",
        "Trousers, then the fur belt or skirt tied at the waist.",
        "Leg wraps from ankle to knee, then sandals.",
      ] },
      { itemName: "Mask and swords", steps: [
        "Swords through the belt, one on each hip or crossed at the back.",
        "Mask on last; take it off for drinks and photos of your face.",
      ] },
    ],
    about: [
      "Inosuke Hashibira is one of Tanjiro's companions in Demon Slayer. Raised by boars in the mountains, he is loud, competitive and calls himself the king of the mountain. He uses his self-taught Beast Breathing and two nichirin swords he deliberately chipped into jagged edges.",
      "Under the boar mask he has a surprisingly delicate face, a running joke in the series, so some cosplayers carry the mask and show their face for photos.",
    ],
    faqs: [
      { question: "Is Inosuke shirtless?", answer: "Yes. He wears only the uniform trousers, a fur pelt around his waist and leg wraps. A skin-tone or muscle shirt is a common substitute." },
      { question: "Why are Inosuke's swords jagged?", answer: "He chipped them himself with a rock to make them serrated, which suits his wild fighting style." },
      { question: "Can I see out of an Inosuke mask?", answer: "Through the eye or mouth openings, with limited side vision. Practise walking around in it before the event." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "mitsuri-kanroji-cosplay": {
    characterName: "Mitsuri Kanroji",
    updated: U,
    seoTitle: "Mitsuri Kanroji Cosplay: Pink & Green Braids, Uniform, Whip Sword",
    metaDescription:
      "A Mitsuri Kanroji cosplay needs pink-to-green braided hair, the open-front Hashira uniform, a short pleated skirt, green striped stockings, a white haori and a thin flexible sword. Wig and coverage tips.",
    h1Title: "Mitsuri Kanroji Cosplay Guide (Demon Slayer Love Hashira)",
    excerpt:
      "Mitsuri is long pink braids fading to green, an open-front black uniform, a short skirt, green striped stockings, a white haori and a whip-like pink sword.",
    intro: [
      "A Mitsuri Kanroji cosplay needs: a long pink wig fading to green at the tips in three thick braids, the black Hashira uniform with an open neckline, a short black pleated skirt, green striped thigh-high stockings, a white haori and a thin, flexible pink sword. The wig is the hardest and most important part; a pre-braided gradient wig saves hours.",
      "Many cosplayers wear a nude or black mesh top under the open uniform for coverage, which keeps the look accurate from a distance. Mitsuri pairs naturally with Obanai Iguro, or with Giyu as fellow Hashira.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate (gradient wig)" },
      { label: "Rough budget", value: "$70–$150" },
      { label: "Time to put on", value: "40 minutes" },
      { label: "What people recognise first", value: "Pink-to-green braided hair" },
    ],
    items: [
      { name: "Mitsuri cosplay set (uniform, skirt, haori)", url: search("Mitsuri Kanroji cosplay costume set"), note: "Fastest complete option. The haori should be white with no pattern." },
      { name: "Pre-braided pink-to-green Mitsuri wig", url: search("Mitsuri Kanroji wig braided"), note: "Three long braids, pink at the root fading to light green. Pre-braided saves a lot of work." },
      { name: "Green striped thigh-high stockings", url: search("green striped thigh high stockings"), note: "Light green with horizontal stripes." },
      { name: "Flexible whip sword prop", url: search("Mitsuri sword cosplay"), note: "Her blade is thin and bends like a ribbon. A pink-tinted foam or ribbon prop on a hilt works." },
      { name: "Nude or black mesh layering top", url: search("nude mesh long sleeve top"), note: "Optional coverage under the open neckline." },
      { name: "Green-tint contact lenses (optional)", url: search("green cosplay contact lenses"), note: "Her eyes are green; buy only from a seller that requires a prescription check." },
    ],
    dressingGuide: [
      { itemName: "Base", steps: [
        "Mesh top if using, then the uniform jacket, open at the neck.",
        "Skirt, then stockings, then boots or sandals.",
        "White haori last, worn open.",
      ] },
      { itemName: "Wig", steps: [
        "Wig cap, then the wig; bring the braids forward over the shoulders.",
        "Two small dots under the eyes with brown eyeliner for her moles.",
      ] },
    ],
    about: [
      "Mitsuri Kanroji is the Love Hashira in Demon Slayer: kind, emotional and extraordinarily strong thanks to unusually dense muscles. Her hair turned pink and green after she ate large amounts of sakura mochi as a child. She fights with Love Breathing and a thin, whip-like nichirin blade.",
      "She features heavily in the Swordsmith Village arc, where she fights the Upper Moon demon Hantengu alongside Tanjiro.",
    ],
    faqs: [
      { question: "Why is Mitsuri's hair pink and green?", answer: "In the series it changed colour after she ate a great deal of sakura mochi (cherry-blossom rice cakes) as a child." },
      { question: "How many braids does Mitsuri have?", answer: "Three thick braids, two in front over her shoulders and one at the back." },
      { question: "How do I make Mitsuri's uniform less revealing?", answer: "Wear a nude or black mesh top under the jacket and opaque tights under the striped stockings. From a few feet away it still reads as accurate." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "giyu-tomioka-costume": {
    characterName: "Giyu Tomioka",
    updated: U,
    seoTitle: "Giyu Tomioka Costume: Split Haori, Uniform & Wig (Demon Slayer)",
    metaDescription:
      "A Giyu Tomioka costume needs the split haori (plain maroon on one side, a geometric yellow-green-orange pattern on the other), the black Corps uniform, a messy black ponytail and a blue-bladed katana.",
    h1Title: "Giyu Tomioka Costume Guide (Demon Slayer Water Hashira)",
    excerpt:
      "Giyu is a two-pattern haori (solid maroon on one half, a yellow-green-orange geometric pattern on the other), the black uniform, a low messy ponytail and a blue blade.",
    intro: [
      "A Giyu Tomioka costume needs: his split haori, solid maroon on one half and a geometric yellow, green and orange pattern on the other, worn over the black Demon Slayer Corps uniform, plus a messy low black ponytail and a katana with a blue blade. The two-pattern haori is the whole costume; get that right and the rest is a standard uniform.",
      "Giyu is one of the easiest Hashira to cosplay because there's no gradient wig or complicated prop. He pairs with Tanjiro, whom he spares in the first episode, and Shinobu Kocho.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$45–$110" },
      { label: "Time to put on", value: "20 minutes" },
      { label: "What people recognise first", value: "The half-maroon, half-patterned haori" },
    ],
    items: [
      { name: "Giyu cosplay set (split haori, uniform, belt)", url: search("Giyu Tomioka cosplay costume set"), note: "Fastest option. Check the patterned half is yellow, green and orange, not just green." },
      { name: "Giyu wig (black, low messy ponytail)", url: search("Giyu Tomioka wig"), note: "Choppy fringe, low ponytail tied at the nape." },
      { name: "Blue-bladed katana prop", url: search("Giyu Tomioka sword cosplay"), note: "Water Breathing users have blue nichirin blades." },
      { name: "White leg wraps and tabi socks", url: search("white kyahan leg wraps tabi"), note: "Standard Corps leg wear." },
      { name: "Zori sandals", url: search("zori sandals men"), note: "Flat and comfortable." },
    ],
    dressingGuide: [
      { itemName: "Uniform", steps: [
        "Trousers into leg wraps, jacket closed, white belt.",
        "Haori over the top; match which half is maroon to your reference image.",
      ] },
      { itemName: "Hair and props", steps: [
        "Wig with the ponytail low at the nape, a few strands loose at the face.",
        "Sword on the left hip. Expression: blank and unbothered.",
      ] },
    ],
    about: [
      "Giyu Tomioka is the Water Hashira of the Demon Slayer Corps. He is the first slayer Tanjiro meets and the one who chooses not to kill Nezuko, sending Tanjiro to train with his own teacher, Urokodaki. Quiet and withdrawn, he invented Water Breathing's eleventh form, Dead Calm.",
      "His haori is made of two pieces: one from his late sister Tsutako's kimono and one from his friend Sabito's, which is why the halves don't match.",
    ],
    faqs: [
      { question: "Why is Giyu's haori two different patterns?", answer: "One half comes from his sister Tsutako's kimono and the other from his friend Sabito's. Both died, and he wears them in their memory." },
      { question: "What colour is Giyu's sword?", answer: "Blue, the colour of a Water Breathing nichirin blade." },
      { question: "Who should I pair Giyu with?", answer: "Tanjiro, or Shinobu Kocho, the Insect Hashira, who teases him that he is disliked by the other Hashira." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "jinx-cosplay-costume": {
    characterName: "Jinx",
    updated: U,
    seoTitle: "Jinx Cosplay (Arcane & League of Legends): Braids, Tattoos, Fishbones",
    metaDescription:
      "A Jinx cosplay needs two very long blue braids, pink cloud tattoos, a strappy crop top, striped trousers or stockings, belts and her shark rocket launcher, Fishbones. Arcane vs League looks and the fastest options.",
    h1Title: "Jinx Cosplay Guide (Arcane and League of Legends)",
    excerpt:
      "Jinx is two floor-length blue braids, pink-purple cloud tattoos, a strappy crop top, striped legwear, lots of belts and the shark-faced rocket launcher Fishbones.",
    intro: [
      "A Jinx cosplay needs: two extremely long blue braids, pink-purple cloud tattoos on the arm and torso, a strappy dark crop top, striped trousers or mismatched striped stockings, a jumble of belts and holsters, and a big prop, ideally Fishbones, her shark-faced rocket launcher. The braids are the signature; buy a wig that is already braided and at least waist-length.",
      "Decide between Arcane Jinx (darker clothes, cropped top, striped high-waisted trousers) and classic League of Legends Jinx (bikini-style top, one striped stocking, shorts). Arcane is the more popular choice since the series. Vi is the obvious partner costume.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate (wig and tattoos)" },
      { label: "Rough budget", value: "$70–$180" },
      { label: "Time to put on", value: "45 minutes including tattoos" },
      { label: "What people recognise first", value: "Floor-length blue braids" },
    ],
    items: [
      { name: "Jinx cosplay set (Arcane)", url: search("Jinx Arcane cosplay costume"), note: "Fastest complete option for the Arcane look: crop top, striped trousers and belts." },
      { name: "Pre-braided long blue Jinx wig", url: search("Jinx wig blue braids long"), note: "The most important piece. Longer is better; Arcane braids reach past the knees." },
      { name: "Pink cloud temporary tattoos", url: search("Jinx cloud tattoos temporary"), note: "Down the left arm and around the waist. Body paint works too." },
      { name: "Fishbones rocket launcher prop", url: search("Jinx Fishbones prop"), note: "The shark-faced launcher. Check size rules before taking it to a convention." },
      { name: "Pow-Pow minigun or Zapper pistol (alternative prop)", url: search("Jinx gun prop cosplay"), note: "Smaller and easier to carry all night." },
      { name: "Utility belts and holsters", url: search("cosplay utility belt holster set"), note: "Layer two or three, slung low." },
      { name: "Combat boots", url: search("women combat boots lace up"), note: "Brown or black, lace-up." },
    ],
    dressingGuide: [
      { itemName: "Tattoos first", steps: [
        "Apply cloud tattoos to clean, dry skin before dressing.",
        "Left arm, shoulder and around the stomach.",
      ] },
      { itemName: "Outfit", steps: [
        "Crop top, then trousers or shorts and stockings.",
        "Belts layered at the hips, holsters to the side.",
        "Boots last.",
      ] },
      { itemName: "Wig and prop", steps: [
        "Wig cap and wig; let the braids hang in front.",
        "Prop over the shoulder. Expression: manic grin.",
      ] },
    ],
    about: [
      "Jinx is a chaotic criminal from Zaun in Riot Games' League of Legends, and the central figure of the Netflix series Arcane, where her backstory as Powder, Vi's younger sister, is explored. She is known for her explosive weapons: Fishbones the rocket launcher, Pow-Pow the minigun and Zapper.",
      "Arcane changed how she is cosplayed: the darker, grittier outfit and the very long braids are now what most people picture.",
    ],
    faqs: [
      { question: "What is Jinx's rocket launcher called?", answer: "Fishbones. Her minigun is Pow-Pow and her pistol is Zapper." },
      { question: "How long are Jinx's braids?", answer: "Very long. In Arcane they hang well below her waist, close to the knees, so look for wigs at least 40 inches." },
      { question: "What's a good Jinx couples costume?", answer: "Vi, her sister, with pink hair and boxing gauntlets. Silco or Ekko also work." },
      { question: "What's the difference between Arcane and League Jinx?", answer: "Arcane Jinx wears darker, more covered clothes with striped trousers; League Jinx wears a bikini-style top, shorts and one striped stocking." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "tracer-cosplay": {
    characterName: "Tracer",
    updated: U,
    seoTitle: "Tracer Cosplay (Overwatch): Bomber Jacket, Chronal Accelerator, Goggles",
    metaDescription:
      "A Tracer cosplay needs a brown bomber jacket, orange leggings, the glowing blue chronal accelerator harness, yellow goggles, spiky brown hair and two pulse pistols. Fastest options and how to make the accelerator glow.",
    h1Title: "Tracer Cosplay Guide (Overwatch)",
    excerpt:
      "Tracer is a brown bomber jacket, orange leggings, a glowing blue disc on her chest, yellow goggles, short spiky brown hair and two pistols.",
    intro: [
      "A Tracer cosplay needs: a brown leather bomber jacket, orange or yellow-orange leggings, white-and-orange trainers, the glowing blue chronal accelerator harnessed to her chest, yellow-tinted goggles, short spiky brown hair and two pulse pistols. The glowing accelerator is what makes it Tracer rather than a pilot; a cheap LED puck behind a blue disc does the job.",
      "Tracer is one of the most comfortable game costumes to wear for a whole night, and the default skin is the one to do. Pair with Widowmaker for a rivalry or Emily for a couple.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy to moderate" },
      { label: "Rough budget", value: "$70–$150" },
      { label: "Time to put on", value: "20 minutes" },
      { label: "What people recognise first", value: "The glowing blue chest disc" },
    ],
    items: [
      { name: "Tracer cosplay set", url: search("Tracer Overwatch cosplay costume"), note: "Fastest option; usually includes jacket, leggings and a printed or foam accelerator." },
      { name: "Brown leather bomber jacket", url: search("brown faux leather bomber jacket women"), note: "If you're building it: short, cropped at the waist, with a lighter collar." },
      { name: "Orange leggings", url: search("orange leggings women"), note: "Yellow-orange, matte." },
      { name: "Chronal accelerator prop", url: search("Tracer chronal accelerator prop"), note: "Or a blue LED puck light behind a clear disc, on a harness." },
      { name: "Yellow-tinted goggles", url: search("yellow lens goggles cosplay"), note: "Worn over the eyes, not on the forehead." },
      { name: "Short spiky brown wig", url: search("Tracer wig"), note: "Spiky pixie cut." },
      { name: "Twin pulse pistol props", url: search("Tracer pulse pistols prop"), note: "Two compact blasters." },
      { name: "White and orange trainers", url: search("white orange sneakers"), note: "Chunky, sporty." },
    ],
    dressingGuide: [
      { itemName: "Base", steps: [
        "Leggings and trainers; white top if your jacket needs one under it.",
        "Harness on, accelerator centred on the chest.",
        "Jacket over the harness, open so the disc shows.",
      ] },
      { itemName: "Finish", steps: [
        "Wig, then goggles over the eyes.",
        "Switch on the accelerator light. 'Cheers, love! The cavalry's here!'",
      ] },
    ],
    about: [
      "Tracer, Lena Oxton, is a British pilot and the poster hero of Blizzard's Overwatch. An accident during a test flight left her 'chronally disassociated'; the chronal accelerator on her chest keeps her anchored in the present and lets her blink through time.",
      "She is fast, cheerful and one of the most cosplayed Overwatch characters, so the default look is instantly recognised by gamers.",
    ],
    faqs: [
      { question: "What is the thing on Tracer's chest?", answer: "The chronal accelerator. It keeps her in the present after her time accident and powers her blink and recall abilities." },
      { question: "How do I make the chronal accelerator glow?", answer: "Use a battery-powered blue LED puck light behind a frosted plastic disc, mounted on a harness or strap." },
      { question: "What's a good Overwatch couples costume with Tracer?", answer: "Widowmaker for rivals, or Emily, Tracer's girlfriend, for something less expected." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "link-cosplay": {
    characterName: "Link",
    updated: U,
    seoTitle: "Link Cosplay (Zelda): Green Tunic or Champion's Tunic, Sword & Shield",
    metaDescription:
      "A Link cosplay needs either the classic green tunic and cap or the blue Champion's Tunic from Breath of the Wild, plus pointed ears, the Master Sword and a Hylian Shield. Which version to choose and the fastest options.",
    h1Title: "Link Cosplay Guide (The Legend of Zelda)",
    excerpt:
      "Link is either the classic green tunic and long pointed cap, or the blue Champion's Tunic from Breath of the Wild, plus elf ears, the Master Sword and the Hylian Shield.",
    intro: [
      "A Link cosplay needs: either the classic green tunic and long pointed cap over a white undershirt, or the blue Champion's Tunic from Breath of the Wild and Tears of the Kingdom; then pointed elf ears, brown boots, brown gauntlets, the Master Sword and the Hylian Shield. The green cap version is recognised by everyone; the blue tunic version is recognised by gamers and looks more modern.",
      "Choose your Link first: classic (Ocarina of Time, Twilight Princess) or Breath of the Wild. Then buy the shield; a good Hylian Shield sells the costume more than anything else. Princess Zelda is the natural partner.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy to moderate" },
      { label: "Rough budget", value: "$60–$160" },
      { label: "Time to put on", value: "25 minutes" },
      { label: "What people recognise first", value: "Green cap and tunic, or the Hylian Shield" },
    ],
    items: [
      { name: "Classic Link costume (green tunic and cap)", url: search("Link costume adult green tunic hat"), note: "Fastest option for the classic look. Look for a matte green tunic and a separate long cap." },
      { name: "Breath of the Wild Champion's Tunic set", url: search("Link Breath of the Wild champion tunic cosplay"), note: "The blue tunic with white Sheikah patterns, worn with brown trousers." },
      { name: "Hylian Shield prop", url: search("Hylian Shield prop"), note: "Blue with the red bird crest and gold Triforce. The single most recognisable prop." },
      { name: "Master Sword prop", url: search("Master Sword prop foam"), note: "Purple-blue hilt and the Triforce on the blade. Foam for events." },
      { name: "Elf ears", url: search("elf ears prosthetic cosplay"), note: "Pick ones close to your skin tone." },
      { name: "Blond wig (optional)", url: search("Link wig blond"), note: "Shoulder-length with a fringe; BotW Link has a small ponytail." },
      { name: "Brown boots and gauntlets", url: search("brown medieval boots gauntlets"), note: "Knee-high boots, fingerless gauntlets." },
    ],
    dressingGuide: [
      { itemName: "Classic Link", steps: [
        "White long-sleeve top and white or cream leggings.",
        "Green tunic over the top, brown belt, boots, gauntlets.",
        "Cap last, the long point falling behind.",
      ] },
      { itemName: "Breath of the Wild Link", steps: [
        "Brown trousers, boots, then the blue Champion's Tunic.",
        "Belt, gauntlets and the shield on your back.",
        "Wig tied back in a short ponytail.",
      ] },
      { itemName: "Finish", steps: [
        "Ears on; blend the edge with a little foundation.",
        "Sword on the back or left hip (Link is often left-handed in the older games).",
      ] },
    ],
    about: [
      "Link is the hero of Nintendo's The Legend of Zelda series, a silent swordsman who reappears in each era to defeat Ganon and protect Princess Zelda and Hyrule. A common mix-up is calling him 'Zelda'; Zelda is the princess.",
      "His green tunic and cap date back to the original 1986 game. Breath of the Wild (2017) gave him the blue Champion's Tunic, now just as iconic for younger players.",
    ],
    faqs: [
      { question: "Is Link's name Zelda?", answer: "No. Link is the hero; Zelda is the princess. It's one of gaming's most famous mix-ups." },
      { question: "Which Link costume is most recognisable?", answer: "The green tunic and long pointed cap. Non-gamers know it; gamers will also recognise the blue Champion's Tunic." },
      { question: "What's a good Zelda couples costume?", answer: "Link and Princess Zelda, matched to the same game, such as both from Breath of the Wild." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "harley-quinn-cosplay": {
    characterName: "Harley Quinn",
    updated: U,
    seoTitle: "Harley Quinn Costume: Suicide Squad Look, Pigtails & Bat",
    metaDescription:
      "The classic Harley Quinn costume (Suicide Squad, 2016) needs a 'Daddy's Lil Monster' T-shirt, red-and-blue shorts, a satin bomber jacket, blonde pigtails with pink and blue tips, fishnets and a baseball bat. Plus the jester and Birds of Prey versions.",
    h1Title: "Harley Quinn Costume Guide (Suicide Squad, Classic & Birds of Prey)",
    excerpt:
      "The Suicide Squad Harley is a 'Daddy's Lil Monster' tee, red-and-blue shorts, a satin jacket, blonde pigtails dipped pink and blue, fishnets and a bat.",
    intro: [
      "The most recognisable Harley Quinn costume, from Suicide Squad (2016), needs: a ripped 'Daddy's Lil Monster' T-shirt, red-and-blue sequin or satin shorts, a red-and-blue satin bomber jacket, blonde pigtails with pink and blue dip-dyed ends, fishnet tights, a choker and a baseball bat. The pigtails and the two-colour scheme are what people spot first.",
      "Two other versions are worth knowing: the classic red-and-black jester suit from Batman: The Animated Series, and the Birds of Prey (2020) look with a caution-tape jacket. Pick one and commit; mixing them looks unfinished. The Joker is the obvious partner.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$50–$120" },
      { label: "Time to put on", value: "30 minutes including makeup" },
      { label: "What people recognise first", value: "Pink-and-blue dipped pigtails" },
    ],
    items: [
      { name: "Harley Quinn Suicide Squad costume set", url: search("Harley Quinn Suicide Squad costume adult"), note: "Fastest complete option: tee, shorts, jacket and often the fishnets." },
      { name: "Harley Quinn pigtail wig (pink and blue tips)", url: search("Harley Quinn wig pigtails pink blue"), note: "Blonde pigtails, one dipped pink and one blue." },
      { name: "Baseball bat prop", url: search("Harley Quinn bat prop"), note: "Hers says 'Good Night'. Foam or plastic for events." },
      { name: "Fishnet tights", url: search("fishnet tights"), note: "Ripped or layered." },
      { name: "Temporary tattoos (heart, 'Rotten')", url: search("Harley Quinn face tattoos"), note: "A small heart under the eye and 'Rotten' on the cheek." },
      { name: "Classic jester suit (alternative)", url: search("Harley Quinn classic jester costume"), note: "Red and black diamonds, two-pointed jester hood, white face." },
      { name: "Black ankle boots", url: search("black ankle boots women"), note: "Chunky heel or platform." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Fishnets, shorts, then the tee (knotted or ripped).",
        "Jacket on, boots last.",
      ] },
      { itemName: "Hair and makeup", steps: [
        "Wig with pigtails high on the head.",
        "Smudged eyeliner with pink and blue shadow, red lips, face tattoos.",
      ] },
    ],
    about: [
      "Harley Quinn, Dr. Harleen Quinzel, was created for Batman: The Animated Series in 1992 and became one of DC's most popular characters. A former Arkham psychiatrist who fell for the Joker, she later became an anti-hero in her own right.",
      "Margot Robbie's version in Suicide Squad (2016), Birds of Prey (2020) and The Suicide Squad (2021) made the pigtails-and-tee look one of the most worn Halloween costumes of the decade.",
    ],
    faqs: [
      { question: "What does Harley Quinn's shirt say?", answer: "In Suicide Squad (2016) it reads 'Daddy's Lil Monster'. Her jacket says 'Property of Joker' on the back." },
      { question: "What does Harley Quinn's bat say?", answer: "'Good Night', on the bat she carries in Suicide Squad." },
      { question: "What colour are Harley Quinn's pigtails?", answer: "Blonde, one dipped pink and one dipped blue." },
      { question: "What's a good Harley Quinn couples costume?", answer: "The Joker, matched to the same version: Jared Leto's Joker for Suicide Squad, the purple suit for the classic jester Harley." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "deadpool-cosplay": {
    characterName: "Deadpool",
    updated: U,
    seoTitle: "Deadpool Costume: Suit, Mask, Twin Katanas & Belt",
    metaDescription:
      "A Deadpool costume needs a red suit with black side panels, the red-and-black mask with white eyes, two katanas on the back, a belt with the Deadpool buckle and pouches. Fastest options and fit tips.",
    h1Title: "Deadpool Costume Guide (Marvel)",
    excerpt:
      "Deadpool is a red suit with black panels, a red mask with black eye patches and white eyes, two katanas crossed on his back and a belt with his logo buckle.",
    intro: [
      "A Deadpool costume needs: a red bodysuit with black side panels, the red-and-black mask with white eye lenses, two katanas crossed on the back, a belt with the round Deadpool logo buckle and a few pouches and holsters. The mask is the face of the costume; get a structured one rather than a thin fabric hood.",
      "A good Deadpool doesn't need to be screen-accurate; the character jokes about his own suit. Buy the suit, upgrade the mask and swords, and add a prop like a chimichanga or a unicorn plush. Wolverine is the natural partner since Deadpool & Wolverine.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$60–$160" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "The red-and-black mask with white eyes" },
    ],
    items: [
      { name: "Deadpool costume (suit and mask)", url: search("Deadpool costume adult"), note: "Fastest complete option. Size up: printed suits run tight." },
      { name: "Upgraded Deadpool mask", url: search("Deadpool mask with lenses"), note: "A structured mask with built-in face shell and lenses looks far better than a printed hood." },
      { name: "Twin katana props with back harness", url: search("Deadpool katanas back sheath"), note: "Crossed in an X on the back." },
      { name: "Deadpool belt with logo buckle", url: search("Deadpool belt buckle"), note: "Round red-and-black buckle with pouches." },
      { name: "Thigh holsters and pouches", url: search("tactical thigh holster cosplay"), note: "Adds bulk and realism." },
      { name: "Black combat boots", url: search("black combat boots men"), note: "Worn over or under the suit legs." },
    ],
    dressingGuide: [
      { itemName: "Suit", steps: [
        "Suit on; smooth the seams so panels line up.",
        "Boots, belt and thigh holsters.",
        "Katana harness on, swords crossed behind.",
      ] },
      { itemName: "Mask", steps: [
        "Mask last. Practise walking with lenses in before the event.",
      ] },
    ],
    about: [
      "Deadpool, Wade Wilson, is a Marvel anti-hero created by Rob Liefeld and Fabian Nicieza in 1991. A mercenary with a healing factor and no filter, he is famous for breaking the fourth wall. Ryan Reynolds plays him in Deadpool (2016), Deadpool 2 (2018) and Deadpool & Wolverine (2024).",
      "His red suit is, in his own joke, so the bad guys can't see him bleed.",
    ],
    faqs: [
      { question: "Why is Deadpool's suit red?", answer: "So nobody can see him bleed, as he explains in the first film." },
      { question: "How many swords does Deadpool carry?", answer: "Two katanas, crossed on his back." },
      { question: "What's a good Deadpool couples costume?", answer: "Wolverine in the yellow-and-blue suit, from Deadpool & Wolverine, or Lady Deadpool." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "homelander-cosplay": {
    characterName: "Homelander",
    updated: U,
    seoTitle: "Homelander Costume (The Boys): Flag Cape, Eagle Shoulders & Suit",
    metaDescription:
      "A Homelander costume needs a navy blue suit, an American flag cape, gold eagle shoulder pieces, a gold belt, side-parted blond hair and a glass of milk. Fastest set and how to wear the cape.",
    h1Title: "Homelander Costume Guide (The Boys)",
    excerpt:
      "Homelander is a navy blue suit, an American flag cape, gold eagle shoulder pieces, a gold belt, slicked blond hair and, ideally, a glass of milk.",
    intro: [
      "A Homelander costume needs: a navy blue textured suit, an American flag cape, gold eagle epaulettes on the shoulders, a gold belt, short side-parted blond hair and a menacing half-smile. The flag cape and the gold eagles are what make it Homelander rather than a generic superhero.",
      "A carton or glass of milk is the prop fans love. Starlight and The Deep (see our The Deep guide) make strong group costumes with The Seven.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$60–$150" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Flag cape with gold eagle shoulders" },
    ],
    items: [
      { name: "Homelander costume set (suit, cape, eagle shoulders)", url: search("Homelander costume adult"), note: "Fastest option. Check the eagles are 3D and gold, not just printed." },
      { name: "American flag cape (if upgrading)", url: search("American flag cape costume"), note: "Long, stars on the upper section, stripes below." },
      { name: "Gold eagle shoulder pieces", url: search("Homelander shoulder eagles"), note: "Upgrade these first if your set's look flat." },
      { name: "Short blond wig or hair spray", url: search("short blond wig men side part"), note: "Neat side parting, slicked." },
      { name: "Glass of milk or milk carton prop", url: search("fake milk glass prop"), note: "The fan-favourite in-joke from the show." },
      { name: "Navy boots", url: search("navy blue boots men costume"), note: "Or boot covers." },
    ],
    dressingGuide: [
      { itemName: "Suit and cape", steps: [
        "Suit on, belt at the waist, boots.",
        "Fasten the eagles to the shoulders, then hang the cape from them.",
      ] },
      { itemName: "Hair and attitude", steps: [
        "Neat side parting with a little gel.",
        "Smile with your mouth, never your eyes.",
      ] },
    ],
    about: [
      "Homelander, played by Antony Starr, is the leader of The Seven in Amazon's The Boys. Marketed by Vought as America's greatest hero, he is in reality an unstable, narcissistic superman with Superman-level powers.",
      "His costume deliberately mimics patriotic superhero design, and his habit of drinking milk became one of the show's most memorable motifs.",
    ],
    faqs: [
      { question: "Why does Homelander drink milk?", answer: "The show links it to his upbringing in a Vought lab and his longing for a mother figure. It became one of the series' best-known visual motifs." },
      { question: "What's on Homelander's shoulders?", answer: "Gold eagle epaulettes that hold up his American flag cape." },
      { question: "What's a good The Boys group costume?", answer: "Homelander, Starlight, Queen Maeve, The Deep and A-Train from The Seven, or Butcher and Hughie." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "thanos-cosplay": {
    characterName: "Thanos",
    updated: U,
    seoTitle: "Thanos Costume: Infinity Gauntlet, Purple Skin & Armor",
    metaDescription:
      "A Thanos costume needs purple skin (mask or makeup) with chin ridges, gold armor or a dark tactical outfit, and the Infinity Gauntlet on the left hand with six stones. Fastest options for Infinity War and Endgame.",
    h1Title: "Thanos Costume Guide (Avengers: Infinity War and Endgame)",
    excerpt:
      "Thanos is purple skin with ridged chin, gold armor (Endgame) or dark tactical gear (Infinity War), and the Infinity Gauntlet on his left hand.",
    intro: [
      "A Thanos costume needs: purple skin with a ridged chin, either the gold armor and helmet from Avengers: Endgame or the dark blue-grey tactical outfit from Infinity War, and the Infinity Gauntlet worn on the left hand with all six stones. The gauntlet is the costume; a good one is worth more than the rest put together.",
      "For skin, a full latex mask is the fastest and least messy route; purple face paint looks great in photos but takes an hour. A muscle suit under the armor helps with his bulk.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate" },
      { label: "Rough budget", value: "$80–$200" },
      { label: "Time to put on", value: "20 minutes with mask, 75 with paint" },
      { label: "What people recognise first", value: "The Infinity Gauntlet" },
    ],
    items: [
      { name: "Thanos costume set (armor suit)", url: search("Thanos costume adult"), note: "Fastest complete option. Choose Endgame (gold armor) or Infinity War (dark tactical)." },
      { name: "Infinity Gauntlet", url: search("Infinity Gauntlet adult wearable"), note: "Wearable, with light-up stones if possible. Worn on the left hand." },
      { name: "Thanos latex mask", url: search("Thanos mask latex adult"), note: "Includes the chin ridges. Fastest route to purple skin." },
      { name: "Purple face and body paint (alternative)", url: search("purple face paint water activated"), note: "Water-activated paint applies evenly; seal with setting spray." },
      { name: "Thanos helmet (Endgame)", url: search("Thanos helmet"), note: "Gold, with the side fins." },
      { name: "Muscle suit", url: search("muscle suit costume"), note: "Adds bulk under the armor." },
    ],
    dressingGuide: [
      { itemName: "Body", steps: [
        "Muscle suit, then the costume or armor.",
        "Paint any visible skin purple, or wear purple gloves on the right hand.",
      ] },
      { itemName: "Head and gauntlet", steps: [
        "Mask or face paint, then the helmet for Endgame.",
        "Gauntlet on the left hand. Snap at your own risk.",
      ] },
    ],
    about: [
      "Thanos, played by Josh Brolin via motion capture, is the Mad Titan of the Marvel Cinematic Universe. In Avengers: Infinity War (2018) he gathers all six Infinity Stones and wipes out half of all life with a snap; in Endgame (2019) he returns in full armor for the final battle.",
      "He was created by Jim Starlin for Marvel Comics in 1973.",
    ],
    faqs: [
      { question: "Which hand is Thanos's Infinity Gauntlet on?", answer: "The left hand in the films." },
      { question: "What are the six Infinity Stones?", answer: "Space (blue), Mind (yellow), Reality (red), Power (purple), Time (green) and Soul (orange)." },
      { question: "Should I use a mask or paint for Thanos?", answer: "A latex mask if you want to be done in minutes and stay comfortable; paint for the best photos and full facial expression." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "jon-snow-costume": {
    characterName: "Jon Snow",
    updated: U,
    seoTitle: "Jon Snow Costume: Night's Watch Fur Cloak, Longclaw & Curls",
    metaDescription:
      "A Jon Snow costume needs a black Night's Watch outfit, a fur-shouldered cloak, a wolf-pommel sword (Longclaw), dark curly hair and a short beard. Fastest set, the fur-cloak trick and the Ygritte pairing.",
    h1Title: "Jon Snow Costume Guide (Game of Thrones)",
    excerpt:
      "Jon Snow is all black: a leather jerkin and trousers, a big fur-shouldered cloak, Longclaw with its wolf-head pommel, dark curls and a short beard.",
    intro: [
      "A Jon Snow costume needs: black Night's Watch clothes (a padded leather jerkin, trousers and boots), a heavy black cloak with a thick fur mantle over the shoulders, the sword Longclaw with its white wolf-head pommel, dark curly shoulder-length hair and a short beard. The fur cloak does 80% of the work.",
      "The show's capes were famously made from IKEA sheepskin rugs, so a faux sheepskin rug over a black cloak is both cheap and screen-accurate. Ygritte (see our Ygritte guide) and Daenerys are the classic partners; a Ghost plush on a lead adds a direwolf.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$60–$140" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Black outfit with a fur-shouldered cloak" },
    ],
    items: [
      { name: "Jon Snow costume set (tunic and fur cloak)", url: search("Jon Snow costume adult cloak"), note: "Fastest option. Check the fur is chunky and the cloak is matte black." },
      { name: "Faux sheepskin rug for the mantle (DIY upgrade)", url: search("faux sheepskin rug grey"), note: "Drape over the shoulders and pin to a black cloak; it's how the show did it." },
      { name: "Longclaw sword prop", url: search("Longclaw sword"), note: "White wolf-head pommel. Foam versions are convention-friendly." },
      { name: "Black leather jerkin or padded tunic", url: search("black leather jerkin medieval men"), note: "If building the costume yourself." },
      { name: "Curly dark wig", url: search("Jon Snow wig curly"), note: "Shoulder-length dark curls, half tied back." },
      { name: "Short dark beard", url: search("short dark beard fake"), note: "Or a few days' growth." },
      { name: "Black knee-high boots", url: search("black knee high boots men"), note: "Matte, a little worn." },
    ],
    dressingGuide: [
      { itemName: "Base", steps: [
        "Black trousers and a dark shirt, then the jerkin.",
        "Belt, sword on the left hip, boots.",
      ] },
      { itemName: "Cloak", steps: [
        "Cloak fastened at the throat, fur mantle over the shoulders.",
        "Hair half tied back, beard on. Look brooding.",
      ] },
    ],
    about: [
      "Jon Snow, played by Kit Harington, is raised as Ned Stark's illegitimate son and joins the Night's Watch, rising to Lord Commander and later King in the North. Season seven reveals he is actually Aegon Targaryen, son of Lyanna Stark and Rhaegar Targaryen.",
      "His sword Longclaw is Valyrian steel, given to him by Lord Commander Mormont, who had the pommel reworked into a wolf's head for him.",
    ],
    faqs: [
      { question: "What was Jon Snow's cloak made of?", answer: "The show's costume designer, Michele Clapton, used IKEA sheepskin rugs for the Night's Watch capes, cut and shaved." },
      { question: "What is Jon Snow's sword called?", answer: "Longclaw, a Valyrian steel bastard sword with a wolf-head pommel." },
      { question: "What's a good Jon Snow couples costume?", answer: "Ygritte, the Free Folk spearwife, or Daenerys Targaryen in her white winter coat." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "daenerys-targaryen-cosplay": {
    characterName: "Daenerys Targaryen",
    updated: U,
    seoTitle: "Daenerys Targaryen Costume: Silver Braids, Blue or White Gown & Dragon",
    metaDescription:
      "A Daenerys costume needs long platinum hair with braids, a dragon prop and one of her signature outfits: the blue Qarth dress, the white winter coat or the dark Dragonstone gown. Fastest options for each era.",
    h1Title: "Daenerys Targaryen Costume Guide (Game of Thrones)",
    excerpt:
      "Daenerys is long platinum hair in Dothraki-style braids, a dragon on the shoulder and one of her signature gowns: the blue Qarth dress, the white winter coat or the dark Dragonstone look.",
    intro: [
      "A Daenerys Targaryen costume needs: long platinum-blonde hair with braids pinned at the back, a small dragon prop on the shoulder and one of her signature outfits. The three best-known are the light blue draped dress from Qarth (season two), the white fur-trimmed winter coat (season seven, beyond the Wall) and the dark grey-and-red Dragonstone gown with the three-headed dragon chain.",
      "The wig is the costume; a cheap blonde wig looks yellow next to Emilia Clarke's silvery hair, so pick one described as platinum or silver-white. Jon Snow is the natural partner.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate (braided wig)" },
      { label: "Rough budget", value: "$60–$160" },
      { label: "Time to put on", value: "30 minutes" },
      { label: "What people recognise first", value: "Platinum braided hair and a dragon" },
    ],
    items: [
      { name: "Daenerys wig (platinum, pre-braided)", url: search("Daenerys Targaryen wig braids"), note: "Silvery platinum, long, with the braided crown at the back." },
      { name: "Blue Qarth-style draped dress", url: search("Daenerys blue dress costume"), note: "Light blue, draped, one-shoulder or V-neck with a belt." },
      { name: "White winter coat (season 7)", url: search("Daenerys white coat costume"), note: "Long white coat with fur collar. The most elegant option." },
      { name: "Small dragon shoulder prop", url: search("dragon shoulder prop costume"), note: "Drogon is black and red; Viserion cream and gold; Rhaegal green and bronze." },
      { name: "Three-headed dragon chain or brooch", url: search("Targaryen dragon necklace brooch"), note: "Worn across the chest on the Dragonstone gown." },
      { name: "Flat boots or sandals", url: search("women flat boots brown"), note: "Mostly hidden under the dress." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Dress or coat on; belt at the waist for the blue dress.",
        "Chain or brooch on, if your look has one.",
      ] },
      { itemName: "Hair and dragon", steps: [
        "Wig cap, then the wig; check braids sit at the back of the head.",
        "Dragon on the shoulder, clipped to the dress strap.",
      ] },
    ],
    about: [
      "Daenerys Targaryen, played by Emilia Clarke, is the exiled last daughter of the Targaryen dynasty: Mother of Dragons, Breaker of Chains and claimant to the Iron Throne. Her three dragons are Drogon, Rhaegal and Viserion.",
      "Her costumes, designed by Michele Clapton, change with each stage of her rise, from Dothraki leather to Meereen's blues and Dragonstone's dark, armored gowns, so it's worth picking a season before you shop.",
    ],
    faqs: [
      { question: "What are the names of Daenerys's dragons?", answer: "Drogon (black and red), Rhaegal (green and bronze) and Viserion (cream and gold)." },
      { question: "What is Daenerys's most iconic outfit?", answer: "The white fur-collared winter coat from season seven and the blue Qarth dress from season two are the most recognised." },
      { question: "How do I make a Daenerys wig look right?", answer: "Choose platinum or silver-white rather than golden blonde, and look for a wig with braids that loop and pin at the back of the head." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "night-king-costume": {
    characterName: "The Night King",
    updated: U,
    seoTitle: "Night King Costume: Ice Crown Mask, Armor & Ice Spear (Game of Thrones)",
    metaDescription:
      "A Night King costume needs a mask or makeup with icy grey-blue skin and the horned crown of spikes, glowing blue eyes, dark armor and rags, and an ice spear. Fastest options and how to make the eyes glow.",
    h1Title: "Night King Costume Guide (Game of Thrones)",
    excerpt:
      "The Night King is grey-blue skin with a crown of ice spikes, piercing blue eyes, dark armor under ragged cloth and an ice spear.",
    intro: [
      "A Night King costume needs: a full-head mask (or prosthetic and paint) with grey-blue skin and the crown of short ice horns, piercing blue eyes, dark tattered armor and an ice spear. A good latex mask with the horns already sculpted is the fastest way to look right.",
      "Blue cosplay contact lenses finish the look but are optional; the mask alone is recognisable. Group him with White Walkers, or pair with Jon Snow or Arya Stark (who kills him).",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy with a mask" },
      { label: "Rough budget", value: "$60–$140" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "The horned ice-crown head" },
    ],
    items: [
      { name: "Night King latex mask", url: search("Night King mask latex"), note: "Fastest complete head look, with the crown of spikes built in." },
      { name: "Night King costume set (armor and robe)", url: search("Night King costume adult"), note: "Dark, layered armor with ragged cloth." },
      { name: "Ice spear prop", url: search("ice spear prop costume"), note: "He throws one to bring down Viserion." },
      { name: "Blue cosplay contact lenses (optional)", url: search("blue cosplay contacts"), note: "Buy only from a seller that checks prescriptions." },
      { name: "Grey-blue body paint (for hands)", url: search("grey blue body paint"), note: "Or grey gloves." },
    ],
    dressingGuide: [
      { itemName: "Costume", steps: [
        "Armor and robe on; tear the hem a little more if it's too neat.",
        "Paint the hands or wear grey gloves.",
      ] },
      { itemName: "Head", steps: [
        "Mask on, eye holes lined up. Walk slowly; he never hurries.",
      ] },
    ],
    about: [
      "The Night King is the leader of the White Walkers and the army of the dead in Game of Thrones. The show reveals he was a First Man turned by the Children of the Forest with dragonglass to fight humanity. He kills and raises the dragon Viserion in season seven and is killed by Arya Stark in the Battle of Winterfell.",
      "He was played by Richard Brake in seasons four and five, and by Vladimír Furdík from season six.",
    ],
    faqs: [
      { question: "Who played the Night King?", answer: "Richard Brake in seasons four and five, and Vladimír Furdík from season six to the end." },
      { question: "Who kills the Night King?", answer: "Arya Stark, with a Valyrian steel dagger in the Battle of Winterfell (season eight, episode three)." },
      { question: "Is the Night King in the books?", answer: "Not as such. The books mention a legendary Night's King, a Lord Commander of the Night's Watch, but the show's leader of the White Walkers is a show creation." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "anakin-cosplay": {
    characterName: "Anakin Skywalker",
    updated: U,
    seoTitle: "Anakin Skywalker Costume: Dark Jedi Robes, Glove & Lightsaber",
    metaDescription:
      "An Anakin Skywalker costume (Revenge of the Sith) needs dark brown and black Jedi tunics and tabards, a black leather glove on the right hand, a dark robe, a blue lightsaber and the scar over the right eye.",
    h1Title: "Anakin Skywalker Costume Guide (Star Wars Prequels)",
    excerpt:
      "Revenge of the Sith Anakin is dark brown and black layered Jedi tunics, a black glove on his mechanical right hand, a dark brown robe, a blue lightsaber and a scar over the right eye.",
    intro: [
      "An Anakin Skywalker costume, from Revenge of the Sith, needs: layered Jedi tunics and tabards in dark brown and black, a wide leather obi belt, a black leather glove on the right hand (his mechanical arm), tall black boots, a dark brown hooded robe, a blue lightsaber and a thin scar over the right eye. The darker colours are what separate Anakin from every other Jedi.",
      "For Attack of the Clones, swap to a shorter haircut with a Padawan braid and the same dark tunics. Padmé and Obi-Wan are the obvious partners.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy to moderate" },
      { label: "Rough budget", value: "$70–$170" },
      { label: "Time to put on", value: "20 minutes" },
      { label: "What people recognise first", value: "Dark Jedi robes with a blue lightsaber" },
    ],
    items: [
      { name: "Anakin Skywalker Jedi costume set", url: search("Anakin Skywalker costume adult Revenge of the Sith"), note: "Fastest complete option. Look for dark brown and black, not tan." },
      { name: "Dark brown Jedi robe", url: search("dark brown Jedi robe adult"), note: "Hooded, wide sleeves, matte fabric." },
      { name: "Blue lightsaber", url: search("Anakin Skywalker lightsaber"), note: "His hilt has a black grip with ridges; any blue saber works." },
      { name: "Black leather glove (right hand)", url: search("black leather glove long cuff"), note: "One glove only, on the right." },
      { name: "Shoulder-length brown wig", url: search("Anakin Skywalker wig"), note: "Wavy, shoulder length for Revenge of the Sith." },
      { name: "Tall black boots", url: search("black riding boots men"), note: "Knee-high, plain." },
    ],
    dressingGuide: [
      { itemName: "Tunics", steps: [
        "Inner tunic, then outer tunic and tabards hanging front and back.",
        "Obi and belt at the waist; saber on the belt.",
      ] },
      { itemName: "Finish", steps: [
        "Boots, glove on the right hand, robe over the top.",
        "Wig, then a thin scar drawn vertically through the right eyebrow with brown liner.",
      ] },
    ],
    about: [
      "Anakin Skywalker is the Jedi Knight who becomes Darth Vader, played by Hayden Christensen in Attack of the Clones (2002) and Revenge of the Sith (2005), and later in Obi-Wan Kenobi and Ahsoka. He loses his right arm to Count Dooku at the end of Attack of the Clones and wears a mechanical replacement, usually covered with a black glove.",
      "His dark Jedi clothing was designed to foreshadow his fall to the dark side.",
    ],
    faqs: [
      { question: "Which arm does Anakin lose?", answer: "His right arm, cut off by Count Dooku at the end of Attack of the Clones. He wears a black glove over the mechanical hand." },
      { question: "What colour is Anakin's lightsaber?", answer: "Blue." },
      { question: "Which eye is Anakin's scar over?", answer: "His right eye, a thin vertical scar he gets before Revenge of the Sith." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "captain-hook-costume": {
    characterName: "Captain Hook",
    updated: U,
    seoTitle: "Captain Hook Costume: Red Coat, Plumed Hat, Hook & Curls",
    metaDescription:
      "A Disney Captain Hook costume needs a long red coat with gold trim, a wide plumed hat, a lace jabot, black curly hair, a thin moustache and the hook on the left hand. Fastest options and the Peter Pan group.",
    h1Title: "Captain Hook Costume Guide (Peter Pan)",
    excerpt:
      "Disney's Captain Hook is a long red coat with gold trim, a wide plumed hat, a lace jabot, long black curls, a thin curled moustache and the hook on his left hand.",
    intro: [
      "A Captain Hook costume needs: a long red frock coat with gold trim and buttons, a wide-brimmed hat with a large feather, a white lace jabot at the neck, long black ringlet curls, a thin curled moustache, black boots and the silver hook on the left hand. The hook and the red coat are what people recognise.",
      "This guide follows the 1953 Disney animated Hook, the most recognised version. Our Peter Pan, Mr. Smee and Wendy Darling guides let you build the full group; a ticking crocodile plush is the finishing joke.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$55–$140" },
      { label: "Time to put on", value: "20 minutes" },
      { label: "What people recognise first", value: "Red coat and the hook" },
    ],
    items: [
      { name: "Captain Hook costume set (coat, hat, jabot)", url: search("Captain Hook costume adult"), note: "Fastest option. Look for a red coat that reaches mid-calf." },
      { name: "Hook hand prop", url: search("Captain Hook hook hand prop"), note: "Silver hook in a cup that hides your hand. Wear on the left." },
      { name: "Long black curly wig", url: search("Captain Hook wig black curly"), note: "Shoulder-length ringlets." },
      { name: "Curled moustache", url: search("pirate moustache curled"), note: "Thin, waxed tips." },
      { name: "Wide-brimmed plumed hat (upgrade)", url: search("pirate hat large feather plume"), note: "If your set's hat is small." },
      { name: "Black knee boots", url: search("black pirate boots men"), note: "Or boot covers." },
      { name: "Crocodile plush (optional)", url: search("crocodile plush"), note: "For Tick-Tock the crocodile." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "White shirt, dark trousers, boots.",
        "Jabot at the neck, red coat over the top.",
      ] },
      { itemName: "Head and hook", steps: [
        "Wig, moustache, hat tilted slightly.",
        "Hook on the left hand, held up near the face for photos.",
      ] },
    ],
    about: [
      "Captain James Hook is the villain of J.M. Barrie's Peter Pan and of Disney's 1953 animated film, where he was voiced by Hans Conried. Peter Pan cut off his hand and fed it to a crocodile, which now follows him everywhere, ticking because it also swallowed a clock.",
      "Disney's red-coated, ringleted Hook is the version most costumes are based on.",
    ],
    faqs: [
      { question: "Which hand is Captain Hook's hook on?", answer: "The left hand in the Disney animated film." },
      { question: "Why does the crocodile tick?", answer: "It swallowed a clock as well as Hook's hand, so Hook hears it coming." },
      { question: "What's a good Peter Pan group costume?", answer: "Peter Pan, Wendy, Tinker Bell, Captain Hook and Mr. Smee." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "tinkerbell-cosplay-costume": {
    characterName: "Tinker Bell",
    updated: U,
    seoTitle: "Tinker Bell Costume: Green Leaf Dress, Bun, Wings & Pom-Pom Slippers",
    metaDescription:
      "A Tinker Bell costume needs a green leaf-edged strapless dress, a high blonde bun, translucent wings, and green slippers with white pom-poms. Fastest options and the Peter Pan group.",
    h1Title: "Tinker Bell Costume Guide (Peter Pan)",
    excerpt:
      "Tinker Bell is a short green dress with leaf-cut edges, a blonde bun high on the head, iridescent wings and green slippers with white pom-poms.",
    intro: [
      "A Tinker Bell costume needs: a short, strapless green dress with leaf-shaped edges, blonde hair in a high bun with a band, translucent iridescent wings and green slippers with white pom-poms. The wings and the bun do most of the work; a little gold glitter as pixie dust is the finishing touch.",
      "This is one of the easiest Disney costumes to put together and it fits every Peter Pan group. Our Peter Pan, Wendy Darling and Captain Hook guides cover the rest.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$100" },
      { label: "Time to put on", value: "20 minutes" },
      { label: "What people recognise first", value: "Green leaf dress with fairy wings" },
    ],
    items: [
      { name: "Tinker Bell costume dress (adult)", url: search("Tinker Bell costume adult women"), note: "Fastest option; check it has leaf-cut hems." },
      { name: "Iridescent fairy wings", url: search("iridescent fairy wings adult"), note: "Clear with a rainbow shimmer, attached with elastic straps." },
      { name: "Green slippers with white pom-poms", url: search("Tinker Bell slippers pom pom"), note: "Or flat green shoes with craft pom-poms glued on." },
      { name: "Blonde wig with bun (if needed)", url: search("Tinker Bell wig bun"), note: "Pale gold, high bun." },
      { name: "Gold glitter or pixie dust prop", url: search("pixie dust necklace"), note: "Biodegradable glitter is kinder to venues." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Dress on, slippers on.",
        "Wings last, straps under the arms.",
      ] },
      { itemName: "Hair", steps: [
        "High bun with a band, fringe swept to one side.",
        "A little gold shimmer on cheeks and shoulders.",
      ] },
    ],
    about: [
      "Tinker Bell is Peter Pan's fairy companion in J.M. Barrie's story and Disney's 1953 film, where she communicates through the sound of bells. Jealous of Wendy, she is mischievous but fiercely loyal to Peter.",
      "She later became Disney's mascot (the wand-wave over the castle) and starred in the Disney Fairies films.",
    ],
    faqs: [
      { question: "What colour is Tinker Bell's dress?", answer: "Bright green, strapless, with leaf-shaped edges." },
      { question: "Does Tinker Bell talk?", answer: "Not in the 1953 film. She speaks through the sound of little bells. In the later Disney Fairies films she talks." },
      { question: "What's a good Tinker Bell group costume?", answer: "Peter Pan, Wendy, Captain Hook and Mr. Smee." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "katniss-everdeen-costume": {
    characterName: "Katniss Everdeen",
    updated: U,
    seoTitle: "Katniss Everdeen Costume: Arena Jacket, Side Braid & Bow",
    metaDescription:
      "A Katniss Everdeen costume needs the black arena jacket, dark cargo trousers, boots, a side braid over the left shoulder, the mockingjay pin and a bow with a quiver. Fastest options and the Girl on Fire alternative.",
    h1Title: "Katniss Everdeen Costume Guide (The Hunger Games)",
    excerpt:
      "Katniss is a dark arena jacket, cargo trousers and boots, a single side braid, the gold mockingjay pin and a bow with a quiver of arrows.",
    intro: [
      "A Katniss Everdeen costume needs: the dark, high-collared arena jacket from the first film, dark cargo trousers, black boots, a single braid over the left shoulder, the gold mockingjay pin and a bow with a quiver on the back. The braid, the pin and the bow are the three things that make it Katniss.",
      "Most people already own trousers and boots, so this is one of the cheapest costumes on the site. For a showier version, the 'Girl on Fire' red or flame dress works for an evening event. Peeta and Gale are the obvious partners.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$110" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Side braid, mockingjay pin and bow" },
    ],
    items: [
      { name: "Katniss arena jacket", url: search("Katniss Everdeen jacket"), note: "Fastest piece to buy. Black with a stand collar." },
      { name: "Mockingjay pin", url: search("mockingjay pin"), note: "Gold, on the left side of the chest." },
      { name: "Bow and quiver set", url: search("toy bow and arrow quiver adult costume"), note: "Recurve-style bow, quiver on the back. Soft-tip arrows for events." },
      { name: "Dark cargo trousers", url: search("women black cargo pants"), note: "Black, olive or dark grey." },
      { name: "Black lace-up boots", url: search("women black lace up boots"), note: "Flat, practical." },
      { name: "Long brown wig with side braid (if needed)", url: search("Katniss wig braid"), note: "Or braid your own hair over the left shoulder." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Dark top, trousers, boots.",
        "Jacket zipped, pin on the left chest.",
      ] },
      { itemName: "Hair and gear", steps: [
        "Side braid starting high on the right, falling over the left shoulder.",
        "Quiver across the back, bow in the left hand.",
      ] },
    ],
    about: [
      "Katniss Everdeen is the heroine of Suzanne Collins's The Hunger Games trilogy, played by Jennifer Lawrence in the films (2012–2015). She volunteers as tribute in place of her sister Prim, survives two Hunger Games and becomes the Mockingjay, the face of the rebellion against the Capitol.",
      "The mockingjay pin, a gift before her first Games, becomes the symbol of the revolution.",
    ],
    faqs: [
      { question: "What does Katniss's mockingjay pin look like?", answer: "A gold bird in flight with an arrow in its beak, enclosed in a ring." },
      { question: "Which shoulder is Katniss's braid on?", answer: "Over her left shoulder, in a single side braid." },
      { question: "What's a good Hunger Games couples costume?", answer: "Katniss and Peeta in matching arena jackets, or Katniss and Effie Trinket for a colourful contrast." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "max-mayfield-costume": {
    characterName: "Max Mayfield",
    updated: U,
    seoTitle: "Max Mayfield Costume (Stranger Things): Red Hair, Walkman & Skateboard",
    metaDescription:
      "A Max Mayfield costume needs long red hair, 80s layers (zip-up hoodie or plaid over a T-shirt), jeans, Vans-style sneakers, a skateboard and, for season four, a Walkman with orange foam headphones.",
    h1Title: "Max Mayfield Costume Guide (Stranger Things)",
    excerpt:
      "Max is long red hair, casual 80s layers, jeans, checkerboard-style sneakers, a skateboard and, in season four, a Walkman with orange headphones playing Kate Bush.",
    intro: [
      "A Max Mayfield costume needs: long, straight red hair with a centre parting, casual 80s layers (a zip-up hoodie or plaid shirt over a T-shirt), straight-leg jeans, Vans-style sneakers and a skateboard. For the season-four look, add a Walkman-style cassette player with orange foam headphones; it instantly signals 'Running Up That Hill'.",
      "Nearly everything can come from your own wardrobe or a thrift store; buy the Walkman and the wig if you need one. Lucas, Eleven and the rest of the party make easy group costumes.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$30–$90" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Red hair and the Walkman headphones" },
    ],
    items: [
      { name: "Retro cassette player with orange foam headphones", url: search("retro cassette player orange foam headphones"), note: "The season-four signature. Kate Bush's 'Hounds of Love' cassette is the extra touch." },
      { name: "Long straight red wig", url: search("long straight red wig"), note: "Copper red, centre parting." },
      { name: "Skateboard", url: search("skateboard complete"), note: "Max skates everywhere in season two." },
      { name: "Zip-up hoodie or plaid flannel", url: search("vintage zip up hoodie 80s"), note: "Muted colours over a T-shirt." },
      { name: "Checkerboard slip-on sneakers", url: search("checkerboard slip on sneakers"), note: "Or plain canvas skate shoes." },
      { name: "Straight-leg light jeans", url: search("light wash straight leg jeans"), note: "Rolled cuffs." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "T-shirt, jeans, sneakers.",
        "Hoodie or flannel over the top.",
      ] },
      { itemName: "Finish", steps: [
        "Wig with a centre parting.",
        "Headphones around the neck or on; Walkman clipped to your jeans.",
      ] },
    ],
    about: [
      "Max Mayfield, played by Sadie Sink, joins Stranger Things in season two as the new girl in Hawkins: a skateboarder and gamer who becomes part of the party and dates Lucas. In season four she is targeted by Vecna and survives by listening to Kate Bush's 'Running Up That Hill', the scene that sent the song back to the top of the charts.",
      "In season two, she trick-or-treats dressed as Michael Myers from Halloween.",
    ],
    faqs: [
      { question: "What song saves Max in Stranger Things?", answer: "'Running Up That Hill (A Deal with God)' by Kate Bush, in season four." },
      { question: "What did Max dress as for Halloween in Stranger Things?", answer: "Michael Myers from Halloween, in season two." },
      { question: "What's a good Stranger Things group costume?", answer: "Max, Eleven, Mike, Lucas, Dustin and Will, or the season-four Hellfire Club with Eddie Munson." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "dolores-umbridge-costume": {
    characterName: "Dolores Umbridge",
    updated: U,
    seoTitle: "Dolores Umbridge Costume: Pink Tweed Suit, Bow & Cat Plates",
    metaDescription:
      "A Dolores Umbridge costume needs a pink tweed skirt suit or pink cardigan, a black velvet bow in short curly hair, pearls, a pink handbag and her 'I must not tell lies' quill or a kitten plate. Fastest options and DIY.",
    h1Title: "Dolores Umbridge Costume Guide (Harry Potter)",
    excerpt:
      "Umbridge is head-to-toe pink: a tweed skirt suit or fluffy cardigan, a small black bow in short curly hair, pearls, a pink handbag and a sickly-sweet smile.",
    intro: [
      "A Dolores Umbridge costume needs: a pink tweed skirt suit or a fluffy pink cardigan over a pink blouse, a small black velvet bow pinned in short, curled light-brown hair, a string of pearls, a pink handbag and sensible heeled shoes. Everything pink, nothing ironic about it. A kitten decorative plate or the 'I must not tell lies' quill makes the reference unmistakable.",
      "This is easy to thrift: charity shops are full of pink jackets and cardigans. Harry, Hermione or Fred and George Weasley make great foils; our DIY Ginny Weasley guide covers a Gryffindor partner.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$100" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "All-pink outfit with a black hair bow" },
    ],
    items: [
      { name: "Pink tweed blazer and skirt", url: search("pink tweed blazer skirt set women"), note: "The core look. Or a pink boucle jacket with any pink skirt." },
      { name: "Fluffy pink cardigan (alternative)", url: search("pink fluffy cardigan women"), note: "Her Hogwarts look in Order of the Phoenix." },
      { name: "Small black velvet hair bow", url: search("black velvet hair bow clip"), note: "Pinned on top of the head." },
      { name: "Short curly light-brown wig", url: search("short curly brown wig women"), note: "Tight curls, chin length or shorter." },
      { name: "Pearl necklace", url: search("faux pearl necklace"), note: "Single strand." },
      { name: "Pink handbag", url: search("pink handbag vintage"), note: "Small, structured." },
      { name: "Kitten plate or 'I must not tell lies' quill prop", url: search("decorative cat plate"), note: "The detail that names the character." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Pink blouse, then the suit or cardigan.",
        "Pearls, handbag over the forearm, low heels.",
      ] },
      { itemName: "Hair and manner", steps: [
        "Wig, then the bow on top.",
        "Clear your throat — 'hem hem' — before every sentence.",
      ] },
    ],
    about: [
      "Dolores Umbridge, played by Imelda Staunton, is the Ministry of Magic official who takes over as Defence Against the Dark Arts teacher and later High Inquisitor of Hogwarts in Harry Potter and the Order of the Phoenix. She makes Harry write 'I must not tell lies' with a blood quill and decorates her office with plates of moving kittens.",
      "Her relentlessly pink, sweet styling is deliberately at odds with her cruelty, which is what makes the costume funny.",
    ],
    faqs: [
      { question: "What does Umbridge make Harry write?", answer: "'I must not tell lies', with a blood quill that cuts the words into the back of his hand." },
      { question: "What's on Umbridge's office walls?", answer: "Decorative plates with moving kittens." },
      { question: "What is Umbridge's catchphrase?", answer: "The little throat-clearing 'hem, hem' before she interrupts." },
    ],
  },
};
