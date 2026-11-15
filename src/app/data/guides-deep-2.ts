// =============================================================================
// CostumesPlanet.com — Deep rewrites, batch 2
// Same rules as guides-deep.ts: fields replace the base guide's, faqs append,
// and every section heading is written for this character only.
// =============================================================================

import type { GuideContent } from "./guides";

const U = "2026-11-15";

export const guidesDeep2: Record<string, Partial<GuideContent>> = {
  // ───────────────────────────────────────────────────────────────────────────
  "mean-girls-christmas-costume": {
    updated: U,
    intro: [
      "Four identical red Santa dresses with white fur trim, Santa hats, black knee-high boots, black gloves and a candy cane each: that is the whole Mean Girls 'Jingle Bell Rock' costume, and the matching is what makes it work. One person in a Santa dress is a Christmas costume; four in a row doing the routine is Regina, Gretchen, Karen and Cady at the Winter Talent Show.",
      "It's one of the most-worn group costumes of the last twenty years because it's cheap, comfortable and impossible to misread. This guide covers who plays whom (hair is how people tell you apart), how to buy four matching outfits without a sizing mess, a simple way to learn the routine, and how to adapt it for three or five people.",
    ],
    sections: [
      {
        heading: "Who's who: telling the four Plastics apart",
        placement: "top",
        paragraphs: [
          "The dresses are identical, so hair is what identifies each character. Assign roles by your group's natural hair if you can, and use wigs for the rest.",
        ],
        table: {
          head: ["Character", "Played by", "Hair", "Tip"],
          rows: [
            ["Regina George", "Rachel McAdams", "Long, golden blonde, glossy", "Stands centre and leads"],
            ["Gretchen Wieners", "Lacey Chabert", "Dark brown, big and voluminous", "Big hair and big energy"],
            ["Karen Smith", "Amanda Seyfried", "Long, pale blonde, straight", "Slightly late on every move"],
            ["Cady Heron", "Lindsay Lohan", "Long, red-auburn", "Ends up singing when the music cuts"],
          ],
        },
      },
      {
        heading: "Buying four matching outfits without a sizing headache",
        bullets: [
          "Order every dress from the same listing in the same colour, so the reds and the fur match. Two listings of 'red Santa dress' never look the same side by side.",
          "Collect everyone's size first and order once; add one size up for anyone between sizes, because velvet has little stretch.",
          "Order by late November. Santa dresses sell out in the first two weeks of December.",
          "Match the boots too: same height and similar heel. Mixed boots are the first thing photos show.",
          "Velvet looks closest to the film and photographs richer than felt or satin.",
        ],
      },
      {
        heading: "Learning the routine in one evening",
        paragraphs: [
          "The talent-show dance is short and simple, which is why it works at parties. Pull up the scene, slow it to half speed, and learn it in four-count chunks.",
        ],
        bullets: [
          "Start in a line, candy canes in hand, hips out.",
          "Learn the arm and hip moves first; the steps follow the beat of 'Jingle Bell Rock'.",
          "Rehearse the moment the music stops, which is the funniest part to recreate.",
          "Run it three times in costume before the party: boots and hats change how the moves feel.",
          "Assign someone to start the music on cue, and rehearse what you'll do if it cuts out: in the film, it does.",
        ],
      },
      {
        heading: "Adapting it for three or five people",
        bullets: [
          "Three: Regina, Gretchen and Cady. Karen is the easiest to drop.",
          "Five: add Damian on the music, in a hoodie and sunglasses, or Janis in dark eyeliner heckling from the side.",
          "Couples: one Santa dress plus a partner as Aaron Samuels in a casual hoodie, with his hair pushed back.",
          "A whole office: everyone in Santa dresses, then a 'Burn Book' made from a pink notebook as a prop.",
        ],
      },
      {
        heading: "Staying warm at outdoor events",
        placement: "end",
        paragraphs: [
          "The dresses are short and the film has bare legs. For anything outside, all four wear matching black opaque tights and bring a long black coat to take off for photos. A thin thermal under the velvet is invisible and makes a long party much more comfortable.",
        ],
      },
    ],
    faqs: [
      { question: "What song do the Plastics dance to in Mean Girls?", answer: "'Jingle Bell Rock', the 1957 Bobby Helms song, at the Winter Talent Show in Mean Girls (2004)." },
      { question: "Can I do the Mean Girls Christmas costume alone?", answer: "You can, with a red Santa dress, the hat, boots and a candy cane, but it reads as a generic Santa outfit. Even two people in matching outfits make the reference clear." },
      { question: "Is the Mean Girls costume good for an office Christmas party?", answer: "Yes. Add opaque tights and it is both work-appropriate and one of the most recognisable group costumes of the season." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "the-cousin-eddie-dickie-costume": {
    updated: U,
    intro: [
      "Cousin Eddie is a white V-neck sweater with a black dickie (a fake turtleneck collar) showing at the neck, light slacks and white shoes, or, for the other famous scene, a bathrobe, a fur trapper hat, black socks and a can of beer. Both are cheap, comfortable and instantly funny to anyone who has seen National Lampoon's Christmas Vacation.",
      "It is one of the best Christmas-party costumes because it doubles as an outfit: you can wear the sweater version all evening. This guide covers both looks, how to make the dickie read in photos, props, and how to build a full Griswold family group around him.",
    ],
    sections: [
      {
        heading: "Dinner Eddie or RV Eddie?",
        placement: "top",
        table: {
          head: ["Look", "Pieces", "Best for"],
          rows: [
            ["Dinner Eddie", "White V-neck sweater, black dickie, light slacks, white shoes, slicked hair", "Parties where you'll be seated and in photos"],
            ["RV Eddie", "Old bathrobe, fur trapper hat with flaps down, black socks, slippers, beer can", "Comfort, laughs and long nights"],
            ["Both at once", "Wear the dinner outfit and carry the trapper hat and robe for a mid-party switch", "Costume contests"],
          ],
        },
      },
      {
        heading: "Making the dickie the star",
        paragraphs: [
          "The joke is that the black collar is obviously not part of a real turtleneck. If it disappears inside a crew-neck sweater, nobody gets it.",
        ],
        bullets: [
          "Use a deep V-neck sweater, white or cream, so the black panel shows in a clear triangle.",
          "Tuck the dickie's front bib flat; a crumpled bib shows as lumps under a thin sweater.",
          "Slightly too-short slacks and white shoes complete the off-kilter look.",
          "Slick your hair down and back with gel. Eddie is never not groomed for the occasion.",
        ],
      },
      {
        heading: "Props that sell it",
        bullets: [
          "A beer can, opened, for the RV look.",
          "A moose-head Christmas mug, the Griswolds' famous eggnog mug, for anyone in the group.",
          "A 'Jelly of the Month Club' certificate, Clark's infamous Christmas bonus, as a printed gag.",
          "A toy RV or a cardboard RV cut-out for photos.",
        ],
      },
      {
        heading: "Building a Christmas Vacation group",
        placement: "end",
        bullets: [
          "Clark Griswold: a Christmas sweater, a Santa hat or a heavy coat with tangled Christmas lights, and the moose mug.",
          "Ellen Griswold: a cosy holiday sweater and a calm, long-suffering expression.",
          "Catherine: Eddie's wife, in a long coat and headscarf.",
          "Aunt Bethany: a cardigan, pearls and a wrapped present with a holiday gelatin mould (or a cat) inside.",
          "Rusty and Audrey: kids or adults in 80s winter gear.",
          "Snots the dog: any big dog plush, or the real family dog in a bandana.",
        ],
      },
    ],
    faqs: [
      { question: "Who plays Cousin Eddie?", answer: "Randy Quaid, in National Lampoon's Vacation (1983) and Christmas Vacation (1989)." },
      { question: "What is a dickie?", answer: "A detachable false collar, here a black turtleneck collar with a small bib, worn under a sweater to look like a full turtleneck." },
      { question: "Is Cousin Eddie a good ugly-sweater party costume?", answer: "Yes. The dinner look is a sweater outfit, so it fits the dress code and still counts as a costume." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "arya-stark-costume": {
    updated: U,
    intro: [
      "Arya Stark is layered brown and grey wool and leather, dark trousers and boots, Needle on her left hip, the Valyrian steel dagger at her back and shoulder-length brown hair with the top half tied back. The clothes are plain on purpose; Needle and the dagger are what people recognise.",
      "Arya changes more than almost any Game of Thrones character, from Winterfell tomboy to Braavos acolyte to the assassin who ends the Night King, so the first decision is which Arya you are. This guide maps each stage to its pieces, explains Needle and the dagger, and covers hair, the details fans notice and group ideas.",
    ],
    sections: [
      {
        heading: "Which Arya? Her looks across eight seasons",
        placement: "top",
        table: {
          head: ["Stage", "Seasons", "What defines it"],
          rows: [
            ["Winterfell", "1", "A simple girl's dress she hates, or the boy's tunic for sword practice; Needle new"],
            ["On the road as 'Arry'", "2–4", "Short, choppy hair, dirty boy's clothes, a hood; travelling with Gendry or the Hound"],
            ["Braavos", "5–6", "Grey House of Black and White robes, or a street-seller's plain clothes; Needle hidden"],
            ["Return to Westeros", "7", "Dark leather jerkin, a grey fur-lined cloak, Needle and a Stark-wolf feel"],
            ["Battle of Winterfell", "8", "Dark, close-fitting layers, the dragonglass staff and the Valyrian steel dagger"],
          ],
        },
        paragraphs: [
          "The season-seven and season-eight looks are what most people picture today, and they are the easiest to buy for.",
        ],
      },
      {
        heading: "Needle and the dagger, explained",
        paragraphs: [
          "Needle is a small, thin sword, closer to a rapier than a broadsword, that Jon Snow had made for her before they left Winterfell. A narrow foam or replica blade around 60 cm long is right; a wide medieval sword looks wrong immediately. Wear it on the left hip.",
          "The Valyrian steel dagger, once used in the attempt on Bran's life, is the blade Arya uses to kill the Night King. It has a curved blade and a pale dragonbone hilt. Tuck it at the small of your back or in the belt on the right side. For conventions, buy foam or resin versions of both.",
        ],
      },
      {
        heading: "Hair: half up, a little messy",
        paragraphs: [
          "From season six on, Arya wears shoulder-length brown hair with the top section pulled back and tied, usually with a few strands loose. If your hair is long, tie the top half back and tuck the length into the collar. For the 'Arry' look, a short, choppy brown wig works best. Keep makeup almost invisible: Arya never looks styled.",
        ],
      },
      {
        heading: "Details that make it look like the show",
        bullets: [
          "Matte, worn fabrics in grey, brown and black. Avoid anything shiny.",
          "Layers: a long-sleeve base, a tunic or jerkin, bracers, a belt, then a cloak.",
          "Flat, scuffed boots. Arya moves fast and quietly.",
          "A small notebook as 'the list', with names written in it, is a prop fans love.",
          "A blank, unreadable expression. 'A girl has no name.'",
        ],
      },
      {
        heading: "Arya with friends",
        placement: "end",
        bullets: [
          "The Hound: black leather, a burn scar and a roast chicken.",
          "Jon Snow, for the brother-sister reunion; give him a matching Stark look.",
          "Gendry with a blacksmith's apron and a hammer.",
          "The Night King, for the Battle of Winterfell finale.",
          "All the Stark children plus Ned and Catelyn for a family group.",
        ],
      },
    ],
    faqs: [
      { question: "Who taught Arya to fight?", answer: "Syrio Forel, the First Sword of Braavos, taught her 'water dancing' in season one. She later trains with the Faceless Men in Braavos." },
      { question: "What does 'Stick them with the pointy end' mean?", answer: "It's Jon Snow's advice to Arya when he gives her Needle, and one of the show's most quoted lines." },
      { question: "Is Arya Stark a good costume for kids?", answer: "Yes. A brown tunic, leggings, boots and a foam Needle make a comfortable, active costume." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "levi-ackerman-cosplay": {
    updated: U,
    intro: [
      "Levi Ackerman is the Survey Corps uniform (a short tan jacket with the Wings of Freedom, a white shirt, a white cravat, white trousers and brown knee boots) plus the brown ODM gear harness, a green hooded cloak, dual blades and a black undercut. The cravat and the undercut are what separate Levi from every other Scout, so if you only upgrade two things, upgrade those.",
      "Because every Scout wears the same uniform, Levi is the best anime value there is: a set does most of the work, and your friends can join as Eren, Mikasa, Armin, Erwin or Hange for very little. This guide covers the variants, a step-by-step for the harness most people get wrong, the cravat and wig, and the mistakes fans spot.",
    ],
    sections: [
      {
        heading: "Three Levis to choose from",
        placement: "top",
        table: {
          head: ["Look", "Pieces", "Why choose it"],
          rows: [
            ["Survey Corps captain", "Full uniform, harness, cloak, blades, cravat", "The classic; what everyone expects"],
            ["Cleaning Levi", "White shirt, headscarf, a cloth tied over nose and mouth, a broom or duster", "A fan favourite and very comfortable"],
            ["Off-duty", "White shirt, cravat, dark trousers, a teacup held by the rim", "Low-effort, still unmistakable"],
          ],
        },
      },
      {
        heading: "Putting the ODM harness on correctly",
        paragraphs: [
          "Most cheap harnesses look wrong because they are worn too loose or in the wrong order. Do this before the jacket goes on.",
        ],
        bullets: [
          "Trousers and shirt on first, boots last so you can bend.",
          "Step into the leg straps; they wrap the thighs and should sit snug with no sag.",
          "Fasten the waist belt at the natural waist, above the trouser waistband.",
          "Bring the chest straps over the shoulders and buckle them so they cross neatly under the chest.",
          "Put the jacket on over the harness; the straps should show below the jacket hem and at the chest.",
          "Check in a mirror that every strap is flat and symmetrical. Twisted straps are the first thing photos show.",
        ],
      },
      {
        heading: "The cravat and the undercut",
        paragraphs: [
          "Levi's cravat is white, tied loosely at the throat with the ends tucked into the shirt so it sits like a soft folded collar. A long white scarf of thin cotton folded lengthways does the job if your set doesn't include one.",
          "The undercut is short and dark at the sides and back, with a longer top parted in the centre and falling over the forehead. Wigs with a shaved-look underside save a lot of styling; trim the fringe so it sits just above the eyes, and keep it flat rather than spiky.",
        ],
      },
      {
        heading: "Mistakes Attack on Titan fans notice",
        bullets: [
          "No cravat: without it you are a generic Scout.",
          "A jacket that's too long. The Survey Corps jacket is cropped above the waist.",
          "The wrong emblem: the Wings of Freedom are one blue and one white wing, overlapping.",
          "A bright or lime-green cloak; it should be a muted forest green.",
          "Smiling. Levi doesn't.",
        ],
      },
      {
        heading: "Squad and group ideas",
        placement: "end",
        bullets: [
          "The 104th trio: Eren, Mikasa (red scarf) and Armin (blond bob).",
          "Commanders: Erwin Smith (blond side part) and Hange Zoë (goggles and ponytail).",
          "A Titan: a friend in a nude bodysuit with a big grin for the photo op.",
          "Levi Squad: Petra, Oluo, Eld and Gunther, all in the same uniform.",
        ],
      },
    ],
    faqs: [
      { question: "How tall is Levi Ackerman?", answer: "160 cm (about 5 ft 3 in) in the series, which makes him one of the most accessible cosplays for shorter fans." },
      { question: "Why does Levi hold his teacup by the rim?", answer: "The series never fully explains it; fans have plenty of theories. It is a small habit that makes a great prop." },
      { question: "What is ODM gear?", answer: "Omni-directional mobility gear: the harness, gas canisters and grappling hooks Survey Corps soldiers use to fly between buildings and trees while fighting Titans." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "scarface-costume": {
    updated: U,
    intro: [
      "Tony Montana's best-known costume is the white suit with a black shirt open at the collar: the look from the Scarface poster. Add a gold chain, slicked-back dark hair and a small scar near the eye and you are recognisable from across a room. The double-breasted plaid suit with a red striped shirt is the second classic, easier to find and less likely to be duplicated.",
      "This guide compares Tony's outfits, explains how to fit an 80s suit so it looks the part, covers hair and the scar, gives sensible prop advice for that famous line, and suggests partners for a couples or group costume.",
    ],
    sections: [
      {
        heading: "Tony Montana's outfits compared",
        placement: "top",
        table: {
          head: ["Look", "Pieces", "Notes"],
          rows: [
            ["White suit", "White suit, black shirt open at the collar, gold chain, white or black shoes", "The poster look and the most recognised"],
            ["Plaid suit", "Double-breasted plaid suit, red striped shirt, red pocket square, gold chain", "Easier to find second-hand; more unusual at parties"],
            ["Early Miami", "Loud short-sleeved printed shirt, open collar, slacks, chain", "Cheapest and most comfortable; best with a group"],
          ],
        },
      },
      {
        heading: "Getting the 80s suit fit right",
        paragraphs: [
          "Tony's suits are big: wide lapels, padded shoulders, roomy trousers with a high rise. A slim modern suit looks wrong even in the right colour.",
        ],
        bullets: [
          "Buy a size up in the jacket and wear it open.",
          "Look for wide peak lapels and strong shoulders; thrift and vintage shops are the best source.",
          "No tie, ever. The shirt is open two or three buttons down.",
          "Chunky gold jewellery: a thick chain and a ring. Tony's taste is loud, not delicate.",
        ],
      },
      {
        heading: "Hair and the scar",
        paragraphs: [
          "Slick dark hair straight back with a strong gel and comb it flat; a little volume on top is fine. The scar is a thin line on the face near the eye; draw it with a reddish-brown eyeliner, then soften the edges with a fingertip. Scar wax gives a raised effect if you want to go further.",
        ],
      },
      {
        heading: "Prop advice for 'my little friend'",
        paragraphs: [
          "Many venues ban realistic replica guns, and some places restrict them in public altogether. If you want the line, carry an obviously toy prop (brightly coloured or with an orange tip), check the venue's rules first, and never carry it on public transport or in the street. A cigar and a glass of something are safer props that still read as Tony.",
        ],
      },
      {
        heading: "Who to bring",
        placement: "end",
        bullets: [
          "Elvira Hancock: a sleek blonde bob, a slinky satin dress and an air of boredom.",
          "Manny Ribera: a loud 80s shirt, open collar and a moustache.",
          "A Miami Vice crew: pastel jackets over T-shirts for a full 80s Miami theme.",
        ],
      },
    ],
    faqs: [
      { question: "Who played Tony Montana?", answer: "Al Pacino, in Brian De Palma's Scarface (1983), written by Oliver Stone." },
      { question: "What is Tony Montana's famous line?", answer: "'Say hello to my little friend!' from the film's final shootout." },
      { question: "Is a Scarface costume good for a 1980s party?", answer: "It's one of the best: the white suit or a loud printed shirt fits an 80s theme perfectly." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "deadpool-cosplay": {
    updated: U,
    intro: [
      "Deadpool is a red suit with black side panels, a red mask with black eye patches and white eyes, two katanas crossed on his back and a belt with the round Deadpool buckle. The mask carries the whole costume, so it is the one piece worth paying more for.",
      "The good news: Deadpool jokes about his own suit, so you don't need screen accuracy to get a reaction. This guide compares the suits and the alternative 'pools', explains what makes a good mask, covers sizing, props that get laughs, and who to bring.",
    ],
    sections: [
      {
        heading: "Which suit, or which 'pool'?",
        placement: "top",
        table: {
          head: ["Version", "What defines it", "Good for"],
          rows: [
            ["Comic classic", "Bright red and black, flat panels, white eyes", "Simple and bold; easy to find"],
            ["Film suit", "Darker red with textured panels, leather-look details", "Photos and conventions"],
            ["X-Force grey", "Grey and black suit with red accents, from Deadpool 2", "Standing out from the other Deadpools"],
            ["Lady Deadpool", "Same colours, a long blonde ponytail out of the mask", "Couples or a solo twist"],
            ["Kidpool / Dogpool", "Child-sized suit, or a dog in a red hoodie and mask", "Families; scene-stealing photos"],
          ],
        },
      },
      {
        heading: "What makes a Deadpool mask look good",
        bullets: [
          "A face shell: a mask with a rigid inner shell holds the shape of the eye patches instead of wrinkling across your nose.",
          "Lenses: white or mirrored lenses set into the eyes give the cartoon look and hide your eyes.",
          "Breathability: look for a mesh mouth panel or a fabric that lets air through; you'll wear it for hours.",
          "Anti-fog: rub a little anti-fog spray on the inside of the lenses before you go.",
          "Fit: a mask that is too big shows folds at the neck; one size down usually looks better.",
        ],
      },
      {
        heading: "Sizing the suit",
        paragraphs: [
          "Printed bodysuits run small and have little stretch at the torso. Order a size up, try it on as soon as it arrives, and check the zip runs smoothly; a stuck back zip at a party is no fun. Wearing compression shorts and a thin top underneath smooths the lines and makes the suit more comfortable.",
        ],
      },
      {
        heading: "Props that get the laughs",
        bullets: [
          "Two katanas in a back harness: foam if you're going anywhere with a prop policy.",
          "A chimichanga, real or a felt prop.",
          "A unicorn plush, tucked under one arm.",
          "A small Wolverine action figure for running jokes.",
          "Pouches on the belt and thigh holsters for bulk.",
        ],
      },
      {
        heading: "Bring a partner",
        placement: "end",
        bullets: [
          "Wolverine in the yellow-and-blue suit from Deadpool & Wolverine: the obvious and best pairing.",
          "Lady Deadpool, for a matched couple.",
          "Dogpool, if you have a patient dog.",
          "Cable or Domino for a Deadpool 2 trio.",
        ],
      },
    ],
    faqs: [
      { question: "Can I eat or drink in a Deadpool mask?", answer: "Not easily. Look for a mask with a hidden mouth opening or one you can roll up to the nose, which many cosplayers do for drinks." },
      { question: "Who created Deadpool?", answer: "Rob Liefeld and Fabian Nicieza, in The New Mutants #98 (1991)." },
      { question: "Is a Deadpool costume hot to wear?", answer: "Yes, full bodysuits and masks get warm indoors. Choose a breathable fabric and take the mask off between photos." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "jinx-cosplay-costume": {
    updated: U,
    intro: [
      "Jinx is two extremely long blue braids, pink-purple cloud tattoos, a strappy crop top, striped legwear, a tangle of belts and a big weapon, ideally Fishbones, her shark-faced rocket launcher. The braids are what people see first, and they are also the part most cosplayers underestimate.",
      "Before buying, decide between Arcane Jinx and classic League of Legends Jinx: the silhouettes are different. This guide compares the versions, shows how to get braids long enough, how to do the tattoos so they last the night, what to know about props and makeup, and who to bring.",
    ],
    sections: [
      {
        heading: "Arcane, classic or a skin?",
        placement: "top",
        table: {
          head: ["Version", "Defining pieces", "Difficulty"],
          rows: [
            ["Arcane", "Cropped strappy top, high-waisted striped trousers, belts, knee-length braids, darker palette", "Moderate"],
            ["Classic League", "Bikini-style top, short shorts, one striped stocking, ammo belts, braids", "Moderate"],
            ["Star Guardian", "A magical-girl League skin in pink, purple and white with stars", "Harder; costume set recommended"],
          ],
        },
      },
      {
        heading: "Braids that are actually long enough",
        paragraphs: [
          "Arcane Jinx's braids reach close to her knees, and short braids are the most common giveaway of a quick Jinx. Look for pre-braided wigs of 40 inches or more.",
        ],
        bullets: [
          "Pre-braided wigs are fastest; check the listing photos show the braids hanging below the waist on the model.",
          "Extending a shorter wig: braid in matching blue braiding hair (sold for box braids) from the middle down and secure the ends with clear elastics.",
          "Weight: long braids pull the wig backwards. Use several wig pins or a wig grip band.",
          "Fringe: Jinx has a short, blunt, slightly ragged fringe. Trim it to sit at eyebrow level.",
        ],
      },
      {
        heading: "Cloud tattoos that last all night",
        bullets: [
          "Temporary tattoo sheets are the quickest. Apply to clean, oil-free skin and press with a damp cloth for a full minute.",
          "For a hand-drawn look, outline the clouds with a pink-purple body-safe liner, then fill with a slightly lighter shade.",
          "Placement: down the left arm and shoulder, and around the waist and hip.",
          "Seal with a light mist of setting spray or translucent powder so they don't smudge against the belts.",
        ],
      },
      {
        heading: "Props and convention rules",
        paragraphs: [
          "Fishbones is big. Many conventions limit prop size and ban anything that looks like a real firearm, so check the rules first. Pow-Pow and Zapper are smaller and easier to carry all day. A foam or 3D-printed prop in bright colours is usually allowed; Jinx's weapons are cartoonish enough that this suits the character.",
        ],
      },
      {
        heading: "Who to bring",
        placement: "end",
        bullets: [
          "Vi: pink hair, a 'VI' tattoo near the eye and big boxing gauntlets.",
          "Caitlyn: blue Enforcer coat, a hat and a long rifle.",
          "Ekko: white hair, a hooded jacket and a hoverboard.",
          "Silco: a dark suit, and a scarred, discoloured eye.",
          "Powder: a child-sized younger Jinx, for families.",
        ],
      },
    ],
    faqs: [
      { question: "What colour are Jinx's tattoos?", answer: "Pink to purple clouds, outlined in a darker shade, mostly on her left arm and around her torso." },
      { question: "Is Jinx in Arcane season two?", answer: "Yes. Arcane's second and final season was released on Netflix in November 2024 and continues Jinx and Vi's story." },
      { question: "What's an easy last-minute Jinx?", answer: "A pre-braided blue wig, a dark crop top, striped leggings and a couple of belts, with drawn-on cloud tattoos." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "link-cosplay": {
    updated: U,
    intro: [
      "Link is either the classic green tunic and long pointed cap over a white undershirt, or the blue Champion's Tunic from Breath of the Wild, with pointed ears, brown boots, the Master Sword and the Hylian Shield. The green cap is the version everyone knows; the blue tunic is the one gamers under 30 will recognise first.",
      "This guide helps you pick a Link, shows how to make the Hylian Shield (the single best upgrade), blend elf ears, style the hair for each version and avoid the mix-ups that bug Zelda fans, plus who to bring for a group.",
    ],
    sections: [
      {
        heading: "Pick your Link",
        placement: "top",
        table: {
          head: ["Version", "Key pieces", "Best for"],
          rows: [
            ["Ocarina of Time / Twilight Princess", "Green tunic and cap, white or cream leggings, brown boots, gauntlets", "Instant recognition by anyone"],
            ["The Wind Waker", "Bright green tunic and cap, big cartoon eyes, short blond hair", "Kids and cartoon fans"],
            ["Breath of the Wild", "Blue Champion's Tunic with white Sheikah patterns, brown trousers, short ponytail", "Gamers and conventions"],
            ["Tears of the Kingdom", "Several outfits from the game; check screenshots for the one you want", "Recent fans"],
          ],
        },
      },
      {
        heading: "Making a Hylian Shield that looks right",
        paragraphs: [
          "The Hylian Shield is the strongest visual cue in the whole costume. A ready-made prop is easiest; a homemade one costs very little.",
        ],
        bullets: [
          "Cut a classic heater shield shape from EVA foam or thick cardboard, roughly 60 cm tall.",
          "Paint the face blue with a silver border, then add the red bird crest in the lower half and the gold Triforce above it.",
          "Seal with a matte varnish, then add a strap and a handle to the back.",
          "Wear it on your back between photos; it frees your hands.",
        ],
      },
      {
        heading: "Ears and hair",
        paragraphs: [
          "Choose elf ears close to your skin tone and blend the join with a little matching foundation. Fit them before the wig so the hair covers the seam.",
          "Classic Link has shoulder-length blond hair with a centre-parted fringe under the cap. Breath of the Wild Link has the same colour tied back in a small ponytail with loose side pieces. Either works with your own hair if it's close in colour.",
        ],
      },
      {
        heading: "Mix-ups Zelda fans notice",
        bullets: [
          "Calling him Zelda. Zelda is the princess.",
          "The cap without the tunic, or the tunic in a shiny satin green. Matte cotton or felt looks right.",
          "Mixing versions: the blue Champion's Tunic with the long green cap.",
          "A sword with no Master Sword details: the purple-blue hilt and wing-shaped guard are what make it read.",
        ],
      },
      {
        heading: "Group and couples ideas",
        placement: "end",
        bullets: [
          "Princess Zelda, matched to the same game.",
          "Ganondorf, for a hero-and-villain pair.",
          "A Korok: a leaf-shaped mask and a green outfit, great for kids.",
          "Navi: a friend in light blue with fairy wings and a small light.",
        ],
      },
    ],
    faqs: [
      { question: "What colour is Link's tunic?", answer: "Green in most games; blue (the Champion's Tunic) in Breath of the Wild." },
      { question: "Is Link left-handed?", answer: "In most games before Skyward Sword and Breath of the Wild, yes. Newer games made him right-handed by default." },
      { question: "What is a good Link costume for a child?", answer: "The Wind Waker or classic green look: a green tunic, a long cap, a belt, leggings and a foam sword and shield." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "thanos-cosplay": {
    updated: U,
    intro: [
      "Thanos is purple skin with a ridged chin, either gold armor (Avengers: Endgame) or dark tactical gear (Infinity War), and the Infinity Gauntlet on his left hand. The gauntlet is the costume: a good one with lit stones does more than everything else combined.",
      "The big choice is mask or paint. A latex mask takes 20 minutes and lets you take it off; purple paint takes about 75 minutes and looks far better in photos. This guide walks through both, compares the film looks, explains the gauntlet, and covers bulking up and group ideas.",
    ],
    sections: [
      {
        heading: "Mask or paint? The honest trade-off",
        placement: "top",
        table: {
          head: ["", "Latex mask", "Purple paint + chin prosthetic"],
          rows: [
            ["Time", "About 20 minutes", "About 75 minutes"],
            ["Comfort", "Hot after an hour; easy to remove", "Comfortable once set; hard to remove"],
            ["Photos", "Good from a distance", "Best, especially close up"],
            ["Eating and drinking", "Mask off", "Straw recommended"],
            ["Skill needed", "None", "Basic makeup"],
          ],
        },
      },
      {
        heading: "Painting Thanos, step by step",
        bullets: [
          "Start with a clean, moisturised face and pull your hair back under a bald cap or a tight cap.",
          "Apply the chin prosthetic with spirit gum and blend the edges.",
          "Sponge on water-activated purple paint in thin layers, from the hairline to the neck.",
          "Shade the ridges and cheekbones with a darker purple, and highlight the brow and nose with a lighter one.",
          "Seal with setting spray, and cover your hands with purple paint or gloves.",
        ],
      },
      {
        heading: "Infinity War or Endgame?",
        table: {
          head: ["Film", "Look", "Notes"],
          rows: [
            ["Avengers: Infinity War (2018)", "Dark, practical outfit with gold trim; no helmet", "Easier to wear for long periods"],
            ["Avengers: Endgame (2019)", "Full gold armor with the finned helmet", "More dramatic; heavier and warmer"],
          ],
        },
      },
      {
        heading: "Choosing the Infinity Gauntlet",
        bullets: [
          "Wearable: the fingers should articulate so you can 'snap'.",
          "Lit stones: look for battery-powered LEDs in each stone.",
          "Left hand: that's where Thanos wears it in the films.",
          "Size: adult gauntlets fit over a normal hand; try it with your purple glove underneath.",
        ],
      },
      {
        heading: "Bulking up and group ideas",
        placement: "end",
        paragraphs: [
          "Thanos is huge. A padded muscle suit under the armor broadens your shoulders and chest; boots with a thick sole add height. Then bring a team:",
        ],
        bullets: [
          "The Black Order: Ebony Maw, Proxima Midnight and Corvus Glaive.",
          "Gamora or Nebula, his adopted daughters.",
          "Avengers to chase you: Iron Man, Thor and Captain America.",
          "A 'snap' photo: friends dusted with grey powder, half of them 'disintegrating'.",
        ],
      },
    ],
    faqs: [
      { question: "Who plays Thanos?", answer: "Josh Brolin, through motion capture, in Avengers: Infinity War and Avengers: Endgame." },
      { question: "How do I remove purple face paint?", answer: "Water-activated paint comes off with warm water and gentle soap. Use oil-based cleanser or makeup remover for any residue." },
      { question: "Is Thanos a good costume for a tall person?", answer: "Very. His size is part of the character, and a muscle suit makes the most of it." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "katniss-everdeen-costume": {
    updated: U,
    intro: [
      "Katniss Everdeen is three things: a side braid over the left shoulder, the gold mockingjay pin and a bow with a quiver. Put those on with dark trousers, boots and the black arena jacket and you are Katniss from The Hunger Games, mostly from clothes you may already own.",
      "She has more than the arena look, though: the 'girl on fire' outfits and the Mockingjay armor are both great alternatives. This guide compares her looks, shows how to do the braid properly, covers the bow and pin, and suggests partners from Panem.",
    ],
    sections: [
      {
        heading: "Katniss's looks, film by film",
        placement: "top",
        table: {
          head: ["Look", "Film", "Key pieces"],
          rows: [
            ["The reaping", "The Hunger Games (2012)", "Simple pale blue dress, hair in a braid"],
            ["Girl on fire", "The Hunger Games", "Black outfit with flame effects for the tribute parade; a red-orange gown for the interview"],
            ["Arena", "The Hunger Games", "Black arena jacket, dark trousers, boots, side braid, bow"],
            ["Wedding dress", "Catching Fire (2013)", "White gown that 'burns' into a black mockingjay dress"],
            ["Mockingjay", "Mockingjay (2014–15)", "Black armored suit, quiver, bow, braid"],
          ],
        },
      },
      {
        heading: "The Katniss braid",
        paragraphs: [
          "Her braid starts high on one side of the head and runs diagonally across the back, then falls over the left shoulder. It's a side French braid with a loose finish.",
        ],
        bullets: [
          "Brush hair and part it on the right.",
          "Start a French braid above the right ear, adding hair from both sides as you work diagonally toward the left nape.",
          "Once all the hair is gathered, continue a normal three-strand braid over the left shoulder.",
          "Tie it with a small elastic and loosen the braid slightly with your fingers. It should look practical, not perfect.",
        ],
      },
      {
        heading: "Bow, quiver and pin",
        paragraphs: [
          "A recurve-style bow with a back quiver is right for the arena look. Use soft-tipped or foam arrows anywhere with people around, and leave real archery equipment at home. The mockingjay pin goes on the left side of the chest; on a jacket, fix it high near the collar so it shows in photos.",
        ],
      },
      {
        heading: "Panem partners",
        placement: "end",
        bullets: [
          "Peeta Mellark in a matching arena jacket.",
          "Gale Hawthorne: hunting clothes and a bow.",
          "Effie Trinket: a bright wig, dramatic makeup and an outrageous Capitol dress. Great contrast.",
          "Haymitch Abernathy: a rumpled suit and a flask.",
          "President Snow: a white rose in the lapel and a white beard.",
        ],
      },
    ],
    faqs: [
      { question: "Which district is Katniss from?", answer: "District 12, the coal-mining district." },
      { question: "Who played Katniss Everdeen?", answer: "Jennifer Lawrence, in all four Hunger Games films (2012–2015)." },
      { question: "What is the easiest Katniss costume?", answer: "The arena look: a dark jacket, trousers, boots, a side braid, the mockingjay pin and a toy bow." },
    ],
  },
};
