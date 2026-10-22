import type { PrasadRecipe } from './types'

// Full bhog menus: Chhappan Bhog, Annakut, Puri Mahaprasad.
// Ingredient groups here list the DISHES of the menu; the method explains how
// to plan, cook and arrange them at home. Component recipes are cross-linked.

export const MENUS: PrasadRecipe[] = [
  // ───────────────────────────── CHHAPPAN BHOG ─────────────────────────────
  {
    id: 'chhappan-bhog',
    name: 'Chhappan Bhog',
    alsoCalled: '56 Bhog · Chappan Bhog · छप्पन भोग',
    category: 'Full offering (bhog menu)',
    summary: 'The 56-dish offering to Krishna — and how to plan a smaller one at home.',
    meaning:
      'When Krishna lifted Govardhan hill for seven days, the people of Braj say he went without food. Yashoda, who used to feed him eight times a day, offered him all those missed meals together: 7 days × 8 meals = 56 dishes. Pushtimarg temples (Nathdwara) arrange it as a grand display; ISKCON and Vaishnava temples offer it at Janmashtami, Radha Ashtami and Govardhan Puja. Exact lists vary by temple and family; the plan below is a widely used one, and home-scale versions of 11 or 21 items are equally valid.',
    variants: [
      {
        id: 'braj-pushtimarg',
        region: 'Braj, Rajasthan & Gujarat (Pushtimarg)',
        culture: 'Pushtimarg, Gaudiya and ISKCON Vaishnava traditions',
        title: 'Chhappan Bhog — the 56-item plan',
        intro:
          'A pure-vegetarian (no onion, no garlic) menu arranged by course. Sweets lead the plate, savouries and meal items follow, and fruit and dry fruit complete it. Make it over two days: sweets and dry items the day before, hot dishes on the day.',
        serves: 'A full temple offering; home-scale below',
        prep: '1–2 days',
        cook: '8–10 hrs with helpers',
        ingredients: [
          {
            group: 'Milk and butter (7)',
            items: ['Makhan-mishri', 'Fresh curd', 'Saffron milk', 'Rabri', 'Basundi', 'Shrikhand', 'Kheer'],
          },
          {
            group: 'Halwas (6)',
            items: ['Moong dal halwa', 'Suji halwa', 'Gajar halwa', 'Badam halwa', 'Atta halwa', 'Panjiri'],
          },
          {
            group: 'Laddus, pedas and barfis (9)',
            items: ['Motichoor laddu', 'Besan laddu', 'Boondi laddu', 'Mathura peda', 'Kaju barfi', 'Coconut barfi', 'Kalakand', 'Sandesh', 'Dry-fruit laddu'],
          },
          {
            group: 'Syrupy and fried sweets (7)',
            items: ['Jalebi', 'Imarti', 'Malpua', 'Ghewar', 'Balushahi', 'Gulab jamun', 'Rasgulla'],
          },
          {
            group: 'Pastries (2)',
            items: ['Gujiya', 'Khaja'],
          },
          {
            group: 'Savouries (8)',
            items: ['Mathri', 'Namak para', 'Kachori', 'Dahi vada', 'Moong dal vada', 'Dhokla', 'Pakora', 'Papad'],
          },
          {
            group: 'Rice and breads (6)',
            items: ['Plain rice', 'Khichdi', 'Meetha chawal (sweet rice)', 'Puri', 'Phulka with ghee', 'Stuffed paratha'],
          },
          {
            group: 'Dal and kadhi (3)',
            items: ['Moong dal', 'Kadhi', 'Chana dal'],
          },
          {
            group: 'Vegetables (4)',
            items: ['Mixed vegetable', 'Aloo sabzi', 'Lauki sabzi', 'Paneer sabzi'],
          },
          {
            group: 'Accompaniments (2)',
            items: ['Pickle', 'Chutney'],
          },
          {
            group: 'Fruit and dry fruit (2)',
            items: ['Seasonal fruits', 'Dry fruits and nuts'],
          },
        ],
        method: [
          'Choose your scale. A full 56 needs a team; for a home you can do 11 (one or two from each course) or 21 items. What matters is that every course appears and the food is pure and cooked with devotion.',
          'Plan two days. Day 1: halwas, laddus, barfis, pedas, rabri, shrikhand, mathri, namak para and the dry sweets — these keep. Day 2: all hot items, rice, puri, kadhi, vegetables and fresh curd.',
          'Cook in a clean kitchen without onion, garlic, or tasting from the serving vessel. Use fresh ghee and distinct vessels for each dish.',
          'Arrange the thali in rings. In Pushtimarg the sweets go closest to the deity, then the savouries, then the rice, bread and sabzis, with fruits and dry fruits at the outer edge. Each dish gets its own small bowl or leaf cup.',
          'Place a tulsi leaf on the rice and sweets. Cover the plate with a clean cloth while the aarti is performed.',
          'Offer the bhog during the aarti, with the curtain drawn (in Pushtimarg), and keep it before the deity for 10–15 minutes.',
          'Distribute everything as prasad after the offering. Share with neighbours and give some to the poor.',
        ],
        offering:
          'Janmashtami at midnight, Radha Ashtami, Govardhan Puja and the day after Diwali; also whenever a vow of Chhappan Bhog has been taken.',
        tips: [
          'The count is a vow, not a rule: if you can only make 21, make it with full devotion.',
          'Keep 3–4 “hot” items for the final minute before the offering so they are fresh.',
        ],
        seeAlso: [
          { dish: 'makhan-mishri', label: 'Makhan-Mishri' },
          { dish: 'panjiri', label: 'Panjiri' },
          { dish: 'laddu', label: 'Boondi Laddu' },
          { dish: 'kheer-payasam', label: 'Kheer' },
          { dish: 'gujiya', label: 'Gujiya' },
          { dish: 'khaja', label: 'Khaja' },
          { dish: 'halwa-sheera', label: 'Halwa and Sheera' },
          { dish: 'ghewar', label: 'Ghewar' },
        ],
        differs: '56 courses in Braj order — sweets first; fully onion-garlic free.',
      },
      {
        id: 'south-indian',
        region: 'Tamil Nadu, Karnataka & Kerala (Udupi, Sri Vaishnava)',
        culture: 'Madhva and Sri Vaishnava households and temples',
        title: 'South Indian Krishna Bhog (core menu)',
        intro:
          'Southern temples compose the bhog from the region’s offerings: payasams, pongal, puliyodarai, appam, laddu, vada, murukku, and seasonal vegetables. The core menu below is what most Udupi and Tamil Vaishnava households prepare; larger bhogs repeat the categories with more varieties.',
        serves: 'A family of 6–8',
        prep: '2 hrs',
        cook: '3 hrs',
        ingredients: [
          {
            group: 'Sweets',
            items: ['Paal payasam', 'Sakkarai pongal', 'Rava kesari', 'Mysore pak', 'Holige or bobbatlu', 'Rava laddu', 'Coconut barfi', 'Jangiri'],
          },
          {
            group: 'Snacks',
            items: ['Seedai', 'Murukku or chakli', 'Thattai', 'Medu vada', 'Appam', 'Banana chips'],
          },
          {
            group: 'Rice and mains',
            items: ['Plain rice with ghee', 'Puliyodarai', 'Ven pongal', 'Curd rice', 'Sambar', 'Rasam', 'Kootu', 'Poriyal', 'Avial'],
          },
          {
            group: 'To finish',
            items: ['Banana', 'Seasonal fruits', 'Panakam or buttermilk', 'Tulsi and betel leaf'],
          },
        ],
        method: [
          'Pick 21–28 items from the list and divide them over two days. Do the sweets, vadas, murukku and seedai first.',
          'Cook the rice, sambar, rasam, kootu and poriyal on the day, in fresh vessels.',
          'Place the dishes on banana leaves in the traditional order — salt, pickle, sweets, then rice and the rest.',
          'Offer to Krishna during the aarti and distribute.',
        ],
        offering: 'Gokulashtami night, and the day after, when the leftovers are given to neighbours.',
        tips: ['Serve on fresh banana leaves for the full flavour.'],
        seeAlso: [
          { dish: 'kheer-payasam', variant: 'tamil-paal-payasam', label: 'Paal Payasam' },
          { dish: 'sweet-pongal', label: 'Sakkarai Pongal' },
          { dish: 'puliyodarai', label: 'Puliyodarai' },
          { dish: 'ven-pongal', label: 'Ven Pongal' },
          { dish: 'krishna-snacks', label: 'Seedai, Murukku and Aval' },
          { dish: 'appam', label: 'Appam' },
        ],
      },
    ],
  },

  // ───────────────────────────── ANNAKUT ─────────────────────────────
  {
    id: 'annakut',
    name: 'Annakut',
    alsoCalled: 'Annakoot · Govardhan Puja bhog · अन्नकूट',
    category: 'Full offering (bhog menu)',
    summary: 'The “mountain of food” offered to Govardhan on the day after Diwali.',
    meaning:
      'Annakut means “a heap of grain”. On Govardhan Puja, devotees recall Krishna lifting Govardhan hill and make a mountain of rice, surrounded by a spread of dozens of dishes, which is offered to Krishna and Giriraj. In Nathdwara the Annakut is a grand festival; in Braj each family makes a cow-dung Govardhan; ISKCON and Gujarati Swaminarayan temples also offer it on the same day.',
    variants: [
      {
        id: 'nathdwara-rajasthan',
        region: 'Rajasthan (Nathdwara)',
        culture: 'Pushtimarg Vaishnava — Shrinathji temple',
        title: 'Nathdwara-style Annakut',
        intro:
          'A mound of rice shaped like Govardhan is encircled by pots of kadhi, a seasonal mixed vegetable, bajra khichdi and fried foods, with sweets on the outer circle. Here are the three core dishes you can make at home.',
        serves: '10–12 people',
        prep: '1 hr',
        cook: '2.5 hrs',
        ingredients: [
          {
            group: 'The rice mountain',
            items: ['4 cups basmati rice', '6 cups water, 1 tbsp ghee, salt', 'Tulsi leaves and a small diya on top'],
          },
          {
            group: 'Annakut ki sabzi (mixed vegetable)',
            items: [
              '4–5 cups mixed seasonal vegetables — potato, sweet potato, raw banana, suran (yam), carrot, beans, green peas, pumpkin, brinjal — in 1-inch cubes',
              '3 tbsp ghee, 1 tsp cumin, pinch of hing',
              '1 tbsp ginger paste, 2 green chillies',
              '1 tsp coriander powder, 1/2 tsp turmeric, 1 tsp amchur',
              'Salt, fresh coriander',
            ],
          },
          {
            group: 'Pakora kadhi',
            items: [
              '1.5 cups sour curd, 1/4 cup besan, 4 cups water',
              '1/2 tsp turmeric, salt',
              '1 tbsp ghee, 1 tsp cumin, 1 tsp mustard, 2 dry red chillies, curry leaves, hing',
              'Pakoras: 1/2 cup besan, 1/4 tsp ajwain, salt, water, oil to fry',
            ],
          },
          {
            group: 'Bajra khichdi',
            items: ['1 cup bajra (pearl millet), pounded and winnowed', '1/2 cup moong dal', '4 cups water, 2 tbsp ghee, salt'],
          },
        ],
        method: [
          'Rice: wash the rice and cook in water with a spoon of ghee and salt until each grain is separate. Spread on a clean tray and cool for 10 minutes.',
          'Shape the cooled rice into a mound (parvat) in the centre of a large thali. Place tulsi leaves around it and a small diya on the top.',
          'Sabzi: heat the ghee and add cumin and hing; add ginger and chillies, then the hardest vegetables first (potato, yam, sweet potato, raw banana) and cook covered for 10 minutes. Add the remaining vegetables, the spices and a splash of water; cook until tender. Finish with amchur and coriander.',
          'Kadhi: whisk the curd, besan, turmeric, salt and water to a smooth liquid. Cook on medium heat, stirring continuously, until it begins to simmer, then lower and cook for 25–30 minutes. Fry the pakoras and add them for the final 5 minutes. Temper with ghee, cumin, mustard, red chillies and curry leaves.',
          'Bajra khichdi: soak the bajra for 2 hours, pressure-cook with the dal, water and salt until soft (about 8 whistles). Finish with ghee.',
          'Surround the rice mountain with all the pots and the sweets, then offer them together during the Annakut aarti.',
          'After the aarti the whole spread is distributed to all who come.',
        ],
        offering:
          'Offered to Shrinathji and Giriraj on the morning of Govardhan Puja; devotees take darshan of the annakut and receive it as prasad.',
        tips: [
          'The kadhi must be stirred in one direction while it heats, or the curd will split.',
          'Make the dishes in the same quantity of everything — the visual is part of the offering.',
        ],
        seeAlso: [
          { dish: 'chhappan-bhog', label: 'Chhappan Bhog' },
          { dish: 'kheer-payasam', label: 'Kheer' },
          { dish: 'gujiya', label: 'Sweets' },
        ],
        differs: 'Rice mountain with kadhi, bajra khichdi and a mixed seasonal sabzi.',
      },
      {
        id: 'braj-govardhan',
        region: 'Braj (Govardhan, Mathura–Vrindavan)',
        culture: 'Gaudiya and Braj Vaishnava households',
        title: 'Braj Annakut',
        intro:
          'In Braj the family makes a small Govardhan from cow dung in the courtyard, surrounds it with offerings of milk and sweets, and cooks a mix of vegetables, puris, kadhi and rice. The sabzi is the “Annakut ki sabzi”, a simple mix of all the vegetables in the market, cooked together in mustard oil or ghee.',
        serves: '8–10 people',
        prep: '45 min',
        cook: '1.5 hrs',
        ingredients: [
          {
            group: 'Annakut sabzi',
            items: [
              '5 cups of any seasonal vegetables: pumpkin, radish, turnip, carrot, cauliflower, beans, peas, brinjal, potato',
              '3 tbsp mustard oil or ghee',
              '1 tsp cumin, 2 bay leaves, 1 tsp fenugreek leaves (kasuri methi)',
              '1 tbsp coriander powder, 1/2 tsp turmeric, 1 tsp red chilli powder',
              'Salt, 1 tsp garam masala',
            ],
          },
          {
            group: 'Alongside',
            items: [
              'Plain rice or khichdi',
              'Puris made with wheat flour',
              'Kadhi (as in the Nathdwara version)',
              'Kheer, jalebi, laddu',
              'Fresh milk, curd and butter in small bowls',
            ],
          },
        ],
        method: [
          'Cut the vegetables in similar sizes. Heat the oil or ghee and add the cumin and bay leaves.',
          'Add the vegetables, spices and salt, stir well and cover. Cook on low heat with a little water for 25 minutes, stirring occasionally.',
          'Finish with kasuri methi and garam masala.',
          'On a clean spot, make the Govardhan figure from cow dung (or draw it in rice flour). Place offerings around it.',
          'Do the parikrama around Govardhan with the offerings and sing arti.',
          'After offering, distribute the food.',
        ],
        offering:
          'Offered to Giriraj the morning after Diwali; devotees do parikrama around the Govardhan figure and the real hill.',
        tips: ['The sabzi tastes better the next day.'],
        seeAlso: [
          { dish: 'chhappan-bhog', label: 'Chhappan Bhog' },
          { dish: 'kheer-payasam', label: 'Kheer' },
          { dish: 'makhan-mishri', label: 'Makhan-Mishri' },
        ],
      },
    ],
  },

  // ───────────────────────────── PURI MAHAPRASAD ─────────────────────────────
  {
    id: 'puri-mahaprasad',
    name: 'Puri Mahaprasad',
    alsoCalled: 'Anna Mahaprasad · Abadha · Kanika · ମହାପ୍ରସାଦ',
    category: 'Full offering (bhog menu)',
    summary: 'The Jagannath temple’s sacred meal — rice, dalma, khechudi, kanika and khaja.',
    meaning:
      'Mahaprasad of Puri is said to be cooked in the world’s largest kitchen, in earthen pots stacked seven high on wood fires. Because Jagannath is offered the food and Goddess Vimala accepts it, the Mahaprasad is considered pure beyond caste. The Abadha is the daily preparation; during Rath Yatra it is offered at the chariots.',
    variants: [
      {
        id: 'odisha-puri',
        region: 'Odisha (Puri)',
        culture: 'Jagannath temple — Rath Yatra and daily bhog',
        title: 'Abadha plate — Rice, Dalma, Khechudi, Kanika, Saga and Santula',
        intro:
          'A pure-vegetarian meal: plain rice, khechudi, dalma, a sweet-scented kanika, a green saga bhaja and a light santula (vegetable stew). No onion, no garlic, no tomato, no potato, no cauliflower, as the temple does not use the vegetables of the New World.',
        serves: '5–6 people',
        prep: '30 min',
        cook: '1 hr',
        ingredients: [
          {
            group: 'Kanika (sweet fragrant rice)',
            items: [
              '1 cup short-grain aromatic rice',
              '3/4 cup sugar',
              '1/4 cup ghee',
              '4 green cardamom pods, 4 cloves, 1 inch cinnamon, 1 bay leaf',
              '2 tbsp cashews and raisins',
              '2.5 cups water',
              '8 saffron strands',
            ],
          },
          {
            group: 'Santula (light vegetable stew)',
            items: [
              '1 cup pumpkin cubes, 1/2 cup raw papaya, 1 raw banana, 1/2 cup green beans, 1 brinjal',
              '1 tsp cumin, 1 tbsp ginger, 1 green chilli (optional)',
              '1/2 tsp turmeric, salt, 2 cups water',
              '1 tbsp ghee, 1 tsp cumin tempering',
              '1 tbsp roasted besan (optional)',
            ],
          },
          {
            group: 'Saga bhaja',
            items: ['2 bunches spinach or amaranth leaves, chopped', '1 tbsp ghee', '1 tsp cumin, 1 dry red chilli (optional)', 'Salt'],
          },
        ],
        method: [
          'Kanika: heat the ghee, add the whole spices and bay leaf, then the washed rice; fry 2 minutes. Add the hot water and saffron; cook until the rice is 70% done. Add sugar, cashews and raisins and cover for 10 minutes on low heat.',
          'Santula: boil the vegetables in water with turmeric and salt until tender. Crush the cumin, ginger and chilli (if using) to a paste and add. Simmer for 5 minutes. Temper with ghee and cumin; thicken lightly with besan if desired.',
          'Saga: heat the ghee, fry the cumin and chilli, add the greens and salt and cook for 4–5 minutes.',
          'Make the rice, khechudi and dalma (see linked recipes) in earthen or heavy pots.',
          'Serve the rice first with a ladle of dalma and khechudi, then the saga, santula, and finish with kanika and khaja.',
          'Offer the whole plate with tulsi and distribute.',
        ],
        offering:
          'Offered to Jagannath, Balabhadra and Subhadra daily at the Ratna Singhasana and during Rath Yatra on the chariots.',
        tips: [
          'Cook in earthen pots if you can; they give the temple’s characteristic aroma.',
          'Keep chilli minimal or leave it out — the temple’s food is mild.',
        ],
        seeAlso: [
          { dish: 'khichdi-bhog', variant: 'odisha-khechudi', label: 'Khechudi' },
          { dish: 'dalma', label: 'Dalma' },
          { dish: 'khaja', label: 'Khaja' },
          { dish: 'pitha', variant: 'odisha-arisa', label: 'Arisa Pitha' },
        ],
      },
    ],
  },
]
