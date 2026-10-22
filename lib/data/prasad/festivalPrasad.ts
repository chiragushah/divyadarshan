// ─────────────────────────────────────────────────────────────────────────
//  Which prasad belongs to which festival.
//  A recipe entry points at a dish (+ optional regional variant) in the
//  recipe book; an offering entry is something that needs no cooking
//  (leaves, flowers, water, lamps) and gets a short "how to offer" note.
// ─────────────────────────────────────────────────────────────────────────

export type PrasadEntry =
  | { kind: 'recipe'; dish: string; variant?: string; note?: string }
  | { kind: 'offering'; title: string; note: string }

export interface FestivalPrasad {
  intro?: string
  entries: PrasadEntry[]
}

const R = (dish: string, variant: string | undefined, note?: string): PrasadEntry => ({ kind: 'recipe', dish, variant, note })
const O = (title: string, note: string): PrasadEntry => ({ kind: 'offering', title, note })

export const FESTIVAL_PRASAD: Record<string, FestivalPrasad> = {
  // ───────────────────────────── Devi / Shakti ─────────────────────────────
  diwali: {
    entries: [
      R('kheel-batasha', 'north-india-lakshmi', 'The core Lakshmi Puja offering across North and West India.'),
      R('kheel-batasha', 'bengal-muri-moa', 'Bengal and Odisha offer puffed rice bound with jaggery.'),
      R('panchamrit', 'north-maharashtra', 'Used to bathe the Lakshmi–Ganesha idols.'),
      R('diwali-faral', 'maharashtra', 'The Maharashtrian faral plate, offered before it is eaten.'),
      R('gujiya', 'maharashtra-karanji', 'Karanji is the centrepiece of the Maharashtra faral.'),
      R('halwa-sheera', 'maharashtra-gujarat-sheera', 'Gujarati and Marwari homes offer sheera at the Chopda Pujan.'),
      R('khichdi-bhog', 'bengal-bhoger-khichuri', 'Bengal’s Kali Puja bhog.'),
      O('Coconut and lotus for Lakshmi', 'Place a whole coconut with its tuft (shrifal) on the kalash and offer a lotus or marigold at Lakshmi’s feet.'),
    ],
  },
  'navaratri-durga-puja': {
    entries: [
      R('khichdi-bhog', 'bengal-bhoger-khichuri', 'The anna-bhog served from the Durga pandal.'),
      R('labra', 'bengal', 'Served beside khichuri at the pandal.'),
      R('kheer-payasam', 'bengal-payesh', 'Payesh closes the Bengal bhog.'),
      R('sundal', 'tamil-nadu', 'Nine pulses over nine days at the Golu.'),
      R('kanya-pujan', 'up-delhi', 'Offered to the nine girls on Ashtami / Navami.'),
      R('kanya-pujan', 'punjab-himachal', 'The Punjabi–Pahari version with atta halwa.'),
      O('Nine-day bhog by form of the Goddess', 'A commonly followed sequence: Day 1 pure ghee; 2 sugar; 3 milk or kheer; 4 malpua; 5 bananas; 6 honey; 7 jaggery; 8 coconut; 9 sesame. Families vary.'),
      O('Kumkum, bangles and red chunri', 'Offer red chunri, bangles, kumkum and mehendi as shringar; they are given to married women afterwards.'),
    ],
  },
  'dussehra-vijayadashami': {
    entries: [
      R('kheer-payasam', 'north-sharad-purnima', 'Kheer is a common naivedya to Rama and Durga on Vijayadashami.'),
      R('panchamrit', 'north-maharashtra', 'For the abhishek of the household deities.'),
      O('Shami / Apta leaves', 'Exchanged as “gold” (sone) in Maharashtra and Karnataka. Offer them to the deity first, then give them to elders with a bow.'),
      O('Vehicles and tools', 'Garland your vehicles and work tools, apply kumkum, tie lemons, and offer a sweet before using them again.'),
    ],
  },
  'vasant-panchami': {
    entries: [
      R('halwa-sheera', 'maharashtra-gujarat-sheera', 'Make it yellow with saffron or turmeric — the colour of the day (kesari sheera).'),
      R('khichdi-bhog', 'bengal-bhoger-khichuri', 'Bengali Saraswati Puja bhog.'),
      R('labra', 'bengal', 'Served with the khichuri.'),
      O('Yellow flowers and boroi', 'Offer marigold and mustard flowers; Bengal offers boroi (plum) only after the puja.'),
      O('Books, pen and ink', 'Keep books, instruments and pens at the Goddess’s feet and do not study on the day.'),
    ],
  },
  gangaur: {
    entries: [
      R('ghewar', 'rajasthan', 'The sweet of Gangaur and Teej in Rajasthan.'),
      R('thandai', 'rajasthan', 'Kesar-badam thandai served to the women.'),
      O('Sindoor, bangles and sweets for Gauri', 'Offer sindoor, mehendi and bangles to Gauri’s clay figure and distribute sweets to the women who fasted.'),
      O('Fresh grass (doob) and spring flowers', 'The women bring doob grass and flowers in decorated pots (kalash) on their heads.'),
    ],
  },
  'sabarimala-makaravilakku': {
    entries: [
      R('aravana-payasam', 'kerala', 'The famous Sabarimala aravana.'),
      R('appam', 'kerala-unniyappam', 'Sabarimala’s second prasad.'),
      O('Neyyabhishekam ghee', 'Pilgrims carry ghee in a coconut shell (neythenga) in their irumudi; the ghee is poured on Ayyappa and a share of it returns as prasad.'),
      O('Vibhuti and tulsi', 'Receive vibhuti and tulsi at the sannidhanam.'),
    ],
  },
  'thrissur-pooram': {
    entries: [
      R('kheer-payasam', 'kerala-ada-pradhaman', 'The classic Kerala temple payasam.'),
      R('appam', 'kerala-unniyappam', 'Kerala temple offering for Bhagavathy.'),
      O('Vadakkunnathan and Bhagavathy offerings', 'Offer ghee, flowers and coconut at the shrines in the traditional temple order.'),
    ],
  },
  dhanteras: {
    entries: [
      R('panjiri', 'braj-dhaniya', 'Coriander (dhaniya) is the traditional Dhanteras offering; panjiri uses it as the base.'),
      R('kheel-batasha', 'north-india-lakshmi', 'Offered to Lakshmi–Kubera.'),
      O('Coriander seeds with jaggery', 'Offer whole coriander seeds mixed with jaggery (dhaniya-gud) and keep some in the tijori after the puja.'),
      O('New utensils and coins', 'Place a new utensil, gold or silver coin and a few coins before Lakshmi–Kubera before using them.'),
    ],
  },
  teej: {
    entries: [
      R('ghewar', 'rajasthan', 'The Teej gift-sweet from mother to daughter.'),
      R('thandai', 'rajasthan', 'Served to the women at the Teej gathering.'),
      O('Green chunri, mehendi and bangles', 'Offer the green chunri and bangles to Gauri, and apply mehendi the evening before.'),
    ],
  },
  nuakhai: {
    entries: [
      R('kheer-payasam', 'odisha-khiri', 'Cooked from the new rice and offered to Samaleswari.'),
      R('pitha', 'odisha-arisa', 'Arisa pitha — the Odia festival cake.'),
      O('Nua anna (new rice)', 'The first rice of the harvest is cooked, offered to the deity at the auspicious hour (nua), and then eaten by the family together.'),
    ],
  },
  'varalakshmi-vratam': {
    entries: [
      R('kheer-payasam', 'tamil-paal-payasam', 'Paal payasam for Varalakshmi.'),
      R('sweet-pongal', 'tamil-sakkarai', 'Sakkarai pongal is the other classic offering.'),
      R('puran-poli', 'andhra-bobbatlu', 'Bobbatlu is offered in Telugu homes.'),
      R('puran-poli', 'karnataka-holige', 'Holige is made in Karnataka.'),
      R('puliyodarai', 'andhra-pulihora', 'Pulihora is part of the thali.'),
      R('sundal', 'tamil-nadu', 'Served with tamboolam to the visiting women.'),
      O('Turmeric, kumkum and the yellow thread', 'Tie the sacred yellow thread (nonbu saradu) on the right wrist after the puja.'),
      O('Coconut, fruit and tamboolam', 'Offer a coconut, fruit, betel leaf and nuts, and give tamboolam to the women who visit.'),
    ],
  },
  'chaitra-navratri': {
    entries: [
      R('kanya-pujan', 'up-delhi', 'Ashtami / Navami offering to the nine girls.'),
      R('kanya-pujan', 'punjab-himachal', 'Punjabi–Pahari version with atta halwa.'),
      R('panchamrit', 'north-maharashtra', 'For the abhishek of the Goddess.'),
      O('Barley shoots (jau) from the ghatasthapana', 'Sow barley in a clay tray on Day 1, water it daily and offer the green shoots to the Goddess on the final day.'),
    ],
  },
  'gayatri-jayanti': {
    entries: [
      R('panchamrit', 'north-maharashtra', 'Offered after the havan.'),
      O('Havan prasad', 'Offer ghee, sesame and herbs in the havan and distribute the ash (vibhuti) afterwards.'),
      O('Fruit, jaggery, tulsi and flowers', 'Offer simple fruit and jaggery, with tulsi and five types of flowers, at Gayatri’s image.'),
    ],
  },

  // ───────────────────────────── Vishnu & Avatars ─────────────────────────────
  holi: {
    entries: [
      R('gujiya', 'braj-up', 'Offered first to Krishna and Radha in Braj.'),
      R('thandai', 'braj-up', 'The Holi drink of Mathura and Varanasi.'),
      R('makhan-mishri', 'braj', 'Krishna’s signature offering.'),
      R('puran-poli', 'maharashtra', 'Thrown into the Holika Dahan fire as naivedya.'),
      R('panchamrit', 'north-maharashtra', 'For the abhishek of Krishna.'),
      O('Petals and gulal', 'Offer flower petals (Phoolon ki Holi) and natural herbal gulal to the deity before playing with colour.'),
    ],
  },
  'krishna-janmashtami': {
    entries: [
      R('makhan-mishri', 'braj', 'Offered at midnight at the birth aarti.'),
      R('panjiri', 'braj-dhaniya', 'The signature midnight prasad.'),
      R('charanamrit', 'north-braj', 'Tulsi-laden charanamrit after the abhishek.'),
      R('panchamrit', 'north-maharashtra', 'For Krishna’s abhishek at midnight.'),
      R('gopalkala', 'maharashtra', 'Served after the Dahi Handi.'),
      R('krishna-snacks', 'tamil-seedai', 'Seedai, murukku and aval in Tamil Nadu.'),
      R('krishna-snacks', 'karnataka-chakli', 'Udupi’s chakli and sihi avalakki.'),
      R('chhappan-bhog', 'braj-pushtimarg', 'The 56-dish offering.'),
      R('chhappan-bhog', 'south-indian', 'The South Indian Krishna bhog.'),
    ],
  },
  'ram-navami': {
    entries: [
      R('panakam', 'telangana-andhra', 'Distributed at Bhadrachalam’s Sita Rama Kalyanam.'),
      R('panakam', 'karnataka', 'Karnataka’s lemon–ginger panaka.'),
      R('panakam', 'maharashtra-kairi-panha', 'Raw-mango panha in Maharashtra.'),
      R('kosambari', 'karnataka-kosambari', 'Served with panaka.'),
      R('kosambari', 'andhra-vadapappu', 'Served with panakam in Andhra.'),
      R('panjiri', 'braj-dhaniya', 'North Indian offering to infant Rama.'),
      R('sunthavda', 'maharashtra', 'Distributed after the noon birth aarti in Maharashtra.'),
      R('charanamrit', 'north-braj', 'Tulsi charanamrit.'),
      O('Tulsi and fruit', 'Offer tulsi leaves, bananas and the season’s fruit.'),
    ],
  },
  'rath-yatra': {
    entries: [
      R('puri-mahaprasad', 'odisha-puri', 'The Abadha plate at Puri.'),
      R('khaja', 'odisha-puri', 'Puri’s layered sweet.'),
      R('khichdi-bhog', 'odisha-khechudi', 'Khechudi of the Jagannath temple.'),
      R('dalma', 'odisha', 'Offered with rice and khechudi.'),
      O('Tulsi and the deities’ nirmalya', 'Nirmalya is the previous day’s offering that is returned to devotees; it is received with reverence and not discarded.'),
    ],
  },
  onam: {
    entries: [
      R('kheer-payasam', 'kerala-ada-pradhaman', 'The closing course of the Onam sadya.'),
      R('appam', 'kerala-unniyappam', 'Offered with the sadya.'),
      O('Onathappan and fresh flowers', 'Install a clay Onathappan pyramid at the doorway, decorate it with flowers and offer rice flour paste and a fruit.'),
    ],
  },
  'ugadi-gudi-padwa': {
    entries: [
      R('ugadi-pachadi', 'andhra-telangana', 'Offered first to the deity in Andhra and Telangana.'),
      R('ugadi-pachadi', 'karnataka', 'Bevu-bella in Karnataka.'),
      R('ugadi-pachadi', 'maharashtra-gudi-padwa', 'Neem-and-jaggery on Gudi Padwa.'),
      R('puran-poli', 'maharashtra', 'Gudi Padwa naivedya.'),
      R('puran-poli', 'karnataka-holige', 'Yugadi holige.'),
      R('puran-poli', 'andhra-bobbatlu', 'Ugadi bobbatlu.'),
      R('puliyodarai', 'andhra-pulihora', 'Part of the Ugadi meal.'),
      O('New mango and seasonal produce', 'Offer the first raw mango, neem flowers and fresh produce of the season.'),
    ],
  },
  'vaikuntha-ekadashi': {
    entries: [
      R('puliyodarai', 'tamil-nadu', 'The Sri Vaishnava temple prasadam.'),
      R('ven-pongal', 'tamil-nadu-temple', 'Temple pongal.'),
      R('laddu', 'tirupati', 'Tirumala-style laddu.'),
      R('charanamrit', 'sri-vaishnava-south', 'Tirtham from the Perumal.'),
      O('Tulsi', 'Offer tulsi leaves, but do not pluck them on Ekadashi; use leaves plucked the previous day.'),
    ],
  },
  'akshaya-tritiya': {
    entries: [
      R('panakam', 'maharashtra-kairi-panha', 'Aam panha is the day’s cooling offering.'),
      R('panchamrit', 'north-maharashtra', 'Used in Vishnu abhishek.'),
      O('Sandalwood paste (chandan)', 'At Simhachalam, the Lord’s image is covered in sandalwood paste all year and revealed only on this day. At home, apply chandan to the deity’s image.'),
      O('Barley and summer fruits', 'Offer barley (jau), cucumber, mango and watermelon as the day’s first fruit.'),
    ],
  },
  'narasimha-jayanti': {
    entries: [
      R('panakam', 'telangana-andhra', 'The cooling offering to the fierce deity.'),
      R('panakam', 'karnataka', 'Panaka with lemon and ginger.'),
      R('kosambari', 'andhra-vadapappu', 'Soaked moong dal alongside.'),
      O('Sandal paste (chandanam)', 'Apply sandal paste to the deity to cool the fierce form.'),
    ],
  },
  'ashadhi-ekadashi-pandharpur-wari': {
    entries: [
      R('gopalkala', 'maharashtra', 'The dahi-poha kala of the Pandharpur tradition.'),
      O('Tulsi and Vitthal naivedya', 'Offer tulsi garlands and simple fasting-food naivedya.'),
      O('Chandrabhaga water', 'Pilgrims sprinkle a little of the river’s water on the head as a blessing.'),
    ],
  },
  'radha-ashtami': {
    entries: [
      R('panjiri', 'braj-dhaniya', 'Offered to Radha.'),
      R('makhan-mishri', 'braj', 'Offered to Radha–Krishna.'),
      R('charanamrit', 'north-braj', 'Tulsi-laden charanamrit.'),
      R('chhappan-bhog', 'braj-pushtimarg', 'Offered at Barsana and Vrindavan.'),
    ],
  },
  'tulsi-vivaha': {
    entries: [
      R('charanamrit', 'north-braj', 'Tulsi charanamrit.'),
      R('panchamrit', 'north-maharashtra', 'For the abhishek of Shaligram.'),
      R('kheer-payasam', 'north-sharad-purnima', 'Wedding sweet.'),
      O('Sugarcane and amla', 'Build the mandap with sugarcane stalks and offer amla and other season fruit.'),
    ],
  },
  'ratha-saptami': {
    entries: [
      R('sweet-pongal', 'andhra-chakkera', 'Cooked outdoors in sunlight in Andhra.'),
      R('sweet-pongal', 'tamil-sakkarai', 'Sakkarai pongal in Tamil Nadu.'),
      O('Arka leaves, red flowers, jaggery and milk', 'Place seven arka (calotropis) leaves on the head and shoulders for the bath, and offer red flowers, jaggery and boiled milk to Surya.'),
    ],
  },
  'sharad-purnima': {
    entries: [
      R('kheer-payasam', 'north-sharad-purnima', 'Kept under the moon overnight.'),
      R('kheel-batasha', 'north-india-lakshmi', 'White sweets for Lakshmi.'),
      O('Tulsi and lotus', 'Offer tulsi to Krishna and a lotus to Lakshmi.'),
    ],
  },
  'vivaha-panchami': {
    entries: [
      R('kheer-payasam', 'north-sharad-purnima', 'Wedding kheer.'),
      R('laddu', 'north-boondi', 'Wedding sweet.'),
      O('Shringar for Rama–Sita', 'Offer new clothes, flowers, and sindoor to Sita.'),
    ],
  },
  'govardhan-puja': {
    entries: [
      R('annakut', 'nathdwara-rajasthan', 'The grand Nathdwara Annakut.'),
      R('annakut', 'braj-govardhan', 'Braj’s Govardhan Annakut.'),
      R('chhappan-bhog', 'braj-pushtimarg', 'Often offered the same morning.'),
      R('makhan-mishri', 'braj', 'Offered to Giriraj.'),
      R('panchamrit', 'north-maharashtra', 'For the abhishek of Giriraj.'),
    ],
  },
  'ananta-chaturdashi': {
    entries: [
      R('modak', 'maharashtra', 'The offering to Ganesha at the visarjan.'),
      R('panchamrit', 'north-maharashtra', 'For the abhishek of Vishnu.'),
      O('The anant sacred thread', 'The 14-knotted thread is tied on the wrist after the puja and worn for 14 days.'),
      O('Fourteen-fold offerings', 'Offer 14 pieces each of puri or sweet items, one for each loka.'),
    ],
  },
  vishu: {
    entries: [
      R('kheer-payasam', 'kerala-ada-pradhaman', 'The Vishu sadya payasam.'),
      R('appam', 'kerala-unniyappam', 'Offered alongside.'),
      O('Vishukkani', 'Arrange rice, fruit, konna flowers, a mirror, gold, a coin and a lamp in a bell-metal uruli and view it first thing in the morning.'),
    ],
  },
  'tulsi-pujan-diwas': {
    entries: [
      R('charanamrit', 'north-braj', 'Tulsi water.'),
      R('panchamrit', 'north-maharashtra', 'For the tulsi pooja.'),
      O('Tulsi leaves and sweets', 'Offer a tulsi garland and any pure-vegetarian sweet.'),
    ],
  },
  'satyanarayan-vrata': {
    entries: [
      R('halwa-sheera', 'maharashtra-gujarat-sheera', 'The traditional sheera.'),
      R('halwa-sheera', 'andhra-annavaram', 'Annavaram-style godhuma rava.'),
      R('panjiri', 'punjab-atta', 'The North Indian panjiri or sinni.'),
      R('panchamrit', 'north-maharashtra', 'For the deity’s abhishek.'),
      O('Tulsi and fruit', 'Offer tulsi, bananas and the season’s fruit.'),
    ],
  },
  'gita-jayanti': {
    entries: [
      R('panchamrit', 'north-maharashtra', 'Offered to Krishna.'),
      R('charanamrit', 'north-braj', 'Tulsi charanamrit.'),
      R('kheer-payasam', 'north-sharad-purnima', 'Makhana or plain milk kheer.'),
      O('Fruit and makhana', 'Offer fruit and plain roasted makhana.'),
    ],
  },

  // ───────────────────────────── Shiva ─────────────────────────────
  'maha-shivaratri': {
    entries: [
      R('panchamrit', 'north-maharashtra', 'The abhishek on the Shivalinga, with bilva (omit tulsi).'),
      R('thandai', 'braj-up', 'Thandai (without bhang) is the festive drink.'),
      O('Bilva leaves, milk and water', 'Offer three-leaved bilva with the smooth side up, with milk and water.'),
      O('Bhang and dhatura', 'These are traditional offerings, but are not recommended for home puja. Offer plain thandai in place of bhang.'),
    ],
  },
  'nag-panchami': {
    entries: [
      R('kheel-batasha', 'north-india-lakshmi', 'Puffed rice and sweets for the Naga.'),
      R('modak', 'goa-konkan', 'Steamed rolls (patoli / patolya) are made in parts of Konkan around Nag Panchami.'),
      O('Milk and turmeric', 'Offer milk, rice, turmeric and flowers at a serpent image or ant-hill. Many families avoid frying or cutting on this day.'),
      O('Lotus and wildflowers', 'Offer a lotus or whatever wildflowers are in season.'),
    ],
  },
  'karva-chauth': {
    entries: [
      R('kheer-payasam', 'north-sharad-purnima', 'Sweet to break the fast.'),
      R('kanya-pujan', 'punjab-himachal', 'Atta halwa and puri are common in Punjabi homes.'),
      O('Arghya to the moon', 'Offer water through a sieve to the moon, then look at your husband through the sieve.'),
      O('Sweets and fruit from the karva', 'Fill the karva (clay pot) with sweets and fruit and give it to an elder woman.'),
    ],
  },
  'kartik-purnima-dev-deepawali': {
    entries: [
      R('kheer-payasam', 'north-sharad-purnima', 'Kheer is offered to Shiva and Vishnu.'),
      O('Floating diya and Ganga-jal', 'Light and float diyas on the river; offer a few drops of Ganga-jal.'),
      O('Charity food', 'Feed the hungry and give grain and blankets.'),
    ],
  },
  thaipusam: {
    entries: [
      R('panchamrit', 'palani-tamil', 'Palani’s banana-based panchamirtham.'),
      O('Milk pots (paal kudam)', 'Devotees carry pots of milk to the temple, to be poured over Murugan’s image at the abhishekam.'),
      O('Vibhuti and vel', 'Smear vibhuti and apply sandal paste to the vel (spear) and the image.'),
    ],
  },
  'kanwar-yatra': {
    entries: [
      R('panchamrit', 'north-maharashtra', 'Used with Ganga-jal for abhishek.'),
      R('thandai', 'braj-up', 'A cooling drink for pilgrims.'),
      O('Ganga water and bilva', 'Carry water in a kanwar from the Ganga and pour it on the Shivalinga with bilva leaves.'),
      O('Bhang and dhatura', 'These are traditional, but are not recommended for home puja.'),
    ],
  },
  'karthigai-deepam': {
    entries: [
      R('karthigai-pori', 'tamil-nadu', 'Puffed rice and jaggery offered at the lamp-lighting.'),
      R('appam', 'tamil-nei-appam', 'Nei appam offered with pori.'),
      O('Vibhuti and lamps', 'Light rows of lamps at dusk and smear vibhuti on the forehead.'),
    ],
  },
  'pradosh-vrat': {
    entries: [
      R('panchamrit', 'north-maharashtra', 'Abhishek at dusk.'),
      O('Bilva leaves and vibhuti', 'Offer bilva and smear vibhuti on the linga.'),
      O('Fruit', 'Offer fruits after the abhishek.'),
    ],
  },
  'shankara-jayanti': {
    entries: [
      R('kheer-payasam', 'kerala-ada-pradhaman', 'Payasam is offered at Kalady in Kerala.'),
      R('panchamrit', 'north-maharashtra', 'For the abhishek of Shiva.'),
      O('Tirtha and vibhuti', 'Take sanctified water and vibhuti at the shrine.'),
    ],
  },
  'appayya-jayanti': {
    entries: [
      R('panchamrit', 'north-maharashtra', 'For the abhishek of Shiva.'),
      O('Vibhuti and tirtha', 'Take vibhuti and tirtha.'),
      O('Bilva and fruit', 'Offer bilva leaves and fruit.'),
    ],
  },
  pola: {
    entries: [
      R('puran-poli', 'maharashtra', 'Offered to the decorated bullocks.'),
      O('Grains and jaggery', 'Feed the bullocks jaggery and grain after worship.'),
    ],
  },

  // ───────────────────────────── Surya ─────────────────────────────
  'makar-sankranti': {
    entries: [
      R('tilgul', 'maharashtra-ladoo', 'Exchanged with “til-gul ghya, god god bola”.'),
      R('tilgul', 'gujarat-chikki', 'Uttarayan chikki in Gujarat.'),
      R('tilgul', 'karnataka-ellu-bella', 'Ellu-bella in Karnataka.'),
      R('sweet-pongal', 'tamil-sakkarai', 'Sakkarai pongal offered to Surya.'),
      R('pitha', 'bengal-patishapta', 'Bengal’s patishapta at Poush Sankranti.'),
      R('pitha', 'assam-til-pitha', 'Assam’s til pitha.'),
      R('khichdi-bhog', 'maharashtra-datta', 'Khichdi is the Sankranti dish in many North Indian homes.'),
      O('Sugarcane and winter produce', 'Offer sugarcane, sweet potato, peanuts and other winter produce.'),
    ],
  },
  pongal: {
    entries: [
      R('sweet-pongal', 'tamil-sakkarai', 'Cooked outdoors; the first portion goes to Surya.'),
      R('ven-pongal', 'tamil-nadu-temple', 'Savoury pongal served beside it.'),
      O('Sugarcane and turmeric', 'Tie a fresh turmeric plant around the pot and place sugarcane beside it.'),
    ],
  },
  'chhath-puja': {
    entries: [
      R('thekua', 'bihar-thekua', 'The signature Chhath prasad.'),
      R('thekua', 'purvanchal-kasar', 'Kasar laddu in the soop.'),
      O('Fruit in the bamboo soop', 'Arrange fruit, sugarcane, coconut and thekua in the bamboo soop and carry it to the water.'),
    ],
  },
  lohri: {
    entries: [
      R('lohri-til-rewari', 'punjab', 'Thrown into the bonfire and shared.'),
      R('tilgul', 'gujarat-chikki', 'Til chikki.'),
    ],
  },
  'pana-sankranti': {
    entries: [
      R('pana', 'odisha', 'Offered to Surya, Jagannath and Hanuman.'),
      O('Fruit and cooling offerings', 'Offer the season’s first fruits and cool water in a new earthen pot.'),
    ],
  },

  // ───────────────────────────── Ganesha / Hanuman / Murugan ─────────────────────────────
  'ganesh-chaturthi': {
    entries: [
      R('modak', 'maharashtra', 'Twenty-one ukadiche modak.'),
      R('modak', 'tamil-karnataka', 'Pooranam kozhukattai (kadubu).'),
      R('modak', 'goa-konkan', 'Patoli and nevri in Goa and Konkan.'),
      R('sundal', 'tamil-nadu', 'Chana sundal.'),
      R('sundal', 'andhra-guggillu', 'Guggillu in Andhra.'),
      R('panchamrit', 'north-maharashtra', 'Abhishek of the idol.'),
      O('Durva grass and red hibiscus', 'Offer 21 blades of durva grass tied in threes, and red hibiscus.'),
    ],
  },
  'hanuman-jayanti': {
    entries: [
      R('laddu', 'north-boondi', 'Boondi laddu is Hanuman’s favourite.'),
      O('Sindoor and chameli oil', 'Mix sindoor with chameli oil and apply to the image.'),
      O('Betel-leaf garland and bananas', 'Offer a garland of betel leaves and bananas.'),
      O('Vada mala', 'In the South, a garland of urad dal vadas is placed on Hanuman.'),
    ],
  },
  'skanda-sashti': {
    entries: [
      R('panchamrit', 'palani-tamil', 'The Palani panchamirtham.'),
      O('Vibhuti and chandan', 'Smear vibhuti and sandal paste on the idol.'),
      O('Tender coconut, honey and fruit', 'Offer honey, tender coconut and fruit.'),
    ],
  },

  // ───────────────────────────── Sikh ─────────────────────────────
  baisakhi: {
    entries: [
      R('halwa-sheera', 'sikh-kada-prasad', 'Kada prasad at the gurdwara.'),
      R('ugadi-pachadi', 'tamil-nadu-puthandu', 'Maanga pachadi at Puthandu.'),
      O('Vishukkani', 'Arrange rice, fruits and konna flowers in Kerala.'),
      O('Langar', 'Share the langar meal with everyone.'),
    ],
  },
  'guru-nanak-jayanti': {
    entries: [
      R('halwa-sheera', 'sikh-kada-prasad', 'Kada prasad.'),
      O('Langar', 'Share the langar meal equally.'),
    ],
  },
  'holla-mohalla': {
    entries: [
      R('halwa-sheera', 'sikh-kada-prasad', 'Kada prasad.'),
      O('Langar', 'The community kitchen runs through the festival.'),
    ],
  },

  // ───────────────────────────── Jain / Buddhist / Parsi / Other ─────────────────────────────
  'mahavir-jayanti': {
    intro: 'Jain temples offer simple, pure naivedya — rice (akshat), fruit, dry fruits and plain sweets — without root vegetables.',
    entries: [
      R('laddu', 'north-boondi', 'A simple sweet naivedya (no root vegetables).'),
      O('Janma Kalyanak abhishek', 'The abhishek uses water, milk and sandalwood.'),
      O('Fruit and dry fruit', 'Offer fruit and dry fruits in simple trays.'),
    ],
  },
  'buddha-purnima': {
    entries: [
      R('kheer-payasam', 'sujata-kheer', 'The milk-rice of Sujata.'),
      O('Flowers, lamps and incense', 'Offer flowers, lamps and incense at the Buddha image.'),
      O('Fruit', 'Offer fruit to the monks.'),
    ],
  },
  paryushan: {
    intro: 'Paryushan has no cooked prasad. The practice is fasting, scripture reading and seeking forgiveness (Micchami Dukkadam).',
    entries: [
      O('Fasting and forgiveness', 'Devotees fast or keep to restricted food for some or all of the eight days, and close with Micchami Dukkadam — asking everyone’s forgiveness.'),
      O('Offerings at the Tirthankara’s feet', 'Offer rice grains (akshat) in the shape of the swastika.'),
    ],
  },
  'dhammachakra-pravartan-din': {
    intro: 'The day is marked by flowers, lamps and giving; no cooked prasad is prescribed.',
    entries: [
      O('Flowers and lamps', 'Offer flowers and lamps before the Buddha.'),
      O('Dana (giving)', 'Give food or money to the needy.'),
    ],
  },
  mahamastakabhisheka: {
    intro: 'The great anointing of Bahubali uses sanctified substances rather than cooked food.',
    entries: [
      O('The abhisheka substances', 'Includes water, tender coconut water, sugarcane juice, milk, curd, ghee, rice powder, turmeric, sandalwood and saffron.'),
      O('Offerings at Bahubali’s feet', 'Flowers and rice (akshat) are offered at the feet.'),
    ],
  },
  pateti: {
    entries: [
      R('sev-ravo', 'parsi-sev', 'Sweet sev at the Navroz breakfast.'),
      R('sev-ravo', 'parsi-ravo', 'The semolina pudding.'),
      O('Sandalwood for the sacred fire', 'Offer sandalwood to the fire at the fire temple.'),
    ],
  },
  'cheti-chand': {
    entries: [
      R('tahiri-akha', 'sindhi', 'The Sindhi akha and tahiri.'),
      O('Baharana Sahib', 'A lamp, water, coconut and sweets are floated or carried to the water.'),
      O('Floated lamps', 'Float lamps on a river, lake or sea.'),
    ],
  },
  'guru-purnima': {
    entries: [
      R('charanamrit', 'north-braj', 'From the guru’s worship.'),
      R('halwa-sheera', 'maharashtra-gujarat-sheera', 'A sweet offered at the guru’s feet.'),
      O('Flowers at the guru’s feet', 'Offer flowers and fruit at the guru’s feet.'),
    ],
  },
  'raksha-bandhan': {
    entries: [
      R('narali-bhat', 'maharashtra-konkan', 'Nariyal Purnima sweet coconut rice.'),
      R('ghewar', 'rajasthan', 'The Rajasthani Raksha Bandhan sweet.'),
      R('kheer-payasam', 'north-sharad-purnima', 'Kheer is a common sweet.'),
      O('Rice and turmeric for the tilak', 'Mix rice, turmeric and kumkum for the tilak.'),
    ],
  },
  'bhai-dooj': {
    entries: [
      R('narkel-naru-sandesh', 'bengal', 'Bhai Phonta sweets.'),
      R('kheer-payasam', 'north-sharad-purnima', 'Kheer for the brother.'),
      O('Tilak with rice and roli', 'The sister applies tilak with roli and rice.'),
    ],
  },
  'vishwakarma-puja': {
    entries: [
      R('khichdi-bhog', 'bengal-bhoger-khichuri', 'Khichuri bhog.'),
      R('labra', 'bengal', 'Served beside the khichuri.'),
      O('Tools and machines', 'Place the offering on the tools and machines.'),
    ],
  },
  jitiya: {
    intro: 'The paran (fast-breaking) meal at Jitiya varies by family and region. Ask the elders at home for the traditional menu.',
    entries: [
      R('kheer-payasam', 'north-sharad-purnima', 'A sweet offering is common.'),
      O('Offerings to Jimutavahana', 'Offer fruit and flowers to Jimutavahana.'),
    ],
  },
  bihu: {
    entries: [
      R('pitha', 'assam-til-pitha', 'Til pitha and narikol laru.'),
      O('Offerings to cattle on Goru Bihu', 'Wash the cattle, apply turmeric and offer them pitha.'),
    ],
  },
  puthandu: {
    entries: [
      R('ugadi-pachadi', 'tamil-nadu-puthandu', 'Maanga pachadi.'),
      O('Fruit and betel from the kanni', 'View the kanni (tray of fruit, betel and gold) first thing in the morning.'),
    ],
  },
  'dattatreya-jayanti': {
    entries: [
      R('sunthavda', 'maharashtra', 'The Maharashtra prasad.'),
      R('khichdi-bhog', 'maharashtra-datta', 'Alms khichdi.'),
      O('Tirtha and paduka tirtha', 'Take the water from Datta’s padukas.'),
    ],
  },
  'chitra-purnima': {
    entries: [
      R('kheer-payasam', 'tamil-paal-payasam', 'Rice and payasam for Chitragupta.'),
      R('panchamrit', 'north-maharashtra', 'For the abhishek.'),
      O('Betel and coconut', 'Offer betel leaves and coconut.'),
    ],
  },
  'kumbh-mela': {
    entries: [
      R('khichdi-bhog', 'maharashtra-datta', 'Bhandara khichdi is served in the akhara kitchens.'),
      O('Ganga-jal and floating diya', 'Float a diya at the river.'),
      O('Vibhuti from the akharas', 'Receive vibhuti from the sadhus of the akharas.'),
    ],
  },
  'pitru-paksha': {
    entries: [
      R('pinda', 'north-gaya', 'Pinda in the Gaya tradition.'),
      R('pinda', 'south-tamil', 'Pinda and shraddha bhojan in the South.'),
      R('kheer-payasam', 'north-sharad-purnima', 'Shraddha kheer.'),
      O('Food for crows, cows and Brahmins', 'Keep aside the first portions for the crow, cow and dog.'),
      O('Tulsi and sesame', 'Use black sesame and tulsi in the rite.'),
    ],
  },
}
