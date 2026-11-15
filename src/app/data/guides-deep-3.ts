// =============================================================================
// CostumesPlanet.com — Deep rewrites, batch 3 (Game of Thrones + Marvel)
// Same rules as guides-deep.ts: fields replace the base guide's, faqs append,
// and every section heading is written for this character only.
// =============================================================================

import type { GuideContent } from "./guides";

const U = "2026-11-15";

export const guidesDeep3: Record<string, Partial<GuideContent>> = {
  // ───────────────────────────────────────────────────────────────────────────
  "ned-stark-costume": {
    updated: U,
    intro: [
      "Ned Stark is dark, heavy Northern clothing: a leather jerkin over a wool tunic, a cloak with a thick fur collar, bracers, a wide belt and boots, plus a greatsword for Ice, shoulder-length brown hair and a full beard. Nothing about him is flashy, and that restraint is the look.",
      "Two things separate Ned from 'generic medieval warrior': the fur collar and the size of the sword. This guide covers his Winterfell and King's Landing looks, how to make a cheap Viking or ranger set read as Stark, the sword, hair and beard, and how to build the Stark family around him.",
    ],
    sections: [
      {
        heading: "Winterfell Ned or Hand of the King?",
        placement: "top",
        table: {
          head: ["Look", "Episodes", "What defines it"],
          rows: [
            ["Lord of Winterfell", "Season 1, first episodes", "Heavy fur-collared cloak, dark leathers, Ice carried for the opening execution"],
            ["Hand of the King", "Season 1, King's Landing", "Lighter dark doublet, no heavy cloak, the Hand of the King pin on the chest"],
            ["Final scenes", "Season 1, episode 9", "Grimy, dishevelled prisoner's clothes; a sombre choice"],
          ],
        },
        paragraphs: ["The Winterfell look is the one people picture and the best for photos; the Hand look is cooler to wear indoors."],
      },
      {
        heading: "Turning a cheap set into a Stark",
        bullets: [
          "Swap any red, purple or shiny trim for grey, brown and black. Stark colours are muted.",
          "Add a faux-fur collar or a faux sheepskin rug across the shoulders of a dark cloak.",
          "A plain leather belt and bracers do more than any printed 'armor' detail.",
          "Optional: a small grey direwolf pin or patch at the cloak clasp.",
          "Rub a little grey or brown eyeshadow into the hems. The North is muddy.",
        ],
      },
      {
        heading: "Ice, the Stark greatsword",
        paragraphs: [
          "Ice is a huge Valyrian steel two-handed sword, which Ned carries over his shoulder in the first episode. A long foam greatsword with a dark, rippled-pattern blade is the right look and is allowed at most events. After Ned's death, Tywin Lannister has Ice melted down and reforged into two swords, Oathkeeper and Widow's Wail, which is a nice detail if you pair Ned with a Jaime or a Joffrey.",
        ],
      },
      {
        heading: "Hair and beard",
        paragraphs: [
          "Sean Bean's Ned has shoulder-length brown hair, usually swept back and a little untidy, and a short full beard with some grey. If your hair is short, a medium-length brown wig with a centre or side part works; a stick-on beard trimmed close and blended into stubble looks far better than a thick costume beard.",
        ],
      },
      {
        heading: "Building the Stark family",
        placement: "end",
        bullets: [
          "Catelyn Stark: long auburn hair and a dark-red or blue-grey gown with a fur-trimmed cloak.",
          "Robb Stark: dark curls, a short beard and the same fur collar.",
          "Jon Snow, Arya, Sansa and Bran: each has a guide or an easy look.",
          "Robert Baratheon as the visiting king: a big beard, a crown and a goblet.",
          "A direwolf: a grey or white husky plush, or a friend in a wolf hood.",
        ],
      },
    ],
    faqs: [
      { question: "What are the Stark words?", answer: "'Winter is coming.'" },
      { question: "Who played Ned Stark?", answer: "Sean Bean, in season one of Game of Thrones (2011)." },
      { question: "What happened to Ice?", answer: "Tywin Lannister had it melted and reforged into two Valyrian steel swords, Oathkeeper and Widow's Wail." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "jaime-lannister-costume": {
    updated: U,
    intro: [
      "There are two Jaime Lannisters, and each needs a different shopping list. Early Jaime is the Kingsguard knight: white cloak, gold-trimmed armor and short golden hair. Later Jaime wears crimson Lannister leather with gold lion details, a beard and the golden prosthetic right hand. The gold hand is the single detail that says Jaime rather than 'knight', so it's the best choice if you want to be recognised.",
      "This guide compares his looks across the seasons, explains how to wear the gold hand convincingly, covers hair and beard, and lists the people to bring, from Cersei to Brienne of Tarth.",
    ],
    sections: [
      {
        heading: "Jaime's looks across the show",
        placement: "top",
        table: {
          head: ["Look", "Seasons", "Key pieces"],
          rows: [
            ["Kingsguard", "1", "White cloak, gold-and-white armor, sword, short golden hair, clean-shaven"],
            ["Captive", "2–3", "Ragged tunic, dirt, chains or rope, longer messy hair and beard"],
            ["Gold hand", "4–6", "Crimson leather doublet with gold lion details, gold right hand, short beard"],
            ["Late seasons", "7–8", "Darker travelling clothes or armor, Oathkeeper, grey creeping into the beard"],
          ],
        },
      },
      {
        heading: "Wearing the gold hand",
        paragraphs: [
          "Jaime loses his right hand in season three and wears a gold prosthetic from season four. It has to be on the right; a left-hand gold glove is the first thing fans spot.",
        ],
        bullets: [
          "Buy a gold prosthetic-hand prop, or paint a stiff glove with gold metallic paint and stuff the fingers so they hold a slightly curled shape.",
          "Wear a crimson or black sleeve with a cuff over the join so it looks attached.",
          "Keep the hand still and at your side in photos: Jaime never uses it well.",
          "Carry the sword in your left hand.",
        ],
      },
      {
        heading: "Hair and beard",
        paragraphs: [
          "Nikolaj Coster-Waldau's Jaime has thick, short golden-blond hair swept back, so a cool or ashy blond looks better than yellow. Kingsguard Jaime is clean-shaven; from season four he has a short, neat beard. A short blond wig and a trimmed stick-on beard are enough.",
        ],
      },
      {
        heading: "What the costume shops get wrong",
        bullets: [
          "Shiny gold plastic armor: matte gold or brushed bronze looks more like the show.",
          "A red cape on the Kingsguard look. Kingsguard cloaks are white.",
          "A lion emblem that is too big; Lannister details are subtle and repeated.",
          "Mixing eras: the white cloak with the gold hand never appears together.",
        ],
      },
      {
        heading: "Who to bring",
        placement: "end",
        bullets: [
          "Cersei Lannister: crimson gowns, or the short-haired season-six look in black.",
          "Brienne of Tarth: plate armor, short blonde hair and Oathkeeper.",
          "Tyrion Lannister: a crimson doublet and a goblet of wine.",
          "Ned Stark or Bran Stark, for the 'things I do for love' joke.",
        ],
      },
    ],
    faqs: [
      { question: "Which hand does Jaime Lannister lose?", answer: "His right, his sword hand, cut off by Locke in season three." },
      { question: "Why is Jaime called the Kingslayer?", answer: "He killed King Aerys II Targaryen, the 'Mad King', while serving in his Kingsguard." },
      { question: "What is Jaime's sword called?", answer: "He gives Oathkeeper, forged from Ned Stark's sword Ice, to Brienne. Jaime himself carries several swords over the series." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "joffrey-baratheon-costume": {
    updated: U,
    intro: [
      "Joffrey Baratheon is Lannister crimson and gold under a crown with stag-antler points, short blond hair, a high-collared doublet and either a crossbow or his sword. The real costume, though, is the sneer: Jack Gleeson's Joffrey is the most hated character in the show, and leaning into that is what makes people laugh when they see you.",
      "This guide covers his coronation and Purple Wedding looks, how to make the crown, the makeup for the poisoned version, the attitude, and the group ideas that make Joffrey even better.",
    ],
    sections: [
      {
        heading: "Coronation Joffrey or Purple Wedding Joffrey?",
        placement: "top",
        table: {
          head: ["Look", "Season", "Pieces"],
          rows: [
            ["Young king", "1–3", "Crimson or gold doublet with a high collar, dark trousers, boots, crown, crossbow"],
            ["Wedding", "4", "Gold-and-crimson wedding doublet with lion and stag details, crown, a goblet and a pie"],
            ["Poisoned", "4", "The wedding look plus purple lips, bloodshot eyes and a nosebleed"],
          ],
        },
      },
      {
        heading: "Making the crown",
        paragraphs: [
          "Joffrey's crown is gold with tall points that suggest stag antlers, the Baratheon sigil. Most costume crowns are too round and jewelled.",
        ],
        bullets: [
          "Start with a plain gold crown or a band of craft foam.",
          "Add tall, slightly curved points of foam or wire wrapped in gold tape, branching like antlers.",
          "Spray the whole thing matte gold; skip the plastic gems.",
          "Wear it sitting slightly high, as if it's a little too big for him.",
        ],
      },
      {
        heading: "Purple Wedding makeup",
        bullets: [
          "Pale base with a little grey under the eyes.",
          "Purple-blue lips and a purple tint around the nostrils.",
          "Red eyeliner along the lower lash line for bloodshot eyes.",
          "A thin trickle of fake blood from one nostril.",
          "Carry a goblet. It's a dark joke, so judge your audience.",
        ],
      },
      {
        heading: "Playing the part",
        paragraphs: [
          "The costume lands when you act it. Stand with your chin up, talk down to people, demand the last slice of anything and declare everyone 'mine to torment'. A crossbow prop (foam or toy only) adds to the threat for photos.",
        ],
      },
      {
        heading: "Group ideas",
        placement: "end",
        bullets: [
          "Cersei Lannister, his mother, in crimson with a goblet of wine.",
          "Sansa Stark, betrothed to him, in a pale blue gown.",
          "Margaery Tyrell, his bride, in a gown with the Tyrell rose.",
          "Tyrion Lannister, for the wedding drama.",
          "The Hound as his bodyguard.",
        ],
      },
    ],
    faqs: [
      { question: "Who played Joffrey Baratheon?", answer: "Jack Gleeson, from season one to season four." },
      { question: "How does Joffrey die?", answer: "He is poisoned at his wedding feast to Margaery Tyrell in season four, episode two, the 'Purple Wedding'." },
      { question: "What is Joffrey's sword called?", answer: "Widow's Wail, one of the two swords forged from Ned Stark's Ice, which he names at his wedding." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "ygritte-costume": {
    updated: U,
    intro: [
      "Ygritte is layered brown and grey leather and fur, a bow with a quiver, and wavy red hair worn loose and a bit wild. She's a Free Folk archer from beyond the Wall, so her clothes look handmade and lived-in rather than tailored, which makes her one of the cheapest and most forgiving Game of Thrones costumes to build.",
      "This guide covers how to build the layers from thrift-store pieces, a quick fur cloak, the red hair, the bow, and how to pair her with Jon Snow and the rest of the wildlings.",
    ],
    sections: [
      {
        heading: "Building the wildling layers",
        placement: "top",
        bullets: [
          "Base: a dark long-sleeve top and leggings or fitted trousers.",
          "Tunic: a brown or grey knit or leather-look tunic, belted at the hip.",
          "Fur: a faux-fur throw draped across the shoulders and tied with leather cord, or a fur-trimmed hooded cloak.",
          "Wraps: strips of brown fabric or leather lacing around the forearms and lower legs.",
          "Boots: flat, brown and scuffed.",
          "Dirt: rub brown and grey eyeshadow into the fur and hems. Nothing should look new.",
        ],
      },
      {
        heading: "Red hair, Ygritte style",
        paragraphs: [
          "Rose Leslie's Ygritte has shoulder-length to long red hair, wavy and windswept, with one or two thin braids. If you're not a redhead, choose a copper or auburn wig rather than bright orange, scrunch it with a little texture spray, and add a couple of small braids near the face.",
        ],
      },
      {
        heading: "Bow and quiver",
        paragraphs: [
          "A simple wooden-look recurve bow and a leather quiver on the back are right. Use soft-tipped or foam arrows at events, and keep the bow unstrung in crowds. A few feathers tied into the quiver strap add a wildling touch.",
        ],
      },
      {
        heading: "Ygritte and Jon Snow",
        placement: "end",
        paragraphs: [
          "The pairing is the costume's best feature. Jon in his black Night's Watch cloak next to Ygritte in furs tells the story instantly, and her line, 'You know nothing, Jon Snow', is the caption. For a bigger group:",
        ],
        bullets: [
          "Tormund Giantsbane: a huge red beard and furs.",
          "Mance Rayder: the King-Beyond-the-Wall in a dark cloak.",
          "A giant: the tallest friend in furs with a club.",
        ],
      },
    ],
    faqs: [
      { question: "What does Ygritte always say to Jon Snow?", answer: "'You know nothing, Jon Snow.'" },
      { question: "Who played Ygritte?", answer: "Rose Leslie, in seasons two to four." },
      { question: "What are the Free Folk?", answer: "The people living beyond the Wall, called 'wildlings' by the Night's Watch." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "missandei-costume": {
    updated: U,
    intro: [
      "Missandei's costume is her curly hair plus one of two signature outfits: the flowing, Grecian-style dresses in pale blue, cream and gold from Meereen, or the fitted dark grey look with a high collar from Dragonstone. Both are elegant, both are mostly regular clothes, and both are recognised immediately next to a Daenerys or a Grey Worm.",
      "This guide covers each look, the hair, the small gold details that make it read as Essos, and the best pairings.",
    ],
    sections: [
      {
        heading: "Meereen or Dragonstone?",
        placement: "top",
        table: {
          head: ["Look", "Seasons", "Key pieces"],
          rows: [
            ["Meereen", "4–6", "Pale blue, cream or gold draped dress, a thin gold belt, gold cuffs or arm band"],
            ["Dragonstone", "7", "Fitted dark grey top or jacket with a high collar, long dark skirt, minimal jewellery"],
            ["Winterfell", "8", "Dark, fur-trimmed coat over the Dragonstone look, for the cold"],
          ],
        },
      },
      {
        heading: "Her hair",
        paragraphs: [
          "Nathalie Emmanuel's Missandei wears her natural curls, often half-up with a few braids or twists at the crown and the rest loose. Define your curls with a curl cream, or choose a curly wig with a natural texture, then pin the top section back. Small gold cuffs or rings in the hair are a lovely Essos detail.",
        ],
      },
      {
        heading: "The details that make it Missandei",
        bullets: [
          "Draped, flowing fabric for Meereen; structured and fitted for Dragonstone.",
          "Thin gold jewellery: an arm cuff, a fine belt, small earrings.",
          "Soft, natural makeup with defined brows.",
          "A small notebook or scroll: she is Daenerys's translator and adviser.",
        ],
      },
      {
        heading: "Who to bring",
        placement: "end",
        bullets: [
          "Grey Worm: dark Unsullied armor, a spear and a shaved head.",
          "Daenerys Targaryen, in a matching era.",
          "Tyrion Lannister or Varys, for the Meereen council.",
        ],
      },
    ],
    faqs: [
      { question: "Who played Missandei?", answer: "Nathalie Emmanuel, from season three to season eight." },
      { question: "How many languages does Missandei speak?", answer: "Many: she tells Daenerys she speaks nineteen languages when they first meet." },
      { question: "What was Missandei's last word?", answer: "'Dracarys', in season eight, episode four." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "blade-costume": {
    updated: U,
    intro: [
      "Blade is all black: a long leather coat over a tactical armor vest, black trousers, combat boots, black gloves, dark wraparound sunglasses and a sword on his back. Wesley Snipes's vampire hunter from the 1998–2004 films is one of the coolest costumes you can build from real clothing, and the coat and sunglasses carry most of it.",
      "This guide breaks the look into the coat, the vest and the weapons, explains how to choose sunglasses that read as Blade, and suggests who to bring from the films.",
    ],
    sections: [
      {
        heading: "The coat makes the costume",
        placement: "top",
        bullets: [
          "Length: long, falling to around mid-calf.",
          "Material: matte or slightly worn leather or faux leather. Avoid high-gloss PVC.",
          "Cut: structured shoulders and a clean silhouette; it should swing when you move.",
          "Buy a size up so it fits over the vest.",
        ],
      },
      {
        heading: "Vest, sunglasses and gloves",
        paragraphs: [
          "Under the coat Blade wears a black tactical vest with straps and pouches over a black shirt. A plain black tactical or utility vest from an outdoor shop looks better than a printed costume chest piece.",
          "The sunglasses should be dark, wraparound and angular. Round or retro frames break the look. Finish with black fingerless or full gloves and short, close-cropped hair.",
        ],
      },
      {
        heading: "The sword and other gear",
        paragraphs: [
          "Blade's sword is a straight-bladed katana-style weapon worn on his back. A foam or plastic sword in a back scabbard is the safe choice for parties and conventions. Many venues ban realistic replica guns, so leave any firearm props at home and add the round-bladed 'glaive' or a few prop stakes instead.",
        ],
      },
      {
        heading: "Who to bring",
        placement: "end",
        bullets: [
          "Whistler: grey hair and beard, a flannel shirt and a leg brace.",
          "Deacon Frost: a sharp suit and slicked-back blond hair.",
          "Abigail Whistler, from Blade: Trinity, with a bow and a hooded jacket.",
          "A group of vampires in club wear to 'hunt'.",
        ],
      },
    ],
    faqs: [
      { question: "Who played Blade?", answer: "Wesley Snipes, in Blade (1998), Blade II (2002) and Blade: Trinity (2004)." },
      { question: "What is Blade?", answer: "A dhampir: half human, half vampire, with a vampire's strength but able to walk in daylight, which earns him the nickname 'Daywalker'." },
      { question: "Can I do a Blade costume without leather?", answer: "Yes. A long black wool or canvas coat works; keep everything else matte black." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "captain-marvel-costume": {
    updated: U,
    intro: [
      "Captain Marvel is a blue suit with red shoulders and upper torso, a gold eight-pointed star on the chest, red gloves and boots, a gold sash at the hip and blonde hair. That's Carol Danvers's suit as Brie Larson wears it in Captain Marvel, Avengers: Endgame and The Marvels.",
      "She also has two looks that most people forget, which are great if you want to stand out: the green Kree Starforce uniform and her 90s off-duty outfit. This guide compares them, explains what to upgrade on a ready-made suit, the hair for each film, and who to bring.",
    ],
    sections: [
      {
        heading: "Pick your Carol Danvers",
        placement: "top",
        table: {
          head: ["Look", "Where", "Key pieces"],
          rows: [
            ["Red, blue and gold", "Captain Marvel (2019) onward", "The suit, gold star, sash, red gloves and boots, shoulder-length blonde hair"],
            ["Kree Starforce", "Captain Marvel", "Dark green and black uniform with silver details, before the suit changes colour"],
            ["90s off-duty", "Captain Marvel", "Band T-shirt, flannel shirt, leather jacket, jeans and boots"],
            ["Endgame", "Avengers: Endgame (2019)", "The suit with short, cropped blonde hair"],
          ],
        },
      },
      {
        heading: "Upgrading a ready-made suit",
        bullets: [
          "The star: replace a flat printed star with a raised gold one cut from craft foam and painted metallic gold.",
          "The sash: tie a gold or yellow sash at the hip, knotted on one side; many suits skip it.",
          "Gloves and boots: separate red gloves and boot covers look sharper than printed ones.",
          "Fit: like any bodysuit, size up and wear a smooth base layer underneath.",
          "Glow: a few gold or white LED fairy lights at the wrists suggest her photon blasts for evening photos.",
        ],
      },
      {
        heading: "The 90s look, piece by piece",
        paragraphs: [
          "In the film Carol lands in 1995 and steals clothes: a band T-shirt, a plaid flannel shirt tied at the waist or worn open, a leather jacket, jeans and boots. It is the comfiest superhero costume going, and anyone who has seen the film gets it. Add a Blockbuster-style video store bag as a prop.",
        ],
      },
      {
        heading: "Who to bring",
        placement: "end",
        bullets: [
          "Nick Fury, 1995 version: both eyes, a leather jacket and a cat.",
          "Goose the cat (a Flerken): an orange tabby plush with a tentacle or two.",
          "Monica Rambeau and Kamala Khan, for The Marvels trio.",
          "The Avengers from Endgame.",
        ],
      },
    ],
    faqs: [
      { question: "What is Captain Marvel's real name?", answer: "Carol Danvers, a US Air Force pilot who gains her powers from the energy of the Tesseract." },
      { question: "Is Goose really a cat?", answer: "No. Goose is a Flerken, an alien that looks like a cat and has tentacles in its mouth." },
      { question: "What is the easiest Captain Marvel costume?", answer: "The 90s look: band tee, flannel, leather jacket and jeans. Most people already own half of it." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "taskmaster-cosplay-costume": {
    updated: U,
    intro: [
      "Taskmaster carries everybody else's weapons: a round shield like Captain America's, a bow like Hawkeye's, a sword and claws. That borrowed arsenal plus a skull face is the whole idea, and it's why Taskmaster is a great choice for people who like props.",
      "There are two very different Taskmasters, so decide first: the dark armored version from Black Widow (2021), or the classic comic version with a skull face under a white hood and cape. This guide compares them, covers the helmet or mask, building the weapon set safely, and the Black Widow group.",
    ],
    sections: [
      {
        heading: "Film or comic Taskmaster?",
        placement: "top",
        table: {
          head: ["Version", "Look", "Best for"],
          rows: [
            ["Black Widow (2021)", "Dark navy and black tactical armor, full-face helmet with a skull-like visor, round shield on the back", "Convention photos and MCU fans"],
            ["Classic comic", "Skull mask under a white hood, white cape, blue and orange suit, sword and shield", "Comic fans; brighter and more unusual"],
          ],
        },
      },
      {
        heading: "Helmet or mask",
        bullets: [
          "Film: look for a full-face helmet with a dark, skull-like visor. Check you can see through it before buying.",
          "Comic: a white skull mask under a white hood, with the hood edges pulled forward.",
          "Ventilation matters: helmets get hot. Plan to take it off between photos.",
        ],
      },
      {
        heading: "Building the stolen arsenal",
        paragraphs: [
          "The joke is that Taskmaster copies every Avenger's style, so the more recognisable weapons you carry, the better. Keep everything foam, plastic or toy so it passes event rules.",
        ],
        bullets: [
          "A round shield on the back: repaint a Captain America toy shield in dark grey or black.",
          "A sword or baton.",
          "A toy bow, for the Hawkeye reference.",
          "Claw gloves, for Black Panther.",
          "A web of straps and holsters to hang it all from.",
        ],
      },
      {
        heading: "The Black Widow group",
        placement: "end",
        bullets: [
          "Natasha Romanoff: the white suit or black suit from Black Widow, red hair.",
          "Yelena Belova: a green-grey vest with lots of pockets.",
          "Red Guardian: the red suit, star on the chest and a shield.",
          "Melina Vostokoff: dark tactical gear.",
        ],
      },
    ],
    faqs: [
      { question: "Who is Taskmaster in the MCU?", answer: "Antonia Dreykov, played by Olga Kurylenko, in Black Widow (2021)." },
      { question: "What is Taskmaster's power?", answer: "Photographic reflexes: copying any fighting style after watching it." },
      { question: "Is Taskmaster a good costume for someone shy?", answer: "Yes: the helmet covers your face completely, and the props give you something to do in photos." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "fat-thor-costume": {
    updated: U,
    intro: [
      "Fat Thor, or 'Bro Thor', from Avengers: Endgame is a grey cardigan over a stained T-shirt, sweatpants, slides, a scraggly blond beard, long messy hair, a beer belly and a can in hand. It's one of the funniest Marvel costumes, it's comfortable all night, and most of it is already in your wardrobe.",
      "There are two versions: couch Thor in New Asgard and battle Thor in armor with a braided beard. This guide covers both, the belly and beard, props, and how to bring the rest of the Endgame crew.",
    ],
    sections: [
      {
        heading: "Couch Thor or battle Thor?",
        placement: "top",
        table: {
          head: ["Look", "Scene", "Pieces"],
          rows: [
            ["Couch Thor", "New Asgard, gaming with Korg and Miek", "Grey cardigan, T-shirt, sweatpants, slides, sunglasses, beer"],
            ["Battle Thor", "The final battle", "Dark armor and cape over the belly, braided beard and hair, Stormbreaker and Mjölnir"],
          ],
        },
      },
      {
        heading: "Belly, beard and hair",
        bullets: [
          "Belly: a padded belly suit or a small pillow strapped on under the T-shirt; let it show under the cardigan.",
          "Beard: long, scraggly, dirty-blond. Rough it up with a comb rather than wearing it neat.",
          "Hair: a long, messy blond wig. For battle Thor, braid the beard and a section of the hair.",
          "A few crumbs or a smear of 'stain' on the T-shirt finishes it.",
        ],
      },
      {
        heading: "Props that get laughs",
        bullets: [
          "A beer can, always.",
          "Stormbreaker: a foam axe-hammer with a wooden-look handle.",
          "A game controller and a headset, for the gaming scene.",
          "A bag of crisps, or a cardboard 'New Asgard' sign.",
        ],
      },
      {
        heading: "The Endgame crew",
        placement: "end",
        bullets: [
          "Smart Hulk: green paint, a cardigan and glasses.",
          "Rocket Raccoon: a raccoon plush in a flight suit.",
          "Korg: a stone-textured suit and a game controller.",
          "Lean Thor, for a 'before and after' pair.",
        ],
      },
    ],
    faqs: [
      { question: "Why is Thor fat in Endgame?", answer: "After failing to stop Thanos, Thor spends five years drinking and gaming in New Asgard, depressed and out of shape." },
      { question: "Is Fat Thor a good costume for any body type?", answer: "Yes. Belly padding does the work, and the rest is loose, comfortable clothing." },
      { question: "What is Thor's axe called?", answer: "Stormbreaker, forged in Avengers: Infinity War." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "homelander-cosplay": {
    updated: U,
    intro: [
      "Homelander is a navy blue suit, an American flag cape, gold eagle shoulder pieces, a gold belt, short side-parted blond hair and a smile that never reaches his eyes. The flag cape and gold eagles are what separate him from a generic superhero, and a glass of milk is the in-joke fans love.",
      "This guide covers the suit details, how to attach the cape so it hangs right, the hair, optional laser eyes, and how to assemble The Seven or The Boys around him.",
    ],
    sections: [
      {
        heading: "Getting the suit details right",
        placement: "top",
        bullets: [
          "Colour: deep navy, with a textured or scale-like finish rather than flat shiny blue.",
          "Eagles: raised gold eagle pieces on each shoulder. Flat printed ones are the most common giveaway of a cheap set.",
          "Belt: a gold belt with a buckle at the waist.",
          "Boots: navy or dark blue, knee-high or boot covers.",
        ],
      },
      {
        heading: "Making the cape hang properly",
        paragraphs: [
          "Homelander's cape falls from the shoulder eagles and drapes behind him. Attach it to the eagles with hidden press studs, Velcro or safety pins on the inside, so the weight sits on your shoulders, not your neck. A cape that's too short or too light looks like a beach towel; choose one that reaches at least the backs of your knees.",
        ],
      },
      {
        heading: "Hair, face and laser eyes",
        paragraphs: [
          "Short blond hair with a neat side parting, held with gel. Antony Starr's Homelander has a fixed, slightly too-wide smile and a still stare, which is worth practising in the mirror. For evening events, red light-up glasses or red LED 'laser eye' props make great photos.",
        ],
      },
      {
        heading: "Assembling The Seven or The Boys",
        placement: "end",
        bullets: [
          "Starlight: a white suit with a star and long blonde hair.",
          "Queen Maeve: armor and a sword.",
          "The Deep: a green scale suit and a trident.",
          "A-Train: a blue speed suit.",
          "Billy Butcher: a long black coat, a beard and a crowbar.",
          "Hughie: a hoodie and nervous energy.",
          "Soldier Boy, for a rival.",
        ],
      },
    ],
    faqs: [
      { question: "Who plays Homelander?", answer: "Antony Starr, in Amazon's The Boys." },
      { question: "What are Homelander's powers?", answer: "Super strength, flight, invulnerability, super hearing and heat vision from his eyes." },
      { question: "Is Homelander a hero or a villain?", answer: "He's presented to the public as a hero, but in the show he is the main antagonist." },
    ],
  },
};
