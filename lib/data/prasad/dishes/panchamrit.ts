import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'panchamrit',
  name: 'Panchamrit',
  alsoCalled: 'Panchamrita · Panchamirtham · पंचामृत',
  category: 'Offering mix',
  summary: 'The “five nectars” — milk, curd, honey, ghee and sugar — bathed over the deity, then shared as prasad.',
  meaning:
    'Panchamrit is the first thing poured over an idol at abhishekam and the last thing handed to the devotee. In North India and Maharashtra it is a drinkable mix of the five sacred foods. In Tamil Nadu the same word, Panchamirtham, means something entirely different: a thick, sweet, banana-based paste, most famously at Palani. The five ingredients also carry meaning — milk for purity, curd for prosperity, honey for sweetness of speech, ghee for strength, sugar for joy. Because the dish is both a ritual bath and an edible prasad, its recipe is really two things at once: a sequence of pours, and a mixture that must be fresh, clean and made with devotion. That is why the same name travels across India while the dish itself changes completely from one temple tradition to the next.',
  variants: [
    {
      id: 'north-maharashtra',
      region: 'North India & Maharashtra',
      culture: 'Vaishnava, Shaiva and Ganapati households',
      title: 'Panchamrit (abhishek and prasad)',
      intro:
        'The thin, drinkable version. The five ingredients are first used one by one for the abhishekam, then the collected liquid (or a fresh mix made the same way) is served as a spoonful of prasad. Tulsi is added for Vishnu and Krishna; bilva leaf for Shiva.',
      story:
        'In most Hindu homes of the Hindi-speaking belt and Maharashtra, panchamrit is the standard liquid offering of every satyanarayan puja, Janmashtami midnight, Mahashivaratri night and Ganesh Chaturthi morning. The word comes from pancha (five) and amrita (the nectar of immortality). Scriptural puja manuals, the puja paddhatis, list the five items in a fixed order — milk, curd, ghee, honey, sugar — because each is poured over the idol in that sequence, with a rinse of clean water after each.\n\nWhat devotees drink is, strictly, the mixture that has touched the deity. In a large temple this is the abhishek runoff collected in a vessel; in a home it is usually a freshly mixed bowl that was set before the deity, because most families do not want to drink liquid that has run over a metal idol and onto a tray. Both are accepted. The mixture is considered so pure that it is given even to those fasting, in a spoonful, without breaking the vow.\n\nRegional habits differ in small ways. Maharashtrian households often add a few banana slices and sugar crystals (khadi sakhar) and sometimes dry coconut; Braj and Uttar Pradesh homes lean toward mishri and tulsi; Gujarati homes may add a touch of cardamom. For Shiva the tulsi is left out and bilva leaves are used instead, because tulsi is not offered to Shiva, and for Ganesha a few blades of durva are floated on top.',
      serves: '10–12 spoonfuls of prasad',
      prep: '10 min',
      cook: 'None',
      equipment: [
        'A clean steel, brass or silver bowl kept only for the deity — plastic and non-stick surfaces are avoided because the mixture is acidic from the curd and is considered an offering vessel.',
        'A small steel or silver spoon (achamani) — used to give the prasad into the devotee’s palm; a wooden spoon absorbs smell and stains.',
        'A whisk or fork — to smooth the curd; a blender is not used because it makes the mixture frothy and thin.',
        'A clean muslin or cotton cloth to cover the bowl — keeps flies and dust out while the puja is on.',
      ],
      ingredients: [
        {
          group: 'The five amrits',
          items: [
            '1 cup (240 ml) full-fat milk — preferably desi cow milk, boiled once and cooled completely; buffalo milk works but is heavier',
            '1/2 cup (120 g) fresh set curd, whisked smooth — made that day from the same milk; sour or day-old curd will split the milk',
            '2 tbsp pure honey — raw, unflavoured honey; avoid “honey syrups” with added sugar, and never heat it',
            '1 tbsp cow ghee, melted and cooled — warm ghee would cook the curd; it should be liquid but not hot',
            '1 tbsp mishri (rock sugar) powder — or plain sugar; mishri dissolves slowly and gives a cleaner sweetness',
          ],
        },
        {
          group: 'To finish',
          items: [
            '8–10 fresh tulsi leaves — for Vishnu, Krishna and Rama; omit for Shiva and Ganesha',
            '2 tsp makhana or chopped almonds and 1 tsp raisins — optional; adds body and makes the prasad more filling for children',
            '1/4 tsp cardamom powder — optional; not used in a strict abhishek mix, only in the prasad bowl',
            '3 bilva leaves or a few durva blades — only if the deity is Shiva or Ganesha respectively; wash well and shake dry',
          ],
        },
      ],
      mise: [
        'Boil the milk at least two hours ahead and let it cool to room temperature; hot milk cooks the curd and ghee on contact and ruins the texture.',
        'Set the curd the night before, or buy fresh plain curd from a dairy that morning; taste it — it should be mildly tangy, not sour.',
        'Wash the bowl, spoon and tulsi leaves, and keep them on a clean cloth near the deity’s seat so nothing has to be fetched once the puja starts.',
        'Powder the mishri in a clean mortar so it dissolves easily; whole crystals will stay at the bottom and be missed.',
        'Bathe and put on clean clothes before touching the ingredients, as is customary for any offering that will be eaten.',
      ],
      method: [
        {
          title: 'Prepare and cool the milk',
          text:
            'Bring the milk to a gentle boil in a heavy pan over medium heat, stirring so the skin does not stick, then switch off. Pour it into a clean steel bowl and let it cool uncovered to room temperature, which takes about 90 minutes.',
          why: 'Boiling once makes the milk safe to leave out during the puja; cooling completely stops the curd and honey from being damaged when they are added.',
          cue: 'A drop on your inner wrist feels neutral — neither warm nor cold — and no skin forms when you tilt the bowl.',
        },
        {
          title: 'Whisk the curd smooth',
          text:
            'Spoon the fresh curd into a separate small bowl and whisk it with a fork or whisk for about a minute, using a gentle circular motion, until there are no lumps. Do not add water; the curd should look like thick cream.',
          why: 'Lumps of curd float in the finished drink and make the offering look uneven; whisking now means you do not have to over-stir later and thin the milk.',
          cue: 'The curd slides off the spoon in a smooth, glossy ribbon with no visible granules.',
        },
        {
          title: 'Combine milk and curd',
          text:
            'Pour the cooled milk into the deity’s bowl, then add the whisked curd a spoonful at a time, stirring slowly in one direction with a clean spoon. Stop as soon as the two look like a single pale mixture.',
          why: 'Adding curd slowly into larger milk keeps it smooth; dumping it in at once can leave pockets that never blend.',
          cue: 'The mixture is a uniform, creamy white with a faint tang when you smell it.',
        },
        {
          title: 'Dissolve the mishri',
          text:
            'Sprinkle the mishri powder over the surface, then stir gently for one to two minutes until it vanishes. Taste a drop on the back of the spoon: it should taste pleasantly sweet but not syrupy.',
          why: 'Sugar needs time to dissolve in cold liquid; if you add the honey and ghee first, they coat the crystals and slow the process.',
          cue: 'When you tilt the bowl and look at the bottom, there is no gritty sediment left.',
        },
        {
          title: 'Fold in honey and ghee',
          text:
            'Drizzle in the honey and the cooled melted ghee, then fold them in with two or three slow turns of the spoon. Do not whisk or beat; a few golden streaks of ghee on top are normal and are considered auspicious.',
          why: 'Vigorous stirring emulsifies the ghee into the curd and makes the panchamrit cloudy and heavy; folding keeps each of the five amrits recognisable.',
          cue: 'The surface shows a faint golden sheen from the ghee and the honey has disappeared into the body of the drink.',
        },
        {
          title: 'Add the garnishes for the deity',
          text:
            'Float the tulsi leaves on top (or bilva for Shiva, durva for Ganesha), then scatter the makhana or chopped almonds and raisins. Add cardamom last, a small pinch only, and do not stir again.',
          why: 'Leaves placed on top stay green and fragrant; stirring them in bruises them and turns the drink dull.',
          cue: 'The leaves sit on the surface like small boats, and the aroma is milky with a clean herbal note.',
        },
        {
          title: 'Do the abhishek in sequence (if bathing the idol)',
          text:
            'If you are bathing the deity, keep the five ingredients in five small separate bowls instead of mixing them. Pour milk first, then curd, ghee, honey and finally sugar-water, each time taking a spoonful and letting it flow over the idol while reciting the mantra. Rinse with clean water after each pour.',
          why: 'The fixed order is part of the scriptural procedure; rinsing after each keeps one substance from sticking to the next on the idol.',
          cue: 'After the last pour the idol is bright and clean, and the tray holds a pale, mixed runoff.',
        },
        {
          title: 'Cover and keep ready for aarti',
          text:
            'Cover the bowl with a clean cloth and place it in front of the deity until the aarti begins. Keep it in a cool corner and do not leave it in sunlight or near the lamp flame.',
          why: 'Curd and milk spoil quickly in warmth; covering protects the offering and preserves its purity.',
          cue: 'When you lift the cloth at aarti time the mixture is still cool and smells fresh, with no sour edge.',
        },
      ],
      offering:
        'Offered to the deity at the end of abhishekam or just before aarti. Distribute one teaspoon into the right palm of each devotee, who sips it and wipes the hands over the head. Consume the same day — it contains curd and milk and does not keep.',
      ritual: [
        'Place the bowl on a clean plate in front of the deity, a little to the right of the lamp, and sprinkle a few drops of water around it with the right hand as a gesture of cleansing.',
        'Offer it with the words “Panchamritam samarpayami” (I offer panchamrit), touching a tulsi leaf to the surface; for Shiva, say it with a bilva leaf and “Om Namah Shivaya”.',
        'After the aarti, pour a small portion (about a teaspoon) into the clean right palm of each person, cupped with the left hand supporting the right wrist.',
        'The devotee sips it, then wipes the palm over the head and eyes; hands are not washed immediately, since the touch of prasad is considered blessing.',
        'Children and elders are served first, and anyone fasting takes only a spoonful. Whatever is left over is poured at the root of a tulsi plant or into flowing water rather than thrown away.',
      ],
      serving:
        'Serve in tiny quantities, one teaspoon per person, from a steel or silver spoon into the right palm. Along with it hand out a tulsi leaf and, if available, a few raisins or a piece of mishri. In many homes it is followed immediately by a spoon of dry-fruit or sheera prasad.',
      storage:
        'Make it fresh for each puja and finish it the same day. If a little remains, keep it covered in the refrigerator and use it within a day to make a lassi-like drink; do not offer it again to the deity once it has been refrigerated.',
      troubleshooting: [
        {
          problem: 'The milk has curdled into flakes.',
          fix: 'The milk was warm or the curd was sour. Next time cool the milk fully and use fresh curd; for today, strain the mixture and use the curds as a second, plainer prasad.',
        },
        {
          problem: 'The ghee floats in a greasy layer.',
          fix: 'The ghee was too hot or was stirred in too fast. Use cool melted ghee and fold it in gently; you can also dip the spoon through the layer once before serving.',
        },
        {
          problem: 'The panchamrit tastes too sour.',
          fix: 'The curd was past its prime. Add one more teaspoon of mishri and a spoon more milk to balance, and use fresher curd next time.',
        },
        {
          problem: 'Honey sits at the bottom in a lump.',
          fix: 'The honey was thick and cold. Warm the spoon in your palm or stir a teaspoon of the milk into the honey first, then pour it in.',
        },
      ],
      variations: [
        'Maharashtra: add 3–4 slices of ripe banana and a teaspoon of khadi sakhar (sugar crystals); some homes also add a pinch of cardamom.',
        'Gujarat and Rajasthan: add chopped dry fruits and a few saffron strands soaked in a spoon of warm milk for festive occasions.',
        'Vrat-friendly: use mishri rather than refined sugar and skip the cardamom and dry fruits unless your fast allows them; makhana is generally permitted.',
        'Jain households: usually avoid honey; replace it with a teaspoon more mishri or jaggery syrup, and check family custom before using curd.',
        'Vegan alternative for personal use (not for the traditional abhishek): coconut milk, coconut yoghurt, jaggery and a few drops of coconut oil can stand in, though it is no longer the classical panchamrit.',
      ],
      tips: [
        'Use fresh curd only — sour curd curdles the milk and spoils the taste.',
        'For Shiva, skip the tulsi and add 3 bilva leaves instead; for Ganesha add a few durva blades.',
        'If a household is fasting (vrat), use mishri rather than refined sugar and skip the cardamom and dry fruits.',
        'Keep the quantity small: a few spoonfuls per person is the tradition, and wasting the leftover is considered disrespectful.',
      ],
      differs: 'Thin, sipped from the palm; milk-curd-honey-ghee-sugar. Tulsi added for Vishnu.',
    },
    {
      id: 'palani-tamil',
      region: 'Tamil Nadu (Palani & Murugan temples)',
      culture: 'Tamil Shaiva and Murugan tradition',
      title: 'Palani Panchamirtham',
      intro:
        'Here the five ingredients are bananas, jaggery, dates, honey and ghee — mashed to a thick, glossy paste, not a drink. The Palani Dhandayuthapani temple prasad uses the small, sweet Virupakshi hill banana and has a GI tag. It is made fresh and given in a small cup or leaf bowl, with a sticky sweetness that is quite unlike the northern version.',
      story:
        'Palani, a hill temple in the Dindigul district of Tamil Nadu, is one of the six abodes (Arupadai Veedu) of Lord Murugan. The prasad here is panchamirtham: a thick, dark, intensely sweet paste of banana, jaggery, dates, honey and ghee, with cardamom and a crunch of sugar candy. It is so closely tied to the temple that it was awarded a Geographical Indication (GI) tag in 2019, which recognises that the dish is specific to this place and its traditional preparation.\n\nThe backbone of the temple recipe is the Virupakshi banana, a small, sweet, firm hill banana grown on the slopes around Palani and Dindigul. It is paired with jaggery, cow’s ghee, dates, honey and cardamom, and sometimes a little sugar candy. In the temple the mixture is also used for the abhishekam of Murugan, which is why it is called the “abhisheka prasadam”. The result is a paste, not a liquid, served in a little cup or on a leaf.\n\nThe contrast with the North Indian panchamrit is the key lesson of this dish. The Tamil word panchamirtham refers to the five sweet substances, not to the five dairy products, and the dish is dense, fruity and sweet enough to be eaten by the spoonful. Home versions across Tamil Nadu — for Karthigai, Thai Poosam, Skanda Sashti and Vinayaka Chaturthi — follow the same idea, often with whatever ripe bananas are at hand.',
      serves: '6–8 small cups',
      prep: '20 min',
      cook: 'None (optional 2 min to melt jaggery)',
      equipment: [
        'A wide steel or glass mixing bowl — big enough to mash comfortably; do not use aluminium, which reacts with the acidic fruit.',
        'A wooden masher or the back of a steel spoon — gives a rustic, slightly chunky paste; a blender makes it watery and gummy.',
        'A small saucepan — only needed if the jaggery is hard and must be melted into a thin syrup.',
        'A fine steel strainer — to remove grit from the jaggery syrup, which is common in unrefined Tamil jaggery.',
        'Small steel cups or fresh banana-leaf bowls — for serving; the temple uses small paper-like cups for pilgrims.',
      ],
      ingredients: [
        {
          group: 'The five ingredients',
          items: [
            '6 very ripe small bananas (about 300 g peeled) — Virupakshi if you can find them; otherwise poovan, yelakki or any small, aromatic ripe banana, with brown specks on the skin',
            '1/2 cup (100 g) jaggery, powdered — dark, clean palm or sugarcane jaggery; adjust by a tablespoon depending on how sweet the bananas are',
            '8 soft dates, deseeded and finely chopped — Medjool or soft kimia dates; they give body and a caramel note',
            '2 tbsp honey — pure honey, added at the end so it keeps its aroma',
            '2 tbsp cow ghee, plus a drizzle to finish — fresh and fragrant; it binds the paste and gives the characteristic sheen',
          ],
        },
        {
          group: 'The flavours Palani adds',
          items: [
            '1 tbsp kalkandu (rock-candy crystals), lightly crushed — gives tiny pockets of crunch and a clean sweetness',
            '1/2 tsp cardamom powder — freshly ground from green pods for the best fragrance',
            '1 tbsp seedless raisins, chopped — optional but common; they plump in the moist paste',
            'Optional: 1 tsp dry ginger powder (sukku) — a warming note some households add, especially in the monsoon',
          ],
        },
      ],
      mise: [
        'Choose bananas that are fully ripe and fragrant, with brown specks; if they are underripe the panchamirtham will taste starchy, so ripen them in a paper bag for a day or two beforehand.',
        'Powder the jaggery on a clean board with the back of a spoon, or grate it; large lumps will not dissolve into the paste.',
        'Wash and dry the dates, then remove the seeds and chop them to the size of a grain of rice so they melt into the mixture.',
        'Crush the kalkandu in a mortar to small pieces, not a powder, so that it adds crunch.',
        'Wash your hands and the bowl thoroughly; the temple prepares this with strict purity and the household version follows the same custom.',
      ],
      method: [
        {
          title: 'Peel and mash the bananas',
          text:
            'Peel the bananas and place them in the wide bowl. Mash with a wooden masher or the back of a steel spoon for two to three minutes, pressing and folding until you have a thick paste with some small soft pieces remaining.',
          why: 'Mashing by hand keeps a little texture and avoids the gummy, slimy result that a blender gives with ripe banana.',
          cue: 'The mixture looks like thick, creamy banana puree with a few visible tiny lumps and a strong sweet aroma.',
        },
        {
          title: 'Melt the jaggery if it is hard',
          text:
            'If your jaggery is a hard block, warm it with 2 tablespoons of water in a small pan on low heat for about two minutes, just until it melts into a thin syrup. Strain through a fine strainer to remove grit and let it cool completely before using. If it is soft and powdery, skip this step.',
          why: 'Unrefined jaggery often contains sand and fibres; hot syrup added to banana would also cook it and make it dull.',
          cue: 'The syrup runs off the spoon like thin honey and is lukewarm or cool to the touch.',
        },
        {
          title: 'Blend in the jaggery',
          text:
            'Add the cooled jaggery or the powdered jaggery to the mashed banana and stir in one direction for about a minute. The mixture will loosen slightly as the sugar draws moisture out of the fruit and turns amber.',
          why: 'Sugar draws water from the fruit, which is what turns the paste glossy and spoonable rather than dry.',
          cue: 'No dry streaks of jaggery remain and the colour has deepened to a rich golden-brown.',
        },
        {
          title: 'Fold in the dates',
          text:
            'Add the finely chopped dates and stir gently for another minute. Press the dates against the side of the bowl as you stir so that some melt into the banana and the rest stay as soft chewy bits.',
          why: 'Dates add body and a deeper caramel flavour, and give the panchamirtham its thick texture that a banana-only paste would not have.',
          cue: 'The paste thickens noticeably and you can see small dark flecks of date throughout.',
        },
        {
          title: 'Add honey and ghee',
          text:
            'Pour in the honey and the ghee, and stir in one direction for a full minute. The ghee should blend into the paste and make it glossy; if you see separate oil, keep stirring a little longer.',
          why: 'Ghee carries flavour and keeps the paste soft; honey is added late so its delicate aroma is not lost to mixing and warmth.',
          cue: 'The surface has a smooth, shiny gloss and the paste holds a soft peak when you lift the spoon.',
        },
        {
          title: 'Season with cardamom, kalkandu and raisins',
          text:
            'Sprinkle in the cardamom powder, the crushed kalkandu and the chopped raisins and fold them through lightly with two or three turns of the spoon. Avoid over-mixing so the sugar crystals stay crunchy.',
          why: 'Cardamom perfumes the paste; kalkandu gives the signature crunch of the Palani prasadam, which dissolves if stirred too long.',
          cue: 'You can hear a faint crackle of sugar crystals against the bowl and smell the cardamom clearly.',
        },
        {
          title: 'Rest the panchamirtham',
          text:
            'Cover the bowl with a clean cloth and let the mixture rest for 15 minutes at room temperature. During this time the dates soften further and the flavours settle together.',
          why: 'A short rest allows the fruit sugars, jaggery and ghee to meld; tasting immediately gives a flatter, less rounded sweetness.',
          cue: 'After resting, the paste is thicker, a little darker, and tastes distinctly more rounded.',
        },
        {
          title: 'Finish with ghee and serve',
          text:
            'Stir the paste once, level it with the back of a spoon, and drizzle a final thin line of ghee over the top. Offer it in the bowl, then portion into small cups or leaf bowls for distribution.',
          why: 'The last drizzle of ghee gives the traditional shiny finish and a first aroma of ghee when the cover is lifted.',
          cue: 'The surface glistens, and the whole bowl smells of banana, cardamom and warm ghee.',
        },
      ],
      offering:
        'Offered to Murugan at abhishekam and again at the naivedyam; handed out in small portions. In Palani the abhishekam itself uses the panchamirtham poured over the idol, which is why it is also called the “abhisheka prasadam”.',
      ritual: [
        'Place the bowl on a banana leaf or a clean plate in front of Murugan’s picture or vel, with a lamp lit on the left and a sprinkling of water around the plate.',
        'Offer it while chanting “Om Saravana Bhava” or the Kanda Sashti Kavacham verses your family uses, and touch a flower or tulsi leaf to the panchamirtham as a symbol of acceptance.',
        'Hold the offering before the deity for a few minutes while the aarti or deepa-aradhana is performed, then offer a camphor flame and show it to the bowl.',
        'Serve the panchamirtham in small cups or banana-leaf bowls, giving each person a spoonful with the right hand; devotees receive it with the right palm cupped, supported by the left.',
        'Everyone eats it right away, and any remainder is shared with neighbours or the temple’s visitors the same day; it is not carried back to the deity once distributed.',
      ],
      serving:
        'Serve in small steel cups, banana-leaf bowls or on a spoon, a few tablespoons per person. It is eaten as a sweet prasad after the aarti, and in Palani devotees take it home in small tubs after the darshan. A pinch of dry ginger or a sip of water afterwards helps with its rich sweetness.',
      storage:
        'Best eaten the same day. In warm weather the ghee-banana mixture ferments within a few hours, so keep it covered and cool, and discard it after a day. In a refrigerator it keeps about 24 hours; bring to room temperature before serving.',
      troubleshooting: [
        {
          problem: 'The paste is too watery.',
          fix: 'The bananas were very juicy or the jaggery syrup was too thin. Mash in two or three extra chopped dates or a tablespoon of powdered jaggery and let it rest until thickened.',
        },
        {
          problem: 'It tastes starchy or raw.',
          fix: 'The bananas were not ripe enough. Add a tablespoon more jaggery and chopped dates to cover the flat taste, and ripen the fruit further next time.',
        },
        {
          problem: 'The paste has gone dark and smells fermented.',
          fix: 'It has stood too long in warm weather. Discard it; make a smaller batch and prepare it close to the time of the puja.',
        },
        {
          problem: 'The honey makes it sticky and cloying.',
          fix: 'Too much honey or sweet bananas. Balance with a squeeze of lime or a pinch of dry ginger, or add a few more mashed bananas to dilute the sweetness.',
        },
      ],
      variations: [
        'Add a spoon of grated fresh coconut or chopped nuts for a richer texture; this is common at Vinayaka Chaturthi and Thai Poosam in some homes.',
        'Vrat-friendly: ginger and cardamom are typically permitted, and the dish is naturally free of grains and pulses; check your family custom on honey.',
        'Vegan version (non-traditional): replace ghee with coconut oil and omit honey, using a little extra jaggery or date syrup for sweetness.',
        'Jain-friendly: the standard recipe contains honey and ghee; use jaggery syrup instead of honey and confirm with your community whether ghee is acceptable.',
        'Use hill bananas, or small sweet varieties like poovan or yelakki, in the absence of Virupakshi; the flavour will be a little different but still good.',
      ],
      tips: [
        'Overripe, spotty bananas give the best sweetness. Underripe fruit makes it starchy.',
        'Keep it in a clean glass or steel container and consume the same day; with ghee and banana it ferments in warm weather.',
        'Do not add milk — the authentic version is dry and sticky, and milk would make it spoil faster.',
        'Mash by hand rather than blending; the slightly chunky texture is the point of the dish.',
      ],
      differs: 'A thick banana-jaggery-date paste (Palani GI), not a milk drink.',
    },
  ],
}

export default recipe
