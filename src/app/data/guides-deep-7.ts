// =============================================================================
// CostumesPlanet.com — Deep rewrites, batch 7 (TV, musicals, 80s, horror).
// Same rules as guides-deep.ts.
// =============================================================================

import type { GuideContent } from "./guides";

const U = "2026-11-15";

export const guidesDeep7: Record<string, Partial<GuideContent>> = {
  "stefan-salvatore-outfits": {
    updated: U,
    sections: [
      {
        heading: "Three Stefans to choose from",
        placement: "top",
        table: {
          head: ["Look", "Pieces"],
          rows: [
            ["Mystic Falls Stefan", "Henley or tee, dark jacket, dark jeans, boots, daylight ring"],
            ["Ripper Stefan", "The same clothes, darker, with fake blood at the mouth and dark veins under the eyes"],
            ["1864 flashback", "Period waistcoat, high-collared shirt, cravat and slicked hair"],
          ],
        },
      },
      {
        heading: "Vampire face makeup",
        bullets: [
          "Dark red-purple veins drawn under the eyes with a fine brush, branching outward.",
          "Deep red around the lower lash line.",
          "A trickle of fake blood at the corner of the mouth.",
          "Optional fangs that clip over your canines.",
        ],
      },
      {
        heading: "The Vampire Diaries group",
        placement: "end",
        bullets: [
          "Damon: all black, leather jacket and a smirk.",
          "Elena: straight dark hair, casual layers and a vervain necklace.",
          "Katherine: big curls and leather (guide on the site).",
          "Caroline and Bonnie for the full Mystic Falls crew.",
        ],
      },
    ],
    faqs: [{ question: "Who plays Stefan Salvatore?", answer: "Paul Wesley, in The Vampire Diaries (2009–2017)." }],
  },

  "katherine-pierce-outfits": {
    updated: U,
    sections: [
      {
        heading: "Katherine or Elena? How to make it clear",
        placement: "top",
        table: {
          head: ["", "Katherine", "Elena"],
          rows: [
            ["Hair", "Big, bouncy curls", "Straight, sleek"],
            ["Clothes", "Fitted, dark, leather, heels", "Soft casuals, jeans, flats"],
            ["Makeup", "Smoky eye, deep red lip", "Natural"],
            ["Manner", "Confident smirk", "Earnest"],
          ],
        },
      },
      {
        heading: "Curls in 30 minutes",
        bullets: [
          "Start with dry hair and a heat protectant.",
          "Curl 1-inch sections away from the face with a curling iron.",
          "Let each curl cool before touching it.",
          "Finger-comb gently for volume and finish with hairspray.",
        ],
      },
      {
        heading: "Doppelgänger duo",
        placement: "end",
        paragraphs: [
          "The best Katherine costume is a pair: one friend as Katherine, another as Elena, matching outfits in opposite styles. Add Stefan and Damon for the love triangle.",
        ],
      },
    ],
    faqs: [{ question: "Who plays Katherine Pierce?", answer: "Nina Dobrev, who also plays Elena Gilbert." }],
  },

  "brock-pokemon-costume": {
    updated: U,
    sections: [
      {
        heading: "The squint and the hair",
        placement: "top",
        bullets: [
          "Spike the dark brown wig up and slightly back with wax.",
          "Keep your eyes squinted almost shut in photos. It's his whole face.",
          "A little bronzer helps match the anime's warm skin tone.",
        ],
      },
      {
        heading: "Props for Brock",
        bullets: [
          "An Onix or Geodude plush.",
          "A Pokéball clipped to the belt.",
          "A small frying pan or apron: Brock is the group's cook.",
          "A Boulder Badge from Pewter City Gym.",
        ],
      },
      {
        heading: "Pokémon group",
        placement: "end",
        bullets: [
          "Ash: red-and-white cap, blue vest, black tee, green gloves and jeans.",
          "Misty: yellow crop top, red suspenders, denim shorts and an orange side ponytail.",
          "Pikachu: yellow onesie with ears and red cheeks.",
          "Team Rocket: Jessie and James in white uniforms with a red R, plus Meowth.",
        ],
      },
    ],
    faqs: [{ question: "Which gym does Brock lead?", answer: "The Pewter City Gym, specialising in Rock-type Pokémon." }],
  },

  "troy-bolton-cosplay": {
    updated: U,
    sections: [
      {
        heading: "Jersey or warm-up jacket?",
        placement: "top",
        table: {
          head: ["Look", "Pieces", "Best for"],
          rows: [
            ["Game day", "Red #14 Wildcats jersey, red shorts, white sneakers, basketball", "Recognition"],
            ["Warm-up", "Red Wildcats jacket over a white tee and jeans", "Comfort and cold nights"],
          ],
        },
      },
      {
        heading: "Hair and moves",
        paragraphs: [
          "Troy's hair is shaggy and swept to one side, early-2000s style. Carry a basketball, practise a spin and sing 'Get'cha Head in the Game'.",
        ],
      },
      {
        heading: "East High group",
        placement: "end",
        bullets: [
          "Gabriella: guide on the site.",
          "Sharpay: everything pink and sparkly.",
          "Ryan: a hat and a coordinated outfit.",
          "Chad: big curly hair and a Wildcats jersey.",
          "Coach Bolton: a red Wildcats polo and a whistle.",
        ],
      },
    ],
    faqs: [{ question: "Who plays Troy Bolton?", answer: "Zac Efron, in the High School Musical films." }],
  },

  "gabriella-montez-costume": {
    updated: U,
    sections: [
      {
        heading: "Which Gabriella moment?",
        placement: "top",
        table: {
          head: ["Scene", "Look"],
          rows: [
            ["New Year's Eve karaoke ('Start of Something New')", "A party dress and loose curls"],
            ["Callbacks", "A red blouse with jeans"],
            ["'Breaking Free' finale", "A pale blue knee-length dress"],
            ["HSM2", "A floral sundress and the 'T' necklace from Troy"],
          ],
        },
      },
      {
        heading: "Soft curls",
        paragraphs: [
          "Gabriella's hair is long, dark and loosely curled. Use a large curling iron and brush through the curls for a soft wave rather than tight ringlets.",
        ],
      },
      {
        heading: "Duet ideas",
        placement: "end",
        bullets: [
          "Troy Bolton in the Wildcats jersey.",
          "Taylor McKessie: a science-club look with a headband.",
          "Sharpay as the rival.",
        ],
      },
    ],
    faqs: [{ question: "Who plays Gabriella Montez?", answer: "Vanessa Hudgens, in the High School Musical films." }],
  },

  "christine-daae-costume": {
    updated: U,
    sections: [
      {
        heading: "Which Christine?",
        placement: "top",
        table: {
          head: ["Outfit", "Scene", "Difficulty"],
          rows: [
            ["White nightgown and robe", "'The Music of the Night'", "Easy"],
            ["Cream and pink gown", "'Think of Me'", "Moderate"],
            ["Black hooded cloak", "The graveyard scene", "Easy"],
            ["Pink and white masquerade gown", "'Masquerade'", "Harder"],
          ],
        },
      },
      {
        heading: "Ringlets that hold",
        bullets: [
          "Use a small-barrel curling iron for tight ringlets.",
          "Pin the top section back with a ribbon or a flower.",
          "Leave the rest loose down the back.",
          "Set with hairspray so the curls last through the evening.",
        ],
      },
      {
        heading: "Who to bring",
        placement: "end",
        bullets: [
          "The Phantom: a white half-mask, a black cape, a tuxedo and a fedora.",
          "Raoul: a Victorian coat and a long scarf.",
          "Carlotta: an extravagant diva gown and a big hat.",
        ],
      },
    ],
    faqs: [{ question: "Who wrote The Phantom of the Opera?", answer: "Gaston Leroux wrote the 1910 novel; Andrew Lloyd Webber's musical opened in 1986." }],
  },

  "mommy-long-legs-costume": {
    updated: U,
    sections: [
      {
        heading: "Safe arm extensions",
        placement: "top",
        bullets: [
          "Cut foam pipe insulation to about 50 cm and cover it in pink fabric.",
          "Slip a long pink opera glove over one end for the 'hand'.",
          "Hold the other end inside your own glove.",
          "Avoid stilts in crowds; long arms read just as well.",
        ],
      },
      {
        heading: "Face paint step by step",
        bullets: [
          "Pink base over the face.",
          "A very wide smile drawn from ear to ear in black, filled with white and red.",
          "Round pink cheeks.",
          "Green around the eyes.",
        ],
      },
      {
        heading: "Poppy Playtime group",
        placement: "end",
        bullets: [
          "Huggy Wuggy: a blue furry suit and a huge toothy grin.",
          "Kissy Missy: a pink Huggy.",
          "Poppy: a doll dress and red curls.",
        ],
      },
    ],
    faqs: [{ question: "What game is Mommy Long Legs from?", answer: "Poppy Playtime: Chapter 2 (2022), by Mob Entertainment." }],
  },

  "dolores-umbridge-costume": {
    updated: U,
    sections: [
      {
        heading: "Thrifting a pink Umbridge",
        placement: "top",
        bullets: [
          "Look for pink tweed or bouclé jackets in charity shops; any shade from pastel to fuchsia works.",
          "Match a skirt in a similar pink, knee-length.",
          "Add a fluffy pink cardigan for the Hogwarts look.",
          "Pearls, a pink handbag and low court shoes.",
        ],
      },
      {
        heading: "Office props",
        bullets: [
          "Print small kitten pictures and glue them to paper plates.",
          "Write 'I must not tell lies' on a piece of parchment.",
          "A cup of tea with a pink saucer.",
          "A printed Educational Decree to 'pin up' wherever you go.",
        ],
      },
      {
        heading: "Harry Potter group",
        placement: "end",
        bullets: [
          "Harry, Hermione, Ron and Ginny in Gryffindor uniforms.",
          "Fred and George with fireworks props.",
          "Professor McGonagall in green robes and a pointed hat.",
        ],
      },
    ],
    faqs: [{ question: "Who plays Dolores Umbridge?", answer: "Imelda Staunton, in Harry Potter and the Order of the Phoenix and Deathly Hallows – Part 1." }],
  },

  "sing-ash-costume": {
    updated: U,
    sections: [
      {
        heading: "Making the quills",
        placement: "top",
        bullets: [
          "Cut long spikes from purple craft foam or felt.",
          "Glue them in layers onto a purple wig or a headband.",
          "Point them up and back.",
          "Add a few darker purple spikes for depth.",
        ],
      },
      {
        heading: "Sing group",
        placement: "end",
        bullets: [
          "Buster Moon: a koala with a suit, a bow tie and big ears.",
          "Johnny: a gorilla in a leather jacket.",
          "Meena: a shy elephant in a simple dress.",
          "Rosita: a pig mum with an apron.",
          "Gunter: a pig in a sparkly jumpsuit.",
        ],
      },
    ],
    faqs: [{ question: "What song does Ash sing at the end of Sing?", answer: "'Set It All Free', an original song." }],
  },

  "the-goonies-adult-sloth-costume": {
    updated: U,
    sections: [
      {
        heading: "Mask or makeup?",
        placement: "top",
        table: {
          head: ["", "Mask", "Makeup"],
          rows: [
            ["Time", "15 minutes", "45 minutes or more"],
            ["Look", "Recognisable", "Better close up"],
            ["Comfort", "Hot over a long night", "Comfortable once applied"],
          ],
        },
      },
      {
        heading: "The reveal",
        paragraphs: [
          "Wear a ragged grey shirt over the Superman T-shirt, then rip it open for photos. It's Sloth's best moment, and it makes for a great party reveal.",
        ],
      },
      {
        heading: "Goonies group",
        placement: "end",
        bullets: [
          "Chunk: a Hawaiian shirt and the 'truffle shuffle'.",
          "Mikey: an inhaler and a treasure map.",
          "Data: a trench coat full of gadgets.",
          "Mouth: braces and a smart remark.",
          "Mama Fratelli: a frumpy dress and a sneer.",
        ],
      },
    ],
    faqs: [{ question: "What does Sloth shout in The Goonies?", answer: "'Hey, you guys!'" }],
  },

  "he-man-costume": {
    updated: U,
    sections: [
      {
        heading: "Making the harness",
        placement: "top",
        bullets: [
          "Cut a chest harness from grey faux leather: two straps crossing over the chest.",
          "Add a red iron-cross emblem in the centre.",
          "Fix it with Velcro or snaps at the back.",
        ],
      },
      {
        heading: "The pose",
        paragraphs: [
          "Hold the Power Sword above your head and shout 'By the power of Grayskull!'",
        ],
      },
      {
        heading: "Masters of the Universe group",
        placement: "end",
        bullets: [
          "Skeletor: guide on the site.",
          "Teela: white armor and red hair.",
          "Battle Cat: a green tiger onesie with an armored saddle.",
          "Orko: a red hat and a floating robe.",
        ],
      },
    ],
    faqs: [{ question: "What is He-Man's secret identity?", answer: "Prince Adam of Eternia." }],
  },

  "adult-skeletor-costume": {
    updated: U,
    sections: [
      {
        heading: "Skull face paint in 60 minutes",
        placement: "top",
        bullets: [
          "Yellow base over the face.",
          "Black around the eyes and nose to form the skull holes.",
          "Teeth drawn over the lips.",
          "Blue for the neck and any visible skin.",
        ],
      },
      {
        heading: "The laugh",
        paragraphs: [
          "Skeletor's high-pitched cackle is part of the costume. Practise it.",
        ],
      },
      {
        heading: "Villain group",
        placement: "end",
        bullets: [
          "Evil-Lyn: dark purple robes and a staff.",
          "Beast Man: orange fur and a whip.",
          "Trap Jaw: a metal jaw.",
          "He-Man as the hero to fight.",
        ],
      },
    ],
    faqs: [{ question: "What is Skeletor's staff called?", answer: "The Havoc Staff." }],
  },

  "casey-becker-costume": {
    updated: U,
    sections: [
      {
        heading: "Props from the opening scene",
        placement: "top",
        bullets: [
          "A 1990s-style cordless phone.",
          "A Jiffy Pop pan, half-popped.",
          "A kitchen knife prop, foam or plastic only.",
        ],
      },
      {
        heading: "Scream group",
        placement: "end",
        bullets: [
          "Ghostface: a black robe and a white mask.",
          "Sidney Prescott: a cardigan and a straight brown bob.",
          "Gale Weathers: a news reporter's suit and a microphone.",
          "Billy Loomis and Stu.",
        ],
      },
    ],
    faqs: [{ question: "Who directed Scream?", answer: "Wes Craven, in 1996." }],
  },

  "the-deep-costume": {
    updated: U,
    sections: [
      {
        heading: "Getting the suit right",
        placement: "top",
        bullets: [
          "Green or teal with a fish-scale pattern.",
          "Gold collar and gold belt.",
          "A gold trident.",
          "Long, wavy brown hair.",
        ],
      },
      {
        heading: "Jokes that land",
        bullets: [
          "Carry Timothy the octopus plush.",
          "Draw gills on your neck.",
          "Talk to fish (or a goldfish in a bag).",
        ],
      },
      {
        heading: "The Seven group",
        placement: "end",
        bullets: ["Homelander, Starlight, Queen Maeve and A-Train."],
      },
    ],
    faqs: [{ question: "Who plays The Deep?", answer: "Chace Crawford, in The Boys." }],
  },

  "laurie-strode-costume": {
    updated: U,
    sections: [
      {
        heading: "1978 or 2018 Laurie?",
        placement: "top",
        table: {
          head: ["Version", "Look"],
          rows: [
            ["Halloween (1978)", "Pale blue shirt, beige skirt, knee socks, loafers, long light-brown hair"],
            ["Halloween (2018)", "Grey hair, denim shirt, jeans and a survivor's toughness"],
          ],
        },
      },
      {
        heading: "Halloween group",
        placement: "end",
        bullets: [
          "Michael Myers: a white mask and navy coveralls.",
          "Dr. Loomis: a trench coat.",
          "Tommy Doyle: a kid in a costume, with a pumpkin.",
        ],
      },
    ],
    faqs: [{ question: "Who directed Halloween?", answer: "John Carpenter, in 1978." }],
  },
};
