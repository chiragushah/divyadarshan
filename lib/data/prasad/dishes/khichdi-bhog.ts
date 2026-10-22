import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'khichdi-bhog',
  name: 'Khichdi Bhog',
  alsoCalled: 'Bhoger Khichuri · Khechudi · Datta Khichdi · খিচুড়ি',
  category: 'Rice & Grain',
  summary: 'Sanctified rice and dal — Durga Puja’s bhog in Bengal, Jagannath’s khechudi, and Datta’s alms khichdi.',
  meaning:
    'Rice and lentils cooked together is the simplest form of a complete meal, and across India it is offered to the deity as the plainest, purest bhog. The Bengal version, bhoger khichuri, is rich with ghee, roasted moong dal, Gobindobhog rice and vegetables, and is served to thousands at the Durga Puja pandal. The Odisha version, khechudi, is a pale, mild, ghee-fragrant dish cooked in earthen pots in the Jagannath temple kitchen as part of the Abadha. The Maharashtrian version is the Datta khichdi, a minimal alms offering to Dattatreya, who is the Lord of alms-seekers. All three are cooked without onion or garlic, are offered before they are eaten, and are shared as equal prasadam.',
  variants: [
    {
      id: 'bengal-bhoger-khichuri',
      region: 'West Bengal',
      culture: 'Bengali households and pandals — Durga Puja Ashtami, Vishwakarma Puja',
      title: 'Bhoger Khichuri',
      intro:
        'Gobindobhog rice and roasted moong dal cooked soft with cauliflower, potato, peas and a handful of whole spices, finished with ghee. It is thick and porridge-like, fragrant and golden, and is served with labra, begun bhaja, chutney and payesh.',
      story:
        'No Bengali Durga Puja is complete without bhoger khichuri. On Ashtami, the eighth day, the pandal kitchen cooks vast pots of khichuri which is first offered to the Goddess as bhog and then served on leaf plates, or sal-leaf thalas, to everyone who has come to the pandal, rich or poor, family or stranger. The meal is famously accompanied by labra (mixed vegetable), begun bhaja (fried aubergine), tomato chutney and payesh.\n\nBhog khichuri is different from everyday khichuri. It is richer in ghee, uses fragrant Gobindobhog rice, and the moong dal is dry-roasted first until golden, which gives a deep nutty aroma. Whole spices — bay leaf, cardamom, cinnamon, cloves and dried red chillies — flavour the ghee, and a pinch of sugar balances the savour, a signature of Bengali cooking. Importantly, it follows the sattvic rule of a bhog: no onion, no garlic.\n\nThe same dish is made on Vishwakarma Puja, Saraswati Puja and other Bengali occasions. In Bengal it is also the rainy-day comfort food (bristir khichuri). Compared with Odisha’s plain khechudi it is richer, spicier and filled with vegetables; compared with Maharashtra’s Datta khichdi it is a feast rather than an alms meal.',
      serves: '6–8 servings',
      prep: '20 min',
      cook: '45 min',
      equipment: [
        'Large heavy-bottomed pot or deep kadai — thick bottoms prevent sticking when the khichuri thickens; enough room to stir vegetables and rice comfortably',
        'Dry frying pan — for roasting the moong dal evenly to a golden colour before washing',
        'Slotted spoon — to lift the fried vegetables out of the ghee without leaving it behind',
        'Kettle or pot of hot water — hot water keeps the temperature steady and prevents the grains from seizing',
      ],
      ingredients: [
        {
          items: [
            '1 cup (200 g) Gobindobhog rice, washed — a short, aromatic, sticky Bengali rice; basmati is too long, but any short aromatic rice will do',
            '1/2 cup (100 g) moong dal, dry roasted until golden — the roasting gives the characteristic nutty fragrance of bhog khichuri',
            '1 small cauliflower, cut into florets (about 2 cups) — traditional in Bengali bhog khichuri; cut to uniform size so it cooks evenly',
            '1 potato, cubed (about 1 cup) — adds body; choose waxy potatoes that hold their shape',
            '1/2 cup green peas — fresh in season, or frozen; they add sweetness and colour',
            '2 tbsp ginger paste — fresh ginger crushed to a paste; gives warmth in place of onion and garlic',
            '1 tsp cumin seeds — for the tempering; they must brown slightly in the ghee',
            '2 bay leaves (tejpata) — Indian bay leaf is cinnamon-like, not the European bay',
            '2 dry red chillies — for fragrance and mild colour; break one for more heat',
            '4 cloves, 4 cardamom pods, 1 inch cinnamon — the whole spices (garam moshla) that perfume the ghee',
            '1/2 tsp turmeric — gives a golden colour',
            '1 tsp sugar, salt to taste — sugar is a Bengali balancing note; salt is added with the water',
            '1/4 cup (60 g) ghee, plus 1 tbsp to finish — pure cow ghee is essential for bhog flavour',
            '6 cups (1.4 litres) hot water — about 1:6 to the combined rice and dal; adjust at the end',
            '1 tsp lemon juice (optional) — gandhoraj lemon if you can get it, for a fragrant finish',
          ],
        },
      ],
      mise: [
        'Dry roast the moong dal in a pan on low heat for 4–5 minutes, stirring, until it is golden and smells nutty; cool it and wash it together with the rice, then drain thoroughly.',
        'Cut the cauliflower and potato into similar, medium-sized pieces so that they cook in the same time. Pat dry if washed.',
        'Prepare the ginger paste and measure the whole spices into a small bowl. Put the kettle on so you have hot water ready.',
        'Make sure no onion or garlic is used anywhere in the kitchen, including in other dishes cooked in the same vessels, if you are making it as bhog.',
      ],
      method: [
        {
          title: 'Roast the moong dal',
          text: 'Place the moong dal in a dry pan over low heat and stir continuously for 4–5 minutes until it turns golden and fragrant. Keep it moving so it colours evenly. Tip it onto a plate to cool for 5 minutes, then wash it with the rice and drain well.',
          why: 'Roasting is the secret of bhog khichuri: it gives a deep, toasted, nutty aroma and helps the dal hold some structure. Unroasted dal makes a flatter, mushier khichuri.',
          cue: 'The dal smells like roasted nuts and is the colour of golden straw, with no dark spots.',
        },
        {
          title: 'Fry the vegetables lightly',
          text: 'Heat 2 tablespoons of ghee in a heavy pot over medium heat. Add the potato and cauliflower and fry for 4–5 minutes, stirring, until they have pale golden edges but are still firm. Lift them out with a slotted spoon and set aside.',
          why: 'Lightly frying the vegetables gives them a sweet, caramelised flavour and keeps them from disintegrating in the long cooking. Fully cooking them now would turn them to mush later.',
          cue: 'The edges turn pale gold and the vegetables smell sweet and buttery but remain firm in the centre.',
        },
        {
          title: 'Bloom the whole spices',
          text: 'In the same pot, add 2 more tablespoons of ghee on medium-low heat. When shimmering, add the bay leaves, cumin, dry red chillies, cloves, cardamom and cinnamon. Fry for 30 seconds until fragrant. Add the ginger paste and turmeric and fry for 1 minute.',
          why: 'Whole spices need hot fat to release their oils. Frying them first creates the aromatic base that scents the whole khichuri. The ginger paste is the only pungent aromatic, so it must be well fried and no longer raw.',
          cue: 'The cumin sizzles and darkens, the cloves puff slightly, and the whole pot smells warmly fragrant, with no raw ginger smell.',
        },
        {
          title: 'Fry the rice and dal',
          text: 'Add the washed rice and roasted dal to the pot and stir gently for 2–3 minutes, coating each grain with ghee. The rice will turn slightly translucent at the edges and the mixture will smell nutty.',
          why: 'Frying the grains in ghee seals them, so they stay separate yet creamy. It also deepens the flavour and prevents the khichuri from turning gluey.',
          cue: 'The grains look glossy and slightly translucent at the edges, and you can hear a faint crackle from the pot.',
        },
        {
          title: 'Add water and seasonings',
          text: 'Pour in the 6 cups of hot water, add the salt and sugar, and stir well. Return the fried vegetables and add the green peas. Bring to a boil over high heat, then reduce to medium-low and cover with a lid slightly ajar.',
          why: 'Hot water keeps the temperature up, so the grains cook evenly and do not become hard. Sugar and salt added early blend into the grains. A slightly ajar lid prevents boil-over.',
          cue: 'The mixture comes to a steady boil with bubbles all over, and the vegetables are submerged and colourful.',
        },
        {
          title: 'Simmer until soft and thick',
          text: 'Cook on medium-low heat for 25–30 minutes, stirring every 5 minutes and scraping the base, until the rice and dal are completely soft and the khichuri is thick and porridge-like. If it thickens too soon, add hot water a half-cup at a time.',
          why: 'Long, gentle cooking breaks down the dal and rice into a creamy texture. Regular stirring prevents the thick starches from sticking and burning on the bottom.',
          cue: 'A spoon drawn through the khichuri leaves a slow trail that closes up, and the rice grains are soft enough to crush between your fingers.',
        },
        {
          title: 'Finish with ghee',
          text: 'Switch off the heat. Stir in the remaining tablespoon of ghee and the lemon juice (if using) and let the khichuri rest, covered, for 5 minutes before serving. Taste for salt; the khichuri should be well-seasoned.',
          why: 'Raw ghee added at the end keeps its sweet aroma, which heat would otherwise dull. Resting lets the khichuri settle into a smooth, spoonable consistency.',
          cue: 'The surface glistens with ghee, and the khichuri smells nutty and buttery, with a faint fragrance of cardamom.',
        },
      ],
      offering:
        'Offered to Durga on Ashtami and served in leaf plates to all, rich and poor, at the pandal; also prepared at Vishwakarma Puja.',
      ritual: [
        'Cook the bhog early in the morning after a bath, in a clean kitchen with no onion or garlic. Do not taste while cooking.',
        'Ladle the hot khichuri into a clean brass, bronze or earthen vessel reserved for the deity, add a little ghee on top and cover it with a fresh banana leaf or lid.',
        'Place the bhog before the Goddess at the time of the Ashtami bhog arati, along with labra, begun bhaja, chutney and payesh, each in a separate bowl. Sprinkle a little water around the offering.',
        'The priest offers the bhog with the appropriate mantras, while a lamp, incense and conch are shown. Devotees stand quietly with folded hands.',
        'Distribute as prasad on sal-leaf or banana-leaf plates, everyone sitting together, with the family serving the others first. This is the "bhog" meal of the pandal.',
      ],
      serving:
        'Serve piping hot on a leaf plate with a spoon of ghee on top, a portion of labra, crisp begun bhaja, tomato-date chutney and a small bowl of payesh. A papad and a lemon wedge are customary. At the pandal it is eaten with the hand, sitting in rows (pangat).',
      storage:
        'Best eaten the same day. Khichuri thickens as it cools; to reheat, add a few spoons of hot water per serving and warm on low heat, stirring, with a fresh spoon of ghee. Refrigerate for no more than a day.',
      troubleshooting: [
        {
          problem: 'The khichuri is too thick and stiff',
          fix: 'Rice and dal keep absorbing water. Stir in hot water, a half-cup at a time, and a spoon of ghee until it flows slowly. Bhog khichuri should be thick but not dry.',
        },
        {
          problem: 'The dal is still hard but the rice is mushy',
          fix: 'The dal was not roasted lightly enough or was too fresh. Next time, soak the roasted dal for 20 minutes before adding. For now, simmer longer with a splash of hot water.',
        },
        {
          problem: 'The bottom has caught and burnt',
          fix: 'Do not scrape the burnt layer. Transfer the unburnt khichuri to another pot gently. Next time use a heavier pot, keep the heat low, and stir more often.',
        },
        {
          problem: 'It lacks aroma and flavour',
          fix: 'Not enough ghee or the whole spices weren’t bloomed. Stir in a tablespoon of fresh ghee, a pinch of roasted cumin powder and a few drops of lemon.',
        },
      ],
      variations: [
        'Some households add a handful of fried raisins and cashews on top for a richer festival version.',
        'Add a few cubes of pumpkin or raw papaya instead of cauliflower during winter; cauliflower is a winter vegetable, so its use varies by season.',
        'For a stricter sattvic bhog, leave out the red chillies and use only black pepper, and omit the sugar.',
        'Vegan: replace ghee with coconut oil, though the flavour is quite different.',
        'Fasting-friendly: not suitable for grain-free fasts. For Ekadashi, use sabudana or samak rice instead.',
      ],
      tips: [
        'Roast the dal until golden; this deepens the flavour and is the single biggest difference from everyday khichuri.',
        'Add hot water, not cold, so the grains do not seize.',
        'Taste and balance with a pinch of sugar and a few drops of lemon at the end.',
        'Use short-grain aromatic rice; Gobindobhog is essential to the authentic aroma.',
      ],
      differs: 'Vegetable-rich, sugar pinch, Gobindobhog rice, ghee finish.',
    },
    {
      id: 'odisha-khechudi',
      region: 'Odisha (Puri)',
      culture: 'Jagannath temple — Abadha / Mahaprasad',
      title: 'Khechudi',
      intro:
        'Puri’s khechudi is a pale, plain, deeply fragrant rice and moong dal preparation made in an earthen pot with ghee, ginger and cumin. It is mild, with no chillies, no onion and no garlic, and is the heart of the Jagannath temple’s everyday offering.',
      story:
        'Khechudi is one of the simplest and most sacred dishes of the Jagannath temple in Puri. It is cooked in earthen pots on wood fires in the temple’s great kitchen, as part of the daily Abadha, the offering to Jagannath, Balabhadra and Subhadra. The Mahaprasad — which includes plain rice, khechudi, dalma and other items — is sold to pilgrims at the Ananda Bazaar, and it is believed that it is made sacred by being offered first and then received by Goddess Vimala.\n\nTemple tradition prescribes a mild and sattvic menu. The Jagannath kitchen does not use onion, garlic or vegetables introduced to India in recent centuries, such as potato, tomato and cauliflower, and its flavours are gentle: ghee, cumin, ginger, bay leaf and turmeric. Khechudi is therefore pale yellow, soft and fragrant rather than spicy. Pilgrims and Odia families often eat it with dalma, a vegetable and dal preparation, and with a spoon of ghee.\n\nCompared with Bengal’s bhoger khichuri it is much simpler — no vegetables, no sugar, and no whole-spice cocktail — and compared with Maharashtra’s Datta khichdi it is more fragrant with ginger and ghee. At home, Odia families make khechudi for festivals, on Sundays and as an offering on Thursday for Lakshmi.',
      serves: '5–6 servings',
      prep: '10 min',
      cook: '35 min',
      equipment: [
        'Earthen pot (handi) — gives the authentic smoky, earthy aroma; a heavy steel pot works if you do not have one',
        'Wooden ladle — to stir without scratching the pot and to mash lightly',
        'Small tadka pan — for the ghee tempering at the end if you prefer to add it separately',
        'Pot lid or plate — to cover the pot while it cooks and rests',
      ],
      ingredients: [
        {
          items: [
            '1 cup (200 g) short-grain rice — a short, aromatic or sona-type rice; it should break down gently into a creamy texture',
            '1/2 cup (100 g) moong dal, roasted — dry roast to a pale golden colour for a nutty flavour',
            '1 inch ginger, grated — gives a clean warmth in the absence of chillies',
            '1 tsp cumin seeds — the main spice; fry until fragrant in the ghee',
            '1 bay leaf — Indian bay (tejpatta) adds a subtle cinnamon note',
            '3 tbsp ghee — pure cow ghee; it is the primary flavour',
            '1/2 tsp turmeric — a pinch to colour; the khechudi should be pale yellow, not bright',
            '5 cups (1.2 litres) water — about 1:5 of combined rice and dal for a creamy, loose texture',
            'Salt, a pinch of sugar — salt to taste; sugar is optional and used by some families to balance',
          ],
        },
      ],
      mise: [
        'Dry roast the moong dal on low heat for 3–4 minutes until pale gold, then wash it with the rice until the water runs nearly clear.',
        'Grate the ginger and measure the cumin, bay leaf and turmeric into a small bowl.',
        'If using an earthen pot, soak it in water for an hour beforehand to prevent cracking, and dry the outside before putting it on the flame.',
        'Keep a kettle of hot water nearby to adjust the consistency as it cooks.',
      ],
      method: [
        {
          title: 'Roast and wash the dal',
          text: 'Roast the moong dal in a dry pan over low heat for 3–4 minutes, stirring, until it is pale gold and smells nutty. Cool slightly, then wash it with the rice in 2–3 changes of water until the water is nearly clear. Drain well.',
          why: 'Roasting adds aroma and helps the dal keep a gentle bite. Washing removes the surface starch that would otherwise make the khechudi pasty.',
          cue: 'The dal smells toasted and sweet; the rinse water turns clear after a few washes.',
        },
        {
          title: 'Heat the ghee and bloom the spices',
          text: 'Place the pot over medium-low heat and add 2 tablespoons of ghee. When it melts and shimmers, add the cumin and bay leaf and fry for 20–30 seconds. Add the grated ginger and fry for 30 seconds until its raw smell is gone.',
          why: 'Blooming the cumin and ginger in ghee releases their oils and builds the main fragrance. Burnt cumin tastes bitter, so keep the heat modest.',
          cue: 'The cumin turns a shade darker and sizzles, and the ginger smells warm rather than sharp.',
        },
        {
          title: 'Add the rice and dal',
          text: 'Add the washed rice and dal with the turmeric, and stir gently for 2 minutes so that the grains are coated with ghee. Do not brown them; the rice should remain pale.',
          why: 'Coating the grains in ghee keeps them separate and gives the khechudi its glossy softness. Browning would darken the colour and change the delicate temple flavour.',
          cue: 'The grains look glossy, smell nutty and are still pale with no brown spots.',
        },
        {
          title: 'Add water and salt',
          text: 'Pour in 5 cups of hot water, add the salt and optional sugar, and stir well. Bring to a boil over medium heat, skimming any foam that rises. Cover partially and reduce the heat to low.',
          why: 'Hot water avoids a temperature drop that makes grains cook unevenly. Skimming keeps the khechudi clean and light.',
          cue: 'The pot reaches a gentle rolling boil with small bubbles, and the surface is clear of foam.',
        },
        {
          title: 'Simmer slowly',
          text: 'Cook on low heat for 25–30 minutes, stirring every 5 minutes with a wooden ladle and scraping the base. Add hot water, a half-cup at a time, if the khechudi thickens too soon. The rice and dal should break down gradually.',
          why: 'Slow simmering in an earthen pot gives the khechudi its creamy texture without sticking. Hurrying on high heat leaves the dal hard and the base burnt.',
          cue: 'The grains are completely soft, the mixture is creamy and thick, and a spoon leaves a trail that slowly closes.',
        },
        {
          title: 'Mash lightly and rest',
          text: 'Press the khechudi lightly with the back of the ladle a few times to bring it together while leaving some grains visible. Cover and let it rest off the heat for 5 minutes. Taste for salt.',
          why: 'Light mashing releases starch, which gives khechudi its smooth, cohesive texture. Resting lets it settle and thicken to the right consistency.',
          cue: 'The khechudi is soft, creamy and pale yellow, with a spoon-coating consistency that is looser than a dry pulao.',
        },
        {
          title: 'Finish with ghee',
          text: 'Stir in the remaining tablespoon of ghee, folding it through gently so that it melts into the khechudi without breaking the soft grains. Taste once more for salt, and serve at once while piping hot, with an extra spoon of ghee on top of each portion.',
          why: 'Raw ghee added at the end keeps its sweet fragrance and gives the khechudi a rich, glossy finish.',
          cue: 'A glossy sheen on the surface and a buttery aroma rising from the pot.',
        },
      ],
      offering:
        'Cooked in earthen pots on wood fires in the Ananda Bazaar and offered to Jagannath; the offering is called Abadha.',
      ritual: [
        'Cook the khechudi after a bath, in a clean kitchen, using utensils reserved for the offering; do not taste it.',
        'Transfer it to a clean earthen bowl, brass plate or banana leaf, add a spoon of ghee on top and place a tulsi leaf if you offer to Jagannath.',
        'Set the offering before the deity with the dalma, plain rice and any other items, each in a separate dish. Sprinkle water around the plate in a circle.',
        'Chant the naivedyam verse or say "Shri Jagannathaya namah, naivedyam samarpayami", ringing a small bell, and wait for a few minutes while a lamp is shown.',
        'Share as prasadam with everyone present, on banana leaves or in clean earthen cups, without distinction. In Puri the Mahaprasad is eaten together by people of all communities.',
      ],
      serving:
        'Serve hot with dalma, a spoon of ghee, a piece of fried banana (kadali bhaja) and a sprinkle of salt. At the temple it is eaten with plain rice and a sweet kanika. A pinch of roasted cumin powder is a nice home touch.',
      storage:
        'Best on the day it is cooked. It thickens as it cools; reheat with a splash of hot water and a spoon of ghee on low heat. Keep refrigerated for no more than a day, and offer only fresh khechudi to the deity.',
      troubleshooting: [
        {
          problem: 'It is too watery',
          fix: 'Simmer uncovered for 5–10 minutes more, stirring, until it thickens. Khechudi continues to thicken off the heat, so stop while it is still slightly loose.',
        },
        {
          problem: 'It sticks to the bottom of the pot',
          fix: 'The heat was too high or the pot too thin. Lower the heat, stir more often, and use a heavy pot or an earthen pot placed on a tawa.',
        },
        {
          problem: 'It tastes plain',
          fix: 'Temple khechudi is deliberately mild. Add a pinch more salt, a little more ginger and a spoon of fresh ghee, rather than chillies.',
        },
        {
          problem: 'The earthen pot cracked',
          fix: 'It was not soaked or was heated too fast. Soak new earthen pots for an hour, begin on low heat and never put a cold pot on a high flame.',
        },
      ],
      variations: [
        'Some Odia families add a few cashews or raisins fried in ghee for festival days.',
        'Add a spoon of grated fresh coconut at the end for a softer sweetness, in some home versions.',
        'To follow Jagannath temple practice more strictly, do not add any vegetables, chillies, onion or garlic.',
        'Vegan: replace ghee with a little coconut oil, although the flavour changes noticeably.',
        'Fasting-friendly: not suitable for grain fasts. On Ekadashi, Odia families offer a sabudana or fruit preparation instead.',
      ],
      tips: [
        'Cook on low heat; earthen pots give the best aroma.',
        'Keep chilli minimal or leave it out — the temple’s food is mild.',
        'Use pure ghee at both the start and the end.',
        'Serve the khechudi hot; it loses its charm once it cools and stiffens.',
      ],
      differs: 'Plain, pale and ghee-forward; no vegetables or chillies.',
    },
    {
      id: 'maharashtra-datta',
      region: 'Maharashtra',
      culture: 'Datta temples — Gangapur, Audumbar; Datta Jayanti',
      title: 'Datta Khichdi (bhiksha)',
      intro:
        'A simple khichdi cooked with minimal spice and offered as bhiksha (alms) in memory of Dattatreya, who is Lord of alms-seekers. It is soft, mild and gently flavoured with ghee, cumin and ginger.',
      story:
        'Dattatreya, the combined form of Brahma, Vishnu and Shiva, is traditionally pictured as a wandering ascetic accompanied by four dogs and a cow, who lives on alms. Because of this, devotees of Datta in Maharashtra — at places such as Ganagapur, Audumbar, Narsobawadi and Girnar — keep the custom of madhukari, collecting a little cooked food from several houses, as a way to honour his life of renunciation. A simple khichdi, cooked in ghee and offered as bhiksha, is the signature dish of this tradition.\n\nOn Datta Jayanti, which falls on Margashirsha Purnima, temples and homes cook khichdi in large quantity and serve it free to all who come, as an act of annadan (gift of food). The dish is deliberately plain and gentle, because it is meant to be shared with whoever knocks at the door, and because a wandering ascetic’s food was never meant to be rich.\n\nIt resembles the Odia khechudi in its simplicity, but the Maharashtrian version uses a coarser, more rustic style and is often paired with kadhi or a sweet. It is much plainer than Bengal’s bhoger khichuri, which is a festival feast.',
      serves: '5 servings',
      prep: '10 min',
      cook: '30 min',
      equipment: [
        'Pressure cooker (2–3 litre) — the traditional and easiest way to get soft, creamy khichdi; a heavy pot also works with more time',
        'Small tadka pan — for the ghee tempering of cumin and ginger',
        'Wooden ladle — to mash gently and stir the finished khichdi',
        'Large serving vessel or banana leaf — for serving a crowd as bhiksha',
      ],
      ingredients: [
        {
          items: [
            '1 cup (200 g) rice — any short or medium rice; broken rice is traditional and cooks softly',
            '1/2 cup (100 g) moong dal — whole or split; wash well; split cooks to a softer, creamier result',
            '3 tbsp ghee — the main flavour, and the offering’s richness',
            '1 tsp cumin seeds — add to hot ghee and let sizzle until golden',
            '1 inch ginger, grated — optional but traditional; gives warmth',
            '1/2 tsp turmeric — for colour and its purifying association',
            '4 cups (950 ml) water — about 1:4 of combined grain to water for a soft, creamy khichdi',
            'Salt to taste — about 1 tsp; add with the water',
            'A pinch of hing — optional; omit if your family does not use it in offerings',
          ],
        },
      ],
      mise: [
        'Wash the rice and dal together in two or three changes of water until the water runs nearly clear, then drain well.',
        'Grate the ginger and measure the spices into a bowl. Keep the ghee at room temperature so it melts quickly.',
        'If serving a crowd, wash and prepare a second batch rather than doubling the water in one pot, which can make the khichdi pasty.',
        'Keep a kettle of hot water ready to adjust the consistency.',
      ],
      method: [
        {
          title: 'Wash the rice and dal',
          text: 'Place the rice and dal in a bowl and wash with cold water, rubbing gently with your fingers. Change the water 2–3 times until it is nearly clear, then drain in a sieve for 5 minutes.',
          why: 'Washing removes surface starch so the khichdi is soft and creamy rather than gluey. Draining prevents excess water diluting the ghee tempering.',
          cue: 'The rinse water runs clear instead of milky, and the grains feel clean and slightly slippery.',
        },
        {
          title: 'Heat the ghee',
          text: 'Place the pressure cooker pot over medium heat and add 2 tablespoons of ghee. Let it melt and shimmer for about 30 seconds. The ghee should be hot but not smoking, so that the cumin sizzles on contact.',
          why: 'Properly heated ghee blooms the spices quickly and gives the dish a clean, sweet aroma. Cold ghee leaves cumin raw, and smoking ghee burns it.',
          cue: 'The ghee melts to a clear liquid and gives off a nutty, buttery scent with a thin shimmer on top.',
        },
        {
          title: 'Temper with cumin, ginger and turmeric',
          text: 'Add the cumin seeds and let them sizzle for 15–20 seconds. Add the grated ginger, turmeric and hing (if using), and stir for 20 seconds. Watch carefully; turmeric burns in a flash.',
          why: 'Cumin releases its oils in hot ghee; ginger adds a warm, clean heat; turmeric colours and flavours. A short tempering keeps the khichdi light.',
          cue: 'The cumin turns golden, the ginger smells warm and the ghee turns a pale yellow.',
        },
        {
          title: 'Fry the rice and dal briefly',
          text: 'Add the drained rice and dal and stir gently for 1–2 minutes, coating the grains with the ghee. The rice should remain pale and just begin to smell nutty. Do not brown it.',
          why: 'Coating the grains in ghee keeps them separate and adds richness. Browning would change the plain, ascetic character of the dish.',
          cue: 'The grains are glossy and fragrant, still pale, with a faint nutty smell.',
        },
        {
          title: 'Add water and salt, then cook',
          text: 'Add 4 cups of hot water and the salt, stir once, and close the lid. Cook on medium-high heat for 3 whistles, then lower the heat to a minimum for 5 minutes and switch off. Allow the pressure to release naturally.',
          why: 'A little extra water gives a soft, almost porridge-like khichdi that is traditional for alms food, and natural pressure release finishes cooking without disturbing the grains.',
          cue: 'On opening, the khichdi is completely soft, with steam rising and a creamy surface.',
        },
        {
          title: 'Mash lightly',
          text: 'Open the cooker and stir the khichdi with a wooden ladle for about 30 seconds, pressing a few grains against the side so the mixture binds. Add a splash of hot water if it looks too thick. Taste and adjust the salt.',
          why: 'Light mashing blends the rice and dal into a cohesive, creamy mass. Over-mashing makes it gluey; under-mashing leaves the dal and rice separate.',
          cue: 'The khichdi slowly slides off the ladle in a soft ribbon and settles smoothly.',
        },
        {
          title: 'Finish with ghee and serve',
          text: 'Stir in the remaining tablespoon of ghee and serve immediately, topping each portion with a little extra ghee. For bhiksha, serve in banana-leaf cups or on clean plates to anyone who comes.',
          why: 'Fresh ghee on top brings back the aroma that cooking dulls. Serving hot matters: khichdi stiffens quickly as it cools.',
          cue: 'The surface shines with ghee, and a faint nutty, buttery steam rises from the pot.',
        },
      ],
      offering: 'Offered at Datta Jayanti and given to visitors as alms.',
      ritual: [
        'On Datta Jayanti morning, bathe, light a lamp before the image or paduka of Dattatreya, and cook the khichdi in a clean kitchen.',
        'Offer a portion on a banana leaf with a spoon of ghee, a tulsi leaf and a little water. Place it before the paduka with folded hands.',
        'Recite the Datta mantra "Digambara Digambara Shripad Vallabh Digambara" or the Datta Stavan while a lamp and incense are shown.',
        'Set aside the first portion as bhiksha for the first visitor, ascetic or hungry person who comes to the door, honouring the custom of madhukari.',
        'Share the rest with family and neighbours, and, if possible, serve at least a few guests outside the family as annadan.',
      ],
      serving:
        'Serve hot with a spoon of ghee, a wedge of lemon and a simple kadhi or buttermilk. In Maharashtra a papad and a sprinkle of fresh coriander often accompany it. For the temple annadan, it is served on banana leaves or paper plates to all who come.',
      storage:
        'Best eaten fresh. Refrigerate leftovers for up to a day and reheat with a splash of water and a teaspoon of ghee. Do not offer reheated food to the deity; cook fresh for the offering.',
      troubleshooting: [
        {
          problem: 'The khichdi is gluey',
          fix: 'The grains were not washed enough or were over-mashed. Wash until the water is nearly clear, mash lightly, and thin with hot water if needed.',
        },
        {
          problem: 'It is bland',
          fix: 'The salt may be too little or the ghee too sparing. Add a pinch of salt and another teaspoon of ghee, and a few drops of lemon on the plate.',
        },
        {
          problem: 'The dal is undercooked',
          fix: 'Dal needs longer than rice. Soak the dal for 20 minutes before cooking, or cook another whistle.',
        },
        {
          problem: 'It sticks to the bottom of the cooker',
          fix: 'Not enough ghee or water. Use a heavy-bottomed cooker, rinse the grains well, and make sure the water is at least four times the volume of the grains.',
        },
      ],
      variations: [
        'Some families add a handful of green peas or cubed pumpkin for a gentle vegetable khichdi; strictly, the alms version is plain.',
        'In some regions, a pinch of crushed black pepper replaces the ginger.',
        'Use broken rice (kani) for a softer, more rustic texture that is common in older Maharashtrian households.',
        'Vegan: replace ghee with coconut oil.',
        'Fasting-friendly: for a vrat, use bhagar (barnyard millet) and rock salt instead of rice and moong.',
      ],
      tips: [
        'Keep spicing minimal — it is meant as an alms meal.',
        'Always offer a portion to someone outside the family; this is the spirit of the dish.',
        'Cook fresh for the offering and do not reuse yesterday’s khichdi.',
        'Pair with kadhi or buttermilk for a complete, cooling meal.',
      ],
      differs: 'Minimal spicing; offered as bhiksha, not a feast.',
    },
  ],
}

export default recipe
