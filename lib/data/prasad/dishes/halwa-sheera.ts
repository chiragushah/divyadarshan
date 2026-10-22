import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'halwa-sheera',
  name: 'Halwa, Sheera & Kada Prasad',
  alsoCalled: 'Karah Prasad · Sheera · Shiro · Satyanarayana Prasadam · कड़ा प्रसाद',
  category: 'Sweet',
  summary: 'Roasted-semolina or wheat-flour halwa in ghee and sugar — the prasad of gurdwaras and Satyanarayana puja.',
  meaning:
    'Three communities, one idea: wheat browned slowly in ghee, then bound with sweet water into a soft, glossy mass. In a Sikh gurdwara it is kada prasad (karah prasad), made from whole-wheat flour, ghee and sugar in equal parts, and it is the one offering that every person who enters the hall receives, with cupped hands, whatever their background. In Maharashtra and Gujarat it is the sheera of the Satyanarayan puja, traditionally measured in the sava (one and a quarter) proportion that stands for abundance. In Andhra Pradesh, at Annavaram and in homes across the Godavari districts, it is a godhuma rava prasadam of broken wheat, ghee, sugar and cardamom. The steps are alike (roast, add liquid, cook off, finish with ghee), but the grain, the measure and the prayers that surround it are different, which is why the three are given separate recipes below.',
  variants: [
    // ───────────────────────────── SIKH KADA PRASAD ─────────────────────────────
    {
      id: 'sikh-kada-prasad',
      region: 'Punjab & Sikh gurdwaras everywhere',
      culture: 'Sikh tradition — Baisakhi, Guru Nanak Jayanti, Hola Mohalla',
      title: 'Kada (Karah) Prasad',
      intro:
        'Whole-wheat flour, desi ghee and sugar in exactly equal parts by weight, roasted until deep golden and bound with hot sugar water. It is offered at the Guru Granth Sahib and handed to every person present.',
      story:
        'Kada prasad is the sacrament of the Sikh congregation. Whenever the Guru Granth Sahib is opened for a service, whether at the Golden Temple, a small village gurdwara or a home akhand path, a bowl of karah prasad is placed before the Guru, and at the close of the service it is distributed to everyone in the sangat. Receiving it is not a favour: the Sikh tradition treats the equal sharing of the same food by all, regardless of caste, wealth or faith, as a living expression of the Guru’s teaching of equality.\n\nThe recipe is deliberately simple and is traditionally given as equal parts: one part flour, one part ghee, one part sugar, and about four parts water. Many sevadars (volunteers) remember it by the number “one, one, one, four”. The prasad is prepared by Amritdhari Sikhs or by sevadars who have bathed, covered their heads and recite Waheguru or the Japji Sahib while they stir, so cooking itself is a form of seva, service. Nothing else is added, no cardamom, no nuts, so that the offering is the same everywhere in the world.\n\nThe cooking takes concentration. The flour must be roasted in ghee slowly enough to turn a deep, even brown without burning, and then bound with boiling syrup that sputters violently when it meets the hot roux. The finished kada should be glossy, soft, and leave ghee at the edges, and it is always served warm.',
      serves: '12–15 handfuls (about 750 g prasad)',
      prep: '10 min',
      cook: '25 min',
      equipment: [
        'Heavy flat-bottomed iron karahi or thick steel pot — the traditional “karah” gives the dish its name, and a thick base roasts flour evenly without scorching',
        'Long-handled steel spoon (karchhi) — keeps your hands and face away from the spluttering when syrup meets the roux',
        'Separate small pan for the syrup — sugar and water must be boiling hot when added, so they are prepared in parallel',
        'Clean steel thaal (large plate) or bowl for the offering — in a gurdwara it is covered with a clean cloth until the ardas',
      ],
      ingredients: [
        {
          group: 'Equal parts by weight',
          items: [
            '1 cup (about 120 g) atta, whole-wheat flour — fine chakki atta gives the nutty depth; do not use maida (refined flour), which turns gluey',
            '1/2 cup plus 1 tbsp (about 120 g) pure desi ghee — the ghee must equal the flour in weight, which is what makes the halwa glossy and non-sticky',
            '1/2 cup plus 2 tbsp (about 120 g) sugar — plain white sugar; it dissolves clean and keeps the colour of the roasted flour',
            '2 cups (480 ml) water — this is the “four” in one-one-one-four; hot water prevents the roux from seizing',
          ],
        },
      ],
      mise: [
        'Weigh the flour, ghee and sugar on a kitchen scale. Measuring cups are fine, but the equal-weight rule is what makes kada work, so weigh if you can.',
        'Bathe, cover your head and wash your hands; in a gurdwara kitchen the cooks also keep a quiet, prayerful mood while cooking.',
        'Boil the water with the sugar in a small pan until the sugar dissolves, then keep it at a gentle simmer next to the stove. It must be hot when it goes into the roux.',
        'Keep a lid or a large plate nearby to cover the karahi briefly if the mixture spits too fiercely.',
        'Place a clean steel thaal or bowl, and a clean cloth to cover it, ready for the offering.',
      ],
      method: [
        {
          title: 'Melt the ghee',
          text:
            'Place the karahi on medium-low heat and add all of the ghee. Let it melt completely and warm for a minute, until a drop of flour dropped into it sizzles gently. Do not let it smoke.',
          why: 'The ghee must be hot enough to start roasting the flour as soon as it goes in, but smoking ghee tastes burnt and spoils the flavour.',
          cue: 'The ghee is clear and shimmering, and a pinch of flour sizzles slowly without browning at once.',
        },
        {
          title: 'Add the atta and begin roasting',
          text:
            'Pour in the flour all at once and stir quickly to break up any lumps. Reduce the heat to low. The mixture will look like a wet sand at first. Keep stirring constantly with the karchhi, sweeping the whole base of the pan, for the first 5 minutes.',
          why: 'Constant stirring stops the flour at the base from burning before the top has started to cook.',
          cue: 'The mixture is a loose, pale, sandy paste that begins to smell like warm bread.',
        },
        {
          title: 'Roast slowly to a deep golden brown',
          text:
            'Continue stirring on low heat for 12–15 minutes. The paste will loosen, turn from pale cream to golden, and then to a deep, even tan-brown. Do not hurry; if the flour darkens at the edge faster than the centre, lift the pan off the heat briefly and stir.',
          why: 'Roasting the flour is the entire flavour of kada. Underroasted flour tastes raw and pasty; overroasted flour tastes bitter.',
          cue: 'The mixture turns a rich toasted-wheat brown, smells deeply nutty, and the ghee begins to separate slightly at the edges.',
        },
        {
          title: 'Bring the sugar syrup to a rolling boil',
          text:
            'While the flour roasts, make sure the sugar syrup is bubbling hot. Just before you add it, stand back and keep your face turned away. The syrup should be at a full simmer when it meets the roux.',
          why: 'Cold or lukewarm syrup lowers the temperature of the roux suddenly, and the flour can turn lumpy and gluey instead of smooth.',
          cue: 'The syrup is clear, with small steady bubbles, and the sugar is fully dissolved.',
        },
        {
          title: 'Add the syrup in a thin stream',
          text:
            'Turn the heat to low. Standing back with the karchhi in one hand, pour the hot syrup into the roasted flour in a slow, steady stream with the other hand while stirring continuously. It will spit and steam violently for several seconds. Keep stirring until the spluttering stops.',
          why: 'The hot syrup hitting hot ghee causes a violent reaction. A thin stream and constant stirring prevent lumps and keep the mixture smooth.',
          cue: 'The roux loosens into a thick, shiny liquid with no dry flour pockets, and the noise falls to a gentle bubbling.',
        },
        {
          title: 'Cook off the moisture',
          text:
            'Continue to stir on low heat for 4–6 minutes. The mixture will thicken suddenly, begin to pull away from the sides of the karahi and gather into one soft mass. Ghee will surface at the edges. Stop when it forms a single glossy mass and no liquid pools remain.',
          why: 'Cooking off the extra water gives kada its soft, cohesive, fudge-like texture. Stopping too early leaves it wet; too late makes it stiff.',
          cue: 'The halwa leaves the sides of the pan cleanly and clumps around the spoon, with a glossy ghee sheen on top.',
        },
        {
          title: 'Rest, cover and offer',
          text:
            'Turn off the heat. Cover the karahi with a clean cloth or lid for five minutes, then transfer the kada into the clean thaal. Smooth the top gently with the back of the spoon. Cover it with a clean cloth and carry it to the place of offering.',
          why: 'Resting lets the grains settle and the ghee distribute evenly. Covering protects the offering until the ardas.',
          cue: 'The kada is glossy, deep brown, soft but holding its shape, with a faint ghee halo at the edges.',
        },
      ],
      offering:
        'Placed before the Guru Granth Sahib during the service, covered with a cloth, and blessed during the ardas. Afterwards the granthi covers it with a kirpan touch or says a prayer, and it is distributed to everyone present.',
      ritual: [
        'Prepare the kada after bathing, with head covered, and with the mind kept on the Guru’s name. Sevadars commonly recite Waheguru or the Japji Sahib while cooking.',
        'Carry the covered kada to the diwan (hall) and place it near the Guru Granth Sahib, on a clean cloth. In gurdwaras it is often prepared in the langar kitchen and brought in by volunteers.',
        'At the end of the service, the congregation stands for the ardas, the supplication. The granthi or a leader recites it with the kada in front of the Guru.',
        'After the ardas, the cover is removed. The granthi touches the kada with a kirpan (small sword) while praying, which is the formal sanctification.',
        'The kada is then served to all with a spoon into cupped hands. The receiver holds both palms together (right over left), accepts with a bow and eats it right away, and nobody refuses.',
      ],
      serving:
        'Serve warm into cupped hands or onto a leaf plate. A portion of about two tablespoons (a small handful) is customary. In a gurdwara, the first portions go to the five Beloved Ones (Panj Piare) if present, then to all, with no distinction of rank. At home, the kada is also shared with neighbours.',
      storage:
        'Because it is made with ghee and sugar, kada keeps for 2–3 days at room temperature in a covered container and up to a week in the refrigerator. Warm gently in a pan with a spoon of ghee before serving again.',
      troubleshooting: [
        {
          problem: 'The kada is lumpy with white flour pockets.',
          fix: 'The syrup went in too fast or was not hot enough. Break the lumps with the back of a spoon, return to low heat and stir hard for two to three minutes; next time pour a thin stream.',
        },
        {
          problem: 'The kada is pale and raw-tasting.',
          fix: 'The flour was not roasted long enough. Return the pan to low heat with a spoon of ghee and stir for five more minutes until browned; this will rescue most batches.',
        },
        {
          problem: 'The kada is hard and stiff when cooled.',
          fix: 'It was cooked too long after the syrup. Warm it with 2–3 tablespoons of hot water and a spoon of ghee and stir until soft.',
        },
        {
          problem: 'The kada tastes bitter or burnt.',
          fix: 'The flour browned too fast. If only the base is burnt, move the good portion to a clean pan without scraping. Roast on lower heat next time and stir steadily.',
        },
      ],
      variations: [
        'Some households add a small pinch of cardamom, but gurdwara kada is kept plain by tradition; the version here is the gurdwara one.',
        'In some Punjabi homes, jaggery (gur) syrup replaces sugar for a darker, earthier karah prasad; keep the equal-parts rule.',
        'A smaller home quantity can be made with 1/2 cup flour, 1/4 cup plus 1 tbsp ghee, 1/4 cup plus 2 tsp sugar, 1 cup water (the one-one-one-four rule scales to any size).',
        'The kada can be made with coarse atta or a mix of atta and semolina in some regions, but the standard gurdwara recipe uses plain atta.',
        'For a vegan household, the ghee must be kept because the tradition requires it; no substitute is used for the gurdwara offering.',
      ],
      tips: [
        'Remember “one, one, one, four” and you can make kada in any quantity.',
        'Keep the face turned away when the syrup goes in, because the spluttering can burn.',
        'Patience at the roasting stage decides the flavour; the colour should be like toasted wheat, not dark.',
      ],
      differs: 'Atta-ghee-sugar 1:1:1, plain — no spices or fruit.',
    },

    // ───────────────────────────── MAHARASHTRA / GUJARAT SHEERA ─────────────────────────────
    {
      id: 'maharashtra-gujarat-sheera',
      region: 'Maharashtra & Gujarat',
      culture: 'Marathi and Gujarati households — Satyanarayan puja',
      title: 'Satyanarayan Sheera (sava-measure prasad)',
      intro:
        'Fine semolina roasted in ghee and cooked in milk and water with sugar, flavoured with cardamom and banana, in the sava (one-and-a-quarter) measure for the Satyanarayan puja.',
      story:
        'The Satyanarayan puja, in which the Lord is worshipped as Truth, is performed in Marathi and Gujarati homes on the full moon, at a housewarming, a wedding or the start of a new venture. Its prasad is a sheera (called sheero in Gujarati) made of semolina, and the measure matters: the ingredients are taken in sava, “one and a quarter”, so that 1¼ cups each of semolina, ghee, sugar and milk are used. The extra quarter stands for a surplus, a blessing of more than enough, and the tradition has been kept for generations.\n\nThe prasad is made fresh for the puja, and in many homes it is made with a small piece of banana mixed in, along with a leaf of tulsi that is placed on top after the offering. In some families, five fruits and the panchamrita accompany it.\n\nThe preparation is a good lesson in patience. The semolina has to be roasted slowly in ghee until it smells of toasted nuts and turns a pale gold. The milk-and-water liquid is added hot, in the proportion the semolina can drink, and the sheera is steamed briefly under a lid so that every grain swells fully before the sugar goes in.',
      serves: '8–10 people (about 5–6 cups)',
      prep: '10 min',
      cook: '25 min',
      equipment: [
        'Heavy-bottomed kadai or wide steel pan — an even base roasts the semolina without browning in patches',
        'Small saucepan for the hot milk and water — adding hot liquid avoids lumps and a sudden temperature drop',
        'Flat wooden spoon (ladle) — the flat edge scrapes the base and keeps the sheera moving',
        'Lid that fits the kadai — for the short steaming step that finishes the grains',
      ],
      ingredients: [
        {
          group: 'Sava measure — 1¼ of each',
          items: [
            '1¼ cups fine semolina (sooji/rava) — fine, not coarse, gives a smooth sheera; the “fine” grade is sold as bombay rava',
            '1¼ cups ghee, desi — the sava measure is traditional; reduce to 3/4 cup if you prefer a lighter sheera, but it will be less glossy',
            '1¼ cups sugar — adjust down to 1 cup if the banana is very ripe',
            '1¼ cups milk — full-fat milk makes the sheera soft',
            '2½ cups water — double the measure of milk; the semolina needs both to cook fully',
          ],
        },
        {
          group: 'For flavour',
          items: [
            '1 ripe banana, mashed — traditional in many Marathi homes; it adds moisture and a gentle fruity sweetness',
            '1 tsp freshly ground cardamom — added at the end for fragrance',
            '2 tbsp raisins and 2 tbsp cashew halves — fried in ghee for crunch',
            '8–10 saffron strands in 1 tbsp warm milk — optional, for colour and aroma',
            'A few tulsi leaves — for the offering on top, not cooked into the sheera',
          ],
        },
      ],
      mise: [
        'Measure all the ingredients before starting. Because the sava proportion is so specific, use the same cup for every measure.',
        'Heat the milk and water together in a saucepan until just steaming, then keep it hot. Hot liquid is crucial for a smooth sheera.',
        'Mash the banana with a fork and keep it ready; if it is not very ripe, it will not blend into the sheera.',
        'Fry the cashews and raisins in 1 tablespoon of the ghee until golden and keep them aside.',
        'Wash the tulsi leaves and place them on a clean plate next to the stove for the offering.',
      ],
      method: [
        {
          title: 'Roast the semolina in ghee',
          text:
            'Heat the remaining ghee in the kadai on low heat. Add the semolina and stir continuously for 8–10 minutes, until it darkens to a pale golden colour, smells nutty and the grains look dry and separate. Do not hurry it with higher heat.',
          why: 'Roasting removes the raw flour taste and gives the sheera its nutty flavour. Rushing it browns the surface and leaves the centre raw.',
          cue: 'The semolina turns from white to pale gold, smells of toasted nuts, and the grains flow freely like sand.',
        },
        {
          title: 'Add the hot milk and water',
          text:
            'Standing back, pour the hot milk and water into the semolina in a slow stream while stirring constantly. It will sputter and rise. Keep stirring until the mixture is smooth and the spluttering stops.',
          why: 'Hot liquid prevents lumps. Adding it slowly while stirring lets each grain absorb evenly.',
          cue: 'The mixture is a smooth, thick porridge without any dry pockets.',
        },
        {
          title: 'Steam under a lid',
          text:
            'Reduce the heat to the lowest setting, cover the kadai with a lid and let the semolina steam for 3–4 minutes without opening it. Then uncover and stir once. The grains should have swollen and absorbed almost all the liquid.',
          why: 'Steaming lets the semolina finish cooking through, so the sheera is soft rather than gritty.',
          cue: 'Tasting a grain, there is no hard centre, and the sheera looks fluffy and thick.',
        },
        {
          title: 'Add the mashed banana and the sugar',
          text:
            'Stir in the mashed banana and then the sugar. The sheera will loosen as the sugar melts. Cook on low heat for 4–5 minutes, stirring constantly, until the mixture thickens again and starts to leave the sides.',
          why: 'Sugar draws moisture out, so it is added after the grain is cooked. The banana provides body and flavour.',
          cue: 'The sugar is fully dissolved, the sheera is glossy and pulls away from the sides of the pan.',
        },
        {
          title: 'Add cardamom and the fried nuts',
          text:
            'Stir in the cardamom, the saffron milk (if using) and the fried cashews and raisins, with their ghee. Mix well and cook for one more minute on the lowest heat, stirring, so everything is evenly distributed.',
          why: 'Aromatics are added at the end so they stay fragrant. The ghee from the nuts adds a final gloss.',
          cue: 'The sheera smells strongly of cardamom and ghee, with golden nuts distributed through it.',
        },
        {
          title: 'Check the finish and rest',
          text:
            'Turn off the heat. The sheera should be soft and slightly loose, as it firms on standing. If too dry, stir in 2–3 tablespoons of hot milk. Let it rest, covered, for 5 minutes.',
          why: 'Semolina keeps absorbing moisture as it stands, so it is better to finish slightly looser than you want.',
          cue: 'It holds a soft mound on the spoon and slowly relaxes.',
        },
        {
          title: 'Offer with tulsi',
          text:
            'Transfer a portion into the offering plate or bowl, smooth the top and place a tulsi leaf on it. Cover it with a clean cloth until the puja reaches the naivedya moment, and keep the rest warm.',
          why: 'The tulsi leaf is the signature of a Vishnu offering; it is added after cooking, not during.',
          cue: 'The plate is neat and warm, with a single green leaf on the sheera.',
        },
      ],
      offering:
        'Offered to Lord Satyanarayana in the evening puja, along with panchamrita, fruit and betel. The sheera is then distributed to all who attended.',
      ritual: [
        'Prepare the sheera after bathing and before the puja begins, in a clean kitchen, and make it in the sava measure if you follow the tradition.',
        'Set the sheera on a banana leaf or in a clean bowl on the puja altar next to the Satyanarayana photo or idol, together with panchamrita, fruits, betel leaf and nut.',
        'After the five chapters of the Satyanarayana katha are read (or heard), offer the naivedya with a short prayer, placing a tulsi leaf on each item.',
        'Perform the aarti with the lamp, then take the naivedya from the altar as prasad.',
        'Distribute the prasad to every person present and to neighbours; no one should leave without receiving it, and it is eaten before the meal.',
      ],
      serving:
        'Serve warm in small bowls or on leaf plates, a spoonful per person, before the meal. Alongside, serve the panchamrita and fruit. A cup of 1/3 per person is generous.',
      storage:
        'Because it contains milk and banana, eat the sheera the same day. Leftovers keep in the refrigerator for a day; warm with a splash of hot milk and a spoon of ghee.',
      troubleshooting: [
        {
          problem: 'The sheera has lumps.',
          fix: 'The liquid was added too fast or too cool. Press the lumps with the back of the spoon over low heat, and add a little more hot milk if needed.',
        },
        {
          problem: 'The sheera is sticky and gummy.',
          fix: 'It was overcooked after the liquid, or the semolina was underroasted. Loosen with hot milk and a spoon of ghee; next time roast longer.',
        },
        {
          problem: 'The sheera is dry and crumbly.',
          fix: 'Too little liquid. Sprinkle 1/4 cup hot milk, cover and steam for two minutes.',
        },
        {
          problem: 'It tastes raw.',
          fix: 'The semolina was not roasted enough. Return to low heat and stir for 3–4 minutes with a spoon of ghee.',
        },
      ],
      variations: [
        'Gujarati sheero often replaces the banana with a pinch of nutmeg and uses a little more milk, making a softer sheero.',
        'Some Marathi families use pineapple chunks in place of banana for a fruity sheera.',
        'In place of sugar, jaggery syrup is used in some villages; strain it and add at the end of cooking.',
        'For a fasting day, use rajgira (amaranth) flour or sabudana in place of semolina.',
        'A reduced-ghee version can be made by using 3/4 cup ghee, though the traditional offering is the sava measure.',
      ],
      tips: [
        'Use the same cup for every measure so the sava ratio stays true.',
        'Hot liquid, slow pour, constant stirring: these three prevent every common problem.',
        'Never put tulsi into the pan; add it only as the offering leaf.',
      ],
      differs: 'Semolina with banana; milk and water; tulsi on top.',
    },

    // ───────────────────────────── ANDHRA ANNAVARAM ─────────────────────────────
    {
      id: 'andhra-annavaram',
      region: 'Andhra Pradesh (Annavaram-style)',
      culture: 'Telugu Vaishnava — Satyanarayana Swamy vratam',
      title: 'Godhuma Rava Prasadam',
      intro:
        'Broken-wheat (godhuma rava) prasadam cooked in ghee and jaggery or sugar syrup with cardamom, in the style offered to Annavaram Sri Veera Venkata Satyanarayana Swamy.',
      story:
        'The Satyanarayana Swamy temple at Annavaram, on the Ratnagiri hill near the Pampa river in the East Godavari district, is among the most visited Vishnu shrines of Andhra Pradesh. Couples come from across the Telugu states to perform the Satyanarayana vratam there, and the prasadam given at the temple is famous: a soft, fragrant, broken-wheat sweet, wrapped in an leaf of the local tree and handed to every devotee.\n\nGodhuma rava is broken wheat, coarser than semolina, with a firm, chewy bite and a nutty, earthy flavour. In Telugu homes the Satyanarayana vratam is performed at home on the full moon and on family occasions, and the prasadam is made with the same grain. The idea of the wheat being roasted in ghee and then softly cooked in sweet water echoes the other regional versions, but the broken wheat needs more liquid and more patience than semolina.\n\nA good Annavaram-style prasadam is moist but not wet, with whole grains of wheat visible, fragrant with ghee and cardamom, and a mild sweetness that does not overwhelm the grain.',
      serves: '8 servings (about 4 cups)',
      prep: '10 min (+ 20 min soaking)',
      cook: '35 min',
      equipment: [
        'Heavy-bottomed kadai or wide pot — broken wheat needs an even base heat during the long cooking',
        'Pressure cooker (optional) — can be used to soften the wheat quickly before it is sweetened',
        'Ladle with a flat edge — to stir and scrape the base',
        'Lid — for the steaming phase that makes the grains plump',
      ],
      ingredients: [
        {
          group: 'For the prasadam',
          items: [
            '1 cup (about 160 g) godhuma rava (broken or cracked wheat, dalia) — choose the medium grind; fine grinds turn pasty',
            '1/2 cup ghee — plenty of ghee gives the glossy finish and the temple aroma',
            '3/4 cup sugar or 1 cup grated jaggery — Annavaram prasadam is typically sugar-sweetened; jaggery gives a darker, earthier version',
            '3 cups water — wheat is thirsty; hot water is added after roasting',
            '1/2 cup milk (optional) — makes the prasadam softer and richer',
          ],
        },
        {
          group: 'For flavour',
          items: [
            '1 tsp freshly ground cardamom — a defining flavour',
            '2 tbsp cashews and 1 tbsp raisins — fried in ghee for a crunch',
            '1 tbsp grated fresh or dried coconut (optional) — for a mild sweetness',
            'A pinch of edible camphor (optional) — a temple touch; edible grade only',
          ],
        },
      ],
      mise: [
        'Rinse the broken wheat quickly under running water, drain, and let it sit for 20 minutes to soften slightly.',
        'Heat the water (and milk if using) until hot but not boiling, and keep it next to the stove.',
        'If using jaggery, dissolve it in 1/2 cup hot water, strain through a fine sieve, and keep warm.',
        'Fry the cashews and raisins in 1 tablespoon of ghee, then set them aside.',
        'Crush the cardamom seeds in a mortar until fine.',
      ],
      method: [
        {
          title: 'Roast the wheat in ghee',
          text:
            'Heat the remaining ghee in the kadai on low heat. Drain the soaked wheat well, then add it and stir for 6–8 minutes until it smells nutty, turns a light golden colour and the grains look dry and separate.',
          why: 'Roasting browns the surface of the grain, adding nutty flavour and helping the grains hold their shape instead of dissolving.',
          cue: 'The wheat smells of toasted nuts and the grains move freely in the ghee.',
        },
        {
          title: 'Add hot water and cover',
          text:
            'Pour in the hot water (and milk) carefully while stirring; it will spit. Bring to a gentle boil, then reduce the heat to low, cover and cook for 15–18 minutes, stirring once or twice, until the wheat is tender and has absorbed most of the liquid.',
          why: 'Broken wheat is hard and needs steady moist heat to cook through. Cooking it plain before sweetening ensures it softens fully.',
          cue: 'A grain pressed between fingers is soft all the way through, with no white core.',
        },
        {
          title: 'Check the moisture before sweetening',
          text:
            'Uncover and look at the pan. The wheat should be soft with a little liquid left. If it is dry and still firm, add 1/2 cup hot water, cover and cook 5 minutes more. If too wet, cook uncovered for a minute or two.',
          why: 'Sugar and jaggery stop the wheat softening, so it must be fully cooked and correctly moist before they go in.',
          cue: 'The wheat is soft and plump, sitting in a thin film of liquid rather than swimming in it.',
        },
        {
          title: 'Add the sugar or jaggery',
          text:
            'Stir in the sugar, or pour in the strained jaggery syrup. The mixture will loosen. Cook uncovered on low heat for 6–8 minutes, stirring constantly, until it thickens and starts to leave the sides of the pan.',
          why: 'The sweetener melts into the remaining liquid and then cooks off, giving the prasadam its moist but cohesive texture.',
          cue: 'No liquid pools remain, the surface glistens and the prasadam gathers around the spoon.',
        },
        {
          title: 'Add cardamom, coconut and nuts',
          text:
            'Stir in the cardamom, coconut, and fried cashews and raisins with their ghee. Add the edible camphor, if using. Cook for one more minute on low heat, stirring, to combine everything evenly.',
          why: 'The aromatics are added last so they keep their fragrance; the ghee from the nuts gives a final shine.',
          cue: 'The prasadam smells strongly of cardamom and ghee, with visible golden nuts.',
        },
        {
          title: 'Rest and settle',
          text:
            'Turn off the heat, cover the pan and leave it for 10 minutes. The wheat grains will absorb the last of the moisture and swell. Loosen with a spoon of hot milk if it seems dry.',
          why: 'Broken wheat keeps absorbing moisture as it rests, so this final pause gives the right soft texture.',
          cue: 'The prasadam is soft, moist and glossy, with distinct grains.',
        },
        {
          title: 'Shape and present the offering',
          text:
            'Spoon the warm prasadam into a clean bowl or onto a fresh leaf, press it lightly with the back of a spoon to form a neat mound, and top with a few fried cashews. Wipe the rim clean and cover with a cloth until the offering.',
          why: 'A neat, clean presentation shows respect, and covering keeps the offering protected until the naivedyam moment.',
          cue: 'The mound is glossy and holds its shape without slumping, and the rim of the bowl is clean.',
        },
      ],
      offering:
        'Offered to Satyanarayana Swamy during the vratam, placed on a leaf, and then shared. At Annavaram the prasadam is sold and given in a leaf wrapper.',
      ritual: [
        'Prepare the prasadam after bathing and in a clean kitchen, usually early in the morning of the vratam.',
        'Place it on a fresh leaf or in a clean bowl before the Satyanarayana Swamy picture or idol, together with fruit, coconut and betel.',
        'After reading or hearing the katha, offer the naivedyam with a short prayer, and show the camphor aarti.',
        'Distribute the prasadam on small leaf plates to the family and the guests, first to the elders and the youngest.',
        'Those who have taken the vratam eat the prasadam first before breaking their fast with a meal.',
      ],
      serving:
        'Serve warm on a leaf or small bowl, a few spoonfuls per person, alongside panchamrita or fruit. It is eaten before the vratam meal. A portion of 1/2 cup is plentiful.',
      storage:
        'Keeps for a day at room temperature and up to three days in the refrigerator. Reheat with a splash of milk and a spoon of ghee, stirring until soft.',
      troubleshooting: [
        {
          problem: 'The wheat is still hard after the sweetener has gone in.',
          fix: 'It was not cooked enough. Add 1/2 cup hot water, cover and cook on low heat for 10 minutes more.',
        },
        {
          problem: 'The prasadam is pasty and sticky.',
          fix: 'The wheat was too fine or overcooked. Fold in a spoon of ghee and cook uncovered a little to dry it; use a medium grind next time.',
        },
        {
          problem: 'The prasadam is dry.',
          fix: 'Sprinkle hot milk, cover and steam for 3 minutes until the grains soften.',
        },
        {
          problem: 'It tastes raw or floury.',
          fix: 'The wheat was underroasted. Roast longer next time; to rescue, cook 3–4 minutes more with a spoon of ghee.',
        },
      ],
      variations: [
        'Some Telugu homes make the prasadam with a mix of wheat rava and moong dal for added protein and flavour.',
        'A version with jaggery gives a deeper colour and flavour; strain well to remove sediment.',
        'Pressure-cooker shortcut: roast in the cooker, add the water, cook 2 whistles, then sweeten and finish uncovered.',
        'For a fasting version, use rajgira or samak rice instead of wheat.',
        'A pinch of nutmeg is sometimes added in place of camphor.',
      ],
      tips: [
        'Choose a medium broken wheat; too fine becomes pasty and too coarse stays hard.',
        'Cook the wheat fully before the sweetener goes in; sugar stops softening.',
        'Be generous with ghee; it defines the temple style.',
      ],
      differs: 'Broken wheat and jaggery; dense and dark; leaf-served.',
    },
  ],
}

export default recipe
