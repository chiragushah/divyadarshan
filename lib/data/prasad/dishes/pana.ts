import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'pana',
  name: 'Pana',
  alsoCalled: 'Pana Sankranti · Bela Pana · ପଣା',
  category: 'Drink',
  summary: 'Odisha’s cooling fruit-and-milk drink for Pana Sankranti and Jagannath.',
  meaning:
    'Pana is the drink of Odisha’s summer new year, Maha Vishuva Pana Sankranti, celebrated in mid-April. It is offered to Hanuman, Shiva and the village goddess, hung in a perforated pot over the Tulsi plant so that water drips on it all summer, and shared with every neighbour. In Puri, Jagannath is offered pana in the Snana Yatra season too. The drink is made from fruit pulp, milk, jaggery or sugar, and cooling spices; the bael (wood apple) version is the most prized because bael is sacred to Shiva and is considered the best coolant for the body in the Odisha heat.',
  variants: [
    {
      id: 'odisha',
      region: 'Odisha (Puri, Bhubaneswar, Cuttack)',
      culture: 'Odia Vaishnava and Shaiva households; Pana Sankranti',
      title: 'Bela Pana (wood-apple pana)',
      intro:
        'A thick, fragrant drink of ripe bael pulp, curd or milk, jaggery, banana and spices, finished with a pinch of black pepper and nutmeg. Distributed on Pana Sankranti to all visitors.',
      story:
        'Pana Sankranti, also called Maha Vishuva Sankranti, is the Odia new year, falling on the day the sun enters Mesha (Aries), around 14 April. In every Odia village a new earthen pot with a tiny hole is hung over the Tulsi plant or a Shivalinga, filled with water, and left to drip all summer — a symbol of cooling the deity and the earth. On this day families make pana and offer it, with chhatua (roasted flour), to the deities and then to every visitor.\n\nThe drink has many forms — with curd, milk, banana, ripe mango or just jaggery and lime — but the bael pana is the most treasured. Bael (wood apple, Aegle marmelos) fruit has a hard shell and a sticky orange pulp with a smoky, aromatic taste; Ayurveda calls it the best fruit for the digestive tract in summer, and it is sacred to Shiva. In the Mahaprasad kitchens of Puri, pana is offered to Lord Jagannath, and Hanuman temples across Odisha give it out on the day.\n\nThe finished pana is thick, rich and slightly grainy, never watery. It is served in small cups or brass glasses, and the leftover is often poured into the Tulsi pot as a gesture of sharing with the plants.',
      serves: '6–8 glasses',
      prep: '25 min',
      cook: 'None',
      equipment: [
        'A large bowl and a wooden spoon or masher — to break the bael pulp by hand; a blender makes it bitter by grinding the seeds.',
        'A coarse sieve — to separate the pulp from seeds and fibre.',
        'A heavy hammer or the back of a cleaver — to crack the hard bael shell cleanly.',
        'A tall jug and brass or steel glasses — to chill and serve.',
      ],
      ingredients: [
        {
          group: 'For the pana',
          items: [
            '1 ripe bael (wood apple, about 500 g) — choose one that sounds hollow and smells sweet when shaken; unripe bael is bitter and tough',
            '1/2 cup (100 g) jaggery or sugar — powdered; Odisha families use white jaggery or sugar for a pale pana',
            '1 ripe banana — mashed; it adds body and softens the sharpness of bael',
            '1 cup (240 ml) thick curd or milk — cold; curd makes it tangy, milk makes it rich, and both are traditional',
            '3 cups (700 ml) cold water — for thinning to a pourable consistency',
            '1/2 tsp cardamom powder — freshly ground seeds',
            '1/4 tsp black pepper powder — a gentle warmth that offsets the sweetness',
            '1 pinch nutmeg powder — freshly grated; do not use more than a pinch',
            '2 tbsp grated coconut (optional) — fresh, for texture and sweetness',
            '1 tsp lime juice (optional) — sharpens the flavour if the bael is mild',
          ],
        },
      ],
      mise: [
        'Wash the bael fruit well and wipe it dry; crack it with a hammer on a clean surface lined with newspaper.',
        'Scoop the pulp with a spoon into a large bowl, discarding the shell, and soak it in half a cup of warm water for ten minutes.',
        'Mash the ripe banana with a fork until it is smooth.',
        'Grind cardamom and black pepper just before use and keep the nutmeg ready to grate.',
      ],
      method: [
        {
          title: 'Crack and scoop the bael',
          text:
            'Wrap the bael in a clean cloth and strike it firmly with a hammer until the shell cracks open. Use a spoon to scoop out all the orange, sticky pulp and the seed clusters into a large bowl, scraping the inner shell clean.',
          why: 'The pulp clings to the shell and seeds; scraping thoroughly ensures nothing is wasted, as a good bael gives only one cup of usable pulp.',
          cue: 'The bowl holds sticky orange pulp with a smoky sweet smell, and the shell is nearly empty.',
        },
        {
          title: 'Soften the pulp',
          text:
            'Pour half a cup of warm water over the pulp and let it sit for ten minutes. Use your fingers to work the pulp until it loosens from the seeds and becomes a thick, pulpy liquid.',
          why: 'Warm water softens the stringy pulp so it can be separated from the seeds without a blender, which would crush the seeds and make the drink bitter.',
          cue: 'The pulp is loose and slippery, and the seeds have separated and float or sink separately.',
        },
        {
          title: 'Sieve the pulp',
          text:
            'Press the softened pulp through a coarse sieve into a clean bowl, pushing it with the back of a spoon and scraping the underside of the sieve. Add a splash of water to rinse the seeds and press again. Discard the fibre and seeds left behind.',
          why: 'Seeds and fibres are bitter and tough; sieving leaves a smooth pulp that will blend into a pleasant drink.',
          cue: 'You have about one cup of thick, orange, fibre-free pulp, and the sieve holds only seeds and strings.',
        },
        {
          title: 'Add banana and jaggery',
          text:
            'Stir the mashed banana into the pulp, then add the powdered jaggery or sugar. Stir for a minute with a spoon until the sweetener dissolves completely and the mixture is smooth.',
          why: 'Banana mellows the bael’s sharp, smoky taste and gives the pana its signature body.',
          cue: 'The mixture is a uniform golden-orange paste with no lumps or undissolved crystals.',
        },
        {
          title: 'Whisk in the curd or milk',
          text:
            'Add the cold curd or milk and whisk until the mixture becomes creamy and pale orange. Add the cold water gradually, stirring, until the pana has the consistency of thin cream.',
          why: 'Adding the dairy cold and slowly stops the pulp from separating, and the dilution is done last so you can control the thickness.',
          cue: 'The pana coats a spoon lightly and pours in a slow, smooth stream.',
        },
        {
          title: 'Season with spices',
          text:
            'Stir in the cardamom, black pepper and a pinch of grated nutmeg, then the grated coconut and lime juice if using. Taste and adjust the sweetness; the pana should be sweet, slightly tangy and gently spiced.',
          why: 'The spices balance bael’s earthiness, and the pepper gives the characteristic warmth that makes pana refreshing rather than heavy.',
          cue: 'You smell cardamom and nutmeg first, and the finish has a mild peppery warmth.',
        },
        {
          title: 'Chill and rest',
          text:
            'Pour the pana into a jug, cover it, and refrigerate for at least an hour. If making it for the temple, let it rest in a clay pot in a cool corner of the house instead.',
          why: 'Chilling allows the bael’s flavour to blend with the dairy, and a clay pot keeps the pana cool without ice, as is traditional.',
          cue: 'The pana is cold and has a slightly thicker, creamier body than when first mixed.',
        },
        {
          title: 'Serve in small cups',
          text:
            'Stir the pana well and pour it into brass or steel glasses, filling each about three-quarters. Garnish with a sprinkle of grated coconut or a pinch of nutmeg and serve immediately.',
          why: 'Stirring redistributes the pulp, which settles to the bottom as the drink stands.',
          cue: 'Each glass is thick, orange-gold and fragrant, with a light garnish on the surface.',
        },
      ],
      offering:
        'Offered on Pana Sankranti to Hanuman, Shiva and the household deities with chhatua; the dripping pot over Tulsi continues the offering all summer.',
      ritual: [
        'Before dawn on Pana Sankranti, bathe and set up the puja space with Tulsi, the Shivalinga or a picture of Hanuman.',
        'Hang a new earthen pot with a pin-hole in its base over the Tulsi plant, fill it with water and let it drip all summer long.',
        'Pour pana into a brass cup, place it on a banana leaf along with chhatua, fruit and a lamp, and offer it with “Nivedayami”.',
        'Perform the aarti and sprinkle a little pana on the Tulsi roots as a gesture of cooling the plant.',
        'Distribute the pana first to the elders, then to children and neighbours, with a spoonful of chhatua alongside.',
      ],
      serving:
        'Serve chilled in small brass or steel glasses, about 100 ml each, with chhatua (roasted gram flour with sugar) and fruit on the side. In Puri, pana is distributed at Hanuman temples to all who visit on the day.',
      storage:
        'Best the same day. Refrigerate any leftover pana in a covered jug for up to a day; the curd version should not be left out, as it sours quickly in the heat.',
      troubleshooting: [
        {
          problem: 'The pana tastes bitter.',
          fix: 'Seeds or fibre were crushed into the pulp, or the bael was unripe. Sieve by hand, never blend, and use a fully ripe fruit.',
        },
        {
          problem: 'The curd separated.',
          fix: 'The mixture was too warm or the curd too sour. Use fresh cold curd, whisk it before adding, and chill before serving.',
        },
        {
          problem: 'It is too thick to drink.',
          fix: 'Add cold water or milk a few tablespoons at a time until it flows easily.',
        },
        {
          problem: 'It lacks flavour.',
          fix: 'The bael was mild. Add a teaspoon of lime juice and a pinch more cardamom, and chill longer.',
        },
      ],
      variations: [
        'Use ripe mango pulp instead of bael for a sweeter pana popular in coastal Odisha.',
        'Add a tablespoon of soaked chia or basil seeds for a cooling, textured drink.',
        'Vrat-friendly: the drink is acceptable on fasts that allow dairy; omit black pepper if the fast requires.',
        'Jain households can make it with milk instead of curd and omit nothing else.',
        'Vegan: use coconut milk in place of curd and jaggery in place of sugar.',
      ],
      tips: [
        'Never blend the bael; seeds make it bitter.',
        'Use fully ripe bael; unripe fruit is tough and astringent.',
        'Serve chilled but not iced; ice dilutes the flavour.',
      ],
      differs: 'Bael pulp with banana and curd; thick; peppery.',
    },
  ],
}

export default recipe
