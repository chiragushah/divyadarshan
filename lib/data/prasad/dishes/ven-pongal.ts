import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'ven-pongal',
  name: 'Ven Pongal',
  alsoCalled: 'Khara Pongal · Huggi · வெண் பொங்கல்',
  category: 'Rice & Grain',
  summary: 'Peppery ghee rice-and-dal porridge served at South Indian temples every morning.',
  meaning:
    'Ven (white) pongal is the savoury twin of sweet pongal, and one of the most widely eaten temple prasadams of the South. Rice and split moong dal are cooked together until soft and creamy, then finished with a ghee tempering of black pepper, cumin, ginger, curry leaves and cashews. It is the morning offering at countless Tamil Perumal and Murugan shrines, the popular prasadam at Vaikuntha Ekadashi, and a household breakfast served with sambar and coconut chutney. Tamil temples keep it plain and peppery with plenty of ghee; Karnataka’s khara pongal, or huggi, adds a little coconut and green chilli and is cooked slightly drier. The dish is mild, sattvic, easy to digest and uses no onion or garlic.',
  variants: [
    {
      id: 'tamil-nadu-temple',
      region: 'Tamil Nadu',
      culture: 'Tamil temples and households',
      title: 'Temple Ven Pongal',
      intro:
        'Rice and moong dal cooked until completely soft, with ghee, pepper, cumin, ginger, curry leaves and cashews. It is served hot with sambar and coconut chutney, and its texture should be creamy and spoonable, almost like a thick porridge.',
      story:
        'Ven pongal is the dish that most people think of when they hear "Tamil temple prasadam" after puliyodarai. Early in the morning, after the first abhishekam, the temple kitchen offers hot ven pongal in generous quantities to the deity, and then serves it to devotees in donnai (leaf cups) or on banana leaves. At many Perumal temples it is cooked in huge bronze vessels, stirred with wooden paddles, and finished with ladles of fresh ghee.\n\nThe name is simple. Pongal means "to boil over" or "to overflow", and ven means white, to distinguish it from sakkarai (sweet) pongal. Despite the name, good ven pongal is pale yellow from the ghee and split moong dal. The seasonings are deliberately modest: whole black peppercorns, cumin seeds, fresh ginger and curry leaves, with cashews fried in ghee. There are no chillies in the strict temple version, so the heat comes only from pepper.\n\nIt is eaten on Vaikuntha Ekadashi, Pongal festival morning (alongside sakkarai pongal), Margazhi mornings and almost every festival. Compared with Karnataka’s khara pongal it uses no coconut and is softer and creamier; compared with khichdi of the North it is richer in ghee and much more gently spiced.',
      serves: '4 servings',
      prep: '10 min',
      cook: '30 min',
      equipment: [
        'Pressure cooker (3-litre) — cooks the rice and dal quickly into the soft, mashable texture needed; a heavy pot also works with more time',
        'Small tadka pan or ladle — for the ghee tempering; it should be small so the ghee is deep enough to fry the pepper and cumin',
        'Wooden masher or the back of a ladle — to mash the cooked rice and dal lightly until creamy',
        'Heavy pot (optional) — if cooking without a pressure cooker, a thick-bottomed pot prevents sticking',
      ],
      ingredients: [
        {
          items: [
            '1/2 cup (100 g) raw rice — short-grain raw rice such as sona masuri or ponni; it breaks down into the right creaminess',
            '1/4 cup (50 g) split yellow moong dal — dry roast it for 2 minutes first for a nutty aroma and better texture',
            '3–4 cups (720–960 ml) water — about 1:6 total grain-to-water for the soft, porridge-like temple texture',
            '3 tbsp ghee — use pure cow ghee; it is the main flavour and cannot be replaced by oil',
            '1 tsp black peppercorns, coarsely crushed — crush just before using, since pre-ground pepper is flat',
            '1 tsp cumin seeds — they must sizzle and brown lightly in the ghee',
            '1 inch fresh ginger, finely chopped — gives freshness; chop small so it is not chewy',
            '10 curry leaves — fresh and dry of water; they crisp in the ghee',
            '8 cashews, broken in halves — fried golden for a sweet crunch',
            'A pinch of hing (asafoetida) — optional; many temple and Brahmin kitchens omit it, so leave it out if that is your custom',
            'Salt to taste — about 1 tsp; add before pressure cooking so it seasons evenly',
          ],
        },
      ],
      mise: [
        'Wash the rice and dal together in 2–3 changes of water until the water runs nearly clear; drain well.',
        'Crush the peppercorns coarsely in a mortar and chop the ginger fine. Have the curry leaves and cashews ready in a small bowl.',
        'Dry roast the moong dal in a pan for 2 minutes on low heat until just fragrant, then cool it and wash it with the rice.',
        'Warm the water slightly so the cooker comes to pressure sooner; keep an extra cup of hot water on the side for adjusting consistency.',
      ],
      method: [
        {
          title: 'Roast the dal',
          text: 'Place the moong dal in a dry pan over low heat and stir constantly for about 2 minutes until it smells nutty and turns the faintest shade of gold. Do not let it brown. Transfer to a plate and let it cool slightly.',
          why: 'Roasting dries the dal and adds a gentle, toasted flavour that makes pongal taste richer. Unroasted dal can leave a slightly raw, beany edge. Brown dal tastes bitter.',
          cue: 'The dal smells like roasted nuts and looks a very light golden colour; it does not turn dark.',
        },
        {
          title: 'Wash and combine',
          text: 'Wash the rice and the roasted dal together in a bowl with 2–3 changes of water, rubbing gently, until the water is nearly clear. Drain, and add to the pressure cooker with 3 1/2 cups of water and salt.',
          why: 'Washing removes surface starch so the grains do not turn gluey. Adding salt before cooking seasons the grains evenly, which is hard to fix afterwards.',
          cue: 'The rinsing water changes from milky to slightly cloudy and then nearly clear.',
        },
        {
          title: 'Pressure-cook until very soft',
          text: 'Close the lid and cook on medium-high heat for 4 whistles, then lower the heat to the minimum for 5 minutes, and switch off. Let the pressure release naturally, which takes 10–15 minutes. Open the lid carefully.',
          why: 'Pongal needs to be much softer than normal rice, and natural release lets the grains keep absorbing steam and become creamy. A quick release can leave a few firm grains.',
          cue: 'When you press a grain between your fingers it squashes completely, and the mixture looks like a thick porridge.',
        },
        {
          title: 'Mash lightly',
          text: 'With the back of a ladle or a wooden masher, press and stir the hot rice and dal for about a minute until they combine into a creamy mass with some grains still visible. If it feels too thick, add 1/2 cup of hot water.',
          why: 'Mashing releases the starch, which gives pongal its signature creamy, cohesive texture. Over-mashing makes it gluey and heavy.',
          cue: 'The pongal falls from the ladle slowly in a thick, soft ribbon and holds a faint peak.',
        },
        {
          title: 'Fry the cashews in ghee',
          text: 'In a small tadka pan, heat 3 tablespoons of ghee on medium heat for 30 seconds. Add the cashews and fry for about a minute, stirring, until they turn a light golden brown. Lift them out onto a plate, leaving the ghee in the pan.',
          why: 'Cashews burn in seconds after turning gold, and frying them first lets them cook gently in the ghee. They are removed so they stay crunchy and do not soak in the porridge.',
          cue: 'The cashews turn golden at the edges, smell sweet and buttery, and the ghee bubbles lightly.',
        },
        {
          title: 'Temper with pepper, cumin and ginger',
          text: 'Reduce the heat to medium-low. In the same ghee add the crushed pepper and cumin and fry for 20–30 seconds until the cumin sizzles and browns slightly. Add the ginger, curry leaves and hing (if using) and fry for 20 seconds more.',
          why: 'Pepper and cumin need to bloom in hot ghee to release their oils. If the ghee is too hot they burn and taste bitter; if it is too cool they stay raw and the pongal tastes flat.',
          cue: 'The cumin turns a shade darker and the ghee smells peppery, with curry leaves crisp and translucent.',
        },
        {
          title: 'Pour the tempering over the pongal',
          text: 'Pour the hot ghee and all the spices over the mashed pongal in the pot, then add the fried cashews. Stir well for about a minute to distribute evenly. Cover and let it rest for 5 minutes.',
          why: 'The hot ghee coats the grains so they stay moist and glossy, and carries the pepper aroma through the whole pot. Stirring evenly avoids pockets of bland pongal.',
          cue: 'The pongal looks glossy and golden, the pepper pieces are visible and the pot smells strongly of ghee and pepper.',
        },
        {
          title: 'Adjust consistency and salt',
          text: 'Taste and add salt if needed. If the pongal has thickened, stir in 1/4 cup of hot water to loosen it. Serve immediately, because pongal thickens as it cools. Top with another spoon of ghee if you like.',
          why: 'Pongal stiffens rapidly as it cools, so serving it slightly looser than you want ensures it stays creamy on the plate. The extra ghee is a temple custom, not a necessity.',
          cue: 'A spoonful holds its shape briefly and then settles; it is soft, glossy and pale yellow.',
        },
      ],
      offering: 'Served as the first naivedyam at the morning pooja and on Vaikuntha Ekadashi.',
      ritual: [
        'Cook the pongal early in the morning after a bath, in a clean kitchen, before eating anything yourself.',
        'Transfer a portion to a clean bronze, brass or steel plate and add a little more ghee on top to make it shine. Place a tulsi leaf if offering to Vishnu.',
        'Place the plate before the deity with a small cup of water and sprinkle water around it in a circle, saying the naivedyam mantra or simply "Perumal thiruvadigalukku samarpanam".',
        'Show a lamp and incense, ring the bell, and stand quietly for a minute. On Vaikuntha Ekadashi, pongal is offered after the Paramapada Vasal opening in many temples.',
        'Distribute to family and neighbours on banana leaves or in leaf cups, serving the elders first, and take the last portion yourself.',
      ],
      serving:
        'Serve hot on a banana leaf with a ladle of sambar, coconut chutney and a spoon of ghee on top. A crisp medu vadai on the side is the classic pairing, and in winter mornings a cup of filter coffee finishes the meal. Serve in small portions at festivals, since the dish is rich.',
      storage:
        'Eat the same day for best texture. Pongal thickens and firms up in the fridge; to reheat, add 2–3 tablespoons of hot water per cup and warm on low heat, stirring, with a fresh spoon of ghee. Refrigerate no longer than a day.',
      troubleshooting: [
        {
          problem: 'The pongal is too thick and dry',
          fix: 'Rice and dal absorb more water as they sit. Stir in hot water, a quarter cup at a time, and add a little ghee. Next time use a 1:6 ratio of grain to water.',
        },
        {
          problem: 'It is sticky and gluey',
          fix: 'It has been over-mashed or the rice was too starchy. Wash the grains well and mash for only a minute. Adding a little hot water and stirring gently can loosen it.',
        },
        {
          problem: 'The pepper is harsh or bitter',
          fix: 'The ghee was too hot and burned the pepper, or the pepper was crushed too finely. Temper on medium-low heat and crush coarsely. A spoon of fresh ghee stirred in softens the bite.',
        },
        {
          problem: 'It tastes bland',
          fix: 'Salt and ghee are the usual culprits. Add a pinch of salt and another teaspoon of ghee, and make sure the pepper and ginger were fried and not just stirred in raw.',
        },
      ],
      variations: [
        'Add a pinch of turmeric to the cooker for a golden colour; this is common in some homes though not in strict temple versions.',
        'Some households use a 1:1 ratio of rice to dal for a protein-rich, creamier pongal.',
        'For a richer festival version, replace 1/4 of the water with milk for a softer, whiter pongal.',
        'Vegan: replace ghee with coconut oil, though the flavour changes markedly.',
        'Fasting-friendly: not suitable for Ekadashi fasts that avoid grains; make a samak (barnyard millet) pongal with rock salt, instead.',
      ],
      tips: [
        'Pongal thickens quickly, so keep a cup of hot water on the side.',
        'Crush the pepper coarsely just before frying for the best aroma.',
        'Use fresh ghee: it makes the dish; refined oil cannot replace it.',
        'Let the pressure release naturally for the softest, creamiest result.',
      ],
    },
    {
      id: 'karnataka-huggi',
      region: 'Karnataka',
      culture: 'Kannada households — Sankranti, Sri Rama Navami',
      title: 'Khara Pongal / Huggi',
      intro:
        'The Karnataka version adds a little grated coconut and a green chilli, and is cooked slightly drier than the Tamil temple pongal. It is served with gojju or coconut chutney, and the texture is looser and more grain-defined.',
      story:
        'In Karnataka the same rice-and-dal dish is called khara pongal (khara meaning spicy or savoury, to separate it from sihi, or sweet, pongal) and, in older speech, huggi. It is a standard breakfast in Kannada homes and a very popular festival offering at Sankranti, Rama Navami and in temple kitchens, where it is cooked in large vessels and handed out with a sweet such as sihi pongal or kesari bath.\n\nThe Kannada cook leans on coconut and a green chilli where the Tamil cook relies on pepper alone. A spoon of freshly grated coconut is stirred in at the end, and a green chilli is added to the tempering, which makes the dish a little fresher and more fragrant. It is cooked firmer, so each grain is visible, and is traditionally served with a ladle of gojju (a sweet-sour-spicy relish) or coconut chutney.\n\nThe dish is also associated with the famous "chow chow bath", the Bengaluru breakfast combo of khara bath and kesari bath, and it is a staple in the Udupi tradition. Many Vaishnava homes keep it strictly onion-free for festival days.',
      serves: '4 servings',
      prep: '10 min',
      cook: '30 min',
      equipment: [
        'Pressure cooker (3-litre) — the quickest route to well-cooked, soft grains; a heavy pot also works',
        'Small tadka pan — for the ghee tempering; keep it small so the ghee is deep enough to fry the spices',
        'Wooden ladle — to fold the tempering through and lightly mash',
        'Grater — for fresh coconut; frozen grated coconut works if thawed',
      ],
      ingredients: [
        {
          items: [
            '1/2 cup (100 g) raw rice — any short or medium grain rice such as sona masuri; it cooks to a soft but separate texture',
            '1/4 cup (50 g) yellow moong dal — dry roast for 2 minutes for a nutty flavour',
            '3 cups (720 ml) water — a slightly drier 1:4 ratio than the Tamil version, giving distinct grains',
            '3 tbsp ghee — pure ghee for flavour; oil can be partly used in daily cooking',
            '1 tsp black pepper, coarsely crushed — fresh crushing gives a warmer aroma',
            '1 tsp cumin seeds — they should sizzle and brown lightly',
            '1 green chilli, slit — a characteristic Kannada addition; deseed for mild',
            '1 inch ginger, finely chopped — for fresh, clean heat',
            '2 tbsp freshly grated coconut — add at the end for sweetness and moisture',
            '10 curry leaves, 8 cashews — curry leaves crisp in the ghee; cashews fry golden',
            'Salt to taste — about 1 tsp, added before cooking',
          ],
        },
      ],
      mise: [
        'Roast the moong dal for 2 minutes until fragrant, then wash it with the rice until the water is nearly clear.',
        'Grate the coconut, slit the chilli, chop the ginger fine and crush the pepper coarsely.',
        'Measure out the water and keep a cup of hot water aside for adjusting the texture.',
        'Prepare a chutney or gojju to serve alongside; the pongal tastes best with something tangy.',
      ],
      method: [
        {
          title: 'Roast and wash the dal',
          text: 'Dry roast the moong dal in a pan over low heat for 2 minutes, stirring constantly, until it smells nutty but has not coloured. Then wash it together with the rice until the water is nearly clear, and drain well.',
          why: 'Roasting gives the dish its characteristic toasted fragrance and helps the dal cook to a soft texture. Washing removes excess starch, so the rice stays distinct rather than glutinous.',
          cue: 'The dal smells like roasted nuts, and the rinse water turns from milky to almost clear.',
        },
        {
          title: 'Cook the rice and dal',
          text: 'Place the washed rice and dal in a pressure cooker with 3 cups of water and the salt. Cook for 3 whistles on medium-high heat, then switch off and let the pressure release naturally for about 10 minutes before opening.',
          why: 'Khara pongal is meant to be softer than plain rice but more textured than Tamil ven pongal, so a bit less water and one fewer whistle gives the right result.',
          cue: 'The grains are completely soft but still visible, and the mixture is thick but flows slowly when stirred.',
        },
        {
          title: 'Mash gently',
          text: 'Use the back of a ladle to press the cooked rice and dal just a few times, about 30 seconds, to bring it together while keeping most grains whole. If it looks too thick, add 1/4 cup hot water.',
          why: 'Light mashing gives a binding creaminess without losing the grainy texture that distinguishes huggi from the smoother Tamil version.',
          cue: 'The mixture is cohesive and spoonable, with whole grains visible and a soft, slightly sticky surface.',
        },
        {
          title: 'Fry the cashews',
          text: 'Heat the ghee in a small pan over medium heat for 30 seconds. Add the cashews and fry for about a minute until golden brown, stirring constantly. Lift them out with a slotted spoon and set aside.',
          why: 'Frying cashews separately prevents them from burning in the hot spices and keeps them crunchy.',
          cue: 'The cashews are a light golden brown and smell buttery and sweet.',
        },
        {
          title: 'Temper the spices',
          text: 'In the same ghee, on medium-low heat, add the cumin and crushed pepper and let them sizzle for 20 seconds. Add the green chilli, ginger and curry leaves and fry for 30 seconds until the chilli blisters and the leaves turn crisp.',
          why: 'Cumin and pepper need to bloom in hot ghee to release their aroma; the green chilli, ginger and curry leaves add the fresh top notes that make the Kannada version distinctive.',
          cue: 'The ghee smells peppery and nutty, the cumin darkens slightly and the leaves are crisp.',
        },
        {
          title: 'Combine with the pongal',
          text: 'Pour the sizzling tempering and the fried cashews over the pongal. Stir well for a minute to distribute evenly, scraping the bottom of the pot. Add the grated coconut and stir again gently.',
          why: 'The hot ghee coats the grains and infuses them with flavour. Adding the coconut at the end preserves its freshness and keeps the pongal moist.',
          cue: 'The pongal looks glossy and speckled with pepper, cashew and coconut, and smells rich with ghee and ginger.',
        },
        {
          title: 'Rest and adjust',
          text: 'Cover the pot and let the pongal rest for 5 minutes so the flavours settle. Taste and add salt if needed. If it has thickened, stir in a few tablespoons of hot water. Serve hot.',
          why: 'Resting lets the grains absorb the aromatic ghee and the coconut moisture. Pongal stiffens as it cools, so a slightly looser consistency at the pot is ideal.',
          cue: 'The pongal is soft and glossy, slightly runny when stirred, and settles to a spoonable thickness on the plate.',
        },
      ],
      offering: 'Offered at Sankranti and temple festivals.',
      ritual: [
        'Cook the pongal in the morning after a bath, in a clean kitchen, and do not taste it before it is offered.',
        'Place a portion on a banana leaf or a clean bronze or steel plate, with a small spoon of ghee and a cup of water, before the deity.',
        'Say the naivedyam prayer or simply offer it with folded hands, sprinkling water around the plate in a circle.',
        'Light a lamp and incense and ring the bell, then close your eyes for a minute while the offering is made.',
        'Share the prasadam with the family and neighbours, serving it on banana leaves with chutney, and giving the first portion to the eldest.',
      ],
      serving:
        'Serve hot on a banana leaf with coconut chutney or gojju and a spoon of ghee on top. In Bengaluru it is typically paired with a portion of sweet kesari bath on the same plate. A crisp vada or a cup of filter coffee makes it a complete festive breakfast.',
      storage:
        'Best eaten within a few hours. Refrigerate leftovers up to a day and reheat with a splash of hot water and a teaspoon of ghee, stirring until soft. Add fresh coconut after reheating, not before.',
      troubleshooting: [
        {
          problem: 'The pongal is mushy and has lost its grain',
          fix: 'Too much water or over-mashing. Use the 1:4 ratio and press only briefly. A spoonful of cooked rice stirred in can restore some texture.',
        },
        {
          problem: 'It tastes plain even after salting',
          fix: 'The tempering was not hot enough, or the ginger and chilli were not fried properly. Add a second small tempering of ghee, cumin and pepper over the top.',
        },
        {
          problem: 'The coconut tastes stale',
          fix: 'Old or poorly stored coconut. Always use fresh grated coconut, or thawed frozen, and add it at the end.',
        },
        {
          problem: 'Too much heat',
          fix: 'Deseed the green chilli, or reduce it to half. Stir in a teaspoon of ghee and a spoon of plain curd on the plate to cool the dish.',
        },
      ],
      variations: [
        'Add a handful of grated carrot or green peas to the cooker for a vegetable pongal, a common home variant.',
        'Some Udupi kitchens add a pinch of hing and a few cashews, but omit the coconut entirely for a drier, simpler version.',
        'For a sattvic temple-style version, leave out the green chilli and hing and use only pepper and ginger.',
        'Vegan: replace ghee with coconut oil.',
        'Jain-friendly: omit ginger and hing as your tradition requires.',
      ],
      tips: [
        'Cook it slightly drier than the Tamil version: the grains should be soft but separate.',
        'Add fresh coconut after the tempering, not before, to keep it moist and sweet.',
        'Make a good chutney or gojju; the pongal is mild and relies on its accompaniment.',
        'Use freshly crushed pepper; it makes a huge difference.',
      ],
      differs: 'Slightly drier, with coconut and green chilli; served with gojju or chutney.',
    },
  ],
}

export default recipe
