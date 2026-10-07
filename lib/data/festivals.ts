// ─────────────────────────────────────────────────────────────────────────
//  Festivals of India — editorial reference content for DivyaDarshanam
//  Static data (not DB): festival write-ups are reference content, they don't
//  change like live data, so they ship with the code. To add a festival, copy
//  one block below and fill every field. Temple links use slug when known,
//  else `q` (a search term) which always resolves on /explore.
// ─────────────────────────────────────────────────────────────────────────

export interface FestivalTemple {
  name: string
  slug?: string   // deep-links to /temple/<slug> when the temple exists
  q?: string      // else links to /explore?q=<q> (always resolves)
  place?: string  // short location / why-here note
}

export interface Festival {
  slug: string
  name: string
  alsoKnown?: string          // regional / alternate names
  emoji: string
  accent: string              // card accent colour
  deity: string               // primary god/goddess worshipped
  deityGroup: string          // for filtering: Shiva | Vishnu & Avatars | Devi / Shakti | Ganesha | Surya | Murugan | Hanuman | Multi-faith | Sikh | Jain | Buddhist
  deityNote?: string
  season: string              // Winter | Spring | Summer | Monsoon | Autumn
  months: number[]            // 1-12, for month filtering
  whenText: string            // human-readable timing
  calendarBasis: string       // the Hindu/regional calendar tithi
  duration: string
  regionText: string          // where it is biggest
  significance: string        // WHY — meaning & mythology
  howToCelebrate: string[]    // the prescribed / traditional (shastric) way
  howCelebrated: string[]     // how it is ACTUALLY celebrated, region by region
  food: string[]              // festive foods at home
  prasad: string[]            // temple offerings / naivedya
  dance: { name: string; note: string }[]   // dance & performing arts
  temples: FestivalTemple[]   // where to experience it
  greeting?: string
  tip?: string
}

export const FESTIVALS: Festival[] = [
  // ───────────────────────────── DIWALI ─────────────────────────────
  {
    slug: 'diwali',
    name: 'Diwali',
    alsoKnown: 'Deepavali, Deepawali — the Festival of Lights',
    emoji: '🪔',
    accent: '#C0570A',
    deity: 'Goddess Lakshmi (with Lord Ganesha); Lord Rama',
    deityGroup: 'Devi / Shakti',
    deityNote: 'Lakshmi–Ganesha puja in most of India; marks Rama’s return to Ayodhya in the North; Kali Puja in Bengal; Bali Padyami in the South.',
    season: 'Autumn',
    months: [10, 11],
    whenText: 'October–November (new-moon night of Kartik)',
    calendarBasis: 'Amavasya (new moon) of Kartik; a five-day festival from Dhanteras to Bhai Dooj',
    duration: '5 days',
    regionText: 'Celebrated across all of India; Ayodhya, Varanasi and Amritsar are spectacular',
    significance:
      'Diwali is the victory of light over darkness and knowledge over ignorance. In the North it marks Lord Rama’s return to Ayodhya after fourteen years of exile and the defeat of Ravana, the city lighting rows of lamps to welcome him. Across India it is the night Goddess Lakshmi, the deity of prosperity, walks the earth and enters clean, well-lit, welcoming homes. In Bengal the same night is the fierce worship of Goddess Kali, and for Jains it marks Lord Mahavira’s attainment of moksha.',
    howToCelebrate: [
      'Clean and whitewash the home in the days before — Lakshmi enters only where there is cleanliness and order.',
      'Draw a rangoli and light rows of earthen diya at the threshold, windows and tulsi plant at dusk.',
      'Perform Lakshmi–Ganesha puja on the Amavasya evening, ideally during the Pradosh / sthir-lagna muhurat, with lotus, kheel-batasha and a new account book (Chopda Pujan for traders).',
      'Keep the house illuminated through the night and the main door open, symbolically inviting the Goddess.',
    ],
    howCelebrated: [
      'North India: diyas, fairy lights, firecrackers and gift-giving; Ayodhya’s Deepotsav lights lakhs of lamps on the Saryu banks.',
      'Varanasi: Dev Deepawali on Kartik Purnima (15 days later) turns all 84 ghats into a river of a million lamps — one of India’s most breathtaking sights.',
      'Bengal & Odisha: Kali Puja through the night with red hibiscus and deep devotion.',
      'South India: Naraka Chaturdashi at dawn with an oil-bath ritual before sunrise; fewer lamps, more family ritual.',
      'Gujarat & business communities: Chopda Pujan and the start of a new financial year on Bestu Varas.',
    ],
    food: ['Kaju katli, soan papdi and assorted mithai', 'Chakli, chivda, shankarpali and farsan (Maharashtra’s faral)', 'Besan & motichoor ladoo', 'Dry-fruit and milk sweets exchanged as gifts'],
    prasad: ['Kheel (puffed rice) and batasha / sugar-candy', 'Panchamrit', 'Coconut and lotus offered to Lakshmi'],
    dance: [
      { name: 'Folk garba & dandiya (Gujarat, tail end of the season)', note: 'Community circles continue into the festival in western India.' },
      { name: 'Lamp & aarti processions', note: 'Ghat aartis at Varanasi and Ayodhya are performance-scale spectacles.' },
    ],
    temples: [
      { name: 'Kashi Vishwanath & the Ghats (Dev Deepawali)', slug: 'kashi-vishwanath-temple', place: 'Varanasi — a million lamps on the Ganga' },
      { name: 'Ram Lalla / Ram Mandir (Deepotsav)', slug: 'ram-lalla-temple', place: 'Ayodhya, Uttar Pradesh' },
      { name: 'Sri Venkateswara Temple', slug: 'tirumala-venkateswara-temple', place: 'Tirupati — grand illumination' },
      { name: 'Dakshineswar Kali Temple', slug: 'dakshineswar-kali-temple', place: 'Kolkata — Kali Puja night' },
      { name: 'Golden Temple', slug: 'golden-temple-amritsar', place: 'Amritsar — Bandi Chhor Divas lights' },
    ],
    greeting: 'Shubh Deepavali!',
    tip: 'For the single most magical scene, time a Varanasi trip to Dev Deepawali on Kartik Purnima — fifteen days after Diwali — not Diwali night itself.',
  },

  // ───────────────────────────── HOLI ─────────────────────────────
  {
    slug: 'holi',
    name: 'Holi',
    alsoKnown: 'Festival of Colours; Dhuleti / Rangwali Holi',
    emoji: '🎨',
    accent: '#C2185B',
    deity: 'Lord Krishna & Radha; Lord Vishnu (Narasimha–Prahlad)',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'The colours celebrate Krishna’s playful love for Radha in Braj; the eve honours Vishnu saving the devotee Prahlad from Holika.',
    season: 'Spring',
    months: [3],
    whenText: 'March (full-moon day of Phalguna)',
    calendarBasis: 'Phalguna Purnima — Holika Dahan on the eve, Rangwali Holi the next morning',
    duration: '2 days (a week-long affair in Braj)',
    regionText: 'All of North & West India; Vrindavan, Mathura and Barsana are the epicentre',
    significance:
      'Holi marks the arrival of spring and the triumph of devotion over arrogance. Its eve re-enacts the legend of Prahlad: the demoness Holika, immune to fire, burned to ash while the Vishnu-devoted child Prahlad was untouched — the bonfire of Holika Dahan is lit to remember this. The riot of colour the next day flows from Krishna, who, teased about his dark complexion beside fair Radha, playfully smeared colour on her — and so the whole of Braj plays with colour to celebrate divine love that dissolves all distinction.',
    howToCelebrate: [
      'On the eve, gather for Holika Dahan — a community bonfire, circumambulated with offerings of grain, coconut and new harvest.',
      'Begin the next morning after remembering Vishnu / Krishna; elders apply the first tilak of colour as blessing.',
      'Play with natural colours (gulal) and water, setting aside status and grievances — the one day the social order is deliberately turned upside down.',
      'Visit elders and exchange sweets to mend and renew relationships.',
    ],
    howCelebrated: [
      'Braj (Vrindavan–Mathura–Barsana): a week of Lathmar Holi (women playfully “beat” men with sticks), Phoolon ki Holi (flower petals at Banke Bihari), and Laddu Holi.',
      'Across North India: streets full of gulal, water balloons, dhol, bhang thandai and dancing.',
      'Maharashtra & Gujarat: Rang Panchami and matki-phod (human-pyramid pot-breaking) echo the Krishna legend.',
      'Bengal: Dol Jatra / Basanta Utsav — a gentler, song-and-saffron celebration, famously at Santiniketan.',
      'Punjab: Hola Mohalla at Anandpur Sahib — martial-arts and valour displays by the Nihang Sikhs.',
    ],
    food: ['Gujiya (sweet dumplings with khoya & dry fruit)', 'Thandai (often spiced; bhang in some regions)', 'Malpua & rabri', 'Dahi vada, puran poli and savoury namkeen'],
    prasad: ['Gujiya and gulal offered to the deity first', 'Panchamrit and makhan-mishri to Krishna', 'Petals from Banke Bihari’s Phoolon ki Holi'],
    dance: [
      { name: 'Raslila & Charkula (Braj)', note: 'Krishna–Radha folk theatre; the Charkula dancer balances a many-lamped pyramid on the head.' },
      { name: 'Dhamal & folk dhol circles', note: 'Spontaneous community dancing in the colour-play.' },
    ],
    temples: [
      { name: 'Banke Bihari Temple (Phoolon ki Holi)', slug: 'banke-bihari-temple', place: 'Vrindavan, Uttar Pradesh' },
      { name: 'Krishna Janmabhoomi', slug: 'krishna-janmabhoomi-temple', place: 'Mathura' },
      { name: 'Radha Rani Temple, Barsana (Lathmar Holi)', q: 'Barsana Radha Rani', place: 'Barsana, Uttar Pradesh' },
      { name: 'Dwarkadhish Temple', q: 'Dwarkadhish Dwarka', place: 'Dwarka, Gujarat' },
    ],
    greeting: 'Holi Hai! — Happy Holi!',
    tip: 'Braj Holi starts almost a week before the rest of India. Barsana’s Lathmar Holi and Banke Bihari’s flower Holi are bucket-list experiences — book stays months ahead.',
  },

  // ─────────────────────── NAVARATRI / DURGA PUJA ───────────────────────
  {
    slug: 'navaratri-durga-puja',
    name: 'Navaratri & Durga Puja',
    alsoKnown: 'Sharad Navratri; Durga Puja; Golu; Dasara',
    emoji: '🌺',
    accent: '#D81B60',
    deity: 'Goddess Durga and her nine forms (Navadurga)',
    deityGroup: 'Devi / Shakti',
    deityNote: 'Nine nights to the Mother Goddess — Durga, Lakshmi and Saraswati worshipped across three sets of three nights; celebrates Durga’s slaying of the buffalo-demon Mahishasura.',
    season: 'Autumn',
    months: [9, 10],
    whenText: 'September–October (first nine days of Ashwin)',
    calendarBasis: 'Shukla Pratipada to Navami of Ashwin; the tenth day is Vijayadashami',
    duration: '9 nights + Vijayadashami',
    regionText: 'Gujarat (Garba), West Bengal (Durga Puja), Tamil Nadu (Golu), Mysuru (Dasara)',
    significance:
      'Navaratri — “nine nights” — is the great festival of the Divine Feminine, Shakti. It commemorates the Goddess Durga’s ten-day battle with the shape-shifting buffalo-demon Mahishasura, whom no god could defeat, ending in her victory on the tenth day. Each of the nine nights is dedicated to one of the Navadurga forms; the nine days are also grouped to honour Durga (power), Lakshmi (wealth) and Saraswati (wisdom). It is a time of fasting, inner purification and the reassertion of righteousness (dharma) over ego and evil.',
    howToCelebrate: [
      'Install a kalash (ghatasthapana) and sow barley seeds on day one; worship the Goddess daily through the nine nights.',
      'Observe the Navratri fast — satvik food, no grain/onion/garlic — as a bodily discipline supporting the worship.',
      'Worship a specific Navadurga form each day with her colour, flower and bhog.',
      'On Ashtami/Navami perform Kanya Pujan — worshipping nine young girls as embodiments of the Goddess, feeding them and offering gifts.',
    ],
    howCelebrated: [
      'Gujarat: nights of Garba and Dandiya-Raas around the sacred lamp (garbo) — the largest folk-dance celebration on earth.',
      'West Bengal: Durga Puja — grand artistic pandals, clay idols of Durga slaying Mahishasura, dhak drums, and the emotional Bisarjan (immersion) on Dashami.',
      'Tamil Nadu, Karnataka & Andhra: Golu / Bommai Kolu — tiered displays of dolls and deities, with women visiting and exchanging gifts.',
      'Mysuru: the royal Dasara — the illuminated palace and the Jamboo Savari elephant procession of Goddess Chamundeshwari.',
      'North India: Ramlila theatre runs nightly, climaxing in Dussehra.',
    ],
    food: ['Vrat foods — kuttu/singhara puris, sabudana khichdi, samak rice', 'Sundal (South — spiced legumes offered during Golu)', 'Bhog khichuri, labra & payesh (Bengal)', 'Fasting fruits, makhana and dry fruits'],
    prasad: ['Nine-day bhog per the Goddess’s form of the day', 'Kumkum, bangles and red chunri to the Devi', 'Bengal: anna-bhog (khichuri bhog) distributed from the pandal'],
    dance: [
      { name: 'Garba & Dandiya-Raas (Gujarat)', note: 'Circular devotional folk dance around the garbo lamp; dandiya uses paired sticks.' },
      { name: 'Dhunuchi Naach (Bengal)', note: 'Ecstatic dance with a smoking incense-censer before the Goddess during Durga Puja.' },
      { name: 'Bathukamma (Telangana)', note: 'Women dance in circles around a flower-stack honouring the Goddess.' },
    ],
    temples: [
      { name: 'Vaishno Devi Shrine', q: 'Vaishno Devi', place: 'Katra, J&K — peak pilgrimage' },
      { name: 'Kamakhya Devi Temple', slug: 'kamakhya-devi-temple', place: 'Guwahati, Assam — great Shakti Peetha' },
      { name: 'Chamundeshwari Temple (Mysuru Dasara)', slug: 'mysore-chamundeshwari-temple', place: 'Mysuru, Karnataka' },
      { name: 'Dakshineswar & Kalighat (Durga Puja)', slug: 'dakshineswar-kali-temple', place: 'Kolkata, West Bengal' },
      { name: 'Kanaka Durga Temple', slug: 'kanaka-durga-temple', place: 'Vijayawada, Andhra Pradesh' },
    ],
    greeting: 'Jai Mata Di! / Shubho Sharodiya!',
    tip: 'For sheer spectacle, pick your flavour: Kolkata for Durga Puja pandals, Ahmedabad/Vadodara for all-night Garba, or Mysuru for the royal Dasara procession.',
  },

  // ─────────────────────── DUSSEHRA / VIJAYADASHAMI ───────────────────────
  {
    slug: 'dussehra-vijayadashami',
    name: 'Dussehra',
    alsoKnown: 'Vijayadashami; Dasara',
    emoji: '🏹',
    accent: '#E65100',
    deity: 'Lord Rama; Goddess Durga',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'The tenth day — Rama’s victory over Ravana in the North; Durga’s victory over Mahishasura in the East; also honours Saraswati and tools (Ayudha Puja).',
    season: 'Autumn',
    months: [10],
    whenText: 'October (tenth day of Ashwin, after Navaratri)',
    calendarBasis: 'Dashami of Ashwin Shukla paksha',
    duration: '1 day (climax of the Navaratri period)',
    regionText: 'Kullu, Mysuru, Varanasi, Delhi and across North India',
    significance:
      'Vijayadashami, the “victory tenth,” marks the triumph of good over evil on two fronts: Lord Rama’s slaying of the ten-headed king Ravana to rescue Sita, and Goddess Durga’s destruction of Mahishasura. It is considered one of the most auspicious days of the year to begin any new venture, learning or journey. In the martial and artisan traditions it is Ayudha Puja — the day weapons, tools and instruments are cleaned, worshipped and blessed.',
    howToCelebrate: [
      'Worship Rama and/or Durga and seek the blessing to overcome one’s inner “Ravana” of ego and vice.',
      'Perform Ayudha Puja / Shastra Puja — honour the tools of one’s trade, books and vehicles.',
      'Cross the Shami tree / exchange its leaves as “gold” (Seemollanghana), an auspicious act for new beginnings.',
      'Begin a child’s education (Vidyarambham / Aksharabhyasam) — an especially blessed day to start learning.',
    ],
    howCelebrated: [
      'North India: towering effigies of Ravana, Kumbhakarna and Meghnad are burned at dusk after Ramlila, crowds roaring as the fireworks-laden figures blaze.',
      'Kullu (Himachal): a week-long Dussehra where 300+ village deities are carried in procession to honour Raghunath ji — it begins when others end.',
      'Mysuru: the grand finale of Dasara — the gold howdah of Chamundeshwari on a caparisoned elephant through illuminated streets.',
      'Bengal & East: Durga’s immersion (Bisarjan) with sindoor-khela, women smearing each other with vermilion.',
      'South India: Ayudha Puja and Vidyarambham; Saraswati worship for students.',
    ],
    food: ['Jalebi & fafda (a Dussehra staple in Gujarat)', 'Shami-leaf and apta-leaf exchange', 'Festive sweets and savouries', 'Bengal: sweets after sindoor-khela'],
    prasad: ['Offerings to Rama and Durga', 'Blessed Shami / Apta leaves', 'Vehicles and tools garlanded and offered lemon & kumkum'],
    dance: [
      { name: 'Ramlila theatre', note: 'Ten-day enactment of the Ramayana climaxing in the Ravana-vadh.' },
      { name: 'Mysuru folk troupes & Dollu Kunitha', note: 'Drum-dance troupes accompany the Jamboo Savari procession.' },
    ],
    temples: [
      { name: 'Kullu Raghunath Temple', q: 'Kullu Raghunath', place: 'Kullu, Himachal — 300+ deities gather' },
      { name: 'Chamundeshwari Temple', slug: 'mysore-chamundeshwari-temple', place: 'Mysuru, Karnataka' },
      { name: 'Ram Lalla / Ram Mandir', slug: 'ram-lalla-temple', place: 'Ayodhya, Uttar Pradesh' },
      { name: 'Kashi Vishwanath', slug: 'kashi-vishwanath-temple', place: 'Varanasi — grand Ramlila tradition' },
    ],
    greeting: 'Shubh Vijayadashami!',
    tip: 'Kullu Dussehra is the contrarian’s choice — it starts on Vijayadashami and runs a week, with hundreds of palanquin-borne village gods converging on the valley.',
  },

  // ─────────────────────── MAHA SHIVARATRI ───────────────────────
  {
    slug: 'maha-shivaratri',
    name: 'Maha Shivaratri',
    alsoKnown: 'The Great Night of Shiva',
    emoji: '🔱',
    accent: '#1565C0',
    deity: 'Lord Shiva',
    deityGroup: 'Shiva',
    deityNote: 'The night Shiva performs the cosmic dance of creation, preservation and dissolution; also marks the union of Shiva and Parvati.',
    season: 'Winter',
    months: [2, 3],
    whenText: 'February–March (the 14th night of the dark fortnight of Phalguna/Magha)',
    calendarBasis: 'Chaturdashi of Krishna paksha, Magha/Phalguna',
    duration: '1 night (observed through four prahars)',
    regionText: 'All 12 Jyotirlingas and every Shiva temple in India',
    significance:
      'Maha Shivaratri, the “great night of Shiva,” is the most sacred night for the worship of Mahadeva. Tradition holds it to be the night Shiva performed the Tandava — the dance of cosmic creation, preservation and dissolution — and the night of his marriage to Parvati. Spiritually it is a night of stillness and ascent: the planetary positions are said to raise natural energy upward, so devotees keep vigil and stay awake, turning the night into a meditation. Fasting and the all-night worship of the Shiva-linga are believed to wash away accumulated sin and bestow liberation.',
    howToCelebrate: [
      'Fast through the day (nirjala or fruit-only) and keep a night-long vigil (jagaran).',
      'Perform the abhishekam of the Shiva-linga through the four prahars of the night — with water, milk, honey, curd, ghee and sugar.',
      'Offer bilva (bael) leaves, bhang, dhatura and cold water; chant “Om Namah Shivaya” and the Mahamrityunjaya mantra.',
      'Stay awake and inwardly alert — the vigil itself is the worship.',
    ],
    howCelebrated: [
      'At the Jyotirlingas — Kashi Vishwanath, Somnath, Mahakaleshwar, Kedarnath — lakhs queue through the night for linga darshan and abhishek.',
      'Ujjain: the unique Bhasma Aarti of Mahakaleshwar, the linga anointed with sacred ash.',
      'Himalayan & ascetic traditions: Naga sadhus and aghoris gather; bhang and rudraksha are central.',
      'Isha / Coimbatore and many cities: mass night-long satsang and meditation around the festival.',
      'Across India: temples stay open all night; the sound of “Har Har Mahadev” and bells is continuous.',
    ],
    food: ['Vrat fare — sabudana khichdi/vada, kuttu puri, singhare ki aloo', 'Thandai and bhang (traditional in the North)', 'Fruits, makhana, sweet-potato', 'Fast-breaking the next morning with simple satvik food'],
    prasad: ['Bilva leaves, milk and water offered on the linga', 'Bhang, dhatura and cannabis-leaf (traditional offerings)', 'Panchamrit from the abhishekam'],
    dance: [
      { name: 'Natesha / Bharatanatyam before Nataraja', note: 'At Chidambaram, Shiva as Nataraja — the cosmic dancer — is central; classical dancers perform in his honour.' },
      { name: 'Tandava-themed temple performances', note: 'Shiva-tandava stotra recitation and dance across Shaiva temples.' },
    ],
    temples: [
      { name: 'Kashi Vishwanath (Jyotirlinga)', slug: 'kashi-vishwanath-temple', place: 'Varanasi, Uttar Pradesh' },
      { name: 'Mahakaleshwar (Bhasma Aarti)', slug: 'mahakaleshwar-temple', place: 'Ujjain, Madhya Pradesh' },
      { name: 'Somnath (Jyotirlinga)', slug: 'somnath-temple', place: 'Prabhas Patan, Gujarat' },
      { name: 'Chidambaram Nataraja Temple', slug: 'chidambaram-nataraja-temple', place: 'Tamil Nadu' },
      { name: 'Kedarnath', slug: 'kedarnath-temple', place: 'Uttarakhand (winter darshan at Ukhimath)' },
    ],
    greeting: 'Har Har Mahadev!',
    tip: 'Ujjain’s Bhasma Aarti on Shivaratri is extraordinary but needs advance permission/booking. For all-night linga abhishek, Kashi Vishwanath and Somnath are unmatched.',
  },

  // ─────────────────────── KRISHNA JANMASHTAMI ───────────────────────
  {
    slug: 'krishna-janmashtami',
    name: 'Krishna Janmashtami',
    alsoKnown: 'Gokulashtami; Sri Krishna Jayanti',
    emoji: '🦚',
    accent: '#283593',
    deity: 'Lord Krishna (eighth avatar of Vishnu)',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'Celebrates the midnight birth of Krishna in Mathura’s prison to Devaki and Vasudeva.',
    season: 'Monsoon',
    months: [8, 9],
    whenText: 'August–September (eighth night of the dark fortnight of Bhadrapada)',
    calendarBasis: 'Ashtami of Krishna paksha, Bhadrapada — birth celebrated at midnight',
    duration: '1–2 days (Dahi Handi the next day)',
    regionText: 'Mathura–Vrindavan, Dwarka, Udupi, and Maharashtra (Dahi Handi)',
    significance:
      'Janmashtami celebrates the birth of Lord Krishna, the eighth avatar of Vishnu, born at midnight in a Mathura prison to free the world from the tyranny of the demon-king Kamsa. Krishna’s life — the mischievous butter-thief of Gokul, the divine lover of Vrindavan, the charioteer who delivered the Bhagavad Gita at Kurukshetra — embodies divine love, dharma and joy. The festival honours the moment the Divine descends to earth to restore righteousness, as promised in the Gita.',
    howToCelebrate: [
      'Fast through the day and break it only after the midnight birth-moment (Nishita Kaal).',
      'Keep vigil with bhajan and kirtan until midnight; at 12, bathe the infant-Krishna idol (abhishek) and rock it in a cradle (jhula).',
      'Offer makhan-mishri, panchamrit and 56 items (Chhappan Bhog) to the Lord.',
      'Decorate a jhanki depicting Krishna’s birth and the crossing of the Yamuna.',
    ],
    howCelebrated: [
      'Mathura & Vrindavan: the epicentre — temple-wide midnight celebrations, jhankis, and days of raslila theatre.',
      'Maharashtra: Dahi Handi the next day — human pyramids (govindas) break a high-hung pot of curd, re-enacting Krishna’s butter-stealing.',
      'Dwarka & Gujarat: grand darshan and processions at Krishna’s legendary kingdom.',
      'Udupi (Karnataka): Krishna Janmashtami and the following Vittla Pindi with the Paryaya tradition.',
      'ISKCON temples worldwide: elaborate abhishek, Chhappan Bhog and all-night kirtan.',
    ],
    food: ['Makhan-mishri (butter & sugar)', 'Panjiri (roasted flour with ghee, nuts)', 'Dhaniya panjiri prasad', 'Shrikhand, pedha and milk sweets', 'Chhappan Bhog — a 56-dish offering'],
    prasad: ['Makhan-mishri and panchamrit', 'Dhaniya (coriander-seed) panjiri', 'Tulsi-laden charanamrit', 'Chhappan Bhog distributed to devotees'],
    dance: [
      { name: 'Raslila (Braj)', note: 'Devotional dance-drama of Krishna and the gopis — the soul of Vrindavan’s celebration.' },
      { name: 'Kathak', note: 'The classical form itself grew from Krishna-leela story-telling; performed widely on Janmashtami.' },
      { name: 'Dahi Handi / Govinda troupes', note: 'Acrobatic human-pyramid teams in Maharashtra.' },
    ],
    temples: [
      { name: 'Krishna Janmabhoomi', slug: 'krishna-janmabhoomi-temple', place: 'Mathura — Krishna’s birthplace' },
      { name: 'Banke Bihari Temple', slug: 'banke-bihari-temple', place: 'Vrindavan, Uttar Pradesh' },
      { name: 'Dwarkadhish Temple', q: 'Dwarkadhish Dwarka', place: 'Dwarka, Gujarat' },
      { name: 'Udupi Sri Krishna Temple', q: 'Udupi Krishna', place: 'Udupi, Karnataka' },
      { name: 'Guruvayur Temple', slug: 'guruvayur-krishna-temple', place: 'Kerala — the “Dwarka of the South”' },
    ],
    greeting: 'Jai Shri Krishna! Happy Janmashtami!',
    tip: 'Mathura–Vrindavan is unforgettable at midnight but intensely crowded. For a calmer, deeply devotional darshan, Guruvayur and Udupi are superb.',
  },

  // ─────────────────────── GANESH CHATURTHI ───────────────────────
  {
    slug: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    alsoKnown: 'Vinayaka Chaturthi; Ganeshotsav',
    emoji: '🐘',
    accent: '#F57F17',
    deity: 'Lord Ganesha',
    deityGroup: 'Ganesha',
    deityNote: 'Birthday of the elephant-headed remover of obstacles and lord of beginnings.',
    season: 'Monsoon',
    months: [8, 9],
    whenText: 'August–September (fourth day of the bright fortnight of Bhadrapada)',
    calendarBasis: 'Chaturthi of Shukla paksha, Bhadrapada; immersion on Anant Chaturdashi (day 10)',
    duration: '1½ to 10 days',
    regionText: 'Maharashtra (above all Pune & Mumbai), Goa, Karnataka, Telangana',
    significance:
      'Ganesh Chaturthi celebrates the birth of Lord Ganesha, the elephant-headed son of Shiva and Parvati, revered as Vighnaharta — the remover of obstacles — and the deity invoked at the start of every undertaking, journey and worship. The festival welcomes Ganesha as an honoured guest into the home and community for up to ten days before a joyful farewell, symbolising the cycle of arrival, divine presence, and the release of the ego back into the formless. Lokmanya Tilak transformed it into a grand public festival to unite people during the freedom movement.',
    howToCelebrate: [
      'Install a clay Ganesha idol (pranapratishtha) with Vedic invocation on Chaturthi.',
      'Offer 21 durva (grass) blades, modak, red flowers and perform the daily aarti (“Sukhakarta Dukhaharta”).',
      'Avoid looking at the moon on Chaturthi night (the Mithya-dosh legend).',
      'On the final day carry the idol in procession and immerse it (visarjan) in water with “Ganpati Bappa Morya, pudhchya varshi lavkar ya”.',
    ],
    howCelebrated: [
      'Pune: home of the Dagdusheth Halwai Ganpati and the five Manache Ganpati; the processions are the cultural heart of the festival.',
      'Mumbai: enormous public pandals (Lalbaugcha Raja draws millions) and mass visarjan at Girgaum Chowpatty.',
      'Goa (Chavath): a quieter, home-centred festival with matoli canopies of local produce and fierce artistry.',
      'Hyderabad: the towering Khairatabad Ganesh and immersion in Hussain Sagar.',
      'Across the Ashtavinayak circuit of Maharashtra, pilgrimage peaks in this period.',
    ],
    food: ['Modak — steamed ukadiche modak & fried — Ganesha’s favourite', 'Puran poli', 'Motichoor & besan ladoo', 'Karanji and regional sweets'],
    prasad: ['Modak (21 offered)', 'Durva grass and red hibiscus', 'Panchamrit and coconut'],
    dance: [
      { name: 'Dhol-Tasha pathaks (Maharashtra)', note: 'Thunderous drum troupes lead the installation and visarjan processions.' },
      { name: 'Lezim & folk dance', note: 'Traditional rhythmic lezim troupes accompany the processions.' },
    ],
    temples: [
      { name: 'Siddhivinayak Temple', slug: 'siddhivinayak-temple', place: 'Mumbai, Maharashtra' },
      { name: 'Dagdusheth Halwai Ganpati', q: 'Dagdusheth Ganpati Pune', place: 'Pune, Maharashtra' },
      { name: 'Ashtavinayak — Morgaon (Moreshwar)', slug: 'ashtavinayak-morgaon-temple', place: 'Maharashtra — first of the eight' },
      { name: 'Ashtavinayak — Siddhatek', slug: 'ashtavinayak-siddhatek-temple', place: 'Maharashtra' },
    ],
    greeting: 'Ganpati Bappa Morya!',
    tip: 'Pune is the spiritual home of Ganeshotsav — the Manache Ganpati processions and Dagdusheth are magical. For scale, Mumbai’s Lalbaugcha Raja is overwhelming (plan for very long queues).',
  },

  // ─────────────────────── RAM NAVAMI ───────────────────────
  {
    slug: 'ram-navami',
    name: 'Ram Navami',
    alsoKnown: 'Sri Rama Navami',
    emoji: '🏹',
    accent: '#00695C',
    deity: 'Lord Rama (seventh avatar of Vishnu)',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'Celebrates the birth of Rama at noon in Ayodhya to King Dasharatha and Queen Kausalya.',
    season: 'Spring',
    months: [3, 4],
    whenText: 'March–April (ninth day of the bright fortnight of Chaitra)',
    calendarBasis: 'Navami of Shukla paksha, Chaitra — birth celebrated at midday; also the last day of Chaitra Navratri',
    duration: '1 day',
    regionText: 'Ayodhya, Bhadrachalam, Sitamarhi, Rameswaram and across India',
    significance:
      'Ram Navami marks the birth of Lord Rama, the seventh avatar of Vishnu and the maryada purushottama — the perfect embodiment of virtue, duty and righteous kingship. Born at noon in Ayodhya, Rama’s life as told in the Ramayana is the great model of dharma: the ideal son, husband, brother and ruler. The festival celebrates the descent of the Divine to uphold righteousness and destroy the demon-king Ravana. It also closes the nine days of Chaitra Navratri.',
    howToCelebrate: [
      'Fast and worship Rama, Sita, Lakshmana and Hanuman; the birth is marked at noon (Madhyahna).',
      'Read or recite the Ramayana / Ramcharitmanas and the Rama-raksha stotra.',
      'Place a baby-Rama idol in a cradle and perform abhishek and aarti at the birth-moment.',
      'Offer panakam, kosambari and the season’s first produce.',
    ],
    howCelebrated: [
      'Ayodhya: the grandest celebration — Saryu snan, Ram Mandir darshan and the Rath Yatra through the city.',
      'Bhadrachalam (Telangana): Sita Rama Kalyanam — the celestial wedding of Rama and Sita re-enacted with great devotion.',
      'South India: panakam (jaggery-ginger drink), neer-mor and kosambari distributed; Rama-Sita kalyanotsavam performed.',
      'Across North India: shobha yatras, bhandaras and Ramcharitmanas recitation.',
    ],
    food: ['Panakam (jaggery–cardamom–ginger drink)', 'Kosambari (soaked lentil salad)', 'Neer mor (spiced buttermilk)', 'Sabudana and vrat foods where fasting'],
    prasad: ['Panakam and kosambari', 'Tulsi and fruit', 'Dry-fruit panjiri'],
    dance: [
      { name: 'Ramlila & kalyanotsavam', note: 'Enactments of Rama’s story and the Sita-Rama wedding.' },
      { name: 'Classical kalyanam recitals', note: 'Carnatic and Bharatanatyam offerings on Rama themes, esp. in the South.' },
    ],
    temples: [
      { name: 'Ram Lalla / Ram Mandir', slug: 'ram-lalla-temple', place: 'Ayodhya — Rama’s birthplace' },
      { name: 'Hanuman Garhi', slug: 'hanuman-garhi-temple', place: 'Ayodhya, Uttar Pradesh' },
      { name: 'Bhadrachalam Sita Ramachandraswamy', q: 'Bhadrachalam Rama', place: 'Telangana — Sita Rama Kalyanam' },
      { name: 'Ramanathaswamy Temple', q: 'Rameswaram Ramanathaswamy', place: 'Rameswaram, Tamil Nadu' },
    ],
    greeting: 'Jai Shri Ram!',
    tip: 'Ayodhya is now the definitive Ram Navami destination after the Ram Mandir. For the moving Sita-Rama wedding ritual, Bhadrachalam is the classic choice.',
  },

  // ─────────────────────── HANUMAN JAYANTI ───────────────────────
  {
    slug: 'hanuman-jayanti',
    name: 'Hanuman Jayanti',
    alsoKnown: 'Hanuman Janmotsav',
    emoji: '🪔',
    accent: '#D84315',
    deity: 'Lord Hanuman',
    deityGroup: 'Hanuman',
    deityNote: 'Birth of the vanara devotee of Rama — the embodiment of strength, devotion, celibacy and selfless service.',
    season: 'Spring',
    months: [4],
    whenText: 'Usually April (full moon of Chaitra); Dec–Jan in Tamil Nadu',
    calendarBasis: 'Chaitra Purnima in most of India; Margazhi Amavasya in Tamil Nadu; varies by region',
    duration: '1 day',
    regionText: 'All of North India; major Hanuman kshetras nationwide',
    significance:
      'Hanuman Jayanti celebrates the birth of Lord Hanuman, the mighty vanara who is the supreme devotee (parama-bhakta) of Lord Rama. Born of the wind-god Vayu and Anjana, Hanuman embodies limitless strength, courage, humility, lifelong celibacy and selfless service — the ideal of devotion in action. Worshipping him is held to banish fear, evil influence and the troubles of Saturn (Shani), which is why his worship is especially strong on Tuesdays and Saturdays.',
    howToCelebrate: [
      'Recite the Hanuman Chalisa (often 108 times), the Sundarkand and Bajrang Baan.',
      'Offer sindoor (vermilion) and chameli-oil, a betel-leaf garland and boondi/laddu.',
      'Observe a fast and read Rama-katha, since Hanuman lives wherever Rama’s name is sung.',
      'Light a diya with til/chameli oil before the deity.',
    ],
    howCelebrated: [
      'North India: dawn-to-dusk Chalisa recitation, shobha yatras, and huge bhandaras at Hanuman temples.',
      'Sankat Mochan (Varanasi): founded by Tulsidas, a landmark celebration with continuous Chalisa paath.',
      'Maharashtra: reading of the Hanuman birth story (from Samarth Ramdas tradition) at sunrise.',
      'Tamil Nadu & Andhra: Hanumath Jayanti observed on a different date with Anjaneya abhishek with vermilion and vada-mala.',
    ],
    food: ['Boondi laddoo and besan ladoo', 'Churma and halwa', 'Banana and jaggery offerings', 'Vada-mala (garland of medu vada, South)'],
    prasad: ['Sindoor and chameli oil', 'Boondi / laddoo', 'Betel-leaf garland and bananas', 'Vada-mala in the South'],
    dance: [
      { name: 'Veera-themed folk performances', note: 'Mace (gada) and valour displays honour Hanuman’s strength.' },
      { name: 'Bhajan & Chalisa kirtan', note: 'Group chanting is the heart of the day rather than formal dance.' },
    ],
    temples: [
      { name: 'Sankat Mochan Hanuman Temple', slug: 'sankat-mochan-hanuman-temple', place: 'Varanasi — founded by Tulsidas' },
      { name: 'Salasar Balaji', slug: 'salasar-balaji-temple', place: 'Salasar, Rajasthan' },
      { name: 'Hanuman Garhi', slug: 'hanuman-garhi-temple', place: 'Ayodhya, Uttar Pradesh' },
      { name: 'Chilkur Balaji (Hanuman nearby)', q: 'Hanuman temple', place: 'Find a Hanuman temple near you' },
    ],
    greeting: 'Jai Bajrang Bali! Jai Hanuman!',
    tip: 'Hanuman Jayanti falls on different dates in the North (Chaitra Purnima) and in Tamil Nadu (Margazhi). Check the regional date for the temple you plan to visit.',
  },

  // ─────────────────────── MAKAR SANKRANTI ───────────────────────
  {
    slug: 'makar-sankranti',
    name: 'Makar Sankranti',
    alsoKnown: 'Uttarayan; Pongal; Lohri; Magh Bihu; Poush Sankranti',
    emoji: '🪁',
    accent: '#F9A825',
    deity: 'Surya (the Sun God)',
    deityGroup: 'Surya',
    deityNote: 'Marks the sun’s transit into Capricorn (Makara) and the start of its northward journey (Uttarayan) — a turn toward light and auspiciousness.',
    season: 'Winter',
    months: [1],
    whenText: 'Around 14 January (one of the few solar-fixed Hindu festivals)',
    calendarBasis: 'Solar — the sun’s entry into Makara rashi (Capricorn)',
    duration: '1–4 days (regionally)',
    regionText: 'Celebrated all over India under many names and forms',
    significance:
      'Makar Sankranti marks the sun’s transition into Capricorn and the beginning of Uttarayan, its auspicious six-month northward journey. It is one of the few Indian festivals tied to the solar calendar, falling on roughly the same date each year. Symbolically it is the end of the dark, inauspicious period and the turn toward longer, warmer days — a time to let go of the past (the bitterness of sesame) and embrace sweetness and new beginnings. It is also a great harvest thanksgiving across the land.',
    howToCelebrate: [
      'Take a holy dip at dawn in the Ganga, Godavari or a sacred tank — hugely auspicious on this day.',
      'Worship Surya; offer arghya (water) to the rising sun and perform charity (daan) of sesame, jaggery and blankets.',
      'Exchange til-gul (sesame-jaggery) with the words “til-gul ghya, god-god bola” — take this sweet and speak sweetly.',
      'Honour the harvest and cattle; cook the first new rice.',
    ],
    howCelebrated: [
      'Gujarat (Uttarayan): the sky fills with kites in a mass, joyous kite-flying festival.',
      'Tamil Nadu (Pongal): a four-day harvest festival with the boiling-over of sweet Pongal rice and cattle worship (Mattu Pongal).',
      'Punjab (Lohri, the eve): bonfires, sweets and dancing to welcome longer days.',
      'Assam (Magh Bihu): community feasts, bonfires (Meji) and traditional games.',
      'Prayagraj & Ganga Sagar: lakhs take the sacred dip; Ganga Sagar Mela is among the largest gatherings in India.',
    ],
    food: ['Til-gul ladoo & til chikki (sesame-jaggery)', 'Pongal (sweet & ven, Tamil Nadu)', 'Puran poli (Maharashtra)', 'Khichdi (North); pitha (Assam & Bengal)'],
    prasad: ['Til and jaggery', 'Newly harvested rice (Pongal)', 'Sugarcane and winter produce'],
    dance: [
      { name: 'Bhangra & Gidda (Punjab, Lohri)', note: 'Exuberant harvest dances around the bonfire.' },
      { name: 'Bihu dance (Assam)', note: 'Magh/Bhogali Bihu folk dance of the harvest.' },
    ],
    temples: [
      { name: 'Prayagraj Sangam (holy dip)', q: 'Prayagraj Triveni Sangam', place: 'Prayagraj, Uttar Pradesh' },
      { name: 'Konark Sun Temple', slug: 'konark-sun-temple', place: 'Odisha — the great Surya temple' },
      { name: 'Ganga Sagar', q: 'Ganga Sagar Kapil Muni', place: 'Sagar Island, West Bengal' },
      { name: 'Tirumala Venkateswara', slug: 'tirumala-venkateswara-temple', place: 'Tirupati — Vaikunta period crowds' },
    ],
    greeting: 'Happy Makar Sankranti! Til-gul ghya, god-god bola.',
    tip: 'This is a rare fixed-date festival (~Jan 14). For the holy-dip experience, Prayagraj and Ganga Sagar are legendary — and in a Kumbh year, incomparable.',
  },

  // ─────────────────────── PONGAL ───────────────────────
  {
    slug: 'pongal',
    name: 'Pongal',
    alsoKnown: 'Thai Pongal — the Tamil harvest festival',
    emoji: '🌾',
    accent: '#EF6C00',
    deity: 'Surya (the Sun God); Indra; cattle',
    deityGroup: 'Surya',
    deityNote: 'A harvest thanksgiving to the Sun, the rain-god and the earth; the second day (Surya Pongal) is dedicated to the Sun.',
    season: 'Winter',
    months: [1],
    whenText: 'Mid-January (14–17), coinciding with Makar Sankranti',
    calendarBasis: 'First day of the Tamil month of Thai; solar',
    duration: '4 days',
    regionText: 'Tamil Nadu, and Tamil communities worldwide',
    significance:
      'Pongal is Tamil Nadu’s great harvest thanksgiving — four days of gratitude to the Sun, the rains, the earth and the cattle that make the harvest possible. Its name comes from the ritual of boiling the first rice with milk and jaggery until it ceremonially overflows the pot, a sign of abundance and prosperity; everyone cries “Pongalo Pongal!” as it boils over. It celebrates the farmer’s year and the bounty of nature, and is among the most important festivals of the Tamil calendar.',
    howToCelebrate: [
      'Bhogi (day 1): discard the old, clean the home, light a bonfire of unwanted things.',
      'Surya Pongal (day 2): cook sweet Pongal in a new clay pot outdoors facing the sun and let it boil over; offer to Surya with sugarcane and turmeric.',
      'Mattu Pongal (day 3): bathe, paint and garland cattle, and worship them in thanks for their labour.',
      'Kaanum Pongal (day 4): families gather, visit relatives, and outings mark the close.',
    ],
    howCelebrated: [
      'Homes and temples draw elaborate kolam (rangoli) at the threshold.',
      'The new Pongal rice is cooked communally; sugarcane and freshly harvested produce are everywhere.',
      'Jallikattu — the traditional bull-taming sport — is held in parts of Tamil Nadu around Mattu Pongal.',
      'Temple deities are offered the first Pongal; village festivities and folk performances follow.',
    ],
    food: ['Sakkarai Pongal (sweet) & Ven Pongal (savoury)', 'Sugarcane', 'Vadai and payasam', 'Fresh harvest rice dishes'],
    prasad: ['Sakkarai Pongal offered to Surya and the deity', 'Sugarcane and turmeric', 'Fruits and new rice'],
    dance: [
      { name: 'Kolattam & Karagattam', note: 'Tamil folk dances — stick-dance and pot-balancing — performed at Pongal.' },
      { name: 'Mayilattam (peacock dance)', note: 'Temple folk-dance tradition seen in the festive season.' },
    ],
    temples: [
      { name: 'Meenakshi Amman Temple', slug: 'meenakshi-amman-temple', place: 'Madurai, Tamil Nadu' },
      { name: 'Ranganathaswamy Temple', q: 'Srirangam Ranganathaswamy', place: 'Srirangam, Tamil Nadu' },
      { name: 'Brihadeeswarar Temple', q: 'Thanjavur Brihadeeswarar', place: 'Thanjavur, Tamil Nadu' },
      { name: 'Palani Murugan Temple', slug: 'palani-murugan-temple', place: 'Palani, Tamil Nadu' },
    ],
    greeting: 'Pongalo Pongal! Happy Pongal!',
    tip: 'Pongal overlaps Makar Sankranti. The temple towns of Madurai and Thanjavur are stunning with fresh kolam and harvest offerings during these four days.',
  },

  // ─────────────────────── VASANT PANCHAMI ───────────────────────
  {
    slug: 'vasant-panchami',
    name: 'Vasant Panchami',
    alsoKnown: 'Saraswati Puja; Basant Panchami; Sri Panchami',
    emoji: '📖',
    accent: '#FBC02D',
    deity: 'Goddess Saraswati',
    deityGroup: 'Devi / Shakti',
    deityNote: 'Goddess of knowledge, music, art and wisdom; the day also heralds spring (Vasant).',
    season: 'Winter',
    months: [1, 2],
    whenText: 'January–February (fifth day of the bright fortnight of Magha)',
    calendarBasis: 'Panchami of Shukla paksha, Magha',
    duration: '1 day',
    regionText: 'West Bengal, Bihar, Odisha, UP, Punjab and across North & East India',
    significance:
      'Vasant Panchami honours Goddess Saraswati, the deity of knowledge, learning, music and the arts, and marks the arrival of spring. Yellow — the colour of mustard fields in bloom and of the awakening sun — dominates the day. It is considered one of the most auspicious days to begin learning, music, writing or any art, and the Goddess is worshipped by students, scholars, musicians and artists. The day is also auspicious (abujh muhurat) for weddings and new ventures.',
    howToCelebrate: [
      'Dress in yellow; worship Saraswati with yellow flowers, and place books, pens and instruments at her feet.',
      'Perform Vidyarambham / Akshar-abhyasam — a child’s first writing of letters, guided into the alphabet.',
      'Keep books and instruments for worship and refrain from using them until the puja is done.',
      'Offer yellow sweets and the season’s first blossoms.',
    ],
    howCelebrated: [
      'Bengal & Bihar: Saraswati Puja in homes, schools and colleges with clay idols, alpana and anjali offered by students.',
      'North India: kite-flying and yellow attire; mustard-flower motifs everywhere.',
      'Punjab: Basant kite festival, especially historically around Lahore/Amritsar.',
      'Students nationwide seek the Goddess’s blessing before the exam season.',
    ],
    food: ['Boondi/kesar sweets and yellow rice (kesari bhaat)', 'Rajbhog and yellow mithai', 'Khichuri bhog (Bengal)', 'Saffron & turmeric dishes'],
    prasad: ['Yellow flowers and yellow sweets', 'Boroi/plum and seasonal fruit (Bengal)', 'Ink, pen and books blessed at the Goddess’s feet'],
    dance: [
      { name: 'Classical music & dance offerings', note: 'Musicians and dancers begin new compositions as an offering to Saraswati.' },
      { name: 'Cultural programmes in schools', note: 'Recitals and performances mark the day in educational institutions.' },
    ],
    temples: [
      { name: 'Saraswati temples & Shakti Peethas', q: 'Saraswati temple', place: 'Find a Saraswati / Devi temple near you' },
      { name: 'Vishwanath & Vidya temples', slug: 'kashi-vishwanath-temple', place: 'Varanasi — city of learning' },
      { name: 'Kamakhya Devi Temple', slug: 'kamakhya-devi-temple', place: 'Guwahati, Assam' },
      { name: 'Kanchi Kamakshi Temple', slug: 'kanchi-kamakshi-temple', place: 'Kanchipuram, Tamil Nadu' },
    ],
    greeting: 'Happy Vasant Panchami! Jai Maa Saraswati!',
    tip: 'This is the most auspicious day of the year to start a child’s education, learn an instrument, or begin writing a book — many families plan Vidyarambham for it.',
  },

  // ─────────────────────── RATH YATRA ───────────────────────
  {
    slug: 'rath-yatra',
    name: 'Jagannath Rath Yatra',
    alsoKnown: 'Ratha Jatra; the Chariot Festival of Puri',
    emoji: '🛕',
    accent: '#C62828',
    deity: 'Lord Jagannath (a form of Krishna/Vishnu), with Balabhadra & Subhadra',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'The annual journey of Lord Jagannath from his temple to the Gundicha Temple — the only time the deities leave the sanctum for all to see.',
    season: 'Monsoon',
    months: [6, 7],
    whenText: 'June–July (second day of the bright fortnight of Ashadha)',
    calendarBasis: 'Dwitiya of Shukla paksha, Ashadha',
    duration: '~9 days (outward journey to return, Bahuda Yatra)',
    regionText: 'Puri, Odisha (the original and greatest); echoed worldwide by ISKCON',
    significance:
      'The Rath Yatra is the extraordinary annual chariot festival in which Lord Jagannath, his brother Balabhadra and sister Subhadra leave the Jagannath Temple and are pulled on three colossal wooden chariots to the Gundicha Temple, their aunt’s home, where they stay for a week before returning. It is one of the only occasions the deities step out of the sanctum, so that even those who may never enter the temple can have darshan — a profound statement of the Lord coming to the people. Pulling the chariot ropes is believed to be deeply liberating.',
    howToCelebrate: [
      'Build the three chariots anew each year from sacred wood, by hereditary craftsmen.',
      'Perform the Chhera Pahara — the Gajapati king sweeps the chariots with a golden broom, a ritual of humility before the Lord.',
      'Pull the chariots by hand along the Grand Road (Bada Danda) with the whole community.',
      'Offer the Lord his ritual foods and observe the nine-day sojourn and the Bahuda (return) journey.',
    ],
    howCelebrated: [
      'Puri: millions throng the Bada Danda to pull the three towering raths; the air is a roar of conch, cymbal and “Jai Jagannath”.',
      'The deities’ absence and return are marked by special rituals including the Suna Besha (golden attire) on the return.',
      'ISKCON and Odia communities hold Rath Yatras in cities across India and the world.',
      'Ahmedabad and Kolkata (Mahesh) host India’s other famous historic Rath Yatras.',
    ],
    food: ['Chhappan Bhog / Mahaprasad of Puri (56 offerings cooked in earthen pots)', 'Khaja (layered sweet of Puri)', 'Dalma, khichdi and poda pitha', 'Abadha — the sanctified temple meal'],
    prasad: ['Puri Mahaprasad (Anna Mahaprasad)', 'Khaja', 'Tulsi and the deities’ nirmalya'],
    dance: [
      { name: 'Odissi', note: 'Odisha’s classical dance, born of temple ritual to Jagannath, is performed in his honour.' },
      { name: 'Gotipua & Sankirtan', note: 'Acrobatic boy-dancers and kirtan accompany the procession.' },
    ],
    temples: [
      { name: 'Jagannath Temple', slug: 'jagannath-temple-puri', place: 'Puri, Odisha — the original Rath Yatra' },
      { name: 'Gundicha Temple', q: 'Gundicha Temple Puri', place: 'Puri — the destination of the Yatra' },
      { name: 'Konark Sun Temple', slug: 'konark-sun-temple', place: 'Odisha — pair with a Puri visit' },
    ],
    greeting: 'Jai Jagannath!',
    tip: 'Puri during Rath Yatra is one of the most intense crowd experiences in India — plan logistics and stays far ahead, and the Suna Besha on the return is a spectacular bonus darshan.',
  },

  // ─────────────────────── ONAM ───────────────────────
  {
    slug: 'onam',
    name: 'Onam',
    alsoKnown: 'Thiruvonam — Kerala’s harvest festival',
    emoji: '🌼',
    accent: '#2E7D32',
    deity: 'Lord Vamana (Vishnu avatar) & King Mahabali',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'Welcomes the beloved asura-king Mahabali on his annual visit to his people; Vamana, Vishnu’s dwarf avatar, is central to the legend.',
    season: 'Monsoon',
    months: [8, 9],
    whenText: 'August–September (the asterism Thiruvonam in the Malayalam month of Chingam)',
    calendarBasis: 'Malayalam solar calendar — ten days ending on Thiruvonam',
    duration: '10 days',
    regionText: 'Kerala and Malayali communities everywhere',
    significance:
      'Onam is Kerala’s grand harvest festival and the homecoming of the legendary King Mahabali — a just and generous asura ruler under whom, legend says, Kerala knew a golden age of equality and plenty. To check his growing power, Vishnu took the form of the dwarf Vamana and, in three strides, sent Mahabali to the netherworld — but granted him one boon: to visit his beloved people once a year. Onam celebrates that annual return, a festival of homecoming, equality, gratitude and shared abundance that crosses all communities in Kerala.',
    howToCelebrate: [
      'Lay a pookalam — an intricate circular flower carpet — growing larger over the ten days to welcome Mahabali.',
      'Set out the Onathappan (a clay pyramid representing Vamana/Mahabali) and worship it.',
      'Serve the Onasadya — a grand vegetarian feast of 20–30+ dishes on a banana leaf.',
      'Wear new clothes (Onakkodi) and honour the spirit of equality and welcome.',
    ],
    howCelebrated: [
      'Homes compete in elaborate pookalam flower carpets and prepare the Onasadya.',
      'Vallam Kali — the spectacular snake-boat races, with crews of a hundred rowers — draw huge crowds (Aranmula, Nehru Trophy).',
      'Pulikali (tiger dance), Thiruvathira, and temple festivities fill the ten days.',
      'Thrikkakara Temple (the Vamana temple) is the ritual centre of Onam.',
    ],
    food: ['Onasadya — the great banana-leaf feast', 'Payasam (ada pradhaman, palada)', 'Avial, olan, thoran, sambar, rasam', 'Banana chips and sharkara varatti'],
    prasad: ['Offerings to Onathappan / Vamana', 'Payasam', 'Fresh flowers and new harvest'],
    dance: [
      { name: 'Thiruvathira Kali', note: 'Graceful circular women’s dance around a lamp, central to Onam.' },
      { name: 'Pulikali (tiger dance)', note: 'Painted “tiger” dancers parade, especially in Thrissur.' },
      { name: 'Kathakali', note: 'Kerala’s majestic classical dance-drama is staged during the season.' },
    ],
    temples: [
      { name: 'Thrikkakara Vamana Temple', q: 'Thrikkakara temple', place: 'Kochi — the home of Onam' },
      { name: 'Guruvayur Sri Krishna Temple', slug: 'guruvayur-krishna-temple', place: 'Thrissur, Kerala' },
      { name: 'Padmanabhaswamy Temple', q: 'Padmanabhaswamy Thiruvananthapuram', place: 'Thiruvananthapuram, Kerala' },
      { name: 'Aranmula Parthasarathy (boat race)', q: 'Aranmula temple', place: 'Aranmula, Kerala' },
    ],
    greeting: 'Happy Onam! Onam Ashamsakal!',
    tip: 'Thiruvonam is the main day, but the ten-day build-up is the real experience — time it with a snake-boat race (Aranmula or the Nehru Trophy at Alappuzha).',
  },

  // ─────────────────────── UGADI / GUDI PADWA ───────────────────────
  {
    slug: 'ugadi-gudi-padwa',
    name: 'Ugadi & Gudi Padwa',
    alsoKnown: 'Yugadi; Gudi Padwa; Chaitra Shukla Pratipada; Deccan New Year',
    emoji: '🌱',
    accent: '#558B2F',
    deity: 'Lord Brahma; Lord Vishnu',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'Marks the day Brahma created the universe (per tradition) and the start of the new lunar year; also linked to Rama’s coronation in Maharashtra.',
    season: 'Spring',
    months: [3, 4],
    whenText: 'March–April (first day of the bright fortnight of Chaitra)',
    calendarBasis: 'Chaitra Shukla Pratipada — the lunar new year',
    duration: '1 day',
    regionText: 'Karnataka, Andhra, Telangana (Ugadi); Maharashtra, Goa (Gudi Padwa)',
    significance:
      'Ugadi (“the beginning of an age”) and Gudi Padwa mark the lunar new year across the Deccan and western India, falling on the first day of Chaitra. Tradition holds this to be the day Lord Brahma created the universe and set time in motion. It is a day of new beginnings — new ventures, new clothes, cleaned and decorated homes — and of accepting the year ahead in all its flavours. In Maharashtra the raised Gudi flag also recalls Lord Rama’s victory and return, and the Marathi spirit of triumph.',
    howToCelebrate: [
      'Clean and decorate the home; draw rangoli and hang mango-leaf toran.',
      'Maharashtra: raise the Gudi — a bright cloth, neem and mango leaves, and an inverted pot on a bamboo — at the doorway for victory and prosperity.',
      'Eat the ritual Ugadi Pachadi / bevu-bella — a mix of six tastes (neem, jaggery, raw mango, tamarind, chilli, salt) symbolising that life holds all flavours.',
      'Hear the Panchanga Sravanam — the new year’s almanac read aloud for the coming year.',
    ],
    howCelebrated: [
      'Andhra, Telangana, Karnataka: Ugadi Pachadi, new clothes, temple visits, and poetry/literary gatherings (Kavi Sammelanam).',
      'Maharashtra & Goa: Gudis rise over doorways, shobha yatras in cities like Mumbai (Girgaon) and Pune, in bright traditional attire.',
      'Families begin new accounts, ventures and purchases on this auspicious day.',
    ],
    food: ['Ugadi Pachadi / Bevu-Bella (six-taste mix)', 'Puran poli & shrikhand (Maharashtra)', 'Obbattu / holige (Karnataka)', 'Pulihora and bobbatlu (Andhra/Telangana)'],
    prasad: ['Ugadi Pachadi offered first to the deity', 'Neem flowers and jaggery', 'New mango and seasonal produce'],
    dance: [
      { name: 'Lezim & shobha-yatra troupes (Maharashtra)', note: 'Processional folk performances in festive Maharashtrian attire.' },
      { name: 'Cultural & literary programmes', note: 'Kavi Sammelanam and classical recitals mark the Deccan new year.' },
    ],
    temples: [
      { name: 'Tirumala Venkateswara', slug: 'tirumala-venkateswara-temple', place: 'Tirupati — Panchanga Sravanam' },
      { name: 'Kanaka Durga Temple', slug: 'kanaka-durga-temple', place: 'Vijayawada, Andhra Pradesh' },
      { name: 'Mahalaxmi Temple', q: 'Mahalaxmi Temple Mumbai', place: 'Mumbai, Maharashtra' },
      { name: 'Mysore Chamundeshwari', slug: 'mysore-chamundeshwari-temple', place: 'Mysuru, Karnataka' },
    ],
    greeting: 'Ugadi Shubhakankshalu! / Gudi Padwa chya Hardik Shubhechha!',
    tip: 'Mumbai’s Girgaon Gudi Padwa shobha yatra, with thousands in traditional Maharashtrian dress on bikes and on foot, is a photographer’s dream.',
  },

  // ─────────────────────── VAIKUNTHA EKADASHI ───────────────────────
  {
    slug: 'vaikuntha-ekadashi',
    name: 'Vaikuntha Ekadashi',
    alsoKnown: 'Mukkoti Ekadashi; Mokshada Ekadashi',
    emoji: '🚪',
    accent: '#0277BD',
    deity: 'Lord Vishnu',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'The day the gate of Vaikuntha (Vishnu’s abode) is said to open; passing through the Vaikuntha Dwaram grants liberation.',
    season: 'Winter',
    months: [12, 1],
    whenText: 'December–January (the Ekadashi of the bright fortnight of Margashirsha/Dhanur month)',
    calendarBasis: 'Shukla Ekadashi in Dhanurmasa',
    duration: '1 day',
    regionText: 'Tirumala, Srirangam and all major Vishnu temples of the South',
    significance:
      'Vaikuntha Ekadashi is the most sacred of the year’s 24 Ekadashis, when the gates of Vaikuntha — the celestial abode of Lord Vishnu — are believed to open. Devotees who fast and pass through the Vaikuntha Dwaram (the northern “gate of heaven”) in the temple on this day are said to attain liberation (moksha). It is also the day in the Mahabharata on which the Bhagavad Gita was revealed (Gita Jayanti). Fasting, vigil and total absorption in Vishnu’s name define the observance.',
    howToCelebrate: [
      'Observe a strict Ekadashi fast (often nirjala) and keep a night-long vigil of Vishnu-bhajan.',
      'Pass through the Vaikuntha Dwaram / Paramapada Vasal in the temple at dawn.',
      'Recite the Vishnu Sahasranama and the Bhagavad Gita.',
      'Break the fast the next morning (Dwadashi) at the prescribed time.',
    ],
    howCelebrated: [
      'Tirumala: the Vaikuntha Dwaram around the sanctum is opened; immense queues of devotees pass through.',
      'Srirangam: the ten-day Vaikunta Ekadashi festival with the grand opening of the Paramapada Vasal (gate of heaven) is among the South’s greatest events.',
      'Vishnu temples everywhere hold special darshan, abhishek and processions of the utsava deity.',
    ],
    food: ['Ekadashi vrat food — no rice/grains; fruits, sabudana, singhara', 'Sweet pongal and sundal at temples', 'Milk and fruit', 'Fast broken on Dwadashi with simple satvik food'],
    prasad: ['Tulsi and Vishnu charanamrit', 'Temple pongal / puliyodarai', 'Laddu (Tirumala)'],
    dance: [
      { name: 'Divya Prabandham recitation', note: 'The Tamil Vaishnava hymns are chanted in procession, especially at Srirangam.' },
      { name: 'Bharatanatyam offerings', note: 'Classical dance in honour of Vishnu during the festival.' },
    ],
    temples: [
      { name: 'Sri Venkateswara Temple', slug: 'tirumala-venkateswara-temple', place: 'Tirumala — Vaikuntha Dwaram' },
      { name: 'Ranganathaswamy Temple', q: 'Srirangam Ranganathaswamy', place: 'Srirangam — Paramapada Vasal' },
      { name: 'Padmanabhaswamy Temple', q: 'Padmanabhaswamy Thiruvananthapuram', place: 'Thiruvananthapuram, Kerala' },
    ],
    greeting: 'Jai Srinivasa! / Om Namo Narayanaya!',
    tip: 'Srirangam’s gate-of-heaven opening draws enormous crowds. If you want to pass through the Vaikuntha Dwaram at Tirumala, go very early and expect long waits.',
  },

  // ─────────────────────── CHHATH PUJA ───────────────────────
  {
    slug: 'chhath-puja',
    name: 'Chhath Puja',
    alsoKnown: 'Chhathi Maiya Puja; Surya Shashthi; Dala Chhath',
    emoji: '🌅',
    accent: '#EF6C00',
    deity: 'Surya (the Sun God) & Chhathi Maiya (Usha)',
    deityGroup: 'Surya',
    deityNote: 'A rare festival worshipping the setting and rising sun directly, and Chhathi Maiya, giver of children and wellbeing.',
    season: 'Autumn',
    months: [10, 11],
    whenText: 'October–November (sixth day after Diwali, Kartik Shukla Shashthi)',
    calendarBasis: 'Shashthi of Shukla paksha, Kartik',
    duration: '4 days',
    regionText: 'Bihar, Jharkhand, eastern UP, and the Nepal Terai',
    significance:
      'Chhath is an ancient festival of thanksgiving to Surya, the Sun — the source of all life and energy — and to Chhathi Maiya, his consort/sister energy who blesses households with children, health and prosperity. It is one of the only festivals that worships the setting sun as well as the rising sun, honouring both decline and renewal. Famous for its austerity, Chhath is observed with extraordinary discipline — fasting without even water, standing in rivers, and purity of mind and body — and is regarded as among the most demanding and sincere of vratas, performed mostly by women (vratins).',
    howToCelebrate: [
      'Nahay Khay (day 1): bathe in a river and eat one pure satvik meal.',
      'Kharna (day 2): a day-long fast broken at night with kheer and roti, after which the 36-hour nirjala (waterless) fast begins.',
      'Sandhya Arghya (day 3): stand in the river at sunset to offer arghya to the setting sun with a bamboo soop of fruits and thekua.',
      'Usha Arghya (day 4): offer arghya to the rising sun at dawn and break the fast (paran).',
    ],
    howCelebrated: [
      'River banks and ghats (the Ganga at Patna, ponds everywhere) fill with vratins in the water offering arghya at dawn and dusk.',
      'Homes prepare thekua and the ritual prasad with strict purity; no onion, garlic or impurity enters the kitchen.',
      'Folk Chhath songs fill the air; the whole community supports the fasting women.',
      'A festival of deep collective discipline rather than spectacle.',
    ],
    food: ['Thekua (wheat-jaggery-ghee sweet) — the signature prasad', 'Kheer and roti (Kharna)', 'Seasonal fruits — sugarcane, banana, coconut, water-chestnut', 'Rice-laddu (kasar)'],
    prasad: ['Thekua and kasar', 'Fruits offered on the bamboo soop', 'Sugarcane and coconut'],
    dance: [
      { name: 'Chhath geet (folk songs)', note: 'Haunting traditional Chhath songs, not dance, carry the festival’s devotion.' },
    ],
    temples: [
      { name: 'Ganga ghats, Patna', q: 'Patna Ganga ghat', place: 'Bihar — the great Chhath riverbanks' },
      { name: 'Dev Surya Mandir, Aurangabad', q: 'Dev Surya Mandir Bihar', place: 'Bihar — famed Sun temple' },
      { name: 'Konark Sun Temple', slug: 'konark-sun-temple', place: 'Odisha — India’s iconic Surya temple' },
    ],
    greeting: 'Happy Chhath Puja! Jai Chhathi Maiya!',
    tip: 'The dawn Usha Arghya on a river ghat — thousands standing waist-deep facing the rising sun — is profoundly moving. Patna’s ghats are the classic setting.',
  },

  // ─────────────────────── GURU PURNIMA ───────────────────────
  {
    slug: 'guru-purnima',
    name: 'Guru Purnima',
    alsoKnown: 'Vyasa Purnima; Ashadhi Purnima',
    emoji: '🙏',
    accent: '#6A1B9A',
    deity: 'Sage Veda Vyasa; the Guru principle',
    deityGroup: 'Multi-faith',
    deityNote: 'Honours Veda Vyasa (compiler of the Vedas) and all gurus — spiritual teachers who dispel the darkness of ignorance.',
    season: 'Monsoon',
    months: [7],
    whenText: 'July (full moon of Ashadha)',
    calendarBasis: 'Ashadha Purnima',
    duration: '1 day',
    regionText: 'Observed across India at ashrams, maths and by Buddhists and Jains too',
    significance:
      'Guru Purnima honours the guru — the teacher who removes the darkness (“gu”) of ignorance and reveals the light (“ru”) of knowledge. It celebrates Sage Veda Vyasa, who compiled the Vedas, authored the Mahabharata and the Puranas, and is regarded as the adi-guru. The day is one of gratitude: disciples honour their spiritual and academic teachers and the lineage of wisdom passed from guru to shishya. Buddhists mark it as the day the Buddha gave his first sermon at Sarnath, and it is important in Jain tradition as well.',
    howToCelebrate: [
      'Offer worship and gratitude (guru-dakshina) to one’s guru and teachers.',
      'Perform Vyasa Puja and read or hear the scriptures.',
      'Renew spiritual practice — mantra, meditation and study — under the guru’s guidance.',
      'Observe the day with satsang, fasting or charity.',
    ],
    howCelebrated: [
      'Ashrams and maths across India hold Vyasa Puja, padapuja of the guru, and discourses.',
      'Disciples travel to their guru or lineage seat to offer respects.',
      'Sarnath and Buddhist centres mark the Buddha’s first teaching.',
      'Students honour academic mentors; music and dance gurus are specially venerated by their students.',
    ],
    food: ['Satvik feast / langar at ashrams', 'Kheer and festive sweets', 'Fruits offered to the guru', 'Simple fasting food for observers'],
    prasad: ['Charanamrit and tulsi from the guru’s worship', 'Blessed sweets', 'Flowers offered at the guru’s feet'],
    dance: [
      { name: 'Guru-vandana recitals', note: 'Classical musicians and dancers offer their art to their gurus on this day.' },
    ],
    temples: [
      { name: 'Ashrams, maths & guru-seats', q: 'guru ashram temple', place: 'Visit your lineage’s seat' },
      { name: 'Sarnath (Buddhist first sermon)', q: 'Sarnath temple', place: 'Varanasi, Uttar Pradesh' },
      { name: 'Shirdi Sai Baba Samadhi', q: 'Shirdi Sai Baba', place: 'Shirdi, Maharashtra' },
    ],
    greeting: 'Happy Guru Purnima! Guru Brahma, Guru Vishnu…',
    tip: 'If you have a spiritual or artistic guru, this is the traditional day to visit them. Ashrams hold their biggest gatherings of the year around Guru Purnima.',
  },

  // ─────────────────────── NAG PANCHAMI ───────────────────────
  {
    slug: 'nag-panchami',
    name: 'Nag Panchami',
    alsoKnown: 'Naga Panchami; serpent worship',
    emoji: '🐍',
    accent: '#00838F',
    deity: 'Nagas (serpent deities); Lord Shiva',
    deityGroup: 'Shiva',
    deityNote: 'Worship of the divine serpents — especially Shesha, Vasuki and Takshaka — closely linked to Shiva, who wears the serpent Vasuki.',
    season: 'Monsoon',
    months: [7, 8],
    whenText: 'July–August (fifth day of the bright fortnight of Shravana)',
    calendarBasis: 'Panchami of Shukla paksha, Shravana',
    duration: '1 day',
    regionText: 'Maharashtra, Karnataka, Bengal, Rajasthan and across India',
    significance:
      'Nag Panchami is the worship of the Nagas, the divine serpents of Hindu cosmology, during the holy month of Shravana. Serpents are revered as guardians of the earth’s treasures and waters, as the bed (Shesha) on which Vishnu reclines, and as the ornament of Lord Shiva. The monsoon brings snakes closer to human habitation, and the festival is both reverence and a plea for protection from snakebite, as well as worship for fertility, progeny and the removal of Kal Sarpa Dosha in astrology.',
    howToCelebrate: [
      'Worship images or live depictions of the Naga, offering milk, turmeric, flowers and rice.',
      'Draw serpent figures at the doorway and worship them.',
      'Observe a fast and avoid digging the earth or cutting (to not harm serpents) on this day.',
      'Those with Kal Sarpa Dosha perform special Naga puja at serpent shrines.',
    ],
    howCelebrated: [
      'Snake idols, anthills and Naga stones are worshipped with milk and vermilion.',
      'Battis Shirala (Maharashtra) is historically famous for its Nag Panchami observances.',
      'Kukke Subramanya (Karnataka) and other serpent kshetras see special Sarpa Samskara and Ashlesha Bali rituals.',
      'Women pray for the wellbeing of brothers and family, echoing serpent-brother legends.',
    ],
    food: ['Milk-based sweets and kheer', 'No frying / grinding traditionally (to avoid “hurting” the serpent)', 'Steamed foods — dindaand patoli', 'Jowar/rice preparations'],
    prasad: ['Milk and turmeric offered to the Naga', 'Lotus and wildflowers', 'Puffed rice and sweets'],
    dance: [
      { name: 'Nagamandala / Nagaradhane (Karnataka)', note: 'Ritual serpent-worship performance with elaborate serpent kolam and trance dance.' },
    ],
    temples: [
      { name: 'Kukke Subramanya Temple', slug: 'kukke-subramanya-temple', place: 'Karnataka — great serpent kshetra' },
      { name: 'Mannarasala Nagaraja Temple', q: 'Mannarasala temple', place: 'Kerala — famed Naga temple' },
      { name: 'Mahakaleshwar (Nagchandreshwar)', slug: 'mahakaleshwar-temple', place: 'Ujjain — opens only on Nag Panchami' },
    ],
    greeting: 'Happy Nag Panchami!',
    tip: 'The Nagchandreshwar shrine atop Mahakaleshwar in Ujjain opens for darshan only once a year — on Nag Panchami. If you’re anywhere near Ujjain, don’t miss it.',
  },

  // ─────────────────────── RAKSHA BANDHAN ───────────────────────
  {
    slug: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    alsoKnown: 'Rakhi; Rakhi Purnima; Nariyal Purnima; Avani Avittam',
    emoji: '🧵',
    accent: '#AD1457',
    deity: 'The bond of protection (also Balarama, Yama–Yamuna, Indra–Sachi legends)',
    deityGroup: 'Multi-faith',
    deityNote: 'A festival of the sacred thread of protection between siblings; also the day Brahmins change the sacred thread (Avani Avittam).',
    season: 'Monsoon',
    months: [8],
    whenText: 'August (full moon of Shravana)',
    calendarBasis: 'Shravana Purnima',
    duration: '1 day',
    regionText: 'All of North, West & Central India; coastal Nariyal Purnima; South Avani Avittam',
    significance:
      'Raksha Bandhan — “the bond of protection” — celebrates the love and duty between brothers and sisters. A sister ties a rakhi (a sacred thread) on her brother’s wrist, praying for his wellbeing; he in turn vows to protect her and offers a gift. The thread is a bond of mutual care that over time has widened to any relationship of protection. On the same Shravana Purnima, coastal communities offer coconuts to the sea (Nariyal Purnima) and Brahmins ritually renew their sacred thread (Avani Avittam / Upakarma).',
    howToCelebrate: [
      'The sister performs aarti, applies tilak and ties the rakhi on the brother’s right wrist.',
      'The brother offers a gift and the vow of protection; sweets are shared.',
      'Brahmins perform Upakarma — changing the yajnopavita (sacred thread) with Vedic rites (Avani Avittam).',
      'Coastal communities offer coconuts to the sea, marking the calmer post-monsoon waters.',
    ],
    howCelebrated: [
      'Families gather; rakhis are tied, often sent across cities and countries to absent brothers.',
      'Maharashtra & Konkan coast: Nariyal Purnima — fishermen offer coconuts to the sea before resuming fishing.',
      'South India: Avani Avittam, the mass sacred-thread-changing ceremony on riverbanks.',
      'North India: markets fill with rakhis and sweets for days ahead.',
    ],
    food: ['Ghevar (the signature Rakhi sweet of Rajasthan/UP)', 'Kaju katli, barfi and ladoo', 'Home-made sweets exchanged', 'Coconut dishes on the coast'],
    prasad: ['Sweets offered to the deity before tying', 'Coconut (Nariyal Purnima)', 'Rice and turmeric for the tilak'],
    dance: [
      { name: 'Folk celebrations', note: 'A home-and-family festival — its warmth is in ritual and togetherness rather than public dance.' },
    ],
    temples: [
      { name: 'Krishna temples (Balarama bond)', slug: 'banke-bihari-temple', place: 'Vrindavan — Shravana Purnima darshan' },
      { name: 'Coastal Shiva/Devi temples', q: 'temple near me', place: 'Nariyal Purnima on the Konkan coast' },
    ],
    greeting: 'Happy Raksha Bandhan!',
    tip: 'This is primarily a family festival. If travelling, time it with Shravana — the holiest month for Shiva — and combine with a Jyotirlinga visit.',
  },

  // ─────────────────────── KARVA CHAUTH ───────────────────────
  {
    slug: 'karva-chauth',
    name: 'Karva Chauth',
    alsoKnown: 'Karak Chaturthi',
    emoji: '🌙',
    accent: '#B71C1C',
    deity: 'Lord Shiva, Parvati, Ganesha & the Moon',
    deityGroup: 'Shiva',
    deityNote: 'Married women fast for the long life and wellbeing of their husbands, worshipping Shiva–Parvati and offering arghya to the moon.',
    season: 'Autumn',
    months: [10, 11],
    whenText: 'October–November (fourth day of the dark fortnight of Kartik)',
    calendarBasis: 'Chaturthi of Krishna paksha, Kartik',
    duration: '1 day',
    regionText: 'North & West India — Punjab, Haryana, Rajasthan, UP, Delhi',
    significance:
      'Karva Chauth is a vrat observed by married women for the long life, health and prosperity of their husbands (and increasingly by both partners for each other). From sunrise to moonrise the women keep a strict nirjala fast — without food or water — breaking it only after they sight the moon and offer it arghya. The festival weaves together the devotion of Parvati for Shiva and the famous legends of Savitri and of Queen Veervati, celebrating marital love, fidelity and the strength of the vrata.',
    howToCelebrate: [
      'Eat sargi (a pre-dawn meal, traditionally from the mother-in-law) before sunrise.',
      'Keep the nirjala fast through the day; dress in bridal finery with mehndi and the sixteen adornments (solah shringar).',
      'Gather in the afternoon to worship Shiva–Parvati–Ganesha and hear the Karva Chauth katha, passing the karva (pot) in a circle.',
      'At moonrise, view the moon through a sieve, then the husband’s face, and break the fast with water and food from his hand.',
    ],
    howCelebrated: [
      'Women gather in colourful groups for the collective katha and thali-rotation ceremony.',
      'Markets bloom with mehndi, bangles and karvas in the days before.',
      'Families celebrate the moonrise together; the husband often gifts the wife.',
      'Popular culture has made it one of North India’s most visible and romantic festivals.',
    ],
    food: ['Sargi — fenia/pheni, dry fruits, fruit before dawn', 'Festive dinner after moonrise', 'Mathri and sweets in the puja thali', 'Regional post-fast specialities'],
    prasad: ['Offerings to Shiva–Parvati–Ganesha', 'Water offered as arghya to the moon', 'Sweets and fruit from the karva'],
    dance: [
      { name: 'Community katha & song', note: 'Women’s folk songs accompany the thali-passing ceremony rather than formal dance.' },
    ],
    temples: [
      { name: 'Shiva–Parvati temples', q: 'Shiva temple', place: 'Find a Shiva temple near you' },
      { name: 'Birla Mandir / city temples', q: 'temple near me', place: 'North Indian cities' },
    ],
    greeting: 'Happy Karva Chauth!',
    tip: 'Moonrise timing varies by city — check your local moonrise before planning the evening puja and fast-breaking.',
  },

  // ─────────────────────── AKSHAYA TRITIYA ───────────────────────
  {
    slug: 'akshaya-tritiya',
    name: 'Akshaya Tritiya',
    alsoKnown: 'Akha Teej; Akti',
    emoji: '✨',
    accent: '#F9A825',
    deity: 'Lord Vishnu & Goddess Lakshmi',
    deityGroup: 'Vishnu & Avatars',
    deityNote: '“Akshaya” means never-diminishing; anything begun or given on this day is believed to grow and never decay. Birth of Parashurama; the day the Char Dham’s Badrinath and Kedarnath reopen.',
    season: 'Spring',
    months: [4, 5],
    whenText: 'April–May (third day of the bright fortnight of Vaishakha)',
    calendarBasis: 'Tritiya of Shukla paksha, Vaishakha',
    duration: '1 day',
    regionText: 'All of India; especially auspicious at Badrinath, Puri and Simhachalam',
    significance:
      'Akshaya Tritiya is one of the most auspicious days of the Hindu year — “akshaya” meaning that which never diminishes. Whatever is begun, invested, given in charity or worshipped on this day is believed to bring never-ending growth and merit. It is held to be the birthday of Parashurama (the sixth avatar of Vishnu), the day the Ganga descended to earth, and the day Vyasa began dictating the Mahabharata. It needs no muhurat — the whole day is auspicious — making it a favoured day for weddings, new ventures and buying gold.',
    howToCelebrate: [
      'Worship Vishnu and Lakshmi; perform charity (daan) of food, water, fans and umbrellas for the coming heat.',
      'Begin new ventures, investments or learning — all are believed to flourish.',
      'Buy gold or start savings as a symbol of ever-growing prosperity.',
      'Offer the season’s sattu, barley and cooling foods.',
    ],
    howCelebrated: [
      'Badrinath & Kedarnath reopen for the season around this time — the Himalayan Char Dham yatra begins.',
      'Puri: the construction of the Rath Yatra chariots traditionally begins on Akshaya Tritiya; Chandan Yatra starts.',
      'Simhachalam (Andhra): the Chandanotsava — the deity’s sandal-paste covering is removed, revealing the true form for just this day.',
      'Jewellers see their biggest day of the year; families start new accounts and buy gold.',
    ],
    food: ['Sattu, barley and cooling drinks (aam panna, panakam)', 'Festive sweets', 'Seasonal mango dishes', 'Charity food (bhandara)'],
    prasad: ['Sandalwood paste (chandan) — esp. Simhachalam', 'Tulsi and panchamrit', 'Barley and summer fruits'],
    dance: [
      { name: 'Temple utsava processions', note: 'Chandan Yatra boat processions of the utsava deities begin at Puri.' },
    ],
    temples: [
      { name: 'Badrinath Temple (reopening)', slug: 'badrinath-temple', place: 'Uttarakhand — Char Dham season begins' },
      { name: 'Jagannath Temple (Chandan Yatra)', slug: 'jagannath-temple-puri', place: 'Puri, Odisha' },
      { name: 'Simhachalam (Chandanotsava)', q: 'Simhachalam temple', place: 'Visakhapatnam, Andhra Pradesh' },
      { name: 'Tirumala Venkateswara', slug: 'tirumala-venkateswara-temple', place: 'Tirupati, Andhra Pradesh' },
    ],
    greeting: 'Shubh Akshaya Tritiya!',
    tip: 'Simhachalam’s Chandanotsava is a rare darshan — the deity’s original form is visible only on this one day each year, before the sandal-paste is reapplied.',
  },

  // ─────────────────────── KARTIK PURNIMA / DEV DEEPAWALI ───────────────────────
  {
    slug: 'kartik-purnima-dev-deepawali',
    name: 'Kartik Purnima & Dev Deepawali',
    alsoKnown: 'Tripurari Purnima; Dev Diwali; Guru Nanak Gurpurab (same day)',
    emoji: '🕯️',
    accent: '#5E35B1',
    deity: 'Lord Shiva (Tripurari) & Lord Vishnu; the Ganga',
    deityGroup: 'Shiva',
    deityNote: 'Marks Shiva’s destruction of the three demon-cities (Tripurasura) and Vishnu’s Matsya avatar; the gods are said to descend to bathe in the Ganga at Kashi.',
    season: 'Autumn',
    months: [11],
    whenText: 'November (full moon of Kartik, 15 days after Diwali)',
    calendarBasis: 'Kartik Purnima',
    duration: '1 day',
    regionText: 'Varanasi (Dev Deepawali), Pushkar, and Ganga/holy-river towns',
    significance:
      'Kartik Purnima is among the holiest full moons of the year. It celebrates Lord Shiva’s destruction of the three flying cities of the demon Tripurasura (hence Tripurari Purnima) and is also linked to Vishnu’s first avatar, Matsya. In Varanasi it becomes Dev Deepawali — the “Diwali of the Gods” — when the devas are believed to descend to bathe in the Ganga, and the city’s 84 ghats are lit with over a million earthen lamps. A holy dip on Kartik Purnima is of immense merit, and the same day is Guru Nanak’s birth anniversary for Sikhs.',
    howToCelebrate: [
      'Take a holy dip (Kartik snan) in the Ganga or a sacred river at dawn.',
      'Light lamps on riverbanks and float diya on the water in the evening.',
      'Worship Shiva and Vishnu; perform charity and the ritual tulsi-vivah season closes around now.',
      'Observe the Kartik-month vrat and deep-daan (lamp offering).',
    ],
    howCelebrated: [
      'Varanasi: Dev Deepawali — over a million lamps on all 84 ghats, the grand Ganga aarti, and laser/cultural shows — arguably the most beautiful night in India.',
      'Pushkar (Rajasthan): the famous Pushkar Camel Fair and holy dip in Pushkar Lake peak on Kartik Purnima.',
      'Across North India: Ganga ghats glow with floating lamps; fairs (melas) are held at river confluences.',
      'Sikhs celebrate Guru Nanak Jayanti with nagar kirtan and langar.',
    ],
    food: ['Kartik-vrat satvik food', 'Sweets and kheer', 'Pushkar fair street food (Rajasthan)', 'Prasad of the ghat aartis'],
    prasad: ['Floating diya and Ganga-jal', 'Tulsi and sweets', 'Charity food (anna-daan)'],
    dance: [
      { name: 'Ganga Aarti (Varanasi)', note: 'The choreographed multi-priest lamp aarti at Dashashwamedh is a performance in itself.' },
      { name: 'Rajasthani folk (Pushkar)', note: 'Kalbeliya and folk dances enliven the Pushkar fair.' },
    ],
    temples: [
      { name: 'Kashi Vishwanath & the 84 ghats', slug: 'kashi-vishwanath-temple', place: 'Varanasi — Dev Deepawali' },
      { name: 'Brahma Temple, Pushkar', q: 'Pushkar Brahma temple', place: 'Pushkar, Rajasthan' },
      { name: 'Haridwar Har Ki Pauri', slug: 'haridwar-har-ki-pauri', place: 'Haridwar — Kartik snan & aarti' },
    ],
    greeting: 'Happy Kartik Purnima! / Dev Deepawali ki shubhkamnayein!',
    tip: 'Dev Deepawali in Varanasi is the crown jewel of the festival calendar for sheer visual beauty. Book a boat on the Ganga months in advance for the best view of the lamp-lit ghats.',
  },

  // ─────────────────────── THAIPUSAM ───────────────────────
  {
    slug: 'thaipusam',
    name: 'Thaipusam',
    alsoKnown: 'Thai Poosam',
    emoji: '🦚',
    accent: '#00796B',
    deity: 'Lord Murugan (Kartikeya / Subramanya)',
    deityGroup: 'Murugan',
    deityNote: 'Celebrates the day Parvati gave Murugan the divine vel (spear) to vanquish the demon Soorapadman — a festival of penance and vows.',
    season: 'Winter',
    months: [1, 2],
    whenText: 'January–February (Pusam asterism in the Tamil month of Thai)',
    calendarBasis: 'Full-moon/Pusam nakshatra in Thai',
    duration: '1 main day (days of build-up)',
    regionText: 'Tamil Nadu (Palani, Tiruchendur) and Tamil diaspora (Malaysia, Singapore)',
    significance:
      'Thaipusam honours Lord Murugan, the warrior son of Shiva and Parvati, on the day his mother gave him the vel — the divine spear with which he destroyed the demon Soorapadman and his forces. It is above all a festival of penance, vows and thanksgiving: devotees who have had prayers answered fulfil their vows through acts of devotion and endurance, carrying the kavadi as an offering of burden borne for the Lord. It is one of the most physically intense and visually striking devotional festivals in the world.',
    howToCelebrate: [
      'Undertake a vow (often weeks of fasting, celibacy and satvik living) before the day.',
      'Carry the kavadi — a decorated arched burden — often with milk-pots (paal kudam) for abhishekam.',
      'Shave the head and climb to the hill shrine barefoot; some pierce the skin, cheeks or tongue with vel-shaped skewers as acts of penance.',
      'Offer the milk and the vel at Murugan’s feet, fulfilling the vow.',
    ],
    howCelebrated: [
      'Palani: hundreds of thousands climb the hill with kavadis and milk-pots; the Panchamirtham prasad is legendary.',
      'Tiruchendur, Thiruparankundram and the six Padai Veedu (abodes of Murugan) hold great Thaipusam festivities.',
      'Malaysia (Batu Caves) and Singapore host some of the largest Thaipusam processions outside India.',
      'Processions move to drumming, with devotees in trance bearing elaborate kavadis.',
    ],
    food: ['Panchamirtham (Palani’s famous fruit-honey-jaggery prasad)', 'Milk and sacred ash (vibhuti)', 'Satvik vow-fasting food', 'Pongal and vadai at temples'],
    prasad: ['Palani Panchamirtham', 'Milk abhishekam prasad', 'Vibhuti and vel-blessed offerings'],
    dance: [
      { name: 'Kavadi Attam', note: 'The rhythmic “kavadi dance” of devotees bearing the kavadi to drumbeats — the heart of Thaipusam.' },
      { name: 'Mayilattam (peacock dance)', note: 'Murugan’s vahana, the peacock, is honoured in temple folk dance.' },
    ],
    temples: [
      { name: 'Palani Murugan Temple', slug: 'palani-murugan-temple', place: 'Palani, Tamil Nadu' },
      { name: 'Tiruchendur Murugan Temple', q: 'Tiruchendur Murugan', place: 'Tamil Nadu' },
      { name: 'Kukke Subramanya', slug: 'kukke-subramanya-temple', place: 'Karnataka' },
      { name: 'Thiruparankundram Murugan', q: 'Thiruparankundram Murugan', place: 'Madurai, Tamil Nadu' },
    ],
    greeting: 'Vel Vel Muruga! Haro Hara!',
    tip: 'Palani during Thaipusam is one of the most powerful devotional sights in India. If you can’t manage the crowds, any of the six Padai Veedu Murugan temples celebrates grandly.',
  },

  // ─────────────────────── THRISSUR POORAM ───────────────────────
  {
    slug: 'thrissur-pooram',
    name: 'Thrissur Pooram',
    alsoKnown: 'The Pooram of PADAI Thrissur — the festival of festivals',
    emoji: '🐘',
    accent: '#EF6C00',
    deity: 'Goddess (Paramekkavu & Thiruvambady Bhagavathy); Lord Shiva (Vadakkunnathan)',
    deityGroup: 'Devi / Shakti',
    deityNote: 'Two temple deities (Paramekkavu and Thiruvambady) pay homage to Lord Shiva at the Vadakkunnathan Temple with a grand assembly of caparisoned elephants.',
    season: 'Summer',
    months: [4, 5],
    whenText: 'April–May (Pooram asterism in the Malayalam month of Medam)',
    calendarBasis: 'Pooram nakshatra in Medam',
    duration: '~36 hours of celebration',
    regionText: 'Thrissur, Kerala — the cultural capital of the state',
    significance:
      'Thrissur Pooram is Kerala’s grandest temple festival — a dazzling, 200-year-old spectacle centred on the Vadakkunnathan Shiva Temple. Two rival temple groups, Paramekkavu and Thiruvambady, bring their Bhagavathy (Goddess) deities in grand procession to pay homage, each fielding a magnificent line of caparisoned elephants, percussion orchestras and the famous Kudamattam (parasol exchange). It is less a ritual of penance than a communal celebration of art, rhythm, colour and civic pride, drawing lakhs of spectators.',
    howToCelebrate: [
      'The participating temples bring their deities in ezhunnallippu — processions of richly caparisoned elephants.',
      'Perform the Ilanjithara Melam — a massive two-hour percussion ensemble of hundreds of drummers and horn-players.',
      'Hold the Kudamattam — the rhythmic, competitive exchange of brilliantly coloured ceremonial parasols atop the elephants.',
      'Close with the spectacular pre-dawn fireworks (Vedikettu).',
    ],
    howCelebrated: [
      'Thirty-plus caparisoned elephants line up before the Vadakkunnathan temple in a breathtaking display.',
      'The Ilanjithara Melam is considered one of the finest percussion performances in the world.',
      'Crowds roar at each flourish of the Kudamattam parasol exchange.',
      'Two competing firework displays light the night sky before dawn.',
    ],
    food: ['Kerala sadya (feast)', 'Payasam', 'Banana chips and local sweets', 'Street food around the Thekkinkadu maidan'],
    prasad: ['Offerings to Vadakkunnathan Shiva and the Bhagavathy', 'Flowers and coconut', 'Temple prasadam'],
    dance: [
      { name: 'Panchavadyam & Ilanjithara Melam', note: 'Monumental Kerala temple-percussion ensembles — the musical soul of the Pooram.' },
      { name: 'Kathakali & folk arts', note: 'Kerala’s classical and ritual arts are staged through the festival.' },
    ],
    temples: [
      { name: 'Vadakkunnathan Temple', q: 'Vadakkunnathan Thrissur', place: 'Thrissur — the heart of the Pooram' },
      { name: 'Paramekkavu Bhagavathy Temple', q: 'Paramekkavu temple Thrissur', place: 'Thrissur, Kerala' },
      { name: 'Guruvayur Sri Krishna Temple', slug: 'guruvayur-krishna-temple', place: 'Nearby — combine the visit' },
    ],
    greeting: 'Happy Thrissur Pooram!',
    tip: 'The Ilanjithara Melam (afternoon percussion) and the pre-dawn competitive fireworks are the two unmissable highlights. Arrive early for a spot near the Vadakkunnathan temple.',
  },

  // ─────────────────────── BAISAKHI ───────────────────────
  {
    slug: 'baisakhi',
    name: 'Baisakhi',
    alsoKnown: 'Vaisakhi; Mesha Sankranti; Vishu/Puthandu/Bihu (regional new years)',
    emoji: '🌾',
    accent: '#F57C00',
    deity: 'Harvest thanksgiving; the Khalsa (Sikh); the Sun (Mesha Sankranti)',
    deityGroup: 'Sikh',
    deityNote: 'The spring harvest festival of Punjab; the day Guru Gobind Singh founded the Khalsa in 1699; also solar new year across several regions.',
    season: 'Spring',
    months: [4],
    whenText: 'Around 13–14 April (sun’s entry into Aries / Mesha)',
    calendarBasis: 'Solar — Mesha Sankranti; a fixed-date festival',
    duration: '1 day',
    regionText: 'Punjab & Haryana above all; a new-year day across much of India',
    significance:
      'Baisakhi is the great spring harvest festival of Punjab — a joyous thanksgiving for the ripened rabi crop — and, for Sikhs, one of the most sacred days of the year: it was on Baisakhi in 1699 that Guru Gobind Singh founded the Khalsa, baptising the first Panj Pyare and giving the Sikh community its distinctive identity. The same solar turning point (Mesha Sankranti) marks the new year in many regions — Vishu in Kerala, Puthandu in Tamil Nadu, Pohela Boishakh in Bengal, Bohag Bihu in Assam — making it a nationwide day of renewal and harvest.',
    howToCelebrate: [
      'Visit the gurdwara for special prayers, kirtan and the Guru Granth Sahib; share in langar.',
      'Thank the earth for the harvest; farmers celebrate the reaped crop.',
      'Take part in nagar kirtan processions and Gatka (martial-arts) displays.',
      'In new-year regions, perform the customary first-sight rituals and begin the year auspiciously.',
    ],
    howCelebrated: [
      'Punjab: exuberant Bhangra and Gidda in the fields, fairs (melas), and gurdwara celebrations — especially grand at Anandpur Sahib and the Golden Temple.',
      'Kerala: Vishu with the Vishukkani (auspicious first sight) arranged the night before and Vishu kaineettam (gifts).',
      'Tamil Nadu: Puthandu with the kanni (auspicious viewing) and new-year feast.',
      'Bengal & Assam: Pohela Boishakh and Bohag Bihu with new clothes, feasts and folk dance.',
    ],
    food: ['Langar at the gurdwara', 'Kada prasad (sacred wheat halwa)', 'Makki di roti & sarson da saag', 'Regional new-year feasts (Vishu sadya, Puthandu meals)'],
    prasad: ['Kada prasad (Sikh)', 'Vishukkani offerings (Kerala)', 'First-harvest grains'],
    dance: [
      { name: 'Bhangra & Gidda (Punjab)', note: 'The quintessential high-energy harvest dances of Punjab.' },
      { name: 'Gatka', note: 'Sikh martial-arts display during nagar kirtan.' },
    ],
    temples: [
      { name: 'Golden Temple', slug: 'golden-temple-amritsar', place: 'Amritsar — grand Baisakhi' },
      { name: 'Takht Sri Keshgarh Sahib', q: 'Anandpur Sahib gurdwara', place: 'Anandpur Sahib — birth of the Khalsa' },
      { name: 'Padmanabhaswamy (Vishu)', q: 'Padmanabhaswamy Thiruvananthapuram', place: 'Kerala — Vishukkani darshan' },
    ],
    greeting: 'Happy Baisakhi! / Vishu Ashamsakal!',
    tip: 'This is a rare fixed-date festival (~Apr 13–14). The Golden Temple and Anandpur Sahib are extraordinary on Baisakhi; in Kerala, arrange your Vishukkani the night before.',
  },

  // ─────────────────────── GURU NANAK JAYANTI ───────────────────────
  {
    slug: 'guru-nanak-jayanti',
    name: 'Guru Nanak Jayanti',
    alsoKnown: 'Gurpurab; Guru Nanak Gurpurab; Prakash Utsav',
    emoji: '☬',
    accent: '#F9A825',
    deity: 'Guru Nanak Dev Ji (founder of Sikhism)',
    deityGroup: 'Sikh',
    deityNote: 'Celebrates the birth of Guru Nanak, the first Sikh Guru, who taught oneness of God, equality and selfless service.',
    season: 'Autumn',
    months: [11],
    whenText: 'November (Kartik Purnima)',
    calendarBasis: 'Kartik Purnima (full moon)',
    duration: '3 days of observance',
    regionText: 'Punjab and Sikh communities across India and the world',
    significance:
      'Guru Nanak Jayanti — Gurpurab — celebrates the birth of Guru Nanak Dev Ji, the founder of Sikhism, who taught the oneness of God (Ik Onkar), the equality of all people regardless of caste or creed, honest living, and selfless service. Through his travels (udasis) and hymns, he laid the foundation of a faith centred on devotion, community and service. It is the most important festival in the Sikh calendar, observed with scripture, song and the langar that embodies Nanak’s message of equality and sharing.',
    howToCelebrate: [
      'Hold the Akhand Path — a continuous 48-hour reading of the Guru Granth Sahib — concluding on the Gurpurab.',
      'Take part in the Nagar Kirtan procession led by the Panj Pyare and the Palki of the Guru Granth Sahib.',
      'Rise in the early-morning (Amrit Vela) for Asa di Var kirtan.',
      'Serve and share in langar — the free community kitchen open to all.',
    ],
    howCelebrated: [
      'Gurdwaras are illuminated; nagar kirtans fill the streets with hymns, Gatka displays and flower-decked floats.',
      'Golden Temple, Amritsar: the most radiant celebration, lit with lamps and fireworks, with continuous kirtan.',
      'Nankana Sahib (Guru Nanak’s birthplace) draws pilgrims across the border.',
      'Langar is served everywhere; homes and gurdwaras glow with lights.',
    ],
    food: ['Langar — dal, roti, sabzi, kheer for all', 'Kada prasad (sacred halwa)', 'Jalebi and festive sweets', 'Community-cooked vegetarian meals'],
    prasad: ['Kada prasad', 'Langar as sanctified sharing', 'Karah (semolina/wheat halwa)'],
    dance: [
      { name: 'Kirtan & shabad', note: 'Devotional hymn-singing from the Guru Granth Sahib is central; not a dance festival.' },
      { name: 'Gatka', note: 'Traditional Sikh martial-arts display in the nagar kirtan.' },
    ],
    temples: [
      { name: 'Golden Temple (Harmandir Sahib)', slug: 'golden-temple-amritsar', place: 'Amritsar, Punjab' },
      { name: 'Takht Sri Patna Sahib', q: 'Patna Sahib gurdwara', place: 'Patna, Bihar' },
      { name: 'Bangla Sahib', q: 'Bangla Sahib gurdwara Delhi', place: 'New Delhi' },
    ],
    greeting: 'Happy Gurpurab! Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh!',
    tip: 'The Golden Temple on Gurpurab night — lamp-lit, reflected in the sarovar, with fireworks overhead — is unforgettable. Expect very large, peaceful crowds.',
  },

  // ─────────────────────── MAHAVIR JAYANTI ───────────────────────
  {
    slug: 'mahavir-jayanti',
    name: 'Mahavir Jayanti',
    alsoKnown: 'Mahavir Janma Kalyanak',
    emoji: '🕉️',
    accent: '#00897B',
    deity: 'Lord Mahavira (24th Tirthankara of Jainism)',
    deityGroup: 'Jain',
    deityNote: 'Celebrates the birth of Mahavira, the 24th and last Tirthankara, who taught ahimsa (non-violence), truth and non-attachment.',
    season: 'Spring',
    months: [4],
    whenText: 'March–April (thirteenth day of the bright fortnight of Chaitra)',
    calendarBasis: 'Chaitra Shukla Trayodashi',
    duration: '1 day',
    regionText: 'Jain communities across India — Gujarat, Rajasthan, Maharashtra, Karnataka',
    significance:
      'Mahavir Jayanti celebrates the birth of Lord Mahavira, the 24th and last Tirthankara of Jainism, whose teachings crystallised the Jain path: ahimsa (non-violence to all living beings), satya (truth), asteya (non-stealing), brahmacharya (chastity) and aparigraha (non-attachment). Born a prince, he renounced the world to attain enlightenment (kevala jnana) and showed the way to liberation of the soul. It is the most important festival for Jains, observed with devotion, reflection and compassion toward all life.',
    howToCelebrate: [
      'Perform the ceremonial abhishek (anointing) of the Tirthankara idol with the Janma Kalyanak ritual.',
      'Carry the idol in a rath yatra / procession through the community.',
      'Engage in prayer, meditation, scripture study and listening to Mahavira’s teachings.',
      'Practise charity, non-violence and vegetarianism with special resolve; many observe fasts.',
    ],
    howCelebrated: [
      'Jain temples are decorated; grand processions and idol abhishek mark the day.',
      'Discourses on Mahavira’s life and teachings are held; alms and charity are given.',
      'Pilgrimages to Jain tirthas — Palitana, Ranakpur, Shravanabelagola, Sammed Shikharji — peak around this time.',
      'Acts of compassion toward animals and the needy are central.',
    ],
    food: ['Strictly satvik, vegetarian Jain food (no root vegetables)', 'Milk-based sweets', 'Simple, pure fare; many fast', 'Community meals after the puja'],
    prasad: ['Offerings during the Janma Kalyanak abhishek', 'Fruits and dry fruits', 'Sanctified sweets'],
    dance: [
      { name: 'Devotional stavan & bhakti', note: 'Jain hymns (stavan) and processional devotion rather than dance.' },
    ],
    temples: [
      { name: 'Ranakpur Jain Temple', slug: 'ranakpur-jain-temple', place: 'Rajasthan — marble masterpiece' },
      { name: 'Palitana (Shatrunjaya)', q: 'Palitana Jain temple', place: 'Gujarat — hill of a thousand temples' },
      { name: 'Shravanabelagola (Gomateshwara)', q: 'Shravanabelagola', place: 'Karnataka' },
      { name: 'Nakoda Jain Temple', slug: 'nakoda-jain-temple', place: 'Rajasthan' },
    ],
    greeting: 'Happy Mahavir Jayanti! Jai Jinendra!',
    tip: 'Pair the festival with a visit to a great Jain tirtha — Ranakpur and Palitana are architectural wonders and deeply serene on Mahavir Jayanti.',
  },

  // ─────────────────────── BUDDHA PURNIMA ───────────────────────
  {
    slug: 'buddha-purnima',
    name: 'Buddha Purnima',
    alsoKnown: 'Vesak; Buddha Jayanti',
    emoji: '☸️',
    accent: '#FBC02D',
    deity: 'Gautama Buddha',
    deityGroup: 'Buddhist',
    deityNote: 'Marks the birth, enlightenment and parinirvana of the Buddha — all believed to have occurred on the same full-moon day.',
    season: 'Summer',
    months: [4, 5],
    whenText: 'April–May (full moon of Vaishakha)',
    calendarBasis: 'Vaishakha Purnima',
    duration: '1 day',
    regionText: 'Bodh Gaya, Sarnath, Kushinagar, Lumbini; the Himalayan and East Asian Buddhist world',
    significance:
      'Buddha Purnima — Vesak — is the most sacred day in Buddhism, commemorating three central events said to have occurred on the same Vaishakha full moon: the birth of Prince Siddhartha at Lumbini, his enlightenment (becoming the Buddha) under the Bodhi tree at Bodh Gaya, and his parinirvana (final passing) at Kushinagar. It celebrates the Buddha’s path of compassion, mindfulness and the Middle Way to liberation from suffering, and is observed by Buddhists across the world with devotion and acts of kindness.',
    howToCelebrate: [
      'Visit the vihara/temple at dawn; offer flowers, incense and lamps before the Buddha.',
      'Meditate, listen to Dhamma teachings, and recite the sutras.',
      'Practise dana (giving) and acts of compassion — feeding the needy, freeing captive animals.',
      'Observe the precepts and reflect on the Buddha’s teachings; many take vegetarian food.',
    ],
    howCelebrated: [
      'Bodh Gaya: pilgrims circumambulate the Mahabodhi Temple and the Bodhi tree with chanting and lamps.',
      'Sarnath and Kushinagar hold special observances at the sites of the first sermon and the parinirvana.',
      'Monasteries across the Himalayas (Ladakh, Sikkim, Dharamshala) and East Asia hold processions and bathing-the-Buddha rituals.',
      'Lamps, prayer flags and the white-robed devout mark a gentle, reflective festival.',
    ],
    food: ['Kheer (recalling Sujata’s offering to the Buddha)', 'Simple vegetarian food', 'Milk-rice and fruit', 'Dana meals shared with the needy'],
    prasad: ['Flowers, lamps and incense offered to the Buddha', 'Kheer / milk-rice', 'Fruit offerings'],
    dance: [
      { name: 'Cham (masked monastic dance)', note: 'Himalayan monasteries perform the sacred Cham dance during Buddhist festivals.' },
      { name: 'Chanting & processions', note: 'Sutra recitation and candlelit circumambulation define the day.' },
    ],
    temples: [
      { name: 'Mahabodhi Temple, Bodh Gaya', q: 'Mahabodhi temple Bodh Gaya', place: 'Bihar — place of enlightenment' },
      { name: 'Dhamek Stupa, Sarnath', q: 'Sarnath temple', place: 'Varanasi — the first sermon' },
      { name: 'Parinirvana Temple, Kushinagar', q: 'Kushinagar temple', place: 'Uttar Pradesh' },
    ],
    greeting: 'Happy Buddha Purnima! / Vesak blessings.',
    tip: 'Bodh Gaya on Buddha Purnima — circumambulating the Mahabodhi Temple by lamplight among pilgrims from across Asia — is deeply moving and uniquely international.',
  },

  // ─────────────────────── SABARIMALA MAKARAVILAKKU ───────────────────────
  {
    slug: 'sabarimala-makaravilakku',
    name: 'Makaravilakku (Sabarimala)',
    alsoKnown: 'Makara Jyothi; the Sabarimala Ayyappa pilgrimage season',
    emoji: '🪔',
    accent: '#283593',
    deity: 'Lord Ayyappa (Dharma Sastha)',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'Ayyappa, born of Shiva and Mohini (Vishnu), is the presiding deity of Sabarimala; Makaravilakku marks the climax of the pilgrimage.',
    season: 'Winter',
    months: [1],
    whenText: 'Around 14–15 January (Makara Sankranti), closing a season that begins in mid-November',
    calendarBasis: 'Makara Sankranti; the Mandala-Makaravilakku season spans ~41+ days',
    duration: 'Season ~Nov–Jan; Makaravilakku is the final day',
    regionText: 'Sabarimala, Kerala — one of the largest annual pilgrimages on earth',
    significance:
      'Makaravilakku is the climactic festival of the Sabarimala pilgrimage, dedicated to Lord Ayyappa, the celibate warrior-deity born of Shiva and Vishnu (as Mohini). After a demanding 41-day vratham of austerity — celibacy, abstinence, black/blue attire and barefoot discipline — millions of devotees climb the forested Sabarimala hills to Ayyappa’s shrine, carrying the irumudi (the sacred two-pouch bundle). On Makaravilakku, the deity is adorned with the sacred ornaments (Thiruvabharanam) and devotees witness the Makara Jyothi, a celestial light on the horizon. It is a festival of extraordinary penance, equality and single-minded devotion.',
    howToCelebrate: [
      'Observe the 41-day vratham — celibacy, satvik food, no footwear, black/blue mundu and the tulsi/rudraksha mala.',
      'Carry the irumudi kettu (the sacred offering-bundle) on the head; only those who have kept the vratham may.',
      'Climb the 18 holy steps (Pathinettam Padi) to the sannidhanam after the forest trek.',
      'Chant “Swamiye Saranam Ayyappa” and offer ghee-abhishekam (neyyabhishekam) from the ghee carried in the irumudi.',
    ],
    howCelebrated: [
      'The forest paths fill day and night with black-clad devotees chanting the saranam; the climb is barefoot and arduous.',
      'On Makaravilakku day, the Thiruvabharanam ornaments are brought in procession and the deity is decorated; the Makara Jyothi is sighted.',
      'Petta Thullal (a devotional dance at Erumeli) marks part of the traditional route.',
      'The pilgrimage is famous for its discipline and the equality of all pilgrims, who address one another as “Ayyappa”.',
    ],
    food: ['Strict satvik vratham food during the 41 days', 'Aravana payasam & Appam (Sabarimala’s famous prasad)', 'Ghee (neyy) carried for abhishekam', 'Simple pilgrim fare on the trek'],
    prasad: ['Aravana payasam and Appam', 'Neyyabhishekam ghee', 'Vibhuti and tulsi'],
    dance: [
      { name: 'Petta Thullal (Erumeli)', note: 'Ecstatic devotional dance by pilgrims along the traditional Sabarimala route.' },
    ],
    temples: [
      { name: 'Sabarimala Ayyappa Temple', slug: 'sabarimala-ayyappa-temple', place: 'Pathanamthitta, Kerala' },
      { name: 'Erumeli Petta (route start)', q: 'Erumeli Ayyappa temple', place: 'Kerala — traditional trek start' },
      { name: 'Guruvayur Sri Krishna Temple', slug: 'guruvayur-krishna-temple', place: 'Kerala — combine on the way' },
    ],
    greeting: 'Swamiye Saranam Ayyappa!',
    tip: 'The Sabarimala trek requires the 41-day vratham and real physical preparation. The season runs mid-November to mid-January; Makaravilakku (~Jan 14) is the most crowded and powerful day.',
  },

  // ─────────────────────── GANGAUR ───────────────────────
  {
    slug: 'gangaur',
    name: 'Gangaur',
    alsoKnown: 'Gauri Tritiya; the festival of Gauri',
    emoji: '👰',
    accent: '#AD1457',
    deity: 'Goddess Gauri (Parvati) & Lord Shiva',
    deityGroup: 'Devi / Shakti',
    deityNote: 'Celebrates Gauri — Parvati as the ideal wife — and her union with Shiva; “Gan” (Shiva) + “Gaur” (Gauri). A festival of marital love and devotion.',
    season: 'Spring',
    months: [3, 4],
    whenText: 'March–April (begins the day after Holi, climaxing on Chaitra Shukla Tritiya)',
    calendarBasis: 'Chaitra — an 18-day observance from the day after Holi to Gauri Tritiya',
    duration: '16–18 days',
    regionText: 'Rajasthan above all (Udaipur, Jaipur, Jodhpur, Bikaner), and parts of Gujarat & MP',
    significance:
      'Gangaur is one of Rajasthan’s most important and colourful festivals, dedicated to Goddess Gauri — Parvati in her form as the devoted consort of Shiva. It celebrates marital love, fidelity and the bond of husband and wife: married women worship Gauri for the long life and wellbeing of their husbands, while unmarried girls pray for a good husband. Spanning the eighteen days after Holi, it is also a spring and harvest festival, welcoming the new season with processions, song and the vivid artistry of the desert.',
    howToCelebrate: [
      'Make clay idols of Gauri (Gangaur) and Isar (Shiva) and worship them daily through the eighteen days.',
      'Women collect fresh green grass, apply mehndi, and sing traditional Gangaur songs.',
      'Offer the Goddess water, flowers, sindoor and sweets; married women seek saubhagya (marital good fortune).',
      'On the final day, carry the idols in grand procession and immerse them in a tank or well.',
    ],
    howCelebrated: [
      'Jaipur: the royal Gangaur procession from the City Palace — palanquins, caparisoned elephants, camels and folk performers — is world-famous.',
      'Udaipur: the Mewar Gangaur boat procession on Lake Pichola (Gangaur Ghat) is spectacular.',
      'Women dress in their finest and sing and dance through the streets carrying the decorated idols.',
      'Fairs (melas) and folk performances fill towns across Rajasthan.',
    ],
    food: ['Ghewar (the festival’s signature disc-sweet)', 'Dhaba-batti & churma', 'Gunghat / sweets exchanged', 'Seasonal Rajasthani delicacies'],
    prasad: ['Sindoor, bangles and sweets offered to Gauri', 'Fresh grass and spring flowers', 'Ghewar as prasad'],
    dance: [
      { name: 'Ghoomar', note: 'Rajasthan’s graceful spinning folk dance by women, central to Gangaur festivities.' },
      { name: 'Gangaur folk songs & processions', note: 'Traditional songs accompany the women carrying the idols.' },
    ],
    temples: [
      { name: 'Gangaur Ghat & Jagdish Temple', q: 'Udaipur Jagdish temple', place: 'Udaipur — Mewar Gangaur boat procession' },
      { name: 'City Palace Gauri procession', q: 'Jaipur temple', place: 'Jaipur — the royal Gangaur' },
      { name: 'Rajasthan Gauri/Parvati temples', q: 'Parvati temple', place: 'Across Rajasthan' },
    ],
    greeting: 'Happy Gangaur!',
    tip: 'Jaipur and Udaipur stage the grandest Gangaur. Udaipur’s lakeside boat procession on Lake Pichola is the most beautiful setting for it.',
  },

  // ─────────────────────── NARASIMHA JAYANTI ───────────────────────
  {
    slug: 'narasimha-jayanti',
    name: 'Narasimha Jayanti',
    alsoKnown: 'Narasimha Chaturdashi; Nrisimha Jayanti',
    emoji: '🦁',
    accent: '#C62828',
    deity: 'Lord Narasimha (fourth avatar of Vishnu)',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'The man-lion avatar who appeared at dusk to slay the demon Hiranyakashipu and save his devotee Prahlad.',
    season: 'Summer',
    months: [5],
    whenText: 'May (fourteenth day of the bright fortnight of Vaishakha, at dusk)',
    calendarBasis: 'Chaturdashi of Shukla paksha, Vaishakha — worship at sandhya (dusk)',
    duration: '1 day',
    regionText: 'Andhra Pradesh, Telangana (Ahobilam, Simhachalam, Yadadri) and Vaishnava temples',
    significance:
      'Narasimha Jayanti marks the appearance of Lord Narasimha, the fierce man-lion fourth avatar of Vishnu. The demon-king Hiranyakashipu had won a boon that he could not be killed by man or beast, indoors or outdoors, by day or night, on earth or in sky — and then tormented his own Vishnu-devoted son Prahlad. To honour the boon yet protect his devotee, Vishnu burst from a pillar at dusk (neither day nor night), on a threshold (neither in nor out), as Narasimha (neither man nor beast), and tore the demon apart on his lap (neither earth nor sky). The festival celebrates the Lord’s promise to protect devotion against all odds, and his fierce yet compassionate grace.',
    howToCelebrate: [
      'Fast through the day and worship Narasimha at dusk (the hour of his appearance).',
      'Perform abhishekam with cooling substances — sandal paste, panakam, buttermilk — to soothe the Lord’s fierce heat.',
      'Recite the Narasimha stotras, the Prahlad story and the Narasimha Kavacham.',
      'Break the fast after the sunset worship with cooling panakam and kosambari.',
    ],
    howCelebrated: [
      'Ahobilam (Andhra): the nine-form Nava Narasimha kshetra celebrates grandly — the primary Narasimha pilgrimage.',
      'Simhachalam (Visakhapatnam): abhishek and special darshan of the sandal-covered deity.',
      'Yadadri / Yadagirigutta (Telangana): major festivities at the renowned Lakshmi Narasimha temple.',
      'Vaishnava temples offer cooling foods and sandal-paste to pacify the deity’s intensity.',
    ],
    food: ['Panakam (jaggery–ginger–cardamom cooler)', 'Kosambari (soaked lentil salad)', 'Neer mor (spiced buttermilk)', 'Cooling fruits and sandal-scented offerings'],
    prasad: ['Panakam and kosambari', 'Sandal paste (chandanam)', 'Tulsi and cooling naivedya'],
    dance: [
      { name: 'Temple processions & bhajan', note: 'Utsava-deity processions and Narasimha bhajans mark the dusk worship.' },
    ],
    temples: [
      { name: 'Yadadri Lakshmi Narasimha', slug: 'yadagirigutta-temple', place: 'Yadagirigutta, Telangana' },
      { name: 'Ahobilam Nava Narasimha', q: 'Ahobilam temple', place: 'Andhra Pradesh — the nine Narasimha shrines' },
      { name: 'Simhachalam', q: 'Simhachalam temple', place: 'Visakhapatnam, Andhra Pradesh' },
    ],
    greeting: 'Jai Narasimha! Om Namo Bhagavate Narasimhaya!',
    tip: 'Worship peaks at dusk, not midday — plan your temple visit for the evening. Ahobilam, set in forested hills, is the most atmospheric Narasimha kshetra.',
  },

  // ─────────────────────── ASHADHI EKADASHI / PANDHARPUR WARI ───────────────────────
  {
    slug: 'ashadhi-ekadashi-pandharpur-wari',
    name: 'Ashadhi Ekadashi & the Pandharpur Wari',
    alsoKnown: 'Devshayani Ekadashi; Shayani Ekadashi; the Warkari Wari',
    emoji: '🚩',
    accent: '#6A1B9A',
    deity: 'Lord Vitthal (Vithoba) — a form of Krishna/Vishnu',
    deityGroup: 'Vishnu & Avatars',
    deityNote: 'Vitthal of Pandharpur, standing on a brick, is the beloved deity of the Warkari tradition; Ashadhi Ekadashi is the climax of the pilgrimage and the start of Vishnu’s four-month cosmic sleep (Chaturmas).',
    season: 'Monsoon',
    months: [6, 7],
    whenText: 'June–July (Ekadashi of the bright fortnight of Ashadha)',
    calendarBasis: 'Shukla Ekadashi of Ashadha; begins the four-month Chaturmas',
    duration: 'The Wari walk spans ~3 weeks, ending on Ekadashi',
    regionText: 'Maharashtra — Pandharpur, and the palkhi routes from Alandi & Dehu',
    significance:
      'Ashadhi Ekadashi is the great day of the Warkari tradition of Maharashtra, centred on Lord Vitthal (Vithoba) of Pandharpur. In the weeks before, hundreds of thousands of warkaris walk hundreds of kilometres on foot — the Wari — carrying the palkhis (palanquins with the sandals, paduka) of the saint-poets Dnyaneshwar from Alandi and Tukaram from Dehu, singing abhangas and bhajans the whole way to Pandharpur. It is one of the oldest continuous pilgrimages in the world, a river of devotion that dissolves caste and status in the shared love of Vitthal. The day also begins Chaturmas, the four holy months of Vishnu’s cosmic sleep.',
    howToCelebrate: [
      'Observe the Ekadashi fast (no grains) and keep vigil with Vitthal-bhajan.',
      'Walk the Wari — or receive the palkhis — chanting “Vitthal Vitthal” and the abhangas of the saints.',
      'Take darshan of Vitthal and Rukmini at Pandharpur; touch the feet of the deity if permitted.',
      'Begin Chaturmas vows of austerity, study and devotion.',
    ],
    howCelebrated: [
      'The Dnyaneshwar palkhi (Alandi) and Tukaram palkhi (Dehu) lead lakhs of warkaris on the three-week walk to Pandharpur.',
      'Warkaris in white, with tulsi garlands and saffron flags, sing abhangas and perform the ringan and dindi along the way.',
      'Pandharpur overflows on Ekadashi; the Chandrabhaga river bank fills with pilgrims taking a holy dip.',
      'Villages along the route host and feed the warkaris — a centuries-old culture of seva.',
    ],
    food: ['Ekadashi vrat food — sabudana khichdi/vada, rajgira, fruit', 'Simple warkari fare shared on the walk', 'Sheera / sweet offerings', 'Fast broken on Dwadashi'],
    prasad: ['Tulsi and Vitthal naivedya', 'Pandharpur temple prasad', 'Chandrabhaga holy water'],
    dance: [
      { name: 'Ringan', note: 'Horses run through concentric circles of warkaris in a joyous ritual on the Wari route.' },
      { name: 'Dindi & Fugadi', note: 'Processional singing-dancing groups (dindi) and the women’s fugadi folk dance accompany the march.' },
    ],
    temples: [
      { name: 'Vitthal Rukmini Temple', q: 'Pandharpur Vitthal', place: 'Pandharpur, Maharashtra — the destination' },
      { name: 'Alandi (Dnyaneshwar Samadhi)', slug: 'alandi-dnyaneshwar-temple', place: 'Alandi — start of the Dnyaneshwar palkhi' },
      { name: 'Dehu (Tukaram)', q: 'Dehu Tukaram temple', place: 'Dehu — start of the Tukaram palkhi' },
    ],
    greeting: 'Vitthal Vitthal! Jai Hari Vitthal!',
    tip: 'To witness the Wari, catch a palkhi along the Alandi/Dehu→Pandharpur route in the three weeks before Ekadashi — the walking sea of warkaris is extraordinary. Pandharpur itself is overwhelming on the day.',
  },

  // ─────────────────────── KANWAR YATRA ───────────────────────
  {
    slug: 'kanwar-yatra',
    name: 'Kanwar Yatra',
    alsoKnown: 'Kanvar Yatra; Bol Bam; the Shravan pilgrimage',
    emoji: '🧡',
    accent: '#2E7D32',
    deity: 'Lord Shiva',
    deityGroup: 'Shiva',
    deityNote: 'During the holy month of Shravan, devotees (kanwariyas) carry Ganga water on foot to bathe the Shiva-linga; linked to the samudra-manthan, when Shiva drank the poison and was cooled with Ganga water.',
    season: 'Monsoon',
    months: [7, 8],
    whenText: 'July–August (through the month of Shravan)',
    calendarBasis: 'Shravan maas; peaks on the Mondays and on Shivaratri of Shravan',
    duration: 'Through Shravan (weeks)',
    regionText: 'North India — Haridwar, Gaumukh, Sultanganj→Deoghar, and Jyotirlinga routes',
    significance:
      'The Kanwar Yatra is a vast annual Shiva pilgrimage during the sacred month of Shravan. Devotees called kanwariyas, dressed in saffron, walk barefoot for tens or hundreds of kilometres carrying kanwars — decorated slings holding pots of holy water collected from the Ganga (at Haridwar, Gaumukh or Sultanganj) — to pour over the Shiva-linga at their home or a famous temple. It recalls the churning of the ocean, when Shiva swallowed the deadly halahala poison to save creation; the cooling Ganga water offered to the linga is an act of gratitude and devotion. It is among the largest and most intense foot-pilgrimages on earth.',
    howToCelebrate: [
      'Collect holy Ganga water in the kanwar pots from a sacred source (Haridwar, Gaumukh, Sultanganj).',
      'Walk barefoot and keep the kanwar off the ground at all times; maintain purity, celibacy and satvik food.',
      'Chant “Bol Bam” and “Har Har Mahadev” through the journey.',
      'Offer the carried Ganga water (jalabhishek) over the Shiva-linga, ideally on a Shravan Monday or Shravan Shivaratri.',
    ],
    howCelebrated: [
      'Highways in the North turn saffron with millions of kanwariyas walking day and night in Shravan.',
      'Sultanganj → Baidyanath Dham (Deoghar): the famed ~100 km barefoot Dak Bam route to one of the Jyotirlingas.',
      'Haridwar and Gaumukh are major water-collection points; Kashi Vishwanath and Neelkanth Mahadev see huge crowds.',
      'Camps (shivirs) along the routes offer the kanwariyas food, rest and medical aid.',
    ],
    food: ['Strictly satvik Shravan food — no onion, garlic or non-veg', 'Fruit, milk and sabudana', 'Langar / bhandara at roadside camps', 'Fasting on Shravan Mondays'],
    prasad: ['Ganga water (jalabhishek) and bilva leaves', 'Bhang and dhatura (traditional Shiva offerings)', 'Prasad from the Jyotirlinga temples'],
    dance: [
      { name: 'Bol Bam chants & DJ troupes', note: 'Groups move to devotional “Bol Bam” songs; the atmosphere is part austerity, part celebration.' },
    ],
    temples: [
      { name: 'Kashi Vishwanath (Jyotirlinga)', slug: 'kashi-vishwanath-temple', place: 'Varanasi — Shravan jalabhishek' },
      { name: 'Baidyanath Dham, Deoghar (Jyotirlinga)', q: 'Baidyanath Dham Deoghar', place: 'Jharkhand — the Dak Bam route' },
      { name: 'Haridwar Har Ki Pauri', slug: 'haridwar-har-ki-pauri', place: 'Haridwar — Ganga water source' },
      { name: 'Neelkanth Mahadev', q: 'Neelkanth Mahadev Rishikesh', place: 'near Rishikesh, Uttarakhand' },
    ],
    greeting: 'Bol Bam! Har Har Mahadev!',
    tip: 'Shravan Mondays and Shravan Shivaratri are the most charged (and most crowded) days for jalabhishek. If you drive in the North during Shravan, expect kanwar routes and plan around them.',
  },

  // ─────────────────────── KARTHIGAI DEEPAM ───────────────────────
  {
    slug: 'karthigai-deepam',
    name: 'Karthigai Deepam',
    alsoKnown: 'Thirukarthigai; Karthika Deepam; the Festival of Lights of the South',
    emoji: '🔥',
    accent: '#E65100',
    deity: 'Lord Shiva (as the infinite column of light) & Lord Murugan',
    deityGroup: 'Shiva',
    deityNote: 'Celebrates Shiva appearing as an endless column of fire (Lingodbhava) that neither Brahma nor Vishnu could fathom; also sacred to Murugan, born of Shiva’s six sparks (the Krittika stars).',
    season: 'Winter',
    months: [11, 12],
    whenText: 'November–December (Krittika nakshatra, full-moon, in the Tamil month of Karthigai)',
    calendarBasis: 'Krittika nakshatra on the full moon of Karthigai',
    duration: '1 main day (a 10-day festival at Tiruvannamalai)',
    regionText: 'Tamil Nadu — supremely at Tiruvannamalai (Arunachaleswarar)',
    significance:
      'Karthigai Deepam is one of the oldest festivals of the Tamil land — a festival of light even older in the region than Diwali. It commemorates Lord Shiva manifesting as an infinite, fathomless column of fire (the Lingodbhava) to humble the egos of Brahma and Vishnu, who could find neither its top nor its base. At Tiruvannamalai, this is re-enacted when a colossal beacon — the Maha Deepam — is lit in a giant cauldron atop the sacred Arunachala hill, a flame visible for miles, understood as Shiva himself as a pillar of light. It is a day to kindle lamps against inner darkness and to circumambulate the holy hill.',
    howToCelebrate: [
      'Light rows of lamps (agal vilakku) at home and temple, in the evening of Krittika.',
      'At Tiruvannamalai, witness the lighting of the Maha Deepam beacon atop Arunachala at dusk.',
      'Perform Girivalam — the barefoot circumambulation of the 14 km Arunachala hill.',
      'Offer pori (puffed rice) and appam; worship Shiva and Murugan.',
    ],
    howCelebrated: [
      'Tiruvannamalai: millions gather for the Maha Deepam and the Girivalam around Arunachala — one of South India’s greatest spiritual events.',
      'Homes and temples across Tamil Nadu glow with rows of oil lamps; kolam decorates thresholds.',
      'Brihadeeswarar (Thanjavur) and Shiva temples statewide hold special deepa-aradhana.',
      'Murugan temples also celebrate, honouring his birth from the Krittika stars.',
    ],
    food: ['Pori urundai (puffed-rice & jaggery balls)', 'Appam & adai', 'Nei appam (ghee sweet)', 'Vada and sweets offered with the lamps'],
    prasad: ['Pori (puffed rice) and nei appam', 'Vibhuti (sacred ash) and lamps', 'Offerings to Shiva and Murugan'],
    dance: [
      { name: 'Girivalam (circumambulation)', note: 'The barefoot 14 km walk around Arunachala hill — devotion in motion rather than dance.' },
      { name: 'Bharatanatyam & Oduvar hymns', note: 'Classical dance and Tevaram hymn-singing in the Shiva temples.' },
    ],
    temples: [
      { name: 'Arunachaleswarar Temple', slug: 'arunachaleswarar-temple', place: 'Tiruvannamalai — the Maha Deepam & Girivalam' },
      { name: 'Brihadeeswarar Temple', q: 'Thanjavur Brihadeeswarar', place: 'Thanjavur, Tamil Nadu' },
      { name: 'Palani Murugan Temple', slug: 'palani-murugan-temple', place: 'Palani, Tamil Nadu' },
    ],
    greeting: 'Happy Karthigai Deepam!',
    tip: 'Tiruvannamalai on Karthigai Deepam is extraordinary — the Maha Deepam blazing atop Arunachala while lakhs do Girivalam below. Go prepared for enormous crowds and a long barefoot walk.',
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────
export const DEITY_GROUPS = [
  'Shiva',
  'Vishnu & Avatars',
  'Devi / Shakti',
  'Ganesha',
  'Murugan',
  'Hanuman',
  'Surya',
  'Multi-faith',
  'Sikh',
  'Jain',
  'Buddhist',
]

export const SEASONS = ['Winter', 'Spring', 'Summer', 'Monsoon', 'Autumn']

export function getFestival(slug: string): Festival | undefined {
  return FESTIVALS.find(f => f.slug === slug)
}

export function templeHref(t: FestivalTemple): string {
  if (t.slug) return `/temple/${t.slug}`
  const q = t.q || t.name
  return `/explore?q=${encodeURIComponent(q)}`
}
