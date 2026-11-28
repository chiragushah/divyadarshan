import type { RecipeVariant } from './types'
import type { DietTag } from './diet'
// Additional regional versions, appended to the dish's own variants by index.ts. Facts cross-checked; quantities for several are untested home-cook scalings.
export const EXTRA_VARIANTS: Record<string, RecipeVariant[]> = {
  "pana": [
    {
      "id": "odisha-adhara-pana",
      "region": "Odisha (Puri)",
      "culture": "Jagannath temple servitors; Rath Yatra (Adhara Pana ritual on the chariots)",
      "title": "Adhara Pana (home-scale)",
      "intro": "A thick, milky, spiced drink of sweetened milk and chhena, banana, mango, orange, coconut and parched rice, finished with pepper, cardamom, clove and nutmeg. It is the Puri drink poured for the deities on their chariots, and this is a household adaptation of the published ingredient list.",
      "story": "Adhara means lip and pana means drink. At Puri, a day after Suna Besha, on Asadha Shukla Dwadashi (one scholar quoted by ETV Bharat gives the thirteenth day), servitors raise large earthen pots of pana up the three chariots until the pots reach the lips of Jagannath, Balabhadra and Subhadra. Nine pots, three to a chariot, each roughly a metre tall, are made by the potters of Kumbharpada over at least a month, and the water is drawn from the well of Chauni Matha.\n\nThe drink is described as a mixture of milk, milk cream, cheese (chhena), unrefined sugar, molasses, ripe banana, pepper, camphor and nutmeg, among other spices. After the offering the pots are broken. Temple accounts say the pana is not for devotees or servitors; it is for the minor guardian deities of the chariots (Rath Rakhyak, also called Parsva Devatas) and the unseen beings believed to stay on them. One travel feature describes the pana differently and says it is shared with devotees, so accounts are not uniform.\n\nBecause the temple drink is not usually shared with devotees, this home recipe is a devotional adaptation: the quantities are a halved household recipe published by Lost Recipes of Odisha, and the ritual below offers a small cup at home and shares the rest with the family.",
      "serves": "10 small glasses (about 2 litres)",
      "prep": "35 min + 1 hr chilling",
      "cook": "None",
      "equipment": [
        "Large steel or earthen pot - a clay pot keeps the drink cool",
        "Whisk and a fine strainer",
        "Grater and a masher",
        "Brass or steel glasses to serve"
      ],
      "ingredients": [
        {
          "group": "Base",
          "items": [
            "1 litre (4 cups) water - cool, boiled and cooled",
            "250 g (1 1/4 cups) powdered crystal sugar or yellow jaggery - strained if jaggery",
            "250 ml (1 cup) full-fat milk - boiled and cooled completely",
            "125 g fresh chhena - crumbled very fine",
            "50 g khoya - grated"
          ]
        },
        {
          "group": "Fruit and body",
          "items": [
            "2 ripe bananas - mashed smooth",
            "1 ripe mango - about 150 g pulp",
            "Juice of 1 small orange",
            "1/2 apple - finely grated",
            "2 tbsp raisins",
            "1/4 cup grated fresh coconut",
            "1 cm ginger - finely grated",
            "50 g khai (parched rice) - lightly crushed",
            "100 g roasted chickpea flour (chhatua) - sifted"
          ]
        },
        {
          "group": "Spices",
          "items": [
            "1/4 tsp black pepper powder",
            "4 green cardamom pods - seeds ground",
            "2 cloves - ground",
            "1 pinch nutmeg powder",
            "1 grain-sized piece edible (pacha) camphor - optional; use no more than a grain"
          ]
        }
      ],
      "mise": [
        "Boil and fully cool the milk.",
        "Crumble the chhena fine and grate the khoya.",
        "Mash the bananas and mango pulp separately.",
        "Sift the chhatua and crush the parched rice.",
        "Grind the spices."
      ],
      "method": [
        {
          "title": "Dissolve the sweetener",
          "text": "Stir the sugar or jaggery into the water until fully dissolved. Strain if jaggery was used.",
          "why": "The sugar must dissolve before the dairy goes in or it will stay gritty.",
          "cue": "The liquid is clear with no crystals at the bottom."
        },
        {
          "title": "Add banana, coconut, ginger and rice",
          "text": "Stir in the mashed bananas, coconut, ginger and crushed parched rice. Mix well.",
          "why": "The banana gives body and the rice adds a light texture.",
          "cue": "The base looks thick and slightly cloudy."
        },
        {
          "title": "Add milk, chhena and khoya",
          "text": "Pour in the cooled milk, then add the chhena and khoya. Swirl with a ladle or whisk gently.",
          "why": "Cold dairy must be added after the base so that it does not curdle.",
          "cue": "Fine chhena crumbs float throughout; no hard lumps."
        },
        {
          "title": "Add the fruit",
          "text": "Stir in the mango pulp, orange juice, apple and raisins gently. The milk is already in, so add the juice slowly and keep stirring so the acid does not split it.",
          "why": "Fruit gives the drink its sweetness and fragrance.",
          "cue": "A uniform pale golden colour with specks of fruit."
        },
        {
          "title": "Thicken with chhatua",
          "text": "Add the chhatua in three portions, whisking each smooth, adding up to 250 ml cold water if the drink is too thick.",
          "why": "Adding it in portions prevents lumps.",
          "cue": "The drink coats a spoon thinly and pours slowly."
        },
        {
          "title": "Season",
          "text": "Stir in the pepper, cardamom, clove and nutmeg, and the camphor grain if using. Taste and adjust.",
          "why": "Spices give the pana its warm, cooling finish.",
          "cue": "A perfumed aroma with a light peppery finish."
        },
        {
          "title": "Chill",
          "text": "Pour into an earthen pot or covered jug and chill at least 1 hour. Stir well before serving.",
          "why": "Chilling blends the flavours and thickens the drink slightly.",
          "cue": "Cold, thick and fragrant."
        }
      ],
      "offering": "At Puri the drink is offered on the chariots on Asadha Shukla Dwadashi, after Suna Besha. At home, a small clay cup can be offered before Jagannath during Rath Yatra week as a family adaptation.",
      "ritual": [
        "Make the pana fresh on the day and pour a little into a small clay cup.",
        "Place the cup in front of the Jagannath image with a lamp and a tulsi leaf and offer it with a short prayer.",
        "Share the rest with the family afterwards. This is a household adaptation: the temple's own pana at Puri is not generally distributed to devotees."
      ],
      "serving": "Serve cold in small glasses of about 200 ml.",
      "storage": "Best the same day; keep covered in the refrigerator up to one day. Do not leave out in the heat.",
      "troubleshooting": [
        {
          "problem": "The drink curdled.",
          "fix": "The milk was warm or the orange juice went in too quickly. Cool the milk fully and stir the juice in gently."
        },
        {
          "problem": "It is gritty.",
          "fix": "The sugar did not dissolve or the chhena was coarse. Dissolve sugar first and crumble the chhena very fine."
        },
        {
          "problem": "Too thick.",
          "fix": "Add cold water or milk a few tablespoons at a time."
        },
        {
          "problem": "Lumpy chhatua.",
          "fix": "Sift it and whisk it in portions."
        }
      ],
      "variations": [
        "Replace khoya with extra chhena if unavailable.",
        "Leave out camphor if you are unsure of its source."
      ],
      "tips": [
        "Cool everything before mixing.",
        "Use fresh fruit.",
        "Camphor must be edible grade and a grain only."
      ],
      "differs": "Puri's Adhara Pana is a thick spiced milk, chhena and fruit drink for the chariot deities, unlike the bael-based Pana Sankranti drink of the new year."
    }
  ],
  "khaja": [
    {
      "id": "bihar-silao",
      "region": "Bihar (Silao, Nalanda)",
      "culture": "Halwai (Sah) sweet-makers of Silao; Dussehra, Diwali and Chhath festive sweet",
      "title": "Silao Khaja",
      "intro": "Bihar's GI-tagged khaja, from Silao in Nalanda district: many very thin sheets of dough joined with a ghee-flour paste, rolled into a log, sliced, fried slowly and dipped warm in a sticky, cardamom-and-aniseed-flavoured sugar syrup. This is a home-scale version of the published method.",
      "story": "Silao is a village in Nalanda district, between Rajgir and Nalanda, and its khaja received a Geographical Indication tag in 2018. Local belief, noted by the Incredible India tourism site, says the people of Silao offered the sweet to the Buddha as he travelled from Rajgir to Nalanda. The Incredible India page describes the sweet as having 12 to 16 very thin sheets of dough and credits Silao's climate and water for its crispness. The Sahs community of halwais is usually credited with the original recipe (Slurrp).\n\nThe Better India reports that the archaeologist J. D. Beglar's 1872-73 visit and research is linked to the GI tag, and cites the 12th-century Sanskrit text Manasollasa, which describes a fried sweet called khajjaka. It also links the khaja served at Puri's Jagannath temple to this wider family of sweets. These origin stories are claims rather than settled history.\n\nSlurrp describes khaja as a staple at Dussehra, Diwali and Chhath. The recipe below follows the published outline (ghee-flour paste between thin sheets, rolled log, sliced, fried, dipped warm in syrup) at home scale; our home version uses six sheets, fewer than the 12-16 described for the village sweet.",
      "serves": "8-10 people (about 20 pieces)",
      "prep": "50 min + 20 min resting",
      "cook": "1 hr 15 min (frying in 4-5 batches)",
      "equipment": [
        "Long rolling pin and a smooth work surface - the sheets must be rolled paper-thin",
        "Wide, deep kadai - gives room for the pieces to puff and float",
        "Sharp knife - a clean cut keeps the layers open",
        "Slotted spoon and a wire rack - to drain before and after the syrup",
        "Plate greased with ghee - the glazed khaja is set on it so it does not stick"
      ],
      "ingredients": [
        {
          "group": "Dough",
          "items": [
            "3 cups (375 g) maida - refined flour gives thin, pale sheets",
            "3 tbsp (45 g) melted ghee - rubbed into the flour so the dough fries short and crisp",
            "1/2 tsp salt - lifts the sweetness",
            "About 2/3 cup (150 ml) cold water - added a little at a time for a firm dough"
          ]
        },
        {
          "group": "Layering paste",
          "items": [
            "2 tbsp (30 g) ghee, at room temperature - the barrier that separates the sheets",
            "2 tbsp (15 g) maida - whisked into the ghee (makes about 4 tbsp of paste)"
          ]
        },
        {
          "group": "Frying",
          "items": [
            "About 1 litre ghee or refined oil - enough for the pieces to float; ghee gives the traditional aroma"
          ]
        },
        {
          "group": "Syrup",
          "items": [
            "1 1/2 cups (300 g) sugar - cooked to a sticky syrup",
            "3/4 cup (180 ml) water",
            "1/2 tsp cardamom powder - freshly ground",
            "1/2 tsp aniseed (saunf) powder - the Incredible India page lists aniseed among Silao khaja's flavours",
            "1 pinch black pepper powder (optional) - used in some published home versions"
          ]
        }
      ],
      "mise": [
        "Whisk the 2 tbsp ghee and 2 tbsp maida for the paste until smooth, like soft butter.",
        "Grind the cardamom and roast and powder the aniseed.",
        "Grease a large plate with ghee for setting the glazed khaja.",
        "Set a wire rack over a tray near the stove."
      ],
      "method": [
        {
          "title": "Make a firm dough",
          "text": "Mix the maida and salt, pour in the melted ghee and rub with your fingertips until the flour looks like damp breadcrumbs. Add cold water a spoonful at a time and knead 6-8 minutes into a smooth, firm dough, stiffer than chapati dough. Cover and rest 20 minutes.",
          "why": "The ghee shortens the gluten so the layers shatter when bitten; firm dough rolls thin without tearing.",
          "cue": "The dough is smooth, does not stick to the hands and a pressed dent springs back slowly."
        },
        {
          "title": "Make the layering paste",
          "text": "Whisk the 2 tbsp ghee with the 2 tbsp maida to a smooth, spreadable paste. Keep it at room temperature.",
          "why": "The paste keeps the sheets from welding together in the hot fat, which is what makes them separate into layers.",
          "cue": "It spreads like soft butter and holds its shape on a spoon."
        },
        {
          "title": "Roll thin sheets",
          "text": "Divide the dough into 6 equal balls (about 95 g each). Roll each into a square about 28 cm by 28 cm, as thin as you can manage, about 1 mm, dusting lightly with maida. Cover rolled sheets with a cloth while you work.",
          "why": "Thin sheets are the signature of Silao khaja; thick ones give a doughy, tight khaja.",
          "cue": "You can see the outline of your hand faintly through the sheet and it does not tear when lifted."
        },
        {
          "title": "Stack with paste",
          "text": "Lay one sheet down and spread about 1 tbsp of paste thinly to the edges. Cover with a second sheet, spread another tablespoon, and top with a third plain sheet. Repeat with the other three sheets to make a second stack. This uses about 4 tbsp of paste in all.",
          "why": "Each sheet needs paste on its face or the layers will fuse.",
          "cue": "Each stack is smooth with no bare patches, three sheets thick."
        },
        {
          "title": "Roll into logs",
          "text": "Starting from one edge, roll each stack up tightly into a log about 28 cm long and 3.5 cm thick, pressing out air as you go. Dab the end with water to seal.",
          "why": "A tight roll keeps all the layers in contact so they puff together.",
          "cue": "The log is firm, even and has no gaps at the ends."
        },
        {
          "title": "Slice and press",
          "text": "Trim about 1.5 cm off each end and cut each log into 10 slices, each about 2.5 cm thick, with a sharp knife (20 pieces in all). Stand each slice with the spiral face up and press it with your palm to about 1.5 cm thick, so the spiral spreads.",
          "why": "A sharp cut keeps the layers open; pressing evens the piece so it fries uniformly.",
          "cue": "Each piece shows a clear tight spiral of thin layers."
        },
        {
          "title": "Fry slowly",
          "text": "Heat the ghee or oil in the kadai on medium-low for 5 minutes (about 130-140 C). A pinch of dough should sink, then rise slowly with tiny bubbles. Slide in 4-5 pieces and fry 10-12 minutes, turning gently, until the layers lift and the khaja is an even pale gold. Drain on the rack and cool 5 minutes. Repeat with the remaining pieces.",
          "why": "Low heat cooks the inner layers before the outside colours; hot fat leaves a dark shell and raw centre.",
          "cue": "The pieces float, the layers have fanned open and the bubbling is slow and steady."
        },
        {
          "title": "Make the syrup",
          "text": "Dissolve the sugar in the water over medium heat, then boil 8-10 minutes until the syrup is sticky and a drop pulled between finger and thumb makes a thread that holds. Stir in the cardamom, aniseed and pepper, and keep on the lowest heat. If it thickens too much, stir in a spoonful of hot water.",
          "why": "A thick, sticky syrup glazes the khaja instead of soaking in, which keeps it crisp.",
          "cue": "A thin thread forms and the syrup coats the back of a spoon."
        },
        {
          "title": "Dip and set",
          "text": "While the khaja is still warm, slip each piece into the warm syrup for 20-30 seconds, turning once. Lift out, let the excess drip off, and set on the greased plate. Leave 30-40 minutes until the glaze turns matte and crisp.",
          "why": "Dipping warm lets the glaze cling; a long soak makes the layers soft.",
          "cue": "The surface has a thin, dry, sugary crust and the layers still show."
        }
      ],
      "offering": "A festive sweet of Bihar, made for Dussehra, Diwali and Chhath. It is offered at home as an ordinary festival naivedya; no specific temple rite for Silao khaja is documented in the sources consulted.",
      "ritual": [
        "Bathe, wear clean clothes and place a few pieces on a clean plate or banana leaf before the household deity or the Chhath altar when it is made for that festival.",
        "Light a lamp, add a tulsi leaf, and offer with a short prayer.",
        "Let it stand a few minutes, then share it with the family, elders first, and with neighbours."
      ],
      "serving": "Serve at room temperature, one or two pieces each, with tea. Silao khaja is traditionally boxed and gifted.",
      "storage": "Keeps in an airtight tin for about 1-2 weeks in dry weather (our estimate; the sources give no figure). If it softens in humid weather, crisp it 5 minutes in a 120 C oven.",
      "troubleshooting": [
        {
          "problem": "The khaja is flat and hard.",
          "fix": "The dough was too soft or the sheets too thick, or the paste was missed in patches. Roll thinner and spread paste to the edges."
        },
        {
          "problem": "Brown outside and raw inside.",
          "fix": "The fat was too hot. Keep it on medium-low and fry longer."
        },
        {
          "problem": "The layers stuck together.",
          "fix": "The paste was too thin or the log cut with a blunt knife. Use a sharp knife and press, do not drag."
        },
        {
          "problem": "It went soft after glazing.",
          "fix": "The syrup was too thin or the dip too long. Cook the syrup until sticky and dip for no more than 30 seconds."
        }
      ],
      "variations": [
        "Some published home recipes add a pinch of cinnamon to the syrup (Slurrp lists cinnamon and black pepper).",
        "Skip the syrup and roll the warm fried pieces in powdered sugar for a drier khaja (our adaptation).",
        "Jain: as written, with no root vegetables; use ghee or oil as your family practice permits."
      ],
      "tips": [
        "Thin sheets are everything; take the time to roll.",
        "Keep the heat low for fry.",
        "Cool the fried khaja 5 minutes before the syrup.",
        "Set glazed khaja on a greased plate or it will stick."
      ],
      "differs": "Silao khaja is the GI-tagged Nalanda version, described with 12-16 very thin sheets, ghee-flour paste and a cardamom-and-aniseed sugar syrup; Puri khaja is a separate Odisha temple tradition of the same family."
    },
    {
      "id": "andhra-madatha-kaja",
      "region": "Andhra Pradesh (Tapeswaram and Kakinada, East Godavari)",
      "culture": "Telugu households and sweet-makers of the Godavari delta; weddings, Diwali and festivals",
      "title": "Madatha Kaja",
      "intro": "Telugu kaja is a cousin of khaja: a single thin sheet of dough is brushed with ghee, rolled into a log, sliced, flattened, fried very slowly and dipped briefly in a light one-string cardamom-and-lemon syrup. Madatha kaja is the layered, folded form, drier than gottam kaja and firming up over time.",
      "story": "Kakinada kaja is said to date to 1891, when Chittipeddi Kotaiah, who had come from China Parimi near Tenali, started a sweet shop in Kakinada; it continues as Kotaiah Sweets (The Hans India, Wikipedia). Two forms are described: gottam kaja, hollow and cylindrical with syrup inside, and madatha kaja, made of folded layers of dough that hold syrup between them. Wikipedia says madatha kaja is also called Tapeswaram kaja and comes from Tapeswaram village in East Godavari district, and that Tapeswaram kaja and Kakinada kaja are slightly different but often confused.\n\nCooking from Heart describes madatha kaja as a festive sweet often served at Telugu weddings, celebrations and Diwali, and says madatha means fold in Telugu. The sources consulted do not record a temple rite or prasad tradition for kaja, so this version is included as a regional sibling of Puri khaja, not as a named temple offering.\n\nThe recipe below follows that published home method: a ghee-rubbed dough, one thin sheet brushed with ghee and rolled into a log, slow frying and a short dip.",
      "serves": "5-6 people (about 20 pieces)",
      "prep": "35 min + 20 min resting",
      "cook": "25 min",
      "equipment": [
        "Rolling pin and a smooth work surface",
        "Wide, shallow pan for frying - lets the pieces spread",
        "Second pan for the syrup",
        "Sharp knife - clean cuts show the layers",
        "Slotted spoon"
      ],
      "ingredients": [
        {
          "group": "Dough",
          "items": [
            "1 1/2 cups (190 g) maida - plus extra for dusting",
            "1 1/2 tbsp (20 g) ghee, room temperature - rubbed in for crispness",
            "1 pinch salt",
            "2 pinches baking soda (optional) - gives a lighter puff",
            "About 1/3 cup (80 ml) water - added gradually"
          ]
        },
        {
          "group": "Layering",
          "items": [
            "2 tsp ghee - brushed over the rolled sheet",
            "1 tbsp maida - dusted over the ghee"
          ]
        },
        {
          "group": "Frying",
          "items": [
            "About 750 ml oil - for deep frying; ghee can be used"
          ]
        },
        {
          "group": "Syrup",
          "items": [
            "3/4 cup (150 g) sugar",
            "1/2 cup (120 ml) water",
            "1/4 tsp cardamom powder",
            "1/2 tsp lemon juice - stops the sugar from crystallising"
          ]
        }
      ],
      "mise": [
        "Make the dough first so it can rest.",
        "Measure the syrup ingredients so you can start the syrup while the first batch fries.",
        "Dust the work surface with maida."
      ],
      "method": [
        {
          "title": "Make the dough",
          "text": "Mix the maida, salt and baking soda if using. Rub in the ghee until crumbly. Add water a little at a time and knead into a soft, pliable dough. Cover and rest 20 minutes, then knead for 2 minutes.",
          "why": "Resting relaxes the gluten so the dough rolls very thin.",
          "cue": "The dough is smooth, soft and springs back slowly."
        },
        {
          "title": "Roll one thin sheet",
          "text": "On a floured surface roll the dough into a large thin rectangle about 40 cm by 30 cm, as thin as you can manage (about 2 mm). Trim the rough edges to make them straight.",
          "why": "One thin sheet rolled up gives the many layers.",
          "cue": "The sheet is even, with straight edges, and does not tear when lifted."
        },
        {
          "title": "Spread ghee and roll",
          "text": "Brush 2 tsp ghee over the sheet and dust lightly with maida. Roll it up tightly from the 30 cm edge. Seal the last edge with a few drops of water.",
          "why": "Ghee between the folds keeps the layers separate when fried.",
          "cue": "The log is tight, even and uniform."
        },
        {
          "title": "Even the log and slice",
          "text": "Roll the log gently on the surface with both hands to even it and lengthen it to about 45-50 cm, then trim the ends. Cut into pieces about 2.5 cm (1 inch) thick. Press each piece lightly with your finger, then roll once, gently, with the pin to show the layers.",
          "why": "Pressing flat helps the layers open and cook through.",
          "cue": "Each piece shows a clear spiral of layers and holds together."
        },
        {
          "title": "Make the syrup",
          "text": "Dissolve the sugar in the water over medium heat, stirring until clear. Boil 5-7 minutes until a drop pulled between finger and thumb makes a single thin thread. Take off the heat and stir in the cardamom and lemon juice. Keep it warm; if it thickens, stir in a teaspoon of water and reheat gently.",
          "why": "One-string syrup coats the kaja without soaking it soft.",
          "cue": "A single, short thread forms between thumb and forefinger."
        },
        {
          "title": "Fry on the lowest heat",
          "text": "Heat the oil on the lowest flame. Test with a pinch of dough; it should rise slowly, not at once. Add 5-6 pieces. They take about 2 minutes to puff, then fry 5-7 minutes more, turning occasionally, until golden brown. If they rise instantly or bubble hard, switch off the heat for 2-3 minutes.",
          "why": "Slow frying cooks the layers right through and keeps the colour even.",
          "cue": "Pieces puff gradually and turn an even golden brown."
        },
        {
          "title": "Dip briefly",
          "text": "Lift the kaja with a slotted spoon, drain briefly, and drop it into the warm syrup. It should hiss and bubble. Turn it to coat and lift out after about 1 minute.",
          "why": "A short dip gives a glossy coat; a long soak dulls it.",
          "cue": "The kaja is glossy but still crisp."
        },
        {
          "title": "Dry",
          "text": "Spread the kaja on a plate and leave until it comes to room temperature and the glaze sets.",
          "why": "The glaze needs to dry for the crisp finish.",
          "cue": "The surface is dry to the touch."
        }
      ],
      "offering": "A festive sweet of coastal Andhra, made for weddings, Diwali and celebrations. At home it can be offered as ordinary festival naivedya; no specific temple rite is documented for it in the sources consulted.",
      "ritual": [
        "Make it on the morning of the festival and place a few pieces on a clean plate before the household deity.",
        "Light a lamp, offer with a short prayer, and share it with the family after."
      ],
      "serving": "Serve at room temperature with tea or coffee, two pieces each.",
      "storage": "Keeps in an airtight container for up to 15 days.",
      "troubleshooting": [
        {
          "problem": "The kaja is hard.",
          "fix": "The dough was too stiff or the log too tightly pressed. Keep the dough soft and roll the sheet very thin."
        },
        {
          "problem": "Brown but raw inside.",
          "fix": "The oil was too hot. Fry on the lowest flame."
        },
        {
          "problem": "Soggy after the dip.",
          "fix": "The syrup was too thin or the soak too long. Keep it one-string and dip for 1 minute."
        },
        {
          "problem": "Sugar crystallised.",
          "fix": "Add lemon juice to the syrup and warm it gently, adding a teaspoon of water if it thickens."
        }
      ],
      "variations": [
        "Gottam kaja is the hollow, cylindrical cousin where the syrup is held inside the shell; it uses a different rolling method.",
        "Some cooks use ghee for frying for a richer flavour."
      ],
      "tips": [
        "Roll the sheet into one long log instead of shaping each piece.",
        "Keep the syrup warm and at one string.",
        "Do not soak longer than a minute."
      ],
      "differs": "Andhra's madatha kaja is a single ghee-brushed sheet rolled into a log, fried on the lowest heat and dipped briefly in a light lemon-cardamom syrup."
    }
  ],
  "laddu": [
    {
      "id": "gujarat-churma",
      "region": "Gujarat & Rajasthan",
      "culture": "Gujarati and Marwari households — Ganesh Chaturthi, Diwali",
      "title": "Churma na Ladva (Gor Churma Laddu)",
      "intro": "Not a gram-flour or boondi laddu: coarse wheat dough is shaped into thick fingers (muthia), fried slowly in ghee, crushed to a sandy churma and bound with melted jaggery and more ghee. Rustic, crumbly and deeply wheaty.",
      "story": "Cookery writers describe churma laddu as a sweet of Gujarat and Rajasthan, made for Ganesh Chaturthi and Diwali (and, in one Gujarati account, Holi and weddings), and offered as bhog to Lord Ganesha. In Gujarati homes it is served with a thali of dal, vegetable curry and rice; in Rajasthan the same churma accompanies dal-baati.\n\nThe method is the identity of the sweet: coarse wheat dough with ghee rubbed in is shaped into thick muthia, fried on a low flame until cooked right through, cooled completely, then crushed. The published recipes stress that the muthia must be cool before they are ground, and that coarse flour gives the grainy crumb.\n\nThe binder is gor (jaggery), mixed with ghee, which makes the laddu darker and more caramel-flavoured than sugar versions. Some cooks add nuts, poppy seeds or sugar candy, though one Gujarati account says the traditional recipe has no dry fruit.",
      "serves": "6-7 people (12 laddus of about 60 g)",
      "prep": "25 min",
      "cook": "45 min",
      "equipment": [
        "Small deep heavy kadai (20-22 cm) - holds the ghee deep enough to fry the muthia evenly without scorching",
        "Slotted spoon — to lift the muthia out and drain them",
        "Mixer-grinder or heavy mortar — to crush the cooled muthia to a coarse crumb; a rolling pin and clean cloth also work",
        "Wide steel plate or parat — for mixing the churma with jaggery by hand",
        "Small saucepan — to melt the jaggery without water"
      ],
      "ingredients": [
        {
          "group": "Muthia (dough)",
          "items": [
            "2½ cups (320 g) coarse whole-wheat flour (karkara atta) — coarse flour is what gives the grainy churma; if only fine atta is available, replace 3 tbsp of it with fine semolina",
            "¼ cup (50 g) ghee, melted — rubbed in to make the dough short and crumbly",
            "½ cup (120 ml) lukewarm water, approximately — add gradually; the dough must be stiff",
            "Ghee or oil for frying, about 2 cups (400 ml) - comes about halfway up the muthia in a small deep kadai; they are turned during frying; strain and reuse the rest"
          ]
        },
        {
          "group": "To bind and flavour",
          "items": [
            "1 cup (about 200 g) grated jaggery (gor) — dark, soft jaggery melts best; remove any grit",
            "⅓ cup (70 g) ghee - plus 1 tbsp more if the mixture seems dry",
            "2 tbsp chopped almonds — optional but traditional in many homes",
            "2 tbsp chopped cashews",
            "2 tbsp raisins",
            "½ tsp cardamom powder",
            "A pinch of freshly grated nutmeg (jaiphal)",
            "2 tbsp white poppy seeds (khus khus) — for coating the laddus"
          ]
        }
      ],
      "mise": [
        "Grate the jaggery and pick out any stones or fibres.",
        "Chop the almonds and cashews; keep the raisins ready.",
        "Dry-roast the poppy seeds for 30 seconds on low heat, until fragrant but not coloured, and tip them onto a plate.",
        "Keep a plate lined with kitchen paper for draining the fried muthia.",
        "Have a bowl of ghee within reach for greasing palms while shaping."
      ],
      "method": [
        {
          "title": "Make the stiff dough",
          "text": "Mix the coarse flour with ¼ cup melted ghee and rub it between your palms until the flour holds together when squeezed. Add the lukewarm water a spoonful at a time and knead for 3–4 minutes into a firm, stiff dough. Cover and rest for 10 minutes.",
          "why": "The ghee rub keeps the fried dough short and crumbly; too much water makes it hard and dense and it will not crumble well.",
          "cue": "The dough is firm, does not stick to your hands, and holds a fingerprint without springing back."
        },
        {
          "title": "Shape the muthia",
          "text": "Divide the dough into 12 portions and shape each into a thick oblong dumpling about 7 cm long and 3 cm thick, pressing it firmly in your palm so the surface has a few natural cracks.",
          "why": "Thick pieces fry into a crust with a tender centre; thin ones go hard and give a dusty churma.",
          "cue": "Each muthia is compact, with no loose crumbs, and slightly cracked on the surface."
        },
        {
          "title": "Fry on very low heat",
          "text": "Heat the ghee in the kadai on low heat until a pinch of dough sinks and rises slowly with a few bubbles. Slide in 4-5 muthia at a time. Fry for 12-15 minutes, turning every 3 minutes so all sides brown, until deep golden brown. Prick one with a knife near the end.",
          "why": "High heat browns the outside while the centre stays raw and pasty; slow frying cooks the wheat through, which is what makes the churma crumble and taste nutty.",
          "cue": "The surface is deep golden and crisp, and a knife pushed into the centre comes out clean and dry."
        },
        {
          "title": "Drain and cool completely",
          "text": "Lift the muthia onto the paper-lined plate and leave them for 30 minutes, until they feel cool and firm to the touch.",
          "why": "Crushing them hot makes the churma clump into paste and the jaggery then turns the mixture heavy.",
          "cue": "A muthia snaps cleanly and no steam or warmth remains inside."
        },
        {
          "title": "Crush to churma",
          "text": "Break the muthia into pieces and pulse in a mixer in short bursts, or pound in a mortar, to a coarse sandy crumb with a few small granules. Sieve through a coarse strainer and re-crush any large pieces.",
          "why": "A coarse, uneven crumb keeps the laddu light; a fine powder makes it sticky and pasty.",
          "cue": "The churma looks like moist breadcrumbs, mostly the size of rice grains, and clumps lightly when pressed."
        },
        {
          "title": "Roast the nuts and melt the jaggery",
          "text": "Heat ⅓ cup ghee in a small pan on low heat. Add the almonds and cashews and roast for 1½ minutes until pale gold, then add the raisins until they puff, about 20 seconds. Lift out with a slotted spoon. In the same ghee, add the grated jaggery and warm on the lowest heat for 2–3 minutes, stirring, only until it melts into a smooth liquid. Switch off at once.",
          "why": "Jaggery should be just melted, not cooked to a syrup: overcooked jaggery sets hard and the laddus become rock-like once cool.",
          "cue": "The jaggery and ghee form a glossy, pourable, light brown liquid with no lumps and no darkening."
        },
        {
          "title": "Combine",
          "text": "Tip the churma onto the steel plate, add the cardamom, nutmeg and roasted nuts, and pour the warm jaggery-ghee mixture over it. Mix with a spoon, then with your hands once it is comfortable to touch. Add 1 tbsp more melted ghee if it feels dry.",
          "why": "Warm jaggery coats the grains evenly; if it is allowed to go cold it cannot bind the crumb.",
          "cue": "A pinch pressed in the palm holds its shape and does not crumble when released."
        },
        {
          "title": "Shape and coat",
          "text": "While the mixture is still warm, grease your palms lightly with ghee. Take a portion of about 60 g, press firmly and roll into a round laddu. Roll each one in the toasted poppy seeds and rest on a plate for 1 hour.",
          "why": "Firm pressing is what binds the laddu; waiting until the mixture is cold makes shaping impossible, and the rest lets the jaggery set.",
          "cue": "The laddus are round, hold their shape when lifted, and feel dry and firm after an hour."
        }
      ],
      "offering": "Offered as bhog to Lord Ganesha (especially on Ganesh Chaturthi) and at Diwali puja; two or three laddus on a leaf or small plate, then shared as prasad.",
      "ritual": [
        "Bathe, wear clean clothes and prepare the laddus before the puja without tasting them.",
        "Place two or three laddus on a clean steel plate or banana leaf, with a tulsi leaf or a few durva blades if the family follows that custom.",
        "After the aarti, place the plate before the deity, sprinkle a little water around it and offer it with a short prayer while the lamp is lit.",
        "Leave it for a few minutes, then take it as prasad and distribute it, starting with the eldest, to everyone present and to neighbours."
      ],
      "serving": "Serve at room temperature, one laddu per person, on a festive thali or on its own. In Rajasthani homes crumbled churma is also eaten with dal-baati, but as prasad it is always shaped.",
      "storage": "Keep in an airtight container at room temperature for up to a week; cooler months suit it best. In hot weather refrigerate and bring back to room temperature before serving.",
      "troubleshooting": [
        {
          "problem": "The laddus fall apart when I shape them.",
          "fix": "The mixture is too dry or too cool. Add 1–2 tbsp warm melted ghee and press harder, or rewarm the plate-ful briefly over a pan of hot water."
        },
        {
          "problem": "The laddus are hard.",
          "fix": "The jaggery was cooked to a syrup, or too little ghee was used. Melt it just until liquid next time and keep the ghee at ⅓ cup."
        },
        {
          "problem": "The churma tastes raw or pasty.",
          "fix": "The muthia were fried too fast or were too large. Fry on low heat for the full 12–15 minutes and test with a knife."
        },
        {
          "problem": "The mixture is greasy and will not hold.",
          "fix": "Too much ghee was added at once. Add a few tablespoons of extra churma or roasted fine semolina and mix again."
        }
      ],
      "variations": [
        "Some published recipes add 1-2 tbsp roasted gram flour (besan) and semolina to the dough for texture.",
        "An oven-baked version (Archana's Kitchen) bakes the dough balls at 180 C for 20-30 minutes instead of frying; lighter but different.",
        "Add 2 tbsp sugar candy pieces (mishri) for crunch, or sun-dried coconut (coconut shortens keeping time).",
        "Some cooks use sugar instead of jaggery for a paler laddu."
      ],
      "tips": [
        "Coarse flour matters more than any other choice; fine flour gives a sticky laddu.",
        "Fry on low heat and test the centre with a knife.",
        "Cool the churma fully, then add warm — not hot — jaggery.",
        "Do not add water to the jaggery.",
        "For Jain or no-onion-garlic offerings the recipe has no onion, garlic or root vegetables as written."
      ],
      "differs": "Wheat churma bound with jaggery and ghee; no gram flour, no boondi, no sugar syrup."
    }
  ],
  "narkel-naru-sandesh": [
    {
      "id": "assam-narikol-laru",
      "region": "Assam",
      "culture": "Assamese households — Magh (Bhogali) Bihu",
      "title": "Narikol Laru",
      "intro": "Assam's coconut laddu is the simplest of the family: fresh coconut dry-roasted in an open pan, sweetened with sugar and rolled while warm. There is no khoa and no flour; it is pale, soft and tastes of coconut.",
      "story": "Narikol means coconut in Assamese and laru is the Assamese form of laddu. Laru is among the foods typically made for Magh Bihu, the mid-January harvest festival also called Bhogali Bihu (bhog means feast); on Uruka, the eve, homes prepare laru, pitha, chira and curd for the next day. Narikol laru is also described as made regularly in Assamese homes, not only at Bihu.\n\nOn Bihu morning the meji, a stack of logs, bamboo or hay, is lit and prayers are offered for a safe hearth and a good year; published accounts list pitha and other foods among the offerings. No source we found describes a specific rite for laru, so the offering below is left to your family's custom.\n\nPublished recipes use grated coconut and sugar (one adds optional semolina); a jaggery version is a common home swap but we did not find it documented, so it is given only as an untested variation.",
      "serves": "14–16 laru",
      "prep": "15 min",
      "cook": "20 min",
      "equipment": [
        "Heavy kadai or non-stick pan — open pan so moisture can evaporate",
        "Flat wooden spatula",
        "Plate for cooling"
      ],
      "ingredients": [
        {
          "group": "Laru",
          "items": [
            "2 cups lightly packed (200 g) finely grated fresh coconut — white flesh only; brown skin turns the laru grey and bitter",
            "1/2 cup (100 g) sugar",
            "2–3 green cardamom pods, powdered (about 1/4 tsp) — optional",
            "1 tsp ghee — optional, and it makes the dish non-vegan"
          ]
        }
      ],
      "mise": [
        "Grate the coconut finely, white flesh only; squeeze lightly if wet.",
        "Powder the cardamom.",
        "Grease your palms lightly or keep a bowl of water for wetting them."
      ],
      "method": [
        {
          "title": "Warm the pan",
          "text": "Heat a heavy pan on low to medium heat. Add the ghee, if using, then the coconut.",
          "why": "A pan that is too hot toasts the coconut brown before it dries.",
          "cue": "Fine steam rises and a coconut smell begins."
        },
        {
          "title": "Dry the coconut",
          "text": "Stir continuously for 5–7 minutes until the raw smell fades and the coconut feels lighter and drier. Keep it white or barely golden.",
          "why": "Removing the moisture first lets the sugar bind rather than turn to syrup.",
          "cue": "The shreds look dry and separate and do not stick together."
        },
        {
          "title": "Add the sugar",
          "text": "Add the sugar. It melts into a wet, glossy mixture within about 2 minutes. Keep stirring on low heat.",
          "why": "The sugar needs to dissolve into the coconut's own moisture; a hot pan crystallises it.",
          "cue": "The mixture looks glossy and wet."
        },
        {
          "title": "Cook until it binds",
          "text": "Cook 6–10 minutes more, stirring, until the mixture thickens and gathers into one mass that pulls away from the sides. Take a little on a spoon, cool it for 30 seconds and roll it: it should hold.",
          "why": "Undercooked mix falls apart; overcooked turns hard like toffee.",
          "cue": "A cooled pinch rolls into a ball that holds its shape."
        },
        {
          "title": "Add cardamom and shape",
          "text": "Stir in the cardamom and take off the heat. While still warm, roll about 1 tablespoon at a time into firm balls, wetting or greasing palms. If it firms up, warm briefly on the stove.",
          "why": "The mixture sets as it cools; shaping must be done warm.",
          "cue": "Smooth, even balls with no cracks."
        },
        {
          "title": "Cool completely",
          "text": "Set the laru on a plate and cool for 30 minutes before offering or storing.",
          "why": "Warm laru stored in a box sweat and turn soft.",
          "cue": "Cool and set to the touch."
        }
      ],
      "offering": "Laru is shared with the Bihu feast and with visitors. No source documents a laru-specific offering; if your family places sweets before the shrine, set a few aside untasted.",
      "ritual": [
        "Make the laru before the feast; set a few aside untasted if your family offers sweets at the home shrine.",
        "Offer a short prayer in your family's way, then serve elders and visitors, with tea.",
        "Customs vary by family and region; follow your elders."
      ],
      "serving": "Serve at room temperature with pitha and tea.",
      "storage": "Airtight container for about a day in cool weather; refrigerate for 4–5 days and bring to room temperature before serving.",
      "troubleshooting": [
        {
          "problem": "The laru crumble.",
          "fix": "The mixture was undercooked. Return to low heat for a minute or two, stirring, then test again; if it is very dry, sprinkle a teaspoon of water."
        },
        {
          "problem": "The laru are hard.",
          "fix": "Overcooked. Next time test a pinch before taking off the heat."
        },
        {
          "problem": "The laru are grey.",
          "fix": "Brown coconut skin was included. Use only white flesh."
        }
      ],
      "variations": [
        "Jaggery version (untested here): about 120 g (2/3 cup) grated jaggery melted with 2 tbsp water and strained, cooked down until it holds a roll; the laru are brown and softer.",
        "Desiccated coconut: 120 g (1 1/2 cups) soaked 15 minutes in about 100 ml warm water or milk; cook for less time.",
        "Roll the laru in extra desiccated coconut."
      ],
      "tips": [
        "Use fresh coconut.",
        "Do not hurry the first drying stage.",
        "Shape while warm."
      ],
      "differs": "Assam's laru is plain coconut and sugar roasted in an open pan, with no jaggery syrup, ghee or chhena sweet alongside."
    }
  ],
  "diwali-faral": [
    {
      "id": "goa-godshe-fov",
      "region": "Goa",
      "culture": "Goan Hindu (Saraswat and other Konkani) households — Diwali morning",
      "title": "Kalayle Fov and Rosantle Fov (Godshe Fov)",
      "intro": "In Goa the Diwali morning plate is built on fov, flattened rice, not on fried faral. The two sweet classics are kalayle fov (washed fov mixed by hand with fresh coconut and jaggery) and rosantle fov (fov soaked in jaggery-sweetened coconut milk). Nothing is fried and nothing is cooked for long.",
      "story": "In Goa, fov (flattened rice) is the main breakfast on Diwali, eaten after the morning puja, and families make it in many forms. Goan food writing lists sweet kalayle (godh) fov, mixed by hand with coconut and jaggery, and rosantle fov, made with coconut milk and jaggery and sometimes infused with turmeric leaves, alongside batat fov (potato, coconut, green chilli, coriander) and milk, buttermilk, curd and kokum versions. Leftover fov is soaked overnight in coconut milk and jaggery and eaten the next morning as kitkitayille fov.\n\nGoan accounts, as reported by food writers, connect fov to Krishna: Sudama brought him poha, the only gift he could afford, and after Krishna defeated Narakasura people are said to have made him poha in celebration.\n\nPublished recipes give few quantities for these (for example 1 cup fov, 1/2 cup coconut and 2 1/2 tbsp jaggery for kalayle; 1 cup fov to 400 ml coconut milk and 4 tbsp jaggery for a cooked rosantle). The quantities below are a home-cook scaling; families vary by hand and by the thickness of their fov.",
      "serves": "4–5 people (one small bowl each of both versions)",
      "prep": "25 min",
      "cook": "5 min",
      "equipment": [
        "Wide mixing bowl — fov must be tossed gently without breaking",
        "Grater or coconut scraper — fresh coconut is the heart of both versions",
        "Blender and fine muslin — to extract thick coconut milk for the rosantle version",
        "Small saucepan — to melt the jaggery"
      ],
      "ingredients": [
        {
          "group": "Kalayle fov (dry, hand-mixed)",
          "items": [
            "1 cup (about 80 g) thick fov (thick flattened rice) — jaadi/brown fov is traditional; thin poha turns to paste",
            "1/2 cup (45 g) freshly grated coconut — fresh only; desiccated coconut does not moisten the fov",
            "1/4 cup (50 g) grated jaggery — soft, clean jaggery that dissolves with a few drops of water",
            "1/4 tsp cardamom powder — freshly ground",
            "1 pinch salt — lifts the sweetness"
          ]
        },
        {
          "group": "Rosantle fov (in coconut milk)",
          "items": [
            "1 cup (about 80 g) thick fov",
            "1 cup (90 g) freshly grated coconut — ground and squeezed for milk",
            "1 cup (240 ml) warm water — to grind the coconut; gives about 1 1/4 cups (275 ml) thick milk",
            "1/4 cup (50 g) grated jaggery — melted with 2 tbsp water",
            "1/4 tsp cardamom powder",
            "1 pinch salt"
          ]
        }
      ],
      "mise": [
        "Soak each portion of fov separately in cool water for 2–3 minutes, then drain well in a sieve; never longer.",
        "Grate all the coconut (1 1/2 cups in total) and divide it as above.",
        "Melt the 2 portions of jaggery separately (see method) and strain out grit.",
        "Have two clean serving bowls ready, one for each version."
      ],
      "method": [
        {
          "title": "Soak and drain the fov for both versions",
          "text": "Put each cup of fov in a bowl, cover with cool water for 2–3 minutes, then drain in a sieve and leave 5 minutes. Published recipes soak thick fov for about 3–5 minutes; thin poha needs only a quick rinse.",
          "why": "Thick fov is hard; a short soak softens it while the core stays firm, so it does not turn pasty.",
          "cue": "The flakes feel damp and pliable, not wet or slimy."
        },
        {
          "title": "Dissolve the jaggery",
          "text": "For the kalayle fov, sprinkle 1 tablespoon of water over 1/4 cup (50 g) jaggery in a small pan and warm on the lowest heat for 2 minutes, stirring, until a loose syrup forms. For the rosantle fov, melt the second 1/4 cup (50 g) jaggery with 2 tablespoons of water the same way and strain it.",
          "why": "A pre-melted syrup coats the fov evenly; raw grated jaggery leaves sweet and bland patches.",
          "cue": "The syrup is fully liquid, pourable, with no lumps."
        },
        {
          "title": "Make the kalayle fov",
          "text": "Put the drained fov in a bowl, add the coconut, cardamom and salt, pour over the jaggery syrup and toss with your fingertips, lifting from the bottom for about 1 minute. Cover and rest 10 minutes.",
          "why": "The resting time lets the flakes drink the syrup; eaten at once, the fov is hard and the sweetness sits on the outside.",
          "cue": "The flakes are glossy, softened, and clump lightly in a squeezed fist."
        },
        {
          "title": "Extract the coconut milk",
          "text": "Grind the 1 cup (90 g) coconut with 1 cup (240 ml) warm water in a blender for 1 minute. Squeeze through muslin, pressing hard, to get about 1 1/4 cups (275 ml) of thick milk.",
          "why": "Thin, watery milk makes a soupy dish; this rosantle is meant to be creamy.",
          "cue": "The milk is opaque white and coats the back of a spoon."
        },
        {
          "title": "Sweeten the milk",
          "text": "Stir the melted jaggery, cardamom and salt into the coconut milk. Taste: it should be clearly sweet, as the fov will dilute it.",
          "why": "Seasoning the milk first lets you correct it before the fov absorbs it.",
          "cue": "Smooth, pale caramel-coloured milk with a cardamom scent."
        },
        {
          "title": "Soak the fov in the milk",
          "text": "Add the drained fov to the milk, fold once, and leave 10–15 minutes without stirring more.",
          "why": "The flakes must plump slowly; stirring breaks them.",
          "cue": "The flakes have swollen and absorbed most of the milk, but still hold a little bite."
        },
        {
          "title": "Serve at once",
          "text": "Serve the kalayle fov at room temperature and the rosantle fov at room temperature or slightly chilled, in small bowls, after the offering.",
          "why": "Both stiffen within an hour; the rosantle keeps drinking milk and goes thick.",
          "cue": "If the rosantle has thickened, loosen with 2 tablespoons of coconut milk or water."
        }
      ],
      "offering": "Offered after the morning puja on Diwali morning, in small bowls, and eaten as the Diwali breakfast. Some households also place a portion outside for ancestors.",
      "ritual": [
        "After the oil bath and morning prayers, place a small bowl each of kalayle fov and rosantle fov before the household deity with a lamp lit, if your family does so.",
        "Some Goan households place some prepared fov outside as an offering to ancestors.",
        "Separately, on tulsi lagin (a later day, also called vhadli Diwali), dry fov, sugarcane, raw tamarind, amla and coconut pieces are mixed and thrown towards the tulsi plant while children try to catch them, and the rest is shared as prasad. Follow your own family's practice.",
        "Serve elders first, then everyone."
      ],
      "serving": "Serve in small bowls as a breakfast course with tea. Set the dry and the milk versions side by side.",
      "storage": "Best within 2–3 hours. Leftover fov can be soaked overnight in coconut milk and jaggery and eaten next morning, as kitkitayille fov. Do not keep the kalayle version more than a day; fresh coconut spoils quickly in warm weather.",
      "troubleshooting": [
        {
          "problem": "The fov is hard in the middle.",
          "fix": "The fov was too thick or the rest was too short. Rest another 10 minutes, or sprinkle 1–2 tablespoons of warm milk or water and toss."
        },
        {
          "problem": "The rosantle fov is soupy.",
          "fix": "The coconut milk was too thin or the fov too wet. Next time grind with less water, or let it stand 10 more minutes; the fov will take up more liquid."
        },
        {
          "problem": "The fov turned pasty.",
          "fix": "Thin poha or too long a soak. Use thick fov and soak no more than 3 minutes."
        }
      ],
      "variations": [
        "Cooked rosantle: simmer 1 cup fov with about 400 ml coconut milk and 4 tbsp jaggery, adding cardamom and a pinch of salt as it boils, and serve warm (one published method).",
        "Batat fov for the savoury side of the plate: a tempering of mustard seeds, green chilli, coriander and curry leaves with boiled potato and coconut. This is not jain.",
        "Doodhantle fov: 1 cup fov in 2 1/2 cups milk with 4 tsp sugar, 4 crushed cardamoms and a pinch of salt, served warm or cold (Goya recipe). Not vegan."
      ],
      "tips": [
        "Fresh coconut matters more than anything else here.",
        "Serve within hours; fov stiffens as it stands.",
        "Do not use thin poha for a long soak."
      ],
      "differs": "Goa's Diwali breakfast is built on flattened rice (fov) in fresh-coconut and jaggery forms, not fried faral."
    },
    {
      "id": "goa-tikshe-fov",
      "region": "Goa",
      "culture": "Goan Hindu households — Diwali faral",
      "title": "Tikshe Fov (Chikkiche Godh Fov)",
      "intro": "Goa's answer to chivda: crisp fried flattened rice bound with a peppery, chilli-hot jaggery caramel, then loaded with peanuts, roasted chana dal, sesame and dry coconut. It is sticky, sweet and sharp at once, and keeps for weeks.",
      "story": "Tikshe fov (tikshe means spicy or sharp) is described by Goan food writers as a sticky, spicy, jaggery-based fov, in high demand at Diwali, which home cooks make and sell with other faral items. Goya's feature calls it a favourite and lists it among the Diwali fov preparations.\n\nIt is made by frying thick fov until it puffs, then folding it with roasted chana dal, peanuts, sesame and coconut into a chilli-and-pepper jaggery syrup cooked to a firm ball. The proportions here follow the home recipe published by Goya (Manorathi Madkaikar), which also appears on Bongong; it notes that Goan sticky jaggery (chikki godh) cannot be replaced with ordinary jaggery.",
      "serves": "12–15 people (about 4 cups)",
      "prep": "20 min",
      "cook": "50 min",
      "equipment": [
        "Deep kadai — to fry the fov in 2 cups of oil",
        "Heavy-bottomed wide pan — jaggery with spices catches quickly",
        "Small grinder or mortar — for the chilli paste",
        "Bowl of cold water — to test the jaggery"
      ],
      "ingredients": [
        {
          "group": "Fov and add-ins",
          "items": [
            "2/3 cup (about 55 g) thick flat rice (fov)",
            "1/2 cup roasted chana dal (about 65 g)",
            "1/2 cup roasted, peeled peanuts (about 70 g)",
            "1/4 cup (35 g) sesame seeds — toasted if raw",
            "1/2 cup (40 g) dry desiccated coconut",
            "2 cups (480 ml) oil — for frying the fov; most is drained away"
          ]
        },
        {
          "group": "Spice paste and jaggery",
          "items": [
            "10 dried red chillies — reduce to 5–6 for a milder snack",
            "1/2 tsp black peppercorns",
            "1/4 tsp methi (fenugreek) seeds",
            "5 g raw asafoetida (a small lump) — or 1/4 tsp powder",
            "3 green chillies — fried until slightly brown",
            "1/4 kg (250 g) hard sticky jaggery (chikkiche godh) — dark, firm jaggery that sets to a ball",
            "1/2 tsp salt",
            "1/2 tsp turmeric powder",
            "Juice of 1/2 lime"
          ]
        }
      ],
      "mise": [
        "Roast the chana dal and peanuts and cool; peel the peanuts.",
        "Grate or break the jaggery into small pieces.",
        "Have the grinder, a bowl of cold water, a lined tray and a clean spoon ready before you start the jaggery.",
        "Slit the green chillies lengthwise."
      ],
      "method": [
        {
          "title": "Fry the fov until puffed",
          "text": "Heat 2 cups of oil in a kadai to 170–180 degrees C (a flake rises in 2 seconds). Fry the fov in two or three batches for 5–10 seconds each until it puffs and turns pale. Drain on paper towels.",
          "why": "The fov must puff and dry out so it stays crisp inside the sticky syrup.",
          "cue": "The flakes swell, float and turn white; a fried flake snaps clean."
        },
        {
          "title": "Fry the spices",
          "text": "In 1 tbsp of the same oil, fry the dried red chillies, peppercorns, fenugreek and asafoetida on low heat for about 1 minute until fragrant, taking care not to burn the fenugreek.",
          "why": "Frying releases the spices' oil-soluble flavour and mellows the raw chilli.",
          "cue": "A sharp, toasted smell rises and the chillies darken slightly."
        },
        {
          "title": "Grind to a paste",
          "text": "Grind the fried spices with 1/4 cup (60 ml) water to a fine paste.",
          "why": "A smooth paste distributes evenly through the jaggery; coarse bits burn.",
          "cue": "A thick, brick-red paste."
        },
        {
          "title": "Fry the green chillies and melt the jaggery",
          "text": "In a heavy pan, heat 1 tbsp oil and fry the slit green chillies until slightly brown. Lower the heat, add the jaggery and stir until melted.",
          "why": "Browned chillies add a roasted heat to the syrup.",
          "cue": "The jaggery is a smooth liquid with no lumps."
        },
        {
          "title": "Cook the spiced jaggery",
          "text": "Add the spice paste, turmeric and salt and cook on low heat for 20–30 minutes, stirring often, until sticky. Test: drop a little into cold water. It should form a ball without dissolving. If it dissolves, keep cooking.",
          "why": "The syrup must reach hard-ball stage; if undercooked, the snack stays tacky and never crisps.",
          "cue": "A dropped bead forms a firm ball that does not melt in water."
        },
        {
          "title": "Finish the syrup",
          "text": "Stir in the lime juice and desiccated coconut and cook 2–3 minutes. Switch off the heat.",
          "why": "Lime cuts the sweetness and keeps the syrup loose enough to coat.",
          "cue": "The mixture is thick, glossy and drags slowly off the spoon."
        },
        {
          "title": "Fold in the add-ins",
          "text": "Immediately add the sesame, chana dal and peanuts, then the fried fov. Fold quickly with a flat spoon until everything is coated. Spread on a lined tray and cool completely, breaking into clusters.",
          "why": "The syrup sets as it cools. Fold fast, or it hardens in lumps.",
          "cue": "Everything is coated and the clusters crisp as they cool."
        }
      ],
      "offering": "Placed on the faral platter and shared with family and visitors; offer it before the household deity if your family does so.",
      "ritual": [
        "Set a small portion of tikshe fov on the faral plate with the other sweets and savouries.",
        "Offer the plate before the household deity with a lamp, if that is your family's custom.",
        "Share the faral with family first, then neighbours and visitors."
      ],
      "serving": "Serve in small bowls on the faral platter with tea. Eat in small portions; it is hot and sweet.",
      "storage": "Cool completely and store in an airtight tin for up to a month in a cool place, as the source recipe says.",
      "troubleshooting": [
        {
          "problem": "The fov turns soft and sticky.",
          "fix": "The jaggery was undercooked or the fov was not fried dry. Cook the jaggery to firm-ball stage and fry the fov until crisp."
        },
        {
          "problem": "It is too hot.",
          "fix": "Use 5–6 dried chillies and 1–2 green; the full quantity is very hot."
        },
        {
          "problem": "The jaggery hardened before mixing.",
          "fix": "Warm the pan on low heat for 30 seconds and fold fast; have everything measured before starting."
        }
      ],
      "variations": [
        "Reduce the chillies for children.",
        "Add cashews or raisins at the end (not in the published recipe)."
      ],
      "tips": [
        "Test the jaggery in cold water; do not go by time alone.",
        "Have all add-ins ready before the syrup is done.",
        "Use Goan chikki godh or another hard, sticky jaggery; soft jaggery stays tacky.",
        "Hot jaggery burns badly: keep children away while it cooks."
      ],
      "differs": "Goa's tikshe fov binds fried flattened rice in chilli-spiked jaggery, a sticky counterpart to dry chivda."
    }
  ],
  "sunthavda": [
    {
      "id": "dry-powder-janmashtami",
      "region": "Maharashtra",
      "culture": "Marathi households - Janmashtami (Gokulashtami) and pooja naivedya",
      "title": "Sunthwada (dry-powder kind)",
      "intro": "A fine, ghee-free dry mix: dry ginger, roasted fennel, sesame, poppy seeds and coriander seed ground with dry dates, nuts and two kinds of sugar, then tossed with crushed dry coconut and raisins. It is a fragrant, sandy-soft powder, spooned out rather than rolled, and noticeably lighter and less greasy than the ghee-roasted crumble.",
      "story": "In Maharashtra, home cooks describe sunthwada as a customary naivedya for Krishna's Janmashtami puja, sometimes said to be incomplete without it, and it is served in small amounts because dry ginger is strong.\n\nThis form is built from roasted whole spices and seeds rather than from ginger fried in ghee. Everything is roasted separately, cooled, ground and mixed, so the whole mix keeps for weeks and can be made days before the festival. Because it uses dry dates (kharik) and rock sugar, it is gently sweet.\n\nProportions of ginger, seeds and sugar differ between households; the quantities below blend the two published home versions into a mild, balanced mix.",
      "serves": "15-20 small spoonfuls (about 175 g / 1 1/4 cups)",
      "prep": "15 min",
      "cook": "12 min",
      "equipment": [
        "Heavy dry pan or tawa - for roasting each ingredient separately on low heat",
        "Spice grinder or mixer jar - to powder the seeds, ginger and sugar; use short pulses so the dates do not turn to paste",
        "Wide plate - to cool every roasted ingredient fully before grinding",
        "Airtight steel or glass jar - the mix is dry and must stay dry"
      ],
      "ingredients": [
        {
          "group": "Roast separately",
          "items": [
            "8 almonds - whole",
            "8 cashews - whole",
            "1/4 cup (40 g) dry dates (kharik), pitted and chopped - they soften and puff slightly; they give sweetness and bind the powder",
            "1 tbsp fennel seeds (saunf) - the mildest sweet aroma in the mix",
            "1 tbsp poppy seeds (khus-khus) - white; roast until just fragrant",
            "1 tsp sesame seeds",
            "1 tsp coriander seeds",
            "1/2 cup (40 g) dry desiccated or sliced dry coconut (kopra) - kept coarse, not ground"
          ]
        },
        {
          "group": "Grind and mix",
          "items": [
            "1 1/2 tbsp dry ginger powder (sunth) - fresh, strongly scented powder; stale powder tastes dusty",
            "2 tbsp powdered sugar - fine, so it blends with the seeds",
            "1 tbsp rock sugar (mishri), broken - grinds to a crisp, cool sweetness",
            "5 green cardamom pods, seeds only (about 1/2 tsp) - softens the ginger",
            "1 tbsp raisins - added whole at the end",
            "1 tsp chironji (charoli) - optional; whole, added at the end"
          ]
        }
      ],
      "mise": [
        "Remove the date pits and chop the dates; wash and dry the raisins.",
        "Break the rock sugar into small pieces so the grinder blade bites it.",
        "Keep six small plates ready: each ingredient is roasted and cooled separately.",
        "Wipe the grinder jar completely dry - any moisture will make the powder clump."
      ],
      "method": [
        {
          "title": "Roast the nuts",
          "text": "Heat the dry pan on low. Roast the almonds and cashews together for 3-4 minutes, shaking the pan, until they smell toasty and the cashews turn pale gold. Tip onto a plate.",
          "why": "Roasting deepens the nut flavour and makes them dry enough to grind to powder instead of oily paste.",
          "cue": "The cashews are light gold and the almonds make a faint crackle when pressed."
        },
        {
          "title": "Roast the dates",
          "text": "In the same pan on low, stir the chopped dates for about 2 minutes until they soften, puff slightly and smell caramel-sweet. Move to a plate.",
          "why": "Warm dates grind more evenly and lose their raw stickiness; if overheated they harden and burn.",
          "cue": "The pieces are soft and glossy, not dark or hard."
        },
        {
          "title": "Roast the seeds",
          "text": "Roast fennel, coriander seed, sesame and poppy seeds one after the other, each for 30-60 seconds on low heat, stirring constantly. Poppy and sesame take the least time. Cool each on a plate.",
          "why": "Each seed turns fragrant at a different moment; mixing them in one go burns the small ones before the large ones are ready.",
          "cue": "Fennel and coriander smell sweet and warm, sesame is pale gold, poppy seeds begin to crackle faintly."
        },
        {
          "title": "Roast the coconut",
          "text": "Roast the dry coconut for 1-2 minutes on low until very faintly golden. Cool on a plate and crush it between your palms into small flakes; keep it aside.",
          "why": "A light roast brings out sweetness; coconut darkens quickly and turns bitter.",
          "cue": "The flakes are cream-gold and smell of toasted coconut."
        },
        {
          "title": "Grind the base",
          "text": "When everything is fully cool, put the nuts, fennel, coriander seed, sesame, poppy seeds, cardamom seeds, dry ginger, rock sugar and powdered sugar in the grinder. Pulse in 4-5 short bursts until the mix is a fine, sandy powder. Add the roasted dates and pulse 2-3 times more, just to break them in.",
          "why": "Sugar and seeds grind best together; adding the dates last stops them clumping the powder. Short pulses prevent the nuts releasing oil.",
          "cue": "The powder is evenly pale brown, dry to the touch, with tiny date flecks and no damp lumps."
        },
        {
          "title": "Mix in the coconut and raisins",
          "text": "Tip the powder into a wide bowl. Add the crushed coconut, raisins and chironji, and mix thoroughly with a dry spoon for a minute.",
          "why": "The coconut and raisins give texture against the fine powder.",
          "cue": "Raisins and coconut flakes are spread evenly through the mix."
        },
        {
          "title": "Taste and balance",
          "text": "Taste a pinch. If the ginger bites too hard, stir in another 1-2 tablespoons of crushed coconut or a teaspoon of powdered sugar. Store the mix in a dry jar.",
          "why": "Dry ginger varies greatly in strength between packets; the ginger should warm, not sting.",
          "cue": "The first taste is sweet and nutty with a slow, gentle warmth at the end."
        }
      ],
      "offering": "Offered as naivedya during the Janmashtami puja alongside other Krishna foods, then distributed in small spoonfuls.",
      "ritual": [
        "Make the sunthwada a day ahead and keep it covered in its jar.",
        "On Janmashtami, spoon about 2-3 tablespoons into a small clean bowl and place it before Krishna with the other naivedya.",
        "After the offering, give each person a small spoonful in the palm; keep portions small because of the dry ginger."
      ],
      "serving": "Serve one teaspoon to one tablespoon per person on a leaf, in a small cup or directly in the palm. No accompaniment is needed.",
      "storage": "Keeps 2 weeks in an airtight jar at room temperature, away from moisture and sun. Do not refrigerate - condensation makes it clump.",
      "troubleshooting": [
        {
          "problem": "The powder is clumpy and oily.",
          "fix": "The nuts were ground too long or the dates were added too early. Pulse in short bursts, add dates last, and fold in 1 tbsp more crushed coconut to absorb oil."
        },
        {
          "problem": "It is too hot with ginger.",
          "fix": "Add crushed coconut and powdered sugar to dilute; next time use 1 tbsp ginger."
        },
        {
          "problem": "It tastes flat.",
          "fix": "Spices were under-roasted or the ginger is old. Dry-roast the fennel a little longer and buy fresh ginger powder."
        },
        {
          "problem": "It has gone soft after a few days.",
          "fix": "Moisture got in. Re-roast the powder on a dry pan for a minute on low heat, cool fully, and store in a drier jar."
        }
      ],
      "variations": [
        "Sugar only (no mishri) is acceptable; use 3 tbsp powdered sugar in total.",
        "Add 1 tbsp dried watermelon seeds or pistachios as published in other home versions.",
        "Replace cashews with extra almonds if preferred.",
        "Contains no onion, garlic, grain or ghee, so it suits fasting households whose rules allow dry ginger, dates and nuts."
      ],
      "tips": [
        "Cool every roasted item completely before grinding - warm seeds turn the powder pasty.",
        "Keep the coconut coarse, not powdered, so the mix has some bite.",
        "Use short pulses; the grinder jar heats and turns nuts oily.",
        "Serve small portions - dry ginger is strong."
      ],
      "differs": "Dry-ground and ghee-free, built on roasted seeds, dates and two sugars rather than ginger roasted in ghee with jaggery."
    }
  ],
  "labra": [
    {
      "id": "bangladesh",
      "region": "Bangladesh (East Bengal tradition)",
      "culture": "Bangladeshi Hindu households and puja mandaps - Durga Puja bhog",
      "title": "Bhoger Labra (Bangladesh style)",
      "intro": "A ghee-cooked labra of gourds, papaya, pumpkin and roots, spiced with ginger and cumin-coriander paste, then finished with a separate panch phoron and red chilli chhonk. It uses more gourds and papaya than the usual Kolkata pandal labra, and some cooks add coconut.",
      "story": "Bangladeshi newspapers describe labra as a mixed vegetable dish made for puja, cooked without onion or garlic because it is a puja dish. UNB says it is offered to the goddesses as prasad; The Daily Star lists it on a puja menu with khichuri and says it is also eaten through the year, mostly at breakfast with rooti, paratha or luchi.\n\nThe two printed recipes draw on a wide range of vegetables: pumpkin, aubergine, green papaya, pointed gourd, ridge gourd, radish, cauliflower and carrot in one, and potato, sweet potato, taro, pumpkin, radish, carrot, raw banana, ridge gourd, cauliflower, cabbage, spinach and broad beans in the other. Fat is ghee in one and about 1/4 cup mustard oil with a spoon of ghee near the end in the other. Both use a cumin-based spice paste, panch phoron, bay leaf and dry red chilli, and neither uses onion or garlic.\n\nThe version below follows the first, ghee-led recipe, with coconut and mustard-oil frying from the second noted in the variations. The printed recipes give few quantities, so the amounts here are reasoned out for a family-size pot and untested.",
      "serves": "8 servings",
      "prep": "35 min",
      "cook": "40 min",
      "equipment": [
        "Wide heavy kadai or pot with a lid - the vegetables must cook in their own steam",
        "Small tadka pan - for the final panch phoron chhonk",
        "Sharp knife and board - cut every vegetable into similar 3 cm pieces",
        "Mortar or grinder - for the ginger, cumin, coriander and optional coconut paste"
      ],
      "ingredients": [
        {
          "group": "Vegetables (about 1.5 kg after peeling)",
          "items": [
            "250 g pumpkin, peeled, in 3 cm cubes - sweet, breaks down to thicken the gravy",
            "200 g brinjal (1 medium), in 3 cm cubes - soak in salt water so it keeps its colour",
            "150 g green papaya, peeled, in 3 cm cubes - mild and absorbent",
            "150 g pointed gourd (parwal, 4 small), peeled in strips and halved - holds its shape",
            "150 g ridge gourd (1), peeled and cut in 3 cm pieces - releases water, so cook it last",
            "100 g radish, in thick half-moons",
            "100 g carrot (1 medium), in thick rounds",
            "150 g sweet potato, in 3 cm cubes",
            "200 g cauliflower (about 10 florets) - medium florets, not tiny",
            "100 g broad beans, strings removed, in 3 cm pieces"
          ]
        },
        {
          "group": "Paste and spices",
          "items": [
            "1 tbsp ginger paste - the only pungent aromatic, in place of onion and garlic",
            "1 tsp ground cumin (or cumin paste)",
            "1 tsp ground coriander (or coriander paste)",
            "1/2 tsp turmeric",
            "1/2 tsp red chilli powder - optional, for mild heat",
            "1/3 cup (30 g) grated fresh coconut - optional; grind with 2 tbsp water to a smooth paste",
            "2 bay leaves (tejpata)",
            "2 whole dry red chillies",
            "1 1/2 tsp salt",
            "1 tsp sugar"
          ]
        },
        {
          "group": "Fat and chhonk",
          "items": [
            "3 tbsp ghee, divided - 2 tbsp for cooking, 1 tbsp for the chhonk",
            "1 tsp panch phoron - equal parts fenugreek, nigella, cumin, fennel and black mustard seeds",
            "1 dry red chilli for the chhonk",
            "1 tsp ghee, raw, to finish"
          ]
        }
      ],
      "mise": [
        "Cut all vegetables to a similar size and keep them in three bowls: hard (pumpkin, sweet potato, carrot, radish, papaya), medium (pointed gourd, cauliflower, beans), soft (brinjal, ridge gourd).",
        "Soak the brinjal in lightly salted water for 10 minutes, then drain and pat dry.",
        "Mix the ginger paste, cumin, coriander, turmeric and chilli powder with 2 tbsp water into a paste; grind the coconut separately if using.",
        "Keep the panch phoron and the extra red chilli in a small bowl next to the stove.",
        "Kitchen rule for bhog: no onion or garlic and no tasting from the cooking spoon."
      ],
      "method": [
        {
          "title": "Temper the pot",
          "text": "Heat 2 tbsp ghee in the kadai on medium. Add the bay leaves and 2 dry red chillies and let them sizzle for 20 seconds until fragrant.",
          "why": "Warming whole aromatics in ghee flavours the fat that every vegetable will absorb.",
          "cue": "The bay leaves darken slightly and the chillies change colour."
        },
        {
          "title": "Start the hard vegetables",
          "text": "Add pumpkin, sweet potato, carrot, radish and papaya. Stir for 4-5 minutes on medium heat so the edges pick up a little ghee but do not brown.",
          "why": "Dense vegetables need the longest; coating them in ghee first keeps their shape later.",
          "cue": "The cubes look glossy and the raw smell has gone."
        },
        {
          "title": "Add the paste",
          "text": "Stir in the spice paste and cook for 2 minutes, stirring so it does not catch. Sprinkle a few drops of water if it sticks. Add the salt and sugar.",
          "why": "Cooking the ginger and ground spices removes their raw edge.",
          "cue": "The paste smells fragrant, not raw, and clings to the vegetables."
        },
        {
          "title": "Add the medium and soft vegetables",
          "text": "Add pointed gourd, cauliflower, broad beans, brinjal and ridge gourd. Add 1/2 cup warm water, mix gently, cover tightly and cook on low heat for 15-20 minutes, stirring gently once or twice.",
          "why": "The soft vegetables release a lot of water; covering lets everything steam in its own juices.",
          "cue": "The hard vegetables yield to a fork and the gravy has turned thick and golden."
        },
        {
          "title": "Add the coconut and reduce",
          "text": "If using coconut, stir in the paste now. Uncover and cook 5-8 minutes on medium heat, stirring carefully, until the gravy clings to the vegetables rather than pooling.",
          "why": "Coconut sweetens and thickens; the open pot evaporates excess water.",
          "cue": "A spoon pulled through the pan leaves a clear line for a moment."
        },
        {
          "title": "Make the chhonk",
          "text": "In the small pan, heat 1 tbsp ghee on medium. Add the panch phoron and the remaining red chilli. When the seeds crackle and smell nutty, about 20-30 seconds, pour the chhonk straight over the labra.",
          "why": "The fresh tempering gives the aroma, which long cooking would otherwise lose.",
          "cue": "The seeds crackle in the ghee and the chilli darkens just before it burns."
        },
        {
          "title": "Finish",
          "text": "Cover and let the pot rest 2 minutes, then fold gently once. Check salt and sugar, and top with 1 tsp raw ghee.",
          "why": "Resting lets the chhonk flavour spread; folding gently keeps the vegetables whole.",
          "cue": "Steam smells of ghee and toasted seeds; the vegetables remain in distinct pieces."
        }
      ],
      "offering": "Described in Bangladeshi newspapers as a puja dish offered to the goddesses as prasad; served on the bhog menu alongside khichuri.",
      "ritual": [
        "Cook labra the morning of the bhog in a kitchen kept free of onion and garlic.",
        "Place a portion on a clean plate beside the khichuri and other bhog items.",
        "Offer it before the Goddess with the other items, then serve as prasad.",
        "Leftovers are eaten with rooti or luchi at the next meal."
      ],
      "serving": "Serve hot beside bhoger khichuri, or with luchi, paratha or rooti. A portion is about 3/4 cup.",
      "storage": "Keeps 2 days in the refrigerator in a covered container. Reheat gently with a splash of water; the vegetables soften further.",
      "troubleshooting": [
        {
          "problem": "The labra is watery.",
          "fix": "Too much water was added or the pot was not reduced uncovered. Cook uncovered for 5-8 minutes on medium heat, or mash a few pumpkin pieces into the gravy."
        },
        {
          "problem": "The vegetables are mushy.",
          "fix": "All were added together and overcooked. Add soft vegetables later and keep the heat low next time."
        },
        {
          "problem": "The chhonk tastes bitter.",
          "fix": "Panch phoron burned. Cook it only 20-30 seconds on medium heat; remove the pan from the flame as soon as the seeds crackle."
        },
        {
          "problem": "The labra tastes flat.",
          "fix": "The salt or sugar is low or the spice paste was not cooked out. Add 1/4 tsp salt and 1/2 tsp sugar and simmer 2 minutes."
        }
      ],
      "variations": [
        "Fry the first stage in mustard oil (about 1/4 cup), as the second printed Bangladeshi recipe does, and finish with ghee.",
        "Add taro (kochu) and a handful of spinach for a greener, thicker labra.",
        "Skip coconut for a lighter version; add it for a richer gravy.",
        "Ghee-cooked, it is vegetarian but not vegan; root vegetables mean it is not Jain."
      ],
      "tips": [
        "Cut vegetables large and of similar size.",
        "Add vegetables in stages, hardest first.",
        "Never skip the separate chhonk - that is where the fragrance comes from.",
        "Use only a little water; the vegetables supply the rest."
      ],
      "differs": "Bangladeshi version: ghee, more gourds and papaya, cumin-coriander paste, optional coconut and a separate panch phoron chhonk, against the potato-and-cauliflower pandal labra of West Bengal."
    }
  ],
  "dalma": [
    {
      "id": "odisha-habisa-kartika",
      "region": "Odisha (Puri and across the state)",
      "culture": "Kartika Habisa vow - habisyalis and Odia Hindu households in the holy month of Kartika",
      "title": "Habisa Dalma",
      "intro": "A pale, gentle moong dalma made without turmeric, potato, onion, garlic or mustard oil, cooked with raw banana, yam, arbi and pumpkin, and finished with ghee, roasted cumin and fresh coconut. The sour note, where it is available, comes from elephant apple (oou).",
      "story": "Kartika is described as the most auspicious month for Odia Hindus. Many keep the Habisa vow, eating a single pure vegetarian meal a day, and many women, the habisyalis, travel to Puri to stay near Lord Jagannath for the month. Habisa dalma is described as the centrepiece of the Kartika meal and the trademark dish of the month.\n\nThe rules are stricter than for everyday dalma. Published accounts state that onion, garlic, mustard oil, turmeric and potato are left out; the recipes here use ghee and unroasted moong dal. The meal is built around ghee rice, a thin or semi-thick habisa dalma, boiled elephant apple with chilli (oou khata), a crushed lime-chilli relish and agasti saga bhaja.\n\nBecause the dish is meant to be plain, it relies on the vegetables for sweetness and body and on ghee and cumin for aroma. A few households temper at the start, others pour the ghee tempering over at the end; both are documented.",
      "serves": "4-5 servings",
      "prep": "20 min",
      "cook": "50 min",
      "equipment": [
        "Heavy-bottomed pot or earthen handi with lid - traditionally boiled, not pressure-cooked",
        "Small ladle or tadka pan - for the ghee tempering",
        "Dry pan and mortar - for roasting and crushing the cumin",
        "Wooden spoon - for gentle mashing"
      ],
      "ingredients": [
        {
          "group": "Dal and vegetables",
          "items": [
            "3/4 cup (150 g) yellow moong dal, unroasted, washed 2-3 times and soaked 30 minutes - the soaked dal cooks soft with the vegetables",
            "1 medium raw banana (about 150 g), peeled, in 3 cm cubes - keep in water so it does not darken",
            "2 arbi (taro, about 100 g), peeled, in 3 cm cubes",
            "100 g elephant-foot yam (ole), peeled, in 3 cm cubes - rinse well",
            "100 g pumpkin, peeled, in 3 cm cubes",
            "2 small pieces elephant apple (oou), fresh or dried - optional; gives the traditional tang",
            "1 tsp grated ginger",
            "1 tsp salt, or to taste",
            "4 cups (950 ml) water"
          ]
        },
        {
          "group": "Tempering and finish",
          "items": [
            "2 tbsp ghee, for tempering - natural cow ghee",
            "2 dry red chillies, broken",
            "2 bay leaves",
            "1 tsp cumin seeds",
            "A pinch of hing (asafoetida)",
            "1/3 cup (30 g) fresh grated coconut - added at the end",
            "1 tsp roasted cumin powder - dry-roast cumin seeds until fragrant, then crush",
            "1 tbsp ghee, raw, to finish",
            "1 tbsp chopped coriander leaves, to garnish"
          ]
        }
      ],
      "mise": [
        "Soak the moong dal for 30 minutes; drain.",
        "Peel and cube all vegetables; hold the banana and yam in cold water.",
        "Roast 1 tsp cumin seeds in a dry pan for 30 seconds, then crush.",
        "Keep the Habisa rules in mind: no turmeric, no potato, no onion or garlic, no mustard oil."
      ],
      "method": [
        {
          "title": "Temper the pot",
          "text": "Heat 2 tbsp ghee in the heavy pot on medium-low. Add the broken red chillies, bay leaves and cumin and let them sizzle for about 20 seconds, until the cumin darkens and smells nutty. Add the hing and ginger for 10 seconds.",
          "why": "Fixing the aromatics in ghee first means they flavour the whole pot, as in the Odia household method.",
          "cue": "Cumin turns a shade darker and the pot smells sweetly of ghee; nothing is burnt."
        },
        {
          "title": "Add the dal",
          "text": "Add the drained moong dal and stir for 1 minute so the grains are coated in ghee.",
          "why": "Coating keeps the grains separate and gives a fuller flavour.",
          "cue": "The dal looks glossy and smells lightly toasted."
        },
        {
          "title": "Add water and begin boiling",
          "text": "Pour in 4 cups water, add the salt and bring to a boil on high. Skim any froth, then lower to medium-low and cook uncovered for 10 minutes.",
          "why": "Dal needs a head start before the vegetables, which are denser than they look.",
          "cue": "The dal is half-soft and beginning to swell."
        },
        {
          "title": "Add the vegetables",
          "text": "Add yam, arbi, raw banana, pumpkin and the elephant apple if using. Cover and cook on low for 30-35 minutes, stirring gently every 8 minutes, until the yam is fully tender.",
          "why": "Yam and arbi are slowest; keeping the heat low lets the vegetables soften without breaking.",
          "cue": "A fork slides into the yam and the pumpkin starts to dissolve into the dal."
        },
        {
          "title": "Mash lightly",
          "text": "Press a few cubes of pumpkin and banana against the side of the pot with the back of the spoon. Add up to 1/2 cup hot water if the dal is too thick.",
          "why": "A little mashed vegetable gives body without any flour or thickener.",
          "cue": "The dal is thick but pourable, like a loose porridge."
        },
        {
          "title": "Finish with coconut and cumin",
          "text": "Turn off the heat. Stir in the grated coconut and the roasted cumin powder. Let it sit uncovered for 3 minutes.",
          "why": "Adding aromatic items off the heat keeps them fresh.",
          "cue": "The surface smells of cumin and coconut."
        },
        {
          "title": "Add ghee and serve",
          "text": "Stir in 1 tbsp raw ghee, check the salt and scatter coriander on top. Serve hot.",
          "why": "Raw ghee is added last for fragrance and a silky texture.",
          "cue": "The dalma shines with ghee and the vegetable pieces are soft but whole."
        }
      ],
      "offering": "Eaten as the main dish of the single Habisa meal during Kartika; households observing the vow worship Lord Jagannath during the month.",
      "ritual": [
        "Cook habisa in a clean kitchen with no onion, garlic, turmeric, potato or mustard oil.",
        "Serve it with ghee rice, oou khata, lime-chilli relish and agasti saga bhaja as the single meal of the day, as described in published accounts.",
        "Observers eat only this one meal each day through the month."
      ],
      "serving": "Serve hot over steamed rice topped with ghee, with boiled elephant apple and chilli on the side. A portion is about 1 cup.",
      "storage": "Best the day it is made. Refrigerate up to 2 days; thin with hot water when reheating and add a spoon of fresh ghee.",
      "troubleshooting": [
        {
          "problem": "The dal stays hard while the vegetables turn mushy.",
          "fix": "The dal was not soaked or the vegetables were added too soon. Soak at least 30 minutes and give the dal a 10-minute start."
        },
        {
          "problem": "The dalma is bland.",
          "fix": "Habisa is meant to be mild, but check the salt and make sure the cumin was roasted. Add a pinch of sugar and an extra spoon of ghee."
        },
        {
          "problem": "Yam makes the mouth itch.",
          "fix": "Rinse yam well after peeling and cook it fully; a spoon of lime juice or elephant apple helps."
        },
        {
          "problem": "The dal catches on the bottom.",
          "fix": "The heat was too high. Cook on low, stir gently from the base, and add hot water."
        }
      ],
      "variations": [
        "Some households pour a ghee-cumin-chilli tempering over the finished dal instead of tempering at the start.",
        "Add a pinch of black pepper with the roasted cumin, as in the Kalinga TV version.",
        "Without elephant apple, a few drops of lime juice give a faint tang.",
        "Not vegan (ghee); yam and arbi are roots, so it is not Jain."
      ],
      "tips": [
        "Use unroasted moong dal.",
        "Boil rather than pressure-cook - the texture is different and the vegetables hold up.",
        "Leave out turmeric, potato and mustard oil to stay true to Habisa.",
        "Add coconut and cumin powder after turning off the heat."
      ],
      "differs": "Kartika version: moong dal, no turmeric or potato, a ghee-cumin finish and elephant apple, against the toor-dal temple and household dalma with a seasoned chhunka."
    }
  ],
  "gopalkala": [
    {
      "id": "karnataka-mosaru-avalakki",
      "region": "Karnataka (also Andhra and Telangana as Atukula Daddojanam)",
      "culture": "Kannada households - Gokulashtami naivedya",
      "title": "Mosaru Avalakki",
      "intro": "Thick poha softened in water, folded into whisked curd with fresh coconut, and finished with a hot ghee tempering of mustard, urad dal, chana dal, cashews, curry leaves and chilli. It is creamy and savoury-sweet rather than cold and chunky like the Maharashtrian version, and is eaten the moment it is made.",
      "story": "Mosaru avalakki, literally curd and flattened rice, is a Kannada dish linked to Gokulashtami. One home-cook account says it is the dish her mother made on Gokulashtami and calls it useful food for festival fasting days. Its Andhra and Telangana counterpart is atukula daddojanam, and one source names Gopalkala as Maharashtra's version of the same kind of offering.\n\nCompared with Gopalkala, there is no cucumber or peanut as standard, and the curd dish is finished with a ghee tempering of mustard, dal, cashew and curry leaves. Some families add a little milk to loosen the curd, and a few add ginger, green chilli and pomegranate.\n\nBecause poha absorbs curd quickly, the dish is made just before it is eaten, within minutes.",
      "serves": "3-4 servings (about 3 cups)",
      "prep": "20 min",
      "cook": "5 min",
      "equipment": [
        "Colander - to drain the soaked poha",
        "Wide mixing bowl - steel or glass; avoid aluminium with curd",
        "Small tadka pan or ladle - for the ghee tempering",
        "Whisk - to make the curd smooth"
      ],
      "ingredients": [
        {
          "group": "Base",
          "items": [
            "1 cup (80 g) thick poha (avalakki) - thick flakes only; thin flakes dissolve in curd",
            "1 cup (250 g) fresh curd (mosaru), mildly sour - sour curd overwhelms the dish",
            "2-4 tbsp milk, to loosen if needed",
            "1/3 cup (30 g) fresh grated coconut",
            "1 1/2 tsp sugar - balances the sourness",
            "3/4 tsp salt, or to taste"
          ]
        },
        {
          "group": "Tempering (popu)",
          "items": [
            "2 tsp ghee",
            "1/2 tsp mustard seeds",
            "1 tsp urad dal",
            "1 tsp chana dal",
            "8 cashews, broken",
            "1 dry red chilli, broken, or 1 green chilli, chopped",
            "1/2 tsp grated ginger",
            "A pinch of hing (asafoetida)",
            "8-10 curry leaves",
            "1 tbsp chopped coriander leaves, to garnish",
            "2 tbsp pomegranate pearls - optional"
          ]
        }
      ],
      "mise": [
        "Whisk the curd with sugar and salt until smooth; keep it cool.",
        "Measure all the tempering ingredients into one small bowl.",
        "Have the grated coconut and chopped coriander ready.",
        "Wash the poha only when you are ready to mix."
      ],
      "method": [
        {
          "title": "Soften the poha",
          "text": "Rinse the poha in a colander under running water for 20-30 seconds, just until the flakes feel soft. Drain for 5-10 minutes, shaking occasionally. If they are still firm, sprinkle with 2 tablespoons of water and leave 5 minutes.",
          "why": "Thick poha needs moisture to soften without becoming mush; draining stops it turning soggy.",
          "cue": "The flakes bend without breaking and no puddle remains in the colander."
        },
        {
          "title": "Mix the curd and poha",
          "text": "Place the drained poha in a wide bowl. Add the whisked curd, grated coconut and 2 tablespoons of milk and fold gently with a spoon for 1 minute.",
          "why": "Gentle folding keeps the flakes whole; the milk makes the curd flow.",
          "cue": "The mixture is creamy, with a spoon-drop consistency and no dry flakes."
        },
        {
          "title": "Heat the ghee",
          "text": "Heat the ghee in the small pan on medium. Add mustard seeds and wait until they pop, about 20 seconds.",
          "why": "Mustard must pop to release its flavour; unpopped seeds are bitter.",
          "cue": "The seeds crackle and jump."
        },
        {
          "title": "Fry the dals and cashews",
          "text": "Add urad dal, chana dal and cashews. Stir for 40-60 seconds until golden. Add the chilli, ginger, hing and curry leaves and stir 10 seconds.",
          "why": "The dals add crunch and a nutty note; they burn in seconds.",
          "cue": "The dals and cashews are light gold; curry leaves are crisp."
        },
        {
          "title": "Cool the tempering briefly",
          "text": "Rest the pan for 1-2 minutes off the heat.",
          "why": "Very hot tempering can split the curd.",
          "cue": "The sizzling has stopped but the ghee is still warm."
        },
        {
          "title": "Combine",
          "text": "Pour the tempering over the poha and curd and fold gently. Add the coriander and, if you like, pomegranate. Taste and adjust salt and sugar.",
          "why": "Folding keeps the poha intact.",
          "cue": "The tempering is evenly through the white mixture and smells of ghee and curry leaf."
        },
        {
          "title": "Serve at once",
          "text": "Serve within 10 minutes. If the mixture has thickened, loosen with a spoon of milk or curd.",
          "why": "Poha continues to absorb liquid and goes pasty on standing.",
          "cue": "Still creamy and slightly loose."
        }
      ],
      "offering": "Made for Gokulashtami; offered to Krishna in households that do so, then eaten as prasad.",
      "ritual": [
        "Prepare the dish just before the puja.",
        "Place a small portion in a clean bowl or on a leaf before Krishna.",
        "Afterwards serve everyone a spoonful as prasad and eat the rest within a few minutes."
      ],
      "serving": "Serve at room temperature in small bowls with a pinch of coriander. It is also a light meal on its own.",
      "storage": "Best eaten within 15 minutes. Do not store; the poha turns mushy and the curd sours.",
      "troubleshooting": [
        {
          "problem": "The poha is mushy.",
          "fix": "Poha was too thin or soaked too long. Use thick poha and rinse only briefly."
        },
        {
          "problem": "The mixture is dry.",
          "fix": "Poha has absorbed the curd. Stir in 2-3 tbsp curd or milk."
        },
        {
          "problem": "The curd split.",
          "fix": "Tempering was too hot. Let it cool 1-2 minutes before pouring."
        },
        {
          "problem": "It tastes sour.",
          "fix": "The curd was too tangy. Add 1/2 tsp sugar and a spoon of milk."
        }
      ],
      "variations": [
        "Add milk to the curd and ginger, green chilli and pomegranate, as some families do.",
        "Andhra style (atukula daddojanam) is the regional counterpart; its details differ and are not covered here.",
        "Add a handful of grapes or raisins for sweetness.",
        "Contains ginger, so not Jain; vegetarian, no onion or garlic."
      ],
      "tips": [
        "Use thick poha.",
        "Mix at the last minute.",
        "Let the tempering cool a little before pouring.",
        "Keep it loose; poha thickens as it stands."
      ],
      "differs": "Karnataka: tempered with ghee, mustard and dals, with coconut and no cucumber or pomegranate as standard; Maharashtra's Gopalkala is a raw, chilled mix of vegetables and fruit."
    }
  ],
  "tahiri-akha": [
    {
      "id": "kashmiri-pandit-tahar",
      "region": "Kashmir (Kashmiri Pandit households and diaspora)",
      "culture": "Kashmiri Pandit households - Monjhar (first day of Pausha), birthdays and auspicious days",
      "title": "Tahar (Taeher)",
      "intro": "Plain yellow rice: long-grain rice cooked with a little turmeric, drained and steamed, then mixed with mustard oil and coarse salt just before serving. It is not sweet and has no vegetables or spices, and it is served beside dum aloo and other Kashmiri dishes.",
      "story": "Kashmiri Pandit accounts describe Tahar as yellow rice cooked on auspicious days: tithi birthdays and the festival of Monjhar, held on the first day after the lunar month of Margashirsha ends, as Pausha begins. The rice is cooked specially for the household deity (Griha Devta / Ghar Devta) and then shared with family and neighbours; the day is believed to bring luck and success to the family.\n\nOn birthdays, Rana Safvi writes, Tahar is offered first to God and to animals, and is the main prasad of the day. It is usually served with dum aloo, chaman kaliya (paneer in a turmeric curd gravy) or nadru yakhni, and mustard oil and coarse salt are mixed in before serving.\n\nThe Kashmiri Overseas Association page spells the festival rice as taeher, and describes it as yellow cooked rice mixed with mustard.",
      "serves": "4 servings (about 4 cups cooked rice)",
      "prep": "25 min (including soaking)",
      "cook": "20 min",
      "equipment": [
        "Heavy pot with a tight lid - for the steam (dum) stage",
        "Colander - for draining the part-cooked rice",
        "Small pan - to smoke the mustard oil",
        "Flat tawa or griddle - to place under the pot for gentle dum heat"
      ],
      "ingredients": [
        {
          "group": "Rice",
          "items": [
            "1 1/2 cups (300 g) long-grain basmati rice - washed until the water runs clear",
            "6 cups (1.4 litres) water, for boiling",
            "1/2 tsp turmeric powder - enough for a clear yellow; more turns the rice bitter"
          ]
        },
        {
          "group": "Finish",
          "items": [
            "2 tbsp mustard oil - heated until it smokes to remove its raw smell; use ghee if mustard oil is not accepted",
            "1 tsp coarse salt (or to taste) - mixed in after cooking, as in the Kashmiri practice"
          ]
        }
      ],
      "mise": [
        "Wash the rice 3-4 times and soak for 20 minutes; drain.",
        "Bring the 6 cups of water to a boil with the turmeric.",
        "Put the mustard oil in a small pan and keep it near the stove; open a window, as it smokes.",
        "Place a tawa on the burner for the dum stage."
      ],
      "method": [
        {
          "title": "Boil the water with turmeric",
          "text": "Bring 6 cups water to a rolling boil in the heavy pot. Stir in the turmeric.",
          "why": "Colouring the water first makes the grains evenly yellow.",
          "cue": "The water is bright yellow and boiling hard."
        },
        {
          "title": "Cook the rice to 70 percent",
          "text": "Add the soaked, drained rice and boil on medium-high for 5-7 minutes, stirring once after 1 minute. Press a grain: it should be soft outside with a hard white thread in the centre.",
          "why": "Draining at 70 percent keeps each grain separate and lets the steam finish it.",
          "cue": "A grain breaks easily between fingers but still has a firm core."
        },
        {
          "title": "Drain",
          "text": "Drain the rice in the colander for 30 seconds and return it to the pot, spreading it evenly.",
          "why": "Excess water makes the rice sticky.",
          "cue": "No water pools at the bottom of the pot."
        },
        {
          "title": "Steam (dum)",
          "text": "Cover tightly (wrap the lid in a cloth if it is loose). Put the pot on the tawa on the lowest heat for 5 minutes, then switch off and rest 5 minutes covered.",
          "why": "The trapped steam finishes the cooking and makes the grains fluffy.",
          "cue": "The grains are tender, dry and separate, with a soft fragrance."
        },
        {
          "title": "Smoke the mustard oil",
          "text": "Heat the mustard oil in the small pan until it just smokes and turns pale, about 1-2 minutes. Take it off the heat and let it cool for 5 minutes.",
          "why": "Smoking removes the raw pungency of mustard oil; it must cool or it will scorch the rice.",
          "cue": "The oil smokes lightly and smells nutty, not sharp."
        },
        {
          "title": "Mix and finish",
          "text": "Fluff the rice with a fork. Drizzle the cooled oil over it, add the coarse salt and toss gently. Taste for salt.",
          "why": "Mixing oil and salt after cooking is the traditional finish; fluffing with a fork protects the grains.",
          "cue": "The grains are glossy, evenly yellow and unbroken."
        }
      ],
      "offering": "Cooked as a household offering to the Griha Devta on Monjhar and on birthdays, offered to God first and shared with family and neighbours.",
      "ritual": [
        "Cook Tahar early on the day (the first day of Pausha for Monjhar).",
        "Place a portion before the household deity; on birthdays set a little aside for birds and animals.",
        "Serve the rest to the family and share a portion with neighbours."
      ],
      "serving": "Serve warm with dum aloo, chaman kaliya or nadru yakhni and a spoon of curd. A portion is about 1 cup.",
      "storage": "Best the same day. Refrigerate up to 1 day and steam to reheat.",
      "troubleshooting": [
        {
          "problem": "The rice is mushy.",
          "fix": "It was over-boiled. Drain at 70 percent and keep the dum short."
        },
        {
          "problem": "The colour is pale or patchy.",
          "fix": "Turmeric was added late or not stirred. Add it to the boiling water and stir."
        },
        {
          "problem": "It tastes raw or sharp.",
          "fix": "The mustard oil was not smoked. Heat until it smokes lightly and cool before mixing."
        },
        {
          "problem": "The rice tastes bitter.",
          "fix": "Too much turmeric. Use 1/2 tsp for 1 1/2 cups rice."
        }
      ],
      "variations": [
        "Ghee in place of mustard oil for a milder finish.",
        "Bongong's 1-cup recipe uses 1/4 tsp turmeric per cup of rice; scale accordingly.",
        "Free of onion and garlic; vegan with mustard oil; not suitable for strict fasting because it uses rice."
      ],
      "tips": [
        "Wash and soak the rice for separate grains.",
        "Drain at 70 percent.",
        "Cool the smoked oil before mixing.",
        "Add salt at the end, as the Kashmiri practice does."
      ],
      "differs": "Kashmir: plain turmeric rice with mustard oil and no sweetener or vegetables, versus the Sindhi sweet and vegetable tahiri."
    }
  ]
}

// Keyed 'dish/variant'.
export const EXTRA_DIET: Record<string, DietTag[]> = {
  "pana/odisha-adhara-pana": [
    "no-onion-garlic"
  ],
  "khaja/bihar-silao": [
    "jain",
    "no-onion-garlic"
  ],
  "khaja/andhra-madatha-kaja": [
    "jain",
    "no-onion-garlic"
  ],
  "laddu/gujarat-churma": [
    "jain",
    "no-onion-garlic"
  ],
  "narkel-naru-sandesh/assam-narikol-laru": [
    "jain",
    "vegan",
    "vrat",
    "no-onion-garlic"
  ],
  "diwali-faral/goa-godshe-fov": [
    "jain",
    "vegan",
    "no-onion-garlic"
  ],
  "diwali-faral/goa-tikshe-fov": [
    "jain",
    "vegan",
    "no-onion-garlic"
  ],
  "sunthavda/dry-powder-janmashtami": [
    "vegan",
    "vrat",
    "no-onion-garlic"
  ],
  "labra/bangladesh": [
    "no-onion-garlic"
  ],
  "dalma/odisha-habisa-kartika": [
    "no-onion-garlic"
  ],
  "gopalkala/karnataka-mosaru-avalakki": [
    "no-onion-garlic"
  ],
  "tahiri-akha/kashmiri-pandit-tahar": [
    "vegan",
    "no-onion-garlic"
  ]
}
