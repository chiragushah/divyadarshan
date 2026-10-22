import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'ghewar',
  name: 'Ghewar',
  alsoCalled: 'Malai Ghewar · घेवर',
  category: 'Sweet',
  summary: 'Rajasthan’s honeycomb disc, soaked in sugar syrup — the sweet of Teej, Gangaur and Raksha Bandhan.',
  meaning:
    'Ghewar is made by pouring a thin batter in a slow stream into very hot ghee, where it forms a lacy, honeycomb-patterned disc. It is the sweet of Teej (in the month of Savan), Gangaur and Raksha Bandhan in Rajasthan, and is offered to Gauri and Teej Mata before it is shared. Making it at home takes practice, because the honeycomb depends on the temperature of the ghee and the consistency of the batter; this recipe gives the method, the reasons behind each step and the usual pitfalls.',
  variants: [
    {
      id: 'rajasthan',
      region: 'Rajasthan',
      culture: 'Marwari and Mewar households — Teej, Gangaur',
      title: 'Malai Ghewar',
      intro:
        'A crisp honeycomb disc of flour and ghee, soaked in light sugar syrup and topped with thickened sweet cream (rabri or malai), saffron and pistachios.',
      story:
        'Ghewar belongs to the monsoon. In Rajasthan the rains of Savan bring Teej, the festival of Parvati and Shiva’s reunion, when women wear green, swing from trees and exchange gifts, and the sweet shops of Jaipur, Jodhpur and Udaipur fill with stacks of golden ghewar. It is also sent to married daughters as sindhara, the festival gift from their parents’ home, and a ghewar is tied up with the rakhi gifts at Raksha Bandhan. At Gangaur in spring, it is offered to Gauri.\n\nThe sweet is a kind of fried lace. A batter of flour, ghee and ice-cold water is beaten until it is as thin as buttermilk, and poured in a thin stream into a deep mould of boiling ghee. The ghee rushes up through the batter, making hundreds of small holes, and the disc sets into a honeycomb. It is lifted out, drained, dipped briefly in syrup, and either eaten plain, or crowned with rabri, the thickened sweet milk, to make the famous malai ghewar.\n\nTraditional halwais use a tall cylindrical mould and a long-handled ladle, and the skill is said to take years. For a home kitchen a deep, narrow steel pot or a ring mould works. The recipe asks for patience, and it will not be perfect the first time; the first disc is the one the cook eats while the others are offered.',
      serves: '6 small ghewar',
      prep: '45 min + 1 hr resting',
      cook: '45 min',
      equipment: [
        'Tall, narrow, heavy steel pot or a 15 cm ring mould, at least 12 cm deep — the narrow shape makes the ghee rise through the batter and form a honeycomb',
        'Large bowl and a whisk — to beat the batter smooth and airy',
        'Bowl of ice-cold water and ice cubes — cold batter reacts sharply with hot ghee, which creates the lace',
        'Long chopstick, skewer or ladle handle — to lift and turn the disc',
        'Wire rack and a shallow dish — to drain the fried disc and dip it in syrup',
      ],
      ingredients: [
        {
          group: 'Batter',
          items: [
            '1 cup (125 g) maida (refined flour) — the base; sifting makes the batter smooth',
            '2 tbsp gram flour (besan) — optional, adds crispness and a slight nutty flavour',
            '1/4 cup (60 g) ghee, chilled and semi-solid — whisked into the flour to give the lace its tenderness',
            '1 tbsp milk — for a smoother batter',
            '2 cups (480 ml) ice-cold water — added gradually; the cold is essential',
            '1 tsp lemon juice — keeps the batter light',
            'Ghee for frying, about 1 kg — deep enough for 8–10 cm in the mould; good quality ghee gives the right aroma',
          ],
        },
        {
          group: 'Syrup',
          items: [
            '1 cup (200 g) sugar — dissolved for a light syrup',
            '3/4 cup (180 ml) water — boiled to a one-string consistency',
            '4–5 saffron threads — soaked in a spoon of warm milk for colour',
            '1/2 tsp cardamom powder — freshly ground',
          ],
        },
        {
          group: 'Malai topping',
          items: [
            '1 cup (240 ml) thick rabri or reduced sweetened milk — simmered milk until about a third remains',
            '1 tbsp chopped pistachios and almonds — for garnish',
            'Silver leaf (vark) — optional, for the festive finish',
          ],
        },
      ],
      mise: [
        'Chill the water with ice cubes for 20 minutes; chill the ghee until it is semi-solid.',
        'Sift the maida and besan together twice.',
        'Make the syrup first and keep it warm in a shallow dish so the fried discs can be dipped at once.',
        'Place the wire rack over a tray near the stove, and keep a skewer ready.',
      ],
      method: [
        {
          title: 'Cream the ghee',
          text: 'Put the chilled semi-solid ghee into a large bowl with a few ice cubes in the water below it. Whisk vigorously for 3–4 minutes with the milk until the ghee turns white, light and creamy, almost like whipped butter.',
          why: 'The whipped ghee holds air and fat in suspension, which gives the final lace its fine, crisp texture instead of a heavy fry.',
          cue: 'The mixture is pale, fluffy and thick, with soft peaks that hold briefly.',
        },
        {
          title: 'Add flour and water gradually',
          text: 'Add the sifted flours a spoonful at a time while whisking. Then pour in 1/2 cup ice-cold water, whisking continuously, and repeat with the remaining water, in about four additions. Add the lemon juice last. Whisk until the batter is completely smooth and thin.',
          why: 'Adding water slowly stops lumps from forming; the cold temperature keeps the ghee from melting so the batter stays aerated.',
          cue: 'The batter is as thin as buttermilk, pours in a continuous stream, and has no lumps.',
        },
        {
          title: 'Rest the batter',
          text: 'Cover the bowl and refrigerate for 1 hour. After resting, stir it gently and check the consistency; if it has thickened, add a spoon of ice water. Keep the batter in the fridge until you are ready to pour each disc.',
          why: 'Resting lets the flour hydrate fully, which gives a stable batter that makes cleaner holes.',
          cue: 'The batter looks smooth and slightly glossy, and flows freely from a spoon.',
        },
        {
          title: 'Heat the ghee',
          text: 'Pour the frying ghee into the tall pot to a depth of 8–10 cm. Heat on medium until very hot, about 180°C. Test by dropping in 1/2 teaspoon of batter; it should sizzle sharply, rise and form tiny holes within seconds.',
          why: 'A very hot but not smoking ghee reacts violently with the cold batter, which creates the honeycomb. Cooler ghee gives a dense, oily disc.',
          cue: 'The test drop rises instantly with a loud crackle and becomes a small perforated puff.',
        },
        {
          title: 'Pour the first stream',
          text: 'Stir the batter, then pour a thin stream of about 2 tablespoons in the exact centre of the pot from a height of 10 cm. Wait for the sizzling to settle (about 10 seconds), then pour another thin stream into the centre of the first ring, letting the batter spread outward through the holes.',
          why: 'Pouring in the centre builds the disc outward in rings, and the pause lets each layer set and create holes before the next goes on.',
          cue: 'A ring of lace forms around the pour point and the ghee boils up through it.',
        },
        {
          title: 'Build the disc',
          text: 'Repeat the pours 6–8 times, each time into the centre and with a pause between, until the disc grows to the width of the pot with a raised honeycomb. Fry for another 2 minutes on medium heat until the edges turn golden.',
          why: 'Thin repeated pours make a thick, airy disc; one thick pour would be doughy and without holes.',
          cue: 'The disc is pale gold, has a raised lattice of holes, and the sizzling quietens.',
        },
        {
          title: 'Lift and drain',
          text: 'Slide a skewer through the central hole and lift the disc out carefully, holding it above the pot for a few seconds to let the ghee drain. Place on the wire rack. Skim any fried bits from the ghee, check the temperature and repeat with fresh batter.',
          why: 'Draining removes excess ghee, which would make the ghewar greasy and stop the syrup from soaking in.',
          cue: 'The disc is crisp, golden and no longer drips ghee.',
        },
        {
          title: 'Dip in syrup',
          text: 'Boil the syrup to one-string consistency and keep it warm. Dip each disc in it for about 5 seconds on each side, lift it out, and let the extra drip off on the rack. Sprinkle with the saffron milk.',
          why: 'A quick dip sweetens the lace without making it soggy; a long soak would collapse it.',
          cue: 'The disc has a faint sheen and still feels crisp when pressed.',
        },
        {
          title: 'Top with malai',
          text: 'Let the syrup-dipped ghewar cool on the rack for 5 minutes so it is no longer warm. Spread 2 tablespoons of cooled, thick rabri evenly over the top, and scatter the chopped pistachios and almonds over it. Press a small piece of silver leaf on the centre if you wish, and serve the same day.',
          why: 'Cooling stops the rabri from melting; the cream tops the ghewar with richness against the crisp base.',
          cue: 'The rabri sits on top as a thick layer and the base remains crisp underneath.',
        },
      ],
      offering: 'Offered to Teej Mata or Gauri at Teej and Gangaur; sent as sindhara.',
      ritual: [
        'On the morning of Teej or Gangaur, place the idol or picture of Gauri/Parvati on a clean cloth in the puja area, with fresh flowers, a lamp and a kalash of water.',
        'Arrange the ghewar on a clean plate with a little fruit and sweets; the topping of malai is often added just before the offering.',
        'The women of the house offer the sweet with a prayer for the husband’s long life and the family’s wellbeing, and sing traditional Teej or Gangaur songs.',
        'The prasad is shared among the women first, and the remaining ghewar is distributed to family and guests; a portion is sent as sindhara to married daughters.',
      ],
      serving:
        'Serve at room temperature on a flat plate, cut into wedges with a sharp knife. The plain ghewar is eaten with a spoon of rabri; the malai ghewar is served already topped. Pair with hot milk or tea. It is best eaten within a few hours of preparation.',
      storage:
        'Plain, syrup-dipped ghewar keeps in an airtight tin for 3–4 days at room temperature, but loses crispness over time. Do not add rabri until serving. Keep the topped ghewar in the fridge for no longer than a day.',
      troubleshooting: [
        {
          problem: 'The disc has no holes and looks like a thick pancake.',
          fix: 'The batter was too thick or the ghee not hot enough. Thin the batter with ice water to buttermilk consistency and heat the ghee until the test drop crackles.',
        },
        {
          problem: 'The disc collapses or turns soggy.',
          fix: 'It stayed too long in the syrup, or the syrup was too thin. Dip for only 5 seconds and boil the syrup to one string.',
        },
        {
          problem: 'The ghewar is greasy.',
          fix: 'The ghee was not hot enough while frying. Keep it near 180°C and drain the disc well before dipping.',
        },
        {
          problem: 'The batter splits or the lace is uneven.',
          fix: 'The water was added too fast or was not cold. Add it in four portions, keep the bowl on ice, and stir before every pour.',
        },
      ],
      variations: [
        'A plain ghewar without malai is served at Raksha Bandhan, dipped in syrup and sprinkled with chopped nuts.',
        'The paneer ghewar of Jaipur is topped with crumbled paneer and a little syrup instead of rabri.',
        'The mawa ghewar is topped with grated khoya mixed with sugar, a richer version favoured at weddings.',
        'For a lighter version, dip the discs in a thin sugar syrup with rose water and omit the topping.',
        'Replace some of the maida with fine arrowroot for a crisper lace, a technique used by some halwais.',
      ],
      tips: [
        'Use ice-cold water and chilled ghee; warm ingredients ruin the lace.',
        'Pour in a thin stream and wait between pours, without rushing.',
        'Do not stir the ghee between pours; keep it still so the disc forms cleanly.',
        'Make a test drop before every disc to check the heat.',
      ],
    },
  ],
}

export default recipe
