'use client'
import { useState } from 'react'
import Link from 'next/link'

const YT_BASE = 'https://www.youtube.com/results?search_query='

const DEITIES = [
  {
    name: 'Ganesha',
    emoji: '🐘',
    domain: 'New Beginnings · Removing Obstacles · Business',
    color: '#E65100',
    bg: '#FFF3E0',
    border: '#FFB74D',
    shloka_hi: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    shloka_en: 'Vakratunda Mahakaya Suryakoti Samaprabha\nNirvighnam Kuru Me Deva Sarvakaryeshu Sarvada',
    meaning: 'O Lord with the curved trunk and mighty form, radiant as a million suns — bless me so that all my endeavours are free of obstacles, always.',
    chant_day: 'Wednesday & before any new beginning',
    chant_count: '108 times',
    youtube_query: 'Vakratunda+Mahakaya+mantra+108+times',
    temple: 'Siddhivinayak Mumbai · Ashtavinayak Circuit',
    temple_slug: 'siddhivinayak-temple',
  },
  {
    name: 'Lakshmi',
    emoji: '🌸',
    domain: 'Wealth · Abundance · Prosperity · Business',
    color: '#6A1B9A',
    bg: '#F3E5F5',
    border: '#CE93D8',
    shloka_hi: 'ॐ श्री महालक्ष्म्यै च विद्महे विष्णु पत्न्यै च धीमहि।\nतन्नो लक्ष्मी प्रचोदयात्॥',
    shloka_en: 'Om Shri Mahalakshmyai Cha Vidmahe Vishnu Patnyai Cha Dhimahi\nTanno Lakshmi Prachodayat',
    meaning: 'We meditate upon the great Lakshmi, consort of Vishnu. May the Goddess of abundance inspire and illuminate our minds.',
    chant_day: 'Friday · Diwali · Purnima',
    chant_count: '108 times',
    youtube_query: 'Mahalakshmi+Gayatri+mantra+chanting+108+times',
    temple: 'Mahalaxmi Temple Kolhapur · Padmanabhaswamy',
    temple_slug: 'mahalaxmi-temple-kolhapur',
  },
  {
    name: 'Durga',
    emoji: '⚔️',
    domain: 'Strength · Protection · Courage · Adversity',
    color: '#B71C1C',
    bg: '#FFEBEE',
    border: '#EF9A9A',
    shloka_hi: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तु ते॥',
    shloka_en: 'Sarva Mangala Mangalye Shive Sarvartha Sadhike\nSharanye Tryambake Gauri Narayani Namostute',
    meaning: 'O auspicious one who brings auspiciousness to all, who fulfils every purpose — O three-eyed Gauri, refuge of all, I bow to you.',
    chant_day: 'Tuesday · Navratri · Ashtami',
    chant_count: '108 times',
    youtube_query: 'Sarva+Mangala+Mangalye+Durga+mantra+chanting',
    temple: 'Vaishno Devi · Kamakhya · Kanaka Durga',
    temple_slug: 'vaishno-devi-shrine',
  },
  {
    name: 'Shiva',
    emoji: '🔱',
    domain: 'Healing · Peace · Spiritual Growth · Liberation',
    color: '#1565C0',
    bg: '#E3F2FD',
    border: '#90CAF9',
    shloka_hi: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥',
    shloka_en: 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam\nUrvarukamiva Bandhanat Mrityor Mukshiya Mamritat',
    meaning: 'We worship the three-eyed Shiva, nourisher of all. May he liberate us from death as a ripe cucumber is freed from the vine — and grant us immortality.',
    chant_day: 'Monday · Mahashivratri · Pradosh',
    chant_count: '108 times — the Mahamrityunjaya Mantra',
    youtube_query: 'Mahamrityunjaya+mantra+108+times+Shankar+Mahadevan',
    temple: 'Kashi Vishwanath · Kedarnath · 12 Jyotirlingas',
    temple_slug: 'kashi-vishwanath-temple',
  },
  {
    name: 'Krishna',
    emoji: '🪈',
    domain: 'Love · Relationships · Joy · Devotion',
    color: '#0277BD',
    bg: '#E1F5FE',
    border: '#81D4FA',
    shloka_hi: 'ॐ श्री कृष्णाय गोविन्दाय गोपीजन वल्लभाय।\nपराय परम पुरुषाय परमात्मने नमः॥',
    shloka_en: 'Om Shri Krishnaya Govindaya Gopijana Vallabhaya\nParaya Parama Purushaya Paramatmane Namah',
    meaning: 'I bow to Shri Krishna — the cowherd, beloved of the gopis, the supreme soul, the highest of all beings. May love and joy flow into my life.',
    chant_day: 'Wednesday · Janmashtami · Ekadashi',
    chant_count: '108 times',
    youtube_query: 'Om+Shri+Krishnaya+Govindaya+mantra+108+times',
    temple: 'Krishna Janmabhoomi · Banke Bihari Vrindavan · Guruvayur',
    temple_slug: 'banke-bihari-temple',
  },
  {
    name: 'Saraswati',
    emoji: '📚',
    domain: 'Knowledge · Exams · Wisdom · Speech · Arts',
    color: '#00695C',
    bg: '#E0F2F1',
    border: '#80CBC4',
    shloka_hi: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥',
    shloka_en: 'Saraswati Namastubhyam Varade Kamarupini\nVidyarambham Karishyami Siddhirbhavatu Me Sada',
    meaning: 'O Saraswati, I bow to you — the wish-fulfilling goddess. As I begin my pursuit of knowledge, may success always be mine.',
    chant_day: 'Wednesday · Vasant Panchami · before exams',
    chant_count: '108 times',
    youtube_query: 'Saraswati+Namastubhyam+mantra+chanting+108+times',
    temple: 'Gnana Saraswati Basar · Saraswati Temple Pushkar',
    temple_slug: 'gnana-saraswati-temple-basar',
  },
  {
    name: 'Hanuman',
    emoji: '💪',
    domain: 'Courage · Health · Devotion · Protection · Success',
    color: '#E65100',
    bg: '#FBE9E7',
    border: '#FFAB91',
    shloka_hi: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
    shloka_en: 'Manojavam Marutatulyavegam Jitendriyam Buddhimatam Varishtham\nVatatmajam Vanarayuthamukhyam Shriramadutam Sharanam Prapadye',
    meaning: 'I take refuge in Hanuman — swift as the mind, fast as the wind, master of the senses, foremost among the wise, the divine messenger of Shri Ram.',
    chant_day: 'Tuesday · Saturday · Hanuman Jayanti',
    chant_count: '108 times',
    youtube_query: 'Manojavam+Marutatulyavegam+Hanuman+mantra',
    temple: 'Hanuman Garhi Ayodhya · Sankat Mochan Varanasi',
    temple_slug: 'hanuman-garhi-temple',
  },
  {
    name: 'Parvati',
    emoji: '🌙',
    domain: 'Marriage · Family · Children · Relationships',
    color: '#AD1457',
    bg: '#FCE4EC',
    border: '#F48FB1',
    shloka_hi: 'हे गौरि शङ्करार्धाङ्गि यथा त्वं शङ्करप्रिया।\nतथा मां कुरु कल्याणि कान्तकान्तां सुदुर्लभाम्॥',
    shloka_en: 'He Gauri Shankarardhangi Yatha Tvam Shankarapriya\nTatha Mam Kuru Kalyani Kantakantam Sudurllabham',
    meaning: 'O Gauri, beloved half of Shankara — just as you are the dearest to Shiva, bless me with a loving, devoted companion who is rare to find.',
    chant_day: 'Monday · Teej · Navratri',
    chant_count: '108 times',
    youtube_query: 'Parvati+Gayatri+mantra+chanting+108+times',
    temple: 'Meenakshi Amman · Kamakshi Kanchi',
    temple_slug: 'meenakshi-amman-temple',
  },
  {
    name: 'Kali',
    emoji: '🌺',
    domain: 'Transformation · Breaking Negative Cycles · Fear Removal',
    color: '#4A148C',
    bg: '#EDE7F6',
    border: '#B39DDB',
    shloka_hi: 'सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते।\nभयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते॥',
    shloka_en: 'Sarvasvarupe Sarveshe Sarvasaktisamanvite\nBhayebhyastrahi No Devi Durge Devi Namostute',
    meaning: 'O Goddess who is the form of all, ruler of all, embodiment of all powers — protect us from all fears, O Durga. We bow to you.',
    chant_day: 'Tuesday · Kali Puja · Amavasya',
    chant_count: '108 times',
    youtube_query: 'Kali+mantra+Sarvasvarupe+chanting+108+times',
    temple: 'Kalighat Kolkata · Kamakhya Guwahati · Dakshineswar',
    temple_slug: 'kalighat-kali-temple',
  },
]

const NAVAGRAHA = [
  {
    name: 'Surya', planet: 'Sun ☀️', number: 1,
    domain: 'Career · Authority · Government · Father · Eye Health',
    color: '#E65100', bg: '#FFF3E0', border: '#FFB74D',
    shloka_hi: 'जपाकुसुम संकाशं काश्यपेयं महाद्युतिम्।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥',
    shloka_en: 'Japakusuma Sankasham Kashyapeyam Mahadyutim\nTamorim Sarvapapaghanam Pranato Asmi Divakarum',
    beej: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
    meaning: 'Radiant like the hibiscus, son of Kashyapa, destroyer of darkness and all sins — I bow to the Sun God.',
    chant_day: 'Sunday · Sunrise',
    chant_count: '108 times · Surya Namaskar',
    youtube_query: 'Surya+mantra+Japakusuma+Sankasham+108+times',
    gemstone: 'Ruby', color_gem: 'Red', metal: 'Gold',
  },
  {
    name: 'Chandra', planet: 'Moon 🌙', number: 2,
    domain: 'Mind · Mother · Emotions · Fertility · Peace',
    color: '#0277BD', bg: '#E1F5FE', border: '#81D4FA',
    shloka_hi: 'दधिशंखतुषाराभं क्षीरोदार्णव संभवम्।\nनमामि शशिनं सोमं शम्भोर्मुकुट भूषणम्॥',
    shloka_en: 'Dadhishankhatusharabhm Kshirodarnavasambhavam\nNamami Sashinam Somam Shambhormukuta Bhushanam',
    beej: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
    meaning: 'White as curd, conch and snow, born of the ocean of milk, adorning Shiva\'s crown — I bow to the Moon God.',
    chant_day: 'Monday · Evening · Purnima',
    chant_count: '108 times',
    youtube_query: 'Chandra+mantra+Dadhishankhatusharabhm+108+times',
    gemstone: 'Pearl', color_gem: 'White', metal: 'Silver',
  },
  {
    name: 'Mangal', planet: 'Mars 🔴', number: 3,
    domain: 'Energy · Property · Siblings · Courage · Surgery',
    color: '#B71C1C', bg: '#FFEBEE', border: '#EF9A9A',
    shloka_hi: 'धरणीगर्भसंभूतं विद्युत्कान्तिसमप्रभम्।\nकुमारं शक्तिहस्तं च मंगलं प्रणमाम्यहम्॥',
    shloka_en: 'Dharanigarbhasambhutam Vidyutkanttisamaprabham\nKumaram Shaktihastam Cha Mangalam Pranamaamyaham',
    beej: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    meaning: 'Born from the womb of the earth, radiant like lightning, youthful and holding the spear — I bow to Mangal.',
    chant_day: 'Tuesday',
    chant_count: '108 times · Removes Mangal Dosha',
    youtube_query: 'Mangal+mantra+Dharanigarbhasambhutam+108+times',
    gemstone: 'Red Coral', color_gem: 'Red', metal: 'Copper',
  },
  {
    name: 'Budha', planet: 'Mercury 🟢', number: 4,
    domain: 'Intelligence · Business · Speech · Education · Skin',
    color: '#2E7D32', bg: '#E8F5E9', border: '#A5D6A7',
    shloka_hi: 'प्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधम्।\nसौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम्॥',
    shloka_en: 'Priyangukalikaashyamam Rupenaapratimaum Budham\nSaumyam Saumyagunopetam Tam Budham Pranamaamyaham',
    beej: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    meaning: 'Dark as the priyangu blossom, of incomparable beauty, gentle and full of good qualities — I bow to Budha, the wise one.',
    chant_day: 'Wednesday',
    chant_count: '108 times',
    youtube_query: 'Budha+mantra+Priyangukalikaashyamam+108+times',
    gemstone: 'Emerald', color_gem: 'Green', metal: 'Bronze',
  },
  {
    name: 'Brihaspati', planet: 'Jupiter 🟡', number: 5,
    domain: 'Wisdom · Wealth · Marriage · Children · Guru · Legal',
    color: '#F57F17', bg: '#FFFDE7', border: '#FFF176',
    shloka_hi: 'देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्।\nबुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥',
    shloka_en: 'Devanam Cha Rishinam Cha Gurum Kanchanasannibham\nBuddhibhutam Trilokesham Tam Namami Brihaspatim',
    beej: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    meaning: 'Guru of the gods and sages, golden in form, the embodiment of wisdom, lord of the three worlds — I bow to Brihaspati.',
    chant_day: 'Thursday · Most auspicious',
    chant_count: '108 times',
    youtube_query: 'Brihaspati+Guru+mantra+Devanam+Cha+Rishinam+108+times',
    gemstone: 'Yellow Sapphire', color_gem: 'Yellow', metal: 'Gold',
  },
  {
    name: 'Shukra', planet: 'Venus ⚪', number: 6,
    domain: 'Love · Marriage · Beauty · Luxury · Creativity · Vehicles',
    color: '#880E4F', bg: '#FCE4EC', border: '#F48FB1',
    shloka_hi: 'हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्।\nसर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्॥',
    shloka_en: 'Himakunda Mrinalaabham Daityaanam Paramam Gurum\nSarvashastra Pravaktaaram Bhargavam Pranamamyaham',
    beej: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    meaning: 'White as snow, lotus stem and jasmine, supreme guru of the demons, master of all scriptures — I bow to Shukra, son of Bhrigu.',
    chant_day: 'Friday',
    chant_count: '108 times',
    youtube_query: 'Shukra+Venus+mantra+Himakunda+Mrinalaabham+108+times',
    gemstone: 'Diamond', color_gem: 'White/Clear', metal: 'Silver',
  },
  {
    name: 'Shani', planet: 'Saturn 🟤', number: 7,
    domain: 'Karma · Justice · Discipline · Delays · Longevity · Sade Sati',
    color: '#37474F', bg: '#ECEFF1', border: '#B0BEC5',
    shloka_hi: 'नीलांजनसमाभासं रविपुत्रं यमाग्रजम्।\nछायामार्तण्डसंभूतं तं नमामि शनैश्चरम्॥',
    shloka_en: 'Nilaanjana Samaabhasam Raviputram Yamaagrajam\nChhaayaa Maartanda Sambhutam Tam Namami Shanaishcharam',
    beej: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    meaning: 'Dark as blue collyrium, son of the Sun, elder brother of Yama — I bow to the slow-moving Saturn. Chanting with devotion turns Saturn into a great benefactor.',
    chant_day: 'Saturday · Amavasya',
    chant_count: '108 times · Removes Sade Sati',
    youtube_query: 'Shani+mantra+Nilaanjana+Samaabhasam+108+times',
    gemstone: 'Blue Sapphire', color_gem: 'Dark Blue', metal: 'Iron',
  },
  {
    name: 'Rahu', planet: 'Rahu 🔵', number: 8,
    domain: 'Foreign Lands · Technology · Sudden Events · Unconventional',
    color: '#1A237E', bg: '#E8EAF6', border: '#9FA8DA',
    shloka_hi: 'अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्।\nसिंहिकागर्भसंभूतं तं राहुं प्रणमाम्यहम्॥',
    shloka_en: 'Ardhakayam Mahaveeryam Chandradityavimardanam\nSimhikagarbhasambhutam Tam Rahum Pranamaamyaham',
    beej: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
    meaning: 'Half-bodied, of great power, eclipser of the Sun and Moon, born of Simhika\'s womb — I bow to Rahu.',
    chant_day: 'Saturday · During Rahu Kalam',
    chant_count: '108 times',
    youtube_query: 'Rahu+mantra+Ardhakayam+Mahaveeryam+108+times',
    gemstone: 'Hessonite (Gomed)', color_gem: 'Honey/Brown', metal: 'Lead',
  },
  {
    name: 'Ketu', planet: 'Ketu ⚫', number: 9,
    domain: 'Spirituality · Liberation · Past Life Karma · Moksha',
    color: '#4E342E', bg: '#EFEBE9', border: '#BCAAA4',
    shloka_hi: 'पलाशपुष्पसंकाशं तारकाग्रहमस्तकम्।\nरौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्॥',
    shloka_en: 'Palashapushpa Sankasham Tarakagrahmasktakam\nRaudram Raudratmakam Ghoram Tam Ketum Pranamaamyaham',
    beej: 'ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः',
    meaning: 'Red like the palash flower, heading the stars and planets, fierce in form — I bow to Ketu. Chanting helps break karmic cycles and spiritual liberation.',
    chant_day: 'Tuesday · During Ketu periods',
    chant_count: '108 times',
    youtube_query: 'Ketu+mantra+Palashapushpa+Sankasham+108+times',
    gemstone: "Cat's Eye (Lehsunia)", color_gem: 'Grey/Smoky', metal: 'Lead',
  },
]

const NAVAGRAHA_COLLECTIVE = {
  shloka_hi: 'ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च।\nगुरुश्च शुक्रः शनिराहुकेतवः सर्वे ग्रहाः शान्तिकरा भवन्तु॥',
  shloka_en: 'Brahma Muraris Tripurantakari Bhanuh Shashi Bhumisuto Budhashcha\nGurushcha Shukrah Shani Rahuketavah Sarve Grahah Shantikarah Bhavantu',
  meaning: 'May Brahma, Vishnu, Shiva, Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu — all nine planets — bring peace and auspiciousness.',
  youtube_query: 'Navagraha+stotram+complete+all+9+planets+108+times',
}

function ShlokaCard({ item, type }: { item: any, type: 'deity' | 'graha' }) {
  const [expanded, setExpanded] = useState(false)
  const ytUrl = YT_BASE + item.youtube_query

  return (
    <div style={{ background: item.bg, border: '1.5px solid ' + item.border, borderRadius: 16, padding: 20, transition: 'all 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 32 }}>{item.emoji || item.planet?.split(' ')[1]}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: item.color, fontFamily: "'Playfair Display',serif" }}>{item.name}</div>
          <div style={{ fontSize: 11, color: '#6B5B4E', marginTop: 2 }}>{item.domain}</div>
        </div>
        <button onClick={() => setExpanded(!expanded)} style={{ background: item.color, color: 'white', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
          {expanded ? 'Close' : 'View Shloka'}
        </button>
      </div>

      {type === 'graha' && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 100, background: 'white', color: item.color, fontWeight: 600, border: '1px solid ' + item.border }}>💎 {item.gemstone}</span>
          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 100, background: 'white', color: item.color, fontWeight: 600, border: '1px solid ' + item.border }}>📅 {item.chant_day}</span>
          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 100, background: 'white', color: item.color, fontWeight: 600, border: '1px solid ' + item.border }}>🕉️ {item.chant_count}</span>
        </div>
      )}

      {type === 'deity' && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 100, background: 'white', color: item.color, fontWeight: 600, border: '1px solid ' + item.border }}>📅 {item.chant_day}</span>
          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 100, background: 'white', color: item.color, fontWeight: 600, border: '1px solid ' + item.border }}>🛕 {item.temple}</span>
        </div>
      )}

      {expanded && (
        <div style={{ marginTop: 14, borderTop: '1px solid ' + item.border, paddingTop: 14 }}>
          {type === 'graha' && (
            <div style={{ background: 'white', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 13, fontWeight: 600, color: item.color, letterSpacing: '0.03em' }}>
              Beej Mantra: {item.beej}
            </div>
          )}
          <div style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: item.color, marginBottom: 8 }}>Sanskrit</div>
            <div style={{ fontSize: 14, lineHeight: 1.9, color: '#1A0A00', fontFamily: 'serif', whiteSpace: 'pre-line' }}>{item.shloka_hi}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: item.color, marginBottom: 8 }}>Transliteration</div>
            <div style={{ fontSize: 13, lineHeight: 1.8, color: '#4A3728', fontStyle: 'italic', whiteSpace: 'pre-line' }}>{item.shloka_en}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: item.color, marginBottom: 6 }}>Meaning</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: '#4A3728' }}>{item.meaning}</div>
          </div>
          <a href={ytUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#FF0000', color: 'white', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13, width: 'fit-content' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Listen on YouTube — {item.name} Mantra
          </a>
          <p style={{ fontSize: 10, color: '#A89B8C', marginTop: 6 }}>Opens YouTube search · Choose the version you prefer · We recommend 108 repetitions</p>
        </div>
      )}
    </div>
  )
}

export default function ManifestLanding() {
  const [tab, setTab] = useState<'intro' | 'deities' | 'navagraha' | 'disclaimer'>('intro')

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px', fontFamily: "'Inter',sans-serif" }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', color: '#C0570A', marginBottom: 10 }}>Ancient Wisdom · Digital Sankalp</div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, color: '#8B1A1A', margin: '0 0 16px', lineHeight: 1.2 }}>Manifest</h1>
        <p style={{ fontSize: 18, color: '#6B5B4E', maxWidth: 560, margin: '0 auto 8px', lineHeight: 1.7 }}>
          Sankalp — The Ancient Indian Art of Sacred Intention
        </p>
        <p style={{ fontSize: 14, color: '#A89B8C', fontStyle: 'italic' }}>
          "Aham sankalpam karomi" — I make this intention 🙏
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F8F4EE', borderRadius: 14, padding: 4, marginBottom: 32, gap: 2 }}>
        {[
          { id: 'intro', label: '📖 What is Sankalp' },
          { id: 'deities', label: '🛕 Deity Guidance' },
          { id: 'navagraha', label: '🪐 Navagraha Shanti' },
          { id: 'disclaimer', label: '⚠️ Important Notice' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)} style={{
            flex: 1, padding: '10px 8px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: tab === t.id ? 'white' : 'transparent',
            color: tab === t.id ? '#8B1A1A' : '#A89B8C',
            fontWeight: tab === t.id ? 700 : 500, fontSize: 13, fontFamily: 'inherit',
            boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Intro Tab */}
      {tab === 'intro' && (
        <div>
          <div style={{ background: 'white', border: '1.5px solid #E8E0D4', borderRadius: 16, padding: 32, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: '#8B1A1A', marginBottom: 20 }}>Sankalp — The Ancient Art of Sacred Intention</h2>
            <p style={{ fontSize: 15, color: '#4A3728', lineHeight: 1.9, marginBottom: 16 }}>
              Long before the word "manifestation" entered modern vocabulary, India had <strong>Sankalp</strong> — a sacred vow of intention made before a deity, in a temple, at the start of every prayer.
            </p>
            <div style={{ background: '#FFF8F0', border: '1px solid #FFD4B0', borderRadius: 12, padding: 20, marginBottom: 20, textAlign: 'center' }}>
              <p style={{ fontSize: 16, color: '#8B1A1A', fontStyle: 'italic', fontFamily: 'serif', margin: 0 }}>
                "अहं संकल्पं करोमि" — I make this sacred intention
              </p>
            </div>
            <p style={{ fontSize: 15, color: '#4A3728', lineHeight: 1.9, marginBottom: 16 }}>
              A Sankalp is not a wish thrown into the universe. It is a <strong>conscious, deliberate declaration</strong> — made with full awareness, offered with devotion, and backed by sincere effort. Every puja in every Hindu temple begins with a Sankalp. The priest helps you declare: who you are, where you are, what you seek, and why.
            </p>

            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#8B1A1A', margin: '28px 0 16px' }}>The Three Pillars of Sankalp</h3>

            {[
              { num: '1', title: 'Clarity of Intention (Sankalp)', desc: 'Write your wish with precision. Not "I want success" but "I want my business to cross Rs.1 crore by Diwali 2026." The universe responds to specificity. Your deity responds to honesty.' },
              { num: '2', title: 'Dedication to a Deity (Arpan)', desc: 'Every wish has a corresponding divine energy. Ganesha removes obstacles for new beginnings. Lakshmi governs abundance. Durga gives strength in adversity. Dedicating your sankalp to the right deity aligns your energy with the right cosmic force.' },
              { num: '3', title: 'Gratitude Yatra (Pratigya)', desc: 'Make a commitment — "When this manifests, I will visit your temple and offer thanks in person." This is not superstition. It is accountability. It transforms a wish into a vow. And a vow into a plan.' },
            ].map(p => (
              <div key={p.num} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8B1A1A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{p.num}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#1A0A00', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: '#6B5B4E', lineHeight: 1.7 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/manifest/write" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(135deg,#8B1A1A,#C0570A)', color: 'white', borderRadius: 14, padding: '16px 36px', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
              🙏 Write Your Sankalp
            </Link>
            <p style={{ fontSize: 12, color: '#A89B8C', marginTop: 10 }}>Private by default · Your intentions are sacred</p>
          </div>
        </div>
      )}

      {/* Deities Tab */}
      {tab === 'deities' && (
        <div>
          <div style={{ background: '#FFF8F0', border: '1px solid #FFD4B0', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 14, color: '#C0570A' }}>
            <strong>How to use this guide:</strong> Identify what you seek, find the corresponding deity, click "View Shloka" to see the mantra with transliteration and meaning, then click "Listen on YouTube" to hear the correct pronunciation before chanting.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {DEITIES.map(d => <ShlokaCard key={d.name} item={d} type="deity" />)}
          </div>
        </div>
      )}

      {/* Navagraha Tab */}
      {tab === 'navagraha' && (
        <div>
          <div style={{ background: 'white', border: '1.5px solid #E8E0D4', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#8B1A1A', marginBottom: 12 }}>Navagraha Shanti</h2>
            <p style={{ fontSize: 14, color: '#6B5B4E', lineHeight: 1.7, marginBottom: 16 }}>
              The nine planets (Navagraha) govern every aspect of human life — from career to relationships, from health to wealth. When a planet is afflicted or in a challenging position in your birth chart, specific mantras can pacify and strengthen its influence.
            </p>
            <p style={{ fontSize: 14, color: '#6B5B4E', lineHeight: 1.7, marginBottom: 16 }}>
              Each graha has a Beej (seed) mantra and a longer stotra. The Beej mantra is shorter and more potent for daily chanting. The stotra is recited for formal worship. <strong>Always start with the collective Navagraha shloka if you are unsure which planet is affecting you.</strong>
            </p>

            {/* Collective shloka */}
            <div style={{ background: '#1A0A00', borderRadius: 14, padding: 24, marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: '#D4A017', marginBottom: 12, textTransform: 'uppercase' }}>Master Shloka — All 9 Planets Together</div>
              <div style={{ fontSize: 15, color: '#FDF8F2', lineHeight: 2, fontFamily: 'serif', marginBottom: 12, whiteSpace: 'pre-line' }}>{NAVAGRAHA_COLLECTIVE.shloka_hi}</div>
              <div style={{ fontSize: 13, color: '#D4C5B0', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 12, whiteSpace: 'pre-line' }}>{NAVAGRAHA_COLLECTIVE.shloka_en}</div>
              <div style={{ fontSize: 13, color: '#A89B8C', lineHeight: 1.7, marginBottom: 16 }}>{NAVAGRAHA_COLLECTIVE.meaning}</div>
              <a href={YT_BASE + NAVAGRAHA_COLLECTIVE.youtube_query} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: '#FF0000', color: 'white', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Listen — Complete Navagraha Stotram
              </a>
            </div>
            <p style={{ fontSize: 11, color: '#A89B8C', marginBottom: 0 }}>Opens YouTube search · Choose your preferred version · 108 repetitions recommended</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
            {NAVAGRAHA.map(g => <ShlokaCard key={g.name} item={{ ...g, emoji: g.planet.split(' ')[1] }} type="graha" />)}
          </div>
        </div>
      )}

      {/* Disclaimer Tab */}
      {tab === 'disclaimer' && (
        <div>
          <div style={{ background: '#FFF8F0', border: '2px solid #C0570A', borderRadius: 16, padding: 32, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 32 }}>⚠️</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: '#8B1A1A', margin: 0 }}>Important Disclaimer</h2>
            </div>

            {[
              {
                title: 'This is a Reflective Tool, Not a Religious Service',
                text: 'DivyaDarshanam\'s Manifest feature is designed as a personal reflection and intention-setting tool, inspired by the ancient Indian practice of Sankalp. It is not a religious service, not a puja booking platform, and does not represent any temple authority, religious institution or spiritual organisation.',
              },
              {
                title: 'We Do Not Guarantee Any Outcomes',
                text: 'Writing a Sankalp on DivyaDarshanam does not guarantee any result — spiritual, material, financial, medical or otherwise. Manifestation depends entirely on your own actions, effort, circumstances and the grace of the universe. DivyaDarshanam makes no promises of divine intervention, miracles or outcomes of any kind.',
              },
              {
                title: 'Not a Substitute for Professional Advice',
                text: 'Nothing on this platform — including deity guidance, graha shanti mantras, gemstone suggestions or any other content — is a substitute for medical, psychiatric, legal, financial or any other professional advice. If you are facing a health, legal or financial emergency, please consult qualified professionals immediately.',
              },
              {
                title: 'Shloka Content is for Guidance Only',
                text: 'The shlokas, mantras and their meanings presented here are based on commonly available traditional sources and are intended for personal inspiration only. We strongly recommend learning mantras from a qualified pandit or guru before using them in formal worship. Pronunciation matters in Sanskrit — please use the YouTube links to hear correct pronunciation.',
              },
              {
                title: 'YouTube Links are User-Directed Searches',
                text: 'The "Listen on YouTube" buttons open YouTube search results — they do not link to any specific video. DivyaDarshanam does not own, endorse or take responsibility for any video that appears in these results. Please use your own judgement when choosing which video to follow.',
              },
              {
                title: 'We Respect All Faiths',
                text: 'This feature draws from Hindu philosophical traditions but is open and accessible to all faiths and belief systems. DivyaDarshanam does not promote any one religion over another and deeply respects the diversity of spiritual practices across India and the world.',
              },
              {
                title: 'Your Data is Private',
                text: 'Your Sankalpas are private by default. We do not share your intentions with anyone. If you choose to make a Sankalp public on a temple\'s Wall of Wishes, it will be shown anonymously unless you explicitly choose otherwise.',
              },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < 6 ? '1px solid #E8E0D4' : 'none' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#8B1A1A', marginBottom: 6 }}>{i + 1}. {item.title}</div>
                <div style={{ fontSize: 14, color: '#4A3728', lineHeight: 1.8 }}>{item.text}</div>
              </div>
            ))}

            <div style={{ background: '#8B1A1A', borderRadius: 12, padding: 20, marginTop: 8 }}>
              <p style={{ fontSize: 14, color: 'white', lineHeight: 1.8, margin: 0, fontStyle: 'italic', textAlign: 'center' }}>
                "Write with faith. Act with effort. Trust the journey.<br />
                DivyaDarshanam is simply a sacred digital space for your intentions — nothing more, nothing less. 🙏"
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: '#A89B8C', marginBottom: 16 }}>By writing a Sankalp you acknowledge that you have read and understood this disclaimer.</p>
            <Link href="/manifest/write" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#8B1A1A', color: 'white', borderRadius: 14, padding: '14px 32px', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              🙏 I Understand — Write My Sankalp
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
