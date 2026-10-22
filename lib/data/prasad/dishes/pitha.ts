import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'pitha',
  name: 'Pitha',
  alsoCalled: 'Pithe · Pitha · Arisa · Til Pitha · পিঠে',
  category: 'Sweet',
  summary: 'Rice-flour cakes with jaggery, coconut and sesame — the sweets of Sankranti, Bihu and Nuakhai.',
  meaning:
    'In eastern India the winter and harvest festivals mean pithas: cakes, crêpes, dumplings and rolls made from the new rice, sweetened with jaggery (or the winter date-palm jaggery of Bengal), and stuffed with coconut or sesame. Bengal makes patishapta crêpes at Poush Sankranti; Assam rolls til pitha and shapes narikol laru for Bhogali Bihu; and Odisha fries arisa pitha for Nuakhai and Makar Sankranti and offers it with the first rice. The word “pitha” simply means a cake or a dough sweet, and each community has its own repertoire — what links them is the first harvest of rice, an offering of gratitude to the household deity and the sun, and the habit of making the pithas at home in a communal kitchen, with the women of the household sharing the labour. The batter, the rice and the technique differ so greatly that the three recipes below are really three different foods under one name.',
  variants: [
    {
      id: 'bengal-patishapta',
      region: 'West Bengal',
      culture: 'Bengali households — Poush Sankranti',
      title: 'Patishapta',
      intro:
        'A delicate crêpe of rice flour, semolina and flour, rolled around a filling of coconut and date-palm jaggery or kheer.',
      story:
        'Patishapta is the best-known of the Bengali pithes, the sweets of Poush Sankranti or Poush Parbon, the last day of the Bengali month of Poush in mid-January. On this day the new rice and the winter date-palm jaggery (nolen gur) come together in an afternoon of baking, frying and steaming. The family makes a dozen different pithes, but patishapta, the crêpe, is the one that guests remember.\n\nThe name is thought to come from “pati”, meaning flat or spread, and “shapta”, a thin cake. The batter is made from rice flour with a little semolina for body and maida for tenderness, thinned with milk and water to the consistency of single cream. It is poured onto a hot pan and spread thin like a dosa, and the filling is placed on the cooked crêpe and rolled before it can crisp. The most traditional filling is a mixture of grated coconut cooked with nolen gur to a soft, fudgy paste; the richer version uses a thick kheer or a cooked coconut–khoya mixture. Nolen gur, which is made only in winter from the sap of date palms, is the real flavour of the Bengali pithe and cannot be matched exactly by ordinary jaggery.\n\nThe pithes are offered to Lakshmi and the household deities on Poush Sankranti, and then eaten by all. In many homes the first pithe made is also set aside for the family’s ancestors. Patishapta is also made at Makar Sankranti in neighbouring Odisha and Assam, where it has its own names, but the Bengal version is distinct for its thin batter and its fudgy coconut filling.',
      serves: '10 patishapta',
      prep: '30 min + 30 min resting',
      cook: '25 min',
      equipment: [
        'Non-stick tava or flat griddle, about 20–22 cm — a smooth, non-stick surface lets the thin batter spread and release without tearing',
        'Heavy-bottomed pan for the filling — coconut and jaggery stick and burn easily in a thin pan',
        'Whisk and a large bowl — to get a smooth, lump-free batter',
        'Ladle with a flat base or small cup — to pour and spread an even amount of batter',
        'Flat spatula — to lift and roll the delicate crêpes',
      ],
      ingredients: [
        {
          group: 'Batter',
          items: [
            '1/2 cup (75 g) rice flour — fine and dry; this gives the crêpe its characteristic soft, slightly chewy texture',
            '1/4 cup (40 g) fine semolina (sooji) — gives body and a slightly crisp edge to the crêpe',
            '1/4 cup (30 g) maida (refined flour) — adds tenderness and helps the crêpe hold together when rolled',
            '1 cup (240 ml) whole milk — makes the crêpe rich and golden; adjust with water if needed',
            '1/2 cup (120 ml) water — to reach a pouring consistency',
            '1 tbsp sugar — helps the crêpe brown lightly',
            'A pinch of salt — balances the sweetness',
            'Ghee for the pan, about 2 tbsp — brushed thinly before each crêpe',
          ],
        },
        {
          group: 'Coconut filling',
          items: [
            '1.5 cups (130 g) freshly grated coconut — fresh coconut is essential; dry or desiccated coconut will not give a moist, fudgy filling',
            '3/4 cup (150 g) nolen gur (date-palm jaggery) — available in winter in Bengal; use regular dark jaggery as a substitute and add a pinch of cardamom',
            '1/2 tsp cardamom powder — freshly ground for fragrance',
            '1 tsp ghee — enriches the filling and prevents sticking',
            '2 tbsp reduced milk or khoya (optional) — a richer, more festive filling used in many homes',
          ],
        },
      ],
      mise: [
        'Whisk the batter ingredients together in a large bowl at least 30 minutes before cooking; the semolina and rice flour need time to absorb the liquid.',
        'Grate the coconut finely, taking care to avoid the brown skin, which gives a bitter edge.',
        'If using block jaggery, chop it small; if using liquid nolen gur, measure it out and keep it ready.',
        'Place a plate and a clean cloth near the stove for the finished patishapta.',
      ],
      method: [
        {
          title: 'Make the batter',
          text: 'Whisk the rice flour, semolina, maida, sugar and salt together in a large bowl. Gradually add the milk and water, whisking continuously, until you have a smooth batter like thin cream that coats the back of a spoon. Rest for 30 minutes.',
          why: 'Semolina and rice flour are gritty at first. Resting hydrates them, so the crêpe is smooth and does not tear when rolled.',
          cue: 'The batter pours in a thin, continuous stream and leaves a faint trail on the surface for a second before disappearing.',
        },
        {
          title: 'Cook the coconut filling',
          text: 'Melt the nolen gur in a heavy pan on low heat with 2 tbsp of water. When it bubbles, add the grated coconut and stir constantly for 8–10 minutes, until the mixture thickens and leaves the sides of the pan. Add the cardamom and ghee and mix well.',
          why: 'Cooking the coconut in the jaggery makes it soft and cohesive so that it stays inside the crêpe instead of spilling out. Constant stirring prevents scorching.',
          cue: 'The filling looks glossy and clumps together into a soft ball when pressed with a spoon; it should be moist, not wet.',
        },
        {
          title: 'Cool the filling',
          text: 'Transfer the filling to a plate and let it cool completely, about 15 minutes. If using reduced milk or khoya, fold it in once the filling has cooled. Divide the filling into 10 equal portions and shape each into a small log about 7 cm long.',
          why: 'Hot filling would melt the ghee-brushed crêpe and tear it. Rolling it into logs beforehand makes the final rolling quick and neat.',
          cue: 'The filling no longer feels warm and holds its log shape without crumbling.',
        },
        {
          title: 'Heat the pan',
          text: 'Place the tava on medium-low heat for 2 minutes. Brush a very thin film of ghee over the surface using a folded cloth or a pastry brush. Sprinkle a few drops of water; they should sizzle and vanish within a second.',
          why: 'A moderately hot pan lets the batter spread before it sets; too hot and the batter lumps and tears, too cool and the crêpe turns rubbery.',
          cue: 'Water droplets dance and evaporate in about a second without turning to steam instantly.',
        },
        {
          title: 'Pour and spread the batter',
          text: 'Stir the batter well, then pour 1/4 cup onto the centre of the pan. Immediately tilt and rotate the pan, or spread gently with the back of the ladle in a circular motion, to make a thin 18 cm round. Cook for 1–1½ minutes on one side only.',
          why: 'The crêpe is cooked on a single side only, so it stays pale and soft; flipping would make it crisp and hard to roll.',
          cue: 'The top surface turns matte and dry, small holes appear, and the edges lift slightly from the pan.',
        },
        {
          title: 'Fill and roll',
          text: 'Place one log of filling along the centre of the crêpe while it is still on the pan. Using a spatula, fold the edge nearest you over the filling and roll the crêpe into a neat cylinder. Cook for another 30 seconds, turning once, to seal the seam and warm the filling.',
          why: 'Rolling on the pan keeps the crêpe warm and pliable; if cooled first, it cracks. A brief second cooking seals the seam so it holds together.',
          cue: 'The roll holds its shape, with a soft, slightly shiny surface and a closed seam.',
        },
        {
          title: 'Rest and repeat',
          text: 'Slide the finished patishapta on to a plate and cover loosely with a clean cloth to keep it soft. Wipe the pan, grease it lightly again, and repeat with the remaining batter, stirring the batter before each crêpe because the semolina settles.',
          why: 'Stirring keeps the batter uniform; the cloth stops the rolls from drying out as you finish the batch.',
          cue: 'Each crêpe comes out the same thickness and pale golden with a few fine brown spots.',
        },
        {
          title: 'Finish with a syrup or milk',
          text: 'For a festive finish, serve the rolls warm, drizzled with a spoonful of liquid nolen gur, or pour over a little thickened sweet milk (kheer). Cut each roll diagonally into two pieces to show the filling.',
          why: 'The extra syrup or milk adds moisture and richness, and is a traditional way of serving patishapta on Poush Sankranti.',
          cue: 'The rolls glisten and the cut ends show a neat spiral of filling.',
        },
      ],
      offering: 'Offered to Lakshmi and household deities at Poush Sankranti.',
      ritual: [
        'Prepare a clean spot in the puja room and place a brass or banana-leaf plate in front of the images of Lakshmi and the household deities.',
        'Arrange a selection of freshly made pithes on the plate — usually patishapta, puli, and pati — along with a small portion of nolen gur and a lit lamp.',
        'The eldest woman of the house offers the plate with a short prayer for the family’s prosperity and the new harvest, and a small portion is set aside in a separate bowl for the ancestors.',
        'After a few minutes, the pithes are distributed as prasad, first to elders and children, and then to neighbours and relatives who visit on Poush Sankranti.',
      ],
      serving:
        'Serve warm, one or two rolls per person, cut diagonally, on a small plate. They are best with a cup of hot tea and, for festivals, are often accompanied by payesh and other pithes. Drizzle with a little nolen gur or warm kheer just before eating.',
      storage:
        'Best eaten the day they are made. Cover and store in the refrigerator for up to 2 days; warm for 20 seconds in a pan or microwave before serving. The filling can be made a day ahead and stored in the fridge.',
      troubleshooting: [
        {
          problem: 'The crêpe tears while rolling.',
          fix: 'It is too thin, too dry or cooled. Make the batter slightly thicker, cook it only to the matte stage, and roll while the crêpe is still warm on the pan.',
        },
        {
          problem: 'The batter forms lumps or the crêpe has holes.',
          fix: 'The semolina did not hydrate or the pan was too hot. Rest the batter for the full 30 minutes, whisk well, and lower the heat.',
        },
        {
          problem: 'The filling is too runny or sticky.',
          fix: 'It was not cooked long enough. Return it to the pan on low heat for 3–4 minutes until it leaves the sides of the pan.',
        },
        {
          problem: 'The crêpe sticks to the pan.',
          fix: 'The pan is not non-stick or not hot enough. Grease it lightly before each crêpe and let it heat for a full 2 minutes.',
        },
      ],
      variations: [
        'The richer, festive filling is made with kheer: boil 1 litre of milk down to about 250 ml, add 1/2 cup coconut and 3 tbsp sugar or nolen gur, and cook until thick; the pithe is then softer and more custardy.',
        'In some families the filling is coconut with sugar and cardamom only, for a lighter, whiter pithe; the batter is unchanged.',
        'A coconut–khoya filling is common in Kolkata sweet shops, but it is less traditional in village homes.',
        'For a dairy-free version, replace the milk in the batter with water and coconut milk, and use oil for the pan.',
        'For a gluten-light version, use only rice flour and a little cornflour; the crêpe will be more fragile but still workable.',
      ],
      tips: [
        'Batter should coat the back of a spoon thinly. Too thick and the crêpe tears.',
        'Cook the crêpe on one side only; flipping makes it hard.',
        'Use freshly grated coconut — desiccated coconut will not give a moist filling.',
        'Stir the batter before every crêpe; the semolina settles quickly.',
      ],
      differs: 'Thin rolled crêpe with nolen gur coconut.',
    },
    {
      id: 'assam-til-pitha',
      region: 'Assam',
      culture: 'Assamese households — Bhogali Bihu',
      title: 'Til Pitha and Narikol Laru',
      intro:
        'Til pitha is a roll of sticky Bora rice batter spread thin and rolled around a sesame–jaggery filling. Narikol laru is the coconut ladoo that sits beside it.',
      story:
        'Bhogali Bihu, the harvest festival of Assam in mid-January, is a festival of feasting. The word “bhog” means eating, and on the night before (Uruka) the village gathers around a bonfire, cooks together and sings. The next morning, after a bath, the meji (bonfire) is lit again, and the first offerings of pitha, laru and the new rice are made to the fire and the household deity. Til pitha and narikol laru are two of the most characteristic foods of this day.\n\nTil pitha is made from Bora saul, a short-grained sticky rice that is native to Assam and also used for the bamboo-cooked sticky rice of the Mising and Bodo communities. The rice is soaked, ground to a batter or dried and milled to flour, and spread thin on a hot tava to make a pancake. The filling is crushed black or white sesame seeds mixed with jaggery. The pancake is rolled around the filling like a cigar and eaten warm. Because Bora rice is slightly sticky, the pitha has a soft, chewy texture that ordinary rice does not give.\n\nNarikol laru, the coconut laddu, is a simple sweet of grated coconut cooked with jaggery or sugar and cardamom. It is the quickest of the Bihu sweets and is made in large quantity to be offered to guests. Together, the two make up the basic pitha-laru pair of Bhogali Bihu in nearly every Assamese home.',
      serves: '10 pitha',
      prep: '30 min',
      cook: '25 min',
      equipment: [
        'Flat iron tava or non-stick griddle — a flat, evenly heated surface to spread and cook the thin pitha',
        'Mortar and pestle (khal) or spice grinder — to crush the roasted sesame to a coarse powder with a little oil left in it',
        'Heavy-bottomed pan for the laru — coconut and jaggery stick and scorch on a thin base',
        'Wet grinder or blender — to grind soaked rice to a smooth batter',
        'Flat spatula — to lift and roll the thin pitha without tearing it',
      ],
      ingredients: [
        {
          group: 'Til pitha batter',
          items: [
            '1 cup (180 g) Bora saul (Assamese sticky rice) or rice flour — Bora rice gives the traditional soft, chewy texture; if unavailable use short-grain sticky rice or regular rice flour with a spoon of cooked rice added',
            '1/2 tsp salt — brings out the sweetness of the filling',
            '1 cup (240 ml) warm water — adjust to get a thin pouring batter',
            'Oil or ghee for greasing, about 2 tbsp — a thin film on the tava prevents sticking',
          ],
        },
        {
          group: 'Sesame–jaggery filling',
          items: [
            '1/2 cup (75 g) black or white sesame seeds — Assamese cooks use either; roast until fragrant and crush coarsely',
            '1/3 cup (65 g) jaggery, grated — dark jaggery gives a deeper flavour and colour',
            '1 tsp ghee — optional; helps bind the filling',
          ],
        },
        {
          group: 'Narikol laru',
          items: [
            '2 cups (180 g) grated fresh coconut — fresh coconut is essential for moisture and flavour',
            '1/2 cup (100 g) jaggery or sugar — jaggery is traditional for Bhogali Bihu',
            '1/2 tsp cardamom powder — freshly ground for aroma',
            '1 tsp ghee — enriches the laru and stops sticking',
          ],
        },
      ],
      mise: [
        'If using whole Bora rice, wash and soak it for 4–6 hours, then drain thoroughly before grinding to a smooth batter with the warm water and salt.',
        'Dry-roast the sesame seeds in a pan over low heat for 3–4 minutes until they pop and smell nutty, and let them cool before crushing.',
        'Grate the jaggery and mix it with the crushed sesame so the filling is ready to spoon.',
        'Grate the coconut and keep it aside for the laru; grease a plate for shaping.',
      ],
      method: [
        {
          title: 'Make the rice batter',
          text: 'Grind the soaked Bora rice with the salt and 3/4 cup of the warm water to a smooth, thin batter, adding the remaining water gradually. If using flour, whisk it with the water and salt until free of lumps. The batter should be thinner than dosa batter, similar to thin cream.',
          why: 'A thin batter spreads into a delicate pancake that rolls neatly; a thick batter gives a heavy, doughy pitha that cracks.',
          cue: 'The batter flows freely from a spoon and leaves only a faint coating on the back of it.',
        },
        {
          title: 'Prepare the sesame filling',
          text: 'Crush the cooled roasted sesame seeds coarsely in a mortar, leaving some seeds whole. Mix in the grated jaggery and the ghee, pressing with the pestle until the mixture clumps. Divide into 10 portions and shape each into a small log about 6 cm long.',
          why: 'Crushing releases the oil of the sesame so it binds with the jaggery; pre-shaped logs make rolling quick before the pancake cools.',
          cue: 'The filling holds together when squeezed and smells strongly of roasted sesame.',
        },
        {
          title: 'Heat and grease the tava',
          text: 'Place the tava on medium heat for 2 minutes. Brush with a thin film of oil. Sprinkle a few drops of water on it; they should sizzle and evaporate in a second. Lower the heat to medium-low before pouring the batter.',
          why: 'A medium-hot pan sets the batter before it runs; too hot and the batter lumps, too cool and the pitha sticks.',
          cue: 'Water droplets dance on the surface for a second before disappearing.',
        },
        {
          title: 'Spread the pancake',
          text: 'Stir the batter, then pour 1/4 cup onto the centre of the tava. Using the back of the ladle, spread it quickly in a circular motion to form a thin round of about 16–18 cm. Cook for 1 minute until the top looks dry and the edges lift.',
          why: 'Spreading quickly keeps the pancake even and thin; if you wait, the batter sets unevenly and tears.',
          cue: 'The top turns from shiny to matte, small bubbles appear, and the edges curl very slightly.',
        },
        {
          title: 'Fill and roll the pitha',
          text: 'Place a log of filling along one edge of the pancake. Using the spatula, roll the pancake over the filling into a neat cylinder while still on the tava. Turn once for 20–30 seconds to seal the seam and warm the filling. Slide on to a plate.',
          why: 'Rolling while the pancake is hot and flexible keeps it from cracking; the short second heat melts the jaggery into the sesame.',
          cue: 'The roll holds its shape, the seam is closed, and the jaggery has just started to soften inside.',
        },
        {
          title: 'Cook the laru mixture',
          text: 'In a heavy pan, melt the jaggery with 2 tbsp water over low heat. Add the grated coconut and stir constantly for 8–10 minutes, until the mixture thickens, leaves the sides of the pan and forms a soft mass. Add the cardamom and ghee.',
          why: 'Cooking the coconut in the syrup binds it so it can be shaped. Constant stirring prevents scorching.',
          cue: 'The mixture is moist but not wet, and a small piece pressed between the fingers holds together.',
        },
        {
          title: 'Shape the laru',
          text: 'Cool the coconut mixture for 5 minutes until you can handle it. Grease your palms with a little ghee, and shape lime-sized portions into smooth round balls by pressing and rolling between your palms. Place them on a greased plate.',
          why: 'If shaped too hot, the mixture burns your hands; if cold, it crumbles. Warm is ideal.',
          cue: 'The balls are smooth, firm and show no cracks.',
        },
        {
          title: 'Serve both together',
          text: 'Arrange the pitha rolls and larus on a plate, pitha first so they stay warm. Serve at once to guests, or cover loosely with a cloth to keep the pitha soft until the offering is made.',
          why: 'Pitha is best served warm; cooled, it becomes chewier and the jaggery sets hard.',
          cue: 'The pitha is soft and pliable, and the laru is firm but yielding.',
        },
      ],
      offering: 'Offered to the household deity at the feast of Bhogali Bihu.',
      ritual: [
        'On the morning of Bhogali Bihu, after bathing, place the freshly made pitha and laru on a banana leaf or brass plate in front of the household deity, together with the new rice and a lit lamp.',
        'Light the meji (bonfire) if the village or family follows the custom, and offer a small portion of pitha, laru and new rice into the fire with a prayer for a good harvest.',
        'Elders of the house offer thanks for the harvest and bless the younger members; the first portion is set aside for the ancestors and the household gods.',
        'Distribute the pitha and laru to everyone present, starting with elders and children, and send plates to neighbours as part of the festival sharing.',
      ],
      serving:
        'Serve the pitha warm, two rolls per person, with a laru on the side and a cup of tea. At Bhogali Bihu it is part of a larger spread that includes the traditional jolpan (rice, curd, jaggery and other pithas). Pitha rolls can also be dipped in warm milk.',
      storage:
        'Pitha is best eaten on the day it is made. Stored in an airtight container it keeps for 2 days; reheat on a tava for a minute. The laru keeps for 5–7 days in an airtight tin at room temperature.',
      troubleshooting: [
        {
          problem: 'The pitha pancake sticks to the tava.',
          fix: 'The pan is too cold or not greased. Heat it fully, brush a thin film of oil, and spread the batter quickly.',
        },
        {
          problem: 'The pitha cracks when rolled.',
          fix: 'The pancake is overcooked or too thick. Cook only until the top turns matte, and thin the batter with a spoon of water.',
        },
        {
          problem: 'The laru crumbles.',
          fix: 'The coconut mixture is too dry or cold. Warm it with a spoon of ghee or a teaspoon of water and shape again.',
        },
        {
          problem: 'The filling falls out of the roll.',
          fix: 'The sesame was crushed too coarsely or the jaggery is too dry. Crush finer and add a little ghee to bind.',
        },
      ],
      variations: [
        'Replace sesame with grated coconut and jaggery for a coconut pitha (narikol pitha), which is equally popular during Bihu.',
        'Some households use black sesame and others white; black sesame is considered more traditional for Bhogali Bihu.',
        'If Bora rice is unavailable, mix 3/4 cup regular rice flour with 1/4 cup cooked and mashed rice to approximate the stickiness.',
        'For a vegan version, use oil instead of ghee; the pitha remains traditional since the batter is dairy-free.',
        'The laru can be made with sugar instead of jaggery for a white laddu, or with coconut milk powder for a smoother texture.',
      ],
      tips: [
        'Use Bora rice if you can get it — regular rice is less sticky.',
        'Spread the batter thin and quickly; a thick pancake will not roll.',
        'Roast the sesame lightly — if over-roasted, it tastes bitter.',
        'Make the filling logs ahead so you can roll the pitha while it is hot.',
      ],
      differs: 'Sesame–jaggery roll; coconut laru.',
    },
    {
      id: 'odisha-arisa',
      region: 'Odisha',
      culture: 'Odia households — Nuakhai, Raja, Makar Sankranti',
      title: 'Arisa Pitha',
      intro:
        'A flat, round fried cake made from rice flour and jaggery, studded with sesame. It stays fresh for weeks and is an Odia staple for festivals and for the Jagannath temple.',
      story:
        'Arisa pitha is one of the oldest festival sweets of Odisha. It is made from the local rice, ground to flour, mixed into a dough with jaggery and fried until crisp outside and soft inside. It is a pitha of travel and ceremony: because it keeps well, it is made in advance for Raja Parba, Nuakhai, Makar Sankranti and the Rath Yatra season, and it is often among the sweets sold on the Grand Road at Puri.\n\nTraditionally the rice for arisa is soaked overnight, dried in the shade and pounded to a fine flour in a dhenki, the wooden foot-operated husking lever. The flour is mixed with a jaggery syrup of one-string consistency and kneaded to a firm dough. Small balls are flattened on an oiled surface or leaf, sometimes with sesame pressed on top, and fried in ghee or oil. The result is a flat, chewy, caramel-dark cake with a faint crisp edge.\n\nAt Nuakhai, the Odia festival of the first rice, arisa pitha is part of the offerings to the household deity and Maa Samaleswari in western Odisha. It stands beside the new rice and the khiri, and is shared among family members who gather from near and far for the occasion.',
      serves: '12 pieces',
      prep: '30 min',
      cook: '25 min',
      equipment: [
        'Heavy-bottomed pan for the syrup — jaggery burns easily in a thin pan, giving a bitter note',
        'Deep kadai for frying — a wide, deep pan holds enough oil for the pitha to float and brown evenly',
        'Greased plate or banana leaf — to flatten and shape the dough without sticking',
        'Slotted spoon — to lift the fried arisa and drain the oil',
        'Fine sieve — to sift the rice flour to a uniform fineness',
      ],
      ingredients: [
        {
          items: [
            '2 cups (300 g) fine rice flour — from raw rice soaked overnight, dried in the shade and pounded; shop-bought flour must be very fine and dry',
            '1 cup (200 g) jaggery — dark, clean jaggery gives the traditional colour; chop it for even melting',
            '1/2 cup (120 ml) water — for the syrup only',
            '2 tbsp sesame seeds — white, lightly roasted; they add crunch and a nutty aroma',
            '1/2 tsp cardamom powder — freshly ground green cardamom',
            '1 tbsp ghee — mixed into the dough for tenderness',
            'Oil or ghee for deep frying, about 2 cups (480 ml) — enough for 4 cm depth; ghee gives a richer taste, oil is common in households',
          ],
        },
      ],
      mise: [
        'If making your own flour, soak 2 cups of raw rice overnight, drain, spread on a cloth to dry in the shade for 1–2 hours, then grind to a fine flour and sift.',
        'Melt the jaggery with the water over low heat, strain through a clean cloth, and keep it hot.',
        'Roast the sesame seeds until just fragrant, and let them cool.',
        'Grease a flat plate or banana leaf lightly with oil for shaping the pitha.',
      ],
      method: [
        {
          title: 'Make the syrup',
          text: 'Put the strained jaggery syrup back on medium heat and bring it to a boil. Cook for 5–6 minutes, stirring occasionally, until it reaches one-string consistency: a drop pressed between thumb and finger should form a single thread when pulled apart.',
          why: 'The syrup binds the flour. Too thin and the dough is sticky; too thick and the arisa becomes hard and dense.',
          cue: 'A single, short thread forms between your fingers and breaks cleanly.',
        },
        {
          title: 'Combine the flour and syrup',
          text: 'Switch off the heat. Add the sifted rice flour to the hot syrup gradually, stirring constantly with a wooden spoon. Add the sesame, cardamom and ghee. Mix until a thick, sticky dough forms and no dry flour remains.',
          why: 'Adding the flour to hot syrup partly cooks the starch, which makes the dough cohesive and the arisa soft rather than raw.',
          cue: 'The dough pulls away from the sides of the pan and holds together when pressed.',
        },
        {
          title: 'Rest the dough',
          text: 'Cover the dough with a damp cloth and let it rest for 15–20 minutes until it is cool enough to handle. Knead it briefly with greased palms for 1–2 minutes until smooth and slightly elastic.',
          why: 'Resting allows the flour to absorb the syrup fully; kneading evens the texture so the arisa fries without cracking.',
          cue: 'The dough is smooth, slightly tacky, and not hot to the touch.',
        },
        {
          title: 'Shape the discs',
          text: 'Take a lime-sized ball of dough (about 40 g). Place it on the greased plate or banana leaf and press it gently with greased fingers into a flat disc about 8 cm wide and 1 cm thick. Sprinkle a few extra sesame seeds on top and press them in lightly.',
          why: 'An even thickness of 1 cm ensures the arisa cooks through; a thicker disc stays raw in the middle.',
          cue: 'The disc is smooth with a slightly raised edge and no cracks.',
        },
        {
          title: 'Heat the oil',
          text: 'Heat the oil or ghee in the kadai on medium heat for 4–5 minutes. To test, drop a tiny piece of dough in: it should sink, then rise slowly with small bubbles in 5–6 seconds. Reduce the heat to medium-low before adding the arisa.',
          why: 'Oil that is too hot burns the jaggery outside before the centre cooks; oil that is too cool makes the arisa oily and heavy.',
          cue: 'The test dough rises slowly with steady, gentle bubbles around it.',
        },
        {
          title: 'Fry gently',
          text: 'Slide 2–3 discs at a time into the oil without crowding. Fry on medium-low heat for 5–6 minutes, turning once, until both sides are deep golden-brown and the arisa floats and feels firm. Lift the discs carefully since they are soft when hot.',
          why: 'Slow frying cooks the dense dough through; fast frying chars the outside while leaving it raw inside.',
          cue: 'The bubbles slow, the colour is an even deep brown, and the surface looks dry and slightly crisp.',
        },
        {
          title: 'Drain and press',
          text: 'Remove the arisa with the slotted spoon and place on a plate lined with a tissue. While still warm, press lightly with a flat spoon to squeeze out extra oil if you like. Repeat with the remaining dough in batches.',
          why: 'Draining and pressing removes surface oil and gives a denser, chewier texture, which is typical of Odia arisa.',
          cue: 'The arisa looks dry, matte and deep brown, with a slight crisp edge.',
        },
        {
          title: 'Cool and set',
          text: 'Let the arisa cool completely, uncovered, for at least an hour. They firm up as they cool and develop their characteristic chewiness. Do not stack them while warm, or they stick together.',
          why: 'Cooling sets the jaggery, which gives arisa its firm bite and long shelf life.',
          cue: 'The arisa is firm to the touch, with a dry surface and no stickiness.',
        },
      ],
      offering: 'Offered with new rice at Nuakhai and kept for weeks.',
      ritual: [
        'On the morning of Nuakhai, after a bath, place the arisa on a clean leaf or brass plate in front of the household deity, together with the new rice, khiri and fruit.',
        'Light a lamp and offer the new rice at the auspicious moment (nua) announced by the village priest or the family elders, with the arisa as part of the prasad.',
        'The eldest member offers a short prayer for a good harvest and for the family’s wellbeing, after which everyone bows to the elders and exchanges greetings (Nuakhai Juhar).',
        'Distribute the arisa to all present, starting with the elders, and send some to neighbours and relatives.',
      ],
      serving:
        'Serve at room temperature, one or two pieces per person, with tea. For festival meals it is placed on the leaf along with khiri and other pithas. A single arisa is a substantial sweet, chewy rather than crisp, and is best eaten slowly.',
      storage:
        'Store in an airtight tin at room temperature. It keeps for 3–4 weeks in a cool, dry place without refrigeration. If it becomes slightly soft in humid weather, warm it in a dry pan for 1 minute.',
      troubleshooting: [
        {
          problem: 'The arisa breaks apart in the oil.',
          fix: 'The dough is too dry or the syrup was under-cooked. Knead in a tablespoon of warm syrup or ghee, and make sure the syrup reaches one-string stage next time.',
        },
        {
          problem: 'The arisa is hard as a stone.',
          fix: 'The syrup was cooked too far or the dough was too stiff. Cook the syrup only to one string, and keep the dough soft and tacky.',
        },
        {
          problem: 'It is raw in the centre.',
          fix: 'The oil was too hot or the discs too thick. Fry on medium-low heat for longer and keep the discs to 1 cm thick.',
        },
        {
          problem: 'The arisa is very oily.',
          fix: 'The oil was not hot enough when the discs went in. Test the temperature with a small piece, and press the arisa gently on tissue after frying.',
        },
      ],
      variations: [
        'Some families add a tablespoon of grated coconut to the dough, or a pinch of black pepper, for a different flavour.',
        'Arisa can be shaped by pressing the dough into a carved wooden mould (pitha sancha) for a patterned top, which is common in western Odisha.',
        'For a vegan version, use oil instead of ghee in the dough and for frying; arisa is naturally dairy-free otherwise.',
        'In some districts the dough is shaped into small balls and flattened with a banana leaf, with a drop of ghee on top before frying.',
        'Use powdered sugar instead of jaggery for a pale arisa, although this is less traditional for festival offerings.',
      ],
      tips: [
        'Do not fry on high heat; they brown fast but remain raw inside.',
        'Check the syrup stage by touch; guessing leads to hard or sticky arisa.',
        'Keep your palms greased when shaping; the dough is sticky.',
        'Let the arisa cool fully before storing, or they become soft and stick together.',
      ],
      differs: 'Fried rice-jaggery cake with sesame.',
    },
  ],
}

export default recipe
