import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'gujiya',
  name: 'Gujiya',
  alsoCalled: 'Pedakiya · Karanji · Ghughra · गुजिया',
  category: 'Sweet',
  summary: 'Crescent-shaped fried dumplings stuffed with sweet khoya or coconut — the sweet of Holi and Diwali.',
  meaning:
    'Gujiya is the half-moon dumpling of north and west India: a thin, crisp shell wrapped around a sweet filling and deep-fried in ghee or oil. In Uttar Pradesh, Braj and Rajasthan it is the sweet of Holi, filled with roasted khoya and dry fruit. In Bihar it is called pedakiya, with a sturdier shell and semolina in the filling. In Maharashtra it is karanji, filled with fresh coconut, poppy seed and jaggery or sugar, and made for Diwali and Ganesh Chaturthi. The shaping is the same everywhere — a circle of dough, a spoon of filling, a sealed and crimped crescent — but the shell, the filling and the festival differ. The common secret is a stiff, well-rested dough with enough fat worked in, and a filling cooked completely dry, because a damp filling or a weak seal makes the gujiya burst in the hot fat. Choose the version that belongs to your own household and festival.',
  variants: [
    {
      id: 'braj-up',
      region: 'Braj & Uttar Pradesh',
      culture: 'Braj, Mathura and Awadh households — Holi',
      title: 'Mawa Gujiya',
      intro:
        'The classic Holi gujiya: a flaky, ghee-rich maida shell around dry-roasted khoya, sugar, nuts and cardamom. The filling is cooked until crumbly and the dumplings are fried slowly in ghee until pale gold.',
      story:
        'In the Braj region around Mathura and Vrindavan, and across Uttar Pradesh, gujiya is the sweet that announces Holi. Weeks before the festival the mithai shops fill their trays with it, and in homes the women of the family sit together on the days before Holika Dahan, rolling, filling and crimping dozens at a time. A plate of gujiya is offered to the deity, then carried to relatives and neighbours with the greeting of the season. In Braj, where Holi is played in honour of Radha and Krishna, the gujiya is offered with thandai and malpua.\n\nThe Braj gujiya is defined by two things. The shell is made of maida worked with a generous amount of ghee (moyan) until it resembles breadcrumbs, then kneaded into a stiff dough. That fat is what makes the fried shell blister and turn flaky and crisp rather than soft. The filling is khoya (mawa, milk solids) roasted slowly in ghee until it turns light golden and granular, then mixed with powdered sugar, chopped nuts, raisins, grated dry coconut and cardamom. It is cooked dry on purpose; a moist filling would steam inside the shell and burst it in the fat.\n\nThe edge is finished by hand with a pinched, twisted rope called gujiya ki kangni, or sealed with a fluted mould. Frying is done slowly on low to medium heat so that the shell cooks through, blisters gently and colours evenly. Fast frying gives a dark, hard gujiya with a raw core. Some families dip the cooled gujiya in thin sugar syrup for a glazed version, though the dry one is the Holi standard.',
      serves: '16 gujiyas',
      prep: '50 min',
      cook: '45 min',
      equipment: [
        'Heavy-bottomed kadai — holds steady frying heat; a thin pan swings hot and cold and the gujiyas brown unevenly.',
        'Wide pan or non-stick skillet — for roasting the khoya slowly without scorching the milk solids.',
        'Rolling pin and board — roll small circles of about 4 inches; a thin pin controls thickness better than a heavy one.',
        'Gujiya mould (optional) — a hinged plastic or brass press that shapes and seals in one press; fast and uniform, though hand-crimped edges are the traditional finish.',
        'Slotted spoon — to lift the gujiyas from the fat without breaking the delicate shell.',
        'Damp cloth — to cover the dough and the cut circles so they do not dry and crack at the seal.',
      ],
      ingredients: [
        {
          group: 'Shell',
          items: [
            '2 cups (260 g) maida (refined flour) — sifted; gives a crisp, blistered shell.',
            '1/4 cup (60 g) ghee, melted, for moyan — rubbed into the flour; this fat is what makes the shell flaky, so do not reduce it.',
            '1/4 tsp salt — brings out the sweetness of the filling.',
            'About 1/2 cup (120 ml) cool water — added gradually; the dough must be stiff, not soft.',
            'Ghee or refined oil for deep frying, about 500 ml — ghee is traditional and gives the best flavour.',
          ],
        },
        {
          group: 'Filling',
          items: [
            '250 g khoya (mawa), grated — use fresh, unsweetened khoya; hard or old khoya cooks grainy and dry.',
            '1 tbsp (15 g) ghee — for roasting the khoya so it does not stick.',
            '1/2 cup (60 g) powdered sugar — added after cooking so the filling stays dry; sugar added to hot khoya melts and makes it wet.',
            '2 tbsp (20 g) chopped almonds and cashews — adds crunch.',
            '2 tbsp (20 g) raisins — plump sweet notes; chop larger ones.',
            '2 tbsp (10 g) grated dry coconut — optional, toasted lightly for a nutty flavour.',
            '1/2 tsp (1 g) cardamom powder — freshly ground, the main aroma.',
            '1 tbsp (10 g) chironji (charoli) seeds, optional — a traditional Braj nut with a delicate almond note.',
          ],
        },
        {
          group: 'To seal',
          items: [
            '2 tbsp flour mixed with 3 tbsp water — a thin paste that glues the edges if water alone does not hold.',
          ],
        },
      ],
      mise: [
        'Grate the khoya at room temperature so it crumbles evenly; cold khoya clumps.',
        'Chop the nuts finely and slice the raisins, so the filling packs smoothly and does not tear the shell.',
        'Make the dough at least 30 minutes ahead, wrap it in a damp cloth and let it rest.',
        'Prepare the flour paste and a small bowl of water for sealing.',
        'Line a tray with a clean cloth for the finished gujiyas and keep the slotted spoon beside the kadai.',
      ],
      method: [
        {
          title: 'Rub the ghee into the flour',
          text: 'Mix the maida and salt in a wide bowl. Pour in the melted ghee and rub it into the flour with your fingertips for 3–4 minutes, lifting and letting the flour fall, until every grain is coated and the mixture holds together when squeezed in your fist and crumbles when pressed lightly.',
          why: 'The fat coats the flour and keeps the gluten short, so the fried shell turns flaky and blistered instead of tough and bread-like.',
          cue: 'a handful squeezed in your palm holds its shape and then breaks apart, like damp sand.',
        },
        {
          title: 'Knead a stiff dough and rest it',
          text: 'Add cool water a tablespoon at a time and knead for 6–8 minutes into a firm, smooth dough, stiffer than chapati dough. Press with the heel of your hand and fold. Cover with a damp cloth and rest for at least 30 minutes.',
          why: 'A stiff dough rolls thin without sticking and does not absorb too much fat in the kadai. Resting relaxes the gluten so the circles do not shrink back when rolled.',
          cue: 'the dough is smooth, firm and springs back slowly when pressed with a finger.',
        },
        {
          title: 'Roast the khoya',
          text: 'Heat 1 tbsp of ghee in a wide pan on low heat. Add the grated khoya and roast it for 8–10 minutes, stirring and scraping continuously, until it turns pale golden, loosens into granules and smells nutty. Do not let it brown deeply or it turns bitter.',
          why: 'Roasting drives off the moisture and cooks the milk solids so the filling stays dry and crumbly inside the shell.',
          cue: 'the khoya is granular, light golden and no longer sticks to the pan.',
        },
        {
          title: 'Cool and mix the filling',
          text: 'Transfer the roasted khoya to a plate and cool it completely, about 15 minutes. Mix in the powdered sugar, chopped nuts, raisins, coconut, chironji and cardamom. Rub gently with your fingers to combine without mashing.',
          why: 'Sugar added to hot khoya melts and makes the filling wet. Cooling first keeps it dry and loose so it will not leak.',
          cue: 'the filling is crumbly, holds loosely when squeezed and breaks apart again, with no wet patches.',
        },
        {
          title: 'Roll the circles',
          text: 'Divide the dough into 16 equal balls, each about the size of a walnut. Keep the rest covered. Roll one ball on a lightly oiled board into a thin circle about 4 inches across, rolling from the centre outward and turning it. Stack the circles under a damp cloth as you go.',
          why: 'A thin shell blisters and crisps; a thick one stays doughy. Keeping the circles covered stops the edges from drying, which causes cracks at the seal.',
          cue: 'each circle is thin, even and about the thickness of a coin, with no thick centre.',
        },
        {
          title: 'Fill and seal',
          text: 'Place one circle on your palm, put 1 heaped tablespoon of filling slightly off-centre, and moisten half the rim with water. Fold the circle over to form a half-moon, press the edges together from one end to the other pushing out all trapped air, and seal firmly. Trim with a cutter or crimp by folding and twisting the edge into a rope.',
          why: 'Trapped air expands in hot fat and bursts the gujiya. A moist, firmly pressed seal does not open during frying.',
          cue: 'the gujiya is a plump half-moon with a flat, evenly crimped edge and no gaps.',
        },
        {
          title: 'Fry slowly in ghee',
          text: 'Heat the ghee in a kadai on medium-low heat to about 150 to 160 degrees Celsius. To test, drop in a small pinch of dough; it should sink and rise slowly in 8–10 seconds. Fry 4–5 gujiyas at a time, turning gently, for 6–8 minutes until pale golden on both sides.',
          why: 'Low, steady heat cooks the shell through and blisters it gently. Hot fat browns the outside while the inside stays raw and chewy.',
          cue: 'small bubbles rise around each gujiya, the shell turns an even golden colour and sounds crisp when tapped with the spoon.',
        },
        {
          title: 'Drain and cool',
          text: 'Lift the gujiyas with the slotted spoon, hold them over the kadai for a few seconds to drain, and set them on a tray lined with a clean cloth or paper. Cool completely, about 30 minutes, before storing, so that the shells crisp up and no steam is trapped.',
          why: 'Cooling lets the shell set crisp. Packing warm gujiyas traps steam and makes them soft.',
          cue: 'the cooled gujiya feels dry and light and snaps when broken, with a flaky layered shell.',
        },
      ],
      offering:
        'Offered at Holi, placed before the household deity or Krishna with thandai and other sweets, and given to relatives and neighbours as prasad.',
      ritual: [
        'Make the gujiya after a bath, in a clean kitchen, and set the first batch aside for the deity before anyone tastes it.',
        'Place several gujiyas on a clean plate or leaf with other sweets, a small bowl of thandai or water, and fresh flowers before the household deity, or Radha and Krishna in Braj homes.',
        'Light a lamp and incense, sprinkle a little water around the plate, fold your hands and offer the naivedya with your family prayer.',
        'On Holika Dahan, offer a gujiya with grain and coconut to the fire after circling it three times, as your family custom directs.',
        'After the aarti, distribute the gujiya as prasad, beginning with the eldest, and share plates with neighbours and relatives when meeting for Holi.',
      ],
      serving:
        'Serve at room temperature as a sweet with tea, thandai or milk, on a plate with malpua, dahi bhalla and namkeen at a Holi gathering. Allow 2 gujiyas per person. Do not reheat; they are eaten crisp.',
      storage:
        'Store completely cooled gujiyas in an airtight steel box for 7–10 days at room temperature; in humid weather, refrigerate and bring to room temperature before serving. The filling keeps 3 days refrigerated. Raw filled gujiyas can be frozen for a month and fried straight from the freezer on low heat.',
      troubleshooting: [
        {
          problem: 'The gujiyas burst open in the ghee',
          fix: 'Air was trapped or the seal was weak, or the filling was damp. Press out air while sealing, moisten the rim, and cook the khoya dry and cool it before adding sugar.',
        },
        {
          problem: 'The shell is hard instead of flaky',
          fix: 'There was not enough ghee in the flour, or the dough was too soft or rolled too thick. Use the full amount of ghee, knead stiff and roll thin.',
        },
        {
          problem: 'The gujiyas are dark outside and raw inside',
          fix: 'The ghee was too hot. Fry on medium-low heat and test with a pinch of dough that rises slowly.',
        },
        {
          problem: 'The gujiyas absorb too much fat and feel greasy',
          fix: 'The ghee was not hot enough, or the pan was crowded. Maintain gentle but steady heat and fry in small batches.',
        },
      ],
      variations: [
        'Baked gujiya: brush with ghee and bake at 180 degrees Celsius for 20–25 minutes until golden; lighter but less blistered.',
        'Sugar-syrup gujiya: dip the cooled gujiyas for a few seconds in warm one-string syrup (sugar syrup that forms a single thread when a drop is pressed between thumb and finger), then dry on a rack.',
        'Suji-coconut filling: for a no-khoya version, roast 1/2 cup fine semolina in ghee and mix with 1 cup of grated dry coconut, sugar and cardamom.',
        'Fasting (vrat) adaptation: gujiya is made with wheat flour and is not eaten in strict fasts; offer a singhare-flour version only if your family tradition permits it.',
        'Vegan: replace ghee with refined oil in the dough and for frying, and use a coconut–nut filling in place of khoya.',
        'Jain-friendly: the recipe has no onion, garlic or root vegetables and suits Jain households as written.',
      ],
      tips: [
        'The filling must be dry and cool before it goes into the shell.',
        'Keep the circles under a damp cloth so the edges do not crack.',
        'Fry slowly on low heat; patience gives a flaky, evenly golden shell.',
        'Press out all air when sealing, or the gujiya will burst.',
        'Fry one test gujiya first to check the seal and the heat.',
      ],
      differs: 'Dry roasted khoya and nuts; flaky ghee shell.',
    },
    {
      id: 'bihar-pedakiya',
      region: 'Bihar',
      culture: 'Bihari households — Holi, Chhath',
      title: 'Pedakiya',
      intro:
        'Bihar’s pedakiya is a sturdier gujiya with a firmer, slightly thicker shell and a filling of roasted khoya mixed with semolina, nuts and cardamom. The shell is crisp but sturdy enough to travel and keep for days.',
      story:
        'In Bihar the stuffed fried dumpling is called pedakiya (also pidakiya), and it belongs to Holi and to the Chhath season, when sweets are made for offering and for gifting. Where the Braj gujiya is delicate and flaky, the Bihari pedakiya is robust: it is made to be packed in tins, carried on trains to relatives and eaten for days after the festival. The shell is thicker, the dough stiffer and the filling denser.\n\nThe key difference is the filling. Roasted khoya is mixed with fine suji (semolina) that has been toasted in ghee, along with chopped nuts, raisins, sugar and cardamom. The semolina binds the khoya and absorbs any stray moisture, giving a firm, grainy filling that does not leak and stays pleasantly crumbly for days. Some families add a little grated dry coconut or poppy seed.\n\nThe dough is made from maida with ghee (moyan) and often a spoonful of fine semolina worked in, then kneaded stiff and rested. The pedakiya is crimped with a twisted rope edge and fried slowly on low heat until deep golden. It is eaten as a festival sweet, offered to the deity and shared with neighbours. In many homes it is made in large batches, and a tin of pedakiya is a welcome gift.',
      serves: '18 pedakiyas',
      prep: '50 min',
      cook: '50 min',
      equipment: [
        'Heavy-bottomed kadai — for steady low-heat frying; a thin one gives uneven colour.',
        'Wide non-stick pan — to roast the khoya and semolina without sticking.',
        'Rolling pin and board — roll the shell slightly thicker than for Braj gujiya; a medium pin is enough.',
        'Round cutter or steel bowl of 4 inches — gives even circles when you do not want to roll each one separately.',
        'Slotted spoon — to lift pedakiyas out of the ghee gently.',
      ],
      ingredients: [
        {
          group: 'Shell',
          items: [
            '2 cups (260 g) maida — sifted; the base of a firm, crisp shell.',
            '2 tbsp (20 g) fine semolina (suji) — adds sturdiness and crunch to the shell.',
            '1/4 cup (60 g) ghee, melted — rubbed into the flour; less than for Braj gujiya is fine, but do not skip.',
            '1/4 tsp salt — balances the sweetness.',
            'About 1/2 cup (120 ml) water — added slowly; a stiff dough is essential.',
            'Ghee or oil for deep frying, about 500 ml — ghee gives the traditional flavour.',
          ],
        },
        {
          group: 'Filling',
          items: [
            '200 g khoya (mawa), grated — unsweetened and fresh.',
            '1/4 cup (40 g) fine semolina (suji) — toasted in ghee to bind the filling and absorb moisture.',
            '1 tbsp (15 g) ghee — for roasting the khoya and semolina.',
            '1/2 cup (60 g) powdered sugar — added once cool so the filling stays dry.',
            '2 tbsp (20 g) chopped cashews and almonds — for crunch.',
            '2 tbsp (20 g) raisins — adds sweetness; chop the large ones.',
            '1 tbsp (8 g) grated dry coconut — optional; adds a nutty note.',
            '1/2 tsp (1 g) cardamom powder — freshly ground for fragrance.',
          ],
        },
        {
          group: 'To seal',
          items: [
            '2 tbsp flour mixed with 3 tbsp water — a thin paste that glues the rim.',
          ],
        },
      ],
      mise: [
        'Grate the khoya and bring it to room temperature so it roasts evenly.',
        'Chop the nuts and raisins fine, so they do not pierce the shell when you seal it.',
        'Make the dough 30–40 minutes ahead and keep it covered with a damp cloth.',
        'Prepare the flour paste and keep a bowl of water for sealing the edges.',
        'Arrange a cloth-lined tray for the fried pedakiyas.',
      ],
      method: [
        {
          title: 'Prepare the dough with moyan',
          text: 'Combine the maida, semolina and salt. Add the melted ghee and rub it in with your fingertips for 3–4 minutes until the mixture looks like wet sand and holds its shape when squeezed. Add water a spoonful at a time and knead for 8 minutes into a stiff, smooth dough. Cover with a damp cloth and rest for 30–40 minutes.',
          why: 'The ghee shortens the dough so the fried shell stays crisp and firm, and the stiff dough absorbs less fat during frying.',
          cue: 'the dough is firm, smooth and does not stick to your hand, and it springs back slowly when pressed.',
        },
        {
          title: 'Roast the khoya',
          text: 'Heat 1/2 tbsp of ghee in a wide pan on low heat. Add the grated khoya and roast for 8 minutes, stirring constantly, until it loosens into granules and turns pale golden with a nutty smell. Transfer to a plate.',
          why: 'Removing the moisture from the khoya keeps the filling dry, which is what prevents the pedakiya from bursting.',
          cue: 'the khoya is crumbly and light golden, with no sticky lumps.',
        },
        {
          title: 'Toast the semolina',
          text: 'In the same pan, heat the remaining 1/2 tbsp of ghee on low heat, add the semolina and roast for 3–4 minutes, stirring, until it smells nutty and turns light golden. Do not let it brown. Add it to the khoya.',
          why: 'Raw semolina would taste starchy and stay hard; toasting cooks it and lets it absorb any stray moisture from the khoya.',
          cue: 'the semolina grains are separate, fragrant and very lightly coloured.',
        },
        {
          title: 'Mix and cool the filling',
          text: 'Let the khoya and semolina mixture cool for 15 minutes until just warm. Add the powdered sugar, chopped nuts, raisins, coconut and cardamom, and mix lightly with your fingers. The filling should be crumbly and hold together when squeezed.',
          why: 'Adding sugar while the khoya is hot would melt it and make the filling wet. A cool, crumbly filling packs neatly and seals cleanly.',
          cue: 'a pinch of filling holds together when pressed and falls apart again with a light tap.',
        },
        {
          title: 'Roll and cut the circles',
          text: 'Divide the dough into two portions. Roll one portion on a lightly oiled board to about 2 mm thick, slightly thicker than for Braj gujiya. Cut circles with a 4-inch cutter or bowl. Gather the scraps, rest them for 5 minutes and re-roll. Cover the cut circles with a damp cloth.',
          why: 'A slightly thicker shell makes a sturdier pedakiya that keeps well. Covered circles do not dry or crack at the edges.',
          cue: 'the circles are even in thickness, smooth and about as thick as a thin coin.',
        },
        {
          title: 'Fill and crimp',
          text: 'Put 1 heaped tablespoon of filling on one half of a circle. Brush the rim with the flour paste or water, fold over to form a half-moon and press the edge, pushing out the air. Crimp by folding and twisting the edge into a rope, working from one end to the other, or use a fork or mould.',
          why: 'A firmly pressed, twisted edge keeps the filling inside and gives the pedakiya its characteristic look.',
          cue: 'the pedakiya is a firm, plump half-moon with a neatly twisted rope edge and no gaps.',
        },
        {
          title: 'Fry on low heat',
          text: 'Heat the ghee in a kadai on low to medium-low heat until a small pinch of dough sinks and rises slowly in 10 seconds. Fry 4–5 pedakiyas at a time, turning gently with a slotted spoon, for 8–10 minutes until deep golden on both sides.',
          why: 'The thicker shell needs slower frying to cook through. Hot fat browns the outside and leaves the dough raw.',
          cue: 'steady small bubbles surround each pedakiya, the colour deepens evenly to golden brown, and the shell turns firm.',
        },
        {
          title: 'Drain and cool completely',
          text: 'Remove with the slotted spoon, drain over the kadai for a few seconds and place on a cloth-lined tray in a single layer. Cool for 30–40 minutes before storing, so that the shell hardens and no steam is trapped inside the box.',
          why: 'Cooling sets the shell. Packing warm pedakiyas makes them soft and shortens their keeping time.',
          cue: 'the cooled pedakiya is firm and dry, and makes a crisp sound when tapped with a fingernail.',
        },
      ],
      offering:
        'Offered at Holi and during Chhath preparations, placed before the deity with other sweets and shared as prasad.',
      ritual: [
        'Prepare the pedakiya in a clean kitchen after bathing, keeping the first few aside for the deity without tasting them.',
        'Arrange the pedakiya on a clean plate or leaf with other festival sweets, fruit and a small lamp before the household deity.',
        'Offer the naivedya with incense and a short prayer, sprinkling water around the plate and folding your hands.',
        'For Chhath, keep the pedakiya with the thekua and fruit in the offering basket (daura or soop) as your family tradition directs.',
        'After the offering, distribute the pedakiya as prasad starting with the eldest, and pack tins for relatives and neighbours.',
      ],
      serving:
        'Serve at room temperature with tea or milk. At Holi they are part of a spread with malpua, dahi vada and thandai. Allow 2 per person. The firm shell makes them good for packing and gifting.',
      storage:
        'Store fully cooled pedakiyas in an airtight tin for up to 2 weeks at room temperature; refrigerate in humid weather. Keep the filling for 3 days refrigerated. Unfried filled pedakiyas can be frozen for up to a month and fried from frozen on low heat.',
      troubleshooting: [
        {
          problem: 'The shell is too hard to bite',
          fix: 'The dough was too stiff or rolled too thick, or it had too little ghee. Use the full amount of ghee, roll to 2 mm and fry on low heat so the shell cooks through.',
        },
        {
          problem: 'The pedakiya opens in the oil',
          fix: 'The edge was not sealed or the filling was wet. Moisten the rim, press out air and cool the filling before filling.',
        },
        {
          problem: 'The filling tastes raw and floury',
          fix: 'The semolina was not toasted enough. Roast it for 3–4 minutes until fragrant before mixing.',
        },
        {
          problem: 'The pedakiyas are pale and soft',
          fix: 'The ghee was too cool. Fry on medium-low heat, not low, and wait until a pinch of dough rises in about 10 seconds.',
        },
      ],
      variations: [
        'Without khoya: use 1 cup of grated dry coconut with 1/2 cup of toasted semolina, sugar and cardamom for a dairy-free filling.',
        'Poppy-seed pedakiya: add 1 tbsp of roasted poppy seeds to the filling for a nutty taste.',
        'Baked pedakiya: brush with ghee and bake at 180 degrees Celsius for 25 minutes; lighter but less crisp.',
        'Jaggery filling: replace the powdered sugar with 1/3 cup of grated jaggery, melted into the roasted khoya, for a darker rustic taste.',
        'Vegan: use refined oil for the dough and frying, and the coconut-semolina filling instead of khoya.',
        'Jain-friendly: no onion, garlic or root vegetables; suitable as written.',
      ],
      tips: [
        'A firm dough and a dry filling are the two secrets of a pedakiya that does not burst.',
        'Toast the semolina; raw suji tastes starchy.',
        'Fry slowly, since the shell is thicker than a gujiya shell.',
        'Cool them completely before storing in a tin, so they stay crisp for days.',
      ],
      differs: 'Suji in the khoya; sturdier shell.',
    },
    {
      id: 'maharashtra-karanji',
      region: 'Maharashtra',
      culture: 'Marathi households — Diwali faral, Ganesh Chaturthi',
      title: 'Karanji',
      intro:
        'Maharashtra’s karanji is a crisp half-moon with a rava (semolina) and maida shell around a filling of fresh or dry coconut, poppy seeds, nuts and sugar or jaggery. It is fried in oil, not ghee, and is a staple of Diwali faral.',
      story:
        'In Maharashtra the stuffed half-moon is called karanji, and it is among the sweets of the Diwali faral, the platter of snacks and sweets shared among families during the festival days. It is also made for Ganesh Chaturthi, when karanji is offered to Ganpati alongside modak, and for Holi in some regions. In Goa and the Konkan the same sweet is known as neureo (nevri), and in Karnataka as karjikai.\n\nThe Marathi karanji differs from the northern gujiya mainly in its filling and shell. The filling is based on coconut rather than khoya: grated coconut (fresh or dry) is cooked briefly with sugar or jaggery, then mixed with roasted poppy seeds (khus khus), chopped nuts, charoli and cardamom. It is light, fragrant and not rich with milk, which also helps the karanji keep longer. The shell is made with a mixture of fine rava and maida, kneaded with hot oil (the mohan) and milk or water into a stiff dough that is rested well. The semolina gives the fried shell a distinctive short, crunchy bite.\n\nKaranji is shaped with a special brass or steel cutter called a karanji katni, which seals the edge and trims it into a scalloped border in a single press. In homes without one, the edge is crimped by hand. The frying is done in oil on medium-low heat, until the karanji turns a pale golden colour and the shell sounds crisp.',
      serves: '18 karanjis',
      prep: '50 min + 1 hr resting',
      cook: '40 min',
      equipment: [
        'Karanji cutter (katni) or a fluted pastry wheel — trims and seals the edge in one press; a steel bowl and fork crimping also work.',
        'Heavy-bottomed kadai — for frying on steady medium-low heat.',
        'Wide non-stick pan — to cook the coconut filling without sticking.',
        'Rolling pin and board — roll the circles thin and even.',
        'Slotted spoon — to lift the fried karanjis without damaging the shell.',
        'Damp cloth — keeps the dough and cut circles from drying.',
      ],
      ingredients: [
        {
          group: 'Shell',
          items: [
            '1 cup (170 g) fine rava (semolina) — gives the shell its crunchy, short bite.',
            '1 cup (130 g) maida — binds the dough and keeps it rollable.',
            '1/4 cup (60 ml) hot oil (mohan) — poured over the flour and mixed in; this makes the fried shell crisp and short.',
            '1/4 tsp salt — brings out the sweetness of the filling.',
            'About 1/2 cup (120 ml) warm milk or water — added gradually to knead a stiff dough.',
            'Oil for deep frying, about 500 ml — a neutral oil such as groundnut or sunflower.',
          ],
        },
        {
          group: 'Filling',
          items: [
            '1.5 cups (130 g) fresh grated coconut, or 3/4 cup (65 g) dry grated coconut — fresh gives a moist, fragrant filling; dry gives a firmer, longer-lasting one.',
            '3/4 cup (150 g) sugar or grated jaggery — sugar gives a pale filling, jaggery a darker, richer one.',
            '2 tbsp (16 g) poppy seeds (khus khus), dry-roasted — adds the characteristic nutty crunch.',
            '2 tbsp (20 g) chopped almonds and cashews — lightly toasted for flavour.',
            '1 tbsp (10 g) charoli (chironji) seeds, optional — a delicate, almond-like seed traditional in Marathi sweets.',
            '1/2 tsp (1 g) cardamom powder — freshly ground.',
            '1/4 tsp nutmeg powder — a pinch gives a warm background note.',
          ],
        },
      ],
      mise: [
        'Make the dough at least 1 hour ahead, cover it with a damp cloth and let it rest.',
        'Dry-roast the poppy seeds in a pan on low heat for 1–2 minutes until fragrant, then cool.',
        'Chop the nuts finely and grind the cardamom and nutmeg.',
        'If using fresh coconut, grate only the white part and do not press out its moisture.',
        'Line a tray with a cloth and keep the cutter, flour for dusting and a bowl of water ready.',
      ],
      method: [
        {
          title: 'Make the dough with hot oil',
          text: 'Mix the rava, maida and salt in a bowl. Heat the oil until just shimmering and pour it over the flour. Mix it in with a spoon, then rub with your fingertips for 2–3 minutes once cool enough to touch. Add warm milk or water a spoonful at a time and knead for 6–8 minutes into a stiff, smooth dough. Cover with a damp cloth and rest for 1 hour.',
          why: 'Hot oil coats the flour and shortens the gluten so the fried shell is crisp. Resting lets the rava soften and absorb the liquid, so the dough rolls smooth without cracking.',
          cue: 'the dough is firm and smooth, holds a fingerprint when pressed, and feels pliable rather than dry.',
        },
        {
          title: 'Cook the coconut filling',
          text: 'In a wide pan on low heat, mix the grated coconut and sugar or jaggery. Cook for 6–8 minutes, stirring constantly. The sugar will melt and make the mixture wet; keep stirring until it dries to a moist, crumbly mass that no longer sticks to the pan. For dry coconut, cook for only 3–4 minutes.',
          why: 'Cooking out the moisture from the sugar and coconut is what keeps the karanji from turning soggy or bursting in hot oil.',
          cue: 'the filling clumps lightly when pressed, leaves the sides of the pan and looks glossy but not wet.',
        },
        {
          title: 'Flavour and cool the filling',
          text: 'Switch off the heat and stir in the roasted poppy seeds, chopped nuts, charoli, cardamom and nutmeg. Spread the filling on a plate and cool it completely, about 20 minutes, before using.',
          why: 'Spices stirred in after cooking keep their perfume. A warm filling softens the dough and steams inside the shell.',
          cue: 'the filling is cool to the touch, loose and crumbly, and clumps when squeezed.',
        },
        {
          title: 'Roll the dough',
          text: 'Knead the rested dough briefly for 1 minute and divide it into 18 balls the size of a small lime. Roll one on a lightly oiled board into a thin circle of about 4 inches, rolling from the centre outward and turning it. Keep the rest of the dough and the finished circles covered with a damp cloth.',
          why: 'A thin, even circle fries crisp. A thick one stays doughy and absorbs too much oil.',
          cue: 'the circle is thin and even, about the thickness of a coin, with no thick centre.',
        },
        {
          title: 'Fill the circle',
          text: 'Place one circle on your palm or on the open karanji cutter. Put 1 heaped tablespoon of filling on one half, leaving a clean 1 cm border. Do not overfill. Moisten the border with a fingertip of water.',
          why: 'Too much filling stretches the shell and makes the seal weak; a clean border is essential for the seal to hold.',
          cue: 'the filling sits in a neat mound on one half, with a dry-looking rim around it that you have just moistened.',
        },
        {
          title: 'Seal and shape',
          text: 'Fold the circle over to form a half-moon. Press the edge from one end to the other to push out all trapped air and seal. Press the cutter firmly to trim and seal in one stroke, or crimp the edge with a fork or by folding it into a twisted rope. Remove the trimmed scraps; gather and re-roll them.',
          why: 'Trapped air expands in the hot oil and bursts the karanji; a firm, even seal keeps the filling inside.',
          cue: 'the karanji is a plump half-moon with a neat scalloped or twisted edge and no gaps.',
        },
        {
          title: 'Fry on medium-low heat',
          text: 'Heat the oil in a kadai on medium-low heat to about 160 degrees Celsius. Test by dropping a pinch of dough; it should sink and rise slowly in 8–10 seconds. Fry 4–5 karanjis at a time, turning gently, for 6–8 minutes until pale golden on both sides.',
          why: 'The shell is thick enough to need gentle heat; high heat browns the outside before the inside is cooked.',
          cue: 'fine bubbles surround each karanji, the colour turns an even pale gold, and the shell sounds crisp when tapped.',
        },
        {
          title: 'Drain and cool',
          text: 'Lift the karanjis with a slotted spoon, drain for a few seconds, and set them in a single layer on a cloth-lined tray. Let them cool completely, about 30 minutes, before storing, so the shells crisp up and no steam collects in the container.',
          why: 'The shell crisps only as it cools. Storing warm karanjis in a closed box makes them soft.',
          cue: 'the cooled karanji feels dry and light and breaks with a clean crunch.',
        },
      ],
      offering:
        'Offered to Ganpati at Ganesh Chaturthi, to Lakshmi at Diwali, and shared as part of the faral platter.',
      ritual: [
        'Make the karanji after bathing in a clean kitchen, keeping the first few aside for the deity without tasting them.',
        'Place the karanji on a clean plate with a modak, fruit and flowers before Ganpati, or before Lakshmi on the day of Lakshmi Pujan.',
        'Light a lamp and incense, sprinkle water around the plate, fold your hands and offer the naivedya with your family prayer.',
        'Keep the offering before the deity during the aarti, then remove it respectfully.',
        'Distribute the karanji as prasad, starting with the elders, and add some to the Diwali faral platters that are shared with neighbours and relatives.',
      ],
      serving:
        'Serve at room temperature on the Diwali faral platter alongside ladoo, chakli, chivda, shankarpali and anarsa, with tea. For Ganesh Chaturthi serve beside modak at the naivedya meal. Allow 2 per person.',
      storage:
        'Store completely cooled karanjis in an airtight tin for up to 10 days at room temperature if made with dry coconut, and 5 days if made with fresh coconut. In humid weather, refrigerate. The filling keeps 3 days in the refrigerator.',
      troubleshooting: [
        {
          problem: 'The karanji opens while frying',
          fix: 'The seal was weak or the filling was warm or wet. Moisten the rim, press out the air, cook the filling dry, and cool it completely before filling.',
        },
        {
          problem: 'The shell is soft and not crisp',
          fix: 'The oil was too cool or the karanjis were stored while warm. Fry at about 160 degrees Celsius and cool completely before storing.',
        },
        {
          problem: 'The shell is too hard',
          fix: 'The dough was too stiff or had too little oil. Use the full hot oil, rest the dough for an hour and roll thin.',
        },
        {
          problem: 'The filling is too wet and runny',
          fix: 'It was not cooked down long enough. Return it to the pan and cook until it clumps and leaves the sides of the pan; cool before using.',
        },
      ],
      variations: [
        'Baked karanji: brush with oil and bake at 180 degrees Celsius for 25 minutes; lighter and less oily.',
        'Khoya karanji: replace half the coconut with 100 g roasted khoya for a richer, northern-style filling.',
        'Rava-besan filling: roast 1/2 cup rava with 2 tbsp ghee, mix with coconut and sugar for a different texture.',
        'Fasting (vrat) adaptation: use singhare flour and sama flour instead of rava and maida, with a coconut-sugar filling, only if your family tradition permits it.',
        'Vegan: the traditional recipe uses oil and a coconut filling, and is vegan when made with water instead of milk in the dough.',
        'Jain-friendly: no onion, garlic or root vegetables; suitable as written.',
      ],
      tips: [
        'The hot oil in the dough (mohan) is what makes the shell crisp. Do not skip it.',
        'Cool the filling fully; a warm filling makes the seal weak.',
        'Do not overfill; a heaped tablespoon is enough.',
        'Roll circles thin, and keep all unused circles under a damp cloth.',
        'Fry one karanji first to check the heat and the seal.',
      ],
      differs: 'Coconut-poppy filling; rava shell; fried in oil.',
    },
  ],
}

export default recipe
