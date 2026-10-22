import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'sweet-pongal',
  name: 'Sweet Pongal',
  alsoCalled: 'Sakkarai Pongal · Chakkera Pongali · Sihi Pongal · சர்க்கரைப் பொங்கல்',
  category: 'Rice & Grain',
  summary: 'New rice and moong dal cooked soft and sweetened with jaggery and ghee — the harvest prasad of the South.',
  meaning:
    'Pongal means “to boil over”, and the sweet pongal of the harvest festival is meant to do exactly that: milk and rice rise in the new pot and spill over the rim, which the family greets with the shout “Pongalo Pongal!”. It is a dish of the first rice and the first jaggery of the season, offered to Surya, the sun, before anyone eats. The three southern states cook it with the same bones (rice, moong dal, jaggery, ghee, cardamom) but different hands. Tamil sakkarai pongal is the soft, spoonable, jaggery-dark classic cooked in milk. Andhra chakkera pongali is richer in ghee and nuts and often cooked in a pressure cooker for large gatherings and temple offerings. Karnataka’s sihi pongal, eaten at Makara Sankranti, is a little drier and more delicately scented, and sits next to khara pongal on the festival plate. In each, the sweetness comes from jaggery rather than sugar, because the newly harvested sugarcane is the point of the day.',
  variants: [
    // ───────────────────────────── TAMIL NADU ─────────────────────────────
    {
      id: 'tamil-sakkarai',
      region: 'Tamil Nadu',
      culture: 'Tamil households — Thai Pongal, temple naivedyam',
      title: 'Sakkarai Pongal',
      intro:
        'Soft rice and roasted moong dal cooked in milk and water, sweetened with strained jaggery and finished with ghee-fried cashews, raisins and cardamom. Cooked outdoors in a new clay pot on Thai Pongal.',
      story:
        'Thai Pongal falls in mid-January, when the sun enters Makara (Capricorn) and the rice harvest comes home. Tamil families clean the house, draw a kolam at the doorstep and, at sunrise, set a new clay pot on a brick or firewood hearth in the courtyard. The pot is decorated with turmeric plant and ginger leaves tied at the neck, and sugarcane stalks stand beside it. Milk is poured in, and when it foams up and spills over the rim, everyone cheers “Pongalo Pongal!”, a sign of overflowing prosperity for the coming year.\n\nSakkarai pongal is the sweet of the day. It is cooked from the new rice, with a measure of moong dal that has been roasted until it smells nutty, and sweetened with jaggery, never sugar, since the new jaggery pressed from the fresh sugarcane is part of the celebration. Ghee, cashews, raisins and cardamom finish it, and many Tamil temples, including Srirangam and Palani, serve the same recipe as their daily naivedyam.\n\nThe quality marks of a good sakkarai pongal are softness and gloss. The rice should be completely cooked and melting, the dal soft enough to disappear into it, and the jaggery syrup folded in at the end so that it does not toughen the grain. It is first offered to Surya in the open courtyard and only then eaten.',
      serves: '6–8 servings',
      prep: '15 min',
      cook: '40 min',
      equipment: [
        'New clay pot (pongal paanai), or a heavy steel vessel — the pot is part of the festival; a thick base also prevents sticking while the milk rises',
        'Wood or gas hearth in the open courtyard — traditional, but a home stove works',
        'Long wooden ladle (karandi) — to stir the rice without breaking the grains',
        'Small pan for roasting dal and frying nuts — keeps the dal and nuts separate from the main pot',
      ],
      ingredients: [
        {
          group: 'For the pongal',
          items: [
            '1/2 cup (100 g) raw rice, preferably new-crop raw rice (pachai arisi) — new rice cooks softer and sweeter; any short-grain raw rice will do',
            '2 tbsp (30 g) split moong dal, yellow — roasted first for a nutty flavour',
            '3 cups full-fat milk and 1 cup water — milk gives the creamy softness; the water helps the rice cook through',
            '3/4 cup (150 g) powdered or grated jaggery — dark Tamil jaggery (vellam) is preferred; it is strained before use',
            '1/4 cup water — to melt the jaggery',
          ],
        },
        {
          group: 'For the finish',
          items: [
            '3 tbsp ghee — a generous amount gives the glossy, rich finish',
            '10 cashews, broken, and 1 tbsp raisins — fried in ghee for crunch',
            '1/2 tsp ground cardamom — freshly ground from green pods',
            '1 tbsp dried coconut slivers (optional) — fried with the cashews for a toasty bite',
            'A pinch of edible camphor (pachai karpooram), optional — a temple fragrance; edible grade only',
          ],
        },
      ],
      mise: [
        'Wash the rice and dal together in two changes of water. Drain well and leave for 10 minutes.',
        'Dry-roast the washed dal in a small pan on low heat for 2–3 minutes, until it smells nutty and just starts to colour. Cool.',
        'Dissolve the jaggery in 1/4 cup hot water, bring to a boil for one minute, then strain through a fine sieve to remove sand. Keep it warm.',
        'Fry the cashews, raisins and coconut slivers in 1 tablespoon of ghee in a small pan until golden. Set aside.',
        'If cooking outdoors, set up the hearth, clean the courtyard and keep the sugarcane, turmeric plant and kolam ready before lighting the fire.',
      ],
      method: [
        {
          title: 'Roast the dal',
          text:
            'In a dry pan on low heat, roast the washed and drained moong dal for 2–3 minutes, stirring constantly, until it smells nutty and lightens in colour. Do not let it brown. Tip it out to cool.',
          why: 'Roasting gives the dal a toasty, sweet aroma and helps it cook up soft and creamy rather than sticky and raw-tasting.',
          cue: 'The dal smells like toasted nuts and the grains look dry and pale gold.',
        },
        {
          title: 'Heat the milk and water in the pot',
          text:
            'Pour the milk and water into the pongal pot and set it on medium heat. Bring to a boil, watching closely: when the milk rises and spills over the rim, call out “Pongalo Pongal!”, then reduce the heat to low.',
          why: 'The spilling over is the ritual high point of the day. Lowering the heat after prevents a messy overflow and keeps the milk from scorching.',
          cue: 'White foam lifts above the rim, then sinks as the heat drops.',
        },
        {
          title: 'Add the rice and dal',
          text:
            'Add the washed rice and roasted dal to the hot milk. Stir well once to separate the grains. Cook on low heat, stirring every 3–4 minutes, for 25–30 minutes, until the rice is soft and the dal has melted into it. Add a splash of hot water if it thickens too soon.',
          why: 'Cooking the rice and dal together over low heat makes them break down evenly into a soft, creamy mass.',
          cue: 'The rice is mushy when pressed and the mixture looks like a thick, loose porridge.',
        },
        {
          title: 'Mash lightly',
          text:
            'With the back of the ladle, mash the cooked rice and dal against the side of the pot 8–10 times. Do not turn it into a purée; the pongal should be soft with a few grains visible.',
          why: 'A little mashing releases starch, giving the pongal a creamy body that carries the jaggery.',
          cue: 'The mixture holds together in a soft mass and flows slowly from the ladle.',
        },
        {
          title: 'Fold in the jaggery syrup',
          text:
            'Reduce the heat to the lowest setting. Pour the strained jaggery syrup in slowly while stirring. Cook for 8–10 minutes, stirring continuously, until the pongal thickens again and the raw smell of jaggery turns into a caramel aroma.',
          why: 'Jaggery hardens rice, so it goes in only after the rice is fully soft. Straining the syrup first removes grit.',
          cue: 'The colour deepens to a warm golden brown, and the pongal clings to the ladle in a glossy layer.',
        },
        {
          title: 'Add ghee, cardamom and camphor',
          text:
            'Stir in 2 tablespoons of ghee a spoon at a time, then the cardamom and, if using, the pinch of edible camphor. Cook for 2 minutes more so that the ghee blends in and the pongal turns glossy.',
          why: 'Ghee gives sakkarai pongal its characteristic shine and richness. Adding it at the end keeps its aroma strong.',
          cue: 'A thin film of ghee shines on the surface, and the pot smells of cardamom and caramel.',
        },
        {
          title: 'Add the fried nuts',
          text:
            'Tip the ghee-fried cashews, raisins and coconut slivers, with all their ghee, into the pot and fold in gently. Switch off the heat and cover the pot for 5 minutes.',
          why: 'Adding the garnish last keeps the nuts crunchy and gives a fragrant top note.',
          cue: 'Golden cashews and plump raisins are visible throughout the pongal.',
        },
        {
          title: 'Check the consistency',
          text:
            'After resting, check the texture. The pongal should be soft and just flowing, like a thick porridge, because it thickens on cooling. If too thick, stir in a few spoons of hot milk. Taste for sweetness and adjust only if needed.',
          why: 'Pongal firms up as it stands, so it is best served slightly looser than the final texture you want.',
          cue: 'It falls off the spoon in a thick, slow ribbon.',
        },
      ],
      offering:
        'Offered first to Surya Bhagavan in the courtyard, on a banana leaf, with sugarcane, turmeric and fruits. It is then shared with the family and neighbours, and with cattle on Mattu Pongal.',
      ritual: [
        'At sunrise, clean the courtyard, draw a kolam and set the new pot on the hearth. Tie turmeric and ginger plants round the neck of the pot, and place sugarcane stalks beside it.',
        'Light the hearth facing east so that the sun’s first rays fall on the pot. Pour in the milk and wait for it to overflow, then call out “Pongalo Pongal!” together.',
        'Cook the sakkarai pongal in the open, finishing it with ghee and cardamom, without tasting it first.',
        'Place a portion on a banana leaf in front of the sun, with the sugarcane, bananas, coconut and betel leaves, and offer it with folded hands and a short prayer to Surya.',
        'After the offering, share the pongal first with the elders, then the family and neighbours, and set a portion aside for cattle and birds on the following days.',
      ],
      serving:
        'Serve warm on a banana leaf or in a small steel bowl, topped with extra ghee and a few cashews. It is eaten as the first food of the festival morning, with khara pongal alongside, and with sambar and vada at the full meal. A portion of 1/2 cup is plentiful.',
      storage:
        'Best the same day. It keeps at room temperature for 6–8 hours and in the refrigerator for 2 days. Reheat with a splash of hot milk and a spoon of ghee, stirring until soft.',
      troubleshooting: [
        {
          problem: 'The rice is still firm after the jaggery went in.',
          fix: 'The rice was not soft enough before sweetening. Add 1/2 cup hot milk, cover and cook on low heat for 10 minutes before checking again.',
        },
        {
          problem: 'The pongal is too sweet or too bland.',
          fix: 'Too sweet: stir in a few spoons of hot milk and a little cooked rice if you have it. Too bland: dissolve another 2 tablespoons of strained jaggery and fold it in.',
        },
        {
          problem: 'It tastes of raw jaggery.',
          fix: 'The syrup was not cooked into the pongal long enough. Cook another 5 minutes on low heat, stirring, until the aroma turns to caramel.',
        },
        {
          problem: 'The pongal has set hard.',
          fix: 'It thickens as it cools. Warm it with hot milk and a spoon of ghee, stirring until loose.',
        },
      ],
      variations: [
        'Some households use all water instead of milk for a lighter, more traditional temple version.',
        'Add a spoon of grated fresh coconut with the cashews for extra sweetness.',
        'Sugar can replace half the jaggery for a paler pongal, though it is less traditional.',
        'A pressure cooker version: cook the rice, dal and milk for 4 whistles, mash, then finish with jaggery on the stove.',
        'For a vrat version, use samak rice or barnyard millet in place of rice.',
      ],
      tips: [
        'Always strain the jaggery; the sediment ruins the texture.',
        'Add the jaggery only after the rice is fully soft.',
        'Be generous with ghee; sakkarai pongal is meant to be rich.',
      ],
      differs: 'Milk-cooked, jaggery-dark, soft and spoonable; cashews, raisins, cardamom; camphor in temples.',
    },

    // ───────────────────────────── ANDHRA ─────────────────────────────
    {
      id: 'andhra-chakkera',
      region: 'Andhra Pradesh & Telangana',
      culture: 'Telugu households — Sankranti, temple prasadam',
      title: 'Chakkera Pongali',
      intro:
        'The Telugu sweet pongal is richer in ghee and nuts than the Tamil version, often made with a little more dal, and is a staple of Sankranti and of temple prasadam, especially for large gatherings.',
      story:
        'In Andhra Pradesh and Telangana, Sankranti is a three-day celebration with Bhogi, Sankranti and Kanuma, and the sweet that stands for it is chakkera pongali (“sugar pongal”), though it is almost always made with jaggery. It is cooked on the main day, offered to the sun and the household deity, and given to relatives and neighbours.\n\nTelugu chakkera pongali tends to be heavier on ghee than its neighbours, with a generous addition of cashews, raisins and sometimes dried coconut, and is typically cooked a little drier so that it holds a soft mound on the plate. In temples such as Simhachalam, Srisailam and Tirumala, the same dish is made in huge quantities in bronze vessels and handed to devotees, with the generous ghee giving the unmistakable temple aroma.\n\nMany cooks use a pressure cooker to soften the rice and dal for large batches, then finish with the jaggery on the stove. This keeps the cooking fast without sacrificing the creamy texture. The dish pairs with pulihora and garelu at the Sankranti meal.',
      serves: '6–8 servings',
      prep: '15 min',
      cook: '35 min',
      equipment: [
        'Pressure cooker, 3 litre — cooks the rice and dal quickly and makes them creamy',
        'Heavy-bottomed kadai or wide pot — for finishing the pongali with jaggery over steady, even heat',
        'Wooden ladle — for mashing and stirring',
        'Small pan — to fry the nuts in ghee',
      ],
      ingredients: [
        {
          group: 'For the pongali',
          items: [
            '1/2 cup (100 g) raw rice — new-crop if possible; a short-grain raw rice mashes easily',
            '1/4 cup (50 g) split moong dal — a little more dal than in Tamil pongal, for a creamy, thick body',
            '3 cups water and 1 cup milk — the milk adds softness and a milky sweetness',
            '1 cup (200 g) grated jaggery — Telugu pongali is noticeably sweet; reduce to 3/4 cup for a milder version',
            '1/3 cup water — to melt the jaggery',
          ],
        },
        {
          group: 'For the finish',
          items: [
            '4 tbsp ghee — Andhra pongali is rich; this is not excessive for the quantity',
            '12 cashews, broken, and 2 tbsp raisins — fried in ghee',
            '2 tbsp dried coconut slivers — toasted in ghee for a nutty crunch',
            '1/2 tsp ground cardamom — freshly ground',
            '1 pinch of nutmeg or edible camphor — optional; adds the temple note',
          ],
        },
      ],
      mise: [
        'Wash the rice and dal together and drain. Dry-roast the dal alone for 2 minutes on low heat until fragrant, then mix it with the rice.',
        'Melt the jaggery in 1/3 cup hot water, strain it through a fine sieve and keep it warm.',
        'Fry the cashews, raisins and coconut in 1 tablespoon of ghee until golden, and set aside.',
        'Grind the cardamom seeds fresh in a mortar.',
        'Heat the milk until warm so it does not shock the rice when added.',
      ],
      method: [
        {
          title: 'Pressure-cook the rice and dal',
          text:
            'Put the rice, roasted dal, water and milk in the cooker. Close the lid and cook for 4 whistles on medium heat (about 15 minutes), then turn off the heat and let the pressure release naturally. Open the lid only when the pressure has fully dropped.',
          why: 'Pressure-cooking breaks the rice and dal down to a creamy softness in a short time. Letting the pressure drop naturally avoids splattering.',
          cue: 'The grains are completely soft, and the contents look like a thick, loose porridge.',
        },
        {
          title: 'Mash well',
          text:
            'Open the cooker and mash the rice and dal firmly with a wooden ladle until it is mostly smooth with a few grains left. Transfer to the heavy kadai and place over low heat.',
          why: 'Mashing makes the pongali creamy and helps the jaggery blend evenly into it.',
          cue: 'The mixture is thick and uniform, with only a few visible rice grains.',
        },
        {
          title: 'Add the jaggery syrup',
          text:
            'Pour the strained jaggery syrup in slowly while stirring continuously. The mixture will loosen. Cook on low heat for 8–10 minutes, stirring, until it thickens again and turns a deep golden brown.',
          why: 'Cooking the jaggery into the pongali removes its raw taste and caramelises it lightly. Stirring prevents sticking, as jaggery burns easily.',
          cue: 'The pongali pulls away from the sides when stirred, and smells of warm caramel.',
        },
        {
          title: 'Add ghee in portions',
          text:
            'Add 3 tablespoons of ghee one spoon at a time, stirring between each addition. The pongali will turn glossy and slightly looser. Continue to cook 3 minutes so that the ghee is fully absorbed.',
          why: 'Adding ghee gradually lets it blend smoothly rather than separating. It is the signature richness of the Telugu version.',
          cue: 'The surface has a mirror-like shine and the edges of the kadai show a rim of ghee.',
        },
        {
          title: 'Season with cardamom',
          text:
            'Sprinkle in the cardamom and, if using, the nutmeg or edible camphor. Stir well and cook for 1 minute more, keeping the heat low so the aromas do not burn off.',
          why: 'Spices added at the end keep their volatile oils and their fragrance.',
          cue: 'The kitchen smells strongly of cardamom and ghee.',
        },
        {
          title: 'Fold in the fried nuts',
          text:
            'Add the ghee-fried cashews, raisins and coconut with all their ghee and fold in gently so the nuts stay whole. Switch off the heat.',
          why: 'Folding gently preserves the crunch and keeps the nuts distributed through the pongali instead of sinking.',
          cue: 'Golden cashews and plump raisins appear in every spoonful.',
        },
        {
          title: 'Rest and set',
          text:
            'Cover the kadai and leave it for 10 minutes. The pongali will thicken and settle into a soft mound consistency. If it is too stiff, stir in 2–3 tablespoons of hot milk.',
          why: 'The starches continue to absorb liquid as the pongali rests, which gives the desired soft, moundable texture.',
          cue: 'It holds a soft mound on the spoon but relaxes slowly.',
        },
      ],
      offering:
        'Offered to Surya and the household deity on Sankranti, and as prasadam in Telugu temples. A portion is shared with neighbours and relatives, as is customary at the festival.',
      ritual: [
        'On Sankranti morning, bathe, draw a muggu (rangoli) at the door and set up the puja space with the picture of Surya or the household deity.',
        'Cook the pongali after the muggu is complete and before anyone eats, tasting only after the offering.',
        'Place a portion on a banana leaf or in a clean bowl with fruit, sugarcane, coconut and betel; offer it with a short prayer facing the rising sun.',
        'Show camphor aarti and ring the bell once; keep the naivedyam in front of the deity for a few minutes.',
        'Distribute the prasadam, starting with elders, and share with neighbours; many families send a bowl to friends and relatives.',
      ],
      serving:
        'Serve warm in small bowls or on leaf plates with an extra spoon of ghee. At the festival meal it sits with pulihora, garelu and vegetable curries. A portion of 1/2 cup is generous.',
      storage:
        'Keeps for a day at room temperature and up to 3 days refrigerated. Reheat with a spoon of hot milk and a little ghee, stirring until soft.',
      troubleshooting: [
        {
          problem: 'The pongali is too sticky and heavy.',
          fix: 'It is overcooked or has too little liquid. Loosen with hot milk, a few tablespoons at a time, and stir over low heat.',
        },
        {
          problem: 'The jaggery tastes burnt or bitter.',
          fix: 'The heat was too high. Reduce the heat and stir constantly; if burnt, it is better to start over, since the flavour cannot be hidden.',
        },
        {
          problem: 'The ghee has separated and floats.',
          fix: 'It was added too fast. Stir briskly with a splash of hot milk to re-emulsify it, and next time add it a spoon at a time.',
        },
        {
          problem: 'The rice is gritty.',
          fix: 'The rice was undercooked before sweetening. Add 1/2 cup hot milk, cover and cook 10 minutes more.',
        },
      ],
      variations: [
        'Some Telugu homes soak the rice and dal for 20 minutes to shorten the cooking time.',
        'A hint of dry ginger powder or a few saffron strands is used in some temple versions.',
        'Telangana homes sometimes use all water in place of milk for a lighter version.',
        'Replace half the jaggery with sugar for a lighter colour.',
        'For a vrat version, replace rice with samak rice or barnyard millet.',
      ],
      tips: [
        'The extra dal is what gives a creamy body; do not skip roasting it.',
        'Add ghee gradually so it blends rather than splits.',
        'Jaggery scorches fast, so keep the heat low once it is added.',
      ],
      differs: 'Richer in ghee, dal and nuts; pressure-cooked and thicker.',
    },

    // ───────────────────────────── KARNATAKA ─────────────────────────────
    {
      id: 'karnataka-sihi',
      region: 'Karnataka',
      culture: 'Kannadiga households — Makara Sankranti, temple naivedya',
      title: 'Sihi Pongal',
      intro:
        'Karnataka’s sweet pongal, sihi pongal (“sweet pongal” in Kannada), is lighter, a little drier and more delicately perfumed than its neighbours, and is served on Sankranti alongside the savoury khara pongal.',
      story:
        'In Karnataka, Makara Sankranti is the festival of the harvest and of exchanging ellu-bella, a mix of sesame, jaggery, fried peanuts and dried coconut, with the greeting “Ellu bella thindu olle maathaadi”, “eat sesame and jaggery, and speak only good words”. Alongside this, cooks prepare a pair of pongals: khara pongal, the peppery savoury one, and sihi pongal, the sweet one, which are offered together and eaten together.\n\nKannada sihi pongal differs from the Tamil version in its gentleness. It is typically cooked with a higher proportion of rice to dal, uses mostly water with only a little milk, and is flavoured with cardamom and a little edible camphor or nutmeg. The jaggery is added as a clear syrup, and the finished dish is a touch drier, so it holds its shape on a banana leaf or a plate.\n\nIt is also the pongal that is offered in many Karnataka temples as the daily naivedya, such as at Melkote and Sringeri, where it is cooked in large vessels and served on leaf plates, sometimes with a fried cashew pressed on top.',
      serves: '6 servings',
      prep: '15 min',
      cook: '35 min',
      equipment: [
        'Heavy-bottomed vessel or uruli — a thick base cooks the rice gently without sticking',
        'Wooden ladle — for stirring the rice without breaking the grain too much',
        'Small pan — for roasting the dal and frying the nuts',
        'Fine strainer — to strain the jaggery syrup of sand and bits',
      ],
      ingredients: [
        {
          group: 'For the sihi pongal',
          items: [
            '3/4 cup (150 g) raw rice — a short-grain raw rice, new crop if you can find it',
            '1/4 cup (50 g) split moong dal — roasted first; the smaller dal share gives a lighter pongal',
            '3 cups water and 1/2 cup milk — mostly water for the traditional lightness; the little milk adds softness',
            '3/4 cup (150 g) powdered jaggery — Karnataka jaggery (achchu bella) is mild; adjust to taste',
            '1/3 cup water — to dissolve the jaggery',
          ],
        },
        {
          group: 'For the finish',
          items: [
            '3 tbsp ghee — enough to make it glossy without making it heavy',
            '8–10 cashews and 1 tbsp raisins — fried in ghee',
            '1 tbsp dry coconut slivers — fried with the nuts, traditional in Karnataka',
            '1/2 tsp cardamom powder — freshly ground',
            'A tiny pinch of edible camphor or nutmeg — optional; a touch only',
          ],
        },
      ],
      mise: [
        'Wash the rice and dal together and drain well. Roast the dal separately in a dry pan for 2 minutes until fragrant.',
        'Dissolve the jaggery in 1/3 cup hot water, bring to a boil for one minute, then strain and keep warm.',
        'Fry the cashews, raisins and coconut slivers in 1 tablespoon of ghee until golden. Set aside.',
        'Grind the cardamom seeds and keep them ready.',
        'Prepare the banana leaf or serving plate, because sihi pongal is shaped and served as soon as it is ready.',
      ],
      method: [
        {
          title: 'Cook the rice and dal',
          text:
            'In the heavy vessel, combine the washed rice, roasted dal, water and milk. Bring to a boil on medium heat, then reduce to low, cover and cook for 25 minutes, stirring every 5–6 minutes, until the rice is very soft and the mixture is porridge-like.',
          why: 'Cooking the rice and dal together over low heat softens them evenly. Covering keeps the moisture in so the grains do not dry out.',
          cue: 'The grains are mushy under light pressure and the dal has blended into the rice.',
        },
        {
          title: 'Mash lightly',
          text:
            'Uncover and mash the mixture 6–8 times with the back of the ladle. The pongal should be soft with some whole grains left, not smooth.',
          why: 'A little mashing releases starch so the pongal holds its shape on the plate. Too much makes it pasty.',
          cue: 'The mixture holds together but still shows distinct soft grains.',
        },
        {
          title: 'Add the jaggery syrup',
          text:
            'Reduce the heat to the lowest setting and pour in the strained jaggery syrup slowly, stirring all the time. Cook for 6–8 minutes until the pongal thickens again and the jaggery smell changes from raw to a mellow caramel.',
          why: 'Jaggery added early would stop the rice softening, so it goes in only once the rice is soft. The extra cooking removes the raw taste.',
          cue: 'The colour deepens to golden brown and the pongal starts to leave the sides of the vessel.',
        },
        {
          title: 'Add ghee and aromatics',
          text:
            'Stir in 2 tablespoons of ghee, then the cardamom and the pinch of camphor or nutmeg, if using. Cook for 2 minutes, stirring, until the ghee is absorbed and the surface shines.',
          why: 'Ghee adds richness and gloss; cardamom and camphor add the top-note fragrance, which fades if cooked too long.',
          cue: 'A light sheen of ghee shows on the surface and the pot smells of cardamom.',
        },
        {
          title: 'Fold in the nuts and coconut',
          text:
            'Add the fried cashews, raisins and coconut slivers with their ghee, and fold gently so they stay whole. Switch off the heat.',
          why: 'Adding the garnish last keeps the nuts crunchy and the coconut toasted.',
          cue: 'Golden nuts and coconut slivers are visible in every spoonful.',
        },
        {
          title: 'Rest to firm up',
          text:
            'Cover the vessel and let it stand for 10 minutes. The pongal will firm slightly and become easier to shape. If it feels too stiff, stir in two spoons of hot milk.',
          why: 'The pongal continues to absorb liquid as it rests, and sihi pongal is meant to be a little firmer than the Tamil version.',
          cue: 'It holds a soft shape on the spoon and does not run.',
        },
        {
          title: 'Serve in a neat mound',
          text:
            'Spoon the pongal onto a banana leaf or plate, shape it into a mound, press a fried cashew on top and drizzle a little ghee. Serve at once next to khara pongal, with the offering made first.',
          why: 'Serving sihi and khara pongal together is the Sankranti custom, and a neat presentation suits the festival.',
          cue: 'The mound is glossy, holds its shape and has a golden cashew on top.',
        },
      ],
      offering:
        'Offered with khara pongal, ellu-bella, sugarcane and fruit to Surya and the household deity on Makara Sankranti, and as naivedya in temples such as Melkote.',
      ritual: [
        'On Sankranti morning, bathe, draw a rangoli at the door and prepare the puja space with a picture of Surya or the household deity.',
        'Cook both the khara and sihi pongal; offer them without tasting them first.',
        'Place portions on banana leaves in front of the deity, along with ellu-bella, sugarcane pieces, bananas and betel leaves, and offer with a short prayer.',
        'Show the camphor aarti and keep the naivedya in place for a few minutes before taking it as prasada.',
        'Exchange ellu-bella with neighbours using the greeting “Ellu bella thindu olle maathaadi”, and share the pongal with family and guests.',
      ],
      serving:
        'Serve warm on banana leaf or in a small bowl, with khara pongal and coconut chutney on the side. A portion of 1/2 cup of sihi pongal per person is customary.',
      storage:
        'Best eaten the same day. Keeps for a day at room temperature and 2 days in the refrigerator; reheat with a spoon of hot milk and a little ghee.',
      troubleshooting: [
        {
          problem: 'The pongal is too stiff.',
          fix: 'It was overcooked or has cooled. Stir in two to three spoons of hot milk over low heat until loosened.',
        },
        {
          problem: 'The pongal tastes plain or flat.',
          fix: 'Add a little more cardamom and a spoon of ghee, and check that the jaggery is enough; another spoon of syrup helps.',
        },
        {
          problem: 'There are white jaggery bits or sediment.',
          fix: 'The syrup was not strained. Next time strain through a fine sieve or cloth before adding.',
        },
        {
          problem: 'The rice is hard in the centre.',
          fix: 'It was not cooked enough before the jaggery went in. Add 1/2 cup hot water, cover and cook 10 minutes more.',
        },
      ],
      variations: [
        'Some Kannadiga homes add a few drops of rose water or a pinch of saffron for festival days.',
        'A coconut version adds 2 tablespoons of grated fresh coconut with the jaggery.',
        'Temples often cook the pongal in water only, without milk, for the daily naivedya.',
        'For a vrat version, replace the rice with samak rice or barnyard millet.',
        'Jaggery can be replaced by half sugar for a lighter colour.',
      ],
      tips: [
        'Keep the dal share small for the lighter Karnataka style.',
        'Serve sihi and khara pongal together; the contrast is part of the dish.',
        'Use camphor in a tiny pinch only, and only edible grade.',
      ],
      differs: 'Lighter, drier, mostly water-cooked; served beside khara pongal.',
    },
  ],
}

export default recipe
