import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'modak',
  name: 'Modak',
  alsoCalled: 'Modakam · Kozhukattai · Kadubu · Patoli · मोदक',
  category: 'Sweet',
  summary: 'Ganesha’s favourite dumpling — a rice-flour shell around coconut and jaggery.',
  meaning:
    'Modak is “that which gives joy”. Offered in odd numbers (21 is the classic count), it is the naivedyam of Ganesh Chaturthi and Ananta Chaturdashi. Every region folds the same idea differently: pleated and steamed in Maharashtra, pooranam-filled kozhukattai in Tamil Nadu, and rice batter wrapped in turmeric leaf in Goa and Konkan. The common thread is that the sweet is always steamed or cooked simply, with rice, coconut and jaggery — the three humble harvest foods of the western and southern coast — and is offered to Ganesha before anyone eats. Which shape, which filling and which count you make depends on your community, so use the version below that matches your family’s tradition.',
  variants: [
    {
      id: 'maharashtra',
      region: 'Maharashtra',
      culture: 'Marathi Brahmin and Konkan households',
      title: 'Ukadiche Modak',
      intro:
        'The famous steamed modak: a thin shell of hot-water rice-flour dough, pinched into 7–8 pleats and drawn to a point, holding a fragrant filling of fresh coconut and jaggery. It is served hot with a spoonful of ghee.',
      story:
        'Ukadiche modak (“modak of the steamed dough”) is the signature sweet of Ganeshotsav in Maharashtra and the Konkan coast. The name comes from ukad, the cooked rice-flour dough that is kneaded while still steaming hot and then pleated by hand. Families treat the making of modak as a shared task: the grandmother kneads, the daughters and daughters-in-law shape, and the children are given the misshapen ones to eat first. It is one of the few festival sweets that is judged by the beauty of its pleats as much as by its taste.\n\nTradition says Ganesha loves modak so much that the sweet is almost his emblem; images show him holding a modak in one hand. In the Marathi home, 21 modaks are placed before the idol on the first day, along with 21 blades of durva grass, and the number is repeated on the days of Gauri-Ganapati and at the visarjan. The shell is made from rice flour because rice is the grain of the monsoon, and the filling of fresh coconut and jaggery is the food of the Konkan coast where coconut palms are everywhere.\n\nThe fine, fragrant rice of the region — ambemohar, grown in the Maval hills near Pune — is considered the best for ukad because its flour makes a shell that is soft, almost translucent and sweet-smelling. Elsewhere in India the same idea is expressed with different grains and shapes; the Maharashtrian version is distinguished by its many sharp pleats, the poppy-seed and nutmeg perfume of the filling, and the practice of eating it hot with a generous spoon of homemade ghee.',
      serves: '10–12 modaks (double it for the traditional 21)',
      prep: '40 min',
      cook: '15 min',
      equipment: [
        'Steamer (modak patra, idli steamer or any deep pot with a rack and tight lid) — steam must circulate freely around the modaks; a lid wrapped in a cloth stops drips falling on the shells.',
        'Heavy-bottomed pan or kadai — for cooking the filling evenly without scorching the jaggery.',
        'Wide plate (parat) or shallow tray — for kneading the hot dough; the wide surface lets steam escape so you do not burn your hands.',
        'Banana leaf, turmeric leaf or a piece of damp muslin — placed under the modaks so they lift off cleanly after steaming.',
        'Small bowl of water and a little ghee — to grease your palms and keep the dough from sticking while shaping.',
      ],
      ingredients: [
        {
          group: 'Filling (saran)',
          items: [
            '1 cup (90 g) freshly grated coconut — use fresh, not desiccated; fresh coconut stays juicy and sweet, desiccated tastes dry and chewy. Frozen grated coconut (thawed) is an acceptable second choice.',
            '3/4 cup (150 g) grated jaggery — use a soft, golden jaggery (gur) rather than very dark, bitter jaggery; reduce to 1/2 cup if your jaggery is very sweet or your coconut is very juicy.',
            '1/2 tsp (1 g) green cardamom powder — grind the seeds fresh; pre-ground powder loses its perfume quickly.',
            '1/4 tsp nutmeg powder — a pinch of freshly grated nutmeg gives the characteristic Konkani warmth; do not use more or it becomes bitter.',
            '1 tbsp (8 g) white poppy seeds (khus-khus) — dry-roast for a minute until they smell nutty and pop slightly; they add a gentle crunch and richness. Omit if not available or if restricted where you live.',
            '1 tsp (5 g) ghee — lets the coconut and jaggery cook without sticking and gives a glossy finish.',
          ],
        },
        {
          group: 'Shell (ukad)',
          items: [
            '1 cup (150 g) fine rice flour — ambemohar or any freshly milled, fine, non-gritty flour; old or coarse flour makes the dough crack and the shell hard.',
            '1 cup (240 ml) water — measured exactly; the 1:1 ratio by volume gives a dough that is soft but not sticky.',
            '1 tsp (5 g) ghee — makes the dough pliable and the shell tender; oil is a substitute but ghee is traditional.',
            '1/4 tsp salt — brings out the sweetness of the filling and seasons the shell.',
            'Extra ghee, about 1 tbsp — for greasing palms, the steamer plate and for serving.',
            'Banana leaf, turmeric leaf or muslin cloth — as a liner for steaming; turmeric leaf gives a lovely aroma.',
          ],
        },
      ],
      mise: [
        'Grate the coconut and grate or finely chop the jaggery before you start; cold, solid jaggery melts unevenly and burns.',
        'Dry-roast the poppy seeds and let them cool; crush the cardamom seeds in a mortar and pestle.',
        'Fill the steamer base with water, set it on the stove and cover it — you want steam ready when the first modak is shaped.',
        'Cut the leaf into 4-inch squares (one per modak) or dampen and wring out the muslin, and grease it lightly with ghee.',
        'Keep a bowl of water, a small bowl of ghee and a clean damp cloth at your elbow; shaping goes faster when nothing needs to be fetched.',
      ],
      method: [
        {
          title: 'Cook the coconut-jaggery filling',
          text: 'Heat the ghee in a heavy pan on low-medium heat. Add the grated coconut and jaggery together and stir continuously. The jaggery will melt and the mixture will first become wet and loose, then thicken. Cook for 6–8 minutes in all, stirring from the bottom so nothing catches.',
          why: 'Cooking the jaggery into the coconut makes a filling that is moist but holds together; raw jaggery would melt inside the steamer and leak out through the shell.',
          cue: 'the mixture clumps together, looks glossy, and no longer leaves a pool of syrup in the pan when you drag a spoon through it. A tiny pinch pressed between your fingers should hold a shape.',
        },
        {
          title: 'Flavour and cool the filling',
          text: 'Switch off the heat and stir in the cardamom, nutmeg and roasted poppy seeds. Spread the filling on a plate and let it cool completely, at least 15 minutes. Divide it into 10–12 equal portions about the size of a small marble or a large grape (roughly 1 heaped teaspoon each).',
          why: 'Warm filling softens the shell dough and makes the modaks collapse; spices are added off the heat so their aroma is not cooked away.',
          cue: 'the filling feels barely warm to touch and rolls easily into a ball without sticking to your palm.',
        },
        {
          title: 'Make the hot-water dough (ukad)',
          text: 'In a deep pan, bring the water, ghee and salt to a rolling boil. Pour in all the rice flour at once, stir it once with the handle of a wooden spoon to make a rough mass, then immediately turn off the heat. Cover with a tight lid and leave for 5 minutes.',
          why: 'The boiling water cooks the starch in the flour as it sits. This gelatinised starch is what makes the shell stretchy and translucent; cold water would give a crumbly, short dough that cannot be pleated.',
          cue: 'after resting, the flour looks like a lumpy, cooked mass with no dry white patches remaining and smells sweetly of cooked rice.',
        },
        {
          title: 'Knead the dough while it is hot',
          text: 'Tip the hot mass onto a wide greased plate. Grease your palms with ghee and a little water. Knead briskly with the heel of your hand for 4–5 minutes, folding and pressing, until the dough is completely smooth. If it is too hot to handle, dip your fingers in cold water between presses. Cover the finished dough with a damp cloth.',
          why: 'Kneading while hot spreads the gelatinised starch evenly; cold dough is stiff, develops cracks and will tear when you pleat it.',
          cue: 'the dough is satin-smooth like soft play-dough, stretches without breaking when you pull a small piece, and leaves no crumbs on the plate.',
        },
        {
          title: 'Shape the shell cup',
          text: 'Pinch off a lemon-sized ball (about 30 g) of dough and roll it between greased palms until smooth. Press the ball into a flat disc, then use your thumb and fingers to push the centre out and thin the edges to make a cup roughly 2.5 inches wide, with a thicker base and a wall about 2 mm thick at the rim.',
          why: 'A thin rim is needed to pleat neatly; a thick base stops the filling from breaking through. If the whole cup is thin, it tears under the weight of the filling.',
          cue: 'the cup is even, with a rim that you can fold between thumb and forefinger without cracking. If cracks appear, dip your fingertip in water and smooth them over.',
        },
        {
          title: 'Fill and pleat the modak',
          text: 'Place one portion of filling in the centre of the cup. Hold the cup in your left hand. With the right thumb and forefinger, pinch the rim and fold it inward to make a pleat, then use the left thumb and forefinger to hold the pleat and make the next one beside it. Make 7–8 evenly spaced pleats all the way around, moving the cup as you go. Bring all the pleats together towards the top, press them gently, and pinch the very top into a small point. Seal firmly.',
          why: 'Even pleats are structural: they spread the stress evenly so the shell cooks at the same rate everywhere and does not split in the steamer. A well-sealed top keeps the filling from leaking.',
          cue: 'the modak stands on its own with sharp, regular ridges that run from the base to the pointed top, and the point is closed without a visible gap.',
        },
        {
          title: 'Steam the modaks',
          text: 'Line a steamer plate with a banana leaf or damp muslin and grease lightly. Arrange the modaks on it with a finger’s gap between them so they do not stick. Steam over briskly boiling water, covered, for 10–12 minutes on medium-high heat. Do not open the lid in the first 8 minutes.',
          why: 'Steam cooks the starch shell evenly without drying it. Opening the lid early drops the temperature and makes the shells gummy; steaming for too long makes them soggy.',
          cue: 'the surface turns glossy and translucent, a slightly darker cream colour, and the shell feels firm yet springy when touched lightly with a fingertip. A drop of water on the surface should bead rather than soak in.',
        },
        {
          title: 'Rest briefly and serve hot',
          text: 'Switch off the heat and leave the modaks in the closed steamer for 2 minutes. Lift them off the leaf with a spatula or by hand (dip your fingers in water first). Serve at once on a banana leaf or a clean plate with a spoonful of warm ghee over each.',
          why: 'Resting lets the shell set so it does not tear when lifted; modak is best eaten hot, when the shell is soft and the ghee melts into the filling.',
          cue: 'the modak holds its pleated shape when lifted and a spoon of ghee melts into a golden pool in the centre.',
        },
      ],
      offering:
        'Offered to Ganesha as naivedyam; traditionally 21 modaks, placed on a leaf alongside 21 blades of durva and a red flower. The first modak goes to Ganesha, and the rest is distributed after aarti.',
      ritual: [
        'Make the modaks only after bathing, in a clean kitchen, and without tasting the filling or the dough beforehand — the first portion belongs to the deity.',
        'Arrange the 21 modaks (or 5, 11 or 21 according to your family custom) on a clean plate or a banana leaf in front of the idol, with a spoonful of warm ghee and a small bowl of water for the naivedya.',
        'Place 21 blades of durva grass in sets of three beside the plate, and offer a red hibiscus flower. Light the lamp and incense, then sprinkle a little water around the plate while reciting the naivedya mantra or simply saying, “Ganapati Bappa, please accept this offering”.',
        'Close your eyes for a minute, keeping the plate in front of the deity. Then ring the bell once, show the aarti flame, and lift the plate after the aarti.',
        'Distribute the modaks as prasad: the first goes to the family elders, then to children, and then to neighbours and guests. Save the ghee-drizzled one for the person who made them.',
        'Repeat the offering on each day of the festival — many families make a different number of modaks each day or offer a fresh plate morning and evening.',
      ],
      serving:
        'Serve freshly steamed modaks hot on a banana leaf, each drizzled with a teaspoon of warm homemade ghee. Offer them with a glass of cold milk or a cup of masala chai. In Marathi homes they are often followed by puran poli, varan-bhaat and a festive meal. Allow 2–3 modaks per adult as a sweet course.',
      storage:
        'Modak is best eaten the day it is made. Cooked modaks keep 1 day at room temperature in a covered container and up to 2 days in the refrigerator; re-steam for 5 minutes to soften them. You can also freeze uncooked, shaped modaks on a tray, then bag them for up to 1 month and steam them straight from frozen for 15 minutes. Never store with a damp cloth, as the shell becomes slimy.',
      troubleshooting: [
        {
          problem: 'The shell cracks while pleating',
          fix: 'The dough has cooled or dried. Knead it again with a little warm water on greased palms until pliable, and keep the unused dough covered with a damp cloth. Next time, knead for the full five minutes while the dough is still hot.',
        },
        {
          problem: 'The shell is hard and chewy after steaming',
          fix: 'The shell was too thick or the flour was coarse. Roll the walls thinner (about 2 mm) and use fine rice flour. Also check that you steamed with a tightly closed lid and a steady boil.',
        },
        {
          problem: 'The modaks burst or leak syrup in the steamer',
          fix: 'The filling was too wet or too warm, or the top was not sealed. Cook the filling longer until it is clumpy, cool it fully, and pinch the top firmly. A trace of dry rice flour dusted into a very wet filling also helps.',
        },
        {
          problem: 'The modaks stick to the plate and tear',
          fix: 'Grease the leaf or cloth well, and let the modaks rest 2 minutes after steaming before lifting. A turmeric or banana leaf releases more easily than a steel plate.',
        },
      ],
      variations: [
        'Fried modak (talniche modak): shape the same filled modaks, then deep-fry on medium-low heat until golden — a crisper, longer-lasting version made in some Maharashtrian homes and popular for the second and third days of the festival.',
        'Chocolate, dry-fruit or mawa modak: modern households stuff the same shell with khoya and dry fruits or fill pre-made moulds with a milk-and-sugar mixture. Use these only as additional sweets; the coconut-jaggery modak is the traditional offering.',
        'Fasting (vrat) adaptation: replace rice flour with sama (barnyard millet) flour or singhara flour if observing a fast, and omit poppy seeds. Use sendha namak (rock salt) in place of salt.',
        'Vegan or Jain-friendly: replace ghee with coconut oil in the dough and filling. The recipe is otherwise free of animal products and contains no root vegetables.',
        'If you cannot get fresh coconut, soak 3/4 cup of desiccated coconut in 3 tablespoons of warm milk or water for 10 minutes before cooking it with the jaggery.',
        'Using a modak mould (a two-part brass or plastic press) saves time: press a pinch of dough into each half of the mould, add the filling, close and release. The shape is less sharp but is faster for large batches.',
      ],
      tips: [
        'The dough must be kneaded while hot; cold dough cracks when pleated.',
        'Keep the filling moist but not wet, or the shell tears while steaming.',
        'A wet sheet of muslin under the steamer plate keeps modaks from sticking and from becoming soggy from drips.',
        'Work with one ball of dough at a time and keep the rest covered under a damp cloth.',
        'Make a test modak first. If it holds its shape in the steamer, continue; if not, adjust the dough or filling.',
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
      story:
        'In Tamil Nadu the dumpling is called kozhukattai (or modhagam when it is shaped with pleats and a pointed top), and it is the central offering of Vinayaka Chaturthi. The sweet version is called pooranam kozhukattai: poorna means “full” and pooranam means “filling”. The dough is made with rice flour that has been gently roasted before use, because Tamil cooks prefer a flour that is dry and fine for a shell that is thin yet strong.\n\nThe filling is what sets the southern version apart. Along with coconut and jaggery, cooked chana dal (Bengal gram) is added to give body and a slightly nutty, earthy taste. Some families add a pinch of dry ginger or a little ghee. The result is a denser, more substantial sweet than the Maharashtrian modak. In Karnataka the same dumpling is called kadubu and often has a very similar filling; it is steamed in an idli steamer, and on Ganesh Chaturthi it is part of the festival menu along with sundal, vada and fruit.\n\nKozhukattai is also famous for its savoury cousin, uppu kozhukattai, made from the same dough but filled with or tossed in a tempering of urad dal, mustard, curry leaves and coconut. A household that offers both the sweet and the savoury versions is following a long-standing Tamil custom that gives Ganesha the full range of flavours. The tradition of steaming rather than frying also fits Ganesha’s association with simple, pure offerings.',
      serves: '12–14 pieces',
      prep: '40 min',
      cook: '20 min',
      equipment: [
        'Idli steamer or any steamer with perforated plates — idli plates are the traditional tool and lift each kozhukattai neatly; grease them well.',
        'Heavy-bottomed kadai or pan — for cooking the pooranam without scorching the jaggery.',
        'Pressure cooker — for cooking the chana dal quickly until soft but intact.',
        'Small bowl of gingelly (sesame) oil — to grease your palms for shaping; it keeps the dough from sticking and adds a quiet, nutty fragrance.',
        'Fine sieve — for straining the melted jaggery to remove sand and impurities.',
      ],
      ingredients: [
        {
          group: 'Pooranam (filling)',
          items: [
            '1/4 cup (50 g) chana dal — washed and soaked 30 minutes, then pressure-cooked until just soft; it should hold its shape and not turn to paste, so use minimal water.',
            '3/4 cup (65 g) freshly grated coconut — fresh coconut gives juicy sweetness; do not use dried coconut.',
            '3/4 cup (150 g) powdered jaggery — choose clean, light-coloured jaggery and strain it after melting to remove grit.',
            '1/2 tsp (1 g) cardamom powder — freshly ground; it is the main flavouring.',
            '1 tsp (5 g) ghee — enriches the filling and prevents sticking.',
            '2 tbsp (30 ml) water — used only to melt the jaggery.',
          ],
        },
        {
          group: 'Dough',
          items: [
            '1 cup (150 g) rice flour — preferably idiyappam or kozhukattai flour, lightly roasted in a dry pan for 2–3 minutes until it feels dry and sandy; raw flour tastes starchy and gives a heavier shell.',
            '1 cup (240 ml) water — measured exactly; adjust by a tablespoon if the flour is very dry.',
            '1 tsp (5 ml) sesame (gingelly) oil — gives the dough elasticity and a traditional aroma; coconut oil is a good second choice.',
            'A pinch of salt — seasons the dough and balances the sweetness.',
          ],
        },
      ],
      mise: [
        'Wash and soak the chana dal for 30 minutes, then pressure-cook it with 1/2 cup water and a pinch of salt for 3 whistles. Drain any excess water completely.',
        'If your rice flour is store-bought and damp, roast it in a dry pan on low heat for 2–3 minutes and cool it. Sieve to remove lumps.',
        'Grate the coconut and powder the jaggery. Melt the jaggery with the water, strain it and keep it ready.',
        'Grease the idli plates with sesame oil and set a pot of water to boil in the steamer.',
        'Keep a small bowl of oil and a bowl of water at hand for shaping.',
      ],
      method: [
        {
          title: 'Prepare the chana dal',
          text: 'Mash the cooked chana dal lightly with the back of a spoon so that some grains remain whole and others break. Do not purée it. Measure out 1/4 cup of the cooked dal after draining thoroughly.',
          why: 'A coarse mash gives the filling body and texture. A smooth purée would make the pooranam pasty and heavy.',
          cue: 'the dal is soft enough to crush between two fingers but still visibly grainy, with no standing water.',
        },
        {
          title: 'Cook the pooranam',
          text: 'Pour the strained jaggery syrup into a heavy kadai and boil on medium heat for 2 minutes. Add the grated coconut and mashed dal. Cook on low heat for 8–10 minutes, stirring constantly, until the mixture thickens and starts to come together.',
          why: 'The syrup must reduce so the filling does not seep out of the shell during steaming. Constant stirring prevents the sugars from catching on the base.',
          cue: 'when you drop a small spoonful on a plate it holds as a mound and does not spread. The mixture leaves the sides of the pan.',
        },
        {
          title: 'Finish and cool the filling',
          text: 'Switch off the heat, stir in the ghee and cardamom, and spread the filling on a plate to cool. Divide into 12–14 equal balls about the size of a large marble (roughly 1 tablespoon each) and roll them smooth between greased palms.',
          why: 'Cooling firms the filling so it can be shaped; pre-shaping into balls makes filling the shells much faster and more even.',
          cue: 'the balls are firm, smooth and hold their shape without flattening.',
        },
        {
          title: 'Cook the rice-flour dough',
          text: 'In a wide pan bring the water, oil and salt to a rolling boil. Lower the heat, add the roasted rice flour all at once, and stir vigorously with a wooden spoon for about 2 minutes until the mixture comes together as a ball and leaves the sides of the pan. Cover and set aside for 10 minutes.',
          why: 'Cooking the flour in the water sets the starch so the dough is smooth and pliable; resting lets the steam finish the cooking evenly.',
          cue: 'the mass is thick, shiny and cleans the pan; there should be no dry flour pockets and it should smell like cooked rice.',
        },
        {
          title: 'Knead the warm dough',
          text: 'Transfer the dough to a plate. Grease your palms with sesame oil and knead the dough while still warm for 3–4 minutes until completely smooth, soft and non-sticky. Cover with a damp cloth to prevent drying.',
          why: 'Warm kneading evens out any lumps; if the dough cools it becomes stiff and cracks when shaped.',
          cue: 'the dough is as smooth as an earlobe, pulls apart without cracks, and does not stick to your hands.',
        },
        {
          title: 'Shape the kozhukattai',
          text: 'Pinch off a small lemon-sized ball of dough (about 30 g). Roll it smooth, then press it into a cup with your thumb, using your fingers to rotate and thin the wall to about 2–3 mm. Place a ball of pooranam inside. Bring the edges up and pinch them together to enclose the filling completely. Shape into a plump round with a small pointed tip, or pleat the upper rim into 5–6 folds for the traditional modhagam look.',
          why: 'The shell must be thin enough to cook through but thick enough to hold the filling. A fully sealed top keeps the filling from leaking out.',
          cue: 'the kozhukattai sits upright, has no visible seams or cracks, and the pointed tip is neatly closed.',
        },
        {
          title: 'Steam the kozhukattai',
          text: 'Arrange the shaped kozhukattai on greased idli plates, leaving a little space between them. Steam over rapidly boiling water for 10–12 minutes on medium-high heat with the lid tightly closed.',
          why: 'Steaming cooks the shell without absorbing oil, giving the typical soft, smooth skin; a loose lid lets steam escape and prolongs cooking.',
          cue: 'the surface changes from matte to shiny and slightly translucent, and the dumpling feels firm yet springy when lightly touched.',
        },
        {
          title: 'Cool slightly and serve',
          text: 'Turn off the heat and let the plates stand in the closed steamer for 2 minutes. Lift out each kozhukattai with a greased spoon or oiled fingers, never by pulling, and transfer to a plate. Serve warm, with a little ghee if desired.',
          why: 'A short rest lets the shell firm up so the dumplings do not tear when lifted.',
          cue: 'the kozhukattai holds its shape and comes cleanly away from the plate.',
        },
      ],
      offering:
        'Offered in odd numbers to Vinayaka at Vinayaka Chaturthi, along with chana sundal, vada and fruit. The first piece is placed before the deity before anything else is eaten.',
      ritual: [
        'Prepare the kozhukattai after bathing, in a clean kitchen, and keep the first batch aside for the deity before tasting.',
        'Arrange an odd number — commonly 5, 11 or 21 — of sweet kozhukattai on a clean banana leaf or plate, together with fruits, a whole coconut and sundal on a separate plate, in front of Vinayaka.',
        'Light a lamp with sesame or ghee, offer incense and flowers, and sprinkle a few drops of water around the plate as the naivedya is dedicated with the chant of Vinayaka’s name.',
        'Keep the plate before the idol for a few minutes with the doors or curtain closed if your family follows that practice, then perform the aarti with camphor — use only edible camphor (pachai karpooram) if a drop is placed in prasad water.',
        'After the aarti, distribute the kozhukattai: first to the elders, then to children, then to guests and neighbours, and finally to the household members who prepared it.',
      ],
      serving:
        'Serve the sweet kozhukattai warm, plain or with a dab of ghee. In Tamil homes they are served alongside uppu kozhukattai (the savoury version), chana sundal, medu vada and payasam as part of the Vinayaka Chaturthi meal. Allow 2–3 pieces per person.',
      storage:
        'Best eaten the same day. Cooked kozhukattai keep 1 day at room temperature in a covered steel container and 2 days in the refrigerator; re-steam for 5 minutes. Uncooked shaped dumplings can be frozen on a tray, bagged, and steamed from frozen for 15 minutes.',
      troubleshooting: [
        {
          problem: 'The dough is sticky and will not hold a shape',
          fix: 'Too much water was used or the flour was not roasted. Add a tablespoon of dry roasted rice flour and knead again, or cook the dough on low heat for another minute to dry it out.',
        },
        {
          problem: 'The shell is thick and tough',
          fix: 'Press the dough thinner when forming the cup — aim for about 2–3 mm walls. A thick shell stays doughy in the middle even after steaming.',
        },
        {
          problem: 'The pooranam is too wet and leaks',
          fix: 'The filling needs a few more minutes on the stove. Cook until a spoonful holds its shape on a plate, or add a spoon of roasted rice flour to bind it.',
        },
        {
          problem: 'The kozhukattai crack on top during steaming',
          fix: 'The seam was not sealed or the dough was dry. Moisten your fingertips and smooth the seam before steaming, and cover the unused dough with a damp cloth.',
        },
      ],
      variations: [
        'Uppu kozhukattai (savoury): cook the dough as above, shape it into small ovals without filling, and steam. Toss the cooked pieces in a tempering of 1 tsp oil, mustard seeds, urad dal, curry leaves, green chilli and grated coconut.',
        'Karnataka kadubu: the shell is similar; many households fill it with coconut-jaggery only and steam the dumplings wrapped in banana or jackfruit leaves, which add a subtle fragrance. Sesame seeds are sometimes added to the filling.',
        'Kerala modakam: Kerala families often add roasted sesame and cumin to the filling and shape the dumplings like the Tamil modhagam; nei (ghee) is poured over before eating.',
        'Fasting (vrat) adaptation: use sama (barnyard millet) flour in place of rice flour for the shell and omit the chana dal in the filling, using extra coconut instead.',
        'Vegan: replace ghee in the filling with coconut oil. The recipe contains no other animal products.',
        'Jaggery substitute: in a pinch, use palm jaggery (karuppatti) for a deeper, more caramel-like flavour, which is especially popular in southern Tamil Nadu.',
      ],
      tips: [
        'Use jaggery that is clean and unadulterated; strain it before adding to the filling.',
        'If you cannot find kozhukattai flour, wash and soak raw rice, dry it, roast lightly and grind to fine powder.',
        'The salted savoury version (uppu kozhukattai) is made with a tempering of urad dal, mustard and coconut; it is a common second offering.',
        'Keep your hands lightly oiled — water makes the dough sticky, but a thin film of sesame oil keeps it manageable.',
        'Do not over-fill. A heaped tablespoon is the maximum, or the seam will split.',
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
      story:
        'In Goa and along the Konkani coast of Karnataka, Ganesh Chaturthi is called Chavath, and it is the biggest family festival of the year. The festive table is built on the produce of the region: rice, coconut, jaggery and, above all, the leaves of the turmeric plant, which grow wild in the monsoon. The patoli (also written patholi or patoleo) is the sweet that captures this season. A thin batter of ground rice is spread over a fresh turmeric leaf, spread with a filling of coconut and jaggery, folded and steamed. The leaf perfumes the rice and the filling with a mild, haldi-like fragrance that cannot be reproduced any other way.\n\nPatoli is not made only for Ganesha. In several Konkani communities it is also made on Nag Panchami and on other monsoon festivals, and in the Chavath tradition the matoli — a decorated wooden canopy hung above the idol — is hung with seasonal fruits, vegetables and leaves, among them bunches of fresh turmeric leaves. The offering of patoli therefore ties together the harvest, the monsoon and the idol.\n\nNevri (also called neureos in Goa) is the other sweet of Chavath: a half-moon pastry of rice flour or maida, filled with a similar coconut-jaggery mixture and deep-fried. While patoli is steamed, soft and fragrant, nevri is crisp and keeps well, which is why it is often prepared in advance and given to guests and neighbours who visit during the festival days.',
      serves: '10–12 pieces',
      prep: '45 min',
      cook: '20 min',
      equipment: [
        'Steamer with a rack — the leaf-wrapped rolls are laid flat and need space for steam to circulate; a large idli steamer or kadai with a trivet works.',
        'Stone or wet grinder, or a high-speed blender — to grind soaked rice into a smooth, thick batter without heating it.',
        'Heavy-bottomed pan — for cooking the coconut-jaggery filling without scorching.',
        'Large bowl of water and clean cloth — to wash and dry the turmeric leaves, which must be dry or the batter slips off.',
        'Back of a spoon or a small offset spatula — to spread the thin batter evenly over the leaf.',
      ],
      ingredients: [
        {
          group: 'Batter',
          items: [
            '1 cup (190 g) raw rice, soaked for 3 hours — use a short- or medium-grain raw rice (not basmati); it grinds to a smooth, slightly sticky batter. Alternatively, 1 cup (150 g) fine rice flour for a quicker batter.',
            '1/2 tsp (3 g) salt — seasons the batter; without it the sweet filling tastes flat.',
            'Water as needed, about 1/4–1/2 cup — add a tablespoon at a time; the batter must be thick like a dosa batter that coats a spoon, not runny.',
            '10–12 fresh turmeric leaves — buy from a farmers’ market or a Konkani grocer in the monsoon; wash and wipe dry. If unavailable, use banana leaf cut in 8-inch squares (less fragrant but works).',
          ],
        },
        {
          group: 'Filling',
          items: [
            '1 cup (90 g) grated fresh coconut — fresh and juicy gives the best taste and texture; do not substitute dried coconut.',
            '3/4 cup (150 g) grated jaggery — use soft golden jaggery; Goan cooks often use palm jaggery (gur from the coconut or palm) for a deeper flavour.',
            '1/2 tsp (1 g) cardamom powder — adds fragrance; some families add a pinch of nutmeg too.',
            'A pinch of salt — enhances the sweetness of the coconut.',
          ],
        },
      ],
      mise: [
        'Soak the rice in water for 3 hours (or overnight) so that it grinds smoothly; drain it before grinding.',
        'Wash the turmeric leaves, trim any tough stalk ends, and wipe each leaf completely dry; a wet leaf will not hold the batter.',
        'Put the water in the steamer to boil and grease the rack lightly with coconut oil.',
        'Cook and cool the coconut-jaggery filling before you start spreading the batter.',
        'Keep a small bowl of water and a spoon at the work surface; you will need to wet your fingertips to smooth the batter.',
      ],
      method: [
        {
          title: 'Grind the batter',
          text: 'Drain the soaked rice and grind it with the salt and a few tablespoons of water in a stone grinder or a blender for 3–4 minutes, scraping down the sides, until it is smooth and thick with only a faint grain when rubbed between your fingertips. Add water sparingly — 1 tablespoon at a time.',
          why: 'The batter must be thick enough to cling to the leaf and cook into a firm layer; a thin batter runs off the leaf and cooks into a sloppy, uneven sheet.',
          cue: 'the batter falls off a spoon in a thick ribbon and holds a shape for a few seconds before slowly spreading.',
        },
        {
          title: 'Cook the filling',
          text: 'In a heavy pan, combine the grated coconut and jaggery. Cook on low heat, stirring constantly, for 6–8 minutes until the jaggery melts and the mixture becomes sticky and moist but not wet. Stir in the cardamom and salt, remove from the heat and let it cool completely.',
          why: 'Cooking the jaggery into the coconut prevents it from running out of the leaf parcel during steaming.',
          cue: 'the filling clumps together when pressed and no syrup pools in the pan.',
        },
        {
          title: 'Prepare the leaves',
          text: 'Place a washed, dried turmeric leaf on a clean plate with the shiny side facing down and the underside, where the central rib is raised, facing up. Spread out all the leaves so they are ready; if a leaf is very long, trim it to about 8 inches.',
          why: 'The batter sticks better to the matte, underside of the leaf, and a flat leaf makes spreading easier.',
          cue: 'the leaf lies flat without curling and is completely dry to the touch.',
        },
        {
          title: 'Spread the batter',
          text: 'Put 2–3 tablespoons of batter in the middle of the leaf. Using the back of a spoon or your wet fingers, spread it outward in a thin, even layer, about 2–3 mm thick, covering most of the leaf while leaving a 1/2-inch margin at the edges. Smooth any bumps with a wet fingertip.',
          why: 'An even, thin layer cooks through in the time it takes the leaf to steam, and creates a tender, flexible sheet that can be folded without cracking.',
          cue: 'the batter forms a smooth, even sheet with no gaps showing the leaf.',
        },
        {
          title: 'Fill and fold',
          text: 'Spoon 1–2 tablespoons of the filling in a line down the centre of the batter, parallel to the central rib. Fold one side of the leaf over the filling, then fold the other side over it so the edges meet. Press the edges lightly to seal them with the batter.',
          why: 'Folding encloses the filling so it steams in its own moisture; a gentle press seals the edges so the filling does not leak.',
          cue: 'the folded leaf looks like a neat, slim parcel with the filling not visible at the sides.',
        },
        {
          title: 'Steam the patoli',
          text: 'Arrange the folded leaves seam-side down in the steamer, in a single layer or with a leaf between each layer to prevent sticking. Steam over boiling water for 15–20 minutes on medium-high heat with the lid tightly closed.',
          why: 'The steam cooks the rice batter and releases the fragrance of the turmeric leaf into the sweet; underdone batter is pasty and raw-tasting.',
          cue: 'the leaf turns a deep olive-green, the kitchen smells strongly of turmeric and rice, and the batter inside is firm and cooked through when you open one parcel.',
        },
        {
          title: 'Rest and serve in the leaf',
          text: 'Switch off the heat and leave the parcels in the covered steamer for 2 minutes. Lift out with tongs and serve hot, still in the leaf, with a teaspoon of ghee or coconut milk on the side. Each person peels the leaf away at the table.',
          why: 'Serving in the leaf preserves the aroma until the moment of eating and keeps the sweet warm.',
          cue: 'when you open a leaf, steam rises, the rice layer is soft and slightly translucent, and the filling is glossy.',
        },
        {
          title: 'Make nevri (optional, fried)',
          text: 'For nevri, mix 1 cup maida or rice flour with 2 tablespoons hot ghee, a pinch of salt and enough warm water to make a firm dough. Rest 30 minutes. Roll thin discs 4 inches wide, place a teaspoon of the same coconut-jaggery filling on one half, fold into a half-moon and crimp the edges with a fork. Fry in oil on medium-low heat for 4–5 minutes until golden.',
          why: 'Nevri is the festive keeper — it is crisp and lasts for days, while patoli is soft and best eaten fresh. Frying on low heat cooks the dough through without burning the sugar.',
          cue: 'the nevri is golden-brown, crisp and sealed, with no filling leaking into the oil.',
        },
      ],
      offering:
        'Offered with ghee to Ganesha on the day of Chavath, along with the matoli canopy produce. Nevri is deep-fried at the same time as a second sweet.',
      ritual: [
        'Prepare the patoli and nevri after bathing, with the first of the batch set aside for the deity before anyone tastes it.',
        'Place the patoli — leaf and all — on a clean banana leaf or plate in front of the Ganesha idol with the nevri beside it, along with fruits, the matoli produce and a bowl of ghee.',
        'Light the lamp and incense. Offer the naivedya by sprinkling a few drops of water around the plate, folding your hands and saying Ganesha’s name, and keep the plate in front of the idol for a few minutes.',
        'After the aarti, open the first patoli and place a small portion at the idol’s feet as a final offering, then serve the rest as prasad, first to the elders, then to children and guests.',
        'Over the days of the festival, offer a freshly made batch each morning if your family follows the custom of daily naivedya.',
      ],
      serving:
        'Serve patoli hot, in the leaf, with a teaspoon of ghee or fresh coconut milk (nariyal ka doodh) on the side. Offer nevri on a plate with tea or milk. In a Goan or Konkani home the festival meal also includes sol kadhi, rice, vegetable preparations and several other sweets such as kheer and modak.',
      storage:
        'Patoli is best eaten the day it is made; it keeps for 1 day at room temperature in its leaves and 2 days in the refrigerator. Re-steam for 5 minutes. Nevri keeps for 2 weeks in an airtight tin at room temperature.',
      troubleshooting: [
        {
          problem: 'The batter slides off the leaf',
          fix: 'The leaf is wet or the batter is too thin. Wipe the leaf completely dry, and thicken the batter by adding a tablespoon of rice flour or by grinding for a minute longer without adding water.',
        },
        {
          problem: 'The batter cracks or breaks when folding',
          fix: 'The layer was too thick or was folded after cooling. Spread it thinner (2–3 mm) and fold immediately after filling, while the batter is still fresh and pliable.',
        },
        {
          problem: 'The filling leaks out during steaming',
          fix: 'The filling was too wet or the edges were not pressed together. Cook the filling until it is clumpy and cool it fully. Press the edges firmly or tuck the folded ends underneath.',
        },
        {
          problem: 'The nevri open up in the oil',
          fix: 'The edges were not sealed or the filling was overfilled. Moisten the dough edge with water before crimping and use just 1 teaspoon of filling.',
        },
      ],
      variations: [
        'Banana-leaf patoli: if turmeric leaves are not available, use banana leaf cut in 8-inch squares, singed briefly over a flame to make them pliable. The flavour is milder but the method is identical.',
        'Rice-flour patoli: if you do not have a grinder, mix 1 cup fine rice flour with 1/2 cup water and a pinch of salt to make a thick batter; let it rest for 10 minutes before spreading.',
        'Patoli with jackfruit: in some parts of Karnataka and Goa, ripe jackfruit pieces are added to the filling during the jackfruit season.',
        'Sesame filling: some families add 1 tablespoon of roasted sesame seeds to the coconut-jaggery filling for a nutty flavour.',
        'Vegan: replace ghee with coconut oil; the recipe is otherwise free of animal products. Jain households may skip the nevri because of the maida, but the patoli itself is fine.',
        'Fasting (vrat) adaptation: use sama flour or singhara flour for the batter, and sendha namak in place of salt.',
      ],
      tips: [
        'Turmeric leaves are the whole point — banana leaf is a substitute but lacks the perfume.',
        'For Nevri, roll a thin disc of a sweet dough (maida, ghee), fill, fold into a half-moon and deep fry on a medium flame.',
        'Dry the leaves completely, or the batter will not stick.',
        'Make a test patoli first and open it to check that the batter is cooked through.',
        'Wash the leaves just before use, as they wilt quickly once cut.',
      ],
      differs: 'Leaf-wrapped steamed rice roll, not a dumpling.',
    },
  ],
}

export default recipe
