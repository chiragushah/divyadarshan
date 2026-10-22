import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'thandai',
  name: 'Thandai',
  alsoCalled: 'Sardai · Thandai · ठंडाई',
  category: 'Drink',
  summary: 'Cooling almond-milk drink of Holi and Maha Shivaratri.',
  meaning:
    'Thandai means “the cooling one”. It is a spiced milk made from ground almonds, seeds, pepper, fennel, cardamom and rose, and it is the drink of Holi and of Mahashivaratri, when the body is tired by fasting or by play in the sun. In Braj and Uttar Pradesh it is offered to Krishna and Shiva alike; in Rajasthan it is richer and saffron-coloured. Some households add bhang at Holi, but the festival offering is always the plain milk, which is safe for children and for fasting elders.',
  variants: [
    {
      id: 'braj-up',
      region: 'Braj & Uttar Pradesh (Mathura, Vrindavan, Varanasi)',
      culture: 'Braj Vaishnava; Holi and Shivaratri households',
      title: 'Braj Thandai',
      intro:
        'A creamy, rose-scented milk made from soaked almonds, melon seeds, poppy seeds, fennel and pepper, ground to a fine paste and strained into chilled milk. Served on Holi after the colours are played.',
      story:
        'In Mathura and Vrindavan, Holi lasts for about a week, and thandai is the drink of every doorway: the lanes of Barsana and Nandgaon, where the famous lathmar Holi is played, are lined with pots of it. The drink is offered first to Radha and Krishna in the temple, and then distributed as prasad to devotees whose faces are smeared with gulal.\n\nThe base is nuts and seeds soaked overnight and ground on a stone (sil batta) to a smooth paste, then mixed with milk and sugar. The spices — black pepper, fennel, cardamom, and dried rose petals — are traditionally chosen because they are “thanda”, cooling to the body in the Ayurvedic sense, and because they balance the heat of the late February and March sun.\n\nIn Varanasi the same drink is served at Mahashivaratri, and it is the one place where a variant with bhang is sold openly in licensed shops. The temple offering, however, is always the plain thandai, and this recipe is the plain one.',
      serves: '6–8 glasses',
      prep: '20 min + 4 hr soaking',
      cook: '10 min',
      equipment: [
        'A stone grinder (sil batta) or a powerful blender — the paste must be extremely fine, or the drink will feel gritty.',
        'A fine muslin cloth or double-layered cotton sieve — to strain the milk so only silky liquid remains.',
        'A heavy-bottomed pot — to boil and reduce the milk without scorching.',
        'A large jug and small steel or clay glasses (kulhads) — clay cups keep the drink cool and add an earthy aroma.',
      ],
      ingredients: [
        {
          group: 'For the thandai paste',
          items: [
            '20 almonds (about 25 g) — soaked in warm water for four hours so the skins slip off easily',
            '2 tbsp melon seeds (magaz) — white, shelled; they give the drink its body and creamy colour',
            '1 tbsp poppy seeds (khus khus) — soak with the almonds; they are what make the paste silky',
            '1 tbsp fennel seeds (saunf) — sweet and cooling; they are the signature flavour of the drink',
            '10 black peppercorns — whole; they give a gentle bite that offsets the sweetness',
            '6 green cardamom pods — use only the seeds; the husks are fibrous',
            '2 tbsp dried rose petals — washed and soaked with the nuts for fragrance',
            '8 saffron strands — optional, soaked in two tablespoons of warm milk for ten minutes',
          ],
        },
        {
          group: 'For the milk',
          items: [
            '1 litre full-fat milk — buffalo or cow, but whole milk gives the creamiest result',
            '1/2 cup (100 g) sugar — adjust to taste; the paste itself is slightly sweet',
            '1 tsp rose water — added at the end, so its scent is not boiled away',
          ],
        },
      ],
      mise: [
        'Soak almonds, melon seeds, poppy seeds, fennel, peppercorns and rose petals in a bowl of warm water for at least four hours.',
        'Peel the almonds by pressing them between your fingers; the skins slip off and can be discarded.',
        'Soak the saffron in warm milk and set aside.',
        'Wet the muslin cloth, wring it out, and spread it in a sieve over a large bowl.',
      ],
      method: [
        {
          title: 'Drain and peel the soaked nuts',
          text:
            'Drain the soaked mixture and rinse it under running water once. Squeeze each almond to slip off its brown skin, and put the peeled almonds back with the seeds, spices and rose petals in a bowl.',
          why: 'The skins are slightly bitter and leave brown flecks in the milk; peeling them gives a pure creamy-white thandai.',
          cue: 'The almonds are smooth and cream coloured and the skins lie in a pile aside.',
        },
        {
          title: 'Grind to a fine paste',
          text:
            'Add the cardamom seeds and grind the mixture to a very smooth paste with about a quarter cup of milk, in batches if using a blender. Stop and scrape the sides several times. If using a stone grinder, grind for ten minutes until no grains remain.',
          why: 'The final texture depends on this step: any grit left in the paste will pass through the strainer and spoil the drink.',
          cue: 'Rubbing a little paste between your finger and thumb feels completely smooth, with no granules.',
        },
        {
          title: 'Boil and reduce the milk',
          text:
            'Pour the milk into the heavy pot and bring it to a boil on medium heat, stirring often. Reduce to low and simmer for ten minutes, stirring at the bottom so it does not stick, until it has reduced by about one-sixth.',
          why: 'Slight reduction thickens the milk and sweetens it naturally, giving thandai its richness; constant stirring prevents a skin or scorched layer.',
          cue: 'A pale cream film clings to the spoon and the volume has dropped by a small margin.',
        },
        {
          title: 'Add sugar and cool',
          text:
            'Stir in the sugar until it dissolves, then switch off the heat. Let the milk cool completely to room temperature, stirring now and then to prevent a skin from forming on the surface.',
          why: 'If the paste is added to hot milk, it curdles and cooks raw, losing its fresh nutty flavour; cooling avoids this.',
          cue: 'You can hold your finger in the milk comfortably and no wisp of steam rises.',
        },
        {
          title: 'Mix in the paste',
          text:
            'Stir the thandai paste into the cooled milk a spoonful at a time, whisking well so no lumps form. Let it stand undisturbed for 15 minutes so the flavours infuse fully into the milk.',
          why: 'Adding the paste gradually helps it disperse, and the rest allows fennel and cardamom to perfume the milk.',
          cue: 'The milk turns a soft ivory-green with a visible speckle of seeds, and smells strongly of fennel and rose.',
        },
        {
          title: 'Strain through muslin',
          text:
            'Pour the mixture through the wet muslin in the sieve, a ladle at a time, pressing and twisting the cloth to extract all the liquid. Discard the dry pulp, or reserve it for halwa.',
          why: 'Straining removes any coarse residue and gives the silky mouthfeel that defines good thandai.',
          cue: 'The strained liquid is smooth, with no particles, and the cloth holds only a firm, dry paste.',
        },
        {
          title: 'Flavour and chill',
          text:
            'Stir in the saffron-milk and the rose water. Taste and add sugar if needed. Cover the jug and refrigerate for at least two hours so the thandai becomes thoroughly cold.',
          why: 'Rose water and saffron are added at the end because heat destroys their fragrance; chilling brings out the cooling character.',
          cue: 'The jug is frosted on the outside and the first sip is cold, creamy and perfumed.',
        },
        {
          title: 'Stir and serve',
          text:
            'Stir the thandai well before serving, since the nut solids settle. Pour into clay or steel glasses and garnish each with a few dried rose petals and slivered almonds before handing it round.',
          why: 'Fine particles settle in minutes, and stirring restores the even creaminess in every glass.',
          cue: 'Each glass has a uniform ivory colour, a fragrant scent and a sprinkle of petals on top.',
        },
      ],
      offering:
        'Offered cold in a clay or silver cup to Radha-Krishna on Holi morning, after the Holika puja, and to Shiva on Mahashivaratri.',
      ritual: [
        'On Holi morning, pour a small cup of plain thandai and place it on a plate before the pictures of Radha and Krishna.',
        'Add a pinch of gulal on the plate and a few dried rose petals; offer with the words “Nivedayami”.',
        'Show a lamp and ring a small bell, then touch a little gulal to the feet of the deity.',
        'Put a drop of thandai on your tongue first as prasad, then distribute cups to elders, children and neighbours.',
        'On Mahashivaratri, offer the same plain thandai to the Shivalinga after abhishek, with a few bilva leaves, and do not add any intoxicant.',
      ],
      serving:
        'Serve cold in small clay kulhads, about 120 ml per person, garnished with rose petals and slivered almonds. In Mathura it is sold in large steel vessels from street stalls with crushed ice on the side.',
      storage:
        'Keeps in the refrigerator for up to two days in a covered jug, but is best the same day. The paste (before adding to the milk) can be frozen in cubes for a month.',
      troubleshooting: [
        {
          problem: 'The thandai is gritty.',
          fix: 'The paste was not ground fine, or the strainer was too coarse. Re-grind the leftover pulp with a little milk and strain through a double layer of muslin.',
        },
        {
          problem: 'The milk curdled.',
          fix: 'The paste was added to hot milk. Always cool the milk fully, and add the paste slowly.',
        },
        {
          problem: 'It tastes raw or green.',
          fix: 'The fennel and cardamom did not have time to infuse. Rest the mixed thandai for 15 minutes and chill for a couple of hours before serving.',
        },
        {
          problem: 'It is too thick.',
          fix: 'Add cold milk a few tablespoons at a time until pourable, and adjust the sugar.',
        },
      ],
      variations: [
        'Add 2 tbsp of pistachios and 2 tbsp of cashews to the paste for a richer drink.',
        'For a vrat-friendly (Shivaratri) version, omit peppercorns only if your fast excludes them; everything else is acceptable.',
        'Jain households can use the same recipe; there are no roots or onions, though some avoid honey.',
        'Vegan: use almond or oat milk and increase the nut paste by a quarter.',
        'Reduce the sugar by half and sweeten with dates for a lighter version.',
      ],
      tips: [
        'Peel the almonds; unpeeled almonds speckle the milk brown.',
        'Always cool the milk before adding the paste, or it will curdle.',
        'Add rose water at the end only — boiling destroys the fragrance.',
      ],
      differs: 'Almonds, melon seeds, fennel and pepper; strained and chilled; rose-scented.',
    },
    {
      id: 'rajasthan',
      region: 'Rajasthan (Jaipur, Nathdwara, Udaipur)',
      culture: 'Pushtimarg Vaishnava and Marwari households',
      title: 'Rajasthani Kesar Thandai',
      intro:
        'A richer, saffron-coloured thandai with pistachios, cashews and more seeds, thickened by long-simmered milk. It is a staple of Holi at Nathdwara and a gift among families.',
      story:
        'In Rajasthan, thandai is part of the Holi festival from the Phalgun Purnima bonfire onwards, and the Pushtimarg temple at Nathdwara offers it to Shrinathji as part of the Holi seva. Households in Jaipur and Udaipur serve it in brass or silver tumblers to guests who come to play with colours, and often a pot is kept out for the whole day.\n\nThe Rajasthani version leans on dry fruit: pistachios, cashews and almonds are ground together with melon seeds and cardamom, and the milk is reduced further than in Uttar Pradesh. The saffron is used generously, which gives the drink its famous marigold-gold colour.\n\nBecause the climate is dry and the Holi sun is hot, the drink is deliberately heavy and nourishing; it is almost a meal. It is also made in large batches and the paste is sometimes stored for a week to flavour milk as needed, which makes it a convenient festival drink for a house full of guests.',
      serves: '6–8 glasses',
      prep: '25 min + 4 hr soaking',
      cook: '25 min',
      equipment: [
        'A heavy kadai or wide pot — the large surface speeds up the reduction of the milk.',
        'A powerful blender or stone grinder — pistachios and cashews need to be ground to a very fine paste.',
        'A fine muslin cloth and a large sieve — to strain the milk to a satin finish.',
        'A brass or silver tumbler for serving — traditional for festival hospitality in Rajasthan.',
      ],
      ingredients: [
        {
          group: 'For the nut paste',
          items: [
            '15 almonds — soaked for four hours and peeled for a pure colour',
            '15 pistachios — soaked and peeled; they add a pale green hue and a rich flavour',
            '10 cashews — soaked for two hours; they make the drink creamy',
            '2 tbsp melon seeds (magaz) — soaked with the almonds',
            '1 tbsp poppy seeds — soaked with the nuts for smoothness',
            '1 tbsp fennel seeds — lightly toasted for one minute for deeper aroma',
            '8 black peppercorns — whole; the bite is gentle in the finished drink',
            '8 green cardamom pods — seeds only',
          ],
        },
        {
          group: 'For the milk',
          items: [
            '1.2 litres full-fat milk — buffalo milk is traditional in Rajasthan for body',
            '3/4 cup (150 g) sugar — adjust to your taste; Rajasthani thandai is sweet',
            '15 saffron strands soaked in 3 tbsp warm milk — generous; this is the defining colour of the drink',
            '1 tsp rose water — added at the end',
            '1 tbsp chopped pistachios and almonds — for garnish',
          ],
        },
      ],
      mise: [
        'Soak almonds, pistachios, cashews, melon seeds and poppy seeds in warm water for at least four hours.',
        'Peel the almonds and pistachios, discarding the skins.',
        'Soak the saffron strands in warm milk for 15 minutes, crushing them lightly with a spoon.',
        'Toast the fennel seeds and peppercorns in a dry pan for a minute until fragrant, then cool.',
      ],
      method: [
        {
          title: 'Drain and prepare the nuts',
          text:
            'Drain the soaked nuts and seeds, rinse them, and peel the almonds and pistachios. Place them in a blender along with the toasted fennel, peppercorns and cardamom seeds, ready for grinding.',
          why: 'Peeling keeps the colour bright, and toasting the spices adds a deeper aroma that sits well against the rich nuts.',
          cue: 'The nuts are pale cream and green, and the toasted spices smell warm and sweet.',
        },
        {
          title: 'Grind to a silky paste',
          text:
            'Add half a cup of cold milk and blend in short bursts, scraping down the sides often, for about four minutes. Add a tablespoon more milk if the blender struggles, until the paste is completely smooth and thick.',
          why: 'A very fine paste is the secret of a creamy drink; any coarse particles will stay on the muslin and rob you of flavour.',
          cue: 'The paste looks like thick pale-green cream, and when rubbed between fingers has no grit.',
        },
        {
          title: 'Reduce the milk',
          text:
            'Pour the remaining milk into the kadai and bring to a boil. Simmer on low heat for 20 minutes, stirring often and scraping down the cream that forms on the sides, until reduced to about four cups.',
          why: 'Reduction concentrates milk solids and gives the signature Rajasthani richness; scraping back the cream adds body.',
          cue: 'The milk has turned slightly golden, coats the back of a spoon, and has reduced by roughly a third.',
        },
        {
          title: 'Sweeten and cool',
          text:
            'Add the sugar and stir until dissolved, then pour in the saffron milk. Switch off the heat and let the milk cool completely to room temperature, stirring now and then so that no skin forms.',
          why: 'The saffron colours the milk while hot, and cooling before adding the paste prevents curdling.',
          cue: 'The milk is a warm marigold-gold, and you can comfortably touch the pan sides.',
        },
        {
          title: 'Whisk in the nut paste',
          text:
            'Add the nut paste a few spoonfuls at a time, whisking constantly so it dissolves without lumps. Leave the mixture to stand for 20 minutes so the spices infuse into the milk.',
          why: 'Gradual mixing ensures a smooth emulsion, and standing time lets fennel and cardamom deepen.',
          cue: 'The milk turns a thick, uniform golden-green and the smell of cardamom and fennel rises clearly.',
        },
        {
          title: 'Strain and flavour',
          text:
            'Strain the mixture through the wet muslin in batches, pressing hard to extract all the liquid. Add the rose water, taste and adjust the sugar. The finished thandai should coat a spoon thinly.',
          why: 'Double straining gives the satin finish that distinguishes festival thandai from home versions.',
          cue: 'The liquid is perfectly smooth, golden and fragrant, and the muslin holds only dry pulp.',
        },
        {
          title: 'Chill thoroughly',
          text:
            'Pour the thandai into a jug, cover, and refrigerate for at least three hours until very cold. Stir well before serving to bring up any settled nut solids, and taste once more for sweetness.',
          why: 'The drink tastes best very cold, and chilling blends the flavours so that no single spice dominates.',
          cue: 'The jug is cold to touch, and the drink pours slowly like thin cream.',
        },
        {
          title: 'Garnish and serve',
          text:
            'Pour into brass or silver tumblers, top each with chopped pistachios and a few saffron strands, and serve at once while still cold. Offer a second round to anyone who asks, since generosity is part of the festival.',
          why: 'Garnish adds crunch and visual richness; serving at once keeps the drink cold and the nuts crisp.',
          cue: 'The tumblers frost lightly on the outside and the saffron colour glows against the pistachio garnish.',
        },
      ],
      offering:
        'Offered cold to Shrinathji at Nathdwara during Holi, and at home to Krishna or Radha after the Holika puja.',
      ritual: [
        'On the morning of Holi, pour a measure of thandai into a silver cup and place it before Krishna’s idol on a decorated plate.',
        'Sprinkle a few saffron strands and rose petals on top and offer with “Nivedayami”.',
        'Perform the aarti with ghee lamp and conch, then ring a bell.',
        'Take the first sip as prasad, then pass it to family elders and children, followed by guests.',
        'Keep a covered pot by the door for visitors who arrive to play Holi through the day.',
      ],
      serving:
        'Serve very cold in brass or silver tumblers, 120–150 ml each, garnished with chopped pistachios. In Jaipur it is often served alongside gujiya and malpua at the Holi gathering.',
      storage:
        'Keeps for up to three days refrigerated in a sealed jug. The unstrained paste keeps a week in the refrigerator and can be mixed with fresh milk as needed.',
      troubleshooting: [
        {
          problem: 'The drink separates into layers.',
          fix: 'This is natural as nuts settle. Stir or shake well before serving; strain again if there is any sludge.',
        },
        {
          problem: 'The colour is pale instead of golden.',
          fix: 'Too little saffron or it was not soaked long enough. Crush the strands in warm milk for 15 minutes and use at least 15 strands.',
        },
        {
          problem: 'It is gritty.',
          fix: 'The paste needs finer grinding. Re-blend the pulp with warm milk and strain again through double muslin.',
        },
      ],
      variations: [
        'Add a pinch of nutmeg and two tablespoons of dried rose petals for a Mughlai flavour.',
        'For a vrat-friendly version, the drink is generally acceptable; avoid peppercorns if your fast forbids them.',
        'Jain version: omit nothing; the recipe has no onion, garlic or roots.',
        'Vegan: use almond milk reduced by a third and increase cashews.',
        'Use jaggery syrup instead of sugar for a rustic Marwari flavour.',
      ],
      tips: [
        'Use buffalo milk if available for a thicker drink.',
        'Soak the saffron in warm milk for at least 15 minutes.',
        'Always cool the milk before adding the paste.',
      ],
      differs: 'More dry fruit and saffron; milk is reduced; served in brass or silver.',
    },
  ],
}

export default recipe
