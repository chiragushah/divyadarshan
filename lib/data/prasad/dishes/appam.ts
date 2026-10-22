import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'appam',
  name: 'Unniyappam & Nei Appam',
  alsoCalled: 'Neyyappam · Sabarimala Appam · அப்பம்',
  category: 'Sweet',
  summary: 'Sweet fried rice-flour dumplings of Kerala and the Karthigai nei appam of Tamil Nadu.',
  meaning:
    'Round, caramel-dark and slightly crisp outside, unniyappam is a Kerala temple sweet made from rice, jaggery, ripe banana and coconut pieces, fried in an iron mould-pan called an unniyappa chatti. It is offered to Bhagavathy and Ganapati in Kerala temples as vazhipadu, and is among the sweets associated with the Ayyappa pilgrimage season. The Tamil nei appam, offered on Karthigai Deepam when rows of lamps are lit for Shiva and Murugan, is a lighter, ghee-fried cousin made from rice flour, jaggery and banana, dropped by the spoonful into hot ghee. Both are made from the same few ingredients, yet differ in technique, shape and the way they are offered — unniyappam is cooked in individual hollows, nei appam in free-form puddles — which is why the same festival food tastes so different on either side of the Western Ghats.',
  variants: [
    {
      id: 'kerala-unniyappam',
      region: 'Kerala',
      culture: 'Malayali households and Sabarimala devotees',
      title: 'Unniyappam',
      intro:
        'A thick batter of rice flour, ripe banana, jaggery, coconut bits and cardamom, fried in ghee or coconut oil in an appakara (a pan with round cups).',
      story:
        'Unniyappam is one of the most loved sweets of Kerala. The name comes from “unni”, meaning small or little one, and “appam”, and the sweet is said to be named for its small, round shape. It is traditionally offered in Kerala temples as a vazhipadu (a paid offering) to Ganapati, Bhagavathy and Shastha (Ayyappa), and it appears in the Sabarimala season among the sweets associated with the pilgrimage.\n\nThe heart of the dish is the batter: raw rice soaked and ground coarse, mixed with mashed ripe bananas and melted jaggery, and flavoured with cardamom, dry ginger, cumin and a handful of coconut bits fried in ghee. Kerala cooks prefer small, intensely sweet bananas such as njalipoovan, because they dissolve into the batter and add aroma. The batter is rested for several hours so that the rice softens and the flavours blend; some families allow a very mild fermentation, others add a pinch of baking soda or rice flour for lightness.\n\nIt is fried in a special cast-iron pan with round hollows called an appakara or unniyappa chatti, each hollow filled with a little ghee or coconut oil. Frying in a hollow gives the unniyappam its round shape, dark crisp crust and soft, almost custardy centre. Temple versions are cooked in large quantity in bronze vessels, but the home version follows the same pattern and is a staple of Onam, Vishu and Ashtami Rohini.',
      serves: '20 appams',
      prep: '20 min + 2 hrs resting',
      cook: '25 min',
      equipment: [
        'Unniyappa chatti (appakara) — a cast-iron pan with 7–12 round hollows; if you do not have one, use a non-stick paniyaram pan',
        'Wet grinder or strong blender — rice must be ground to a coarse, slightly grainy paste, not a smooth batter',
        'Small frying pan — for frying the coconut bits in ghee until golden',
        'Long skewer or thin wooden stick — to turn each appam in its hollow without breaking it',
        'Strainer and clean cloth — to strain the jaggery syrup',
      ],
      ingredients: [
        {
          group: 'Batter',
          items: [
            '1 cup (200 g) raw rice — unakkalari or any short-grain raw rice; soaked and ground coarse, which gives the batter its characteristic body',
            '2 ripe Njalipoovan bananas (or any small, very ripe banana) — about 150 g; their sweetness and aroma are essential, and spotted skins mean they are ready',
            '3/4 cup (150 g) jaggery, melted and strained — dark Kerala jaggery gives the colour; melt in 1/3 cup water and strain out grit',
            '1/4 cup (25 g) coconut pieces (thenga kothu) — small cubes of fresh coconut, fried in ghee until golden for a nutty bite',
            '1 tsp sesame seeds — black or white; adds a small crunch and a roasted aroma',
            '1/2 tsp cardamom powder — freshly ground for a fragrant batter',
            '1/4 tsp dry ginger powder — adds gentle warmth and balances the sweetness',
            '1/4 tsp cumin powder (optional) — a traditional touch in many Kerala homes',
            'A pinch of baking soda and 1/4 tsp salt — the soda lightens the crumb slightly, the salt lifts the sweetness',
          ],
        },
        {
          group: 'For frying',
          items: [
            '4 tbsp ghee or coconut oil, plus more as needed — ghee gives a richer taste, coconut oil is the more traditional Kerala fat',
          ],
        },
      ],
      mise: [
        'Wash the rice and soak it for 4 hours, then drain thoroughly in a colander for 15 minutes so no extra water gets into the batter.',
        'Melt the jaggery in 1/3 cup water over low heat, strain through a cloth and cool to lukewarm.',
        'Fry the coconut pieces in 1 tsp ghee until pale golden and set them aside.',
        'Heat the appakara on low flame for a minute so it is warm before you add the fat.',
      ],
      method: [
        {
          title: 'Grind the rice coarsely',
          text: 'Put the drained rice and the peeled bananas in a wet grinder or strong blender and grind with just 2–3 tablespoons of the jaggery syrup, pulsing and scraping down, until you get a thick, coarse paste. It should look like fine semolina soaked in liquid, not a smooth batter.',
          why: 'A coarse grind gives unniyappam its characteristic slightly grainy, soft interior; a fine grind makes it dense and rubbery.',
          cue: 'The paste feels slightly gritty between your fingers and holds a ridge when you drag a spoon through it.',
        },
        {
          title: 'Mix in the jaggery and spices',
          text: 'Transfer the paste to a bowl. Stir in the remaining jaggery syrup, cardamom, dry ginger, cumin, salt and sesame seeds, mixing until smooth. Add the baking soda last and stir gently. The batter should be thick, like idli batter, and drop slowly from the spoon.',
          why: 'Mixing spices in before resting lets their flavours infuse the batter; baking soda added last keeps its lifting power for frying.',
          cue: 'The batter falls from a lifted spoon in a thick ribbon that holds its shape for a moment before sinking.',
        },
        {
          title: 'Rest the batter',
          text: 'Cover the bowl and let the batter rest for 2 hours at room temperature, or up to 6 hours on a cool day. Do not refrigerate. Stir once after resting and adjust the thickness with 1–2 tbsp of water if needed.',
          why: 'Resting lets the coarse rice soften and absorb the jaggery, so the appams cook evenly and taste rounded rather than raw.',
          cue: 'Tiny bubbles appear on the surface and the batter smells sweetly of banana and jaggery, with no sourness.',
        },
        {
          title: 'Add the fried coconut',
          text: 'Just before frying, fold the fried coconut pieces into the batter along with the ghee they were fried in. Mix gently so the coconut is evenly distributed without deflating the batter.',
          why: 'Adding the coconut at the last minute keeps the pieces crisp and prevents them from absorbing moisture and turning soft.',
          cue: 'You see golden flecks of coconut throughout the batter.',
        },
        {
          title: 'Heat the appakara',
          text: 'Place the appakara on medium-low heat. Add about 1/2 tsp of ghee or coconut oil into each hollow and let it heat for 1–2 minutes until the fat shimmers. Keep the heat steady; too hot burns the jaggery, too low makes the appams oily.',
          why: 'Properly heated fat sears the batter immediately and forms the crisp outer crust; cold fat makes the batter spread and absorb oil.',
          cue: 'A drop of batter dropped into a hollow sizzles gently and rises within seconds.',
        },
        {
          title: 'Pour and fry the first side',
          text: 'Fill each hollow about three-quarters full with batter. Cook on medium-low heat for 3–4 minutes without touching, until the underside is dark golden-brown and the edges lift easily from the pan. The top will still look wet.',
          why: 'Batter expands as it cooks; three-quarters filling leaves room to rise and keeps the appams round rather than spilling.',
          cue: 'The edges turn dark brown and look slightly crisp, and bubbles appear on top.',
        },
        {
          title: 'Turn and finish',
          text: 'Use the skewer to turn each appam over gently. Add a few drops of ghee on the sides if the hollow is dry. Cook the second side for 3–4 minutes, turning once more if needed, until the appam is evenly dark golden-brown all over.',
          why: 'Turning when the first side is set avoids broken, uneven appams, and a second side cooked in fat gives an even crust.',
          cue: 'A skewer inserted in the centre comes out clean, and the appam sounds slightly crisp when tapped.',
        },
        {
          title: 'Drain and cool',
          text: 'Lift the appams out with the skewer and place them on a tissue or wire rack in a single layer. Wipe the hollows, add fresh fat and repeat with the remaining batter. Let the appams cool for at least 10 minutes before serving.',
          why: 'Cooling lets the crust firm up; piling them hot makes them soggy from trapped steam.',
          cue: 'The crust is crisp and the inside is soft, moist and cooked through.',
        },
      ],
      offering: 'Offered to Ayyappa and Bhagavathy, and given to the pilgrims.',
      ritual: [
        'Make the unniyappam only after bathing, in a clean kitchen with a lamp lit in the puja room. Use fresh batter and fresh fat for each batch.',
        'Place a handful of fresh appams on a clean banana leaf or in a bronze plate in front of the deity, along with fruit and flowers. Light a lamp and, if the family follows the custom, chant Ganapati or Ayyappa names before offering.',
        'Offer the appams in odd numbers — 3, 5, 7 or 9 — and leave them before the image for the duration of the prayer or the lamp’s burning.',
        'Distribute them as prasad, first to elders and children, and share with neighbours. Pilgrims who have observed the vratham often carry appam home in a leaf packet.',
      ],
      serving:
        'Serve warm or at room temperature, two or three appams per person, with a cup of hot tea or on their own as a snack. At festivals they are eaten alongside payasam and banana chips. They are best on the day they are made, when the crust is crisp.',
      storage:
        'Store in an airtight container for up to 3 days at room temperature. Crisp them again in a dry pan on low heat for 2 minutes before serving. The batter can be refrigerated for up to 1 day but should be brought back to room temperature before frying.',
      troubleshooting: [
        {
          problem: 'The appams are raw or sticky in the centre.',
          fix: 'The heat was too high or the batter too thin. Lower the flame, cook for longer, and thicken the batter with a spoon of rice flour.',
        },
        {
          problem: 'They are very oily.',
          fix: 'The fat was not hot enough when the batter went in. Heat the appakara properly and use only 1/2 tsp of fat per hollow.',
        },
        {
          problem: 'The appams are hard and dense.',
          fix: 'The rice was ground too fine or the batter was over-mixed. Grind coarsely and fold gently; also check that the baking soda is fresh.',
        },
        {
          problem: 'The appams stick to the pan.',
          fix: 'The pan was not seasoned or heated enough. Season an iron appakara with oil, heat it before adding batter, and use a thin skewer to loosen the edges.',
        },
      ],
      variations: [
        'Some families replace half the rice with wheat flour or rice flour to speed up preparation; the appam is softer and less grainy.',
        'Add 1 tbsp of grated fresh coconut to the batter and omit the fried pieces for a lighter, moister appam.',
        'For a vegan version, use coconut oil for frying; the appam remains the same, since it contains no dairy.',
        'In some temples the appam is made with rice flour (not soaked rice), dissolved jaggery and no banana; it is firmer and keeps longer.',
        'Jain and no-banana households sometimes use sweetened coconut milk for the batter in place of banana; this is a home adaptation rather than a temple custom.',
      ],
      tips: [
        'Batter should be thick, not runny — it must hold its shape in the cup.',
        'Keep the heat at medium-low; jaggery burns quickly and tastes bitter.',
        'Use very ripe bananas; underripe bananas make the appam starchy.',
        'Do not fill the hollows to the brim; the batter rises as it cooks.',
      ],
      differs: 'Banana and coconut, fried in appakara.',
    },
    {
      id: 'tamil-nei-appam',
      region: 'Tamil Nadu',
      culture: 'Tamil Shaiva households — Karthigai Deepam',
      title: 'Nei Appam',
      intro:
        'A soft, caramelised, ghee-fried appam of rice flour, jaggery and banana, offered with pori urundai on Karthigai Deepam.',
      story:
        'Nei appam, “ghee appam”, is a traditional offering of Karthigai Deepam in Tamil Nadu, the festival of lights celebrated on the full-moon day of the month of Karthigai (November–December). On this evening, rows of clay lamps are lit at the entrance of every home and temple, in remembrance of the endless column of fire in which Shiva appeared, and the special foods offered to the lamps include nei appam, pori urundai and adai.\n\nThe appam is simple and quick: rice flour, powdered jaggery, a ripe banana, grated coconut and cardamom mixed to a thick batter and dropped by the spoonful into hot ghee. Unlike the Kerala unniyappam, it is not cooked in a mould-pan, so each appam has a free, slightly irregular edge with a crisp, lacy rim and a soft, moist centre. The name comes from the ghee in which it is fried; a good nei appam is rich but not greasy.\n\nTamil families often make it on the afternoon of Karthigai Deepam, when the house is being cleaned and the lamps filled with oil. It is offered to Shiva, Murugan and the household deities with the first of the lamps, and shared with neighbours who come to see the lamps. In many homes a plate is also set aside for the family’s ancestors.',
      serves: '15 appams',
      prep: '15 min + 30 min resting',
      cook: '20 min',
      equipment: [
        'Small deep kadai or iron pan — a deep pan lets the appam float in ghee and puff evenly',
        'Slotted spoon or flat strainer — to lift the appams out and drain the ghee',
        'Mixing bowl and whisk — to get a smooth, lump-free batter',
        'Small ladle or round measuring spoon — drops equal-sized appams so they cook evenly',
        'Strainer and clean cloth — to strain the jaggery syrup',
      ],
      ingredients: [
        {
          items: [
            '1 cup (150 g) rice flour — fine, dry, preferably freshly ground from raw rice; stale flour gives a flat taste',
            '2 tbsp (15 g) wheat flour — adds softness and helps the appam hold its shape',
            '3/4 cup (150 g) jaggery — melted in 1/2 cup water and strained; use fresh jaggery without chemical smell',
            '1 ripe banana (about 80 g), mashed — adds sweetness and a soft texture; the riper, the better',
            '2 tbsp grated fresh coconut — or thin coconut slivers fried in ghee for a nuttier appam',
            '1/2 tsp cardamom powder — freshly ground for fragrance',
            'A pinch of salt — lifts the sweetness',
            'Ghee for deep frying, about 1 cup (240 ml) — enough for 3 cm depth; ghee gives the name and the flavour, refined oil is an acceptable substitute',
          ],
        },
      ],
      mise: [
        'Melt the jaggery in 1/2 cup water over low heat, strain through a cloth, and cool completely to room temperature.',
        'Mash the banana to a smooth paste with a fork.',
        'Measure out the flours and sift them together to remove lumps.',
        'Set a plate lined with a tissue or clean cloth near the stove for the cooked appams.',
      ],
      method: [
        {
          title: 'Mix the dry ingredients',
          text: 'In a mixing bowl combine the rice flour, wheat flour, cardamom powder and salt. Whisk lightly for about a minute with a dry whisk or fork so that the cardamom and salt are evenly spread through the flour and any small lumps are broken up.',
          why: 'Even distribution of salt and cardamom prevents pockets of flavour in the finished appams.',
          cue: 'The flour looks uniform in colour with no streaks, and smells faintly of cardamom.',
        },
        {
          title: 'Add banana and coconut',
          text: 'Add the mashed banana and grated coconut to the flour and rub them in with your fingertips. The mixture will turn lumpy and moist, like wet sand. This step coats the flour with banana, which makes the batter softer.',
          why: 'Rubbing in the banana first keeps the batter from forming dry lumps when the jaggery water is added.',
          cue: 'The mixture forms soft, moist crumbs that clump when squeezed.',
        },
        {
          title: 'Add the jaggery water',
          text: 'Pour in the cooled jaggery syrup a little at a time, whisking continuously. Add only as much as you need to get a thick, dropping batter, like a thick pancake batter. Use no more than 3/4 of the syrup at first, and add the rest only if needed.',
          why: 'Rice flour varies in how much liquid it absorbs; adding the syrup gradually avoids a thin batter that spreads in the ghee.',
          cue: 'The batter slides off the spoon in a thick, slow ribbon and leaves a trail on the surface for 2–3 seconds.',
        },
        {
          title: 'Rest the batter',
          text: 'Cover the bowl and let the batter rest for 30 minutes at room temperature. The flour absorbs the liquid and the batter thickens slightly. Stir gently before frying and add 1–2 tsp water if it has become too thick to drop from the spoon.',
          why: 'Resting hydrates the rice flour fully, so the appam cooks through and has a tender crumb instead of a raw floury taste.',
          cue: 'The batter looks glossy and thicker, with no dry flour patches.',
        },
        {
          title: 'Heat the ghee',
          text: 'Heat the ghee in the kadai on medium heat for 3–4 minutes. Test by dropping a tiny bit of batter: it should sink, then float up in 3–4 seconds with gentle bubbles. Reduce to medium-low before frying.',
          why: 'Ghee that is too hot burns the jaggery before the centre cooks, while ghee that is too cool makes greasy, flat appams.',
          cue: 'The test drop rises slowly and forms tiny bubbles around its edges without turning dark.',
        },
        {
          title: 'Drop the batter',
          text: 'Using a small ladle or round spoon, carefully drop 2 tablespoons of batter into the ghee and let it spread naturally. Fry 3–4 appams at a time, without crowding. Do not move them for the first minute so that they can set.',
          why: 'Moving appams too early causes them to break; crowding lowers the ghee temperature and makes the appams oily.',
          cue: 'The appam puffs up, floats, and a lacy ring forms around its edge.',
        },
        {
          title: 'Flip and brown',
          text: 'After about 1½ minutes, flip each appam gently with the slotted spoon. Fry the other side for another 1½–2 minutes, turning once more if needed, until both sides are a deep golden-brown and the centre springs back when pressed lightly.',
          why: 'Frying on both sides cooks the thick centre; the sugar in the jaggery gives the characteristic caramelised colour.',
          cue: 'The appam is deep brown, crisp at the edge, and feels light and slightly springy when lifted.',
        },
        {
          title: 'Drain and serve',
          text: 'Lift the appams out and let the extra ghee drip back into the pan. Place them on the tissue-lined plate. Fry the remaining batter in batches, adjusting the heat to stay medium-low. Serve warm or at room temperature.',
          why: 'Draining prevents greasiness, and batches keep the ghee temperature steady for even cooking.',
          cue: 'The surface looks dry and shiny rather than wet with ghee.',
        },
      ],
      offering: 'Offered at the lighting of the Karthigai lamps with pori urundai.',
      ritual: [
        'Make the nei appam on the afternoon of Karthigai Deepam, after cleaning the house and filling the lamps with oil or ghee.',
        'At dusk, place the appams on a banana leaf in front of the lit lamps and the image of Shiva or Murugan, along with pori urundai, fruit, flowers and betel leaf.',
        'Offer camphor aarti, chant the Karthigai Deepam prayers or Shiva stotras as per family custom, and leave the offering for the time of the prayer.',
        'Distribute the appams as prasad, first to children and elders, then to neighbours who visit to see the lamps.',
      ],
      serving:
        'Serve warm, two or three appams per person, on a banana leaf or small plate. They are eaten as a festive snack with pori urundai and are often accompanied by a cup of hot milk or tea.',
      storage:
        'Best eaten on the day they are made. Store leftover appams in an airtight tin for up to 2 days at room temperature and warm in a dry pan for a minute to restore the crispness at the edges.',
      troubleshooting: [
        {
          problem: 'The appams spread flat in the ghee.',
          fix: 'The batter is too thin. Add 1–2 tbsp of rice flour and rest for 10 minutes, then try again.',
        },
        {
          problem: 'They are dark on the outside but raw inside.',
          fix: 'The ghee was too hot. Lower the heat to medium-low and make the appams slightly smaller so the centre cooks through.',
        },
        {
          problem: 'The appams are hard and tough.',
          fix: 'The batter had too much flour or was over-mixed. Use the measured quantity, whisk just until smooth, and add the banana for softness.',
        },
        {
          problem: 'Bubbles burst and the ghee splatters.',
          fix: 'There is water in the batter or on the spoon. Make sure the jaggery syrup is fully cooled and your spoon is dry.',
        },
      ],
      variations: [
        'Some homes use only rice flour and no wheat flour; the appam is crispier but less soft.',
        'Add 1 tbsp of roasted sesame seeds or a few fried coconut pieces to the batter for added flavour and crunch.',
        'Some families cook the appams in a paniyaram pan with a small amount of ghee in each hollow, which uses less ghee and gives rounder appams; the taste is similar but the edges are not lacy.',
        'For a vegan version, use coconut oil for frying; for a lighter version, shallow-fry in 2 tbsp ghee, turning often.',
        'Substitute half the jaggery with palm jaggery (karupatti) for a deeper, earthier flavour typical of some southern districts.',
      ],
      tips: [
        'Keep the oil at medium heat so the inside cooks.',
        'Strain the jaggery syrup, or the appam will have grit.',
        'Use a ripe banana; it gives sweetness and keeps the appam soft.',
        'Fry in small batches so the ghee temperature stays steady.',
      ],
      differs: 'Deep-fried in ghee, no appakara.',
    },
  ],
}

export default recipe
