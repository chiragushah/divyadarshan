import type { PrasadRecipe } from './types'

// Festival sweets & snacks, part 3: narali bhat, narkel naru & sandesh, Parsi
// sev & ravo, Karthigai pori, kheel-batasha, Diwali faral, Lohri sweets,
// sunthavda, pinda.

export const SWEETS_3: PrasadRecipe[] = [
  // ───────────────────────────── NARALI BHAT ─────────────────────────────
  {
    id: 'narali-bhat',
    name: 'Narali Bhat',
    alsoCalled: 'Sweet coconut rice · Nariyal Purnima · नारळी भात',
    category: 'Rice & Grain',
    summary: 'Fragrant coconut-jaggery rice offered to Varuna on Narali Purnima.',
    meaning:
      'On Narali (Nariyal) Purnima, the full-moon day of Shravan, the fishing and coastal communities of Maharashtra and Konkan offer a coconut to the sea and cook narali bhat as the day’s sweet. It also marks Raksha Bandhan in the same week.',
    variants: [
      {
        id: 'maharashtra-konkan',
        region: 'Maharashtra & Konkan',
        culture: 'Koli, Konkani and Marathi households',
        title: 'Narali Bhat',
        intro:
          'Basmati or ambemohar rice cooked with ghee and cloves, then folded with a coconut-jaggery syrup and steamed on a low flame (dum) so that every grain is perfumed.',
        serves: '5–6 servings',
        prep: '10 min',
        cook: '30 min',
        ingredients: [
          {
            items: [
              '1 cup (200 g) basmati or ambemohar rice, washed and soaked 20 minutes',
              '1 cup fresh grated coconut',
              '3/4 cup (150 g) grated jaggery (or sugar)',
              '2 tbsp ghee',
              '3 cloves, 1 small cinnamon stick',
              '1/2 tsp cardamom powder',
              '10–12 saffron strands (optional)',
              '2 tbsp cashews and raisins',
              '1.5 cups hot water, a pinch of salt',
            ],
          },
        ],
        method: [
          'Heat 1 tbsp ghee in a heavy pan. Add the cloves and cinnamon, then the drained rice, and fry for 2 minutes.',
          'Add the hot water and a pinch of salt, cover and cook until the rice is 80% cooked (about 10 minutes). The grains should still have a slight bite.',
          'In another pan, melt the jaggery with 2 tbsp water, add the coconut and cook for 3–4 minutes until it is sticky.',
          'Gently fold the coconut-jaggery mixture into the rice with the cardamom and saffron.',
          'Cover with a tight lid and cook on the lowest heat for 8–10 minutes (dum).',
          'Fry the cashews and raisins in the remaining ghee and garnish.',
        ],
        offering:
          'The first coconut is offered to the sea or river (Varuna) at sunset; narali bhat is the prasad and the day’s feast.',
        tips: [
          'Do not overcook the rice before mixing — it will turn to paste.',
          'Konkan cooks often steam the rice in a pot sealed with a dough ring.',
        ],
      },
    ],
  },

  // ───────────────────────────── NARKEL NARU & SANDESH ─────────────────────────────
  {
    id: 'narkel-naru-sandesh',
    name: 'Narkel Naru & Sandesh',
    alsoCalled: 'Coconut laddu · Sondesh · নারকেল নাড়ু',
    category: 'Sweet',
    summary: 'Bengal’s coconut-jaggery laddu and its fresh-cheese sweet, offered to Lakshmi and exchanged on Bhai Phonta.',
    meaning:
      'Bengali Lakshmi Puja, Kali Puja and Bhai Phonta bring out two sweets that cannot be missed: narkel naru, a chewy coconut and jaggery ball, and sandesh, a soft sweet of fresh chhena (curdled milk solids). They are offered, then given to the visiting sister or brother.',
    variants: [
      {
        id: 'bengal',
        region: 'West Bengal',
        culture: 'Bengali households — Lakshmi Puja, Kali Puja, Bhai Phonta',
        title: 'Narkel Naru and Sandesh',
        intro:
          'Narkel naru uses fresh coconut and gur; sandesh uses chhena kneaded with a little sugar until silky. Both are shaped by hand or moulded.',
        serves: '12 naru + 12 sandesh',
        prep: '30 min',
        cook: '30 min',
        ingredients: [
          {
            group: 'Narkel naru',
            items: [
              '2 cups freshly grated coconut',
              '3/4 cup gur (date-palm jaggery) or regular jaggery',
              '1/2 tsp cardamom powder',
              '1 tsp ghee',
            ],
          },
          {
            group: 'Sandesh',
            items: [
              '1 litre full-fat milk',
              '2 tbsp lemon juice or 1/2 cup curd for curdling',
              '1/4 cup powdered sugar (or 3 tbsp nolen gur)',
              '1/4 tsp cardamom powder',
              'Pistachio slivers for decoration',
            ],
          },
        ],
        method: [
          'For the naru, melt the jaggery with 2 tbsp water, strain, and boil for 2 minutes. Add the coconut and cook, stirring, until the mixture just comes together and leaves the pan (6–8 minutes). Add the cardamom and ghee.',
          'Cool slightly and shape into walnut-sized balls with greased palms.',
          'For the sandesh, bring the milk to a boil and add the lemon juice a spoonful at a time until the milk curdles and the whey turns clear.',
          'Strain through muslin, rinse under cold water to remove the sourness, and squeeze out the water. Hang for 20 minutes.',
          'Knead the chhena on a plate for 5–7 minutes with the heel of your palm until it is smooth and starts to release a bit of fat.',
          'Cook the chhena with the sugar in a non-stick pan on low heat for 4–5 minutes, stirring, until it just leaves the pan. Cool.',
          'Add the cardamom, shape into small discs or mould them, and press a pistachio sliver on top.',
        ],
        offering:
          'Both are offered to Lakshmi, Kali and the household deities in small bowls, and presented to the brother at the Bhai Phonta tilak.',
        tips: [
          'Do not over-cook the chhena — it should be soft, not crumbly.',
          'The water rinse after curdling is what removes the lemon taste.',
        ],
      },
    ],
  },

  // ───────────────────────────── SEV & RAVO ─────────────────────────────
  {
    id: 'sev-ravo',
    name: 'Sev & Ravo',
    alsoCalled: 'Parsi sweet vermicelli and semolina pudding',
    category: 'Sweet',
    summary: 'The Parsi new-year sweets: milky vermicelli and semolina pudding.',
    meaning:
      'On Pateti and Navroz, Parsi families begin the day with a bath, new clothes and a small table (the Haft-sin or a sofreh) set with symbols of life. Sev (sweet roasted vermicelli) and ravo (semolina pudding) are eaten at breakfast and offered to friends.',
    variants: [
      {
        id: 'parsi-sev',
        region: 'Gujarat & Maharashtra (Parsi)',
        culture: 'Parsi-Zoroastrian households — Navroz',
        title: 'Sev (sweet vermicelli)',
        intro:
          'Fine roasted vermicelli cooked in ghee and milk, with sugar, cardamom, and nuts. It is served with curd or a sweet-sour yoghurt on the side.',
        serves: '4–5 servings',
        prep: '5 min',
        cook: '15 min',
        ingredients: [
          {
            items: [
              '1 cup roasted vermicelli (sev), broken into 1-inch pieces',
              '2 tbsp ghee',
              '2 cups milk',
              '1/3 cup sugar',
              '1/2 tsp cardamom powder, a pinch of nutmeg',
              '2 tbsp chopped almonds and pistachios, 1 tbsp raisins',
              'A few drops of rose water',
            ],
          },
        ],
        method: [
          'Heat the ghee, fry the almonds and raisins briefly and remove.',
          'Add the vermicelli to the same pan and roast on low until golden.',
          'Pour in the milk, bring to a boil and simmer 5–7 minutes until the vermicelli is soft.',
          'Add the sugar, cardamom and nutmeg; cook another 3 minutes.',
          'Finish with rose water and the fried nuts.',
        ],
        offering: 'Eaten at the Navroz breakfast and offered to guests.',
        tips: ['Serve with fresh curd for a cooling contrast.'],
      },
      {
        id: 'parsi-ravo',
        region: 'Gujarat & Maharashtra (Parsi)',
        culture: 'Parsi-Zoroastrian households — Navroz, birthdays',
        title: 'Ravo (semolina pudding)',
        intro:
          'A smooth, pale-yellow pudding of fine semolina, milk, ghee and sugar, flavoured with cardamom, nutmeg and rose water. Parsi kitchens often beat in an egg; a vegetarian version without egg is equally traditional.',
        serves: '4–5 servings',
        prep: '5 min',
        cook: '15 min',
        ingredients: [
          {
            items: [
              '1/2 cup fine semolina (sooji)',
              '2 tbsp ghee',
              '2 cups milk',
              '1/2 cup sugar',
              '1/2 tsp cardamom powder, a pinch of nutmeg',
              '2 tbsp raisins, chopped almonds',
              '1 tsp rose water',
              '1 egg (optional), beaten — omit for a vegetarian ravo',
            ],
          },
        ],
        method: [
          'Roast the semolina in the ghee on low heat for 3–4 minutes, until it smells fragrant but is not coloured.',
          'Heat the milk with the sugar, nutmeg and cardamom. Pour into the semolina, stirring constantly to avoid lumps.',
          'Cook on low heat for 5–6 minutes until thick and creamy.',
          'If using egg, remove from the heat, cool for a minute, and beat in the egg briskly.',
          'Fold in the nuts, raisins and rose water.',
        ],
        offering: 'Served at Navroz, birthdays and special occasions, with sev.',
        tips: ['The pudding should be soft and pourable; it firms up as it cools.'],
      },
    ],
  },

  // ───────────────────────────── KARTHIGAI PORI ─────────────────────────────
  {
    id: 'karthigai-pori',
    name: 'Karthigai Pori',
    alsoCalled: 'Pori Urundai · Malar · பொரி உருண்டை',
    category: 'Sweet',
    summary: 'Puffed rice bound with jaggery, offered at Karthigai Deepam.',
    meaning:
      'On Karthigai Deepam, rows of lamps are lit, and the offering is pori (puffed rice) — one of the oldest festival foods of Tamil Nadu. Loose pori is flavoured with jaggery, coconut and cardamom, and pori urundai is the same, shaped into balls.',
    variants: [
      {
        id: 'tamil-nadu',
        region: 'Tamil Nadu',
        culture: 'Tamil Shaiva households and temples',
        title: 'Karthigai Pori and Pori Urundai',
        intro:
          'Pori is mixed with a thick jaggery syrup, fresh coconut slivers, roasted gram and cardamom, and either offered loose or shaped into balls.',
        serves: '10 urundai',
        prep: '10 min',
        cook: '15 min',
        ingredients: [
          {
            items: [
              '4 cups pori (puffed rice), dry and crisp',
              '3/4 cup powdered jaggery',
              '1/4 cup water',
              '1/4 cup fresh coconut slivers',
              '2 tbsp roasted gram (pottukadalai)',
              '1/2 tsp cardamom powder',
              '1/4 tsp dry ginger powder',
              '1 tsp ghee',
            ],
          },
        ],
        method: [
          'Warm the pori in a pan for 2 minutes so that it is crisp; set aside.',
          'Boil the jaggery with the water and strain; cook to a firm-ball stage (a drop in cold water forms a hard ball).',
          'Add the ghee, cardamom and ginger to the syrup.',
          'Quickly pour it over the pori with the coconut and roasted gram and mix well.',
          'For urundai, wet your palms and shape balls while warm.',
        ],
        offering:
          'Offered at the lighting of the Karthigai lamps with nei appam, Murugan and Shiva shrines. Distributed to children.',
        tips: ['Work fast or the syrup will harden. Wet your palms in cold water for shaping.'],
      },
    ],
  },

  // ───────────────────────────── KHEEL BATASHA ─────────────────────────────
  {
    id: 'kheel-batasha',
    name: 'Kheel, Batasha & Moa',
    alsoCalled: 'Lakshmi Puja puffed rice · Muri’r Moa · खील-बताशे',
    category: 'Offering mix',
    summary: 'Puffed rice and sugar drops for Lakshmi — and Bengal’s puffed-rice jaggery balls.',
    meaning:
      'Diwali’s Lakshmi Puja is not complete without kheel (puffed paddy) and batasha (sugar drops). They are light and pure, and symbolise the new harvest. In Bengal the same puffed rice is bound with jaggery into moa.',
    variants: [
      {
        id: 'north-india-lakshmi',
        region: 'North & West India',
        culture: 'Hindi-belt, Marwari and Gujarati households — Diwali Lakshmi Puja',
        title: 'Kheel-Batasha Offering',
        intro:
          'The offering plate carries kheel (puffed paddy), batasha, mishri and a coconut. Batasha is easy to make at home from a thick sugar syrup.',
        serves: '15–20 batasha',
        prep: '5 min',
        cook: '15 min',
        ingredients: [
          {
            group: 'Batasha',
            items: ['1 cup sugar', '1/4 cup water', '1 tsp lemon juice', '1/4 tsp cardamom (optional)'],
          },
          {
            group: 'Plate',
            items: ['2 cups kheel (puffed paddy)', '2 tbsp mishri', '1 small coconut', '2 tbsp coriander seeds (optional)'],
          },
        ],
        method: [
          'Boil the sugar and water to a thick syrup; add lemon juice to prevent crystallisation. Cook until the syrup reaches the soft-crack stage (it forms a hard thread).',
          'Whip the syrup with a spoon for 1–2 minutes until it turns opaque and creamy.',
          'Drop in coin-sized spoonfuls onto a greased tray and cool for 10 minutes.',
          'Arrange the kheel in a bowl, the batasha and mishri beside it on a clean plate with the coconut.',
        ],
        offering:
          'Offered at Lakshmi–Ganesha puja on Diwali night, and afterwards distributed as prasad.',
        tips: ['Don’t make batasha on a humid day — it will stay sticky.'],
        differs: 'Dry puffed paddy and sugar drops; no jaggery.',
      },
      {
        id: 'bengal-muri-moa',
        region: 'West Bengal & Odisha',
        culture: 'Bengali and Odia households — Lakshmi Puja, Poush Sankranti',
        title: 'Muri’r Moa (puffed-rice balls)',
        intro:
          'Crisp puffed rice bound with caramelised jaggery syrup, shaped into rounds. In winter, nolen gur gives it its distinctive aroma.',
        serves: '12 moa',
        prep: '5 min',
        cook: '15 min',
        ingredients: [
          {
            items: [
              '4 cups muri (puffed rice)',
              '1 cup jaggery (nolen gur if possible)',
              '2 tbsp water',
              '1/2 tsp cardamom powder',
              '1 tsp ghee',
              '2 tbsp coconut pieces (optional)',
            ],
          },
        ],
        method: [
          'Toast the muri in a dry pan for 2 minutes to crisp it.',
          'Melt the jaggery with the water and bring to a boil; cook until a drop in cold water forms a hard ball.',
          'Add cardamom and ghee. Pour over the muri and coconut and mix.',
          'Shape into balls with wet palms before it hardens.',
        ],
        offering: 'Offered to Lakshmi on Kojagori Lakshmi Puja and Poush Sankranti.',
        tips: ['Test the syrup in cold water; it must be firm for moa to hold.'],
        differs: 'Jaggery-bound puffed rice balls.',
      },
    ],
  },

  // ───────────────────────────── DIWALI FARAL ─────────────────────────────
  {
    id: 'diwali-faral',
    name: 'Diwali Faral',
    alsoCalled: 'Faraal · Chivda, Ladoo & Chakli · दिवाळी फराळ',
    category: 'Sweet',
    summary: 'Maharashtra’s Diwali plate: chivda, besan ladoo and chakli (with karanji).',
    meaning:
      'The Maharashtrian Diwali morning begins with an oil bath and faral, the family snack plate: sweet and salty, fried and roasted. A small portion is offered to the deity first. Karanji is also part of the faral — see the Gujiya page for the Maharashtra version.',
    variants: [
      {
        id: 'maharashtra',
        region: 'Maharashtra',
        culture: 'Marathi households — Narak Chaturdashi, Lakshmi Puja',
        title: 'Chivda, Besan Ladoo and Bhajani Chakli',
        intro:
          'Three core items of the faral that can be made in a day: crisp poha chivda, ghee-rich besan ladoo, and spiral chakli made with the multi-grain bhajani flour.',
        serves: '10–12 people',
        prep: '1 hr',
        cook: '1.5 hrs',
        ingredients: [
          {
            group: 'Poha chivda',
            items: [
              '4 cups thin (patla) poha',
              '1/3 cup peanuts, 1/4 cup roasted chana dal, 2 tbsp dried coconut slices',
              '1/4 cup oil',
              '1 tsp mustard seeds, 10 curry leaves, 2 green chillies',
              '1/2 tsp turmeric, 1 tsp sugar, salt, a pinch of hing',
            ],
          },
          {
            group: 'Besan ladoo',
            items: [
              '2 cups coarse besan',
              '3/4 cup ghee',
              '3/4 cup powdered sugar',
              '1/2 tsp cardamom',
              '2 tbsp chopped almonds/cashews',
            ],
          },
          {
            group: 'Bhajani chakli',
            items: [
              '2 cups bhajani flour (roasted multi-grain: jowar, rice, chana dal, urad, wheat)',
              '1.5 tbsp white sesame, 1 tsp cumin, 1 tsp red chilli powder, 1/2 tsp turmeric, hing',
              '3 tbsp hot oil, salt, water to knead',
              'Oil for frying',
            ],
          },
        ],
        method: [
          'Chivda: roast the poha in a wide kadai for 8–10 minutes until it is crisp. Heat the oil, add mustard, curry leaves and chillies, then peanuts, chana dal and coconut; toast. Add the turmeric, sugar, salt and hing, and fold in the poha. Cool before storing.',
          'Besan ladoo: roast the besan in ghee on low heat for 15–20 minutes until it is golden and smells nutty. Cool for 10 minutes. Add the sugar, cardamom and nuts, mix, and shape into ladoos while still warm.',
          'Chakli: mix the bhajani flour with sesame, cumin, chilli, turmeric, hing, salt and hot oil. Knead with warm water into a smooth, soft dough.',
          'Fill a chakli press with the dough and press out spirals onto a greased plate. Fry in medium-hot oil until golden and crisp. Cool completely.',
          'Offer a small portion of each to the deity before serving the rest.',
        ],
        offering: 'Offered at Lakshmi Puja and shared on the morning of Narak Chaturdashi with a cup of tea.',
        tips: [
          'Roast the besan slowly — rushed besan tastes raw.',
          'Chakli dough must be soft but not sticky; too stiff and the chakli breaks.',
        ],
      },
    ],
  },

  // ───────────────────────────── LOHRI ─────────────────────────────
  {
    id: 'lohri-til-rewari',
    name: 'Til Rewari & Gur Gajak',
    alsoCalled: 'Lohri bonfire offerings · तिल रेवड़ी',
    category: 'Sweet',
    summary: 'Sesame–sugar rewari and gur gajak, thrown into the Lohri fire with popcorn and peanuts.',
    meaning:
      'On Lohri, til (sesame), gur (jaggery), rewari, gajak, popcorn and peanuts are offered to the bonfire and then shared. Sesame and jaggery are warming foods, and the fire is thanked for the harvest.',
    variants: [
      {
        id: 'punjab',
        region: 'Punjab, Haryana & Delhi',
        culture: 'Punjabi households — Lohri',
        title: 'Til Rewari and Gur Gajak',
        intro:
          'Rewari are small sugar-coated sesame discs, while gajak is a chewy-crunchy slab of sesame and jaggery.',
        serves: '20 pieces',
        prep: '10 min',
        cook: '20 min',
        ingredients: [
          {
            group: 'Til rewari',
            items: ['1/2 cup sugar', '2 tbsp water', '1/2 cup white sesame, roasted', '1 tsp ghee', '1/4 tsp cardamom'],
          },
          {
            group: 'Gur gajak',
            items: ['1 cup jaggery, chopped', '1.5 cups sesame seeds, roasted', '1 tbsp ghee', '2 tbsp crushed peanuts'],
          },
          {
            group: 'Bonfire offering',
            items: ['2 cups popcorn', '1/2 cup roasted peanuts', '1/2 cup makhana', '2 tbsp jaggery cubes'],
          },
        ],
        method: [
          'For rewari: melt the sugar with the water and boil until golden and sticky (hard-ball stage). Add the sesame, ghee and cardamom quickly, drop spoonfuls onto a greased surface and flatten. Cool.',
          'For gajak: melt the jaggery with the ghee to the hard-crack stage, add the sesame and peanuts, mix fast, pour onto a greased plate, roll thin, and cut when warm.',
          'Mix the popcorn, peanuts, makhana and jaggery as the bonfire offering.',
          'Throw a handful into the bonfire with a prayer for prosperity, and then distribute the rest.',
        ],
        offering: 'Thrown into the Lohri bonfire as an offering and then eaten by all who gathered around it.',
        tips: ['Work fast with hot syrup. Grease your hands, cutter and surface.'],
      },
    ],
  },

  // ───────────────────────────── SUNTHAVDA ─────────────────────────────
  {
    id: 'sunthavda',
    name: 'Sunthavda',
    alsoCalled: 'Sunth Vade · Dry-ginger ladoo · सुंठवडा',
    category: 'Sweet',
    summary: 'Warming dry-ginger and coconut prasad of Ram Navami and Datta Jayanti in Maharashtra.',
    meaning:
      'Sunthavda, made from dry ginger (sunth), jaggery or sugar, dried coconut and dry fruits, is distributed after the noon aarti on Ram Navami and on Dattatreya Jayanti in Maharashtra. The ginger is warming and digestive. Recipes vary from family to family.',
    variants: [
      {
        id: 'maharashtra',
        region: 'Maharashtra',
        culture: 'Marathi Brahmin households; Datta temples',
        title: 'Sunthavda',
        intro:
          'A fragrant crumble of dry-ginger powder, dry coconut, poppy seeds, jaggery and ghee, eaten in a spoonful or shaped into small balls.',
        serves: '12–15 small servings',
        prep: '10 min',
        cook: '10 min',
        ingredients: [
          {
            items: [
              '1/4 cup dry ginger powder (sunth)',
              '1 cup dry coconut (kopra), grated and lightly toasted',
              '1/2 cup jaggery (or sugar), grated',
              '2 tbsp ghee',
              '2 tbsp poppy seeds, roasted',
              '2 tbsp chopped almonds and cashews',
              '1/2 tsp cardamom powder',
              '1 tbsp edible gum (gond), fried (optional)',
            ],
          },
        ],
        method: [
          'Heat 1 tbsp ghee on low heat and roast the dry ginger powder for 1–2 minutes, until aromatic. Do not let it darken.',
          'Add the rest of the ghee, the coconut, poppy seeds, nuts and gond and toss for 2 minutes.',
          'Switch off the heat; mix in the jaggery and cardamom while the mix is warm so the jaggery softens and binds.',
          'Cool, then serve as crumble or roll into small marbles.',
        ],
        offering: 'Distributed after the noon aarti on Ram Navami (the hour of Rama’s birth) and on Dattatreya Jayanti.',
        tips: ['Go easy on the ginger — it is strong, and a little goes a long way.'],
      },
    ],
  },

  // ───────────────────────────── PINDA ─────────────────────────────
  {
    id: 'pinda',
    name: 'Pinda & Shraddha Offerings',
    alsoCalled: 'Pinda dana · Shraddha food · पिंड',
    category: 'Rice & Grain',
    summary: 'The sacred rice balls and the simple food offered to ancestors during Pitru Paksha.',
    meaning:
      'During Pitru Paksha, a pinda (ball of cooked rice, sesame and ghee) is offered to ancestors, along with water and black sesame (tarpan). The procedure, ingredients and mantras differ by family tradition (kula-paddhati), so the recipes below are the commonly followed outline. Please follow the instructions of your family priest.',
    variants: [
      {
        id: 'north-gaya',
        region: 'North & East India (Gaya tradition)',
        culture: 'Hindi-belt, Bihar and Bengal Shraddha tradition',
        title: 'Pinda (rice, sesame, ghee and honey)',
        intro:
          'Cooked rice mixed with black sesame, ghee, honey and sometimes barley flour or khoya, shaped into balls. At Gaya, pindas are offered at the Phalgu river and the Vishnupad temple.',
        serves: '3–5 pindas',
        prep: '10 min',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1/2 cup rice, cooked soft and still warm',
              '1 tbsp black sesame seeds',
              '1 tbsp ghee',
              '1 tbsp honey',
              '1 tbsp barley flour (jau ka atta), optional',
              'Kusha grass, tulsi leaf',
              'A little milk',
            ],
          },
        ],
        method: [
          'Cook the rice with no salt or spice. Cool until just warm.',
          'Mix with the sesame, ghee, honey and barley flour (if used) while the rice is still pliable.',
          'Shape into firm balls with clean hands, usually in odd numbers (1, 3 or 5).',
          'Offer on kusha grass, with water and black sesame, facing south, following the priest’s mantras.',
          'After the rite, the pindas are given to a cow, to crows or immersed in flowing water.',
        ],
        offering: 'Offered to ancestors in the shraddha rite, then given to a cow or immersed in a river.',
        tips: ['Never add salt, onion, garlic or spice.'],
      },
      {
        id: 'south-tamil',
        region: 'Tamil Nadu & South India',
        culture: 'Tamil, Telugu and Kannada Brahmin households — Mahalaya Amavasya',
        title: 'Pinda and Shraddha Bhojan',
        intro:
          'In the South, a pinda of cooked rice with black sesame and ghee is offered during the tarpana. The shraddha meal itself consists of rice, dal, a few vegetable preparations, payasam and vada, cooked without onion or garlic.',
        serves: '3 pindas + the meal',
        prep: '20 min',
        cook: '45 min',
        ingredients: [
          {
            group: 'Pinda',
            items: ['1/2 cup rice, cooked', '1 tbsp black sesame (ellu)', '1 tbsp ghee'],
          },
          {
            group: 'Shraddha meal (commonly)',
            items: [
              'Plain rice and moong dal (paruppu)',
              'Pumpkin or banana-stem kootu',
              'Vazhakkai (raw banana) curry',
              'Spinach or arai-keerai',
              'Vada (urad dal, unseasoned with onion)',
              'Sweet payasam',
            ],
          },
        ],
        method: [
          'Cook the rice and form three pindas with sesame and ghee.',
          'Prepare the meal without onion, garlic or asafoetida in some families; follow the family custom.',
          'Offer the pindas and the food in the ritual, then eat the meal after the offering.',
        ],
        offering: 'Offered at the tarpana; the meal follows after the priest’s rites are over.',
        tips: ['Check with elders about the exact menu; it differs by community.'],
      },
    ],
  },
]
