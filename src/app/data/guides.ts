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
};
