import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'thekua',
  name: 'Thekua & Kasar',
  alsoCalled: 'Khajuria · Thokwa · ठेकुआ',
  category: 'Sweet',
  summary: 'Chhath Puja’s signature offering — a crisp wheat-jaggery biscuit — and its rice-flour laddu partner.',
  meaning:
    'Thekua is made at home, in a strictly pure kitchen, during Chhath Puja. It is fried, not baked, from whole-wheat flour, jaggery and ghee, and pressed into a carved wooden mould so that each piece carries a pattern. It is offered to Surya (the Sun) and Chhathi Maiya in the bamboo soop, first at sunset and again at sunrise. The kasar, a soft laddu of roasted rice flour and jaggery, is its companion in the same basket. Chhath is observed most strongly in Bihar, Jharkhand, eastern Uttar Pradesh and the Terai of Nepal, and by the diaspora from these regions everywhere; the prasad is the same in spirit but every family has its own proportions, handed down by watching rather than by measuring. Both sweets are deliberately simple — no eggs, no onion or garlic in the house, no tasting before the offering — because the point is purity and gratitude for the harvest and the sun, not richness.',
  variants: [
    {
      id: 'bihar-thekua',
      region: 'Bihar, Jharkhand & Eastern UP',
      culture: 'Bhojpuri, Maithil and Magahi households — Chhath',
      title: 'Thekua',
      intro:
        'A hard, crisp, fragrant biscuit with a long shelf life. It is made with whole-wheat flour, jaggery syrup, ghee, coconut and fennel and fried in ghee.',
      story:
        'Thekua is the most recognisable food of Chhath. In Bihar and Jharkhand it is also called khajuria, and in some Bhojpuri villages thokwa. The name probably comes from the verb “thek-na”, to press or to prop, because the dough is pressed into a wooden mould called a saancha. The mould is carved with a wheel, a leaf, a sun or a flower, and a family often keeps the same mould for generations; women lend theirs to neighbours in the week before the festival.\n\nThe thekua belongs to the second and third days of the four-day Chhath: Nahay-Khay, Kharna, Sandhya Arghya and Usha Arghya. After the evening of Kharna, when the vrati breaks a day of fasting with jaggery kheer and roti, the preparation for the arghya begins. Wheat is washed, dried on a clean cloth in the sun and ground in a chakki or a hand mill, and the flour is used only for the festival. The cooking is done on a clay chulha, traditionally fuelled by mango wood, in a kitchen that has been washed and kept free of onion, garlic and non-vegetarian food for the whole week. No one tastes the thekua until it has been offered to the Sun.\n\nWhat makes the thekua different from other fried wheat sweets such as shakkarpara or mathri is its dough: it is stiff, bound only with ghee and dissolved jaggery, with no milk, no leavening and no sugar. This is why it keeps for weeks and why it is crunchy outside and slightly crumbly inside. Families in Maithil Mithila add dried coconut and fennel; in some Bhojpuri homes a little cardamom and chopped dry fruit are added; the flavour of good jaggery does most of the work.',
      serves: '20 thekua',
      prep: '30 min',
      cook: '30 min',
      equipment: [
        'Wooden thekua mould (saancha) — a small carved block that gives the pattern; if you have none, flatten the dough and mark it with the tines of a clean fork or a knife',
        'Heavy-bottomed kadai or a clay/iron pan — holds heat evenly so the thekua fry slowly without scorching the jaggery',
        'Large steel or brass parat (wide plate) for kneading — the wide surface lets you rub in ghee evenly',
        'Slotted spoon (jhara) — to lift the thekua out and let ghee drain',
        'Clean muslin or cotton cloth — to cover the dough and to cool the finished thekua',
      ],
      ingredients: [
        {
          group: 'Dough',
          items: [
            '2 cups (250 g) whole-wheat flour (atta) — freshly ground, coarse-ish chakki atta is best because it gives the characteristic crunch; avoid “maida-rich” soft flour',
            '3/4 cup (150 g) jaggery, chopped — use clean, light-golden jaggery without chemical smell; dark old jaggery can turn bitter on frying',
            '1/3 cup (80 ml) water — only to dissolve the jaggery; the dough takes no extra water',
            '1/4 cup (55 g) ghee for the dough (moyan) — melted and cooled; this is what makes the biscuit short and crisp',
            '1/4 cup (25 g) dry coconut, thinly sliced or grated — adds sweetness and a nutty bite; fresh coconut is not used because it spoils quickly',
            '1 tsp fennel seeds (saunf) — lightly crushed; the cooling aroma that is typical of Bihari thekua',
            '1/2 tsp cardamom powder — freshly ground from green cardamom seeds for aroma',
            '1 tbsp chopped dry fruits (optional) — almonds or cashews in small bits; keeps the thekua rich without making it greasy',
          ],
        },
        {
          group: 'For frying',
          items: [
            '2 cups (about 450 g) ghee or refined oil — enough for 2 cm depth in the kadai; ghee gives a richer taste, oil is acceptable and common in households',
          ],
        },
      ],
      mise: [
        'Wash the kitchen platform and your hands, tie back your hair, and use vessels kept only for puja — no onion, garlic or egg should have touched them.',
        'Dissolve the jaggery in the water over a low flame for 3–4 minutes, strain through a clean cloth to remove grit, and cool until lukewarm to touch.',
        'Slice the dry coconut and crush the fennel and cardamom just before using.',
        'Grease the wooden mould lightly with ghee so the dough does not stick.',
      ],
      method: [
        {
          title: 'Rub the ghee into the flour',
          text: 'Put the atta in the parat and pour the melted, cooled ghee over it. Rub the flour between your palms, lifting and dropping it, for 3–4 minutes until every grain is coated and the flour clumps when you squeeze a fistful, then falls apart when poked.',
          why: 'Ghee that coats the flour before any liquid is added stops gluten from forming, which is what makes thekua crisp and short instead of chewy like a roti.',
          cue: 'A handful pressed in your fist keeps its shape, but crumbles when you tap it.',
        },
        {
          title: 'Add the flavourings',
          text: 'Mix in the dry coconut, crushed fennel, cardamom and dry fruits with your fingertips, lifting the flour from the bottom of the parat so nothing settles. Distribute them evenly so each thekua carries a few pieces of coconut and a hint of fennel.',
          why: 'Adding the seasonings to the dry mix, not the wet dough, spreads them evenly without extra kneading, which would toughen the dough.',
          cue: 'You can smell fennel and cardamom clearly when you lift the flour to your nose.',
        },
        {
          title: 'Bind with jaggery water',
          text: 'Add the lukewarm jaggery water a few tablespoons at a time, pressing and gathering the flour into a firm, stiff dough. Use all the liquid only if needed; the final dough should be much stiffer than roti dough. Do not knead hard; press and fold for 2 minutes only.',
          why: 'Hot jaggery syrup would partly cook the flour and make the dough sticky; over-kneading develops gluten and gives hard, tough thekua.',
          cue: 'The dough holds together when pressed but is not tacky and leaves the sides of the parat clean.',
        },
        {
          title: 'Rest the dough',
          text: 'Cover the dough with a damp cloth and let it rest for 20 minutes at room temperature. During this time the flour absorbs the syrup and the dough becomes uniform. Knead it once more, briefly, for about a minute until smooth.',
          why: 'Wholewheat flour absorbs liquid slowly. Without resting, the dough is crumbly and the thekua cracks when moulded or frying.',
          cue: 'The dough is smooth, slightly springy, and no longer crumbles at the edges when pressed.',
        },
        {
          title: 'Shape the thekua',
          text: 'Pinch off a lime-sized ball (about 30 g), roll it smooth, and press it firmly into the greased mould. Flip the mould and tap its edge on the counter to release the patterned disc. If you have no mould, flatten the ball to 1 cm thick and mark it with a fork or the back of a knife.',
          why: 'A firm, even thickness of 1 cm cooks through without burning; a thicker piece will stay raw at the centre while the outside darkens.',
          cue: 'The disc comes out with a crisp pattern, with no cracks at the edge.',
        },
        {
          title: 'Heat the ghee',
          text: 'Heat the ghee or oil in the kadai on medium-low heat for 4–5 minutes. Test with a tiny pinch of dough: it should sink, then rise slowly to the surface with small bubbles and no sudden sizzle.',
          why: 'If the ghee is too hot, the jaggery caramelises and the thekua darkens outside while staying raw inside; if it is too cool, they absorb too much ghee and become greasy.',
          cue: 'The test dough rises slowly in about 5–6 seconds and bubbles gently around it.',
        },
        {
          title: 'Fry slowly until deep golden',
          text: 'Slide in 4–5 thekua at a time without crowding. Fry on low-medium heat for 8–10 minutes, turning them gently every 2 minutes, until they are deep golden-brown on both sides. Keep the flame low throughout.',
          why: 'Slow frying cooks the stiff dough through to the centre and dries it, which is what makes a thekua crisp and long-lasting.',
          cue: 'The bubbles around the thekua slow down and almost stop, and the colour is an even, dark golden-brown. A cooled thekua snaps with a clean break.',
        },
        {
          title: 'Drain and cool completely',
          text: 'Lift the thekua with the slotted spoon, let the ghee drip back into the kadai for a few seconds, and spread them on a clean cloth or a wire rack. Leave uncovered for at least 1 hour before storing or packing into the soop.',
          why: 'Thekua continue to harden as they cool; storing them warm traps steam and makes them soft within a day.',
          cue: 'They feel hard and dry to the touch and ring slightly when tapped together.',
        },
      ],
      offering:
        'Prepared at home on the day of Kharna / Sandhya Arghya in a pure kitchen with no onion or garlic; offered in the bamboo soop to the setting and rising Sun.',
      ritual: [
        'Cook and cool the thekua on the day of Sandhya Arghya, before the afternoon walk to the ghat. Do not taste any piece; the first portion belongs to the Sun.',
        'Arrange the thekua in the bamboo soop (winnowing tray) or a daura (woven basket) together with the kasar laddus, sugarcane, coconut, banana, lemon, the season’s fruit and a lit diya. Cover the soop with a clean cloth and carry it on the head or hands, barefoot, as a sign of humility.',
        'At the riverbank or pond, the vrati stands waist-deep in water facing the setting sun, holds the soop, and offers arghya of milk and water towards the sun while the family sings the Chhath geet. The offering is repeated at dawn the next morning facing the rising sun.',
        'After Usha Arghya, the vrati breaks the fast (parana) with the thekua, fruit and a little water. The remaining prasad is shared with family, neighbours and anyone who asks, and is received with cupped hands, never refused.',
      ],
      serving:
        'Serve at room temperature, as a snack with a cup of tea or as the first morsel when breaking the Chhath fast. Offer one or two pieces per person as prasad, together with a piece of fruit. Thekua is not served hot; it is at its best the next day, when the flavours have settled.',
      storage:
        'Store in an airtight steel or glass tin once completely cool. It stays fresh for 3–4 weeks at room temperature in a dry place. No refrigeration is needed. If it softens in a humid season, crisp it in a dry pan on low heat for 2 minutes.',
      troubleshooting: [
        {
          problem: 'The thekua is rock-hard rather than crisp.',
          fix: 'The dough had too little ghee or was kneaded too long. Use the full measure of ghee, rub it in thoroughly, and press the dough only until it just comes together.',
        },
        {
          problem: 'It breaks apart in the oil.',
          fix: 'The dough was too dry or the pieces too thick. Add a spoon of jaggery water, rest the dough for 15 minutes and keep the discs to 1 cm thick.',
        },
        {
          problem: 'The outside is dark but the inside is raw and soft.',
          fix: 'The ghee was too hot. Lower the flame and fry for longer; test with a small piece first. Break one open to check before frying the whole batch.',
        },
        {
          problem: 'The thekua tastes bitter or burnt.',
          fix: 'The jaggery caramelised too far. Use fresh light jaggery, keep the heat low, and never leave the kadai unattended.',
        },
      ],
      variations: [
        'Some Maithil families add a pinch of dried ginger powder (sonth) and no coconut; others add sesame seeds for extra crunch.',
        'A softer, cakier version uses a little milk to knead the dough and is eaten fresh within two days; it is more common in cities than in villages.',
        'Many households use refined oil, not ghee, for frying; the taste is plainer but equally acceptable, and it is easier on the budget for large batches.',
        'For a sugar-based thekua (not traditional for Chhath), replace jaggery with powdered sugar and reduce the water; vegan cooks can use oil instead of ghee and keep all other ingredients unchanged.',
        'For Jain or no-dairy households, replace ghee with refined oil in the dough (moyan) and for frying; the thekua will be slightly less aromatic.',
      ],
      tips: [
        'The dough must be stiff. A soft dough makes oily, flat thekua.',
        'Fry slowly. They should crisp from the inside; fast frying leaves a raw centre.',
        'Strain the jaggery water; any grit in the syrup shows up as hard specks in the finished biscuit.',
        'Keep the dough covered while you work; if the surface dries, the thekua will crack at the edges.',
      ],
      differs: 'Fried wheat–jaggery biscuit, mould-pressed.',
    },
    {
      id: 'purvanchal-kasar',
      region: 'Bihar & Eastern UP',
      culture: 'Chhath households',
      title: 'Kasar (Chawal ke Laddu)',
      intro:
        'A fragrant laddu made from roasted rice flour, jaggery or sugar, and ghee. It is soft, crumbly and mildly sweet — a contrast to the crisp thekua.',
      story:
        'Kasar is the quiet partner of the thekua in the Chhath soop. Where the thekua is hard, golden and carved, the kasar is a plain, pale laddu that melts in the mouth. It is made from rice, the other great staple of the Gangetic plain, and so completes the offering of the two grains of the harvest — wheat and rice — to the Sun. In Bhojpuri it is called kasar, and elsewhere chawal ke laddu or, in Mithila, simply “laddu” of rice flour.\n\nThe rice is washed, dried in the shade, and ground by hand or in a chakki. The flour is then roasted gently in ghee until it smells nutty but stays white, and bound with a syrup of jaggery or sugar. The preparation is simple but demands attention: if the flour is under-roasted, the laddu tastes raw; if it is over-roasted, it loses its delicate flavour.\n\nKasar is made in the same pure kitchen as the thekua, with the same rules — no tasting, no onion or garlic, a washed platform. Some families make it only on the day of Kharna; others prepare it the afternoon of Sandhya Arghya so that the laddus are fresh in the soop. It is a favourite of children and elderly relatives, since it is soft and needs no chewing.',
      serves: '15 laddus',
      prep: '10 min',
      cook: '20 min',
      equipment: [
        'Heavy kadai — roasting the flour needs even heat so it does not catch at the base',
        'Wooden or steel spatula — a flat one reaches the corners of the pan and stirs the flour evenly',
        'Fine sieve — to sift the flour and remove lumps, which makes the laddu smooth',
        'Small bowl of water — to wet your palms while shaping so the warm mixture does not stick',
      ],
      ingredients: [
        {
          items: [
            '2 cups (300 g) rice flour — made from raw rice that is washed, shade-dried and ground fresh; shop-bought fine flour works but should be dry',
            '1 cup (200 g) jaggery, chopped — gives the traditional brown colour and caramel flavour; use sugar for a whiter laddu',
            '1/3 cup (80 ml) ghee — pure and fresh; part is used to roast the flour and part to bind the laddu',
            '1/2 tsp cardamom powder — freshly ground for fragrance',
            '1/4 cup (60 ml) water — only for the jaggery syrup',
            '2 tbsp chopped almonds or cashews (optional) — adds crunch and richness; common but not essential',
          ],
        },
      ],
      mise: [
        'Sift the rice flour through a fine sieve to remove lumps; if the flour feels damp, dry it in a pan on low heat for 2 minutes and cool.',
        'Chop the jaggery finely so it melts quickly and evenly in the water.',
        'Keep a small bowl of water and a plate greased with ghee ready for shaping the laddus.',
      ],
      method: [
        {
          title: 'Roast the flour in ghee',
          text: 'Heat 2 tbsp of the ghee in the kadai on low heat. Add the sifted rice flour and stir constantly for 8–10 minutes, scraping the base, until it smells nutty. Do not let it brown; the flour should stay pale cream.',
          why: 'Raw rice flour tastes starchy and pasty. Gentle roasting cooks the starch and develops flavour without bitterness.',
          cue: 'The flour turns fragrant, feels lighter and looser, and flows like fine sand when stirred.',
        },
        {
          title: 'Add the nuts and cardamom',
          text: 'In the last minute of roasting, add the chopped nuts and the cardamom and stir to mix. Switch off the heat and immediately move the kadai to a cool surface, or tip the flour onto a plate, so that the residual heat of the pan does not keep cooking it.',
          why: 'Nuts and cardamom are delicate and burn quickly; adding them late keeps their flavour. Removing the flour from the hot pan stops it from over-roasting.',
          cue: 'The nuts smell toasted and the cardamom aroma is clear but not sharp.',
        },
        {
          title: 'Make the jaggery syrup',
          text: 'Put the jaggery and water in a clean pan on low heat. Stir until the jaggery dissolves completely, about 3–4 minutes, then bring it to a gentle boil. Strain through a cloth to remove impurities and return it to the pan.',
          why: 'Jaggery often contains sand and fibres. Straining gives a smooth laddu and a clean flavour.',
          cue: 'The syrup is clear brown, free of specks and flows easily from the spoon.',
        },
        {
          title: 'Cook the syrup to one string',
          text: 'Simmer the strained syrup for 4–5 minutes on low-medium heat. Check by taking a drop between thumb and forefinger; when you open them, a single thread should form. Do not go further, as the laddu would turn hard.',
          why: 'A one-string syrup is just sticky enough to bind the flour while the laddu stays soft. Over-cooked syrup makes laddus that crack and harden.',
          cue: 'A single, short thread stretches between the fingers and breaks cleanly.',
        },
        {
          title: 'Combine the flour and syrup',
          text: 'Switch off the heat. Add the roasted flour to the syrup in three parts, stirring well after each addition until no dry patches remain. The mixture should look like damp sand and hold together when squeezed.',
          why: 'Adding the flour gradually prevents lumps and lets you judge the moisture. Too much flour makes dry laddus; too little makes them sticky.',
          cue: 'A fistful pressed in your hand holds its shape and shows no dry flour.',
        },
        {
          title: 'Add the remaining ghee',
          text: 'Warm the remaining ghee until just melted and stir it into the mixture. This makes the laddu rich and helps it bind. Let the mixture cool for 3–4 minutes until you can handle it comfortably.',
          why: 'Ghee added at the end coats the grains and makes the laddu tender; cooking it with the syrup would make it greasy.',
          cue: 'The mixture looks glossy and forms a soft mass when squeezed.',
        },
        {
          title: 'Shape the laddus',
          text: 'Wet your palms lightly, take a lemon-sized portion (about 40 g), and press and roll it between your palms to a round ball. Work while the mixture is warm; if it cools and crumbles, sprinkle a few drops of warm water or ghee.',
          why: 'The mixture binds only while it is warm and the jaggery is soft. Cold mixture will not hold a round shape.',
          cue: 'Each laddu is smooth, firm and does not crack when you set it down.',
        },
        {
          title: 'Rest the laddus',
          text: 'Place the laddus on the greased plate with a little space between them and leave them uncovered, away from the stove and from any draught, for 1 hour. They firm up slowly as the jaggery cools and sets.',
          why: 'Resting lets the syrup set so the laddu keeps its shape when packed in the soop.',
          cue: 'The laddu feels firm to the touch but still gives slightly when pressed.',
        },
      ],
      offering: 'Offered in the soop along with thekua, fruit and sugarcane.',
      ritual: [
        'Prepare the kasar in the same pure kitchen as the thekua, and do not taste it before the offering.',
        'Place the laddus in the soop alongside the thekua, with a lit diya, fruit, coconut and sugarcane.',
        'Offer the soop towards the setting and rising Sun at the water’s edge, as the vrati stands in the water and the family chants the Chhath songs.',
        'After the dawn arghya, the vrati breaks the fast with the prasad. Share the laddus with all present, receiving and giving with both hands.',
      ],
      serving:
        'Serve at room temperature as a soft sweet, one or two laddus per person. It pairs well with the crisp thekua and with fresh fruit, and is gentle enough for children and the elderly.',
      storage:
        'Store in an airtight tin for up to 10 days at room temperature, away from moisture. In humid weather, keep it in the refrigerator and bring it to room temperature before serving.',
      troubleshooting: [
        {
          problem: 'The laddus crumble when shaped.',
          fix: 'The mixture is too dry or has cooled. Warm it slightly, sprinkle a spoon of warm ghee or water, and shape again while warm.',
        },
        {
          problem: 'The laddus are too sticky and soft.',
          fix: 'The syrup was under-cooked or too much was used. Add 2–3 tbsp of roasted flour and mix, then shape.',
        },
        {
          problem: 'The laddu tastes raw or starchy.',
          fix: 'The flour was not roasted long enough. Roast on low heat until it smells nutty.',
        },
        {
          problem: 'The laddus are hard.',
          fix: 'The syrup went past one-string stage. Next time stop at one string, or soften the mixture with a little warm ghee.',
        },
      ],
      variations: [
        'Replace jaggery with powdered sugar for a pale laddu; add 1/2 cup of powdered sugar and omit the water and syrup. Some families prefer this for its lighter colour.',
        'Add 2 tbsp of grated dry coconut or sesame seeds to the roasted flour for a nuttier laddu.',
        'For a dairy-free version, use refined oil or coconut oil instead of ghee; the laddu will be less fragrant.',
        'Some households use freshly ground arwa (raw) rice flour from rice soaked overnight and sun-dried, which gives a finer, more traditional texture.',
      ],
      tips: [
        'Use freshly ground, dry rice flour; damp flour lumps and tastes sour.',
        'Roast on low heat and keep stirring; rice flour scorches quickly at the base.',
        'Always test the syrup between your fingers rather than guessing by time.',
        'Make the laddus the same size so they sit evenly in the soop.',
      ],
      differs: 'Soft rice-flour laddu.',
    },
  ],
}

export default recipe
