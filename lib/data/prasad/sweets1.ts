import type { PrasadRecipe } from './types'

// Festival sweets, part 1: modak, puran poli, gujiya, panjiri, makhan-mishri,
// sesame-jaggery sweets, boondi laddu.

export const SWEETS_1: PrasadRecipe[] = [
  // ───────────────────────────── MODAK ─────────────────────────────
  {
    id: 'modak',
    name: 'Modak',
    alsoCalled: 'Modakam · Kozhukattai · Kadubu · Patoli · मोदक',
    category: 'Sweet',
    summary: 'Ganesha’s favourite dumpling — a rice-flour shell around coconut and jaggery.',
    meaning:
      'Modak is “that which gives joy”. Offered in odd numbers (21 is the classic count), it is the naivedyam of Ganesh Chaturthi and Ananta Chaturdashi. Every region folds the same idea differently: pleated and steamed in Maharashtra, pooranam-filled kozhukattai in Tamil Nadu, and rice batter wrapped in turmeric leaf in Goa and Konkan.',
    variants: [
      {
        id: 'maharashtra',
        region: 'Maharashtra',
        culture: 'Marathi Brahmin and Konkan households',
        title: 'Ukadiche Modak',
        intro:
          'The famous steamed modak: a thin shell of hot-water rice-flour dough, pinched into 7–8 pleats and drawn to a point, holding a fragrant filling of fresh coconut and jaggery. It is served hot with a spoonful of ghee.',
        serves: '10–12 modaks (double it for the traditional 21)',
        prep: '40 min',
        cook: '15 min',
        ingredients: [
          {
            group: 'Filling (saran)',
            items: [
              '1 cup (90 g) freshly grated coconut',
              '3/4 cup (150 g) grated jaggery (reduce to 1/2 cup if the jaggery is very sweet)',
              '1/2 tsp cardamom powder',
              '1/4 tsp nutmeg powder',
              '1 tbsp white poppy seeds (khus-khus), lightly roasted',
              '1 tsp ghee',
            ],
          },
          {
            group: 'Shell (ukad)',
            items: [
              '1 cup (150 g) fine rice flour (ambemohar if you can find it)',
              '1 cup water',
              '1 tsp ghee',
              '1/4 tsp salt',
              'Ghee and a little oil for kneading and serving',
              'Banana or turmeric leaf, or a muslin cloth, for steaming',
            ],
          },
        ],
        method: [
          'For the filling, heat the ghee in a pan, add the coconut and jaggery and cook on a low flame, stirring, for about 6–8 minutes until the jaggery melts and the mixture is moist but not runny.',
          'Add the cardamom, nutmeg and poppy seeds, mix, and cool completely.',
          'For the shell, bring the water, ghee and salt to a rolling boil. Pour in the rice flour all at once, stir once with a spoon, cover and switch off the heat. Rest for 5 minutes.',
          'Transfer the hot dough to a plate, grease your palms and knead for 5 minutes while still hot, until smooth and soft with no cracks. Cover with a damp cloth.',
          'Take a lemon-sized ball. Flatten it into a small cup, thinning the edges and keeping the centre thicker. Place a spoon of filling inside.',
          'Pleat the edge with the thumb and index finger into 7–8 even folds, bring the pleats together and pinch the top into a point to seal.',
          'Place the modaks on a greased steamer plate (or on banana leaf) and steam over boiling water for 10–12 minutes. They turn translucent and glossy when ready.',
          'Serve hot, with a spoonful of ghee over each.',
        ],
        offering:
          'Offered to Ganesha as naivedyam; traditionally 21 modaks, placed on a leaf alongside 21 blades of durva and a red flower. The first modak goes to Ganesha, and the rest is distributed after aarti.',
        tips: [
          'The dough must be kneaded while hot; cold dough cracks when pleated.',
          'Keep the filling moist but not wet, or the shell tears while steaming.',
          'A wet sheet of muslin under the steamer plate keeps modaks from sticking and from becoming soggy from drips.',
        ],
        differs: 'Steamed rice-flour shell with pleats; coconut-jaggery with nutmeg and poppy seed.',
      },
      {
        id: 'tamil-karnataka',
        region: 'Tamil Nadu & Karnataka',
        culture: 'Tamil and Kannada Brahmin and Chettiar households',
        title: 'Modhagam / Pooranam Kozhukattai (Kadubu)',
        intro:
          'Smaller, plumper and heavier than the Maharashtrian pleated modak. The pooranam (filling) adds roasted chana dal to the coconut and jaggery, and the dough is rice flour cooked in water with a little oil. In Karnataka the same dumpling is called kadubu.',
        serves: '12–14 pieces',
        prep: '40 min',
        cook: '20 min',
        ingredients: [
          {
            group: 'Pooranam',
            items: [
              '1/4 cup chana dal, soaked 30 minutes and pressure-cooked firm',
              '3/4 cup grated coconut',
              '3/4 cup powdered jaggery',
              '1/2 tsp cardamom powder',
              '1 tsp ghee',
            ],
          },
          {
            group: 'Dough',
            items: [
              '1 cup rice flour (idiyappam or kozhukattai flour, lightly roasted)',
              '1 cup water',
              '1 tsp sesame (gingelly) oil',
              'A pinch of salt',
            ],
          },
        ],
        method: [
          'Mash the cooked chana dal lightly (keep some texture).',
          'Melt the jaggery with 2 tbsp water, strain, and return to the pan. Add the coconut, dal and cardamom and cook for 8–10 minutes until thick and drops fall in clumps. Stir in the ghee and cool.',
          'For the dough, bring the water, oil and salt to a boil. Reduce the heat, add the rice flour, stir quickly and cook for 2 minutes. Cover and cool slightly.',
          'Knead the warm dough with oiled palms until smooth.',
          'Take a small ball, pat it into a flat cup, fill with a spoon of pooranam, bring the edges together and seal. Shape into a ball with a short tip (or pleat into the Modhagam shape).',
          'Steam in an idli steamer for 10–12 minutes until glossy.',
        ],
        offering:
          'Offered in odd numbers to Vinayaka at Vinayaka Chaturthi, along with chana sundal, vada and fruit. The first piece is placed before the deity before anything else is eaten.',
        tips: [
          'Use jaggery that is clean and unadulterated; strain it before adding to the filling.',
          'If you cannot find kozhukattai flour, wash and soak raw rice, dry it, roast lightly and grind to fine powder.',
          'The salted savoury version (uppu kozhukattai) is made with a tempering of urad dal, mustard and coconut; it is a common second offering.',
        ],
        differs: 'Round or lightly pleated; chana-dal pooranam; dough cooked in oil-water.',
      },
      {
        id: 'goa-konkan',
        region: 'Goa & coastal Karnataka (Konkani)',
        culture: 'Konkani and Goan Saraswat households — Chavath',
        title: 'Patoli (Patholi) and fried Nevri',
        intro:
          'Konkan’s Ganesh Chaturthi dish is a fragrant steamed roll: rice batter spread on turmeric leaf, filled with coconut and jaggery, folded and steamed so that the leaf perfumes the dumpling. Nevri, the fried cousin, is also offered.',
        serves: '10–12 pieces',
        prep: '45 min',
        cook: '20 min',
        ingredients: [
          {
            group: 'Batter',
            items: [
              '1 cup rice, soaked for 3 hours (or 1 cup rice flour)',
              '1/2 tsp salt',
              'Water as needed',
              '10–12 fresh turmeric leaves (or banana leaf cut in 8-inch squares)',
            ],
          },
          {
            group: 'Filling',
            items: [
              '1 cup grated coconut',
              '3/4 cup jaggery',
              '1/2 tsp cardamom powder',
              'A pinch of salt',
            ],
          },
        ],
        method: [
          'Grind the soaked rice with salt to a thick, smooth batter, adding minimal water. If using rice flour, mix with water to a thick spreadable batter.',
          'Cook the coconut and jaggery together until the mixture is moist; add cardamom and cool.',
          'Wash the turmeric leaves and pat them dry. Spread a thin layer of batter on each leaf with the back of a spoon.',
          'Put a line of filling down the centre, fold the leaf in half, and press the edges lightly.',
          'Steam in a steamer for 15–20 minutes. The leaf will turn a deep olive and the aroma will fill the kitchen.',
          'Serve in the leaf, which is peeled away at the table.',
        ],
        offering:
          'Offered with ghee to Ganesha on the day of Chavath, along with the matoli canopy produce. Nevri is deep-fried at the same time as a second sweet.',
        tips: [
          'Turmeric leaves are the whole point — banana leaf is a substitute but lacks the perfume.',
          'For Nevri, roll a thin disc of a sweet dough (maida, ghee), fill, fold into a half-moon and deep fry on a medium flame.',
        ],
        differs: 'Leaf-wrapped steamed rice roll, not a dumpling.',
      },
    ],
  },

  // ───────────────────────────── PURAN POLI ─────────────────────────────
  {
    id: 'puran-poli',
    name: 'Puran Poli',
    alsoCalled: 'Holige · Obbattu · Bobbatlu · Vedmi · पुरणपोळी',
    category: 'Sweet',
    summary: 'Soft flatbread stuffed with sweet dal — offered at Holi, Gudi Padwa, Ugadi and Pola.',
    meaning:
      'Few festival foods change names as often as this one: Puran Poli in Maharashtra, Holige or Obbattu in Karnataka, Bobbatlu in Andhra and Telangana, Vedmi in Gujarat. The idea is the same — chana or toor dal cooked with jaggery and wrapped in a soft dough — but the texture, the flour and the dal differ by home and by state.',
    variants: [
      {
        id: 'maharashtra',
        region: 'Maharashtra',
        culture: 'Marathi households — Holi, Gudi Padwa, Pola',
        title: 'Puran Poli',
        intro:
          'A thick, soft, golden poli with a dense chana-dal and jaggery puran, delicately flavoured with cardamom and nutmeg. The dough is made from wheat and maida. It is eaten with a drizzle of ghee and a bowl of katachi amti.',
        serves: '8 polis',
        prep: '40 min',
        cook: '30 min',
        ingredients: [
          {
            group: 'Puran',
            items: [
              '1 cup (200 g) chana dal, washed and soaked for 1 hour',
              '1 cup (200 g) grated jaggery (reduce slightly if the jaggery is dark)',
              '1/2 tsp cardamom powder',
              '1/2 tsp nutmeg powder',
              '1 tsp ghee',
              '1/4 tsp saffron strands (optional)',
            ],
          },
          {
            group: 'Dough',
            items: [
              '1 cup (130 g) maida (refined flour)',
              '1/2 cup (60 g) fine whole-wheat flour',
              '2 tbsp oil, plus extra for resting',
              '1/4 tsp turmeric',
              '1 pinch salt',
              'Warm water to knead',
              'Ghee for roasting and serving',
            ],
          },
        ],
        method: [
          'Pressure-cook the chana dal with 3 cups of water for 3 whistles until it is soft but not mushy. Drain all the water and save it — it becomes the katachi amti.',
          'Return the dal to a heavy pan with the jaggery and cook on a medium flame, stirring constantly, until the mixture becomes a thick, dry paste and leaves the sides of the pan (8–10 minutes). A spoon should stand upright in it.',
          'Add the cardamom, nutmeg, ghee and saffron. Pass through a puran-yantra or mash well; cool.',
          'Knead the maida, wheat flour, turmeric, salt, oil and warm water into a very soft, elastic dough. Rest it, covered with oil, for at least 1 hour.',
          'Divide the puran into 8 lemon-sized balls and the dough into 8 slightly smaller balls.',
          'Flatten a dough ball into a cup, place a puran ball inside, pinch the edges to seal and press lightly.',
          'Dip in dry flour, then roll with a light hand into a 6–7 inch circle. The poli should not tear.',
          'Roast on a hot tava, flipping twice, until golden brown spots appear. Brush with ghee.',
          'Serve hot with ghee, or warm milk.',
        ],
        offering:
          'Offered as naivedyam at Holika Dahan (a poli is thrown into the fire), at Gudi Padwa and on Bail Pola, when it is fed to bullocks.',
        tips: [
          'The puran must be dry. A wet puran leaks and makes the poli tear.',
          'Rest the dough in oil: it is the secret to a soft, non-chewy poli.',
          'Keep the stuffing and dough balls of near-equal size to get a thin, even poli.',
        ],
        differs: 'Wheat-and-maida dough; chana dal; nutmeg and cardamom; eaten with katachi amti.',
      },
      {
        id: 'karnataka-holige',
        region: 'Karnataka',
        culture: 'Kannada households — Yugadi, Varamahalakshmi, Gowri-Ganesha',
        title: 'Holige / Obbattu',
        intro:
          'Karnataka’s holige is thin and soft, with a softer, moister filling. The dough is mostly maida, soaked in oil for hours, and it comes in two main fillings: hoorana holige (chana dal and jaggery) and kayi holige (coconut and jaggery).',
        serves: '10 holiges',
        prep: '45 min + 3 hrs resting',
        cook: '30 min',
        ingredients: [
          {
            group: 'Hoorana (dal filling)',
            items: [
              '1 cup chana dal, cooked firm',
              '1 cup powdered jaggery',
              '1/2 cup grated dry coconut (optional)',
              '1/2 tsp cardamom',
              '1 tsp poppy seeds, roasted',
            ],
          },
          {
            group: 'Dough',
            items: [
              '1.5 cups maida',
              '1/4 cup fine rava (semolina)',
              '1/4 tsp turmeric',
              '1/2 cup sesame (gingelly) oil',
              'Water and a pinch of salt',
            ],
          },
        ],
        method: [
          'Cook the chana dal until soft. Drain well and grind with the jaggery to a coarse, smooth paste. Cook the mixture in a pan, stirring, until thick; add the cardamom, poppy seeds and dry coconut.',
          'Knead the maida, rava, turmeric and salt into a very soft dough with water, then pour the oil on top and let it rest for at least 3 hours.',
          'Make small balls of the dough and larger balls of the filling.',
          'Flatten the dough, place the filling inside and seal.',
          'Pat out the holige on a greased banana leaf or plastic sheet with oiled fingers to a thin circle.',
          'Roast on a hot tava for a minute each side, until it develops light brown spots. Brush with ghee.',
        ],
        offering:
          'Offered to the deity first on Yugadi, Varamahalakshmi and Gowri–Ganesha festivals, and served with ghee, sugar and a thin coconut milk.',
        tips: [
          'The oil-soaked dough is stretchy; pat, don’t roll, the holige.',
          'For kayi holige, replace the dal with 2 cups grated coconut cooked with jaggery.',
        ],
        differs: 'Soft, thin, patted by hand on leaf; coconut or dal filling; oil-soaked dough.',
      },
      {
        id: 'andhra-bobbatlu',
        region: 'Andhra Pradesh & Telangana',
        culture: 'Telugu households — Ugadi, Varalakshmi Vratam, Sankranti',
        title: 'Bobbatlu (Bakshalu / Polelu)',
        intro:
          'The Telugu bobbattu is thin, almost translucent, with a soft sweet filling of chana dal and jaggery, or toor dal. The dough is maida with oil and is rested; it is patted on a banana leaf. It is eaten with ghee or hot milk.',
        serves: '10 bobbatlu',
        prep: '40 min + 2 hrs resting',
        cook: '30 min',
        ingredients: [
          {
            group: 'Filling (poornam)',
            items: [
              '1 cup chana dal',
              '1 cup grated jaggery',
              '1/2 tsp cardamom powder',
              '1/4 tsp dry ginger powder (optional)',
              '2 tsp ghee',
            ],
          },
          {
            group: 'Dough',
            items: [
              '1.5 cups maida',
              '1 tbsp fine rava',
              '4 tbsp oil, plus 1/4 cup for resting',
              'A pinch of salt and turmeric',
              'Water as needed',
            ],
          },
        ],
        method: [
          'Cook the chana dal until tender and drain completely. Grind to a coarse paste, then cook with the jaggery on low heat until thick and dry. Add the cardamom and ghee and cool.',
          'Knead the maida, rava, salt and turmeric into a very soft dough; cover with the oil and let it rest for 2 hours.',
          'Make small balls of the dough and large balls of the filling.',
          'Flatten a dough ball with oiled fingers, stuff with a ball of poornam and seal.',
          'Pat the ball out on an oiled banana leaf into a thin circle, handling lightly.',
          'Cook on a hot tava, flipping once, with a little ghee, until pale golden.',
        ],
        offering:
          'Offered at Ugadi and Varalakshmi Vratam with payasam and pulihora, and given to the guests at Sankranti.',
        tips: [
          'Don’t knead the dough with force — it should be as soft as an earlobe.',
          'The poli stays soft for a day wrapped in cloth.',
        ],
        differs: 'Thin and translucent; maida only; ghee and dry-ginger notes.',
      },
      {
        id: 'gujarat-vedmi',
        region: 'Gujarat',
        culture: 'Gujarati Vaishnava and Jain households',
        title: 'Vedmi / Puran Poli',
        intro:
          'Gujarat’s puran poli uses toor dal and a milder sweetness, with nutmeg and cardamom; the dough is wheat with a little maida and a lot of ghee. It is served at festivals and weddings with a hot kadhi.',
        serves: '8 polis',
        prep: '35 min',
        cook: '30 min',
        ingredients: [
          {
            group: 'Filling',
            items: [
              '1 cup toor dal, washed',
              '1 cup grated jaggery (or 3/4 cup sugar)',
              '1/2 tsp cardamom powder',
              '1/2 tsp nutmeg powder',
              '2 tsp ghee',
            ],
          },
          {
            group: 'Dough',
            items: [
              '1.5 cups whole-wheat flour',
              '1/2 cup maida',
              '3 tbsp ghee (moyan)',
              'A pinch of salt',
            ],
          },
        ],
        method: [
          'Pressure-cook the dal until soft. Drain, mash and cook with the jaggery until dry.',
          'Season with cardamom, nutmeg and ghee and cool.',
          'Knead both flours, salt and ghee into a soft dough with warm water.',
          'Stuff, seal and roll each poli and roast on a hot tava with generous ghee.',
        ],
        offering:
          'Offered to the deity during Janmashtami, Dussehra and Shravan, with ghee, and followed by the sweet–sour meal.',
        tips: ['Roll the poli between two oiled sheets of plastic for an even thin finish.'],
        differs: 'Toor dal; wheat-ghee dough; served with kadhi.',
      },
    ],
  },

  // ───────────────────────────── GUJIYA ─────────────────────────────
  {
    id: 'gujiya',
    name: 'Gujiya',
    alsoCalled: 'Pedakiya · Karanji · Ghughra · गुजिया',
    category: 'Sweet',
    summary: 'Crescent-shaped fried pastry with khoya and dry fruits — the sweet of Holi and Diwali.',
    meaning:
      'The gujiya is the sweet that signals Holi in North India. In Braj it is dropped at the feet of Krishna first. The shell is the same everywhere; what changes is the filling and the name: khoya in Uttar Pradesh, semolina and khoya in Bihar’s pedakiya, and dry coconut, poppy seed and nuts in Maharashtra’s karanji.',
    variants: [
      {
        id: 'braj-up',
        region: 'Uttar Pradesh & Braj',
        culture: 'Hindi-belt Vaishnava households — Holi',
        title: 'Mawa Gujiya',
        intro:
          'A flaky crescent filled with roasted khoya, nuts and a little sugar. The pastry is bound with ghee (moyan), so the shell is short and crisp.',
        serves: '16–18 gujiyas',
        prep: '40 min',
        cook: '30 min',
        ingredients: [
          {
            group: 'Filling',
            items: [
              '250 g khoya (mawa), grated',
              '1/2 cup powdered sugar',
              '1/4 cup chopped almonds, cashews and pistachios',
              '2 tbsp raisins and 2 tbsp dry coconut',
              '1/2 tsp cardamom powder',
              '1 tsp ghee',
            ],
          },
          {
            group: 'Dough',
            items: [
              '2 cups maida',
              '1/4 cup ghee (moyan), melted',
              '1/4 tsp salt',
              'Milk or water to knead',
              'Ghee or oil for frying',
            ],
          },
        ],
        method: [
          'Roast the khoya in a dry pan on low heat for 6–8 minutes, until it turns pale golden and smells nutty. Cool completely.',
          'Mix in the sugar, nuts, raisins, coconut and cardamom.',
          'Rub the ghee into the maida and salt until crumbly like breadcrumbs, then add enough milk to make a stiff dough. Rest 30 minutes.',
          'Roll the dough thin into small 4-inch discs. Place a spoonful of filling on one half, moisten the edge with water, fold and press, or use a gujiya mould.',
          'Crimp the edge with a fork or a pleated border.',
          'Fry in medium-hot ghee on low-medium heat until golden, 5–6 minutes. Cool on paper.',
        ],
        offering:
          'Offered to Krishna and Radha at the Holi celebrations at Vrindavan and Mathura before they are served.',
        tips: [
          'Keep the khoya filling cool before filling, or it will soften the dough.',
          'Fry on medium-low heat; a hot oil blisters the shell and leaves the inside uncooked.',
          'Cover unused discs with a damp cloth.',
        ],
        differs: 'Dry roasted khoya and nuts; flaky ghee shell.',
      },
      {
        id: 'bihar-pedakiya',
        region: 'Bihar & Jharkhand',
        culture: 'Maithil and Bhojpuri households',
        title: 'Pedakiya',
        intro:
          'Bihar’s pedakiya is larger and sturdier. The filling combines khoya with roasted semolina, coconut and dried fruit, giving a grainy, crumbly sweetness.',
        serves: '12 pedakiya',
        prep: '40 min',
        cook: '30 min',
        ingredients: [
          {
            group: 'Filling',
            items: [
              '200 g khoya',
              '1/2 cup fine suji (semolina), roasted in ghee',
              '1/2 cup grated dry coconut',
              '3/4 cup sugar',
              '2 tbsp chopped dry fruits',
              '1/2 tsp cardamom powder',
            ],
          },
          {
            group: 'Dough',
            items: [
              '2 cups maida',
              '3 tbsp ghee',
              'Pinch of salt and water to knead',
              'Ghee for frying',
            ],
          },
        ],
        method: [
          'Roast the suji in 1 tsp ghee until fragrant. Roast the khoya separately until slightly browned.',
          'Mix the khoya, suji, coconut, sugar, dry fruits and cardamom.',
          'Make a firm dough with maida, ghee and water; rest for 20 minutes.',
          'Roll out 5-inch discs, fill and seal in a half-moon.',
          'Fry slowly in ghee until golden.',
        ],
        offering:
          'Offered at Holi and at Chhath, where the smaller version is part of the pooja baskets.',
        tips: ['A touch of suji absorbs moisture, which keeps the filling from leaking.'],
        differs: 'Suji in the khoya; sturdier shell.',
      },
      {
        id: 'maharashtra-karanji',
        region: 'Maharashtra & Goa',
        culture: 'Marathi households — Diwali faral, Ganeshotsav',
        title: 'Karanji',
        intro:
          'A crisp crescent with a dry, aromatic filling of fresh or dry coconut, poppy seeds and nuts. The shell is made with rava and maida and is fried in oil. Karanji is the centrepiece of the Diwali faral.',
        serves: '15 karanjis',
        prep: '45 min',
        cook: '30 min',
        ingredients: [
          {
            group: 'Filling',
            items: [
              '1.5 cups fresh or dry-grated coconut',
              '3/4 cup powdered sugar or grated jaggery',
              '2 tbsp poppy seeds, roasted',
              '2 tbsp chopped cashews and raisins',
              '1/2 tsp cardamom powder',
              '1/4 tsp nutmeg',
            ],
          },
          {
            group: 'Dough',
            items: [
              '1 cup maida',
              '1/2 cup fine rava (semolina)',
              '3 tbsp hot ghee',
              'A pinch of salt',
              'Warm milk or water to knead',
              'Oil for frying',
            ],
          },
        ],
        method: [
          'Toast the coconut lightly in a dry pan for 2–3 minutes. Add the sugar, poppy seeds, nuts and spices and mix well.',
          'Knead the maida, rava, ghee and salt with warm milk into a stiff dough. Rest for 1 hour.',
          'Roll the dough into thin 4-inch discs, fill and seal. Crimp the edge with a fork or a karanji cutter.',
          'Deep fry on low-medium heat until golden.',
          'Cool completely before storing; keeps for 2 weeks in an airtight tin.',
        ],
        offering:
          'Offered as part of the faral at Diwali and given to the neighbours; also made at Ganeshotsav.',
        tips: ['Rava gives the shell its characteristic crispness.'],
        differs: 'Coconut-poppy filling; rava shell; fried in oil.',
      },
    ],
  },

  // ───────────────────────────── PANJIRI ─────────────────────────────
  {
    id: 'panjiri',
    name: 'Panjiri',
    alsoCalled: 'Dhaniya Panjiri · Atta Panjiri · Pinni · पंजीरी',
    category: 'Sweet',
    summary: 'Roasted-flour (or coriander) crumble with ghee, sugar and nuts — Krishna’s midnight prasad.',
    meaning:
      'Panjiri is the prasad of Krishna Janmashtami, Radha Ashtami, Ram Navami and Satyanarayan puja. In Braj and Uttar Pradesh the signature version is made from coriander seeds (dhaniya), which is light, aromatic and cooling; in Punjab it is a rich, hearty roasted whole-wheat crumble.',
    variants: [
      {
        id: 'braj-dhaniya',
        region: 'Braj & Uttar Pradesh',
        culture: 'Vaishnava households — Janmashtami',
        title: 'Dhaniya Panjiri',
        intro:
          'A light, fragrant, pale-brown mixture of roasted coriander-seed powder, ghee, powdered sugar and dry fruits. It is the first prasad distributed after the midnight birth of Krishna.',
        serves: '15–20 small servings',
        prep: '15 min',
        cook: '15 min',
        ingredients: [
          {
            items: [
              '1 cup (100 g) coriander (dhaniya) seed powder',
              '1/3 cup (70 g) pure ghee',
              '3/4 cup (90 g) powdered sugar (bura) — adjust to taste',
              '1/4 cup makhana, roasted and crushed',
              '1/4 cup chopped almonds and cashews',
              '2 tbsp chopped dry coconut (kopra)',
              '2 tbsp raisins',
              '1 tbsp melon seeds (magaz)',
              '1/2 tsp cardamom powder',
              '1 tbsp edible gum (gond), fried in ghee and crushed (optional)',
            ],
          },
        ],
        method: [
          'Heat 1 tbsp of the ghee in a heavy pan and fry the gond on low until it puffs up, then crush it.',
          'In the remaining ghee, fry the almonds, cashews, makhana and coconut until golden. Remove and keep aside.',
          'In the same pan, roast the coriander powder on low heat, stirring, for 6–8 minutes until it smells nutty and darkens slightly.',
          'Cool the roasted powder, then mix with the fried nuts, gond, raisins, melon seeds and cardamom.',
          'Add the powdered sugar last, once the mixture is completely cool, and mix well.',
          'Offer and store in an airtight steel or glass jar.',
        ],
        offering:
          'Offered to Bal Gopal at midnight on Janmashtami with makhan-mishri and tulsi; given first to children. It is also part of Radha Ashtami and Ram Navami offerings.',
        tips: [
          'Do not add sugar to the hot mixture; it will melt and turn pasty.',
          'Use fresh coriander seeds, powdered at home for better aroma.',
        ],
        differs: 'Coriander-seed base — light, aromatic; no wheat.',
      },
      {
        id: 'punjab-atta',
        region: 'Punjab, Haryana & Himachal',
        culture: 'Punjabi Hindu and Sikh households; Satyanarayan katha',
        title: 'Atta Panjiri',
        intro:
          'A rich, nutty panjiri of whole-wheat flour roasted slowly in plenty of ghee, with makhana, edible gum, and chopped nuts. In Punjabi homes it is served after prayers, and also to new mothers.',
        serves: '12–15 servings',
        prep: '15 min',
        cook: '25 min',
        ingredients: [
          {
            items: [
              '1 cup (120 g) whole-wheat flour',
              '1/2 cup (110 g) pure ghee',
              '3/4 cup powdered sugar',
              '1/4 cup edible gum (gond), fried and crushed',
              '1/2 cup makhana, roasted and crushed',
              '1/4 cup chopped almonds, cashews, pistachios',
              '2 tbsp melon seeds',
              '1/2 tsp ground green cardamom',
              '1/2 tsp ground dry ginger (sonth)',
              '1 tsp ajwain (optional)',
            ],
          },
        ],
        method: [
          'Heat the ghee in a heavy kadai on low heat. Fry the gond in small batches until puffed; crush and keep aside.',
          'Add the flour to the ghee and roast on a low flame for 15–20 minutes, stirring constantly, until it turns golden brown and gives off a sweet toasted aroma.',
          'Add the makhana, nuts and melon seeds in the last 3 minutes and roast lightly.',
          'Remove from the heat, add the spices and gond, and cool for 15 minutes.',
          'Stir in the powdered sugar. Press into a bowl for sinni-style prasad.',
        ],
        offering:
          'Offered at the Satyanarayan katha and eaten as the first prasad; also served at the end of a Guru Granth path.',
        tips: [
          'Keep the heat low and never leave the pan; flour burns quickly.',
          'For sinni (the Punjabi version), shape small balls; leave out the sugar if you want a savoury–sweet crumble.',
        ],
        differs: 'Wheat-flour base, richer in ghee and gond.',
      },
    ],
  },

  // ───────────────────────────── MAKHAN-MISHRI ─────────────────────────────
  {
    id: 'makhan-mishri',
    name: 'Makhan-Mishri',
    alsoCalled: 'Makkhan Misri · Loni · Vennai · माखन मिश्री',
    category: 'Offering mix',
    summary: 'Fresh white butter with rock sugar — the naivedyam of Bal Krishna.',
    meaning:
      'Butter is the signature offering of Krishna, the “makhan-chor”. The ritual is simple: fresh, unsalted white butter, churned that same morning, topped with crystals of mishri. Its value is in the freshness and the purity of the milk, not in complexity.',
    variants: [
      {
        id: 'braj',
        region: 'Braj & Uttar Pradesh',
        culture: 'Vaishnava and Pushtimarg households',
        title: 'Homemade white butter with mishri',
        intro:
          'Butter is churned at home from curd made from cow’s milk, then washed and chilled. A pinch of mishri is placed on top and a tulsi leaf is added.',
        serves: '8–10 small servings',
        prep: '20 min + overnight setting',
        cook: '10 min',
        ingredients: [
          {
            items: [
              '2 litres full-fat cow milk',
              '2 tbsp fresh curd (starter)',
              '1 cup cold water + ice cubes',
              '3–4 tbsp mishri (rock sugar), lightly crushed',
              '8–10 tulsi leaves',
            ],
          },
        ],
        method: [
          'Boil the milk once and cool to lukewarm. Stir in the curd starter, cover and set overnight in a warm place.',
          'The next morning, if the curd is firm, whisk it well with a wooden churner (madhani) or a hand blender at the lowest setting.',
          'Add a cup of cold water as it churns. Within 8–10 minutes the white butter separates and floats.',
          'Collect with a clean spoon, wash it twice in ice-cold water to remove buttermilk, and gently press out the water.',
          'Shape into small balls with wet palms; place on a clean bowl and top with the crushed mishri and a tulsi leaf.',
          'Offer immediately. The buttermilk (chaas) left over is served as prasad too.',
        ],
        offering:
          'Offered at midnight to Bal Gopal along with panjiri and panchamrit. Shared with children first.',
        tips: [
          'Churn on a cool day, or use ice water; warm milk makes the butter greasy.',
          'Skip salt — the offering is always unsalted.',
        ],
      },
    ],
  },

  // ───────────────────────────── TIL-GUL ─────────────────────────────
  {
    id: 'tilgul',
    name: 'Til-Gul Sweets',
    alsoCalled: 'Tilgul · Tilachi Vadi · Ellu Bella · Til Chikki · तिळगुळ',
    category: 'Sweet',
    summary: 'Sesame–jaggery sweets of Makar Sankranti and Uttarayan.',
    meaning:
      'In the cold of Makar Sankranti, sesame and jaggery warm the body and, as the Marathi saying goes, “til-gul ghya, god god bola” — take the sweets and speak sweetly. Maharashtra rolls it into balls; Gujarat sets it as a brittle (chikki) for kite day; Karnataka mixes it as ellu-bella and exchanges it in a decorated plate.',
    variants: [
      {
        id: 'maharashtra-ladoo',
        region: 'Maharashtra',
        culture: 'Marathi households — Makar Sankranti',
        title: 'Tilache Ladoo',
        intro:
          'Soft-crunchy sesame balls bound with jaggery syrup and flavoured with cardamom. A small plate is offered to Surya, and the balls are exchanged with the greeting “Til-gul ghya”.',
        serves: '15–18 ladoos',
        prep: '10 min',
        cook: '20 min',
        ingredients: [
          {
            items: [
              '1 cup (150 g) white sesame seeds, dry roasted',
              '1/4 cup roasted peanuts, coarsely crushed',
              '2 tbsp dry coconut, grated and toasted',
              '1 cup (200 g) chopped jaggery',
              '2 tbsp water',
              '1 tsp ghee',
              '1/2 tsp cardamom powder',
            ],
          },
        ],
        method: [
          'Dry roast the sesame seeds on low heat until they pop and smell nutty, 3–4 minutes. Cool.',
          'Mix with the crushed peanuts, coconut and cardamom.',
          'Melt the jaggery with the water and ghee on medium heat, stirring, until it reaches a soft-ball stage: a drop in cold water should form a firm but pliable ball.',
          'Immediately pour the syrup over the sesame mix and combine quickly with a spoon.',
          'While still warm, grease your palms with ghee and shape into walnut-sized balls.',
          'Cool and store in an airtight tin.',
        ],
        offering:
          'Offered to Surya and Shani and gifted with the “Til-gul ghya” greeting, along with haldi–kumkum for women.',
        tips: [
          'Work quickly — the syrup sets within a minute.',
          'If it cools too quickly, warm the mix over low heat for 30 seconds.',
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
        serves: '20 pieces',
        prep: '5 min',
        cook: '15 min',
        ingredients: [
          {
            items: [
              '1 cup white sesame seeds',
              '3/4 cup (150 g) jaggery, chopped',
              '1 tsp ghee, plus extra for greasing',
              '1/2 tsp dry ginger powder or cardamom (optional)',
            ],
          },
        ],
        method: [
          'Dry roast the sesame seeds until just golden; set aside.',
          'Heat the ghee and jaggery in a heavy pan on low heat. Stir until the jaggery melts and begins to froth.',
          'Cook to the hard-crack stage — a drop in cold water should snap crisp.',
          'Add the sesame and spice and mix quickly, then pour onto a greased plate or marble slab.',
          'Roll flat with a greased rolling pin to 5 mm thickness while hot. Cut into diamonds within 2 minutes; break the pieces along the lines when cool.',
        ],
        offering:
          'Offered to Surya on Uttarayan morning, and given to relatives with kites and sugarcane.',
        tips: ['Use a heavy-bottomed pan; thin pans scorch the jaggery.'],
        differs: 'Thin, hard-crack brittle, cut in diamonds.',
      },
      {
        id: 'karnataka-ellu-bella',
        region: 'Karnataka',
        culture: 'Kannada households — Sankranti',
        title: 'Ellu-Bella (Sankranti mix)',
        intro:
          'A dry mixture, not a sweet bound with syrup: roasted sesame, peanuts, fried gram, dry coconut slices and jaggery cubes, served on a decorated plate with sugarcane pieces and sugar figurines (sakkare achchu).',
        serves: '10 people',
        prep: '15 min',
        cook: '10 min',
        ingredients: [
          {
            items: [
              '1/2 cup white sesame seeds, roasted',
              '1/2 cup roasted peanuts, skins removed',
              '1/2 cup fried gram (hurigadale)',
              '1/2 cup dry coconut, cut into thin slivers',
              '1/2 cup jaggery, cut into tiny cubes',
              '1 tbsp sugar-candy figurines (sakkare achchu), optional',
              '1/2 tsp cardamom powder',
            ],
          },
        ],
        method: [
          'Roast the sesame and peanuts separately until fragrant; cool.',
          'Toast the coconut slivers briefly in a dry pan.',
          'Mix everything in a large bowl.',
          'Add the jaggery cubes last and toss lightly with cardamom.',
          'Serve on a plate with sugarcane pieces and a banana.',
        ],
        offering:
          'Offered to Surya and the household deity, then given to neighbours with the greeting “Ellu bella thindu olle maathaadi”.',
        tips: ['Keep jaggery cubes small and separate or they will clump.'],
        differs: 'A dry, un-syruped mix; sugarcane and sakkare achchu on the plate.',
      },
    ],
  },

  // ───────────────────────────── BOONDI LADDU ─────────────────────────────
  {
    id: 'laddu',
    name: 'Laddu',
    alsoCalled: 'Boondi Laddu · Motichoor · Tirupati Laddu · लड्डू',
    category: 'Sweet',
    summary: 'Hanuman’s boondi laddu and the Tirupati-style temple laddu.',
    meaning:
      'The laddu is the most common temple sweet in India. Hanuman is offered boondi laddu on Tuesdays and on Hanuman Jayanti; at Tirumala, the laddu prasadam is a very large, ghee-rich ball of bundi, cashews, raisins and sugar candy. The Tirumala recipe (“dittam”) is closely held, so the version here is a home recipe in the same style.',
    variants: [
      {
        id: 'north-boondi',
        region: 'North India',
        culture: 'Hanuman temples; Hanuman Jayanti',
        title: 'Boondi Laddu',
        intro:
          'Tiny gram-flour pearls fried in ghee or oil, soaked in saffron sugar syrup, and bound into soft round laddus.',
        serves: '12 laddus',
        prep: '20 min',
        cook: '35 min',
        ingredients: [
          {
            group: 'Boondi',
            items: [
              '1.5 cups besan (gram flour), sieved',
              '1/2 tsp baking soda, optional',
              'About 1 cup water',
              'Ghee or oil for frying',
            ],
          },
          {
            group: 'Syrup and mix',
            items: [
              '1 cup sugar',
              '1/2 cup water',
              '1/2 tsp cardamom powder',
              '8–10 saffron strands',
              '2 tbsp melon seeds, 2 tbsp chopped cashews, 1 tbsp raisins',
              '1 tbsp ghee',
            ],
          },
        ],
        method: [
          'Whisk the besan with the water to a smooth, flowing batter — thick enough to drop in thin streams.',
          'Boil the sugar and water to a one-string consistency; add the saffron and cardamom and keep warm.',
          'Heat the ghee to medium; hold a perforated boondi jhara over the pan and press the batter through it with a ladle so that small droplets fall.',
          'Fry the boondi for 1 minute until just set — not crisp — then lift out.',
          'Soak the boondi in the warm syrup for 5 minutes. Drain slightly.',
          'Mix with the melon seeds, cashews, raisins and ghee. While warm, shape into balls, moistening palms.',
        ],
        offering:
          'Offered with sindoor and chameli oil on Hanuman Jayanti and each Tuesday and Saturday.',
        tips: [
          'The boondi must be soft, not crisp, or it will not bind.',
          'If the mixture is too wet, rest it for 10 minutes; the boondi absorb the syrup.',
        ],
        differs: 'Light, sticky and fragrant with saffron; shaped by hand.',
      },
      {
        id: 'tirupati',
        region: 'Andhra Pradesh (Tirumala-style)',
        culture: 'Sri Vaishnava; Venkateswara temple tradition',
        title: 'Tirupati-style Laddu',
        intro:
          'A denser, ghee-rich laddu with fried boondi, cashews, raisins, cardamom and sugar candy (kalkandu). The famous Tirumala laddu is made to a closely guarded recipe; this is a home version in the same style.',
        serves: '10–12 laddus',
        prep: '20 min',
        cook: '40 min',
        ingredients: [
          {
            items: [
              '1.5 cups besan',
              '1.5 cups sugar',
              '3/4 cup water',
              '1/2 cup pure ghee, plus more for frying',
              '2 tbsp cashews',
              '2 tbsp raisins',
              '1 tbsp kalkandu (rock candy), crushed',
              '1 tsp cardamom powder',
              '1/4 tsp edible camphor (optional)',
            ],
          },
        ],
        method: [
          'Make the boondi as in the North Indian method, but fry until it is lightly crisp.',
          'Make a syrup of sugar and water to a one-and-a-half string consistency.',
          'Fry the cashews and raisins in ghee until golden.',
          'Add the boondi to the syrup with the fried nuts, kalkandu and cardamom and stir.',
          'Add the ghee while it is still warm and mix. Shape into large laddus.',
        ],
        offering:
          'Offered to Venkateswara on Vaikuntha Ekadashi and brought back by pilgrims as a blessing.',
        tips: [
          'Do not brown the sugar; the colour should stay golden.',
          'For a sweeter, more granular laddu, add 1 tbsp more kalkandu.',
        ],
        differs: 'Larger, crisper boondi; kalkandu and cashews; very ghee-rich.',
      },
    ],
  },
]
