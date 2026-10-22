'use client'
import { useState } from 'react'
import Link from 'next/link'

const YT_BASE = 'https://www.youtube.com/results?search_query='

// ─── Content ────────────────────────────────────────────────────────────────
// Deity guidance: who to turn to for what, with the shloka, its meaning and a
// temple to visit. The data is editorial and ships with the code.

const DEITIES = [
  {
    name: 'Ganesha', accent: '#C0570A',
    domain: 'New beginnings, removing obstacles, business',
    shloka_hi: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    shloka_en: 'Vakratunda Mahakaya Suryakoti Samaprabha\nNirvighnam Kuru Me Deva Sarvakaryeshu Sarvada',
    meaning: 'O Lord with the curved trunk and mighty form, radiant as a million suns — bless me so that all my endeavours are free of obstacles, always.',
    chant: 'Wednesdays, and before any new beginning',
    youtube_query: 'Vakratunda+Mahakaya+mantra+108+times',
    temple: 'Siddhivinayak, Mumbai', temple_slug: 'siddhivinayak-temple',
  },
  {
    name: 'Lakshmi', accent: '#6A1B9A',
    domain: 'Wealth, abundance, prosperity',
    shloka_hi: 'ॐ श्री महालक्ष्म्यै च विद्महे विष्णु पत्न्यै च धीमहि।\nतन्नो लक्ष्मी प्रचोदयात्॥',
    shloka_en: 'Om Shri Mahalakshmyai Cha Vidmahe Vishnu Patnyai Cha Dhimahi\nTanno Lakshmi Prachodayat',
    meaning: 'We meditate upon the great Lakshmi, consort of Vishnu. May the Goddess of abundance inspire and illuminate our minds.',
    chant: 'Fridays, Diwali and Purnima',
    youtube_query: 'Mahalakshmi+Gayatri+mantra+chanting+108+times',
    temple: 'Mahalaxmi, Kolhapur', temple_slug: 'mahalaxmi-temple-kolhapur',
  },
  {
    name: 'Durga', accent: '#B71C1C',
    domain: 'Strength, protection, courage in adversity',
    shloka_hi: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तु ते॥',
    shloka_en: 'Sarva Mangala Mangalye Shive Sarvartha Sadhike\nSharanye Tryambake Gauri Narayani Namostute',
    meaning: 'O auspicious one who brings auspiciousness to all, who fulfils every purpose — O three-eyed Gauri, refuge of all, I bow to you.',
    chant: 'Tuesdays, Navratri and Ashtami',
    youtube_query: 'Sarva+Mangala+Mangalye+Durga+mantra+chanting',
    temple: 'Vaishno Devi', temple_slug: 'vaishno-devi-shrine',
  },
  {
    name: 'Shiva', accent: '#1565C0',
    domain: 'Healing, peace, spiritual growth',
    shloka_hi: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥',
    shloka_en: 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam\nUrvarukamiva Bandhanat Mrityor Mukshiya Mamritat',
    meaning: 'We worship the three-eyed Shiva, nourisher of all. May he liberate us from death as a ripe cucumber is freed from the vine, and grant us immortality.',
    chant: 'Mondays, Mahashivratri and Pradosh — the Mahamrityunjaya mantra',
    youtube_query: 'Mahamrityunjaya+mantra+108+times+Shankar+Mahadevan',
    temple: 'Kashi Vishwanath, Varanasi', temple_slug: 'kashi-vishwanath-temple',
  },
  {
    name: 'Krishna', accent: '#0277BD',
    domain: 'Love, relationships, joy, devotion',
    shloka_hi: 'ॐ श्री कृष्णाय गोविन्दाय गोपीजन वल्लभाय।\nपराय परम पुरुषाय परमात्मने नमः॥',
    shloka_en: 'Om Shri Krishnaya Govindaya Gopijana Vallabhaya\nParaya Parama Purushaya Paramatmane Namah',
    meaning: 'I bow to Shri Krishna — the cowherd, beloved of the gopis, the supreme soul, the highest of all beings. May love and joy flow into my life.',
    chant: 'Wednesdays, Janmashtami and Ekadashi',
    youtube_query: 'Om+Shri+Krishnaya+Govindaya+mantra+108+times',
    temple: 'Banke Bihari, Vrindavan', temple_slug: 'banke-bihari-temple',
  },
  {
    name: 'Saraswati', accent: '#00695C',
    domain: 'Knowledge, exams, wisdom, speech and the arts',
    shloka_hi: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥',
    shloka_en: 'Saraswati Namastubhyam Varade Kamarupini\nVidyarambham Karishyami Siddhirbhavatu Me Sada',
    meaning: 'O Saraswati, I bow to you, the wish-fulfilling goddess. As I begin my pursuit of knowledge, may success always be mine.',
    chant: 'Wednesdays, Vasant Panchami and before exams',
    youtube_query: 'Saraswati+Namastubhyam+mantra+chanting+108+times',
    temple: 'Gnana Saraswati, Basar', temple_slug: 'gnana-saraswati-temple-basar',
  },
  {
    name: 'Hanuman', accent: '#E65100',
    domain: 'Courage, health, protection, success',
    shloka_hi: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
    shloka_en: 'Manojavam Marutatulyavegam Jitendriyam Buddhimatam Varishtham\nVatatmajam Vanarayuthamukhyam Shriramadutam Sharanam Prapadye',
    meaning: 'I take refuge in Hanuman — swift as the mind, fast as the wind, master of the senses, foremost among the wise, the divine messenger of Shri Ram.',
    chant: 'Tuesdays, Saturdays and Hanuman Jayanti',
    youtube_query: 'Manojavam+Marutatulyavegam+Hanuman+mantra',
    temple: 'Hanuman Garhi, Ayodhya', temple_slug: 'hanuman-garhi-temple',
  },
  {
    name: 'Parvati', accent: '#AD1457',
    domain: 'Marriage, family, children, relationships',
    shloka_hi: 'हे गौरि शङ्करार्धाङ्गि यथा त्वं शङ्करप्रिया।\nतथा मां कुरु कल्याणि कान्तकान्तां सुदुर्लभाम्॥',
    shloka_en: 'He Gauri Shankarardhangi Yatha Tvam Shankarapriya\nTatha Mam Kuru Kalyani Kantakantam Sudurllabham',
    meaning: 'O Gauri, beloved half of Shankara — just as you are the dearest to Shiva, bless me with a loving, devoted companion who is rare to find.',
    chant: 'Mondays, Teej and Navratri',
    youtube_query: 'Parvati+Gayatri+mantra+chanting+108+times',
    temple: 'Meenakshi Amman, Madurai', temple_slug: 'meenakshi-amman-temple',
  },
  {
    name: 'Kali', accent: '#4A148C',
    domain: 'Transformation, breaking negative cycles, removing fear',
    shloka_hi: 'सर्वस्वरूपे सर्वेशे सर्वशक्तिसमन्विते।\nभयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते॥',
    shloka_en: 'Sarvasvarupe Sarveshe Sarvasaktisamanvite\nBhayebhyastrahi No Devi Durge Devi Namostute',
    meaning: 'O Goddess who is the form of all, ruler of all, embodiment of all powers — protect us from all fears, O Durga. We bow to you.',
    chant: 'Tuesdays, Kali Puja and Amavasya',
    youtube_query: 'Kali+mantra+Sarvasvarupe+chanting+108+times',
    temple: 'Kalighat, Kolkata', temple_slug: 'kalighat-kali-temple',
  },
]

const NAVAGRAHA = [
  { name: 'Surya', planet: 'Sun', accent: '#E65100', domain: 'Career, authority, father, eyesight', chant: 'Sundays at sunrise', gemstone: 'Ruby',
    shloka_hi: 'जपाकुसुम संकाशं काश्यपेयं महाद्युतिम्।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम्॥', shloka_en: 'Japakusuma Sankasham Kashyapeyam Mahadyutim\nTamorim Sarvapapaghanam Pranato Asmi Divakarum',
    beej: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः', meaning: 'Radiant like the hibiscus, son of Kashyapa, destroyer of darkness and all sins — I bow to the Sun God.', youtube_query: 'Surya+mantra+Japakusuma+Sankasham+108+times' },
  { name: 'Chandra', planet: 'Moon', accent: '#0277BD', domain: 'Mind, mother, emotions, peace', chant: 'Monday evenings and Purnima', gemstone: 'Pearl',
    shloka_hi: 'दधिशंखतुषाराभं क्षीरोदार्णव संभवम्।\nनमामि शशिनं सोमं शम्भोर्मुकुट भूषणम्॥', shloka_en: 'Dadhishankhatusharabhm Kshirodarnavasambhavam\nNamami Sashinam Somam Shambhormukuta Bhushanam',
    beej: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः', meaning: "White as curd, conch and snow, born of the ocean of milk, adorning Shiva's crown — I bow to the Moon God.", youtube_query: 'Chandra+mantra+Dadhishankhatusharabhm+108+times' },
  { name: 'Mangal', planet: 'Mars', accent: '#B71C1C', domain: 'Energy, property, siblings, courage', chant: 'Tuesdays', gemstone: 'Red coral',
    shloka_hi: 'धरणीगर्भसंभूतं विद्युत्कान्तिसमप्रभम्।\nकुमारं शक्तिहस्तं च मंगलं प्रणमाम्यहम्॥', shloka_en: 'Dharanigarbhasambhutam Vidyutkanttisamaprabham\nKumaram Shaktihastam Cha Mangalam Pranamaamyaham',
    beej: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः', meaning: 'Born from the womb of the earth, radiant like lightning, youthful and holding the spear — I bow to Mangal.', youtube_query: 'Mangal+mantra+Dharanigarbhasambhutam+108+times' },
  { name: 'Budha', planet: 'Mercury', accent: '#2E7D32', domain: 'Intelligence, business, speech, education', chant: 'Wednesdays', gemstone: 'Emerald',
    shloka_hi: 'प्रियंगुकलिकाश्यामं रूपेणाप्रतिमं बुधम्।\nसौम्यं सौम्यगुणोपेतं तं बुधं प्रणमाम्यहम्॥', shloka_en: 'Priyangukalikaashyamam Rupenaapratimaum Budham\nSaumyam Saumyagunopetam Tam Budham Pranamaamyaham',
    beej: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः', meaning: 'Dark as the priyangu blossom, of incomparable beauty, gentle and full of good qualities — I bow to Budha, the wise one.', youtube_query: 'Budha+mantra+Priyangukalikaashyamam+108+times' },
  { name: 'Brihaspati', planet: 'Jupiter', accent: '#B8860B', domain: 'Wisdom, wealth, marriage, children, the guru', chant: 'Thursdays', gemstone: 'Yellow sapphire',
    shloka_hi: 'देवानां च ऋषीणां च गुरुं काञ्चनसन्निभम्।\nबुद्धिभूतं त्रिलोकेशं तं नमामि बृहस्पतिम्॥', shloka_en: 'Devanam Cha Rishinam Cha Gurum Kanchanasannibham\nBuddhibhutam Trilokesham Tam Namami Brihaspatim',
    beej: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः', meaning: 'Guru of the gods and sages, golden in form, the embodiment of wisdom, lord of the three worlds — I bow to Brihaspati.', youtube_query: 'Brihaspati+Guru+mantra+Devanam+Cha+Rishinam+108+times' },
  { name: 'Shukra', planet: 'Venus', accent: '#880E4F', domain: 'Love, marriage, beauty, creativity', chant: 'Fridays', gemstone: 'Diamond',
    shloka_hi: 'हिमकुन्दमृणालाभं दैत्यानां परमं गुरुम्।\nसर्वशास्त्रप्रवक्तारं भार्गवं प्रणमाम्यहम्॥', shloka_en: 'Himakunda Mrinalaabham Daityaanam Paramam Gurum\nSarvashastra Pravaktaaram Bhargavam Pranamamyaham',
    beej: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः', meaning: 'White as snow, lotus stem and jasmine, supreme guru of the demons, master of all scriptures — I bow to Shukra, son of Bhrigu.', youtube_query: 'Shukra+Venus+mantra+Himakunda+Mrinalaabham+108+times' },
  { name: 'Shani', planet: 'Saturn', accent: '#37474F', domain: 'Karma, discipline, delays, longevity, Sade Sati', chant: 'Saturdays and Amavasya', gemstone: 'Blue sapphire',
    shloka_hi: 'नीलांजनसमाभासं रविपुत्रं यमाग्रजम्।\nछायामार्तण्डसंभूतं तं नमामि शनैश्चरम्॥', shloka_en: 'Nilaanjana Samaabhasam Raviputram Yamaagrajam\nChhaayaa Maartanda Sambhutam Tam Namami Shanaishcharam',
    beej: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः', meaning: 'Dark as blue collyrium, son of the Sun, elder brother of Yama — I bow to the slow-moving Saturn. Chanted with devotion, Saturn becomes a great benefactor.', youtube_query: 'Shani+mantra+Nilaanjana+Samaabhasam+108+times' },
  { name: 'Rahu', planet: 'Rahu', accent: '#1A237E', domain: 'Foreign lands, technology, sudden events', chant: 'Saturdays, during Rahu Kalam', gemstone: 'Hessonite (gomed)',
    shloka_hi: 'अर्धकायं महावीर्यं चन्द्रादित्यविमर्दनम्।\nसिंहिकागर्भसंभूतं तं राहुं प्रणमाम्यहम्॥', shloka_en: 'Ardhakayam Mahaveeryam Chandradityavimardanam\nSimhikagarbhasambhutam Tam Rahum Pranamaamyaham',
    beej: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः', meaning: "Half-bodied, of great power, eclipser of the Sun and Moon, born of Simhika's womb — I bow to Rahu.", youtube_query: 'Rahu+mantra+Ardhakayam+Mahaveeryam+108+times' },
  { name: 'Ketu', planet: 'Ketu', accent: '#4E342E', domain: 'Spirituality, liberation, past-life karma', chant: 'Tuesdays, during Ketu periods', gemstone: "Cat's eye (lehsunia)",
    shloka_hi: 'पलाशपुष्पसंकाशं तारकाग्रहमस्तकम्।\nरौद्रं रौद्रात्मकं घोरं तं केतुं प्रणमाम्यहम्॥', shloka_en: 'Palashapushpa Sankasham Tarakagrahmasktakam\nRaudram Raudratmakam Ghoram Tam Ketum Pranamaamyaham',
    beej: 'ॐ स्त्रां स्त्रीं स्त्रौं सः केतवे नमः', meaning: 'Red like the palash flower, heading the stars and planets, fierce in form — I bow to Ketu. Chanting helps break karmic cycles.', youtube_query: 'Ketu+mantra+Palashapushpa+Sankasham+108+times' },
]

const NAVAGRAHA_COLLECTIVE = {
  shloka_hi: 'ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च।\nगुरुश्च शुक्रः शनिराहुकेतवः सर्वे ग्रहाः शान्तिकरा भवन्तु॥',
  shloka_en: 'Brahma Muraris Tripurantakari Bhanuh Shashi Bhumisuto Budhashcha\nGurushcha Shukrah Shani Rahuketavah Sarve Grahah Shantikarah Bhavantu',
  meaning: 'May Brahma, Vishnu, Shiva, Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu — all nine planets — bring peace and auspiciousness.',
  youtube_query: 'Navagraha+stotram+complete+all+9+planets+108+times',
}

const DISCLAIMER = [
  { title: 'A reflective tool, not a religious service', text: 'Manifest is a personal intention-setting space inspired by the practice of Sankalp. It is not a puja booking platform and does not represent any temple or religious institution.' },
  { title: 'No outcome is guaranteed', text: 'Writing a Sankalp does not guarantee any result — spiritual, material, financial, medical or otherwise. Outcomes depend on your own effort, circumstances and grace.' },
  { title: 'Not a substitute for professional advice', text: 'Nothing here — deity guidance, mantras, gemstone notes — replaces medical, legal, financial or psychiatric advice. In an emergency, consult a qualified professional.' },
  { title: 'Shlokas are for guidance only', text: 'The mantras and meanings follow commonly available traditional sources. Pronunciation matters in Sanskrit; learn from a qualified pandit or guru before formal worship, and use the listening links to hear it said correctly.' },
  { title: 'Listening links are searches', text: 'The "Listen" buttons open a YouTube search, not a specific video. Choose a version you trust.' },
  { title: 'Open to every faith', text: 'This draws on Hindu tradition and is open to anyone. DivyaDarshanam respects the diversity of belief across India and the world.' },
  { title: 'Your Sankalp is private', text: 'Sankalpas are private by default and never shared. If you choose to share one on a temple\'s Wall of Wishes it appears anonymously unless you decide otherwise.' },
]

// ─── Pieces ─────────────────────────────────────────────────────────────────

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function Shloka({ hi, en, meaning, beej, youtube_query, name }: { hi: string; en: string; meaning: string; beej?: string; youtube_query: string; name: string }) {
  return (
    <div className="sk-shloka">
      {beej && <p className="sk-beej">{beej}</p>}
      <p className="sk-sanskrit">{hi}</p>
      <p className="sk-translit">{en}</p>
      <p className="sk-meaning">{meaning}</p>
      <a className="sk-listen" href={YT_BASE + youtube_query} target="_blank" rel="noopener noreferrer">
        <YouTubeIcon /> Listen to the {name} mantra
      </a>
      <p className="sk-fine">Opens a YouTube search so you can choose the version you prefer. 108 repetitions is traditional.</p>
    </div>
  )
}

function DeityCard({ d }: { d: typeof DEITIES[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="sk-card" style={{ borderLeftColor: d.accent }}>
      <h3 className="sk-card-name">{d.name}</h3>
      <p className="sk-card-domain">{d.domain}</p>
      <dl className="sk-meta">
        <div><dt>Chant on</dt><dd>{d.chant}</dd></div>
        <div><dt>Visit</dt><dd><Link href={`/temple/${d.temple_slug}`}>{d.temple}</Link></dd></div>
      </dl>
      <button type="button" className="sk-toggle" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        {open ? 'Hide the shloka' : 'Read the shloka'}
      </button>
      {open && <Shloka hi={d.shloka_hi} en={d.shloka_en} meaning={d.meaning} youtube_query={d.youtube_query} name={d.name} />}
    </article>
  )
}

function GrahaCard({ g }: { g: typeof NAVAGRAHA[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="sk-card sk-card--graha" style={{ borderLeftColor: g.accent }}>
      <h3 className="sk-card-name">{g.name} <span className="sk-planet">{g.planet}</span></h3>
      <p className="sk-card-domain">{g.domain}</p>
      <dl className="sk-meta">
        <div><dt>Chant on</dt><dd>{g.chant}</dd></div>
        <div><dt>Gemstone</dt><dd>{g.gemstone}</dd></div>
      </dl>
      <button type="button" className="sk-toggle" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        {open ? 'Hide the shloka' : 'Read the shloka'}
      </button>
      {open && <Shloka hi={g.shloka_hi} en={g.shloka_en} meaning={g.meaning} beej={g.beej} youtube_query={g.youtube_query} name={g.name} />}
    </article>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ManifestLanding() {
  return (
    <div className="sk">
      <style>{`
        .sk { --sk-maroon: #2A0A0A; --sk-maroon2: #3D0808; --sk-gold: #9A7535; --sk-gold-lt: #F5E6C8; --sk-line: #E6DCCB;
              max-width: 1040px; margin: 0 auto; padding: 28px 20px 72px; font-family: var(--font-sans), 'Outfit', system-ui, sans-serif; color: var(--ink, #111); }
        .sk a { color: inherit; }

        /* The vow */
        .sk-vow { position: relative; overflow: hidden; text-align: center; padding: 64px 28px 56px; border-radius: 18px;
                  background: radial-gradient(120% 90% at 50% 0%, var(--sk-maroon2) 0%, var(--sk-maroon) 60%, #1C0606 100%);
                  color: var(--sk-gold-lt); box-shadow: 0 24px 60px rgba(42,10,10,.28); }
        .sk-vow::before { content: ''; position: absolute; inset: 14px; border: 1px solid rgba(245,230,200,.28); border-radius: 12px; pointer-events: none; }
        .sk-flame { width: 10px; height: 14px; margin: 0 auto 26px; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                    background: linear-gradient(180deg, #FFF3C4 0%, #F5C04A 55%, #C0570A 100%);
                    box-shadow: 0 0 10px 3px rgba(245,192,74,.55), 0 0 36px 12px rgba(192,87,10,.35); }
        .sk-vow-hi { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(34px, 5.6vw, 58px); line-height: 1.15; margin: 0 0 10px; letter-spacing: .01em; }
        .sk-vow-en { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: clamp(20px, 2.6vw, 26px); margin: 0 0 22px; color: rgba(245,230,200,.88); }
        .sk-vow-p { max-width: 560px; margin: 0 auto 30px; font-size: 16.5px; line-height: 1.65; color: rgba(255,255,255,.78); }
        .sk-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .sk-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 26px; border-radius: 999px; font-weight: 600; font-size: 15px; text-decoration: none; border: 1.5px solid transparent; cursor: pointer; font-family: inherit; }
        .sk-btn--primary { background: var(--saffron, #C0570A); color: #fff; }
        .sk-btn--primary:hover { background: #A84A08; }
        .sk-btn--ghost { background: transparent; color: var(--sk-gold-lt); border-color: rgba(245,230,200,.45); }
        .sk-btn--ghost:hover { border-color: rgba(245,230,200,.85); }
        .sk-btn:focus-visible { outline: 3px solid #F5C04A; outline-offset: 3px; }
        .sk-trust { margin: 18px 0 0; font-size: 13px; color: rgba(255,255,255,.55); }

        /* Sections */
        .sk-section { padding-top: 64px; }
        .sk-h2 { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: clamp(30px, 3.6vw, 40px); line-height: 1.1; margin: 0 0 10px; color: var(--crimson, #8B1A1A); }
        .sk-lede { max-width: 640px; font-size: 16.5px; line-height: 1.65; color: var(--muted, #555); margin: 0 0 32px; }

        /* How it works — a real sequence */
        .sk-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .sk-step { padding: 26px 22px 24px; border: 1px solid var(--sk-line); border-radius: 14px; background: #fff; }
        .sk-step-n { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-size: 44px; line-height: 1; color: var(--sk-gold); margin: 0 0 12px; }
        .sk-step h3 { font-size: 17.5px; font-weight: 600; margin: 0 0 8px; }
        .sk-step p { font-size: 15px; line-height: 1.6; color: var(--muted, #555); margin: 0; }
        .sk-step em { font-style: normal; color: var(--crimson, #8B1A1A); font-weight: 600; }

        /* Cards */
        .sk-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .sk-card { background: #fff; border: 1px solid var(--sk-line); border-left: 4px solid var(--sk-gold); border-radius: 12px; padding: 20px 20px 18px; }
        .sk-card-name { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 25px; line-height: 1.1; margin: 0 0 4px; color: var(--ink, #111); }
        .sk-planet { font-family: var(--font-sans), 'Outfit', sans-serif; font-weight: 400; font-size: 13px; color: var(--muted2, #888); margin-left: 6px; }
        .sk-card-domain { font-size: 14.5px; line-height: 1.5; color: var(--muted, #555); margin: 0 0 14px; }
        .sk-meta { margin: 0 0 14px; display: grid; gap: 6px; font-size: 13.5px; }
        .sk-meta div { display: flex; gap: 8px; align-items: baseline; }
        .sk-meta dt { flex: 0 0 68px; color: var(--muted2, #888); }
        .sk-meta dd { margin: 0; color: var(--ink2, #333); }
        .sk-meta dd a { color: var(--crimson, #8B1A1A); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(139,26,26,.35); }
        .sk-toggle { background: none; border: 0; padding: 0; font: inherit; font-size: 14px; font-weight: 600; color: var(--crimson, #8B1A1A); cursor: pointer; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: rgba(139,26,26,.35); }
        .sk-toggle:hover { text-decoration-color: currentColor; }
        .sk-toggle:focus-visible { outline: 3px solid var(--saffron, #C0570A); outline-offset: 3px; border-radius: 4px; }

        .sk-shloka { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--sk-line); }
        .sk-beej { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-size: 18px; margin: 0 0 12px; color: var(--sk-gold); }
        .sk-sanskrit { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-size: 19px; line-height: 1.75; white-space: pre-line; margin: 0 0 10px; color: var(--ink, #111); }
        .sk-translit { font-size: 13.5px; line-height: 1.65; font-style: italic; white-space: pre-line; color: var(--muted, #555); margin: 0 0 10px; }
        .sk-meaning { font-size: 14.5px; line-height: 1.65; color: var(--ink2, #333); margin: 0 0 14px; }
        .sk-listen { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 999px; font-size: 13.5px; font-weight: 600; text-decoration: none; color: var(--crimson, #8B1A1A); border: 1.5px solid rgba(139,26,26,.3); }
        .sk-listen:hover { background: var(--pastel-red, #FFF5F5); }
        .sk-fine { margin: 8px 0 0; font-size: 12px; color: var(--muted2, #888); }

        /* Master shloka block */
        .sk-master { margin: 0 0 22px; padding: 28px 26px; border-radius: 14px; background: var(--sk-maroon); color: var(--sk-gold-lt); }
        .sk-master h3 { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 22px; margin: 0 0 12px; }
        .sk-master .sk-sanskrit { color: #FDF8F2; }
        .sk-master .sk-translit { color: rgba(245,230,200,.8); }
        .sk-master .sk-meaning { color: rgba(255,255,255,.78); }
        .sk-master .sk-listen { color: var(--sk-gold-lt); border-color: rgba(245,230,200,.4); }
        .sk-master .sk-listen:hover { background: rgba(255,255,255,.06); }
        .sk-master .sk-fine { color: rgba(255,255,255,.5); }

        /* Closing */
        .sk-close { margin-top: 72px; text-align: center; padding: 48px 24px; border-top: 1px solid var(--sk-line); }
        .sk-close .sk-h2 { margin-bottom: 8px; }
        .sk-close p { color: var(--muted, #555); font-size: 16px; margin: 0 0 24px; }
        .sk-close .sk-btn--primary { background: var(--crimson, #8B1A1A); }
        .sk-close .sk-btn--primary:hover { background: var(--crim-dk, #5C0F0F); }
        .sk-link { font-size: 14px; color: var(--crimson, #8B1A1A); text-decoration: underline; text-underline-offset: 4px; }

        details.sk-disc { margin: 40px auto 0; max-width: 720px; border: 1px solid var(--sk-line); border-radius: 12px; padding: 0 20px; background: #fff; text-align: left; }
        details.sk-disc summary { cursor: pointer; padding: 16px 0; font-weight: 600; font-size: 14.5px; color: var(--ink2, #333); list-style: none; display: flex; justify-content: space-between; align-items: center; }
        details.sk-disc summary::-webkit-details-marker { display: none; }
        details.sk-disc summary::after { content: '+'; font-size: 20px; color: var(--muted2, #888); }
        details.sk-disc[open] summary::after { content: '−'; }
        details.sk-disc summary:focus-visible { outline: 3px solid var(--saffron, #C0570A); outline-offset: 2px; border-radius: 6px; }
        .sk-disc-item { padding: 12px 0 14px; border-top: 1px solid var(--sk-line); }
        .sk-disc-item h4 { margin: 0 0 4px; font-size: 14.5px; font-weight: 600; }
        .sk-disc-item p { margin: 0; font-size: 14px; line-height: 1.6; color: var(--muted, #555); }

        @media (max-width: 860px) { .sk-grid { grid-template-columns: repeat(2, 1fr); } .sk-steps { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .sk-grid { grid-template-columns: 1fr; } .sk-vow { padding: 52px 20px 44px; } .sk { padding-top: 16px; } }

        @media (prefers-reduced-motion: no-preference) {
          .sk-vow { animation: sk-rise .7s ease-out both; }
          @keyframes sk-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        }
      `}</style>

      {/* The vow — the hero */}
      <section className="sk-vow" aria-labelledby="sk-vow-title">
        <div className="sk-flame" aria-hidden="true" />
        <h1 id="sk-vow-title" className="sk-vow-hi" lang="sa">अहं संकल्पं करोमि</h1>
        <p className="sk-vow-en">I make this sacred intention.</p>
        <p className="sk-vow-p">
          A Sankalp is a vow of intention made before a deity — spoken with clarity, offered with devotion, and kept with effort.
          Every puja in every temple begins with one. Write yours here.
        </p>
        <div className="sk-actions">
          <Link href="/manifest/write" className="sk-btn sk-btn--primary">Write my Sankalp</Link>
          <a href="#how" className="sk-btn sk-btn--ghost">See how it works</a>
        </div>
        <p className="sk-trust">Private by default. Yours alone until you choose to share.</p>
      </section>

      {/* How it works */}
      <section className="sk-section" id="how" aria-labelledby="sk-how">
        <h2 id="sk-how" className="sk-h2">How a Sankalp works</h2>
        <p className="sk-lede">A Sankalp is not a wish thrown at the universe. It is a deliberate declaration in three parts, the same way a priest helps you make it in a temple.</p>
        <ol className="sk-steps" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li className="sk-step">
            <p className="sk-step-n">1</p>
            <h3>Write it clearly</h3>
            <p>Not <em>“I want success”</em> but <em>“I want my business to cross ₹1 crore by Diwali 2026.”</em> Your deity responds to honesty; you respond to specificity.</p>
          </li>
          <li className="sk-step">
            <p className="sk-step-n">2</p>
            <h3>Dedicate it to a deity</h3>
            <p>Every intention has a divine energy that governs it — Ganesha for beginnings, Lakshmi for abundance, Durga for strength. Choose the one whose domain matches what you seek.</p>
          </li>
          <li className="sk-step">
            <p className="sk-step-n">3</p>
            <h3>Promise a gratitude yatra</h3>
            <p>Commit to visiting that temple in person when it comes true. That promise is accountability — it turns a wish into a vow, and a vow into a plan.</p>
          </li>
        </ol>
      </section>

      {/* Deity guidance */}
      <section className="sk-section" aria-labelledby="sk-deities">
        <h2 id="sk-deities" className="sk-h2">Who do you turn to?</h2>
        <p className="sk-lede">Find the deity whose domain matches your intention. Each card gives you the shloka to chant, what it means, and a temple to visit when you give thanks.</p>
        <div className="sk-grid">
          {DEITIES.map(d => <DeityCard key={d.name} d={d} />)}
        </div>
      </section>

      {/* Navagraha */}
      <section className="sk-section" aria-labelledby="sk-graha">
        <h2 id="sk-graha" className="sk-h2">Navagraha shanti</h2>
        <p className="sk-lede">The nine planets govern career, relationships, health and wealth. When one is afflicted in your chart, its mantra pacifies it. If you are unsure which planet is at work, begin with the shloka for all nine.</p>
        <div className="sk-master">
          <h3>For all nine planets together</h3>
          <Shloka hi={NAVAGRAHA_COLLECTIVE.shloka_hi} en={NAVAGRAHA_COLLECTIVE.shloka_en} meaning={NAVAGRAHA_COLLECTIVE.meaning} youtube_query={NAVAGRAHA_COLLECTIVE.youtube_query} name="Navagraha" />
        </div>
        <div className="sk-grid">
          {NAVAGRAHA.map(g => <GrahaCard key={g.name} g={g} />)}
        </div>
      </section>

      {/* Closing */}
      <section className="sk-close" aria-labelledby="sk-close">
        <h2 id="sk-close" className="sk-h2">Ready to make your vow?</h2>
        <p>Write with faith, act with effort, and let the journey unfold.</p>
        <div className="sk-actions">
          <Link href="/manifest/write" className="sk-btn sk-btn--primary">Write my Sankalp</Link>
        </div>
        <p style={{ marginTop: 16 }}><Link href="/manifest/my-sankalpas" className="sk-link">Already written one? See my Sankalpas</Link></p>

        <details className="sk-disc" id="disclaimer">
          <summary>Please read: what this is, and what it isn't</summary>
          {DISCLAIMER.map(item => (
            <div key={item.title} className="sk-disc-item">
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </details>
      </section>
    </div>
  )
}
