import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'puran-poli',
  name: 'Puran Poli',
  alsoCalled: 'Holige · Obbattu · Bobbatlu · Vedmi · पुरणपोळी',
  category: 'Sweet',
  summary: 'Soft flatbread stuffed with sweet dal — offered at Holi, Gudi Padwa, Ugadi and Pola.',
  meaning:
    'Few festival foods change names as often as this one: Puran Poli in Maharashtra, Holige or Obbattu in Karnataka, Bobbatlu in Andhra and Telangana, Vedmi in Gujarat. The idea is the same — chana or toor dal cooked with jaggery and wrapped in a soft dough — but the texture, the flour and the dal differ by home and by state. Maharashtra makes a thick, golden poli from a wheat-and-maida dough, Karnataka and Andhra make a thinner, softer one from a dough soaked in oil, and Gujarat makes a milder poli from toor dal and a ghee-rich wheat dough. The puran (filling) is always cooked until it is dry enough to roll, because a wet filling is the single most common reason a poli tears. This is a festival bread of patience: the dal is cooked, drained, cooked again with jaggery and ground, and the dough is rested for hours. Choose the version of your own region and family; each is correct for its own kitchen.',
  variants: [
    {
      id: 'maharashtra',
      region: 'Maharashtra',
      culture: 'Marathi households — Holi, Gudi Padwa, Pola',
      title: 'Puran Poli',
      intro:
        'A thick, soft, golden poli with a dense chana-dal and jaggery puran, delicately flavoured with cardamom and nutmeg. The dough is made from wheat and maida. It is eaten with a drizzle of ghee and a bowl of katachi amti.',
      story:
        'In Maharashtra the puran poli is the sweet of the Hindu year. It is made for Holi (the Holika Dahan fire is offered a poli), for Gudi Padwa, for Pola when the bullocks are honoured, and for countless family occasions, weddings and thread ceremonies. The famous Marathi saying “Holi re Holi, puranachi poli” expresses how closely the sweet is tied to the spring festival. In many households the first poli is placed before the household deity, and no one eats until it has been offered.\n\nThe Marathi poli is distinctive for being thick, with a sweet, dense filling that is not wet at all. Chana dal is cooked until soft, drained completely, mixed with jaggery and cooked again until it forms a stiff paste, then passed through a puran-yantra (a conical mill with a handle) so that it becomes silky. The traditional dough uses maida with a little whole-wheat flour and plenty of oil, kneaded to a very soft dough and rested for hours.\n\nThe water drained from cooking the dal is never thrown away. It is used to make katachi amti, a thin, spicy, tangy lentil soup that is served with the poli for balance: sweet, sour and spicy on the same plate. This pairing is a mark of a Marathi puran poli meal. Ghee is poured on the hot poli at the table; some families also eat it with warm milk.',
      serves: '8 polis',
      prep: '40 min',
      cook: '30 min',
      equipment: [
        'Pressure cooker (3–5 litre) — cooks chana dal to a soft but intact stage in 15–20 minutes; an open pot works but takes an hour.',
        'Heavy-bottomed wide pan (kadai) — for drying the puran evenly; a thin pan scorches the jaggery and the paste turns bitter.',
        'Puran-yantra or potato masher — the yantra gives the smoothest puran; a masher with extra effort or a food mill works; a blender makes it pasty, so avoid it.',
        'Rolling pin (belan) and flat board — a light, even touch with a thin pin gives a thin poli.',
        'Iron or non-stick tava — heavy cast-iron gives the best golden spots; keep it at medium heat, not hot.',
        'Large plate with a rim — to rest the oiled dough, covered with a damp cloth.',
      ],
      ingredients: [
        {
          group: 'Puran',
          items: [
            '1 cup (200 g) chana dal — washed 2–3 times and soaked 1 hour; split chana dal gives the right texture, do not use whole chickpeas.',
            '1 cup (200 g) grated jaggery — reduce slightly if the jaggery is dark and strongly flavoured; Kolhapuri jaggery is the favourite.',
            '1/2 tsp (1 g) cardamom powder — freshly ground, it carries the main aroma.',
            '1/2 tsp (1 g) nutmeg powder — grated from a whole nutmeg if possible; it is the signature Marathi note.',
            '1 tsp (5 g) ghee — stops the puran from sticking and adds a glossy finish.',
            '1/4 tsp saffron strands (optional) — soaked in 1 tbsp warm milk; gives colour and festival aroma.',
          ],
        },
        {
          group: 'Dough',
          items: [
            '1 cup (130 g) maida (refined flour) — gives the poli its softness; sift it for a lump-free dough.',
            '1/2 cup (60 g) fine whole-wheat flour — adds strength and flavour so the poli does not tear.',
            '2 tbsp (30 ml) oil, plus extra for resting — use a neutral oil; the oil layer on top lets the dough rest without drying.',
            '1/4 tsp turmeric — gives a traditional golden tint.',
            '1 pinch salt — balances the sweet filling.',
            'Warm water to knead, about 1/2 cup (120 ml) — add gradually; the dough should be softer than chapati dough.',
            'Ghee for roasting and serving — about 3 tbsp; real ghee is part of the taste.',
            'Dry rice flour or wheat flour for dusting — about 1/4 cup; keep it handy for rolling.',
          ],
        },
      ],
      mise: [
        'Soak the chana dal for 1 hour while you knead the dough — they are rested and cooked in parallel.',
        'Knead the dough at least 1 hour (ideally 3–4 hours) ahead and cover with a thin layer of oil so it stays soft.',
        'Grate the jaggery fine so it dissolves quickly into the dal without lumps.',
        'Keep a small bowl of oil, a bowl of dusting flour, a rolling board and the tava ready before you begin rolling.',
        'Have a bowl for the dal-cooking water ready; you will need it for katachi amti.',
      ],
      method: [
        {
          title: 'Cook the chana dal',
          text: 'Drain the soaked dal and pressure-cook it with 3 cups of fresh water for 3 whistles (about 15 minutes) on medium heat. Allow the pressure to release naturally. The dal should be completely soft — pressing a grain between your fingers should crush it easily — but still hold its shape.',
          why: 'Properly softened dal blends smoothly into the puran. Under-cooked dal leaves hard bits that tear the poli.',
          cue: 'the dal grains crush at the touch of two fingers and the dal does not form a paste in the cooker.',
        },
        {
          title: 'Drain the dal completely and save the water',
          text: 'Place a colander over a bowl and tip in the dal. Let it drain for 10 minutes, pressing gently with a spoon until no water drips. Keep the drained water (katachi amti is made from it). The drained dal should feel dry and crumbly.',
          why: 'Any leftover water makes the puran wet and the poli will tear when rolled. This is the single most important step.',
          cue: 'a handful of dal squeezed in your palm comes apart into soft crumbs, with no water seeping out between your fingers.',
        },
        {
          title: 'Cook the puran with jaggery',
          text: 'Put the drained dal and grated jaggery in a heavy-bottomed pan. Cook on medium heat, stirring continuously with a flat spoon. The jaggery melts and the mixture first becomes runny, then thickens. Keep stirring, scraping the bottom, for 8–10 minutes until it forms a dry mass that pulls away from the pan.',
          why: 'Cooking out the moisture of the melted jaggery is what gives a stiff puran. If it stays loose, the puran leaks through the dough.',
          cue: 'a spoon stands upright in the middle of the mixture and the paste leaves a clean path on the pan bottom when dragged.',
        },
        {
          title: 'Flavour and mill the puran',
          text: 'Switch off the heat. Stir in the ghee, cardamom, nutmeg and saffron milk. While the mixture is still warm, pass it through a puran-yantra, or mash vigorously with a potato masher until smooth. Spread it on a plate and let it cool until it is just warm.',
          why: 'Milling removes any lumps so the filling spreads smoothly inside the dough; spices are added after cooking so their perfume is not lost.',
          cue: 'the puran is smooth, thick and uniformly golden-brown, and rolls into a ball without cracking.',
        },
        {
          title: 'Knead and rest the dough',
          text: 'Mix the maida, wheat flour, turmeric and salt. Add 2 tbsp oil and enough warm water to make a very soft, slightly sticky dough. Knead for 8–10 minutes, pressing with the heel of your palm, until stretchy and smooth. Coat with a thin film of oil, cover and rest for at least 1 hour.',
          why: 'Resting relaxes the gluten so the dough stretches around the puran without springing back or tearing. The oil film keeps the surface from drying.',
          cue: 'when you pull off a piece, it stretches into a thin, translucent sheet without breaking.',
        },
        {
          title: 'Stuff the dough',
          text: 'Divide the puran into 8 equal lemon-sized balls and the dough into 8 slightly smaller balls. Flatten a dough ball into a cup about 3 inches wide, thicker in the centre and thinner at the edges. Place a puran ball in the middle. Pull the edges up and over to enclose the filling completely, pinch to seal and flatten slightly. Pinch off any excess dough at the top.',
          why: 'The dough should be about half the weight of the puran, which gives the characteristic thin shell and generous filling. Sealing well prevents the puran from escaping while rolling.',
          cue: 'the stuffed ball is smooth with no cracks and feels evenly weighted when held in your palm.',
        },
        {
          title: 'Roll the poli',
          text: 'Dip the ball in dry flour on both sides. Place it, seam-side down, on a floured board. Press gently with your fingers to flatten, then roll from the centre outward in light, short strokes, turning the poli after every few passes. Roll to a 6–7 inch circle of even thickness. Do not press hard; let the pin do the work.',
          why: 'Rolling from the centre outward distributes the puran evenly. Heavy pressure squeezes the filling to the edges and tears the shell.',
          cue: 'the poli is uniformly thin, round, and you can faintly see the golden puran through the dough without any of it breaking through.',
        },
        {
          title: 'Roast on the tava',
          text: 'Heat the tava on medium heat. Place the poli on it carefully. Cook for 30–40 seconds until small bubbles form, then flip and cook the other side until golden spots appear. Flip once more, press gently with a cloth to cook the edges, and brush both sides with ghee. Each poli takes about 2–3 minutes in all.',
          why: 'Medium heat cooks the filling through while the outside browns. A hot tava burns the poli before the puran warms; a cool one dries it out.',
          cue: 'light golden-brown spots appear on both sides, the poli puffs slightly, and the smell of ghee and cardamom rises.',
        },
      ],
      offering:
        'Offered as naivedyam at Holika Dahan (a poli is thrown into the fire), at Gudi Padwa and on Bail Pola, when it is fed to bullocks.',
      ritual: [
        'Make the first puran poli of the day only after bathing and without tasting it; set it aside on a clean plate.',
        'Place the poli on a banana leaf or a clean plate with a spoonful of ghee. For Holika Dahan, add a coconut, a handful of grain and some flowers to the offering plate.',
        'At Holika Dahan, walk around the unlit pyre three times, then offer the poli, coconut and flowers into the fire while praying for the burning of negativity. For Gudi Padwa, offer the poli to the household deity and show it to the raised gudi.',
        'On Bail Pola, feed a small poli to each decorated bullock after worshipping them with turmeric, kumkum and garlands.',
        'After the offering, distribute the polis as prasad, beginning with the eldest in the family, and eat the meal together with katachi amti.',
      ],
      serving:
        'Serve the polis hot with a generous spoon of ghee, warm milk and katachi amti (the spiced lentil soup made from the drained dal water). Some families also serve rice, papad and a sweet-sour mango pickle. Allow 2 polis per adult. A traditional Marathi festival lunch also includes varan-bhaat, batata bhaji and kurdai.',
      storage:
        'Polis stay soft for 1 day at room temperature wrapped in a clean cloth and for 3 days in the refrigerator. Reheat on a hot tava with a little ghee. The puran keeps 1 week in the refrigerator and can be frozen for 1 month. Do not store polis in a closed box while warm — steam makes them soggy.',
      troubleshooting: [
        {
          problem: 'The poli tears while rolling and the puran spills out',
          fix: 'The puran is too wet or the dough shell is too thin. Cook the puran longer until it forms a stiff mass, and use a little more dough in the shell. Roll with light strokes and dust generously with flour.',
        },
        {
          problem: 'The poli turns hard and chewy',
          fix: 'The dough was too stiff or was roasted at too low a heat. Knead with slightly more water and oil, rest it longer and roast on medium heat. Wrap the cooked polis in a cloth while they are warm.',
        },
        {
          problem: 'The puran tastes bitter or burnt',
          fix: 'It stuck to the pan while cooking. Use a heavy-bottomed pan, stir constantly and lower the heat. If a little burn smell appears, transfer the unburnt portion to a fresh pan.',
        },
        {
          problem: 'The poli puffs up and bursts',
          fix: 'Air was trapped inside while rolling. Press out the air with your fingers as you seal the stuffed ball, and prick the poli lightly if it balloons on the tava.',
        },
      ],
      variations: [
        'Toor dal version: some families use toor dal instead of chana dal, which gives a slightly lighter, less nutty puran.',
        'Sugar instead of jaggery: for a lighter colour and a milder sweetness, use 3/4 cup sugar instead of jaggery; this version is common in Pune.',
        'Whole-wheat poli: for a healthier dough, use all whole-wheat flour (atta) with 3 tbsp of oil and knead very soft. The poli is slightly darker and denser.',
        'Fasting (vrat) adaptation: this is not a fasting dish, as chana dal and wheat are not allowed in most fasts. Offer a sabudana or rajgira-based sweet instead.',
        'Vegan: replace ghee with coconut oil for roasting; the dough already uses oil. Substitute almond milk for the saffron milk.',
        'Jain-friendly: the recipe contains no onion, garlic or root vegetables and is suitable as is.',
      ],
      tips: [
        'The puran must be dry. A wet puran leaks and makes the poli tear.',
        'Rest the dough in oil: it is the secret to a soft, non-chewy poli.',
        'Keep the stuffing and dough balls of near-equal size to get a thin, even poli.',
        'Always save the dal water — it becomes katachi amti, the traditional accompaniment.',
        'Roll on a lightly floured board and work quickly; a dry board and a hot tava are the enemies of a good poli.',
      ],
      differs: 'Wheat-and-maida dough; chana dal; nutmeg and cardamom; eaten with katachi amti.',
    },
    {
      id: 'karnataka-holige',
      region: 'Karnataka',
      culture: 'Kannada households — Yugadi, Varamahalakshmi, Gowri-Ganesha',
      title: 'Holige / Obbattu',
      intro:
        'Karnataka’s holige is thin and soft, with a softer, moister filling. The dough is mostly maida, soaked in oil for hours, and it comes in two main fillings: hoorana holige (chana dal and jaggery) and kayi holige (coconut and jaggery).',
      story:
        'In Karnataka the stuffed sweet flatbread is called holige or obbattu, and it is essential at Yugadi (the Kannada new year), at Varamahalakshmi vrata, at Gowri-Ganesha and at weddings and housewarmings. Yugadi is incomplete without holige served with ghee and a spoonful of coconut milk or a bowl of sweet, thin kheer. The word holige is widely used in Bengaluru and the Old Mysore region, while northern Karnataka often says obbattu.\n\nThe Karnataka holige is thinner, softer and more delicate than its Maharashtrian cousin. The dough is made mostly from maida with a little fine semolina, and a generous amount of oil is poured over it so that it can rest for several hours and become silky and stretchy. Because of this oil-soaked dough, the holige is not rolled with a pin but patted out by hand on an oiled banana leaf or plastic sheet, just as a roti is flattened by hand. The result is a thin, almost translucent pancake that is cooked on a griddle with ghee.\n\nTwo fillings are common. Hoorana holige uses chana dal cooked with jaggery, often with a little poppy seed, while kayi holige uses fresh coconut and jaggery and has a juicier, more fragrant taste. Which one is made depends on the family: families from Mysuru and Bengaluru usually make hoorana holige for festivals, while coastal and Malnad households favour kayi holige. Both are eaten with ghee, and many families also serve it with thin coconut milk sweetened with jaggery (haalu).',
      serves: '10 holiges',
      prep: '45 min + 3 hrs resting',
      cook: '30 min',
      equipment: [
        'Pressure cooker — for softening the chana dal quickly.',
        'Heavy-bottomed kadai — for cooking the filling dry without sticking.',
        'Wet grinder or mixer-grinder — to grind the cooked dal and jaggery into a smooth hoorana; a puran-yantra is a good alternative.',
        'Banana leaf or a thick plastic sheet (zip-lock bag cut open) — for patting out the holige; oil it first so the soft dough does not stick.',
        'Flat iron or non-stick tava — preheated on medium heat for roasting.',
      ],
      ingredients: [
        {
          group: 'Hoorana (dal filling)',
          items: [
            '1 cup (200 g) chana dal, cooked firm — washed, soaked 30 minutes and pressure-cooked for 3 whistles until soft but not mushy; drain completely.',
            '1 cup (200 g) powdered jaggery — use clean, golden jaggery; Karnataka cooks like mandya (sugar-cane) jaggery for its mellow flavour.',
            '1/2 cup (45 g) grated dry coconut (optional) — adds richness and a toasted note; use fresh if dry is unavailable, but cook the filling a little longer.',
            '1/2 tsp (1 g) cardamom — freshly ground; gives the main fragrance.',
            '1 tsp (3 g) poppy seeds, roasted — adds a faint crunch and the traditional taste.',
          ],
        },
        {
          group: 'Dough',
          items: [
            '1.5 cups (200 g) maida — sifted; the main flour for a silky, soft holige.',
            '1/4 cup (40 g) fine rava (semolina) — gives a slight bite and helps the holige crisp up lightly on the griddle.',
            '1/4 tsp turmeric — a pinch for the golden colour.',
            '1/2 cup (120 ml) sesame (gingelly) oil — the traditional choice; its aroma is part of the holige; use refined oil if you prefer a neutral taste.',
            'Water and a pinch of salt — to knead; warm water gives a softer dough.',
            'Ghee for roasting — about 3 tbsp; brush each holige as it comes off the tava.',
          ],
        },
      ],
      mise: [
        'Knead the dough at least 3 hours before you plan to make holige, then submerge or cover it in oil; the long rest is what makes it patable.',
        'Cook and drain the chana dal fully and let it cool before grinding with jaggery.',
        'Oil a banana leaf or plastic sheet, and have a small bowl of oil beside you for greasing fingers.',
        'Roast the poppy seeds and grate the dry coconut before you start cooking the filling.',
        'Heat the tava only when you are ready to roast the first holige.',
      ],
      method: [
        {
          title: 'Cook the chana dal',
          text: 'Wash the dal and soak it for 30 minutes. Pressure-cook with 2.5 cups of water for 3 whistles. When the pressure drops, drain the dal in a colander for 10 minutes to remove all water. Reserve the water for saaru (a thin lentil soup).',
          why: 'Thoroughly drained dal gives a dry filling that sits neatly inside a thin holige. Any remaining water makes the hoorana sticky and difficult to cook down.',
          cue: 'the dal is soft enough to crush between fingers and crumbles when pressed in your fist.',
        },
        {
          title: 'Grind the dal and jaggery',
          text: 'Place the drained dal and powdered jaggery in a grinder and pulse for 20–30 seconds into a coarse paste without adding any water. Alternatively, mash both together with a potato masher.',
          why: 'Grinding the sweet and dal together combines them evenly. Water must not be added — it would make the paste too wet.',
          cue: 'the paste looks like thick, coarse brown dough with no visible whole dal grains.',
        },
        {
          title: 'Cook the hoorana until dry',
          text: 'Transfer the paste to a heavy kadai and cook on medium-low heat for 8–10 minutes, stirring constantly. Add the dry coconut and poppy seeds towards the end. Keep cooking until the mixture is thick, dry and leaves the sides of the pan.',
          why: 'The paste is raw until the jaggery moisture evaporates. A dry hoorana is the secret of a holige that rolls out without leaking.',
          cue: 'a spoon pulled across the pan leaves a clear trail and the mixture forms a ball when you gather it.',
        },
        {
          title: 'Add cardamom and cool',
          text: 'Switch off the heat and mix in the cardamom. Spread on a plate and let it cool to room temperature. Divide into 10 equal balls (about 2 tablespoons each) and roll each between your palms until smooth.',
          why: 'Warm hoorana softens the dough and makes the balls impossible to shape.',
          cue: 'the balls are smooth, firm and hold their shape without cracks.',
        },
        {
          title: 'Prepare the oil-soaked dough',
          text: 'Mix the maida, rava, turmeric and salt. Add warm water gradually and knead for 8–10 minutes to a very soft, sticky dough. Pour the oil over the dough, cover, and rest for at least 3 hours (or overnight). Before using, knead gently once more in the oil.',
          why: 'The long rest in oil relaxes the gluten completely. The oil also acts as a lubricant, so the dough can be stretched thin by hand rather than rolled with a pin.',
          cue: 'the dough is silky, glossy and stretches into a thin sheet without tearing when you pull a small piece.',
        },
        {
          title: 'Stuff the holige',
          text: 'Take a ball of dough (a little smaller than the hoorana ball), oil your fingers, and flatten it into a 3-inch cup. Place a ball of hoorana in the middle, bring the edges together over it and seal tightly. Press it flat between your palms.',
          why: 'A well-sealed ball prevents the filling from escaping when patted flat.',
          cue: 'the stuffed ball is round, smooth and has no tears or exposed filling.',
        },
        {
          title: 'Pat the holige thin',
          text: 'Place the stuffed ball on the oiled banana leaf. With oiled fingers, pat it from the centre outward, turning the leaf as you go, to a thin circle about 6–7 inches wide. Be gentle; the dough is very soft. If it sticks, oil your fingers again.',
          why: 'Patting by hand is gentler than a rolling pin and keeps the filling evenly spread; the oiled surface prevents sticking.',
          cue: 'the holige is a thin, even, round disc with the golden filling faintly visible through the dough.',
        },
        {
          title: 'Roast with ghee',
          text: 'Heat the tava on medium heat. Invert the leaf carefully so that the holige lands on the tava and peel the leaf away. Cook for 1 minute, until small blisters form, then turn it over with a thin spatula and cook the other side for another minute. Brush both sides with ghee.',
          why: 'Medium heat cooks the filling gently. A hot tava makes the thin dough brown before the inside is warm.',
          cue: 'light brown spots appear on both sides, the edges are dry and the holige smells of ghee and cardamom.',
        },
      ],
      offering:
        'Offered to the deity first on Yugadi, Varamahalakshmi and Gowri–Ganesha festivals, and served with ghee, sugar and a thin coconut milk.',
      ritual: [
        'Cook the holige after a ritual bath, in a clean kitchen, and keep the first one aside for the deity without tasting it.',
        'On Yugadi, place the holige on a banana leaf at the household altar beside the bevu-bella (neem and jaggery mixture), fruits and a small bowl of ghee.',
        'For Varamahalakshmi, place the holige before the decorated kalasha along with other sweets and fruits; light a lamp and offer incense.',
        'Offer the naivedya by sprinkling water around the leaf, folding your hands and saying the deity’s name; keep the leaf in front of the deity for a few minutes while the aarti is performed.',
        'Distribute the holige as prasad: elders first, then children, then neighbours and guests. Many families give a holige to married women with tamboola (betel leaf, fruit, turmeric and kumkum).',
      ],
      serving:
        'Serve warm with a generous spoon of ghee, plus a bowl of thin sweetened coconut milk (haalu) or sugar. At Yugadi, serve holige together with bevu-bella, mango pachadi, kosambari, rice and saaru. Allow 2–3 holiges per adult.',
      storage:
        'Holige stay soft for 2 days at room temperature in a closed box lined with a cloth, and for 1 week in the refrigerator. Reheat on a tava with ghee. The hoorana keeps 5 days refrigerated. The oiled dough keeps overnight.',
      troubleshooting: [
        {
          problem: 'The dough is too sticky to pat out',
          fix: 'Oil your fingers more generously and rest the dough longer. A dough rested in oil for at least 3 hours is far easier to handle than a dough made the same day.',
        },
        {
          problem: 'The holige tears while patting',
          fix: 'The shell is too thin at the edges or the filling is too wet. Pat from the centre outward with very light pressure and cook the hoorana until dry.',
        },
        {
          problem: 'The holige is hard when cooled',
          fix: 'It was over-roasted. Use medium heat and cook only until light brown spots form. Store wrapped in a cloth while warm.',
        },
        {
          problem: 'The filling tastes raw or starchy',
          fix: 'The hoorana was not cooked long enough. Return to the pan and cook until it is dry and smells caramelised, then cool before using.',
        },
      ],
      variations: [
        'Kayi holige: replace the dal with 2 cups of fresh grated coconut cooked with 1 cup of jaggery until thick; add cardamom. The holige is moister and more aromatic.',
        'Toor dal holige: use 1 cup toor dal in place of chana dal for a lighter, less sweet filling, popular in northern Karnataka.',
        'Wheat holige: knead 1.5 cups of whole-wheat flour with 2 tbsp of oil and rest overnight for a healthier holige.',
        'Sugar holige: use 3/4 cup of sugar in place of jaggery for a lighter colour; some temples prefer this version.',
        'Vegan: use coconut oil to brush the holige; the recipe has no other animal ingredients.',
        'Jain-friendly: no onion, garlic or root vegetables; suitable as is.',
      ],
      tips: [
        'The oil-soaked dough is stretchy; pat, don’t roll, the holige.',
        'For kayi holige, replace the dal with 2 cups grated coconut cooked with jaggery.',
        'A rested dough is the key; plan the holige a day ahead if you can.',
        'Use a very thin spatula to flip the holige; it is delicate.',
      ],
      differs: 'Soft, thin, patted by hand on leaf; coconut or dal filling; oil-soaked dough.',
    },
    {
      id: 'andhra-bobbatlu',
      region: 'Andhra Pradesh & Telangana',
      culture: 'Telugu households — Ugadi, Varalakshmi Vratam, Sankranti',
      title: 'Bobbatlu (Bakshalu / Polelu)',
      intro:
        'The Telugu bobbattu is thin, almost translucent, with a soft sweet filling of chana dal and jaggery, or toor dal. The dough is maida with oil and is rested; it is patted on a banana leaf. It is eaten with ghee or hot milk.',
      story:
        'Bobbatlu (also called bakshalu or polelu in some districts) is the signature sweet of Telugu festivals. It is made for Ugadi, for Varalakshmi Vratam, for Sankranti and for weddings, where it is a mark of hospitality. A mother-in-law who makes soft, thin bobbatlu is considered a good cook, and the skill of patting them out on a banana leaf is passed from generation to generation.\n\nThe poornam (filling) is made from chana dal and jaggery, though some households use toor dal for a lighter sweetness or mix a little grated coconut into the filling. A pinch of dry ginger powder is characteristically Telugu; it lifts the sweetness and aids digestion. The dough is a mixture of maida, a little fine rava and plenty of oil, kneaded very soft and rested for two or more hours. The resting is crucial: the dough absorbs the oil and becomes so elastic that it can be stretched into a very thin sheet around the filling.\n\nBobbatlu are not rolled. Instead, a ball of stuffed dough is placed on an oiled banana leaf and patted with the fingers into a thin disc, and then it is lifted and laid on a hot tava. The result is a flatbread that is thinner and paler than Maharashtra’s puran poli and richer in ghee. Telugu families often eat it with a spoon of ghee and a cup of hot milk, or crumble it into milk as a sweet dessert.',
      serves: '10 bobbatlu',
      prep: '40 min + 2 hrs resting',
      cook: '30 min',
      equipment: [
        'Pressure cooker — to soften the chana dal to a tender but intact stage.',
        'Heavy-bottomed kadai — for cooking the poornam dry and stirring without scorching.',
        'Banana leaf or oiled plastic sheet — a banana leaf gives the traditional pattern and prevents sticking; wipe it and oil it lightly before use.',
        'Flat tava — an iron or non-stick one, heated to medium.',
        'Thin steel spatula — to lift and flip the delicate bobbattu.',
      ],
      ingredients: [
        {
          group: 'Filling (poornam)',
          items: [
            '1 cup (200 g) chana dal — washed and soaked 30 minutes; split chana dal gives a nutty, authentic taste.',
            '1 cup (200 g) grated jaggery — choose clean light jaggery; dark jaggery makes the filling taste bitter.',
            '1/2 tsp (1 g) cardamom powder — freshly ground for a strong aroma.',
            '1/4 tsp dry ginger powder (sonti) — optional, but gives the unmistakable Telugu flavour and aids digestion.',
            '2 tsp (10 g) ghee — for a glossy filling that does not stick.',
          ],
        },
        {
          group: 'Dough',
          items: [
            '1.5 cups (200 g) maida — sifted, for a smooth dough.',
            '1 tbsp (10 g) fine rava — gives a slight crispness at the edges.',
            '4 tbsp (60 ml) oil, plus 1/4 cup (60 ml) for resting — the dough rests submerged in oil; use a light oil such as sesame or sunflower.',
            'A pinch of salt and turmeric — salt balances the sweetness and turmeric gives a pale gold tint.',
            'Water as needed — about 1/2 cup (120 ml); warm water makes a softer dough.',
            'Ghee for roasting — 3 tbsp; brush it over each bobbattu as it cooks.',
          ],
        },
      ],
      mise: [
        'Mix and knead the dough 2 hours before cooking; cover it with oil so it does not dry.',
        'Cook and drain the chana dal thoroughly, then let it cool.',
        'Cut banana leaf squares about 9 inches wide and wipe them with a damp cloth.',
        'Keep a bowl of oil, the leaf, a thin spatula and the heated tava ready.',
        'Measure and mix the spices so they are ready to add as soon as the filling is dry.',
      ],
      method: [
        {
          title: 'Cook the chana dal',
          text: 'Soak the dal for 30 minutes, drain, and pressure-cook with 2.5 cups of water for 3 whistles. When the pressure drops, drain the dal fully in a colander for 10 minutes, keeping the cooking water to use in a rasam or sambar.',
          why: 'Properly drained dal avoids a wet filling and a bobbattu that tears.',
          cue: 'the dal is tender but holds its shape, and you see no water pooling in the colander.',
        },
        {
          title: 'Grind to a coarse paste',
          text: 'Place the drained dal in a mixer or grinder and pulse for a few seconds without any water until you get a coarse, crumbly paste. Transfer it to a heavy kadai.',
          why: 'A coarse paste cooks evenly with jaggery and gives the filling a pleasant texture rather than a pasty one.',
          cue: 'the dal looks like crumbly meal, not a smooth paste.',
        },
        {
          title: 'Cook the poornam',
          text: 'Add the grated jaggery to the dal and cook on medium-low heat for 10–12 minutes, stirring constantly. The jaggery will melt, making the mixture wet, and then will gradually thicken. Continue until the mass is dry and leaves the pan, and the aroma of caramelised jaggery rises.',
          why: 'Moisture evaporation is the key to a filling that can be stuffed and patted thin.',
          cue: 'the mixture forms a firm ball when gathered, and the spoon leaves a clear streak behind.',
        },
        {
          title: 'Season and shape the filling',
          text: 'Mix in the cardamom, dry ginger and ghee. Let the mixture cool, and then divide it into 10 equal balls, each about the size of a small lemon. Roll them smooth with your palms.',
          why: 'Cooling firms the filling and prevents it from melting the dough as you stuff it.',
          cue: 'the balls are smooth and hold together without crumbling.',
        },
        {
          title: 'Make and rest the dough',
          text: 'Combine the maida, rava, salt and turmeric. Add 4 tbsp oil and warm water, a little at a time, and knead for 10 minutes into a very soft, smooth dough. Pour 1/4 cup of oil over it, cover and rest for at least 2 hours.',
          why: 'The oil softens the gluten, which lets the dough stretch as thin as a membrane without tearing around the filling.',
          cue: 'the dough is supple, glossy and almost elastic, and a small piece stretches into a transparent sheet.',
        },
        {
          title: 'Stuff the dough',
          text: 'Take a lemon-sized ball of dough and flatten it with oiled fingers to a 3-inch disc. Place a ball of poornam in the centre. Pull the edges up and over the filling, seal them, and pinch off the excess. Flatten the ball slightly between your palms.',
          why: 'The dough should enclose the filling completely; any gap becomes a leak when the bobbattu is flattened.',
          cue: 'the stuffed ball is smooth and round with no tears.',
        },
        {
          title: 'Pat the bobbattu thin',
          text: 'Put the stuffed ball on an oiled banana leaf. With oiled fingers, pat it gently from the centre outward, turning the leaf as you work, until you have a thin circle of about 7 inches. Keep your fingers oiled throughout, and do not rush.',
          why: 'Patting spreads the filling evenly and gives the bobbattu its characteristic thinness without breaking the shell.',
          cue: 'the disc is even, almost translucent at the edges, and the golden filling shows faintly through.',
        },
        {
          title: 'Cook on the tava',
          text: 'Heat the tava on medium heat. Lift the leaf and invert it so that the bobbattu falls on the tava; peel the leaf off. Cook for about 1 minute, drizzle a little ghee, flip with a thin spatula and cook the other side for another minute until pale golden brown with lighter spots.',
          why: 'Cooking over medium heat dries the surface slightly so the bobbattu stays soft but not raw; flipping once keeps it tender.',
          cue: 'the bobbattu has light brown spots, is soft to touch and smells of ghee and cardamom.',
        },
      ],
      offering:
        'Offered at Ugadi and Varalakshmi Vratam with payasam and pulihora, and given to the guests at Sankranti.',
      ritual: [
        'Make the bobbatlu after bathing, in a clean kitchen, with the first one reserved for the deity without being tasted.',
        'On a banana leaf in front of the deity, arrange the bobbatlu with a bowl of ghee, payasam, pulihora and fruit; place a whole coconut and betel leaves beside them.',
        'Light a lamp and incense and offer the naivedya by sprinkling water around the leaf, folding your hands, and saying the deity’s name or reciting the prayer your family follows.',
        'Keep the offering in front of the deity during the aarti, then remove it and serve as prasad.',
        'At Varalakshmi Vratam, give bobbatlu with tamboolam (betel leaf, areca nut, turmeric, kumkum, fruit) to the married women who visit.',
      ],
      serving:
        'Serve bobbatlu warm, brushed with ghee, with a cup of hot milk or a bowl of sweetened thin coconut milk. At festivals they are part of a larger spread with pulihora, payasam, vada and gutti vankaya curry. Allow 2 per adult.',
      storage:
        'Bobbatlu stay soft for 2–3 days at room temperature in a closed steel box lined with a cloth. Refrigerate for up to 5 days. Reheat on a tava with a drizzle of ghee. The poornam can be refrigerated for 1 week.',
      troubleshooting: [
        {
          problem: 'The bobbattu is hard and dry',
          fix: 'The dough was rested too little or cooked on high heat. Rest it in oil for 2+ hours and cook on medium heat. Wrap warm bobbatlu in a cloth so steam keeps them soft.',
        },
        {
          problem: 'The filling squeezes out through the dough',
          fix: 'The shell is too thin or the filling is too wet. Use a thicker layer of dough at the sealing point and cook the filling until completely dry.',
        },
        {
          problem: 'The dough sticks to the banana leaf',
          fix: 'The leaf or your fingers were not oiled enough. Oil both generously, and wipe the leaf dry before oiling.',
        },
        {
          problem: 'The bobbattu tears when flipped',
          fix: 'Use a thin metal spatula and flip quickly in one motion. Make sure the first side is lightly cooked and dry before turning.',
        },
      ],
      variations: [
        'Toor dal bobbatlu: use toor dal instead of chana dal for a milder, less nutty filling.',
        'Coconut bobbatlu (kobbari bobbatlu): replace the dal with 2 cups of freshly grated coconut cooked with 1 cup of jaggery; a moist and fragrant version.',
        'Poornam boorelu: instead of making a flatbread, shape the same filling into balls, dip them in a rice-and-urad batter and deep-fry; a Telugu festival favourite.',
        'Sugar bobbatlu: use 3/4 cup of sugar in place of jaggery for a lighter colour.',
        'Vegan: replace the ghee in the filling and for roasting with coconut oil.',
        'Jain-friendly: the recipe contains no onion, garlic or root vegetables.',
      ],
      tips: [
        'Don’t knead the dough with force — it should be as soft as an earlobe.',
        'The poli stays soft for a day wrapped in cloth.',
        'Oil your fingers and the leaf generously; the soft dough needs it.',
        'Use a thin metal spatula, as a thick one tears the delicate bobbattu.',
      ],
      differs: 'Thin and translucent; maida only; ghee and dry-ginger notes.',
    },
    {
      id: 'gujarat-vedmi',
      region: 'Gujarat',
      culture: 'Gujarati Vaishnava and Jain households',
      title: 'Vedmi / Puran Poli',
      intro:
        'Gujarat’s puran poli uses toor dal and a milder sweetness, with nutmeg and cardamom; the dough is wheat with a little maida and a lot of ghee. It is served at festivals and weddings with a hot kadhi.',
      story:
        'In Gujarat, the stuffed sweet roti is called vedmi (also vedhmi or puranpoli), and it is one of the most important festive foods of the Gujarati kitchen. It is made on Janmashtami, on Dussehra, during the month of Shravan, at weddings, at thread ceremonies and at family celebrations. A Gujarati festive thali often features vedmi as the centrepiece, accompanied by a bowl of hot, sweet-sour kadhi and a spoonful of ghee.\n\nCompared with the Maharashtrian and Karnataka versions, Gujarati vedmi is characterised by two things. First, the filling is made from toor dal (arhar dal) rather than chana dal, which gives a lighter, creamier and less assertive filling. Second, it is generally less sweet; many Gujarati cooks use a mixture of jaggery and sugar, or just sugar, with a generous dose of nutmeg and cardamom.\n\nThe dough is also distinctive. It is mostly whole-wheat flour with a smaller portion of maida and a generous quantity of ghee worked in (called moyan), making the poli rich, short and tender. Because of the ghee, the poli is eaten without any extra topping, though a spoon of ghee is always offered. Many Gujarati families are vegetarian Vaishnavas or Jains, so the vedmi contains no onion, garlic or root vegetable and is made with scrupulous cleanliness.',
      serves: '8 polis',
      prep: '35 min',
      cook: '30 min',
      equipment: [
        'Pressure cooker — for cooking the toor dal until very soft.',
        'Heavy-bottomed pan — for cooking the filling dry and stirring easily.',
        'Rolling pin and board — a thin pin gives a more controlled, thin vedmi.',
        'Two oiled plastic sheets (or parchment) — rolling between them prevents sticking and keeps the shell intact.',
        'Iron tava — for roasting with ghee on medium heat.',
      ],
      ingredients: [
        {
          group: 'Filling',
          items: [
            '1 cup (200 g) toor dal — washed well; choose unpolished toor dal for a better aroma.',
            '1 cup (200 g) grated jaggery, or 3/4 cup (150 g) sugar — jaggery gives a darker colour and more depth; sugar gives a lighter, milder filling. Many families use half and half.',
            '1/2 tsp (1 g) cardamom powder — freshly ground for fragrance.',
            '1/2 tsp (1 g) nutmeg powder — essential to the Gujarati flavour.',
            '2 tsp (10 g) ghee — for richness and shine.',
          ],
        },
        {
          group: 'Dough',
          items: [
            '1.5 cups (190 g) whole-wheat flour — fine atta gives a soft dough.',
            '1/2 cup (65 g) maida — lightens the dough so the vedmi is tender.',
            '3 tbsp (45 g) ghee (moyan) — rubbed into the flour until it resembles breadcrumbs; this makes the poli short and flaky.',
            'A pinch of salt — balances the sweetness.',
            'Warm water to knead — about 1/2 cup (120 ml); add gradually.',
            'Ghee for roasting and serving — about 4 tbsp.',
          ],
        },
      ],
      mise: [
        'Wash the toor dal 2–3 times and pressure-cook it with 3 cups of water for 3 whistles, until very soft.',
        'Prepare the dough and rest it for 30 minutes under a damp cloth.',
        'Grate the jaggery fine, or powder the sugar.',
        'Grind the cardamom and grate the nutmeg freshly.',
        'Cut two plastic sheets or butter paper squares for rolling.',
      ],
      method: [
        {
          title: 'Cook and drain the toor dal',
          text: 'Pressure-cook the washed toor dal with 3 cups of water and a pinch of turmeric for 3 whistles. After the pressure drops, drain the dal in a colander for 10 minutes and save the water for kadhi or dal. Press gently to remove any remaining water.',
          why: 'Toor dal holds more water than chana dal, so draining is vital; a wet filling makes the vedmi tear.',
          cue: 'the dal mashes easily with a spoon and no water drains from it when pressed.',
        },
        {
          title: 'Cook the filling dry',
          text: 'Place the drained dal and jaggery (or sugar) in a heavy pan. Cook on medium-low heat, stirring constantly, for 8–10 minutes until the mixture becomes dry and leaves the sides of the pan. Be patient; the sugar first turns liquid and then reabsorbs.',
          why: 'This step evaporates the moisture released by the melted sugar so that the filling can be rolled inside the dough.',
          cue: 'a spoon pulled through the mixture leaves a visible track and the mass moves as a single ball.',
        },
        {
          title: 'Flavour and mash the filling',
          text: 'Switch off the heat, stir in the cardamom, nutmeg and ghee, and mash the mixture with a potato masher until it is smooth and no whole grains remain. Cool completely and divide into 8 equal balls.',
          why: 'Spices are added at the end to preserve their perfume; mashing gives a smooth filling that spreads evenly.',
          cue: 'the filling is smooth, thick and rolls into a ball without sticking to your palm.',
        },
        {
          title: 'Make the dough',
          text: 'Mix the whole-wheat flour, maida and salt. Rub in the ghee with your fingertips for 2–3 minutes until the mixture looks like breadcrumbs and holds together when squeezed. Add warm water gradually and knead into a smooth, soft dough. Rest for 30 minutes.',
          why: 'Rubbing in the ghee coats the flour so the poli is tender and flaky instead of chewy.',
          cue: 'the dough is soft and smooth, springs back slowly when pressed, and does not stick to your hands.',
        },
        {
          title: 'Stuff the dough',
          text: 'Divide the dough into 8 balls, each slightly smaller than a filling ball. Flatten a dough ball into a cup, place a filling ball in the centre and pull the edges together over it. Seal and pinch off the excess dough. Flatten gently between your palms.',
          why: 'A smaller dough ball keeps the shell thin; sealing prevents leaking.',
          cue: 'the stuffed ball is round and smooth with no cracks.',
        },
        {
          title: 'Roll the vedmi',
          text: 'Place the stuffed ball between two lightly oiled plastic sheets or on a floured board. Roll gently from the centre outward into a 6-inch circle, applying even pressure and turning the sheet as you go. If it sticks, dust lightly with wheat flour.',
          why: 'Rolling between oiled sheets avoids sticking and protects the fragile shell.',
          cue: 'the vedmi is a thin, even circle, golden filling just visible, with no tears.',
        },
        {
          title: 'Roast with ghee',
          text: 'Heat the tava on medium heat. Peel off the top sheet, lay the vedmi on the tava and peel off the bottom sheet. Cook for 1 minute, flip, and brush with ghee. Flip once more and cook until both sides are golden brown with darker spots, about 3 minutes in all.',
          why: 'Medium heat cooks the filling through and crisps the surface gently; ghee gives flavour and keeps the vedmi soft.',
          cue: 'golden spots appear on both sides, the edges look dry, and the vedmi smells of ghee and cardamom.',
        },
      ],
      offering:
        'Offered to the deity during Janmashtami, Dussehra and Shravan, with ghee, and followed by the sweet–sour meal.',
      ritual: [
        'Make the vedmi only after bathing, in a clean kitchen, and set the first one aside for the deity before any family member tastes it.',
        'Arrange the vedmi on a clean plate with a bowl of ghee and other sweets in front of the household deity (for Janmashtami, in front of Bal Krishna).',
        'Light the lamp and incense, and offer the naivedya by sprinkling water around the plate while folding your hands and saying the deity’s name.',
        'Keep the plate in front of the deity for a few minutes while the aarti is performed.',
        'Distribute the vedmi to the family as prasad, starting with the elders, and share it with neighbours and guests.',
      ],
      serving:
        'Serve vedmi hot with a spoon of ghee and a bowl of hot Gujarati kadhi, alongside dal-bhaat, shaak, farsan and papad. It is often eaten at the main meal rather than as a separate dessert. Allow 2 per adult.',
      storage:
        'Vedmi keeps well for 2 days at room temperature in a covered container and for 5 days in the refrigerator. Reheat on a tava with a little ghee. The filling can be refrigerated for 1 week.',
      troubleshooting: [
        {
          problem: 'The vedmi breaks while rolling',
          fix: 'The filling is too wet or the dough too dry. Cook the filling until completely dry and add a spoon more warm water to the dough; roll between oiled sheets.',
        },
        {
          problem: 'The vedmi is too sweet',
          fix: 'Reduce the jaggery or sugar to 3/4 cup next time, and use slightly more nutmeg and cardamom to balance.',
        },
        {
          problem: 'The vedmi is hard and dry',
          fix: 'The dough needed more ghee or was cooked on high heat. Rub in the full 3 tbsp of ghee and cook on medium heat; wrap in a cloth after roasting.',
        },
        {
          problem: 'The filling sticks to the pan',
          fix: 'Stir constantly with a flat spoon and lower the heat; use a heavy-bottomed pan.',
        },
      ],
      variations: [
        'Chana dal vedmi: swap in chana dal for a nuttier, more Maharashtrian-style filling.',
        'Sugar vedmi: use only sugar for a lighter, pale filling.',
        'Dry-fruit vedmi: mix 2 tbsp of chopped almonds and cashews into the filling.',
        'Whole-wheat only: skip the maida and use 2 cups of whole-wheat flour with 3 tbsp of ghee.',
        'Vegan: replace ghee with coconut oil in the dough and for roasting.',
        'Jain-friendly: the recipe has no onion, garlic or root vegetables and is suitable as is.',
      ],
      tips: [
        'Roll the poli between two oiled sheets of plastic for an even thin finish.',
        'The ghee in the dough is what makes the vedmi tender; do not reduce it.',
        'Toor dal needs thorough draining; do not skip that step.',
        'Serve hot, with kadhi, for the authentic Gujarati experience.',
      ],
      differs: 'Toor dal; wheat-ghee dough; served with kadhi.',
    },
  ],
}

export default recipe
