// =============================================================================
// CostumesPlanet.com — Hand-written guide content
//
// Each entry here replaces the generated template text for that slug.
// Rules for writing an entry:
//   - Character-specific facts only. If you're not sure of a detail, leave it out.
//   - No invented credentials ("expert-verified", "tested by our team", ratings).
//   - Item notes explain why a piece matters to the look, not marketing copy.
//   - Set `updated` to the date the content was actually written/revised.
// =============================================================================

import type { FAQ, DressingStep } from "./costumes";
import type { ProductLink } from "./itemUtils";

export interface QuickFact {
  label: string;
  value: string;
}

export interface GuideContent {
  characterName?: string; // used in section headings when the slug-derived name reads badly
  updated: string;
  seoTitle: string;
  metaDescription: string;
  h1Title: string;
  excerpt: string;
  intro: string[];
  quickFacts: QuickFact[];
  items: ProductLink[];
  dressingGuide: DressingStep[];
  about: string[];
  faqs: FAQ[];
}

const amz = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=cplanet0c-20`;
// Use a search link when we can't confirm a specific product
const search = (q: string) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}&tag=cplanet0c-20`;

export const guides: Record<string, GuideContent> = {
  // ───────────────────────────────────────────────────────────────────────────
  "best-cammy-costume": {
    updated: "2026-10-15",
    seoTitle: "Cammy Costume Guide: Street Fighter Leotard, Braids & Camo",
    metaDescription:
      "How to build a classic Street Fighter Cammy costume: green leotard, red beret and gauntlets, twin blonde braids and leg camo paint, with tips on coverage and wig styling.",
    h1Title: "How to Make a Cammy Costume (Street Fighter)",
    excerpt:
      "Classic Cammy comes down to five things: a green high-neck leotard, a red beret, red gauntlets, combat boots and two very long blonde braids.",
    intro: [
      "Cammy White is one of the easiest Street Fighter characters to recognise and one of the trickier ones to wear comfortably. Her classic look, from Super Street Fighter II onward, is a green high-neck leotard, a red beret, red gauntlets, combat boots, painted camouflage on her legs and two long blonde braids that hang past her waist.",
      "Before you buy anything, decide which Cammy you are doing. The classic leotard version is the one most people recognise. Street Fighter 6 gave her a short haircut and a more covered outfit, so if you'd rather not wear a leotard, the SF6 look is a legitimate alternative rather than a compromise.",
      "This guide covers the classic version. The braids and the beret do most of the work for recognition: get those right and people will know who you are even if your leotard is a slightly different green.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate (wig braiding and body paint)" },
      { label: "Rough budget", value: "$70–$130 for the pieces below" },
      { label: "Time to put on", value: "About 45 minutes including leg paint" },
      { label: "What people recognise first", value: "Twin braids + red beret" },
    ],
    items: [
      { name: "Kelly green turtleneck leotard", url: amz("B072C6DZZF"), note: "A high neck matches Cammy's collar. Go for a matte fabric; shiny spandex reads as a swimsuit in photos." },
      { name: "Long blonde braided wig", url: amz("B07SS73Q7K"), note: "The braids should reach at least your hips. Thin braids look wrong; you want thick, rope-like plaits." },
      { name: "Red wool beret", url: amz("B000JX1W3W"), note: "Wool holds its shape better than felt. Wear it tilted, pulled down on one side." },
      { name: "Red gauntlets", url: amz("B07P8CHMW6"), note: "Her gloves are a strong red that should match the beret as closely as possible." },
      { name: "Green body paint (for leg camo)", url: amz("B007TIDZZ8"), note: "Use a water-activated body or face paint, not craft acrylic, and patch-test it on your skin a day before." },
      { name: "Lace-up military boots", url: amz("B07PN6BPSZ"), note: "Mid-calf combat boots. Break them in before a full convention day." },
    ],
    dressingGuide: [
      { itemName: "Base layer and leotard", steps: [
        "Put on skin-tone tights or dance shorts first if you want more coverage; they won't show in most photos.",
        "Step into the leotard and smooth the neck so it sits high and straight.",
        "Use body tape at the leg openings so the leotard doesn't ride up during the day.",
      ] },
      { itemName: "Leg camouflage", steps: [
        "Paint before you put the boots on. Cammy's camo is a few irregular green streaks on the front and outside of the thighs, not a full army print.",
        "Sketch the shapes lightly with a makeup pencil, then fill with a damp brush or sponge.",
        "Let it dry fully and finish with a makeup setting spray so it doesn't transfer onto tights or seats.",
      ] },
      { itemName: "Wig and braids", steps: [
        "Braid or flat-pin your own hair and put on a wig cap.",
        "If your wig isn't pre-braided, plait it before the event, starting just behind the ears so the braids hang forward over your shoulders.",
        "Secure the ends with small hair elastics in the wig colour.",
      ] },
      { itemName: "Beret, gauntlets and boots", steps: [
        "Pin the beret to the wig with two bobby pins at the back, tilted towards one side.",
        "Pull on the gauntlets last so you can still do up boot laces without them.",
        "Lace the boots snugly; loose combat boots look clumsy with a leotard.",
      ] },
      { itemName: "Finishing details", steps: [
        "Cammy has a small scar on her left cheek. A thin line of brown-red eyeliner, softened with a fingertip, is enough.",
        "Practise one fighting pose; her Cannon Spike leg raise or a low crouch both photograph well.",
      ] },
    ],
    about: [
      "Cammy White first appeared in Super Street Fighter II in 1993. In the series she is a member of Delta Red, a British special forces unit, which is where the beret, combat boots and camouflage paint come from. Her backstory ties her to the villain M. Bison, and she was originally created as one of his agents before breaking free.",
      "She has been a playable character in most Street Fighter games since, as well as in the Street Fighter Alpha series, which shows her younger look, and in crossovers such as the Marvel vs. Capcom games. Her design has stayed close to the original until Street Fighter 6, which modernised it with shorter hair and a more covered outfit.",
    ],
    faqs: [
      { question: "How do I paint Cammy's leg camouflage?", answer: "Use water-activated body paint or face paint in one or two shades of green. Sketch a few irregular streaks on the front and outer thighs with a makeup pencil, fill them with a damp brush, let them dry and seal with a setting spray. Avoid craft acrylics; they crack and can irritate skin." },
      { question: "Can I do a Cammy costume without wearing just a leotard?", answer: "Yes. Most cosplayers wear skin-tone tights or dance shorts underneath for coverage. If you want something fully covered, Cammy's Street Fighter 6 outfit is an official design and just as recognisable to fans of the newer game." },
      { question: "What colour green is Cammy's leotard?", answer: "A mid-to-dark green, close to kelly or forest green. Matte fabric looks closer to the game art than shiny swimsuit material. Matching the beret and gauntlets to the same red matters more than the exact green." },
      { question: "How long should Cammy's braids be?", answer: "Long: in the classic design they hang to about her hips or lower. Choose a wig at least 30 inches long, or a pre-braided wig, and make the braids thick rather than tight and thin." },
      { question: "What's a good partner or group costume with Cammy?", answer: "Chun-Li is the classic pairing. For a Street Fighter group, add Ryu, Ken or M. Bison, whose story is tied to Cammy's." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "jesse-pinkman-outfits": {
    updated: "2026-10-15",
    seoTitle: "Jesse Pinkman Costume: Breaking Bad Outfits & Hazmat Suit",
    metaDescription:
      "Dress like Jesse Pinkman from Breaking Bad: the baggy hoodie, beanie and jeans streetwear look, or the yellow hazmat suit for a Walter White and Jesse couples costume.",
    h1Title: "Jesse Pinkman Costume and Outfit Guide (Breaking Bad)",
    excerpt:
      "Two ways to be Jesse Pinkman: early-season streetwear (oversized hoodie, baggy jeans, beanie) or the yellow hazmat suit he wears cooking with Walt.",
    intro: [
      "Jesse Pinkman, played by Aaron Paul in Breaking Bad, has two looks that people recognise instantly. The first is his early-season streetwear: an oversized hoodie or graphic tee, very baggy jeans, a knit beanie and chunky sneakers. The second is the yellow hazmat suit and respirator he wears while cooking with Walter White.",
      "The streetwear version is cheap and comfortable, and much of it may already be in your wardrobe. The hazmat version is the better choice if you're going as a pair with someone dressed as Walter White, because the matching suits make the reference obvious.",
      "Jesse's style changes across the show. In the later seasons, and in the 2019 film El Camino, he dresses more plainly and has a shorter haircut. Most people expect the early, louder version, so that's what this guide focuses on.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$90 (less if you already own baggy jeans)" },
      { label: "Best for", value: "Couples costume with Walter White" },
      { label: "What people recognise first", value: "Oversized hoodie + beanie, or the yellow hazmat suit" },
    ],
    items: [
      { name: "Yellow zip-up hoodie", url: amz("B085YWHDCJ"), note: "Size up one or two sizes. Jesse's clothes are always visibly too big." },
      { name: "Graphic T-shirt to layer underneath", url: amz("B01MXEO8DH"), note: "Loud prints fit the early-season look; layer it under the open hoodie." },
      { name: "Baggy-fit jeans", url: amz("B09V329ZDR"), note: "Wear them low and loose. Slim jeans are the quickest way to lose the look." },
      { name: "Leather belt", url: amz("B01M7RDC0A"), note: "Mostly functional: it keeps the oversized jeans up." },
      { name: "Striped knit beanie", url: amz("B07P8W6PW6"), note: "Jesse wears a beanie in many early episodes. Pull it down low over the ears." },
      { name: "High-top sneakers", url: amz("B097S5HYLS"), note: "Chunky high-tops suit the 2000s streetwear style." },
    ],
    dressingGuide: [
      { itemName: "Streetwear version", steps: [
        "Start with the graphic tee, then the baggy jeans worn low with a belt.",
        "Add the oversized hoodie, unzipped or half-zipped so the tee shows.",
        "Finish with the beanie pulled down low and high-top sneakers, loosely laced.",
      ] },
      { itemName: "Hazmat version", steps: [
        "Wear the yellow coveralls over a T-shirt and light trousers; they get hot quickly.",
        "Add a half-face respirator (or a toy version), safety goggles and blue or black nitrile gloves.",
        "For a couple's costume, Walter White wears the identical suit; one person carrying a toy clipboard or lab flask makes the scene read better.",
      ] },
      { itemName: "Attitude", steps: [
        "Jesse's body language matters: a slouch, hands in the hoodie pocket and a lot of \"yo\".",
      ] },
    ],
    about: [
      "Jesse Pinkman is Walter White's former chemistry student and later his partner in Breaking Bad, which ran on AMC from 2008 to 2013. Aaron Paul won three Primetime Emmy Awards for Outstanding Supporting Actor in a Drama Series for the role. Jesse's story continues in the Netflix film El Camino: A Breaking Bad Movie (2019).",
      "Jesse's clothes are deliberately youthful and oversized in the early seasons, which contrasts with Walt's beige, middle-aged wardrobe. As the show goes on and Jesse goes through more, his clothing becomes darker and plainer. For a costume, the contrast between the two characters is the point: if you're going as a pair, keep Jesse loud and Walt dull.",
    ],
    faqs: [
      { question: "What does Jesse Pinkman wear in Breaking Bad?", answer: "In the early seasons: oversized hoodies and graphic tees, very baggy jeans, knit beanies and chunky sneakers. While cooking with Walter White he wears a yellow hazmat suit, respirator and goggles. In later seasons his clothes become plainer and darker." },
      { question: "What should my partner wear as Walter White?", answer: "For the hazmat look, the same yellow suit, respirator and goggles. For the Heisenberg look: a black pork-pie hat, dark sunglasses, a goatee and a plain jacket. Shaving your head or wearing a bald cap completes later-season Walt." },
      { question: "Where can I get the yellow hazmat suit?", answer: "Yellow disposable or reusable coveralls are sold as protective workwear, and many Halloween shops sell a Breaking Bad-style kit with a toy respirator. Real disposable coveralls are cheap, but they are not breathable, so plan for heat." },
      { question: "Do I need a wig for Jesse Pinkman?", answer: "Usually not. Early Jesse has short hair that is mostly hidden under a beanie. If you want the later look, a short buzzed cut is closer." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "blues-brothers-costume": {
    characterName: "Blues Brothers",
    updated: "2026-10-15",
    seoTitle: "Blues Brothers Costume: Jake and Elwood Outfit Guide",
    metaDescription:
      "Dress as Jake or Elwood Blues: black suit, white shirt, skinny black tie, black hat and wayfarer sunglasses, plus Elwood's handcuffed briefcase and tips for the duo.",
    h1Title: "Blues Brothers Costume Guide: How to Dress as Jake and Elwood",
    excerpt:
      "Black suit, white shirt, skinny black tie, black hat, black wayfarer sunglasses. Add a handcuffed briefcase if you're Elwood.",
    intro: [
      "The Blues Brothers costume is one of the simplest classic duo costumes there is: a black suit, a white shirt, a skinny black tie, a black hat and black wayfarer-style sunglasses. It works because the silhouette is so specific. Two people in identical black suits, hats and sunglasses read as the Blues Brothers from across a room.",
      "The characters are \"Joliet\" Jake Blues (John Belushi) and Elwood Blues (Dan Aykroyd), from the 1980 film The Blues Brothers and their earlier Saturday Night Live sketches. They wear the same outfit, so you tell them apart with small details. Elwood carries a briefcase handcuffed to his wrist, and he was the tall, lean one in the film. Jake was the shorter, stockier one.",
      "Most people can build this from a regular black suit. The sunglasses and hat are the parts you'll probably need to buy.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$30–$60 if you own a black suit; $100+ if not" },
      { label: "Best for", value: "Duos, or a whole band in matching suits" },
      { label: "What people recognise first", value: "Black hat + black wayfarer sunglasses together" },
    ],
    items: [
      { name: "Black hat and wayfarer-style sunglasses set", url: amz("B016QJSI20"), note: "The two pieces that make the costume. Wear the sunglasses all evening, even indoors; that's in character." },
      { name: "Slim black suit", url: amz("B0B76W3B49"), note: "Plain, single-breasted, not too tailored. In the film the suits look a little rumpled." },
      { name: "White dress shirt", url: amz("B01NARLB2E"), note: "Plain white with a standard collar. Keep it buttoned to the top under the tie." },
      { name: "Skinny black tie", url: amz("B095PR1C6D"), note: "Narrow, plain black, no pattern or sheen. A pre-tied zipper tie is fine." },
      { name: "Black leather belt", url: amz("B08FWM146F"), note: "Simple and black; it should disappear under the jacket." },
      { name: "Black oxford shoes", url: amz("B01H7S0WIM"), note: "Plain black dress shoes. You'll be dancing, so comfort matters." },
    ],
    dressingGuide: [
      { itemName: "Suit, shirt and tie", steps: [
        "Button the white shirt to the collar and add the skinny black tie, knotted small.",
        "Put on the black suit trousers and belt, then the jacket, buttoned.",
        "Leave the suit a little loose. Jake and Elwood are not sharply tailored.",
      ] },
      { itemName: "Hat and sunglasses", steps: [
        "Wear the hat level and pulled down slightly at the front.",
        "Put on the sunglasses and leave them on. Taking them off breaks the look in photos.",
      ] },
      { itemName: "Jake or Elwood details", steps: [
        "Elwood: handcuff a black briefcase to one wrist with a toy handcuff, and keep a harmonica in your pocket.",
        "Jake: a slightly heavier, more rumpled look. Untuck nothing, but don't straighten anything either.",
        "For photos, stand side by side in matching poses; the film's dance moves are a bonus.",
      ] },
    ],
    about: [
      "Jake and Elwood Blues began as a musical act on Saturday Night Live in the late 1970s, created by John Belushi and Dan Aykroyd. Their 1980 film The Blues Brothers, directed by John Landis, follows the brothers as they reunite their old band to raise money to save the orphanage where they grew up, a quest they famously describe as \"a mission from God\".",
      "The film is known for its car chases and its music, with appearances from Aretha Franklin, Ray Charles, James Brown and Cab Calloway. The black suits, hats and sunglasses were part of the act from the start and have become one of the best-known costume pairings in film. Aykroyd and John Goodman returned for the sequel, Blues Brothers 2000.",
    ],
    faqs: [
      { question: "What do the Blues Brothers wear?", answer: "A black suit, white shirt, skinny black tie, black hat, black wayfarer-style sunglasses and black shoes. Both brothers wear the same outfit." },
      { question: "How do you tell Jake and Elwood apart in costume?", answer: "Elwood carries a briefcase handcuffed to his wrist and was the taller, leaner brother in the film. Jake was shorter and stockier. If you're a pair, the taller person usually plays Elwood." },
      { question: "Do I need real Ray-Ban sunglasses?", answer: "No. The film's sunglasses are black wayfarer-style frames, and any inexpensive black wayfarer-shaped pair looks the same from a distance." },
      { question: "Can more than two people do a Blues Brothers costume?", answer: "Yes. Matching black suits work for a whole group dressed as the band. Some groups add people dressed as other characters from the film, such as the women from Aretha Franklin's diner scene." },
      { question: "Can a woman dress as one of the Blues Brothers?", answer: "Absolutely. A black pantsuit or a black skirt suit with a white shirt, skinny tie, hat and sunglasses reads exactly the same." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "pablo-escobar-costume": {
    updated: "2026-10-15",
    seoTitle: "Pablo Escobar Costume from Narcos: What to Wear",
    metaDescription:
      "How the Pablo Escobar costume is usually done, based on Wagner Moura's look in Netflix's Narcos: patterned short-sleeve shirt, jeans, curly hair, moustache and belly padding.",
    h1Title: "Pablo Escobar Costume (Narcos Look)",
    excerpt:
      "Most Pablo Escobar costumes copy Wagner Moura in Netflix's Narcos: a patterned shirt, jeans, curly dark hair, a full moustache and a bit of belly padding.",
    intro: [
      "When people dress as Pablo Escobar, they are almost always copying Wagner Moura's portrayal in the first two seasons of Netflix's Narcos (2015–2016) rather than photos of the real man. That look is simple: a short-sleeved patterned shirt or sweatshirt, mid-wash jeans, a full black moustache, short curly dark hair and a heavier build.",
      "It's worth saying plainly that Escobar was a real person whose cartel was responsible for a great deal of violence, and some people, particularly Colombians, find the costume offensive. If you go ahead with it, keep it to the Narcos character look and leave out drug or weapon props.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$50–$90" },
      { label: "Reference", value: "Wagner Moura in Narcos, seasons 1–2" },
      { label: "What people recognise first", value: "Moustache + curly hair + patterned shirt" },
    ],
    items: [
      { name: "Patterned short-sleeve dress shirt", url: amz("B07XC7M6YR"), note: "Busy patterns in muted colours suit the 1980s setting." },
      { name: "Short curly black wig", url: amz("B09QCT9F3Z"), note: "Short and slightly messy; it should look like it hasn't been styled." },
      { name: "Fake moustache", url: amz("B00DLW8CRC"), note: "A full, thick moustache that covers the top lip. Trim it if it's too wide for your face." },
      { name: "Straight-leg or carpenter jeans", url: amz("B0008EOWT8"), note: "Mid-blue, relaxed fit. Avoid modern slim cuts." },
      { name: "Crewneck sweatshirt (alternative top)", url: amz("B077X2HPVH"), note: "Some Narcos scenes show him in casual sweatshirts; useful for a cold night." },
      { name: "Strap-on foam belly", url: amz("B002EU63JG"), note: "Optional. A little padding changes the silhouette more than any accessory." },
    ],
    dressingGuide: [
      { itemName: "Shape and base", steps: [
        "If you're using belly padding, strap it on over a fitted T-shirt so it doesn't shift.",
        "Put on the jeans and tuck the shirt in loosely, or leave a sweatshirt untucked.",
      ] },
      { itemName: "Hair and moustache", steps: [
        "Put on a wig cap, then the wig. Ruffle it with your fingers rather than brushing it.",
        "Clean and dry your upper lip before applying the moustache, and press it on for 30 seconds.",
      ] },
      { itemName: "Final details", steps: [
        "White sneakers or simple loafers fit the period.",
        "A plain gold watch is a reasonable accessory. Skip drug and gun props: they add little and are often banned at events.",
      ] },
    ],
    about: [
      "Pablo Escobar (1949–1993) led the Medellín Cartel in Colombia, which dominated the cocaine trade in the 1980s. The cartel's campaign of bombings, assassinations and kidnappings killed thousands of people, including politicians, police officers, judges and civilians. Escobar was killed by Colombian police in Medellín in December 1993.",
      "His popularity as a costume comes mostly from Narcos, the Netflix series in which Brazilian actor Wagner Moura played him in the first two seasons. Moura gained weight for the role, which is why the costume usually includes belly padding.",
    ],
    faqs: [
      { question: "What does Pablo Escobar wear in Narcos?", answer: "Mostly casual 1980s clothes: short-sleeved patterned shirts, polo shirts or sweatshirts, relaxed jeans and sneakers. The look is completed by his curly dark hair, full moustache and heavier build." },
      { question: "Is a Pablo Escobar costume offensive?", answer: "It can be. Escobar's cartel killed thousands of people, and many Colombians object to him being treated as a pop-culture figure. If you wear it, stick to the Narcos character look, and don't add drug or weapon props." },
      { question: "Can I do the costume without a wig?", answer: "If your own hair is dark and short, you can tousle it instead. The moustache matters more than the hair for recognition." },
      { question: "What's a good group costume with Escobar?", answer: "Narcos groups often add the DEA agents Steve Murphy and Javier Peña: 1980s suits or short-sleeved shirts, aviator sunglasses and a moustache for Murphy." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "scarface-costume": {
    characterName: "Tony Montana",
    updated: "2026-10-15",
    seoTitle: "Scarface Costume: Tony Montana's White Suit & Other Looks",
    metaDescription:
      "How to dress as Tony Montana from Scarface (1983): the white suit with black shirt, the plaid suit with red striped shirt, gold chain, aviators and prop safety tips.",
    h1Title: "Scarface Costume Guide: How to Dress as Tony Montana",
    excerpt:
      "Tony Montana's best-known costume is the white suit and black open-collar shirt. The plaid suit with a red striped shirt is the other popular choice.",
    intro: [
      "Tony Montana, played by Al Pacino in Brian De Palma's Scarface (1983), has several outfits, but two are worth copying. The first is the white suit with a black shirt worn open at the collar, which is the look on the film's poster and the one most people expect. The second is a double-breasted plaid suit with a red striped shirt and gold chain, which is easier to find and less likely to be duplicated at a party.",
      "Whichever you choose, the details that sell it are the open collar, gold jewellery, slicked-back dark hair and a small scar on the face. The famous line, \"Say hello to my little friend!\", comes with a large prop rifle. If you want to carry one, read the prop advice below first.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy to moderate" },
      { label: "Rough budget", value: "$80–$150 for the plaid suit version" },
      { label: "Best-known version", value: "White suit, black open-collar shirt" },
      { label: "What people recognise first", value: "The suit with an open shirt and gold chain" },
    ],
    items: [
      { name: "Double-breasted plaid suit", url: amz("B0B5Q9793M"), note: "For the plaid version. Wear it slightly oversized with wide lapels, in 1980s style." },
      { name: "Red striped dress shirt", url: amz("B002I6G1CK"), note: "Worn open at the collar with no tie." },
      { name: "Red pocket square", url: amz("B01M4RG9SR"), note: "A small detail that ties the shirt colour to the suit." },
      { name: "Gold chain", url: amz("B01DC0JBJ0"), note: "Visible at the open collar. Tony's jewellery is chunky, not delicate." },
      { name: "Aviator sunglasses", url: amz("B07KKNM6VS"), note: "Optional, but they suit the 1980s Miami look." },
      { name: "Black ankle boots", url: amz("B01KC103WG"), note: "Polished leather with a slight heel." },
    ],
    dressingGuide: [
      { itemName: "White suit version", steps: [
        "Wear a white two- or three-piece suit with a black dress shirt.",
        "Leave the top two or three shirt buttons undone and spread the collar over the jacket lapels.",
        "Add a gold chain and black shoes or boots.",
      ] },
      { itemName: "Plaid suit version", steps: [
        "Put on the red striped shirt, open at the collar, then the plaid suit trousers and jacket.",
        "Fold the red pocket square into the breast pocket and add the gold chain.",
      ] },
      { itemName: "Hair, scar and props", steps: [
        "Slick dark hair back with gel or pomade, or use a short dark slicked-back wig.",
        "Draw a thin scar on one cheek with brown-red eyeliner and blur the edges.",
        "If you carry a prop rifle, use an obviously fake toy with an orange tip, and check the event's rules first. Most conventions ban realistic replica guns.",
      ] },
    ],
    about: [
      "Scarface (1983) was directed by Brian De Palma, written by Oliver Stone and loosely remakes the 1932 film of the same name. Al Pacino plays Tony Montana, a Cuban refugee who arrives in Miami during the 1980 Mariel boatlift and rises to run a cocaine empire before his downfall.",
      "The film had mixed reviews on release but became a major pop-culture reference, especially in hip-hop, and Tony's suits, his catchphrases and the film's final shoot-out are now among the most quoted scenes in gangster cinema.",
    ],
    faqs: [
      { question: "What does Tony Montana wear in Scarface?", answer: "His best-known outfit is a white suit with a black shirt open at the collar. He also wears a double-breasted plaid suit with a red striped shirt, Hawaiian-style shirts early in the film and gold jewellery throughout." },
      { question: "Which Scarface outfit is easiest to put together?", answer: "The plaid suit with a red striped shirt is usually easier to buy as a set. A white suit is harder to find in a good fit and shows every mark, but it's the version most people recognise." },
      { question: "Can I bring a toy gun with a Scarface costume?", answer: "Check the event's rules first. Most conventions and many venues ban realistic replica firearms. If props are allowed, use an obviously fake toy with a bright orange tip." },
      { question: "Do I need prosthetics for Tony Montana's scar?", answer: "No. A thin line drawn on the cheek with brown-red eyeliner, with the edges blurred, reads clearly in photos. Slicked-back dark hair matters just as much for the look." },
    ],
  },
  // ───────────────────────────────────────────────────────────────────────────
  "dr-heinz-doofenshmirtz-costume": {
    characterName: "Dr. Doofenshmirtz",
    updated: "2026-10-15",
    seoTitle: "Dr. Doofenshmirtz Costume: Phineas and Ferb Lab Coat Look",
    metaDescription:
      "How to dress as Dr. Heinz Doofenshmirtz from Phineas and Ferb: white lab coat, dark clothes, messy brown hair, a long nose and the hunch, plus a Perry the Platypus pairing.",
    h1Title: "Dr. Heinz Doofenshmirtz Costume Guide (Phineas and Ferb)",
    excerpt:
      "A long white lab coat over dark clothes, messy brown hair, a long pointed nose and a hunched posture. Bring an \"-inator\" if you can.",
    intro: [
      "Dr. Heinz Doofenshmirtz is the evil-but-mostly-harmless scientist from Disney's Phineas and Ferb. His costume is cheap and simple: a long white lab coat buttoned over dark clothes, dark trousers, black shoes, messy brown hair and a long, pointed nose. Most of the character is in the posture: a hunch, slumped shoulders and an exaggerated accent.",
      "The best upgrade is a prop. Doofenshmirtz builds a new \"-inator\" in almost every episode, so a cardboard ray gun or gadget with a hand-painted label, such as a \"Costume-inator\", makes the costume funnier and gives people something to ask about.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$45–$80" },
      { label: "Best for", value: "Pairing with someone dressed as Perry the Platypus" },
      { label: "What people recognise first", value: "Lab coat + long nose + hunch" },
    ],
    items: [
      { name: "Long white lab coat", url: amz("B003P6WALS"), note: "Knee length or longer, worn fully buttoned. His coat is long and slightly too big." },
      { name: "Messy brown wig", url: amz("B07V25MBX9"), note: "Short, brown and unkempt. Don't style it; flatten one side and ruffle the other." },
      { name: "Long fake nose", url: amz("B004JTWRNQ"), note: "The nose is his defining feature. Blend the edge with a little foundation." },
      { name: "Dark grey trousers", url: amz("B09V29QGS3"), note: "Plain and dark, so the white coat stands out." },
      { name: "Plain black shoes", url: amz("B0B5HLH8RN"), note: "Simple black lace-ups or slip-ons." },
    ],
    dressingGuide: [
      { itemName: "Clothes", steps: [
        "Wear a dark top and the dark trousers as a base.",
        "Put on the lab coat and button it all the way down.",
      ] },
      { itemName: "Face and hair", steps: [
        "Attach the nose with spirit gum or the adhesive supplied, then blend the edge with foundation.",
        "Put on the wig over a wig cap and mess it up with your fingers.",
        "A little grey or brown eyeshadow under the eyes gives him his tired, under-slept look.",
      ] },
      { itemName: "Prop and performance", steps: [
        "Make an \"-inator\" from a toy blaster or cardboard and label it.",
        "Hunch forward, keep your shoulders slumped and announce your evil plans to anyone nearby.",
      ] },
    ],
    about: [
      "Doofenshmirtz is the main villain of Phineas and Ferb, which ran on Disney Channel from 2007 to 2015, with a revival announced in 2023. He is voiced by the show's co-creator, Dan Povenmire. In nearly every episode he runs Doofenshmirtz Evil Incorporated, builds an \"-inator\" to take over the Tri-State Area, and is defeated by his nemesis, Perry the Platypus, who is secretly Agent P.",
      "Many of his schemes are explained by flashbacks to an absurdly bad childhood in the fictional country of Drusselstein, which is where his accent comes from. He is also a divorced father to his daughter Vanessa, which gives the character a softer side.",
    ],
    faqs: [
      { question: "What does Dr. Doofenshmirtz wear?", answer: "A long white lab coat, worn buttoned, over dark clothes, with dark trousers and black shoes. His look is completed by messy brown hair, a long pointed nose and a hunched posture." },
      { question: "What's the best couples costume with Doofenshmirtz?", answer: "Perry the Platypus: a teal top and trousers or onesie, an orange duck-bill mask or hat, and a brown fedora. If you have a group, add Phineas and Ferb." },
      { question: "How do I make an -inator prop?", answer: "Start with a toy blaster, a spray bottle or a cardboard box, paint it silver or grey, add bottle caps as dials, and label it with a hand-written \"-inator\" name. A deliberately silly name works best." },
      { question: "Do I need the accent?", answer: "No, but it helps. Doofenshmirtz speaks with an exaggerated, vaguely Central European accent from the fictional country of Drusselstein." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "tyler-durden-costume": {
    updated: "2026-10-15",
    seoTitle: "Tyler Durden Costume: Fight Club Red Jacket Outfit",
    metaDescription:
      "Dress as Tyler Durden from Fight Club: red leather jacket, loud printed shirt, red-tinted sunglasses, bruised makeup and a bar of soap, plus a Narrator pairing.",
    h1Title: "Tyler Durden Costume Guide (Fight Club)",
    excerpt:
      "Red leather jacket, a loud printed shirt, red-tinted sunglasses and fake bruises. A bar of pink soap is the in-joke prop.",
    intro: [
      "Tyler Durden, played by Brad Pitt in David Fincher's Fight Club (1999), dresses like nobody else in the film. The look people recognise is a red leather jacket over a loud printed shirt, with red-tinted sunglasses, worn-in trousers, boots and a face covered in cuts and bruises.",
      "Tyler's clothes are deliberately mismatched and secondhand-looking, so this is a good costume to put together from thrift shops. The details that make it read as Tyler rather than \"man in red jacket\" are the tinted sunglasses, the bruise makeup and a bar of pink soap, a nod to the Paper Street Soap Company.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy (moderate with good bruise makeup)" },
      { label: "Rough budget", value: "$60–$120; less from thrift shops" },
      { label: "Best for", value: "A pair, with a friend as the Narrator" },
      { label: "What people recognise first", value: "Red leather jacket + tinted sunglasses" },
    ],
    items: [
      { name: "Red leather jacket", url: search("men red leather jacket"), note: "The key piece. A slightly worn, dark red faux-leather jacket looks closer to the film than bright, shiny red." },
      { name: "Loud printed shirt", url: amz("B00K2XPFEQ"), note: "Tyler's shirts have busy, clashing prints. The louder the better." },
      { name: "Red-tinted sunglasses", url: amz("B07GP9L1G5"), note: "Small lenses with a red or amber tint." },
      { name: "Work trousers", url: amz("B072NLJGB1"), note: "Worn-in and loose. Nothing about Tyler is tailored." },
      { name: "Work boots", url: amz("B09HSNJ3J1"), note: "Scuffed is better than new." },
      { name: "Prop cigarettes", url: amz("B014B20XEA"), note: "Optional. Use fake ones if you're indoors." },
    ],
    dressingGuide: [
      { itemName: "Clothes", steps: [
        "Wear the printed shirt open at the collar with the work trousers and boots.",
        "Add the red leather jacket, unzipped.",
      ] },
      { itemName: "Bruises and cuts", steps: [
        "Use a bruise wheel or purple, red and yellow eyeshadow. Dab colour around one eye, the cheekbone and the jaw, then blend the edges.",
        "A small cut on the lip or eyebrow made with fake blood or red lip liner adds realism.",
        "Set everything with powder so it doesn't transfer onto the jacket collar.",
      ] },
      { itemName: "Props", steps: [
        "Carry a bar of pink soap, or wrap a bar in a hand-made \"Paper Street Soap Co.\" label.",
        "Put the sunglasses on and keep them on.",
      ] },
    ],
    about: [
      "Fight Club is based on Chuck Palahniuk's 1996 novel and was directed by David Fincher, with Edward Norton as the unnamed Narrator and Brad Pitt as Tyler Durden, a soap salesman who starts an underground fight club with him. It underperformed at the box office in 1999 but became a cult film on home video.",
      "Tyler's wardrobe was designed to look like it came from thrift shops and lost-and-found bins: clashing patterns, worn leather and odd colour combinations, in contrast to the Narrator's catalogue-furniture, office-worker life. That contrast is worth keeping if you go as a pair.",
    ],
    faqs: [
      { question: "What does Tyler Durden wear in Fight Club?", answer: "His most recognisable look is a red leather jacket over a loud printed shirt, with red-tinted sunglasses, worn trousers and boots. He wears several other mismatched, thrift-store-style outfits through the film." },
      { question: "What should my partner wear as the Narrator?", answer: "A plain office shirt and tie, slacks, and a bruised face, or a short-sleeved shirt with a loosened tie. The Narrator's look is deliberately bland next to Tyler's." },
      { question: "How do I do realistic bruise makeup?", answer: "Layer purple and red first, then add yellow-green around the edges, as older bruises fade that way. Blend each layer with a sponge and set with powder. A cream bruise wheel from a costume shop makes this easier than eyeshadow." },
      { question: "Why does a Tyler Durden costume include soap?", answer: "Tyler makes and sells soap in the film, through the Paper Street Soap Company. A pink bar of soap is a well-known reference for fans." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "diy-kim-possible-costume": {
    updated: "2026-10-15",
    seoTitle: "DIY Kim Possible Costume: Black Crop Top & Cargo Pants",
    metaDescription:
      "Make a Kim Possible mission costume: black crop top, olive cargo pants, brown utility belt, black gloves and long red hair, plus a Ron Stoppable and Rufus pairing.",
    h1Title: "DIY Kim Possible Costume (Mission Outfit)",
    excerpt:
      "Black crop top, olive-green cargo pants, a brown belt, black gloves and long red hair. Many people already own half of it.",
    intro: [
      "Kim Possible's mission outfit is one of the easiest cartoon costumes to put together yourself: a black fitted crop top, olive or sage-green cargo pants, a brown utility belt, black gloves, black boots and long, straight red hair. If you already have cargo pants and a black top, you only need the hair and the accessories.",
      "Hair is what makes it recognisably Kim. If you don't have long red hair, a straight auburn wig with a side part is worth the money. A toy phone or tablet painted as her \"Kimmunicator\" is a good extra.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$90" },
      { label: "Best for", value: "Pairing with Ron Stoppable (and a toy mole-rat)" },
      { label: "What people recognise first", value: "Long red hair + black top + green cargo pants" },
    ],
    items: [
      { name: "Black fitted crop top", url: search("women black fitted long sleeve crop top"), note: "Plain black and fitted. Wear high-waisted cargo pants if you'd rather show less midriff." },
      { name: "Sage or olive green cargo pants", url: amz("B09BFF29D2"), note: "Loose, with side pockets. Match the green to the show's olive tone rather than a bright army green." },
      { name: "Long straight red wig", url: amz("B0B4W214XW"), note: "Long, straight and deep orange-red with a side part." },
      { name: "Brown utility belt", url: amz("B07C6WJKXH"), note: "A wide brown belt worn over the pants." },
      { name: "Black gloves", url: amz("B077CNN97N"), note: "Short black gloves complete the mission look." },
      { name: "Black lace-up boots", url: amz("B07PN6BPSZ"), note: "Comfortable black boots; you'll want to be able to run." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on the black crop top and cargo pants.",
        "Add the brown belt over the pants, sitting on the hips.",
        "Finish with boots and black gloves.",
      ] },
      { itemName: "Hair", steps: [
        "Pin your hair flat under a wig cap and put on the wig.",
        "Brush it straight with a side part, tucking one side behind the ear.",
      ] },
      { itemName: "Extras", steps: [
        "Paint an old phone case or toy tablet blue and grey to make a Kimmunicator.",
        "Practise her catchphrase: \"What's the sitch?\"",
      ] },
    ],
    about: [
      "Kim Possible ran on Disney Channel from 2002 to 2007. Kim, voiced by Christy Carlson Romano, is a high-school cheerleader who saves the world in her spare time with her best friend Ron Stoppable and his pet naked mole-rat, Rufus. Gadget support comes from 10-year-old genius Wade, and her main enemies are Dr. Drakken and Shego.",
      "A live-action Disney Channel film, with Sadie Stanley as Kim, was released in 2019. The mission outfit described here is the one from the animated series, which is the version most people recognise.",
    ],
    faqs: [
      { question: "What does Kim Possible wear on missions?", answer: "A black fitted crop top, olive or sage-green cargo pants, a brown belt, black gloves and black boots, with her long red hair loose." },
      { question: "What should Ron Stoppable wear?", answer: "Ron's mission look is a black top with the same style of cargo pants, plus messy blond hair. Carry a pink toy mole-rat in your pocket as Rufus." },
      { question: "Can I make a Kim Possible costume without a wig?", answer: "Yes if your hair is long; temporary red hair spray or a coloured hair wax can work for a night. A wig gets you closer to her exact shade." },
      { question: "Is Shego a good group costume addition?", answer: "Yes. Shego wears a green and black split catsuit with long black hair, and Dr. Drakken has blue skin and wears a lab coat. Together with Kim and Ron, they make a recognisable group." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "shy-guy-costume": {
    updated: "2026-10-15",
    seoTitle: "DIY Shy Guy Costume: Red Hoodie Robe & White Mask",
    metaDescription:
      "Make a Shy Guy costume from the Mario games: an oversized red hoodie or robe, a white mask with black eyes and mouth, and blue shoes. Cheap, quick and easy to wear.",
    h1Title: "DIY Shy Guy Costume (Super Mario)",
    excerpt:
      "An oversized red hoodie or robe, a white mask with two black oval eyes and an oval mouth, and blue shoes. That's all Shy Guy is.",
    intro: [
      "Shy Guy is one of the simplest Mario characters to make: a red robe with a hood, a white mask with two black oval eyes and an oval mouth, and blue shoes. Because his body is just a red hooded robe, an oversized red hoodie with matching red trousers gets you most of the way there.",
      "The mask is the whole character. Masks sold as \"Shy Guy\" are available, but you can make one by painting a plain white full-face mask with black ovals. Wearing gloves and keeping all your skin covered helps sell the faceless, slightly eerie look.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$30–$60" },
      { label: "Best for", value: "Mario group costumes; groups of Shy Guys are funny" },
      { label: "What people recognise first", value: "The white mask with oval eyes" },
    ],
    items: [
      { name: "Oversized red hoodie", url: amz("B00AWTWP6Q"), note: "Go two sizes up so it hangs like a robe. Pull the hood up over the mask's edges." },
      { name: "White full-face mask", url: amz("B092VF6RM7"), note: "A plain white mask you can paint, or a ready-made Shy Guy mask. Check you can see and breathe comfortably." },
      { name: "Red sweatpants", url: search("red sweatpants adult"), note: "Match the hoodie's red so the body reads as one robe." },
      { name: "Blue shoes", url: search("blue canvas sneakers"), note: "Shy Guy's feet are blue. Plain canvas sneakers are fine." },
      { name: "Gloves", url: amz("B07FLXK36N"), note: "Optional; covering your hands keeps the faceless effect." },
    ],
    dressingGuide: [
      { itemName: "Mask (make the day before)", steps: [
        "If your mask is plain, draw two tall ovals for eyes and one oval for the mouth with a pencil.",
        "Paint them black with acrylic paint and let it dry overnight.",
        "Check the eye holes line up with your eyes; you may need to enlarge them slightly and paint around them.",
      ] },
      { itemName: "Body", steps: [
        "Wear the red trousers and the oversized red hoodie.",
        "Put on the blue shoes and gloves.",
        "Put on the mask, then pull the hood up so it frames the mask's edges.",
      ] },
    ],
    about: [
      "Shy Guys first appeared in the 1987 Japanese game Yume Kōjō: Doki Doki Panic, which Nintendo reworked into Super Mario Bros. 2 for Western audiences in 1988. They have since become one of the most common enemies and side characters in the Mario series, especially in Yoshi's Island, Mario Kart and Mario Party.",
      "True to their name, Shy Guys never show their faces, and what lies under the mask is a running joke in the series. Several colours exist in the games, but the red robe is the standard one.",
    ],
    faqs: [
      { question: "What colour are Shy Guy's shoes?", answer: "Blue. The standard Shy Guy has a red robe, a white mask and blue feet." },
      { question: "How do I make a Shy Guy mask?", answer: "Paint two tall black ovals for the eyes and a smaller black oval for the mouth onto a plain white full-face mask with acrylic paint. Let it dry overnight before wearing." },
      { question: "Is a Shy Guy costume comfortable for a long event?", answer: "The hoodie and sweatpants are very comfortable, but full-face masks get warm. Choose a mask with good ventilation and take it off between photos." },
      { question: "What group costumes go with Shy Guy?", answer: "Shy Guys work well in any Mario group, with Mario, Luigi, Peach, Yoshi or Bowser, and a group of several Shy Guys in different colours is a costume in itself." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "stefan-salvatore-outfits": {
    updated: "2026-10-15",
    seoTitle: "Stefan Salvatore Outfits: The Vampire Diaries Costume",
    metaDescription:
      "How to dress like Stefan Salvatore from The Vampire Diaries: layered henleys and jackets, dark jeans, boots and his lapis lazuli daylight ring, plus Damon and Elena pairings.",
    h1Title: "Stefan Salvatore Outfits and Costume Guide (The Vampire Diaries)",
    excerpt:
      "Stefan dresses in layers: a henley or T-shirt under a jacket, dark jeans and boots. The lapis lazuli daylight ring is the detail fans look for.",
    intro: [
      "Stefan Salvatore, played by Paul Wesley in The Vampire Diaries, has an understated style: a fitted henley or T-shirt, often layered under a shirt or jacket, dark jeans and boots. It's an outfit you can wear all day, which is why it's popular for fan events and everyday \"closet cosplay\".",
      "The detail that turns it into Stefan rather than just a casual outfit is his daylight ring: a silver ring with a blue lapis lazuli stone that lets him walk in the sun. Add brown hair swept up at the front and a brooding expression.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$100" },
      { label: "Best for", value: "Fan events, or a group with Damon and Elena" },
      { label: "What people recognise first", value: "The lapis lazuli daylight ring" },
    ],
    items: [
      { name: "Fitted T-shirt or henley", url: amz("B09RVKQWXH"), note: "Muted colours: grey, navy, olive or charcoal." },
      { name: "Dark jacket", url: amz("B00LQA5XYG"), note: "Stefan layers a jacket over his shirt in most episodes. Keep it simple and dark." },
      { name: "Dark slim jeans", url: amz("B00N49FECS"), note: "Dark wash, straight or slim fit." },
      { name: "Leather boots", url: amz("B000NXYYI8"), note: "Brown or black lace-up boots." },
      { name: "Lapis lazuli ring", url: amz("B07QH5QJ8P"), note: "A silver band with a blue stone is the important part." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Start with the henley or T-shirt and dark jeans, tucked or untucked.",
        "Layer the jacket over the top and add boots.",
      ] },
      { itemName: "Details", steps: [
        "Put on the daylight ring.",
        "Style your hair with a little product, pushed up and back at the front.",
        "For a darker, \"Ripper\" Stefan look from later seasons, add a black jacket and a touch of fake blood at the corner of the mouth.",
      ] },
    ],
    about: [
      "The Vampire Diaries ran on The CW from 2009 to 2017 and is based on L. J. Smith's novel series. Stefan Salvatore is a centuries-old vampire who returns to his hometown of Mystic Falls, Virginia, and falls for Elena Gilbert (Nina Dobrev). His older brother, Damon (Ian Somerhalder), is his rival for much of the series.",
      "Stefan is the more restrained of the two brothers, and his wardrobe reflects it: muted colours and simple layers, compared with Damon's all-black leather look. The vampires' daylight rings, set with lapis lazuli and made by a witch, protect them from the sun and appear throughout the series.",
    ],
    faqs: [
      { question: "What kind of ring does Stefan Salvatore wear?", answer: "A silver daylight ring set with a blue lapis lazuli stone. In the show it was enchanted by a witch so he can walk in the sun." },
      { question: "What's the difference between Stefan's and Damon's style?", answer: "Stefan wears muted colours in layers: henleys, shirts and jackets. Damon wears almost all black, usually with a black leather jacket. If you go as the brothers, keep that contrast." },
      { question: "What should Elena wear in a group costume?", answer: "Long straight brown hair, a fitted top or tank, a jacket and jeans, and Elena's vervain necklace, a silver locket with a filigree design." },
      { question: "Can I wear this outfit every day?", answer: "Yes. That's part of its appeal: it's normal clothing, and only the ring signals the character to fans." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "wendy-torrance-costume": {
    updated: "2026-10-15",
    seoTitle: "Wendy Torrance Costume: The Shining 1970s Look",
    metaDescription:
      "Dress as Wendy Torrance from Kubrick's The Shining: 1970s pinafore dress, flannel shirt, white tights, boots, long dark centre-parted hair and a toy baseball bat.",
    h1Title: "Wendy Torrance Costume Guide (The Shining)",
    excerpt:
      "Wendy's look is late-1970s and homely: a pinafore or shirt dress, flannel layers, white tights, boots and long, straight, centre-parted dark hair. The bat is optional but iconic.",
    intro: [
      "Wendy Torrance, played by Shelley Duvall in Stanley Kubrick's The Shining (1980), dresses in plain, practical late-1970s clothes: pinafore and shirt dresses, flannel shirts, turtlenecks, white tights and boots. Her long, straight dark hair with a centre parting is a big part of the look.",
      "The most famous image of Wendy is her backing up the stairs with a baseball bat, terrified. Carrying a toy bat makes the costume instantly recognisable, and it pairs perfectly with someone dressed as Jack Torrance, or with two friends as the Grady twins.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$50–$100" },
      { label: "Best for", value: "A group with Jack Torrance and the Grady twins" },
      { label: "What people recognise first", value: "Centre-parted long hair + toy bat" },
    ],
    items: [
      { name: "1970s-style pinafore or line dress", url: amz("B07ZD8Q1V8"), note: "A plain, knee-length dress in an earthy colour. Think practical, not glamorous." },
      { name: "Flannel shirt", url: amz("B0074MWEKQ"), note: "Wear it under the pinafore or on its own with a skirt." },
      { name: "White opaque tights", url: amz("B079BTN4T3"), note: "A very 1970s detail that suits Wendy's wardrobe." },
      { name: "Brown boots", url: amz("B07V4P42XV"), note: "Low-heeled and practical." },
      { name: "Plastic baseball bat", url: amz("B000LID78S"), note: "Use a lightweight toy bat; real bats are banned at most events." },
    ],
    dressingGuide: [
      { itemName: "Outfit", steps: [
        "Put on the white tights first, then the flannel shirt and dress.",
        "Add the boots.",
      ] },
      { itemName: "Hair and makeup", steps: [
        "Part your hair, or a long straight dark wig, exactly in the centre and let it fall straight.",
        "Keep makeup minimal. For the later scenes, add tear-streaked mascara and a pale, frightened look.",
      ] },
      { itemName: "Prop", steps: [
        "Carry the toy bat in both hands, held up across your body as in the stairs scene.",
      ] },
    ],
    about: [
      "The Shining is Stanley Kubrick's 1980 adaptation of Stephen King's 1977 novel. Jack Torrance (Jack Nicholson) takes a winter caretaker job at the isolated Overlook Hotel, bringing his wife Wendy and their son Danny, and gradually loses his mind. The film's images, including the Grady twins, Room 237 and \"Here's Johnny!\", are among the best-known in horror.",
      "Shelley Duvall's performance as Wendy was gruelling to film; Kubrick was known for shooting scenes, including the bat scene, many times over. Her portrayal has been widely reappraised as one of the film's strengths. Duvall died in 2024.",
    ],
    faqs: [
      { question: "What does Wendy Torrance wear in The Shining?", answer: "Practical late-1970s clothes: pinafore and shirt dresses, flannel shirts, turtlenecks, white tights and boots. Her outfits change across the film, but the overall style stays plain and homely." },
      { question: "What's the best group costume with Wendy?", answer: "Jack Torrance (a red jacket over a plaid or casual shirt, or a hotel-caretaker look, carrying a toy axe), Danny in a knitted jumper, and two people as the Grady twins in matching pale blue dresses." },
      { question: "Can I carry a baseball bat to a party or convention?", answer: "Use a lightweight plastic toy bat, and check the event rules. Real bats are treated as weapons at most conventions." },
      { question: "How should I do Wendy's hair?", answer: "Long, straight and dark with a sharp centre parting. If your hair isn't long enough, a long straight brown wig works well." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "jar-jar-binks-costume": {
    updated: "2026-10-15",
    seoTitle: "Jar Jar Binks Costume: Star Wars Gungan Outfit Guide",
    metaDescription:
      "How to dress as Jar Jar Binks from Star Wars: The Phantom Menace: a Gungan mask or headpiece with long ears, a tan vest, ragged trousers and orange-toned skin.",
    h1Title: "Jar Jar Binks Costume Guide (Star Wars)",
    excerpt:
      "Jar Jar is hard to DIY because of his head. Buy a mask or headpiece with long ears, then build the rest from a vest, ragged trousers and orange-toned gloves.",
    intro: [
      "Jar Jar Binks, the Gungan from Star Wars: Episode I – The Phantom Menace (1999), is a fully computer-generated character, so there's no simple everyday-clothes version of him. The head, with its long floppy ears, eye stalks and duck-like snout, is what makes him recognisable, so most people buy a mask or full costume rather than making one.",
      "If you build it yourself, put your effort and budget into the headpiece. For the body, a tan or brown vest, loose ragged trousers cut off below the knee and orange-toned gloves are enough. Jar Jar's clumsy, loose-limbed walk does the rest.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate (unless you buy a full costume)" },
      { label: "Rough budget", value: "$40–$120" },
      { label: "Best for", value: "Star Wars group costumes and ironic party costumes" },
      { label: "What people recognise first", value: "The long-eared Gungan head" },
    ],
    items: [
      { name: "Jar Jar Binks mask or headpiece", url: search("Jar Jar Binks mask"), note: "The piece to spend money on. Check you can see through it and that the ears are long and floppy." },
      { name: "Jar Jar Binks full costume", url: search("Jar Jar Binks costume adult"), note: "The easiest option if you'd rather not assemble the pieces." },
      { name: "Tan or brown vest", url: search("brown suede vest men"), note: "Worn open over a long-sleeved top in a similar earthy tone." },
      { name: "Ragged brown trousers", url: search("brown linen trousers men"), note: "Cut and fray the legs below the knee." },
      { name: "Orange gloves", url: search("orange gloves costume"), note: "To match Jar Jar's skin tone if your arms and hands show." },
    ],
    dressingGuide: [
      { itemName: "Body", steps: [
        "Put on a long-sleeved top in a brown or tan tone, then the vest.",
        "Wear the trousers with the frayed legs ending around the calf.",
        "Go barefoot-looking with skin-tone or orange socks over shoes, or wear simple brown shoes.",
      ] },
      { itemName: "Head and hands", steps: [
        "Put on the gloves before the mask, while you can still see properly.",
        "Fit the mask so the ears hang evenly behind your shoulders.",
      ] },
      { itemName: "Performance", steps: [
        "Jar Jar's movement is loose and clumsy. Flail your arms a little and refer to yourself as \"meesa\".",
      ] },
    ],
    about: [
      "Jar Jar Binks is a Gungan from the planet Naboo, introduced in The Phantom Menace (1999), where he joins Qui-Gon Jinn and Obi-Wan Kenobi. He returns as a senator's representative in Attack of the Clones (2002), where he unwittingly helps Palpatine gain emergency powers, and briefly in Revenge of the Sith (2005).",
      "He was played through voice and motion capture by Ahmed Best, making him one of the first fully computer-generated main characters in a live-action film. The character was heavily criticised at the time, but has since been re-evaluated by many fans, and Best returned to Star Wars in 2023 as the Jedi Kelleran Beq in The Mandalorian.",
    ],
    faqs: [
      { question: "What does Jar Jar Binks wear?", answer: "A tan or brown vest over a lighter top, loose ragged trousers that end below the knee, and a belt. His skin is orange-brown, and his head has long floppy ears, eye stalks and a duck-like snout." },
      { question: "Is it better to buy or make a Jar Jar costume?", answer: "Buy at least the head. It's the hardest part to make well and the part people recognise. The clothes are easy to assemble yourself." },
      { question: "Who played Jar Jar Binks?", answer: "Ahmed Best voiced and performed the character through motion capture in the prequel trilogy." },
      { question: "What group costumes include Jar Jar?", answer: "A Phantom Menace group: Qui-Gon Jinn and Obi-Wan Kenobi in Jedi robes, Padmé Amidala or Queen Amidala, and young Anakin Skywalker." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "dexter-morgan-costume": {
    updated: "2026-10-15",
    seoTitle: "Dexter Morgan Costume: Kill Room Outfit & Miami Look",
    metaDescription:
      "Dress as Dexter Morgan from Dexter: the olive long-sleeve henley, cargo pants, gloves and apron of his kill outfit, or his short-sleeve Miami Metro work look.",
    h1Title: "Dexter Morgan Costume Guide (Dexter)",
    excerpt:
      "Dexter's \"kill outfit\" is an olive long-sleeve henley, cargo pants, black gloves and a plastic apron. His day look is a short-sleeved patterned shirt.",
    intro: [
      "Dexter Morgan, played by Michael C. Hall in Showtime's Dexter, has two outfits people recognise. The first is his \"kill outfit\": a fitted olive or khaki long-sleeved henley, cargo pants, black gloves and, in the kill room, a plastic apron. The second is his daytime look as a blood-spatter analyst for Miami Metro: short-sleeved patterned button-up shirts and slacks.",
      "The kill outfit is the one people expect at Halloween. Small details sell it: a few blood splatters, a roll of plastic wrap, or a wooden box of blood slides.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$50–$100" },
      { label: "Best for", value: "Halloween; works solo" },
      { label: "What people recognise first", value: "Olive henley + gloves + blood slides" },
    ],
    items: [
      { name: "Olive long-sleeve henley", url: search("men olive long sleeve henley"), note: "Fitted, not baggy. This is the core of the kill outfit." },
      { name: "Cargo pants", url: amz("B07F2KFQWB"), note: "Khaki or dark green, practical and plain." },
      { name: "Black apron", url: amz("B086KR2MMP"), note: "For the kill-room version. A shiny plastic or rubber apron looks closest." },
      { name: "Black gloves", url: amz("B0015DGC9Y"), note: "Thin black gloves, worn snug." },
      { name: "Fake blood", url: amz("B009DKJPKY"), note: "A light spatter only; Dexter is meticulous and never messy." },
    ],
    dressingGuide: [
      { itemName: "Kill outfit", steps: [
        "Put on the henley, buttoned partway, and the cargo pants.",
        "Add the gloves and the apron.",
        "Flick a small amount of fake blood across the apron; keep the shirt mostly clean.",
      ] },
      { itemName: "Props", steps: [
        "Make a blood-slide box from a small wooden box and glass microscope slides, each with a drop of red nail polish.",
        "Carry a roll of plastic wrap. Skip realistic knives; most events ban them, and the slides are more recognisable anyway.",
      ] },
      { itemName: "Daytime Miami version", steps: [
        "Wear a short-sleeved patterned button-up shirt, slacks and a lanyard ID badge reading \"Miami Metro Police Department\".",
      ] },
    ],
    about: [
      "Dexter ran on Showtime from 2006 to 2013, based on Jeff Lindsay's novel Darkly Dreaming Dexter. Dexter Morgan is a forensic blood-spatter analyst for the Miami Metro Police Department who is secretly a serial killer, targeting other killers according to a code taught to him by his adoptive father, Harry.",
      "Michael C. Hall returned for the limited series Dexter: New Blood (2021). A prequel, Dexter: Original Sin (2024), stars Patrick Gibson as young Dexter, with Hall narrating, and Hall returned again in Dexter: Resurrection (2025).",
    ],
    faqs: [
      { question: "What does Dexter wear when he kills?", answer: "A fitted olive or khaki long-sleeved henley, cargo pants and black gloves. In the kill room he adds a plastic apron, and the room is covered in plastic sheeting." },
      { question: "What does Dexter wear to work?", answer: "Short-sleeved patterned button-up shirts with slacks, often in light colours to suit Miami." },
      { question: "How do I make Dexter's blood slides?", answer: "Put a drop of red nail polish or fake blood on a few glass microscope slides, let them dry, and store them in a small wooden box. It's the most recognisable Dexter prop." },
      { question: "Can I carry a knife prop?", answer: "Check the event rules first. Most conventions and many venues ban realistic blade props. The blood slides and plastic wrap identify the character without one." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "mr-smee-costume": {
    characterName: "Mr. Smee",
    updated: "2026-10-15",
    seoTitle: "Mr. Smee Costume: Disney Peter Pan Pirate Guide",
    metaDescription:
      "How to dress as Mr. Smee from Disney's Peter Pan: blue and white striped shirt, red knit cap, round glasses, white sideburns, a red nose and rolled-up trousers.",
    h1Title: "Mr. Smee Costume Guide (Peter Pan)",
    excerpt:
      "Blue and white striped shirt, red knit cap, small round glasses, white mutton-chop sideburns and a round red nose. Pair him with Captain Hook.",
    intro: [
      "Mr. Smee, Captain Hook's loyal and bumbling first mate in Disney's Peter Pan (1953), is a comfortable, easy costume: a blue and white striped shirt, a red knit cap, small round glasses, white mutton-chop sideburns and a round red nose, with trousers rolled up to the shin.",
      "Smee is almost always worn as half of a pair with Captain Hook, and he is the easier half. If you're the one who doesn't want a big hat and a hook, this is your costume.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$80" },
      { label: "Best for", value: "A pair with Captain Hook, or a Peter Pan group" },
      { label: "What people recognise first", value: "Red cap + striped shirt + round glasses" },
    ],
    items: [
      { name: "Red knit cap", url: amz("B00NB95UWU"), note: "A slouchy red knit or stocking cap, worn back on the head." },
      { name: "Blue and white striped shirt", url: amz("B0BL1KWV69"), note: "Horizontal stripes. A loose fit suits Smee's round shape." },
      { name: "Small round glasses", url: amz("B002WIXLJ0"), note: "Small, round, wire-framed. Wear them low on the nose." },
      { name: "White mutton-chop sideburns", url: amz("B004UNZMFQ"), note: "Smee is bald on top with white sideburns. These attach with adhesive." },
      { name: "Round prosthetic nose", url: amz("B00ZIXK1XA"), note: "Optional; a little red blush on your own nose also works." },
      { name: "Shorts or rolled trousers", url: amz("B09R2MQGPH"), note: "Rolled to the shin or knee." },
    ],
    dressingGuide: [
      { itemName: "Clothes", steps: [
        "Put on the striped shirt, loose and untucked or tucked into a wide belt.",
        "Wear the trousers rolled up to the shin, with sandals or plain shoes.",
      ] },
      { itemName: "Face", steps: [
        "Attach the sideburns in front of each ear with spirit gum.",
        "Add the nose or redden your own with blush, then the glasses, low on the nose.",
        "Put the red cap on last, pushed back.",
      ] },
      { itemName: "Pairing", steps: [
        "If you're with Captain Hook, stay a step behind them and look worried. Smee spends most of the film fussing over Hook.",
      ] },
    ],
    about: [
      "Smee comes from J. M. Barrie's play Peter Pan (1904) and novel Peter and Wendy (1911). Disney's 1953 animated film gave him his best-known look: short, round, bald with white sideburns, in a striped shirt and red cap, endlessly devoted to Captain Hook and terrified of the crocodile.",
      "Bob Hoskins played Smee in Steven Spielberg's Hook (1991), and Jim Gaffigan played him in Disney's live-action Peter Pan & Wendy (2023). The 1953 animated design remains the version most people picture.",
    ],
    faqs: [
      { question: "What does Mr. Smee wear in Peter Pan?", answer: "In Disney's 1953 film: a blue and white striped shirt, a red knit cap, small round glasses and trousers rolled up below the knee. He has white sideburns and a round red nose." },
      { question: "Does Mr. Smee have a beard?", answer: "No, he has white mutton-chop sideburns and is bald on top, which is why the red cap sits back on his head." },
      { question: "What's the best pairing for Smee?", answer: "Captain Hook. For a bigger group, add Peter Pan, Tinker Bell, Wendy Darling, or someone dressed as the Tick-Tock Crocodile." },
      { question: "Can a woman dress as Mr. Smee?", answer: "Yes. The costume doesn't depend on body type: the striped shirt, red cap and round glasses carry it on anyone." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "blade-costume": {
    updated: "2026-10-15",
    seoTitle: "Blade Costume: Wesley Snipes Vampire Hunter Outfit",
    metaDescription:
      "Dress as Blade from the Wesley Snipes films: long black leather coat, black tactical vest, black trousers, combat boots, wraparound sunglasses and a sword on your back.",
    h1Title: "Blade Costume Guide (Marvel's Vampire Hunter)",
    excerpt:
      "All black: a long leather coat, a tactical vest, trousers and combat boots, with wraparound sunglasses and a sword in a back scabbard.",
    intro: [
      "Blade's look from the Wesley Snipes films (1998–2004) is all black and very recognisable: a long black leather coat over a black tactical vest, black trousers, combat boots, black gloves, dark wraparound sunglasses and a sword in a scabbard on his back.",
      "It's a costume that rewards fit and texture. Matte black tactical pieces under a heavy coat look far better than a shiny one-piece costume, and the coat and sunglasses do most of the work. Bring a toy sword only if the event allows it.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Moderate" },
      { label: "Rough budget", value: "$120–$250" },
      { label: "Reference", value: "Blade (1998), Blade II (2002), Blade: Trinity (2004)" },
      { label: "What people recognise first", value: "Long black coat + sunglasses + sword" },
    ],
    items: [
      { name: "Long black leather coat", url: amz("B09C6KJ7V9"), note: "Ankle or calf length, faux leather is fine. This is the biggest visual piece." },
      { name: "Black tactical vest", url: amz("B00IWHHPAQ"), note: "Fitted and matte, worn under the open coat." },
      { name: "Black fitted trousers", url: amz("B002XFI8FY"), note: "Plain black, tucked into the boots." },
      { name: "Wraparound sunglasses", url: amz("B0848VYXGN"), note: "Dark, narrow and wraparound." },
      { name: "Black gloves", url: amz("B00164TI48"), note: "Leather or tactical gloves." },
      { name: "Tactical leg strap", url: amz("B00865O2ZA"), note: "Optional; adds the armed, combat-ready look without a real weapon." },
      { name: "Black combat boots", url: amz("B00HGYY6FS"), note: "Laced high." },
      { name: "Prop sword with scabbard", url: amz("B079R9TYW5"), note: "Check event prop rules; many conventions require blunt, peace-bonded props." },
    ],
    dressingGuide: [
      { itemName: "Base", steps: [
        "Put on a black long-sleeved top and the black trousers, tucked into the combat boots.",
        "Add the tactical vest and leg strap.",
      ] },
      { itemName: "Coat and accessories", steps: [
        "Put on the long coat, leaving it open.",
        "Sling the sword scabbard across your back so the handle sits over one shoulder.",
        "Finish with gloves and sunglasses.",
      ] },
    ],
    about: [
      "Blade was created by writer Marv Wolfman and artist Gene Colan and first appeared in Marvel's The Tomb of Dracula #10 in 1973. He is a half-vampire \"daywalker\" who has vampire strength without their weaknesses and hunts vampires.",
      "Wesley Snipes played him in Blade (1998), Blade II (2002) and Blade: Trinity (2004). The first film's success is often credited with showing studios that Marvel films could work, ahead of X-Men (2000). Snipes returned as Blade in Deadpool & Wolverine (2024), and Marvel Studios announced Mahershala Ali in the role in 2019.",
    ],
    faqs: [
      { question: "What does Blade wear?", answer: "In the Wesley Snipes films: a long black leather coat over a black tactical vest, black trousers, combat boots, black gloves and dark wraparound sunglasses, with a sword carried on his back." },
      { question: "Can I bring Blade's sword to a convention?", answer: "Check the rules first. Most conventions allow only lightweight, blunt prop swords, often peace-bonded at the entrance, and ban metal blades." },
      { question: "Which Blade film's costume should I copy?", answer: "The look is similar across all three Snipes films. Blade (1998) is the best-known; Blade II adds more tactical gear." },
      { question: "Is the coat necessary?", answer: "It's what makes the silhouette. Without it, the outfit can read as a generic tactical costume." },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  "the-cousin-eddie-dickie-costume": {
    characterName: "Cousin Eddie",
    updated: "2026-10-15",
    seoTitle: "Cousin Eddie Costume: Christmas Vacation Dickie & Sweater",
    metaDescription:
      "Dress as Cousin Eddie from National Lampoon's Christmas Vacation: white sweater over a black dickie, or the bathrobe, trapper hat and beer can from the RV scene.",
    h1Title: "Cousin Eddie Costume Guide (Christmas Vacation)",
    excerpt:
      "Two classic looks: a white sweater over a black dickie with slacks and white shoes, or a bathrobe, fur trapper hat and beer from the RV scene.",
    intro: [
      "Cousin Eddie, played by Randy Quaid in National Lampoon's Christmas Vacation (1989), has two looks that people quote. The first is his dinner outfit: a white sweater with a black dickie (the fake turtleneck collar) underneath, light slacks and white shoes. The second is the RV scene: an old bathrobe, a fur trapper hat, black socks, slippers and a can of beer.",
      "The dickie is the joke, so make sure it shows above the sweater's neckline. The bathrobe version is the more comfortable choice for a long holiday party; the sweater version looks better in photos with someone dressed as Clark Griswold.",
    ],
    quickFacts: [
      { label: "Difficulty", value: "Easy" },
      { label: "Rough budget", value: "$40–$80" },
      { label: "Best for", value: "Christmas parties and ugly-sweater events" },
      { label: "What people recognise first", value: "The black dickie under a white sweater" },
    ],
    items: [
      { name: "Black dickie (fake turtleneck collar)", url: amz("B08HYP5B8N"), note: "The essential piece. It should be visible above the sweater's V-neck." },
      { name: "White V-neck sweater", url: amz("B08C8HKC4Z"), note: "A V-neck shows the dickie best." },
      { name: "Light cotton twill trousers", url: amz("B000RXXU48"), note: "Beige or light grey, a little too short and not quite fitted." },
      { name: "White dress shoes", url: amz("B01H7S0T76"), note: "White shoes complete the dinner look." },
      { name: "Fur trapper hat", url: amz("B07YLYS9JM"), note: "For the RV version, worn with the ear flaps down." },
    ],
    dressingGuide: [
      { itemName: "Dinner version", steps: [
        "Put on the dickie first and smooth the collar up around your neck.",
        "Pull the white sweater over it so the black collar shows at the V.",
        "Add the slacks and white shoes. A comb-over and a slightly too-pleased expression finish it.",
      ] },
      { itemName: "RV version", steps: [
        "Wear an old bathrobe, loosely tied, over a white T-shirt.",
        "Add the trapper hat with the flaps down, black socks pulled high, and slippers.",
        "Carry a beer can, and a garden hose if you're committed.",
      ] },
    ],
    about: [
      "Cousin Eddie is Ellen Griswold's cousin by marriage, first seen in National Lampoon's Vacation (1983). In Christmas Vacation (1989) he arrives uninvited at Clark Griswold's house for the holidays in a rusty RV with his family and dog, Snots, and stays.",
      "Randy Quaid's performance made Eddie the film's most-quoted character. Christmas Vacation, written by John Hughes and starring Chevy Chase as Clark, is now a holiday staple, which is why Eddie costumes show up at Christmas parties as much as at Halloween.",
    ],
    faqs: [
      { question: "What is Cousin Eddie's dickie?", answer: "A dickie is a separate fake collar, in Eddie's case a black turtleneck collar, worn under a sweater to look like a full turtleneck. He wears it under a white sweater at Christmas dinner." },
      { question: "What does Cousin Eddie wear in the RV scene?", answer: "A bathrobe, a fur trapper hat with the ear flaps down, black socks and slippers, holding a beer, while emptying the RV's waste tank into the storm drain." },
      { question: "What should Clark Griswold wear with Eddie?", answer: "A Christmas sweater or a red and white plaid shirt, slacks and a Santa hat. For the lights scene, add a tool belt and a string of Christmas lights." },
      { question: "Is Cousin Eddie a Halloween or Christmas costume?", answer: "Both. It's especially popular at Christmas parties and ugly-sweater events because Christmas Vacation is a holiday film." },
    ],
  },
};
