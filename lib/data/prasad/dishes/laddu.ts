import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'laddu',
  name: 'Laddu',
  alsoCalled: 'Boondi Laddu · Motichoor · Tirupati Laddu · लड्डू',
  category: 'Sweet',
  summary: 'Hanuman’s boondi laddu and the Tirupati-style temple laddu.',
  meaning:
    'The laddu is the most widely offered sweet in India, because it is round, keeps well, travels well and is easy to divide among thousands of devotees. Hanuman temples in the north offer boondi laddu, tiny fried drops of gram-flour batter soaked in sugar syrup and pressed into balls; it is the sweet of Tuesdays and Saturdays and of Hanuman Jayanti. At Tirumala, the Sri Venkateswara temple’s laddu is a different creation altogether: larger, with crisper boondi, kalkandu, cashews, raisins and a great deal of ghee, made in the temple kitchen (the potu) by a hereditary group of cooks to a closely guarded recipe, and given to pilgrims as the most prized prasad in the country. Both are bundles of the same basic craft, which is frying boondi to the right size and binding it with sugar syrup cooked to exactly the right stage.',
  variants: [
    {
      id: 'north-boondi',
      region: 'North India',
      culture: 'Hanuman temples; Hanuman Jayanti',
      title: 'Boondi Laddu',
      intro:
        'Tiny golden drops of gram-flour batter, fried in ghee or oil, soaked in a saffron-scented one-string syrup and pressed by hand into round laddus. Light, sticky, fragrant.',
      story:
        'Walk through any Hanuman temple on a Tuesday or Saturday in Delhi, Varanasi or Jaipur and you will find a stall outside selling boondi laddu in leaf bowls. The sweet is so closely tied to Hanuman that it is simply called Hanuman ji ka prasad. Devotees offer it, take it back blessed, and share it with everyone they meet on the way home.\n\nThe craft lies in the boondi. The batter is dropped through a perforated ladle (jhara) into hot fat, where each drop puffs into a small round pearl. The pearls are lifted out before they are crisp, and while still warm are stirred into a sugar syrup flavoured with cardamom, saffron and sometimes a little kewra. They soak up the syrup and become soft, and when pressed by hand they stick to each other, forming a laddu.\n\nHalwais measure everything by eye and touch: the consistency of the batter, the temperature of the fat, and above all the stage of the syrup. Home cooks can learn the same signs. The recipe below teaches each one, so that the laddu is soft and fragrant and not hard or powdery.',
      serves: '16–18 laddus (about 40 g each)',
      prep: '25 min',
      cook: '45 min',
      equipment: [
        'Wide, heavy kadai — wide enough for the fat to be 4–5 cm deep and for boondi to fry in a single layer',
        'Boondi jhara (perforated ladle) with holes of 3–4 mm — makes round drops; a regular slotted spoon with larger holes makes tails and flat pieces',
        'Heavy saucepan for the syrup — thin pans scorch the sugar',
        'Slotted spoon or skimmer — to lift the boondi out of the fat cleanly',
        'Large wide plate or tray — to hold the soaked boondi while it cools to a shapeable temperature',
        'Cooking thermometer (optional) — helpful for fat at about 170 degrees Celsius and for the syrup',
      ],
      ingredients: [
        {
          group: 'Boondi batter',
          items: [
            '1 cup (110 g) fine besan (gram flour) — fresh, sieved besan; old besan has a stale smell that passes into the laddu',
            '3/4 cup (180 ml) water, approximately — add gradually; the exact amount depends on the besan, so the batter is judged by flow, not by measure',
            'A pinch of baking soda — optional, for slightly lighter pearls; too much makes them dark and bitter',
            'A few drops of orange-yellow food colour or a pinch of turmeric — optional, for the traditional golden colour',
            'Ghee or refined oil, about 500 ml, for deep-frying — ghee gives the best flavour; many temples use a mix of ghee and oil for cost',
          ],
        },
        {
          group: 'Sugar syrup',
          items: [
            '3/4 cup (150 g) sugar — plain white sugar gives a clear syrup that sets cleanly',
            '1/2 cup (120 ml) water — enough to dissolve the sugar fully and give time to reach the stage',
            '1/4 tsp cardamom powder — freshly ground seeds for aroma',
            '8–10 saffron strands, soaked in 1 tbsp warm milk — gives colour and fragrance; soak for 10 minutes before adding',
            '1 tsp lemon juice — a few drops stop the syrup from crystallising',
          ],
        },
        {
          group: 'Add-ins',
          items: [
            '1 tbsp melon seeds (char magaz) — traditional crunch and richness',
            '1 tbsp chopped cashews and raisins, lightly fried in ghee — optional, for a richer laddu',
            '1 tbsp ghee, warmed — makes shaping easier by greasing the palms and keeps the laddu from drying',
          ],
        },
      ],
      mise: [
        'Sieve the besan twice to remove lumps; this decides whether the boondi comes out round or ragged.',
        'Make the batter first and let it rest for 10 minutes so the besan hydrates fully.',
        'Soak the saffron in warm milk, and measure the cardamom, melon seeds and nuts into small bowls.',
        'Set the jhara, slotted spoon, and a wide plate lined with a paper towel next to the stove.',
        'Prepare the syrup only when the boondi is nearly all fried, so it is ready at the same time.',
      ],
      method: [
        {
          title: 'Make the boondi batter',
          text: 'Sieve the besan into a bowl. Add the water a little at a time while whisking with a wire whisk or fork for 3–4 minutes, until smooth. Add the pinch of baking soda and colour if using. The batter should be thin and flowing, like a thin pancake batter, and fall from the whisk in a continuous ribbon. Rest it for 10 minutes.',
          why: 'Too thick a batter will not pass through the holes and gives long tails; too thin makes flat, weak pearls. Resting allows the besan to absorb water so the pearls hold together in the fat.',
          cue: 'The batter coats the back of a spoon in a thin even layer, and drips in a steady stream without lumps. Test by dropping a spoonful into hot fat; it should form a round pearl and rise in a few seconds.',
        },
        {
          title: 'Heat the fat to the right temperature',
          text: 'Pour the ghee or oil into the kadai to a depth of 4–5 cm and heat on medium. After 4–5 minutes, drop a small drop of batter into it. It should sink for a second and then rise gently with a sizzle. If it rises instantly and browns, the fat is too hot; if it sinks and stays, too cool.',
          why: 'At about 170 degrees Celsius the drops puff and set quickly without absorbing too much fat. Cool fat makes greasy, flat boondi; very hot fat browns them before they cook through.',
          cue: 'A test drop rises within 2 seconds, sizzles steadily and turns pale gold, not brown, in about 30 seconds.',
        },
        {
          title: 'Fry the boondi in batches',
          text: 'Hold the jhara about 10 cm above the fat. Pour 3–4 tablespoons of batter on it and tap the rim with a spoon so the drops fall evenly. Fry for 45–60 seconds, until the boondi floats and the bubbles around it quieten. Lift out with the slotted spoon while still pale gold and soft. Repeat in batches without crowding the pan.',
          why: 'Boondi for laddu must be soft, not crisp, so it can drink the syrup. If fried until crisp, it stays hard and the laddu will not bind.',
          cue: 'The pearls are pale yellow, round, and slightly soft when pressed; they do not crackle or turn brown. The sizzling sound drops as they cook.',
        },
        {
          title: 'Cook the syrup to one-string consistency',
          text: 'In a heavy pan, combine the sugar and water. Heat on medium, stirring until the sugar dissolves. Add the lemon juice and let it boil for 5–6 minutes without stirring. To test one-string consistency, take a drop of syrup between your thumb and forefinger, then slowly pull them apart; a single thin thread should form between them. Add the saffron milk and cardamom, and switch off.',
          why: 'One-string syrup holds enough sugar to glue the pearls without making them hard. A thinner syrup makes soggy laddus that cannot be shaped; a thicker syrup sets into hard candy around the boondi.',
          cue: 'Hot syrup tested carefully (let a drop cool on a spoon first) forms a single thread that holds for a second before breaking; the bubbles are fine, slow and glossy.',
        },
        {
          title: 'Soak the boondi in the syrup',
          text: 'Add the fried boondi to the warm syrup (not boiling hot) and stir gently with a spoon for 1 minute so every pearl is coated. Cover and rest for 10–15 minutes, until the syrup has been absorbed and the mixture is sticky but not wet.',
          why: 'The warm syrup is absorbed by the porous pearls and softens them. Boiling hot syrup makes them mushy; cold syrup is not absorbed and leaves them hard.',
          cue: 'There is no free syrup pooling at the bottom, and the pearls look plump and shiny, clumping slightly when pressed together.',
        },
        {
          title: 'Add the nuts and mash lightly',
          text: 'Add the melon seeds, fried cashews and raisins. With the back of a spoon, mash a small portion of the boondi (about a quarter) coarsely to release its starch, which helps the laddu to hold together. Mix everything gently.',
          why: 'Crushing some pearls gives a sticky binder; leaving most whole keeps the characteristic texture of whole boondi in the laddu.',
          cue: 'The mixture holds when you squeeze a handful in your fist, with a mix of whole pearls and a sticky paste.',
        },
        {
          title: 'Shape the laddus',
          text: 'While the mixture is still warm, grease your palms with a little warm ghee. Take a portion of about 40 g, press it firmly between your palms and roll it into a ball, turning it for 10–15 seconds. Place on a plate. If the mixture cools and cracks, warm it for 10 seconds in the microwave or over a double boiler.',
          why: 'Warm sugar is still pliable; as it cools it sets, and the laddu will not bind. Firm pressure removes gaps between pearls that would make it crumble.',
          cue: 'The laddu is round, glossy, and holds its shape when lifted, without any pearls falling off.',
        },
        {
          title: 'Set and rest',
          text: 'Leave the laddus uncovered on the plate for 1–2 hours, until set and dry on the surface. Do not stack. Then store in an airtight box, or offer them fresh to the deity and the family without delay.',
          why: 'Setting lets the syrup finish its work, giving a firm exterior and a soft interior. Packing too early causes them to stick together.',
          cue: 'The surface feels dry, not sticky, and the laddu keeps its shape when gently pressed.',
        },
      ],
      offering:
        'Offered on Tuesdays and Saturdays at Hanuman temples and on Hanuman Jayanti, in odd numbers (1, 5, 11, 21), after a ghee lamp is lit.',
      ritual: [
        'Bathe and wear clean clothes before cooking. Do not taste the laddu while making it; it is made for the deity first.',
        'Place the laddus on a clean plate or a banana leaf with a few tulsi leaves (if the family tradition uses them) and a small ghee lamp before the image of Hanuman.',
        'Light incense and the lamp. Chant the Hanuman Chalisa or a short prayer such as “Om Hanumate Namah”, and offer the plate with both hands, in odd numbers: 1, 5, 11 or 21.',
        'Leave the plate for a few minutes in silence, then show the lamp (aarti) and sprinkle a little water around it to signify that the offering has been received.',
        'Distribute the laddus among family members and neighbours, starting with the eldest, and offer some to cows, monkeys and children if possible, as these are considered Hanuman’s own.',
        'Hanuman prasad is traditionally eaten on the same day; if taken to a temple, it is offered at the sanctum and returned blessed to share.',
      ],
      serving:
        'Serve fresh at room temperature, one laddu per person, on a leaf plate or in a paper bowl. It is eaten with the hands. Keep a few extra for visitors who come after the prayers. For fasts, it is eaten after the offering is complete.',
      storage:
        'Keeps for 4–5 days at room temperature in an airtight steel container, and up to 2 weeks in the refrigerator. Bring to room temperature before eating. If dry, microwave for 8–10 seconds to soften.',
      troubleshooting: [
        {
          problem: 'The boondi has long tails and is not round',
          fix: 'The batter is too thick or the jhara holes are too large. Add a spoon of water to thin the batter, and hold the jhara higher above the fat.',
        },
        {
          problem: 'The boondi is flat and weak',
          fix: 'The batter is too thin or the fat is too cool. Whisk in a spoonful of besan and test the fat again before frying.',
        },
        {
          problem: 'The laddus will not bind and crumble',
          fix: 'The syrup was too thin or the mix too dry. Warm a little extra syrup, stir it in a spoon at a time, and shape again while warm.',
        },
        {
          problem: 'The laddus are hard like stones',
          fix: 'The syrup was cooked past one-string or the boondi was fried crisp. Next time stop the syrup earlier and take the boondi out when pale gold.',
        },
        {
          problem: 'The syrup crystallised into grains',
          fix: 'It was stirred after boiling, or no acid was added. Add two spoons of hot water and a few drops of lemon juice, reheat gently, and cook to one-string again.',
        },
      ],
      variations: [
        'Motichoor laddu: use a finer jhara so the pearls are tiny, and use a slightly thinner syrup; the laddu is softer and more delicate.',
        'Add a drop of kewra water or rose water to the syrup in place of saffron for a floral aroma.',
        'Use jaggery syrup instead of sugar for a rustic, darker laddu, as is customary in some rural temples.',
        'For a vrat version, check your family’s rules; gram flour may not be accepted in some fasts, and then a kuttu or singhara flour laddu is made instead.',
        'Reduce fat by baking the boondi on a tray, though the texture will differ from the traditional one.',
        'Jain-friendly: all ingredients are plant-based; use ghee or oil from a source your family trusts and omit onion-based accompaniments.',
      ],
      tips: [
        'Learn the one-string test before you begin, and practise it on a spoonful of sugar syrup.',
        'Use a thermometer if you have one: fat at 165–175 degrees Celsius, one-string syrup at about 108–110.',
        'Fry in small batches. Crowding the pan drops the fat temperature and makes greasy boondi.',
        'Shape the laddus while warm, but not hot. Wait 30 seconds if your hands burn.',
        'Make them the day before the festival; they taste better after the syrup settles.',
      ],
      differs: 'Light, sticky and fragrant with saffron; shaped by hand.',
    },
    {
      id: 'tirupati',
      region: 'Andhra Pradesh (Tirumala-style)',
      culture: 'Sri Vaishnava; Venkateswara temple tradition',
      title: 'Tirupati-style Laddu',
      intro:
        'A larger, richer laddu with crisp boondi, kalkandu, cashews, raisins and plenty of ghee. This is a home version in the style of the Tirumala laddu; the temple’s own recipe is a closely guarded secret.',
      story:
        'The Tirupati laddu is probably the most famous temple prasad in India. It is made in the potu, the temple kitchen at Tirumala, by a hereditary group of cooks, and the temple’s own account of the recipe records the ingredients as gram flour, sugar, ghee, cashews, raisins and cardamom, with its details known only to the temple. The laddu has had a Geographical Indication registration since 2009. Pilgrims queue for hours for darshan of Sri Venkateswara, and the laddu is the thing they carry home for friends and neighbours.\n\nWhat can be said with confidence is that it differs from the north Indian boondi laddu. It is bigger, the boondi is drier and crisper rather than soft, the sweetness comes partly from sugar candy (kalkandu), and the ghee content is high enough that the laddu stays moist for days. A Tirupati laddu does not collapse into pearls; it keeps its shape when broken into pieces.\n\nThe recipe below is a home version in that style, built from what is publicly known about the ingredients. It will not taste exactly like the temple’s laddu. What it does give is a rich, crisp-textured, ghee-forward laddu suitable for a Venkateswara puja at home.',
      serves: '10–12 large laddus (about 70 g each)',
      prep: '30 min',
      cook: '60 min',
      equipment: [
        'Wide, heavy kadai — for frying boondi and later for cooking the syrup; thick bottoms prevent scorching',
        'Boondi jhara with slightly larger holes (about 4 mm) — gives bigger, crisper pearls than the north Indian laddu',
        'Small frying pan — for frying cashews and raisins in ghee separately',
        'Mortar and pestle or a rolling pin — to crush the kalkandu (rock sugar) into small crystals',
        'Large wide steel plate (parat) — for mixing the laddu mass and cooling it',
        'Slotted spoon — for lifting the boondi out of the ghee',
      ],
      ingredients: [
        {
          group: 'Boondi',
          items: [
            '1 cup (110 g) fine besan — freshly sieved; gives the cleanest, crispest pearls',
            '3/4 cup water, approximately — enough for a flowing batter, added gradually',
            'About 500 ml ghee for frying — the ghee-rich flavour is the identity of this laddu; part of it is later added back into the mix',
          ],
        },
        {
          group: 'Sugar syrup',
          items: [
            '3/4 cup (150 g) sugar — white sugar for a clean taste',
            '1/3 cup water — just enough to dissolve and reach the stage',
            '1/2 tsp cardamom powder — freshly crushed; characteristic aroma of the temple laddu',
            '1 tsp lemon juice, a few drops — stops the syrup from crystallising',
          ],
        },
        {
          group: 'Add-ins',
          items: [
            '2 tbsp kalkandu (rock sugar), coarsely crushed — gives crunchy sweet crystals through the laddu',
            '2 tbsp cashew pieces — fried in ghee until golden for crunch and richness',
            '2 tbsp raisins — fried in ghee until plump, for chewy sweetness',
            '2 tbsp melted ghee, extra — keeps the laddu moist and helps with binding',
            '1 pinch edible camphor (pachha karpooram), optional — traditional in some South Indian sweets; use a tiny amount, as the taste is very strong',
          ],
        },
      ],
      mise: [
        'Sieve the besan twice and make the batter so it can rest for 10 minutes before frying.',
        'Crush the kalkandu coarsely, to the size of rice grains, using a mortar or a rolling pin inside a clean cloth.',
        'Fry the cashews and raisins separately in 1 tbsp of ghee, then keep them aside.',
        'Warm the extra ghee so it is liquid when you need it.',
        'Prepare your shaping area with a plate and a bowl of warm ghee for your palms.',
      ],
      method: [
        {
          title: 'Make the batter',
          text: 'Sieve the besan into a bowl and add water gradually, whisking until the batter is smooth and flows in a thin ribbon. Rest for 10 minutes. Test it by dropping a little into hot ghee: it should form a round pearl.',
          why: 'The batter needs to be thin enough to pass through the holes but thick enough to hold a round shape. Resting lets the besan swell.',
          cue: 'The batter coats a spoon thinly and drips continuously without lumps; a test drop rises and holds a round shape.',
        },
        {
          title: 'Heat the ghee',
          text: 'Heat the ghee in the kadai on medium heat to about 170 degrees Celsius. Drop a bit of batter in; it should rise to the surface in 2 seconds with steady sizzling, not brown immediately.',
          why: 'Correct fat temperature cooks the pearls through and sets them without darkening. Ghee burns more easily than oil, so watch it closely.',
          cue: 'The test drop floats within 2 seconds, with a fine, steady stream of bubbles and no smoke from the ghee.',
        },
        {
          title: 'Fry the boondi until crisp',
          text: 'Pour batter through the jhara held 10 cm above the ghee, in batches of 3–4 tablespoons. Fry for 90 seconds to 2 minutes until the pearls turn golden and the sizzling quietens. Remove with a slotted spoon and drain on a paper towel. Do not fry until brown.',
          why: 'Unlike the north Indian laddu, the Tirupati style uses crisper boondi, which gives the laddu its characteristic bite and lets it keep its shape.',
          cue: 'The pearls are light golden, crisp, and make a dry rustle when stirred on the plate; crushing one between your fingers gives a clean snap.',
        },
        {
          title: 'Fry the cashews and raisins',
          text: 'In a small pan, warm 1 tablespoon of ghee on low heat. Add the cashews and fry for 1–2 minutes until golden, then the raisins for 20–30 seconds until they puff. Remove both immediately onto a plate.',
          why: 'Frying in ghee gives crisp, flavourful nuts and plump fruit. Both burn quickly; cashews in particular turn from gold to brown in seconds.',
          cue: 'Cashews are light golden and fragrant; raisins swell to double their size and float.',
        },
        {
          title: 'Cook the sugar syrup to a firm one-string',
          text: 'Combine the sugar and water in a heavy pan and heat on medium, stirring until dissolved. Add lemon juice, then boil for 6–7 minutes without stirring. Test: let a drop cool, then pull it between thumb and forefinger; a thick single thread should form. For a firmer laddu, cook until the thread is just short of breaking, which is the lower edge of soft-ball. Add the cardamom and switch off.',
          why: 'A slightly firmer syrup than the north Indian version holds the larger, crisper pearls together. Too thin and the laddu falls apart; too thick and it hardens.',
          cue: 'The syrup is thick and glossy, forms a firm single thread that does not break immediately, and a drop in cold water makes a very soft, sticky ball.',
        },
        {
          title: 'Combine boondi, syrup and add-ins',
          text: 'In a wide steel plate, mix the crisp boondi with the crushed kalkandu, fried cashews and raisins. Pour in the warm syrup slowly while folding with a spoon. Add 2 tablespoons of warm ghee and the camphor if using. Mix until every pearl is lightly coated; do not mash.',
          why: 'Folding gently keeps the boondi whole and crisp. Adding ghee at this stage makes the mix glossy and prevents it from drying out as it cools.',
          cue: 'The pearls are coated and glossy, there is no pool of syrup, and the mix clumps when pressed in a fist.',
        },
        {
          title: 'Rest for five minutes',
          text: 'Cover the mixture and leave it for 5 minutes. The crisp boondi will absorb a little of the syrup and soften at the surface while staying crunchy at the heart.',
          why: 'This short rest balances the syrup absorption. Shaping immediately leaves it too wet; waiting longer lets it set hard.',
          cue: 'The mixture feels warm, tacky, and holds together easily when pressed.',
        },
        {
          title: 'Shape the large laddus',
          text: 'Grease your palms with warm ghee. Take about 70 g of the mixture, press firmly with both hands, and roll into a large round ball, using steady pressure for 15–20 seconds. Place on a plate. Work while the mixture is warm.',
          why: 'Large crisp-boondi laddus need more pressure to compact. Warm syrup still binds; cold syrup will not.',
          cue: 'The laddu is firm, round, glossy with ghee, and does not shed pearls when lifted.',
        },
        {
          title: 'Cool and set',
          text: 'Leave the laddus uncovered on a plate for 2–3 hours until completely set. Then store in an airtight container. The flavour is best after a day, when the ghee has spread evenly through the laddu.',
          why: 'Setting lets the syrup harden into a binder, and the ghee distributes through the laddu.',
          cue: 'The surface is dry and satiny, and the laddu keeps its shape when pressed gently.',
        },
      ],
      offering:
        'Offered to Sri Venkateswara (Balaji) at home on Saturdays and during Brahmotsavam, Vaikuntha Ekadashi and Brahmotsavam-time pujas, after a ghee lamp is lit.',
      ritual: [
        'Cook with cleanliness and devotion: bathe first, tie the hair back, and keep the kitchen pure. Avoid tasting during cooking; the laddu is prepared for the Lord.',
        'Set a clean plate or banana leaf before the image of Venkateswara (Balaji) with a few tulsi leaves, and place one or more laddus on it.',
        'Light a ghee lamp and incense. Chant “Om Namo Venkatesaya” or recite the Venkateswara Suprabhatam or Govinda namas (“Govinda! Govinda!”), and offer the plate with both hands.',
        'After the offering, show the lamp (aarti) and sprinkle a little water around the plate. Leave the laddu before the deity for a few minutes.',
        'Distribute the prasad, beginning with the eldest, and share it with neighbours, relatives and the poor. Pilgrims traditionally bring laddu home for those who could not travel.',
        'Do not call this the Tirumala prasad. It is a home offering in that style; the sacred laddu of Tirumala itself is received only from the temple.',
      ],
      serving:
        'Serve one large laddu per person, broken by hand into pieces, on a leaf plate or in a small steel bowl. Eat it after the offering, with water or warm milk. Wrap in butter paper for gifting.',
      storage:
        'Keeps for 7–10 days at room temperature in an airtight container, thanks to the high ghee content. Store in the refrigerator for up to 3 weeks and bring to room temperature before serving.',
      troubleshooting: [
        {
          problem: 'The laddu falls apart when you shape it',
          fix: 'The syrup was too thin or too little. Warm a tablespoon of extra syrup or ghee, mix, and shape again while warm.',
        },
        {
          problem: 'The laddu is rock-hard',
          fix: 'The syrup was overcooked. Next time stop at the lower end of one-string. To rescue, break up and moisten with a little warm ghee.',
        },
        {
          problem: 'The boondi is soft instead of crisp',
          fix: 'It was removed from the ghee too early or the fat was too cool. Fry longer until golden and test the ghee temperature first.',
        },
        {
          problem: 'The ghee tastes burnt',
          fix: 'The ghee overheated. Fry on medium heat and strain the ghee between batches to remove burnt bits.',
        },
        {
          problem: 'The laddus turn greasy',
          fix: 'Too much ghee was added at the end, or the boondi was not drained. Drain the boondi well on paper towels and add ghee a spoon at a time.',
        },
      ],
      variations: [
        'Add 1 tablespoon of dried coconut slivers fried in ghee for extra sweetness and crunch.',
        'Use jaggery syrup in place of sugar for a darker, more earthy laddu, as some South Indian temples do.',
        'Add a pinch of nutmeg or dried ginger powder along with the cardamom for a warmer aroma.',
        'Make smaller laddus of 30–40 g for sharing among many guests.',
        'For a nut-free version, omit cashews and use extra raisins and melon seeds.',
        'Jain-friendly: all ingredients are plant-based; omit camphor if your family does not use it in food.',
      ],
      tips: [
        'This is a home version in the Tirumala style; do not describe it as the temple’s recipe.',
        'Use good-quality ghee. It is the main flavour and cannot be replaced.',
        'Fry boondi until crisp, not soft; this is the main difference from the north Indian laddu.',
        'Use edible camphor sparingly, or leave it out, as a little too much overwhelms the sweet.',
        'Shape the laddus while warm; a cold mixture will not bind.',
      ],
      differs: 'Larger, crisper boondi; kalkandu and cashews; very ghee-rich.',
    },
  ],
}

export default recipe
