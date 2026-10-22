import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'narali-bhat',
  name: 'Narali Bhat',
  alsoCalled: 'Sweet coconut rice · Nariyal Purnima · नारळी भात',
  category: 'Rice & Grain',
  summary: 'Fragrant coconut-jaggery rice offered to Varuna on Narali Purnima.',
  meaning:
    'On Narali (Nariyal) Purnima, the full-moon day of the month of Shravan, the fishing and coastal communities of Maharashtra and the Konkan offer a coconut to the sea and cook narali bhat as the day’s sweet. The monsoon has been rough and the sea closed to boats; this day marks the reopening of the fishing season, and the coconut is a thanksgiving and a request for a safe return from every voyage. The festival falls in the same week as Raksha Bandhan, so narali bhat often sits on the same table as the sisters’ sweets. The dish itself is simple in idea — rice, coconut, jaggery and a few whole spices — but its quality depends entirely on how the rice is handled, which is why the recipe below is detailed.',
  variants: [
    {
      id: 'maharashtra-konkan',
      region: 'Maharashtra & Konkan',
      culture: 'Koli, Konkani and Marathi households',
      title: 'Narali Bhat',
      intro:
        'Basmati or ambemohar rice cooked with ghee and cloves, then folded with a coconut-jaggery syrup and steamed on a low flame (dum) so that every grain is perfumed. The grains stay separate and slightly golden, never mushy.',
      story:
        'Narali Purnima is the coastal festival of Maharashtra. For the Koli fishing community, the sea is a deity and a livelihood; after the monsoon ban on fishing, the first day the boats are cleaned, painted and garlanded, a fresh coconut is carried in procession and thrown into the water at sunset as an offering to Varuna, the lord of the waters. The coconut is chosen because it is the one fruit that is complete in itself — with water, flesh and a protective shell — and because the three “eyes” are likened to the three eyes of Shiva.\n\nIn the kitchen, the same coconut becomes the heart of narali bhat. The recipe belongs to the Konkan, where coconut and jaggery are everyday ingredients, and the aroma of cloves and ghee on the rice is the smell of the day itself. Konkani and Marathi homes serve it as the sweet of the festive thali, beside puran poli on some tables and with a spoon of ghee on top.\n\nThe Maharashtrian version differs from sweet pulao or zarda in two ways: the rice is partly cooked on its own first and only then married to the syrup, and the sweetness comes from jaggery and fresh coconut, never from food colour or heavy dry fruit. The result is quieter, more fragrant and more rustic than the North Indian sweet rice that it resembles.',
      serves: '5–6 servings',
      prep: '20 min',
      cook: '35 min',
      equipment: [
        'Heavy-bottomed pot with a tight lid — a thin pot scorches the sugar at the bottom during the final dum',
        'Wide pan or kadai — to cook the coconut and jaggery without crowding, so the syrup thickens evenly',
        'Fine strainer or muslin — to remove grit from the jaggery, which is common in unrefined blocks',
        'Flat griddle (tava) — placed under the pot during dum to spread heat gently and prevent burning',
      ],
      ingredients: [
        {
          group: 'Rice',
          items: [
            '1 cup (200 g) basmati or ambemohar rice — ambemohar is the traditional short-grain, mango-scented rice of Maharashtra; basmati is an easy and elegant substitute',
            '1.5 cups (360 ml) hot water — hot water keeps the grains from seizing and cooks them evenly; the ratio is lower than plain rice because the syrup adds moisture later',
            '1 tbsp ghee — coats each grain so the rice stays separate and gives a toasted, nutty base note',
            '3 cloves — whole, to perfume the rice; they are traditionally left in and politely moved aside while eating',
            '1 inch cinnamon stick — adds gentle warmth; skip it if you want a purely coconut-forward taste',
            'A pinch of salt — sharpens the sweetness and prevents the dish from tasting flat',
          ],
        },
        {
          group: 'Coconut-jaggery syrup',
          items: [
            '1 cup (about 90 g) freshly grated coconut — fresh is essential; desiccated coconut is dry and does not release milk into the syrup',
            '3/4 cup (150 g) grated jaggery — use light-coloured, clean jaggery; dark jaggery makes the dish heavy and can colour the rice brown',
            '2 tbsp water — only to start the jaggery melting; too much water makes the syrup thin and the rice soggy',
            '1/2 tsp cardamom powder — freshly ground from green pods if you can, for a floral top note',
            '10–12 saffron strands (optional) — soak in 1 tbsp warm milk for 10 minutes to release colour and fragrance',
          ],
        },
        {
          group: 'Finishing',
          items: [
            '1 tbsp ghee — for frying the nuts and for the final drizzle',
            '2 tbsp cashew halves — fried in ghee until pale gold; they give a crisp contrast to the soft rice',
            '1 tbsp raisins — fried until they puff; skip if you dislike them in rice',
          ],
        },
      ],
      mise: [
        'Wash the rice in 3–4 changes of water until it runs nearly clear, then soak for 20 minutes and drain well in a sieve for 10 minutes; wet rice cooks mushy.',
        'Grate the coconut and keep it in a bowl; if you are using a broken coconut, avoid the brown skin so the syrup stays pale.',
        'Chop the jaggery into small pieces or grate it so that it melts evenly, and pick out any visible grit.',
        'Measure the hot water and keep it just below boiling in a kettle; you will add it to the pot in one go.',
        'Soak the saffron in warm milk, and keep the fried-nut ingredients measured beside the stove.',
      ],
      method: [
        {
          title: 'Toast the whole spices in ghee',
          text:
            'Heat 1 tablespoon of ghee in the heavy pot on low-medium heat for about 30 seconds. Add the cloves and cinnamon stick and let them sizzle for 20–30 seconds. Do not let them brown or they turn bitter.',
          why: 'Whole spices release their fat-soluble aroma into ghee, and that flavoured ghee then coats the rice. Adding them to water instead gives a thin, one-note flavour.',
          cue: 'The cloves swell slightly and a warm, sweet fragrance rises from the pot.',
        },
        {
          title: 'Fry the drained rice',
          text:
            'Tip the well-drained rice into the pot and stir gently with a flat spoon for 2 minutes on low-medium heat. Handle the grains softly so they do not break. Keep the heat moderate so the rice dries slightly but does not colour.',
          why: 'Frying seals the surface of each grain so it keeps its shape later when mixed with sticky syrup. Skipping this step is the most common reason for clumpy narali bhat.',
          cue: 'The grains turn from translucent to opaque white and make a faint dry rustling sound against the spoon.',
        },
        {
          title: 'Add hot water and cook the rice until 80 percent done',
          text:
            'Pour in the 1.5 cups of hot water and add the pinch of salt. Bring to a boil on medium heat, then reduce to the lowest flame, cover and cook for about 10 minutes. Do not stir while it cooks, because stirring releases starch and makes the grains sticky.',
          why: 'The rice must not be fully cooked now: it will finish cooking in the sweet mixture. If it is already soft, the syrup will turn it into porridge.',
          cue: 'The water is absorbed, small steam holes appear on top, and a grain pressed between two fingers is soft outside with a firm white dot in the centre.',
        },
        {
          title: 'Spread the rice to rest',
          text:
            'Uncover and gently fluff the rice with a fork, lifting from the bottom, then spread it in a wide plate or leave it in the pot uncovered for 5 minutes while you prepare the syrup. Do not press it down.',
          why: 'Steam trapped in a heap keeps cooking the rice and softens it further. Spreading releases it so the grains stay separate.',
          cue: 'The surface looks dry and the grains no longer cling to each other when you lift them.',
        },
        {
          title: 'Melt the jaggery and cook the coconut',
          text:
            'In the wide pan, combine the jaggery and 2 tablespoons of water over low heat. Stir until the jaggery melts completely, about 3 minutes, then strain if you see grit. Return to the pan, add the grated coconut and cook for 3–4 minutes, stirring often, until the mixture is thick and sticky.',
          why: 'Cooking the coconut in the syrup softens it and lets it absorb sweetness, so it clings to the rice rather than falling off as raw shreds.',
          cue: 'The mixture bubbles gently, smells like caramel and toasted coconut, and drags slowly off the spoon rather than pouring.',
        },
        {
          title: 'Fold the syrup into the rice',
          text:
            'Add the cardamom and saffron milk to the coconut mixture. Pour it over the partly cooked rice and fold very gently with a flat spoon, turning from the bottom, for about 1 minute until the colour is even. Avoid stirring in circles, which breaks the grains.',
          why: 'Folding keeps the rice grains whole; vigorous stirring mashes them against the sticky coconut.',
          cue: 'The rice looks glossy and golden with no pockets of dry white or wet syrup.',
        },
        {
          title: 'Finish by dum on very low heat',
          text:
            'Place a flat tava under the pot, cover tightly (a layer of foil under the lid helps), and cook on the lowest flame for 8–10 minutes. Switch off and leave covered for 5 minutes. The grains will absorb the syrup and finish cooking in the steam.',
          why: 'Dum cooking uses gentle trapped steam to finish the rice evenly. Direct heat at this stage burns the jaggery on the bottom.',
          cue: 'When you open the lid, a rich aroma rises, the grains are tender but separate, and no wet syrup remains at the bottom.',
        },
        {
          title: 'Fry the nuts and finish',
          text:
            'In a small pan, heat 1 tablespoon of ghee, fry the cashews until pale gold (about 1 minute), then the raisins until they puff (10–15 seconds). Scatter both with the hot ghee over the rice and fluff once with a fork.',
          why: 'Adding fried nuts at the end keeps them crisp; if folded in earlier they absorb steam and turn soft.',
          cue: 'The cashews are golden, never brown, and the raisins are plump and glossy.',
        },
      ],
      offering:
        'The first coconut is offered to the sea or river (Varuna) at sunset; narali bhat is the prasad and the day’s feast.',
      ritual: [
        'On the morning of Narali Purnima, bathe, wear clean clothes and clean the place of worship. Place a fresh, whole coconut with its tuft (shrifal) on a plate with a little kumkum, turmeric, rice and a flower.',
        'Cook the narali bhat after the bath, in a clean kitchen, using fresh ingredients. Do not taste it before offering.',
        'In the evening, take the coconut, a small bowl of the narali bhat, flowers, incense and a lamp to the seashore, river or lake. Light the lamp and incense and offer a short prayer to Varuna for the safety of all who travel on water.',
        'Offer the coconut to the water with both hands, facing the water, and place a pinch of the bhat on a leaf at the water’s edge if the local custom allows.',
        'Return home and offer a bowl of narali bhat to the household deities before serving. Distribute a spoonful of the bhat to every member of the family and to neighbours, beginning with the eldest.',
      ],
      serving:
        'Serve warm in small bowls or on banana leaves with a spoon of ghee on top. It is eaten as a sweet course, either on its own or beside puran poli or varan bhaat. A small piece of the same coconut, fresh and cut into slivers, is a traditional garnish.',
      storage:
        'It tastes best the same day. Cover and refrigerate leftovers for up to 2 days; reheat with a splash of milk or a teaspoon of ghee in a covered pan on low heat for 4–5 minutes. Do not freeze, as the coconut becomes watery.',
      troubleshooting: [
        {
          problem: 'The rice is mushy and clumped together.',
          fix: 'The rice was cooked too long before adding syrup, or it was stirred too hard. Next time stop at 80 percent doneness, spread it to release steam, and fold, do not stir.',
        },
        {
          problem: 'The bottom is burnt and smells bitter.',
          fix: 'The final dum heat was too high. Use a tava under the pot and the lowest flame; a heavy base is essential.',
        },
        {
          problem: 'The rice tastes sweet only in patches.',
          fix: 'The syrup was too thick or not folded evenly. Warm the syrup until pourable and mix with gentle folding movements for a full minute.',
        },
        {
          problem: 'The dish is too wet.',
          fix: 'There was too much water in the rice or the coconut was not cooked down. Cook the coconut-jaggery mixture until thick, and use the exact water ratio.',
        },
      ],
      variations: [
        'Konkan households steam the rice in a pot sealed with a ring of dough around the lid, which gives a very even finish.',
        'Some families replace jaggery with sugar for a lighter colour, using 3/4 cup of sugar and a tablespoon of milk to bring out the flavour.',
        'A sprinkle of nutmeg and a few strands of cardamom husk in the ghee deepens the aroma.',
        'For a fasting or vegan version, replace ghee with coconut oil; the dish remains fully traditional in taste.',
        'Jain families omit the cloves and cinnamon if they avoid certain spices, and use only cardamom and saffron.',
      ],
      tips: [
        'Use fresh coconut; the flavour of the dish depends on it.',
        'Do not skimp on draining the rice; excess water is the single biggest cause of mushiness.',
        'Taste the syrup before mixing: it should be pleasantly sweet, because the rice will mute it.',
        'Make it the same day as you plan to serve it; narali bhat loses its fragrance after a day.',
      ],
      differs: 'Rice finished by dum with cloves; coconut-jaggery syrup; no food colour.',
    },
  ],
}

export default recipe
