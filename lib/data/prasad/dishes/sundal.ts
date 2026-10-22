import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'sundal',
  name: 'Sundal',
  alsoCalled: 'Guggillu · Sundal · சுண்டல் · గుగ్గిళ్ళు',
  category: 'Savoury',
  summary: 'Boiled, lightly tempered pulses — the evening prasad of Navaratri Golu in Tamil Nadu and Guggillu in Andhra.',
  meaning:
    'Sundal is the simplest and most democratic prasad of South India: a pulse — chickpeas, black-eyed peas, green gram, peanuts — soaked, boiled until just tender, and tossed with a tempering of mustard, curry leaf and coconut. During Navaratri, women invite neighbours to see the golu (the steps of dolls) and send them home with a small leaf-cup of sundal, a different one every evening. The Andhra version, guggillu, is made on the same days and for Ganesh Chaturthi, Vinayaka Chavithi and Dasara, with a slightly different seasoning. The dish is cheap, protein-rich and entirely sattvic, so it is made for every deity.',
  variants: [
    {
      id: 'tamil-nadu',
      region: 'Tamil Nadu',
      culture: 'Tamil households — Navaratri Golu, Vinayaka Chaturthi, Vaikunta Ekadashi',
      title: 'Kondakadalai Sundal (and the nine-day Golu menu)',
      intro:
        'Brown chickpeas (kondakadalai) soaked overnight, boiled until tender and tossed with a tempering of mustard, urad dal, dry red chilli, curry leaf, hing and fresh coconut. It is the best-known sundal and the base for the nine different pulses of Navaratri.',
      story:
        'Navaratri in Tamil Nadu is the season of golu, the display of dolls arranged on odd-numbered steps in the living room. Every evening women visit one another’s homes, sing, and are given thamboolam — betel leaves, fruit, a small gift, and a leaf cup of sundal. The dish has become so identified with this festival that the question "what is today’s sundal?" is part of the nine-night ritual.\n\nTraditionally a different pulse is made each day, so that all nine are offered in turn, and the exchange of cups becomes a gentle way of sharing protein and nutrition during a fasting season. Chickpeas are the most common and the default, but the cycle includes white chickpeas, black chickpeas, green gram, black-eyed peas, peanuts, rajma and lentils. The seasoning stays constant — mustard, urad dal, red chilli, curry leaf, hing and coconut — which is what makes the dish easy for a household to prepare in quantity.\n\nSundal is also made on Vinayaka Chaturthi, Vaikunta Ekadashi, Thai Pongal evenings and at many temples as a free prasad. Compared with Andhra’s guggillu it is lighter on chilli, generally includes fresh coconut, and uses curry leaf more heavily.',
      serves: '6–8 small leaf cups (about 1 cup dry pulses)',
      prep: '10 min (plus 8–10 hours soaking)',
      cook: '30 min',
      equipment: [
        'Pressure cooker (2–3 litre) — the standard way to cook pulses to the right tender-but-intact stage',
        'Small kadai or tadka pan — for the tempering; a wide pan lets the pulses be tossed without breaking',
        'Colander — to drain the pulses thoroughly so that the sundal is dry, not watery',
        'Banana leaf cups or small bowls — to serve in the traditional way',
      ],
      ingredients: [
        {
          group: 'For the sundal',
          items: [
            '1 cup (200 g) brown or white chickpeas (kondakadalai) — soak overnight; older chickpeas need a longer soak',
            '1 tsp salt, plus more to taste — added to the pressure-cooking water',
            '2 tbsp coconut oil or sesame (gingelly) oil — coconut oil gives the most authentic aroma; sesame oil is the temple choice',
            '1 tsp mustard seeds — they must pop fully',
            '1 tsp urad dal — gives a nutty crunch to the tempering',
            '2 dry red chillies, broken — gentle heat and fragrance',
            '10–12 curry leaves — fresh, torn',
            '1/4 tsp asafoetida (hing) — optional but typical; omit if avoiding it in offerings',
            '2 green chillies, slit (optional) — for a little fresh heat',
            '1/4 cup fresh grated coconut — added at the end; its sweetness balances the spice',
            '1 tsp lemon juice (optional) — a freshening finish in some households',
          ],
        },
      ],
      mise: [
        'Wash the chickpeas and soak them in plenty of water for 8–10 hours or overnight, until they have roughly doubled in size.',
        'Drain and rinse the soaked chickpeas, then put them in the pressure cooker with 2½ cups of fresh water and the salt.',
        'Grate the coconut, tear the curry leaves, break the dry chillies and slit the green chillies.',
        'Keep all the tempering ingredients next to the stove in the order they will be added.',
      ],
      method: [
        {
          title: 'Pressure cook the soaked chickpeas',
          text: 'Cook the soaked, drained chickpeas with 2½ cups of water and 1 teaspoon of salt in the pressure cooker for 4–5 whistles on medium-high heat, then reduce the heat for 5 minutes and switch off. Let the pressure release naturally, then open the lid.',
          why: 'Soaking and pressure cooking gives chickpeas that are tender throughout but keep their shape. Adding salt to the water seasons them from inside rather than only on the surface.',
          cue: 'A chickpea crushes easily between your thumb and finger but is still whole and not mushy.',
        },
        {
          title: 'Drain and dry',
          text: 'Pour the cooked chickpeas into a colander and drain completely, saving the cooking water for soup or dal if you like. Spread the chickpeas on a plate or leave them in the colander for a few minutes so that the surface moisture evaporates.',
          why: 'Sundal should be a dry, tossed dish. Excess water dilutes the tempering and makes the coconut soggy.',
          cue: 'The chickpeas look matte, not wet, and do not drip when lifted with a spoon.',
        },
        {
          title: 'Heat the oil and add mustard',
          text: 'Heat the oil in a wide kadai over medium heat until it shimmers. Add the mustard seeds and let them pop fully, which takes about 15–20 seconds. Keep a lid nearby since the seeds may jump out of the pan.',
          why: 'Mustard seeds release their flavour only after they have popped; unpopped seeds taste raw and bitter.',
          cue: 'The seeds crackle and turn grey, and the popping slows down.',
        },
        {
          title: 'Add dal, chillies and curry leaves',
          text: 'Add the urad dal and fry for 15–20 seconds until it turns light golden. Add the dry red chillies, green chillies, curry leaves and hing, and stir for 10–15 seconds more. Take care that the curry leaves spatter.',
          why: 'Urad dal needs a few seconds to brown and turn crisp; each addition should go in at the right moment so that nothing burns. Curry leaves crisp quickly and perfume the oil.',
          cue: 'The urad dal turns pale gold, the curry leaves go crisp and translucent, and the oil smells strongly of curry leaf.',
        },
        {
          title: 'Add the chickpeas and toss',
          text: 'Add the drained chickpeas to the kadai. Toss gently on medium heat for 2–3 minutes so that the chickpeas are coated with the tempering and heated through. Taste and add salt if needed.',
          why: 'A brief toss on the heat brings the flavour into the chickpeas and dries their surface a little. Over-stirring breaks them.',
          cue: 'The chickpeas are hot and glossy, with flecks of mustard and curry leaf clinging to them.',
        },
        {
          title: 'Finish with coconut',
          text: 'Turn off the heat. Stir in the grated coconut and the lemon juice (if using). Toss once and cover for 2 minutes before serving.',
          why: 'Coconut added off the heat keeps its fresh sweetness and its white colour. Cooked coconut turns greasy and loses fragrance.',
          cue: 'White coconut shreds are visible among the chickpeas, and the sundal smells sweet and savoury.',
        },
      ],
      offering:
        'Offered to the Goddess each evening of Navaratri and to Ganesha on Vinayaka Chaturthi; one portion is kept for the deity and the rest is shared as prasad with guests and neighbours.',
      ritual: [
        'Cook the sundal in the afternoon after a bath, in a clean kitchen, using fresh oil and without tasting it.',
        'Place a small portion in a clean bowl or on a banana leaf in front of the golu or the deity, with a tulsi leaf or a flower, and sprinkle water around it.',
        'Light the lamp, show incense, and recite the evening prayer or lalita sahasranamam, offering the sundal as naivedyam.',
        'When guests arrive, give them the thamboolam of betel leaves, areca nut, fruit and a leaf cup of sundal.',
        'Share the remainder with family, with the first cup going to the youngest girl or to the visiting guest.',
      ],
      serving:
        'Serve warm in banana leaf cups or small steel bowls, as a snack, with a cup of filter coffee in the evening. Sundal is eaten without cutlery. For Golu, serve one different pulse each evening to guests as thamboolam.',
      storage:
        'Best eaten the same day. It can be refrigerated for 1 day in an airtight container. Reheat in a pan with a few drops of oil and add fresh coconut after reheating. Do not offer reheated sundal to the deity.',
      troubleshooting: [
        {
          problem: 'The chickpeas are hard after cooking',
          fix: 'They were old or not soaked enough. Soak for at least 8 hours, and cook for 2 whistles more with the same water. Adding salt after cooking, not before, can help with very old stock.',
        },
        {
          problem: 'The sundal is mushy',
          fix: 'Over-cooked. Reduce the whistles to 3–4, and let the pressure release naturally without opening early. Toss gently.',
        },
        {
          problem: 'It is watery',
          fix: 'The chickpeas were not drained. Drain well, and toss the sundal on medium heat for 2 minutes to dry it.',
        },
        {
          problem: 'It tastes bland',
          fix: 'Salt only the cooking water lightly; adjust the final salt at the end. Add more curry leaf and coconut, and a few drops of lemon.',
        },
      ],
      variations: [
        'Nine-day Golu plan, same tempering throughout: Day 1 white chickpeas — soak 8 hours, pressure cook 4 whistles. Day 2 black-eyed peas (karamani) — soak 4 hours, 3 whistles. Day 3 green gram (pachai payaru) — soak 6 hours, 2 whistles, keep whole. Day 4 peanuts (verkadalai) — boil in shell or shelled for 15 minutes with salt, no soak needed. Day 5 black chickpeas (kala chana) — soak overnight, 5 whistles. Day 6 rajma — soak overnight, 6 whistles, a little more salt. Day 7 whole masoor or kollu (horse gram) — soak 6 hours, 4 whistles, finish with pepper in place of green chilli. Day 8 green peas (pattani) — soak overnight, 3 whistles. Day 9 sweet sundal — boil the chana dal or moong 3 whistles, drain, and toss with jaggery syrup, coconut and cardamom, as a sweet finale.',
        'Add a pinch of sambar powder or a teaspoon of freshly ground pepper for a different flavour.',
        'Substitute mango pieces (thokku mango) in summer for sweetness and sourness: add raw mango bits with the coconut.',
        'Temple style: use sesame oil, omit green chilli and hing, and use only salt, mustard and curry leaf.',
        'Sweet sundal (made with a little jaggery) is made for Pongal by some families.',
        'For Jain or no-hing households, leave out the asafoetida and add a pinch of crushed pepper.',
      ],
      tips: [
        'Soak the pulses overnight; it shortens the cooking and gives an even texture.',
        'Season in two steps: once lightly in the cooking water, and again with the tempering.',
        'Add the coconut off the heat for the freshest taste.',
        'Cook small batches daily; sundal tastes best when fresh and warm.',
      ],
      differs: 'Light tempering with fresh coconut; a new pulse each Navaratri evening.',
      seeAlso: [
        { dish: 'sundal', variant: 'andhra-guggillu', label: 'Guggillu — the Andhra version' },
      ],
    },
    {
      id: 'andhra-guggillu',
      region: 'Andhra Pradesh & Telangana',
      culture: 'Telugu households — Dasara, Vinayaka Chavithi, Sankranti',
      title: 'Guggillu',
      intro:
        'Boiled Bengal gram (senagalu) tossed with a stronger tempering of mustard, cumin, green chillies, ginger and curry leaves, with a little grated coconut or dry coconut. Guggillu is spicier and gingery than Tamil sundal.',
      story:
        'In Andhra and Telangana, guggillu is made for almost every festival. During Dasara or Navaratri it is the evening prasad of each day, offered to the Goddess and distributed to children and neighbours who visit. It is equally the standard for Vinayaka Chavithi, when Ganesha is offered a spread of 21 items, and it is made in temples for Hanuman Jayanti and Sri Rama Navami.\n\nThe core is similar to Tamil sundal — a boiled pulse and a quick tempering — but Telugu cooking leans more on green chilli, ginger and cumin. Many households also add a little finely chopped raw mango in summer or a squeeze of lemon, and use groundnut (peanut) oil or ghee, rather than coconut oil. Grated fresh coconut is common but less central than in Tamil Nadu.\n\nBecause temple and festival food in Andhra is traditionally made without onion and garlic, the heat and aroma of guggillu come from green chilli, ginger, cumin and curry leaf, which is why the ginger is generous. It is also a favourite street snack at Hyderabad’s evening gatherings during Dasara.',
      serves: '6–8 small cups (about 1 cup dry pulses)',
      prep: '10 min (plus 8–10 hours soaking)',
      cook: '30 min',
      equipment: [
        'Pressure cooker (2–3 litre) — for tender but whole chickpeas',
        'Heavy kadai — wide enough to toss the pulses without breaking them',
        'Colander — to drain the cooked pulses completely',
        'Small mortar — to crush the ginger and green chillies for a fresh paste (optional)',
      ],
      ingredients: [
        {
          group: 'For the guggillu',
          items: [
            '1 cup (200 g) Bengal gram (senagalu), brown chickpeas — soak overnight; the small brown variety is traditional in Andhra',
            '1 tsp salt, plus more to taste — added to the cooking water',
            '2 tbsp groundnut oil or ghee — the usual Telugu choice; ghee for temple offerings',
            '1 tsp mustard seeds — to pop in the oil',
            '1 tsp cumin seeds — more prominent here than in Tamil sundal',
            '1 tsp urad dal and 1 tsp chana dal — for crunch in the tempering',
            '2 dry red chillies, broken — fragrance and mild heat',
            '2–3 green chillies, chopped — more fresh heat than the Tamil version',
            '1 tbsp finely chopped ginger — a signature of guggillu',
            '10–12 curry leaves — fresh',
            'A pinch of hing — optional; leave out if not used in offerings',
            '3 tbsp fresh grated coconut or dry coconut shavings — adds sweetness and texture',
            '1 tsp lemon juice — brightens the flavour at the end',
          ],
        },
      ],
      mise: [
        'Wash and soak the Bengal gram in plenty of water for 8–10 hours until it swells to double its size.',
        'Drain, rinse and cook it in a pressure cooker with 2½ cups of fresh water and the salt.',
        'Chop the green chillies and ginger finely and tear the curry leaves. Break the dry chillies.',
        'Grate the coconut and measure the lemon juice, and keep everything ready near the stove.',
      ],
      method: [
        {
          title: 'Cook the soaked gram',
          text: 'Pressure cook the soaked Bengal gram with 2½ cups of water and 1 teaspoon of salt for 4–5 whistles. Reduce the heat and cook for 5 minutes more, then switch off and let the pressure release naturally.',
          why: 'Soaking plus pressure cooking gives tender pulses that still hold their shape. Salt in the cooking water seasons from the inside.',
          cue: 'A grain mashes easily between the fingers, with a soft centre, but remains whole.',
        },
        {
          title: 'Drain thoroughly',
          text: 'Drain the cooked gram in a colander and let it stand for a few minutes. Keep the cooking liquid for rasam or dal if you wish.',
          why: 'Guggillu is a dry preparation. Excess water turns the tempering into a watery mess and makes the coconut soggy.',
          cue: 'The grains look matte and no water drips from the colander.',
        },
        {
          title: 'Pop the mustard and cumin',
          text: 'Heat the oil or ghee in a kadai over medium heat. Add the mustard seeds, and when they pop, add the cumin and let it sizzle for 10 seconds.',
          why: 'Mustard and cumin each need hot fat to release their oils, and mustard must pop before the rest goes in.',
          cue: 'The mustard crackles and goes grey, and the cumin darkens slightly and smells toasted.',
        },
        {
          title: 'Add the dals and chillies',
          text: 'Add the urad dal and chana dal and fry for 20 seconds until light golden. Add the dry red chillies, green chillies, ginger, curry leaves and hing, and stir for 30 seconds until the ginger smells cooked.',
          why: 'The dals provide the crunch of the tempering and must brown without burning. Ginger needs a short fry to lose its raw bite.',
          cue: 'The dals are pale gold, the curry leaves crisp, and the ginger smells warm rather than sharp.',
        },
        {
          title: 'Toss in the gram',
          text: 'Add the drained Bengal gram and toss gently on medium heat for 3–4 minutes so that the tempering coats every grain and the surface moisture dries. Taste and adjust the salt.',
          why: 'A brief toss on the heat carries the flavour into the pulses. Vigorous stirring breaks the gram, so fold rather than stir.',
          cue: 'The gram is hot, glossy and speckled with ginger and curry leaf.',
        },
        {
          title: 'Finish with coconut and lemon',
          text: 'Switch off the heat. Add the coconut and the lemon juice, toss once, cover for 2 minutes and serve warm.',
          why: 'Coconut and lemon added off the heat keep their freshness; lemon cooked in the pan turns bitter and dulls the colour.',
          cue: 'White coconut shreds are visible, and a bright lemon fragrance rises over the spices.',
        },
      ],
      offering:
        'Offered to the Goddess on each evening of Dasara, to Ganesha on Vinayaka Chavithi, and at Rama Navami and Hanuman Jayanti; then given to children and neighbours.',
      ritual: [
        'Cook the guggillu after a bath, in a clean kitchen with fresh oil or ghee, without tasting it before the offering.',
        'Place a portion on a banana leaf or in a small clean bowl before the deity, with a flower and a sprinkle of water around it.',
        'Light the lamp and incense, say the naivedyam prayer, and ring a small bell while the offering stands for a few minutes.',
        'Distribute the first portion to children and visiting neighbours in leaf cups, as is the custom during Dasara evenings.',
        'The remainder is shared with the family as prasad.',
      ],
      serving:
        'Serve warm in leaf cups or small bowls as an evening prasad snack. On Vinayaka Chavithi, it appears among the 21 offerings alongside kudumulu and undrallu. A drop of lemon at serving brightens the flavour.',
      storage:
        'Best eaten the day it is made. It can be refrigerated for 1 day in an airtight container. Reheat in a pan with a few drops of oil, and add fresh coconut and lemon after reheating. Offer only fresh guggillu to the deity.',
      troubleshooting: [
        {
          problem: 'The gram stays hard',
          fix: 'The pulses are old or the soak was short. Soak for a full 8–10 hours and give 2 more whistles. Avoid adding more salt before they are soft.',
        },
        {
          problem: 'It tastes too raw or sharp',
          fix: 'The ginger and chilli were not fried long enough. Fry them for 30 seconds in the tempering before adding the gram, and toss for a few minutes afterwards.',
        },
        {
          problem: 'It is soggy',
          fix: 'Drain completely and toss on medium heat for a few minutes to dry. Do not add the lemon until the end.',
        },
        {
          problem: 'It turned out too spicy',
          fix: 'Add more grated coconut and a pinch of sugar or jaggery to balance the heat. Reduce the green chilli next time.',
        },
      ],
      variations: [
        'Add finely chopped raw mango in summer for a sour, fresh version popular with children.',
        'Use boiled peanuts, black-eyed peas (alasandalu) or green gram (pesalu) in place of the Bengal gram.',
        'Temple style: use ghee, omit hing and green chilli and rely on ginger, cumin and pepper.',
        'Some households add a pinch of sambar or pepper powder and a teaspoon of grated jaggery.',
        'For fasting days, choose a fruit-based or sabudana prasad instead; guggillu contains pulses.',
      ],
      tips: [
        'Chop the ginger finely; it is the signature flavour of this version.',
        'Toss gently so the gram does not break.',
        'Add coconut and lemon at the very end for freshness.',
        'Cook it fresh; guggillu is best within a few hours.',
      ],
      differs: 'Gingery, with more chilli and cumin; groundnut oil or ghee; sometimes raw mango.',
      seeAlso: [
        { dish: 'sundal', variant: 'tamil-nadu', label: 'Kondakadalai Sundal — the Tamil version' },
      ],
    },
  ],
}

export default recipe
