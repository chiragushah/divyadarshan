import type { PrasadRecipe } from './types'

// Abhishekam liquids, cooling drinks and the "six-taste" new-year offerings.

export const DRINK_RECIPES: PrasadRecipe[] = [
  // ───────────────────────────── PANCHAMRIT ─────────────────────────────
  {
    id: 'panchamrit',
    name: 'Panchamrit',
    alsoCalled: 'Panchamrita · Panchamirtham · पंचामृत',
    category: 'Offering mix',
    summary: 'The “five nectars” — milk, curd, honey, ghee and sugar — bathed over the deity, then shared as prasad.',
    meaning:
      'Panchamrit is the first thing poured over an idol at abhishekam and the last thing handed to the devotee. In North India and Maharashtra it is a drinkable mix of the five sacred foods. In Tamil Nadu the same word, Panchamirtham, means something entirely different: a thick, sweet, banana-based paste, most famously at Palani. The five ingredients also carry meaning — milk for purity, curd for prosperity, honey for sweetness of speech, ghee for strength, sugar for joy.',
    variants: [
      {
        id: 'north-maharashtra',
        region: 'North India & Maharashtra',
        culture: 'Vaishnava, Shaiva and Ganapati households',
        title: 'Panchamrit (abhishek and prasad)',
        intro:
          'The thin, drinkable version. The five ingredients are first used one by one for the abhishekam, then the collected liquid (or a fresh mix made the same way) is served as a spoonful of prasad. Tulsi is added for Vishnu and Krishna; bilva leaf for Shiva.',
        serves: '10–12 spoonfuls of prasad',
        prep: '10 min',
        cook: 'None',
        ingredients: [
          {
            group: 'The five amrits',
            items: [
              '1 cup (240 ml) full-fat milk, preferably desi cow milk, boiled and fully cooled',
              '1/2 cup (120 g) fresh set curd, whisked smooth',
              '2 tbsp pure honey',
              '1 tbsp cow ghee, melted and cooled',
              '1 tbsp mishri (rock sugar) powder or plain sugar',
            ],
          },
          {
            group: 'To finish',
            items: [
              '8–10 fresh tulsi leaves (for Vishnu/Krishna/Rama) — omit for Shiva and Ganesha',
              '2 tsp makhana or chopped almonds and 1 tsp raisins (optional)',
              '1/4 tsp cardamom powder (optional, not used in strict abhishek)',
            ],
          },
        ],
        method: [
          'Wash a clean steel or brass bowl and keep it for the deity only. Do not use plastic.',
          'Pour in the cooled milk, then stir in the whisked curd so that no lumps remain.',
          'Add the mishri powder and stir until it dissolves completely — this is why the mixture is stirred, not blended.',
          'Add the honey and the melted ghee last, folding them in gently so the ghee does not float in a layer.',
          'For abhishekam, take the five ingredients separately in five small bowls and pour them over the idol in this order: milk, curd, honey, ghee, sugar-water. Follow each pour with a little clean water.',
          'Collect what is caught in the tray (if the temple practice allows) and stir it into your prepared bowl, or simply use the fresh mixture.',
          'Float the tulsi leaves on top, add the dry fruits, and cover with a clean cloth until the aarti.',
        ],
        offering:
          'Offered to the deity at the end of abhishekam or just before aarti. Distribute one teaspoon into the right palm of each devotee, who sips it and wipes the hands over the head. Consume the same day — it contains curd and milk and does not keep.',
        tips: [
          'Use fresh curd only — sour curd curdles the milk and spoils the taste.',
          'For Shiva, skip the tulsi and add 3 bilva leaves instead; for Ganesha add a few durva blades.',
          'If a household is fasting (vrat), use mishri rather than refined sugar and skip the cardamom and dry fruits.',
        ],
        differs: 'Thin, sipped from the palm; milk-curd-honey-ghee-sugar. Tulsi added for Vishnu.',
      },
      {
        id: 'palani-tamil',
        region: 'Tamil Nadu (Palani & Murugan temples)',
        culture: 'Tamil Shaiva and Murugan tradition',
        title: 'Palani Panchamirtham',
        intro:
          'Here the five ingredients are bananas, jaggery, dates, honey and ghee — mashed to a thick, glossy paste, not a drink. The Palani Dhandayuthapani temple prasad uses the small, sweet Virupakshi hill banana and has a GI tag. It is made fresh and given in a small cup or leaf bowl, with a sticky sweetness that is quite unlike the northern version.',
        serves: '6–8 small cups',
        prep: '20 min',
        cook: 'None (optional 2 min to melt jaggery)',
        ingredients: [
          {
            group: 'The five ingredients',
            items: [
              '6 very ripe small bananas (Virupakshi if you can find them; otherwise poovan or yelakki), about 300 g peeled',
              '1/2 cup (100 g) jaggery, powdered (or 4 tbsp, plus a little extra to taste)',
              '8 soft dates, deseeded and finely chopped',
              '2 tbsp honey',
              '2 tbsp cow ghee, plus a drizzle to finish',
            ],
          },
          {
            group: 'The flavours Palani adds',
            items: [
              '1 tbsp kalkandu (rock-candy crystals), lightly crushed',
              '1/2 tsp cardamom powder',
              '1 tbsp seedless raisins, chopped',
              'Optional: 1 tsp dry ginger powder',
            ],
          },
        ],
        method: [
          'Peel the bananas and mash them with a clean wooden masher or the back of a steel spoon until almost smooth — do not use a blender, which turns the paste watery.',
          'If your jaggery is hard, warm it with 2 tbsp water for two minutes to a thin syrup, strain it, and cool completely.',
          'Add the jaggery to the banana and stir well; the mixture will loosen slightly and turn amber.',
          'Fold in the chopped dates, then the honey and ghee. Stir in one direction for a minute so the ghee blends in.',
          'Add the cardamom, kalkandu and raisins and mix lightly so the crystals stay crunchy.',
          'Rest the panchamirtham for 15 minutes so the dates soften and the flavours join. It should be thick, shiny and spoonable.',
          'Finish with a final thin drizzle of ghee on top before offering.',
        ],
        offering:
          'Offered to Murugan at abhishekam and again at the naivedyam; handed out in small portions. In Palani the abhishekam itself uses the panchamirtham poured over the idol, which is why it is also called the “abhisheka prasadam”.',
        tips: [
          'Overripe, spotty bananas give the best sweetness. Underripe fruit makes it starchy.',
          'Keep it in a clean glass or steel container and consume the same day; with ghee and banana it ferments in warm weather.',
          'Do not add milk — the authentic version is dry and sticky, and milk would make it spoil faster.',
        ],
        differs: 'A thick banana-jaggery-date paste (Palani GI), not a milk drink.',
      },
    ],
  },

  // ───────────────────────────── CHARANAMRIT ─────────────────────────────
  {
    id: 'charanamrit',
    name: 'Charanamrit',
    alsoCalled: 'Charnamrit · Tirtham · Theertham · चरणामृत',
    category: 'Drink',
    summary: 'The sanctified tulsi water that has touched the deity’s feet, sipped as grace.',
    meaning:
      'Charanamrit literally means “nectar of the feet”. Devotees receive three small sips from the right palm and touch the eyes and head with the remainder. In the Vaishnava north it is a sweet milk-and-tulsi mixture; in the Sri Vaishnava south it is cardamom-and-clove tirtham with a trace of edible camphor, taken from the temple’s own vessel.',
    variants: [
      {
        id: 'north-braj',
        region: 'North India & Braj',
        culture: 'Vaishnava, Pushtimarg and Krishna-bhakti households',
        title: 'Tulsi Charanamrit',
        intro:
          'Milk and water bathed over the deity’s feet, thickened with a touch of honey and plenty of tulsi. In Braj it is made fresh before every aarti.',
        serves: '12–15 small sips',
        prep: '10 min',
        cook: 'None',
        ingredients: [
          {
            items: [
              '1/2 cup (120 ml) boiled-and-cooled cow milk',
              '1/2 cup (120 ml) clean water (Ganga-jal if available, a spoonful is enough)',
              '15–21 fresh tulsi leaves (an odd number, never plucked on Ekadashi or Sunday)',
              '1 tsp honey',
              '1 tsp mishri powder',
              '2 drops of pure ghee',
              'A tiny pinch of cardamom powder (optional)',
            ],
          },
        ],
        method: [
          'Wash the tulsi leaves in clean water and bruise them lightly between the fingers to release their oil.',
          'Place the leaves in a clean small vessel with the water and milk.',
          'Dissolve the mishri in it, add the honey and ghee and stir with a clean spoon.',
          'Offer the vessel at the deity’s feet during abhishekam, or place the vessel before the idol and sprinkle a few drops from the deity’s water into it.',
          'After aarti, pour a spoonful into the right palm of each devotee. Add a tulsi leaf with it.',
        ],
        offering:
          'Receive it in the right palm with the left hand supporting the right wrist, sip three times, and wipe the hand over the head. Do not wash the hand immediately.',
        tips: [
          'Never let a tulsi leaf touch your teeth when you receive it — swallow it or place it on the tongue.',
          'Prepare in small quantities; it is meant to be finished within the hour.',
        ],
        differs: 'Milk, honey and a lot of tulsi; sweet.',
      },
      {
        id: 'sri-vaishnava-south',
        region: 'Tamil Nadu, Andhra & Karnataka (Sri Vaishnava temples)',
        culture: 'Sri Vaishnava tradition (Srirangam, Tirumala, Melkote)',
        title: 'Tirtham / Theertham',
        intro:
          'Water boiled with cloves, cardamom and tulsi, with a very small speck of edible (pachai) camphor. It is clear, fragrant and cooling, with no milk and no sugar, and is given in a small silver spoon, three times.',
        serves: '15–20 spoonfuls',
        prep: '5 min',
        cook: '10 min',
        ingredients: [
          {
            items: [
              '2 cups (480 ml) fresh water',
              '3 cardamom pods, lightly crushed',
              '3 cloves',
              '15 tulsi leaves',
              'A pinch (a grain-sized speck) of pachai karpooram (edible camphor) — optional but traditional',
              '1 saffron strand (optional, for festival days)',
            ],
          },
        ],
        method: [
          'Boil the water with the cloves and cardamom for 5 minutes on a low flame, then switch off.',
          'Add the tulsi leaves, cover, and steep for 10 minutes.',
          'Strain through a clean cloth into a washed silver, brass or steel vessel.',
          'Add the edible camphor, stirring once; do not use ordinary puja camphor, which is toxic.',
          'Place the vessel in front of the deity during the aarti, then serve in a small spoon.',
        ],
        offering:
          'Poured into the right palm in three spoons: the first to be sipped, the second sipped, and the third touched to the head. Hands are not washed afterwards.',
        tips: [
          'Use only edible camphor (pachai karpooram). If you are not sure, leave it out.',
          'The tirtham should be faintly aromatic, not spicy — reduce the cloves if it tastes sharp.',
        ],
        differs: 'Clear spiced water with tulsi and edible camphor; no milk.',
      },
    ],
  },

  // ───────────────────────────── PANAKAM ─────────────────────────────
  {
    id: 'panakam',
    name: 'Panakam',
    alsoCalled: 'Panaka · Panha · Pana · పానకం',
    category: 'Drink',
    summary: 'Jaggery-ginger cooler offered on Rama Navami and Narasimha Jayanti.',
    meaning:
      'Panakam is the spring and summer offering of the South: cool, sweet and gently spicy, served beside kosambari at Rama Navami. It is offered because tradition says Rama’s coronation was marked with cool drinks; Narasimha, the fierce form of Vishnu, is also cooled with panakam. The recipe changes by state — pepper and dry ginger in Telangana, lemon in Karnataka, and cooked raw mango in Maharashtra.',
    variants: [
      {
        id: 'telangana-andhra',
        region: 'Telangana & Andhra Pradesh (Bhadrachalam)',
        culture: 'Telugu Vaishnava; Sri Rama Navami Kalyanam',
        title: 'Panakam (Bhadrachalam style)',
        intro:
          'This is the panakam distributed at Bhadrachalam’s Sita Rama Kalyanam. Dry ginger (sunti) and crushed black pepper give it a gentle heat; it is served cool in small cups, with vadapappu (soaked moong) on the side.',
        serves: '6–8 glasses',
        prep: '10 min',
        cook: '5 min',
        ingredients: [
          {
            items: [
              '1 cup (200 g) powdered jaggery',
              '4 cups (950 ml) cold filtered water',
              '1 tsp dry ginger powder (sunti podi)',
              '1/2 tsp cardamom powder',
              '1/4 tsp freshly cracked black pepper',
              '1 tsp lemon juice (optional)',
              '4 tulsi leaves for floating',
            ],
          },
        ],
        method: [
          'Dissolve the jaggery in 1 cup of the water, warming for 2 minutes if needed, and strain out any grit.',
          'Mix the syrup into the remaining cold water.',
          'Add the dry ginger powder first, whisking so that it does not clump, then the cardamom and pepper.',
          'Stir in the lemon juice, if using — a few drops are enough.',
          'Chill in a clay pot or keep covered in a cool place. Float the tulsi leaves on top.',
        ],
        offering:
          'Offered with kosambari or vadapappu at noon on Rama Navami — the hour of Rama’s birth. Served from a clean pot in small cups.',
        tips: [
          'Do not boil the ginger in the syrup — it turns bitter.',
          'Let the drink settle for 15 minutes before serving; the fine dregs of jaggery fall to the bottom and can be left behind.',
        ],
        differs: 'Dry ginger and black pepper, tulsi; served with vadapappu.',
      },
      {
        id: 'karnataka',
        region: 'Karnataka',
        culture: 'Kannada Vaishnava and Madhva households',
        title: 'Panaka',
        intro:
          'Karnataka’s panaka is brighter and more sour: fresh ginger juice and lemon, with cardamom and a hint of nutmeg. It is served with kosambari and majjige (buttermilk) in what is called the “Rama Navami trio”.',
        serves: '6–8 glasses',
        prep: '10 min',
        cook: 'None',
        ingredients: [
          {
            items: [
              '3/4 cup (150 g) powdered jaggery',
              '4 cups (950 ml) water',
              '1 tbsp fresh ginger juice (grate and squeeze 1-inch piece)',
              '2 tbsp fresh lemon juice',
              '1/2 tsp cardamom powder',
              '1 pinch nutmeg or a drop of rosewater (optional)',
              '1 pinch edible camphor (optional)',
            ],
          },
        ],
        method: [
          'Dissolve the jaggery completely in 1/2 cup warm water, strain, and add to the rest of the cold water.',
          'Stir in the ginger juice, lemon juice and cardamom.',
          'Taste and adjust: the balance should be sweet first, then sour, then a bright note of ginger.',
          'Add the nutmeg and edible camphor, if using, and keep the pot covered.',
          'Serve in small steel tumblers.',
        ],
        offering:
          'Offered at the midday aarti along with kosambari, majjige and fruit. Distribution is first to the children and elders.',
        tips: [
          'Fresh lemon only — bottled juice turns the drink metallic.',
          'Keep the ginger juice measured; too much makes it sharp.',
        ],
        differs: 'Fresh ginger and lemon; no dry ginger or pepper.',
      },
      {
        id: 'maharashtra-kairi-panha',
        region: 'Maharashtra',
        culture: 'Marathi households — Chaitra Gauri, Gudi Padwa, Akshaya Tritiya',
        title: 'Kairi Panha (raw-mango panha)',
        intro:
          'Raw green mango is boiled and mashed into a thick pulp and sweetened with jaggery, then thinned with water. It is served at Chaitra Gauri haldi-kumkum, on Akshaya Tritiya and at Ram Navami — mango’s season.',
        serves: '4–5 glasses',
        prep: '10 min',
        cook: '15 min',
        ingredients: [
          {
            items: [
              '2 medium raw green mangoes (about 400 g)',
              '3/4 cup (150 g) grated or powdered jaggery',
              '3 cups cold water',
              '1/2 tsp cardamom powder',
              '8–10 saffron strands soaked in 1 tbsp warm milk or water',
              '1/2 tsp roasted cumin powder (optional)',
              'A pinch of salt',
            ],
          },
        ],
        method: [
          'Wash the mangoes and boil them whole in a pot with enough water for 12–15 minutes, until the skin wrinkles and the flesh is soft.',
          'Cool and peel; scrape out the flesh and discard the stone.',
          'Mash the pulp and rub it through a sieve for a smooth consistency.',
          'Add the grated jaggery and warm it for 3 minutes until dissolved. Cool.',
          'Add the cardamom, saffron, cumin and a pinch of salt and mix. Thin with cold water to a drinkable consistency.',
          'Chill. Serve in small glasses; the concentrate can be kept in the fridge for 2 days.',
        ],
        offering:
          'Offered to Gauri on Chaitra Gauri along with soaked chana (usal) and served to every visitor; offered to Rama and Hanuman on Ram Navami.',
        tips: [
          'Choose sour, very firm mangoes; sweet mangoes make a flat panha.',
          'The concentrate can be frozen in cubes for the season.',
        ],
        differs: 'Cooked raw mango plus jaggery; saffron; no ginger.',
      },
    ],
  },

  // ───────────────────────────── THANDAI ─────────────────────────────
  {
    id: 'thandai',
    name: 'Thandai',
    alsoCalled: 'Sardai · ठंडाई',
    category: 'Drink',
    summary: 'Saffron-and-almond milk cooler of Holi and Maha Shivaratri.',
    meaning:
      'Thandai means “the cooling one”. It is the festive drink of Holi and Shivaratri, made of nuts, seeds and spices that cool the body at the turn of the season. Some Shaiva traditions mix bhang into thandai; that is not included here — this is the plain, family version offered as prasad and shared with children and elders alike.',
    variants: [
      {
        id: 'braj-up',
        region: 'Braj & Uttar Pradesh',
        culture: 'Krishna-bhakti, Mathura–Vrindavan and Varanasi households',
        title: 'Mathura-style Thandai',
        intro:
          'A creamy, fragrant, pale-pink thandai with a strong rose and fennel note. In Mathura and Varanasi shops the nut paste is stone-ground on a sil and the drink is served in clay cups.',
        serves: '6 glasses',
        prep: '30 min + 4 hrs soaking',
        cook: '10 min',
        ingredients: [
          {
            group: 'Thandai paste',
            items: [
              '1/4 cup almonds',
              '2 tbsp cashews',
              '2 tbsp pistachios',
              '2 tbsp melon (magaz) seeds',
              '1 tbsp white poppy seeds (khus-khus)',
              '1 tbsp fennel seeds (saunf)',
              '10–12 black peppercorns',
              '8 green cardamom pods, seeds only',
              '1 tbsp dried rose petals',
            ],
          },
          {
            group: 'For the drink',
            items: [
              '1 litre full-fat milk',
              '1/2 cup (100 g) sugar, or to taste',
              '10–12 saffron strands soaked in 2 tbsp warm milk',
              '1 tsp rose water',
              'Chopped pistachios and rose petals to garnish',
            ],
          },
        ],
        method: [
          'Soak the almonds, cashews, pistachios, melon seeds, poppy seeds, fennel, peppercorns and cardamom in 1 cup of warm water for 4 hours.',
          'Drain and grind to a very fine paste with 1/2 cup of the soaking water and the rose petals. Work in batches so the paste is smooth, not gritty.',
          'Boil the milk with the sugar for 10 minutes, stirring, then cool completely.',
          'Stir in the thandai paste; strain through a muslin cloth, pressing to extract all the cream. Repeat with a little milk to wash the pulp.',
          'Add the saffron milk and rose water, and chill for at least 3 hours.',
          'Serve very cold, garnished with pistachios and rose petals.',
        ],
        offering:
          'Offered to Krishna and Radha during the Holi celebrations at Braj and to Shiva on Shivaratri; the remaining portion is shared as prasad.',
        tips: [
          'Do not skip the muslin straining — it is the difference between a silken thandai and a gritty one.',
          'The paste keeps 2 days in the fridge; mix with cold milk for a quick glass.',
          'Poppy seeds are restricted in some countries; omit them if you are travelling or if local rules prohibit.',
        ],
        differs: 'Rose-forward, fennel-heavy, pale pink; stone-ground paste.',
      },
      {
        id: 'rajasthan',
        region: 'Rajasthan',
        culture: 'Marwari and Mewar households; Pushkar and Nathdwara',
        title: 'Kesar-Badam Thandai (Rajasthani)',
        intro:
          'The Rajasthani version is richer and sweeter: more saffron, more badam, a spoon of gulkand, and it is sometimes thickened with khoya or a little reduced milk. It is the drink of Gangaur and Holi in Jaipur and Udaipur.',
        serves: '6 glasses',
        prep: '30 min + 3 hrs soaking',
        cook: '20 min',
        ingredients: [
          {
            group: 'Paste',
            items: [
              '1/3 cup almonds',
              '2 tbsp pistachios',
              '2 tbsp watermelon (char magaz) seeds',
              '1 tbsp poppy seeds',
              '1 tbsp fennel seeds',
              '6 green cardamom pods',
              '8 peppercorns',
              '1 tbsp gulkand (rose-petal jam)',
            ],
          },
          {
            group: 'Milk',
            items: [
              '1 litre full-fat milk, reduced to 800 ml by boiling',
              '1/2 cup sugar',
              '20 saffron strands, soaked',
              '2 tbsp khoya (optional)',
            ],
          },
        ],
        method: [
          'Soak the dry ingredients for the paste in warm water for 3 hours and grind smooth with the gulkand.',
          'Boil the milk until it is reduced by about a fifth, stirring frequently; add sugar and the crumbled khoya.',
          'Cool the milk. Whisk the paste into it and strain through muslin.',
          'Stir in the saffron and chill for at least 4 hours.',
          'Serve in clay kulhads with a strand of saffron on top.',
        ],
        offering:
          'Offered to Gauri during Gangaur and shared with the women who fasted. On Holi it is served with malpua and gujiya.',
        tips: [
          'Reduce the sugar if you use gulkand — it is already sweet.',
          'For a lighter drink, skip the khoya.',
        ],
        differs: 'Gulkand, extra saffron and khoya; thicker and sweeter.',
      },
    ],
  },

  // ───────────────────────────── PANA (ODISHA) ─────────────────────────────
  {
    id: 'pana',
    name: 'Pana',
    alsoCalled: 'Bela Pana · Pana Sankranti · ପଣା',
    category: 'Drink',
    summary: 'Odisha’s cooling fruit-and-jaggery drink for Maha Vishuba Pana Sankranti.',
    meaning:
      'Pana Sankranti is the Odia new year. A sweet-and-cool drink is offered to Surya, to Jagannath and to Hanuman, and in many homes a small earthen pot (basundhara) with a hole in the base is hung above the tulsi plant so that water drips on it all through the hot month. The pana is meant to cool the body and the spirit at the start of summer.',
    variants: [
      {
        id: 'odisha',
        region: 'Odisha',
        culture: 'Odia Vaishnava households, Jagannath temples',
        title: 'Pana',
        intro:
          'A thick, sweet, cool drink made of ripe bael (wood-apple), banana, jaggery, milk and a little curd, flavoured with pepper and cardamom. Variants add chhena or coconut.',
        serves: '6–8 glasses',
        prep: '20 min',
        cook: 'None',
        ingredients: [
          {
            items: [
              '1 ripe bael (wood-apple), pulp only — about 1/2 cup',
              '2 ripe bananas, mashed',
              '1/2 cup (100 g) jaggery or sugar',
              '2 cups cold milk',
              '1/2 cup fresh curd (optional)',
              '1/2 cup fresh coconut cubes',
              '1/4 cup crumbled fresh chhena (optional)',
              '1 tsp cardamom powder',
              '1/4 tsp freshly ground black pepper',
              'A pinch of nutmeg',
              '2 cups cold water',
            ],
          },
        ],
        method: [
          'Break open the bael and scoop out the pulp; mash with a little water and rub through a sieve to remove the seeds and fibres.',
          'Dissolve the jaggery in a cup of warm water, cool and strain.',
          'In a large clean pot combine the bael pulp, mashed bananas, jaggery syrup, milk, curd and cold water.',
          'Season with cardamom, pepper and nutmeg. Stir gently; add the coconut cubes and chhena.',
          'Chill. Offer in a new earthen pot placed on a banana leaf.',
        ],
        offering:
          'Offered to Surya (rising sun), to Jagannath and to Hanuman; distributed to neighbours and passers-by. The basundhara pot is filled with water and tulsi and hung over the tulsi plant for the month.',
        tips: [
          'A ripe bael smells sweet and is soft to the touch; unripe bael is bitter.',
          'If you cannot get bael, use extra banana and a spoon of tamarind pulp for tang.',
        ],
      },
    ],
  },

  // ───────────────────────────── UGADI PACHADI ─────────────────────────────
  {
    id: 'ugadi-pachadi',
    name: 'Ugadi Pachadi',
    alsoCalled: 'Bevu-Bella · Kadunimb · Maanga Pachadi · ఉగాది పచ్చడి',
    category: 'Offering mix',
    summary: 'The six-taste new-year offering: sweet, sour, bitter, salty, spicy and tangy.',
    meaning:
      'The new year begins with a lesson: life will bring sweetness, sourness, bitterness, salt, heat and tang, and each must be taken in stride. Neem flower is the bitter, jaggery the sweet, tamarind the sour, raw mango the tang, salt, and chilli or pepper the heat. Andhra and Telangana call it Ugadi pachadi, Karnataka calls it Bevu-Bella, Maharashtra eats a neem-jaggery mix on Gudi Padwa, and Tamil Nadu makes Maanga pachadi on Puthandu.',
    variants: [
      {
        id: 'andhra-telangana',
        region: 'Andhra Pradesh & Telangana',
        culture: 'Telugu households — Ugadi',
        title: 'Ugadi Pachadi (shadruchulu)',
        intro:
          'The classic six-taste pachadi with tamarind, jaggery, raw mango, neem flowers, green chilli, salt and often banana and coconut. It is the first thing eaten on Ugadi morning.',
        serves: '4–5 people (about 1½ cups)',
        prep: '15 min',
        cook: 'None',
        ingredients: [
          {
            items: [
              '1 tbsp fresh neem flowers (vepa puvvu), cleaned (or 1 tsp dried)',
              '1/4 cup jaggery, grated',
              '1 small lemon-sized ball of tamarind soaked in 1/2 cup warm water',
              '2 tbsp finely chopped raw mango',
              '1 green chilli, finely chopped (or 1/4 tsp pepper)',
              '1 pinch of salt',
              '1 ripe banana, chopped',
              '2 tbsp fresh coconut pieces',
              '1 tbsp chopped sugarcane (optional)',
              '1/2 cup water',
            ],
          },
        ],
        method: [
          'Soak the tamarind for 15 minutes, squeeze out the pulp and strain to get thick juice.',
          'In a clean bowl, dissolve the grated jaggery in the tamarind juice and water.',
          'Add the chopped raw mango, banana, coconut pieces and sugarcane.',
          'Add the neem flowers, the chopped chilli (or pepper) and a pinch of salt.',
          'Mix gently, taste, and adjust so that no flavour dominates the others.',
          'Offer first to the deity in a small bowl with a tulsi leaf.',
        ],
        offering:
          'Offered to the deity first, then shared on a banana leaf as the first morsel of the new year. A spoonful is eaten before anything else.',
        tips: [
          'Use only fresh or properly dried neem flowers. Remove the stalks — they are too bitter.',
          'Raw mango in season is essential; if you cannot find it, use a few drops of lemon juice instead.',
        ],
        differs: 'Tamarind-based, with banana and coconut.',
      },
      {
        id: 'karnataka',
        region: 'Karnataka',
        culture: 'Kannada households — Yugadi',
        title: 'Bevu-Bella',
        intro:
          'Karnataka’s offering is simpler and drier: neem flowers and jaggery with raw mango, a pinch of salt and sometimes fresh coconut. It is eaten alongside holige (puran poli).',
        serves: '4–5 people',
        prep: '10 min',
        cook: 'None',
        ingredients: [
          {
            items: [
              '1 tbsp fresh neem flowers or 1 tsp dried',
              '1/2 cup finely powdered jaggery (bella)',
              '2 tbsp raw mango, chopped fine',
              '1 tbsp thin coconut slivers',
              '1 pinch of salt',
              '1 pinch of pepper or a tiny piece of green chilli',
              '2 tbsp tamarind water (optional)',
            ],
          },
        ],
        method: [
          'Wash and dry the neem flowers on a clean cloth.',
          'Mix the jaggery, mango and coconut in a small bowl.',
          'Add the neem flowers, salt and pepper, and toss lightly with a clean spoon.',
          'Add tamarind water if you prefer the mixture looser.',
        ],
        offering:
          'Offered at the household altar and then eaten as the first morsel of Yugadi, followed by holige and the festive meal.',
        tips: [
          'The proportion of neem to jaggery is the whole recipe — roughly one part neem flower to ten parts jaggery.',
        ],
        differs: 'Mostly neem-and-jaggery; dry; eaten with holige.',
      },
      {
        id: 'maharashtra-gudi-padwa',
        region: 'Maharashtra',
        culture: 'Marathi households — Gudi Padwa',
        title: 'Kadunimbachi chutney (neem–gul prasad)',
        intro:
          'A bitter-sweet paste of tender neem leaves and flowers with jaggery, tamarind, cumin, ajwain, hing and salt. It is eaten on Gudi Padwa morning, believed to protect against the coming summer’s heat.',
        serves: '4–5 people',
        prep: '10 min',
        cook: 'None',
        ingredients: [
          {
            items: [
              '1 tbsp tender neem leaves and flowers',
              '2 tbsp jaggery',
              '1 tsp tamarind pulp',
              '1/2 tsp cumin seeds',
              '1/2 tsp ajwain (carom)',
              'A pinch of hing (asafoetida)',
              'A pinch of salt',
              '1/4 tsp red chilli powder (optional)',
            ],
          },
        ],
        method: [
          'Wash the neem leaves and flowers and pat dry.',
          'Crush the cumin, ajwain, hing and salt in a mortar.',
          'Add the neem, jaggery and tamarind and pound lightly to a coarse paste.',
          'Offer a small spoonful at the Gudi.',
        ],
        offering:
          'Eaten before any other food on Gudi Padwa. Offered along with sweet shrikhand-puri or puran poli at lunch.',
        tips: ['Use only the youngest leaves; mature leaves are intensely bitter.'],
        differs: 'A paste of neem leaf and jaggery with ajwain, cumin and hing.',
      },
      {
        id: 'tamil-nadu-puthandu',
        region: 'Tamil Nadu',
        culture: 'Tamil households — Puthandu (Tamil New Year)',
        title: 'Maanga Pachadi',
        intro:
          'A cooked raw-mango pachadi with jaggery, neem flowers and chilli, tempered in coconut oil. Tamil Nadu’s version is thick and glossy, closer to a chutney.',
        serves: '4–5 people',
        prep: '10 min',
        cook: '15 min',
        ingredients: [
          {
            items: [
              '1 large raw mango, peeled and diced',
              '1/2 cup jaggery, grated',
              '1 tbsp neem flowers (veppam poo)',
              '1 pinch of turmeric',
              '1/2 tsp salt',
              '1 tsp red chilli powder (or 2 dry red chillies)',
              '1 cup water',
              '1 tsp coconut oil or ghee',
              '1/2 tsp mustard seeds, 1 dry red chilli, a few curry leaves for the tempering',
            ],
          },
        ],
        method: [
          'Cook the diced mango with the water and turmeric until soft, about 8 minutes.',
          'Add the jaggery and cook until dissolved and the mixture thickens.',
          'Add the salt and chilli powder.',
          'In a small pan, heat the oil, add the mustard seeds, dry red chilli and curry leaves, and pour over the pachadi.',
          'Finish with the neem flowers.',
        ],
        offering:
          'Prepared on the morning of Puthandu and offered at the kanni (the auspicious tray) before being served first at the meal.',
        tips: ['Add the neem flowers off the heat so that the bitterness does not spread.'],
        differs: 'Cooked raw mango, thick and tempered with mustard.',
      },
    ],
  },
]
