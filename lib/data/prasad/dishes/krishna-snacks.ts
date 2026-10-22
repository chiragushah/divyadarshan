import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'krishna-snacks',
  name: 'Gokulashtami Snacks',
  alsoCalled: 'Seedai · Murukku · Chakli · Aval · சீடை',
  category: 'Savoury',
  summary: 'Seedai, murukku and sweet aval — the South Indian Janmashtami offerings.',
  meaning:
    'In the South, Krishna Janmashtami is called Gokulashtami (Krishna Jayanthi), and the offering is not a grand sweet but a tray of crunchy fried snacks and simple sweetened flattened rice. The reason is affectionate: Krishna is the little boy of Gokul who loved butter and snacks, and the food offered to him is the kind a child would reach for — crisp seedai, a ring or spiral of murukku, a handful of sweet aval, a spoon of butter. Tamil homes draw tiny footprints with rice-flour paste from the doorstep to the puja room, inviting the baby Krishna in, and set the plate of seedai, thattai, murukku and vella aval before him. Karnataka’s Madhva households, especially around Udupi, offer chakli, kodubale and sweet avalakki, with the next day marked by Vittal Pindi and the curd-pot festival. The snacks are made a day or two ahead, which frees the festival day for fasting, prayer and the midnight puja.',
  variants: [
    {
      id: 'tamil-seedai',
      region: 'Tamil Nadu',
      culture: 'Tamil households — Gokulashtami',
      title: 'Uppu Seedai and Vella Aval',
      intro:
        'Seedai are crunchy marble-sized balls of rice flour and urad dal flour; vella aval is flattened rice mixed with jaggery, coconut and cardamom.',
      story:
        'Seedai is the signature Gokulashtami snack of Tamil Nadu. Small, round and pale gold, it is made from freshly roasted rice flour, a little urad dal flour, butter, cumin, sesame and bits of coconut. On Krishna Jayanthi, families make uppu (salted) seedai and vella (jaggery) seedai, along with thattai, murukku and sweet aval, and arrange them on a plate before a small image of the baby Krishna with his feet drawn in kolam flour. A spoon of fresh white butter and a bowl of milk or curd complete the offering.\n\nThe food is deliberately child-like: seedai are the size of a marble, easy for small hands, and the story goes that Krishna would eat them in handfuls. Grandmothers teach that the secret of good seedai is patience with the dough — it must be stiff, smooth and thoroughly kneaded, and the flour must be roasted so that no raw moisture remains. Seedai that burst in the oil are an old kitchen worry, and the stories about it are as much a part of the festival as the snacks.\n\nVella aval is the soft counterpart: thick flattened rice tossed in a jaggery syrup with coconut and cardamom. It needs no frying and no fire for more than a few minutes, and it is eaten as prasad by everyone, children first. Together, the crisp seedai and the soft aval are the two textures of Tamil Gokulashtami.',
      serves: '6 servings (about 40 seedai and 2 cups aval)',
      prep: '40 min',
      cook: '35 min',
      equipment: [
        'Heavy, deep kadai or iron wok, 25–28 cm — holds oil at an even temperature; a thin pan makes it spike and burst the seedai',
        'Wire-mesh frying spoon (skimmer) — lifts seedai out without trapping oil, and stirs gently',
        'Dry cotton cloth or clean steel tray — to dry the rolled seedai before frying',
        'Splatter screen (optional but sensible) — seedai can pop; keep your face and arms back while frying',
        'Heavy-bottomed small pan — for the jaggery syrup so it does not scorch',
      ],
      ingredients: [
        {
          group: 'Uppu seedai (makes about 40)',
          items: [
            '1 cup (about 150 g) fine rice flour — preferably home-ground from raw rice that was washed and dried in shade; packet flour works if fine and fresh',
            '2 tbsp (about 20 g) urad dal flour — dry-roast whole white urad dal until golden, cool and grind to a fine powder; it makes the seedai crisp inside',
            '1 tbsp (15 g) soft unsalted butter — gives tenderness; use ghee if you prefer, but butter is traditional for Krishna',
            '1 tsp cumin seeds — gives flavour and aids digestion',
            '1 tsp white sesame seeds — adds a nutty fragrance',
            '2 tbsp finely chopped or grated fresh coconut — small pieces only, about 3 mm; large chunks make seedai burst',
            '1/2 tsp salt, or to taste — dissolve in the water so it spreads evenly',
            '1/4 cup (60 ml) warm water, plus more as needed — add gradually; the dough should be stiff',
            'Oil for deep frying (about 500 ml) — sunflower or groundnut, which have a high smoke point and clean taste',
          ],
        },
        {
          group: 'Vella aval (sweet flattened rice)',
          items: [
            '1 cup (about 70 g) thick aval (poha) — the thick red or white variety; thin aval dissolves into paste',
            '1/2 cup (100 g) powdered jaggery — dark jaggery is stronger; use a mild golden jaggery for a gentler sweetness',
            '1/4 cup (25 g) fresh grated coconut — fresh gives a sweeter, softer finish',
            '1/2 tsp cardamom powder — freshly ground has the best perfume',
            '1 tbsp (15 g) ghee — adds shine and richness',
            '1 tbsp cashews, broken, optional — fry in ghee until golden for crunch',
            '2 tbsp water — used to melt the jaggery',
          ],
        },
      ],
      mise: [
        'Wash raw rice, drain, and dry on a cloth in the shade for 30–40 minutes until just dry to touch, then grind to a very fine flour and sieve if you are making your own. Dry-roast the urad dal and grind it.',
        'Roast the rice flour for 3–4 minutes on low heat in a dry pan, stirring constantly, until it is warm and smells fragrant but has not changed colour; let it cool completely.',
        'Sift the cooled rice flour and urad flour together twice to remove lumps; lumps cause seedai to burst.',
        'Soften the butter at room temperature; chop the coconut finely; dissolve the salt in the warm water.',
        'Have a clean tray lined with newspaper and kitchen paper for the fried seedai, and a clean cloth for drying the dough balls.',
      ],
      method: [
        {
          title: 'Mix the dry ingredients',
          text: 'In a wide bowl, combine the sifted rice flour and urad dal flour with the cumin, sesame seeds and the finely chopped coconut. Add the soft butter and rub it into the flour with your fingertips for about two minutes until the mixture resembles fine breadcrumbs and holds together when squeezed.',
          why: 'Rubbing in the butter coats the flour in fat, which makes seedai crisp and short rather than hard. Skipping this makes them dense and likely to burst.',
          cue: 'a handful squeezed in your fist holds its shape, then crumbles easily when poked.',
        },
        {
          title: 'Knead a stiff dough',
          text: 'Add the salted warm water a tablespoon at a time, working the mixture with your hand. Use only as much as needed to bring it together into a firm, smooth dough, about 4–5 tablespoons. Knead for 2–3 minutes, pressing with the heel of your hand. The dough should be much stiffer than chapati dough and should not stick to your fingers.',
          why: 'A soft or wet dough traps steam inside the ball, which is the commonest reason seedai burst in the oil. A stiff dough lets moisture escape evenly.',
          cue: 'the dough is smooth, slightly crumbly at the edges when pressed, and does not leave dough on your palm.',
        },
        {
          title: 'Roll into marbles',
          text: 'Pinch off a small piece of dough and roll it between your palms into a smooth, crack-free ball about 1.5 cm across, the size of a large marble. Press out any air by rolling firmly. Place the balls in a single layer on a clean cotton cloth. Cover the dough you are not using with a damp cloth so it does not dry.',
          why: 'Cracks and air pockets are where oil enters or steam escapes explosively. Smooth, firm balls fry evenly.',
          cue: 'each ball is smooth and round with no visible cracks, and it does not flatten when set down.',
        },
        {
          title: 'Dry the seedai',
          text: 'Leave the rolled seedai uncovered on the cloth for 10–15 minutes, in a breezy corner of the kitchen. Turn them once. This lets the surface skin dry slightly before frying.',
          why: 'A dry surface prevents the balls from absorbing too much oil and helps the shell set, reducing the chance of bursting.',
          cue: 'the surface looks matte, and a ball feels firm and dry rather than tacky.',
        },
        {
          title: 'Heat the oil and test it',
          text: 'Pour the oil into the kadai and heat it on medium for about 4–5 minutes, then lower the flame to medium-low. Test by dropping in a pinch of dough: it should sink, then rise slowly to the surface with small bubbles, not shoot up immediately. If it rises instantly and browns, the oil is too hot; wait a minute and test again.',
          why: 'Seedai need gentle heat so the inside cooks as the outside crisps. Oil that is too hot browns the shell while the centre stays raw, then pops.',
          cue: 'the test pinch rises to the top within 4–5 seconds, surrounded by a steady, gentle stream of bubbles.',
        },
        {
          title: 'Fry in small batches',
          text: 'Slide in 8–10 seedai at a time, standing back and keeping a splatter screen nearby. Fry on medium-low heat, stirring gently with a skimmer every 30 seconds so they brown evenly, for 8–10 minutes. Do not overcrowd the pan. Lift one out and break it open to check that the centre is cooked.',
          why: 'Overcrowding lowers the oil temperature and makes the seedai greasy. Slow frying allows moisture to escape and gives them their characteristic crunch.',
          cue: 'the bubbling slows to a gentle fizz, the seedai turn golden, and they sound hollow and crisp when tapped with the skimmer.',
        },
        {
          title: 'Drain and cool',
          text: 'Lift the seedai out with the skimmer, drain for a few seconds against the side of the pan and spread them on kitchen paper. Cool completely, at least 20 minutes, before storing or offering. They firm up and become crunchier as they cool.',
          why: 'Steam trapped in a hot container makes them soft. Cooling fully in the open keeps them crisp for days.',
          cue: 'a cooled seedai snaps cleanly with a crisp, dry crumb and no oily feel.',
        },
        {
          title: 'Melt the jaggery',
          text: 'For the vella aval, put the powdered jaggery in a small pan with 2 tablespoons of water. Warm it on low heat, stirring, for 2–3 minutes until the jaggery dissolves completely into a syrup. Strain through a fine sieve to remove any grit, return to the pan and simmer for 1–2 minutes until slightly thickened. Switch off and cool for 5 minutes.',
          why: 'Jaggery often contains sand and fibres. Straining keeps the aval clean, and a thicker syrup coats the flakes rather than soaking them.',
          cue: 'the syrup coats the back of a spoon and drips off in a slow ribbon.',
        },
        {
          title: 'Mix the aval',
          text: 'Place the aval in a bowl and sprinkle it with 2 tablespoons of water; leave it for 3–4 minutes to soften slightly. Add the jaggery syrup, coconut, cardamom and ghee, and the ghee-fried cashews if using. Fold gently with a spoon for 20–30 seconds until every flake is coated. Taste and add a little more jaggery if needed.',
          why: 'Aval is dry and absorbs liquid; a brief sprinkle softens it so the syrup coats evenly without making the dish soggy.',
          cue: 'the flakes are glossy, soft but distinct, and the mixture clumps lightly when pressed.',
        },
      ],
      offering:
        'Offered on the evening of Gokulashtami at the puja, with butter, fruit and murukku, in front of the baby Krishna’s tiny footprints.',
      ritual: [
        'Before the puja, draw tiny footprints with rice-flour paste (kolam podi) from the front door to the puja room, representing the baby Krishna’s feet entering the home.',
        'Arrange the seedai, thattai, murukku, vella aval, fruit, a small bowl of fresh butter and a bowl of milk or curd on a clean plate or banana leaf in front of the Krishna idol or picture.',
        'Light the lamp, offer incense and flowers (tulsi, jasmine), and recite the Krishna ashtothram or sing Krishna bhajans; many families also read the story of Krishna’s birth.',
        'Offer the food with a tulsi leaf and a sprinkle of water around the plate, saying the family’s prayer; at midnight in some homes an additional arghya and aarti is performed.',
        'After the offering, distribute the seedai and aval first to children, then to elders, relatives and neighbours, in small plates or leaf cups. Eating from the offering ends the day’s fast.',
      ],
      serving:
        'Serve a few seedai and a spoonful of aval together on a leaf plate, with a small piece of fruit. The seedai are crisp; the aval is soft and sweet. Both are eaten with the right hand, and are offered to all visitors on Krishna Jayanthi.',
      storage:
        'Store completely cooled seedai in an airtight steel container; they keep crisp for 2–3 weeks at room temperature. Vella aval is best eaten the same day; it keeps up to 24 hours in a covered container in a cool place, though the aval softens with time.',
      troubleshooting: [
        {
          problem: 'The seedai burst in the oil',
          fix: 'The dough was too soft, lumpy flour was used, air was trapped inside, or the oil was too hot. Sift the flour twice, add less water, roll firmly, dry the balls and fry on medium-low.',
        },
        {
          problem: 'The seedai are hard and not crisp',
          fix: 'There was too little butter or too much water. Rub butter in thoroughly and keep the dough stiff; fry slowly until the bubbling nearly stops.',
        },
        {
          problem: 'The seedai are oily',
          fix: 'The oil was not hot enough, or the pan was crowded. Maintain a steady medium-low heat and fry in small batches.',
        },
        {
          problem: 'The aval turns mushy',
          fix: 'Thin aval was used or it was soaked in water. Use thick aval and only sprinkle it with water; add the syrup while it is warm but not hot.',
        },
      ],
      variations: [
        'Vella seedai: omit the cumin and salt, and knead the dough with jaggery syrup (1/3 cup jaggery boiled with 1/4 cup water, cooled) instead of water; add cardamom. This is the sweet seedai made alongside the salted one.',
        'Murukku: the other Gokulashtami staple. Mix 1 cup rice flour with 2 tbsp urad flour, 1 tsp butter, 1 tsp sesame, 1/2 tsp cumin and salt, knead a soft dough with warm water and press through a star-shaped murukku mould directly into hot oil in spirals; fry on medium heat until the sizzling stops.',
        'Thattai: flatten small discs of seedai dough mixed with soaked chana dal and chilli powder and fry; a crisper, flatter cousin.',
        'For an egg-free, vegan version, replace the butter with coconut oil in the seedai; the offering to Krishna traditionally uses butter, so make that choice according to family custom.',
        'Gluten-free and vrat-friendly: the recipe is naturally gluten-free. Many families fast until midnight and break the fast with the seedai and aval; there is no onion or garlic in either.',
      ],
      tips: [
        'The dough must be stiff, and the flour must be roasted and sifted; these two points prevent most seedai failures.',
        'Always fry seedai on medium-low heat and keep your face away from the pan; a splatter screen is sensible.',
        'Let the seedai cool completely before storing, otherwise they become soft.',
        'Make the snacks a day or two before Gokulashtami so you can focus on the puja itself.',
      ],
    },
    {
      id: 'karnataka-chakli',
      region: 'Karnataka (Udupi)',
      culture: 'Udupi Madhva Brahmin households — Krishna Janmashtami',
      title: 'Chakli (Kodubale) and Sihi Avalakki',
      intro:
        'Udupi’s offering for Krishna is chakli (spiral rice-lentil snack) and sweet beaten rice with jaggery and coconut.',
      story:
        'Udupi is one of the great centres of Krishna worship, home to the Sri Krishna Matha established by Madhvacharya, and Krishna Janmashtami there is celebrated over two days. The first day, with its midnight arghya, is kept in homes with fasting and puja. The next day, called Vittal Pindi, is the festival of the curd-pot breaking and the Krishna Leelotsava, when costumed participants known as Huli Vesha and others take to the streets. Many Madhva Brahmin households in the region prepare a plate of homemade snacks for the offering, and chakli, kodubale, laddu and avalakki are common features.\n\nChakli is the Kannada-speaking region’s name for the spiral fried snack, made from rice flour with a little roasted gram (hurigadale) powder, sesame, cumin and butter. Its ring-shaped cousin, kodubale, is rolled by hand into small rings and is crunchier and denser. Both are fried and stored, so they can be made a few days in advance.\n\nSihi avalakki, literally “sweet beaten rice”, is the quick, soft companion: thick poha mixed with jaggery syrup, fresh coconut and cardamom. It is a very old and common offering to Krishna, who in the Bhagavata story is gladdened by a handful of beaten rice brought by his friend Sudama. Offering avalakki to Krishna is therefore both a snack and a gesture of devotion, and for this reason many Karnataka homes make it on Janmashtami.',
      serves: '6 servings (about 25 chakli and 2 cups avalakki)',
      prep: '45 min',
      cook: '40 min',
      equipment: [
        'Chakli press (sev/murukku press) with a star-shaped disc — the traditional tool; a piping bag with a large star nozzle is a poor but workable substitute',
        'Heavy, deep kadai, 25–28 cm — keeps oil temperature steady for even frying',
        'Skimmer or slotted spoon — lifts chakli without breaking the spirals',
        'Greased flat plate or sheet of parchment — surface on which the spirals are pressed before frying',
        'Muslin cloth and steamer, optional — to steam the rice flour for the smoothest dough',
      ],
      ingredients: [
        {
          group: 'Chakli (makes about 25)',
          items: [
            '1 cup (about 150 g) fine rice flour — use fresh, fine flour; coarse flour makes brittle chakli',
            '1/4 cup (30 g) roasted gram (hurigadale) powder — gives nuttiness and structure; dry-roast fried gram lightly and grind to powder',
            '1 tsp white sesame seeds — adds fragrance and crunch',
            '1/2 tsp cumin seeds — flavour and digestion',
            '1/4 tsp asafoetida (hing) — adds depth; skip for strict hing-free households',
            '1/2 tsp red chilli powder, optional — mild heat; use a mild variety for children',
            '1 tbsp (15 g) soft butter or hot oil — makes the chakli short and crisp',
            '3/4 tsp salt, or to taste — dissolve in the water for even seasoning',
            'About 1/3 cup warm water — add gradually until the dough is soft but not sticky',
            'Oil for deep frying (about 500 ml) — coconut oil is the coastal Karnataka choice; sunflower or groundnut oil also works',
          ],
        },
        {
          group: 'Sihi avalakki',
          items: [
            '1 cup (about 70 g) thick avalakki (poha) — thick red or white; thin poha turns to paste',
            '1/2 cup (100 g) jaggery, powdered — strains out grit; dark jaggery gives a stronger flavour',
            '1/4 cup (25 g) fresh grated coconut — fresh coconut gives a soft, sweet finish',
            '1/2 tsp cardamom powder — freshly ground for the best aroma',
            '1 tbsp (15 g) ghee — for shine and richness',
            '2 tbsp water — to melt the jaggery',
            '1 tbsp roasted peanuts or sesame, optional — adds crunch and nutrition',
          ],
        },
      ],
      mise: [
        'Steam or dry-roast the rice flour: steam it in a muslin cloth for 10 minutes, or roast in a dry pan on low heat for 3–4 minutes until warm and fragrant. Cool and sift it.',
        'Dry-roast the fried gram, cool and grind to a fine powder; sieve it together with the rice flour.',
        'Grease the chakli press and plate lightly with oil; fit the star-shaped disc and check it fits tightly.',
        'Strain the jaggery syrup ingredients ahead: powder the jaggery and keep the coconut, cardamom and ghee ready within reach.',
      ],
      method: [
        {
          title: 'Prepare the flour',
          text: 'Use the steamed or dry-roasted rice flour, cooled and sifted. Sift the rice flour and the roasted gram powder together twice into a wide bowl. This takes only a minute but removes lumps and aerates the mixture so the dough is smooth.',
          why: 'Raw, damp or lumpy flour makes chakli that burst or taste raw. Roasting or steaming drives out moisture and makes the dough easier to press.',
          cue: 'the flour feels powdery and light between your fingers, with no lumps or damp patches.',
        },
        {
          title: 'Add the flavourings and butter',
          text: 'Add the sesame, cumin, hing, chilli powder and salt to the flour. Add the soft butter or hot oil and rub it in with your fingertips for 1–2 minutes until the mixture looks like moist breadcrumbs and holds together when squeezed.',
          why: 'Fat worked into the flour makes the chakli crisp and light rather than hard and tooth-breaking.',
          cue: 'a fistful of flour holds its shape when squeezed and crumbles when pressed lightly.',
        },
        {
          title: 'Knead a soft, smooth dough',
          text: 'Sprinkle in warm water a tablespoon at a time, mixing with your hand, until the flour comes together into a soft, smooth dough, around 5–6 tablespoons. Knead for 2 minutes. The dough should be softer than a stiff chapati dough but should not stick to your hands. Cover with a damp cloth.',
          why: 'If the dough is too stiff, it will not pass through the press; too soft, and the spirals collapse and absorb oil.',
          cue: 'a small piece rolled between palms forms a smooth rope without cracks.',
        },
        {
          title: 'Fill the press',
          text: 'Grease the inside of the chakli press lightly, fit the star-shaped disc, and pack in a log of dough, filling about two-thirds of the barrel without leaving air pockets. Close and screw the lid until it is snug.',
          why: 'Air pockets cause the dough to break in the middle of a spiral and the oil to spit when the chakli is fried.',
          cue: 'a little dough just emerges from the holes when you press, and it comes out in a smooth, ridged rope.',
        },
        {
          title: 'Press spirals onto a plate',
          text: 'Hold the press over a greased plate or parchment sheet and press out the dough in a spiral, starting from the centre and winding outward in 2–3 turns, then pinch the end to seal. Make 5–6 spirals per plate. For kodubale, instead roll a small piece of dough into a pencil-thick rope about 12 cm long, shape it into a ring and press the ends together.',
          why: 'Pressing onto a plate rather than directly into oil gives you control; sealed ends stop the spiral unwinding in the oil.',
          cue: 'each spiral has an even thickness with clean ridges and no breaks.',
        },
        {
          title: 'Heat the oil gently',
          text: 'Heat the oil in the kadai on medium for 4–5 minutes, then reduce to medium-low. Test it with a small pinch of dough: it should rise to the surface in 3–4 seconds with a steady sizzle, not shoot up at once. The temperature should be about 170°C.',
          why: 'Hot oil browns the outside before the inside dries out, leaving chewy centres; oil that is too cool makes greasy chakli.',
          cue: 'a pinch of dough sinks, then rises within a few seconds and surrounds itself with small bubbles.',
        },
        {
          title: 'Fry until the sizzling stops',
          text: 'Slide 3–4 chakli into the oil, gently lifting them from the plate with a flat spatula. Fry on medium-low heat for 4–5 minutes, turning once with the skimmer, until golden. Listen to the oil: the vigorous sizzle will quieten as the moisture leaves. Remove when the bubbles have nearly stopped.',
          why: 'The cessation of bubbles shows that the water has gone from the dough; this is the sign of a crisp, shelf-stable chakli.',
          cue: 'the chakli are a uniform pale gold, rigid when lifted, and the bubbling has slowed to a whisper.',
        },
        {
          title: 'Drain and cool the chakli',
          text: 'Lift each chakli out, drain for a few seconds and place on kitchen paper in a single layer. Let them cool completely for 20–30 minutes before storing. They crisp further as they cool.',
          why: 'Storing warm chakli traps steam and makes them soggy within a day.',
          cue: 'a cooled chakli breaks with a sharp snap and a clean, dry crumb.',
        },
        {
          title: 'Make the jaggery syrup and mix the avalakki',
          text: 'For the sihi avalakki, melt the powdered jaggery with 2 tablespoons of water on low heat for 2–3 minutes, strain through a fine sieve and simmer for 1–2 minutes until slightly thick. Sprinkle 2 tablespoons of water over the avalakki and let it rest for 3 minutes. Add the syrup, coconut, cardamom and ghee to the avalakki and fold gently for 30 seconds until every flake is coated. Add the peanuts or sesame if using.',
          why: 'A brief sprinkle of water softens the avalakki without making it soggy, and straining the jaggery removes grit.',
          cue: 'the flakes are glossy, soft but individual, and hold together lightly when pressed into a mound.',
        },
      ],
      offering:
        'Offered at the Krishna temple at Udupi and in homes after the midnight arghya.',
      ritual: [
        'In the evening, prepare the Krishna puja space: clean the altar, place the idol or picture of Bal Krishna, and decorate it with flowers and tulsi garlands.',
        'Fast until the midnight arghya as per family custom; at moonrise or midnight, the arghya is offered to Krishna and the moon with milk, water and tulsi.',
        'Arrange the chakli, kodubale, sihi avalakki, fruits, butter and other sweets on a clean plate or banana leaf in front of the deity.',
        'Light the lamp, offer incense, and recite the Krishna ashtottara or Madhva stotras and sing Dasara padas; show the aarti and offer the naivedyam with tulsi and a sprinkle of water.',
        'Break the fast with the prasad. Distribute the chakli and avalakki to the family, neighbours and visitors; the next day, Vittal Pindi, families visit the Krishna temple and watch the curd-pot festivities.',
      ],
      serving:
        'Serve two or three chakli and a spoon of sihi avalakki on a banana leaf or small plate, with a piece of fruit. Chakli are also eaten with a cup of tea or coffee as the snack of the festival. They are crisp, so offer small pieces to children.',
      storage:
        'Store fully cooled chakli in an airtight steel or glass container; they stay crisp for 2–3 weeks. If they soften, warm them in a dry pan for 2 minutes and cool again. Sihi avalakki is best eaten the same day; it keeps up to 24 hours in a covered container in a cool place.',
      troubleshooting: [
        {
          problem: 'The chakli break while pressing',
          fix: 'The dough is too stiff or has dried out. Knead in a tablespoon of warm water, cover the dough and press only a small amount at a time.',
        },
        {
          problem: 'The chakli open up or unwind in the oil',
          fix: 'The ends were not sealed or the dough was too soft. Pinch the ends firmly together and keep the dough on the stiffer side.',
        },
        {
          problem: 'The chakli are hard, not crisp',
          fix: 'The dough had too little fat or the flour was too coarse. Add butter, use fine, sifted flour and fry slowly until the sizzle stops.',
        },
        {
          problem: 'The avalakki is soggy',
          fix: 'Thin avalakki or too much water was used. Choose thick avalakki, sprinkle rather than soak, and mix while the syrup is warm, not hot.',
        },
      ],
      variations: [
        'Kodubale: the ring-shaped cousin; roll each piece into a rope and join the ends into a ring. The dough often includes grated fresh coconut and a little chilli, which makes it crumblier.',
        'Some Udupi households add a spoonful of fresh grated coconut or chopped coriander to the chakli dough; others keep it plain for the offering.',
        'For a hing-free, Jain-friendly version, omit the asafoetida and use ajwain for digestion.',
        'Sihi avalakki can also be made with jaggery, coconut and a few drops of lemon juice, or with milk and sugar as a kheer-like avalakki payasa.',
        'Vegan: replace the butter with coconut oil in the chakli and use jaggery as given; both recipes are otherwise dairy-free except the ghee, which may be replaced with coconut oil.',
      ],
      tips: [
        'Steam or roast the rice flour; this one step prevents most failures.',
        'Press the dough only in small quantities and keep the rest covered; dough exposed to air dries quickly.',
        'Fry on medium-low heat; the aim is dryness inside, not speed.',
        'Practices differ between homes and mathas, so follow your family’s custom for what is offered and when.',
      ],
    },
  ],
}

export default recipe
