// =============================================================================
// CostumesPlanet.com — Hand-written guide content, batch 3 (Nov 2026)
//
// Written for both search engines and AI answer engines:
//   - intro[0] is a direct, self-contained answer ("A X costume needs: …")
//     so it can be quoted on its own.
//   - Items lead with the fastest complete option, then the pieces that
//     upgrade it, each with a reason.
//   - FAQs are phrased the way people ask assistants.
// Same rules as guides.ts: character-specific facts only, no invented claims.
// =============================================================================

import type { GuideContent } from "./guides";

const search = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=cplanet0c-20`;

export const guidesBatch3: Record<string, GuideContent> = {
  // ───────────────────────────────────────────────────────────────────────────
  "brian-griffin-costume": {
    characterName: "Brian Griffin",
    updated: "2026-11-05",
    seoTitle: "Brian Griffin Costume: White Dog, Red Collar & Martini (DIY)",
    metaDescription:
      "A Brian Griffin costume needs a white dog outfit or white hoodie and sweatpants, a red collar with a gold tag, floppy white ears, a black nose and a martini glass. Here's the fastest way to put it together, plus the Family Guy group.",
    h1Title: "Brian Griffin Costume Guide (Family Guy)",
    excerpt:
      "Brian is a white dog who walks upright: white top and bottoms, a red collar with a gold tag, floppy ears, a black nose and a martini.",
    intro: [
      "A Brian Griffin costume needs five things: an all-white outfit (a white dog onesie, or a white hoodie and sweatpants), a red collar with a gold tag, white floppy ears, a black nose, and a martini glass. Brian is the Griffins' talking dog in Family Guy, a white Labrador-ish mutt who drinks martinis, drives a Prius and keeps trying to publish a novel, and because he is plain white with one red accent, the collar does most of the work.",
      "The fastest route is a white dog costume with the collar swapped for a red one. The cheaper route is white clothes you already own plus a collar, ears and nose. Either way, the martini glass is what makes people say 'Brian' instead of 'dog', so don't skip it. He pairs with Stewie for the classic duo, and we have guides for Stewie, Peter, Chris and Meg if you're building the whole family.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Very easy" },
      { label: "Rough budget", value: "$25–$70" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Red collar + martini glass" },
    ],
    items: [
      { name: "White dog costume (onesie or hooded jumpsuit)", url: search("white dog costume adult onesie"), note: "Fastest option: one piece with ears and tail built in. Choose a plain white one without printed spots or a brown patch; Brian is solid white." },
      { name: "White hoodie and sweatpants (DIY base)", url: search("white hoodie sweatpants set adult"), note: "The budget alternative to the onesie. Plain, no logos. Add felt ears to the hood." },
      { name: "Red dog collar with a gold tag", url: search("red dog collar gold tag large"), note: "Brian's only colour. A real large-breed red collar with a round gold tag is more convincing than a costume one and costs about the same." },
      { name: "White floppy ear headband or felt ears", url: search("white dog ears headband"), note: "Floppy, not pointed. If you're wearing a hood, stitch felt ears to it instead." },
      { name: "Black nose (face paint or a small foam nose)", url: search("black dog nose costume"), note: "A painted black nose tip and a thin black line to the upper lip is all you need; Brian's face is otherwise plain." },
      { name: "Plastic martini glass with a fake olive", url: search("plastic martini glass fake olive prop"), note: "The defining prop. Acrylic so it survives the night; add a toothpick with a fake olive." },
      { name: "Fake copy of 'Faster Than the Speed of Love'", url: search("blank hardcover book prop"), note: "Optional gag: print a cover for his unpublished novel and tape it to a blank hardcover." },
    ],
    dressingGuide: [
      { itemName: "Base outfit", steps: [
        "Put on the white onesie, or the white hoodie and sweatpants over a white T-shirt.",
        "Wear white socks and white sneakers; Brian's feet are white too.",
        "Attach the ears to the hood or put on the ear headband.",
      ] },
      { itemName: "Collar and face", steps: [
        "Buckle the red collar loosely around the neck, tag to the front.",
        "Paint the tip of your nose black and draw a thin line down to the lip.",
        "Brian has heavy, slightly tired eyelids; a little grey eyeshadow helps the expression.",
      ] },
      { itemName: "Props and attitude", steps: [
        "Carry the martini glass at chest height, and never put it down for a photo.",
        "Brian is dry, pretentious and quick to lecture. A raised eyebrow and a sigh at other costumes is in character.",
        "With a Stewie: the two of you bicker; the 'Road to…' episodes are the reference.",
      ] },
    ],
    about: [
      "Brian Griffin is the family dog in Family Guy, voiced by Seth MacFarlane in his own speaking voice. He walks on two legs, talks, drinks martinis, drives a Toyota Prius and writes, badly; his self-published novel Faster Than the Speed of Love is a running joke. He is closest to Stewie, the baby, and the two share the show's 'Road to…' episodes and its best friendships and fights.",
      "Brian was briefly killed off in 2013 and brought back two episodes later after fan outcry, which tells you how central he is. His design, a plain white dog with a red collar, was built to be drawn fast and read instantly, and that is why the costume works with so little.",
    ],
    faqs: [
      { question: "What does Brian Griffin wear?", answer: "Nothing but a red collar with a gold tag. He is a plain white dog who walks upright, so a Brian costume is an all-white outfit, the red collar, white floppy ears, a black nose and usually a martini glass." },
      { question: "How do I make a Brian Griffin costume at home?", answer: "Wear a white hoodie, white sweatpants, white socks and white sneakers; add a red dog collar with a gold tag, felt ears on the hood, a black painted nose and a plastic martini glass. Total cost is usually under $40." },
      { question: "What's a good couples costume with Brian Griffin?", answer: "Stewie Griffin: a yellow shirt, red overalls and the football-shaped head. The two of them are the show's best-known pairing. Peter, Lois, Chris and Meg make the full family." },
      { question: "What breed of dog is Brian Griffin?", answer: "A white Labrador, according to the show, though he's drawn as a generic cartoon dog. For a costume, 'solid white dog with a red collar' is all that matters." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "stewie-griffin-costume": {
    characterName: "Stewie Griffin",
    updated: "2026-11-05",
    seoTitle: "Stewie Griffin Costume: Red Overalls, Yellow Shirt & Football Head",
    metaDescription:
      "A Stewie Griffin costume needs red overalls, a yellow long-sleeve shirt, white sneakers, a ray gun and the football-shaped head. Fastest set, DIY head instructions, Rupert the teddy and the Family Guy group.",
    h1Title: "Stewie Griffin Costume Guide (Family Guy)",
    excerpt:
      "Stewie is a yellow shirt under red overalls, white shoes, a football-shaped head, a ray gun and his teddy bear Rupert.",
    intro: [
      "A Stewie Griffin costume needs: a yellow long-sleeve shirt, red overalls, white sneakers, a football-shaped head (bought or built from foam), and a ray gun or his teddy bear Rupert. Stewie is the Griffins' evil-genius baby in Family Guy, with a British accent, a plan to kill Lois and a head shaped like an American football, and the head is the only part that takes effort.",
      "If you want the fastest version, buy a Stewie costume set with the headpiece included and upgrade the shoes and props. If you'd rather build it, the head is a foam shape on a cap, and the rest is clothing. Stewie is best next to a Brian; our Brian Griffin guide covers the white dog, and the Peter, Chris and Meg guides round out the family.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy with a bought head; moderate if you build it" },
      { label: "Rough budget", value: "$40–$90" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Football head + red overalls" },
    ],
    items: [
      { name: "Stewie Griffin costume set with headpiece", url: search("Stewie Griffin costume adult headpiece"), note: "Fastest option: shirt, overalls and the football-shaped head in one. Most sets are decent on the head and thin on the clothes, so treat the next two items as upgrades." },
      { name: "Red overalls (dungarees)", url: search("red overalls adult costume"), note: "Bright red, bib style, worn over the yellow shirt. Red bib shorts work in warm weather." },
      { name: "Yellow long-sleeve shirt", url: search("yellow long sleeve t-shirt adult"), note: "A clear mid yellow, not mustard. Long sleeves, plain." },
      { name: "White sneakers", url: search("white sneakers plain"), note: "Stewie's shoes are plain white." },
      { name: "Foam football head (DIY)", url: search("upholstery foam block large"), note: "Build: carve a wide oval from upholstery foam, hollow a cap-sized recess underneath, cover with skin-tone fabric or paint, and draw the three strands of hair on top. It sits on your head like a hat." },
      { name: "Toy ray gun", url: search("toy ray gun space blaster"), note: "A silver or coloured space blaster. Stewie's weapons are the running gag; a ray gun reads instantly." },
      { name: "Teddy bear (Rupert)", url: search("brown teddy bear classic"), note: "A plain brown teddy under one arm, for the softer side of the character." },
    ],
    dressingGuide: [
      { itemName: "Clothes", steps: [
        "Put on the yellow shirt, then the red overalls with both straps fastened.",
        "White socks and white sneakers.",
      ] },
      { itemName: "Head", steps: [
        "If using a bought headpiece, fit it over a thin skull cap so it doesn't slide.",
        "If you built one, secure the foam head to a baseball cap worn backwards so the brim is hidden, and tie it under the chin with a thin elastic.",
        "Stewie's face: wide eyes and a thin, flat mouth. If your face shows below the headpiece, keep makeup minimal and draw on arched eyebrows.",
      ] },
      { itemName: "Voice and props", steps: [
        "The accent is clipped English, the delivery is contempt. 'Victory is mine!', 'What the deuce?' and 'Damn you, vile woman!' are the lines.",
        "Ray gun in one hand, Rupert under the other arm. Point the gun at whoever is dressed as Lois.",
      ] },
    ],
    about: [
      "Stewie Griffin is the one-year-old youngest child of Peter and Lois in Family Guy, voiced by Seth MacFarlane with a Rex Harrison-style English accent. In the early seasons he was a would-be world dominator obsessed with killing his mother; later episodes made him a time-travelling, inventing, surprisingly sensitive foil to Brian, with whom he shares the show's 'Road to…' episodes.",
      "His football-shaped head is a visual trademark that the show itself jokes about constantly. It is the reason the costume is instantly recognisable even on someone six feet tall in red overalls, and it is why it's worth spending your budget on the head rather than the clothes.",
    ],
    faqs: [
      { question: "What does Stewie Griffin wear?", answer: "A yellow long-sleeve shirt under red overalls, with white shoes. He is drawn with a football-shaped head and three strands of hair, and often carries a ray gun or his teddy bear, Rupert." },
      { question: "How do I make Stewie's football head?", answer: "Carve a wide oval, pointed at both ends, from a block of upholstery foam, hollow the underside to fit a baseball cap, cover it with skin-tone fabric or flexible paint, and draw the hair strands on top. Fix it to a backwards cap and add a chin elastic." },
      { question: "Can an adult wear a Stewie costume?", answer: "Yes, and it's funnier at adult size. Adult sets with the headpiece are widely available; otherwise red overalls and a yellow shirt in your size plus a built head work for anyone." },
      { question: "What's a good partner costume with Stewie?", answer: "Brian Griffin, the white dog with a red collar and a martini. Lois (green top, tan trousers, red bob) is the other obvious pairing, since Stewie's whole early arc is trying to kill her." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "dexters-laboratory-halloween-costume": {
    characterName: "Dexter",
    updated: "2026-11-05",
    seoTitle: "Dexter's Laboratory Costume: Lab Coat, Purple Gloves & Dee Dee",
    metaDescription:
      "A Dexter's Laboratory costume needs a white lab coat, purple gloves, black boots, round glasses and spiky orange hair. Full guide for Dexter, plus Dee Dee (pink tutu, blonde pigtails) and Mandark for a group Halloween costume.",
    h1Title: "Dexter's Laboratory Halloween Costume Guide (Dexter, Dee Dee & Mandark)",
    excerpt:
      "Dexter is a white lab coat, purple gloves, black boots, big round glasses and a shock of orange hair; Dee Dee is a pink tutu and blonde pigtails.",
    intro: [
      "A Dexter costume from Dexter's Laboratory needs: a white lab coat buttoned to the collar, purple rubber gloves, black boots, large round glasses and short spiky orange hair. Dexter is the boy genius with a secret lab behind his bookcase, and his design is a lab coat with purple and black accents that is easy to copy and hard to mistake.",
      "This guide builds Dexter first, then adds Dee Dee, his ballet-obsessed sister in a pink leotard and tutu, and Mandark, his rival in the black-rimmed glasses and bowl cut, because Dexter's Laboratory is one of the best 90s group costumes there is. For the fastest version, buy a child's or adult's lab coat and add the gloves and glasses; everything else is detail.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$35–$80 for Dexter; Dee Dee is similar" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Lab coat + purple gloves + round glasses" },
    ],
    items: [
      { name: "White lab coat", url: search("white lab coat costume adult"), note: "Fastest option. Dexter's is knee-length with a high collar and buttons to the neck; a standard lab coat worn fully buttoned works." },
      { name: "Purple rubber or costume gloves", url: search("purple gloves costume elbow"), note: "The detail that turns 'scientist' into 'Dexter'. Purple dish gloves are cheap and accurate." },
      { name: "Black rubber boots or black boot covers", url: search("black rubber boots short"), note: "Dexter wears black boots with his coat. Short black wellies are closest." },
      { name: "Large round glasses with thick black frames", url: search("large round black frame glasses costume"), note: "Oversized and round. Clear or no lenses." },
      { name: "Short spiky orange wig", url: search("short spiky orange wig"), note: "Dexter's hair is a bright orange, swept up. Spray-in orange colour on your own short hair also works." },
      { name: "Black turtleneck (under the coat)", url: search("black turtleneck adult"), note: "Shows at the collar if the coat doesn't close fully." },
      { name: "Pink leotard, tutu and ballet flats (Dee Dee)", url: search("pink leotard tutu adult ballet costume"), note: "Dee Dee is a pink leotard, pink tutu, pink tights and ballet flats, with blonde pigtails. Buy a pink ballet set and a blonde pigtail wig." },
      { name: "Black-rimmed glasses, white shirt and black bowl-cut wig (Mandark)", url: search("black bowl cut wig"), note: "Mandark wears a white shirt and black trousers under a lab coat, with thick black glasses and a black bowl cut. His laugh is the costume." },
    ],
    dressingGuide: [
      { itemName: "Dexter", steps: [
        "Put on the black turtleneck and black trousers, then the lab coat buttoned to the top.",
        "Pull on the black boots and the purple gloves.",
        "Fit the orange wig and the round glasses. Dexter is short; a slight stoop and an impatient frown finish the character.",
        "Voice: an unexplained Eastern European accent and total contempt for Dee Dee.",
      ] },
      { itemName: "Dee Dee", steps: [
        "Pink leotard, pink tutu and pink tights, with pink ballet flats.",
        "Blonde wig in two high pigtails.",
        "Dee Dee is all elbows and pirouettes; touch everything in Dexter's lab. 'Ooh, what does this button do?'",
      ] },
      { itemName: "Mandark", steps: [
        "White shirt, black trousers, lab coat, thick black glasses and the bowl-cut wig.",
        "Practise the laugh: 'Ha ha ha! Ha ha ha ha ha!'",
      ] },
    ],
    about: [
      "Dexter's Laboratory was created by Genndy Tartakovsky and ran on Cartoon Network from 1996 to 2003. Dexter is a boy genius who hides an enormous laboratory behind his bedroom bookcase, keeps it secret from his parents, and fails to keep his older sister Dee Dee out of it. His rival Mandark runs a competing lab across the street.",
      "The show's flat, graphic style and the lab-coat-and-gloves design made Dexter a Halloween regular for a generation, and the sibling dynamic is why it works so well as a pair or group costume. Tartakovsky went on to make Samurai Jack and the Hotel Transylvania films.",
    ],
    faqs: [
      { question: "What does Dexter from Dexter's Laboratory wear?", answer: "A white lab coat buttoned to the neck, purple gloves, black boots and large round black glasses, with short spiky orange hair. He is drawn very short with a large head." },
      { question: "What does Dee Dee wear?", answer: "A pink leotard with a pink tutu, pink tights and ballet flats, with long blonde hair in two high pigtails. She's tall and thin, so the costume works best on someone taller than the Dexter." },
      { question: "Can I make a Dexter costume from my own clothes?", answer: "Mostly. If you own black trousers and a dark top, you only need a lab coat, purple gloves, round glasses and either an orange wig or coloured hairspray. Black rubber boots are optional." },
      { question: "What's the best group costume from Dexter's Laboratory?", answer: "Dexter and Dee Dee as a pair, Mandark as a third, and Mom (yellow rubber gloves, apron) and Dad (sweater, moustache) for a family. Monkey, Dexter's lab monkey who is secretly a superhero, is a fun extra." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "steven-universe-costume": {
    characterName: "Steven Universe",
    updated: "2026-11-05",
    seoTitle: "Steven Universe Costume: Pink Star Shirt, Jeans, Sandals & Gem",
    metaDescription:
      "A Steven Universe costume needs a salmon-pink T-shirt with a yellow star, cuffed blue jeans, pink sandals, curly dark hair and a pink gem on the navel. Easy DIY guide with the shield prop and Crystal Gems group pairings.",
    h1Title: "Steven Universe Costume Guide",
    excerpt:
      "Steven is a salmon-pink T-shirt with a yellow star, cuffed jeans, pink flip-flops, a mop of dark curls and a pink gem where his navel should be.",
    intro: [
      "A Steven Universe costume needs: a salmon-pink short-sleeve T-shirt with a large yellow star on the chest, blue jeans cuffed at the ankle, pink sandals or flip-flops, curly dark hair, and a pink gem on the stomach. Steven is the half-human, half-Gem hero of Rebecca Sugar's Cartoon Network series, and his outfit is so simple that most of it is probably in a wardrobe you already own.",
      "The star shirt is the only piece that matters for recognition; a plain pink tee with a yellow felt or iron-on star is the DIY route, and printed Steven shirts are cheap if you'd rather buy. Add his pink shield and you're set. For a group, we have guides for Rose Quartz, Stevonnie, Amethyst, Lapis Lazuli, Opal, Sardonyx, Pink Diamond, Blue Diamond and Yellow Pearl, so the Crystal Gems are easy to assemble.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Very easy" },
      { label: "Rough budget", value: "$20–$55" },
      { label: "Time to put on", value: "5 minutes" },
      { label: "What people recognise first", value: "Pink star shirt + gem" },
    ],
    items: [
      { name: "Salmon-pink T-shirt with a yellow star", url: search("Steven Universe star t-shirt"), note: "Fastest option: a printed Steven Universe star shirt. The colour is a warm salmon pink, not hot pink, with a big five-point yellow star centred on the chest." },
      { name: "Plain salmon T-shirt + yellow felt (DIY)", url: search("salmon pink t-shirt plain"), note: "Cut a 7–8 inch star from yellow felt and attach it with fabric glue or iron-on adhesive. Cheaper and the colour is easier to get right." },
      { name: "Blue jeans, cuffed", url: search("men blue jeans regular fit"), note: "Mid-blue, straight leg, rolled once at the ankle." },
      { name: "Pink flip-flops or sandals", url: search("pink flip flops adult"), note: "Steven wears pink sandals year-round. Pink slides work in colder weather." },
      { name: "Curly dark brown wig (if needed)", url: search("short curly dark brown wig men"), note: "A short, round mop of dark curls. Skip if your own hair is close." },
      { name: "Pink gem (navel)", url: search("pink gemstone sticker large"), note: "A large pink faceted gem glued to skin-safe adhesive on the navel, or stitched to the inside hem of the shirt so it shows when you lift it." },
      { name: "Pink shield prop", url: search("Steven Universe shield prop"), note: "A round pink shield with a rose pattern. Buy a prop or cut one from foam board and paint it." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on the star shirt and cuffed jeans, then the pink sandals.",
        "Fix the gem on the navel, or to the shirt hem, so it sits just above the waistband.",
      ] },
      { itemName: "Hair and face", steps: [
        "Fluff the curls out; Steven's hair is a big round shape.",
        "Keep the face natural with a wide, open smile. Thick dark eyebrows help.",
      ] },
      { itemName: "Props and poses", steps: [
        "Hold the shield up on one arm, or summon it: hand on the gem, other arm out.",
        "A ukulele is a great extra; Steven sings constantly.",
      ] },
    ],
    about: [
      "Steven Universe aired on Cartoon Network from 2013 to 2019, followed by Steven Universe: The Movie (2019) and the epilogue series Steven Universe Future (2019–2020). Created by Rebecca Sugar, the first woman to create a series for the network, it follows Steven, the son of a human musician and Rose Quartz, a Gem who gave up her form to have him, as he grows up with the Crystal Gems Garnet, Amethyst and Pearl in Beach City.",
      "Steven's outfit stays the same through most of the original series, which is why it's the version everyone recognises. In Future he wears a pink jacket over the star shirt, an easy upgrade if you want the older Steven.",
    ],
    faqs: [
      { question: "What does Steven Universe wear?", answer: "A salmon-pink short-sleeve T-shirt with a large yellow star, cuffed blue jeans and pink sandals, with curly dark hair and a pink gem on his navel. In Steven Universe Future he adds a pink varsity-style jacket." },
      { question: "How do I make Steven's star shirt?", answer: "Buy a plain salmon-pink T-shirt and attach a yellow felt star, about 7–8 inches across, to the centre of the chest with fabric glue or iron-on adhesive. Printed versions are also easy to find." },
      { question: "How do I make Steven's gem?", answer: "Use a large pink faceted craft gem with skin-safe adhesive on the navel, or glue it to a short strip of fabric stitched to the inside of the shirt hem so it shows when the shirt rides up." },
      { question: "What's a good group costume with Steven?", answer: "The Crystal Gems: Garnet (red and black with square glasses), Amethyst (purple with white hair) and Pearl (pale blue and white with a pointed nose). Connie with Rose's sword, Greg in a tank top, or Rose Quartz herself extend the group; we have guides for several of them." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "christine-daae-costume": {
    characterName: "Christine Daaé",
    updated: "2026-11-05",
    seoTitle: "Christine Daaé Costume: Phantom of the Opera Gowns & Nightgown",
    metaDescription:
      "A Christine Daaé costume is one of four looks from The Phantom of the Opera: the white nightgown and dressing gown, the 'Think of Me' gown, the black hooded cloak, or the masquerade dress. Pieces, curls, rose prop and the Phantom pairing.",
    h1Title: "Christine Daaé Costume Guide (The Phantom of the Opera)",
    excerpt:
      "Christine is long brown curls and one of four signature looks: the white nightgown, the 'Think of Me' gown, the black hooded cloak or the masquerade dress, with a red rose tied in black ribbon.",
    intro: [
      "A Christine Daaé costume needs long brown curls, a red rose with a black ribbon, and one of her four signature outfits from The Phantom of the Opera: the white nightgown with a sheer dressing gown (the 'Music of the Night' scene), the cream and pink 'Think of Me' gown, the black hooded cloak over a dark dress (the graveyard scene), or the pink and white masquerade gown with a rose in the hair. Pick one; each is recognisable on its own.",
      "The nightgown is the cheapest and the one most people choose for Halloween because it pairs so clearly with a Phantom in a half-mask. The masquerade gown is the showiest. If you're going as a pair, our Phantom of the Opera Red Death guide covers his masquerade look, which matches hers from the same scene.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy (nightgown) to moderate (gown)" },
      { label: "Rough budget", value: "$40–$80 nightgown; $90–$180 gown" },
      { label: "Time to put on", value: "30 minutes, mostly hair" },
      { label: "What people recognise first", value: "Brown ringlets + white nightgown + rose, next to a Phantom" },
    ],
    items: [
      { name: "White Victorian nightgown", url: search("white victorian nightgown long cotton lace"), note: "Fastest and most popular look. Long, white, with a lace or ruffled neckline and long sleeves. Worn with a sheer white dressing gown over it in the film." },
      { name: "Sheer white or ivory dressing gown / robe", url: search("sheer white long robe lace"), note: "Worn open over the nightgown. Chiffon or lace, floor-length." },
      { name: "Long brown curly wig", url: search("long brown curly wig ringlets"), note: "Christine's hair is a mass of soft brown ringlets, worn down or half up. If your hair is long, set it in rag curls or with a wand." },
      { name: "Red rose with black ribbon", url: search("red silk rose single stem"), note: "The Phantom's calling card. Tie a thin black satin ribbon around the stem; it's the prop that identifies her instantly." },
      { name: "Cream and pink 'Think of Me' gown", url: search("victorian ball gown cream pink off shoulder"), note: "Off-the-shoulder, cream with pink and gold trim and a full skirt. A Victorian or Regency-style ball gown in those colours is the match." },
      { name: "Black hooded cape", url: search("black hooded cape velvet long"), note: "For the 'Wishing You Were Somehow Here Again' graveyard look: a black hooded cloak over a dark dress, hood up." },
      { name: "Masquerade gown (pink and white) with rose hair piece", url: search("masquerade ball gown pink white victorian"), note: "A pink and white gown with a fitted bodice and full skirt, plus a small rose and feathers in the hair. The matching scene for a Red Death Phantom." },
      { name: "Half-mask (for a Phantom partner)", url: search("phantom of the opera half mask white"), note: "If your partner is the Phantom: white half-mask, black cape, tuxedo. His costume is cheaper than hers." },
    ],
    dressingGuide: [
      { itemName: "Nightgown look", steps: [
        "Put on the nightgown with a slip underneath, then the sheer robe open over it.",
        "Hair down in full ringlets, parted in the centre.",
        "Carry the rose; the pose is looking over your shoulder as if hearing the Phantom's voice.",
      ] },
      { itemName: "Gown looks", steps: [
        "Wear a petticoat or hoop under the 'Think of Me' or masquerade gown for the right fullness.",
        "Half-up hair with ringlets falling at the back; for masquerade, pin the rose and feathers at one side.",
        "Long white gloves suit both gowns.",
      ] },
      { itemName: "Makeup", steps: [
        "Soft and stage-ready: rosy cheeks, defined brows, a pink lip and a touch of shimmer on the lids.",
        "For the graveyard cloak, go paler with a little grey under the eyes.",
      ] },
    ],
    about: [
      "Christine Daaé is the young soprano at the Paris Opera who is tutored in secret by the masked Phantom in Gaston Leroux's 1910 novel and, most famously, Andrew Lloyd Webber's 1986 musical. Sarah Brightman originated the role in London; Emmy Rossum played her in the 2004 film, which is the source of most costume references because its gowns were designed to be looked at closely.",
      "Her costumes track the story: the innocence of the white nightgown, the stage glamour of the 'Think of Me' gown, the mourning of the graveyard cloak, and the romance of the masquerade dress. That range is why Christine is such a flexible costume, from a $40 nightgown to a full ball gown.",
    ],
    faqs: [
      { question: "What does Christine wear in The Phantom of the Opera?", answer: "Several outfits: a white nightgown with a sheer dressing gown in the 'Music of the Night' scene, a cream and pink gown for 'Think of Me', a black hooded cloak in the graveyard scene, and a pink and white gown for the masquerade. Her hair is long, brown and curly throughout." },
      { question: "What's the easiest Christine Daaé costume?", answer: "The white nightgown and sheer robe with brown ringlets and a red rose. It costs the least, takes minutes to put on, and is instantly recognisable next to a Phantom in a half-mask." },
      { question: "What does the Phantom wear for a couples costume?", answer: "A white half-mask over the right side of the face, a black tuxedo or tailcoat with a white shirt, and a black cape with a red lining. For the masquerade scene he's the Red Death: a red skeleton-themed suit, cape and skull mask." },
      { question: "What is the rose with the black ribbon?", answer: "The Phantom leaves Christine a single red rose tied with a black ribbon after her performances. Carrying one is the simplest way to signal the character." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "brock-pokemon-costume": {
    characterName: "Brock",
    updated: "2026-11-05",
    seoTitle: "Brock Costume (Pokémon): Green Vest, Orange Shirt & Spiky Hair",
    metaDescription:
      "A Brock costume from Pokémon needs a green vest, an orange T-shirt, brown trousers, sneakers, spiky dark brown hair and closed eyes. Easy DIY guide with Pokéball and Onix props, plus Ash and Misty for a group.",
    h1Title: "Brock Costume Guide (Pokémon)",
    excerpt:
      "Brock is a green vest over an orange T-shirt, brown trousers, spiky dark hair and permanently closed eyes, with a Pokéball or a Geodude under one arm.",
    intro: [
      "A Brock costume needs: a green sleeveless vest, an orange short-sleeve T-shirt, brown or khaki trousers, blue-and-white sneakers, spiky dark brown hair, and the squinted, closed-eye expression he's famous for. Brock is the Pewter City Gym Leader who travels with Ash and Misty through the early Pokémon anime, and his outfit is three colours and a hairstyle, which makes it one of the cheapest Pokémon costumes to put together.",
      "The fastest route is a plain green vest and orange tee from any shop; the only costume-specific piece is the spiky wig if your hair won't hold the shape. A Pokéball, an Onix or Geodude plush and a frying pan (he's the group's cook) cover the props. Our Misty guide is the natural partner, and Ash completes the original trio.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Very easy" },
      { label: "Rough budget", value: "$25–$60" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Green vest + orange shirt + squint" },
    ],
    items: [
      { name: "Green sleeveless vest", url: search("green vest men sleeveless casual"), note: "A mid to olive green zip or button vest, worn open. This plus the orange tee is the whole costume." },
      { name: "Orange short-sleeve T-shirt", url: search("orange t-shirt men plain"), note: "A warm orange, plain, under the vest." },
      { name: "Brown or khaki trousers", url: search("men brown cargo trousers"), note: "Loose-fit brown or dark khaki. Cargo pockets suit the traveller look." },
      { name: "Spiky dark brown wig", url: search("short spiky dark brown wig men"), note: "Brock's hair is short and spiked up all over. Strong gel on your own hair does the job if it's short and dark." },
      { name: "Blue and white sneakers", url: search("blue white sneakers men"), note: "Brock's shoes are blue with white. Any two-tone sneaker is fine." },
      { name: "Pokéball prop", url: search("Pokeball toy prop"), note: "One on the belt and one in hand." },
      { name: "Geodude or Onix plush", url: search("Geodude plush"), note: "His signature Rock-type Pokémon. Geodude tucks under an arm; Onix drapes over the shoulders." },
      { name: "Small frying pan or apron (optional)", url: search("small frying pan prop"), note: "Brock cooks for the group. A pan or a pink apron is a fan-favourite gag." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Orange tee, brown trousers, sneakers, then the green vest worn open.",
        "Clip a Pokéball to your belt.",
      ] },
      { itemName: "Hair and face", steps: [
        "Spike the hair up and back with gel, or fit the wig.",
        "The expression: eyes closed to slits, a calm half-smile. You can draw two short curved lines in brown eyeliner over closed lids for photos.",
        "Brock is tanned with no visible eyes; a warm bronzer helps.",
      ] },
      { itemName: "Character", steps: [
        "Carry the Geodude, fall in love with every Nurse Joy and Officer Jenny, and get dragged away by the ear by whoever is dressed as Misty.",
      ] },
    ],
    about: [
      "Brock is the Pewter City Gym Leader and a Rock-type specialist who joins Ash Ketchum and Misty in the first season of the Pokémon anime in 1997 and travels with Ash for most of the series' first decade. He is the group's cook, caretaker and hopeless romantic, and his permanently closed eyes are one of the show's most recognisable design choices.",
      "He also appears in Pokémon Red, Blue and Yellow as the first Gym Leader players face, with Geodude and Onix, which is why the Rock-type plush is the prop fans expect.",
    ],
    faqs: [
      { question: "What does Brock from Pokémon wear?", answer: "A green sleeveless vest open over an orange T-shirt, brown trousers and blue-and-white sneakers. He has short spiky dark brown hair and his eyes are always drawn closed." },
      { question: "How do I do Brock's closed eyes?", answer: "Keep your eyes squinted or closed for photos; for a more drawn look, use brown eyeliner to draw a short curved line across each closed lid. A relaxed half-smile completes it." },
      { question: "What Pokémon should Brock carry?", answer: "Geodude or Onix, his Rock-type partners from Pewter City Gym. A Pokéball on the belt is the minimum." },
      { question: "What's a good group costume with Brock?", answer: "Ash (red and white cap, blue jacket, Pikachu) and Misty (yellow crop top, red suspenders, denim shorts, side ponytail) make the original trio. Nurse Joy or Officer Jenny as a fourth sets up his running joke." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "troy-bolton-cosplay": {
    characterName: "Troy Bolton",
    updated: "2026-11-05",
    seoTitle: "Troy Bolton Costume: East High Wildcats Jersey #14 & Warm-Up",
    metaDescription:
      "A Troy Bolton costume needs the red-and-white East High Wildcats basketball jersey number 14, red shorts or the red Wildcats warm-up jacket, white sneakers and shaggy brown hair. High School Musical looks from all three films plus Gabriella pairing.",
    h1Title: "Troy Bolton Costume Guide (High School Musical)",
    excerpt:
      "Troy is the East High Wildcats number 14 jersey in red and white, red basketball shorts or the red warm-up jacket, white sneakers and Zac Efron's shaggy mid-2000s hair.",
    intro: [
      "A Troy Bolton costume needs: a red-and-white East High Wildcats basketball jersey with the number 14, red basketball shorts, white sneakers and a shaggy side-swept brown haircut. That's the look from High School Musical (2006) that everyone recognises; the red Wildcats warm-up jacket over a white tee is the second option and the more wearable one at a party.",
      "The fastest route is a printed Wildcats #14 jersey, which is easy to find because the film is a Halloween staple. If you want the other films, HSM2 gives you the Lava Springs golf polo and the lifeguard look, and HSM3 the red graduation gown. Gabriella Montez is the obvious pairing and we have a separate guide for her.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Very easy" },
      { label: "Rough budget", value: "$30–$70" },
      { label: "Time to put on", value: "5 minutes" },
      { label: "What people recognise first", value: "Wildcats #14 jersey" },
    ],
    items: [
      { name: "East High Wildcats #14 basketball jersey", url: search("East High Wildcats 14 Bolton jersey"), note: "Fastest option and the whole costume. Red and white with 'Wildcats' across the chest and 14 on the back. Wear over a white T-shirt as in the film." },
      { name: "Red basketball shorts", url: search("red basketball shorts men"), note: "Plain red, knee-length, with a white stripe if you can find it." },
      { name: "Red Wildcats warm-up jacket (alternative)", url: search("East High Wildcats red jacket"), note: "The red zip jacket with white trim from the opening of the film; wear it over a white tee with jeans for the casual Troy." },
      { name: "White basketball sneakers", url: search("white basketball sneakers men"), note: "Clean white high-tops." },
      { name: "Shaggy brown wig (if needed)", url: search("shaggy brown wig men side swept"), note: "The mid-2000s side-swept shag. Skip if your hair is already close." },
      { name: "Basketball", url: search("basketball indoor outdoor"), note: "Carry one; spin it on a finger if you can. 'Get'cha Head in the Game' is the scene." },
      { name: "White T-shirt", url: search("white t-shirt men crew"), note: "Under the jersey or the jacket." },
    ],
    dressingGuide: [
      { itemName: "Game look", steps: [
        "White tee, then the #14 jersey, red shorts, white socks and white sneakers.",
        "Carry the basketball.",
      ] },
      { itemName: "Casual look", steps: [
        "White tee, jeans, white sneakers and the red Wildcats jacket zipped halfway.",
      ] },
      { itemName: "Hair and attitude", steps: [
        "Side-swept shaggy hair with a bit of texture spray.",
        "Troy is earnest and conflicted between basketball and the musical. A dramatic 'Bet On It' pose on a golf green is the HSM2 reference.",
      ] },
    ],
    about: [
      "Troy Bolton, played by Zac Efron, is the captain of the East High Wildcats basketball team who auditions for the school musical with Gabriella Montez in High School Musical, the Disney Channel film that premiered in 2006 and became a phenomenon. Two sequels followed, High School Musical 2 (2007) and High School Musical 3: Senior Year (2008), the last released in cinemas.",
      "The Wildcats jersey, number 14, is one of the most recognisable pieces of 2000s Disney costume, and it's the reason Troy is such a reliable Halloween choice: one printed jersey does everything. The 2019 series High School Musical: The Musical: The Series brought the East High look back for a new audience.",
    ],
    faqs: [
      { question: "What is Troy Bolton's jersey number?", answer: "14. His East High Wildcats basketball jersey is red and white with 'Wildcats' on the front and 14 on the back." },
      { question: "What does Troy Bolton wear in High School Musical?", answer: "His Wildcats #14 jersey and red shorts for games, and the red Wildcats warm-up jacket over a white T-shirt with jeans the rest of the time. In HSM2 he wears a Lava Springs golf polo, and in HSM3 a red graduation gown." },
      { question: "What should Gabriella wear for a couples costume?", answer: "A pale blue or white sundress with long dark curly hair is her signature look. Our Gabriella Montez guide has the full breakdown. Sharpay in head-to-toe pink and Ryan in a fedora make a group." },
      { question: "Can I do a Troy costume without the jersey?", answer: "Yes: the red Wildcats jacket, a white tee, jeans and white sneakers with the shaggy hair is the casual Troy. But the jersey is cheap and instantly recognisable, so it's the better buy." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "diy-peter-pan-costume": {
    characterName: "Peter Pan",
    updated: "2026-11-05",
    seoTitle: "DIY Peter Pan Costume: Green Tunic, Tights, Feather Cap & Dagger",
    metaDescription:
      "A Peter Pan costume needs a green tunic with a jagged hem, green tights or leggings, a green felt cap with a red feather, a brown belt with a dagger and brown shoe covers. DIY instructions, fastest set option, and Tinker Bell, Wendy and Hook pairings.",
    h1Title: "DIY Peter Pan Costume Guide",
    excerpt:
      "Peter Pan is a green tunic with a jagged hem, green tights, a green cap with a red feather, a brown belt with a dagger and brown pointed shoes.",
    intro: [
      "A Peter Pan costume needs: a green tunic with a jagged, leaf-like hem, green tights or leggings, a pointed green felt cap with a red feather, a brown belt with a small dagger, and brown pointed shoe covers. That's the Disney design from the 1953 film and it is the one everyone pictures. You can buy it as a set in ten minutes or make the tunic and cap from felt in an afternoon.",
      "This guide gives you both routes. The DIY version costs less and fits better, and the only sewing is a straight seam. Peter is the centre of one of the best group costumes going: our Tinker Bell, Wendy Darling, Captain Hook and Mr. Smee guides cover the rest of Neverland.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy (set) or easy DIY with basic sewing" },
      { label: "Rough budget", value: "$25–$45 DIY; $40–$80 for a set" },
      { label: "Time to put on", value: "10 minutes" },
      { label: "What people recognise first", value: "Green cap with red feather + jagged tunic" },
    ],
    items: [
      { name: "Peter Pan costume set (tunic, cap, belt)", url: search("Peter Pan costume adult tunic cap"), note: "Fastest option. Check it includes the cap with a feather; the tights, shoes and dagger are usually separate." },
      { name: "Green felt or jersey fabric, 2 yards (DIY tunic)", url: search("green felt fabric by the yard"), note: "Fold in half, cut a neck hole, sew the sides leaving arm holes, and cut the hem into points. Felt doesn't fray, so no hemming." },
      { name: "Green tights or leggings", url: search("green tights adult costume"), note: "A darker green than the tunic looks closest to the film." },
      { name: "Green felt cap with a red feather", url: search("Peter Pan hat green felt red feather"), note: "Buy one, or fold a triangle of felt, stitch the back seam and tuck a red craft feather into the band. Worn tilted." },
      { name: "Brown leather belt", url: search("brown leather belt wide"), note: "Worn at the waist over the tunic, with the dagger tucked into it." },
      { name: "Toy dagger", url: search("toy dagger prop foam"), note: "Peter carries a small dagger, not a sword. Foam or rubber." },
      { name: "Brown pointed shoe covers or elf shoes", url: search("brown elf shoe covers costume"), note: "Soft brown pointed shoes or covers over flat shoes. Brown ballet flats work for a quick version." },
      { name: "Short red-orange wig (optional)", url: search("short ginger wig men"), note: "Disney's Peter has reddish hair under the cap. Only needed if you want the full look." },
    ],
    dressingGuide: [
      { itemName: "Tunic and tights", steps: [
        "Put the tights on first, then the tunic. If the tunic is long, belt it so the hem sits mid-thigh.",
        "Cut the tunic hem into uneven points if it's straight; Peter's looks like leaves.",
      ] },
      { itemName: "Belt, dagger and shoes", steps: [
        "Buckle the belt at the natural waist and slide the dagger in at one hip.",
        "Pull the shoe covers over flat shoes.",
      ] },
      { itemName: "Cap and attitude", steps: [
        "Tilt the cap to one side with the feather pointing back.",
        "Peter stands hands on hips, chest out, chin up, and crows. If you have a Tinker Bell, keep her on your shoulder in photos.",
      ] },
    ],
    about: [
      "Peter Pan is the boy who won't grow up, created by J.M. Barrie in his 1904 play and 1911 novel. The green tunic, tights and feathered cap are Disney's 1953 design and have become the standard image, though Barrie's Peter wore 'skeleton leaves and the juices that ooze out of trees'. He lives in Neverland with the Lost Boys, fights Captain Hook and brings Wendy, John and Michael Darling there for an adventure.",
      "The character has been played on stage mostly by women, from Maude Adams and Mary Martin to Cathy Rigby, and on screen by Jeremy Sumpter in the 2003 film and in Disney's 2023 Peter Pan & Wendy. The costume suits anyone, which is part of why it's lasted.",
    ],
    faqs: [
      { question: "What does Peter Pan wear?", answer: "A green tunic with a jagged hem, green tights, a pointed green cap with a red feather, a brown belt with a small dagger and brown pointed shoes. That's the Disney version; in the book his clothes are made of leaves." },
      { question: "How do I make a Peter Pan tunic?", answer: "Fold two yards of green felt in half, cut a hole for your head at the fold, sew the sides from the hem up to a few inches below the fold to leave arm holes, then cut the bottom edge into points. Felt won't fray, so there's no hemming." },
      { question: "How do I make the Peter Pan hat?", answer: "Cut a long triangle of green felt, fold it in half lengthways, stitch the back seam, turn up a small brim and tuck a red feather into the fold. Wear it tilted." },
      { question: "What's a good group costume with Peter Pan?", answer: "Tinker Bell (green dress, wings, blonde bun), Wendy (blue nightgown, blue ribbon), Captain Hook (red coat, hook, black wig) and Mr. Smee (striped shirt, red cap, glasses). We have guides for all four." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "timmy-turner-costume": {
    characterName: "Timmy Turner",
    updated: "2026-11-05",
    seoTitle: "Timmy Turner Costume: Pink Hat, Pink Shirt, Buck Teeth & Fairies",
    metaDescription:
      "A Timmy Turner costume needs a pink baseball cap, a pink T-shirt, blue jeans, buck teeth and Cosmo and Wanda props. Fastest DIY guide from The Fairly OddParents, plus the fairies as a couples or group costume.",
    h1Title: "Timmy Turner Costume Guide (The Fairly OddParents)",
    excerpt:
      "Timmy is a pink baseball cap, a pink T-shirt, blue jeans, white sneakers and buck teeth, with Cosmo and Wanda floating nearby.",
    intro: [
      "A Timmy Turner costume needs: a pink baseball cap, a pink short-sleeve T-shirt, blue jeans, white sneakers and a pair of buck teeth. Timmy is the ten-year-old from The Fairly OddParents whose fairy godparents Cosmo and Wanda grant his wishes, and his all-pink top half is one of the most recognisable colour schemes in Nickelodeon's history.",
      "It is a two-item costume: pink cap, pink shirt. Everything else is jeans and sneakers. The props are where the fun is. Cosmo (green) and Wanda (pink) can be plush toys on wires over your shoulders, printed cut-outs on headbands, or two friends in green and pink with crowns and wands. Our Jorgen Von Strangle guide covers the show's giant fairy enforcer if you want a bigger group.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Very easy" },
      { label: "Rough budget", value: "$20–$50" },
      { label: "Time to put on", value: "5 minutes" },
      { label: "What people recognise first", value: "Pink cap + pink shirt + buck teeth" },
    ],
    items: [
      { name: "Pink baseball cap", url: search("pink baseball cap plain"), note: "A bright, true pink, worn forwards. Plain, no logo." },
      { name: "Pink short-sleeve T-shirt", url: search("pink t-shirt plain unisex"), note: "Match the cap as closely as you can. This and the cap are the whole costume." },
      { name: "Blue jeans", url: search("blue jeans regular fit"), note: "Mid blue, straight leg." },
      { name: "White sneakers", url: search("white sneakers plain"), note: "Plain white." },
      { name: "Buck teeth (costume teeth)", url: search("buck teeth costume fake"), note: "Timmy's two big front teeth are his defining feature. Cheap costume teeth that slip over your own work for photos." },
      { name: "Cosmo and Wanda plush or cut-outs", url: search("Cosmo Wanda Fairly OddParents plush"), note: "Mount them on stiff wire from a backpack strap so they float at shoulder height, or print and laminate cut-outs on headbands." },
      { name: "Green and pink wigs, crowns and star wands (for friends as the fairies)", url: search("star wand gold costume"), note: "Cosmo: green hair, white shirt, black tie. Wanda: pink swirl hair, yellow top. Both get a tiny gold crown on a headband and a star-tipped wand." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Pink shirt, jeans, white sneakers, pink cap.",
        "Timmy's hair is brown and pokes out under the cap; a short brown wig is optional.",
      ] },
      { itemName: "Face", steps: [
        "Put the buck teeth in for photos. Timmy's eyes are big and blue; keep the face bright and open.",
      ] },
      { itemName: "Fairies", steps: [
        "Attach Cosmo and Wanda on wire to a small backpack or your belt so they hover beside your head.",
        "If friends are playing them, they should float behind you and 'poof' things into existence on request.",
      ] },
    ],
    about: [
      "The Fairly OddParents, created by Butch Hartman, ran on Nickelodeon from 2001 to 2017, with later revivals. Timmy Turner is an average kid that no one understands, in the words of the theme song, who is assigned fairy godparents Cosmo and Wanda to grant his wishes, which usually backfire. Vicky, his babysitter, and Mr. Crocker, his teacher, are the antagonists.",
      "Timmy's pink cap and shirt were, according to Hartman, a production accident that stuck, and they have become the character's identity. A pink cap and shirt is now shorthand for Timmy, which makes this one of the cheapest instantly-recognisable costumes on the site.",
    ],
    faqs: [
      { question: "What does Timmy Turner wear?", answer: "A pink baseball cap, a pink short-sleeve T-shirt, blue jeans and white sneakers. He has short brown hair, big blue eyes and two large buck teeth." },
      { question: "Why does Timmy Turner wear pink?", answer: "Creator Butch Hartman has said it started as a mistake in the show's early production and was kept because it made Timmy stand out. It is now the character's trademark." },
      { question: "How do I make Cosmo and Wanda for a Timmy costume?", answer: "Use plush toys or printed, laminated cut-outs mounted on stiff floral wire attached to a small backpack or your belt, so they float beside your shoulders. Or have two friends dress as the fairies in green and pink with crowns and wands." },
      { question: "What's a good group costume from The Fairly OddParents?", answer: "Timmy with Cosmo and Wanda is the core trio. Add Vicky (green shirt, red ponytail), Mr. Crocker (black suit, hunch, 'FAIRY GODPARENTS!') or Jorgen Von Strangle for a bigger group." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "diy-ginny-weasley-costume": {
    characterName: "Ginny Weasley",
    updated: "2026-11-05",
    seoTitle: "DIY Ginny Weasley Costume: Gryffindor Uniform, Red Hair & Wand",
    metaDescription:
      "A Ginny Weasley costume needs long straight red hair, a Gryffindor uniform (grey jumper, white shirt, red and gold tie, grey skirt, black robe) and a wand. DIY guide with the Yule Ball dress and Quidditch robes alternatives, plus Harry and Weasley family pairings.",
    h1Title: "DIY Ginny Weasley Costume Guide (Harry Potter)",
    excerpt:
      "Ginny is long straight red hair and a Gryffindor school uniform: grey jumper with red and gold trim, white shirt, house tie, grey skirt, black robe and a wand.",
    intro: [
      "A Ginny Weasley costume needs: long, straight red hair, a Gryffindor school uniform (white shirt, red and gold striped tie, grey V-neck jumper with Gryffindor trim, grey pleated skirt or trousers, black robe) and a wand. The red hair is what separates Ginny from any other Gryffindor; Bonnie Wright wore it long and straight in the later films, and that is the version most people recognise.",
      "The DIY route is a school uniform from pieces you may own plus a tie, a robe and a wig. If you'd rather skip the uniform, her pale green Yule Ball dress from Goblet of Fire and her Gryffindor Quidditch robes are both recognisable alternatives. Harry is the obvious partner; Ron, Fred and George make a Weasley family. If you need a villain, our Dolores Umbridge guide is all pink.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$35–$90 depending on how much uniform you own" },
      { label: "Time to put on", value: "15 minutes" },
      { label: "What people recognise first", value: "Long straight red hair + Gryffindor tie" },
    ],
    items: [
      { name: "Gryffindor robe with hood and house crest", url: search("Gryffindor robe adult"), note: "Fastest option: a black robe with the red lining and Gryffindor crest. Many come with the tie." },
      { name: "Long straight red wig", url: search("long straight red wig auburn"), note: "A natural copper-red, not orange, worn down with a centre or slight side part. This is the essential piece." },
      { name: "Red and gold striped tie", url: search("Gryffindor tie red gold striped"), note: "The house tie. Wear it slightly loosened under the jumper." },
      { name: "Grey V-neck jumper with red and gold trim", url: search("Gryffindor sweater grey v neck trim"), note: "A plain grey V-neck works if you add red and gold ribbon at the neckline." },
      { name: "White shirt and grey pleated skirt (or grey trousers)", url: search("grey pleated school skirt"), note: "Standard school uniform pieces. Black tights or knee socks." },
      { name: "Black flat shoes", url: search("black flat school shoes women"), note: "Plain black flats or Mary Janes." },
      { name: "Wand", url: search("Harry Potter wand replica Ginny"), note: "Ginny's wand replica exists; any dark wooden wand is fine." },
      { name: "Pale green Yule Ball dress (alternative)", url: search("pale green tea length dress lace"), note: "In Goblet of Fire she wears a soft green dress with lace details to the Yule Ball. A tea-length pale green dress with her hair in a loose updo recreates it." },
      { name: "Gryffindor Quidditch robes (alternative)", url: search("Gryffindor Quidditch robe costume"), note: "Red Quidditch robes with gold trim and a broom; Ginny is a Chaser and later Seeker for Gryffindor." },
    ],
    dressingGuide: [
      { itemName: "Uniform", steps: [
        "White shirt buttoned to the collar, tie knotted and slightly loosened.",
        "Grey jumper over the shirt so the tie shows at the V; grey skirt or trousers, black tights, black flats.",
        "Robe over everything, open at the front with the crest visible.",
      ] },
      { itemName: "Hair and face", steps: [
        "Pin your hair flat and fit the red wig, brushing it straight and parting it in the centre.",
        "Ginny's look is natural: light freckles dotted across the nose with a brown pencil, minimal makeup.",
      ] },
      { itemName: "Wand and character", steps: [
        "Wand in hand, ready for a Bat-Bogey Hex, her signature spell.",
        "Ginny is confident and quick; with a Harry, the pairing is obvious. With Ron, bicker.",
      ] },
    ],
    about: [
      "Ginny Weasley is the youngest of the seven Weasley children and the only daughter, a Gryffindor a year below Harry Potter. She is possessed by Tom Riddle's diary in Chamber of Secrets, becomes a member of Dumbledore's Army and a Gryffindor Quidditch player, and marries Harry after the war. Bonnie Wright played her across all eight films from 2001 to 2011.",
      "In the books Ginny is forthright and funny, known for her Bat-Bogey Hex and her Quidditch talent, later a professional Chaser for the Holyhead Harpies. The films keep her quieter, but her long red hair and Gryffindor uniform are consistent throughout, which makes the costume easy to pin down.",
    ],
    faqs: [
      { question: "What does Ginny Weasley wear?", answer: "Mostly her Hogwarts Gryffindor uniform: white shirt, red and gold tie, grey jumper, grey skirt, black robe. She also wears a pale green dress to the Yule Ball in Goblet of Fire and red Gryffindor Quidditch robes when playing. Her hair is long, straight and red." },
      { question: "What colour is Ginny's Yule Ball dress?", answer: "A soft pale green with lace detailing, worn with her hair in a loose updo. In the book her dress robes are described as pale green; the film matches." },
      { question: "How do I tell a Ginny costume apart from Hermione?", answer: "Hair. Ginny's is long, straight and red; Hermione's is bushy and brown. Both wear the same Gryffindor uniform, so the wig does all the work." },
      { question: "What's a good group costume with Ginny Weasley?", answer: "Harry (round glasses, lightning scar) as a couple, or the Weasley family: Ron, Fred and George in matching red hair, Molly in a knitted cardigan. Luna Lovegood, with radish earrings and Spectrespecs, is Ginny's best friend and a natural pair." },
    ],
  },
};
