// Naivedya (food-offering) verses and formulas.
// Only widely-recited texts are included: Bhagavad Gita verses, the five-prana
// offering from the Taittiriya tradition, and standard stotra verses. Where a
// deity has no single canonical offering verse, the standard upachara formula
// "… naivedyam samarpayami" is given instead. Recitation varies by lineage —
// learn the pronunciation from a priest or guru.

export interface Shloka {
  id: string
  title: string
  when: string          // when it is said
  devanagari: string
  iast: string
  meaning: string
  source: string
  listen: string        // search phrase for the "Listen" link
}

export const SHLOKAS: Record<string, Shloka> = {
  gita926: {
    id: 'gita926',
    title: 'The offering of leaf, flower, fruit and water',
    when: 'While placing the food before the deity, hands folded.',
    devanagari: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति ।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥',
    iast: 'patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati |\ntad ahaṃ bhaktyupahṛtam aśnāmi prayatātmanaḥ ||',
    meaning: 'Whoever offers Me with devotion a leaf, a flower, a fruit or water — that devout offering of the pure-hearted, I accept.',
    source: 'Bhagavad Gita 9.26',
    listen: 'patram pushpam phalam toyam Bhagavad Gita 9.26 chanting',
  },
  brahmarpanam: {
    id: 'brahmarpanam',
    title: 'Brahmarpanam — the food is itself an offering',
    when: 'Before eating the prasad, after it has been offered.',
    devanagari: 'ब्रह्मार्पणं ब्रह्म हविर्ब्रह्माग्नौ ब्रह्मणा हुतम् ।\nब्रह्मैव तेन गन्तव्यं ब्रह्मकर्मसमाधिना ॥',
    iast: 'brahmārpaṇaṃ brahma havir brahmāgnau brahmaṇā hutam |\nbrahmaiva tena gantavyaṃ brahmakarmasamādhinā ||',
    meaning: 'The act of offering is Brahman, the offering is Brahman, offered by Brahman into the fire that is Brahman. One who sees Brahman in every act reaches Brahman.',
    source: 'Bhagavad Gita 4.24',
    listen: 'Brahmarpanam Brahma Havir Gita 4.24 chanting',
  },
  tvadiyam: {
    id: 'tvadiyam',
    title: 'Tvadiyam vastu — “what is Yours, I return to You”',
    when: 'As the plate or bowl is placed before the deity, especially in Vaishnava homes.',
    devanagari: 'त्वदीयं वस्तु गोविन्द तुभ्यमेव समर्पये ।\nगृहाण सम्मुखो भूत्वा प्रसीद परमेश्वर ॥',
    iast: 'tvadīyaṃ vastu govinda tubhyam eva samarpaye |\ngṛhāṇa sammukho bhūtvā prasīda parameśvara ||',
    meaning: 'O Govinda, this thing is Yours; I offer it back to You alone. Please face me, accept it, and be gracious, O Supreme Lord.',
    source: 'Traditional Vaishnava offering verse',
    listen: 'Tvadiyam vastu Govinda tubhyameva samarpaye',
  },
  pranahuti: {
    id: 'pranahuti',
    title: 'Pranahuti — the five breaths',
    when: 'Before the first morsel is eaten (Smarta custom); a little water is sprinkled round the leaf first.',
    devanagari: 'ॐ प्राणाय स्वाहा । ॐ अपानाय स्वाहा । ॐ व्यानाय स्वाहा ।\nॐ उदानाय स्वाहा । ॐ समानाय स्वाहा । ॐ ब्रह्मणे स्वाहा ।',
    iast: 'oṃ prāṇāya svāhā | oṃ apānāya svāhā | oṃ vyānāya svāhā |\noṃ udānāya svāhā | oṃ samānāya svāhā | oṃ brahmaṇe svāhā |',
    meaning: 'Offered to the five vital breaths — prana, apana, vyana, udana, samana — and to Brahman. Each is said with a small portion of food.',
    source: 'Taittiriya tradition; Smarta household custom',
    listen: 'Pranahuti mantra Om pranaya swaha apanaya swaha',
  },
  ganesha: {
    id: 'ganesha',
    title: 'To Ganesha',
    when: 'After placing the modak or laddu before the idol.',
    devanagari: 'वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥\nॐ गं गणपतये नमः । नैवेद्यं समर्पयामि ।',
    iast: 'vakratuṇḍa mahākāya sūryakoṭisamaprabha |\nnirvighnaṃ kuru me deva sarvakāryeṣu sarvadā ||\noṃ gaṃ gaṇapataye namaḥ | naivedyaṃ samarpayāmi |',
    meaning: 'O Lord of the curved trunk and mighty form, brilliant as a million suns — make all my undertakings free of obstacles, always. Om, salutations to Ganapati; I offer this food.',
    source: 'Traditional Ganapati prayer; upachara formula',
    listen: 'Vakratunda Mahakaya Ganesh shloka',
  },
  shiva: {
    id: 'shiva',
    title: 'To Shiva',
    when: 'After the abhishekam, when the food is placed before the Lingam.',
    devanagari: 'ॐ नमः शिवाय ।\nइदं नैवेद्यं निवेदयामि ।',
    iast: 'oṃ namaḥ śivāya |\nidaṃ naivedyaṃ nivedayāmi |',
    meaning: 'Om, salutations to Shiva. I present this food.',
    source: 'Panchakshara mantra with the upachara formula',
    listen: 'Om Namah Shivaya chanting',
  },
  devi: {
    id: 'devi',
    title: 'To the Goddess',
    when: 'After the deity is decorated and the food is placed before her.',
    devanagari: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥\nइदं नैवेद्यं समर्पयामि ।',
    iast: 'sarvamaṅgalamāṅgalye śive sarvārthasādhike |\nśaraṇye tryambake gauri nārāyaṇi namo \'stu te ||\nidaṃ naivedyaṃ samarpayāmi |',
    meaning: 'O auspiciousness of all that is auspicious, Shiva, fulfiller of every aim, refuge, three-eyed Gauri, Narayani — salutations to you. I offer this food.',
    source: 'Devi Mahatmya (Durga Saptashati) 11.10; upachara formula',
    listen: 'Sarva Mangala Mangalye Shive Sarvartha Sadhike',
  },
  vishnu: {
    id: 'vishnu',
    title: 'To Vishnu',
    when: 'After the offering verse, while the food rests before the deity.',
    devanagari: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम् ।\nलक्ष्मीकान्तं कमलनयनं योगिहृद्ध्यानगम्यं\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥',
    iast: 'śāntākāraṃ bhujagaśayanaṃ padmanābhaṃ sureśaṃ\nviśvādhāraṃ gaganasadṛśaṃ meghavarṇaṃ śubhāṅgam |\nlakṣmīkāntaṃ kamalanayanaṃ yogihṛddhyānagamyaṃ\nvande viṣṇuṃ bhavabhayaharaṃ sarvalokaikanātham ||',
    meaning: 'I bow to Vishnu — peaceful in form, reclining on the serpent, lotus-naveled Lord of the gods, support of the universe, vast as the sky, cloud-hued, of beautiful limbs, Lakshmi’s beloved, lotus-eyed, reached by yogis in meditation, remover of the fear of rebirth, the one Lord of all the worlds.',
    source: 'Traditional Vishnu dhyana shloka',
    listen: 'Shantakaram Bhujagashayanam Padmanabham Suresham',
  },
  hanuman: {
    id: 'hanuman',
    title: 'To Hanuman',
    when: 'After placing the offering of boondi, laddu or churma.',
    devanagari: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शिरसा नमामि ॥',
    iast: 'manojavaṃ mārutatulyavegaṃ jitendriyaṃ buddhimatāṃ variṣṭham |\nvātātmajaṃ vānarayūthamukhyaṃ śrīrāmadūtaṃ śirasā namāmi ||',
    meaning: 'Swift as the mind, fast as the wind, master of his senses, foremost among the wise, son of the Wind, chief of the vanara host, messenger of Sri Rama — I bow my head to him.',
    source: 'Traditional Hanuman stuti',
    listen: 'Manojavam Marutatulyavegam Hanuman shloka',
  },
  surya: {
    id: 'surya',
    title: 'To Surya',
    when: 'Facing the sun, as the pongal or kheer is offered.',
    devanagari: 'जपाकुसुमसङ्काशं काश्यपेयं महाद्युतिम् ।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम् ॥',
    iast: 'japākusumasaṅkāśaṃ kāśyapeyaṃ mahādyutim |\ntamo\'riṃ sarvapāpaghnaṃ praṇato\'smi divākaram ||',
    meaning: 'Red as the hibiscus, son of Kashyapa, of great radiance, enemy of darkness, destroyer of all sin — I bow to Divakara, the sun.',
    source: 'Navagraha stotra (Surya)',
    listen: 'Japakusuma Sankasam Kashyapeyam Surya shloka',
  },
  murugan: {
    id: 'murugan',
    title: 'To Murugan (Karttikeya)',
    when: 'As the panchamrit or panakam is presented.',
    devanagari: 'ॐ शरवणभवाय नमः ।\nइदं नैवेद्यं समर्पयामि ।',
    iast: 'oṃ śaravaṇabhavāya namaḥ |\nidaṃ naivedyaṃ samarpayāmi |',
    meaning: 'Om, salutations to the One born in the reed-grove (Saravanabhava). I offer this food.',
    source: 'Shadakshara mantra with the upachara formula',
    listen: 'Om Saravanabhava Namaha chanting',
  },
}

// Deity groups that have no Hindu food-offering verse (their own customs apply).
const NON_HINDU = new Set(['Sikh', 'Jain', 'Buddhist', 'Parsi', 'Multi-faith'])

const BY_GROUP: Record<string, string> = {
  Shiva: 'shiva',
  'Vishnu & Avatars': 'vishnu',
  'Devi / Shakti': 'devi',
  Ganesha: 'ganesha',
  Murugan: 'murugan',
  Hanuman: 'hanuman',
  Surya: 'surya',
}

export interface ShlokaSet { universal: Shloka[]; deity?: Shloka; note?: string }

/** Verses for a recipe. `groups` are the deity groups of the festivals that offer it. */
export function shlokasFor(groups: string[], preferred?: string): ShlokaSet | null {
  const g = groups.filter(Boolean)
  if (g.length && g.every(x => NON_HINDU.has(x))) return null
  const pick = preferred && !NON_HINDU.has(preferred) ? preferred : (new Set(g.filter(x => !NON_HINDU.has(x))).size === 1 ? g.find(x => !NON_HINDU.has(x)) : undefined)
  const deity = pick && BY_GROUP[pick] ? SHLOKAS[BY_GROUP[pick]] : undefined
  const vaishnava = pick === 'Vishnu & Avatars'
  const universal = [SHLOKAS.gita926, vaishnava ? SHLOKAS.tvadiyam : SHLOKAS.pranahuti, SHLOKAS.brahmarpanam]
  return { universal, deity }
}

export function listenHref(q: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
}
