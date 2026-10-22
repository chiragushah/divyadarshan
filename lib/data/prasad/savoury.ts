import type { PrasadRecipe } from './types'

// Rice, pulses and other savoury (and mixed) temple offerings.

export const SAVOURY: PrasadRecipe[] = [
  // ───────────────────────────── PULIYODARAI ─────────────────────────────
  {
    id: 'puliyodarai',
    name: 'Puliyodarai',
    alsoCalled: 'Pulihora · Puliyogare · Tamarind rice · புளியோதரை',
    category: 'Rice & Grain',
    summary: 'Tangy tamarind rice — the classic Vaishnava temple prasadam of the South.',
    meaning:
      'Tamarind rice keeps for a day without refrigeration, which made it the pilgrim’s food and the temple’s favourite. Tamil Nadu’s version is dark, oily and spiced with a freshly ground masala; Andhra’s pulihora is brighter with green chillies; Karnataka’s puliyogare uses a coconut-sesame powder.',
    variants: [
      {
        id: 'tamil-nadu',
        region: 'Tamil Nadu',
        culture: 'Sri Vaishnava temples — Srirangam, Alagar Koil, Vaikuntha Ekadashi',
        title: 'Puliyodarai (Puliyogarai)',
        intro:
          'Cooked in sesame (gingelly) oil with a fresh-roasted spice powder of coriander seed, chana dal, red chilli, sesame and fenugreek. The pulikachal (paste) keeps for weeks.',
        serves: '4–5 servings',
        prep: '20 min',
        cook: '30 min',
        ingredients: [
          {
            group: 'Spice powder',
            items: [
              '2 tbsp coriander seeds',
              '1 tbsp chana dal',
              '1 tsp urad dal',
              '6–8 dry red chillies',
              '1 tsp white sesame seeds',
              '1/2 tsp fenugreek seeds',
              '1/2 tsp black peppercorns',
              'A small piece of hing',
            ],
          },
          {
            group: 'Pulikachal and rice',
            items: [
              'Lemon-sized ball of tamarind (about 50 g)',
              '1/4 cup gingelly (sesame) oil',
              '1 tsp mustard seeds',
              '2 tbsp chana dal and 1 tbsp urad dal',
              '2 tbsp peanuts',
              '3 dry red chillies, 15 curry leaves',
              '1/2 tsp turmeric, 1/4 tsp hing',
              '1 tbsp jaggery, salt',
              '2 cups cooked rice, cooled and spread out',
            ],
          },
        ],
        method: [
          'Dry roast all the spice-powder ingredients separately until aromatic; cool and grind to a coarse powder.',
          'Soak the tamarind in 1 cup of warm water, squeeze and strain for thick juice.',
          'Heat the oil in a kadai; add the mustard, dals, peanuts, red chillies and curry leaves and fry until golden.',
          'Add the turmeric and hing, then the tamarind juice with the jaggery and salt. Cook on medium heat for 12–15 minutes until it is a thick paste with oil separating.',
          'Add 3 tbsp of the spice powder and cook 2 more minutes. This is the pulikachal.',
          'Spread the rice on a plate, drizzle with 1 tbsp sesame oil and mix in 4–5 tbsp of pulikachal until every grain is coated.',
          'Rest for 30 minutes before serving so the flavours deepen.',
        ],
        offering:
          'Offered to Perumal at the ucha-kala (noon) pooja; distributed in donnai (leaf cups) to devotees.',
        tips: ['Use gingelly oil; it gives the unmistakable temple aroma.'],
        differs: 'Dark, spice-powder-based, sesame-oil rich.',
      },
      {
        id: 'andhra-pulihora',
        region: 'Andhra Pradesh & Telangana',
        culture: 'Telugu households and temples — Ugadi, Sankranti, Venkateswara',
        title: 'Pulihora',
        intro:
          'Brighter and fresher: turmeric-yellow rice with green chillies, ginger and peanuts, with a tamarind–jaggery paste. No spice powder.',
        serves: '4–5 servings',
        prep: '15 min',
        cook: '20 min',
        ingredients: [
          {
            items: [
              '2 cups cooked rice, cooled',
              '1 lemon-sized ball of tamarind, extracted into thick paste (about 1/2 cup)',
              '1/4 cup sesame oil (or groundnut oil)',
              '1 tsp mustard seeds, 1 tsp cumin',
              '2 tbsp chana dal, 1 tbsp urad dal, 2 tbsp peanuts',
              '4 green chillies, slit; 2 dry red chillies',
              '1 tsp grated ginger, 15 curry leaves',
              '1/2 tsp turmeric, a pinch of hing',
              '1 tsp jaggery, salt',
            ],
          },
        ],
        method: [
          'Heat the oil, fry the mustard and cumin until they splutter, then the dals and peanuts until golden.',
          'Add the green chillies, red chillies, ginger and curry leaves and fry briefly.',
          'Add the turmeric and hing, then pour in the tamarind paste with the jaggery and salt. Cook 8–10 minutes until thick and oily.',
          'Cool the paste for 5 minutes and mix with the rice, folding gently so the grains stay whole.',
          'Rest 20 minutes.',
        ],
        offering: 'Offered at Ugadi, Sankranti and Venkateswara festivals, along with bobbatlu and payasam.',
        tips: ['Add the paste to cooled rice. Hot rice turns mushy.'],
        differs: 'Fresh green chilli and ginger; no ground masala.',
      },
      {
        id: 'karnataka-puliyogare',
        region: 'Karnataka',
        culture: 'Kannada households and Melkote Cheluvanarayana temple',
        title: 'Puliyogare',
        intro:
          'Karnataka’s puliyogare uses a gojju (paste) with a coconut-sesame powder, and often curry leaves and groundnuts. It is nutty and slightly sweet.',
        serves: '4–5 servings',
        prep: '20 min',
        cook: '25 min',
        ingredients: [
          {
            group: 'Powder',
            items: [
              '2 tbsp coriander seeds',
              '1 tbsp chana dal, 1 tbsp urad dal',
              '1 tbsp white sesame',
              '3 tbsp dry coconut, grated',
              '6 dry red chillies',
              '1/2 tsp fenugreek',
            ],
          },
          {
            group: 'Gojju and rice',
            items: [
              '50 g tamarind (extract thick paste)',
              '3 tbsp oil',
              '1 tsp mustard, 2 tbsp peanuts, 1 tbsp chana dal',
              '15 curry leaves, 1/2 tsp turmeric',
              '1 tbsp jaggery, salt',
              '2 cups cooked rice',
            ],
          },
        ],
        method: [
          'Dry roast all powder ingredients, grinding to a fine powder.',
          'Heat oil, temper the mustard, peanuts, dal and curry leaves.',
          'Add the tamarind paste with turmeric, jaggery and salt; cook until thick.',
          'Add the powder and mix; cook another 3 minutes.',
          'Combine 4–5 tbsp of the gojju with the rice.',
        ],
        offering: 'Offered at Melkote and other Karnataka Vaishnava temples.',
        tips: ['The gojju keeps in the fridge for 2 weeks.'],
        differs: 'Coconut-sesame powder; slightly sweeter.',
      },
    ],
  },

  // ───────────────────────────── VEN PONGAL ─────────────────────────────
  {
    id: 'ven-pongal',
    name: 'Ven Pongal',
    alsoCalled: 'Khara Pongal · Huggi · வெண் பொங்கல்',
    category: 'Rice & Grain',
    summary: 'Peppery ghee rice-and-dal porridge served at South Indian temples every morning.',
    meaning:
      'Ven (white) pongal is the savoury twin of sweet pongal. It is the temple breakfast of Tamil Nadu and the popular prasadam at Vaikuntha Ekadashi. Black pepper, cumin and ginger make it a warming dish.',
    variants: [
      {
        id: 'tamil-nadu-temple',
        region: 'Tamil Nadu',
        culture: 'Tamil temples and households',
        title: 'Temple Ven Pongal',
        intro:
          'Rice and moong dal cooked until completely soft, with ghee, pepper, cumin, ginger, curry leaves and cashews. It is served with sambar and coconut chutney.',
        serves: '4 servings',
        prep: '10 min',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1/2 cup raw rice',
              '1/4 cup yellow moong dal',
              '3–4 cups water',
              '3 tbsp ghee',
              '1 tsp black peppercorns, coarsely crushed',
              '1 tsp cumin seeds',
              '1 inch ginger, finely chopped',
              '10 curry leaves, 8 cashews, pinch of hing',
              'Salt',
            ],
          },
        ],
        method: [
          'Dry roast the moong dal for 2 minutes. Wash with the rice.',
          'Pressure-cook with 3.5 cups water and salt until very soft (4 whistles). Mash lightly.',
          'Heat the ghee and fry the cashews until golden; add pepper, cumin, ginger, curry leaves and hing.',
          'Pour over the pongal and mix. Add a little hot water if it has thickened.',
        ],
        offering: 'Served as the first naivedyam at the morning pooja and on Vaikuntha Ekadashi.',
        tips: ['Pongal should be soft and creamy, falling off the ladle slowly.'],
      },
      {
        id: 'karnataka-huggi',
        region: 'Karnataka',
        culture: 'Kannada households — Sankranti, Sri Rama Navami',
        title: 'Khara Pongal / Huggi',
        intro:
          'The Karnataka version adds a little grated coconut and a green chilli, and is cooked slightly drier. It is served with gojju or coconut chutney.',
        serves: '4 servings',
        prep: '10 min',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1/2 cup rice, 1/4 cup moong dal',
              '3 cups water',
              '3 tbsp ghee',
              '1 tsp pepper, 1 tsp cumin',
              '1 green chilli, 1 inch ginger',
              '2 tbsp grated coconut',
              '10 curry leaves, salt, cashews',
            ],
          },
        ],
        method: [
          'Cook the rice and dal with the water and salt until soft.',
          'Temper ghee with cumin, pepper, chilli, ginger, curry leaves and cashews.',
          'Add the coconut and mix with the pongal.',
        ],
        offering: 'Offered at Sankranti and temple festivals.',
        tips: ['Cook it slightly drier than the Tamil version.'],
      },
    ],
  },

  // ───────────────────────────── KHICHDI ─────────────────────────────
  {
    id: 'khichdi-bhog',
    name: 'Khichdi Bhog',
    alsoCalled: 'Bhoger Khichuri · Khechudi · Datta Khichdi · খিচুড়ি',
    category: 'Rice & Grain',
    summary: 'Sanctified rice and dal — Durga Puja’s bhog in Bengal, Jagannath’s khechudi, and Datta’s alms khichdi.',
    meaning:
      'Rice and lentils cooked together is the simplest form of a complete meal, and across India it is offered to the deity as the plainest bhog. The Bengal version is rich with ghee, vegetables and whole spices; the Odisha khechudi is plainer and ghee-forward; and the Maharashtrian Datta khichdi is the “alms” offering to Dattatreya.',
    variants: [
      {
        id: 'bengal-bhoger-khichuri',
        region: 'West Bengal',
        culture: 'Bengali households and pandals — Durga Puja Ashtami, Vishwakarma Puja',
        title: 'Bhoger Khichuri',
        intro:
          'Gobindobhog rice and roasted moong dal cooked soft with cauliflower, potato, peas and a handful of whole spices, finished with ghee. It is served with labra, begun bhaja, chutney and payesh.',
        serves: '6–8 servings',
        prep: '20 min',
        cook: '40 min',
        ingredients: [
          {
            items: [
              '1 cup Gobindobhog rice, washed',
              '1/2 cup moong dal, dry roasted until golden',
              '1 small cauliflower, cut in florets; 1 potato, cubed; 1/2 cup green peas',
              '2 tbsp ginger paste',
              '1 tsp cumin seeds, 2 bay leaves, 2 dry red chillies, 4 cloves, 4 cardamom, 1 inch cinnamon',
              '1/2 tsp turmeric, 1 tsp sugar, salt',
              '1/4 cup ghee, plus 1 tbsp to finish',
              '6 cups hot water',
              '1 tsp gandhoraj lemon (optional) or fresh lemon juice',
            ],
          },
        ],
        method: [
          'Wash the roasted dal and rice together and drain.',
          'Heat 2 tbsp ghee. Lightly fry the potato and cauliflower to pale gold; remove.',
          'In the same ghee, add the whole spices, cumin and bay leaves. Add the ginger paste and turmeric.',
          'Add the rice-dal mixture and fry for 2–3 minutes.',
          'Add the hot water, salt and sugar; return the vegetables and the peas. Cover and cook on medium-low for 25–30 minutes until the rice and dal are completely soft and the khichuri is thick and porridge-like.',
          'Stir in the remaining ghee. Rest 5 minutes before serving.',
        ],
        offering:
          'Offered to Durga on Ashtami and served in leaf plates to all, rich and poor, at the pandal; also prepared at Vishwakarma Puja.',
        tips: [
          'Roast the dal until golden; this deepens the flavour.',
          'Add hot water, not cold, so the grains do not seize.',
        ],
        differs: 'Vegetable-rich, sugar pinch, Gobindobhog rice, ghee finish.',
      },
      {
        id: 'odisha-khechudi',
        region: 'Odisha (Puri)',
        culture: 'Jagannath temple — Abadha / Mahaprasad',
        title: 'Khechudi',
        intro:
          'Puri’s khechudi is a pale, plain, deeply fragrant rice and moong dal preparation made in an earthen pot with ghee, ginger and cumin. No chillies, no onion, no garlic.',
        serves: '5–6 servings',
        prep: '10 min',
        cook: '35 min',
        ingredients: [
          {
            items: [
              '1 cup rice (short grain)',
              '1/2 cup moong dal, roasted',
              '1 inch ginger, grated',
              '1 tsp cumin seeds',
              '1 bay leaf',
              '3 tbsp ghee',
              '1/2 tsp turmeric',
              '5 cups water, salt, pinch of sugar',
            ],
          },
        ],
        method: [
          'Wash the rice and dal. Heat ghee in a pot (earthen if possible) and add the cumin, bay leaf and ginger.',
          'Add the rice and dal, turmeric and salt, then pour in the water.',
          'Simmer until the grains are tender and the khichdi is soft and creamy, about 30 minutes.',
          'Finish with a spoon of ghee.',
        ],
        offering:
          'Cooked in earthen pots on wood fires in the Ananda Bazaar and offered to Jagannath; the offering is called Abadha.',
        tips: ['Cook on low heat. Earthen pots give the characteristic aroma.'],
      },
      {
        id: 'maharashtra-datta',
        region: 'Maharashtra',
        culture: 'Datta temples — Gangapur, Audumbar; Datta Jayanti',
        title: 'Datta Khichdi (bhiksha)',
        intro:
          'A simple khichdi cooked with minimal spice and offered as bhiksha (alms) in memory of Dattatreya, who is Lord of alms-seekers.',
        serves: '5 servings',
        prep: '10 min',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1 cup rice, 1/2 cup moong dal',
              '3 tbsp ghee',
              '1 tsp cumin, 1 inch ginger',
              '1/2 tsp turmeric',
              '4 cups water, salt',
            ],
          },
        ],
        method: [
          'Wash rice and dal together.',
          'Heat ghee, add cumin, ginger and turmeric.',
          'Add the rice and dal; fry a minute and add water and salt.',
          'Cook until soft and creamy.',
        ],
        offering: 'Offered at Datta Jayanti and given to visitors as alms.',
        tips: ['Keep spicing minimal — it is meant as an alms meal.'],
      },
    ],
  },

  // ───────────────────────────── LABRA ─────────────────────────────
  {
    id: 'labra',
    name: 'Labra',
    alsoCalled: 'Mixed vegetable bhog · লাবড়া',
    category: 'Savoury',
    summary: 'Bengal’s mixed vegetable curry, served beside khichuri at the pandal.',
    meaning:
      'Labra is the vegetable accompaniment of Bengal’s Durga Puja bhog: a mix of seasonal vegetables simmered in a light panch phoron-flavoured gravy. It is cooked without onion or garlic.',
    variants: [
      {
        id: 'bengal',
        region: 'West Bengal',
        culture: 'Bengali households and pandals',
        title: 'Labra',
        intro:
          'Pumpkin, brinjal, radish, raw banana and potato in a gravy spiced with panch phoron, ginger and a trace of sugar.',
        serves: '6 servings',
        prep: '20 min',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1 cup pumpkin cubes, 1 cup brinjal, 1 cup radish, 1 raw banana, 1 potato — all in 1-inch pieces',
              '1/2 cup cabbage or beans (optional)',
              '1 tsp panch phoron, 2 dry red chillies, 1 bay leaf',
              '1 tbsp ginger paste',
              '1/2 tsp turmeric, 1 tsp cumin powder, 1 tsp coriander powder',
              '1 tsp sugar, salt',
              '3 tbsp mustard oil (or ghee)',
              '2 cups water',
            ],
          },
        ],
        method: [
          'Heat the oil, add panch phoron, red chillies and bay leaf.',
          'Add the ginger paste, turmeric, cumin and coriander and fry briefly.',
          'Add the harder vegetables (potato, raw banana, radish), then the softer ones. Stir.',
          'Add water, salt and sugar, cover and simmer for 20 minutes until all the vegetables are tender.',
          'Mash a few pieces to thicken, and finish with a drizzle of ghee.',
        ],
        offering: 'Offered with khichuri, begun bhaja and chutney at the bhog.',
        tips: ['Cut the vegetables into similar sizes so they cook evenly.'],
      },
    ],
  },

  // ───────────────────────────── DALMA ─────────────────────────────
  {
    id: 'dalma',
    name: 'Dalma',
    alsoCalled: 'Odia dal with vegetables · ଡାଲମା',
    category: 'Savoury',
    summary: 'Odisha’s dal with vegetables — the daily offering to Jagannath.',
    meaning:
      'Dalma is cooked in the Jagannath temple kitchen and offered with rice and khechudi. It is a thick toor dal with plantain, pumpkin, brinjal and sweet potato, with a tempering of cumin and chilli. No onion or garlic.',
    variants: [
      {
        id: 'odisha',
        region: 'Odisha',
        culture: 'Odia households and Jagannath temple',
        title: 'Dalma',
        intro:
          'Toor dal simmered with seasonal vegetables and a handful of grated coconut, finished with a roasted cumin–chilli tempering.',
        serves: '5–6 servings',
        prep: '15 min',
        cook: '35 min',
        ingredients: [
          {
            items: [
              '1/2 cup toor dal (arhar), washed',
              '1 raw banana, 1 cup pumpkin, 1 brinjal, 1 sweet potato, 1/2 cup papaya (optional) — cubed',
              '2 tbsp grated coconut',
              '1/2 tsp turmeric, salt',
              '2 tbsp ghee',
              '1 tsp cumin, 2 dry red chillies, 1 bay leaf',
              '1 tbsp roasted cumin-chilli powder (for garnish)',
            ],
          },
        ],
        method: [
          'Pressure-cook the dal with turmeric until soft.',
          'Add the vegetables with 2 cups water, salt and coconut and simmer until tender.',
          'Heat the ghee and temper cumin, red chillies and bay leaf; pour over the dalma.',
          'Sprinkle with roasted cumin–chilli powder and serve.',
        ],
        offering: 'Offered to Jagannath as part of Abadha and eaten with rice.',
        tips: ['Vegetables should hold their shape; add the hardest ones first.'],
      },
    ],
  },

  // ───────────────────────────── SUNDAL ─────────────────────────────
  {
    id: 'sundal',
    name: 'Sundal',
    alsoCalled: 'Guggillu · Usli · சுண்டல்',
    category: 'Savoury',
    summary: 'Boiled, tempered pulses — a different one each day of Navaratri Golu, and for Ganesh Chaturthi.',
    meaning:
      'During Navaratri Golu the Tamil home hosts visitors every evening and gives sundal as prasad. It is a different pulse each day, and every cook has a favourite. In Andhra the chickpea version is called guggillu.',
    variants: [
      {
        id: 'tamil-nadu',
        region: 'Tamil Nadu',
        culture: 'Tamil Brahmin and Chettiar households — Navaratri Golu, Vinayaka Chaturthi',
        title: 'Kondakadalai Sundal (and the nine-day Golu menu)',
        intro:
          'Boiled chickpeas, tempered in coconut oil with mustard, urad dal, hing and green chilli, finished with fresh coconut. The same method works for any pulse.',
        serves: '6 servings',
        prep: '8 hrs soaking',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1 cup white chickpeas (kondakadalai), soaked overnight',
              '1 tbsp coconut oil',
              '1 tsp mustard seeds, 1 tsp urad dal',
              '2 dry red chillies, 10 curry leaves, pinch hing',
              '1/4 cup fresh grated coconut',
              'Salt',
              'Optional: 1 tsp grated raw mango in season',
            ],
          },
          {
            group: 'A typical nine-day plan (households vary)',
            items: [
              'Day 1: chickpea (kondakadalai)',
              'Day 2: green moong (pachai payaru)',
              'Day 3: black-eyed pea (karamani)',
              'Day 4: green peas (pattani)',
              'Day 5: rajma or red cowpea',
              'Day 6: peanut (verkadalai)',
              'Day 7: black chickpea (karuppu kondakadalai)',
              'Day 8: sweet corn',
              'Day 9: sweet sundal — chana dal with jaggery and coconut',
            ],
          },
        ],
        method: [
          'Pressure-cook the soaked chickpeas with salt for 5 whistles until just soft and still whole. Drain.',
          'Heat the oil, add mustard and urad dal; when they splutter add red chillies, curry leaves and hing.',
          'Add the chickpeas and toss for 2 minutes.',
          'Switch off and fold in the coconut. Serve warm.',
        ],
        offering: 'Offered to Devi before aarti; the sundal is handed to guests in small bowls with kumkum and a betel leaf.',
        tips: ['Do not mash — sundal should be whole and dry.'],
      },
      {
        id: 'andhra-guggillu',
        region: 'Andhra Pradesh & Telangana',
        culture: 'Telugu households — Dasara, Vinayaka Chaviti',
        title: 'Guggillu',
        intro:
          'The Telugu chickpea guggillu is tempered with mustard, cumin, green chilli, ginger and onion-free seasoning, finished with grated fresh coconut.',
        serves: '6 servings',
        prep: '8 hrs soaking',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1 cup chickpeas (soaked)',
              '1 tbsp oil or ghee',
              '1 tsp mustard, 1 tsp cumin',
              '2 green chillies, 1 tsp grated ginger, 10 curry leaves',
              '1/4 cup coconut, thin slivers or grated',
              'Salt',
            ],
          },
        ],
        method: [
          'Pressure-cook the chickpeas until tender; drain.',
          'Temper the mustard and cumin in oil; add the chillies, ginger and curry leaves.',
          'Add the chickpeas, salt and coconut and toss.',
        ],
        offering: 'Offered at Dasara and at Vinayaka Chaviti, and given to neighbours.',
        tips: ['Squeeze a little lemon juice at the end if you like.'],
      },
    ],
  },

  // ───────────────────────────── KOSAMBARI ─────────────────────────────
  {
    id: 'kosambari',
    name: 'Kosambari & Vadapappu',
    alsoCalled: 'Kosumalli · Soaked-moong salad · కోసంబరి',
    category: 'Savoury',
    summary: 'Raw soaked-moong salad that accompanies panakam on Rama Navami.',
    meaning:
      'Kosambari (Karnataka) and vadapappu (Andhra) are the same idea — raw, soaked split moong dal as a cooling salad — which is offered with panakam at Rama Navami and Narasimha Jayanti.',
    variants: [
      {
        id: 'karnataka-kosambari',
        region: 'Karnataka',
        culture: 'Kannada households — Rama Navami, Narasimha Jayanti',
        title: 'Kosambari',
        intro:
          'Soaked moong dal with cucumber, carrot, fresh coconut and coriander, flavoured with lemon and tempered with mustard and green chilli.',
        serves: '4 servings',
        prep: '10 min + 2 hrs soaking',
        cook: '2 min',
        ingredients: [
          {
            items: [
              '1/2 cup split yellow moong dal, soaked 2 hours and drained',
              '1/2 cup grated cucumber, 1/4 cup grated carrot',
              '1/4 cup fresh coconut',
              '2 tbsp chopped coriander',
              '1 tbsp lemon juice',
              '1 tsp oil, 1/2 tsp mustard, 1 green chilli, 5 curry leaves',
              'Salt',
            ],
          },
        ],
        method: [
          'Drain the dal well and keep dry.',
          'Mix with the cucumber, carrot, coconut, coriander and salt.',
          'Heat the oil and temper the mustard, chilli and curry leaves.',
          'Pour over the salad, squeeze in the lemon juice and toss.',
        ],
        offering: 'Offered with panaka and majjige at midday on Rama Navami.',
        tips: ['Don’t add salt until just before serving or the dal will leach water.'],
      },
      {
        id: 'andhra-vadapappu',
        region: 'Andhra Pradesh & Telangana',
        culture: 'Telugu households — Sri Rama Navami',
        title: 'Vadapappu',
        intro:
          'Plain soaked moong dal with ginger, green chilli and salt, sometimes with a touch of coconut. It is stripped down, almost austere.',
        serves: '4 servings',
        prep: '5 min + 2 hrs soaking',
        cook: 'None',
        ingredients: [
          {
            items: [
              '1/2 cup split moong dal (pesara pappu), soaked 2 hours',
              '1 tsp grated ginger',
              '1 green chilli, minced',
              '2 tbsp grated coconut (optional)',
              'Salt',
            ],
          },
        ],
        method: [
          'Drain the dal completely.',
          'Mix it with ginger, chilli, coconut and salt.',
        ],
        offering: 'Offered with panakam at Sita Rama Kalyanam in Bhadrachalam.',
        tips: ['Serve within an hour of salting.'],
      },
    ],
  },

  // ───────────────────────────── GOPALKALA ─────────────────────────────
  {
    id: 'gopalkala',
    name: 'Gopalkala',
    alsoCalled: 'Dahi Kala · Kala · गोपालकाला',
    category: 'Offering mix',
    summary: 'Poha, curd and herbs mixed in a pot — Krishna’s cowherd lunch after Dahi Handi.',
    meaning:
      'Gopalkala is believed to recreate what Krishna and his cowherd friends ate on their picnics. After the Dahi Handi is broken, poha, curd, cucumber and spices are mixed together and distributed as prasad.',
    variants: [
      {
        id: 'maharashtra',
        region: 'Maharashtra',
        culture: 'Marathi households and Dahi Handi mandals — Janmashtami',
        title: 'Gopalkala',
        intro:
          'Thick poha, curd, cucumber, pomegranate, coconut and green chilli, mixed with a bit of sugar, lemon and roasted cumin.',
        serves: '6–8 servings',
        prep: '15 min',
        cook: 'None',
        ingredients: [
          {
            items: [
              '1 cup thick (jada) poha, rinsed and drained',
              '1.5 cups fresh thick curd',
              '1/2 cucumber, finely chopped',
              '1/4 cup pomegranate pearls',
              '2 tbsp grated fresh coconut',
              '1 green chilli, 1 tsp grated ginger',
              '2 tbsp roasted peanuts, crushed',
              '1 tsp sugar, salt to taste',
              '1/2 tsp roasted cumin powder, lemon juice',
              'Fresh coriander and a few drops of ghee',
            ],
          },
        ],
        method: [
          'Rinse the poha briefly and drain; let it rest 5 minutes to soften.',
          'Whisk the curd smooth with sugar and salt.',
          'Combine the poha with the curd, cucumber, coconut, chilli, ginger, peanuts and cumin.',
          'Squeeze in lemon juice; top with pomegranate, coriander and ghee.',
          'Offer immediately — it does not keep.',
        ],
        offering: 'Offered after the midnight aarti on Janmashtami and served from the Dahi Handi pot the next day.',
        tips: ['Mix just before serving, or the poha will go soggy.'],
      },
    ],
  },

  // ───────────────────────────── KRISHNA SNACKS ─────────────────────────────
  {
    id: 'krishna-snacks',
    name: 'Gokulashtami Snacks',
    alsoCalled: 'Seedai · Murukku · Chakli · Aval · சீடை',
    category: 'Savoury',
    summary: 'Seedai, murukku and sweet aval — the South Indian Janmashtami offerings.',
    meaning:
      'South Indian Janmashtami (Gokulashtami) is celebrated with fried snacks, because Krishna was said to love them. Small footprints are drawn at the doorway with rice flour, and seedai and murukku are offered.',
    variants: [
      {
        id: 'tamil-seedai',
        region: 'Tamil Nadu',
        culture: 'Tamil households — Gokulashtami',
        title: 'Uppu Seedai and Vella Aval',
        intro:
          'Seedai are crunchy marble-sized balls of rice flour and urad dal flour; vella aval is flattened rice mixed with jaggery, coconut and cardamom.',
        serves: '6 servings',
        prep: '20 min',
        cook: '25 min',
        ingredients: [
          {
            group: 'Uppu seedai',
            items: [
              '1 cup rice flour (dry roasted lightly)',
              '2 tbsp roasted urad dal flour',
              '1 tbsp butter, 1 tsp cumin, 1 tsp sesame',
              '1/4 cup grated coconut',
              'Salt, water, oil for frying',
            ],
          },
          {
            group: 'Vella aval',
            items: ['1 cup thick aval (poha)', '1/2 cup jaggery', '1/4 cup grated coconut', '1/2 tsp cardamom', '1 tbsp ghee'],
          },
        ],
        method: [
          'Seedai: mix flours, butter, cumin, sesame, coconut and salt; add water to a firm dough.',
          'Roll into marble-sized balls, dry on a cloth for 10 minutes.',
          'Fry on medium-low heat until pale golden. The inside must cook fully, or the seedai will burst.',
          'Aval: melt the jaggery with 2 tbsp water, strain and cool. Rinse the aval, mix with jaggery, coconut, cardamom and ghee.',
        ],
        offering: 'Offered at evening puja, along with butter, fruit and murukku.',
        tips: ['A hot oil will burst the seedai; fry slow.'],
      },
      {
        id: 'karnataka-chakli',
        region: 'Karnataka (Udupi)',
        culture: 'Udupi Madhva Brahmin households — Krishna Janmashtami',
        title: 'Chakli (Kodubale) and Sihi Avalakki',
        intro:
          'Udupi’s offering for Krishna is chakli (spiral rice-lentil snack) and sweet beaten rice with jaggery and coconut.',
        serves: '6 servings',
        prep: '20 min',
        cook: '25 min',
        ingredients: [
          {
            group: 'Chakli',
            items: [
              '1 cup rice flour',
              '1/4 cup roasted gram (hurigadale) powder',
              '1 tsp sesame, 1 tsp cumin, pinch of hing',
              '1 tbsp hot oil or butter, salt, water',
              'Oil for frying',
            ],
          },
          {
            group: 'Sihi avalakki',
            items: ['1 cup thick poha', '1/2 cup jaggery', '1/4 cup coconut', '1/2 tsp cardamom', '1 tbsp ghee'],
          },
        ],
        method: [
          'Chakli: mix flours, spices and hot oil. Add water to form a soft dough.',
          'Press spirals through a chakli mould on a plate and fry until golden.',
          'Avalakki: melt the jaggery in 2 tbsp water, strain and cool. Mix with the poha, coconut, cardamom and ghee.',
        ],
        offering: 'Offered at the Krishna temple at Udupi and in homes after the midnight arghya.',
        tips: ['Press chakli on a flat surface and slide into the oil to keep the spiral intact.'],
      },
    ],
  },

  // ───────────────────────────── KANYA PUJAN ─────────────────────────────
  {
    id: 'kanya-pujan',
    name: 'Halwa, Puri & Chana',
    alsoCalled: 'Kanya Pujan bhog · हलवा-पूरी-चना',
    category: 'Full offering (bhog menu)',
    summary: 'The classic Ashtami / Navami offering to the nine girls.',
    meaning:
      'On Ashtami or Navami during Navaratri, nine girls and a young boy (a “Langur”) are invited, worshipped as the Goddess’s forms, fed halwa-puri-chana, and given gifts. The same trio is offered to the Goddess before it is served.',
    variants: [
      {
        id: 'up-delhi',
        region: 'Uttar Pradesh & Delhi–NCR',
        culture: 'Hindu households — Chaitra and Sharad Navaratri',
        title: 'Suji Halwa, Puri and Kala Chana',
        intro:
          'Semolina halwa with ghee and sugar, soft puffed puris, and a dry preparation of black chickpeas with ghee and cumin. It is made without onion or garlic.',
        serves: '9 girls + family',
        prep: '30 min + overnight soaking',
        cook: '1 hr',
        ingredients: [
          {
            group: 'Halwa',
            items: ['1 cup semolina', '3/4 cup ghee', '3/4 cup sugar', '2.5 cups hot water', '1/2 tsp cardamom', '2 tbsp almonds, raisins'],
          },
          {
            group: 'Puri',
            items: ['2 cups whole-wheat flour', '2 tbsp ghee', 'Salt', 'Water', 'Oil for frying'],
          },
          {
            group: 'Kala chana (dry)',
            items: [
              '1 cup black chickpeas, soaked overnight',
              '2 tbsp ghee',
              '1 tsp cumin, 1 inch ginger, 2 green chillies',
              '1/2 tsp turmeric, 1 tsp coriander powder, 1/2 tsp garam masala',
              'Salt, lemon juice, fresh coriander',
            ],
          },
        ],
        method: [
          'Chana: pressure-cook the soaked chickpeas with salt until soft. Drain, keep a little liquid.',
          'Heat ghee, add cumin, ginger, chillies, turmeric and coriander. Add the chana and toss on medium until dry. Add garam masala, lemon and coriander.',
          'Halwa: roast the semolina in ghee on low for 8–10 minutes until fragrant. Pour in the hot water carefully, stir until absorbed. Add sugar, cardamom and nuts.',
          'Puri: knead the flour with ghee, salt and water to a stiff dough. Roll small circles and fry in hot oil until they puff.',
          'Offer a portion on a clean plate to the Goddess, then serve to the girls first.',
        ],
        offering: 'Offered to Durga on Ashtami, then served to nine girls whose feet are washed and who receive tilak and gifts.',
        tips: ['Keep the oil hot for puffed puris, and roll them evenly.'],
      },
      {
        id: 'punjab-himachal',
        region: 'Punjab & Himachal Pradesh',
        culture: 'Punjabi and Pahari households',
        title: 'Atta Halwa, Puri and Tangy Chana',
        intro:
          'The halwa is made from whole-wheat flour rather than semolina, and the chana carries a sour note of amchur and anardana. It is served in a leaf bowl.',
        serves: '9 girls + family',
        prep: '30 min + overnight soaking',
        cook: '1 hr',
        ingredients: [
          {
            group: 'Atta halwa',
            items: ['1 cup whole-wheat flour', '3/4 cup ghee', '3/4 cup sugar', '2.5 cups water', '1/2 tsp cardamom', 'Almonds'],
          },
          {
            group: 'Tangy chana',
            items: [
              '1 cup black or white chickpeas, soaked and boiled',
              '2 tbsp ghee, 1 tsp cumin, 1 tsp ginger',
              '1 tsp amchur, 1 tsp crushed anardana, 1 tsp coriander powder',
              '1/2 tsp garam masala, salt',
            ],
          },
          {
            group: 'Puri',
            items: ['2 cups atta', '1 tbsp ghee', 'Salt', 'Oil for frying'],
          },
        ],
        method: [
          'Roast the atta in ghee on low heat for 15 minutes until golden and aromatic.',
          'Add the sugar syrup (sugar boiled with water) carefully; stir until thick. Add cardamom and almonds.',
          'Temper the ghee with cumin and ginger, add the chana with amchur, anardana, coriander and garam masala, and cook until dry.',
          'Fry the puris and serve all three together.',
        ],
        offering: 'Offered to the Devi and served to the girls on Ashtami / Navami.',
        tips: ['Roast the atta well; it makes or breaks the halwa.'],
      },
    ],
  },

  // ───────────────────────────── SINDHI TAHIRI ─────────────────────────────
  {
    id: 'tahiri-akha',
    name: 'Tahiri & Akha',
    alsoCalled: 'Meethi Tahri · Cheti Chand prasad · तहरी',
    category: 'Rice & Grain',
    summary: 'Sindhi sweet rice and the akha (rice-and-sugar) offering of Cheti Chand.',
    meaning:
      'On Cheti Chand, the Sindhi new year and the birthday of Jhulelal, devotees carry a lamp, water, coconut and sweets to the water, offering akha (rice with sugar) and meethi tahiri. A savoury tahiri is also commonly made. Practice varies by family.',
    variants: [
      {
        id: 'sindhi',
        region: 'Sindh diaspora (Gujarat, Maharashtra, Rajasthan, Madhya Pradesh)',
        culture: 'Sindhi households — Cheti Chand, Jhulelal Jayanti',
        title: 'Meethi Tahiri and Akha',
        intro:
          'Meethi tahiri is rice cooked with saffron and sugar, finished with ghee, cardamom and nuts. Akha is a simple offering of raw rice and sugar crystals.',
        serves: '4–5 servings',
        prep: '10 min',
        cook: '25 min',
        ingredients: [
          {
            group: 'Meethi tahiri',
            items: [
              '1 cup basmati rice',
              '3/4 cup sugar (or jaggery)',
              '2 tbsp ghee',
              '4 cloves, 4 cardamom pods, 1 inch cinnamon',
              '10 saffron strands in warm water',
              '2 tbsp cashews, 1 tbsp raisins',
              '2 cups water',
            ],
          },
          {
            group: 'Akha',
            items: ['A small bowl of raw rice', '1 tbsp mishri or sugar crystals'],
          },
        ],
        method: [
          'Wash and soak the rice for 20 minutes.',
          'Heat the ghee, fry the whole spices and nuts briefly. Add the rice and fry 2 minutes.',
          'Add the water and bring to a boil. When the rice is 70% cooked, add the sugar and saffron.',
          'Cover and cook on low until done.',
          'For akha, arrange the rice and sugar in a bowl for the Baharana Sahib.',
        ],
        offering: 'Offered with the Baharana Sahib (lamp, water, coconut, sweets, akha) at the water’s edge.',
        tips: ['Add the sugar only when the rice has mostly cooked, or the grains will not soften.'],
      },
    ],
  },
]
