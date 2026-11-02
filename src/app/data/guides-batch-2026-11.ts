// =============================================================================
// CostumesPlanet.com — Hand-written guide content, batch 2 (Nov 2026)
//
// Same rules as guides.ts: character-specific facts only, no invented
// credentials, item notes explain why a piece matters. Product links use
// Amazon search URLs where a specific ASIN hasn't been confirmed.
// =============================================================================

import type { GuideContent } from "./guides";

const search = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=cplanet0c-20`;

export const guidesBatch2: Record<string, GuideContent> = {
  // ───────────────────────────────────────────────────────────────────────────
  "mike-ditka-costume": {
    characterName: "Mike Ditka",
    updated: "2026-11-02",
    seoTitle: "Mike Ditka Costume: Bears Sweater Vest, Shades & Mustache",
    metaDescription:
      "How to dress as Mike Ditka, the 1985 Chicago Bears coach: navy Bears sweater vest, shirt and tie, aviator sunglasses, mustache and a cigar prop. Includes the SNL 'Da Bears' Superfans version.",
    h1Title: "Mike Ditka Costume Guide (Chicago Bears Coach)",
    excerpt:
      "Da Coach comes down to a navy Bears sweater vest over a shirt and tie, aviator sunglasses, a thick mustache, slicked-back hair and a cigar.",
    intro: [
      "Mike Ditka coached the Chicago Bears from 1982 to 1992 and led the 1985 team to a Super Bowl XX win. His sideline look from that era is what people picture: a navy Bears sweater vest over a white shirt and tie, aviator sunglasses, a thick mustache and slicked-back hair, usually with a cigar or a rolled-up play sheet in hand.",
      "This costume is cheap and fast. Most of it is ordinary menswear, and the only pieces you'll likely need to buy are the vest, the sunglasses and the mustache. It works on its own, and it's even better in a group as the Saturday Night Live 'Superfans' who worship 'Da Bears' and 'Da Coach'.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$30–$70, less if you own a white shirt and khakis" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Bears sweater vest + aviators + mustache" },
    ],
    items: [
      { name: "Navy Chicago Bears sweater vest", url: search("Chicago Bears sweater vest navy"), note: "The single most important piece. A plain navy V-neck vest with an orange 'C' or Bears logo pinned or ironed on also works." },
      { name: "White dress shirt", url: search("men white long sleeve dress shirt"), note: "Long sleeves, worn buttoned to the top with the tie. Ditka rarely looked casual on the sideline." },
      { name: "Navy and orange striped tie", url: search("navy orange striped tie"), note: "Bears colours. Any navy tie with orange in it reads correctly." },
      { name: "Aviator sunglasses", url: search("aviator sunglasses gold frame"), note: "Classic teardrop aviators with a gold frame. Keep them on for photos." },
      { name: "Thick fake mustache", url: search("fake mustache dark brown thick"), note: "A full, slightly bushy mustache in dark brown or black. Trim a stick-on one to a straight edge; Ditka's was neat, not handlebar." },
      { name: "Khaki or grey slacks", url: search("men khaki slacks"), note: "Pleated khakis or grey trousers. Avoid jeans." },
      { name: "Fake cigar", url: search("fake cigar prop"), note: "A prop cigar, unlit, is his signature accessory. A clipboard or whistle on a lanyard is a good second prop." },
    ],
    dressingGuide: [
      { itemName: "Shirt, tie and vest", steps: [
        "Put on the white shirt and knot the tie fairly tightly; the collar should sit closed.",
        "Pull the sweater vest over it and tuck everything into the slacks with a dark belt.",
        "Push the shirt sleeves down and buttoned; rolled sleeves look more like a coach from a different era.",
      ] },
      { itemName: "Hair, mustache and face", steps: [
        "Comb your hair straight back with a strong gel or pomade. If your hair is short, a slicked-back style still works.",
        "Apply the mustache with spirit gum or its own adhesive, trimming it so it ends at the corners of the mouth.",
        "Add the aviators. If you want to go further, a slightly flushed face from stage makeup sells the sideline shouting.",
      ] },
      { itemName: "Props and attitude", steps: [
        "Carry the fake cigar between two fingers or clamped in the side of your mouth.",
        "Add a Bears cap only if you're doing the Superfans version; Ditka himself coached mostly bare-headed.",
        "Practise one pose: pointing at someone with the cigar hand, or arms folded with a scowl.",
      ] },
    ],
    about: [
      "Mike Ditka played tight end for the Bears, Eagles and Cowboys in the 1960s and early 1970s and was inducted into the Pro Football Hall of Fame in 1988. As Chicago's head coach he won Super Bowl XX in January 1986 with a team remembered for its defense and the 'Super Bowl Shuffle' video. He later coached the New Orleans Saints from 1997 to 1999.",
      "The costume's popularity owes a lot to the Saturday Night Live 'Bill Swerski's Superfans' sketches of the early 1990s, in which Chris Farley, George Wendt and others, in Bears gear, mustaches and sunglasses, debated how badly Ditka would beat a hurricane. If you're going as a group, one person dresses as Ditka and the rest as Superfans with Bears jerseys, sunglasses, mustaches and plates of sausage.",
    ],
    faqs: [
      { question: "What did Mike Ditka wear on the sideline?", answer: "In the 1980s, typically a navy Bears sweater vest over a white shirt and tie, with slacks, aviator sunglasses and a mustache. Later in his career he wore Bears jackets and polos, but the sweater vest is the version people recognise." },
      { question: "How do I make the Superfans group costume?", answer: "Each Superfan wears a Bears jersey, T-shirt or sweatshirt, a mustache, dark sunglasses and a Bears cap, plus padding for a belly if you want. One person goes as Ditka in the vest and tie. Carry a plate of Polish sausage and talk about 'Da Bears'." },
      { question: "Can I do a Ditka costume without the Bears vest?", answer: "Yes. A plain navy V-neck sweater vest with an orange 'C' felt letter glued on works, and a navy windbreaker with a Bears logo is a reasonable alternative. The aviators and mustache carry most of the recognition." },
      { question: "Is a Mike Ditka costume still recognisable?", answer: "Especially in Chicago and among NFL fans. Outside that audience, going as a pair or group with Superfans, or adding a 'Da Coach' name badge, makes the reference clear." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "gargamel-costume": {
    characterName: "Gargamel",
    updated: "2026-11-02",
    seoTitle: "Gargamel Costume: Black Robe, Bald Cap, Red Shoes & Azrael",
    metaDescription:
      "How to make a Gargamel costume from The Smurfs: black hooded robe, bald cap with a dark fringe, red shoes, a hooked nose and a toy Azrael the cat. Works solo or with a group of Smurfs.",
    h1Title: "Gargamel Costume Guide (The Smurfs)",
    excerpt:
      "Gargamel is a black patched robe, a bald head with a scruffy dark fringe, red shoes, a long nose and an orange cat named Azrael tucked under one arm.",
    intro: [
      "Gargamel is the bumbling wizard who has spent decades failing to catch the Smurfs. His design has barely changed since Peyo drew him in the late 1950s: a long black robe with patches, red shoes, a bald crown with a ring of messy dark hair, bushy eyebrows, a hooked nose and a permanent hunch. His cat Azrael, orange with a scruffy tail, is always nearby.",
      "This is one of the easiest villain costumes to assemble because almost everything is black and loose. It is also a natural pairing: one Gargamel with any number of Smurfs makes an instantly readable group costume. If you're building that group, we also have guides for Smurfette, Brainy, Vexy and Hackus.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$80" },
      { label: "Time to put on", value: "15–20 minutes (longer with the bald cap)" },
      { label: "What people recognise first", value: "Black robe + bald head with fringe + orange cat" },
    ],
    items: [
      { name: "Black hooded monk or wizard robe", url: search("black hooded robe costume adult"), note: "Floor-length and loose. Sew or glue on a couple of grey or brown fabric patches at the elbows and hem; his robe is shabby, not sinister." },
      { name: "Bald cap", url: search("latex bald cap"), note: "Gargamel is bald on top with a messy ring of dark hair. Blend the cap edge with a little foundation if you'll be in bright light." },
      { name: "Black scruffy hair fringe or wig", url: search("bald cap with hair fringe black"), note: "A combined bald-cap-with-hair piece saves effort. Otherwise, glue dark crepe hair around the cap edge." },
      { name: "Red flat shoes or slippers", url: search("red flat shoes men costume"), note: "Red shoes poke out under the robe in every drawing of him. Cheap red canvas shoes or slippers are fine." },
      { name: "Prosthetic hooked nose", url: search("fake hooked nose latex costume"), note: "Optional but effective. Pair it with heavy dark eyebrows drawn on or glued on." },
      { name: "Orange plush cat (Azrael)", url: search("orange tabby cat plush toy"), note: "Carry it under one arm or sew a loop so it hangs from your sleeve. Azrael is scruffy, with a bent tail." },
      { name: "Small black cauldron or butterfly net", url: search("plastic cauldron prop"), note: "A cauldron, a potion bottle or a net for catching Smurfs gives you something to do with your hands." },
    ],
    dressingGuide: [
      { itemName: "Robe and shoes", steps: [
        "Wear dark clothes underneath so nothing shows at the neck or wrists.",
        "Put the robe on and let it hang loose; a rope belt is optional and should sit low.",
        "Put on the red shoes last so they stay clean and visible.",
      ] },
      { itemName: "Head and face", steps: [
        "Pin your hair flat and fit the bald cap, pulling it down to just above the ears.",
        "Attach the hair fringe or crepe hair around the sides and back so the crown stays bald.",
        "Draw heavy eyebrows with black eyeliner or glue on fake ones, and add the nose if you're using one.",
        "Deepen the lines from nose to mouth with a grey-brown eyeshadow for a sour expression.",
      ] },
      { itemName: "Posture and props", steps: [
        "Hunch slightly and keep your hands in front of you, fingers curled; Gargamel skulks.",
        "Tuck Azrael under your arm and carry the cauldron or net in the other hand.",
        "If you have Smurfs with you, chase them for photos. That's the whole character.",
      ] },
    ],
    about: [
      "Gargamel was created by the Belgian cartoonist Peyo and first appeared in the Smurfs comics in 1959. He is an evil, mostly incompetent wizard who wants the Smurfs either to eat, to turn into gold or simply out of spite, depending on the story. His cat Azrael is his only companion and treats him with visible contempt.",
      "He became widely known through the Hanna-Barbera animated series that ran from 1981 to 1989, and was played by Hank Azaria in the live-action films of 2011 and 2013. The character has been redesigned slightly for newer animated films, but the black robe, bald head, red shoes and cat have stayed the same, which is why the costume works for every generation.",
    ],
    faqs: [
      { question: "What colour are Gargamel's shoes?", answer: "Red. They're one of the few colours on an otherwise black costume, so they're worth getting right. Flat red shoes or slippers are closest." },
      { question: "Do I need a bald cap for Gargamel?", answer: "It helps a lot. Gargamel's bald crown with a ring of messy dark hair is one of his most recognisable features. If you'd rather skip the cap, slick your hair down and wear the hood up with some crepe hair poking out." },
      { question: "How do I make Azrael the cat?", answer: "The simplest option is an orange tabby plush toy carried under your arm. For a scruffier look, rough up the fur with a comb and add a bent pipe-cleaner inside the tail." },
      { question: "What's a good group costume with Gargamel?", answer: "Smurfs. Blue face paint or blue tops, white trousers and a white Phrygian cap make a Smurf; add a red cap for Papa Smurf and a blonde wig for Smurfette. One Gargamel and three or more Smurfs is the classic arrangement." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "the-goonies-adult-sloth-costume": {
    characterName: "Sloth",
    updated: "2026-11-02",
    seoTitle: "Sloth Costume (The Goonies): Superman Shirt, Pirate Hat & Face",
    metaDescription:
      "How to make an adult Sloth costume from The Goonies: Superman T-shirt under a torn shirt, suspenders, One-Eyed Willy's pirate hat, a Baby Ruth bar and the lopsided face makeup.",
    h1Title: "Sloth Costume Guide (The Goonies)",
    excerpt:
      "Sloth is a torn shirt over a Superman T-shirt, suspenders, a tricorn pirate hat, a Baby Ruth bar and the famous lopsided face.",
    intro: [
      "Sloth, played by John Matuszak in The Goonies (1985), is the Fratelli brother kept chained in the basement who ends up saving the kids. His costume is simple clothing made memorable by two reveals: the Superman T-shirt under his ragged shirt, and the pirate hat he takes from One-Eyed Willy's ship at the end. Add a Baby Ruth candy bar and you have the three things everyone remembers.",
      "The face is what makes or breaks it. Sloth has a heavily deformed face with one eye set lower than the other, a misshapen skull and a few crooked teeth. You can buy a full mask, or do a lighter version with makeup, a bald cap and a prosthetic eye. This guide covers both.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy with a mask; moderate with makeup" },
      { label: "Rough budget", value: "$50–$110" },
      { label: "Time to put on", value: "15 minutes with a mask, 45+ with makeup" },
      { label: "What people recognise first", value: "Superman shirt + pirate hat + 'Hey you guys!'" },
    ],
    items: [
      { name: "Superman logo T-shirt", url: search("Superman logo t-shirt adult"), note: "The classic red-and-yellow shield on blue. Buy it a size large so it hangs." },
      { name: "Grey or faded button-up shirt to tear", url: search("men grey cotton button up shirt cheap"), note: "Rip the front open and fray the hem so the Superman shield shows through. A thrift-store shirt is ideal." },
      { name: "Brown suspenders", url: search("brown clip on suspenders men"), note: "Worn over the torn shirt, one strap slipping off the shoulder." },
      { name: "Baggy brown or khaki trousers", url: search("men baggy khaki trousers"), note: "Dirty them with a little brown shoe polish or tea staining at the knees." },
      { name: "Tricorn pirate hat", url: search("pirate tricorn hat adult black"), note: "One-Eyed Willy's hat from the ending. Black with a worn edge; add a feather or a skull if you like." },
      { name: "Sloth mask or bald cap + prosthetic eye", url: search("Goonies Sloth latex mask"), note: "A full latex mask is the fastest route. For a makeup version, use a bald cap, a prosthetic eye piece on one cheek and a set of crooked costume teeth." },
      { name: "Baby Ruth candy bar", url: search("Baby Ruth candy bar"), note: "Carry a real one, or a large printed prop. It's the thing Chunk gives him and the line people quote." },
      { name: "Plastic chain and shackle", url: search("plastic chain shackle costume prop"), note: "Optional, around one wrist or ankle, for the basement scene." },
    ],
    dressingGuide: [
      { itemName: "Shirts and suspenders", steps: [
        "Put the Superman T-shirt on first.",
        "Add the torn button-up open at the front so the shield is fully visible. Tear one sleeve shorter than the other.",
        "Clip the suspenders to the trousers and let one strap hang off the shoulder.",
      ] },
      { itemName: "Face (makeup version)", steps: [
        "Fit the bald cap and blend the edge. Sloth has a tuft of thin hair; a little crepe hair on the crown is enough.",
        "Glue the prosthetic eye piece low on your right cheek and paint around it with greyish-pink tones so it blends.",
        "Shade one side of the forehead and jaw darker than the other to exaggerate the asymmetry.",
        "Put in the crooked teeth last, after you've finished eating and drinking.",
      ] },
      { itemName: "Hat, props and voice", steps: [
        "Put the pirate hat on slightly crooked, over the bald cap.",
        "Carry the Baby Ruth in one hand. If you want a second prop, a length of plastic chain on the wrist works.",
        "Learn 'Hey you guys!' and the Superman-shirt reveal; pull the torn shirt open with both hands for photos.",
      ] },
    ],
    about: [
      "Sloth is Lotney Fratelli, the youngest of the Fratelli brothers in The Goonies, directed by Richard Donner from a story by Steven Spielberg. He spends most of the film chained up by his family, befriends Chunk over a Baby Ruth bar, and later frees the kids, sails with them past the traps and shouts 'Hey you guys!' from the mast of One-Eyed Willy's ship.",
      "John Matuszak, a former NFL defensive end who played for the Oakland Raiders, wore heavy prosthetic makeup that took hours to apply and included a mechanically controlled eye. The costume has stayed popular because the pieces are everyday clothes with one strong reveal, and because Sloth is the film's most loved character despite being its scariest-looking one.",
    ],
    faqs: [
      { question: "What does Sloth wear in The Goonies?", answer: "A ragged, torn shirt over a Superman T-shirt, baggy trousers held up with suspenders, and, by the end of the film, One-Eyed Willy's tricorn pirate hat. He is also seen in chains in the Fratellis' basement." },
      { question: "How do I do Sloth's face without a full mask?", answer: "Use a bald cap, a small latex prosthetic eye glued low on one cheek, crooked costume teeth and grey-pink face paint shaded darker on one side. It won't be screen-accurate, but with the Superman shirt and pirate hat the character is unmistakable." },
      { question: "Is Sloth a good couples or group costume?", answer: "Yes. Chunk is the obvious partner: a Hawaiian-print shirt, plaid trousers and a bag of snacks, doing the Truffle Shuffle. A full Goonies group adds Mikey, Data, Mouth, Andy, Stef and Brand." },
      { question: "Is a Sloth costume appropriate?", answer: "Sloth is a sympathetic hero, and the costume is affectionate rather than mocking. Keep the makeup in the cartoonish style of the film rather than realistic injury makeup, and you'll be fine." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "perry-the-platypus-costume": {
    characterName: "Perry the Platypus",
    updated: "2026-11-02",
    seoTitle: "Perry the Platypus Costume: Teal Suit, Fedora, Bill & Tail",
    metaDescription:
      "How to make a Perry the Platypus (Agent P) costume from Phineas and Ferb: teal body, orange bill and feet, flat brown tail and the brown fedora. DIY hoodie version and full onesie option.",
    h1Title: "Perry the Platypus Costume Guide (Agent P)",
    excerpt:
      "Perry is a teal body, an orange duck-bill and feet, a flat brown tail and, in Agent P mode, a brown fedora. The hat is what turns a platypus into a secret agent.",
    intro: [
      "Perry the Platypus is the Flynn-Fletcher family pet in Phineas and Ferb who doubles as Agent P, a secret agent whose nemesis is Dr. Heinz Doofenshmirtz. As a pet he 'doesn't do much'; as Agent P he wears a brown fedora and nothing else, which makes the costume delightfully simple: a teal body, orange bill, orange webbed feet, a wide flat tail and the hat.",
      "There are two sensible routes. A full teal onesie or mascot suit is the most recognisable and the warmest. A DIY version built from a teal hoodie and sweatpants is cheaper and far more comfortable at a party. Both depend on the same three details: the fedora, the orange bill and the tail. If you want a partner, our Doofenshmirtz guide covers the lab coat and the 'Curse you, Perry the Platypus!' pose.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$35–$70 DIY; $50–$90 for a onesie" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Teal + brown fedora + orange bill" },
    ],
    items: [
      { name: "Teal hoodie and sweatpants (or teal onesie)", url: search("teal turquoise hoodie sweatpants set adult"), note: "Perry's colour is a blue-green teal, not sky blue. If buying separately, order the top and bottom from the same listing so the shades match." },
      { name: "Brown fedora", url: search("brown fedora hat adult"), note: "A plain dark brown fedora with a black band. This single item is what says 'Agent P' rather than 'platypus'." },
      { name: "Orange duck bill mask", url: search("orange duck bill costume mask"), note: "Perry's bill is wide, flat and orange. Foam or felt bills on an elastic strap are comfortable for hours; avoid hard plastic ones." },
      { name: "Orange flipper shoe covers", url: search("orange duck feet shoe covers costume"), note: "Webbed orange feet. Slip-on fabric covers over sneakers work better than full flipper shoes for walking." },
      { name: "Brown felt sheet for the tail", url: search("brown felt fabric sheet craft"), note: "Cut two paddle shapes about 14 inches long, stuff lightly, stitch or glue, then safety-pin to the waistband. Perry's tail is flat and wide, like a beaver's." },
      { name: "Orange felt for the belly patch (optional)", url: search("orange felt fabric sheet"), note: "Perry has an orange bill and feet only; skip a belly patch if you want to stay accurate. Add one only for a cuter look." },
    ],
    dressingGuide: [
      { itemName: "Body", steps: [
        "Put on the teal hoodie and sweatpants (or the onesie) over a thin base layer; teal fleece gets warm.",
        "Pin the tail to the back of the waistband so it sticks out flat behind you rather than hanging down.",
        "Pull the orange shoe covers over flat sneakers.",
      ] },
      { itemName: "Head", steps: [
        "Put the hood up if you're using a hoodie, and set the orange bill mask so it sits over your nose with the elastic under the hood.",
        "Place the fedora on top, slightly forward, and pin it through the hood if it slips.",
        "Perry's eyes look in slightly different directions. If you're doing face paint instead of a mask, paint two large white ovals with pupils pointing outwards.",
      ] },
      { itemName: "Agent P details", steps: [
        "Stand upright with one hand on your hip, the classic Agent P pose. As a 'pet', drop to all fours and go blank-faced.",
        "Make the chattering sound (a rolled tongue trill); it is the character's only line.",
        "Optional: carry a small grappling hook or a tiny briefcase for the agent look.",
      ] },
    ],
    about: [
      "Perry the Platypus appears in Phineas and Ferb, the Disney Channel series created by Dan Povenmire and Jeff 'Swampy' Marsh that first aired in 2007. Each episode he slips away from the family, dons his fedora and fights Dr. Doofenshmirtz's latest '-inator' for the O.W.C.A. (Organization Without a Cool Acronym). Nobody in the family ever notices.",
      "His design is deliberately plain so the fedora can do all the work, and that is why it is such a good costume: the hat is a visual joke everyone gets. The series returned with new episodes in 2025, which has brought Perry back to playgrounds and Halloween parties alike.",
    ],
    faqs: [
      { question: "What colour is Perry the Platypus?", answer: "Teal, a blue-green. His bill and feet are orange, his tail is brown, and his fedora is dark brown with a black band. Avoid light blue or green fabric; the mix of blue and green is what reads as Perry." },
      { question: "Can I make a Perry costume without a onesie?", answer: "Yes. A teal hoodie and sweatpants, a brown fedora, an orange bill mask, orange shoe covers and a felt tail are all you need. It is cheaper and more comfortable than a full suit." },
      { question: "What's a good partner costume for Perry?", answer: "Dr. Doofenshmirtz: a white lab coat, black turtleneck, hunched posture and a cardboard '-inator'. Phineas (orange striped shirt, triangular head) and Ferb (purple trousers, green hair) make a full group." },
      { question: "How do I make Perry's tail?", answer: "Cut two identical flat paddle shapes from brown felt, around 14 by 8 inches, glue or stitch the edges with a little stuffing inside, and safety-pin it to the back of your waistband so it sits horizontally." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "he-man-costume": {
    characterName: "He-Man",
    updated: "2026-11-02",
    seoTitle: "He-Man Costume: Harness, Fur Trunks, Boots & Power Sword",
    metaDescription:
      "How to build a He-Man costume from Masters of the Universe: the chest harness with the iron-cross emblem, furry trunks and boots, wrist cuffs, blond pageboy wig and the Power Sword. Classic cartoon and 2026 film looks.",
    h1Title: "He-Man Costume Guide (Masters of the Universe)",
    excerpt:
      "He-Man is a grey chest harness with a red cross, brown fur trunks, furry boots, wide cuffs, a blond pageboy haircut and a sword raised overhead.",
    intro: [
      "He-Man is the most powerful man in the universe and one of the most recognisable costumes of the 1980s. The classic look, from the Mattel toys and the 1983 Filmation cartoon, is a grey chest harness with a red iron-cross emblem, a wide belt, brown fur trunks, furry knee-high boots, wrist cuffs, a blond pageboy haircut and the Power Sword held aloft.",
      "It is a revealing costume by design, but it is easy to make more covered: a tan or flesh-tone long-sleeve top under the harness looks fine in photos and is a common choice. The pieces that matter for recognition are the harness, the hair and the sword. If you'd rather be the villain, our Skeletor guide pairs with this one.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate (the harness takes some work)" },
      { label: "Rough budget", value: "$60–$130" },
      { label: "Time to put on", value: "20 minutes" },
      { label: "What people recognise first", value: "Chest harness with red cross + blond pageboy + sword" },
    ],
    items: [
      { name: "He-Man chest harness (or grey faux-leather to make one)", url: search("He-Man chest harness costume adult"), note: "Grey straps crossing the chest with a red cross in a circle at the centre. If making your own, cut it from grey craft foam or faux leather and paint the emblem." },
      { name: "Brown faux-fur trunks", url: search("brown faux fur shorts costume"), note: "Short, brown and shaggy. Wear tan bike shorts underneath." },
      { name: "Wide brown belt with a gold buckle", url: search("wide brown costume belt gold buckle"), note: "Sits over the trunks. A plain wide belt with a large rectangular buckle is close enough." },
      { name: "Furry knee-high boot covers", url: search("brown fur boot covers costume"), note: "He-Man's boots are brown fur with a grey top band. Covers over your own boots are easier to walk in." },
      { name: "Wide grey wrist cuffs", url: search("grey gauntlet wrist cuffs costume"), note: "Grey or silver cuffs about four inches wide, one on each forearm." },
      { name: "Blond pageboy wig", url: search("blond pageboy bob wig men costume"), note: "Chin-length, straight, with a full fringe. This is the piece most people skip and shouldn't; the haircut is half the character." },
      { name: "Power Sword prop", url: search("He-Man Power Sword toy prop"), note: "A grey broadsword with a wide, flat blade. A foam version is safer for parties and conventions." },
      { name: "Flesh-tone long-sleeve top (optional)", url: search("flesh tone long sleeve compression shirt"), note: "For a covered version, or for warmth, under the harness." },
    ],
    dressingGuide: [
      { itemName: "Base and trunks", steps: [
        "Put on tan bike shorts and, if you're using it, the flesh-tone top.",
        "Pull on the fur trunks and the wide belt over them, buckle to the front.",
        "Pull the boot covers over sturdy boots and fix them under the knee with elastic.",
      ] },
      { itemName: "Harness and cuffs", steps: [
        "Put the harness on so the red cross sits in the middle of the chest and the straps cross at the back.",
        "Tighten it enough that it doesn't shift when you lift your arms.",
        "Fasten the wrist cuffs.",
      ] },
      { itemName: "Wig and finishing", steps: [
        "Pin your hair back and put on the wig, combing the fringe straight across.",
        "A light bronzing powder on the arms and chest helps the harness stand out in photos.",
        "Raise the sword overhead with both hands and say 'By the power of Grayskull!' That's the pose.",
      ] },
    ],
    about: [
      "He-Man is the heroic alter ego of Prince Adam of Eternia, who raises the Power Sword and transforms to defend Castle Grayskull from Skeletor. He began as a Mattel action figure line in 1982 and became a household name through the Filmation cartoon He-Man and the Masters of the Universe (1983–1985), with his tiger Battle Cat, the Sorceress, Man-At-Arms, Teela and Orko.",
      "Dolph Lundgren played him in the 1987 live-action film, and the character returned in animated series in 2002 and 2021. A new live-action Masters of the Universe film arrived in 2026 with Nicholas Galitzine as He-Man, with a more armoured take on the costume. The classic cartoon version is still the one most people recognise, and the one this guide builds.",
    ],
    faqs: [
      { question: "What does He-Man wear?", answer: "In the classic design: a grey chest harness with a red iron cross in a circle, brown fur trunks with a wide belt, furry knee-high boots, grey wrist cuffs and a blond pageboy haircut. He carries the Power Sword and sometimes a shield and battle axe." },
      { question: "Can I do a He-Man costume without going shirtless?", answer: "Yes. A flesh-tone or tan long-sleeve top under the harness is common, and so is a muscle suit, which gives you the cartoon proportions and covers you at the same time." },
      { question: "How do I make the He-Man harness?", answer: "Cut two straps and a central disc from grey craft foam or faux leather, paint a red cross on the disc, and join the straps at the back with Velcro. It should sit high on the chest." },
      { question: "What's a good partner costume with He-Man?", answer: "Skeletor is the obvious choice. She-Ra, his twin sister, is the classic pairing for couples; Teela, Man-At-Arms, Orko and Battle Cat round out a group." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "sing-ash-costume": {
    characterName: "Ash",
    updated: "2026-11-02",
    seoTitle: "Ash Costume (Sing): Porcupine Punk Jacket, Plaid Skirt & Quills",
    metaDescription:
      "How to make an Ash costume from the movie Sing: purple spiky quills, black leather jacket, red tartan skirt, fishnets, boots and an electric guitar. Easy DIY porcupine rocker look.",
    h1Title: "Ash Costume Guide (Sing)",
    excerpt:
      "Ash the porcupine is a spiky purple hairdo, a black leather jacket, a red plaid skirt, fishnet tights, boots and a guitar.",
    intro: [
      "Ash is the teenage porcupine rocker in Sing (2016) and Sing 2 (2021), voiced by Scarlett Johansson. She starts the first film playing backup to her boyfriend and ends it on stage alone singing 'Set It All Free'. Her look is pure pop-punk: spiky purple quills, a black leather jacket, a red tartan mini skirt, fishnets and boots, with an electric guitar slung across her.",
      "Because the outfit is real clothing rather than animal costume, this is one of the easiest Sing characters to wear. The quills are the only thing you need to make or buy specifically. Everything else is a punk outfit you may already own. For a group, our Nooshy (Sing 2) guide pairs well, and the other Sing characters are mostly colour-blocked animals that are easy to add.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$90" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Purple spikes + leather jacket + plaid skirt" },
    ],
    items: [
      { name: "Spiky purple quill headpiece or wig", url: search("purple spiky short wig punk"), note: "Ash's quills are a dark purple-magenta and point backwards in thick spikes. A short spiky purple wig works; a headband with felt spikes is a good DIY alternative." },
      { name: "Black faux-leather jacket", url: search("women black faux leather biker jacket"), note: "A cropped biker jacket with a little hardware. Roll the sleeves to the forearm." },
      { name: "Red tartan mini skirt", url: search("red plaid pleated mini skirt"), note: "Red and black tartan, pleated. Wear it over black shorts if you'll be moving around." },
      { name: "Black fishnet tights", url: search("black fishnet tights"), note: "Over opaque black tights if you want more coverage; the layered look is still punk." },
      { name: "Black combat boots", url: search("women black combat boots"), note: "Chunky, lace-up. Ash's are plain black." },
      { name: "Black tank or band tee", url: search("black tank top women"), note: "Under the open jacket." },
      { name: "Toy or inflatable electric guitar", url: search("inflatable electric guitar prop"), note: "A real one is heavy; an inflatable or a cheap toy guitar on a strap gives you the silhouette." },
      { name: "Grey-brown face paint and black nose", url: search("face paint palette grey brown"), note: "Ash's face is a soft grey-brown with a small dark nose. A light wash of paint and a dot of black on the nose tip is enough." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on the tank top, skirt and tights, then the boots.",
        "Add the jacket open at the front and push the sleeves up.",
        "Layer a few black rubber bracelets or studded cuffs on one wrist.",
      ] },
      { itemName: "Quills and face", steps: [
        "Put the spiky wig or headband on so the spikes sweep back from the forehead.",
        "Apply a light grey-brown face paint, darker around the eyes, and paint the tip of your nose black.",
        "Add a strong winged eyeliner; Ash's eyes are large and lined.",
      ] },
      { itemName: "Guitar and performance", steps: [
        "Sling the guitar low across your body.",
        "Learn the chorus of 'Set It All Free' for the inevitable request.",
        "Her signature move is shooting quills when she's angry; a handful of purple pipe cleaners in a pocket makes a good gag.",
      ] },
    ],
    about: [
      "Ash is one of the main contestants in Buster Moon's singing competition in Sing, the Illumination animated film from 2016. A porcupine with a punk-rock sound, she spends much of the film in the shadow of her boyfriend Lance until he leaves her, after which she writes and performs her own song. In Sing 2 she returns as a working musician and helps convince the reclusive rock star Clay Calloway to perform again.",
      "Her design mixes porcupine and pop-punk: the quills double as a spiky hairstyle, and her outfit is a leather jacket, plaid skirt and boots that could come from any mid-2000s rock show. That is why the costume translates so well to real clothes.",
    ],
    faqs: [
      { question: "What does Ash from Sing wear?", answer: "A black leather jacket over a dark top, a red and black tartan mini skirt, fishnet tights and black boots, with spiky purple quills and an electric guitar. In Sing 2 her outfit is similar with a few more studs." },
      { question: "How do I make Ash's quills?", answer: "Either buy a short spiky purple wig, or glue stiff felt or craft-foam spikes in dark purple to a wide headband so they point backwards. Six to eight spikes of different lengths look right." },
      { question: "What song does Ash sing in Sing?", answer: "'Set It All Free', an original song for the film, performed by Scarlett Johansson. In Sing 2 she sings 'I Still Haven't Found What I'm Looking For' with Clay Calloway." },
      { question: "What are good group costumes from Sing?", answer: "Rosita the pig (pink top, apron), Johnny the gorilla (leather jacket, cap), Meena the elephant (grey hoodie, big ears), Gunter (gold sequin leotard) and Buster Moon the koala (grey suit, bow tie). Nooshy the lynx is the Sing 2 addition." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "slash-guns-n-roses-costume": {
    characterName: "Slash",
    updated: "2026-11-02",
    seoTitle: "Slash Costume: Top Hat, Curly Wig, Shades & Les Paul Guitar",
    metaDescription:
      "How to dress as Slash from Guns N' Roses: black top hat with a concho band, long black curly wig, aviator sunglasses, leather jacket or vest, tight black jeans and a Les Paul guitar prop.",
    h1Title: "Slash Costume Guide (Guns N' Roses)",
    excerpt:
      "Slash is a black top hat with a silver concho band, a mass of black curls, aviator shades, a leather jacket, skinny black jeans and a Les Paul.",
    intro: [
      "Slash is one of the few musicians you can impersonate with a silhouette. The top hat and the curtain of black curls covering his face are enough on their own, and adding mirrored aviators, a leather jacket or open vest, tight black jeans and a Gibson Les Paul finishes it. It has been his look since Guns N' Roses broke through with Appetite for Destruction in 1987 and he hasn't changed it since.",
      "This is an easy costume to put together from a rock-themed wardrobe, and most of the budget goes on the hat and the wig. Pair it with an Axl Rose (bandana, flannel around the waist, bike shorts) for a two-person costume that everyone recognises.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$45–$100" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Top hat + black curls + aviators" },
    ],
    items: [
      { name: "Black top hat", url: search("black top hat adult felt"), note: "A medium-height felt top hat. Slash's has a silver concho belt as the hat band; buy a concho belt or chain and wrap it around the crown." },
      { name: "Silver concho hat band or belt", url: search("silver concho belt western"), note: "Wrapped around the base of the top hat. This detail separates Slash from a generic top hat." },
      { name: "Long black curly wig", url: search("long black curly wig men rocker"), note: "Shoulder-length or longer, with tight curls and a fringe that falls over the eyes. Pull it forward; his face is usually half hidden." },
      { name: "Aviator sunglasses", url: search("aviator sunglasses mirrored"), note: "Classic aviators, often mirrored. He wears them on stage under the hat." },
      { name: "Black leather jacket or leather vest", url: search("men black leather biker vest"), note: "A black biker jacket, or a leather vest worn open over a bare chest or a band T-shirt." },
      { name: "Tight black jeans or leather pants", url: search("men black skinny jeans"), note: "Skinny and black. Add a studded belt with a large buckle." },
      { name: "Band T-shirt (optional)", url: search("Guns N Roses t-shirt"), note: "A GN'R or other rock tee under the jacket, or go without under a vest." },
      { name: "Toy or inflatable Les Paul guitar", url: search("inflatable guitar Les Paul"), note: "Slash plays a Gibson Les Paul, usually a sunburst finish. An inflatable in a sunburst colour is the easy option." },
      { name: "Silver rings and bracelets", url: search("men silver skull rings set"), note: "He wears rings on most fingers and a few leather and silver bracelets." },
    ],
    dressingGuide: [
      { itemName: "Clothes", steps: [
        "Put on the jeans with a studded belt, then the T-shirt if you're using one, then the jacket or vest.",
        "Boots: black leather with a slight heel or Converse high-tops both match different eras.",
        "Load up the silver rings and bracelets before the wig so you can see what you're doing.",
      ] },
      { itemName: "Hat and hair", steps: [
        "Put the wig on and pull the fringe forward so it covers the eyebrows and partly the eyes.",
        "Set the top hat straight on top and push it down slightly so the curls spill out all around.",
        "Put on the aviators under the hair.",
      ] },
      { itemName: "Guitar and pose", steps: [
        "Sling the guitar low on a long strap, around hip height.",
        "The pose is head down, hat tilted forward, one leg out, mid-solo. A cigarette prop is period-accurate but optional.",
      ] },
    ],
    about: [
      "Slash, born Saul Hudson in London in 1965 and raised in Los Angeles, was the lead guitarist of Guns N' Roses from 1985 to 1996 and rejoined the band in 2016. Appetite for Destruction, the band's 1987 debut, became one of the best-selling albums ever, and his riffs on 'Sweet Child o' Mine', 'Welcome to the Jungle' and 'November Rain' are among the most recognisable in rock.",
      "Between stints with GN'R he formed Slash's Snakepit and Velvet Revolver and released solo albums with Myles Kennedy and the Conspirators. He was inducted into the Rock and Roll Hall of Fame with Guns N' Roses in 2012. The top hat, bought on a whim before an early show and finished with a concho belt, has been his trademark for nearly forty years.",
    ],
    faqs: [
      { question: "What kind of hat does Slash wear?", answer: "A black felt top hat with a silver concho belt wrapped around the crown as a hat band. The conchos are the detail that makes it his rather than a generic top hat." },
      { question: "What guitar should I carry for a Slash costume?", answer: "A Gibson Les Paul, ideally in a sunburst finish. For a costume, an inflatable or toy guitar in that shape and colour is lighter and safer than the real thing." },
      { question: "How do I do Slash's hair?", answer: "Use a long black wig with tight curls and a full fringe, and pull it forward over the eyes. The hat sits on top and pushes the curls outward. Your own hair can work if it's long, dark and curly." },
      { question: "What's a good partner costume with Slash?", answer: "Axl Rose: a red or white bandana, a flannel shirt tied around the waist, white bike shorts or ripped jeans and a band tee or open leather jacket. Duff McKagan with a padlock necklace and bleached hair makes a third." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "captain-marvel-costume": {
    characterName: "Captain Marvel",
    updated: "2026-11-02",
    seoTitle: "Captain Marvel Costume: Red, Blue & Gold Suit, Sash & Hair",
    metaDescription:
      "How to put together a Captain Marvel (Carol Danvers) costume from the MCU: the red, blue and gold suit with the Hala star, gold sash, red gloves and boots, short blonde hair, and the optional mohawk helmet.",
    h1Title: "Captain Marvel Costume Guide (Carol Danvers)",
    excerpt:
      "Captain Marvel is a blue bodysuit with a red chest panel and gold star, red gloves and boots, a gold sash on the hip and short blonde hair, with an optional mohawk helmet.",
    intro: [
      "Carol Danvers' Captain Marvel suit, as worn by Brie Larson in Captain Marvel (2019), Avengers: Endgame and The Marvels (2023), is a blue bodysuit with a red upper torso and shoulders, a gold eight-pointed Hala star on the chest, red gloves and boots and a gold sash tied at the hip. Her hair is blonde, shoulder-length in the first film and cropped short in Endgame.",
      "Most people buy the suit as a single piece and then upgrade the accessories, which is the approach this guide takes. The sash, the gloves and the hair are what separate a good Captain Marvel from a generic superhero. The mohawk helmet is optional; it's a striking addition for photos but hot to wear for long.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy with a bought suit; moderate to build the helmet" },
      { label: "Rough budget", value: "$60–$140" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Red, blue and gold suit with the star + gold sash" },
    ],
    items: [
      { name: "Captain Marvel bodysuit (red, blue and gold)", url: search("Captain Marvel costume bodysuit adult women"), note: "Look for one with the red torso panel and a clear gold star. Printed suits are fine; matte fabric photographs better than shiny spandex." },
      { name: "Gold sash or wide ribbon", url: search("gold satin sash belt"), note: "Tied on the left hip so it hangs to the knee. Many suits skip this; it's cheap to add and immediately improves the look." },
      { name: "Red gloves", url: search("red long gloves costume"), note: "Wrist- to forearm-length. Her gloves are a slightly darker red than the suit panel." },
      { name: "Red knee-high boots or boot covers", url: search("red knee high boots women flat"), note: "Flat or low heel. Red boot covers over your own boots are the comfortable option." },
      { name: "Short blonde wig", url: search("short blonde wig women side part"), note: "A chin-length wavy blonde wig for the 2019 film, or a short, slicked-back cut for Endgame." },
      { name: "Mohawk helmet (optional)", url: search("Captain Marvel helmet mohawk"), note: "Her helmet forms from the suit and leaves a blonde mohawk on top. Buy a costume version or build one from craft foam with a strip of blonde hair glued along the crest." },
      { name: "Fingerless gloves and bomber jacket (for the 'Vers' look)", url: search("women brown bomber jacket"), note: "An alternative: in parts of the 2019 film Carol wears a Nine Inch Nails T-shirt, jeans and a brown leather jacket. Easy and still recognisable to fans." },
    ],
    dressingGuide: [
      { itemName: "Suit", steps: [
        "Put the bodysuit on over seamless underwear; thin lines show through tight suits.",
        "If the suit's star is faint, trace it with gold fabric paint and let it dry before wearing.",
        "Tie the gold sash around the hips with the knot on the left and the tails hanging down the leg.",
      ] },
      { itemName: "Gloves, boots and hair", steps: [
        "Pull on the boots or boot covers, then the gloves.",
        "Pin your hair flat and fit the blonde wig. For the Endgame look, slick a short wig back with gel.",
        "Keep makeup simple: a natural look with defined brows matches the films.",
      ] },
      { itemName: "Helmet and effects", steps: [
        "If wearing the helmet, put it on last and keep it for photos; take it off between.",
        "For 'binary' glow photos, hold a small battery-powered LED in each closed fist. Gold or warm white looks closest to the film.",
        "The pose: fists clenched at the sides, chin up, or one arm raised ready to fire.",
      ] },
    ],
    about: [
      "Carol Danvers is a former U.S. Air Force pilot who gained energy-absorbing and projecting powers after an accident involving Kree technology. In the Marvel Cinematic Universe she first appears in Captain Marvel (2019), set in 1995, where she discovers her past while fighting alongside a young Nick Fury. She returns in Avengers: Endgame to help defeat Thanos and leads the team in The Marvels (2023) with Monica Rambeau and Kamala Khan.",
      "In the comics Carol has used several names, including Ms. Marvel and Binary, and took the Captain Marvel title in 2012. Her current red, blue and gold suit with the Hala star was designed for the comics by Jamie McKelvie in 2012 and adapted closely for the film, which is why it looks the same whether you're referencing the page or the screen.",
    ],
    faqs: [
      { question: "What colours is Captain Marvel's suit?", answer: "Blue with a red upper torso, shoulders, gloves and boots, a gold eight-pointed star on the chest, gold trim and a gold sash on the hip. In the 2019 film she also briefly wears a green and black Kree Starforce version of the same suit." },
      { question: "Does Captain Marvel have short or long hair?", answer: "Both, depending on the film. In Captain Marvel (2019) her hair is blonde and shoulder-length; in Avengers: Endgame it's cut short; in The Marvels it's shoulder-length again. Pick the version you prefer; the suit is the same." },
      { question: "How do I make the Captain Marvel mohawk helmet?", answer: "Shape a close-fitting helmet from craft foam or a cheap costume helmet, paint it red with gold trim around the face opening, and glue a strip of blonde hair wefts along the top in a mohawk. It's worth doing only if you'll pose for photos; most people skip it." },
      { question: "What's a good group costume with Captain Marvel?", answer: "The Marvels: Ms. Marvel (red and blue with a yellow lightning bolt) and Monica Rambeau (black and white suit). For an Avengers group, add Black Widow, Scarlet Witch or Thor." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "diy-ferris-bueller-costume": {
    characterName: "Ferris Bueller",
    updated: "2026-11-02",
    seoTitle: "Ferris Bueller Costume: Leopard Vest, Beret & 'Save Ferris'",
    metaDescription:
      "How to make a DIY Ferris Bueller costume: the leopard-print sweater vest, white tee, pleated khakis, white sneakers and the black beret from the parade scene. Plus the bathrobe 'sick day' version and Cameron and Sloane pairings.",
    h1Title: "DIY Ferris Bueller Costume Guide",
    excerpt:
      "Ferris is a leopard-print knit vest over a white tee, pleated khakis, white sneakers and a black beret for the parade, or a bathrobe for his fake sick day.",
    intro: [
      "Ferris Bueller's Day Off (1986) gave Matthew Broderick one of the most copied outfits of the decade: a leopard-print sweater vest over a white T-shirt, pleated light trousers, white sneakers and, for the 'Twist and Shout' parade scene, a black beret. It is a cheap costume because almost everything is ordinary clothing, and the vest alone does the work.",
      "There's a second Ferris that's even easier: the fake sick day, in a bathrobe over pajamas with a towel on his head and a dummy in the bed. Most people go with the parade look, and if you have friends, Cameron (Detroit Red Wings jersey) and Sloane (white fringed leather jacket) complete the trio; we have separate guides for both.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$30–$70" },
      { label: "Time to put on", value: "5 minutes" },
      { label: "What people recognise first", value: "Leopard-print vest + beret" },
    ],
    items: [
      { name: "Leopard-print knit sweater vest", url: search("leopard print sweater vest men"), note: "The key piece. Ferris's vest is a brown, black and cream leopard pattern. If you can't find a vest, cut the sleeves off a thrift-store leopard cardigan." },
      { name: "White crew-neck T-shirt", url: search("men white crew neck t-shirt"), note: "Plain, worn under the vest with the sleeves showing." },
      { name: "Pleated light-grey or khaki trousers", url: search("men pleated khaki trousers"), note: "Pleated and slightly baggy, in a light neutral. Jeans aren't right for this one." },
      { name: "White leather sneakers", url: search("white leather sneakers men"), note: "Clean white sneakers. The more 1980s the shape, the better." },
      { name: "Black beret", url: search("black wool beret"), note: "Only for the parade scene, but it's what makes the costume instantly Ferris rather than a guy in a vest." },
      { name: "Brown leather belt", url: search("brown leather belt men"), note: "Simple belt with a small buckle." },
      { name: "'Save Ferris' pin or sign", url: search("Save Ferris button pin"), note: "A great extra. Have a friend carry a 'Save Ferris' sign, or wear the badge." },
      { name: "Bathrobe and towel (sick-day version)", url: search("men plaid bathrobe"), note: "For the alternative look: a robe over pajamas, a towel on the head, and a thermometer." },
    ],
    dressingGuide: [
      { itemName: "Parade outfit", steps: [
        "Put on the white tee, then the pleated trousers with the belt.",
        "Pull the leopard vest over the tee and leave it untucked.",
        "Add white socks and white sneakers.",
        "Tilt the beret to one side. If you're performing, this is the 'Twist and Shout' float look.",
      ] },
      { itemName: "Hair and attitude", steps: [
        "Short, neat 1980s side part. A little gel to lift the front is enough.",
        "Ferris talks to the camera; practise the fourth-wall look and the line 'Life moves pretty fast.'",
      ] },
      { itemName: "Sick-day version", steps: [
        "Wear pajamas, a plaid bathrobe loosely tied, and a towel draped over your head.",
        "Hold a thermometer and a glass of water. A small stuffed dummy under one arm is a good gag.",
      ] },
    ],
    about: [
      "Ferris Bueller's Day Off was written and directed by John Hughes and released in 1986. Matthew Broderick plays a Chicago high-schooler who fakes an illness to skip school and spends the day in the city with his best friend Cameron Frye (Alan Ruck) and girlfriend Sloane Peterson (Mia Sara), while the dean of students, Ed Rooney, tries to catch him and his sister Jeanie seethes at home.",
      "The leopard vest appears for much of the day, and the beret for the parade sequence in which Ferris lip-syncs 'Danke Schoen' and 'Twist and Shout' on a float. Hughes' habit of putting his characters in a few memorable, repeatable pieces is why the costume is so easy to recreate forty years on.",
    ],
    faqs: [
      { question: "What does Ferris Bueller wear in the movie?", answer: "For most of the day: a leopard-print sweater vest over a white T-shirt, pleated light trousers, a brown belt and white sneakers. He adds a black beret for the parade scene. At home he wears pajamas and a bathrobe while faking illness." },
      { question: "Where can I find a leopard-print vest like Ferris's?", answer: "Search for a leopard-print sweater vest or knit vest; several costume brands make Ferris-style ones. Failing that, buy a leopard cardigan or pullover from a thrift store and remove the sleeves." },
      { question: "What should Cameron and Sloane wear?", answer: "Cameron wears a red Detroit Red Wings jersey (number 9, Gordie Howe) over a white T-shirt, with khakis. Sloane wears a white fringed leather jacket, a white top, patterned shorts and white boots. Our separate guides cover both in detail." },
      { question: "How do I make a 'Save Ferris' sign?", answer: "Write 'SAVE FERRIS' in block capitals on white poster board. In the film it appears on the water tower and on badges, so a pin or a homemade button works too." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "adult-skeletor-costume": {
    characterName: "Skeletor",
    updated: "2026-11-02",
    seoTitle: "Skeletor Costume: Skull Face, Purple Hood, Armor & Havoc Staff",
    metaDescription:
      "How to make an adult Skeletor costume from Masters of the Universe: yellow skull face mask or makeup, purple hooded cowl, blue skin, purple crossbones chest armor, trunks and the ram-skull Havoc Staff.",
    h1Title: "Skeletor Costume Guide (Masters of the Universe)",
    excerpt:
      "Skeletor is a yellow skull face inside a purple hood, blue skin, purple crossbones armor over a bare chest, purple trunks and boots, and the Havoc Staff topped with a ram skull.",
    intro: [
      "Skeletor is He-Man's arch-enemy and the most popular villain costume from the Masters of the Universe line. His classic look from the 1980s toys and cartoon is a yellow skull for a face, framed by a purple hood and cowl, blue skin, a purple chest harness with crossed bones, purple trunks, a wide belt, and purple boots and cuffs. He carries the Havoc Staff, topped with a ram's skull.",
      "You can go two ways with the face: a full skull mask that covers everything, or face paint, which is more work but lets you talk and drink. The hood hides the edges of either. If you want the hero to chase, our He-Man guide builds his opposite number.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate" },
      { label: "Rough budget", value: "$70–$150" },
      { label: "Time to put on", value: "20 minutes with a mask, 60 minutes with face paint and body paint" },
      { label: "What people recognise first", value: "Yellow skull in a purple hood + the Havoc Staff" },
    ],
    items: [
      { name: "Skeletor skull mask or yellow skull face paint kit", url: search("Skeletor mask adult"), note: "The skull is a greenish-yellow, not white. If painting, use yellow with olive shading, black hollows for the eyes and nose, and painted teeth over your closed lips." },
      { name: "Purple hooded cowl", url: search("purple hooded cowl cape costume"), note: "A deep purple hood that frames the face and drapes over the shoulders. Many Skeletor costume sets include it." },
      { name: "Blue body paint or blue bodysuit", url: search("blue body paint water activated"), note: "His skin is light blue. A blue long-sleeve top and leggings is the easy, non-messy option." },
      { name: "Purple crossbones chest armor", url: search("Skeletor chest armor crossbones"), note: "Purple harness with crossed bones in grey or bone colour over the chest. Craft foam painted purple works if you're building it." },
      { name: "Purple fur or fabric trunks and wide belt", url: search("purple trunks costume men"), note: "Trunks with a wide belt sitting over them, buckle to the front." },
      { name: "Purple boots or boot covers and wrist cuffs", url: search("purple boot covers costume"), note: "Knee-high purple boot covers over your own boots, and purple or grey cuffs on the forearms." },
      { name: "Havoc Staff prop", url: search("Skeletor Havoc Staff prop"), note: "A long staff topped with a ram's skull. Buy a prop or make one from a broom handle, foam and a plastic ram skull from a craft store." },
    ],
    dressingGuide: [
      { itemName: "Skin and base", steps: [
        "If painting, apply blue body paint to the arms, chest and legs first and set it with powder; otherwise put on the blue top and leggings.",
        "Add the trunks and belt, then the boot covers and cuffs.",
      ] },
      { itemName: "Armor and hood", steps: [
        "Put the chest armor on so the crossed bones sit centred on the chest, and tighten it at the back.",
        "Put the hood on and arrange it so it frames the face closely and the cape falls behind the shoulders.",
      ] },
      { itemName: "Face", steps: [
        "Mask: fit it under the hood and pull the hood edge over the mask edge.",
        "Paint: base the face in greenish-yellow, paint large black sockets around the eyes and a black triangle for the nose, then draw a row of teeth across the mouth with black lines on a lighter base. Hollow the cheeks with dark olive shading.",
        "Finish by holding the Havoc Staff high and laughing. Skeletor's cackle and his insults to his henchmen are a big part of the character.",
      ] },
    ],
    about: [
      "Skeletor is the self-styled Overlord of Evil who rules Snake Mountain and schemes to seize the power of Castle Grayskull. He debuted in Mattel's 1982 Masters of the Universe toy line and in the 1983 Filmation cartoon, where his grating voice, melodramatic plans and constant abuse of henchmen like Beast Man and Evil-Lyn made him a fan favourite. Later continuities reveal him as Keldor, the disgraced brother of King Randor.",
      "Frank Langella played him in the 1987 film, Mark Hamill voiced him in Masters of the Universe: Revelation (2021), and Jared Leto took the role in the 2026 live-action film. The classic design, skull face in a purple hood with crossbones armor and the Havoc Staff, remains the one everyone recognises and the one this guide follows.",
    ],
    faqs: [
      { question: "What colour is Skeletor's face?", answer: "A greenish-yellow skull, not white. His skin is light blue. Getting the yellow right makes the costume look like Skeletor rather than a generic skeleton." },
      { question: "Mask or face paint for Skeletor?", answer: "A mask is faster and hides your face completely. Face paint takes about 40 minutes but lets you eat, drink and be expressive. Either way, the purple hood hides the edges." },
      { question: "How do I make the Havoc Staff?", answer: "Fix a plastic or foam ram skull to the top of a broom handle or PVC pipe, wrap the shaft in brown tape or paint it dark grey, and add a small cross-piece under the skull. Keep it lightweight; you'll carry it all night." },
      { question: "What's a good group costume with Skeletor?", answer: "He-Man is the pairing everyone expects. For a villains group, add Evil-Lyn (dark purple and blue with a headpiece), Beast Man (orange fur) and Trap Jaw. She-Ra and Hordak make a larger Eternia set." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "mojo-jojo-costume": {
    characterName: "Mojo Jojo",
    updated: "2026-11-02",
    seoTitle: "Mojo Jojo Costume: Striped Helmet, Blue Tunic, Cape & Green Face",
    metaDescription:
      "How to make a Mojo Jojo costume from The Powerpuff Girls: purple-and-white striped dome helmet, blue tunic with purple cape, white gloves and boots, green face and pink eyes. Easy DIY villain.",
    h1Title: "Mojo Jojo Costume Guide (The Powerpuff Girls)",
    excerpt:
      "Mojo Jojo is a purple-and-white striped dome helmet over a huge brain, a green face, a blue tunic, a purple cape and belt, and white gloves and boots.",
    intro: [
      "Mojo Jojo is the Powerpuff Girls' most persistent enemy: a hyper-intelligent chimpanzee whose exposed brain is hidden under a purple-and-white striped dome helmet. His outfit is a long blue tunic with a high white collar, a purple cape, a purple belt, white gloves and white boots, and his face is green with pink eyes and a black furred head. He also speaks in endless, repetitive sentences, which is half the fun of wearing him.",
      "The helmet is the make-or-break piece and the one you'll probably build; everything else is simple colour-blocked clothing. If you have company, our Blossom and Professor Utonium guides come from the same show and set up the obvious group.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate (the helmet is a craft project)" },
      { label: "Rough budget", value: "$40–$80" },
      { label: "Time to put on", value: "25 minutes including face paint" },
      { label: "What people recognise first", value: "Striped dome helmet + green face" },
    ],
    items: [
      { name: "Purple and white striped dome helmet (DIY)", url: search("foam half sphere craft large"), note: "Build it from a large foam half-sphere or a plastic bowl: paint purple, add white vertical stripes, and glue a white rim around the base. It sits on top of the head like a turban." },
      { name: "Dark blue tunic or long top", url: search("blue tunic costume long sleeve"), note: "Knee-length, long-sleeved, in a deep blue. A blue kaftan or oversized blue T-shirt dress works." },
      { name: "White high collar (DIY from felt)", url: search("white felt fabric sheet"), note: "Cut a stiff white collar that stands up around the neck and attach it to the tunic." },
      { name: "Purple cape", url: search("purple cape costume adult"), note: "Shoulder-length or longer, fastened at the front." },
      { name: "Purple belt", url: search("purple fabric belt sash"), note: "Worn low over the tunic." },
      { name: "White gloves", url: search("white costume gloves adult"), note: "Plain white cotton gloves." },
      { name: "White boots or boot covers", url: search("white boot covers costume"), note: "White ankle- or calf-height boots, or covers over your own shoes." },
      { name: "Green face paint and black cream makeup", url: search("green face paint water activated"), note: "Green for the face, black for the sides of the head and ears to suggest fur, and pink or red eyeshadow around the eyes." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on black or dark leggings and a black long-sleeve top as a base.",
        "Add the blue tunic, then attach the white collar so it stands up behind the neck.",
        "Tie the purple belt low and fasten the cape at the shoulders.",
        "Finish with white gloves and boots.",
      ] },
      { itemName: "Face", steps: [
        "Paint the whole face a mid green, leaving a thin band at the hairline for the helmet.",
        "Paint the ears and the sides of the head black, or wear a black beanie or bald cap under the helmet for the fur.",
        "Add pink eyeshadow around the eyes and a thin black line for the mouth, turned down.",
      ] },
      { itemName: "Helmet and voice", steps: [
        "Set the dome helmet on top of the head and secure it with a chin elastic or hair pins through the rim.",
        "Practise the voice: say everything three ways in a row. 'I, Mojo Jojo, will be the one who is victorious, for victory shall be mine.'",
      ] },
    ],
    about: [
      "Mojo Jojo is the main villain of The Powerpuff Girls, the Cartoon Network series created by Craig McCracken that debuted in 1998. He was once Jojo, Professor Utonium's lab chimpanzee, and was caught in the Chemical X accident that created the girls, which enlarged his brain and turned him into a scheming super-genius. He lives in an observatory on a volcano in the middle of Townsville and attacks the city constantly.",
      "His striped helmet, green face and redundant speech patterns made him one of the most quoted cartoon villains of the era. He has appeared in every version of the show since, including the 2016 reboot, and remains one of the most popular Powerpuff Girls costumes alongside the three girls themselves.",
    ],
    faqs: [
      { question: "How do I make Mojo Jojo's helmet?", answer: "Use a large foam half-sphere or a lightweight plastic bowl roughly the width of your head. Paint it purple, paint or tape evenly spaced white vertical stripes from the top to the rim, and glue a white band around the base. Attach an elastic strap or pins to keep it on." },
      { question: "What colour is Mojo Jojo's face?", answer: "Green, with pink eyes and a black-furred head. His outfit is a dark blue tunic with a white collar, a purple cape and belt, and white gloves and boots." },
      { question: "What's a good group costume with Mojo Jojo?", answer: "The Powerpuff Girls: Blossom in pink with a red bow, Bubbles in blue with pigtails, Buttercup in green with a black bob. Professor Utonium in a white lab coat and black tie, or the Mayor, rounds it out." },
      { question: "How does Mojo Jojo talk?", answer: "He repeats himself in slightly different words, explaining each point two or three times, in a clipped, formal voice. Leaning into it is the quickest way for people to recognise the character even before they see the helmet." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "katherine-pierce-outfits": {
    characterName: "Katherine Pierce",
    updated: "2026-11-02",
    seoTitle: "Katherine Pierce Outfits: Vampire Diaries Costume & Style Guide",
    metaDescription:
      "How to dress like Katherine Pierce from The Vampire Diaries: big curly dark hair, dark fitted leather jacket, deep red or black tops, skinny jeans and heels, plus her 1864 and 1492 period looks. How to tell her apart from Elena.",
    h1Title: "Katherine Pierce Outfits and Costume Guide (The Vampire Diaries)",
    excerpt:
      "Katherine is Elena's face with the opposite styling: voluminous dark curls, a fitted black leather jacket, dark red or black, high heels and a smirk.",
    intro: [
      "Katherine Pierce, born Katerina Petrova, is the 500-year-old vampire in The Vampire Diaries who shares a face with Elena Gilbert; both are played by Nina Dobrev. The show distinguishes them with styling: Elena wears straight hair and soft casuals, while Katherine wears big, bouncy curls, fitted dark clothes, leather, deep reds and high heels. That contrast is what you're recreating.",
      "Her modern-day look is the one most people want, and it's built from a few pieces that are easy to find. The show also gives you two period options, 1864 Mystic Falls and 1492 England, if you prefer a gown. If you want a Salvatore brother along, our Stefan Salvatore outfits guide covers his look.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$100, less if you own a leather jacket" },
      { label: "Time to put on", value: "30 minutes, most of it curling hair" },
      { label: "What people recognise first", value: "Big dark curls + leather jacket + dark lip" },
    ],
    items: [
      { name: "Long dark brown curly wig (or a curling iron)", url: search("long dark brown curly wig women"), note: "Voluminous, glossy curls parted in the centre or slightly off-centre. This is the single clearest Katherine-versus-Elena signal." },
      { name: "Fitted black leather jacket", url: search("women fitted black leather jacket"), note: "Cropped or hip-length, worn closed or open over a low-cut top." },
      { name: "Deep red or black fitted top", url: search("women burgundy fitted v neck top"), note: "Burgundy, oxblood or black, often with a V or scoop neck. Lace detail suits her." },
      { name: "Black skinny jeans or leather pants", url: search("women black skinny jeans"), note: "Dark and fitted. She's rarely seen in anything loose." },
      { name: "Black heeled boots or stilettos", url: search("women black heeled ankle boots"), note: "Heels are consistent across her modern looks." },
      { name: "Dark red lipstick and smoky eye kit", url: search("dark red lipstick matte"), note: "A deep berry or red lip and defined, smoky eyes. Elena wears a neutral lip; this is the other half of the contrast." },
      { name: "Vervain-free statement jewellery", url: search("women long pendant necklace gold"), note: "A long pendant or layered necklaces. Katherine's lapis lazuli daylight jewellery is usually a bracelet or a ring; a blue-stone ring is a nice nod." },
      { name: "1864 or 1492 period gown (optional)", url: search("women victorian ball gown costume"), note: "For the flashback versions: a Victorian-style gown with a fitted bodice for 1864, or a Tudor-style gown for 1492 England." },
    ],
    dressingGuide: [
      { itemName: "Modern Katherine", steps: [
        "Put on the fitted top and skinny jeans, then the heeled boots.",
        "Add the leather jacket, sleeves pushed up slightly, and the necklace or ring.",
        "Keep the palette to black, burgundy and a little gold; no bright colours.",
      ] },
      { itemName: "Hair and makeup", steps: [
        "If using your own hair, curl it in large sections away from the face and brush the curls out gently for volume. Finish with shine spray.",
        "Do a smoky eye in brown or charcoal, winged slightly, and fill the brows.",
        "Apply a dark red or berry lipstick and blot. Katherine's look is polished, not messy.",
      ] },
      { itemName: "Attitude and extras", steps: [
        "Her posture is confident and her default expression is a half-smile. Practise the raised eyebrow.",
        "For a vampire version, add a little blood at the corner of the mouth and fangs, but Katherine is more often immaculate than feral.",
        "If you're going with an Elena, agree on the contrast: her straight hair and soft colours versus your curls and black leather.",
      ] },
    ],
    about: [
      "Katherine Pierce is introduced in the first season of The Vampire Diaries (2009–2017) as the vampire who turned both Salvatore brothers in 1864 and whose face Elena shares as her doppelgänger. Born Katerina Petrova in Bulgaria in the 15th century, she has spent five hundred years running from Klaus Mikaelson, manipulating almost everyone she meets and occasionally revealing a conscience.",
      "Nina Dobrev played both characters for most of the series and the writers leaned on costume and hair to signal which was on screen, which is why Katherine's styling is so consistent: curls, leather, dark colours, heels and red lips. It makes her one of the easiest TV characters to dress as and one of the hardest to pull off without the attitude.",
    ],
    faqs: [
      { question: "How do I look like Katherine and not Elena?", answer: "Curl your hair big and glossy, wear black or deep red with a fitted leather jacket, add heels and a dark lip, and carry yourself with a smirk. Elena is straight hair, soft colours, flats and a natural lip." },
      { question: "What does Katherine wear in the 1864 flashbacks?", answer: "Victorian-style gowns with fitted bodices and full skirts, often in blues and creams, with her hair curled and pinned up. A Civil War-era ball gown costume is the closest off-the-shelf match." },
      { question: "What jewellery does Katherine Pierce wear?", answer: "Her daylight piece is lapis lazuli, usually worn as a bracelet. Beyond that she wears long pendant necklaces and gold or dark-stone rings. A blue-stone ring is an easy, recognisable nod for fans." },
      { question: "What are good couples costumes with Katherine?", answer: "Stefan or Damon Salvatore in a dark henley or button-down and a leather jacket, or an Elena so the two of you can play the doppelgänger contrast. Klaus or Elijah Mikaelson in a suit also fits her story." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "lucy-wilde-despicable-me-costume": {
    characterName: "Lucy Wilde",
    updated: "2026-11-02",
    seoTitle: "Lucy Wilde Costume: Despicable Me Teal Dress, Red Flip Hair & Scarf",
    metaDescription:
      "How to make a Lucy Wilde costume from Despicable Me 2: teal long-sleeve dress, scarf, black tights and heels, flipped orange-red bob wig and a lipstick taser prop. Pairs with Gru for a couples costume.",
    h1Title: "Lucy Wilde Costume Guide (Despicable Me)",
    excerpt:
      "Lucy Wilde is a teal dress with a scarf, black tights and heels, a flipped-out orange-red bob and a lipstick taser.",
    intro: [
      "Lucy Wilde is the Anti-Villain League agent who recruits Gru in Despicable Me 2 (2013) and marries him by the end of it, voiced by Kristen Wiig. Her signature outfit is a long-sleeved teal dress worn with a light scarf, black tights and black heels, topped with a bright orange-red bob flipped out at the ends. She's armed with a lipstick taser, which is the best prop in the franchise.",
      "It's a cheap, comfortable costume that most people recognise from the hair and the colour alone, and it's one half of a great couples costume: our Gru guide covers the grey scarf, black jacket and bald head. Add Minions in yellow and denim for a group.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$35–$75" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Orange flipped bob + teal dress" },
    ],
    items: [
      { name: "Teal long-sleeve knee-length dress", url: search("teal long sleeve knee length dress women"), note: "A blue-green teal, fitted at the top with a slight A-line skirt. A turtleneck or high neck is closest to her design." },
      { name: "Lightweight scarf", url: search("women lightweight scarf black white"), note: "Draped loosely around the neck. Lucy's is a simple, thin scarf; a black or dark one keeps the focus on the dress." },
      { name: "Black opaque tights", url: search("black opaque tights women"), note: "Opaque, not sheer." },
      { name: "Black pointed heels", url: search("women black pointed toe pumps"), note: "Low to mid heel. She runs a lot in them, so pick comfortable ones." },
      { name: "Orange-red flipped bob wig", url: search("orange red bob wig flipped ends"), note: "Chin-length with the ends curled outward. If the wig is straight, set the ends with a curling iron on low heat (synthetic-safe)." },
      { name: "Lipstick taser prop", url: search("lipstick taser prop toy"), note: "A large lipstick tube or an oversized lipstick prop. Add a little silver tape at the top for the 'taser' end." },
      { name: "Black belt (optional)", url: search("thin black belt women"), note: "A thin belt at the waist helps define the silhouette if your dress is loose." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on the tights, then the teal dress and the belt if you're using one.",
        "Drape the scarf loosely around the neck with one end over the shoulder.",
        "Add the black heels.",
      ] },
      { itemName: "Hair and face", steps: [
        "Pin your hair flat and fit the wig, with the fringe swept to one side and the ends flipping out.",
        "Lucy's makeup is simple: a touch of blush, defined lashes and a coral or red lip.",
      ] },
      { itemName: "Props and poses", steps: [
        "Carry the lipstick taser and brandish it in photos; her best gag is zapping Gru with it on their first meeting.",
        "She's eager and a little awkward. Big smile, wide eyes and an enthusiastic wave are in character.",
      ] },
    ],
    about: [
      "Lucy Wilde first appears in Despicable Me 2, where the Anti-Villain League sends her to bring Gru in to help track down a stolen mutagen. Over the film she goes from tasing him to becoming his partner, and they marry at the end; in Despicable Me 3 and 4 she is stepmother to Margo, Edith and Agnes and an agent in her own right.",
      "Kristen Wiig voices her with a mix of competence and nervous energy that made her an immediate favourite, and the design, red flipped hair against a teal dress, is one of the most distinctive in the Illumination films. That colour contrast is why the costume reads from across a room.",
    ],
    faqs: [
      { question: "What colour is Lucy Wilde's dress?", answer: "Teal, a blue-green, in a long-sleeved knee-length cut, worn with a scarf, black tights and black heels. Her hair is a bright orange-red bob flipped out at the ends." },
      { question: "What is Lucy Wilde's weapon?", answer: "A lipstick taser. She zaps Gru with it in their first scene. An oversized lipstick prop is the easiest version to carry." },
      { question: "What should Gru wear for a couples costume?", answer: "A black zip jacket, a grey striped scarf, dark trousers, black boots and a bald cap with a long nose if you want to go all the way. Our Gru guide has the full breakdown." },
      { question: "Can I make a Lucy Wilde costume from my own wardrobe?", answer: "Mostly. If you own a teal dress, black tights and heels, you only need the wig and a lipstick prop. The hair colour is what people recognise, so don't skip the wig." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "foxy-cleopatra-outfit": {
    characterName: "Foxy Cleopatra",
    updated: "2026-11-02",
    seoTitle: "Foxy Cleopatra Outfit: Gold Halter, Afro & Austin Powers Costume",
    metaDescription:
      "How to put together a Foxy Cleopatra costume from Austin Powers in Goldmember: gold sequin halter top and hot pants or mini skirt, gold boots, big afro, hoop earrings and a gold headband. 1970s disco agent look.",
    h1Title: "Foxy Cleopatra Outfit and Costume Guide (Austin Powers)",
    excerpt:
      "Foxy Cleopatra is a gold sequin halter, gold hot pants or mini skirt, gold boots, a big afro with a gold headband and oversized hoop earrings.",
    intro: [
      "Foxy Cleopatra, played by Beyoncé in Austin Powers in Goldmember (2002), is an undercover FBI agent in 1975 New York styled after 1970s blaxploitation heroines like Foxy Brown and Cleopatra Jones. Her most famous outfit is head-to-toe gold: a sequinned halter top, gold hot pants or a short skirt, gold knee-high boots, a large afro held back by a gold headband and big gold hoops.",
      "It is a bright, disco-era costume that's easy to find pieces for because 1970s and gold-themed clothing is everywhere around Halloween. The afro and the gold do the recognising; everything else is attitude. 'Sugar!' is her catchphrase.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$50–$110" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Gold sequins + afro + hoops" },
    ],
    items: [
      { name: "Gold sequin halter top", url: search("gold sequin halter crop top women"), note: "A halter neck crop top in gold sequins or metallic fabric. This is the anchor piece." },
      { name: "Gold hot pants or gold mini skirt", url: search("gold metallic hot pants women"), note: "High-waisted gold shorts or a short gold skirt. Match the metallic tone of the top as closely as you can." },
      { name: "Gold knee-high boots", url: search("gold knee high boots women"), note: "Gold or metallic boots with a chunky heel. Gold boot covers over black boots are a cheaper alternative." },
      { name: "Large afro wig", url: search("large afro wig black"), note: "Big, round and full. If you have natural hair, pick it out and shape it round." },
      { name: "Gold headband", url: search("gold headband wide metallic"), note: "Worn across the forehead or at the hairline to hold the afro back." },
      { name: "Oversized gold hoop earrings", url: search("oversized gold hoop earrings"), note: "The bigger the better." },
      { name: "Gold bangles and a choker", url: search("gold bangle set"), note: "Stack several bangles on one arm. A gold choker or collar necklace finishes it." },
      { name: "Toy pistol or FBI badge prop", url: search("toy spy gun gold"), note: "Optional, for the agent angle. A gold toy pistol fits the Goldmember theme." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on the hot pants or skirt first, then the halter top, tying the neck securely.",
        "Pull on the gold boots.",
        "Add the choker, bangles and hoops.",
      ] },
      { itemName: "Hair and makeup", steps: [
        "Fit the afro wig and fluff it out evenly with a pick, then place the gold headband at the hairline.",
        "Makeup is 1970s glam: shimmering gold or bronze eyeshadow, long lashes, a glossy nude or bronze lip and highlighted cheekbones.",
      ] },
      { itemName: "Attitude", steps: [
        "Foxy is confident and funny. Her lines, 'Sugar!' and 'Foxy Cleopatra, and I'm a whole lotta woman,' are worth having ready.",
        "A disco point or a hand-on-hip pose suits the costume.",
      ] },
    ],
    about: [
      "Foxy Cleopatra appears in Austin Powers in Goldmember, the third film in Mike Myers' spy-spoof series, released in 2002. Austin travels back to 1975 to rescue his father and reunites with Foxy, a former flame working undercover at Goldmember's roller disco. Beyoncé's performance, her first major film role, and the character's wardrobe made Foxy one of the most popular costumes of the early 2000s.",
      "The character is a tribute to 1970s blaxploitation heroines, her name combining Pam Grier's Foxy Brown with Tamara Dobson's Cleopatra Jones, and her styling pulls from that era: afros, gold, platform boots and fierce confidence. That's why the costume works even for people who haven't seen the film; it reads as pure 1970s disco glamour.",
    ],
    faqs: [
      { question: "What does Foxy Cleopatra wear in Austin Powers?", answer: "Her best-known look is all gold: a sequinned halter top, gold hot pants or mini skirt, gold knee-high boots, a gold headband across a large afro and big hoop earrings. She also wears other 1970s outfits in the film, including a blue roller-disco look." },
      { question: "Do I need a wig for a Foxy Cleopatra costume?", answer: "If your natural hair can be picked out into a full afro, no. Otherwise, a large round afro wig is the piece that makes the costume recognisable, so it's worth getting a good one." },
      { question: "What's a good couples costume with Foxy Cleopatra?", answer: "Austin Powers in a blue velvet suit with a frilly shirt and thick glasses, or Goldmember in a gold suit. Dr. Evil and Mini-Me in grey Nehru suits extend it to a group." },
      { question: "Is a Foxy Cleopatra costume appropriate?", answer: "Foxy is a confident, capable FBI agent played by Beyoncé, and the outfit is a loving nod to 1970s style icons. Wear it as a tribute to the era and the character; avoid darkening your skin or caricature of any kind." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "tj-detweiler-costume": {
    characterName: "T.J. Detweiler",
    updated: "2026-11-02",
    seoTitle: "T.J. Detweiler Costume: Recess Red Cap, Green Jacket & Jeans",
    metaDescription:
      "How to dress as T.J. Detweiler from Disney's Recess: backwards red baseball cap, olive-green zip jacket, white T-shirt, blue jeans and white sneakers. One of the easiest 90s cartoon costumes.",
    h1Title: "T.J. Detweiler Costume Guide (Recess)",
    excerpt:
      "T.J. is a red baseball cap worn backwards, a green zip-up jacket over a white T-shirt, blue jeans and white sneakers.",
    intro: [
      "T.J. Detweiler is the leader of the gang in Recess, Disney's late-1990s cartoon about the playground politics of Third Street Elementary. His outfit never changes: a red baseball cap worn backwards, an olive-green jacket zipped partway over a white T-shirt, blue jeans and white sneakers. It is one of the simplest cartoon costumes there is, and everyone who grew up with the show gets it from the cap alone.",
      "Because it's just clothes, this works for any age and any budget. The payoff comes with a group: Spinelli, Gretchen, Vince, Mikey and Gus are all equally easy, and we have guides for Spinelli and Gretchen already.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Very easy" },
      { label: "Rough budget", value: "$20–$60, often nothing" },
      { label: "Time to put on", value: "2 minutes" },
      { label: "What people recognise first", value: "Backwards red cap + green jacket" },
    ],
    items: [
      { name: "Plain red baseball cap", url: search("plain red baseball cap"), note: "Worn backwards, always. No logo, or cover the logo." },
      { name: "Olive-green zip-up jacket", url: search("olive green zip up jacket men lightweight"), note: "A lightweight bomber or windbreaker in olive green. T.J.'s is slightly oversized and zipped halfway." },
      { name: "White crew-neck T-shirt", url: search("white crew neck t-shirt"), note: "Shows at the chest where the jacket is unzipped." },
      { name: "Blue jeans", url: search("men straight leg blue jeans"), note: "Regular or slightly baggy fit in a mid blue." },
      { name: "White sneakers", url: search("white sneakers men"), note: "Simple white trainers." },
      { name: "Brown short wig (optional)", url: search("short brown wig men"), note: "T.J. has short brown hair that pokes out under the cap. Only needed if your hair is very different." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "White T-shirt, jeans and sneakers.",
        "Add the green jacket zipped about halfway so the T-shirt shows.",
        "Turn the red cap backwards and pull it down slightly.",
      ] },
      { itemName: "Details", steps: [
        "T.J. has a round face, a gap in his grin and freckles in some art; a few freckles with an eyebrow pencil is a nice touch.",
        "He's a schemer and a leader: thumbs in the jacket pockets, big grin, mid-plan.",
      ] },
    ],
    about: [
      "Recess ran on ABC and later Disney Channel from 1997 to 2001, with a feature film, Recess: School's Out, in 2001. Created by Paul Germain and Joe Ansolabehere, it treated the playground as a society with its own king, laws and factions. T.J. Detweiler, voiced first by Ross Malinger and later by Andrew Lawrence, is the good-natured troublemaker who leads the six main friends.",
      "His unchanging outfit, like those of the rest of the gang, was designed for instant recognition in a cast of dozens, which is exactly what makes it a good costume now. The backwards red cap in particular has become shorthand for the whole show.",
    ],
    faqs: [
      { question: "What does T.J. wear in Recess?", answer: "A red baseball cap worn backwards, an olive-green zip-up jacket over a white T-shirt, blue jeans and white sneakers. It's the same in every episode." },
      { question: "What should the rest of the Recess gang wear?", answer: "Spinelli: orange beanie, red leather jacket, black dress over striped tights and boots. Gretchen: blue dress, white collar, glasses and braids. Vince: green number-1 jersey and red shorts. Mikey: white T-shirt, green trousers. Gus: glasses, army-green shirt and khakis." },
      { question: "Can kids and adults both do a T.J. costume?", answer: "Yes. It's ordinary clothing in every size, which makes it a good family or mixed-age group costume." },
      { question: "Does the cap have to be red?", answer: "Yes. The backwards red cap is the single most recognisable thing about T.J.; with a different colour the costume reads as a generic 90s kid." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "rick-astley-costume": {
    characterName: "Rick Astley",
    updated: "2026-11-02",
    seoTitle: "Rick Astley Costume: Trench Coat, Quiff & Rickroll Outfit",
    metaDescription:
      "How to dress as Rick Astley from the 'Never Gonna Give You Up' video: tall auburn quiff, beige trench coat, black turtleneck or white shirt, jeans and a microphone. The ultimate Rickroll costume.",
    h1Title: "Rick Astley Costume Guide (Never Gonna Give You Up)",
    excerpt:
      "Rick Astley in 1987 is a tall swept-back auburn quiff, a beige trench coat over a dark turtleneck, light jeans and a side-to-side dance.",
    intro: [
      "The 'Never Gonna Give You Up' video from 1987 made Rick Astley famous twice: once as a pop star and again, twenty years later, as the Rickroll. The look from the video is what people recognise: a tall, swept-back auburn quiff, a long beige trench coat over a dark turtleneck or a white shirt, light blue jeans and the stiff, shoulder-rolling dance.",
      "It is a cheap costume with an enormous payoff, because the moment you do the dance everyone knows exactly who you are. Carry a small speaker and you can Rickroll a party in person.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$35–$80" },
      { label: "Time to put on", value: "15 minutes (mostly the hair)" },
      { label: "What people recognise first", value: "The quiff + trench coat + the dance" },
    ],
    items: [
      { name: "Beige or tan trench coat", url: search("men beige trench coat"), note: "Long, light-coloured and worn open. The coat is in most of the video and it's the piece that says 1987." },
      { name: "Black turtleneck", url: search("men black turtleneck"), note: "Under the coat for the main look. A white shirt with a dark waistcoat is the alternative seen in other shots." },
      { name: "Light blue jeans", url: search("men light wash straight jeans"), note: "Light wash, straight leg, high-waisted if you can find them." },
      { name: "Auburn pompadour quiff wig (or strong hairspray)", url: search("men auburn pompadour wig 80s"), note: "His hair is a reddish-brown, swept up and back into a tall quiff. If your hair is long enough, a lot of mousse and hairspray will do it." },
      { name: "Dark sunglasses (optional)", url: search("men dark sunglasses retro"), note: "He wears shades in a few shots; useful if you want to hide a bad wig line." },
      { name: "Handheld microphone prop", url: search("toy microphone prop"), note: "A silver mic to sing into." },
      { name: "Small Bluetooth speaker", url: search("small bluetooth speaker clip"), note: "Keep it in a pocket, loaded with one song. You know which one." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on the turtleneck and jeans, then white or black trainers.",
        "Add the trench coat open, collar down, sleeves pushed up slightly.",
      ] },
      { itemName: "Hair", steps: [
        "Wig: fit it and brush the front up and back into a tall, rounded quiff, then spray to hold.",
        "Own hair: blow-dry the front straight up and back over a round brush, then set with strong hairspray. Volume at the front matters more than length.",
      ] },
      { itemName: "The dance", steps: [
        "Feet planted, knees loose, roll the shoulders from side to side and swing the arms across the body on the beat.",
        "Add the finger point on 'you' and the sudden spin. Practise once to the song; it takes two minutes to learn.",
      ] },
    ],
    about: [
      "Rick Astley was a 21-year-old from Lancashire when 'Never Gonna Give You Up', produced by Stock Aitken Waterman, went to number one in the UK, the US and more than twenty other countries in 1987. The video, with its trench coat, quiff and stiff dance, was filmed cheaply and has become one of the most watched clips in history thanks to the Rickroll, the internet prank of linking to it unexpectedly that took off around 2007.",
      "Astley has embraced the joke, performing the song at the 2008 Macy's Thanksgiving Day Parade and at Glastonbury in 2023. That good humour is why the costume lands as affectionate rather than mocking: everyone's in on it, including him.",
    ],
    faqs: [
      { question: "What does Rick Astley wear in Never Gonna Give You Up?", answer: "Mainly a long beige trench coat over a black turtleneck with light blue jeans. In other shots he wears a white shirt, a dark waistcoat and sunglasses. The constant is the tall auburn quiff." },
      { question: "How do I do the Rick Astley hair?", answer: "Sweep the front up and back into a tall, rounded quiff. On your own hair, blow-dry upward over a round brush and set with strong hairspray; otherwise use an auburn 1980s pompadour wig." },
      { question: "How do I do the Rick Astley dance?", answer: "Stand with feet apart, roll your shoulders side to side and swing both arms across your body in time, keeping your upper body stiff. Add a finger point and the occasional spin. Watch the video once and copy it." },
      { question: "Is a Rick Astley costume recognisable without the song?", answer: "The trench coat and quiff get you most of the way, but the dance is what seals it. Keep a speaker in your pocket; it doubles as a Rickroll." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "fat-thor-costume": {
    characterName: "Fat Thor",
    updated: "2026-11-02",
    seoTitle: "Fat Thor Costume: Endgame Cardigan, Beard, Belly & Stormbreaker",
    metaDescription:
      "How to make a Fat Thor (Bro Thor) costume from Avengers: Endgame: long unkempt blond wig and beard, grey cardigan, stained tee, sweatpants, a padded belly, sunglasses, a beer and Stormbreaker. Easy and funny.",
    h1Title: "Fat Thor Costume Guide (Avengers: Endgame)",
    excerpt:
      "Fat Thor is a long messy blond wig and beard, a grey knit cardigan over a stained T-shirt, sweatpants, a padded belly, sunglasses, a beer can and Stormbreaker.",
    intro: [
      "In Avengers: Endgame (2019), five years after Thanos' snap, Thor is found in New Asgard living on beer and video games, out of shape, with a scraggly beard and long matted hair. 'Bro Thor' or 'Fat Thor' wears a grey knit cardigan over a stained T-shirt, sweatpants and slides, often with sunglasses and a can in hand. He later fights Thanos in that condition, in armour, with Stormbreaker and Mjolnir.",
      "This is one of the funniest and most comfortable Marvel costumes, and it's cheap: the cardigan, tee and sweatpants come from your own wardrobe or a thrift store, and the only costume items are the wig, beard, belly padding and axe. It pairs with the Endgame Avengers or stands alone.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$45–$100" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Blond beard + cardigan + beer + Stormbreaker" },
    ],
    items: [
      { name: "Long blond wig, tangled", url: search("long blond wig men viking"), note: "Shoulder-length or longer, dirty blond, deliberately messy. Tease it and skip the brushing." },
      { name: "Long blond beard", url: search("long blond fake beard"), note: "Full and scruffy. Braid a small section if you want a nod to his Infinity War look." },
      { name: "Grey knit cardigan", url: search("men grey chunky knit cardigan"), note: "Oversized, long and shapeless. Thor's is a soft grey, worn open." },
      { name: "Plain T-shirt, stained", url: search("men plain grey t-shirt"), note: "Grey or off-white. Add a couple of food stains with coffee or soy sauce." },
      { name: "Grey or black sweatpants", url: search("men grey sweatpants"), note: "Loose and lived-in." },
      { name: "Padded belly or pillow", url: search("fake belly costume padding"), note: "A costume belly under the T-shirt, or a small pillow held with a wide elastic band." },
      { name: "Round sunglasses", url: search("round sunglasses men"), note: "Small, dark, slightly 1970s. He wears them in New Asgard." },
      { name: "Stormbreaker axe prop", url: search("Stormbreaker axe prop foam"), note: "The big axe with the wooden handle. Foam versions are light enough to carry all night. Mjolnir is a bonus for the dual-wield shot." },
      { name: "Beer can prop and Fortnite headset", url: search("gaming headset"), note: "An empty can (or a can koozie) and a gaming headset around the neck complete the 'New Asgard' set-up." },
    ],
    dressingGuide: [
      { itemName: "Body and clothes", steps: [
        "Strap on the belly padding, then the stained T-shirt over it so it hangs.",
        "Add sweatpants and slides or old sneakers.",
        "Put the cardigan on open and push the sleeves up unevenly.",
      ] },
      { itemName: "Hair and face", steps: [
        "Attach the beard first, then the wig, and mess both up with your fingers. A little dry shampoo or baby powder dulls the shine.",
        "Shade under the eyes with grey eyeshadow for the 'hasn't slept' look, and redden the nose slightly.",
        "Add the sunglasses pushed up on the head or on the nose.",
      ] },
      { itemName: "Props", steps: [
        "Stormbreaker in one hand, beer can in the other. That's the pose.",
        "For the 'I'm still worthy' moment, hold out a hand as if calling Mjolnir.",
      ] },
    ],
    about: [
      "Thor's Endgame arc shows him crushed by his failure to stop Thanos and hiding in New Asgard, where Hulk and Rocket find him in the state the internet immediately named Fat Thor. The film plays it for laughs but also treats it seriously: he's grieving, and the point of his storyline is that he is still worthy of Mjolnir exactly as he is. Chris Hemsworth wore a prosthetic suit for the role.",
      "The look became an instant costume because it inverts everything a superhero outfit usually is: comfortable, cheap and funny, with just enough recognisable detail to be unmistakable. It also works well in a group of Endgame Avengers, next to Captain America, Iron Man and a Professor Hulk.",
    ],
    faqs: [
      { question: "What does Fat Thor wear in Endgame?", answer: "In New Asgard: a grey knit cardigan over a stained T-shirt, sweatpants, slides and sometimes sunglasses, with long matted blond hair and a full beard. In the final battle he wears his armour, still with the belly and beard, carrying Stormbreaker and Mjolnir." },
      { question: "How do I make a padded belly for the costume?", answer: "Buy a costume belly, or wrap a small pillow against your stomach with a wide elastic bandage or a tight tank top over it. Wear the stained T-shirt over that so it looks natural." },
      { question: "Should I carry Stormbreaker or Mjolnir?", answer: "Stormbreaker is the one he uses in Endgame and the more recognisable choice. If you can carry both, the dual-wield from the final battle is a great photo." },
      { question: "Is a Fat Thor costume in bad taste?", answer: "It's drawn from the film itself, and the character is treated with affection there; most Marvel fans love it. Keep it about the cardigan, the beard and the beer rather than mocking anyone's body, and it lands as intended." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "peter-griffin-costume": {
    characterName: "Peter Griffin",
    updated: "2026-11-02",
    seoTitle: "Peter Griffin Costume: White Shirt, Green Pants, Glasses & Belly",
    metaDescription:
      "How to make a Peter Griffin costume from Family Guy: white button-up shirt, green trousers, black belt, brown shoes, round glasses, a padded belly and the chin. Pairs with Lois, Stewie, Brian, Chris and Meg.",
    h1Title: "Peter Griffin Costume Guide (Family Guy)",
    excerpt:
      "Peter Griffin is a white shirt, green trousers, a black belt, brown shoes, round glasses, a big belly and a cleft chin.",
    intro: [
      "Peter Griffin has worn the same thing in every episode of Family Guy since 1999: a white button-up shirt, green trousers, a black belt, brown shoes and round glasses. Add a large belly, short brown hair and his split chin and you're done. It is one of the easiest cartoon costumes around and one of the most recognisable.",
      "The fun is in the family. We already have guides for Brian, Stewie, Chris and Meg, and Lois (green top, tan trousers, red hair) is just as easy, so a full Griffin household is within reach for almost no money.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Very easy" },
      { label: "Rough budget", value: "$25–$60" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "White shirt + green pants + glasses + belly" },
    ],
    items: [
      { name: "White button-up shirt", url: search("men white button up shirt short sleeve"), note: "Plain white, buttoned to the top. Buy it big so it fits over the belly padding." },
      { name: "Green trousers", url: search("men green chino trousers"), note: "A mid to dark green. Chinos or work trousers are right; avoid bright or neon green." },
      { name: "Black belt", url: search("black leather belt men"), note: "Worn high over the belly." },
      { name: "Brown shoes", url: search("men brown casual shoes"), note: "Plain brown lace-ups." },
      { name: "Round glasses", url: search("round glasses costume clear lens"), note: "Small, round, thin frames. Peter's are a key feature." },
      { name: "Padded belly", url: search("fake belly costume padding"), note: "Peter is large all over, but the belly is what matters. A costume belly or a pillow under the shirt works." },
      { name: "Short brown wig (optional)", url: search("short brown wig men"), note: "Peter's hair is short and brown, combed down. Only needed if yours is long or a different colour." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Strap on the belly padding and put the white shirt on over it, buttoned up.",
        "Tuck the shirt into the green trousers and fasten the black belt high on the waist.",
        "Brown shoes, then the glasses.",
      ] },
      { itemName: "Face", steps: [
        "Peter's chin is split by a vertical crease. Draw a short vertical line in brown eyebrow pencil on the chin and blend it slightly.",
        "His expression is a blank, open-mouthed grin. Practise the laugh: 'Hehehehehe.'",
      ] },
    ],
    about: [
      "Peter Griffin is the father in Family Guy, Seth MacFarlane's animated sitcom about the Griffin family of Quahog, Rhode Island, which premiered in 1999 and is still running. He's a well-meaning, impulsive, frequently idiotic husband to Lois and father to Meg, Chris and Stewie, with a talking dog, Brian, and a best friend, Quagmire, next door.",
      "His outfit, like those of most MacFarlane characters, was designed to be drawn identically every time, which makes it one of the few costumes you can assemble entirely from a thrift store in an afternoon and still be recognised from across a room.",
    ],
    faqs: [
      { question: "What does Peter Griffin wear?", answer: "A white button-up shirt, green trousers, a black belt, brown shoes and round glasses, in every episode. He has short brown hair and a cleft chin." },
      { question: "What should Lois wear for a couples costume?", answer: "A light green or teal sleeveless top, tan or khaki trousers, flat shoes, and a short reddish-orange bob. Pearl earrings are a nice touch." },
      { question: "How do I make Peter Griffin's chin?", answer: "Draw a short vertical line down the centre of your chin with a brown eyebrow pencil and soften it. Combined with the glasses and the grin, that's enough to read as Peter." },
      { question: "Can I do Peter Griffin without a padded belly?", answer: "You can, but the belly is a big part of the silhouette. A pillow held with an elastic bandage under the shirt is a free fix that improves the costume a lot." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "casey-becker-costume": {
    characterName: "Casey Becker",
    updated: "2026-11-02",
    seoTitle: "Casey Becker Costume: Scream Cream Sweater, Phone & Popcorn",
    metaDescription:
      "How to make a Casey Becker costume from Scream (1996): blonde bob, cream knit sweater, light jeans, a cordless phone and a Jiffy Pop popcorn pan. Pairs with Ghostface for a couples costume.",
    h1Title: "Casey Becker Costume Guide (Scream)",
    excerpt:
      "Casey Becker is a blonde bob, a cream knit sweater, light jeans, a cordless phone in one hand and a pan of Jiffy Pop in the other.",
    intro: [
      "Casey Becker, played by Drew Barrymore, is the first victim in Scream (1996), and her opening scene is one of the most famous in horror. She's home alone making Jiffy Pop popcorn in a cream knit sweater and light jeans when the phone rings and a voice asks what her favourite scary movie is. That image, blonde bob, cream sweater, cordless phone, popcorn, is the whole costume.",
      "It is a cheap, comfortable costume that horror fans recognise immediately, and it's the perfect other half to a Ghostface. For a group, add a Sidney Prescott, a Gale Weathers in a bright suit and a Randy in a video-store shirt.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Very easy" },
      { label: "Rough budget", value: "$25–$70" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Cream sweater + cordless phone + popcorn" },
    ],
    items: [
      { name: "Cream or off-white knit sweater", url: search("women cream cable knit crew neck sweater"), note: "A slightly loose crew-neck knit in cream or oatmeal. This is the anchor piece." },
      { name: "Light-wash straight jeans", url: search("women light wash straight leg jeans"), note: "Mid-rise, light blue, 1990s cut." },
      { name: "Chin-length blonde bob wig", url: search("blonde bob wig chin length"), note: "Casey's hair is a golden blonde cut to the chin with a slight flip. Skip it if your own hair matches." },
      { name: "1990s cordless phone prop", url: search("90s cordless phone prop costume"), note: "A big grey or white cordless handset with an antenna. A toy or a real vintage phone both work." },
      { name: "Jiffy Pop popcorn pan", url: search("Jiffy Pop popcorn"), note: "The foil-domed stovetop pan. Buy a real one (unpopped) and carry it by the handle." },
      { name: "White socks or sneakers", url: search("women white socks crew"), note: "She's barefoot in socks indoors; white socks with simple sneakers works for a party." },
      { name: "Fake blood (optional)", url: search("fake blood costume"), note: "For the end of the scene. A little on the sweater is plenty." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on the jeans and the cream sweater, sleeves pushed up slightly.",
        "White socks and sneakers, or socks alone if you're indoors.",
        "Fit the blonde bob and tuck one side behind the ear.",
      ] },
      { itemName: "Props", steps: [
        "Phone in one hand, held to the ear; Jiffy Pop in the other.",
        "Keep makeup natural and fresh-faced, 1990s style: light blush, mascara, a nude-pink lip.",
      ] },
      { itemName: "Optional 'after' version", steps: [
        "Add streaks of fake blood on the sweater and a frightened expression.",
        "If you have a Ghostface with you, re-stage the phone scene for photos.",
      ] },
    ],
    about: [
      "Scream, directed by Wes Craven and written by Kevin Williamson, opens with Casey Becker alone in her house fielding calls from a stranger who turns the conversation from flirtation to a quiz about horror films, with her boyfriend's life at stake. Killing off the film's biggest star in the first twelve minutes was a deliberate shock, and the sequence is often cited as one of the best openings in the genre.",
      "Drew Barrymore's outfit was chosen to look ordinary and comfortable, which is why it has become a costume: anyone can wear a cream sweater and jeans, and with a cordless phone and a pan of Jiffy Pop the reference is instant. The scene was revisited in later Scream films, keeping Casey's image current for new fans.",
    ],
    faqs: [
      { question: "What does Casey Becker wear in Scream?", answer: "A cream knit crew-neck sweater, light blue jeans and white socks, with her blonde hair in a chin-length bob. She holds a cordless phone and makes Jiffy Pop popcorn on the stove." },
      { question: "What is the popcorn in Scream?", answer: "Jiffy Pop, the stovetop popcorn in a foil pan that puffs up into a dome. The brand still exists, so you can carry a real one as a prop." },
      { question: "What's a good couples costume with Casey Becker?", answer: "Ghostface, in the black robe and white mask with a prop knife. The two of you can recreate the phone call. For a group, add Sidney Prescott, Gale Weathers and Randy Meeks." },
      { question: "Should I add blood to a Casey Becker costume?", answer: "Optional. The clean version is the one most people picture. A little fake blood on the sweater makes the horror reference clearer if you're not with a Ghostface." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "taskmaster-cosplay-costume": {
    characterName: "Taskmaster",
    updated: "2026-11-02",
    seoTitle: "Taskmaster Cosplay: Black Widow Armor, Skull Mask & Shield",
    metaDescription:
      "How to build a Taskmaster cosplay: the Black Widow (2021) movie version with dark blue tactical armor, skull helmet, round shield, sword and bow, or the comic version with the white hood, cape and skull face. Props and budget breakdown.",
    h1Title: "Taskmaster Cosplay and Costume Guide",
    excerpt:
      "Movie Taskmaster is dark blue tactical armor, a skull-faced helmet, a round shield, a sword and a bow; comic Taskmaster is a white hood and cape, orange and blue suit and a bare skull face.",
    intro: [
      "Taskmaster is the Marvel villain who can copy any fighting style after seeing it once, which is why the character carries everyone else's weapons: a shield like Captain America's, a bow like Hawkeye's, a sword and Black Panther's claws. There are two very different costumes depending on which version you choose, and the first decision is which one you're building.",
      "The Black Widow (2021) version, played by Olga Kurylenko as Antonia Dreykov, wears dark blue and black tactical armor with a full skull-faced helmet, a round shield on the back and a retractable sword. The comic version is the classic: a bare skull face under a white hood, a white cape, and a blue, orange and white suit. This guide covers the film look in detail, with notes for the comic version.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate to hard (armor and helmet)" },
      { label: "Rough budget", value: "$90–$200 depending on how much you build" },
      { label: "Time to put on", value: "30–40 minutes" },
      { label: "What people recognise first", value: "Skull mask + the stolen Avengers weapons" },
    ],
    items: [
      { name: "Taskmaster skull helmet or skull mask", url: search("Taskmaster helmet mask Black Widow"), note: "The film helmet is a dark, angular skull with a hinged lower jaw. A full costume helmet, or a white skull half-mask under a dark hood for the comic version." },
      { name: "Dark blue tactical bodysuit or combat trousers and top", url: search("tactical combat suit costume dark blue"), note: "Navy or near-black base layer. Military surplus combat trousers plus a compression top are a good cheap base." },
      { name: "Chest and shoulder armor pieces", url: search("EVA foam armor sheets cosplay"), note: "Cut plates from EVA foam, heat-shape them, prime and paint gunmetal with blue-grey highlights. Add a few orange accents for the comic version." },
      { name: "Round shield prop", url: search("round shield prop cosplay"), note: "Taskmaster's shield is dark grey with a simple design; a plain round shield painted dark grey, worn on the back, is enough." },
      { name: "Sword prop with back scabbard", url: search("foam sword prop cosplay with scabbard"), note: "A straight single-edged foam sword carried on the back under the shield." },
      { name: "Bow and quiver props", url: search("toy bow and arrow set costume"), note: "She uses a compact bow in the film. A toy bow with a few blunt arrows in a quiver works." },
      { name: "Tactical gloves and combat boots", url: search("black tactical gloves"), note: "Black fingerless or full tactical gloves and black lace-up combat boots." },
      { name: "Utility belt and thigh holster", url: search("tactical utility belt thigh holster black"), note: "A belt with pouches and a thigh rig fills out the tactical look." },
      { name: "White hood and cape (comic version)", url: search("white hooded cape costume"), note: "For the classic comic look: a white hood over a white skull face, with a white cape and a blue-and-orange suit." },
    ],
    dressingGuide: [
      { itemName: "Base layer", steps: [
        "Put on the dark blue bodysuit or combat trousers and compression top, then the boots.",
        "Strap on the utility belt and thigh holster.",
      ] },
      { itemName: "Armor", steps: [
        "Attach the chest plate first (elastic straps crossing at the back), then shoulder pieces, forearm bracers and shin plates.",
        "Check you can raise your arms and sit before you add weapons.",
      ] },
      { itemName: "Weapons and helmet", steps: [
        "Sling the scabbard and sword on your back, then hang the shield over it.",
        "Carry the bow in hand with the quiver on the hip.",
        "Put the helmet on last. If it limits your vision, keep it for photos and carry it between.",
        "Taskmaster's thing is mimicry: strike Captain America's shield stance or Hawkeye's draw for photos.",
      ] },
    ],
    about: [
      "Taskmaster first appeared in Marvel comics in 1980 as Tony Masters, a mercenary with 'photographic reflexes' who runs training academies for henchmen and mimics the moves of Captain America, Daredevil, Spider-Man and others. His classic costume, a skull face under a white hood with a white cape and a blue, orange and white suit, has been redesigned several times, including a more tactical look from the 2000s.",
      "The 2021 film Black Widow reimagined the character as Antonia Dreykov, the daughter of the Red Room's director, who was badly injured by Natasha years earlier and turned into a mind-controlled weapon. Her armor, skull helmet and borrowed weapons, including a shield, bow, sword and claws, are the version most people now picture, and she returned in Thunderbolts* (2025).",
    ],
    faqs: [
      { question: "Which Taskmaster costume should I make, film or comic?", answer: "The film version (dark armor, skull helmet, shield and sword) is the one most people recognise now and is easier to buy as a set. The comic version (white hood, cape, skull face, blue and orange suit) is more distinctive at a convention and better if you want the classic villain look." },
      { question: "What weapons does Taskmaster carry?", answer: "In Black Widow: a round shield worn on the back, a retractable sword, a compact bow and arrows, and retractable claws like Black Panther's. In the comics, usually a shield, sword and bow, plus whatever suits the fight." },
      { question: "How do I make Taskmaster's helmet?", answer: "Start with a cheap full-face skull mask or a motorcycle-style costume helmet, build up the brow and jaw with EVA foam, and paint it matte dark grey with white or bone highlights on the skull features. Add a hinged lower jaw from foam if you want the film detail." },
      { question: "What's a good group costume with Taskmaster?", answer: "Black Widow and Yelena Belova from the same film; we have guides for both. For a wider Marvel group, Taskmaster works alongside the Avengers whose moves the character copies: Captain America, Hawkeye and Black Panther." },
    ],
  },
};
