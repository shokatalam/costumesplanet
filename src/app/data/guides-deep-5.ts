// =============================================================================
// CostumesPlanet.com — Deep rewrites, batch 5 (cartoons and animated TV).
// Same rules as guides-deep.ts.
// =============================================================================

import type { GuideContent } from "./guides";

const U = "2026-11-15";

export const guidesDeep5: Record<string, Partial<GuideContent>> = {
  "brian-griffin-costume": {
    updated: U,
    sections: [
      {
        heading: "Onesie or DIY Brian?",
        placement: "top",
        table: {
          head: ["Route", "What you need", "Best for"],
          rows: [
            ["Onesie", "A white dog onesie with a hood, swap in a red collar", "Cold nights, fastest"],
            ["DIY", "White hoodie, white sweatpants, felt ears on a headband, red collar", "Comfort and a cleaner look"],
            ["Dressed-up Brian", "White base plus a sport coat or a scarf", "Bars and parties; Brian thinks he's sophisticated"],
          ],
        },
      },
      {
        heading: "Ears, nose and collar",
        bullets: [
          "Ears: cut two long ovals from white felt, fold the top inch and glue to a white headband so they flop forward.",
          "Nose: a black foam clown nose, or black face paint on the tip of your nose.",
          "Collar: a red buckle collar with a gold tag, worn loose so it sits visibly at the base of the neck.",
          "Keep everything else plain white so the red stands out.",
        ],
      },
      {
        heading: "Props that make you Brian",
        bullets: [
          "A martini glass with an olive: the single most important prop.",
          "A thick manuscript titled 'Faster Than the Speed of Love'.",
          "A copy of The New Yorker under one arm.",
        ],
      },
      {
        heading: "Stewie and Brian, and the rest of Quahog",
        placement: "end",
        bullets: [
          "Stewie: red overalls, yellow shirt and a football-shaped head.",
          "Peter and Lois: white shirt and green trousers; green top and red hair.",
          "Quagmire: a red Hawaiian shirt and a big chin.",
          "For a 'Road to…' episode duo, add travel gear like hats, maps and a suitcase.",
        ],
      },
    ],
    faqs: [{ question: "Who voices Brian Griffin?", answer: "Seth MacFarlane, who also created Family Guy and voices Peter and Stewie." }],
  },

  "stewie-griffin-costume": {
    updated: U,
    sections: [
      {
        heading: "Building the football head",
        placement: "top",
        bullets: [
          "Take a large block of upholstery foam or a foam football shape, about twice the width of your head.",
          "Carve it into a rugby-ball shape lying sideways, flat at the bottom.",
          "Hollow out a cavity underneath so it sits on a baseball cap.",
          "Glue it to the cap, then cover with skin-tone stretch fabric or paint.",
          "Draw Stewie's short brown hair line on top and add simple eyes if the head sits in front of your face.",
        ],
      },
      {
        heading: "The rest of Stewie",
        paragraphs: [
          "Below the head it's just clothes: a yellow long-sleeve shirt, red overalls and white sneakers. For adults, the contrast between baby clothes and a giant head is the joke. Keep the overalls bright red, not burgundy.",
        ],
      },
      {
        heading: "Props and lines",
        bullets: [
          "A toy ray gun painted silver and black.",
          "Rupert, his teddy bear.",
          "A posh accent and the line 'Victory is mine!'",
        ],
      },
      {
        heading: "Group",
        placement: "end",
        bullets: [
          "Brian: white outfit, red collar and a martini.",
          "Peter, Lois, Chris and Meg for the whole Griffin family.",
        ],
      },
    ],
    faqs: [{ question: "Why is Stewie's head shaped like a football?", answer: "It's simply his design; the show often jokes about it, with characters calling his head a football." }],
  },

  "peter-griffin-costume": {
    updated: U,
    sections: [
      {
        heading: "Getting Peter's shape right",
        placement: "top",
        bullets: [
          "Belly: a padded belly under the shirt; let the shirt pull slightly at the buttons.",
          "Trousers: green, slightly high-waisted, with a black belt sitting under the belly.",
          "Shirt: white button-up tucked in, top button undone.",
          "Glasses: round, thin frames; plain glass or no lenses.",
          "Chin: draw a light vertical line on the chin with brown eyeliner for his famous cleft.",
        ],
      },
      {
        heading: "Props and catchphrases",
        bullets: [
          "A can of Pawtucket Patriot Ale.",
          "A giant chicken costume friend, for the long-running fight gag.",
          "Lines: 'Lois!', 'Freakin' sweet' and his laugh.",
        ],
      },
      {
        heading: "The Griffin household and friends",
        placement: "end",
        bullets: [
          "Lois: a green blouse, tan trousers and red hair.",
          "Stewie and Brian: guides on the site.",
          "Chris and Meg, for the full family.",
          "Quagmire in a red Hawaiian shirt; Joe in a police uniform; Cleveland in a sweater vest.",
        ],
      },
    ],
    faqs: [{ question: "What brewery does Peter work at?", answer: "The Pawtucket Brewery, where he works in the shipping department in later seasons." }],
  },

  "daniel-tiger-costume-diy": {
    updated: U,
    sections: [
      {
        heading: "Making stripes that last all day",
        placement: "top",
        bullets: [
          "Cut wavy, tapering stripes from black felt; they should be thick in the middle and pointed at the ends.",
          "Arrange them on the orange hoodie and sweatpants before fixing anything.",
          "Use fabric glue or iron-on adhesive for a permanent costume; safety pins if you want to reuse the clothes.",
          "For toddlers, keep stripes flat and soft. No stiff glue edges near the neck.",
        ],
      },
      {
        heading: "Tail and ears",
        bullets: [
          "Tail: sew a long orange felt tube, stuff it lightly and add black felt rings; a pipe cleaner inside gives it a curl.",
          "Attach the tail with a few strong stitches or a safety pin on the inside of the trousers.",
          "Ears: two small orange felt half-circles glued to an orange headband, with smaller pink or black inner pieces.",
          "Face: a soft white patch around the mouth and cheeks with face paint, plus whiskers.",
        ],
      },
      {
        heading: "Toddler comfort tips",
        paragraphs: [
          "Choose soft cotton fleece, avoid anything tight around the neck, and keep face paint light (a red nose and whiskers are enough). The red zip sweater can go on and off as the temperature changes.",
        ],
      },
      {
        heading: "Neighborhood family group",
        placement: "end",
        bullets: [
          "Mom and Dad Tiger: the same orange-and-stripes base with grown-up clothes.",
          "O the Owl: brown with big glasses.",
          "Katerina Kittycat: pink with a tutu.",
          "Prince Wednesday: a crown and a cape.",
        ],
      },
    ],
    faqs: [
      { question: "Why does Daniel Tiger wear a red sweater?", answer: "It's a tribute to Mister Rogers, whose red zip cardigan is iconic. Daniel is the son of the original Daniel Striped Tiger puppet from Mister Rogers' Neighborhood." },
    ],
  },

  "perry-the-platypus-costume": {
    updated: U,
    sections: [
      {
        heading: "Making Perry's bill and tail",
        placement: "top",
        bullets: [
          "Bill: cut a wide, rounded duck-bill shape from orange craft foam, curve it and attach it to the hoodie's hood edge or a headband.",
          "Tail: cut a wide, flat paddle shape from brown felt, double layered with a piece of cardboard inside, and pin it to the back of the trousers.",
          "Feet: orange flipper shoe covers, or orange felt cut into webbed shapes over sneakers.",
          "Fedora: brown, worn straight on the head when you're 'Agent P'.",
        ],
      },
      {
        heading: "Pet Perry vs Agent P",
        paragraphs: [
          "Part of the joke is the switch. Carry the fedora in your hand as ordinary Perry, then put it on to become Agent P. Practise his chattering noise for photos.",
        ],
      },
      {
        heading: "Phineas and Ferb group",
        placement: "end",
        bullets: [
          "Dr. Doofenshmirtz: a lab coat, a hunch and an '-inator' prop.",
          "Phineas: a triangle-shaped head (a cardboard visor) and an orange striped shirt.",
          "Ferb: tall green hair and a purple shirt.",
          "Candace: long red hair and 'I'm telling Mom!'",
        ],
      },
    ],
    faqs: [{ question: "What agency does Perry work for?", answer: "The O.W.C.A., the Organization Without a Cool Acronym." }],
  },

  "dr-heinz-doofenshmirtz-costume": {
    updated: U,
    sections: [
      {
        heading: "Making an '-inator'",
        placement: "top",
        bullets: [
          "Start with a toy ray gun or a cardboard tube.",
          "Add bottle caps, a funnel or a colander as the business end.",
          "Paint it grey and add a hand-lettered label: the 'Costume-inator', the 'Party-inator', anything.",
          "A self-destruct button, clearly labelled, is the finishing touch.",
        ],
      },
      {
        heading: "Posture, voice and catchphrase",
        paragraphs: [
          "Doofenshmirtz stands hunched with his arms close in and talks with a thick, vaguely European accent. When anything goes wrong, shake your fist and shout 'Curse you, Perry the Platypus!'",
        ],
      },
      {
        heading: "Who to bring",
        placement: "end",
        bullets: [
          "Perry the Platypus, ideally with the fedora.",
          "Vanessa, his daughter: black clothes and dark makeup.",
          "Norm the robot: a boxy grey cardboard costume.",
        ],
      },
    ],
    faqs: [{ question: "Where is Doofenshmirtz Evil Incorporated?", answer: "In the Tri-State Area, in a tall purple building with a jingle every time it appears." }],
  },

  "spinelli-costume": {
    updated: U,
    sections: [
      {
        heading: "Spinelli's look, piece by piece",
        placement: "top",
        bullets: [
          "Beanie: orange knit, pulled down over the forehead.",
          "Jacket: red, leather-look, worn zipped or open.",
          "Dress: a simple black dress or tunic under the jacket.",
          "Legs: orange-and-black striped tights.",
          "Boots: black combat boots, laced.",
          "Hair: black, in two short low pigtails.",
        ],
      },
      {
        heading: "Attitude",
        paragraphs: [
          "Spinelli is tough and hates her first name, Ashley. Arms crossed, a scowl, and a quick 'Don't call me Ashley' sells it.",
        ],
      },
      {
        heading: "The Recess gang",
        placement: "end",
        bullets: [
          "T.J. Detweiler: backwards red cap and green jacket.",
          "Gretchen: glasses and a long braid.",
          "Vince: a basketball and a blue shirt.",
          "Mikey: a big blue jacket and a gentle smile.",
          "Gus: army-surplus clothes.",
          "Miss Finster: a grey suit and a whistle.",
        ],
      },
    ],
    faqs: [{ question: "What is Spinelli's first name?", answer: "Ashley, which she hates." }],
  },

  "tj-detweiler-costume": {
    updated: U,
    sections: [
      {
        heading: "The 2-minute T.J.",
        placement: "top",
        bullets: [
          "Red cap, backwards.",
          "Olive-green jacket, half zipped.",
          "White T-shirt, blue jeans and white sneakers.",
          "A confident grin. T.J. is the leader.",
        ],
      },
      {
        heading: "Making it read as T.J.",
        paragraphs: [
          "Because the clothes are ordinary, the group is what makes it recognisable. If you're on your own, carry a small 'Third Street Elementary' sign or a kickball to point people in the right direction.",
        ],
      },
      {
        heading: "The whole gang",
        placement: "end",
        bullets: [
          "Spinelli, Gretchen, Vince, Mikey and Gus.",
          "King Bob: a crown and a cape on the playground throne.",
          "Randall: a notebook for snitching.",
        ],
      },
    ],
    faqs: [{ question: "What school do the Recess kids attend?", answer: "Third Street Elementary School." }],
  },

  "dexters-laboratory-halloween-costume": {
    updated: U,
    sections: [
      {
        heading: "Dexter, Dee Dee or Mandark?",
        placement: "top",
        table: {
          head: ["Character", "Key pieces"],
          rows: [
            ["Dexter", "White lab coat, purple gloves, black boots, round glasses, spiky orange hair"],
            ["Dee Dee", "Pink leotard, tutu, ballet flats, blonde pigtails"],
            ["Mandark", "Black-rimmed glasses, black bowl cut, a lab coat and an evil laugh"],
          ],
        },
      },
      {
        heading: "Small details that sell Dexter",
        bullets: [
          "Button the lab coat to the collar and keep it crisp.",
          "Spike the orange wig up and slightly back.",
          "Carry a clipboard or a beaker of coloured water.",
          "Shout 'Dee Dee! Get out of my laboratory!' at the nearest blonde.",
        ],
      },
      {
        heading: "Sibling and couples pairing",
        placement: "end",
        paragraphs: [
          "Dexter and Dee Dee make one of the best sibling costumes of the 90s. For adults, the height difference is part of the joke: Dee Dee is taller than Dexter.",
        ],
      },
    ],
    faqs: [{ question: "Who is Dexter's rival?", answer: "Mandark, the boy genius next door with his own lab." }],
  },

  "timmy-turner-costume": {
    updated: U,
    sections: [
      {
        heading: "Making Cosmo and Wanda float",
        placement: "top",
        bullets: [
          "Get two small plush toys or printed cut-outs: Cosmo in green, Wanda in pink.",
          "Attach each to a stiff wire or a bendy straw.",
          "Fix the wires to a backpack strap or a headband so the fairies 'hover' above your shoulders.",
          "Add tiny crowns and star wands made of craft foam.",
        ],
      },
      {
        heading: "The buck teeth",
        paragraphs: [
          "Costume buck teeth are the detail people notice second, after the pink hat. Choose a soft, flexible pair so you can talk, or draw a white rectangle under your upper lip for a no-teeth version.",
        ],
      },
      {
        heading: "Fairly OddParents group",
        placement: "end",
        bullets: [
          "Cosmo and Wanda as friends: green or pink hair, crowns, wings and wands.",
          "Poof: a purple baby with a rattle.",
          "Vicky the babysitter: a red ponytail and a menacing scowl.",
          "Mr. Crocker shouting 'FAIRY GODPARENTS!'",
          "Jorgen Von Strangle: guide on the site.",
        ],
      },
    ],
    faqs: [{ question: "What are Timmy's fairies called?", answer: "Cosmo and Wanda, and later their baby Poof." }],
  },

  "professor-utonium-costume": {
    updated: U,
    sections: [
      {
        heading: "Professor Utonium's look",
        placement: "top",
        bullets: [
          "Lab coat over a white shirt and black tie.",
          "Black hair combed flat and to one side.",
          "A strong jaw: a little contour along the jawline helps.",
          "A pipe and a calm, fatherly smile.",
        ],
      },
      {
        heading: "Making 'Chemical X'",
        paragraphs: [
          "Fill a small labelled bottle or beaker with water dyed black or dark green and add a hand-written 'Chemical X' label. Pair it with jars labelled 'Sugar', 'Spice' and 'Everything Nice' for the origin story.",
        ],
      },
      {
        heading: "The Powerpuff Girls group",
        placement: "end",
        bullets: [
          "Blossom: pink dress, long red hair and a big red bow.",
          "Bubbles: blue dress and blonde pigtails.",
          "Buttercup: green dress and short black hair.",
          "Mojo Jojo and Ms. Bellum: guides on the site.",
          "The Mayor: a tiny top hat, a monocle and a pickle jar.",
        ],
      },
    ],
    faqs: [{ question: "How were the Powerpuff Girls created?", answer: "Professor Utonium mixed sugar, spice and everything nice, and accidentally added Chemical X." }],
  },

  "miss-bellum-costume": {
    updated: U,
    sections: [
      {
        heading: "Styling the wig to hide your face",
        placement: "top",
        bullets: [
          "Choose a very full, curly red wig with plenty of volume.",
          "Brush the curls forward over your face and pin them in place.",
          "Leave a thin gap at eye level so you can see out.",
          "Hairspray holds the shape through the night.",
        ],
      },
      {
        heading: "Posture and props",
        paragraphs: [
          "Ms. Bellum is the most competent person in Townsville. Stand tall, carry a clipboard and calmly manage everyone around you, especially the Mayor.",
        ],
      },
      {
        heading: "Townsville group",
        placement: "end",
        bullets: [
          "The Mayor: short, top hat, monocle and pickles.",
          "The Powerpuff Girls, Professor Utonium and Mojo Jojo.",
        ],
      },
    ],
    faqs: [{ question: "Is Ms. Bellum's face ever shown?", answer: "No. Her face is never shown in the original series, which is the running joke." }],
  },

  "mojo-jojo-costume": {
    updated: U,
    sections: [
      {
        heading: "Making the brain helmet",
        placement: "top",
        bullets: [
          "Start with a plastic bowl or half a large foam ball that fits over your head.",
          "Paint purple and white vertical stripes, or wrap with stripes of coloured tape.",
          "Line it with foam for comfort and glue it to a cap or headband.",
          "For the 'brain' look, add pink, wrinkly craft foam showing at the base.",
        ],
      },
      {
        heading: "Face paint in 25 minutes",
        bullets: [
          "Green base over the face.",
          "A pale or white muzzle around the mouth.",
          "Black around the hairline and sides for his fur.",
          "Pink or red outline around the eyes.",
        ],
      },
      {
        heading: "Speak like Mojo",
        paragraphs: [
          "Mojo Jojo repeats himself, constantly, in long sentences that say the same thing several times, over and over, repeatedly. Do this all night.",
        ],
      },
      {
        heading: "Group",
        placement: "end",
        bullets: ["The Powerpuff Girls, Professor Utonium, Ms. Bellum and the Mayor."],
      },
    ],
    faqs: [{ question: "Is Mojo Jojo related to the Powerpuff Girls?", answer: "In a way: he was Professor Utonium's lab chimp, and the same Chemical X accident gave him his intelligence." }],
  },

  "diy-kim-possible-costume": {
    updated: U,
    sections: [
      {
        heading: "Building the Kimmunicator",
        placement: "top",
        bullets: [
          "Take an old phone case or a small cardboard rectangle.",
          "Paint it blue and add a printed screen showing Wade.",
          "Clip it to the utility belt.",
        ],
      },
      {
        heading: "Hair and attitude",
        paragraphs: [
          "Kim's hair is long, straight and auburn-red with a side part. Use a straightener for a sleek finish. Strike a ready-for-action pose and ask 'What's the sitch?'",
        ],
      },
      {
        heading: "Team Possible and villains",
        placement: "end",
        bullets: [
          "Ron Stoppable: a black shirt, cargo pants and a Rufus (naked mole-rat) plush in the pocket.",
          "Shego: a black and green jumpsuit, green gloves and long black hair.",
          "Dr. Drakken: blue face paint, a dark blue lab coat and a scar.",
        ],
      },
    ],
    faqs: [{ question: "What is Kim Possible's catchphrase?", answer: "'What's the sitch?' and the theme song's 'Call me, beep me'." }],
  },

  "steven-universe-costume": {
    updated: U,
    sections: [
      {
        heading: "DIY star shirt",
        placement: "top",
        bullets: [
          "Start with a salmon-pink T-shirt.",
          "Cut a large five-pointed star from yellow felt or iron-on vinyl.",
          "Centre it on the chest and glue or iron it on.",
          "Keep the star slightly chunky: it should cover most of the chest.",
        ],
      },
      {
        heading: "Gem placement for the Crystal Gems",
        table: {
          head: ["Character", "Gem location"],
          rows: [
            ["Steven", "Belly button"],
            ["Garnet", "One in each palm"],
            ["Amethyst", "Chest"],
            ["Pearl", "Forehead"],
            ["Lapis Lazuli", "Upper back"],
          ],
        },
      },
      {
        heading: "Crystal Gems group",
        placement: "end",
        bullets: [
          "Garnet: a cube-shaped hairstyle, visor sunglasses and red-and-maroon outfit.",
          "Amethyst: long white hair and purple clothes.",
          "Pearl: pointy features, a peach-coloured hairpiece and a long tunic.",
          "Connie: a sword and a ponytail.",
        ],
      },
    ],
    faqs: [{ question: "Who created Steven Universe?", answer: "Rebecca Sugar, for Cartoon Network (2013–2019)." }],
  },
};
