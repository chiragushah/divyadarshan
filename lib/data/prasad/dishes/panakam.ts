import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'panakam',
  name: 'Panakam',
  alsoCalled: 'Panaka · Panha · Pana · పానకం',
  category: 'Drink',
  summary: 'Jaggery-ginger cooler offered on Rama Navami and Narasimha Jayanti.',
  meaning:
    'Panakam is the spring and summer offering of the South: cool, sweet and gently spicy, served beside kosambari at Rama Navami. It is offered because tradition says Rama’s coronation was marked with cool drinks; Narasimha, the fierce form of Vishnu, is also cooled with panakam. The recipe changes by state — pepper and dry ginger in Telangana, lemon in Karnataka, and cooked raw mango in Maharashtra. All three share one idea: unrefined sugar, a warming spice and a cooling liquid, served in small cups to everyone who comes to the house or temple, so that the heat of Chaitra and Vaishakha is met with generosity.',
  variants: [
    {
      id: 'telangana-andhra',
      region: 'Telangana & Andhra Pradesh (Bhadrachalam)',
      culture: 'Telugu Vaishnava; Sri Rama Navami Kalyanam',
      title: 'Panakam (Bhadrachalam style)',
      intro:
        'This is the panakam distributed at Bhadrachalam’s Sita Rama Kalyanam. Dry ginger (sunti) and crushed black pepper give it a gentle heat; it is served cool in small cups, with vadapappu (soaked moong) on the side.',
      story:
        'Every Sri Rama Navami, the Sita Rama Kalyanam is performed at the Bhadrachalam temple on the Godavari in Telangana, and panakam, along with vadapappu and chalimidi (a jaggery-rice flour sweet), is distributed to the huge crowds who attend. In Telugu homes the festival is called Sri Rama Navami and the panakam is made in the morning for the puja, then served to all who visit the house through the day.\n\nThe drink is simple: jaggery dissolved in cold water, scented with dry ginger (sunti), cardamom and a little black pepper. The cooling effect comes from the water and the warming spices keep the body from chilling in the afternoon heat. It is normally made in a large clay pot or brass vessel, which keeps it naturally cool, and ladled into small steel cups.\n\nWhat distinguishes Telangana and Andhra panakam from the Karnataka and Maharashtra versions is the spice trio of sunti, pepper and cardamom without lemon or fresh ginger. It is also usually served together with vadapappu, a plain soaked-moong salad, so the festival fare has both a sweet-warm drink and a cool protein.',
      serves: '6–8 glasses',
      prep: '10 min',
      cook: '5 min',
      equipment: [
        'A clay pot (kunda) or steel vessel — clay keeps the drink naturally cool through the afternoon, and is the traditional serving vessel.',
        'A fine steel strainer or muslin cloth — jaggery often has sand or fibre, and a clear panakam is considered more pure.',
        'A small saucepan — to melt the jaggery gently if it is hard; boiling the whole drink is not needed.',
        'A ladle and small steel cups — for serving; the cups are rinsed between each person.',
      ],
      ingredients: [
        {
          items: [
            '1 cup (200 g) powdered jaggery — use clean, pale-to-golden jaggery; very dark jaggery can taste burnt and tint the drink brown',
            '4 cups (950 ml) cold filtered water — chill it in a clay pot for an hour first if you can',
            '1 tsp dry ginger powder (sunti podi) — freshly ground is much more aromatic than the shop-bought tin',
            '1/2 tsp cardamom powder — grind the seeds only; the husk makes the drink bitter',
            '1/4 tsp freshly cracked black pepper — crack it coarsely just before using for the best bite',
            '1 tsp lemon juice (optional) — a few drops lift the flavour, but are not part of the strictly traditional drink',
            '4 tulsi leaves for floating — optional garnish; wash and pat dry',
          ],
        },
      ],
      mise: [
        'Powder or grate the jaggery and remove any visible stones or fibres by hand.',
        'Chill the water, or fill the clay pot an hour before so that it cools the water.',
        'Grind the cardamom and crack the pepper just before making the drink so that the flavours are fresh.',
        'Wash the cups, ladle and strainer, and have a clean cloth ready for covering the pot.',
      ],
      method: [
        {
          title: 'Dissolve the jaggery in warm water',
          text:
            'Put the powdered jaggery in a bowl with one cup of the water, warmed slightly if necessary. Stir with a spoon for about two minutes, pressing the lumps against the side until all the jaggery has melted into a smooth syrup.',
          why: 'Jaggery dissolves much faster in a little warm water than in a large volume of cold water, and this avoids a gritty bottom layer in the finished drink.',
          cue: 'The syrup is smooth and amber, with no lumps remaining when you lift the spoon.',
        },
        {
          title: 'Strain the syrup',
          text:
            'Pour the jaggery syrup through a fine steel strainer or muslin cloth into the clay pot or serving vessel. Press gently with the spoon to extract all the liquid and leave behind the sand, fibres and dust.',
          why: 'Unrefined jaggery often carries grit, and nobody wants to find it in a cup of panakam handed out at a festival.',
          cue: 'The strained syrup is clear and bright, and the strainer holds only a little brown residue.',
        },
        {
          title: 'Add the cold water',
          text:
            'Pour the remaining three cups of cold water into the vessel and stir for half a minute so the syrup spreads evenly. Taste: it should be pleasantly sweet but not syrupy.',
          why: 'Diluting at this stage lets you taste and adjust the sweetness before the spices go in, since the spices will change how sweet the drink seems.',
          cue: 'The drink is a uniform pale amber with no streaks of heavier syrup at the bottom.',
        },
        {
          title: 'Whisk in the dry ginger',
          text:
            'Put the dry ginger powder in a small bowl, add two spoonfuls of the panakam and mix it to a smooth paste, then pour the paste back and whisk the whole drink for a minute. Let it settle for a moment.',
          why: 'Dry ginger clumps and floats if sprinkled directly on cold liquid; making a paste first spreads it evenly.',
          cue: 'There are no floating lumps and the drink has a faint, warm, spicy smell.',
        },
        {
          title: 'Add cardamom and pepper',
          text:
            'Sprinkle in the cardamom powder and the crushed black pepper and stir slowly. Taste again; the pepper should be a gentle warmth at the back of the throat, not a sharp heat.',
          why: 'Pepper is potent: too much makes the drink uncomfortable to children, and too little loses the characteristic bite of Bhadrachalam panakam.',
          cue: 'You smell cardamom first, then ginger, and after a sip you feel a mild warmth on the tongue.',
        },
        {
          title: 'Adjust with lemon and rest',
          text:
            'Add a few drops of lemon juice if using, stir once, and cover the pot with a clean cloth. Let the panakam rest for 15 minutes so the flavours blend and any fine dregs settle to the bottom.',
          why: 'Resting lets the sunti and pepper release their flavour into the cold liquid, which they do slowly.',
          cue: 'After 15 minutes the drink tastes rounder, with the sweetness and spice in balance.',
        },
        {
          title: 'Serve cool in small cups',
          text:
            'Ladle gently from the top of the pot into small steel cups, leaving the dregs behind. Float a tulsi leaf on each cup if desired and hand the cups out with the right hand.',
          why: 'Ladling from the top avoids stirring up the sediment, which would cloud the cups and taste gritty.',
          cue: 'Each cup is clear amber with a tulsi leaf floating on top and a cool condensation outside the steel.',
        },
      ],
      offering:
        'Offered with kosambari or vadapappu at noon on Rama Navami — the hour of Rama’s birth. Served from a clean pot in small cups.',
      ritual: [
        'Fill a small steel cup with panakam and place it on a banana leaf or plate before the pictures or idols of Rama, Sita, Lakshmana and Hanuman.',
        'Place the vadapappu and chalimidi beside it and offer them with the words “Nivedayami” while a lamp burns on the left.',
        'At noon, the hour of Rama’s birth, perform the aarti and show camphor to the offerings, then ring a small bell.',
        'Serve elders and children first, handing each a cup with the right hand, followed by a small spoon of vadapappu.',
        'Keep the pot at the door so that visitors and passers-by can also be offered a cup; this open hospitality is part of the festival.',
      ],
      serving:
        'Serve chilled or at room temperature in small steel cups, about 100 ml per person, with a spoon of vadapappu on the side. In Bhadrachalam the panakam is served from large vessels to thousands of pilgrims; at home it is offered to every guest throughout the day.',
      storage:
        'Best on the day it is made. In the refrigerator it keeps up to two days, but the spices fade and the jaggery may ferment slightly in warm weather; stir well and taste before serving.',
      troubleshooting: [
        {
          problem: 'The panakam is gritty.',
          fix: 'The jaggery was not strained. Pass the drink through a fine cloth and let it settle before ladling; always strain next time.',
        },
        {
          problem: 'It tastes bitter.',
          fix: 'The dry ginger was boiled or old. Use fresh ginger powder, never boil it, and add a teaspoon of jaggery to balance.',
        },
        {
          problem: 'Ginger and pepper clump on the surface.',
          fix: 'The spices were added dry to cold liquid. Make a paste with a little of the panakam first, then whisk it back in.',
        },
        {
          problem: 'It is too sweet.',
          fix: 'Add another half cup of cold water and a few drops of lemon juice; jaggery sweetness varies by brand.',
        },
      ],
      variations: [
        'Bhadrachalam-style offerings sometimes add a pinch of edible camphor (pachai karpooram) and a few strands of saffron.',
        'Some Andhra households use a mix of jaggery and a spoon of sugar to get a lighter colour.',
        'Vrat-friendly: use sendha-safe spices only if you are on a strict fast; most Rama Navami fasts permit panakam as it contains no grains.',
        'Jain households may omit pepper and ginger depending on custom; sweet jaggery water with cardamom is acceptable.',
        'Vegan and gluten-free: the drink is naturally both.',
      ],
      tips: [
        'Do not boil the ginger in the syrup — it turns bitter.',
        'Let the drink settle for 15 minutes before serving; the fine dregs of jaggery fall to the bottom and can be left behind.',
        'A clay pot keeps the drink cool without ice, which is how it is traditionally served.',
      ],
      differs: 'Dry ginger and black pepper, tulsi; served with vadapappu.',
    },
    {
      id: 'karnataka',
      region: 'Karnataka',
      culture: 'Kannada Vaishnava and Madhva households',
      title: 'Panaka',
      intro:
        'Karnataka’s panaka is brighter and more sour: fresh ginger juice and lemon, with cardamom and a hint of nutmeg. It is served with kosambari and majjige (buttermilk) in what is called the “Rama Navami trio”.',
      story:
        'In Karnataka, Rama Navami is celebrated for nine days in many temples, with the last day marked by the Rama Pattabhisheka. Household observance centres on a noon puja, and the offering that follows is panaka, kosambari and majjige (spiced buttermilk). The three are considered a meal in miniature: sweet, salad and cooling drink, and they are handed to anyone who comes to the door.\n\nThe Kannada panaka is made with jaggery, water, fresh ginger juice and lemon, scented with cardamom and sometimes nutmeg. The sourness of the lemon distinguishes it from the Telugu version, and the fresh ginger gives a bright rather than a smoky heat. It is lighter on the tongue and refreshing in the heat of April.\n\nMadhva and Smartha households in Udupi, Bengaluru and Mysuru may differ in small ways — some add a few pepper corns, others a leaf or two of tulsi — but the principle remains that the drink should taste sweet first, then sour, then gently of ginger.',
      serves: '6–8 glasses',
      prep: '10 min',
      cook: 'None',
      equipment: [
        'A steel or brass vessel with lid — brass is traditional for festival offerings and keeps the drink clean.',
        'A grater and a small piece of muslin — for grating ginger and squeezing out the juice without fibre.',
        'A fine strainer — to remove grit from the jaggery and any lemon seeds.',
        'Small steel tumblers — for serving; each person receives one tumbler.',
      ],
      ingredients: [
        {
          items: [
            '3/4 cup (150 g) powdered jaggery — golden, clean jaggery works best; avoid chemically bleached white jaggery',
            '4 cups (950 ml) water — cold, filtered; room temperature is fine if the pot is clay',
            '1 tbsp fresh ginger juice — grate a 1-inch piece and squeeze through muslin; the fresh juice is brighter than powder',
            '2 tbsp fresh lemon juice — from a real lemon, strained of seeds; bottled juice tastes flat and metallic',
            '1/2 tsp cardamom powder — fresh-ground from seeds',
            '1 pinch nutmeg or a drop of rosewater (optional) — gives a festive floral note; use very sparingly',
            '1 pinch edible camphor (optional) — only if it is labelled edible (pachai karpooram); skip it if you are unsure',
          ],
        },
      ],
      mise: [
        'Wash the ginger, scrape off the skin with a spoon and grate it finely just before squeezing the juice.',
        'Roll the lemons on the counter before cutting so they yield more juice, and remove seeds.',
        'Powder the jaggery and remove any stones, then warm half a cup of the water ready to dissolve it.',
        'Rinse the vessel and tumblers and keep a clean cloth ready to cover the vessel.',
      ],
      method: [
        {
          title: 'Dissolve the jaggery',
          text:
            'Put the powdered jaggery in a bowl and pour over half a cup of lukewarm water. Stir, pressing the lumps with the back of a spoon, for two minutes until it becomes a smooth, thin syrup with no grains.',
          why: 'A small amount of warm water dissolves jaggery completely and quickly; cold water leaves sediment at the bottom.',
          cue: 'The syrup runs off the spoon in a thin amber stream and the bowl feels grit-free when you scrape it.',
        },
        {
          title: 'Strain into the vessel',
          text:
            'Pour the syrup through a fine strainer into the serving vessel, and rinse the strainer with a little more water to catch the last of the sugar. Discard the grit left behind.',
          why: 'Jaggery syrup collects dust and fibre during storage, and straining gives a clean, clear panaka.',
          cue: 'The liquid in the vessel is clear, golden and free of floating bits.',
        },
        {
          title: 'Add the remaining water',
          text:
            'Pour in the rest of the water, about three and a half cups, and stir gently for thirty seconds until the syrup is evenly spread. Taste the mixture and adjust the sweetness with a little more jaggery or water before adding anything sour.',
          why: 'It is easier to correct sweetness before lemon is added, because sour flavours make the drink seem less sweet than it is.',
          cue: 'It tastes pleasantly sweet like lightly sweetened water, and the colour is a pale golden amber.',
        },
        {
          title: 'Stir in ginger juice',
          text:
            'Add the fresh ginger juice and stir for ten seconds so it spreads through the whole vessel. Taste a spoonful from the middle; there should be a clear warm ginger note that fades gently without burning the throat.',
          why: 'Ginger juice carries heat and brightness that dry spices cannot; too much will overpower the cardamom, so it is added carefully.',
          cue: 'A fresh, sharp ginger fragrance rises from the surface and a sip leaves a pleasant tingle.',
        },
        {
          title: 'Add lemon juice and cardamom',
          text:
            'Strain the lemon juice into the vessel and add the cardamom powder, stirring slowly. Taste again and adjust: the balance should be sweet first, then sour, then a bright note of ginger, with cardamom perfuming the whole.',
          why: 'Lemon balances the jaggery’s heaviness and makes the drink refreshing rather than cloying.',
          cue: 'The first taste is sweet, followed by a clean sour note, and the aftertaste is aromatic.',
        },
        {
          title: 'Add the optional aromatics',
          text:
            'If using, add a pinch of nutmeg or a drop of rosewater and a speck of edible camphor, and stir once only. Cover the vessel with a lid or a clean cloth so that nothing falls in while it rests.',
          why: 'These touches mark festival panaka but are strong; added at the end, they perfume without taking over.',
          cue: 'A faint floral or cool aroma rises when the lid is lifted, subtle rather than medicinal.',
        },
        {
          title: 'Rest and serve',
          text:
            'Let the panaka rest for 10–15 minutes so the flavours blend together. Ladle gently into small steel tumblers from the top, avoiding any sediment at the bottom, and serve immediately while cool.',
          why: 'Resting rounds the flavours and allows fine particles to settle; serving cool keeps the lemon fresh.',
          cue: 'The drink tastes smooth and balanced, with the ginger and lemon no longer sharp.',
        },
      ],
      offering:
        'Offered at the midday aarti along with kosambari, majjige and fruit. Distribution is first to the children and elders.',
      ritual: [
        'Fill a small tumbler with panaka and place it on a plate before the pictures of Rama, Sita, Lakshmana and Hanuman.',
        'Place the kosambari in a small bowl and the majjige in another tumbler beside it, and offer all three with the words “Nivedayami”.',
        'At midday, the time of Rama’s birth, perform the aarti, sing the Rama stuti and wave a camphor flame before the offerings.',
        'Take a tulsi leaf and place it on the panaka, then lift the plate gently and show it to the deity.',
        'Serve the children and elders first, handing out tumblers with the right hand, and offer the remaining to visitors.',
      ],
      serving:
        'Serve in small tumblers, about 100 ml each, with a spoon of kosambari on the side and a sip of majjige afterwards. In temples the three items are given from a single plate at the end of the noon aarti.',
      storage:
        'Best the same day. Keep covered in a cool place; it keeps in the refrigerator for up to a day, but lemon juice dulls with time. Stir well before serving.',
      troubleshooting: [
        {
          problem: 'The panaka tastes harsh and sharp.',
          fix: 'Too much ginger or lemon. Add a spoonful of dissolved jaggery and a little water to bring the flavours back into balance.',
        },
        {
          problem: 'It has a metallic or bitter taste.',
          fix: 'Bottled lemon juice or pith from the squeezed lemon leaked in. Use fresh juice and avoid squeezing the lemon too hard.',
        },
        {
          problem: 'The drink is cloudy and full of fibre.',
          fix: 'The ginger juice was not strained. Pass the drink through a fine cloth and use muslin for the ginger next time.',
        },
      ],
      variations: [
        'Add a few crushed black peppercorns for a warmer note, as some households in North Karnataka do.',
        'Add four tulsi leaves and one saffron strand for temple-style festival panaka.',
        'Vrat-friendly: the drink is generally permitted; use fresh ginger and lemon and skip the nutmeg and rosewater if your fast is strict.',
        'Jain households often omit ginger; a lemon-jaggery-cardamom drink is a good substitute.',
        'Vegan and gluten-free: the drink is naturally both.',
      ],
      tips: [
        'Fresh lemon only — bottled juice turns the drink metallic.',
        'Keep the ginger juice measured; too much makes it sharp.',
        'Taste before adding the lemon; jaggery varies in sweetness and so does the lemon’s tartness.',
      ],
      differs: 'Fresh ginger and lemon; no dry ginger or pepper.',
    },
    {
      id: 'maharashtra-kairi-panha',
      region: 'Maharashtra',
      culture: 'Marathi households — Chaitra Gauri, Gudi Padwa, Akshaya Tritiya',
      title: 'Kairi Panha (raw-mango panha)',
      intro:
        'Raw green mango is boiled and mashed into a thick pulp and sweetened with jaggery, then thinned with water. It is served at Chaitra Gauri haldi-kumkum, on Akshaya Tritiya and at Ram Navami — mango’s season.',
      story:
        'In Maharashtra, the arrival of raw green mangoes (kairi) in March and April brings kairi panha, the state’s most beloved summer cooler. It is a feature of Chaitra Gauri, the month-long festival in which women set up a swing with the Goddess Gauri and hold haldi-kumkum gatherings; guests are given soaked chana, sprouts and a glass of panha. It is also drunk on Akshaya Tritiya and is offered at Ram Navami.\n\nThe method differs from the clear Telugu and Kannada panakam: here the mango is boiled whole until the skin wrinkles, then the flesh is scraped and mashed with jaggery and spices to make a thick concentrate that is diluted just before serving. The result is a tangy, sweet, perfumed drink with the colour of pale gold or saffron, and a body that is closer to a thin puree than a water.\n\nThe flavours are cardamom, saffron and roasted cumin, rather than ginger and pepper. Many Maharashtrian households make a large batch of concentrate and keep it in the refrigerator or freezer to last the whole season. It is considered cooling and protective against loo, the hot summer wind.',
      serves: '4–5 glasses',
      prep: '10 min',
      cook: '15 min',
      equipment: [
        'A medium pot with lid — to boil the whole mangoes; a pressure cooker also works (two whistles).',
        'A sieve and wooden spoon — for pressing the pulp through to remove fibre and stringy bits.',
        'A small bowl — for soaking the saffron in warm milk or water.',
        'A tall jug — for diluting and serving the panha, and to chill it in the refrigerator.',
      ],
      ingredients: [
        {
          items: [
            '2 medium raw green mangoes (about 400 g) — choose firm, sour, dark green ones, not yellowing; sweet mangoes make a flat panha',
            '3/4 cup (150 g) grated or powdered jaggery — golden jaggery gives the traditional colour; adjust by a tablespoon to taste',
            '3 cups cold water — filtered, to thin the concentrate just before serving',
            '1/2 tsp cardamom powder — freshly ground for fragrance',
            '8–10 saffron strands soaked in 1 tbsp warm milk or water — soak for 10 minutes so the colour releases',
            '1/2 tsp roasted cumin powder (optional) — dry-roast cumin lightly and powder it; it gives a savoury depth',
            'A pinch of salt — brings out the mango’s flavour and balances the sweet',
          ],
        },
      ],
      mise: [
        'Wash the mangoes well and, if the skins are very tough, scrub them under running water.',
        'Soak the saffron in warm milk or water in a small bowl and leave for ten minutes.',
        'Grate or powder the jaggery and remove any stones.',
        'Dry roast a teaspoon of cumin seeds on low heat for one minute until fragrant, cool it and grind to powder.',
      ],
      method: [
        {
          title: 'Boil the mangoes whole',
          text:
            'Place the washed mangoes in a pot with enough water to half-cover them. Cover and boil on medium heat for 12 to 15 minutes, turning once, until the skin wrinkles and the flesh feels soft when pressed.',
          why: 'Boiling whole keeps the pulp from becoming watery and makes it easy to peel the skin away afterwards.',
          cue: 'The skin is wrinkled and dull, and a fork slides into the mango with no resistance.',
        },
        {
          title: 'Cool and peel',
          text:
            'Lift the mangoes out with a spoon and let them cool for 10 minutes. Peel off the skin with your fingers; it should come away easily. Hold each mango over a bowl and scrape off all the pulp with a spoon, discarding the stone.',
          why: 'Cooling prevents burnt fingers, and peeling by hand rather than cutting the mango keeps the flesh intact and wastes less.',
          cue: 'You have a bowl of greenish, thick pulp with strands of fibre clinging to the stone you discard.',
        },
        {
          title: 'Sieve the pulp',
          text:
            'Mash the pulp with a spoon, then press it through a sieve into a clean pan, scraping the underside of the sieve often so that all the thick pulp drops through. Discard the fibre that remains.',
          why: 'Mango fibre makes the drink stringy and unpleasant, so sieving gives a smooth panha.',
          cue: 'The pulp in the pan is smooth and thick, like a loose puree, with no strings.',
        },
        {
          title: 'Cook with jaggery',
          text:
            'Add the grated jaggery to the pulp and place the pan on low heat. Stir for three minutes until the jaggery dissolves completely and the mixture begins to simmer very gently. Switch off and let it cool.',
          why: 'Warming dissolves the jaggery quickly and slightly cooks off the raw edge of the mango; boiling hard would darken the colour and dull the flavour.',
          cue: 'The mixture is glossy, slightly thicker, and smells sweet and tangy with no gritty feel on the spoon.',
        },
        {
          title: 'Add the flavourings',
          text:
            'Once cool, stir in the cardamom, the saffron with its soaking milk, the cumin powder and a pinch of salt. Taste the concentrate; it should be intensely sweet-sour, because it will be diluted.',
          why: 'Adding aromatics when cool preserves their delicate fragrance, which would escape in the heat.',
          cue: 'A rich saffron-cardamom aroma lifts from the bowl, and the colour turns to a warm yellow-gold.',
        },
        {
          title: 'Dilute with cold water',
          text:
            'Pour the concentrate into a tall jug and add the cold water gradually, stirring, until you reach a drinkable consistency like thin cream. Taste and add more water or jaggery if needed.',
          why: 'Dilution is done at the end so you can control strength; concentrate that is already diluted loses flavour quickly.',
          cue: 'The drink pours easily from the jug, coating the spoon thinly, and tastes balanced between sweet and tart.',
        },
        {
          title: 'Chill and serve',
          text:
            'Refrigerate the jug for at least one hour, then stir well and pour into small glasses. Serve cold, with a saffron strand floated on top if you like, and offer a second round to anyone who asks.',
          why: 'Chilling mellows the flavours and makes the panha more refreshing; stirring before pouring redistributes any settled pulp.',
          cue: 'The glasses are frosted lightly on the outside and the panha is cold and smooth.',
        },
      ],
      offering:
        'Offered to Gauri on Chaitra Gauri along with soaked chana (usal) and served to every visitor; offered to Rama and Hanuman on Ram Navami.',
      ritual: [
        'Fill a small silver or steel cup with panha and place it on a plate in front of the Goddess Gauri’s swing or idol on Chaitra Gauri.',
        'Offer it along with the soaked chana, a piece of fruit and a spoon of the haldi-kumkum, with the words “Naivedyam samarpayami”.',
        'Perform the aarti, then call the women of the neighbourhood for the haldi-kumkum ceremony.',
        'Apply haldi and kumkum to each woman’s forehead and give her a small cup of panha, a spoon of soaked chana and a gift (vaan).',
        'On Ram Navami, offer the panha to Rama and Hanuman at noon, then distribute it to all who visit the house.',
      ],
      serving:
        'Serve in small glasses, chilled, about 100 ml each, with soaked chana on the side at Chaitra Gauri gatherings. It is also served as a welcome drink in the summer afternoons, with a pinch of roasted cumin sprinkled on top.',
      storage:
        'The undiluted concentrate keeps in the refrigerator for up to three days in a clean glass jar, and for a couple of months in the freezer in ice-cube trays. Dilute only as much as you need.',
      troubleshooting: [
        {
          problem: 'The panha is too sour.',
          fix: 'The mangoes were very tart. Stir in a tablespoon more dissolved jaggery and a spoon of water, and use a slightly riper mango next time.',
        },
        {
          problem: 'It is stringy.',
          fix: 'The pulp was not sieved well. Press it through a finer sieve or a cloth to remove the fibre.',
        },
        {
          problem: 'The colour is dull brown.',
          fix: 'The jaggery was very dark or the pulp was overcooked. Use golden jaggery and cook only until the jaggery dissolves.',
        },
        {
          problem: 'It tastes flat.',
          fix: 'A pinch of salt and a little more cardamom will bring it back; freshly squeezed lemon juice can lift a flat concentrate.',
        },
      ],
      variations: [
        'Add a few mint leaves while diluting for a cooling twist popular in Pune summers.',
        'Use sugar instead of jaggery for a lighter, yellower panha.',
        'Vrat-friendly: omit cumin and salt if your fast excludes them; rock salt (sendha) can be used instead of ordinary salt.',
        'Jain households can make the same drink without any change; it contains no onion, garlic or root vegetables.',
        'Vegan and gluten-free: the drink is naturally both; use water in place of milk for the saffron.',
      ],
      tips: [
        'Choose sour, very firm mangoes; sweet mangoes make a flat panha.',
        'The concentrate can be frozen in cubes for the season.',
        'Stir the jug just before serving; the pulp settles quickly.',
      ],
      differs: 'Cooked raw mango plus jaggery; saffron; no ginger.',
    },
  ],
}

export default recipe
