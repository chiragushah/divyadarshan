import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
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
        'A fragrant crumble of dry-ginger powder, dry coconut, poppy seeds, jaggery and ghee, eaten in a spoonful or shaped into small balls. It is dry, rich, spicy-sweet and a little goes a long way.',
      story:
        'Sunthavda is the prasad that Maharashtrians associate with two noon festivals: Ram Navami, when the birth of Rama is celebrated with a kirtan and a cradle ceremony at midday, and Dattatreya Jayanti, in the month of Margashirsha, when devotees gather at Datta temples. Immediately after the noon aarti, as the cradle is rocked and the devotees sing, a small spoonful of sunthavda is placed in each outstretched palm.\n\nThe choice of ginger is both ritual and practical. Dry ginger (sunth) is considered a warming and digestive spice in Ayurveda, and the festival days fall in seasons when the body benefits from it: the heat of Chaitra in spring and the cold of Margashirsha in winter. The prasad is also very easy to make in large quantities. The ingredients are shelf-stable pantry items, there is no cooking in syrup, and the whole preparation takes barely twenty minutes, which suits a temple kitchen that must make enough for hundreds of devotees.\n\nEvery family has its own proportion of ginger, coconut and nuts. Some use sugar, some jaggery; some include edible gum (gond) for its strength-giving reputation, and some add khus-khus (poppy seeds) for richness. In others, the crumble is pressed into small marbles. The recipe below is a balanced home version, in which the ginger is noticeable but not harsh.',
      serves: '12–15 small servings',
      prep: '10 min',
      cook: '10 min',
      equipment: [
        'Heavy-bottomed kadai or pan — a thick base lets ghee warm gently and stops the ginger burning',
        'Flat wooden or steel spoon — for constant stirring so the powder roasts evenly',
        'Grater or fine knife — to grate the jaggery and to shave the dry coconut',
        'Dry pan — for toasting the coconut and poppy seeds separately before they join the mix',
        'Wide plate — to cool the mixture and to mix in the jaggery',
      ],
      ingredients: [
        {
          items: [
            '1/4 cup dry ginger powder (sunth) — use freshly ground or fresh-packed powder; old powder is faded and has little aroma',
            '1 cup dry coconut (kopra), grated and lightly toasted — the grated dry coconut gives body and sweetness; toast until pale gold only',
            '1/2 cup jaggery (or sugar), grated — grated fine so that it melts and binds into the warm mixture',
            '2 tbsp ghee — pure ghee carries the flavour of the ginger and moistens the crumble',
            '2 tbsp poppy seeds, roasted — white khus-khus, dry-roasted until fragrant; they add a nutty richness',
            '2 tbsp chopped almonds and cashews — coarsely chopped for a pleasant crunch',
            '1/2 tsp cardamom powder — freshly ground; softens the heat of the ginger',
            '1 tbsp edible gum (gond), fried (optional) — fry a small amount in ghee until it puffs and turns white; it adds a crisp, light bite',
          ],
        },
      ],
      mise: [
        'Grate the jaggery fine on the coarse side of a grater; if it is soft, chop it into tiny pieces and keep it on a plate.',
        'Dry-roast the grated coconut in a pan on low heat for 2 minutes until pale gold and fragrant, then cool it on a plate.',
        'Roast the poppy seeds in a dry pan for 30–40 seconds until they crackle slightly, then tip them out so they do not darken.',
        'Chop the almonds and cashews coarsely, and, if using gond, crush it into small crystals and keep a spoon of ghee for frying it.',
      ],
      method: [
        {
          title: 'Fry the gond (if using)',
          text:
            'Heat about 1 tablespoon of the ghee in the kadai on low heat. Add the crushed gond and stir. Within 20–30 seconds the crystals puff up into white, crisp, light pieces. Lift them out with a slotted spoon onto a plate. Do not leave them in the ghee after they puff.',
          why: 'Gond is hard when raw. Frying expands it into a crunchy texture, but it burns quickly and turns bitter if left too long.',
          cue: 'Each crystal swells to several times its size, turns white and opaque, and crumbles easily when pressed.',
        },
        {
          title: 'Roast the dry ginger',
          text:
            'Heat the remaining ghee on the lowest flame. Add the dry ginger powder and stir continuously for 1–2 minutes, until the powder darkens slightly and smells strongly aromatic. Do not allow it to turn brown or you will taste bitterness in the finished sunthavda.',
          why: 'Raw ginger powder tastes sharp and dusty. A brief roast in ghee mellows it and releases its warm fragrance, but it scorches in seconds.',
          cue: 'The powder turns a shade deeper, smells sweetly spicy rather than raw, and the ghee shimmers around it.',
        },
        {
          title: 'Add the coconut and nuts',
          text:
            'Add the toasted coconut, chopped nuts and poppy seeds to the ginger. Toss everything together on low heat for 2 minutes so the ghee coats each piece. Return the fried gond to the pan at the end and mix once.',
          why: 'Warming the add-ins in the ginger-scented ghee spreads the flavour through the mix and crisps the nuts without colouring them too much.',
          cue: 'The mixture looks evenly coated and slightly moist, with a toasty smell, and the nuts are pale gold.',
        },
        {
          title: 'Cool slightly',
          text:
            'Switch off the heat and tip the mixture onto a wide plate. Spread it and let it cool for 2–3 minutes, stirring once, until it is warm to the touch but not hot enough to melt the jaggery completely.',
          why: 'If the jaggery meets very hot ghee it melts into a sticky syrup and the sunthavda turns into a paste. Warm, not hot, softens it just enough to bind.',
          cue: 'The plate feels comfortably warm to the back of your hand, and the steam has stopped rising.',
        },
        {
          title: 'Mix in the jaggery and cardamom',
          text:
            'Sprinkle the grated jaggery and cardamom over the warm mixture and rub it in with your fingertips for 1–2 minutes, pressing so that the jaggery softens and clings to the coconut and ginger. Keep working until there are no dry jaggery crumbs left.',
          why: 'Hand-mixing uses the body’s warmth to soften the jaggery and bind the ingredients without making them wet.',
          cue: 'The mixture holds together in a clump when squeezed and then crumbles easily when pressed again.',
        },
        {
          title: 'Taste and adjust',
          text:
            'Taste a pinch. If the ginger is too strong, add 1–2 tablespoons of toasted coconut or a little more jaggery; if the sunthavda is too dry, rub in 1 teaspoon of warm ghee. Mix again to even out the flavours.',
          why: 'Dry ginger varies greatly in strength between brands. Balancing at the end gives a prasad that is pleasant for children and the elderly as well.',
          cue: 'The first taste is sweet and nutty, followed by a gentle, lingering warmth from the ginger.',
        },
        {
          title: 'Serve as crumble or roll into marbles',
          text:
            'For temple-style prasad, keep the sunthavda as a loose crumble and serve it by the spoonful. For household use, press about a teaspoon at a time between your palms and roll it into marble-sized balls. Place them on a plate and let them firm up for 15 minutes.',
          why: 'The crumble is quick to distribute to a crowd; the marbles are neater for plates and tiffins and stay firm for days.',
          cue: 'A marble holds its shape without cracking when lightly pressed, and feels firm but not hard.',
        },
      ],
      offering: 'Distributed after the noon aarti on Ram Navami (the hour of Rama’s birth) and on Dattatreya Jayanti.',
      ritual: [
        'On Ram Navami, prepare the sunthavda in the morning and keep it covered near the altar, with panakam, kosambari and fruit, ready for the noon puja.',
        'At noon, place a small cradle (palna) with an image of Rama or Krishna, and offer flowers, tulsi and the sunthavda on a clean plate or leaf.',
        'Sing the birth song (Ram janma) or recite the Ram Raksha Stotra, and wave the lamp as the cradle is rocked at the moment of birth.',
        'After the aarti, place a spoonful of sunthavda in the cupped right palm of each devotee, starting with the elders and the children.',
        'On Dattatreya Jayanti, the same preparation is offered at the Datta shrine after the evening or noon kirtan, with a pinch of the prasad added to the household offering.',
      ],
      serving:
        'Serve a small spoonful (about a tablespoon) per person in the palm, on a leaf or in a paper cup, with a sip of panakam or buttermilk. Because it is strong and rich, a spoonful is enough for each person.',
      storage:
        'Store in an airtight jar at room temperature for up to 2 weeks, away from moisture. Rolled marbles keep for about 10 days. Do not refrigerate, as the ghee hardens and the ginger loses its fragrance.',
      troubleshooting: [
        {
          problem: 'The sunthavda tastes bitter or burnt.',
          fix: 'The ginger or coconut was overheated. Roast the ginger on the lowest flame for no more than two minutes and keep stirring; start again with a fresh batch.',
        },
        {
          problem: 'It is too hot (spicy) to eat.',
          fix: 'Add more toasted coconut and jaggery to dilute the ginger, and use less ginger next time, around 3 tablespoons.',
        },
        {
          problem: 'The mixture is wet and sticky rather than crumbly.',
          fix: 'The jaggery melted in hot ghee. Let the mixture cool a few minutes before adding the jaggery, and mix in a spoon of extra toasted coconut.',
        },
        {
          problem: 'The crumble will not roll into balls.',
          fix: 'It is too dry. Rub in 1 teaspoon of warm ghee, press firmly and roll again with slightly damp palms.',
        },
      ],
      variations: [
        'Use sugar instead of jaggery for a lighter-coloured sunthavda; in Ram Navami temple prasad, powdered sugar is common.',
        'Some families add a pinch of nutmeg or a few fennel seeds for a milder, sweeter aroma.',
        'A version made with dried dates, finely chopped, in place of jaggery is softer and naturally sweet.',
        'The recipe is naturally free of onion and garlic and is suitable for fasting households, if the ingredients are accepted in the family’s fasting rules.',
        'Sunth powder is also used in winter in panjiri-style and postpartum preparations; the proportion there is usually higher.',
      ],
      tips: [
        'Go easy on the ginger — it is strong, and a little goes a long way.',
        'Roast ginger only on the lowest flame and keep the spoon moving.',
        'Let the mixture cool before adding jaggery, otherwise it becomes a sticky paste.',
        'Taste before serving and balance the heat with more coconut or jaggery.',
      ],
    },
  ],
}

export default recipe
