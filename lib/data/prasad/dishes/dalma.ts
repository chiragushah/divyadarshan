import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'dalma',
  name: 'Dalma',
  alsoCalled: 'Dal Ma · Odia Dalma · ଡାଲମା',
  category: 'Savoury',
  summary: 'Odisha’s temple dal cooked with raw banana, pumpkin and other vegetables, finished with roasted cumin and coconut.',
  meaning:
    'Dalma is the daily dal of Odisha and one of the central dishes of the Jagannath temple’s Mahaprasad. Toor dal is cooked with chunks of vegetables until both are soft together, then finished with a ghee tempering of cumin, dry red chilli and bay leaf, and with a spoonful of roasted cumin-chilli powder. It is mild, golden, lightly sweet from pumpkin and raw banana, and made entirely without onion, garlic, potato, tomato or cauliflower, following the temple rule that excludes vegetables thought to be foreign to the soil of Odisha.',
  variants: [
    {
      id: 'odisha',
      region: 'Odisha',
      culture: 'Jagannath temple Mahaprasad and Odia households — Rath Yatra, Ekadashi-free festival days',
      title: 'Dalma',
      intro:
        'Split toor dal pressure-cooked with raw banana, pumpkin, yam, brinjal and raw papaya, then tempered in ghee with cumin, bay leaf and dry chilli, finished with grated coconut and a pinch of roasted spice powder. It is thick, golden, fragrant and gentle, with no onion or garlic.',
      story:
        'In Puri, dalma is cooked in earthen pots on wood fires in the vast kitchen of the Jagannath temple, and offered with plain rice, khechudi and other items as part of the Abadha. It is later sold as Mahaprasad at the Ananda Bazaar and eaten by pilgrims of every community, sitting together. For Odia families, no festival meal is complete without it, and it is the standard accompaniment to rice at weddings, Rath Yatra and Nuakhai.\n\nThe temple tradition shapes the dish. It excludes onion and garlic, and also leaves out vegetables that arrived in India relatively recently — potato, tomato, cauliflower, cabbage, carrot — while favouring local vegetables such as raw banana (kancha kadali), pumpkin (kakharu), elephant-foot yam (ole), brinjal (baigana), raw papaya and drumstick. The cooked vegetables are not discarded but give the dal its sweetness and body. A tempering of cumin, dry red chilli, bay leaf and a pinch of hing in ghee is poured over at the end, and the dal is finished with the distinctive "dalma masala" — roasted cumin and dry red chilli ground to a coarse powder.\n\nCompared with Bengali labra, dalma is lentil-based, and compared with the Tamil sambar it has no tamarind or sambar powder. It is gentler than any of its southern relatives, which is exactly what the temple and the home want of an everyday offering.',
      serves: '5–6 servings',
      prep: '25 min',
      cook: '35 min',
      equipment: [
        'Pressure cooker (3 litre) — the quickest way to get dal and vegetables to the right soft state; a heavy pot also works with longer cooking',
        'Small tadka pan — for the ghee tempering at the end',
        'Dry pan and mortar — for roasting and crushing the cumin and chilli for the finishing powder',
        'Wooden ladle or whisk — to lightly mash the dal into a creamy consistency',
      ],
      ingredients: [
        {
          group: 'Dal and vegetables',
          items: [
            '3/4 cup (150 g) toor dal (arhar), washed — the standard Odia dal; its flavour is mild and it breaks down creamily',
            '1/4 cup (50 g) moong dal, washed — optional but traditional in many houses; it makes the dal softer and sweeter',
            '1 small raw banana, peeled, in 3 cm cubes — gives body and a starchy, mild sweetness; drop into water so it does not blacken',
            '150 g pumpkin, peeled, in 3 cm cubes — sweetness and colour',
            '100 g elephant-foot yam (ole) or sweet potato, in cubes — traditional; if yam is used, rinse well to avoid itching',
            '1 small brinjal, in 3 cm cubes — silkiness; add after pressure cooking or in the second half of cooking',
            '100 g raw papaya, in cubes — a typical Odia addition that softens beautifully',
            '1 tbsp fresh grated ginger — warmth in place of garlic',
            '1/2 tsp turmeric — for colour',
            '1 tsp salt, or to taste — added at the start',
            '3½ cups (800 ml) water — enough to cook the dal and vegetables, then adjusted to a medium-thick consistency',
          ],
        },
        {
          group: 'Tempering (chhunka) and finish',
          items: [
            '2 tbsp ghee — pure cow ghee; the character of the dish',
            '1 tsp cumin seeds — the main tempering spice',
            '2 dry red chillies, broken — for gentle heat and fragrance',
            '1 bay leaf — Indian bay leaf, tejpata',
            'A pinch of hing — optional; omit if your family leaves it out of temple food',
            '1/4 cup fresh grated coconut — added at the end for sweetness and texture, in many but not all families',
            '1 tsp dalma masala (roasted cumin and red chilli powder) — made by dry roasting 1 tsp cumin and 1 dry red chilli and grinding coarsely',
            '1 tsp sugar — a pinch to balance; use a little jaggery for a deeper note',
          ],
        },
      ],
      mise: [
        'Wash the toor dal and moong dal together in two or three changes of water until the water is clear, and soak for 20 minutes if you have time.',
        'Peel and cut all the vegetables into similar 3 cm cubes. Put the raw banana, yam and papaya into water straight after cutting to stop them discolouring.',
        'Prepare the dalma masala: dry roast 1 teaspoon of cumin and 1 dry red chilli in a small pan for 30–40 seconds until fragrant, cool, and crush coarsely.',
        'Grate the ginger and coconut, and keep the ghee, cumin, chillies and bay leaf together, ready for the tempering.',
        'Check that no onion, garlic, potato or tomato is used, particularly if the dalma is for an offering.',
      ],
      method: [
        {
          title: 'Pressure cook the dal',
          text: 'Place the washed toor and moong dal in the pressure cooker with the turmeric, grated ginger, salt and 3½ cups of water. Close the lid and cook on high for 2 whistles, then reduce the heat for 5 minutes and switch off. Let the pressure release naturally.',
          why: 'Dalma needs a dal that is completely soft before the vegetables go in, since hard dal will not soften once the vegetables start drawing in salt. Letting the pressure go naturally keeps the dal intact and creamy.',
          cue: 'On opening, the dal falls apart when pressed with a spoon, and a thick, creamy liquid has formed.',
        },
        {
          title: 'Add the hard vegetables',
          text: 'Open the cooker and add the raw banana, pumpkin, yam and raw papaya to the cooked dal along with a half cup of hot water. Do not close the lid fully; simmer on medium-low heat for 10–12 minutes, stirring occasionally.',
          why: 'The firm vegetables take longer than the dal, but if cooked together from the start they would turn to mush. Simmering them in the already-soft dal lets them cook gently and absorb its flavour.',
          cue: 'A fork slides easily into the banana and pumpkin, while the pieces still hold their shape.',
        },
        {
          title: 'Add the brinjal',
          text: 'Add the brinjal cubes to the pot and simmer on medium-low heat for 5–6 minutes more, until they are soft and translucent but not collapsing. Stir very gently, only once or twice, to avoid breaking up the vegetables that are already tender.',
          why: 'Brinjal cooks fastest of all and turns to pulp if cooked longer, so it goes in last to retain a soft but identifiable shape.',
          cue: 'The brinjal looks silky and slightly translucent and gives under the back of a spoon.',
        },
        {
          title: 'Lightly mash for body',
          text: 'Use a wooden ladle or whisk to mash the dal lightly against the side of the pot, so that the dal and vegetable starch blend into a thicker, creamy base. Leave the vegetables mostly whole. Add hot water, a few spoons at a time, if the dalma is too thick.',
          why: 'A light mash gives dalma its characteristic smooth-yet-chunky texture. Over-mashing leaves a plain dal; no mashing leaves a thin soup with vegetables in it.',
          cue: 'The dalma has the consistency of thick cream, and a spoon dragged through it leaves a slow trail.',
        },
        {
          title: 'Season with sugar and coconut',
          text: 'Stir in the sugar (or a small piece of jaggery) and the grated coconut. Taste carefully, and adjust the salt as needed. Simmer on low heat for 2 minutes so that the coconut softens and releases its sweetness into the dal.',
          why: 'A little sweetness is typical of Odia food and softens the earthiness of the dal. The coconut adds richness and a mild fragrance that ghee alone cannot provide.',
          cue: 'The dalma tastes mildly sweet and balanced, with no raw coconut smell.',
        },
        {
          title: 'Prepare the chhunka',
          text: 'Heat the ghee in a small pan over medium heat. Add the cumin seeds, bay leaf and broken dry red chillies and fry for 20–30 seconds. Add the hing, if using, and turn off the heat immediately.',
          why: 'The tempering is poured over at the end because ghee and cumin lose their aroma if cooked for long with the dal. Hing burns in seconds, so it goes in last.',
          cue: 'The cumin seeds turn golden-brown and crackle, and the ghee smells warm and nutty.',
        },
        {
          title: 'Pour over and finish',
          text: 'Pour the hot chhunka over the dalma; it should sizzle. Stir once gently, sprinkle over the dalma masala, cover, and rest for 5 minutes before serving. Taste again and adjust.',
          why: 'The sizzle transfers the flavour of the toasted spices into the dal. Resting allows the aroma to spread through the whole pot, and the dalma to thicken slightly.',
          cue: 'A burst of cumin and ghee aroma as the tempering hits, and a glossy golden surface flecked with spices.',
        },
      ],
      offering:
        'Offered with plain rice and khechudi in the Jagannath temple’s Abadha and Mahaprasad; made at home for Rath Yatra, Nuakhai, Kartika and every festival meal.',
      ritual: [
        'Cook the dalma in a clean kitchen after bathing, using utensils reserved for the offering, and leave out onion, garlic, potato and tomato. Do not taste it while cooking.',
        'Pour the hot dalma into a clean earthen or brass bowl and add a spoon of ghee on the surface and a pinch of dalma masala.',
        'Arrange the bowl on the bhog thali beside plain rice, khechudi, a fried vegetable (bhaja) and a sweet, each in its own vessel, with a tulsi leaf on the rice.',
        'Place the thali before the deity, sprinkle water around it, and say the naivedyam prayer while a lamp and incense are shown. In Puri the food is offered to Jagannath, Balabhadra and Subhadra in turn.',
        'After a few minutes, receive the food as Mahaprasad and share it with everyone present, seated together, regardless of community.',
      ],
      serving:
        'Serve warm with plain steamed rice and a spoon of ghee, alongside a simple fry such as badi chura or kadali bhaja (fried raw banana). It also goes with khechudi, and a piece of lemon or a sour saga (greens) is a pleasing counterpoint. At the temple it is eaten with rice and other mahaprasad dishes.',
      storage:
        'Best on the day it is made. Refrigerate for up to 2 days; the dalma will thicken, so reheat with a splash of water on low heat and add a fresh drizzle of ghee. Offer only freshly cooked dalma to the deity.',
      troubleshooting: [
        {
          problem: 'The dal is still hard after cooking',
          fix: 'Older dal needs longer. Soak for 30 minutes next time, and give it one more whistle. Salt added at the start can also slow softening, so reduce it if your dal is old.',
        },
        {
          problem: 'The vegetables dissolved into the dal',
          fix: 'They were cut too small or added too early. Cut them in 3 cm pieces and add them to the already cooked dal, not at the start.',
        },
        {
          problem: 'The dalma is too thin',
          fix: 'Simmer uncovered for 5–8 minutes and mash a few pieces of pumpkin and banana into the dal to thicken it.',
        },
        {
          problem: 'It tastes flat',
          fix: 'Check for salt and add a small pinch of sugar. The chhunka should be fragrant and the dalma masala freshly ground. A few drops of lemon on the plate lift the dish.',
        },
        {
          problem: 'The yam made my mouth itch',
          fix: 'Yam must be rinsed well and cooked until completely soft. A teaspoon of tamarind or lemon juice added to the cooking water helps; if in doubt, use sweet potato or extra pumpkin.',
        },
      ],
      variations: [
        'Some households add a handful of soaked and crushed chana dal for a firmer, nuttier dalma.',
        'In a strict temple style, omit hing, coconut and sugar and rely on ghee, cumin and ginger alone.',
        'Add drumstick pieces, elephant-foot yam or green papaya in season for a heartier dalma.',
        'A spoon of freshly ground panch phutana (Odia five-spice mix) can replace the plain cumin tempering.',
        'For a fasting day, dalma is generally not eaten as it contains lentils; use vegetables cooked in ghee with rock salt instead.',
      ],
      tips: [
        'Cook the dal fully before adding vegetables; this is the secret to a creamy dalma.',
        'Cut vegetables large and add the quick-cooking ones last.',
        'Make the dalma masala fresh; it brings the whole dish to life.',
        'Leave out onion, garlic, potato, tomato and cauliflower if the dalma is for an offering.',
      ],
      differs: 'Lentils with Odia vegetables; no onion, garlic, tomato or tamarind; ghee tempering and roasted cumin powder.',
      seeAlso: [
        { dish: 'khichdi-bhog', variant: 'odisha-khechudi', label: 'Khechudi — the dish dalma is served with' },
      ],
    },
  ],
}

export default recipe
