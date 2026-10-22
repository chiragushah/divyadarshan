import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'makhan-mishri',
  name: 'Makhan-Mishri',
  alsoCalled: 'Makkhan Misri · Loni · Vennai · माखन मिश्री',
  category: 'Offering mix',
  summary: 'Fresh white butter with rock sugar — the naivedyam of Bal Krishna.',
  meaning:
    'Butter is the signature offering of Krishna, the makhan-chor, the little butter thief of Gokul. The offering is deceptively simple: fresh, unsalted white butter that was churned the same morning from cow’s milk curd, topped with crystals of mishri (rock sugar) and a leaf of tulsi. Its value lies in the freshness and the purity of the milk, not in complexity or ingredients, and that is why it is one of the hardest prasads to do well. In Braj it is made at home before Janmashtami; in Pushtimarg temples it is offered every day as part of the morning and evening bhog. In the south the same white butter is called vennai, and is offered on Gokulashtami alongside seedai and murukku. Whatever the name, the principle is the same: take the cream of the milk, make it with your own hands, and offer the first of it to the child god.',
  variants: [
    {
      id: 'braj',
      region: 'Braj & Uttar Pradesh',
      culture: 'Vaishnava and Pushtimarg households',
      title: 'Homemade white butter with mishri',
      intro:
        'Butter is churned at home from curd made from cow’s milk, then washed and chilled. A pinch of mishri is placed on top and a tulsi leaf is added.',
      story:
        'In the villages of Braj, the day began with churning. Before sunrise, the women of Nandgaon and Gokul would sit at the madhani, the wooden churning rod with its rope, and the rhythmic sound of the churn was the sound of the morning. The tales of the child Krishna stealing butter from hanging pots, his mouth smeared white, are among the most loved in the Bhagavata Purana, and the white butter became the child’s own food: soft, mild, sweet from the cream, and offered with a little sugar.\n\nMishri, the clear crystals of rock sugar, is the traditional sweetener because it is pure, cooling and unprocessed in the temple sense. A bit of mishri melting slowly on soft butter is the most recognisable taste of Braj bhog. Pushtimarg temples such as Nathdwara offer makhan-mishri daily, and on Janmashtami it is the first thing placed before the newborn Lord at midnight.\n\nAt home, making the butter yourself changes the offering. Setting the milk the previous evening, waking early to churn, and washing the butter in cold water until the water runs clear is a small act of devotion in itself. Households that cannot churn use fresh unsalted white butter from a trusted dairy, but those who do make it say the difference in aroma is unmistakable.',
      serves: '8–10 small servings (about 1 tbsp butter each)',
      prep: '20 min, plus overnight setting of curd',
      cook: '10 min churning, plus 15 min washing and chilling',
      equipment: [
        'Heavy steel or earthen pot for setting curd — thick walls hold an even warmth overnight; thin vessels cool too quickly and the curd stays watery',
        'Wooden madhani (churning rod), or a hand blender used at the lowest setting — a madhani churns gently and gives soft, unbroken butter; a blender is faster but needs short bursts to avoid overheating',
        'Deep, wide steel vessel for churning — a tall narrow pot spatters; a wide one keeps the butter together as it gathers',
        'Two large bowls of ice-cold water — one for washing the butter, one spare to change the water',
        'Clean steel plate and a small steel katori — for shaping and offering; avoid plastic, which can taint the butter',
        'Fine muslin cloth (optional) — to strain the buttermilk and to press excess water from the butter',
      ],
      ingredients: [
        {
          group: 'For setting the curd',
          items: [
            '2 litres full-fat cow milk — fresh, unhomogenised if possible; cream-rich milk gives more butter. Buffalo milk works but gives a heavier, whiter butter with a different taste',
            '2 tbsp fresh curd (starter) — from a mild, sweet, recently set curd; sour old curd produces tangy butter',
          ],
        },
        {
          group: 'For churning and washing',
          items: [
            '1 cup (240 ml) cold water, for churning — helps the butter granules gather and keeps the mixture cool',
            '8–10 ice cubes — keep the butter firm during churning and washing; warm butter turns greasy',
            'Extra 3–4 cups very cold water, for washing — removes the buttermilk, which would turn the butter sour within hours',
          ],
        },
        {
          group: 'For the offering',
          items: [
            '3–4 tbsp mishri (rock sugar), lightly crushed — choose clear white crystals, not yellowish ones; crush coarsely so they sparkle and dissolve slowly',
            '8–10 fresh tulsi leaves — washed and patted dry; placed on top of the butter after it has been offered, never cooked',
          ],
        },
      ],
      mise: [
        'Boil the milk once, cool it to lukewarm, and set it with the starter the evening before so the curd is ready by morning. Plan for 8–10 hours undisturbed.',
        'Wash the churning vessel, madhani and plate with hot water and a clean cloth; any trace of soap or oil will spoil the butter.',
        'Keep ice cubes ready and chill the washing water in the refrigerator so it is ice-cold when needed.',
        'Wash the tulsi leaves and pat dry. Crush the mishri in a mortar to the size of rice grains.',
        'Choose a cool time of day, ideally early morning; on a warm day, butter will not gather properly and will melt before you can shape it.',
      ],
      method: [
        {
          title: 'Boil and cool the milk',
          text: 'Pour the milk into a heavy pan and bring it slowly to a boil on medium heat, stirring so it does not catch. Let it boil for one minute, switch off, and cool it until it is lukewarm, about 40–42 degrees Celsius. A finger dipped in should feel pleasantly warm, not hot.',
          why: 'Boiling kills unwanted bacteria so only your starter cultures grow. If the milk is too hot when the starter is added, the cultures die and the curd will not set; if it is too cool, the curd is slow and thin.',
          cue: 'You can keep your clean finger in the milk and count to ten without discomfort; a thin skin of cream forms on the top.',
        },
        {
          title: 'Add the starter and set the curd overnight',
          text: 'Whisk the two tablespoons of curd with a little warm milk in a small bowl, pour it into the milk, and stir gently. Cover the pot with a lid or plate and wrap it in a clean cloth. Leave it undisturbed in a warm corner of the kitchen for 8–10 hours, or overnight.',
          why: 'The live bacteria in the starter ferment the milk sugar into lactic acid, which sets the proteins into curd. Any movement while it sets breaks the delicate gel and makes it watery.',
          cue: 'In the morning the curd is firm and set like a soft custard, pulls away cleanly from the sides when you tilt the pot, and smells mildly tangy and sweet, not sharp.',
        },
        {
          title: 'Chill the curd slightly, then loosen it',
          text: 'If the weather is warm, place the curd in the refrigerator for 30 minutes before churning. Then transfer it into the wide churning vessel and break it up gently with a clean spoon. Add the cup of cold water and a few ice cubes.',
          why: 'Cream turns to butter best at 12–15 degrees Celsius. Warm curd churns into a greasy, loose mass instead of firm granules; cold water brings the temperature down and helps the butter gather.',
          cue: 'The curd and water look like a thick, lumpy cloud of milky liquid, and the vessel is cool to the touch.',
        },
        {
          title: 'Churn steadily',
          text: 'Place the madhani in the centre of the vessel, hold the handle between your palms and spin it back and forth with a steady rhythm, or wind the rope in alternate directions. If using a hand blender, run it on the lowest speed in 30-second bursts. Continue for 8–10 minutes.',
          why: 'Churning breaks the fat globules in the cream so they clump together and separate from the liquid buttermilk. A steady rhythm gathers the fat gently; hard, fast churning cuts it into tiny crumbs that are difficult to collect.',
          cue: 'First the mixture froths, then you will hear a change in sound as small yellow-white granules appear. Soon white butter floats to the top in a soft lump and the liquid underneath turns thin and watery.',
        },
        {
          title: 'Gather the butter',
          text: 'Once butter has floated up and the buttermilk looks thin and cloudy, stop churning. Dip a clean, cold, wet hand into the vessel, scoop the butter into a large pale ball, and gently press it against the side of the vessel to squeeze out the buttermilk. Place it in a bowl of ice-cold water.',
          why: 'Gathering butter by hand with cold, wet palms prevents it from sticking and keeps it firm. Warm hands soften it, so dip them in ice water frequently.',
          cue: 'The butter forms one smooth, soft, creamy-white ball that holds its shape in your hand and leaves the buttermilk behind.',
        },
        {
          title: 'Wash the butter',
          text: 'Knead the butter lightly in the cold water with your fingertips for 20–30 seconds. Pour off the cloudy water and add fresh ice-cold water. Repeat 3 or 4 times until the water stays clear. Lift the butter out and press it gently between two clean palms to squeeze out excess water.',
          why: 'Any buttermilk left in the butter will sour it quickly. Washing in cold water clears it without melting the butter, leaving a clean, sweet, long-lasting white butter.',
          cue: 'The final wash water is clear, the butter feels smooth and slightly waxy, and no watery milk runs from it when pressed.',
        },
        {
          title: 'Shape the butter',
          text: 'With cold, wet palms, roll the butter into small balls the size of a marble or a large grape, or press it into a smooth dome on a clean steel plate. Chill it in the refrigerator for 10 minutes if the room is warm.',
          why: 'Small portions are easier to distribute and look beautiful on the plate. Chilling firms the butter so the mishri sits on top rather than sinking in.',
          cue: 'The balls hold their shape, shine softly and do not stick to the plate.',
        },
        {
          title: 'Top with mishri and tulsi',
          text: 'Just before the offering, sprinkle the crushed mishri generously over the butter. Place a tulsi leaf at the side or on top. Do not add salt, sugar powder or any other flavouring.',
          why: 'Mishri crystals stay crunchy for a few minutes and then begin to melt into the butter; adding them at the last moment keeps the contrast between creamy and crystalline.',
          cue: 'The crushed mishri sparkles on the pale butter like dew, and the tulsi leaf is bright green and unwilted.',
        },
      ],
      offering:
        'Offered at midnight to Bal Gopal along with panjiri and panchamrit. Shared with children first.',
      ritual: [
        'After the butter is made, place it in a clean steel katori or on a small steel plate that is used only for puja. Keep it covered with a clean cloth and refrigerated until the time of offering.',
        'At midnight on Janmashtami, once Krishna is born and the cradle is rocked, bring the plate before the Bal Gopal image. Hold it with both hands and offer it with the words of your family’s prayer, or simply say “Krishnarpanamastu”.',
        'Place a tulsi leaf on the butter. Light a ghee lamp and show the aarti to the deity. Keep the plate before the image for a few minutes while the bells ring and the conch is blown.',
        'Sprinkle a little water around the plate in blessing, then lift it. In many homes the first small portion is touched to the lips of the infant Krishna image.',
        'Distribute the butter on a clean spoon or in a small steel cup to every member of the household, children first. The eldest receives next, and guests follow.',
        'The leftover buttermilk is not discarded. It is spiced lightly with roasted cumin and rock salt and served the next day as prasad as well.',
      ],
      serving:
        'Serve immediately after the offering, a small ball of butter with a few crystals of mishri on a steel spoon or in a katori, about one tablespoon per person. It is eaten as it is, with a clean spoon, along with panjiri and fruit. Do not serve it on hot food, which would melt it.',
      storage:
        'White butter made this way keeps for only 2–3 days in the refrigerator in an airtight steel or glass container covered with cold water, which you change daily. Do not freeze it. Make it fresh for the offering, and use the rest as table butter or convert it into ghee by slowly melting it.',
      troubleshooting: [
        {
          problem: 'The butter does not gather, even after 15 minutes of churning',
          fix: 'The curd is probably too warm. Add a handful of ice cubes and a half cup of cold water, rest the mixture in the refrigerator for 20 minutes, and churn again.',
        },
        {
          problem: 'The butter is greasy, soft and runs through your fingers',
          fix: 'The temperature was too high and the butter has begun to melt. Chill the whole vessel for 30 minutes, then gather with ice-cold hands and wash in ice water.',
        },
        {
          problem: 'The butter tastes sour or smells sharp the next day',
          fix: 'Buttermilk was left in the butter or the curd was over-fermented. Wash the butter in more changes of cold water until it runs completely clear, and use curd that was set for a shorter time.',
        },
        {
          problem: 'The curd did not set overnight',
          fix: 'The milk was too hot or too cold when the starter was added, or the starter was weak. Warm the mixture gently to lukewarm and leave it in a warm place for a few more hours, or restart with a fresher starter.',
        },
        {
          problem: 'Very little butter is produced',
          fix: 'The milk was low in fat or skimmed. Use full-fat milk, or collect and refrigerate the malai from several days’ boiled milk and ferment that together with the curd.',
        },
      ],
      variations: [
        'Collect the cream (malai) from the top of boiled milk for several days, keep it in the refrigerator, and churn it with a spoon of curd; this gives more butter from less milk.',
        'In Gujarat and Rajasthan Pushtimarg temples, the butter is sometimes offered with sugar-candy lumps (kalkandu) or sugar crystals as well as mishri.',
        'South Indian vennai: the butter is made in the same way, but the buttermilk left over is spiced with curry leaves, ginger and green chilli and drunk as neer mor.',
        'If you cannot churn at home, buy fresh unsalted white butter (not yellow, not salted) from a trusted dairy, wash it in ice-cold water and shape it as in the recipe.',
        'For a fasting day, use only rock-sugar crystals and no tulsi powder or spices; the plain butter and mishri is already suitable for most vrats that allow dairy.',
        'Vegan households may offer coconut cream chilled and whipped, with mishri, though it is a different offering and is not considered traditional.',
      ],
      tips: [
        'Skip salt entirely. The offering is always unsalted so the child god’s food is sweet and pure.',
        'Keep everything cold: the vessel, your hands, the washing water. Temperature is the single biggest factor in good butter.',
        'Do not throw the buttermilk away. Drink it spiced, use it for kadhi, or cook with it; wasting the by-product is not in keeping with the tradition.',
        'Offer it as soon as it is shaped. White butter is at its sweetest and creamiest in the first hour.',
        'Use a clean spoon each time you handle it; any contamination from a used spoon will shorten its life.',
      ],
      differs: 'Fresh churned white butter with rock sugar crystals.',
    },
  ],
}

export default recipe
