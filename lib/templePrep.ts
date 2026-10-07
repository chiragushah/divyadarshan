// ─────────────────────────────────────────────────────────────────────────────
// "Know Before You Go" engine — deity-aware temple preparation & etiquette.
//
// Rule-based and deterministic, like the best-time engine. It gives the
// customary offerings for the deity, the dress code (the temple's own rule when
// we have it), what to carry, what to avoid, and darshan etiquette — the things
// that make a first-time pilgrim comfortable. General guidance, not temple-
// specific rules we can't verify.
// ─────────────────────────────────────────────────────────────────────────────

export interface PrepInput {
  slug?: string
  name?: string
  deity?: string
  type?: string
  state?: string
  dress_code?: string
}

export interface PrepResult {
  offerings: string[]
  offeringNote?: string
  dress: string
  carry: string[]
  avoid: string[]
  etiquette: string[]
}

interface DeityOffering {
  match: RegExp
  offerings: string[]
  note?: string
}

const OFFERINGS: DeityOffering[] = [
  {
    match: /shiv|mahadev|shankar|nataraj|jyotirling|linga|kedar|vishwanath|somnath|mallikarjun|omkar|bhimashankar|trimbak|tryambak|grishnesh|kashi|amarnath|baidyanath|vaidyanath|rameshwar|rameswaram|neelkanth|mahakal/,
    offerings: ['Bilva (bael) leaves — three-lobed, offered to the linga', 'Raw milk, water and honey for abhishekam', 'White flowers, dhatura and aak', 'Bhasma (sacred ash) and a chandan tilak'],
    note: 'By custom, tulsi leaves, turmeric/kumkum and the ketaki flower are not offered to Lord Shiva.',
  },
  {
    match: /krishna|krsn|dwarka|guruvayur|udupi|banke ?bihari|govardhan|nathdwara|srinathji|vitthal|vithoba/,
    offerings: ['Tulsi leaves (essential for Krishna)', 'Butter, mishri (rock sugar) and makhan-mishri', 'Yellow flowers and a peacock feather', 'Milk sweets and panjiri'],
  },
  {
    match: /venkateswara|balaji|tirumala|tirupati|srinivasa|vishnu|narayan|ranganath|padmanabh|govind|perumal|varadaraja|\bram\b|rama|raghunath/,
    offerings: ['Tulsi leaves and a tulsi garland', 'Yellow flowers, sandal paste', 'Fruits, coconut and jaggery', 'Laddu / sweet naivedya'],
  },
  {
    match: /lakshmi|mahalakshmi|padmavathi|ashtalakshmi|ambabai/,
    offerings: ['Lotus flowers', 'Kheel-batasha and sweets', 'Red or pink flowers and sandal', 'Coins / gold symbolism and a coconut'],
  },
  {
    match: /kali|bhadrakali|dakshineswar|kamakhya/,
    offerings: ['Red hibiscus (japa) flowers and a red garland', 'Red chunri, bangles and sindoor', 'Coconut and sweets', 'A lamp of ghee or mustard oil'],
    note: 'In the Shakta tradition some shrines have their own naivedya customs — follow the temple priests.',
  },
  {
    match: /durga|amman|ambaji|vaishno|shakti|bhavani|chamund|meenakshi|\bdevi\b|\bmata\b|jagadamba|renuka|mariamman|mookambika|kanaka|parvati|gauri/,
    offerings: ['Red flowers and a red chunri', 'Bangles, sindoor and kumkum', 'Coconut and sweets', 'A ghee lamp'],
  },
  {
    match: /saraswati/,
    offerings: ['White and yellow flowers', 'Books, pens or a musical instrument for blessing', 'Yellow sweets (kesari / boondi)', 'White sandal and a yellow cloth'],
  },
  {
    match: /ganesh|ganpati|ganapati|vinayak|vinayaka|siddhivinayak|ashtavinayak|vighnes|vigneshwar/,
    offerings: ['Modak and laddu (Ganesha’s favourite)', 'Durva grass — 21 blades', 'Red flowers (hibiscus) and red sandal', 'A coconut'],
    note: 'By custom, tulsi leaves are not offered to Lord Ganesha.',
  },
  {
    match: /hanuman|anjaney|bajrang|maruti|sankat ?mochan/,
    offerings: ['Sindoor mixed with chameli (jasmine) oil', 'Boondi laddu and a betel-leaf (paan) garland', 'Tulsi leaves and red flowers', 'A ghee or til-oil lamp'],
  },
  {
    match: /murugan|muruga|subramany|subrahmany|kartikey|skanda|palani|tiruchendur|velayudha|shanmukha/,
    offerings: ['A vel (symbolic lance) and vibhuti', 'Milk and panchamirtham for abhishekam', 'Fruit, sugarcane and yellow/saffron flowers', 'Kavadi offerings (for those undertaking the vow)'],
  },
  {
    match: /ayyappa|sabarimala|sastha/,
    offerings: ['Ghee for the abhishekam (filled in a coconut)', 'The irumudi kettu — the sacred two-part bundle (for pilgrims on the vratam)', 'Coconut and jaggery'],
    note: 'Sabarimala pilgrims keep a 41-day vratam and wear black/blue; the irumudi is essential to climb the eighteen holy steps.',
  },
  {
    match: /shani|saturn|shingnapur/,
    offerings: ['Black til (sesame) oil', 'Blue or black flowers', 'Black sesame and urad dal', 'A black cloth'],
  },
  {
    match: /surya|sun temple|konark|arasavalli|suryanar/,
    offerings: ['Arghya — water offered to the sun with red flowers and roli', 'Wheat and jaggery', 'Red flowers and sandal', 'A copper vessel of water'],
  },
]

const DEFAULT_OFFERING: DeityOffering = {
  match: /.^/,
  offerings: ['Flowers and a garland', 'Coconut and fruit', 'Incense and a ghee lamp', 'Sweets for naivedya'],
}

const ID_TEMPLES = new Set(['tirumala-venkateswara-temple', 'vaishno-devi-shrine', 'kedarnath-temple', 'sabarimala-ayyappa-temple', 'shirdi-sai-baba-samadhi', 'badrinath-temple', 'gangotri-temple', 'yamunotri-temple'])
const HILL_TEMPLES = new Set(['vaishno-devi-shrine', 'kedarnath-temple', 'sabarimala-ayyappa-temple', 'badrinath-temple', 'gangotri-temple', 'yamunotri-temple', 'tirumala-venkateswara-temple', 'amarnath-cave'])

function pickOffering(input: PrepInput): DeityOffering {
  const hay = `${input.deity || ''} ${input.name || ''} ${input.type || ''}`.toLowerCase()
  return OFFERINGS.find(o => o.match.test(hay)) || DEFAULT_OFFERING
}

export function computePrep(input: PrepInput): PrepResult {
  const off = pickOffering(input)
  const south = /tamil|kerala|andhra|telangana|karnataka/i.test(input.state || '')

  const dress = input.dress_code?.trim()
    ? input.dress_code.trim()
    : south
      ? 'Traditional dress is expected. Men often wear a dhoti/veshti (some sanctums require it, bare-chested with an angavastram); women wear a saree or salwar-kameez. Avoid shorts, sleeveless tops and western wear.'
      : 'Modest, traditional dress is best — kurta-pyjama or shirt-trousers for men, saree or salwar-suit for women. Avoid shorts, short skirts and sleeveless tops.'

  const carry = [
    'Small cash and coins — for offerings, the hundi and local vendors (not all accept cards).',
    'A cloth bag for your footwear and to carry prasad home.',
    'Socks — stone floors get very hot by midday once shoes are off.',
  ]
  if (input.slug && ID_TEMPLES.has(input.slug)) {
    carry.unshift('A government photo ID — needed for registration / online darshan booking at this temple.')
  }
  if (input.slug && HILL_TEMPLES.has(input.slug)) {
    carry.push('Water, a cap and any personal medicines — expect a climb or a long queue.')
  }

  const avoid = [
    'Leather items (belts, wallets, bags) are not allowed inside many sanctums — leave them outside or at the cloak room.',
    'Photography and phones are usually prohibited inside the garbhagriha (sanctum).',
    'Avoid non-vegetarian food and alcohol before darshan.',
  ]

  const etiquette = [
    'Remove footwear (and leather) before entering; wash your hands and feet.',
    'Join the queue calmly — keep the line moving, especially at busy temples.',
    'Do pradakshina (circumambulation) clockwise around the sanctum.',
    'Offer with your right hand; receive prasad and tirtha with both hands.',
    'When leaving the sanctum, step back a little rather than turning your back on the deity.',
  ]

  return { offerings: off.offerings, offeringNote: off.note, dress, carry, avoid, etiquette }
}
