import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'kosambari',
  name: 'Kosambari & Vadapappu',
  alsoCalled: 'Kosumalli · Soaked-moong salad · కోసంబరి',
  category: 'Savoury',
  summary: 'Raw soaked-moong salad that accompanies panakam on Rama Navami.',
  meaning:
    'Kosambari (Karnataka) and vadapappu (Andhra) are the same idea — raw, soaked split moong dal eaten as a cooling, protein-rich salad — offered with panakam at Rama Navami and Narasimha Jayanti. Both fall in the hottest weeks of the year, and the tradition is plainly practical: a drink of jaggery and ginger, a salad of soaked dal, and sometimes spiced buttermilk, together cool the body after the long morning fast and the midday heat. The two states dress it differently. Karnataka turns it into a fresh, lemony salad with cucumber, carrot and coconut and a quick tempering. Andhra keeps it austere: soaked dal, ginger, green chilli and salt, with nothing that needs a flame. Because it is uncooked, it is considered especially pure for naivedyam, and it is prepared only on the day, never ahead.',
  variants: [
    {
      id: 'karnataka-kosambari',
      region: 'Karnataka',
      culture: 'Kannada households — Rama Navami, Narasimha Jayanti',
      title: 'Kosambari',
      intro:
        'Soaked moong dal with cucumber, carrot, fresh coconut and coriander, flavoured with lemon and tempered with mustard and green chilli.',
      story:
        'Kosambari is one of the oldest festival salads of Karnataka. It appears at Rama Navami, at Narasimha Jayanti, at Sri Krishna Jayanthi in some homes, and on the tables of weddings and upanayanas, where it is served in a small mound on the banana leaf next to the payasa. In Kannada households it is almost always paired with panaka (the jaggery-ginger drink) and neer mosaru or majjige (spiced buttermilk), and the three together are the classic Rama Navami offering.\n\nThe dish is made without any frying of the dal itself. Split yellow moong dal is soaked until it turns soft enough to bite, then dressed raw. This is why the dal must be washed carefully and drained dry: there is no cooking step to correct water, salt or raw taste. The cook relies on freshness — grated cucumber and carrot, coconut scraped that morning, and a lemon squeezed at the last minute.\n\nCompared with Andhra’s vadapappu, which is austere and ginger-led, Karnataka’s kosambari is brighter and more colourful, with a short oil tempering of mustard, green chilli and curry leaves. Families in Mysuru, Udupi and Bengaluru each have small habits: some add a spoon of raw mango in season, some a few pomegranate seeds, some a pinch of asafoetida in the tempering.',
      serves: '4 servings (about 2 cups)',
      prep: '10 min + 2 hrs soaking',
      cook: '2 min',
      equipment: [
        'Steel or glass bowl, 1.5 litre — non-reactive, so the lemon juice does not taste metallic',
        'Fine-mesh sieve — lets the soaked dal drain completely; wet dal makes a watery salad',
        'Box grater (medium holes) — gives shreds of cucumber and carrot that stay crisp rather than mushy',
        'Small tempering ladle (tadka pan) — for a 30-second oil tempering',
      ],
      ingredients: [
        {
          group: 'The salad',
          items: [
            '1/2 cup (about 100 g) split yellow moong dal (hesaru bele) — the skinned, split kind; whole green moong takes much longer to soften',
            '1/2 cup (60 g) grated cucumber — squeeze lightly in your palm to remove excess water, or the salad turns soupy',
            '1/4 cup (30 g) grated carrot — adds sweetness and colour; use the thin-shred side of the grater',
            '1/4 cup (25 g) fresh grated coconut — freshly scraped tastes sweeter; frozen coconut works if fully thawed and drained',
            '2 tbsp finely chopped coriander leaves — adds freshness; wash and spin dry first',
            '1 tbsp fresh lemon juice (about half a lemon) — must be fresh; bottled juice tastes flat',
            '1/2 tsp salt, or to taste — add only at the end so the dal does not leach water',
          ],
        },
        {
          group: 'The tempering (oggarane)',
          items: [
            '1 tsp coconut or sunflower oil — coconut oil is the coastal Karnataka choice and gives a lovely aroma',
            '1/2 tsp mustard seeds — they must pop; fresh seeds pop cleanly, stale ones stay silent',
            '1 green chilli, slit or chopped — controls the heat; remove seeds for a milder salad',
            '5–6 curry leaves — tear them as they go in so they release oil',
            'A tiny pinch of asafoetida (hing), optional — aids digestion of the raw dal; skip it for a strict no-hing household',
          ],
        },
      ],
      mise: [
        'Wash the moong dal in three changes of water until the water runs clear, then soak in plenty of cool water for 2 hours (not longer, or it turns slimy).',
        'Grate the cucumber, carrot and coconut just before assembling; keep them in separate bowls so nothing turns watery.',
        'Squeeze the lemon, chop the chilli and coriander, and keep the curry leaves and mustard next to the stove for the tempering.',
        'Wash and dry your bowl and serving ladle; for a naivedyam, keep a clean steel plate or banana leaf ready for the offering.',
      ],
      method: [
        {
          title: 'Soak the dal',
          text: 'Wash the split moong dal under running water, rubbing it gently between your fingers, until the water runs clear. Cover it with at least three times its volume of cool water and leave it undisturbed for 2 hours at room temperature. In very hot weather, soak in the refrigerator so the dal does not begin to ferment.',
          why: 'Soaking replaces cooking. It softens the starch and removes the raw, beany taste; skipping or shortening it leaves hard, chalky pieces.',
          cue: 'a grain pressed between thumb and finger squashes easily but still has a faint bite, and has swollen to about one-and-a-half times its dry size.',
        },
        {
          title: 'Drain completely',
          text: 'Tip the dal into a fine sieve and let it drain for 5–10 minutes, shaking the sieve every couple of minutes. Spread it on a clean cotton cloth for another 2–3 minutes if it still looks glossy. Transfer it to a dry mixing bowl.',
          why: 'Any water left on the dal is released when salt is added, turning the salad into a watery mix and diluting the lemon and coconut.',
          cue: 'the grains look matte and separate rather than shiny and clumped, and the bottom of the sieve stops dripping.',
        },
        {
          title: 'Prepare the vegetables',
          text: 'Grate the cucumber on the medium holes and press it very gently between your palms to release about a tablespoon of water. Grate the carrot on the finer side. Keep both in separate bowls for now. Scrape the fresh coconut and chop the coriander finely.',
          why: 'Cucumber is more than 90 per cent water. Pressing it removes the excess; leaving it in means the salad becomes soupy within minutes.',
          cue: 'the grated cucumber holds together in your palm as loose, damp shreds rather than dripping pulp.',
        },
        {
          title: 'Combine the salad base',
          text: 'To the drained dal add the cucumber, carrot, coconut and coriander. Toss lightly with a spoon or your fingertips for about 30 seconds, lifting from the bottom, so that the ingredients mingle without bruising. Do not add salt or lemon yet.',
          why: 'Gentle tossing keeps the vegetables crisp; vigorous stirring breaks them down. Salt and acid come last because they draw out moisture.',
          cue: 'the colours are evenly distributed — yellow dal flecked with orange and green — with no clumps of coconut.',
        },
        {
          title: 'Make the tempering',
          text: 'Heat the oil in a small tadka pan on medium heat for about 30 seconds. Add the mustard seeds and wait until they pop and crackle, then add the slit green chilli and curry leaves, followed by a pinch of hing. Stay away from the pan for the 10–15 seconds the curry leaves take to crisp, as they spit. Switch off the heat immediately.',
          why: 'The hot oil releases the fat-soluble flavour of mustard, chilli and curry leaf; if the pan is too hot the mustard burns and turns bitter.',
          cue: 'the mustard seeds have finished popping, the curry leaves are glassy and crisp, and the kitchen smells nutty and green.',
        },
        {
          title: 'Dress the salad',
          text: 'Pour the warm tempering, with all its oil, over the salad. Add the lemon juice and sprinkle the salt. Toss gently two or three times, only until everything is coated. Taste a spoonful and adjust: it should taste lightly sour, mildly salty, with a gentle heat and a sweet finish from coconut and carrot.',
          why: 'Adding salt and lemon after the tempering means the dal absorbs the flavour but has little time to release water. Over-mixing makes the salad wet.',
          cue: 'the salad glistens lightly with oil, with no pool of liquid at the bottom of the bowl.',
        },
        {
          title: 'Rest briefly and plate',
          text: 'Cover the bowl and leave the kosambari for 5 minutes so the flavours settle. Spoon it into a small steel bowl or onto a fresh banana leaf in a neat mound, and garnish with a few coriander leaves and a little extra coconut.',
          why: 'A short rest lets the lemon soften the raw edge of the dal. A long rest, more than about an hour, lets the salt pull out water.',
          cue: 'a spoonful tastes rounded rather than sharply sour or raw, and the dal has a pleasant, tender crunch.',
        },
      ],
      offering:
        'Offered with panaka and majjige at midday on Rama Navami, at the hour of Rama’s birth, and on Narasimha Jayanti in the evening.',
      ritual: [
        'Prepare the kosambari fresh on the morning of the festival, after bathing and before eating anything yourself, in a clean kitchen. Do not taste from the serving bowl.',
        'Place a small portion in a clean steel or silver bowl (or on a banana leaf) before the picture or idol of Rama. Place the bowl of panaka and a glass of majjige beside it.',
        'Sprinkle a few drops of water around the offering as a sign of purification and show a lit lamp and incense while the family sings or chants the Rama stotra or the Ramaraksha.',
        'Offer a tulsi leaf with the naivedyam and let the offering rest before the deity for a few minutes while a short prayer is said.',
        'Distribute the kosambari in small portions to each family member, to visiting neighbours and, at community celebrations, to everyone who attends, children first. It is received in the right palm or on a leaf plate.',
      ],
      serving:
        'Serve at room temperature in small portions of two or three tablespoons on a leaf or in a small cup, alongside a glass of panaka and a glass of spiced buttermilk. At a full festive meal, a spoonful sits at the side of the banana leaf next to the payasa and the vada.',
      storage:
        'Best eaten within 2–3 hours of making. If necessary, keep the undressed dal, vegetables and coconut separately in the refrigerator for a day, and dress just before serving. Do not freeze, and do not carry the dressed salad on a long journey in hot weather.',
      troubleshooting: [
        {
          problem: 'The salad is watery',
          fix: 'The dal was not drained fully or the cucumber was not pressed. Drain the dal on a cloth, squeeze the cucumber, and add salt only at the very end.',
        },
        {
          problem: 'The dal tastes raw or chalky',
          fix: 'It was soaked too briefly or in cold water. Soak at least 2 hours; in cool weather use lukewarm water for the first 30 minutes.',
        },
        {
          problem: 'The dal tastes sour or smells fermented',
          fix: 'It was soaked too long in warm weather. Soak in the refrigerator, and never beyond 3–4 hours.',
        },
        {
          problem: 'The tempering tastes bitter',
          fix: 'The mustard or curry leaves burned. Keep the heat medium, switch off as soon as the leaves turn crisp, and make a fresh batch if blackened.',
        },
      ],
      variations: [
        'Add 1–2 tablespoons of finely chopped raw mango in the season; reduce the lemon accordingly. This is common in coastal Karnataka around Ugadi and Rama Navami.',
        'For a Jain or no-hing household, omit the asafoetida; Jain households also avoid carrot in some traditions and may use only cucumber, coconut and soaked dal.',
        'Vegan and fasting-friendly: the recipe is naturally vegan. For a strict ekadashi vrat, omit the dal and mustard and use only cucumber, coconut and lemon with rock salt.',
        'Add a spoonful of pomegranate seeds or finely chopped green mango for crunch and tang; these are household touches rather than rules.',
        'Some families replace half the moong dal with soaked chana dal for a firmer bite; soak the chana dal for 4 hours.',
      ],
      tips: [
        'Salt last. Even a minute of salt on the dal will draw water out; add it as you toss and serve.',
        'Use the split, skinned yellow moong dal (moong dal dhuli); the green skinned variety stays hard when raw.',
        'Make small batches. Kosambari is a fresh salad, not a make-ahead dish, and its charm is crunch.',
        'Serve it with panaka so the sweet-sour drink and the savoury salad balance each other.',
      ],
      differs: 'Bright and colourful: cucumber, carrot, coconut, lemon and a mustard–chilli tempering.',
    },
    {
      id: 'andhra-vadapappu',
      region: 'Andhra Pradesh & Telangana',
      culture: 'Telugu households — Sri Rama Navami',
      title: 'Vadapappu',
      intro:
        'Plain soaked moong dal with ginger, green chilli and salt, sometimes with a touch of coconut. It is stripped down, almost austere.',
      story:
        'Vadapappu, literally “vada dal”, is the humble offering of Telugu Rama Navami. It is nothing but split moong dal, soaked in water until tender, then seasoned with green chilli, a little fresh ginger and salt. In Bhadrachalam, where the Sita Rama Kalyanam is celebrated at noon on Rama Navami, vadapappu and panakam are distributed to the thousands who attend the ceremony, and the same pair is prepared in nearly every Telugu home and temple that day.\n\nThe name comes from the dal that is also used to make vadas, and the dish is almost always served with panakam, the jaggery-and-ginger drink. Together they are called the Rama Navami prasadam: the dal gives plain, cooling protein; the panakam gives sweetness, heat and ginger; each is incomplete without the other.\n\nCompared with Karnataka’s kosambari, vadapappu has no cucumber, no carrot, and no oil tempering. It is made without a flame so it can be prepared for a crowd, and it is meant to taste of dal, ginger and chilli. Some households add a spoon of grated coconut or a squeeze of lemon, but the purist version is simply dal, green chilli, ginger and salt.',
      serves: '4 servings (about 1.5 cups)',
      prep: '5 min + 2 hrs soaking',
      cook: 'None',
      equipment: [
        'Steel or copper-lined vessel, 1 litre — for soaking; avoid aluminium, which reacts with the damp dal',
        'Fine sieve or colander — drains the dal; wet dal ruins the texture',
        'Small mortar and pestle (or knife and board) — to crush ginger and chilli so the flavour spreads through the dal',
        'Clean spoon of steel or wood — metal-on-metal bruises nothing here, but a clean dedicated spoon keeps the offering pure',
      ],
      ingredients: [
        {
          group: 'The vadapappu',
          items: [
            '1/2 cup (about 100 g) split yellow moong dal (pesara pappu) — the skinned, split kind; wash it well before soaking',
            '1 tsp finely grated or minced fresh ginger — adds warmth and aids digestion; peel it first and mince very fine so there are no chewy bits',
            '1 green chilli, finely minced — adjust to taste; remove seeds for a mild offering suited to children',
            '2 tbsp fresh grated coconut, optional — gives a mild sweetness; leave it out for the strictest version',
            '1/2 tsp salt, or to taste — add last, just before serving',
            '1 tsp fresh lemon juice, optional — brightens the taste and balances the sweetness of the panakam that accompanies it',
          ],
        },
        {
          group: 'To finish',
          items: [
            'A few fresh coriander leaves, optional — only as garnish; some households leave them out of the offering',
            'A tulsi leaf — placed on top of the naivedyam as a sign of offering to Rama',
          ],
        },
      ],
      mise: [
        'Wash the dal in 3–4 changes of water and soak it in clean water for about 2 hours, no longer.',
        'Wash and dry your hands, the bowl and spoon thoroughly; vadapappu is eaten raw so cleanliness is essential.',
        'Peel and mince the ginger and green chilli on a clean board just before mixing.',
        'Keep the panakam ready beside it, because the two are offered and served together.',
      ],
      method: [
        {
          title: 'Wash the dal thoroughly',
          text: 'Place the dal in a bowl, cover with cool water, and rub it gently with your fingertips. Pour off the cloudy water and repeat 3–4 times until it runs clear. Take care to remove any husk or stone.',
          why: 'Because this dal is eaten raw, any dust or husk remains in the final dish. Careful washing is the only cleaning step.',
          cue: 'the final rinse water is nearly clear with no floating husk.',
        },
        {
          title: 'Soak for about two hours',
          text: 'Cover the washed dal with about three times its volume of fresh, cool water and leave it undisturbed at room temperature for about 2 hours. In hot weather, soak it in the refrigerator or in a cool part of the kitchen.',
          why: 'Soaking swells and softens the grain so it can be eaten without cooking. Too little soaking leaves it hard; too long makes it slimy or sour.',
          cue: 'a grain breaks easily between thumb and fingernail and has no hard white core.',
        },
        {
          title: 'Drain very well',
          text: 'Pour the dal into a fine sieve or colander and let it drain for at least 10 minutes. Shake it occasionally. For best results, spread the dal on a clean cotton cloth for 3–4 minutes to absorb the last of the water.',
          why: 'Salt draws water out of the dal; if the dal is wet to begin with, the vadapappu becomes watery and bland.',
          cue: 'the grains are separate and matte, with no drip when the sieve is tilted.',
        },
        {
          title: 'Crush the ginger and chilli',
          text: 'On a clean board, mince the ginger and green chilli very fine, then crush them lightly with the back of a spoon or in a mortar to release the juices. Peel the ginger first to remove its bitter skin.',
          why: 'Crushing releases the essential oils so the flavour is carried through the dal, rather than leaving bites of raw ginger.',
          cue: 'the paste looks moist and smells sharply of ginger and chilli.',
        },
        {
          title: 'Mix the dal with the seasoning',
          text: 'Place the drained dal in a clean bowl. Add the crushed ginger and chilli, and the coconut if using. Mix with a spoon, folding from the bottom, for about 20 seconds so every grain is lightly coated. Do not add salt yet.',
          why: 'Folding keeps the soft grains intact. Salt is added after tasting so the dal does not turn watery while it waits.',
          cue: 'the grains are specked with green and pale ginger, with a gentle fragrance and no visible clumps.',
        },
        {
          title: 'Salt and lemon at the last minute',
          text: 'Just before offering, sprinkle the salt and, if using, the lemon juice. Toss lightly just two or three times and taste. It should be lightly salty, with a little heat from the chilli, and a fresh, clean taste of dal and ginger.',
          why: 'Adding salt at the last moment preserves the firm, juicy bite of the dal and prevents seepage of water.',
          cue: 'a spoonful tastes seasoned but not wet, and holds in a loose mound without puddling.',
        },
        {
          title: 'Plate for naivedyam',
          text: 'Spoon the vadapappu into a clean steel bowl or onto a fresh leaf, making a small mound. Place a single tulsi leaf on top. Keep it covered with a clean cloth until the time of offering.',
          why: 'Covering protects the offering from dust and flies and keeps the surface from drying.',
          cue: 'the mound is neat and moist, and the tulsi leaf sits on top without wilting.',
        },
      ],
      offering:
        'Offered with panakam at noon on Rama Navami, as at the Sita Rama Kalyanam in Bhadrachalam, and shared among everyone present.',
      ritual: [
        'On the morning of Rama Navami, bathe, light the lamp at the home altar, and prepare the vadapappu and panakam fresh before breaking your fast.',
        'Place the vadapappu in a clean bowl on a banana leaf or plate in front of the picture or idol of Sri Rama, with the bowl of panakam beside it.',
        'At noon, the time of Rama’s birth, show the lamp and incense, ring the bell, and recite the Rama stotra or sing a bhajan; many families read a few verses of the Ramayana or listen to the kalyanam.',
        'Offer a tulsi leaf with a small spoon of water sprinkled around the plate, and keep the naivedyam before the deity for a few minutes of silent prayer.',
        'Distribute the vadapappu in the right palm or in leaf cups, together with a small cup of panakam, first to children and elders, then to neighbours and visitors.',
      ],
      serving:
        'Serve in a small mound of two or three tablespoons in the palm or in a leaf cup, always together with a cup of chilled panakam. At temples it is handed out in a leaf cup to long queues of devotees. Eat it the same day it is made.',
      storage:
        'Vadapappu is best made and eaten within 2–3 hours. Do not store it. If you need to prepare ahead, keep the soaked and drained dal in a covered container in the refrigerator for up to 4 hours and mix with ginger, chilli and salt just before serving.',
      troubleshooting: [
        {
          problem: 'The dal is watery in the bowl',
          fix: 'It was not drained well, or salt was added too early. Drain on a cloth and salt only at the last minute.',
        },
        {
          problem: 'The dal has a raw, beany taste',
          fix: 'The soaking was too short or the dal is old. Soak the full 2 hours and buy fresh dal; a little ginger and lemon also help.',
        },
        {
          problem: 'It smells slightly sour',
          fix: 'The dal fermented while soaking in a warm kitchen. Soak in the refrigerator and shorten the time; discard if it smells strongly sour.',
        },
        {
          problem: 'Bites of raw ginger are too sharp',
          fix: 'Mince the ginger more finely or grate it, and use a little less; the flavour should be background, not dominating.',
        },
      ],
      variations: [
        'Many households add 2 tablespoons of grated fresh coconut and a few drops of lemon juice; this is common in coastal Andhra.',
        'Some add a pinch of crushed black pepper or a little cumin; these are family habits rather than rules.',
        'For vrat or no-chilli households, omit the green chilli and use a little crushed pepper for warmth.',
        'For a Jain-friendly version, omit the ginger (a root vegetable) and use a pinch of hing and a touch of pepper.',
        'Vegan by nature. Telangana families may serve it with a spoonful of fresh buttermilk on the side.',
      ],
      tips: [
        'Keep it simple. The charm of vadapappu is its plainness; resist the urge to add more spices.',
        'Use clean, dry utensils and clean hands — the dal is not cooked, so hygiene matters most.',
        'Serve with panakam, never alone; the sweetness of the drink balances the chilli and ginger.',
        'Make only as much as you will serve, since it does not keep.',
      ],
      differs: 'Austere: soaked dal, ginger, chilli and salt only; no oil tempering, no vegetables.',
    },
  ],
}

export default recipe
