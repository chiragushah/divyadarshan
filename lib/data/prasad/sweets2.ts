import type { PrasadRecipe } from './types'

// Festival sweets, part 2: kheer & payasam, halwa family, pongal, thekua,
// aravana payasam, appam, pitha, ghewar, khaja.

export const SWEETS_2: PrasadRecipe[] = [
  // ───────────────────────────── KHEER / PAYASAM ─────────────────────────────
  {
    id: 'kheer-payasam',
    name: 'Kheer & Payasam',
    alsoCalled: 'Payesh · Payasa · Pradhaman · Khiri · खीर',
    category: 'Sweet',
    summary: 'Milk-and-rice (or flake, or vermicelli) pudding — the most widespread festive prasad in India.',
    meaning:
      'The same pudding, five different dishes: slow-cooked milk kheer in the North, fragrant Gobindobhog-rice payesh with date-palm jaggery in Bengal, coconut-milk ada pradhaman in Kerala, rich paal payasam in Tamil Nadu, and the simple milk-rice offered to the Buddha. Sharad Purnima’s kheer is left under the moon; Onam’s pradhaman is the closing course of the sadya.',
    variants: [
      {
        id: 'north-sharad-purnima',
        region: 'North India',
        culture: 'Vaishnava households — Sharad Purnima, Dev Uthani, Diwali',
        title: 'Chandra-Amrit Kheer (Sharad Purnima kheer)',
        intro:
          'Rice cooked for a long time in full-fat milk until creamy, flavoured with cardamom and saffron, and placed under the full moon on Sharad Purnima night. Tradition says the moonlight turns it to amrit.',
        serves: '6–8 servings',
        prep: '10 min',
        cook: '50 min',
        ingredients: [
          {
            items: [
              '1.5 litres full-fat milk',
              '1/4 cup (50 g) basmati or any short-grain rice, washed and soaked 30 minutes',
              '1/2 cup sugar, or to taste',
              '1 tbsp ghee',
              '1/2 tsp cardamom powder',
              '10–12 saffron strands soaked in 2 tbsp warm milk',
              '2 tbsp chopped almonds and 1 tbsp chironji or pistachios',
              '1 tbsp raisins',
              '1 tsp rose water or kewra (optional)',
            ],
          },
        ],
        method: [
          'Heat the ghee in a heavy-bottomed pan, add the drained rice and fry 2 minutes until fragrant.',
          'Add the milk and bring to a boil, stirring often. Reduce to low and simmer for 40–45 minutes, scraping the sides back in, until the milk reduces by a third and the rice is soft and breaking.',
          'Add the sugar and cardamom and simmer for 5 minutes more.',
          'Stir in the saffron milk, nuts and raisins.',
          'Cool the kheer, cover it with a fine muslin cloth, and place it on a roof or balcony in the moonlight for the night.',
          'Offer it to the deity at dawn, then eat as prasad.',
        ],
        offering:
          'Offered to Lakshmi and Krishna on Sharad Purnima, and consumed after moonlight exposure, often with a needle thread for good eyesight.',
        tips: [
          'Cook on low heat and keep stirring; the kheer should be pale ivory, not brown.',
          'The kheer thickens as it cools — remove it from the heat when it still looks a little thin.',
          'If you do not have moonlight, serve it fresh after a full chill; the prayer matters more than the position.',
        ],
        differs: 'Milk-heavy, basmati rice, saffron; set out in moonlight.',
      },
      {
        id: 'bengal-payesh',
        region: 'West Bengal',
        culture: 'Bengali households — Durga Puja, Lakshmi Puja, Poila Boishakh',
        title: 'Payesh (Gobindobhog payesh)',
        intro:
          'Bengal’s payesh is built on small, sticky, fragrant Gobindobhog rice, bay leaves and cardamom. In winter it is sweetened with nolen gur (date-palm jaggery); at other times sugar is used.',
        serves: '6 servings',
        prep: '10 min',
        cook: '45 min',
        ingredients: [
          {
            items: [
              '1.25 litres full-fat milk',
              '1/4 cup (50 g) Gobindobhog rice (or any short aromatic rice), washed, drained and dried briefly',
              '1 tsp ghee',
              '1 bay leaf (tejpata)',
              '2 green cardamom pods',
              '1/3 cup sugar, or 1/2 cup nolen gur (jaggery) added at the end',
              '1 tbsp cashews and 1 tbsp raisins, fried in ghee',
            ],
          },
        ],
        method: [
          'Heat the ghee in a heavy pan and fry the bay leaf and cardamom for 20 seconds.',
          'Add the rice and fry for a minute.',
          'Pour in the milk and bring to a boil. Reduce heat and simmer for 35–40 minutes, stirring from the bottom, until the rice breaks down and the payesh is creamy.',
          'If using sugar, add it now and simmer for 3–5 minutes. If using nolen gur, take the pan off the heat, let the milk stop bubbling, then stir in the gur; adding jaggery to boiling milk curdles it.',
          'Fry the cashews and raisins in ghee and fold them in.',
          'Serve warm or chilled.',
        ],
        offering:
          'Offered to Durga on Ashtami and Dashami and to Lakshmi on Kojagori Lakshmi Puja; also part of the annabhog thali at the pandal.',
        tips: [
          'Never add gur to boiling milk — cool it slightly first.',
          'Gobindobhog rice has a unique aroma; if you cannot find it, use kalijira or short-grain aromatic rice.',
        ],
        differs: 'Gobindobhog rice, tejpata and nolen gur; slightly looser.',
      },
      {
        id: 'kerala-ada-pradhaman',
        region: 'Kerala',
        culture: 'Malayali households — Onam Sadya, Vishu, temple vazhipadu',
        title: 'Ada Pradhaman',
        intro:
          'A jaggery payasam built on rice flakes (ada) and three extractions of coconut milk, finished with ghee-fried coconut bits and cashews. It is dark amber and glossy, and is the grand finale of the Onam sadya.',
        serves: '8 servings',
        prep: '20 min',
        cook: '50 min',
        ingredients: [
          {
            items: [
              '1/2 cup (about 100 g) rice ada (flakes)',
              '300 g jaggery (a dark Kerala-style one, if available)',
              '3 cups thin coconut milk (the 3rd extract)',
              '1.5 cups thick coconut milk (the 2nd)',
              '1 cup thickest coconut milk (the 1st)',
              '2 tbsp ghee',
              '1/3 cup coconut pieces (thenga kothu), thin slivers',
              '2 tbsp cashews and 1 tbsp raisins',
              '1 tsp ground cardamom, 1/2 tsp dry ginger powder, 1/4 tsp cumin powder',
            ],
          },
        ],
        method: [
          'Soak the ada in warm water for 15 minutes, drain and rinse; if it is large, break it into smaller pieces.',
          'Melt the jaggery with 1/2 cup water, strain it through a cloth to remove grit, and bring to a gentle boil.',
          'Add the soaked ada and cook for 10 minutes until it turns translucent and begins to absorb the syrup.',
          'Add the thin (third) coconut milk and simmer for 15 minutes, stirring, until reduced and thickened.',
          'Add the second thick milk and cook for 10 minutes; do not let it boil hard.',
          'Reduce the heat and stir in the first (thickest) milk with the cardamom, dry ginger and cumin. Warm through for 2 minutes and switch off.',
          'Fry the coconut slivers, cashews and raisins in ghee until golden; pour over the payasam.',
        ],
        offering:
          'Served as the final course of the Onam sadya on a banana leaf, and offered at temple vazhipadu for Maha Vishnu and Bhagavathy.',
        tips: [
          'Add the first, thickest coconut milk last and never boil it, or it splits.',
          'The ada should be soaked and not boiled to mush before the jaggery goes in — jaggery hardens it.',
        ],
        differs: 'Coconut milk and jaggery; rice flakes; no dairy milk.',
      },
      {
        id: 'tamil-paal-payasam',
        region: 'Tamil Nadu',
        culture: 'Tamil households — Varalakshmi Vratam, Karthigai, Puthandu',
        title: 'Paal Payasam',
        intro:
          'Tamil Nadu’s milk payasam is cooked until it turns a pale pink-gold from the Maillard browning of slow-simmered milk and sugar. It is rich, set with a little rice, and flavoured with cardamom and ghee-fried cashews.',
        serves: '6 servings',
        prep: '10 min',
        cook: '50 min',
        ingredients: [
          {
            items: [
              '1 litre full-fat milk',
              '1/4 cup (50 g) raw rice, washed and drained',
              '1/2 cup sugar',
              '1/4 cup water',
              '1/2 tsp cardamom powder',
              '1 tbsp ghee',
              '8 cashews, 1 tbsp raisins',
              '1 pinch edible camphor (optional)',
            ],
          },
        ],
        method: [
          'Cook the rice with the water and 1/2 cup of the milk in a pressure cooker (3 whistles) or until soft and mashable.',
          'Bring the remaining milk to a boil in a thick pan. Add the cooked rice and simmer for 20–25 minutes on low flame, stirring often.',
          'Add the sugar and continue simmering for 10–15 minutes, until the payasam turns a light rose-gold and thickens.',
          'Add the cardamom and edible camphor.',
          'Fry the cashews and raisins in ghee and add them.',
        ],
        offering:
          'Offered with other sweets at Varalakshmi Vratam and given to women as tamboolam; also offered at Chitra Pournami to Chitragupta.',
        tips: [
          'The slow caramelisation is what makes paal payasam different from a simple kheer — do not hurry.',
        ],
        differs: 'Cooked until pink-gold; very smooth; cardamom and camphor.',
      },
      {
        id: 'odisha-khiri',
        region: 'Odisha',
        culture: 'Odia households — Nuakhai, Raja, temple bhog',
        title: 'Khiri (Nua Anna Khiri)',
        intro:
          'Odia khiri is a simple, pure milk-and-rice kheer made from the new harvest rice at Nuakhai, flavoured with cardamom, kewra and a touch of camphor. It is offered to the family deity (Samaleswari in western Odisha) with the first rice of the year.',
        serves: '6 servings',
        prep: '10 min',
        cook: '50 min',
        ingredients: [
          {
            items: [
              '1 litre full-fat milk',
              '1/4 cup new-crop rice (aromatic if available)',
              '1/3 cup sugar',
              '2 cardamom pods, crushed',
              '2 tbsp cashews and raisins',
              '1 tsp ghee',
              '2–3 drops of kewra water',
            ],
          },
        ],
        method: [
          'Wash and soak the rice for 20 minutes.',
          'Boil the milk with the rice, reducing the flame and cooking for 35–40 minutes until creamy.',
          'Add the sugar and cardamom and cook for 5 minutes more.',
          'Fry the cashews and raisins in ghee and add.',
          'Finish with kewra water off the heat.',
        ],
        offering:
          'At Nuakhai the new rice is first offered to the deity as “Nua anna” along with this khiri, and then eaten by the family together, with elders blessing the young.',
        tips: ['Use new-crop rice if you have it — it cooks softer and sweeter.'],
        differs: 'New-harvest rice, kewra; pared-down flavouring.',
      },
      {
        id: 'sujata-kheer',
        region: 'Bihar (Bodh Gaya) — Buddhist tradition',
        culture: 'Buddhist pilgrims; Buddha Purnima',
        title: 'Sujata’s Kheer (milk-rice)',
        intro:
          'On the day before the Enlightenment, a village girl named Sujata offered milk-rice to Siddhartha. Buddhists at Bodh Gaya recreate this simple, unspiced offering on Buddha Purnima.',
        serves: '6 servings',
        prep: '5 min',
        cook: '40 min',
        ingredients: [
          {
            items: [
              '1 litre full-fat milk',
              '1/4 cup rice, washed',
              '2 tbsp honey or jaggery (added at the end, after cooling)',
              'A pinch of cardamom (optional)',
            ],
          },
        ],
        method: [
          'Bring the milk to a boil in a clean pot. Add the rice.',
          'Simmer on low heat for 35–40 minutes, stirring, until the rice is soft and the milk is creamy.',
          'Let it cool for 10 minutes before adding the honey or jaggery.',
          'Offer in a clean bowl to the Buddha image, along with lamps and flowers, and serve to the community.',
        ],
        offering:
          'Offered in a simple bowl before the Buddha, along with flowers, lamps and incense, then shared with the congregation.',
        tips: ['Keep it plain — the offering is about simplicity.'],
        differs: 'Unspiced; honey added off the heat.',
      },
    ],
  },

  // ───────────────────────────── HALWA / SHEERA ─────────────────────────────
  {
    id: 'halwa-sheera',
    name: 'Halwa, Sheera & Kada Prasad',
    alsoCalled: 'Karah Prasad · Sheera · Shiro · Satyanarayana Prasadam · कड़ा प्रसाद',
    category: 'Sweet',
    summary: 'Sweet semolina or wheat halwa — Satyanarayan puja, gurdwara and Annavaram.',
    meaning:
      'This humble halwa travels under many names. A Sikh gurdwara serves kada (karah) prasad, made of equal parts of atta, ghee and sugar, with no fruit or additions. Maharashtra and Gujarat make sheera for Satyanarayan with semolina, banana and milk. The famous Annavaram Satyanarayana Swamy temple in Andhra serves a broken-wheat (godhuma rava) prasadam wrapped in leaves.',
    variants: [
      {
        id: 'sikh-kada-prasad',
        region: 'Punjab & Sikh gurdwaras everywhere',
        culture: 'Sikh tradition — Baisakhi, Guru Nanak Jayanti, Hola Mohalla',
        title: 'Kada (Karah) Prasad',
        intro:
          'Equal parts of whole-wheat flour (atta), pure ghee and sugar, in a 1:1:1 ratio, with water, cooked in a clean iron kadahi while the Gurbani is recited. It is plain by design: no nuts, no cardamom, no saffron.',
        serves: '8–10 small servings',
        prep: '5 min',
        cook: '20 min',
        ingredients: [
          {
            items: [
              '1 cup (120 g) whole-wheat flour (atta)',
              '1 cup (220 g) pure desi ghee',
              '1 cup (200 g) sugar',
              '2 cups water',
            ],
          },
        ],
        method: [
          'Bathe and cover your head before starting. Use a clean iron or heavy steel kadahi.',
          'Melt the ghee over low heat. Add the atta and roast, stirring constantly with a flat spoon, for 12–15 minutes until it turns golden-brown, nutty-smelling and releases ghee at the edges.',
          'In a separate pot bring the sugar and water to a boil, stirring until the sugar is dissolved.',
          'Standing back, pour the hot syrup gradually into the roasted atta (it splatters), stirring continuously.',
          'Cook for 3–5 minutes, until the halwa thickens, leaves the pan and the ghee shows on the surface.',
          'Cover with a clean cloth. Place before the Guru Granth Sahib for Ardas, then distribute.',
        ],
        offering:
          'Offered after the Ardas and distributed in equal portions to everyone who comes, received with both hands cupped. No distinction of caste or status is made.',
        tips: [
          'Roast slowly and thoroughly — under-roasted atta tastes raw.',
          'The syrup must be boiling hot when added, or the halwa becomes lumpy.',
        ],
        differs: 'Atta-ghee-sugar 1:1:1, plain — no spices or fruit.',
      },
      {
        id: 'maharashtra-gujarat-sheera',
        region: 'Maharashtra & Gujarat',
        culture: 'Marathi and Gujarati households — Satyanarayan puja',
        title: 'Satyanarayan Sheera (sava-measure prasad)',
        intro:
          'A golden semolina halwa made with ghee, sugar, milk and banana. Cooked in a 1:1:1:1 ratio (sooji–ghee–sugar–milk/water) with sliced banana, it is the traditional prasad of the Satyanarayan puja.',
        serves: '6–8 servings',
        prep: '5 min',
        cook: '20 min',
        ingredients: [
          {
            items: [
              '1 cup (170 g) coarse semolina (sooji / rava)',
              '1/2 cup (110 g) ghee',
              '1 cup sugar (reduce to 3/4 cup if you like it less sweet)',
              '1.5 cups hot milk + 1.5 cups hot water, mixed',
              '1 ripe banana, thinly sliced',
              '1/2 tsp cardamom powder',
              '2 tbsp cashews and raisins',
              '10 tulsi leaves (added at the end)',
            ],
          },
        ],
        method: [
          'Heat the ghee in a heavy kadai. Roast the semolina on low heat, stirring, for 10–12 minutes until it is golden and fragrant. Do not rush; raw semolina will taste pasty.',
          'Add the cashews and raisins in the last minute.',
          'Carefully pour in the hot milk and water mixture (it will sputter). Stir hard to avoid lumps; cook until the liquid is absorbed.',
          'Add the sugar and stir; the sheera loosens at first, then thickens again within 3–4 minutes.',
          'Fold in the banana slices and cardamom, cover for 2 minutes and switch off.',
          'Place tulsi leaves on top as prasad.',
        ],
        offering:
          'Prepared fresh for the puja. Tradition measures the sheera in “sava” (one-and-a-quarter) portions — for example 1¼ cups each of semolina, ghee, sugar and liquid — and distributes it after the katha.',
        tips: [
          'Use hot liquids; cold liquids make semolina lumpy.',
          'Add the banana last, only to warm through.',
        ],
        differs: 'Semolina with banana; milk and water; tulsi on top.',
      },
      {
        id: 'andhra-annavaram',
        region: 'Andhra Pradesh (Annavaram-style)',
        culture: 'Telugu Vaishnava — Satyanarayana Swamy vratam',
        title: 'Godhuma Rava Prasadam',
        intro:
          'The Annavaram temple’s legendary prasadam is made from broken wheat (godhuma rava), ghee, jaggery or sugar, and cardamom, and is shaped into a dense, dark-golden cake served in leaves. It is richer in wheat flavour than the semolina sheera.',
        serves: '6–8 servings',
        prep: '10 min',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1 cup (150 g) broken-wheat rava (godhuma rava / dalia)',
              '1/2 cup (110 g) ghee',
              '1 cup jaggery (or sugar), grated',
              '3 cups water + 1/2 cup milk',
              '1/2 tsp cardamom powder',
              '2 tbsp cashews and raisins',
              '1 ripe banana, mashed (optional)',
            ],
          },
        ],
        method: [
          'Dissolve the jaggery in the hot water, strain, and keep at a gentle simmer.',
          'In a heavy kadai heat the ghee, fry the cashews and raisins and remove.',
          'Roast the wheat rava in the same ghee for 8–10 minutes on low heat until it darkens slightly and smells toasty.',
          'Pour in the hot jaggery water and milk, stirring, and cook covered on low heat for 12–15 minutes until all the liquid is absorbed.',
          'Add the cardamom, banana and fried nuts, and pat down with a spoon.',
          'Serve in leaf plates; at Annavaram the prasadam is handed out wrapped in leaves.',
        ],
        offering:
          'Offered to Satyanarayana Swamy and shared as the main prasadam after the vratam.',
        tips: [
          'Broken wheat needs more water and more time than semolina.',
          'Jaggery gives the characteristic dark amber colour.',
        ],
        differs: 'Broken wheat and jaggery; dense and dark; leaf-served.',
      },
    ],
  },

  // ───────────────────────────── SAKKARAI PONGAL ─────────────────────────────
  {
    id: 'sweet-pongal',
    name: 'Sweet Pongal',
    alsoCalled: 'Sakkarai Pongal · Chakkera Pongali · Sihi Pongal · சர்க்கரைப் பொங்கல்',
    category: 'Rice & Grain',
    summary: 'Rice and moong dal cooked with jaggery, ghee and cardamom — the harvest offering to Surya.',
    meaning:
      'Pongal means “to boil over”. The sweet pongal is the central prasad of Pongal, Makar Sankranti in the South, Ratha Saptami and Varalakshmi Vratam. The pot is allowed to bubble over as a sign of abundance, and the first spoonful goes to Surya. Tamil, Telugu and Kannada cooks all make it differently.',
    variants: [
      {
        id: 'tamil-sakkarai',
        region: 'Tamil Nadu',
        culture: 'Tamil households — Thai Pongal, temple prasadam',
        title: 'Sakkarai Pongal',
        intro:
          'Tamil sakkarai pongal is cooked in milk and water, with roasted moong dal, jaggery, ghee, cardamom, edible camphor and loads of cashew and raisin. It is served just thin enough to flow.',
        serves: '6–8 servings',
        prep: '10 min',
        cook: '30 min',
        ingredients: [
          {
            items: [
              '1/2 cup (100 g) raw rice (preferably new-crop)',
              '1/4 cup (50 g) yellow moong dal, dry roasted',
              '1 cup (200 g) powdered jaggery',
              '2 cups water + 1 cup milk',
              '1/4 cup (55 g) ghee, plus 2 tbsp for frying',
              '1/2 tsp cardamom powder',
              '10 cashews, 1 tbsp raisins, 1 tbsp coconut pieces',
              'A pinch of edible camphor (pachai karpooram)',
            ],
          },
        ],
        method: [
          'Wash the rice, add the roasted moong dal and cook with the milk and water in a pressure cooker (3–4 whistles) until completely soft. Mash well.',
          'Melt the jaggery with 1/2 cup water, strain out any impurities and boil for 3 minutes.',
          'Add the cooked rice-dal to the jaggery syrup and mix over a low flame for 5–7 minutes until it comes together.',
          'Add 2–3 tbsp ghee, stirring, and continue until the pongal turns glossy and thickens.',
          'Fry the cashews, raisins and coconut in 2 tbsp ghee and add along with the cardamom and edible camphor.',
          'Finish with a spoonful of ghee on top.',
        ],
        offering:
          'Cooked outdoors in a new clay pot in the sun on Thai Pongal. When it boils over, the family shouts “Pongalo Pongal”. The first portion goes to Surya on a banana leaf with sugarcane.',
        tips: [
          'Pongal thickens as it cools; leave it a little loose.',
          'Strain the jaggery syrup to remove grit and impurities.',
        ],
        differs: 'Milk-and-water cooked; loose and glossy; cashews, coconut and camphor.',
      },
      {
        id: 'andhra-chakkera',
        region: 'Andhra Pradesh & Telangana',
        culture: 'Telugu households — Ratha Saptami, Sankranti',
        title: 'Chakkera Pongali',
        intro:
          'Telugu chakkera pongali is cooked with whole milk, firm and fragrant, with more ghee and a pinch of nutmeg. It is firmer than the Tamil version and is cut into pieces for offering.',
        serves: '6–8 servings',
        prep: '10 min',
        cook: '35 min',
        ingredients: [
          {
            items: [
              '1/2 cup raw rice',
              '1/4 cup moong dal, roasted',
              '1 cup jaggery',
              '2 cups milk + 1 cup water',
              '1/3 cup ghee',
              '1/2 tsp cardamom powder, a pinch of nutmeg',
              '2 tbsp cashews and raisins',
            ],
          },
        ],
        method: [
          'Cook the rice and dal in milk and water until very soft, mashing at the end.',
          'In a separate pan, melt the jaggery in 1/2 cup water and strain.',
          'Combine and cook on low heat, stirring, until thick and the ghee separates.',
          'Add cardamom, nutmeg and fried nuts.',
        ],
        offering:
          'On Ratha Saptami it is cooked outdoors in the sun, in a clay pot, in the courtyard, and offered to Surya along with arka leaves.',
        tips: ['Set the pongali in a greased plate and cut into squares for easy offering.'],
        differs: 'Milk-based, firmer, nutmeg.',
      },
      {
        id: 'karnataka-sihi',
        region: 'Karnataka',
        culture: 'Kannada households — Sankranti, Gowri–Ganesha',
        title: 'Sihi Pongal',
        intro:
          'Karnataka’s sihi pongal is the lighter cousin — less ghee, plain jaggery, and a hint of grated coconut. It is made in a big pot for temple and community feasts.',
        serves: '6 servings',
        prep: '10 min',
        cook: '30 min',
        ingredients: [
          {
            items: [
              '1/2 cup rice',
              '1/4 cup moong dal',
              '3/4 cup jaggery',
              '1/4 cup grated coconut',
              '3 tbsp ghee',
              '1/2 tsp cardamom',
              '8 cashews, 1 tbsp raisins',
            ],
          },
        ],
        method: [
          'Cook the rice and dal in 3 cups water until soft and mash well.',
          'Add the melted jaggery and the grated coconut, simmer 5–8 minutes.',
          'Add the ghee and cardamom, then the fried nuts.',
        ],
        offering: 'Offered at Sankranti to Surya and at temple festivals.',
        tips: ['Add more water, not milk, for the Karnataka texture.'],
        differs: 'Water-cooked, coconut-flavoured.',
      },
    ],
  },

  // ───────────────────────────── THEKUA ─────────────────────────────
  {
    id: 'thekua',
    name: 'Thekua & Kasar',
    alsoCalled: 'Khajuria · Thokwa · ठेकुआ',
    category: 'Sweet',
    summary: 'Chhath Puja’s signature offering — a crisp wheat-jaggery biscuit — and its rice-flour laddu partner.',
    meaning:
      'Thekua is made at home, in a strictly pure kitchen, during the Chhath Puja. It is fried, not baked, with whole-wheat flour, jaggery and ghee, and pressed into a wooden mould. It is offered to Surya and Chhathi Maiya in the bamboo soop. The kasar (rice-flour laddu) is its companion.',
    variants: [
      {
        id: 'bihar-thekua',
        region: 'Bihar, Jharkhand & Eastern UP',
        culture: 'Bhojpuri, Maithil and Magahi households — Chhath',
        title: 'Thekua',
        intro:
          'A hard, crisp, fragrant biscuit with a long shelf life. It is made with whole-wheat flour, jaggery syrup, ghee, coconut and fennel and fried in ghee.',
        serves: '20 thekua',
        prep: '30 min',
        cook: '30 min',
        ingredients: [
          {
            items: [
              '2 cups (250 g) whole-wheat flour (atta)',
              '3/4 cup (150 g) jaggery',
              '1/3 cup water',
              '1/4 cup ghee for the dough (moyan), plus ghee for frying',
              '1/4 cup dry coconut, grated or sliced',
              '1 tsp fennel (saunf) seeds',
              '1/2 tsp cardamom powder',
              '1 tbsp chopped dry fruits (optional)',
            ],
          },
        ],
        method: [
          'Melt the jaggery in the water, strain and cool to lukewarm.',
          'Rub the ghee into the flour until it resembles breadcrumbs.',
          'Add the coconut, fennel and cardamom, and then the jaggery syrup gradually to form a stiff dough.',
          'Cover and rest for 20 minutes. Knead again until smooth.',
          'Shape into small balls, press each into a thekua mould (or flatten and mark with a fork).',
          'Fry in medium-hot ghee on low heat for 8–10 minutes, until deep golden and crisp throughout. Cool.',
        ],
        offering:
          'Prepared at home on the day of Kharna / Sandhya Arghya in a pure kitchen with no onion or garlic; offered in the bamboo soop to the setting and rising Sun.',
        tips: [
          'The dough must be stiff. A soft dough makes oily, flat thekua.',
          'Fry slowly. They should crisp from the inside; fast frying leaves a raw centre.',
        ],
        differs: 'Fried wheat–jaggery biscuit, mould-pressed.',
      },
      {
        id: 'purvanchal-kasar',
        region: 'Bihar & Eastern UP',
        culture: 'Chhath households',
        title: 'Kasar (Chawal ke Laddu)',
        intro:
          'A fragrant laddu made from roasted rice flour, jaggery or sugar, and ghee. It is soft, crumbly and mildly sweet — a contrast to the crisp thekua.',
        serves: '15 laddus',
        prep: '10 min',
        cook: '20 min',
        ingredients: [
          {
            items: [
              '2 cups rice flour (made from raw rice, dried and ground)',
              '1 cup jaggery',
              '1/3 cup ghee',
              '1/2 tsp cardamom powder',
              '1/4 cup water',
            ],
          },
        ],
        method: [
          'Roast the rice flour in 2 tbsp ghee on low heat for 8–10 minutes until fragrant but not coloured.',
          'Melt the jaggery in the water, strain and cook to a one-string syrup.',
          'Add the flour and cardamom to the syrup, stir off the heat, and add the remaining ghee.',
          'Shape into laddus while warm.',
        ],
        offering: 'Offered in the soop along with thekua, fruit and sugarcane.',
        tips: ['Use freshly milled rice flour for the best aroma.'],
        differs: 'Soft rice-flour laddu.',
      },
    ],
  },

  // ───────────────────────────── ARAVANA PAYASAM ─────────────────────────────
  {
    id: 'aravana-payasam',
    name: 'Aravana Payasam',
    alsoCalled: 'Sabarimala Aravana · അരവണ',
    category: 'Sweet',
    summary: 'Sabarimala’s thick jaggery-rice payasam, sealed and carried home by pilgrims.',
    meaning:
      'Aravana is the main prasad of the Sabarimala Ayyappa temple. It is cooked to a very thick, dark consistency with rice, jaggery, ghee and cardamom, so that it keeps for weeks in sealed tins. Pilgrims carry it home after the 41-day vratham.',
    variants: [
      {
        id: 'kerala',
        region: 'Kerala (Sabarimala)',
        culture: 'Ayyappa devotees',
        title: 'Aravana Payasam (home version)',
        intro:
          'A home version of the temple’s aravana payasam. The real preparation uses huge urulis (bronze vessels) and wood fires; this is a stove-top recipe that follows the same principle: rice cooked soft, boiled down with jaggery, and finished with ghee.',
        serves: '8 servings',
        prep: '10 min',
        cook: '60 min',
        ingredients: [
          {
            items: [
              '1/2 cup (100 g) raw red or white rice (Matta rice works well)',
              '3 cups water',
              '400 g jaggery, melted and strained',
              '1/3 cup (75 g) ghee, plus 2 tbsp for frying',
              '1/2 cup coconut pieces (thenga kothu)',
              '2 tbsp cashews',
              '1 tsp cardamom powder',
              '1/2 tsp dry ginger powder',
              '1/2 cup thick coconut milk (optional)',
            ],
          },
        ],
        method: [
          'Cook the rice with 3 cups of water until very soft and mashed (about 25 minutes, or 5 whistles in a pressure cooker).',
          'Melt the jaggery with 1 cup water, bring to a boil and strain.',
          'Add the cooked rice to the jaggery and cook on low heat for 20–25 minutes, stirring often, until the mixture is thick and dark.',
          'Add the ghee a spoonful at a time, stirring so that it blends in.',
          'Fry the coconut pieces and cashews in the remaining ghee and add them to the pot with the cardamom and ginger.',
          'Cook for a few minutes until it is thick enough to hold its shape on a spoon.',
        ],
        offering: 'Offered to Ayyappa and distributed in sealed tins at the Sannidhanam.',
        tips: ['The jaggery should reduce completely; a thicker payasam keeps longer.'],
      },
    ],
  },

  // ───────────────────────────── APPAM ─────────────────────────────
  {
    id: 'appam',
    name: 'Unniyappam & Nei Appam',
    alsoCalled: 'Neyyappam · Sabarimala Appam · அப்பம்',
    category: 'Sweet',
    summary: 'Sweet fried rice-flour dumplings of Kerala and the Karthigai nei appam of Tamil Nadu.',
    meaning:
      'Round, caramel-dark and slightly crisp outside, unniyappam is the second prasad of Sabarimala, made from rice flour, jaggery, banana and coconut pieces. The Tamil nei appam, offered at Karthigai Deepam, is a lighter ghee-fried cousin.',
    variants: [
      {
        id: 'kerala-unniyappam',
        region: 'Kerala',
        culture: 'Malayali households and Sabarimala devotees',
        title: 'Unniyappam',
        intro:
          'A thick batter of rice flour, ripe banana, jaggery, coconut bits and cardamom, fried in ghee or coconut oil in an appakara (a pan with round cups).',
        serves: '20 appams',
        prep: '20 min + 2 hrs resting',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1 cup raw rice (or 1 cup rice flour)',
              '2 ripe Njalipoovan bananas (or any ripe small banana)',
              '3/4 cup jaggery, melted and strained',
              '1/4 cup coconut pieces, fried in ghee',
              '1 tsp sesame seeds',
              '1/2 tsp cardamom powder',
              '1/4 tsp dry ginger powder, 1/4 tsp cumin (optional)',
              'A pinch of baking soda, 1/4 tsp salt',
              'Ghee and coconut oil for frying',
            ],
          },
        ],
        method: [
          'Soak the rice 4 hours, drain and grind to a coarse batter with the bananas. If using flour, mash the bananas first and mix.',
          'Add the jaggery syrup, cardamom, ginger, salt and baking soda and mix to a thick idli-batter consistency. Rest 2 hours.',
          'Fold in the fried coconut pieces and sesame.',
          'Heat the appakara with a little ghee in each cup. Pour in batter until it is 3/4 full.',
          'Fry on low–medium heat, turning when the underside is dark brown, until crisp outside and cooked inside.',
        ],
        offering: 'Offered to Ayyappa and Bhagavathy, and given to the pilgrims.',
        tips: ['Batter should be thick, not runny — it must hold its shape in the cup.'],
        differs: 'Banana and coconut, fried in appakara.',
      },
      {
        id: 'tamil-nei-appam',
        region: 'Tamil Nadu',
        culture: 'Tamil Shaiva households — Karthigai Deepam',
        title: 'Nei Appam',
        intro:
          'A soft, caramelised, ghee-fried appam of rice flour, jaggery and banana, offered with pori urundai on Karthigai Deepam.',
        serves: '15 appams',
        prep: '15 min + 30 min resting',
        cook: '20 min',
        ingredients: [
          {
            items: [
              '1 cup rice flour',
              '2 tbsp wheat flour',
              '3/4 cup jaggery',
              '1 ripe banana, mashed',
              '2 tbsp grated coconut',
              '1/2 tsp cardamom',
              'Ghee for frying',
            ],
          },
        ],
        method: [
          'Melt the jaggery in 1/2 cup water, strain, cool.',
          'Mix both flours, banana, coconut and cardamom with the jaggery water to a thick batter.',
          'Rest for 30 minutes.',
          'Drop spoonfuls into hot ghee and fry until golden-brown on both sides.',
        ],
        offering: 'Offered at the lighting of the Karthigai lamps with pori urundai.',
        tips: ['Keep the oil at medium heat so the inside cooks.'],
        differs: 'Deep-fried in ghee, no appakara.',
      },
    ],
  },

  // ───────────────────────────── PITHA ─────────────────────────────
  {
    id: 'pitha',
    name: 'Pitha',
    alsoCalled: 'Pithe · Pitha · Arisa · Til Pitha · পিঠে',
    category: 'Sweet',
    summary: 'Rice-flour cakes with jaggery, coconut and sesame — the sweets of Sankranti, Bihu and Nuakhai.',
    meaning:
      'In eastern India, the winter and harvest festivals mean pithas. Bengal makes patishapta crêpes at Poush Sankranti; Assam rolls til pitha and narikol laru for Bhogali Bihu; and Odisha fries arisa pitha for Nuakhai and offers it with new rice.',
    variants: [
      {
        id: 'bengal-patishapta',
        region: 'West Bengal',
        culture: 'Bengali households — Poush Sankranti',
        title: 'Patishapta',
        intro:
          'A delicate crêpe of rice flour, semolina and flour, rolled around a filling of coconut and date-palm jaggery or kheer.',
        serves: '10 patishapta',
        prep: '30 min + 30 min resting',
        cook: '25 min',
        ingredients: [
          {
            group: 'Batter',
            items: [
              '1/2 cup rice flour',
              '1/4 cup semolina',
              '1/4 cup maida',
              '1 cup milk + water as needed',
              '1 tbsp sugar, a pinch of salt',
              'Ghee for cooking',
            ],
          },
          {
            group: 'Filling',
            items: [
              '1.5 cups grated coconut',
              '3/4 cup nolen gur (date-palm jaggery) or regular jaggery',
              '1/2 tsp cardamom',
            ],
          },
        ],
        method: [
          'Whisk the batter ingredients to a thin, pourable consistency and rest for 30 minutes.',
          'Cook the coconut with the jaggery until thick and dry. Add cardamom.',
          'Heat a nonstick pan, brush with ghee and pour a ladle of batter, swirling to form a thin crêpe.',
          'When set, place the filling in a line down the centre and roll.',
          'Serve warm, sometimes with reduced milk.',
        ],
        offering: 'Offered to Lakshmi and household deities at Poush Sankranti.',
        tips: ['Batter should coat the back of a spoon thinly. Too thick and the crêpe tears.'],
        differs: 'Thin rolled crêpe with nolen gur coconut.',
      },
      {
        id: 'assam-til-pitha',
        region: 'Assam',
        culture: 'Assamese households — Bhogali Bihu',
        title: 'Til Pitha and Narikol Laru',
        intro:
          'Til pitha is a roll of sticky Bora rice batter spread thin and rolled around a sesame–jaggery filling. Narikol laru is the coconut ladoo that sits beside it.',
        serves: '10 pitha',
        prep: '30 min',
        cook: '25 min',
        ingredients: [
          {
            group: 'Til pitha',
            items: [
              '1 cup Bora saul (sticky rice flour) or rice flour',
              '1/2 tsp salt',
              'Warm water as needed',
              '1/2 cup black or white sesame seeds, roasted and crushed',
              '1/3 cup jaggery',
            ],
          },
          {
            group: 'Narikol laru',
            items: ['2 cups grated coconut', '1/2 cup jaggery', '1/2 tsp cardamom'],
          },
        ],
        method: [
          'Mix the flour and salt with warm water to a smooth thick batter. Spread thinly on a hot greased tava in a circle.',
          'Mix the sesame and jaggery and place along the centre. Roll and cook until the rice sheet is lightly browned.',
          'For the laru, cook the coconut with jaggery on low heat until sticky and dry; add cardamom. Shape into balls.',
        ],
        offering: 'Offered to the household deity at the feast of Bhogali Bihu.',
        tips: ['Use Bora rice if you can get it — regular rice is less sticky.'],
        differs: 'Sesame–jaggery roll; coconut laru.',
      },
      {
        id: 'odisha-arisa',
        region: 'Odisha',
        culture: 'Odia households — Nuakhai, Raja, Makar Sankranti',
        title: 'Arisa Pitha',
        intro:
          'A flat, round fried cake made from rice flour and jaggery, studded with sesame. It stays fresh for weeks and is an Odia staple for festivals and for the Jagannath temple.',
        serves: '12 pieces',
        prep: '30 min',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '2 cups fine rice flour (from soaked and dried rice)',
              '1 cup jaggery',
              '1/2 cup water',
              '2 tbsp sesame seeds',
              '1/2 tsp cardamom',
              'Oil or ghee for frying',
            ],
          },
        ],
        method: [
          'Melt the jaggery with water and boil to a one-string syrup.',
          'Add the rice flour, sesame and cardamom and mix to a soft dough.',
          'Rest 15 minutes, shape into balls, and press each between oiled palms onto a greased plate.',
          'Deep fry on medium heat until golden-brown and cooked through.',
        ],
        offering: 'Offered with new rice at Nuakhai and kept for weeks.',
        tips: ['Do not fry on high heat; they brown fast but remain raw inside.'],
        differs: 'Fried rice-jaggery cake with sesame.',
      },
    ],
  },

  // ───────────────────────────── GHEWAR ─────────────────────────────
  {
    id: 'ghewar',
    name: 'Ghewar',
    alsoCalled: 'Malai Ghewar · घेवर',
    category: 'Sweet',
    summary: 'Rajasthan’s honeycomb disc, soaked in sugar syrup — the sweet of Teej, Gangaur and Raksha Bandhan.',
    meaning:
      'Ghewar is poured into hot ghee in a thin stream and forms a honeycomb disc. It is the sweet of Teej (Savan), Gangaur and Raksha Bandhan in Rajasthan, and is offered to Gauri and Teej Mata. Making it at home takes practice; this recipe gives the method and the pitfalls.',
    variants: [
      {
        id: 'rajasthan',
        region: 'Rajasthan',
        culture: 'Marwari and Mewar households — Teej, Gangaur',
        title: 'Malai Ghewar',
        intro:
          'A lattice disc of fried batter, soaked in sugar syrup and topped with thickened cream (rabdi) and pistachios.',
        serves: '6–8 pieces',
        prep: '30 min + 30 min resting',
        cook: '45 min',
        ingredients: [
          {
            group: 'Batter',
            items: [
              '1 cup maida',
              '1/4 cup ghee, chilled until solid',
              '1/4 cup cold milk',
              '2 cups ice-cold water',
              '2 tsp lemon juice',
              'Ghee for frying (about 500 g)',
            ],
          },
          {
            group: 'Syrup and topping',
            items: [
              '1.5 cups sugar',
              '3/4 cup water',
              '1/2 tsp cardamom powder, a few saffron strands',
              '1 cup rabdi or thickened cream',
              'Chopped pistachios, silver leaf (varq) optional',
            ],
          },
        ],
        method: [
          'Make a one-string syrup from the sugar, water and cardamom. Keep warm.',
          'Whip the chilled ghee with the milk until white and creamy (about 5 minutes).',
          'Add the maida and ice water gradually to get a thin pouring batter, and then the lemon juice.',
          'Heat ghee in a deep, narrow vessel. Using a ladle, pour a thin stream of batter in the centre of the hot ghee; it will sputter and create a lattice. Continue pouring in the centre until the disc grows to the desired size.',
          'Fry for 5–6 minutes until it turns golden. Remove with a skewer.',
          'Dip in the warm syrup for 20 seconds and drain.',
          'Top with rabdi and pistachios.',
        ],
        offering:
          'Offered to Gauri on Gangaur and to Teej Mata; given as a gift (sindhara) to daughters and sisters at Teej and Raksha Bandhan.',
        tips: [
          'Make it on a dry day; humidity softens the lattice.',
          'Start with a small disc until you master the pouring.',
          'If the lattice does not form, the ghee is too cold or the batter too thick.',
        ],
      },
    ],
  },

  // ───────────────────────────── KHAJA ─────────────────────────────
  {
    id: 'khaja',
    name: 'Khaja',
    alsoCalled: 'Puri Khaja · Gaja · ଖଜା',
    category: 'Sweet',
    summary: 'Layered, syrup-soaked pastry of the Jagannath temple at Puri.',
    meaning:
      'Khaja is one of the oldest sweets of the Jagannath temple. It is a many-layered fried pastry soaked in sugar syrup, and it forms part of the Mahaprasad that pilgrims carry home. The Puri recipe is made by temple cooks, and the layering is what distinguishes it from Bihar’s khaja.',
    variants: [
      {
        id: 'odisha-puri',
        region: 'Odisha (Puri)',
        culture: 'Jagannath temple tradition; Rath Yatra',
        title: 'Puri Khaja',
        intro:
          'Flat sheets of dough layered with a paste of ghee and flour, rolled up, sliced, and fried until the layers puff. It is crisp, flaky and sweet.',
        serves: '12 pieces',
        prep: '40 min',
        cook: '30 min',
        ingredients: [
          {
            group: 'Dough and layering',
            items: [
              '2 cups maida',
              '1/4 cup ghee for the dough',
              '1/2 tsp salt',
              'Water to knead',
              '1/4 cup ghee mixed with 2 tbsp maida (layering paste)',
              'Ghee for frying',
            ],
          },
          {
            group: 'Syrup',
            items: ['1.5 cups sugar', '3/4 cup water', '1/2 tsp cardamom'],
          },
        ],
        method: [
          'Knead the maida, ghee, salt and water into a firm dough; rest 30 minutes.',
          'Divide into 4 balls and roll each very thin. Spread the ghee–maida paste on one sheet, stack another on top and repeat, ending with a plain sheet.',
          'Roll up tightly into a log, cut into 1-inch pieces, and flatten each lightly.',
          'Fry on low heat in ghee until the layers puff and turn golden.',
          'Make a one-string syrup; dip the khaja in it for 30 seconds, then drain.',
        ],
        offering: 'Offered to Lord Jagannath as part of the Mahaprasad, and carried home by pilgrims.',
        tips: ['Fry slowly so the inner layers cook before the outside darkens.'],
      },
    ],
  },
]
