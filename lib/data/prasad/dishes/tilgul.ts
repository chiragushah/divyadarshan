import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'tilgul',
  name: 'Til-Gul Sweets',
  alsoCalled: 'Tilgul · Tilachi Vadi · Ellu Bella · Til Chikki · तिळगुळ',
  category: 'Sweet',
  summary: 'Sesame–jaggery sweets of Makar Sankranti and Uttarayan.',
  meaning:
    'In the cold of Makar Sankranti, sesame and jaggery warm the body, and as the Marathi saying goes, “til-gul ghya, god god bola” — take the sweets and speak sweetly. The festival marks the sun’s turn northwards, and the foods of the day are chosen for the season: sesame is rich in oil and heat, jaggery is the unrefined sugar of the sugarcane harvest. Maharashtra rolls them into soft ladoos that are exchanged with the greeting; Gujarat pours them as a thin brittle (chikki) to eat on the roof during the kite festival of Uttarayan; Karnataka mixes ellu-bella, a dry assortment of sesame, peanuts, fried gram, coconut and jaggery cubes, and carries it in a decorated plate from house to house. The three are made differently and taste differently, but all three are the same gesture of friendship and a new beginning.',
  variants: [
    {
      id: 'maharashtra-ladoo',
      region: 'Maharashtra',
      culture: 'Marathi households — Makar Sankranti',
      title: 'Tilache Ladoo',
      intro:
        'Soft-crunchy sesame balls bound with jaggery syrup and flavoured with cardamom. A small plate is offered to Surya, and the balls are exchanged with the greeting “Til-gul ghya”.',
      story:
        'In Maharashtra, Makar Sankranti is the day of til-gul. In the days before the festival, Marathi kitchens fill with the smell of sesame roasting, and it is common to make several kinds: tilache ladoo, tilachi vadi (a flat barfi), and halwa, the sugar-coated sesame beads known as halwyache dagine, which are worn by children at the Bor Nahan ceremony.\n\nThe act of exchanging sweets is as important as the sweets. Married women hold haldi-kumkum gatherings through the month after Sankranti, and every guest leaves with til-gul and a small gift. Old family quarrels are said to be forgotten on this day; the greeting “take this til-gul and speak sweet words” is a practical way to begin the new season on good terms.\n\nThe ladoo is the simplest form. A well-made tilache ladoo is not rock-hard; it is crisp at the first bite, then melts, and holds together without needing a lot of syrup. This depends entirely on cooking the jaggery to the right stage, which the recipe below explains in detail.',
      serves: '15–18 ladoos (about 25 g each)',
      prep: '15 min',
      cook: '20 min',
      equipment: [
        'Heavy-bottomed kadai or pan — jaggery syrup scorches quickly in a thin pan and turns bitter',
        'Wide steel plate or tray — to cool the roasted sesame and to let the mixture rest while you shape',
        'Small steel bowl of cold water — to test the syrup stage by dropping in a little syrup',
        'Wooden spoon or steel ladle — for mixing; wood does not conduct heat to your hand',
        'Small bowl of ghee — to grease your palms so the hot mixture does not stick',
      ],
      ingredients: [
        {
          group: 'Sesame mixture',
          items: [
            '1 cup (150 g) white sesame seeds — choose unhulled or hulled but fresh, white seeds with no dusty smell; old sesame tastes bitter',
            '1/4 cup roasted peanuts, coarsely crushed — remove the skins by rubbing, and crush to rice-grain size so they do not turn oily',
            '2 tbsp dry coconut, grated and toasted — adds sweetness and bulk; toast it lightly until it just turns pale',
          ],
        },
        {
          group: 'Jaggery syrup',
          items: [
            '1 cup (about 200 g) chopped jaggery — a soft golden jaggery (not rock-hard, not very dark) gives a mellow taste; chop it fine so it melts evenly',
            '2 tbsp water — only enough to start the melting; too much water makes the syrup take longer to reach the right stage',
            '1 tsp ghee — prevents sticking and gives a glossy finish',
            '1/2 tsp cardamom powder — crushed fresh from green cardamom seeds for aroma',
          ],
        },
        {
          group: 'For shaping',
          items: [
            '1 tbsp ghee, extra — to grease your palms; shaping with dry hands is impossible',
          ],
        },
      ],
      mise: [
        'Roast the sesame, peanuts and coconut and spread them on a plate so they cool. Do this first; the syrup is made at the very last.',
        'Chop the jaggery into small pieces so that it melts at the same speed; large chunks scorch on the outside before the middle melts.',
        'Fill a small bowl with cold water and keep it next to the stove for testing the syrup.',
        'Grease a plate with a little ghee, and keep a bowl of ghee ready for your palms.',
        'Make sure all the ingredients are measured and lined up. Once the syrup is ready you will have about a minute before it begins to set.',
      ],
      method: [
        {
          title: 'Dry roast the sesame',
          text: 'Put the sesame seeds in a dry kadai on low heat and stir constantly for 3–4 minutes. Do not use oil. When the seeds begin to pop and turn very pale gold, remove them to a plate and spread them out in a thin layer to stop them cooking further.',
          why: 'Roasting removes the raw, slightly bitter taste and gives the nutty flavour that makes til-gul. If left in the hot pan they continue to cook and turn bitter and brown.',
          cue: 'The seeds make a soft popping sound, smell sweet and nutty, and turn from white to the colour of pale sand; a seed pressed between the fingers crumbles easily.',
        },
        {
          title: 'Toast the coconut and mix the dry ingredients',
          text: 'In the same pan, toast the grated dry coconut for a minute on low heat until it just changes colour. Combine the cooled sesame, crushed peanuts, coconut and cardamom in a wide bowl and toss with your fingers.',
          why: 'Toasting coconut dries its surface so it does not make the ladoos soggy. Mixing everything before the syrup is ready lets you add the syrup in one pour.',
          cue: 'The coconut smells sweet and milky and turns the faintest cream; the mixture looks evenly speckled.',
        },
        {
          title: 'Melt the jaggery',
          text: 'In a clean heavy pan, combine the chopped jaggery, 2 tablespoons of water and 1 teaspoon of ghee. Place on medium-low heat and stir until the jaggery has melted, about 3–4 minutes, then let it bubble gently without stirring.',
          why: 'A little water lets the jaggery melt without catching; stirring after it has melted can cause it to crystallise. Gentle heat prevents scorching, which would make the syrup bitter.',
          cue: 'The syrup turns glossy and fluid, bubbles are large at first and then become smaller and thicker.',
        },
        {
          title: 'Cook to the soft-ball stage',
          text: 'Keep the syrup bubbling on medium-low heat for 4–6 minutes. After 4 minutes begin testing: drop a small spoonful of syrup into the bowl of cold water, then pick it up with your fingers and roll it. At soft-ball stage it forms a ball that is firm but still soft and pliable; at hard-ball it is stiff and does not flatten.',
          why: 'Soft-ball syrup is just cooked enough to bind the sesame without making the ladoos rock-hard. Under-cooked syrup makes ladoos that fall apart; over-cooked makes them like stone.',
          cue: 'A drop in cold water forms a ball that flattens slightly between your fingers and does not stick; the syrup threads thickly off the spoon and bubbles are slow and glossy.',
        },
        {
          title: 'Pour the syrup over the sesame mixture',
          text: 'Immediately switch off the heat and pour the syrup over the sesame mixture in a thin stream. Mix quickly with a wooden spoon, turning and folding for about 30 seconds until every seed is coated.',
          why: 'The syrup begins to set as soon as it cools, so the speed of mixing decides whether the ladoos bind. Hesitation means lumps and patches of dry seed.',
          cue: 'There are no dry seeds left, the mixture is glossy and sticky, and it holds when pressed between two spoons.',
        },
        {
          title: 'Grease your palms and shape the ladoos',
          text: 'Wait about 20–30 seconds so the mixture is cool enough to touch (it should be hot but not painful), then grease your palms with ghee. Take a heaped tablespoon, press it firmly between your palms and roll it into a ball about the size of a walnut. Place on the greased plate. Work quickly, and re-warm the mixture over very low heat for 30 seconds if it hardens.',
          why: 'Pressing firmly squeezes air out and compacts the ladoo so it holds. Shaping when the mixture is too hot burns your hands; too cool and it will not bind.',
          cue: 'The ladoo is smooth, holds its round shape without cracking, and does not crumble when lifted.',
        },
        {
          title: 'Rest and set',
          text: 'Let the ladoos rest uncovered on the plate for at least 30 minutes until fully set and cool. Do not stack them while warm. Then store in an airtight tin.',
          why: 'The syrup hardens only as it cools to room temperature. Handling the ladoos earlier makes them lose shape and stick together.',
          cue: 'The ladoos feel firm and dry on the outside and make a dull knock when tapped.',
        },
      ],
      offering:
        'Offered to Surya and Shani and gifted with the “Til-gul ghya” greeting, along with haldi–kumkum for women.',
      ritual: [
        'On the morning of Makar Sankranti, take a bath, preferably with a few sesame seeds in the water, and wear fresh (often black or dark) clothes, as is the Maharashtrian custom.',
        'Place two or three tilache ladoos on a clean steel plate with a flower and a small lamp before the image of Surya, or offer them at the tulsi vrindavan facing east.',
        'Offer water to the rising sun (arghya) and then offer the ladoos with folded hands, praying for health and prosperity for the year. Sesame offered to Shani (Saturn) is also associated with the day.',
        'After the offering, give the first ladoo to the eldest member of the family, saying “Til-gul ghya, god god bola” (take the sweet and speak sweetly) and touching their feet.',
        'Exchange ladoos with neighbours and relatives with the same greeting. Married women invite each other to haldi-kumkum gatherings, where a ladoo, haldi-kumkum and a small gift are given.',
        'Children’s halwa-bead jewellery and sugar sweets are given on the same day, and a portion of the sweets is also given to those who cannot afford them.',
      ],
      serving:
        'Serve at room temperature, one or two ladoos per person, on a small plate or wrapped in a piece of banana leaf. They are eaten slowly, since they are rich and dense, with a cup of hot tea or warm milk on a cold morning. They are gifted in small boxes with the greeting.',
      storage:
        'Store in an airtight steel or glass container at room temperature for 2–3 weeks. Keep away from damp. If they soften in humid weather, warm them in a dry pan for a minute on low heat; if they have turned too hard, microwave one for 5–8 seconds before eating.',
      troubleshooting: [
        {
          problem: 'The ladoos are rock-hard and hurt your teeth',
          fix: 'The syrup was cooked past soft-ball stage. Next time stop earlier and test more often with the cold-water method. To rescue a batch, crumble it, warm with a little ghee and a spoon of jaggery syrup, and reshape.',
        },
        {
          problem: 'The ladoos fall apart when shaped',
          fix: 'The syrup was under-cooked or too little was used. Return the mixture to the pan with 2 tablespoons of jaggery syrup cooked a little longer, and shape again.',
        },
        {
          problem: 'The syrup crystallised into a grainy mass',
          fix: 'It was stirred too much after it melted, or water was missing. Add 2 tablespoons of water, warm gently until clear, and carry on cooking to the right stage.',
        },
        {
          problem: 'The ladoos taste bitter',
          fix: 'The sesame was over-roasted or the jaggery scorched. Roast sesame only until pale gold, and keep the jaggery at medium-low heat in a heavy pan.',
        },
        {
          problem: 'The mixture hardens before you can shape it',
          fix: 'Warm it in the pan for 20–30 seconds on the lowest flame while stirring, then shape quickly with greased hands.',
        },
      ],
      variations: [
        'Add 2 tablespoons of roasted gram (daliya) powder or besan to the mix for a nuttier, softer ladoo.',
        'Replace peanuts with chopped almonds or cashews for a festive version, or leave out nuts entirely for those with allergies.',
        'Tilachi vadi: pour the same mixture onto a greased plate, flatten with a greased katori to 1 cm thickness, and cut into squares while warm.',
        'For a vrat version, check your family’s custom; sesame, jaggery and ghee are generally accepted, but avoid peanuts if your fast excludes them.',
        'Vegan version: use coconut oil instead of ghee for greasing and in the syrup; the flavour is slightly different.',
        'Jain-friendly: all ingredients are plant-based, but use jaggery and sesame sourced from a vendor your family trusts and skip any additions such as chocolate or processed ingredients.',
      ],
      tips: [
        'Learn the cold-water test. It is the one skill that makes every syrup-based sweet reliable.',
        'Do not leave the jaggery syrup unattended; it moves from perfect to burnt in under a minute.',
        'Work in a warm room if you can; cold weather makes the mixture harden before you finish shaping.',
        'Keep a small bowl of ghee at hand and re-grease your palms often.',
        'Make the ladoos a day before Sankranti; they taste better after a day of resting.',
      ],
      differs: 'Rolled ladoo; soft-ball syrup; peanuts and coconut.',
    },
    {
      id: 'gujarat-chikki',
      region: 'Gujarat',
      culture: 'Gujarati households — Uttarayan',
      title: 'Til ni Chikki',
      intro:
        'A thin crunchy brittle of roasted sesame set in jaggery caramel, cut into diamonds. Eaten during the kite festival alongside undhiyu and jalebi.',
      story:
        'Uttarayan is Gujarat’s Makar Sankranti, and for two days Ahmedabad, Surat and Vadodara disappear under a sky of kites. The rooftops are full of families flying kites from morning until the sun goes down, and the food is eaten on the roof, with sticky fingers: undhiyu with puri, jalebi with fafda, sugarcane, boiled peanuts, and til ni chikki, the brittle of sesame and jaggery.\n\nChikki is the most portable of the festival sweets. It does not melt in the sun, it can be eaten with one hand while holding a kite string with the other, and it gives quick energy through the cold morning. Sesame is believed to warm the body in winter, and the two ingredients are bound together by nothing more than jaggery cooked to a hard crack.\n\nWhere the Maharashtrian ladoo is soft and bound with a lighter syrup, the Gujarati chikki is cooked hotter, spread thin and cracked into pieces. The success of the sweet lies entirely in reaching the right temperature and working quickly while the caramel is still hot.',
      serves: '20 pieces',
      prep: '10 min',
      cook: '15 min',
      equipment: [
        'Heavy-bottomed pan — jaggery caramel is hot enough to burn thin pans in seconds',
        'Large steel plate, thali or marble slab greased with ghee — the brittle is poured onto it; an ungreased surface will glue the chikki down',
        'Greased rolling pin (belan) or flat steel katori — to roll the hot mass thin; ungreased tools stick',
        'Sharp knife or pizza cutter, greased — to score the chikki while it is warm',
        'Bowl of cold water — to test the syrup for the hard-crack stage',
      ],
      ingredients: [
        {
          group: 'The brittle',
          items: [
            '1 cup (about 150 g) white sesame seeds — pick fresh seeds; roast just before using for the best flavour',
            '3/4 cup (150 g) jaggery, chopped — use a firm, golden jaggery; very soft or sticky jaggery contains moisture and will not set crisp',
            '1 tsp ghee, plus extra for greasing — prevents the caramel from sticking to the pan and gives a smooth finish',
            '1/2 tsp dry ginger powder or cardamom powder (optional) — ginger gives the traditional warming taste; use only a little',
          ],
        },
      ],
      mise: [
        'Grease the plate or slab generously with ghee and keep the rolling pin and knife greased and within reach.',
        'Dry roast the sesame in a pan until it just turns pale gold and keep it ready in a bowl next to the stove.',
        'Chop the jaggery into small, even pieces about the size of peas so it melts quickly.',
        'Fill a small bowl with cold water to test the syrup, and keep a spoon beside it.',
        'Prepare in a dry, cool room if you can; humidity makes the chikki sticky rather than crisp.',
      ],
      method: [
        {
          title: 'Roast the sesame',
          text: 'In a dry pan on low heat, stir the sesame for 3–4 minutes until it starts to pop and turns the lightest gold. Pour it onto a plate immediately and keep it nearby. Do not brown it deeply.',
          why: 'Sesame cooks further when mixed into the hot caramel. If it is already dark, the chikki tastes bitter; if raw, it tastes grassy.',
          cue: 'The seeds crackle softly, smell sweetly nutty, and a seed crushed between your fingers is crisp and pale gold inside.',
        },
        {
          title: 'Melt the jaggery with ghee',
          text: 'Put the chopped jaggery and ghee in a heavy pan on low heat. Stir gently until the jaggery has melted into a smooth, glossy liquid, about 3 minutes. Let it begin to bubble.',
          why: 'Starting on low heat melts the jaggery without scorching its edges. Ghee reduces sticking and gives the finished chikki a clean, glossy surface.',
          cue: 'The jaggery has melted completely and the bubbles are large, slow and pale amber.',
        },
        {
          title: 'Cook to the hard-crack stage',
          text: 'Raise the heat to medium and let the syrup boil for 4–5 minutes without stirring. It will foam up and the bubbles will turn smaller and thicker. Start testing after 4 minutes: drop a little syrup in the cold water. It should harden at once into a brittle thread that snaps cleanly when you bend it.',
          why: 'The hard-crack stage is above 140 degrees Celsius and contains very little water, so the chikki will set crisp. A softer stage gives sticky, chewy chikki that glues to the teeth.',
          cue: 'A drop in cold water sets into a hard thread that snaps like glass between the fingers and does not stick to your teeth when you bite it.',
        },
        {
          title: 'Add the spice and the sesame',
          text: 'Turn off the heat. Add the ginger or cardamom powder and the roasted sesame seeds all at once. Stir very quickly, for about 10 seconds, folding the sesame through the caramel until it is evenly coated.',
          why: 'The caramel starts to set within seconds of leaving the heat. Speed ensures every seed is coated before the mass hardens into a block.',
          cue: 'The sesame is fully coated and the mixture moves as one glossy mass; no loose seeds sit at the bottom.',
        },
        {
          title: 'Pour and roll thin',
          text: 'Immediately pour the mixture onto the greased plate. With the greased rolling pin or the base of a greased katori, press and roll it out quickly into a thin sheet about 4–5 mm thick, working from the centre outwards. Work fast, within 30–45 seconds.',
          why: 'The chikki sets rapidly. Thin chikki is crisp and delicate; thick chikki is hard and heavy to bite.',
          cue: 'The sheet is an even, thin layer, glossy and with no bare patches, and still warm and slightly flexible.',
        },
        {
          title: 'Score into diamonds',
          text: 'While the sheet is still warm and just firm enough to hold a cut, score it with a greased knife or pizza cutter into diamond or square pieces, about 2 inches wide. Press the knife down firmly but do not saw.',
          why: 'Once fully cool, the chikki is too brittle to cut cleanly and will shatter. Scoring while warm creates clean break lines.',
          cue: 'The knife leaves a clean groove that does not close up again, and the sheet is firm but still bends slightly.',
        },
        {
          title: 'Cool and break apart',
          text: 'Leave the chikki undisturbed for 15–20 minutes until completely cool and hard. Then break it along the scored lines. Store immediately in an airtight container.',
          why: 'Chikki absorbs moisture from the air quickly. Cooling it fully and sealing it keeps the crisp snap.',
          cue: 'The pieces separate with a clean snap, and a piece broken in half shows a glassy, evenly packed interior.',
        },
      ],
      offering:
        'Offered to Surya on Uttarayan morning, and given to relatives with kites and sugarcane.',
      ritual: [
        'On the morning of Uttarayan, bathe and offer water (arghya) to the rising sun while standing facing east, with folded hands.',
        'Place a few pieces of til ni chikki on a clean plate along with sugarcane, boiled peanuts and a piece of jaggery, and set it before the household deity or the sun image.',
        'Offer the plate with a short prayer for good health and prosperity through the sun’s northward journey. Light a ghee lamp and show it to the deity.',
        'After the offering, distribute the chikki to everyone, starting with the eldest, and exchange pieces with neighbours on the rooftops.',
        'Many families donate grain, sesame, jaggery and blankets to those in need on this day, believing that charity at Uttarayan is multiplied; a few pieces of chikki are often included.',
      ],
      serving:
        'Serve at room temperature in small pieces, in a steel bowl or wrapped in paper for the roof. It is eaten with tea, undhiyu-puri or jalebi during the day. Break it into bite-size pieces for children and elders.',
      storage:
        'Stays crisp for 3–4 weeks in an airtight steel or glass tin kept in a cool, dry place. Add a small piece of butter paper between layers to prevent sticking. If it softens in humid weather, warm the pieces in a low oven or dry pan for two minutes and cool again.',
      troubleshooting: [
        {
          problem: 'The chikki is chewy and sticks to your teeth',
          fix: 'The syrup did not reach the hard-crack stage. Next time boil it longer and test in cold water until it snaps. To fix, return the mixture to a pan with a spoon of jaggery and cook until crisp.',
        },
        {
          problem: 'It is too dark and bitter',
          fix: 'The jaggery caramelised too far. Reduce the heat and test sooner. Use a lighter golden jaggery.',
        },
        {
          problem: 'The mixture hardens before you can roll it',
          fix: 'Work faster and have everything greased and ready. If it sets, return the plate to a very low oven for two minutes to soften, then roll.',
        },
        {
          problem: 'The chikki becomes soft after a day',
          fix: 'It absorbed moisture. Always store it in an airtight container in a dry place, and avoid making it on very humid days.',
        },
        {
          problem: 'It shatters into powder when you cut it',
          fix: 'It was left too long. Score it while warm. If it has already hardened, break it into irregular shards instead; they taste the same.',
        },
      ],
      variations: [
        'Add 1/4 cup crushed roasted peanuts or chopped cashews for a mixed chikki; use less sesame to keep the ratio of jaggery right.',
        'Use black sesame for a stronger flavour. Some families mix black and white sesame in equal parts.',
        'Add 2 tablespoons of dry coconut slices for a milder, sweeter brittle.',
        'For a vrat-friendly chikki, use only sesame, jaggery and ghee, and omit ginger if your fast does not allow it.',
        'Vegan version: use coconut oil to grease the plate and in the pan; the taste changes slightly.',
      ],
      tips: [
        'Practise the cold-water test before you start; it makes the difference between brittle and sticky.',
        'Keep your hands away from the caramel. It is hotter than boiling water.',
        'Grease the rolling pin and knife thoroughly before the caramel is ready.',
        'Make chikki on a dry day. Rain and humidity are its enemies.',
        'Do not stir the syrup while it boils; stirring can make it crystallise.',
      ],
      differs: 'Thin, hard-crack brittle, cut in diamonds.',
    },
    {
      id: 'karnataka-ellu-bella',
      region: 'Karnataka',
      culture: 'Kannada households — Sankranti',
      title: 'Ellu-Bella (Sankranti mix)',
      intro:
        'A dry mixture, not a sweet bound with syrup: roasted sesame, peanuts, fried gram, dry coconut slices and jaggery cubes, served on a decorated plate with sugarcane pieces and sugar figurines (sakkare achchu).',
      story:
        'In Karnataka, Makar Sankranti is Suggi, the harvest festival, and the signature of the day is ellu-bella, a plate of sesame and jaggery that is carried from house to house. Girls and women in new clothes go out with a decorated plate or small steel box holding ellu-bella, a piece of sugarcane, a banana and sometimes a sakkare achchu, a little moulded sugar figure in the shape of a deity or an animal. They exchange plates with neighbours and relatives, saying “ellu bella thindu olle maathaadi” — eat the sesame and jaggery and speak kindly.\n\nThe mix itself is not cooked together; it is assembled from separate ingredients. That means it is also forgiving: no syrup to burn, no stage to reach. Each ingredient has its own role. Sesame is for warmth, peanuts and fried gram for protein, dry coconut for sweetness, and jaggery cubes for the sweet, mellow bite.\n\nIt is a very personal recipe. Every family has its own proportions, and some add dried dates, cashews or roasted chana. The ritual, more than the recipe, is what makes it Sankranti: preparing the plate, decorating it, and delivering it.',
      serves: '10 people (about 1/4 cup each)',
      prep: '20 min',
      cook: '10 min',
      equipment: [
        'Heavy kadai or pan — for dry roasting sesame and peanuts evenly without scorching',
        'Large mixing bowl — big enough to toss the mix without spilling',
        'Small sharp knife and board — to cut jaggery into small, even cubes and slice the coconut thin',
        'Decorated steel plate or tray — the mix is carried and given on a plate decorated with a banana leaf or rangoli',
        'Airtight jar — for storing the finished mix without moisture',
      ],
      ingredients: [
        {
          group: 'The roasted mix',
          items: [
            '1/2 cup (75 g) white sesame seeds — roast fresh; the seeds should smell sweet and nutty, not oily',
            '1/2 cup roasted peanuts, skins removed — buy unsalted, shelled peanuts and roast them yourself for the cleanest taste',
            '1/2 cup fried gram (hurigadale/putani) — ready-made, crisp and white; check that it is dry and not stale',
          ],
        },
        {
          group: 'The sweet and dry coconut',
          items: [
            '1/2 cup dry coconut (kopra), cut into thin slivers — choose firm white copra; slice thin so each piece is crisp',
            '1/2 cup jaggery, cut into tiny cubes — a firm, golden jaggery that holds shape; very soft jaggery will clump the mix',
            '1/2 tsp cardamom powder — grind the seeds fresh; adds the festive aroma',
          ],
        },
        {
          group: 'For the plate',
          items: [
            '1 tbsp sugar-candy figurines (sakkare achchu), optional — traditional moulded sugar shapes available at festival time; they are for decoration and sweetness',
            'A few small pieces of sugarcane and 1 banana per plate — traditionally given with ellu-bella and eaten together',
          ],
        },
      ],
      mise: [
        'Cut the jaggery into very small cubes, about the size of a peppercorn, and keep it in a separate bowl to avoid clumping.',
        'Slice the dry coconut into thin slivers with a sharp knife; a slightly dried piece slices more neatly.',
        'Rub the roasted peanuts between your palms to remove skins and blow off the husk.',
        'Wash and dry the plate, banana leaf and any decorations; ellu-bella is prepared the night before and arranged on the morning of the festival.',
        'Keep all the roasted ingredients to cool completely on a plate before mixing, or the jaggery will soften.',
      ],
      method: [
        {
          title: 'Roast the sesame',
          text: 'Heat a dry kadai on low heat and add the sesame. Stir continuously for 3–4 minutes until the seeds crackle softly and turn pale gold. Pour them out onto a plate immediately to stop further cooking.',
          why: 'Sesame roasts quickly and goes from pale to bitter in seconds. Removing it from the hot pan stops it cooking further.',
          cue: 'The seeds smell sweetly nutty and are lightly golden; a seed crushed between your fingers is crisp.',
        },
        {
          title: 'Roast the peanuts',
          text: 'In the same pan on low heat, roast the peanuts for 5–6 minutes, stirring often, until the skins crack and blister and they smell toasted. Cool slightly, rub off the skins and blow them away.',
          why: 'Peanuts need longer than sesame to roast through. Under-roasted peanuts are soft and taste raw; skins left on make the mix bitter and dusty.',
          cue: 'The peanuts split at the seam, are golden inside, and snap crisply when bitten.',
        },
        {
          title: 'Toast the coconut slivers',
          text: 'Toast the thin coconut slivers in a dry pan on low heat for 1–2 minutes, tossing, until they are just fragrant and very lightly coloured at the edges. Remove at once.',
          why: 'Dry coconut is already dry; a short toast brings out its sweetness. Over-toasting turns it bitter and brittle.',
          cue: 'The slivers smell sweet and milky, with the faintest tan at the edges; they stay mostly white.',
        },
        {
          title: 'Cool everything completely',
          text: 'Spread the sesame, peanuts, fried gram and coconut on a large plate and leave for 15–20 minutes, stirring once or twice, until they are completely cold to the touch.',
          why: 'Warm ingredients will soften the jaggery cubes and make the mix sticky. Cold ingredients keep the mix dry and loose for days.',
          cue: 'All the ingredients feel cool and dry on your palm, and no heat is felt when you hold a handful.',
        },
        {
          title: 'Combine the dry ingredients',
          text: 'In a large bowl, add the sesame, peanuts, fried gram, toasted coconut and cardamom. Toss gently with your hands or a spoon, lifting from the bottom, until the mix looks evenly speckled.',
          why: 'Mixing the dry ingredients first ensures an even spread of flavours before the jaggery is added, and avoids crushing the delicate fried gram.',
          cue: 'Every handful shows a mix of white, brown and cream pieces, with no one ingredient dominating.',
        },
        {
          title: 'Add the jaggery cubes last',
          text: 'Add the tiny jaggery cubes to the cooled mix and toss lightly. Do not press or rub. If the cubes begin to stick together, dust them with a pinch of the sesame to separate them.',
          why: 'Jaggery picks up moisture from the air and from warm ingredients. Adding it last, on a cool mix, keeps the cubes separate and the mix dry.',
          cue: 'The cubes stay individually distinct and the mix flows freely when you lift it with a spoon.',
        },
        {
          title: 'Arrange the plate',
          text: 'Line a steel plate with a clean banana leaf or paper. Mound the ellu-bella in the centre, and arrange the sugarcane pieces, banana and sakkare achchu around it. Cover with a clean cloth until the offering.',
          why: 'The presentation is part of the tradition: the plate is carried from house to house. Covering protects it from dust and moisture.',
          cue: 'The plate looks bright and abundant, with white, brown and gold colours against the green leaf.',
        },
      ],
      offering:
        'Offered to Surya and the household deity, then given to neighbours with the greeting “Ellu bella thindu olle maathaadi”.',
      ritual: [
        'On the morning of Sankranti, bathe and wear new or clean clothes. Draw a rangoli at the door and light a lamp at the tulsi.',
        'Place the plate of ellu-bella with sugarcane and banana before the household deity and before the sun, facing east. Offer a handful of the mix, a piece of sugarcane and the banana.',
        'Make an offering of a small portion of the mix to the cattle or to a cow if available, as Suggi is also a harvest festival. A portion is set aside for the poor.',
        'Pray with folded hands for the family’s health and good harvest. Show the lamp to the deity and the sun.',
        'Fill small plates or boxes for gifting. Girls and women take them to neighbours and relatives, exchanging with the greeting “ellu bella thindu olle maathaadi”.',
        'Accept the plates given to you with both hands, and return an empty plate only after putting something in it.',
      ],
      serving:
        'Serve a handful on a small plate or in a paper cone, with a piece of sugarcane and a slice of banana. It is eaten as a snack, a few bites at a time, and is enjoyed at tea time. For guests, offer a spoonful with a piece of sugarcane.',
      storage:
        'Store in an airtight jar for up to 2 weeks in a cool, dry place. Keep the jaggery cubes separate if the weather is humid and add them just before serving. If it softens, spread the nuts and seeds on a pan and warm for two minutes, then cool and remix.',
      troubleshooting: [
        {
          problem: 'The jaggery cubes clump together',
          fix: 'The mix was warm or the jaggery was soft. Cool all ingredients fully, cut cubes smaller, and add them last. Dust with a little sesame to keep them separate.',
        },
        {
          problem: 'The mix tastes bitter',
          fix: 'The sesame or coconut was over-roasted. Roast on low heat and remove the moment they turn pale gold.',
        },
        {
          problem: 'The peanuts are soft and chewy',
          fix: 'They were under-roasted or absorbed moisture. Re-roast them for a few minutes and cool completely before mixing.',
        },
        {
          problem: 'The mix becomes damp after a few days',
          fix: 'It was stored while warm or in a humid place. Always cool fully, use an airtight jar and add a dry muslin bag of rice grains to absorb moisture.',
        },
      ],
      variations: [
        'Add dried dates cut into small pieces, dried figs or raisins to make the mix richer and more festive.',
        'Some Kannada households add roasted fox nuts (makhana) or roasted chana dal in place of fried gram.',
        'In North Karnataka, the mix may include thin pieces of fresh coconut and a few cashews alongside the sesame.',
        'For a nut-free version, omit peanuts and substitute roasted pumpkin seeds or additional fried gram.',
        'For a vegan version, no changes are required: the mix is naturally plant-based and made without ghee.',
        'Sakkare achchu: if you cannot find the moulded sugar figures, a few pieces of rock sugar (kalkandu) on the plate serve the same decorative and sweet purpose.',
      ],
      tips: [
        'Keep everything dry. Water is the enemy of this mix.',
        'Cut the jaggery cubes smaller than you think; big pieces are hard to chew with the peanuts.',
        'Make extra: the plate is meant to be shared and refilled throughout the day.',
        'If you can, mix it a day ahead; the flavours merge, and it travels well.',
        'Use a clean, dry spoon for serving, and never put wet hands into the jar.',
      ],
      differs: 'A dry, un-syruped mix; sugarcane and sakkare achchu on the plate.',
    },
  ],
}

export default recipe
