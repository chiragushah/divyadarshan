import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pilgrimage Circuits — DivyaDarshan',
  description: '12 curated pilgrimage circuits across India. Char Dham, Ashtavinayak, Jyotirlinga, Shakti Peetha routes with duration and budget.',
}

const CIRCUITS = [
  {
    id: 'chardham', name: 'Char Dham Yatra', region: 'Uttarakhand', icon: '⛰️',
    temples: 4, days: '10–14', budget: '₹25,000–60,000',
    tags: ['Himalayan', 'Bucket List', 'Shiva + Vishnu'],
    desc: 'The four holiest dhams — Badrinath, Kedarnath, Gangotri, Yamunotri. Open May to November only.',
    stops: ['Haridwar', 'Yamunotri', 'Gangotri', 'Kedarnath', 'Badrinath', 'Rishikesh'],
  },
  {
    id: 'ashtavinayak', name: 'Ashtavinayak Circuit', region: 'Maharashtra', icon: '🐘',
    temples: 8, days: '2–3', budget: '₹4,000–8,000',
    tags: ['Weekend', 'Ganesha', 'Road Trip'],
    desc: 'Eight self-manifested Ganesha temples in a circle around Pune. Best done by car.',
    stops: ['Morgaon', 'Siddhatek', 'Pali', 'Mahad', 'Theur', 'Lenyadri', 'Ozar', 'Ranjangaon'],
  },
  {
    id: 'jyotirlinga', name: '12 Jyotirlingas', region: 'All India', icon: '🕉️',
    temples: 12, days: '15–21', budget: '₹60,000–1,50,000',
    tags: ['Lifetime', 'Shiva', 'All India'],
    desc: 'The 12 self-manifested Shiva shrines from Somnath to Kedarnath. The ultimate Shaiva pilgrimage.',
    stops: ['Somnath', 'Mallikarjuna', 'Mahakaleshwar', 'Omkareshwar', 'Kedarnath', 'Bhimashankar', 'Kashi Vishwanath', 'Trimbakeshwar', 'Vaidyanath', 'Nageshwar', 'Ramanathaswamy', 'Grishneshwar'],
  },
  {
    id: 'shakti-peetha', name: 'Shakti Peetha Circuit', region: 'All India', icon: '⚡',
    temples: 51, days: '21–30', budget: '₹1,00,000+',
    tags: ['Lifetime', 'Shakti', 'All India'],
    desc: "51 sites where Sati's body parts fell. From Kamakhya in Assam to Kanyakumari in the south.",
    stops: ['Kamakhya', 'Kalighat', 'Vaishno Devi', 'Jwala Ji', 'Chamundeshwari', 'Kanchi Kamakshi', 'Kanyakumari', 'Kolhapur Mahalaxmi'],
  },
  {
    id: 'divya-desam', name: '108 Divya Desams', region: 'South India + Nepal', icon: '🙏',
    temples: 108, days: '21–45', budget: '₹80,000–2,00,000',
    tags: ['Lifetime', 'Vishnu', 'South India'],
    desc: '108 Vishnu temples glorified by the Alvar saints. 105 in India, 1 in Nepal, 2 ethereal.',
    stops: ['Tirumala', 'Srirangam', 'Badrinath', 'Guruvayur', 'Padmanabhaswamy'],
  },
  {
    id: 'pancha-bhuta', name: 'Pancha Bhuta Stalas', region: 'Tamil Nadu + AP', icon: '🌊',
    temples: 5, days: '5–7', budget: '₹12,000–25,000',
    tags: ['5 Elements', 'Shiva', 'Tamil Nadu'],
    desc: 'Five Shiva temples representing the five elements — earth, water, fire, air, sky.',
    stops: ['Ekambareswarar (Earth)', 'Jambukeswarar (Water)', 'Arunachaleswarar (Fire)', 'Srikalahasti (Air)', 'Chidambaram (Sky)'],
  },
  {
    id: 'panch-kedar', name: 'Panch Kedar', region: 'Uttarakhand', icon: '🏔️',
    temples: 5, days: '10–14', budget: '₹30,000–60,000',
    tags: ['Trekking', 'Shiva', 'Himalayan'],
    desc: 'Five Shiva shrines in Garhwal Himalayas where different body parts of the bull (Shiva) were found.',
    stops: ['Kedarnath', 'Tungnath', 'Rudranath', 'Madhyamaheshwar', 'Kalpeshwar'],
  },
  {
    id: 'murugan-arupadai', name: 'Aarupadai Veedu', region: 'Tamil Nadu', icon: '🗡️',
    temples: 6, days: '5–7', budget: '₹10,000–20,000',
    tags: ['Murugan', 'Tamil Nadu', 'Circuit'],
    desc: 'Six sacred abodes of Lord Murugan/Kartikeya. Each with a distinct legend and character.',
    stops: ['Palani', 'Tiruchendur', 'Swamimalai', 'Tirupparankundram', 'Pazhamudircholai', 'Tiruttani'],
  },
  {
    id: 'navagraha', name: 'Navagraha Circuit', region: 'Tamil Nadu', icon: '🪐',
    temples: 9, days: '2–3', budget: '₹6,000–12,000',
    tags: ['Planets', 'Tamil Nadu', 'Astrology'],
    desc: 'Nine temples near Kumbakonam each dedicated to one of the nine planetary deities (Navagrahas).',
    stops: ['Suryanar Kovil', 'Thingalur', 'Vaitheeswaran Koil', 'Thirunallar', 'Alangudi', 'Keezhperumpallam', 'Thiruvenkadu', 'Kanjanur', 'Keezhaiyur'],
  },
  {
    id: 'kashi-panchkoshi', name: 'Kashi Panchakoshi Yatra', region: 'Uttar Pradesh', icon: '🏛️',
    temples: 108, days: '5', budget: '₹5,000–15,000',
    tags: ['Varanasi', 'Shiva', 'On foot'],
    desc: 'Sacred circumambulation of Kashi (Varanasi) — 88km on foot, visiting 108 shrines over 5 days.',
    stops: ['Kashi Vishwanath', 'Manikarnika Ghat', 'Sankat Mochan', 'Durga Kund', 'Bharat Mata Mandir'],
  },
  {
    id: 'vrindavan-sapta-devalayas', name: 'Vrindavan Sapta Devalayas', region: 'Uttar Pradesh', icon: '🪈',
    temples: 7, days: '2–3', budget: '₹4,000–8,000',
    tags: ['Krishna', 'Braj', 'Vaishnava'],
    desc: 'Seven principal temples of Vrindavan established by the six Goswamis of Chaitanya Mahaprabhu.',
    stops: ['Govindaji', 'Gopinath', 'Madan Mohan', 'Radha Raman', 'Radha Damodar', 'Jugal Kishore', 'Radha Shyamsundar'],
  },
  {
    id: 'south-india-grand', name: 'South India Grand Circuit', region: 'Tamil Nadu + Kerala + Karnataka', icon: '🏰',
    temples: 20, days: '14–21', budget: '₹40,000–90,000',
    tags: ['Dravidian', 'UNESCO', 'All deities'],
    desc: "The grand tour of South India's temple heritage — Chola temples, Kerala shrines, Karnataka wonders.",
    stops: ['Brihadeeswarar', 'Srirangam', 'Meenakshi', 'Ramanathaswamy', 'Padmanabhaswamy', 'Guruvayur', 'Chamundeshwari', 'Hoysaleswara'],
  },
]

export default function CircuitsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="section-title">Curated Pilgrimage Routes</div>
      <h1 className="font-serif text-4xl font-medium mb-2">Pilgrimage Circuits</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>
        12 carefully curated pilgrimage routes across India — from weekend Ashtavinayak to lifetime Jyotirlinga journeys.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CIRCUITS.map(c => (
          <div key={c.id} className="card overflow-hidden hover:-translate-y-1 transition-all duration-200 flex flex-col">
            {/* Header */}
            <div className="px-5 py-4" style={{ background: 'linear-gradient(135deg, var(--crim-dk), var(--crimson))' }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.icon}</span>
                <div>
                  <h2 className="font-serif text-lg font-medium leading-tight" style={{ color: '#FAF7F2' }}>{c.name}</h2>
                  <p className="text-xs" style={{ color: 'rgba(237,224,196,.6)' }}>{c.region}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {c.tags.map(t => <span key={t} className="badge-gold text-[9px]">{t}</span>)}
              </div>

              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--muted)' }}>{c.desc}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                {[
                  { label: 'Temples', value: c.temples },
                  { label: 'Duration', value: c.days + 'd' },
                  { label: 'Budget', value: c.budget.split('–')[0] },
                ].map(s => (
                  <div key={s.label} className="rounded-lg py-2" style={{ background: 'var(--ivory2)' }}>
                    <div className="font-serif text-base font-medium" style={{ color: 'var(--crimson)' }}>{s.value}</div>
                    <div className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--muted2)' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Stops preview */}
              <div className="mb-4">
                <div className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--muted2)' }}>Key Stops</div>
                <div className="flex flex-wrap gap-1">
                  {c.stops.slice(0, 4).map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded"
                      style={{ background: 'var(--ivory2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                      {s.split(' ')[0]}
                    </span>
                  ))}
                  {c.stops.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded" style={{ color: 'var(--muted2)' }}>
                      +{c.stops.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link href={`/plan?destination=${encodeURIComponent(c.name)}&days=${c.days.split('–')[0]}`}
                  className="btn btn-primary btn-sm flex-1 justify-center text-xs">
                  Plan this Circuit
                </Link>
                <Link href={`/plan/budget?destination=${encodeURIComponent(c.name)}`}
                  className="btn btn-secondary btn-sm text-xs px-3">
                  Budget
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
