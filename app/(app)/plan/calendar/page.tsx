export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CloudRain, Flame, Flower2, Leaf, Lightbulb, Snowflake, Sparkles, Sun } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Festival Calendar — DivyaDarshanam',
  description: 'Month-wise guide to Hindu temple festivals and pilgrimage seasons across India.',
}

const MONTHS = [
  {
    month: 'January', season: 'Winter', icon: <CloudRain size={26} />,
    best_for: ['Tamil Nadu', 'Andhra Pradesh', 'Rajasthan'],
    tip: "Peak pilgrim season. Book trains and accommodation 3 months ahead.",
    festivals: [
      { name: 'Makar Sankranti', temples: 'Konark Sun Temple, Prayagraj Sangam', desc: "Kite festivals, holy dips, sesame sweets." },
      { name: 'Vaikunta Ekadashi', temples: 'Tirumala, Srirangam, all Vishnu temples', desc: "Most auspicious Ekadashi — gates of Vaikuntha open." },
      { name: 'Pongal', temples: 'All Tamil Nadu temples', desc: "4-day harvest festival. Grand temple chariot processions." },
      { name: 'Kumbh Mela', temples: 'Prayagraj, Haridwar, Ujjain, Nashik', desc: "World's largest gathering — holy dip at the river confluence. Dates are astrological; check the host city & year." },
      { name: 'Lohri', temples: 'Gurdwaras; Punjab', desc: "Punjabi bonfire harvest festival (eve of Sankranti). Til-gur, Bhangra and Gidda." },
    ],
  },
  {
    month: 'February', season: 'Late Winter', icon: <Snowflake size={26} />,
    best_for: ['Ujjain', 'Varanasi', 'All Jyotirlinga'],
    tip: "Mahashivratri is among the biggest pilgrimages in India. Ujjain gets 1 crore+ pilgrims.",
    festivals: [
      { name: 'Mahashivratri', temples: 'All 12 Jyotirlingas, Kedarnath (winter darshan)', desc: "The great night of Shiva. Temples stay open all night. Millions fast." },
      { name: 'Vasant Panchami', temples: 'Saraswati temples across India', desc: "Goddess Saraswati birthday. Students seek blessings." },
      { name: 'Ratha Saptami', temples: 'Tirumala, Konark, Arasavalli', desc: "Surya's chariot turns north. Tirumala parades the Lord on seven vahanas in one day." },
    ],
  },
  {
    month: 'March', season: 'Spring', icon: <Flower2 size={26} />,
    best_for: ['Vrindavan', 'Mathura', 'Ayodhya'],
    tip: "Vrindavan Holi (Phulera Dooj through Rang Panchami) is bucket-list material.",
    festivals: [
      { name: 'Holi', temples: 'Vrindavan, Mathura, Barsana', desc: "World-famous colour festival in Braj region. Laddu Holi, Lathmar Holi." },
      { name: 'Gangaur', temples: 'Rajasthan temples (Udaipur, Jaipur)', desc: "Goddess Parvati festival. Beautiful processions." },
      { name: 'Ram Navami', temples: 'Ram Lalla Ayodhya, Chitrakoot', desc: "Lord Rama birthday. Ayodhya transforms with celebrations." },
      { name: 'Cheti Chand', temples: 'Jhulelal / Sindhi temples', desc: "Sindhi New Year & Jhulelal Jayanti. Bahrana Sahib procession to the water." },
      { name: 'Hola Mohalla', temples: 'Anandpur Sahib', desc: "Sikh festival of valour, the day after Holi. Nihang Gatka and horsemanship." },
    ],
  },
  {
    month: 'April', season: 'Early Summer', icon: <Sun size={26} />,
    best_for: ['Uttarakhand Char Dham', 'Odisha'],
    tip: "Book Kedarnath helicopter or porter well in advance. Gets fully booked 2 months ahead.",
    festivals: [
      { name: 'Char Dham Opening', temples: 'Kedarnath, Badrinath, Gangotri, Yamunotri', desc: "Himalayan shrines reopen after winter. Massive pilgrim crowds." },
      { name: 'Akshaya Tritiya', temples: 'Puri Jagannath, Badrinath, Simhachalam', desc: "Highly auspicious. Chandalana Utsava at Simhachalam — deity revealed." },
      { name: 'Baisakhi', temples: 'Golden Temple, Anandpur Sahib', desc: "Harvest festival & the founding of the Khalsa (1699). The solar new year across regions." },
      { name: 'Vishu', temples: 'Guruvayur, Sabarimala, Padmanabhaswamy', desc: "Kerala New Year. The Vishukkani — the auspicious first sight at dawn." },
      { name: 'Puthandu', temples: 'Meenakshi (Madurai), Kapaleeshwarar', desc: "Tamil New Year. Mango pachadi of six tastes; the Chithirai festival." },
      { name: 'Bihu', temples: 'Kamakhya; Assam', desc: "Assamese New Year (Bohag Bihu). Bihu dance, husori, and the gamosa." },
      { name: 'Pana Sankranti', temples: 'Jagannath Puri; Odisha', desc: "Odia New Year. Pana (sweet drink) offered; also Hanuman Jayanti in Odisha." },
    ],
  },
  {
    month: 'May', season: 'Summer', icon: <Sun size={26} />,
    best_for: ['Uttarakhand', 'Bihar (Bodh Gaya)'],
    tip: "Best weather window for Char Dham before monsoon arrives in June.",
    festivals: [
      { name: 'Buddha Purnima', temples: 'Bodh Gaya, Buddhist temples, Sarnath', desc: "Buddha enlightenment day. International pilgrims. Bodh Gaya glows." },
      { name: 'Narasimha Jayanti', temples: 'Ahobilam, Yadagirigutta, Simhachalam', desc: "Lord Narasimha appearance day." },
    ],
  },
  {
    month: 'June', season: 'Pre-Monsoon', icon: <CloudRain size={26} />,
    best_for: ['Puri', 'Pandharpur'],
    tip: "Rath Yatra in Puri: stay nearby and arrive by 5AM for front-row position.",
    festivals: [
      { name: 'Rath Yatra', temples: 'Puri Jagannath (main), Serampore, Mahesh', desc: "Lord Jagannath chariot procession. Millions pull the rath. One of the most extraordinary sights in India." },
      { name: 'Ashadhi Ekadashi (Wari)', temples: 'Pandharpur Vitthal', desc: "Lakhs of Varkaris walk to Pandharpur singing abhangas." },
    ],
  },
  {
    month: 'July', season: 'Monsoon', icon: <CloudRain size={26} />,
    best_for: ['Jharkhand', 'Varanasi', 'Haridwar'],
    tip: "Shravan month is sacred for Shiva. Every Monday sees massive crowds at all Jyotirlingas.",
    festivals: [
      { name: 'Kanwar Yatra', temples: 'Baidyanath Deoghar, Haridwar, Kashi Vishwanath', desc: "Millions carry Ganga water on foot for 100km+ to offer to Shiva. One of the most intense pilgrimages in India." },
      { name: 'Guru Purnima', temples: 'All math and guru temples', desc: "Day of the spiritual teacher. Ashrams and temples full of devotees." },
    ],
  },
  {
    month: 'August', season: 'Monsoon', icon: <CloudRain size={26} />,
    best_for: ['Mathura', 'Vrindavan', 'Dwarka'],
    tip: "Janmashtami at Vrindavan: temples stay open through midnight, streets become rivers of devotion.",
    festivals: [
      { name: 'Janmashtami', temples: 'Mathura Krishna Janmabhoomi, Vrindavan, Dwarka, Udupi', desc: "Krishna birthday. Midnight celebrations, dahi-handi. Vrindavan is the epicentre." },
      { name: 'Amarnath Yatra closes', temples: 'Amarnath Cave', desc: "Last chance of the season to see the ice Shivalinga." },
      { name: 'Teej', temples: 'Parvati temples; Jaipur (Teej Mata)', desc: "Monsoon festival of Parvati. Swings, mehndi and green; women fast for their husbands." },
      { name: 'Pateti', temples: 'Udvada Atash Behram; Parsi agiaries', desc: "Parsi New Year (Navroz). Fire-temple prayers, gara sarees, dhansak." },
    ],
  },
  {
    month: 'September', season: 'Late Monsoon', icon: <CloudRain size={26} />,
    best_for: ['Maharashtra', 'Kerala'],
    tip: "Lalbaugcha Raja in Mumbai draws 1.5 million people for visarjan. Go early morning.",
    festivals: [
      { name: 'Ganesh Chaturthi', temples: 'All Maharashtra, especially Pune (Dagdusheth, Kasba), Mumbai (Siddhivinayak)', desc: "10-day festival. Ashtavinayak circuit especially auspicious." },
      { name: 'Onam', temples: 'Kerala temples, Thrikkakara Vamana Temple', desc: "Kerala harvest festival. Thiruvonam at Thrikkakara is the most sacred." },
      { name: 'Ananta Chaturdashi', temples: 'Siddhivinayak (visarjan), Vishnu temples', desc: "Grand Ganesh visarjan + the Anant Vrat to Vishnu-Ananta." },
      { name: 'Radha Ashtami', temples: 'Barsana, Vrindavan', desc: "Radha Rani's birth, 15 days after Janmashtami. Barsana is the epicentre." },
      { name: 'Pitru Paksha', temples: 'Gaya (Vishnupad), Trimbakeshwar', desc: "16-day fortnight of ancestral rites (shraddha). Gaya is supreme for pind daan." },
      { name: 'Paryushan', temples: 'Jain temples — Palitana, Ranakpur', desc: "Jainism's holiest festival. Fasting & scripture; ends with Samvatsari (day of forgiveness)." },
      { name: 'Vishwakarma Puja', temples: 'Workplaces; Bengal, Odisha, Jharkhand', desc: "Worship of the divine architect. Tools & machines are honoured (~Sep 17)." },
      { name: 'Nuakhai', temples: 'Samaleswari, Sambalpur', desc: "Western Odisha's harvest festival. The new rice offered to Goddess Samaleswari." },
      { name: 'Pola', temples: 'Shiva/Nandi temples; rural Maharashtra', desc: "Bullocks rested, bathed and worshipped in thanks for their labour." },
    ],
  },
  {
    month: 'October', season: 'Post-Monsoon', icon: <Leaf size={26} />,
    best_for: ['Gujarat (Garba)', 'Mysore', 'Himachal Pradesh', 'West Bengal'],
    tip: "October is arguably the best month for temple pilgrimages — perfect weather + major festivals.",
    festivals: [
      { name: 'Navratri', temples: 'All Shakti Peethas, Gujarat Garba venues, Mysore Chamundeshwari', desc: "9 nights of the Goddess. Garba in Gujarat, Golu in Tamil Nadu, Durga Puja in Bengal." },
      { name: 'Dussehra / Vijayadashami', temples: 'Kullu Raghunath Temple, Mysore, Kota', desc: "Kullu Dussehra — 360+ deities attend. Mysore Dasara — royal elephant procession." },
      { name: 'Sharad Purnima', temples: 'Vrindavan (Raas); Lakshmi temples', desc: "Brightest full moon. Krishna's Maha Raas; Kojagiri Lakshmi vigil; moonlit kheer." },
      { name: 'Jitiya', temples: 'River ghats; Bihar, Jharkhand', desc: "Mothers' three-day nirjala fast for the long life of their children." },
      { name: 'Dhammachakra Pravartan Din', temples: 'Deekshabhoomi, Nagpur', desc: "Marks Dr Ambedkar's embrace of Buddhism in 1956. A huge gathering at Nagpur." },
    ],
  },
  {
    month: 'November', season: 'Early Winter', icon: <Flame size={26} />,
    best_for: ['Varanasi', 'Ayodhya', 'Kerala'],
    tip: "Dev Deepawali in Varanasi falls on Kartik Purnima — 5 days after Diwali. Do not miss it.",
    festivals: [
      { name: 'Diwali', temples: 'Kashi Vishwanath (Dev Deepawali), Ayodhya, Tirupati', desc: "Varanasi Dev Deepawali — 1 lakh diyas on the ghats — the most magical sight in India." },
      { name: 'Sabarimala opening', temples: 'Sabarimala Ayyappa', desc: "Annual pilgrimage season begins. 41-day vrat required. Millions in black." },
      { name: 'Dhanteras', temples: 'Lakshmi & Dhanvantari temples', desc: "Diwali begins. Lakshmi-Kubera worship, buying gold, and the Yama Deepam lamp." },
      { name: 'Govardhan Puja', temples: 'Nathdwara, Govardhan (Braj)', desc: "Day after Diwali. Krishna lifting Govardhan; the Annakut 'mountain of food'." },
      { name: 'Bhai Dooj', temples: 'Vishram Ghat, Mathura', desc: "Closes Diwali. Sisters tilak brothers for long life (the Yama-Yamuna legend)." },
      { name: 'Tulsi Vivaha', temples: 'Pandharpur; Vishnu temples', desc: "Tulsi weds Vishnu. End of Chaturmas; opens the Hindu wedding season." },
    ],
  },
  {
    month: 'December', season: 'Winter', icon: <Sparkles size={26} />,
    best_for: ['Tamil Nadu', 'Andhra Pradesh', 'Kerala'],
    tip: "South India temple circuit ideal in December — excellent weather, major festivals, no crowds vs October.",
    festivals: [
      { name: 'Karthigai Deepam', temples: 'Arunachaleswarar Tiruvannamalai, Brihadeeswarar Thanjavur', desc: "Massive fire beacon lit on Arunachala hill — visible for 30km. Millions circumambulate." },
      { name: 'Vaikunta Ekadashi', temples: 'Tirumala Venkateswara, all Vishnu temples', desc: "Vaikunta Dwaram (heaven gate) opens. Largest annual crowd at Tirupati." },
      { name: 'Vivaha Panchami', temples: 'Janakpur, Ayodhya', desc: "The wedding of Rama & Sita. Grandest at Janakpur, Sita's birthplace." },
      { name: 'Tulsi Pujan Diwas', temples: 'Vishnu & Krishna temples', desc: "Worship of the sacred Tulsi plant (25 December)." },
    ],
  },
]

// Maps a calendar festival name to its detailed Festival Guide page (/festivals/<slug>).
// Only names present here become clickable links; others render as plain text.
const FESTIVAL_GUIDE: Record<string, string> = {
  'Makar Sankranti': 'makar-sankranti',
  'Vaikunta Ekadashi': 'vaikuntha-ekadashi',
  'Pongal': 'pongal',
  'Mahashivratri': 'maha-shivaratri',
  'Vasant Panchami': 'vasant-panchami',
  'Holi': 'holi',
  'Ram Navami': 'ram-navami',
  'Akshaya Tritiya': 'akshaya-tritiya',
  'Buddha Purnima': 'buddha-purnima',
  'Rath Yatra': 'rath-yatra',
  'Guru Purnima': 'guru-purnima',
  'Janmashtami': 'krishna-janmashtami',
  'Ganesh Chaturthi': 'ganesh-chaturthi',
  'Onam': 'onam',
  'Navratri': 'navaratri-durga-puja',
  'Dussehra / Vijayadashami': 'dussehra-vijayadashami',
  'Diwali': 'diwali',
  'Sabarimala opening': 'sabarimala-makaravilakku',
  'Gangaur': 'gangaur',
  'Narasimha Jayanti': 'narasimha-jayanti',
  'Ashadhi Ekadashi (Wari)': 'ashadhi-ekadashi-pandharpur-wari',
  'Kanwar Yatra': 'kanwar-yatra',
  'Karthigai Deepam': 'karthigai-deepam',
  'Kumbh Mela': 'kumbh-mela',
  'Ratha Saptami': 'ratha-saptami',
  'Cheti Chand': 'cheti-chand',
  'Teej': 'teej',
  'Pitru Paksha': 'pitru-paksha',
  'Radha Ashtami': 'radha-ashtami',
  'Ananta Chaturdashi': 'ananta-chaturdashi',
  'Vishwakarma Puja': 'vishwakarma-puja',
  'Paryushan': 'paryushan',
  'Sharad Purnima': 'sharad-purnima',
  'Tulsi Vivaha': 'tulsi-vivaha',
  'Govardhan Puja': 'govardhan-puja',
  'Dhanteras': 'dhanteras',
  'Bhai Dooj': 'bhai-dooj',
  'Vivaha Panchami': 'vivaha-panchami',
  'Lohri': 'lohri',
  'Hola Mohalla': 'holla-mohalla',
  'Baisakhi': 'baisakhi',
  'Vishu': 'vishu',
  'Puthandu': 'puthandu',
  'Bihu': 'bihu',
  'Pana Sankranti': 'pana-sankranti',
  'Pateti': 'pateti',
  'Nuakhai': 'nuakhai',
  'Pola': 'pola',
  'Jitiya': 'jitiya',
  'Dhammachakra Pravartan Din': 'dhammachakra-pravartan-din',
  'Tulsi Pujan Diwas': 'tulsi-pujan-diwas',
}

export default function CalendarPage() {
  const currentMonth = new Date().getMonth()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="section-title">Plan Around Auspicious Dates</div>
      <h1 className="font-serif text-4xl font-medium mb-2">Festival Calendar</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>
        Month-wise guide to temple festivals, pilgrimage seasons, and auspicious dates across India.
      </p>

      <div className="space-y-6">
        {MONTHS.map((m, i) => (
          <div key={m.month} className="card overflow-hidden" id={m.month.toLowerCase()}
            style={{ borderColor: i === currentMonth ? 'var(--crimson)' : 'var(--border)' }}>
            <div className="px-5 py-4 flex items-center justify-between"
              style={{ background: i === currentMonth ? 'var(--crimson)' : 'var(--ivory2)' }}>
              <div>
                <h2 className="font-serif text-xl font-medium"
                  style={{ color: i === currentMonth ? '#FAF7F2' : 'var(--ink)' }}>
                  {m.month}
                  {i === currentMonth && (
                    <span className="ml-2 text-xs font-sans font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(237,217,163,.2)', color: '#EDD9A3' }}>This Month</span>
                  )}
                </h2>
                <p className="text-xs mt-0.5"
                  style={{ color: i === currentMonth ? 'rgba(237,224,196,.6)' : 'var(--muted2)' }}>
                  {m.season} · Best for: {m.best_for.join(', ')}
                </p>
              </div>
              <span className="inline-flex items-center" style={{ color: i === currentMonth ? '#FAF7F2' : 'var(--saffron)' }}>{m.icon}</span>
            </div>

            <div className="p-5">
              <div className="space-y-3 mb-4">
                {m.festivals.map(f => {
                  const guideSlug = FESTIVAL_GUIDE[f.name]
                  return (
                  <div key={f.name} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--crimson)' }} />
                    <div>
                      {guideSlug ? (
                        <Link href={`/festivals/${guideSlug}`} className="font-medium text-sm inline-flex items-center gap-1"
                          style={{ color: 'var(--crimson)', textDecoration: 'none' }}>
                          <span style={{ borderBottom: '1px dotted var(--crimson)' }}>{f.name}</span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                            style={{ background: 'rgba(139,26,26,0.08)', color: 'var(--crimson)' }}>Guide →</span>
                        </Link>
                      ) : (
                        <span className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{f.name}</span>
                      )}
                      <span className="text-xs ml-2" style={{ color: 'var(--crimson)' }}>{f.temples}</span>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{f.desc}</p>
                    </div>
                  </div>
                  )
                })}
              </div>

              <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg text-xs"
                style={{ background: 'var(--ivory2)', color: 'var(--muted)' }}>
                <Lightbulb size={15} style={{ flexShrink: 0, marginTop: 1 }} /> {m.tip}
              </div>

              <div className="mt-3">
                <Link href={`/plan?destination=${encodeURIComponent(m.best_for[0])}&days=5`}
                  className="btn btn-secondary btn-sm text-xs">
                  Plan {m.month} trip →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
