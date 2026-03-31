import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Festival Calendar — DivyaDarshan',
  description: 'Month-wise guide to Hindu temple festivals and pilgrimage seasons across India. Plan your yatra around auspicious dates.',
}

const MONTHS = [
  {
    month: 'January',
    season: 'Winter',
    festivals: [
      { name: 'Makar Sankranti', temples: 'Konark Sun Temple, Prayagraj Sangam', desc: 'Kite festivals, holy dips, sesame sweets.' },
      { name: 'Vaikuntha Ekadashi', temples: 'Tirumala, Srirangam, all Vishnu temples', desc: 'Most auspicious Ekadashi — gates of Vaikuntha open.' },
      { name: 'Pongal', temples: 'All Tamil Nadu temples', desc: '4-day harvest festival. Grand temple chariot processions.' },
    ],
    best_for: ['Tamil Nadu', 'Andhra Pradesh', 'Rajasthan'],
    tip: 'Peak pilgrim season. Book trains and accommodation 3 months ahead.',
  },
  {
    month: 'February',
    season: 'Late Winter',
    festivals: [
      { name: 'Mahashivratri', temples: 'All 12 Jyotirlingas, Kedarnath (winter darshan)', desc: "Shiva's great night. Temples stay open all night. Millions fast." },
      { name: 'Vasant Panchami', temples: 'Saraswati temples across India', desc: "Goddess Saraswati's birthday. Students seek blessings." },
    ],
    best_for: ['Ujjain', 'Varanasi', 'All Jyotirlinga'],
    tip: "Mahashivratri is among India's biggest pilgrimages. Ujjain gets 1 crore+ pilgrims.",
  },
  {
    month: 'March',
    season: 'Spring',
    festivals: [
      { name: 'Holi', temples: 'Vrindavan, Mathura, Barsana', desc: 'World-famous colour festival in Braj region. Laddu Holi, Lathmar Holi.' },
      { name: 'Gangaur', temples: 'Rajasthan temples (Udaipur, Jaipur)', desc: 'Goddess Parvati festival. Beautiful processions.' },
      { name: 'Ram Navami', temples: 'Ram Lalla Ayodhya, Chitrakoot', desc: "Lord Rama's birthday. Ayodhya transforms with celebrations." },
    ],
    best_for: ['Vrindavan', 'Mathura', 'Ayodhya'],
    tip: "Vrindavan Holi (Phulera Dooj through Rang Panchami) is bucket-list material.",
  },
  {
    month: 'April',
    season: 'Early Summer',
    festivals: [
      { name: 'Char Dham Opening', temples: 'Kedarnath, Badrinath, Gangotri, Yamunotri', desc: 'Himalayan shrines reopen after winter. Massive pilgrim crowds.' },
      { name: 'Akshaya Tritiya', temples: 'Puri Jagannath, Badrinath, Simhachalam', desc: 'Highly auspicious. Chandalana Utsava at Simhachalam — deity revealed.' },
    ],
    best_for: ['Uttarakhand Char Dham', 'Odisha'],
    tip: 'Book Kedarnath helicopter or porter well in advance. Gets fully booked 2 months ahead.',
  },
  {
    month: 'May',
    season: 'Summer',
    festivals: [
      { name: 'Buddha Purnima', temples: 'Bodh Gaya, Buddhist temples, Sarnath', desc: "Buddha's enlightenment. International pilgrims. Bodh Gaya glows." },
      { name: 'Narasimha Jayanti', temples: 'Ahobilam, Yadagirigutta, Simhachalam', desc: "Lord Narasimha's appearance day." },
    ],
    best_for: ['Uttarakhand', 'Bihar (Bodh Gaya)'],
    tip: 'Best weather window for Char Dham before monsoon arrives in June.',
  },
  {
    month: 'June',
    season: 'Pre-Monsoon',
    festivals: [
      { name: 'Rath Yatra', temples: 'Puri Jagannath (main), Serampore, Mahesh', desc: "Lord Jagannath's chariot procession. Millions pull the rath. One of India's most extraordinary sights." },
      { name: 'Ashadhi Ekadashi (Wari)', temples: 'Pandharpur Vitthal', desc: 'Lakhs of Varkaris walk to Pandharpur singing abhangas.' },
    ],
    best_for: ['Puri', 'Pandharpur'],
    tip: 'Rath Yatra in Puri: stay nearby and arrive by 5AM for front-row position.',
  },
  {
    month: 'July',
    season: 'Monsoon',
    festivals: [
      { name: 'Kanwar Yatra', temples: 'Baidyanath Deoghar, Haridwar, Kashi Vishwanath', desc: "Millions carry Ganga water on foot for 100km+ to offer to Shiva. One of India's most intense pilgrimages." },
      { name: 'Guru Purnima', temples: 'All math and guru temples', desc: 'Day of the spiritual teacher. Ashrams and temples full of devotees.' },
    ],
    best_for: ['Jharkhand', 'Varanasi', 'Haridwar'],
    tip: 'Shravan month is sacred for Shiva. Every Monday sees massive crowds at all Jyotirlingas.',
  },
  {
    month: 'August',
    season: 'Monsoon',
    festivals: [
      { name: 'Janmashtami', temples: 'Mathura Krishna Janmabhoomi, Vrindavan, Dwarka, Udupi', desc: "Krishna's birthday. Midnight celebrations, dahi-handi. Vrindavan is the epicentre." },
      { name: 'Amarnath Yatra closes', temples: 'Amarnath Cave', desc: 'Last chance of the season to see the ice Shivalinga.' },
    ],
    best_for: ['Mathura', 'Vrindavan', 'Dwarka'],
    tip: 'Janmashtami at Vrindavan: temples stay open through midnight, streets become rivers of devotion.',
  },
  {
    month: 'September',
    season: 'Late Monsoon',
    festivals: [
      { name: 'Ganesh Chaturthi', temples: 'All Maharashtra, especially Pune (Dagdusheth, Kasba), Mumbai (Siddhivinayak)', desc: '10-day festival. Ashtavinayak circuit especially auspicious.' },
      { name: "Onam', temples: 'Kerala temples, Thrikkakara Vamana Temple', desc: 'Kerala's harvest festival. Thiruvonam at Thrikkakara is the most sacred." },
    ],
    best_for: ['Maharashtra', 'Kerala'],
    tip: 'Lalbaugcha Raja in Mumbai draws 1.5 million people for visarjan. Go early morning.',
  },
  {
    month: 'October',
    season: 'Post-Monsoon',
    festivals: [
      { name: 'Navratri', temples: 'All Shakti Peethas, Gujarat Garba venues, Mysore Chamundeshwari', desc: '9 nights of the Goddess. Garba in Gujarat, Golu in Tamil Nadu, Durga Puja in Bengal.' },
      { name: 'Dussehra / Vijayadashami', temples: 'Kullu Raghunath Temple, Mysore, Kota', desc: 'Kullu Dussehra — 360+ deities attend. Mysore Dasara — royal elephant procession.' },
    ],
    best_for: ['Gujarat (Garba)', 'Mysore', 'Himachal Pradesh', 'West Bengal'],
    tip: 'October is arguably the best month for temple pilgrimages — perfect weather + major festivals.',
  },
  {
    month: 'November',
    season: 'Early Winter',
    festivals: [
      { name: 'Diwali', temples: 'Kashi Vishwanath (Dev Deepawali), Ayodhya, Tirupati', desc: "Varanasi's Dev Deepawali — 1 lakh diyas on the ghats — is the most magical sight in India.' },
      { name: 'Sabarimala opening', temples: 'Sabarimala Ayyappa', desc: 'Annual pilgrimage season begins. 41-day vrat required. Millions in black.' },
    ],
    best_for: ['Varanasi', 'Ayodhya', 'Kerala'],
    tip: "Dev Deepawali in Varanasi falls on Kartik Purnima — 5 days after Diwali. Don\'t miss it.",
  },
  {
    month: 'December',
    season: 'Winter',
    festivals: [
      { name: 'Karthigai Deepam', temples: 'Arunachaleswarar Tiruvannamalai, Brihadeeswarar Thanjavur', desc: 'Massive fire beacon lit on Arunachala hill — visible for 30km. Millions circumambulate.' },
      { name: 'Vaikunta Ekadashi', temples: 'Tirumala Venkateswara, all Vishnu temples', desc: 'Vaikunta Dwaram (heaven\'s gate) opens. Largest annual crowd at Tirupati.' },
    ],
    best_for: ['Tamil Nadu', 'Andhra Pradesh', 'Kerala'],
    tip: 'South India temple circuit ideal in December — excellent weather, major festivals, no crowds vs October.',
  },
]

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
            {/* Month header */}
            <div className="px-5 py-4 flex items-center justify-between"
              style={{ background: i === currentMonth ? 'var(--crimson)' : 'var(--ivory2)' }}>
              <div>
                <h2 className="font-serif text-xl font-medium"
                  style={{ color: i === currentMonth ? '#FAF7F2' : 'var(--ink)' }}>
                  {m.month}
                  {i === currentMonth && <span className="ml-2 text-xs font-sans font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(237,217,163,.2)', color: '#EDD9A3' }}>This Month</span>}
                </h2>
                <p className="text-xs mt-0.5"
                  style={{ color: i === currentMonth ? 'rgba(237,224,196,.6)' : 'var(--muted2)' }}>
                  {m.season} · Best for: {m.best_for.join(', ')}
                </p>
              </div>
              <span className="text-2xl">{['🌨️','❄️','🌸','☀️','🌞','🌧️','⛈️','🌧️','🌦️','🍂','🪔','🌟'][i]}</span>
            </div>

            {/* Festivals */}
            <div className="p-5">
              <div className="space-y-3 mb-4">
                {m.festivals.map(f => (
                  <div key={f.name} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--crimson)' }} />
                    <div>
                      <span className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{f.name}</span>
                      <span className="text-xs ml-2" style={{ color: 'var(--crimson)' }}>{f.temples}</span>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip */}
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg text-xs"
                style={{ background: 'var(--ivory2)', color: 'var(--muted)' }}>
                <span>💡</span> {m.tip}
              </div>

              {/* Quick link */}
              <div className="mt-3 flex gap-2">
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
