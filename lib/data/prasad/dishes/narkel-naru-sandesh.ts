import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'narkel-naru-sandesh',
  name: 'Narkel Naru & Sandesh',
  alsoCalled: 'Coconut laddu · Sondesh · নারকেল নাড়ু',
  category: 'Sweet',
  summary: 'Bengal’s coconut-jaggery laddu and its fresh-cheese sweet, offered to Lakshmi and exchanged on Bhai Phonta.',
  meaning:
    'Bengali Lakshmi Puja, Kali Puja and Bhai Phonta bring out two sweets that cannot be missed: narkel naru, a chewy ball of fresh coconut and jaggery, and sandesh, a soft sweet made of chhena (fresh curdled milk solids). Together they represent two kinds of Bengali sweetness — the rustic, harvest-linked sweet of coconut and gur, and the refined milk sweet of the city confectioner. Both are offered in small bowls to the Goddess, then given to the visiting sister or brother. Naru in particular is associated with Lakshmi Puja on the full moon after Durga Puja, when each household makes dozens to give away.',
  variants: [
    {
      id: 'bengal',
      region: 'West Bengal',
      culture: 'Bengali households — Lakshmi Puja, Kali Puja, Bhai Phonta',
      title: 'Narkel Naru and Sandesh',
      intro:
        'Narkel naru uses fresh coconut and gur (date-palm jaggery); sandesh uses chhena kneaded with a little sugar until silky. Both are shaped by hand or moulded and decorated with a pistachio sliver.',
      story:
        'Bengal’s sweet tradition rests on two ingredients that other regions use less: date-palm jaggery (nolen gur or patali), which appears in winter, and chhena, which entered Bengali cooking when milk-curdling became acceptable in sweet-making. Naru, from the Sanskrit “laddu”, is the older of the two, a farmhouse sweet that keeps for weeks and travels well; every Bengali kitchen has a tin of narkel naru around Lakshmi Puja and Kali Puja.\n\nSandesh is the confectioner’s art. Its name is related to the word for “news” or “message”, because it was once exchanged as a token of good tidings. A good sandesh is not hard or rubbery; it melts in the mouth because the chhena is kneaded until the milk proteins turn smooth and slightly oily. Households that cannot visit a sweet shop make a simple kachha-golla or pak-style sandesh at home for the Bhai Phonta tilak, when the sister marks her brother’s forehead and feeds him a sweet.\n\nTogether, a plate of narkel naru and sandesh is the minimum a Bengali home offers on these festivals. The coconut naru stands for the earth’s abundance; the sandesh stands for the household’s hospitality and the sister’s love.',
      serves: '12 naru + 12 sandesh',
      prep: '40 min + 30 min hanging chhena',
      cook: '35 min',
      equipment: [
        'Heavy non-stick or steel kadai — spreads heat evenly so coconut and chhena do not catch on the base',
        'Muslin or fine cotton cloth — to strain and squeeze the chhena; a clean thin kitchen towel works if it is lint-free',
        'Wide plate or marble slab — for kneading the chhena with the heel of the palm',
        'Sandesh mould or small silicone mould (optional) — for decorative shapes; hand-shaping works equally well',
        'Grater or coconut scraper — fine shreds blend into the naru and give a smooth, uniform texture',
      ],
      ingredients: [
        {
          group: 'Narkel naru',
          items: [
            '2 cups (180 g) freshly grated coconut — use white flesh only; brown skin turns the naru dark and slightly bitter',
            '3/4 cup (150 g) gur (date-palm jaggery) or regular jaggery — nolen gur gives a smoky caramel perfume; regular jaggery works, with a lighter taste',
            '2 tbsp water — only to melt the jaggery; too much water makes the naru sticky and slow to set',
            '1/2 tsp cardamom powder — grind the seeds fresh for a stronger floral note',
            '1 tsp ghee — makes the mixture easier to shape and gives a faint richness',
          ],
        },
        {
          group: 'Sandesh',
          items: [
            '1 litre (4 cups) full-fat milk — buffalo or cow, but not toned; low-fat milk gives dry, crumbly chhena',
            '2 tbsp lemon juice or 1/2 cup fresh curd — curdling agent; lemon gives a cleaner flavour, curd gives a slightly softer curd',
            '1/4 cup (30 g) powdered sugar or 3 tbsp nolen gur — powdered sugar blends smoothly; gur gives a seasonal flavour but darkens the sandesh',
            '1/4 tsp cardamom powder — adds fragrance without overpowering the milky taste',
            '1 tbsp thin pistachio slivers — for decoration; keep them dry so they do not bleed colour',
            '1 cup cold water — to rinse the chhena and remove the sourness of lemon',
          ],
        },
      ],
      mise: [
        'Grate the coconut and keep it covered; if you use a freshly broken coconut, let the pieces dry for 10 minutes after breaking so the grating is clean.',
        'Chop the jaggery and, if it is soft date-palm gur, scrape it off the pot carefully into a measuring bowl.',
        'Wash and rinse a clean muslin cloth, wring it out, and place it over a bowl or colander ready for the chhena.',
        'Bring the milk to a boil only when the muslin and the lemon juice are ready, because the curdling must be done at once.',
        'Grease a plate lightly with ghee for shaping the naru, and keep a bowl of water beside you to dampen your palms.',
      ],
      method: [
        {
          title: 'Melt the jaggery',
          text:
            'Put the chopped jaggery and 2 tablespoons of water in the kadai on low heat. Stir until the jaggery melts completely, about 3–4 minutes. If it contains grit, pour it through a strainer into a clean bowl and return it to the pan. Bring to a gentle bubble and cook for 2 minutes.',
          why: 'Unrefined jaggery often carries sand and fibre. Straining prevents gritty naru. The brief boil lets the syrup lose a little water so the mix binds.',
          cue: 'The syrup is smooth, glossy, deep brown, and flows in slow, thick ribbons from the spoon.',
        },
        {
          title: 'Cook the coconut with the jaggery',
          text:
            'Add the grated coconut to the syrup and stir continuously on low-medium heat for 6–8 minutes. The coconut will release moisture and then absorb it again. Keep stirring and scraping the sides until the mixture leaves the base and gathers into a loose mass. Add the cardamom and ghee and stir for 30 seconds.',
          why: 'Constant stirring prevents scorching and cooks the coconut so the naru stays chewy rather than raw. Stopping too soon leaves them wet and soft.',
          cue: 'The mixture clumps together when pressed with the back of a spoon and does not stick to the pan.',
        },
        {
          title: 'Shape the naru',
          text:
            'Let the mixture cool for 3–5 minutes until you can handle it. Wet or grease your palms and shape walnut-sized portions into smooth balls, pressing firmly and rolling between your palms for 10 seconds each. Place them on the greased plate and let them set for 20 minutes.',
          why: 'The mixture firms as it cools. If left too long, it hardens and cracks; if shaped too hot, it burns your hands and loses shape.',
          cue: 'Each naru holds its round shape and feels slightly springy, with no cracks along the surface.',
        },
        {
          title: 'Curdle the milk for sandesh',
          text:
            'Bring the milk to a rolling boil in a clean pot, stirring now and then to prevent a skin. Lower the heat. Add the lemon juice one teaspoon at a time, stirring gently, until the milk splits into soft white curds and a clear greenish whey. Switch off immediately.',
          why: 'Adding acid slowly gives soft, fine curds. Pouring it all at once or boiling after curdling gives tough, rubbery chhena.',
          cue: 'The whey is clear, pale and watery, and the curds float in soft clouds.',
        },
        {
          title: 'Strain and rinse the chhena',
          text:
            'Pour the curds into the muslin-lined colander. Rinse under cold running water for about 30 seconds, gently moving the curds with your fingers to wash away the lemon taste. Gather the corners of the cloth, twist and squeeze gently to remove most of the water. Hang the bundle for 20–30 minutes, or press it under a plate.',
          why: 'The rinse removes sourness and cools the curds, which stops them hardening. Over-squeezing makes the chhena dry and crumbly.',
          cue: 'The chhena forms a soft ball that holds together but feels slightly damp, not dripping.',
        },
        {
          title: 'Knead the chhena until smooth',
          text:
            'Tip the chhena on a plate. Using the heel of your palm, push and smear it away from you, gather it back, and repeat for 5–7 minutes. At first it is grainy; it should gradually become smooth, soft and slightly oily, and start to stick together in one mass.',
          why: 'Kneading breaks the milk proteins into a fine paste, which is what gives sandesh its melt-in-the-mouth texture. Skipping this gives a granular, crumbly sweet.',
          cue: 'The dough is silky, with no visible grain, and a small piece pressed between the fingers feels smooth and cohesive.',
        },
        {
          title: 'Cook the chhena with sugar',
          text:
            'Place the kneaded chhena in a non-stick pan with the powdered sugar. Cook on low heat, stirring constantly, for 4–5 minutes. The mixture will loosen first, then thicken and begin to pull away from the pan as one soft mass. Stop at once; overcooking makes it hard.',
          why: 'The sugar dissolves and is absorbed by the chhena. Gentle heat sets the sweet without browning it.',
          cue: 'The mixture leaves the sides of the pan and forms a soft, pale ball that does not stick to your spoon.',
        },
        {
          title: 'Cool, flavour and shape the sandesh',
          text:
            'Transfer the mixture to a plate and let it cool until warm to touch. Add the cardamom and knead for 1 minute. Press small portions into oiled moulds or roll into flat discs, and press a pistachio sliver on top. Allow to set in a cool place for 15 minutes.',
          why: 'Shaping while warm gives a smooth surface; if left to go cold the sandesh cracks. Cardamom added after cooling keeps its fragrance.',
          cue: 'Each piece holds its shape cleanly, with a soft glossy surface.',
        },
      ],
      offering:
        'Both are offered to Lakshmi, Kali and the household deities in small bowls, and presented to the brother at the Bhai Phonta tilak.',
      ritual: [
        'On the evening of Lakshmi Puja, arrange the naru and sandesh in small bowls on a clean plate beside the alpana (rice-paste design) and the Goddess’s image, with fruit, a lamp and incense.',
        'After the main puja and the offering of flowers, place one piece of each sweet in front of the Goddess with a few drops of water around the plate, as an invitation to accept the food.',
        'Ring the bell, chant the aarti and let the offering rest for a few minutes before it is received as prasad. Do not eat any sweet before this.',
        'For Bhai Phonta, the sister fasts until she has applied the tilak (sandal, ghee and kajal) to her brother’s forehead and recited the blessing. She then feeds him a piece of sandesh and a naru by hand.',
        'The brother gives a gift in return. The sweets are then shared with the household and neighbours, starting with elders.',
      ],
      serving:
        'Serve naru and sandesh on a small plate or in banana-leaf cups, with one of each per person. Naru is eaten at room temperature; sandesh is best slightly cool but not cold, so that it keeps its softness.',
      storage:
        'Narkel naru keeps in an airtight tin for 10–14 days. Sandesh should be refrigerated in a covered container and eaten within 2 days; bring to room temperature for 15 minutes before serving.',
      troubleshooting: [
        {
          problem: 'The chhena is crumbly and will not bind.',
          fix: 'The milk was low-fat, too much acid was added, or the chhena was squeezed too dry. Use full-fat milk, add acid slowly, and stop squeezing while the curds are still soft.',
        },
        {
          problem: 'The sandesh tastes sour.',
          fix: 'The curds were not rinsed enough. Wash them under cold water for 30 seconds after straining.',
        },
        {
          problem: 'The naru is too hard.',
          fix: 'The jaggery syrup was cooked too long, or the mixture cooled before shaping. Warm it gently with a teaspoon of milk and reshape.',
        },
        {
          problem: 'The naru falls apart.',
          fix: 'There was not enough binding syrup, or the coconut was too dry. Add 1 tablespoon of melted jaggery and cook for another minute.',
        },
      ],
      variations: [
        'Some families add a pinch of dry ginger powder to the naru for a winter warmth.',
        'Nolen gur sandesh uses 3 tablespoons of date-palm jaggery in place of sugar and is a seasonal winter favourite.',
        'For a quicker sandesh, use ricotta or paneer crumbled and kneaded, though the texture is slightly less fine.',
        'For a vegan version, make only the naru, using coconut oil instead of ghee.',
        'Jain families may avoid the lemon-curdled chhena and offer only the coconut naru, with fruit.',
      ],
      tips: [
        'Do not over-cook the chhena — it should be soft, not crumbly.',
        'The water rinse after curdling is what removes the lemon taste.',
        'For a snow-white sandesh, use powdered sugar rather than gur and cook on the lowest heat.',
        'Make the naru a day ahead; the flavour deepens overnight.',
      ],
    },
  ],
}

export default recipe
