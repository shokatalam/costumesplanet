// Image URLs are resolved at runtime via the CostumeImage component
// which fetches from the WordPress REST API. The imageUrl field here
// is kept as a slug reference for structured data / fallback.

export interface CostumeItem {
  name: string;
  amazonUrl: string;
}

export interface DressingStep {
  itemName: string;
  steps: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CostumeBlog {
  slug: string;
  title: string;
  seoTitle: string;
  h1Title: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  tags: string[];
  date: string;
  dateModified: string;
  imageUrl: string;
  items: CostumeItem[];
  dressingGuide: DressingStep[];
  aboutSection: string;
  introSection: string;
  faqs: FAQ[];
  relatedSlugs: string[];
  // Present only on hand-written guides (see guides.ts)
  handwritten?: boolean;
  characterName?: string;
  curatedItems?: ProductLink[];
  quickFacts?: QuickFact[];
}

import { guides, type QuickFact } from "./guides";
import type { ProductLink } from "./itemUtils";

// Images are now sourced from costumeImages.ts (permanent WordPress URLs)

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\bdiy\b/gi, "DIY")
    .replace(/\blol\b/gi, "LoL")
    .replace(/\bdj\b/gi, "DJ")
    .replace(/\bdr\b/gi, "Dr.")
    .replace(/\btj\b/gi, "TJ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function slugToCharacterName(slug: string): string {
  // Remove costume/cosplay/diy/etc suffixes to get character name
  return slugToTitle(slug)
    .replace(/\s*(Costume|Cosplay|DIY|Halloween|Outfits?|Dress|Suit|Plus Size|For Cosplay|Best|Sexy|Dance|Adult|Deluxe|Running|Mascot|Female|For Toddlers)\s*/gi, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function categorize(slug: string): string {
  const s = slug.toLowerCase();
  if (["jon-snow", "daenerys", "cersei", "arya-stark", "sansa-stark", "night-king", "jaime-lannister", "joffrey", "tyrion", "ned-stark", "khal-drogo", "melisandre", "ygritte", "gray-worm", "missandei", "direwolf"].some(k => s.includes(k))) return "Game of Thrones";
  if (["spider", "iron-man", "iron-spider", "captain-america", "thanos", "gamora", "hawkeye", "fat-thor", "homelander", "starlight", "yelena", "natasha", "daredevil", "zombie-spiderman", "deadshot", "deathstroke", "harley-quinn", "killer-croc", "captain-boomerang", "taskmaster", "ratcatcher", "blade", "deadpool", "captain-marvel", "emma-frost", "killer-frost", "nightwing", "a-train", "the-deep"].some(k => s.includes(k))) return "Marvel & DC";
  if (["tanjiro", "inosuke", "mitsuri", "giyu", "levi-ackerman", "manjiro", "chifuyu", "takemichi", "hinata-tachibana", "emporio"].some(k => s.includes(k))) return "Anime";
  if (["cammy", "zelda", "link-cosplay", "jinx", "tracer", "sombra", "brigitte", "ashe-costume", "lucio", "soldier-76", "reaper", "mccree", "grillmaster", "honeydew", "ahri", "miss-fortune", "katarina", "janna", "zoe-costume", "ezreal", "soraka", "akali", "xayah", "cal-kestis", "shy-guy", "linkle", "wild-card", "omega-fortnite", "midas-costume", "zoey-cosplay"].some(k => s.includes(k))) return "Gaming";
  if (["peter-pan", "tinkerbell", "captain-hook", "wendy-darling", "mr-smee", "ariel", "aurora", "elena-avalor", "queen-miranda", "briar-rose", "prince-phillip", "be-our-guest", "alice-in-wonderland", "princess-isabel", "gru", "lucy-wilde", "moana"].some(k => s.includes(k))) return "Disney";
  if (["steven-universe", "rose-quartz", "stevonnie", "opal", "lapis-lazuli", "amethyst", "sardonyx", "blue-diamond", "yellow-pearl", "buck-dewey", "pink-diamond"].some(k => s.includes(k))) return "Steven Universe";
  if (["peter-griffin", "brian-griffin", "chris-griffin", "meg-griffin", "stewie-griffin", "gene-belcher", "linda-belcher"].some(k => s.includes(k))) return "Animated TV";
  if (["ferris-bueller", "cameron-frye", "sloane-peterson", "scarface", "tyler-durden", "blues-brothers", "oliver-twist", "carl-spackler", "white-goodman", "cousin-eddie", "jack-torrance", "wendy-torrance", "jordan-belfort", "free-guy", "grady-twins", "mean-girls"].some(k => s.includes(k))) return "Movie Characters";
  if (["blossom", "mojo-jojo", "miss-bellum", "professor-utonium", "timmy-turner", "dora", "dexters-laboratory", "spinelli", "tj-detweiler", "gretchen", "ember-mclain", "jorgen", "ferb", "doofenshmirtz", "perry-the-platypus", "daniel-tiger", "dj-suki", "blippi", "kim-possible", "marvin-the-martian"].some(k => s.includes(k))) return "Cartoon Characters";
  if (["darth-revan", "anakin", "cad-bane", "bo-katan", "jar-jar", "padme"].some(k => s.includes(k))) return "Star Wars";
  if (["he-man", "skeletor"].some(k => s.includes(k))) return "80s & Retro";
  if (["smurf", "smurfette", "gargamel", "brainy-smurf", "hackus-smurf", "vexy-smurf"].some(k => s.includes(k))) return "Smurfs";
  if (["exorcist", "casey-becker", "laurie-strode", "tower-of-terror"].some(k => s.includes(k))) return "Horror";
  if (["goonies", "barney-rubble", "george-jetson", "elroy-jetson", "flintstones"].some(k => s.includes(k))) return "Classic TV & Film";
  if (s.includes("diy") || s.includes("dance-costume") || s.includes("ballet")) return "DIY & Dance";
  return "Pop Culture";
}

function generateItems(charName: string, slug: string): CostumeItem[] {
  const searchBase = charName.replace(/\s+/g, "+") + "+costume";
  const amazonBase = `https://www.amazon.com/s?k=${encodeURIComponent(searchBase)}`;

  const baseItems: CostumeItem[] = [
    { name: `${charName} Costume Shirt/Top`, amazonUrl: `${amazonBase}+shirt` },
    { name: `${charName} Costume Pants/Bottom`, amazonUrl: `${amazonBase}+pants` },
  ];

  // Add character-specific items based on slug
  const s = slug.toLowerCase();
  if (s.includes("cosplay") || s.includes("costume")) {
    baseItems.push({ name: `${charName} Wig/Hair`, amazonUrl: `${amazonBase}+wig` });
  }
  if (["knight", "king", "stark", "lannister", "drogo", "hook", "pirate", "van-helsing", "blade", "deathstroke", "revan", "he-man", "skeletor"].some(k => s.includes(k))) {
    baseItems.push({ name: `${charName} Armor/Vest`, amazonUrl: `${amazonBase}+armor` });
    baseItems.push({ name: `${charName} Sword/Weapon`, amazonUrl: `${amazonBase}+sword` });
  } else if (["spider", "iron", "captain-america", "thanos", "homelander", "deadshot", "deadpool", "captain-marvel", "nightwing", "a-train", "the-deep", "killer-frost", "emma-frost"].some(k => s.includes(k))) {
    baseItems.push({ name: `${charName} Bodysuit`, amazonUrl: `${amazonBase}+bodysuit` });
    baseItems.push({ name: `${charName} Mask`, amazonUrl: `${amazonBase}+mask` });
  } else {
    baseItems.push({ name: `${charName} Accessories`, amazonUrl: `${amazonBase}+accessories` });
  }

  baseItems.push({ name: `${charName} Boots/Shoes`, amazonUrl: `${amazonBase}+boots` });
  baseItems.push({ name: `${charName} Belt/Props`, amazonUrl: `${amazonBase}+props` });

  return baseItems;
}

function generateDressingGuide(charName: string, items: CostumeItem[]): DressingStep[] {
  return items.map((item) => {
    const itemType = item.name.replace(`${charName} `, "");
    if (itemType.includes("Shirt") || itemType.includes("Top") || itemType.includes("Bodysuit")) {
      return {
        itemName: item.name,
        steps: [
          `Place the ${itemType.toLowerCase()} on a flat surface.`,
          "Put your arms through the sleeves.",
          "Button up the front from the bottom to the top.",
          "Adjust the collar and cuffs to fit.",
          "Smooth out any wrinkles for a clean look.",
        ],
      };
    }
    if (itemType.includes("Pants") || itemType.includes("Bottom")) {
      return {
        itemName: item.name,
        steps: [
          `Place the ${itemType.toLowerCase()} on a flat surface.`,
          "Step into the pants one foot at a time.",
          "Pull the pants up to the waist.",
          "Fasten the button and zip up the pants.",
          "Adjust the waistband and cuffs for a comfortable fit.",
        ],
      };
    }
    if (itemType.includes("Wig") || itemType.includes("Hair")) {
      return {
        itemName: item.name,
        steps: [
          "Pin your natural hair flat against your head using bobby pins.",
          "Place the wig cap over your hair to create a smooth base.",
          `Position the ${charName} wig from front to back.`,
          "Adjust the wig so it sits naturally on your hairline.",
          "Use wig clips or adhesive for extra security during events.",
        ],
      };
    }
    if (itemType.includes("Boots") || itemType.includes("Shoes")) {
      return {
        itemName: item.name,
        steps: [
          "Place your foot on your boot/shoe.",
          "Pull the boot up your leg (if applicable).",
          "Adjust the laces, buckles, or straps.",
          "Ensure a comfortable fit for extended wear.",
        ],
      };
    }
    if (itemType.includes("Belt") || itemType.includes("Props")) {
      return {
        itemName: item.name,
        steps: [
          "Place the belt around your waist.",
          `Attach the ${charName}-specific prop to the belt.`,
          "Adjust the buckle for a secure fit.",
          "Position any hanging accessories correctly.",
        ],
      };
    }
    if (itemType.includes("Mask")) {
      return {
        itemName: item.name,
        steps: [
          "Hold the mask up to your face to check alignment.",
          "Secure the elastic band behind your head.",
          "Adjust the mask so the eye holes line up properly.",
          "Ensure comfortable breathing through the nose/mouth area.",
        ],
      };
    }
    return {
      itemName: item.name,
      steps: [
        `Unpack the ${itemType.toLowerCase()} and inspect for any damage.`,
        `Put on the ${itemType.toLowerCase()} carefully.`,
        "Adjust for proper fit and comfort.",
        `Make sure the ${itemType.toLowerCase()} matches the character's look.`,
      ],
    };
  });
}

function generateAboutSection(charName: string, category: string): string {
  const categoryContext: Record<string, string> = {
    "Game of Thrones": `${charName} is a character from HBO's Game of Thrones, adapted from George R.R. Martin's A Song of Ice and Fire novels. The show's costumes rely on layered, textured fabrics, furs and leather, so matte, natural-looking materials will get you closer than shiny costume satin.`,
    "Marvel & DC": `${charName} comes from the Marvel and DC superhero universe, where costumes have changed across comics, animation and film. Pick one specific version (a particular film or comic run) and match it, rather than mixing details from several.`,
    "Anime": `${charName} is an anime character. Anime designs use bold colour blocking and distinctive hairstyles, so the wig and the main colours usually matter more for recognition than fine fabric detail.`,
    "Gaming": `${charName} is a video game character. Game designs often have exaggerated proportions and props, so it helps to decide early which in-game outfit or skin you're recreating.`,
    "Disney": `${charName} is a Disney character. Disney designs are built on a few strong colours and one or two signature accessories, which is what most people recognise first.`,
    "Steven Universe": `${charName} is a character from Rebecca Sugar's animated series Steven Universe. The show's flat colours and simple shapes make the colour palette and the character's gem the details to get right.`,
    "Star Wars": `${charName} is from the Star Wars universe. Star Wars fans tend to know the costumes well, so it's worth checking reference images from the specific film or series your version comes from.`,
  };

  return categoryContext[category] || `${charName} is a popular costume choice for Halloween and themed parties. The pieces below cover the main elements of the look; check reference images of the character to fine-tune colours and details.`;
}

function generateIntroSection(charName: string, title: string): string {
  return `This guide lists the main pieces you need for a ${charName} costume, with links to examples on Amazon, and a simple order for putting it all on. Many of the basics may already be in your wardrobe; buy the distinctive pieces and improvise the rest.`;
}

function generateFAQs(charName: string, title: string, category: string): FAQ[] {
  return [
    {
      question: `What are the essential items for a ${charName} costume?`,
      answer: `See the item list at the top of this page. Focus first on the one or two pieces that make ${charName} recognisable, usually the signature outfit piece and the hair or headwear, and use everyday clothes for the rest.`,
    },
    {
      question: `Is it better to buy or DIY a ${charName} costume?`,
      answer: `Buying is faster if you're short on time. A DIY build using clothes you already own is usually cheaper. A common approach is to buy the distinctive pieces and assemble the basics yourself.`,
    },
    {
      question: `How far ahead should I order ${charName} costume pieces?`,
      answer: `Two to three weeks before your event leaves time for delivery, sizing exchanges and any wig styling.`,
    },
  ];
}

const slugs = [
  "evil-dead-ash-costume", "spider-web-woman-costume", "maeve-millay-costume",
  "nooshy-sing-2-costume", "emporio-cosplay", "uncle-fester-costume-plus-size",
  "ratcatcher-2-costume", "evil-morty-costume", "talisman-ballet-costume",
  "diy-dude-costume", "phantom-of-the-opera-red-death-costume", "lord-farquaad-halloween-costume",
  "queen-oona-costume", "diy-ginny-weasley-costume", "night-king-costume",
  "jaime-lannister-costume", "chloe-decker-costume", "moose-finbar-costume",
  "allison-costume-for-cosplay", "sansa-stark-halloween-costume", "lucy-wilde-despicable-me-costume",
  "daniel-tiger-costume-diy", "nathan-drake-halloween-costume", "padme-sexy-costume",
  "be-our-guest-costumes", "dorothy-dance-costume", "mr-bill-costume",
  "mary-poppins-dance-costume", "lucifer-morningstar-costume", "deadshot-cosplay",
  "jon-snow-costume", "linkle-cosplay-costume", "brian-griffin-costume",
  "jinx-cosplay-costume", "homelander-cosplay", "best-ariel-costume",
  "melisandre-costume", "gru-costume-cosplay", "khal-drogo-costume",
  "hamburglar-costume", "slash-guns-n-roses-costume", "scarface-costume",
  "blues-brothers-costume", "dr-evil-costume-diy", "yelena-belova-costume",
  "natasha-romanoff-costume-diy", "best-cammy-costume", "jesse-pinkman-outfits",
  "young-justice-robin-cosplay-costume", "joyce-byers-costume", "ember-mclain-cosplay",
  "best-amanda-costume", "princess-isabel-costume", "rick-astley-costume",
  "taskmaster-cosplay-costume", "diy-starlight-costume", "tyler-durden-costume",
  "diy-sloane-peterson-costume", "ferb-costume-for-cosplay", "perry-the-platypus-costume",
  "jane-jetson-costume", "katniss-everdeen-costume", "spinelli-costume",
  "dora-the-explorer-costume", "she-ra-cosplay-costume", "blade-costume",
  "angela-abar-costume", "dick-dastardly-costume", "tanjiro-kamado-costume",
  "barbara-maitland-costume", "xayah-costume-cosplay", "hawkeye-cosplay-costume",
  "jorgen-von-strangle-costume", "shy-guy-costume", "dexters-laboratory-halloween-costume",
  "misty-pokemon-cosplay", "joe-exotic-costume", "van-helsing-costume",
  "atomic-blonde-costume", "sombra-costume-cosplay", "wild-card-costume",
  "deathstroke-costume", "max-mayfield-costume", "captain-hook-costume",
  "lily-houghton-costume", "wendy-darling-costume", "iron-spider-costume",
  "king-bob-halloween-costume", "mr-smee-costume", "daenerys-targaryen-cosplay",
  "diy-peter-pan-costume", "cersei-lannister-costume", "tinkerbell-cosplay-costume",
  "joffrey-baratheon-costume", "inosuke-hashibira-costume", "arya-stark-costume",
  "mitsuri-kanroji-cosplay", "giyu-tomioka-costume", "iron-man-age-of-ultron-suit",
  "fat-thor-costume", "tj-detweiler-costume", "manjiro-sano-costume",
  "chifuyu-matsuno-cosplay", "thanos-cosplay", "pirate-steve-costume",
  "gamora-costume", "hinata-tachibana-cosplay", "captain-america-costume",
  "takemichi-hanagaki-cosplay", "daredevil-black-suit", "diy-blossom-costume",
  "darth-revan-cosplay", "link-cosplay", "diy-ferris-bueller-costume",
  "tracer-cosplay", "cad-bane-costume", "ashe-costume",
  "anakin-cosplay", "cal-kestis-cosplay", "brigitte-costume",
  "grillmaster-76-cosplay", "ygritte-costume", "steven-universe-costume",
  "elena-avalor-cosplay", "tyrell-cosplay", "jack-torrance-costume",
  "wendy-torrance-costume", "gray-worm-costume", "briar-rose-cosplay-dress",
  "prince-phillip-cosplay", "princess-aurora-cosplay", "missandei-costume",
  "rose-quartz-cosplay", "stevonnie-costume", "levi-ackerman-cosplay",
  "buck-dewey-cosplay", "direwolf-costume", "opal-costume",
  "lapis-lazuli-dress", "puma-costume", "yellow-pearl-cosplay",
  "gene-belcher-costume", "amethyst-costume", "sardonyx-costume",
  "chris-griffin-costume", "meg-griffin-costume", "stewie-griffin-costume",
  "queen-miranda-costume", "lol-evelynn-cosplay", "miss-fortune-costume",
  "cameron-frye-costume", "harley-quinn-cosplay", "killer-croc-costume",
  "captain-boomerangs-cosplay", "honeydew-mei-costume", "mccree-costume",
  "pink-diamond-dress", "timmy-turner-costume", "lucio-costume",
  "soldier-76-costume", "reaper-cosplay", "gretchen-grundler-cosplay",
  "princess-zelda-dress", "ahri-costume", "janna-costume",
  "katarina-cosplay", "zoe-costume", "ezreal-costume",
  "star-guardian-soraka-costume", "akali-cosplay", "alice-in-wonderland-dance-costume",
  "stefan-salvatore-outfits", "ned-stark-costume", "zombie-spiderman-costume",
  "tyrion-lannister-costume", "linda-belcher-costume", "oliver-twist-costume",
  "katherine-pierce-outfits", "fix-it-felix-costume", "brock-pokemon-costume",
  "blue-diamond-cosplay", "troy-bolton-cosplay", "gabriella-montez-costume",
  "puss-in-boots-costume", "peter-griffin-costume", "jar-jar-binks-costume",
  "johnny-cage-costumes", "professor-utonium-costume", "christine-daae-costume",
  "white-goodman-costume", "bo-katan-kryze-costume", "miss-bellum-costume",
  "mommy-long-legs-costume", "mojo-jojo-costume", "carl-spackler-costume",
  "the-cousin-eddie-dickie-costume", "dolores-umbridge-costume", "sing-ash-costume",
  "mike-ditka-costume", "gargamel-costume",
  // ── GSC-indexed pages that were missing (41 slugs) ──
  "the-goonies-adult-sloth-costume", "vexy-smurf-costume", "tower-of-terror-costume",
  "pablo-escobar-costume", "dr-heinz-doofenshmirtz-costume", "diy-kim-possible-costume",
  "dexter-morgan-costume", "he-man-costume", "captain-marvel-costume",
  "adult-skeletor-costume", "foxy-cleopatra-outfit", "casey-becker-costume",
  "sexy-cupid-costume", "the-deep-costume", "laurie-strode-costume",
  "jordan-belfort-costume", "midas-costume", "mean-girls-christmas-costume",
  "omega-fortnite-costume", "joe-biden-costume", "a-train-costume",
  "namaari-costume", "george-jetson-costume", "trolls-dj-suki-costume-for-toddlers",
  "elroy-jetson-costume", "brainy-smurf-costume", "killer-frost-costume",
  "blippi-mascot-costume", "female-marvin-the-martian-costume", "deadpool-cosplay",
  "hackus-smurf-costume", "deluxe-grinch-costume", "grady-twins-costume",
  "smurfette-plus-size-costume", "nightwing-young-justice-costume", "free-guy-costume",
  "moana-running-costume", "emma-frost-costume", "barney-rubble-costume",
  "zoey-cosplay", "the-exorcist-costume",
];

const dates = [
  "2023-10-07", "2023-10-07", "2023-10-07", "2023-10-07", "2023-10-07",
  "2023-10-07", "2023-10-07", "2023-10-07", "2023-10-07", "2023-10-07",
  "2023-10-07", "2023-10-07", "2023-10-07", "2023-10-07", "2023-10-07",
  "2023-10-07", "2023-10-07", "2023-10-06", "2023-10-06", "2023-10-06",
  "2023-10-06", "2023-10-06", "2023-10-06", "2023-10-06", "2023-10-06",
  "2023-10-06", "2023-10-06", "2023-10-06", "2023-10-06", "2023-10-05",
  "2023-10-05", "2023-10-05", "2023-10-04", "2023-10-04", "2023-10-04",
  "2023-10-04", "2023-10-04", "2023-10-04", "2023-10-04", "2023-10-04",
  "2023-10-04", "2023-10-04", "2023-10-04", "2023-10-03", "2023-10-03",
  "2023-10-03", "2023-10-03", "2023-10-03", "2023-10-03", "2023-10-03",
  "2023-10-03", "2023-10-02", "2023-10-02", "2023-10-02", "2023-10-02",
  "2023-10-02", "2023-10-02", "2023-10-02", "2023-10-02", "2023-10-02",
  "2023-09-30", "2023-09-30", "2023-09-30", "2023-09-30", "2023-09-30",
  "2023-09-30", "2023-09-30", "2023-09-30", "2023-09-30", "2023-09-30",
  "2023-09-30", "2023-09-29", "2023-09-29", "2023-09-29", "2023-09-29",
  "2023-09-29", "2023-09-29", "2023-09-29", "2023-09-29", "2023-09-29",
  "2023-09-29", "2023-09-29", "2023-09-29", "2023-09-28", "2023-09-28",
  "2023-09-28", "2023-09-28", "2023-09-28", "2023-09-28", "2023-09-28",
  "2023-09-28", "2023-09-28", "2023-09-28", "2023-09-28", "2023-09-28",
  "2023-09-28", "2023-09-28", "2023-09-28", "2023-09-28", "2023-09-28",
  "2023-09-28", "2023-09-28", "2023-09-28", "2023-09-27", "2023-09-27",
  "2023-09-27", "2023-09-27", "2023-09-27", "2023-09-27", "2023-09-27",
  "2023-09-27", "2023-09-27", "2023-09-27", "2023-09-27", "2023-09-27",
  "2023-09-27", "2023-09-27", "2023-09-27", "2023-09-27", "2023-09-27",
  "2023-09-27", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26",
  "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26",
  "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-26",
  "2023-09-26", "2023-09-26", "2023-09-26", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25", "2023-09-25",
  "2023-09-25", "2023-09-23", "2023-09-23", "2023-09-23", "2023-09-23",
  "2023-09-23", "2023-09-23", "2023-09-23", "2023-09-23", "2023-09-23",
  "2023-09-23", "2023-09-23", "2023-09-23", "2023-09-23", "2023-09-22",
  "2023-09-22", "2023-09-22", "2023-09-22", "2023-09-22", "2023-09-22",
  "2023-09-22", "2023-09-22", "2023-09-22",
  // ── Dates for 41 GSC-recovered posts ──
  "2022-11-15", "2022-11-15", "2022-11-14", "2022-11-14", "2022-11-13",
  "2022-11-13", "2022-11-12", "2022-11-12", "2022-11-11", "2022-11-11",
  "2022-11-10", "2022-11-10", "2022-11-09", "2022-11-09", "2022-11-08",
  "2022-11-08", "2022-11-07", "2022-11-07", "2022-11-06", "2022-11-06",
  "2022-11-05", "2022-11-05", "2022-11-04", "2022-11-04", "2022-11-03",
  "2022-11-03", "2022-11-02", "2022-11-02", "2022-11-01", "2022-11-01",
  "2022-10-31", "2022-10-31", "2022-10-30", "2022-10-30", "2022-10-29",
  "2022-10-29", "2022-10-28", "2022-10-28", "2022-10-27", "2022-10-27",
  "2022-10-26",
];

// Real content-update dates (YYYY-MM-DD). Add a slug here ONLY when that
// guide's content has actually been revised; otherwise dateModified equals
// the publish date. Google penalises fabricated freshness signals.
const contentUpdates: Record<string, string> = {};

function generateSeoTitle(charName: string): string {
  const tpl = `${charName} Costume: What to Wear & How to Put It Together`;
  return tpl.length <= 60 ? tpl : `${charName} Costume Guide | CostumesPlanet`;
}

function generateMetaDescription(charName: string, itemCount: number): string {
  return `How to put together a ${charName} costume: the ${itemCount} main pieces you need, links to examples, and a simple step-by-step dressing order.`;
}

export const costumes: CostumeBlog[] = slugs.map((slug, i) => {
  const title = slugToTitle(slug);
  const charName = slugToCharacterName(slug);
  const category = categorize(slug);
  const items = generateItems(charName, slug);
  const dressingGuide = generateDressingGuide(charName, items);
  const itemCount = items.length;
  const date = dates[i] || "2023-09-22";
  const guide = guides[slug];

  const base: CostumeBlog = {
    slug,
    title,
    seoTitle: generateSeoTitle(charName),
    h1Title: `${charName} Costume Guide`,
    excerpt: `The main pieces for a ${charName} costume and how to put them together.`,
    metaDescription: generateMetaDescription(charName, itemCount),
    category,
    tags: [category, "Costume Guide", "Cosplay", charName],
    date,
    dateModified: contentUpdates[slug] || date,
    imageUrl: "", // resolved at runtime by CostumeImage component
    items,
    dressingGuide,
    aboutSection: generateAboutSection(charName, category),
    introSection: generateIntroSection(charName, title),
    faqs: generateFAQs(charName, title, category),
    relatedSlugs: [],
  };

  if (!guide) return base;
  return {
    ...base,
    seoTitle: guide.seoTitle,
    h1Title: guide.h1Title,
    excerpt: guide.excerpt,
    metaDescription: guide.metaDescription,
    dateModified: guide.updated,
    items: guide.items.map((it) => ({ name: it.name, amazonUrl: it.url })),
    curatedItems: guide.items,
    quickFacts: guide.quickFacts,
    dressingGuide: guide.dressingGuide,
    aboutSection: guide.about.join("\n\n"),
    introSection: guide.intro.join("\n\n"),
    faqs: guide.faqs,
    handwritten: true,
    characterName: guide.characterName,
  };
});

// Assign related slugs (same category)
costumes.forEach((c) => {
  c.relatedSlugs = costumes
    .filter((other) => other.category === c.category && other.slug !== c.slug)
    .slice(0, 5)
    .map((other) => other.slug);
});

export const categories = [...new Set(costumes.map((c) => c.category))].sort();

export function getCostumeBySlug(slug: string): CostumeBlog | undefined {
  return costumes.find((c) => c.slug === slug);
}

export function getCostumesByCategory(category: string): CostumeBlog[] {
  // Gender-based pseudo-categories (from old WordPress taxonomy)
  if (category === "Female") {
    const femaleKeywords = ["dress", "sexy", "queen", "princess", "girl", "woman", "female", "daenerys", "cersei", "arya", "sansa", "ygritte", "missandei", "gamora", "cammy", "kim-possible", "elsa", "moana", "blossom", "diy-ginny", "padme", "cleopatra", "bellum", "meg-griffin", "linda-belcher", "starlight", "natasha", "yelena", "emma-frost", "killer-frost", "smurfette", "vexy"];
    return costumes.filter(c => femaleKeywords.some(k => c.slug.includes(k)));
  }
  if (category === "Male") {
    const maleKeywords = ["man-costume", "guy-costume", "king", "lord", "knight", "vader", "thor", "iron-man", "captain-america", "peter-griffin", "brian-griffin", "chris-griffin", "stewie", "tyler-durden", "scarface", "jon-snow", "ned-stark", "jaime", "drogo", "dexter-morgan", "blues-brothers", "he-man", "skeletor"];
    return costumes.filter(c => maleKeywords.some(k => c.slug.includes(k)));
  }
  return costumes.filter((c) => c.category === category);
}

export function searchCostumes(query: string): CostumeBlog[] {
  const q = query.toLowerCase();
  return costumes.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
  );
}