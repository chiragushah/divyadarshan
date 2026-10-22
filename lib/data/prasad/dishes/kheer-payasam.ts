import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'kheer-payasam',
  name: 'Kheer & Payasam',
  alsoCalled: 'Payesh · Payasa · Pradhaman · Khiri · खीर',
  category: 'Sweet',
  summary: 'Milk-and-rice (or flake, or vermicelli) pudding — the most widespread festive prasad in India.',
  meaning:
    'The same idea, six different dishes. In the North, kheer is rice simmered for a long time in full-fat milk until the milk itself turns creamy. In Bengal, payesh is built on tiny fragrant Gobindobhog rice, bay leaf and, in winter, the smoky date-palm jaggery called nolen gur. In Kerala, ada pradhaman is a jaggery pudding of rice flakes cooked in three extractions of coconut milk, with no dairy milk at all. In Tamil Nadu, paal payasam is cooked so slowly that the milk caramelises to a pale rose-gold. Odisha cooks khiri from the first rice of the harvest, and Buddhist pilgrims at Bodh Gaya recreate the plain milk-rice that the village girl Sujata offered before the Enlightenment. What stays constant is the meaning: milk and rice are the first pure foods, so a pudding made of both is what a household offers when it wants to say thank you. Sharad Purnima kheer is left under the moon, Onam’s pradhaman closes the sadya, and many families make kheer the first sweet of any new beginning.',
  variants: [
    // ───────────────────────────── NORTH INDIA ─────────────────────────────
    {
      id: 'north-sharad-purnima',
      region: 'North India',
      culture: 'Vaishnava households — Sharad Purnima, Dev Uthani, Diwali',
      title: 'Chandra-Amrit Kheer (Sharad Purnima kheer)',
      intro:
        'Rice cooked for a long time in full-fat milk until creamy, flavoured with cardamom and saffron, and placed under the full moon on Sharad Purnima night. Tradition says the moonlight turns it to amrit.',
      story:
        'Sharad Purnima, the full moon of the month of Ashwin (October), is believed to be the night on which the moon shines with all sixteen of its phases and its rays carry healing power. Across Uttar Pradesh, Rajasthan, Madhya Pradesh, Bihar and Gujarat, families cook a large pot of kheer in the evening, cover it with a thin cloth and leave it on a roof, balcony or courtyard where the moonlight falls on it all night. It is the night on which Krishna is said to have performed the Maha Raas with the gopis, and also the night when Lakshmi is said to walk the earth asking “Ko jagarti?” — who is awake?',
      // second and third paragraphs follow
      serves: '6–8 servings',
      prep: '10 min (+ 30 min soaking)',
      cook: '55 min, then overnight in moonlight',
      equipment: [
        'Heavy-bottomed pot or kadai, 3–4 litre — a thick base spreads the heat so the milk does not catch and brown on the bottom',
        'Long flat-edged wooden or steel spoon — lets you scrape the base and sides cleanly, which is the main work of making kheer',
        'Fine muslin or a clean thin cotton cloth — keeps insects out while the kheer sits under the moon but lets moonlight and air through',
        'Small steel bowl for soaking saffron — saffron releases colour best in a little warm milk, not when thrown in dry',
      ],
      ingredients: [
        {
          group: 'For the kheer',
          items: [
            '1.5 litres full-fat milk — buffalo milk gives the creamiest kheer, but full-cream cow milk works well; do not use toned milk, it will not thicken',
            '1/4 cup (50 g) basmati or any aromatic short-grain rice — broken basmati is traditional because it dissolves into the milk and thickens it',
            '1 tbsp ghee — coats the rice grains so they stay separate and gives a faint nutty note',
            '1/2 cup (100 g) sugar, or to taste — add late, because sugar added early slows the rice from softening',
            '1/2 tsp freshly ground green cardamom — grind the seeds just before using; pre-ground powder loses its perfume quickly',
          ],
        },
        {
          group: 'For flavour and finish',
          items: [
            '10–12 saffron strands soaked in 2 tbsp warm milk — gives the delicate golden tint and the unmistakable festival fragrance',
            '2 tbsp blanched, sliced almonds — blanching removes the bitter skin and lets the slices stay pale',
            '1 tbsp chironji or pistachios, chopped — chironji (charoli) is the classic North Indian kheer nut; pistachios are a fine substitute',
            '1 tbsp raisins — soften in the hot kheer and add small pockets of sweetness',
            '1 tsp rose water or 2 drops kewra (optional) — added off the heat so the fragrance does not cook away',
          ],
        },
      ],
      mise: [
        'Wash the rice in two or three changes of water until the water runs nearly clear, then soak it in clean water for 30 minutes and drain well. Soaking softens the grain so it cooks evenly and breaks down into the milk.',
        'Blanch the almonds in hot water for 5 minutes, slip off the skins and slice them thinly.',
        'Soak the saffron in warm milk in a small bowl and leave it near the stove so the colour develops while you cook.',
        'Rinse the cooking pot with cold water and leave it wet. A film of water on the base reduces sticking when the milk first goes in.',
        'Choose the place for the moon: a clear roof, balcony or courtyard, and clean the spot. Keep the muslin and a heavy plate or ladle ready to hold it in place against the wind.',
      ],
      method: [
        {
          title: 'Fry the rice in ghee',
          text:
            'Heat the ghee in the rinsed heavy pot on low heat. Add the drained rice and stir gently for two minutes, until the grains look slightly opaque and smell faintly of toasted nuts. Do not let them brown; you only want a light coating.',
          why: 'Ghee-coated grains absorb milk more evenly and do not clump into a paste, and the gentle toasting removes any raw starchy smell.',
          cue: 'The rice turns from translucent to chalky white and you smell a sweet, nutty aroma, with no colour change.',
        },
        {
          title: 'Add the milk and bring it up slowly',
          text:
            'Pour in the milk, raise the heat to medium and stir every minute or so until it comes to a gentle boil, about 8–10 minutes. As soon as the first bubbles rise, turn the heat to low. Never leave the pot alone during this stage, because milk froths up and overflows quickly.',
          why: 'A slow rise in temperature stops the milk proteins from scorching on the base and allows a skin to form that you can stir back in, which thickens the kheer.',
          cue: 'Small bubbles rim the pot and a thin cream film begins to form on top. The milk smells sweet and slightly cooked, never burnt.',
        },
        {
          title: 'Simmer patiently, scraping as you go',
          text:
            'Keep the heat low so the milk barely bubbles. Every 3–4 minutes, scrape the creamy layer from the sides and base back into the milk. Continue for 40–45 minutes. The milk will slowly reduce by about a third, the rice will swell, and the colour will turn from white to a pale ivory.',
          why: 'Scraping the cooked milk solids back in is what gives kheer its body. Rushing it on high heat leaves a thin, watery pudding and a burnt base.',
          cue: 'When you press a grain of rice between finger and thumb it mashes easily, and the kheer coats the back of the spoon in a thin, creamy layer.',
        },
        {
          title: 'Crush a few grains to thicken',
          text:
            'Once the rice is soft, press the back of your spoon against the side of the pot and crush a spoonful of rice grains into the milk, 5–6 times around the pot. This releases starch. Continue to simmer for 3–4 minutes more.',
          why: 'Releasing a little starch gives a velvety body without adding any flour or condensed milk, which would be out of place in a prasad.',
          cue: 'The kheer looks visibly thicker and more opaque, and the spoon leaves a brief trail at the base when you drag it across.',
        },
        {
          title: 'Add the sugar and cardamom',
          text:
            'Add the sugar in two portions, stirring after each until it dissolves. The kheer will loosen again for a minute, which is normal. Add the cardamom powder and simmer another 5 minutes, stirring often so the sugar does not catch on the base.',
          why: 'Sugar draws water out of rice grains; if added before they are soft, the rice stays hard in the middle. Adding it at the end also lets you judge sweetness accurately.',
          cue: 'No sugar crystals remain when you lift a spoonful, and the kheer pours slowly from the spoon in a ribbon.',
        },
        {
          title: 'Fold in the saffron and the nuts',
          text:
            'Switch off the heat. Stir in the saffron along with its soaking milk, then fold in the sliced almonds, chironji or pistachios and the raisins. Add the rose water or kewra last, only a few drops, and stir once.',
          why: 'Saffron and rose water are delicate aromatics; boiling would flatten them. Off the heat they perfume the kheer without cooking off.',
          cue: 'The kheer turns a soft golden-ivory and the room smells of saffron and cardamom.',
        },
        {
          title: 'Cool completely before the moon',
          text:
            'Let the kheer cool in the pot, uncovered and stirred every ten minutes, until it is just warm to the touch, about 45 minutes. Pour it into a clean steel or brass vessel, cover with the thin muslin, and carry it to the moonlit place.',
          why: 'If you cover hot kheer, steam condenses on the cloth and drips back, spoiling both texture and keeping quality. Stirring while it cools prevents a thick skin.',
          cue: 'The kheer is thick but still pourable and the surface no longer steams when you lift the cloth.',
        },
        {
          title: 'Place it under the moon and keep vigil',
          text:
            'Set the vessel where moonlight falls directly, weight the muslin edges against wind, and leave it undisturbed through the night. Many families sit up with devotional singing, a practice that gives the night its name of jagran. Bring the kheer in before sunrise.',
          why: 'The moonlight is the whole point of the offering. Keeping the cloth thin and the vessel open to the sky is what tradition asks for, while the cloth protects food safety.',
          cue: 'By dawn the kheer has cooled completely and a thin skin has formed; stir it back in before serving.',
        },
      ],
      offering:
        'Offered to Lakshmi and Krishna on Sharad Purnima, and consumed after moonlight exposure. Families commonly take the first spoonful at dawn, or at moonrise if the kheer has cooled enough.',
      ritual: [
        'After sunset, clean the spot where the deity’s image or picture is placed, light a ghee lamp, and offer fresh flowers and a few tulsi leaves. Offer the freshly cooked kheer in a small bowl to Lakshmi and to Krishna (or Vishnu), with the prayer for the household’s health and prosperity.',
        'Many households keep a vigil through the night, singing bhajans, chanting Lakshmi or Krishna names, or reading the account of the Maha Raas. The question “who is awake?” is understood as inviting the family to remain alert and grateful.',
        'Place the kheer where the moon can reach it, covered with thin cloth. Some families also place a needle threaded with a fine thread beside it and thread it by moonlight, for the sake of good eyesight; this is a folk custom that varies by household.',
        'At dawn or after a short rest, bring the kheer in, offer a little again to the deity, and distribute a spoonful to every member of the household and to neighbours. Receive it in the right palm, with respect.',
        'Elders traditionally eat first from the moonlit portion; children are given theirs next. The leftover kheer is finished the same day.',
      ],
      serving:
        'Serve in small steel or earthen bowls, lightly warm or at room temperature, with a few slivers of nuts on top. In many families it is eaten with puri on the morning of Sharad Purnima, and nothing sour or salty is served alongside it. A portion of 3–4 tablespoons per person is plenty because it is rich.',
      storage:
        'Because it contains milk, finish the kheer within a day. If you must keep it, move it to the refrigerator after the vigil and eat within 24 hours; it thickens when cold, so loosen with a little warm milk before serving.',
      troubleshooting: [
        {
          problem: 'The kheer has brown flecks and a burnt smell.',
          fix: 'The heat was too high or you did not scrape the base. Do not stir the burnt bits in. Pour the good kheer carefully into a fresh pot, leaving the burnt layer behind, and finish on low heat.',
        },
        {
          problem: 'The kheer is thin and watery even after an hour.',
          fix: 'Either the milk was low-fat or the heat was too low to reduce it. Raise the heat to medium for 10 minutes, stirring constantly, and crush a few more grains of rice to thicken.',
        },
        {
          problem: 'The rice is still hard but the milk has thickened.',
          fix: 'The rice was not soaked or the sugar went in too early. Add 1/2 cup hot milk and simmer covered on the lowest heat until the grains soften, then add more sugar only at the end.',
        },
        {
          problem: 'A tough skin forms on top as it cools.',
          fix: 'Stir every ten minutes while cooling and cover only once it is lukewarm. If a skin forms, lift it off gently or whisk it into the kheer with a spoon.',
        },
      ],
      variations: [
        'Some Rajasthani and Gujarati families add a spoon of khoya or condensed milk reduction for richness; the plain milk version here is the more traditional temple style.',
        'For a vrat (fasting) version, replace the rice with 1/4 cup samak (barnyard millet) or soaked sabudana, use rock salt-free preparation, and leave out the raisins if your fast restricts dried fruit.',
        'To reduce sugar, replace half with grated jaggery added after the kheer cools slightly, so the milk does not split.',
        'For a vegan household kheer, use thick coconut milk and add a little more rice, though this is not the traditional Sharad Purnima version.',
        'Jain households cook this without onion or garlic, as here, and usually finish the kheer before sunset on the following day.',
      ],
      tips: [
        'The long, slow simmer is what makes the kheer rich. Plan 90 minutes in total and do not hurry it.',
        'A pinch of cardamom is better than a spoonful — the aroma should be a background note, not the centre.',
        'If you do not have moonlight on the day (cloud, rain, or a flat in a building), cook and offer the kheer the same way and serve it fresh; the prayer and the intention remain the same.',
      ],
      differs: 'Milk-heavy, basmati rice, saffron; set out in moonlight.',
    },

    // ───────────────────────────── BENGAL ─────────────────────────────
    {
      id: 'bengal-payesh',
      region: 'West Bengal',
      culture: 'Bengali households — Durga Puja, Lakshmi Puja, Poila Boishakh',
      title: 'Payesh (Gobindobhog payesh)',
      intro:
        'Bengal’s payesh is built on small, sticky, fragrant Gobindobhog rice, bay leaves and cardamom. In winter it is sweetened with nolen gur (date-palm jaggery); at other times sugar is used.',
      story:
        'In Bengali the word payesh comes from the Sanskrit payasa, “made of milk”, and no Bengali celebration is complete without it. A child’s first rice-eating ceremony (annaprashan) is marked by a bowl of payesh; a birthday begins with it; and on Durga Puja the bhog, the sanctified meal, ends with a spoon of payesh after the khichuri and labra. It is the closing note of nearly every Bengali feast.\n\nTwo things make it distinct. The first is Gobindobhog, a small, short-grained, aromatic white rice grown in the Bardhaman and Hooghly districts that is sticky when cooked and smells faintly of ghee; it is used for payesh and for bhog khichuri. The second is nolen gur, the dark, fragrant jaggery tapped from date-palm sap in the cold months of Poush and Magh. A winter payesh sweetened with nolen gur tastes of caramel and smoke and is considered one of the great Bengali seasonal pleasures.\n\nBengali cooks keep the payesh a little looser and runnier than the north Indian kheer, and they flavour it with just a bay leaf (tejpata) and a few cardamom pods. Nuts and raisins are optional and always used in small amounts. This is the version offered to Durga on Ashtami and Dashami and to Lakshmi at Kojagori Lakshmi Puja.',
      serves: '6 servings',
      prep: '10 min',
      cook: '50 min',
      equipment: [
        'Heavy-bottomed deep pot, 3 litre — Bengali payesh is stirred from the base often and a thick bottom prevents scorching',
        'Wooden spoon with a flat edge — scrapes the base and sides without scratching the pan',
        'Small frying pan — to fry the cashews and raisins in ghee separately so they stay crisp and golden',
        'Fine strainer — in winter, to strain nolen gur if it has bits of palm fibre or crystals',
      ],
      ingredients: [
        {
          group: 'For the payesh',
          items: [
            '1.25 litres full-fat milk — cow milk is standard; boil it once and cool it slightly before adding gur so it does not curdle',
            '1/4 cup (50 g) Gobindobhog rice — short, aromatic and sticky; if unavailable, use kalijira or any short-grain aromatic rice, never long-grain basmati',
            '1 tsp ghee — a small amount only, to coat the rice and release its aroma',
            '1 bay leaf (tejpata) — Indian bay leaf, which is cinnamon-scented; it is the signature Bengali payesh flavour',
            '2 green cardamom pods — lightly crushed so the seeds can release their oil into the milk',
          ],
        },
        {
          group: 'For sweetening and finish',
          items: [
            '1/3 cup (65 g) sugar, or 1/2 cup (about 100 g) nolen gur — use the gur only in winter; both should be added at the end of cooking',
            '1 tbsp cashews and 1 tbsp raisins — fried in ghee for a few seconds each, to add a toasty contrast to the soft pudding',
            '1 tsp ghee for frying the nuts — pure desi ghee is traditional',
          ],
        },
      ],
      mise: [
        'Wash the Gobindobhog rice gently, drain it fully and spread it on a plate for 15 minutes. Slightly dried rice absorbs milk without turning to mush and holds its fragrance.',
        'Break the cashews in halves, wash the raisins and pat them dry so they do not spatter in the ghee.',
        'If using nolen gur, break it into small pieces with a spoon and keep it nearby; do not melt it ahead of time.',
        'Boil the milk once and keep a lid ready; the payesh needs good, fresh milk with a full cream layer.',
        'Keep a little hot water to hand to rinse the pot if the milk starts to catch at the bottom.',
      ],
      method: [
        {
          title: 'Perfume the ghee',
          text:
            'Heat 1 teaspoon of ghee in the pot on low heat. Add the bay leaf and crushed cardamom and let them sizzle for 20 seconds, until the bay leaf releases a cinnamon-like fragrance. Do not let the ghee smoke or the bay leaf blacken.',
          why: 'Whole spices release fat-soluble aroma into hot ghee; if they burn they turn bitter and the whole payesh tastes harsh.',
          cue: 'The kitchen smells sweet and warm, and the bay leaf darkens a shade without turning brown.',
        },
        {
          title: 'Fry the rice briefly',
          text:
            'Add the drained rice and stir it for a minute on low heat to coat each grain with the perfumed ghee. The rice should remain white and not take colour. This also slightly seals the grains so they stay intact while cooking.',
          why: 'Gobindobhog is delicate; a minute in ghee protects the grain from disintegrating too early and carries the bay and cardamom into the rice.',
          cue: 'The grains look glossy and smell of ghee and cinnamon, still white.',
        },
        {
          title: 'Add the milk and bring to a boil',
          text:
            'Pour in the milk, raise the heat to medium and bring to a boil, stirring from the bottom every minute. When it boils, reduce the heat to the lowest setting. A wide gap between the pot and the flame or a heat-diffuser plate helps if your burner runs hot.',
          why: 'Stirring from the bottom prevents the milk solids from sticking and burning, which would give the payesh a bitter, smoky taste.',
          cue: 'A creamy foam rises to the rim and subsides when you stir; the milk smells sweet.',
        },
        {
          title: 'Simmer until the rice breaks down',
          text:
            'Let the payesh simmer gently for 35–40 minutes, stirring from the bottom every 3–4 minutes and scraping the sides. The milk reduces by about a quarter, the rice swells and begins to break, and the payesh turns a soft ivory.',
          why: 'The slow simmer lets the starch seep out of the rice into the milk, giving the signature creamy, slightly sticky body without any thickener.',
          cue: 'Rice grains are very soft and some are broken; the payesh coats the back of a spoon but still runs freely, looser than north Indian kheer.',
        },
        {
          title: 'Sweeten with sugar or with gur',
          text:
            'For sugar: add it now, stir until dissolved, and simmer 3–5 minutes. For nolen gur: switch off the heat, let the milk stop bubbling for a full two minutes, then stir in the broken gur gradually until it melts. Do not return gur-sweetened payesh to a rolling boil.',
          why: 'Jaggery is slightly acidic. Added to boiling milk it curdles the milk into grainy flecks. Cooling the payesh just below boiling avoids this.',
          cue: 'The payesh turns a pale caramel-tan with gur, or stays ivory with sugar, and tastes smoothly sweet with no gritty texture.',
        },
        {
          title: 'Fry the cashews and raisins',
          text:
            'In a small pan heat 1 teaspoon of ghee. Fry the cashews on low heat for about 30 seconds until pale gold, then add the raisins and wait for them to swell and turn plump, 10–15 seconds. Tip the whole lot, ghee included, into the payesh.',
          why: 'Frying in ghee makes the nuts crisp and fragrant so that they stay distinct when added to the soft pudding.',
          cue: 'The cashews turn light gold and the raisins puff up like tiny balloons.',
        },
        {
          title: 'Rest and adjust the consistency',
          text:
            'Remove the bay leaf and cardamom pods if you wish. Let the payesh rest for 10 minutes, as it thickens when it cools. If it becomes too thick, stir in a few tablespoons of hot milk to loosen it. Taste for sweetness once more.',
          why: 'Rice pudding keeps absorbing liquid as it cools. Resting lets you judge the true final consistency before offering it.',
          cue: 'The payesh flows slowly off a lifted spoon in a soft ribbon and settles smooth.',
        },
      ],
      offering:
        'Offered to Durga on Ashtami and Dashami and to Lakshmi at Kojagori Lakshmi Puja. It also forms part of the annabhog thali at the pandal and is the first sweet at a child’s annaprashan.',
      ritual: [
        'Cook the payesh after bathing, in a clean kitchen without tasting or putting a finger into it. Many families use a separate pot reserved for bhog.',
        'Pour a portion into a clean bowl (often a kansa or bell-metal bowl) and place it in the thali with the khichuri, labra, fries and chutney that form the bhog. Place a tulsi leaf on the bowl if the bhog is for Vishnu or Lakshmi.',
        'Offer the bhog before the deity with the priest’s mantras, or the family’s own simple offering; the plate stays for a few minutes while the family sits quietly or the aarti is done.',
        'After the offering the payesh is distributed from the bhog thali as prasad, first to the women and elders, then to everyone present. In Durga Puja pandals it is shared with anyone who joins the queue, regardless of community.',
        'At a child’s annaprashan the maternal uncle traditionally feeds the first spoon of payesh to the baby, with the family blessing.',
      ],
      serving:
        'Serve warm in small bowls or in a bell-metal katori, topped with fried nuts. Payesh can also be served chilled in summer for Poila Boishakh. Serve after the khichuri and labra, never before; it is the closing sweet. A small bowl per person suffices because the payesh is rich.',
      storage:
        'Because it contains fresh milk, eat the payesh the same day or refrigerate it in a covered container for up to a day. It thickens considerably on cooling, so warm it gently with a spoon of milk before serving. Do not freeze.',
      troubleshooting: [
        {
          problem: 'The milk curdled into small grains after adding nolen gur.',
          fix: 'The payesh was too hot or the gur was acidic. Strain what you can, cool the payesh a little more next time and stir the gur in a spoonful at a time. A teaspoon of baking soda is sometimes used by cooks, but it affects flavour and is not traditional.',
        },
        {
          problem: 'The payesh tastes flat and there is little fragrance.',
          fix: 'The rice was not Gobindobhog, or the spices were old. Use fresh bay leaf and cardamom, and finish with a fresh grating of cardamom seeds off the heat.',
        },
        {
          problem: 'The rice has turned to a paste.',
          fix: 'The heat was too high or the rice was washed and left wet for too long. Next time dry the rice for 15 minutes and keep the simmer low. A pasty payesh can be loosened with hot milk.',
        },
        {
          problem: 'There is a burnt smell on the base.',
          fix: 'Stop stirring the bottom, pour the unburnt payesh into a new pot and continue on lower heat.',
        },
      ],
      variations: [
        'In Bengal’s winter, some families add a spoon of khejur gur (date-palm jaggery) syrup plus a few pieces of fresh coconut for a coconut payesh.',
        'Some homes use mawa (khoya) crumbled into the milk, or reduce the milk by half first, for a thicker payesh called ‘ghono payesh’.',
        'A Poila Boishakh variation uses a handful of broken vermicelli or ‘seviyan’ instead of rice, making a payesh closer to sevaiyan.',
        'A vrat-friendly payesh can be made with makhana (fox nuts) roasted in ghee and simmered in the milk with sugar, without rice.',
        'For those avoiding refined sugar, use only nolen gur or date syrup, added at the end as described.',
      ],
      tips: [
        'Gobindobhog is not interchangeable with basmati; if it cannot be found, a short aromatic rice is better than a long grain.',
        'Never boil payesh after adding gur — remove from heat, let it settle, then stir in.',
        'Use full-fat milk of good quality. Payesh is simple, and the milk is the main flavour.',
      ],
      differs: 'Gobindobhog rice, tejpata and nolen gur; slightly looser.',
    },

    // ───────────────────────────── KERALA ─────────────────────────────
    {
      id: 'kerala-ada-pradhaman',
      region: 'Kerala',
      culture: 'Malayali households — Onam Sadya, Vishu, temple vazhipadu',
      title: 'Ada Pradhaman',
      intro:
        'A jaggery payasam built on rice flakes (ada) and three extractions of coconut milk, finished with ghee-fried coconut bits and cashews. It is dark amber and glossy, and is the grand finale of the Onam sadya.',
      story:
        'In Kerala the word pradhaman means “the foremost”, and ada pradhaman holds that place among payasams. It is cooked for Onam, for Vishu, for weddings, and as a temple vazhipadu offering to Vishnu and Bhagavathy. At a sadya it is served on the banana leaf after the rice and sambar, often followed by a second, lighter payasam such as palada, and then rice with buttermilk.\n\nThe unusual thing about ada pradhaman is that it contains no dairy milk at all. Its richness comes from coconut milk, extracted three times from the same grated coconut: a thin third milk used to cook the ada, a medium second milk for body, and a thick first milk that is added at the very end, off the boil. This staged use of coconut milk is the essential technique and the reason a home pradhaman can taste as deep as a temple one.\n\nThe ada itself is a thin, dried sheet of rice batter that is steamed in a banana leaf, dried and broken into pieces. It is sold in packets as “ada” or “rice ada”. The sweetener is dark Kerala jaggery, often a molasses-like variety, which gives the pradhaman its deep brown colour. Cardamom, dry ginger and a touch of cumin make the unmistakable Kerala flavour, and ghee-fried coconut slivers (thenga kothu) provide crunch.',
      serves: '8 servings',
      prep: '30 min',
      cook: '1 hr',
      equipment: [
        'Uruli or a wide heavy-bottomed bronze or steel vessel — Kerala cooks use the uruli because its wide base and sloping sides cook jaggery and coconut milk evenly',
        'Muslin cloth and a large bowl — to squeeze out the coconut milk from the grated coconut and strain the jaggery',
        'Mixer-grinder — to grate-grind the coconut with a little warm water for milk extraction',
        'Long wooden ladle (thavi) — to stir the pradhaman continuously without scraping the base too hard',
      ],
      ingredients: [
        {
          group: 'For the pradhaman',
          items: [
            '1/2 cup (about 100 g) rice ada — available as ‘ada’ or ‘rice ada’ in Kerala shops; choose small pieces if possible because they cook faster',
            '300 g dark jaggery — preferably Kerala-style, dark and slightly smoky; if using a lighter variety, add 25 g more for colour',
            '3 cups thin coconut milk (third extract) — extracted from the already squeezed coconut with 3 cups water',
            '1.5 cups medium coconut milk (second extract) — from the same coconut with 1.5 cups warm water',
            '1 cup thick coconut milk (first extract) — squeezed with only 1 cup of warm water, the richest of the three',
          ],
        },
        {
          group: 'For the seasoning and finish',
          items: [
            '2 tbsp ghee — Kerala payasam uses desi ghee in generous quantity for aroma',
            '1/3 cup coconut pieces (thenga kothu), thin slivers — fry until golden for a toasty bite',
            '2 tbsp cashews and 1 tbsp raisins — fried in the same ghee',
            '1 tsp ground cardamom — use the seeds of fresh green cardamom, ground fine',
            '1/2 tsp dry ginger powder (chukku) — a defining Kerala warmth, balances the sweetness',
            '1/4 tsp cumin powder — optional but traditional in Malabar kitchens, rounds off the spice mix',
          ],
        },
      ],
      mise: [
        'Grate 2 large coconuts or about 4 cups of fresh coconut. Frozen grated coconut can work if fresh is unavailable, but thaw it fully.',
        'Extract the milk in three stages: blend the coconut with 1 cup warm water and squeeze through muslin for the thick first milk; reblend the pulp with 1.5 cups warm water for the second milk; reblend again with 3 cups water for the thin third milk. Keep the three in separate bowls and label them.',
        'Soak the ada in warm water for 15 minutes, then drain and rinse. If the pieces are large, break them into 1–2 cm bits.',
        'Melt the jaggery with 1/2 cup water in a small pan, bring it to a boil, strain it through muslin to remove sand and impurities, and keep the syrup warm.',
        'Fry the coconut slivers, cashews and raisins in 1 tablespoon of ghee in a small pan and keep aside.',
      ],
      method: [
        {
          title: 'Soak and rinse the ada',
          text:
            'Place the ada in a bowl of warm (not boiling) water for 15 minutes until it becomes pliable. Rinse under running water, drain, and check that no hard, translucent cores remain. Large pieces can be split by hand into smaller bits.',
          why: 'Ada hardens once jaggery is added, so it must be soft before it meets the syrup. Rinsing removes the dusty starch coating.',
          cue: 'The ada bends without cracking and has turned from stiff, brittle sheets to pale, rubbery pieces.',
        },
        {
          title: 'Strain and boil the jaggery syrup',
          text:
            'Melt the jaggery with half a cup of water on low heat, stirring until fully dissolved. Pour through a fine muslin into the uruli, discarding any sand or fibre. Bring the strained syrup to a gentle boil for 3–4 minutes.',
          why: 'Raw jaggery often contains sand, bits of cane and crystals. Straining gives a clean, glossy pradhaman and boiling slightly concentrates the syrup.',
          cue: 'The syrup bubbles with large, slow bubbles and smells of caramel, with no gritty residue left on the cloth.',
        },
        {
          title: 'Cook the ada in the syrup',
          text:
            'Add the soaked ada to the boiling syrup and cook on medium heat for 10 minutes, stirring often. The ada absorbs the jaggery and changes from pale to a deep brown. If the syrup thickens too much, add a splash of the thin coconut milk.',
          why: 'Cooking the ada in jaggery before adding coconut milk lets it take on colour and sweetness. Once coconut milk is added, the ada’s texture would not change much.',
          cue: 'The ada turns translucent amber and feels soft and slippery when pressed between fingers.',
        },
        {
          title: 'Add the thin (third) milk and reduce',
          text:
            'Pour in 3 cups of third coconut milk. Keep the heat medium and simmer for 15–20 minutes, stirring every minute or two, until the liquid reduces by about half and the pradhaman thickens. Do not cover the pot.',
          why: 'The thin milk is cooked first because it can tolerate long simmering. Reducing it concentrates sweetness and flavour while the ada finishes cooking.',
          cue: 'The surface carries slow, glossy bubbles and the pradhaman clings to the ladle in a thick film.',
        },
        {
          title: 'Add the medium (second) milk',
          text:
            'Pour in the second milk and reduce the heat to medium-low. Simmer for 10 minutes, stirring continuously, until the pradhaman is thick enough to leave a path when the ladle is dragged through the base. Add the cardamom, dry ginger and cumin now.',
          why: 'The second milk has more fat and will split if boiled hard. Moving to a lower heat keeps it smooth, and adding spices here lets them infuse without losing their aroma.',
          cue: 'The surface is silky and a thin oily sheen appears, the colour deepening to rich brown.',
        },
        {
          title: 'Finish with the thick (first) milk off the boil',
          text:
            'Lower the heat to the minimum and stir in the thick first milk. Warm it for just 2 minutes while stirring constantly, then switch off. The pradhaman should be warm, not boiling, when the first milk goes in. It will look thin, but it thickens as it cools.',
          why: 'First coconut milk is the richest and the most delicate; boiling it makes it split into oil and curds, ruining the smooth texture.',
          cue: 'The pradhaman turns creamy and glossy with a faint beige sheen, and no oil floats in separate pools.',
        },
        {
          title: 'Add the fried coconut, cashews and ghee',
          text:
            'Pour the ghee-fried coconut slivers, cashews and raisins, with all their ghee, into the pradhaman and stir gently once. Let it rest for 10 minutes before serving so that the flavours settle and the pradhaman thickens slightly.',
          why: 'Adding the garnish at the end keeps the coconut crisp and fragrant, and the ghee carries the aroma through the whole dish.',
          cue: 'The surface glistens with small pools of golden ghee and the coconut bits float intact.',
        },
      ],
      offering:
        'Served as the final course of the Onam sadya on a banana leaf, and offered at temple vazhipadu for Maha Vishnu and Bhagavathy. Families also prepare it for Vishu and for weddings.',
      ritual: [
        'Cook the pradhaman after bathing and in a clean kitchen. In many Kerala homes the cook does not taste it before it is offered.',
        'Place the pradhaman in a bell-metal or brass vessel (or a clean bowl) before the lit nilavilakku (traditional lamp) in the pooja room. Offer a spoon on a tulsi leaf or a banana leaf piece to Vishnu or the household deity with a brief prayer.',
        'At the Onam sadya, a small first serving of the pradhaman may be offered to Onathappan or to the family’s ancestors before the family begins eating. Check your family’s custom.',
        'Serve the pradhaman from the vessel using a ladle, at the end of the sadya, after the main courses, onto the banana leaf; guests eat it with a small spoon or from a cupped leaf.',
        'At temples, devotees order the payasam as a vazhipadu offering; a portion is offered to the deity by the priest and returned as prasadam in a leaf cup.',
      ],
      serving:
        'Serve warm or at room temperature in small steel katoris or on the banana leaf with a spoon. It is usually the last or second-last course of a sadya, followed by plain rice with buttermilk. Allow a small portion, about 3–4 tablespoons per person, because the pradhaman is very rich.',
      storage:
        'Because it contains coconut milk, eat it the same day. If you must keep it, refrigerate it covered for up to a day and warm gently with a splash of water or coconut milk, without boiling. It thickens considerably when cold.',
      troubleshooting: [
        {
          problem: 'The coconut milk has split and there are oily blobs on top.',
          fix: 'The pradhaman was boiled after the first milk went in. Take it off the heat, cool it slightly, and whisk vigorously. For serious splitting, blend a ladleful with a spoon of warm water and stir it back in.',
        },
        {
          problem: 'The ada is still hard in the centre.',
          fix: 'It was not soaked long enough or went into the jaggery undercooked. Add 1/2 cup hot water and simmer a little longer before adding the thick milk. Jaggery slows softening, so soak well first.',
        },
        {
          problem: 'The pradhaman tastes bitter or smoky.',
          fix: 'The jaggery caught on the base. Pour into a fresh vessel without scraping the bottom, and in future stir continuously and keep the heat moderate.',
        },
        {
          problem: 'It is too thin after cooling.',
          fix: 'The third milk was not reduced enough. Warm it gently, simmer a few more minutes before the first milk goes in next time, or stir in a spoon of rice flour mixed in cold water, which is a household shortcut.',
        },
      ],
      variations: [
        'In Malabar, some cooks add a spoon of sugar along with the jaggery to lighten the colour; central Kerala prefers all jaggery.',
        'A palada pradhaman uses small rice-flake sheets cooked in milk and sugar rather than jaggery and coconut milk; it is served as the second payasam at the sadya.',
        'Some temple versions use a little more ghee and no cumin; others add a pinch of edible camphor, which should be of the edible grade only.',
        'For a quick home version when you cannot extract milk three times, use 400 ml of canned coconut milk diluted with 1.5 cups water for the cooking stage and 100 ml undiluted for the finish.',
        'For a vegan household, replace ghee with coconut oil for frying the coconut and cashews.',
      ],
      tips: [
        'The three-stage coconut milk method is the heart of this dish. Keep the bowls separate and add them in order of thinness.',
        'Never add the first milk to a boiling pradhaman. Reduce the heat first and stir continuously.',
        'The pradhaman thickens a lot as it stands. Aim to serve it slightly thinner than you want it to finally be.',
      ],
      differs: 'Coconut milk and jaggery; rice flakes; no dairy milk.',
    },

    // ───────────────────────────── TAMIL NADU ─────────────────────────────
    {
      id: 'tamil-paal-payasam',
      region: 'Tamil Nadu',
      culture: 'Tamil households — Varalakshmi Vratam, Karthigai, Puthandu',
      title: 'Paal Payasam',
      intro:
        'Tamil Nadu’s milk payasam is cooked until it turns a pale pink-gold from the slow caramelising of simmered milk and sugar. It is rich, set with a little rice, and flavoured with cardamom and ghee-fried cashews.',
      story:
        'Paal payasam, literally “milk payasam”, is the pudding that Tamil households make on the days that matter: Varalakshmi Vratam, Karthigai Deepam, Puthandu, a first birthday, a housewarming. Temple kitchens in Tamil Nadu serve it in huge vessels at Srirangam, Madurai and Srivilliputhur, where Andal’s tradition associates milk-based offerings with Vishnu. A family cook often judges the payasam by its colour: a pale rose-gold means the milk has been patiently reduced, while a snow-white payasam means it has been rushed.\n\nThe colour comes from slow cooking. As milk simmers for an hour or more with sugar, the milk sugars (lactose) and proteins undergo a gentle browning, and the milk takes on a faint pink and a deeply sweet, nutty flavour. Some cooks speed this up with a spoon of sugar caramelised in the pan first; the traditional approach is only time and patience.\n\nCompared with the north Indian kheer, paal payasam uses less rice, which is cooked separately until very soft and then mashed before it meets the milk, so the finished payasam is smoother and more fluid. It is flavoured with cardamom, a touch of edible camphor and ghee-fried cashews and raisins.',
      serves: '6 servings',
      prep: '10 min',
      cook: '55 min',
      equipment: [
        'Heavy-bottomed uruli or thick steel pot, 3 litre — the thick base lets the milk caramelise slowly without catching',
        'Pressure cooker or small saucepan — to cook the rice completely soft before it goes into the milk',
        'Wooden spoon — to stir without scratching, and to crush rice against the side',
        'Small pan for frying the nuts — gives the cashews and raisins their golden finish in ghee',
      ],
      ingredients: [
        {
          group: 'For the payasam',
          items: [
            '1 litre full-fat milk — whole milk with a good fat content; creamy buffalo milk is also used in Tamil homes',
            '1/4 cup (50 g) raw rice, preferably a raw ponni or sona masuri — short or medium grain that mashes easily when cooked',
            '1/4 cup water + 1/2 cup of the milk — for cooking the rice until completely soft',
            '1/2 cup (100 g) sugar — add after the milk has reduced; adjust to taste',
            '1/2 tsp cardamom powder — freshly ground from green pods',
          ],
        },
        {
          group: 'For finishing',
          items: [
            '1 tbsp ghee — for frying the nuts',
            '8 cashews, broken — pale gold when fried, adding crunch',
            '1 tbsp raisins — fry until they puff up',
            '1 pinch edible camphor (pachai karpooram), optional — a temple-style aroma; must be the edible grade, sold as ‘pachai karpooram’ and used in tiny amounts',
          ],
        },
      ],
      mise: [
        'Wash the rice well and drain. Soaking for 15 minutes helps it cook faster, but the cooked rice must still be mashed to a near-paste.',
        'Measure out the milk and keep 1/2 cup aside for cooking the rice.',
        'Crush the cardamom seeds in a mortar until fine.',
        'Break the cashews and wash the raisins so they are ready to fry once the payasam is done.',
        'Keep a wide steel plate or a heat-diffuser handy; very low heat is important for the last stages.',
      ],
      method: [
        {
          title: 'Cook the rice until very soft',
          text:
            'Place the washed rice, 1/4 cup water and 1/2 cup milk in a small pot or pressure cooker. Cook for 3 whistles (about 12 minutes) in a cooker, or simmer in a covered pot on low heat for 25 minutes. The grains should be completely tender, nearly collapsing.',
          why: 'Cooking the rice separately in a little milk ensures the grains are soft before going into the larger pot of milk, so the payasam finishes smooth rather than grainy.',
          cue: 'When pressed between two fingers the rice grains squash completely with no hard centre.',
        },
        {
          title: 'Mash the rice',
          text:
            'Once the cooker has released pressure, mash the rice and milk mixture coarsely with the back of a ladle or a masher until about half the grains are broken. Do not blend; some grains should remain.',
          why: 'Breaking the rice releases starch, which thickens the payasam naturally and gives it its silky body.',
          cue: 'The mixture looks like a thick porridge with some whole grains still visible.',
        },
        {
          title: 'Bring the milk to a boil',
          text:
            'Pour the remaining milk into the heavy pot and bring it to a boil on medium heat, stirring every minute. Once it begins to foam, reduce to low heat. Keep the milk at a lazy simmer, never a rolling boil.',
          why: 'Gentle heat avoids scorching and lets the milk reduce evenly. A rolling boil would foam over and spoil the colour.',
          cue: 'A thin layer of cream forms on top and tiny bubbles circle the edges of the pot.',
        },
        {
          title: 'Add the mashed rice and simmer',
          text:
            'Stir the mashed rice into the simmering milk and cook on low heat for 20–25 minutes, stirring every 2–3 minutes and scraping the sides. The payasam will slowly thicken and lose its bright white colour, beginning to turn creamy ivory.',
          why: 'This long simmer reduces the milk and begins the browning that gives paal payasam its character. Regular scraping returns the cooked cream from the sides.',
          cue: 'The payasam has reduced noticeably and coats the back of the spoon, with a soft ivory-beige tone.',
        },
        {
          title: 'Add the sugar and caramelise slowly',
          text:
            'Add the sugar and stir until dissolved. Continue to simmer on the lowest heat for 15–20 minutes, stirring every couple of minutes. As the sugar and milk cook together, the payasam gradually changes to a light rose-gold. Do not rush this by raising the heat.',
          why: 'Sugar and milk together brown gently (the Maillard reaction) giving the payasam its pink colour and caramel-like sweetness. Higher heat would scorch before it colours.',
          cue: 'The payasam has changed from white to a pale pink-gold and smells of cooked, caramelised milk.',
        },
        {
          title: 'Flavour with cardamom and camphor',
          text:
            'Stir in the cardamom powder and, if using, the pinch of edible camphor. Cook for 2 more minutes. The payasam should be a little thinner than the final consistency you want, as it thickens on cooling.',
          why: 'Aromatics added at the end keep their perfume. Edible camphor is very strong and must be used in a pinch only.',
          cue: 'The kitchen smells of cardamom and a faint, cooling, temple-like fragrance.',
        },
        {
          title: 'Fry the cashews and raisins and combine',
          text:
            'Heat the ghee in a small pan. Fry the cashews for 30 seconds until pale gold, then add the raisins and fry until they plump, another 10–15 seconds. Pour everything, with the ghee, into the payasam and stir once. Switch off.',
          why: 'Ghee-fried nuts retain crunch and carry a rich aroma. Adding them with their ghee finishes the payasam with a gloss.',
          cue: 'The cashews are light golden and the raisins fully puffed.',
        },
      ],
      offering:
        'Offered with other sweets at Varalakshmi Vratam and given to women as tamboolam; also offered at Chitra Pournami to Chitragupta and at Karthigai Deepam.',
      ritual: [
        'Prepare the payasam after a bath and in a clean kitchen, usually early on the festival morning, before eating anything else.',
        'Place a portion in a silver or brass cup or a bowl in front of the deity, on a banana leaf or small plate, alongside the other naivedyam items. Sprinkle a few drops of water around it and offer it with the chanting of the family’s usual prayer, or a simple “Swami, please accept”.',
        'Show the lit camphor or lamp (deepa aradhana) and keep the naivedyam in front of the deity for a few minutes, then remove it as prasadam.',
        'At Varalakshmi Vratam, give each visiting woman a spoon of payasam along with kumkum, turmeric, a betel leaf, a fruit and a blouse piece (tamboolam).',
        'The family eats from the offered portion at the main meal; serve elders first, then others.',
      ],
      serving:
        'Serve warm or at room temperature in small steel or brass cups, with a few ghee-fried cashews on top. Tamil festival meals serve the payasam towards the end of the meal, after the main courses, before the buttermilk or curd rice. A cup of 4–5 tablespoons is generous.',
      storage:
        'Eat the same day. Refrigerate leftovers in a covered container for up to 24 hours; it thickens when cold, so thin it with a spoonful of hot milk and warm gently before serving.',
      troubleshooting: [
        {
          problem: 'The payasam has stayed white and has not coloured.',
          fix: 'It needs more time on low heat after the sugar goes in. Simmer another 10–15 minutes, stirring, and be patient; some cooks add a teaspoon of sugar caramelised in a dry pan to speed the colour.',
        },
        {
          problem: 'The payasam has brown flecks or a burnt smell.',
          fix: 'The heat was too high. Pour the unburnt portion into a fresh pot without scraping the bottom, and cook on the lowest heat.',
        },
        {
          problem: 'The rice is grainy and the payasam is not smooth.',
          fix: 'The rice was undercooked before it went in. Mash more rice against the pot side and simmer longer, adding a little hot milk if too thick.',
        },
        {
          problem: 'The payasam curdled.',
          fix: 'This usually comes from milk that was old or acidic. Use fresh milk, and avoid adding lemon or sour fruit. A very curdled payasam cannot be rescued.',
        },
      ],
      variations: [
        'Some Chettinad and Brahmin households add a spoon of khoya or condensed milk for speed; the traditional version relies on time alone.',
        'Semiya (vermicelli) payasam uses roasted vermicelli in place of rice, cooked directly in the milk in about 10 minutes.',
        'For a vrat version, use sabudana (tapioca pearls) soaked and cooked in the milk instead of rice.',
        'A vegan version replaces milk with a mix of coconut milk and almond milk and cooks the rice in water first; the flavour differs but the offering is accepted in many households.',
        'In some families a spoon of saffron-infused milk is added at the end for festival days.',
      ],
      tips: [
        'The patience is the recipe. Plan at least an hour of unattended-but-near cooking.',
        'Use edible camphor sparingly or leave it out; too much is bitter and unsafe.',
        'Judge the colour in daylight; it should look like pale rose-gold, not brown.',
      ],
      differs: 'Cooked until pink-gold; very smooth; cardamom and camphor.',
    },

    // ───────────────────────────── ODISHA ─────────────────────────────
    {
      id: 'odisha-khiri',
      region: 'Odisha',
      culture: 'Odia households — Nuakhai, Raja, temple bhog',
      title: 'Khiri (Nua Anna Khiri)',
      intro:
        'Odia khiri is a simple, pure milk-and-rice kheer made from the new harvest rice at Nuakhai, flavoured with cardamom, kewra and a touch of camphor. It is offered to the family deity (Samaleswari in western Odisha) with the first rice of the year.',
      story:
        'Nuakhai, “eating the new rice”, is the harvest festival of western Odisha, celebrated by farming families in Sambalpur, Bargarh, Balangir, Kalahandi and neighbouring districts, and in Chhattisgarh. On an astrologically fixed auspicious moment (the nua lagna), the first rice of the new crop is cooked, offered to the village deity, and only then eaten. In western Odisha the deity is Maa Samaleswari; elsewhere it may be the household deity or Lord Jagannath. After the offering, every family member bows to the elders for blessings and the whole village greets each other with “Nuakhai Juhar”.\n\nKhiri is the sweet that accompanies this first rice. It is a simple preparation, not as thickened or reduced as the northern kheer; the rice is cooked directly in milk, sweetened with sugar and flavoured lightly with cardamom and a few drops of kewra (screwpine) water, a flavouring common in Odisha’s temple sweets. Cashews and raisins are added in modest quantities.\n\nIn the Jagannath temple at Puri, khiri is also one of the sweet bhogs offered to the deities, and in many Odia homes it is cooked for Raja, the festival of the monsoon, and for family celebrations. The key to a good khiri is fresh, new-crop rice, which cooks softer and sweeter than old rice.',
      serves: '6 servings',
      prep: '10 min',
      cook: '50 min',
      equipment: [
        'Heavy-bottomed pot, 3 litre — Odia khiri is cooked slowly and the base must not scorch',
        'Earthen pot (handi), if available — traditional for the Nuakhai offering and gives a distinct earthy aroma, though a steel pot works',
        'Wooden ladle — stirs the milk from the base without scratching',
        'Small pan for frying the cashews — keeps the nuts crisp in ghee',
      ],
      ingredients: [
        {
          group: 'For the khiri',
          items: [
            '1 litre full-fat milk — fresh and full-cream; the milk is the main flavour',
            '1/4 cup (50 g) new-crop rice — aromatic short-grain; new rice contains more moisture and cooks soft and sweet; if unavailable use any good short-grain rice',
            '1/3 cup (65 g) sugar — add at the end, adjusted to taste',
            '2 cardamom pods, crushed — releases a gentle aroma without being dominant',
          ],
        },
        {
          group: 'For finishing',
          items: [
            '2 tbsp cashews and 1 tbsp raisins — modest quantity; Odia khiri is not heavily loaded with nuts',
            '1 tsp ghee — for frying the cashews and raisins',
            '2–3 drops of kewra water — kewra is highly concentrated; two or three drops are enough to perfume the whole pot',
          ],
        },
      ],
      mise: [
        'Wash the new rice gently in two changes of water and soak for 20 minutes. New rice is delicate; do not rub it hard.',
        'Crush the cardamom pods lightly to split the husks so the seeds release their flavour.',
        'Set aside a clean banana leaf or earthen bowl for the offering, as Nuakhai offerings are traditionally made on leaf.',
        'Wash the cashews and raisins, and pat them dry.',
        'Keep the sugar measured and ready; Odia cooks add it only once the rice is completely cooked.',
      ],
      method: [
        {
          title: 'Bring the milk to a boil with the rice',
          text:
            'Pour the milk into the pot, add the drained rice, and place on medium heat. Stir every minute until the milk comes to a boil, about 8 minutes. As soon as the first bubbles rise, reduce the heat to low. Stay near the stove during this stage.',
          why: 'Starting the rice in cold milk lets the grain absorb the milk gradually, which makes the rice creamy. Stirring prevents it from sticking to the bottom.',
          cue: 'Small bubbles form around the rim and a thin cream skin forms; the milk smells sweet and the rice floats loosely.',
        },
        {
          title: 'Simmer gently for the rice to soften',
          text:
            'Cook uncovered on the lowest heat for 35–40 minutes. Stir every 3–4 minutes, scraping the sides and base. Add the crushed cardamom pods after the first 15 minutes. The rice will slowly swell and soften, and the milk will reduce by about a quarter.',
          why: 'Slow simmering cooks the rice without breaking it up too early and slowly thickens the milk. Adding cardamom partway through lets the flavour infuse without turning bitter.',
          cue: 'The rice grains are soft when pressed and the milk looks creamy and slightly thicker, coating the spoon.',
        },
        {
          title: 'Check the rice',
          text:
            'Take a few grains out on a spoon, cool them for a moment and press them between your fingers. They should crush easily with no firm core. If they are still hard, add 1/2 cup of hot milk and continue to simmer for another 5–10 minutes.',
          why: 'Sugar slows the softening of rice, so the rice must be fully cooked before sugar goes in.',
          cue: 'The grains squash completely under light pressure.',
        },
        {
          title: 'Add the sugar',
          text:
            'Add the sugar and stir until dissolved. Simmer for 5 minutes more on low heat, stirring constantly. The khiri will thin for a minute and then thicken again. Taste, and add a spoon more sugar only if needed.',
          why: 'Sweetness is easier to adjust at the end. Dissolved sugar also brings out the natural sweetness of the new rice.',
          cue: 'No sugar granules are visible and the khiri pours slowly from a lifted spoon.',
        },
        {
          title: 'Fry the cashews and raisins',
          text:
            'Heat the ghee in a small pan. Fry the cashews for about 30 seconds until pale gold, then add the raisins and cook until they puff, about 15 seconds. Stir into the khiri along with the ghee.',
          why: 'Frying in ghee deepens the flavour and keeps the nuts crisp when added to the soft khiri.',
          cue: 'Cashews are light gold, raisins are plump, and the ghee smells nutty.',
        },
        {
          title: 'Add the kewra water off the heat',
          text:
            'Switch off the heat. Sprinkle 2–3 drops of kewra water over the khiri and stir once. Do not add more; kewra is extremely strong and can overwhelm the delicate flavour of new rice.',
          why: 'Kewra is a volatile aromatic. Added to boiling milk it evaporates quickly, while off the heat it perfumes the whole pot.',
          cue: 'A faint, flowery fragrance rises from the pot, without any perfume-like harshness.',
        },
        {
          title: 'Rest before offering',
          text:
            'Let the khiri rest for 10 minutes, stirring once or twice, as it thickens on standing. Pour the first portion into the clean leaf or earthen bowl for the offering.',
          why: 'Resting lets the starch set and the aromas settle; offering a slightly cooled bowl is also easier to carry and handle.',
          cue: 'The khiri thickens to a thin custard-like consistency and a faint skin begins to form.',
        },
      ],
      offering:
        'At Nuakhai the new rice is first offered to the deity as “Nua anna” along with this khiri, and then eaten by the family together, with elders blessing the young.',
      ritual: [
        'Cook the nua anna (new rice) and the khiri at the auspicious time announced locally for the nua lagna. Women commonly cook the offering after a bath, in a clean kitchen.',
        'Place the nua anna and a bowl of khiri on a fresh leaf (sal or banana) before the household deity or at the village shrine. In western Odisha the offering is made to Maa Samaleswari, with ritual items such as new grains, sweets and fruits.',
        'The head of the household offers the nua with folded hands, and the family sits quietly or recites a prayer, thanking the deity for the harvest.',
        'After the offering, each family member takes a little of the nua, then bows to the elders (“Nuakhai Juhar”) and receives their blessing; younger members touch the feet of elders and friends greet each other.',
        'The family sits together to eat the first meal made from the new crop, with the khiri as the sweet, and shares the food with neighbours.',
      ],
      serving:
        'Serve warm in small bowls or on leaf cups, alongside the Nuakhai meal of new rice, dal and vegetables. The khiri can also be chilled and served as a dessert later in the day. A portion of 3–4 tablespoons per person is traditional.',
      storage:
        'Eat the same day. Keep leftovers covered in the refrigerator for up to 24 hours and warm gently with a spoon of milk; the khiri thickens on cooling.',
      troubleshooting: [
        {
          problem: 'The khiri is too thin and watery.',
          fix: 'Simmer another 10–15 minutes on low heat, stirring, or crush a spoonful of rice against the side of the pot to release starch.',
        },
        {
          problem: 'The rice turned mushy and the khiri is pasty.',
          fix: 'The heat was too high or the rice was overcooked. Loosen with hot milk. Next time keep the flame very low and check the rice early.',
        },
        {
          problem: 'The kewra water overpowers the dish.',
          fix: 'Too much was added. Dilute the khiri with a little more hot milk and a spoonful of sugar to balance. Next time, use only 2 drops.',
        },
        {
          problem: 'There is a burnt smell.',
          fix: 'Do not scrape the base. Transfer the unburnt khiri to a fresh pot and continue on low heat.',
        },
      ],
      variations: [
        'Some families cook the khiri with a spoon of jaggery instead of sugar, added after the milk cools slightly, to match the village style.',
        'A temple-style version adds a few drops of edible camphor and a pinch of nutmeg.',
        'In coastal Odisha, a pinch of saffron and a few chopped pistachios may be added for festivals.',
        'For fasting days, replace the rice with samak (barnyard millet) or sabudana.',
        'Families without access to new rice use the best fresh rice they can find, and the offering is still accepted.',
      ],
      tips: [
        'New rice cooks quickly; check it earlier than you would old rice.',
        'Kewra water is powerful — use only a few drops.',
        'Keep the quantity of nuts modest. Odia khiri is meant to taste of milk and rice.',
      ],
      differs: 'New-harvest rice, kewra; pared-down flavouring.',
    },

    // ───────────────────────────── BODH GAYA ─────────────────────────────
    {
      id: 'sujata-kheer',
      region: 'Bihar (Bodh Gaya) — Buddhist tradition',
      culture: 'Buddhist pilgrims; Buddha Purnima',
      title: 'Sujata’s Kheer (milk-rice)',
      intro:
        'On the day before the Enlightenment, a village girl named Sujata offered milk-rice to Siddhartha. Buddhists at Bodh Gaya recreate this simple, unspiced offering on Buddha Purnima.',
      story:
        'According to Buddhist tradition, after six years of severe ascetic practice, Siddhartha Gautama was so weak that he accepted a bowl of milk-rice offered by a young woman named Sujata, the daughter of a village headman near Uruvela (now Bodh Gaya in Bihar). The food restored his strength, and the next day, seated beneath the Bodhi tree, he attained enlightenment. The meal is remembered as a reminder that the Buddha taught the Middle Way, between extreme indulgence and extreme self-denial.\n\nEvery year at Buddha Purnima (Vesak) and on other Buddhist occasions, pilgrims and monastic communities at Bodh Gaya and elsewhere cook milk-rice (called kheer in Hindi, payasa in Pali and Sanskrit) in memory of Sujata’s offering. The preparation is intentionally simple: rice and milk, cooked slowly, sweetened lightly. There are no fried nuts, no saffron and no perfumes, since the point of the offering is humility and nourishment.\n\nIn different Buddhist countries, the dish has different forms: Sri Lankan kiribath (milk rice) is cooked in coconut milk and cut into diamonds; Thai and Burmese communities make sweet rice cooked in coconut milk. The version here follows the Bihar tradition of dairy milk-rice, as offered at Bodh Gaya.',
      serves: '6 servings',
      prep: '5 min',
      cook: '45 min',
      equipment: [
        'Clean, heavy-bottomed pot — kept for food only; many monastic communities use a pot reserved for offerings',
        'Long wooden spoon — to stir the milk from the base slowly and avoid scorching',
        'Small clean bowl and spoon for the offering — the bowl should be plain, ideally of brass, steel, clay or ceramic',
        'Banana leaf or clean cloth — to place under the offering bowl on the shrine',
      ],
      ingredients: [
        {
          group: 'For the milk-rice',
          items: [
            '1 litre full-fat milk — fresh, unflavoured cow milk, which is the traditional ingredient',
            '1/4 cup (50 g) rice — a good, simple short-grain white rice; no need for aromatic varieties',
            '2 tbsp honey or jaggery — added off the heat after cooling slightly, so honey keeps its goodness and jaggery does not curdle the milk',
            'A pinch of cardamom (optional) — traditional offerings are often unspiced, so use only a pinch if at all',
          ],
        },
      ],
      mise: [
        'Wash the rice in two changes of water and drain it. Do not soak it for long; a quick rinse is enough.',
        'Wash your hands and make sure the pot, spoon and bowl are clean. Many Buddhists begin cooking with a moment of mindfulness and an intention to offer the food.',
        'Measure the honey or jaggery and have it ready, but do not add it until the kheer has cooled slightly.',
        'Prepare the place for the offering: a clean plate, a lit lamp, flowers and incense in front of the Buddha image.',
      ],
      method: [
        {
          title: 'Bring the milk to a boil',
          text:
            'Pour the milk into the clean pot and heat on medium until it begins to rise, about 6–8 minutes, stirring now and then. As soon as it comes to a boil, lower the heat so the milk barely bubbles. Stay with the pot; milk can boil over in seconds.',
          why: 'Heating the milk first makes it safe and gives a slightly thicker base for the rice. Reducing the heat promptly prevents scorching.',
          cue: 'A creamy foam rises to the rim and sinks when you stir.',
        },
        {
          title: 'Add the rice',
          text:
            'Add the rinsed rice to the hot milk and stir well. Keep the heat low so the milk simmers very gently. Stir for the first two minutes so the grains do not clump or settle to the bottom.',
          why: 'Adding the rice to hot milk keeps the grains separate at first, so they cook evenly.',
          cue: 'The rice floats and spreads through the milk, and the milk stays a clear creamy white.',
        },
        {
          title: 'Simmer slowly, stirring',
          text:
            'Cook for 35–40 minutes on low heat, stirring every 3–4 minutes and scraping the base and sides. The rice will swell, soften and begin to break, and the milk will thicken and reduce by a quarter. Add a spoon of hot milk if it gets too thick.',
          why: 'Slow cooking draws the starch out of the rice into the milk, thickening it naturally with no added ingredients.',
          cue: 'The rice is soft when pressed and the milk coats the spoon in a light creamy film.',
        },
        {
          title: 'Taste and check the texture',
          text:
            'Take a spoonful, cool it, and taste. The rice should be fully soft with no firm core, and the milk-rice should have the consistency of thin porridge. If it is thin, simmer a few minutes more; if thick, add a splash of hot milk.',
          why: 'This is the last point at which you can adjust the texture before adding sweetener, which can mask undercooking.',
          cue: 'The grains squash easily and the milk-rice flows slowly from the spoon.',
        },
        {
          title: 'Cool slightly, then sweeten',
          text:
            'Switch off the heat and let the milk-rice stand for 10 minutes until it stops bubbling and is just hot, not boiling. Stir in the honey or jaggery a spoonful at a time until the sweetness is gentle. Add the pinch of cardamom if using.',
          why: 'Honey loses its delicate flavour when boiled, and jaggery can curdle milk if added to a boiling pot. Sweetening off the heat avoids both problems.',
          cue: 'The honey or jaggery dissolves without any curdling and the milk-rice looks smooth and pale golden.',
        },
        {
          title: 'Serve into a clean bowl for the offering',
          text:
            'Ladle the first portion into the plain offering bowl, wipe the rim with a clean cloth, and place it on a small banana leaf or plate. Do not taste from the offering bowl. The remainder stays covered in the pot until the offering is made.',
          why: 'The offering is made before anyone eats, as a gesture of gratitude. Keeping the offering portion clean is a sign of respect.',
          cue: 'The bowl is neat, warm, and free of drips on the rim.',
        },
        {
          title: 'Let it cool before sharing',
          text:
            'Once the offering is done, let the remaining milk-rice cool for another 10 minutes so it is comfortable to eat, particularly for children and elders. Stir it once gently before serving.',
          why: 'Very hot milk-rice can burn the mouth, and a short rest also lets the flavour settle.',
          cue: 'The milk-rice has a gentle warmth and no steam rises when stirred.',
        },
      ],
      offering:
        'Offered in a simple bowl before the Buddha, along with flowers, lamps and incense, then shared with the congregation.',
      ritual: [
        'Begin with a moment of reflection or a short verse of gratitude. Many communities remember Sujata’s offering and the Middle Way as they cook.',
        'Place the bowl of milk-rice on a clean shrine or table in front of the Buddha image, along with lit lamps, fresh flowers and incense. Monastic communities may chant the verses of homage to the Triple Gem (Buddham saranam gacchami).',
        'Offer the bowl with both hands, bowing slightly, and leave it before the image for a few minutes of silent reflection.',
        'Invite the monks and nuns to receive the first portion where a sangha is present (dana), and then share with lay pilgrims and visitors.',
        'The milk-rice is distributed in small bowls or leaf cups, received with both hands, and eaten together mindfully, with gratitude to the donor and the cook.',
      ],
      serving:
        'Serve warm in small bowls with a spoon. Keep it plain; at Bodh Gaya, milk-rice is often handed out to pilgrims in disposable bowls during the Buddha Purnima celebrations. A portion of 3–4 tablespoons per person is generous.',
      storage:
        'Eat the same day. Cooked milk-rice should not be left out for long, especially in warm weather. Refrigerate leftovers promptly in a covered container for up to 24 hours and warm gently before serving.',
      troubleshooting: [
        {
          problem: 'The milk-rice is too thin.',
          fix: 'Simmer a further 10 minutes on low heat, stirring, or mash a spoonful of rice against the side to release starch.',
        },
        {
          problem: 'The honey has made the milk-rice taste bitter or thin.',
          fix: 'The milk-rice was too hot when the honey went in. Let it cool more before sweetening next time, and use a lighter honey.',
        },
        {
          problem: 'The milk-rice curdled when jaggery was added.',
          fix: 'The mixture was too hot. Cool it more next time, and add the jaggery as a pre-dissolved syrup.',
        },
        {
          problem: 'There is a layer of rice stuck to the base.',
          fix: 'The heat was too high. Pour out the good milk-rice without scraping, and soak the pot.',
        },
      ],
      variations: [
        'Some communities use jaggery instead of honey, in keeping with the rural village setting of Sujata’s offering.',
        'Sri Lankan Buddhists make kiribath, rice cooked in coconut milk with a pinch of salt and cut into diamonds, eaten on auspicious days and at Vesak.',
        'Tibetan Buddhist communities offer a rice and butter preparation called dresil, sweetened with sugar and raisins, on festive occasions.',
        'Vegan households can use thick rice milk or coconut milk and cook the rice in it, though this is a modern adaptation.',
        'In summer, the milk-rice may be served chilled with a little extra honey.',
      ],
      tips: [
        'Keep the dish simple; the purpose is humility and gratitude, not richness.',
        'Use clean vessels reserved for food and offerings.',
        'Share the milk-rice generously, since dana (giving) is the heart of the observance.',
      ],
      differs: 'Unspiced; honey added off the heat.',
    },
  ],
}

export default recipe
