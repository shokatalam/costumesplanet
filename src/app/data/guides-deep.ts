// =============================================================================
// CostumesPlanet.com — Deep rewrites
//
// Fields here replace the same fields on a base guide (guides*.ts); `faqs` are
// appended. Each guide gets its own outline: section headings are written for
// that character only, so no two pages share the same structure.
// =============================================================================

import type { GuideContent } from "./guides";

const U = "2026-11-15";

export const guidesDeep: Record<string, Partial<GuideContent>> = {
  // ───────────────────────────────────────────────────────────────────────────
  "harley-quinn-cosplay": {
    updated: U,
    intro: [
      "Most people who say 'Harley Quinn costume' mean the 2016 Suicide Squad look: a ripped 'Daddy's Lil Monster' T-shirt, red-and-blue shorts, a satin bomber jacket, fishnets, a baseball bat and blonde pigtails dipped pink on one side and blue on the other. Get the pigtails and the red-and-blue split right and you will be recognised from across the room.",
      "Harley has been redesigned more often than almost any comic character, though, and the version you pick changes the whole shopping list. Below we compare the six looks people actually wear, show three ways to build the 2016 costume at different budgets, walk through the makeup, and cover the mistakes that make a Harley look like a generic 'clown girl'.",
    ],
    sections: [
      {
        heading: "Which Harley Quinn are you going as?",
        placement: "top",
        paragraphs: [
          "Decide this before buying anything. Each version has one or two signature pieces that do not carry over to the others, and mixing them (a jester hood with the Suicide Squad T-shirt, say) is the most common reason a Harley costume looks off.",
        ],
        table: {
          head: ["Version", "Where it's from", "Signature pieces", "Best if you want"],
          rows: [
            ["Classic jester", "Batman: The Animated Series (1992)", "Red-and-black diamond bodysuit, two-pointed jester hood with bobbles, white face, black domino mask", "The original; recognised by every age group"],
            ["Arkham", "Arkham Asylum (2009) and Arkham City (2011) games", "Nurse-inspired outfit (Asylum) or red-and-black corset with pigtails (City)", "A gamer crowd; more structured outfits"],
            ["Suicide Squad", "Suicide Squad (2016)", "'Daddy's Lil Monster' tee, red-and-blue shorts, satin jacket, dipped pigtails, 'Good Night' bat", "Maximum recognition with minimum effort"],
            ["Birds of Prey", "Birds of Prey (2020)", "Jacket made of caution tape, colourful layered outfits, loose pigtails", "Something bright and less common"],
            ["The Suicide Squad", "The Suicide Squad (2021)", "Red-and-black combat look; jacket reading 'Live Fast Die Clown'", "A darker, tougher Harley"],
            ["Animated series", "Harley Quinn (2019–) on Max", "Red-and-black outfit, choker and pigtails, in the show's flat cartoon style", "Fans of the adult animated show"],
          ],
        },
      },
      {
        heading: "Three ways to build the 2016 Suicide Squad look",
        paragraphs: [
          "The 2016 outfit is mostly real clothes, so you can choose where to spend. In every tier, the wig and the jacket do the most work; the T-shirt and shorts only need to read from a few feet away.",
        ],
        table: {
          head: ["Budget", "What to buy", "What to make or thrift"],
          rows: [
            ["Under $50", "Pigtail wig, fishnet tights", "Cut and knot a white tee, write the slogan with fabric marker; use red and blue athletic shorts; tape a thrifted wooden bat"],
            ["$50–$120", "Complete set (tee, shorts, jacket) plus a better wig", "Distress the tee with sandpaper; draw the face tattoos with eyeliner"],
            ["$150+", "Screen-replica satin jacket, sequinned shorts, heat-resistant lace-front wig", "Custom-print the tee in the film font; weather the bat with paint and sandpaper"],
          ],
        },
      },
      {
        heading: "Harley's makeup, step by step",
        paragraphs: [
          "The 2016 makeup is deliberately messy, which makes it forgiving. Plan 20 minutes and do it before the wig goes on.",
        ],
        bullets: [
          "Start with your normal base. Harley is not white-faced in this version.",
          "Smudge pink eyeshadow over one eye and blue over the other, blending outward toward the temples. It should look like it was applied the night before.",
          "Add heavy black eyeliner, then smear the outer edges with a fingertip.",
          "Red lipstick, slightly overdrawn on the top lip.",
          "Draw a small heart under one eye and the word 'Rotten' on the cheek with liquid eyeliner, or use temporary tattoos.",
          "Set everything with setting spray; you will be sweating under the wig.",
        ],
      },
      {
        heading: "Getting the pigtails right",
        paragraphs: [
          "The pigtails are worth more than the rest of the costume combined. They sit high on the head, slightly messy, with the bottom third of one dipped pink and the other dipped blue. The pink and blue should be saturated, not pastel.",
          "If you are blonde, you can skip the wig: tie two high pigtails and use temporary colour spray or hair chalk on the ends. Protect your neck and the jacket collar with a towel while it dries. If you are buying a wig, choose a heat-resistant one so you can add a little wave with a straightener; the bone-straight cheap ones look like doll hair.",
        ],
      },
      {
        heading: "Mistakes that make it look like a generic clown",
        placement: "end",
        bullets: [
          "Shorts in the wrong colours. They should split red and blue, matching the jacket and the pigtails.",
          "A pristine bat. Hers is battered and written on; scuff it with sandpaper.",
          "Fine, neat fishnets. Hers are a wide mesh with ladders in them.",
          "Mixing versions, such as the jester hood with the 2016 T-shirt.",
          "Skipping the jacket. Without it the outfit reads as a T-shirt and shorts.",
        ],
      },
      {
        heading: "Who to bring: couples and group ideas",
        placement: "end",
        bullets: [
          "The Joker, matched to the same film. Jared Leto's Joker (green slicked hair, tattoos, silver teeth) goes with the 2016 Harley; the purple suit goes with the jester.",
          "Poison Ivy, for a Gotham City Sirens pair.",
          "A Suicide Squad group: Deadshot, Captain Boomerang, Katana, El Diablo, Killer Croc and Amanda Waller.",
          "A Birds of Prey group: Black Canary, Huntress, Renee Montoya and Cassandra Cain.",
        ],
      },
    ],
    faqs: [
      { question: "Is the Harley Quinn costume OK for a work party?", answer: "Yes, with small changes: swap the shorts for red-and-blue leggings or a skater skirt, and wear the jacket closed. The pigtails and bat still make the reference clear." },
      { question: "How long does the Harley Quinn makeup take?", answer: "About 20 minutes for the 2016 look, which is meant to be smudged. The classic jester's white face and mask take closer to 40." },
      { question: "Who first created Harley Quinn?", answer: "Paul Dini and Bruce Timm, for Batman: The Animated Series in 1992. She was voiced by Arleen Sorkin and moved into the comics in 1993." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "daenerys-targaryen-cosplay": {
    updated: U,
    intro: [
      "Daenerys Targaryen is recognised by her hair before anything else: long silver-platinum hair with braids that loop and gather at the back of the head. Put that on, add a small dragon on your shoulder, and almost any of her gowns will read as Daenerys.",
      "The harder question is which Daenerys. Over eight seasons she moves from Dothraki leathers to Qarth's pale blue, Meereen's light gowns, Dragonstone's dark armoured dresses and the white winter coat. This guide maps each era to what you need to buy, explains how to pick and style the wig, and covers dragons, budgets and the details fans will look for.",
    ],
    sections: [
      {
        heading: "Pick your era: Daenerys's outfits season by season",
        placement: "top",
        paragraphs: [
          "Her costumes, designed by Michele Clapton, tell the story of her rise, so each era looks quite different. The table shows what defines each one and how hard it is to recreate.",
        ],
        table: {
          head: ["Era", "Seasons", "What defines it", "Difficulty"],
          rows: [
            ["Khaleesi", "1", "Sand and brown tones, leather vest or halter, flowing skirt or trousers, simple braids", "Easy"],
            ["Qarth", "2", "Pale blue draped gown with a cinched waist, more elaborate braids", "Easy"],
            ["Meereen", "3–6", "Light blue, lilac and white gowns with high collars and fitted bodices; queenly", "Moderate"],
            ["Dragonstone", "7", "Charcoal and dark red gowns with textured, scale-like fabric and a three-headed dragon chain across the chest", "Moderate"],
            ["Beyond the Wall", "7", "Long white coat with white fur at the collar and shoulders, fitted to the waist", "Easy with a ready-made coat"],
            ["Final season", "8", "Dark coat with a high collar and deep red accents; severe hair", "Moderate"],
          ],
        },
      },
      {
        heading: "Choosing and styling the wig",
        paragraphs: [
          "The single biggest giveaway of a cheap Daenerys is a wig that is golden-blonde. Her hair is a cool, silvery platinum, almost white in some lighting, so filter wig listings for 'platinum', 'silver blonde' or 'white blonde'. Length should fall past the shoulder blades.",
          "Her braids are the second giveaway. They grow more numerous and elaborate as she gains power; fans often connect this to the Dothraki custom that a warrior cuts his braid only after a defeat. A pre-braided Daenerys wig saves several hours. If you braid your own, make two or three thin braids on each side above the ears, loop them toward the back of the crown and pin them together, leaving the rest loose.",
        ],
      },
      {
        heading: "Dragons: which one, and how to carry it",
        paragraphs: [
          "A dragon on the shoulder turns a pale-haired woman in a gown into the Mother of Dragons. Pick one of her three and match the colours.",
        ],
        bullets: [
          "Drogon: black with red. The largest, and the one she rides.",
          "Rhaegal: green and bronze.",
          "Viserion: cream and gold. Later raised by the Night King as an ice dragon, which works if you are pairing with a Night King costume.",
          "Carry it with a shoulder-mount prop on a strap, or clip a plush to the dress strap with a hidden safety pin. Puppet-style dragons let you move the head for photos.",
          "For a group, three friends can each go as a dragon in coloured hoods with felt wings.",
        ],
      },
      {
        heading: "What it costs, three ways",
        table: {
          head: ["Budget", "Approach"],
          rows: [
            ["$40–$70", "Blue maxi dress with a thin belt, a platinum wig braided at home, a small dragon plush"],
            ["$70–$160", "Ready-made Qarth gown or white coat, pre-braided wig, shoulder dragon prop"],
            ["$200+", "Dragonstone gown in textured fabric, a cast dragon chain, a lace-front wig"],
          ],
        },
      },
      {
        heading: "Details Game of Thrones fans will notice",
        placement: "end",
        bullets: [
          "Matte, draped fabric. Shiny satin looks like a party costume; chiffon, crepe and jersey look like the show.",
          "Minimal jewellery except the Dragonstone chain or a dragon brooch.",
          "Natural makeup: defined brows, soft eye, nude lip. She never wears bold colour.",
          "Composure. Daenerys stands very still with her chin up; it sells the costume in photos.",
        ],
      },
      {
        heading: "Couples and group ideas",
        placement: "end",
        bullets: [
          "Jon Snow in his fur cloak, or matched in white for the Beyond the Wall look.",
          "Khal Drogo for a season-one pair: bare chest, long braid and kohl-lined eyes.",
          "Missandei and Grey Worm for a Meereen trio.",
          "Jorah Mormont, Tyrion Lannister or the Night King to complete a group.",
        ],
      },
    ],
    faqs: [
      { question: "What is Daenerys's full title?", answer: "Daenerys Stormborn of House Targaryen, the First of Her Name, Queen of the Andals and the First Men, Khaleesi of the Great Grass Sea, Breaker of Chains and Mother of Dragons, among others." },
      { question: "Can I do a Daenerys costume with short hair?", answer: "Yes, with a wig cap and a full-length wig. The wig is the costume, so it is worth buying a good one." },
      { question: "What is the easiest Daenerys era to recreate?", answer: "Qarth (season two): a pale blue draped dress with a belt, braided platinum hair and a dragon." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "jon-snow-costume": {
    updated: U,
    intro: [
      "Jon Snow is a black outfit, a fur-shouldered cloak and the sword Longclaw. The cloak does most of the work: a heavy black cape with a thick fur mantle across the shoulders is what everyone remembers, and it is also the piece cheap costume sets get most wrong.",
      "The good news is that the show's own capes were made from IKEA sheepskin rugs, so the most accurate version is also one of the cheapest. This guide covers which Jon to dress as, how to build that cloak with no sewing, the hair and beard, Longclaw and Ghost, and the details that separate a convincing Lord Commander from a man in a black robe.",
    ],
    sections: [
      {
        heading: "Which Jon Snow? Four looks across the show",
        placement: "top",
        table: {
          head: ["Look", "Seasons", "Key pieces"],
          rows: [
            ["Night's Watch recruit", "1–2", "Plain black wool tunic and trousers, simple black cloak with fur, clean-shaven or light stubble"],
            ["Beyond the Wall", "2–3, 7", "Heavy layered furs and leathers, padded gloves, snow-dusted cloak"],
            ["Lord Commander", "5–6", "Black leather jerkin with quilted texture, big fur mantle, hair in a half-up knot, fuller beard"],
            ["King in the North", "6–8", "Darker, more tailored leather coat with Stark direwolf details, fur cloak, Longclaw at the hip"],
          ],
        },
        paragraphs: [
          "The Lord Commander look is the safest choice: it is what most people picture, and it suits ready-made costume sets.",
        ],
      },
      {
        heading: "Building the fur cloak (no sewing)",
        paragraphs: [
          "Michele Clapton's team cut and shaved IKEA sheepskin rugs for the Night's Watch capes, then weathered them. You can copy the approach for a fraction of the price of a costume-shop cloak.",
        ],
        bullets: [
          "Buy a faux sheepskin rug in grey or brown, around 60 × 90 cm.",
          "Drape it across your shoulders over a plain black cape or a black bedsheet folded lengthways.",
          "Fix the rug to the cape with safety pins or fabric glue along the inside edge so the fur sits on top.",
          "Close it at the throat with a leather strap and a buckle or two large hooks.",
          "Brush a little grey eyeshadow or dry shampoo into the fur and rub dirt-coloured powder into the cape hem. The Watch never looks clean.",
        ],
      },
      {
        heading: "Hair and beard",
        paragraphs: [
          "Kit Harington's hair is dark, curly and roughly shoulder-length. From season five onward Jon usually wears the top section tied back in a small knot with the rest loose. If your own hair is long enough, use curl cream and scrunch it while damp; otherwise buy a curly dark wig and tie the top half back yourself.",
          "For the beard, a few days' stubble is right for early seasons; Lord Commander and King in the North have a fuller, short beard. Stick-on beards look best when trimmed down hard and blended into your own stubble at the edges.",
        ],
      },
      {
        heading: "Longclaw and Ghost",
        paragraphs: [
          "Longclaw is a Valyrian steel bastard sword with a wolf's-head pommel, carried at the left hip. A foam or resin replica is the right choice for parties and conventions, where metal blades are usually banned.",
          "Ghost, Jon's albino direwolf, is white with red eyes. A large white wolf or husky plush on a lead is an easy extra; a friend in a white fur hood and grey face paint is better.",
        ],
      },
      {
        heading: "Spending tiers",
        table: {
          head: ["Budget", "What you get"],
          rows: [
            ["$40–$70", "Black clothes you own, the DIY rug cloak, a plastic sword, your own hair"],
            ["$70–$140", "A costume set with jerkin and fur cloak, a foam Longclaw, a curly wig"],
            ["$200+", "Leather jerkin, real wool cloak with a sheepskin mantle, licensed Longclaw replica"],
          ],
        },
      },
      {
        heading: "Small details that make it convincing",
        placement: "end",
        bullets: [
          "Matte black only. Shiny polyester instantly cheapens the look.",
          "Layering: a shirt, a padded jerkin, a belt with a pouch, then the cloak.",
          "Gloves: black leather, slightly worn.",
          "Wear and dirt on the hem, boots and knees.",
          "The expression. Jon is permanently troubled; avoid smiling in photos.",
        ],
      },
      {
        heading: "Who goes with Jon Snow",
        placement: "end",
        bullets: [
          "Ygritte: red hair, layered furs and a bow. Bring the line 'You know nothing, Jon Snow.'",
          "Daenerys in her white winter coat.",
          "The Stark children for a family group: Arya, Sansa, Bran and Robb, with Ned Stark.",
          "The Night King, for a Battle of Winterfell rivalry.",
        ],
      },
    ],
    faqs: [
      { question: "Is Jon Snow a Stark or a Targaryen?", answer: "Both. He is raised as Ned Stark's illegitimate son, but the show reveals he is the son of Lyanna Stark and Rhaegar Targaryen, born Aegon Targaryen." },
      { question: "What does Jon Snow's sword look like?", answer: "Longclaw is a bastard sword with a dark Valyrian steel blade and a pommel shaped like a wolf's head." },
      { question: "Can kids dress as Jon Snow?", answer: "Yes. A black hoodie, a faux-fur scarf over the shoulders and a foam sword make a comfortable children's version." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "tanjiro-kamado-costume": {
    updated: U,
    intro: [
      "Tanjiro Kamado is the boy in the green-and-black checkered haori. Everything else in his costume, the black Demon Slayer Corps uniform, white leg wraps, hanafuda earrings, a burgundy scar on his forehead and a black-bladed katana, supports that one pattern, which is why the haori is where a good Tanjiro cosplay starts.",
      "Because his look hardly changes through the series, Tanjiro is one of the best value anime cosplays you can do. This guide explains how to judge a good haori, style the wig, make the scar and the Nezuko box, choose a convention-safe sword and pick a less common arc-specific look if you want to stand out.",
    ],
    sections: [
      {
        heading: "What makes a good Tanjiro haori",
        placement: "top",
        paragraphs: [
          "The haori pattern is called ichimatsu: a regular grid of alternating dark green and black squares. Three things separate a good one from a bad one.",
        ],
        bullets: [
          "Colour: deep forest green, not teal, mint or kelly green. Look at product photos in daylight, not studio lighting.",
          "Scale: the squares are large, roughly the size of the palm of your hand on an adult. Small gingham-style checks look wrong immediately.",
          "Fabric: matte cotton or linen blend that hangs straight. Shiny polyester puckers at the shoulders.",
          "Length: it should reach around mid-thigh and be worn open.",
        ],
      },
      {
        heading: "Arc-specific Tanjiro looks",
        paragraphs: [
          "Most people wear the standard Corps uniform, but each arc gives you a variation that fans will appreciate.",
        ],
        table: {
          head: ["Arc", "What changes"],
          rows: [
            ["Training and Final Selection", "No uniform yet: a simple kimono and hakama, the checkered haori and the carved wooden fox mask Urokodaki gives his students"],
            ["Standard Corps (most of the series)", "Black uniform, haori, leg wraps, earrings, sword and Nezuko's box"],
            ["Entertainment District", "Disguised as 'Sumiko' to infiltrate the district: a patterned kimono, heavy rouge and pinned-up hair, a comic option for a group"],
            ["Swordsmith Village onward", "Standard uniform, with his demon slayer mark growing larger and darker on the forehead"],
          ],
        },
      },
      {
        heading: "Wig, scar and earrings",
        paragraphs: [
          "Tanjiro's hair is short and spiky, a dark burgundy that turns redder at the tips, with a slightly longer section at the back. Cheap wigs often come out too bright red; look for 'dark red-brown' or 'burgundy'. A few minutes with wax to separate the spikes makes a big difference.",
          "The scar sits on the left side of his forehead (on the right as you face him). Use burgundy cream makeup or scar wax shaped like a flame or blotch, and blend the edges with a sponge. In later arcs it becomes a larger, darker flame-shaped mark.",
          "The hanafuda earrings are long white rectangles with a red sun and rays, hanging from the lobes. Clip-on versions are widely available and look the same in photos.",
        ],
      },
      {
        heading: "Nezuko's box",
        paragraphs: [
          "Tanjiro carries his sister in a wooden box on his back so she is safe from sunlight. It is the prop that makes the costume unmistakable, and you can buy one or build it.",
        ],
        bullets: [
          "Buy: Nezuko box backpacks are made in light wood colour with shoulder straps and room for a phone and drinks.",
          "Build: a sturdy cardboard box, roughly 40 × 30 × 25 cm, painted light wood brown with darker frame lines, and two backpack straps glued or bolted on.",
          "Add a Nezuko plush peeking out of the top for photos, or bring a friend as Nezuko.",
        ],
      },
      {
        heading: "Choosing a sword you can take to a convention",
        paragraphs: [
          "Tanjiro's nichirin blade turned black when he first drew it, an unusual colour that is said to mark swordsmen who don't live long. The guard is a black disc. Most conventions ban metal blades and many ban real wood, so a foam or plastic replica is the safe choice; check your event's prop policy before buying. A sword with a scabbard tucks neatly through the belt on the left hip.",
        ],
      },
      {
        heading: "Common Tanjiro mistakes",
        placement: "end",
        bullets: [
          "Checks too small or too bright.",
          "Earrings worn as studs instead of hanging cards.",
          "No leg wraps: plain trousers into sneakers break the silhouette.",
          "Scar on the wrong side when the photo isn't mirrored.",
          "A silver sword blade. His is black.",
        ],
      },
      {
        heading: "Group costume ideas",
        placement: "end",
        bullets: [
          "The core trio: Tanjiro, Zenitsu (yellow-orange haori with a white triangle pattern) and Inosuke (boar mask).",
          "The Kamado siblings: Tanjiro and Nezuko (pink kimono, bamboo muzzle, long dark hair with orange tips).",
          "The Hashira: Giyu, Mitsuri, Rengoku, Shinobu and Tengen, all with guides or easy uniforms.",
          "A villain to chase: Muzan Kibutsuji in a white fedora and dark suit.",
        ],
      },
    ],
    faqs: [
      { question: "What does Tanjiro's black sword mean?", answer: "A nichirin blade changes colour for its first owner. Black blades are rare and, according to the series, belong to swordsmen who rarely survive long, which worries his teacher." },
      { question: "Is a Tanjiro costume good for kids?", answer: "Very. Children's sets are inexpensive, comfortable and recognisable, and a cardboard Nezuko box makes a fun craft project." },
      { question: "What breathing style does Tanjiro use?", answer: "Water Breathing, taught by Urokodaki, and later Sun Breathing, which he learns through his family's Hinokami Kagura dance." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "gargamel-costume": {
    updated: U,
    intro: [
      "Gargamel is about as close as a costume gets to foolproof: a shabby black robe with patches, red shoes, a bald crown ringed with messy dark hair, heavy eyebrows, a hooked nose and an orange cat under one arm. Five of those six pieces are cheap, and the sixth (the cat) is a toy.",
      "What makes the difference between 'a wizard' and Gargamel is detail: the patches, the hunch, the bald cap blended properly and Azrael's colour. This guide covers which Gargamel to base your look on, a no-sew robe, a step-by-step bald cap and nose, props, and how to build a Smurfs group around him.",
    ],
    sections: [
      {
        heading: "Cartoon, comic or film Gargamel?",
        placement: "top",
        paragraphs: [
          "All versions share the robe, the red shoes and the cat, but the details differ slightly. Pick the one your group knows best.",
        ],
        table: {
          head: ["Version", "Notable details"],
          rows: [
            ["Peyo's comics (from 1959)", "Robe drawn in black or dark grey with visible patches, very long hooked nose, wild fringe of hair"],
            ["Hanna-Barbera cartoon (1981–1989)", "The version most people picture: black patched robe, rope belt, red shoes, bushy brows, sneering grin, voiced by Paul Winchell"],
            ["Live-action films (2011, 2013)", "Hank Azaria in a darker, more textured robe, prosthetic nose, bad teeth and a bald cap with a scruffy fringe"],
            ["Smurfs: The Lost Village (2017)", "Rounder animated design voiced by Rainn Wilson; same colours, more cartoonish proportions"],
          ],
        },
      },
      {
        heading: "Making the robe look like Gargamel's",
        paragraphs: [
          "A plain black robe looks like a monk or a Jedi. Gargamel's is poor and patched, and that is what you need to show.",
        ],
        bullets: [
          "Start with a cheap black hooded robe or a black graduation gown with the zip hidden.",
          "Cut three or four patches from grey, brown or dark green fabric, square or rectangular, with uneven edges.",
          "Fix them at the elbows, one knee and the hem with fabric glue or iron-on hemming tape; no sewing needed. Draw stitch marks around them with white or grey fabric marker.",
          "Fray the hem by cutting small nicks and pulling threads, then rub in a little grey eyeshadow for grime.",
          "Tie a rope or hessian cord low on the hips. The robe should look slightly too big.",
        ],
      },
      {
        heading: "Bald cap and nose, step by step",
        paragraphs: [
          "The bald cap is where most Gargamels fall down: a visible edge across the forehead ruins the face. Give yourself 25 minutes and a mirror.",
        ],
        bullets: [
          "Slick your hair flat with gel and pin it down; wear a wig cap if your hair is long.",
          "Pull the bald cap on from the forehead backward, so the front edge sits just above your eyebrows.",
          "Glue the front edge with spirit gum or a skin-safe adhesive, pressing for 30 seconds.",
          "Trim excess around the ears, then glue those edges too.",
          "Blend the edge with foundation stippled on with a sponge, and dust with translucent powder.",
          "Add the dark hair fringe around the sides and back only, leaving the crown bare.",
          "Attach the hooked nose with spirit gum, blend its edge the same way and draw heavy, angry eyebrows above it.",
        ],
      },
      {
        heading: "Props that do the acting for you",
        bullets: [
          "Azrael: an orange tabby plush. In the cartoon he is ginger with a scruffy tail and a sour expression.",
          "A small cauldron with a wooden spoon, for the endless 'Smurf stew'.",
          "A butterfly net or a cloth sack with a Smurf plush poking out.",
          "A battered old spell book; any hardback covered in brown paper with runes drawn on works.",
        ],
      },
      {
        heading: "Mistakes to avoid",
        placement: "end",
        bullets: [
          "A pointed wizard hat. Gargamel never wears one; the bald head is the point.",
          "A grey or grey-white cat. Azrael is orange.",
          "Black shoes. They must be red, and they must show under the robe.",
          "A spotless robe. He is shabby and poor.",
          "Standing up straight. Hunch, rub your hands together and mutter about Smurfs.",
        ],
      },
      {
        heading: "Building a Smurfs group around Gargamel",
        placement: "end",
        paragraphs: [
          "Gargamel works best with Smurfs to chase. A basic Smurf is a blue long-sleeve top and leggings (or blue face paint), white trousers or shorts and a white floppy Phrygian cap with a white tail. Then vary it for named characters:",
        ],
        bullets: [
          "Papa Smurf: red cap, red trousers, white beard.",
          "Smurfette: blonde wig, white dress, white heels.",
          "Brainy Smurf: thick black glasses and a book.",
          "Hefty Smurf: a red heart tattoo on the arm.",
          "Vexy and Hackus, from The Smurfs 2, if you want the less obvious picks.",
        ],
      },
    ],
    faqs: [
      { question: "Why does Gargamel want the Smurfs?", answer: "It depends on the story: in the cartoon he wants to eat them or use them in a spell to make gold; in some stories it is simple revenge." },
      { question: "What is Gargamel's cat called?", answer: "Azrael, an orange cat who is usually smarter than his master." },
      { question: "Who played Gargamel in the live-action Smurfs films?", answer: "Hank Azaria, in The Smurfs (2011) and The Smurfs 2 (2013)." },
    ],
  },
};
