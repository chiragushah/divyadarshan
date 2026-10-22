import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'puliyodarai',
  name: 'Puliyodarai',
  alsoCalled: 'Pulihora · Puliyogare · Tamarind rice · புளியோதரை',
  category: 'Rice & Grain',
  summary: 'Tangy tamarind rice — the classic Vaishnava temple prasadam of the South.',
  meaning:
    'Tamarind rice keeps well for a day without refrigeration, which made it the pilgrim’s food and the temple’s favourite prasadam. The idea is the same across the South — rice mixed with a cooked tamarind paste that is sharp, salty, a little sweet and fragrant with roasted spices — but each state treats it differently. Tamil Nadu’s puliyodarai is dark, rich with sesame oil and built on a freshly ground spice powder. Andhra’s pulihora is brighter and yellower, hot with green chillies and ginger, with no ground masala at all. Karnataka’s puliyogare leans on a coconut-and-sesame powder and is gently sweet. All three are offered to Vishnu, Venkateswara or Perumal and handed out in leaf cups; none uses onion or garlic.',
  variants: [
    {
      id: 'tamil-nadu',
      region: 'Tamil Nadu',
      culture: 'Sri Vaishnava temples — Srirangam, Alagar Koil, Vaikuntha Ekadashi',
      title: 'Puliyodarai (Puliyogarai)',
      intro:
        'Cooked in sesame (gingelly) oil with a fresh-roasted spice powder of coriander seed, chana dal, red chilli, sesame and fenugreek. The cooked tamarind paste (pulikachal) keeps for weeks, so temples and homes make it in bulk and mix it with rice as needed.',
      story:
        'Puliyodarai is one of the oldest and best-loved prasadams of the Sri Vaishnava temples of Tamil Nadu. The word is Tamil: puli means tamarind and odarai (from sadam, rice) means mixed rice. At temples such as Srirangam and Alagar Koil it is cooked in huge vessels in the madapalli (temple kitchen) by trained cooks and offered to Perumal at the midday service, after which it is packed in donnai — small cups stitched from dried leaves — and handed to devotees.\n\nThe dish is built in two parts. The first is a dry spice powder made by roasting coriander seed, dals, red chillies, sesame and fenugreek until they smell nutty, then grinding. The second is the pulikachal, a thick paste in which tamarind is cooked in sesame oil with tempered dals, peanuts and the spice powder until the oil floats on top. Because the oil and tamarind preserve it, the paste lasts weeks, and pilgrims used to carry it on long walks. Rice is mixed with it only when needed, and then rested so the flavour sinks in.\n\nCompared with Andhra’s pulihora, which is bright and hot with fresh green chilli, the Tamil version is darker, deeper and more aromatic, with a clear sesame-oil fragrance. Compared with Karnataka’s puliyogare it uses no coconut. It is a favourite on Vaikuntha Ekadashi, Purattasi Saturdays and every important Perumal utsavam.',
      serves: '4–5 servings (about 2 cups cooked rice plus extra pulikachal to store)',
      prep: '20 min',
      cook: '35 min',
      equipment: [
        'Heavy-bottomed kadai or iron pan — a thick base keeps the tamarind from catching and burning while it reduces for a long time',
        'Small dry pan — for roasting the spices for the powder one by one, over a gentle flame',
        'Spice grinder or mortar and pestle — a coarse, not floury, powder gives the right texture',
        'Wide plate or tray (thattu) — rice is spread out and cooled here so the grains do not clump when mixed',
        'Wooden or steel ladle — to stir the paste; do not use a plastic spoon in hot oil',
      ],
      ingredients: [
        {
          group: 'Spice powder (puliyodarai podi)',
          items: [
            '2 tbsp coriander seeds — gives body and a citrusy sweetness; roast until a shade darker',
            '1 tbsp chana dal — adds nuttiness and helps thicken the powder; it should turn light gold',
            '1 tsp urad dal — gives a slightly creamy bite and a toasted aroma',
            '6–8 dry red chillies — Byadgi or Guntur; use fewer for mild, since tamarind sharpens heat',
            '1 tsp white sesame seeds — adds oil and a nutty finish; roast until they just pop',
            '1/2 tsp fenugreek seeds — a small amount only; more makes the paste bitter',
            '1/2 tsp black peppercorns — adds a back-of-the-throat warmth that is typical of temple versions',
            'A pea-sized piece of compounded hing (asafoetida) — optional; many Vaishnava households omit it, so leave it out if your family does',
          ],
        },
        {
          group: 'Pulikachal and rice',
          items: [
            'Lemon-sized ball of tamarind (about 50 g) — choose seedless, pliable, dark brown tamarind that is not too dry or fibrous',
            '1/4 cup (60 ml) gingelly (sesame) oil — the oil is the soul of the dish; cold-pressed (nallennai) gives the authentic aroma',
            '1 tsp mustard seeds — they should pop fully, which tells you the oil is hot enough',
            '2 tbsp chana dal and 1 tbsp urad dal — fry until golden; they stay crunchy in the finished rice',
            '2 tbsp peanuts — raw, skin-on or skinned; they add a roasted crunch',
            '3 dry red chillies, 15 curry leaves — curry leaves should be fresh and dry of water or they spit in the oil',
            '1/2 tsp turmeric, 1/4 tsp hing — turmeric gives colour and protects the paste; skip the hing if your family does',
            '1 tbsp jaggery, salt — jaggery rounds off the sourness; salt to taste, remembering the rice will need some too',
            '2 cups cooked rice, cooled and spread out — about 3/4 cup raw sona masuri or ponni rice, cooked until each grain is separate',
          ],
        },
      ],
      mise: [
        'Cook the rice ahead: wash 3/4 cup raw rice, cook with 1 1/2 cups water (about 1:2 by volume) until each grain is soft but separate, then spread on a plate to cool. Cooling lets steam escape so the grains stay dry.',
        'Soak the tamarind in 1 cup of warm water for 15–20 minutes, squeeze and strain it to get thick pulp. Throw away the fibres and seeds.',
        'Measure everything for the tempering into small bowls: mustard, dals, peanuts, chillies and curry leaves, so you can add them quickly when the oil is hot.',
        'Set a clean, dry plate and a spoon aside for mixing, and keep an extra 1 tbsp sesame oil handy for coating the rice.',
      ],
      method: [
        {
          title: 'Roast the spices for the powder',
          text: 'In a dry pan on a low flame, roast the coriander seeds for about 2 minutes, then remove. In the same pan roast the chana dal and urad dal for 2 minutes until light golden, then the red chillies for 30 seconds, then sesame, fenugreek and peppercorns for 30 seconds each. Keep stirring so nothing darkens unevenly.',
          why: 'Each spice roasts at a different speed, so doing them one by one gives every ingredient its best flavour. Rushing on a high flame burns the fenugreek and sesame, which turns the whole powder bitter.',
          cue: 'The room smells nutty and toasty, the dals are light gold and the sesame has just started to pop.',
        },
        {
          title: 'Grind to a coarse powder',
          text: 'Let the roasted spices cool for 10 minutes, then grind them with the hing (if using) in short pulses to a coarse, sand-like powder. Do not grind to a fine flour. Store the powder in a dry jar; you will use about 3 tablespoons now.',
          why: 'Grinding hot spices releases steam and makes the powder clump and go stale quickly. A coarse grind also gives the finished rice a pleasant texture and keeps the powder from burning in the paste.',
          cue: 'The powder looks like coarse brown sand, with tiny specks of sesame and chilli, and smells strongly of toasted coriander.',
        },
        {
          title: 'Extract the tamarind pulp',
          text: 'Squeeze the soaked tamarind with your fingers in the warm water, then strain it through a sieve, pressing out every bit of pulp. You should have about 1/2 cup of thick, dark juice. Discard fibre and seeds.',
          why: 'Thick pulp reduces quickly and evenly. If the juice is thin, you must boil it for much longer, which risks overcooking the tamarind until it turns harsh and bitter.',
          cue: 'The pulp falls from a spoon in a slow, thick ribbon, the colour of strong coffee.',
        },
        {
          title: 'Temper the oil',
          text: 'Heat the sesame oil in a heavy kadai over medium heat for about a minute. Add the mustard seeds and let them splutter fully, then add the chana dal, urad dal and peanuts and fry for 2 minutes, stirring, until golden. Add the red chillies and curry leaves and fry for 20 seconds. Tempering (tadka) means frying whole spices in hot oil to release their flavour.',
          why: 'The dals and peanuts need time in oil to turn crisp, and they must be added after the mustard has popped. If the oil is not hot enough, the mustard stays bitter and the dals stay raw and chewy.',
          cue: 'The mustard has stopped popping, the dals are golden brown and the peanuts have a slight blush; the curry leaves are crisp and translucent.',
        },
        {
          title: 'Add turmeric, hing and tamarind',
          text: 'Lower the flame, add the turmeric and hing, and stir for 5 seconds. Immediately pour in the tamarind pulp — stand back as it sputters — then add the jaggery and salt. Bring to a gentle simmer.',
          why: 'Turmeric and hing burn in seconds in hot oil, so the tamarind goes in right after to cool the pan. Adding jaggery now balances the sourness before it concentrates.',
          cue: 'The mixture boils with large slow bubbles and smells sharply sour at first, then mellows as it simmers.',
        },
        {
          title: 'Cook the pulikachal until the oil separates',
          text: 'Cook on medium-low heat for 12–15 minutes, stirring every minute or two and scraping the base. The tamarind will thicken to a glossy paste and the oil will slowly rise to the surface and pool at the edges. Do not hurry this step.',
          why: 'Cooking out the water is what preserves the paste and mellows the raw sourness of the tamarind. When the oil separates, the water is gone; stopping earlier gives a paste that spoils quickly and tastes sharp.',
          cue: 'A spoon drawn across the pan leaves a clear trail, the paste pulls away from the sides, and shiny oil sits on top.',
        },
        {
          title: 'Stir in the spice powder',
          text: 'Add 3 tablespoons of the freshly ground powder and cook for 2 more minutes on low heat, stirring constantly. Taste: it should be sharply sour, spicy and a little salty, slightly stronger than you want the final rice to taste. Remove from the heat. This is the finished pulikachal.',
          why: 'The powder needs a short cook to lose its raw edge but not so long that its aroma disappears. The paste is deliberately strong, since it will be diluted by plain rice.',
          cue: 'The paste smells of roasted coriander and sesame, and the tangy sharpness has rounded into something deeper and warmer.',
        },
        {
          title: 'Mix with the rice',
          text: 'Spread the cooled rice on a wide plate and drizzle 1 tablespoon of sesame oil over it. Add 4–5 tablespoons of pulikachal and fold gently with a spoon or your fingertips, lifting rather than mashing, until every grain is coated. Taste and add more paste or salt if needed.',
          why: 'Coating the rice with oil first prevents the grains from sticking together and lets the paste spread evenly. Mashing breaks the grains and turns the rice mushy.',
          cue: 'Every grain is evenly brown and glossy, with no white patches, and the dals and peanuts are scattered through the rice.',
        },
        {
          title: 'Rest before serving',
          text: 'Cover the rice and leave it for 30 minutes to an hour at room temperature before offering or serving. Taste again and add a spoon more pulikachal or a drop of oil if the rice has soaked everything up.',
          why: 'Resting lets the tamarind, oil and spices soak into the grains. Freshly mixed puliyodarai tastes sharp and flat; rested puliyodarai tastes rounded and complete, which is why temple puliyodarai is always made ahead.',
          cue: 'The colour deepens slightly, the grains look glossy but not wet, and the aroma of sesame oil and tamarind is much stronger.',
        },
      ],
      offering:
        'Offered to Perumal at the ucha-kala (noon) pooja; distributed in donnai (leaf cups) to devotees.',
      ritual: [
        'After the rice has rested, place it in a clean brass, bronze or leaf-lined vessel reserved for the deity, and add a little ghee on top to make it shiny.',
        'Offer it at the midday pooja, on a banana leaf or a plate before the deity, along with plain rice, ghee, fruit and a small cup of water. The vessel is placed on the floor or an altar, never directly on a bare floor.',
        'Chant the Vishnu Sahasranamam or the naivedyam verse ("Brahmaarpanam…") while a lamp is shown; the curtain may be closed for a minute while the Lord is believed to partake.',
        'Draw a little of the offering aside as teertham-prasadam and place a tulsi leaf over it. Offerings are not tasted before the deity has been served.',
        'Distribute to devotees in donnai or on banana leaves, with the right hand cupped and the left supporting the wrist. Everyone present, regardless of status, receives an equal portion.',
      ],
      serving:
        'Serve at room temperature on a banana leaf or in a leaf cup, with a pinch of crisped urad appalam or a little curd rice on the side. A small spoon of plain curd (thayir) balances the tangy flavour. For a full Vaishnava meal, pair it with sweet pongal, vadai and a coconut chutney.',
      storage:
        'The pulikachal keeps for 3–4 weeks in a clean, dry glass jar in the fridge, covered with a thin film of sesame oil. Mixed rice keeps 24 hours at room temperature in a closed container and is best eaten the same day; do not refrigerate it for long, as the rice hardens.',
      troubleshooting: [
        {
          problem: 'The rice tastes too sour',
          fix: 'Add another tablespoon of jaggery to the paste, or mix in a little more plain rice. Too much tamarind or too little cooking leaves the paste sharp. A teaspoon of sesame oil on the rice also mellows it.',
        },
        {
          problem: 'The paste tastes bitter or burnt',
          fix: 'Fenugreek, sesame or tamarind has been overcooked. It cannot be fully rescued, but adding jaggery and a splash of fresh tamarind water and cooking briefly can soften it. Next time, roast on lower heat and cook the paste only until the oil rises.',
        },
        {
          problem: 'The rice is mushy and sticky',
          fix: 'The rice was overcooked, was mixed while hot, or was stirred too much. Cook rice with a 1:2 ratio, spread it out to cool, and fold gently with a spoon or fingertips.',
        },
        {
          problem: 'The paste has gone mouldy or sour in storage',
          fix: 'It was not cooked until the oil separated or the jar was damp. Always cook out the water completely and use a dry spoon every time you take some out.',
        },
      ],
      variations: [
        'Some households add a teaspoon of grated jaggery and a pinch of crushed pepper at the end for a sweeter, sharper finish; others leave out sugar entirely.',
        'Replace sona masuri with seeraga samba or ponni boiled rice if your family prefers firmer grains; avoid basmati, which is too long and dry.',
        'For a sattvic temple-style version, omit hing and use only ghee and sesame oil in the tempering; many Vaishnava homes do this on Ekadashi and Saturdays.',
        'Vegan: the dish is already vegan, as long as the optional ghee on top is replaced with a drop more sesame oil.',
        'Jain-friendly: omit hing if it is not permitted in your household, and use fresh tamarind without any preservatives.',
      ],
      tips: [
        'Use gingelly oil; it gives the unmistakable temple aroma. Refined oil gives a flat result.',
        'Make the paste a day before you need the rice; the flavours mature and the rice takes less work.',
        'Always taste the finished rice after resting, not before; salt and sourness seem sharper at first.',
        'Do not add water to the paste at any point; moisture ruins its keeping quality.',
      ],
      differs: 'Dark, spice-powder-based, sesame-oil rich.',
    },
    {
      id: 'andhra-pulihora',
      region: 'Andhra Pradesh & Telangana',
      culture: 'Telugu households and temples — Ugadi, Sankranti, Venkateswara',
      title: 'Pulihora',
      intro:
        'Brighter and fresher than its Tamil cousin: turmeric-yellow rice with green chillies, ginger and peanuts, and a tamarind-jaggery paste. There is no ground spice powder; the flavour comes from fresh chilli, ginger, curry leaves and well-browned dals.',
      story:
        'Pulihora is the signature festive rice of the Telugu country and is eaten on almost every auspicious occasion — Ugadi, Sankranti, Varalakshmi Vratam, house-warmings and Venkateswara festivals. The word means "sour rice" (puli is sour, hora is a form of annam, rice). It is also offered at temples as a naivedyam to Vishnu, Venkateswara and the village goddesses, and it is a close relative of the Tirumala temple’s tamarind rice, though each kitchen has its own balance.\n\nWhat sets Andhra pulihora apart is its fresh heat. Slit green chillies are fried in oil until blistered, ginger is added in a fine mince, and turmeric gives the rice a bright yellow colour. The tamarind paste (called pulihora gojju) is cooked just until thick, without any ground masala, and is often made slightly sweeter by a small piece of jaggery. Many Telugu cooks also add a spoon of roasted peanut powder or a little fresh coconut on top for texture.\n\nIn Telangana the same dish is made a little drier and spicier, often with a pinch of red chilli powder. Compared with the Tamil puliyodarai, which is dark and deeply spiced, this one is lighter, more golden and less oily, and gets its flavour from fresh ingredients.',
      serves: '4–5 servings',
      prep: '15 min',
      cook: '25 min',
      equipment: [
        'Wide kadai or heavy pan — enough room to stir the paste and then fold in the rice if you wish to mix it in the same pan',
        'Large plate or tray — rice is cooled and spread out here so that grains stay separate',
        'Sieve — for straining the tamarind pulp cleanly',
        'Mortar and pestle (optional) — for lightly crushing ginger and green chillies, which releases more flavour than chopping alone',
      ],
      ingredients: [
        {
          items: [
            '2 cups cooked rice (from 3/4 cup raw), cooled — use sona masuri or any medium-grain rice cooked with 1:2 water; avoid basmati',
            'Lemon-sized ball of tamarind, extracted to about 1/2 cup thick pulp — soak it in warm water for 15 minutes and squeeze it through a sieve',
            '1/4 cup (60 ml) sesame or groundnut oil — sesame is traditional and gives the best fragrance',
            '1 tsp mustard seeds, 1 tsp cumin seeds — mustard for sharpness and cumin for digestive warmth; both must splutter before moving on',
            '2 tbsp chana dal, 1 tbsp urad dal, 2 tbsp peanuts — these give the rice its crunch; fry them until a deep golden colour',
            '4 green chillies, slit; 2 dry red chillies — green for sharp fresh heat and red for colour and smoky depth; adjust to your tolerance',
            '1 tsp finely grated or minced ginger — adds a clean pungency that cuts through the sourness',
            '15 curry leaves — fresh leaves give far more aroma than dried',
            '1/2 tsp turmeric, a pinch of hing — turmeric colours the rice yellow; hing is omitted in some temple and Brahmin kitchens',
            '1 tsp jaggery, salt to taste — a little sweetness balances the tamarind; salt should be slightly strong in the paste',
          ],
        },
      ],
      mise: [
        'Cook the rice with 1:2 rice to water, then spread it on a tray and let it cool for at least 20 minutes so it dries on the surface.',
        'Soak and strain the tamarind to get 1/2 cup thick pulp, and keep it by the stove.',
        'Slit the green chillies lengthwise and mince the ginger. Have curry leaves dry and ready — wet leaves spit hot oil.',
        'Measure all the tempering ingredients into small bowls. Once the oil is hot there is no time to hunt for anything.',
      ],
      method: [
        {
          title: 'Heat the oil and pop the mustard',
          text: 'Heat the oil in a wide kadai over medium heat for about a minute. Add the mustard and cumin together and wait until the mustard seeds crackle and jump. This usually takes 20–30 seconds; lower the heat if they start to burn.',
          why: 'Mustard seeds that do not pop remain bitter and raw. Popping tells you the oil is at the right temperature to extract flavour from every ingredient that follows.',
          cue: 'The seeds pop and fly, the cumin darkens slightly, and the oil smells sharp and nutty.',
        },
        {
          title: 'Fry the dals and peanuts',
          text: 'Add the chana dal, urad dal and peanuts. Stir constantly for 2–3 minutes on medium-low heat until all three are golden. The dals will turn from white to light brown, and the peanuts will blister slightly. Keep stirring so nothing sticks.',
          why: 'Dals must cook in oil long enough to become crisp. If they are under-fried they stay hard and chalky in the finished rice; if over-fried they taste bitter.',
          cue: 'The dals are the colour of toasted bread, you hear a light crackle, and a roasted aroma fills the kitchen.',
        },
        {
          title: 'Add chillies, ginger and curry leaves',
          text: 'Drop in the slit green chillies, red chillies, ginger and curry leaves. Fry for 30–45 seconds, stirring, until the chillies blister and the leaves become crisp and translucent. Be careful: curry leaves can splutter.',
          why: 'Frying fresh chillies and ginger in hot oil mellows their raw taste and infuses the oil with heat. Skipping this means the rice will taste raw and harsh.',
          cue: 'The green chillies change to a darker, blistered green, and the curry leaves rustle and curl when stirred.',
        },
        {
          title: 'Add turmeric and hing',
          text: 'Lower the flame. Add the turmeric and hing and stir for just 5 seconds, then immediately pour in the tamarind pulp. Stand back, as it will splutter and release steam.',
          why: 'Turmeric and hing burn in seconds in hot oil and turn bitter. Following them at once with liquid stops the burning and protects flavour.',
          cue: 'The oil turns a bright yellow-orange, and the mixture boils the moment the tamarind touches it.',
        },
        {
          title: 'Cook the tamarind paste',
          text: 'Add the jaggery and salt and stir. Simmer on medium-low heat for 8–10 minutes, stirring every minute and scraping the base, until the mixture reduces by about half, thickens and oil starts to appear at the edges.',
          why: 'Cooking drives off water and removes the raw edge of tamarind. A paste that is too watery makes the rice soggy and spoils quickly.',
          cue: 'The paste coats the back of a spoon, looks glossy and dark, and the oil pools at the edges.',
        },
        {
          title: 'Cool the paste slightly',
          text: 'Switch off the heat and let the paste rest for 5 minutes. While it rests, taste it: it should be strong, sour-spicy and salty, because it will be diluted by the rice. Adjust salt or jaggery now.',
          why: 'Very hot paste poured onto rice steams and softens the grains. A brief rest lets it come off the boil while remaining pourable.',
          cue: 'The paste stops bubbling and looks thick but still flows slowly from a spoon.',
        },
        {
          title: 'Fold the paste into the rice',
          text: 'Spread the cooled rice on a wide plate. Pour about three-quarters of the paste over it and fold gently with a spoon, lifting from the bottom and turning, until the rice is evenly coloured. Add the remaining paste a spoon at a time to taste.',
          why: 'Gentle folding keeps each grain whole. Stirring or pressing breaks the rice and makes a sticky mass. Adding paste gradually lets you control the final sourness.',
          cue: 'The rice is an even golden-yellow, each grain is separate, and the dals and peanuts show through.',
        },
        {
          title: 'Rest before serving',
          text: 'Cover the pulihora with a lid or plate and leave it for 20–30 minutes at room temperature. Before serving, fluff gently and taste again; add a pinch of salt if needed or a few drops of fresh sesame oil for gloss.',
          why: 'Resting allows the tamarind and spices to seep into the rice. The flavour after half an hour is noticeably rounder and less sharp.',
          cue: 'The rice is slightly moist but not wet, and tastes balanced: sour, spicy, salty and a hint of sweet.',
        },
      ],
      offering: 'Offered at Ugadi, Sankranti and Venkateswara festivals, along with bobbatlu and payasam.',
      ritual: [
        'Prepare the pulihora after a bath, in a clean kitchen, using utensils reserved for puja. Do not taste it before it is offered.',
        'Place a portion in a silver, brass or steel bowl, or on a fresh banana leaf, and set it in front of the deity along with a cup of water and a small spoon of ghee.',
        'Sprinkle a little water around the plate in a circle (the naivedyam parishechana) and chant the naivedyam mantra or simply say, "Sri Venkateswara Swamy naivedyam samarpayami."',
        'Offer incense and a lamp, ring a small bell, and keep the food before the deity for a few minutes while closing your eyes in prayer.',
        'Distribute as prasadam on leaves or in cups. In temples, devotees receive it in the right hand; at home, the youngest and eldest are served first.',
      ],
      serving:
        'Serve warm or at room temperature on a banana leaf, with a spoon of plain curd, a few papad or vadiyalu (rice fritters), and a sweet such as bobbatlu or payasam. In Telugu festive meals, pulihora is typically one item among many on the leaf, not the whole meal.',
      storage:
        'Keep covered at room temperature for up to 8 hours or refrigerate for a day. Reheat with a sprinkle of water and a drop of oil. The unmixed tamarind paste keeps 2–3 weeks in the fridge in a clean, dry jar.',
      troubleshooting: [
        {
          problem: 'The rice sticks together in clumps',
          fix: 'The rice was too wet when cooked, or was mixed while hot. Cook with 1:2 water, spread it out to cool, and fold the paste in gently with a fork.',
        },
        {
          problem: 'It tastes flat',
          fix: 'The rice needs more salt, or the paste was not cooked long enough to concentrate. Add salt and a teaspoon of paste, or squeeze in a few drops of lemon.',
        },
        {
          problem: 'The colour is pale, not golden-yellow',
          fix: 'Turmeric was too little or was added too early and burnt. Add 1/4 tsp more turmeric to the paste next time, and add it only when the oil is moderate.',
        },
        {
          problem: 'The dals and peanuts are soft',
          fix: 'They were under-fried or the rice was very wet. Fry them to a deeper golden colour, and add them to the rice just before serving if you will keep it for hours.',
        },
      ],
      variations: [
        'Telangana households often add a pinch of red chilli powder and a spoon of roasted sesame powder for a drier, spicier version.',
        'Some cooks add grated raw mango in season (maamidikaya pulihora) instead of tamarind, for a fresh, sharper taste.',
        'For a milder temple-style version, leave out the red chillies and use only two green chillies, deseeded.',
        'Vegan: it is already vegan; use oil in place of the optional ghee at the end.',
        'Fasting-friendly: omit the dals and peanuts if you are observing a strict fast; many households avoid cereals on Ekadashi anyway.',
      ],
      tips: [
        'Add the paste to cooled rice. Hot rice turns mushy.',
        'Use a sour tamarind with a firm dark colour; pale, soft tamarind is weaker and needs more.',
        'Fry the chillies properly: raw green chilli is the common reason pulihora tastes "grassy".',
        'A teaspoon of fresh sesame oil on top before serving revives the aroma after resting.',
      ],
      differs: 'Fresh green chilli and ginger; no ground masala.',
    },
    {
      id: 'karnataka-puliyogare',
      region: 'Karnataka',
      culture: 'Kannada households and Melkote Cheluvanarayana temple',
      title: 'Puliyogare',
      intro:
        'Karnataka’s puliyogare is made with a gojju (paste) and a coconut-sesame powder (puliyogare pudi). It is nutty, mildly sweet and less oily than the Tamil version, and is the standard prasadam at many Vaishnava temples across the state.',
      story:
        'In Karnataka the tamarind rice is called puliyogare (also huliyogare in colloquial Kannada), and it is as closely tied to temples as it is in Tamil Nadu. Melkote’s Cheluvanarayana Swamy temple is famous for it, and the dish is served as a naivedyam at Vaishnava temples and at festivals such as Vaikuntha Ekadashi, Rama Navami and Gokulashtami. Visitors often buy jars of ready-made puliyogare gojju as a souvenir.\n\nThe Kannada cook’s signature is the powder. Where the Tamil version roasts coriander, dals and chillies, the Karnataka version adds dry coconut and a little more sesame, so the powder is sweeter and creamier. The gojju is cooked in oil with mustard, peanuts and curry leaves, simmered with tamarind and a spoon of jaggery, and finished with the powder. It is usually stored and used as a base for many dishes, including puliyogare, gojju-avalakki (poha) and even mixed with curd rice.\n\nCompared with Andhra pulihora it is less fiery and not yellow, and compared with the Tamil version it is lighter, with a subtle coconut flavour. Many Kannada households make a large batch of gojju before festivals and mix rice as needed, which makes it ideal for offering and feeding many people.',
      serves: '4–5 servings',
      prep: '20 min',
      cook: '30 min',
      equipment: [
        'Heavy kadai — a thick base prevents the tamarind from scorching',
        'Dry roasting pan — to roast spices for the powder over low heat',
        'Spice grinder — for the coconut-sesame powder; a dry jar of a mixer-grinder works well',
        'Wide plate — for cooling rice and mixing gently',
      ],
      ingredients: [
        {
          group: 'Powder',
          items: [
            '2 tbsp coriander seeds — roast until fragrant and a shade darker',
            '1 tbsp chana dal, 1 tbsp urad dal — roast until golden; they thicken and flavour the powder',
            '1 tbsp white sesame — roast briefly, since it burns fast',
            '3 tbsp dry coconut (kopra), grated — gives a gentle sweetness and a creamy texture; roast until pale gold',
            '6 dry red chillies — Byadgi is traditional for its colour with moderate heat',
            '1/2 tsp fenugreek seeds — only a small pinch; too much turns the gojju bitter',
          ],
        },
        {
          group: 'Gojju and rice',
          items: [
            '50 g tamarind, extracted into thick paste — soak in warm water 15 minutes, squeeze and strain',
            '3 tbsp oil — groundnut or sesame; sesame gives more aroma',
            '1 tsp mustard, 2 tbsp peanuts, 1 tbsp chana dal — for the tempering; fry until crunchy',
            '15 curry leaves, 1/2 tsp turmeric — add curry leaves dry; turmeric colours the gojju',
            '1 tbsp jaggery, salt — jaggery is characteristic of Karnataka’s version and balances the sourness',
            '2 cups cooked rice — about 3/4 cup raw, cooked 1:2 and cooled completely',
          ],
        },
      ],
      mise: [
        'Cook the rice ahead and spread it on a plate to cool; it should be dry and separate.',
        'Soak the tamarind in warm water, extract thick pulp and keep it ready by the stove.',
        'Grate the dry coconut (kopra) and measure each spice into its own bowl before you start roasting.',
        'Wash and thoroughly dry the curry leaves, or they will splutter in hot oil.',
      ],
      method: [
        {
          title: 'Roast the powder spices',
          text: 'In a dry pan on low heat, roast the coriander for 2 minutes, then the chana dal and urad dal for 2 minutes until golden, then the red chillies and fenugreek for 30 seconds, and finally the sesame and dry coconut for about a minute each. Stir all the time.',
          why: 'Each ingredient has a different toasting time. Doing them one by one avoids burnt sesame and under-roasted dal, either of which would taint the whole batch of powder.',
          cue: 'The coconut turns pale gold, the dals are golden, and the room smells like toasted nuts and coriander.',
        },
        {
          title: 'Grind the puliyogare powder',
          text: 'Let the roasted mixture cool completely for 10–15 minutes, then grind it in a dry grinder to a fine, slightly coarse powder. Do not let it become a paste; stop grinding when it looks like fine sand.',
          why: 'Warm coconut releases oil and turns the powder into a clumpy paste. Cooling and short pulses keep it dry, aromatic and storable.',
          cue: 'The powder is light brown, dry and free-flowing, with a nutty, sweet-spicy aroma.',
        },
        {
          title: 'Temper the oil',
          text: 'Heat the oil in a heavy kadai on medium heat. Add the mustard and let it splutter, then the peanuts and chana dal and fry for 2 minutes until golden. Add the curry leaves and fry for 20 seconds until crisp.',
          why: 'Tempering extracts flavour from the seeds and gives the dals their crunch. Frying peanuts and dal to golden ensures they stay crunchy even after being mixed with wet tamarind.',
          cue: 'The peanuts are lightly browned, the mustard has stopped popping, and the leaves are crisp.',
        },
        {
          title: 'Add turmeric and tamarind',
          text: 'Lower the heat to the minimum, add the turmeric and stir for just five seconds, and immediately pour in the tamarind paste, standing back from the splutter. Add the jaggery and salt, stir well, and bring the mixture to a gentle, steady boil.',
          why: 'Turmeric burns quickly in dry hot oil, so it is followed at once by the liquid. Jaggery now dissolves into the tamarind and removes the sharpest sourness.',
          cue: 'The mixture bubbles steadily and the sour smell becomes slightly sweeter.',
        },
        {
          title: 'Cook the gojju until thick',
          text: 'Simmer on medium-low heat for 10–12 minutes, stirring every minute, until the gojju thickens, darkens and the oil rises to the surface. Scrape the base regularly so it does not catch.',
          why: 'Cooking out moisture gives a gojju that stores well and clings to rice. If it is watery, the rice becomes soggy and the flavour is diluted.',
          cue: 'The paste forms a thick mass that pulls away from the sides, with a shiny layer of oil around it.',
        },
        {
          title: 'Stir in the powder',
          text: 'Add 3–4 tablespoons of the puliyogare powder to the gojju and stir well. Cook for 3 minutes on low heat. The mixture will thicken further and smell strongly of roasted coconut and spices.',
          why: 'The powder needs a brief cook to meld with the tamarind. Too long and the coconut goes dark; too short and it tastes raw and dusty.',
          cue: 'The gojju turns a deeper brown, becomes thick and almost dry in the pan, and smells sweet and nutty.',
        },
        {
          title: 'Mix the rice',
          text: 'Spread the cooled rice on a wide plate. Add 4–5 tablespoons of gojju, along with a teaspoon of oil, and toss gently with a spoon until the rice is evenly coloured. Taste and add more gojju or salt.',
          why: 'Gentle tossing keeps the rice grains whole. More gojju can always be added, but too much cannot be taken out.',
          cue: 'The rice is an even dark brown with no white patches, glossy but not oily.',
        },
        {
          title: 'Rest and serve',
          text: 'Cover the puliyogare with a lid or plate and rest it at room temperature for at least 30 minutes, ideally an hour, so the grains slowly absorb the flavours. Fluff lightly with a fork before offering and taste once more for salt.',
          why: 'Like all tamarind rice, puliyogare improves after resting; it tastes sharper and rawer if served right away.',
          cue: 'The sourness softens, the sweetness and coconut come forward, and the rice looks glossy.',
        },
      ],
      offering: 'Offered at Melkote and other Karnataka Vaishnava temples.',
      ritual: [
        'Prepare the puliyogare after bathing, using vessels set aside for naivedyam. Do not taste while cooking.',
        'Place a portion on a banana leaf or in a clean bronze or steel plate, with a spoon of ghee, and set it before the deity along with water in a small cup.',
        'Sprinkle water around the plate and say the naivedyam mantra, or simply "Sri Cheluvanarayana naivedyam samarpayami".',
        'Show incense and lamp, ring the bell and wait a few minutes for the offering to be accepted before removing the plate.',
        'Distribute as prasadam on leaf plates; at Melkote and similar temples the prasadam is given in the cupped right palm or on a small leaf.',
      ],
      serving:
        'Serve warm or at room temperature on a banana leaf with curd rice, a pinch of salt-and-pepper fried papad, and a spoon of sweet payasam. In Karnataka it is often paired with a simple cucumber kosambari.',
      storage:
        'The gojju keeps for up to 3 weeks in a clean, dry jar in the fridge, and the powder for 2–3 months in an airtight jar. Mixed rice is best eaten within 24 hours and should be stored in a closed container at cool room temperature.',
      troubleshooting: [
        {
          problem: 'The gojju is too sour',
          fix: 'Add a little more jaggery and simmer for 3 minutes. A spoonful of freshly roasted powder also softens the sourness.',
        },
        {
          problem: 'The powder has become oily and lumpy',
          fix: 'The coconut was ground while warm or ground too long. Cool completely and use short pulses; if already lumpy, dry roast it again briefly and re-grind.',
        },
        {
          problem: 'The rice tastes bitter',
          fix: 'Fenugreek or sesame was burnt. Use less fenugreek (a scant 1/2 tsp) and roast on low heat. Add a little jaggery to correct a mild bitterness.',
        },
        {
          problem: 'The rice feels dry',
          fix: 'The rice absorbed all the gojju. Add a teaspoon of warm oil and a spoon more gojju and toss gently.',
        },
      ],
      variations: [
        'Add a spoon of grated fresh coconut on top for a juicier version, common in coastal Karnataka.',
        'Replace peanuts with cashews for festival days.',
        'Some temple kitchens omit the dry coconut and add more sesame for a stricter sattvic powder.',
        'Vegan: naturally vegan; replace ghee-topping with oil.',
        'Jain-friendly: omit hing and use fresh, unprocessed tamarind and jaggery that is free of additives.',
      ],
      tips: [
        'The gojju keeps for weeks, so make a double batch for festival season.',
        'Cool coconut powder completely before grinding to avoid lumps.',
        'Mix the rice a little saltier than you think, as resting mellows the flavour.',
        'Use fresh curry leaves; they are what make the aroma.',
      ],
      differs: 'Coconut-sesame powder; slightly sweeter.',
    },
  ],
}

export default recipe
