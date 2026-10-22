import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'aravana-payasam',
  name: 'Aravana Payasam',
  alsoCalled: 'Sabarimala Aravana · അരവണ',
  category: 'Sweet',
  summary: 'Sabarimala’s thick jaggery-rice payasam, sealed and carried home by pilgrims.',
  meaning:
    'Aravana is the main prasad of the Sabarimala Ayyappa temple in Kerala. It is a dense, dark, glossy sweet of rice, jaggery and ghee, cooked down until it is far thicker than an ordinary payasam, so that it keeps for weeks in sealed tins. Pilgrims who have completed the 41-day vratham (a period of strict discipline, simple food, black or blue clothing and abstinence) carry the tins home as a blessing for family and neighbours. The temple’s own method and quantities are large-scale and are not published, so the recipe below is a home version that follows the same principle: soft-cooked rice, boiled down with strained jaggery, enriched with ghee and finished with cardamom and dry ginger. It is a pilgrim’s memory in a bowl rather than a replica of the temple’s preparation, and families who make it at home do so most often during the Mandalam–Makaravilakku season, when Ayyappa devotees are observing the vratham.',
  variants: [
    {
      id: 'kerala',
      region: 'Kerala (Sabarimala)',
      culture: 'Ayyappa devotees',
      title: 'Aravana Payasam (home version)',
      intro:
        'A home version of the temple’s aravana payasam. The real preparation uses huge urulis (bronze vessels) and wood fires; this is a stove-top recipe that follows the same principle: rice cooked soft, boiled down with jaggery, and finished with ghee.',
      story:
        'Aravana is inseparable from Sabarimala. Every pilgrim who climbs the eighteen sacred steps after the 41-day vratham leaves the sannidhanam with a tin of aravana and a packet of appam, and these two are what the temple is known for after the darshan itself. The word “aravana” is used for both the prasadam and the payasam it resembles, and in Kerala it has long been the standard gift that a devotee brings back for those who could not travel.\n\nWhat distinguishes aravana from the festive payasams of Kerala, such as ada pradhaman or palpayasam, is how little liquid it keeps. Pradhaman is poured; aravana is spooned. The jaggery is cooked until it is almost a toffee, the rice breaks down into the syrup, and the ghee gives it a deep shine, so that it can be packed in tins and carried on the long journey back without refrigeration. It is eaten in small spoonfuls, not bowlfuls, as a concentrated sweet that is meant to be shared.\n\nIn homes, devotees who have taken the vratham sometimes cook aravana in their own pooja room after returning, as a way of continuing the observance. The ingredients are plain: rice, jaggery, ghee, a little coconut, cardamom and dry ginger. The skill lies in patience, because the payasam must cook slowly for nearly an hour, stirred often, until the rice dissolves and the syrup turns the colour of dark honey.',
      serves: '8 servings',
      prep: '10 min',
      cook: '60 min',
      equipment: [
        'Heavy-bottomed uruli or thick-based pot — an uruli (wide bronze vessel) holds heat evenly, and a thick base stops the jaggery from catching and tasting bitter',
        'Long-handled wooden or steel ladle — the mixture is thick and hot, so a long handle keeps your hand away from splatters',
        'Pressure cooker or heavy lidded pot — for cooking the rice to a very soft, mashable stage before it meets the jaggery',
        'Fine strainer and clean cloth — to strain the melted jaggery; unstrained jaggery leaves grit in the finished payasam',
        'Small frying pan — to fry the coconut pieces and cashews in ghee for the garnish',
      ],
      ingredients: [
        {
          group: 'Main',
          items: [
            '1/2 cup (100 g) raw rice — red matta rice gives a deeper colour and a rustic flavour; plain raw white rice also works well',
            '3 cups (720 ml) water — for cooking the rice until it is very soft',
            '400 g jaggery — dark Kerala-style jaggery (sarkara) gives the right colour; chop it so it melts quickly',
            '1 cup (240 ml) water — to melt the jaggery into a syrup',
            '1/3 cup (75 g) ghee — pure cow’s ghee; added a spoonful at a time while the payasam thickens',
            '1/2 cup (60 g) coconut pieces (thenga kothu) — thin slivers or small cubes of fresh coconut; they become golden and chewy when fried',
            '2 tbsp cashews — halved; they add crunch against the soft rice',
          ],
        },
        {
          group: 'Flavouring',
          items: [
            '1 tsp cardamom powder — freshly ground green cardamom for aroma',
            '1/2 tsp dry ginger powder (chukku) — adds warmth and helps the digestion of a rich sweet',
            '1/2 cup thick coconut milk (optional) — makes it creamier; omit if you want the keeping quality of the temple style',
          ],
        },
      ],
      mise: [
        'Wash the rice in two or three changes of water until the water runs clear, then soak it for 20 minutes so it cooks evenly.',
        'Chop the jaggery into small pieces and keep it ready; large lumps melt unevenly.',
        'Cut the coconut into thin slivers and halve the cashews, and keep them next to the stove with 2 tbsp of ghee in a small pan.',
        'Keep a clean cloth and a second pot ready for straining the jaggery syrup.',
      ],
      method: [
        {
          title: 'Cook the rice very soft',
          text: 'Drain the soaked rice and cook it with 3 cups of water in a pressure cooker for 5 whistles, or in a covered heavy pot for 30–35 minutes, until the grains are completely soft and almost falling apart. Mash lightly with the back of a ladle.',
          why: 'Jaggery hardens the outside of rice grains if they are not already soft, so the rice must be fully cooked before it meets the syrup; otherwise the payasam stays gritty.',
          cue: 'A grain pressed between two fingers squashes into a smooth paste with no hard core.',
        },
        {
          title: 'Melt and strain the jaggery',
          text: 'Put the chopped jaggery and 1 cup of water in a pot on low heat. Stir until the jaggery melts completely, about 5 minutes. Bring to a gentle boil, then pour through a fine strainer lined with a clean cloth into the uruli or heavy pot.',
          why: 'Raw jaggery contains sand, small fibres and sometimes pieces of bagasse. Straining them out gives a clean, smooth payasam.',
          cue: 'The syrup is clear dark brown, runs freely from the ladle and leaves no residue in the strainer apart from a little grit.',
        },
        {
          title: 'Boil the syrup down a little',
          text: 'Place the uruli on medium heat and bring the strained jaggery to a rolling boil. Cook for 6–8 minutes, stirring occasionally, until the syrup thickens slightly and the froth becomes finer and glossy. Reduce the heat to low before adding the rice.',
          why: 'Reducing the syrup first prevents the finished payasam from being watery, and gives the jaggery time to lose its raw smell.',
          cue: 'The bubbles get smaller and slower, and the syrup coats the back of a spoon in a thin film.',
        },
        {
          title: 'Add the rice and simmer',
          text: 'Add the cooked, mashed rice to the syrup and stir well to combine. Cook on low heat for 20–25 minutes, stirring every couple of minutes and scraping the bottom, until the rice has dissolved into the syrup and the mixture is thick and dark.',
          why: 'Long, slow simmering breaks the rice down so that it thickens the syrup naturally; constant scraping prevents scorching, which gives a bitter note.',
          cue: 'When you drag the ladle across the bottom, it leaves a clear trail that closes slowly, and the surface looks glossy.',
        },
        {
          title: 'Add the ghee gradually',
          text: 'Add the ghee one tablespoon at a time, stirring each addition fully into the mixture before adding the next. Continue cooking on low heat for 8–10 minutes as the ghee blends in and the payasam deepens in colour.',
          why: 'Adding all the ghee at once makes it float and separate. Adding it gradually lets it emulsify into the jaggery, giving the shiny, rich body that aravana is known for.',
          cue: 'The mixture turns darker and shinier, and the edges begin to pull slightly away from the sides of the pot.',
        },
        {
          title: 'Fry the coconut and cashews',
          text: 'Heat the 2 tbsp ghee in the small pan on medium-low heat. Add the coconut slivers and fry for 2–3 minutes until pale golden, then add the cashews for another minute until golden. Do not let them turn brown, since they continue to darken from residual heat.',
          why: 'Frying in ghee makes the coconut chewy and sweet, and gives crunch from the cashews. Over-frying makes them bitter in a sweet that is otherwise mild.',
          cue: 'The coconut smells toasted and turns light golden; the cashews are pale gold.',
        },
        {
          title: 'Season and finish thick',
          text: 'Stir in the cardamom, dry ginger and the fried coconut and cashews along with the ghee they were fried in. If using coconut milk, add it now and cook for 2 more minutes on low heat. Cook until the payasam is thick enough to hold its shape on a spoon, then switch off.',
          why: 'Spices added at the end keep their aroma; added earlier, they lose it in the long cooking. The final thickness is what lets aravana keep.',
          cue: 'A spoonful placed on a plate holds its dome and does not spread; the surface is dark, glossy and the ghee has been absorbed.',
        },
        {
          title: 'Cool and settle',
          text: 'Switch off the heat and let the aravana rest in the pot uncovered for 20–30 minutes. It thickens further as it cools and the flavours settle. Transfer to a clean, dry steel or glass container only when completely cool.',
          why: 'Sealing it while hot traps steam, which makes the surface wet and shortens its keeping life.',
          cue: 'The surface is no longer shiny with moisture, and a spoon stands upright for a moment in the thick mass.',
        },
      ],
      offering: 'Offered to Ayyappa and distributed in sealed tins at the Sannidhanam.',
      ritual: [
        'Cook the aravana only after bathing and in a clean kitchen, with the pooja-room lamp lit. Devotees who are observing the 41-day vratham keep the food strictly vegetarian and prepared without onion or garlic.',
        'Before tasting, place a small portion in a clean bronze or steel bowl on a banana leaf in front of the image of Ayyappa. Light a lamp, offer a flower, and say the Sharanam Ayyappa chant, as is the family’s custom.',
        'After a few minutes of prayer, the first portion is offered to the Lord by placing a little on a fresh leaf. Then it is distributed to family members, who receive it in the right palm.',
        'Pilgrims returning from Sabarimala tie the sealed tin in a cloth and carry it home, where it is opened in the pooja room and shared with neighbours and relatives who could not make the journey.',
      ],
      serving:
        'Serve a small spoonful, about two tablespoons per person, in a clean bowl or on a piece of banana leaf, as prasad. It is eaten on its own, never as a dessert course, and the first helping goes to the oldest person present. Do not warm it again before serving; it is eaten at room temperature.',
      storage:
        'Once completely cool, pack into a dry, clean steel or glass jar with an airtight lid. It keeps for 2–3 weeks at room temperature in a cool, dry place, and for up to 2 months in the refrigerator. Always use a clean, dry spoon, since moisture or spoons that have touched other food speed up spoilage.',
      troubleshooting: [
        {
          problem: 'The payasam tastes bitter or burnt.',
          fix: 'The jaggery scorched at the base. Cook on the lowest flame in a thick-bottomed pot and scrape the bottom regularly. If it is only slightly burnt, transfer the unburnt top portion to a fresh pot and discard the base.',
        },
        {
          problem: 'The rice is still hard or gritty.',
          fix: 'The rice was added to the jaggery before it was fully cooked. Jaggery prevents rice from softening, so cook the rice completely first. Next time, cook until grains squash easily.',
        },
        {
          problem: 'The ghee floats on top and looks separated.',
          fix: 'The ghee was added all at once or the mixture was too thin. Cook for a few more minutes on low heat, stirring vigorously, until the ghee blends back into the mixture.',
        },
        {
          problem: 'It is too runny after cooling.',
          fix: 'It was not cooked down enough. Return it to the pot on low heat and cook for 10 more minutes, stirring, until the spoon test shows it holds its shape.',
        },
      ],
      variations: [
        'Some households add a spoon of sesame seeds or a few banana pieces cooked into the syrup, which makes it softer and slightly fruity; this is a home variation rather than the temple style.',
        'A coconut-milk version, closer to ada pradhaman, adds 1 cup thin coconut milk to the rice before the jaggery and finishes with 1/2 cup thick milk; it is richer but does not keep as long.',
        'Replace ghee with coconut oil for a vegan version; the flavour is more coastal and the colour a little lighter.',
        'During the vratham, devotees avoid onion, garlic and meat, but some also avoid cardamom or dry ginger from shop-bought mixes; check your family’s practice and use only freshly ground spices.',
        'To make a smaller batch for a pooja, halve all quantities but keep the cooking times for rice; the jaggery stage will be shorter by about 10 minutes.',
      ],
      tips: [
        'The jaggery should reduce completely; a thicker payasam keeps longer.',
        'Cook the rice until it falls apart before it meets the jaggery.',
        'Use a pot with a thick base and cook on the lowest flame once the rice is in; this is a slow dish.',
        'Fry the coconut pieces in ghee until pale gold only — they continue to darken as they cool.',
      ],
    },
  ],
}

export default recipe
