import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
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
      story:
        'On the Grand Road of Puri, in the lanes around the Jagannath temple, the shops of the Khaja Gali sell stacks of pale golden pastries in paper boxes, and no pilgrim leaves without one. Khaja is one of the dry sweets of the temple’s Mahaprasad; it keeps for days, which is why it is the sweet that travels home with devotees as a token of the Lord’s blessing.\n\nThe pastry is made in the temple’s sprawling kitchen, the Rosa Ghara, by the Suaras, the hereditary cooks. A dough of refined flour and ghee is rolled into thin sheets, which are spread with a paste of ghee and flour and stacked one on another. The stack is rolled into a tight log and sliced, and each slice is gently flattened so that the layers are visible from the side. In the ghee, the thin layers separate and puff, forming a shell as crisp and flaky as a good croissant. The pastry is then dipped briefly in sugar syrup so that the outside is lightly glazed and the inside stays airy.\n\nIt is a close cousin of the khaja of Bihar and eastern Uttar Pradesh, and of Bengal’s similar sweets, but Puri’s version is distinguished by its fine layering and its place in the temple’s offerings. During the Rath Yatra the khaja is among the sweets offered to Lord Jagannath, Balabhadra and Subhadra.',
      serves: '12 pieces',
      prep: '40 min + 30 min resting',
      cook: '30 min',
      equipment: [
        'Rolling pin and a clean, flat work surface — you will roll the dough very thin, so a smooth surface and a long pin help',
        'Wide, deep kadai — gives space for the khaja to puff and float freely',
        'Sharp knife — a clean cut keeps the layers visible and prevents them from sealing together',
        'Pastry brush or spoon — to spread the ghee paste evenly',
        'Slotted spoon and a wire rack — to lift the fried khaja and drain it before and after the syrup',
      ],
      ingredients: [
        {
          group: 'Dough and layering',
          items: [
            '2 cups (250 g) maida — fine refined flour gives thin, pale layers',
            '1/4 cup (60 g) ghee for the dough — rubbed in makes the dough short and flaky',
            '1/2 tsp salt — balances the sweetness',
            'About 1/2 cup (120 ml) water — added a little at a time to make a firm dough',
            '1/4 cup (60 g) ghee mixed with 2 tbsp maida — the layering paste, which keeps the sheets apart so they puff',
            'Ghee for frying, about 3 cups (700 ml) — enough for the khaja to float; ghee gives the authentic aroma',
          ],
        },
        {
          group: 'Syrup',
          items: [
            '1.5 cups (300 g) sugar — dissolves into a clear syrup',
            '3/4 cup (180 ml) water — to dissolve the sugar',
            '1/2 tsp cardamom powder — freshly ground for fragrance',
          ],
        },
      ],
      mise: [
        'Mix the layering paste in a small bowl until it is smooth and spreadable, like soft butter.',
        'Dust the work surface lightly with maida and keep extra flour in a bowl.',
        'Make the syrup before you start frying and keep it warm over very low heat.',
        'Set a wire rack over a tray for the fried khaja.',
      ],
      method: [
        {
          title: 'Knead the dough',
          text: 'Rub the ghee into the maida and salt with your fingertips until the mixture looks like breadcrumbs. Add water a spoonful at a time and knead for 5–6 minutes into a firm, smooth dough that is stiffer than chapati dough. Cover with a damp cloth and rest for 30 minutes.',
          why: 'Rubbing in ghee shortens the gluten so the layers are tender and crisp; the stiff dough rolls thin without tearing.',
          cue: 'The dough is smooth, firm and does not stick to your hands, and a pressed dent springs back slowly.',
        },
        {
          title: 'Divide and roll',
          text: 'Divide the rested dough into 4 equal balls. Roll the first ball on a lightly floured surface into a very thin round or rectangle, about 25 cm wide and 1–2 mm thick, dusting lightly with flour as needed to stop it sticking.',
          why: 'Thin sheets give many fine layers; thick ones make a doughy khaja that will not puff.',
          cue: 'You can see the work surface faintly through the sheet, and it does not tear when lifted.',
        },
        {
          title: 'Spread the paste',
          text: 'Place the first sheet on the surface and spread 1 tablespoon of the ghee–maida paste thinly and evenly over it, right to the edges. Place the second sheet on top, press lightly, and spread another tablespoon of paste. Repeat with the third sheet and cover with the fourth, which stays plain.',
          why: 'The paste acts as a barrier so the sheets separate in the hot ghee; thin, even coverage gives clean layers.',
          cue: 'The stack looks smooth with no bare patches, and the paste is just visible beneath the top sheet.',
        },
        {
          title: 'Roll into a log',
          text: 'Starting from one long edge, roll the stack up as tightly as you can into a log about 3 cm thick, pressing gently as you go to remove any air pockets. Seal the end by pressing it with a dab of water.',
          why: 'A tight roll keeps the layers in contact so they puff together instead of opening into loose rings.',
          cue: 'The log is firm and even, with no gaps visible at the ends.',
        },
        {
          title: 'Slice and flatten',
          text: 'Trim the ends, then cut the log into 12 slices, each about 2.5 cm (1 inch) thick, with a sharp knife. Place each slice flat on the surface with the spiral facing up and press down gently with your palm to flatten it to about 1 cm.',
          why: 'Cutting with a sharp knife keeps the layers open at the cut face; flattening gives a wider, even-cooking pastry.',
          cue: 'Each piece shows a clear spiral of thin layers and holds its shape.',
        },
        {
          title: 'Fry on low heat',
          text: 'Heat the ghee in the kadai on medium-low for 5 minutes. Test with a small piece of dough, which should sink and then slowly rise with a few bubbles. Slide in 4–5 pieces without crowding. Fry for 8–10 minutes, turning gently, until the layers have puffed apart and the khaja is pale golden.',
          why: 'Low heat cooks the inner layers before the outside darkens; hot ghee would brown the surface and leave the inside raw.',
          cue: 'The layers lift apart and the khaja floats, with slow, steady bubbles and an even golden colour.',
        },
        {
          title: 'Drain',
          text: 'Lift the khaja with the slotted spoon, letting the ghee drain for a few seconds, and place on the wire rack. Let it cool for about 5 minutes while you finish the batch.',
          why: 'Draining removes surface ghee, and a slightly cooled khaja takes up the syrup without becoming soggy.',
          cue: 'The pastry is crisp to the touch, golden, and no longer dripping.',
        },
        {
          title: 'Make the syrup',
          text: 'Dissolve the sugar in the water over medium heat, then boil for 6–8 minutes, until a drop pressed between thumb and finger forms a single thread. Stir in the cardamom and keep the syrup warm on the lowest heat.',
          why: 'One-string syrup is sticky enough to glaze the khaja without soaking in; thinner syrup makes it soft.',
          cue: 'A single, short thread forms between thumb and forefinger and holds for a moment.',
        },
        {
          title: 'Dip and set',
          text: 'Slip each khaja into the warm syrup for about 30 seconds, turning once. Lift it out with the slotted spoon, let the extra syrup drip off, and place on the rack. Leave to dry for at least 30 minutes until the glaze sets.',
          why: 'A brief dip glazes the layers; the setting time forms a thin sugar crust that keeps the khaja crisp.',
          cue: 'The khaja has a glossy, slightly crunchy shell and the layers remain visible.',
        },
      ],
      offering: 'Offered to Lord Jagannath as part of the Mahaprasad, and carried home by pilgrims.',
      ritual: [
        'In the temple, khaja is cooked in the Rosa Ghara, the sacred kitchen, and offered at the Sandhya Dhupa and other bhoga rituals before it is released as Mahaprasad.',
        'At home, wash and wear clean clothes, place the khaja on a clean plate or banana leaf in front of the picture or image of Lord Jagannath, with a lit lamp and fresh tulsi leaves.',
        'Offer it with the simple prayer “Jai Jagannath”, and let it stand for a few minutes.',
        'Share the khaja among the family, first with elders; in Odisha it is customary to share Mahaprasad with all present regardless of caste or community.',
      ],
      serving:
        'Serve at room temperature on a small plate, one or two pieces per person. It is eaten with the fingers, and the outer layers flake as you bite. Pair with a cup of tea; for temple-style Mahaprasad, serve alongside other dry sweets such as gaja and chhena poda.',
      storage:
        'Store in an airtight tin at room temperature. Khaja keeps well for about a week in dry weather. If it softens in humid conditions, crisp it for 5 minutes in a low oven (120°C).',
      troubleshooting: [
        {
          problem: 'The khaja did not puff and looks flat and hard.',
          fix: 'The dough was too soft, the sheets too thick or the paste uneven. Roll thinner, spread an even paste, and fry on gentle heat so the layers can lift.',
        },
        {
          problem: 'It is brown outside and raw inside.',
          fix: 'The ghee was too hot. Keep it on medium-low and fry longer, turning gently.',
        },
        {
          problem: 'The layers stuck together.',
          fix: 'The paste was too thin or missing in places. Spread it right to the edges and cut with a sharp knife so the layers stay open.',
        },
        {
          problem: 'The khaja turned soft after the syrup.',
          fix: 'The syrup was too thin or the dip too long. Cook it to one string, and dip for no more than 30 seconds.',
        },
      ],
      variations: [
        'Some cooks add a pinch of baking soda to the dough for extra puff, though temple cooks do not.',
        'Bihar’s khaja (Silao khaja) uses more layers of thinner dough with a drier paste and is dipped in thicker syrup.',
        'A sugar-dusted version skips the syrup: roll the fried khaja in powdered sugar while still warm.',
        'For a lighter version, bake the khaja at 180°C for 25 minutes, brushing with ghee, before dipping in syrup.',
        'Add a few saffron threads to the syrup for a festive golden glaze.',
      ],
      tips: [
        'Fry slowly so the inner layers cook before the outside darkens.',
        'Spread the paste right to the edges, or the layers will stick.',
        'Use a sharp knife and press, not drag, when cutting the log.',
        'Let the glazed khaja dry fully on a rack before storing it.',
      ],
    },
  ],
}

export default recipe
