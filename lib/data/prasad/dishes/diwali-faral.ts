import type { PrasadRecipe } from '../types'

const recipe: PrasadRecipe = {
  id: 'diwali-faral',
  name: 'Diwali Faral',
  alsoCalled: 'Faraal · Chivda, Ladoo & Chakli · दिवाळी फराळ',
  category: 'Sweet',
  summary: 'Maharashtra’s Diwali plate: chivda, besan ladoo and chakli (with karanji).',
  meaning:
    'The Maharashtrian Diwali morning begins with an oil bath (abhyanga snan) and faral, the family snack plate: sweet and salty, fried and roasted. A small portion is offered to the deity first, and the rest is shared with family, neighbours and the first guests of the day. Faral is made over several days before Diwali, often by the women of the house working together. Karanji is also part of the faral — see the Gujiya page for the Maharashtra version.',
  variants: [
    {
      id: 'maharashtra',
      region: 'Maharashtra',
      culture: 'Marathi households — Narak Chaturdashi, Lakshmi Puja',
      title: 'Chivda, Besan Ladoo and Bhajani Chakli',
      intro:
        'Three core items of the faral that can be made in a day: crisp poha chivda, ghee-rich besan ladoo, and spiral chakli made with the multi-grain bhajani flour. Each is a separate recipe below, set out in the order that suits one kitchen: ladoo first so it can rest, chivda next, and chakli last because frying needs your full attention.',
      story:
        'Faral simply means “a light meal that is permitted on a fasting or festival morning”, and in Maharashtra the word has come to mean the Diwali snack plate. The tradition is that on Narak Chaturdashi, the day before Lakshmi Puja, the household wakes before sunrise, lights lamps, rubs the body with fragrant oil and ubtan, and bathes. Only after this bath and a small puja is the faral served, with hot tea, to the family and to anyone who visits.\n\nA proper plate has both sweet and savoury: besan ladoo, rava ladoo, karanji and anarsa on one side; chivda, chakli, shankarpali, sev and shev on the other. Each family has its own signature and its own recipes handed down through grandmothers. The bhajani flour for chakli, for example, is roasted in different grain proportions in each home, and the family’s chakli is recognised by its taste.\n\nPreparing faral is a shared labour. One person roasts, another kneads, another presses the chakli, and children are allowed to pack the tins. It is considered auspicious to give a plate of faral to neighbours, so that the sweetness and the festival are spread through the whole lane. The recipes below give the three most representative items, with the technical details that decide whether they succeed.',
      serves: '10–12 people',
      prep: '1 hr',
      cook: '1.5 hrs',
      equipment: [
        'Wide heavy kadai — roasting and frying both need even heat and room to stir without spilling',
        'Chakli press (sorya) with a star-shaped plate — the star plate makes the characteristic ridged spiral',
        'Greased plate or butter paper — to press the chakli on before sliding them into the oil',
        'Slotted spoon and kitchen tissue — for lifting fried chakli and draining the excess oil',
        'Large mixing bowl and a flat steel plate — for cooling the chivda and the roasted besan',
        'Airtight steel tins — faral is stored in tins; plastic can hold odour and soften the chivda',
      ],
      ingredients: [
        {
          group: 'Poha chivda',
          items: [
            '4 cups thin (patla) poha — choose the very thin, transparent kind; thick poha turns hard instead of crisp',
            '1/3 cup peanuts — raw, skin-on; they fry to a deep golden colour in oil',
            '1/4 cup roasted chana dal (daliya) — already roasted, so it only needs a brief toast in the oil',
            '2 tbsp dried coconut slices — thin chips, not powder; they brown quickly so add them late',
            '1/4 cup oil — groundnut or any neutral oil; enough to coat without making the chivda greasy',
            '1 tsp mustard seeds — they pop in hot oil and flavour the tempering',
            '10 curry leaves — dry them with a cloth first so they crisp without spluttering',
            '2 green chillies, slit — gives gentle heat; remove seeds for a milder chivda',
            '1/2 tsp turmeric — colours the poha evenly golden',
            '1 tsp sugar, salt, a pinch of hing — sugar balances salt and heat; hing aids digestion of the fried snack',
          ],
        },
        {
          group: 'Besan ladoo',
          items: [
            '2 cups coarse besan (ladoo besan) — the coarse grind gives a grainy, melt-away texture; fine besan makes a paste',
            '3/4 cup ghee — pure, melted; it is the flavour and the binding of the ladoo',
            '3/4 cup powdered sugar — sift it so there are no lumps; icing sugar without starch is best',
            '1/2 tsp cardamom — freshly crushed seeds give the best fragrance',
            '2 tbsp chopped almonds/cashews — optional; lightly toasted in a little ghee for crunch',
          ],
        },
        {
          group: 'Bhajani chakli',
          items: [
            '2 cups bhajani flour (roasted multi-grain: jowar, rice, chana dal, urad, wheat) — the roasted flour is what gives chakli its nutty flavour; sold ready-made in Maharashtra',
            '1.5 tbsp white sesame — adds crunch and flavour; wash and dry it first if it is dusty',
            '1 tsp cumin — whole seeds, lightly crushed between the palms to release their aroma',
            '1 tsp red chilli powder, 1/2 tsp turmeric, hing — the standard spicing; adjust the chilli to taste',
            '3 tbsp hot oil — the hot oil in the dough (called mohan) makes the chakli crisp and short instead of chewy',
            'Salt, water to knead — use warm water so the flour binds into a soft, elastic dough',
            'Oil for frying — enough for about 3 cm depth in the kadai; groundnut oil is traditional',
          ],
        },
      ],
      mise: [
        'Sift the besan through a coarse sieve and the powdered sugar through a fine one, so neither carries lumps into the ladoo.',
        'Dry the poha in the sun or in a warm pan; if it is even slightly soft, chivda will be chewy rather than crisp.',
        'Slit the chillies, dry the curry leaves, slice the coconut and measure all the chivda ingredients into small bowls before heating the oil.',
        'Grease the chakli press barrel, the star plate and a plate or two of butter paper, and keep a tissue-lined tray beside the stove.',
        'Place the kadai for frying on a stable burner with 3 cm oil, but do not heat it until the dough is ready.',
      ],
      method: [
        {
          title: 'Roast the besan for the ladoo',
          text:
            'Warm the ghee in a heavy kadai on the lowest heat. Add the coarse besan and stir continuously with a flat spoon for 15–20 minutes. The besan will first form a damp paste, then loosen into a free-flowing, fragrant, golden-brown mass. Do not raise the heat to hurry it.',
          why: 'Raw besan has a bitter, beany taste. Slow roasting cooks out that raw flavour and turns the flour nutty and sweet; high heat browns the outside while the inside stays raw.',
          cue: 'The mixture loosens, smells strongly of roasted gram, turns a deep golden colour and the ghee begins to separate at the edges.',
        },
        {
          title: 'Cool and shape the ladoo',
          text:
            'Take the kadai off the heat and let the besan cool for 10 minutes, stirring occasionally. Add the sifted sugar, cardamom and nuts and mix thoroughly with your hand. Press a small handful together; if it holds, shape it into lime-sized ladoos, pressing firmly while the mixture is still warm.',
          why: 'Sugar added to piping hot besan melts and makes the ladoo heavy and sticky; at warm temperature it stays grainy and binds with the ghee.',
          cue: 'A pinch pressed in your fist keeps its shape; if it crumbles, add 1 tablespoon of warm ghee and try again.',
        },
        {
          title: 'Crisp the poha',
          text:
            'In a wide dry kadai, roast the poha in small batches on low heat for 8–10 minutes, stirring constantly with a spoon. Take each batch out on a large plate when it turns crisp and brittle. Do not let it colour.',
          why: 'Poha absorbs moisture from the air. Roasting dries it fully so that it stays crunchy in the finished chivda for weeks.',
          cue: 'A piece snaps cleanly when pressed between the fingers, and the poha feels light and makes a rustling sound as you stir.',
        },
        {
          title: 'Temper and fry the add-ins',
          text:
            'Heat the oil in the same kadai on medium. Add the mustard seeds and let them pop, then the curry leaves and green chillies. Add the peanuts and fry for 2 minutes, then the chana dal and the coconut slices for 30 seconds. Lower the heat before the coconut browns.',
          why: 'Peanuts need the longest time and coconut the shortest, so they are added in that order. Burnt coconut turns bitter and spoils the whole batch.',
          cue: 'The peanuts turn pale golden and crackle, the curry leaves go translucent and crisp, and the coconut just begins to colour.',
        },
        {
          title: 'Season and fold in the poha',
          text:
            'Reduce the heat to the lowest. Add the turmeric, sugar, salt and hing and stir for 5 seconds only. Immediately tip in the roasted poha and fold gently for 2–3 minutes so that every flake is coloured and coated. Take the chivda off the heat and spread it on a large plate to cool.',
          why: 'Turmeric and hing burn within seconds in hot oil. Folding the poha in quickly spreads the spices evenly without breaking the delicate flakes.',
          cue: 'The chivda is evenly yellow with no white patches, and the flakes are still whole and crisp.',
        },
        {
          title: 'Make the bhajani chakli dough',
          text:
            'In a large bowl mix the bhajani flour with the sesame, cumin, chilli powder, turmeric, hing and salt. Heat 3 tablespoons of oil until very hot and pour it over the flour; mix with a spoon, then knead with warm water into a smooth, soft dough, about 5 minutes. Cover the dough with a damp cloth for 10 minutes.',
          why: 'The hot oil coats the flour and makes the chakli short and crisp. Resting lets the roasted flour absorb water fully, so the dough becomes elastic and does not crack when pressed.',
          cue: 'The dough is soft like a ripe lime, holds together without sticking to your palm, and a small ball pressed flat does not crack at the edges.',
        },
        {
          title: 'Press the chakli',
          text:
            'Grease the barrel of the press and fill it with a portion of the dough, pressing out any air pockets. Fit the star plate, and on a greased plate or butter paper press out a spiral of 3–4 coils, starting from the centre and turning outward with a steady hand. Pinch the end to seal it.',
          why: 'Air pockets in the barrel break the dough ribbon as you press and make uneven chakli. A sealed end stops the coil from opening in the hot oil.',
          cue: 'The ribbon of dough is continuous and ridged, the coils touch each other lightly, and the spiral holds together when lifted.',
        },
        {
          title: 'Fry the chakli',
          text:
            'Heat the frying oil to medium; a pinch of dough dropped in should rise slowly in a few seconds. Slide in 3–4 chakli and fry for 4–5 minutes, turning once, until the bubbles around them subside. Lift out with a slotted spoon and drain on tissue. Cool completely before storing.',
          why: 'Oil that is too hot browns the surface while the centre stays raw and soft; oil that is too cool makes greasy chakli. Bubble subsidence signals that moisture has left the dough.',
          cue: 'The chakli is golden, rigid and makes a clear snapping sound when broken, with no soft raw centre.',
        },
        {
          title: 'Cool, offer and store',
          text:
            'Spread everything on separate plates and cool for at least an hour, until no warmth remains. Take a small portion of each item to the puja, offer it to the deity, and then pack the rest in dry airtight tins, with a sheet of kitchen paper at the bottom of the chivda and chakli tins.',
          why: 'Packing warm faral traps steam, which makes chivda and chakli soft within a day.',
          cue: 'The chakli is cool and hard, the chivda has no residual warmth, and the ladoo has set firm.',
        },
      ],
      offering: 'Offered at Lakshmi Puja and shared on the morning of Narak Chaturdashi with a cup of tea.',
      ritual: [
        'Wake before sunrise on Narak Chaturdashi, light a row of lamps at the doorstep and in the prayer room, and draw a rangoli at the entrance.',
        'Perform the abhyanga snan: massage the body with warm oil and rub in ubtan (gram flour, turmeric and herbs), then bathe, and put on new or clean clothes.',
        'Arrange a small portion of each faral item — a ladoo, a spoon of chivda and a chakli — on a plate or banana leaf in front of the family deity, with lamps and incense.',
        'Offer with a short prayer, sprinkling a few drops of water around the plate. After the aarti, give the first portion to the eldest member of the household.',
        'Serve the faral to the family with hot tea, send plates to neighbours and relatives, and keep a share ready for guests who visit through the Diwali days.',
      ],
      serving:
        'Serve a mixed plate with one ladoo, a heap of chivda and two or three chakli, along with hot masala tea. Chivda can be dressed with chopped onion, coriander and lemon at lunchtime, but the offering portion is kept plain.',
      storage:
        'Store chivda and chakli in airtight steel tins for 3–4 weeks, away from damp. Besan ladoo keeps well for 2–3 weeks at room temperature. If chivda or chakli softens in humid weather, warm it in a low oven for 5–8 minutes and cool it again.',
      troubleshooting: [
        {
          problem: 'The chakli breaks while pressing or does not hold its spiral.',
          fix: 'The dough is too stiff or too dry. Knead in a teaspoon of warm water or oil at a time until soft, and rest it again for 10 minutes.',
        },
        {
          problem: 'The chakli absorbs too much oil and turns soggy.',
          fix: 'The oil was not hot enough, or the dough was too wet. Check the temperature with a pinch of dough and add a spoon of flour to a wet dough.',
        },
        {
          problem: 'The chakli opens up or bursts in the oil.',
          fix: 'The ends were not sealed, or the dough had air pockets. Pinch the ends firmly and press out all air when filling the barrel.',
        },
        {
          problem: 'The besan ladoo tastes raw or crumbles when shaped.',
          fix: 'The besan was under-roasted, or it was too dry. Roast longer on a gentle flame next time, and mix in 1–2 tablespoons of warm ghee for binding.',
        },
        {
          problem: 'The chivda is chewy rather than crisp.',
          fix: 'The poha was not fully dried, or the chivda was packed warm. Re-roast it on a dry pan for 5 minutes, cool fully and store in a dry tin.',
        },
      ],
      variations: [
        'Add 2 tablespoons of roasted cashews and a few raisins to the chivda for the sweet-salty taste of the “Pune chivda”.',
        'Rava ladoo can be added to the plate; roast rava in ghee, mix with sugar syrup, coconut and cardamom, and shape while warm.',
        'For a milder chakli, reduce the chilli powder to 1/2 teaspoon and skip hing for households that avoid it.',
        'Jain and sattvic households make the chivda without hing and the chakli without garlic or onion, which this recipe already avoids.',
        'Karanji, the stuffed crescent of the Diwali plate, is made as a separate sweet — see the Gujiya page for the Maharashtra karanji.',
      ],
      tips: [
        'Roast the besan slowly — rushed besan tastes raw.',
        'Chakli dough must be soft but not sticky; too stiff and the chakli breaks.',
        'Keep the oil at a steady medium heat and fry in small batches for even colour.',
        'Cool everything completely before storing; trapped steam is the main enemy of crisp faral.',
      ],
    },
  ],
}

export default recipe
