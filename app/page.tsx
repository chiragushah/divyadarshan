import type { Metadata } from 'next'
import Link from 'next/link'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
import HeroSearch from '@/components/nav/HeroSearch'
import TempleCard from '@/components/temple/TempleCard'
import CircuitCard from '@/components/temple/CircuitCard'
import StatsBar from '@/components/layout/StatsBar'

export const metadata: Metadata = {
  title: "DivyaDarshan — India's Temple Explorer & Yatra Planner",
  description: 'Discover 350+ sacred temples across India. AI-powered yatra planning, live darshan, pilgrimage circuits, savings goals. Your complete pilgrimage companion.',
}

async function getFeaturedTemples() {
  await connectDB()
  const temples = await Temple.find({ has_live: true })
    .select('slug name state city deity type has_live rating_avg rating_count categories image_url')
    .limit(8)
    .lean()
  return temples.map(t => ({ ...t, id: t._id.toString() }))
}

export default async function HomePage() {
  const featuredTemples = await getFeaturedTemples()

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A0303 0%, #3D0808 60%, #5C0F0F 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EDD9A3' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(237,217,163,.12)', color: '#EDD9A3', border: '1px solid rgba(237,217,163,.2)' }}>
            <span className="live-dot" /> 56 temples streaming live
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-medium mb-4 leading-tight" style={{ color: '#FAF7F2' }}>
            Every Sacred Temple.<br />
            <span style={{ color: '#EDD9A3' }}>One Companion.</span>
          </h1>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(237,224,196,.6)' }}>
            Discover 350+ temples across India. Plan your yatra with AI, watch live darshan,
            track your pilgrimage savings, and travel with community.
          </p>
          <HeroSearch />
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { label: '12 Jyotirlingas',  href: '/explore?category=Jyotirlinga'   },
              { label: 'Char Dham',        href: '/explore?category=Char+Dham'     },
              { label: '51 Shakti Peethas',href: '/explore?category=Shakti+Peetha' },
              { label: 'Live Darshan',     href: '/explore?live=true'              },
              { label: 'AI Yatra Planner', href: '/plan'                           },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{ background: 'rgba(255,255,255,.08)', color: 'rgba(237,224,196,.75)', border: '1px solid rgba(237,224,196,.15)' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      {/* ── Live Darshan ─────────────────────────────────── */}
      {featuredTemples.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center justify-between mb-7">
            <div>
              <div className="section-title">Live Right Now</div>
              <h2 className="text-3xl font-serif font-medium">Watch Darshan Live</h2>
            </div>
            <Link href="/explore?live=true" className="btn btn-secondary btn-sm">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredTemples.map((temple: any) => (
              <TempleCard key={temple.id} temple={temple} compact />
            ))}
          </div>
        </section>
      )}

      {/* ── Feature Cards ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="section-title text-center mb-2">Everything for your Yatra</div>
        <h2 className="text-3xl font-serif font-medium text-center mb-10">Plan. Save. Explore. Remember.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(f => (
            <Link key={f.href} href={f.href}
              className="card card-p group hover:-translate-y-1 transition-transform duration-200 block">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-serif text-xl font-medium mb-1.5">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.desc}</p>
              <div className="mt-4 text-xs font-semibold" style={{ color: 'var(--crimson)' }}>{f.cta} →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Pilgrimage Circuits ───────────────────────────── */}
      <section style={{ background: 'var(--ivory2)' }} className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-7">
            <div>
              <div className="section-title">Curated Routes</div>
              <h2 className="text-3xl font-serif font-medium">Pilgrimage Circuits</h2>
            </div>
            <Link href="/circuits" className="btn btn-secondary btn-sm">All circuits →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_CIRCUITS.map(c => <CircuitCard key={c.id} circuit={c} />)}
          </div>
        </div>
      </section>

      {/* ── FinVerse CTA ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="rounded-2xl p-10 text-center"
          style={{ background: 'linear-gradient(135deg, #1A0303, #3D0808)' }}>
          <div className="section-title" style={{ color: '#EDD9A3' }}>Powered by FinVerse</div>
          <h2 className="text-3xl font-serif font-medium mb-3" style={{ color: '#FAF7F2' }}>
            Start a Yatra Fund Today
          </h2>
          <p className="text-sm mb-7 max-w-lg mx-auto" style={{ color: 'rgba(237,224,196,.6)' }}>
            Save ₹3,200/month and your Char Dham yatra is funded in 8 months.
          </p>
          <Link href={`${process.env.NEXT_PUBLIC_FINVERSE_URL || 'https://finverse.app'}/savings?utm_source=divyadarshan&utm_campaign=hero_cta`}
            target="_blank" rel="noopener" className="btn btn-gold btn-lg">
            Open Yatra Fund on FinVerse
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer style={{ background: 'var(--crim-dk)', color: 'rgba(237,224,196,.5)' }} className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-serif text-xl font-medium" style={{ color: '#EDD9A3' }}>DivyaDarshan</span>
            <p className="text-xs mt-0.5">India's Temple Explorer</p>
          </div>
          <div className="flex gap-6 text-xs">
            {['About','Privacy','Terms'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
          <p className="text-xs">© 2026 DivyaDarshan · Built with ❤️ for India's pilgrims</p>
        </div>
      </footer>
    </main>
  )
}

const FEATURES = [
  { icon:'🗺️', title:'AI Yatra Planner',  desc:'Get a complete day-wise itinerary with routes, stays, timings and tips.',       cta:'Plan my yatra',  href:'/plan'          },
  { icon:'📖', title:'My Journal',         desc:'Log every temple visit with photos and feelings. Your pilgrimage passport.',     cta:'Start logging',  href:'/yatra/journal' },
  { icon:'💰', title:'Savings Goals',      desc:'Set monthly savings targets for your next yatra. Link to FinVerse.',             cta:'Set a goal',     href:'/yatra/goals'   },
  { icon:'👥', title:'Group Split',        desc:'Plan group yatras fairly. Split costs and share settlements on WhatsApp.',       cta:'Split expenses', href:'/yatra/split'   },
]

const FEATURED_CIRCUITS = [
  { id:'chardham',    name:'Char Dham Yatra',     region:'Uttarakhand', temple_count:4,  duration_days:'10–14 days', budget_range:'₹25,000–60,000',   tags:['Himalayan','Bucket List'], description:'The four holiest dhams — Badrinath, Kedarnath, Gangotri, Yamunotri.' },
  { id:'ashtavinayak',name:'Ashtavinayak Circuit',region:'Maharashtra', temple_count:8,  duration_days:'2 days',     budget_range:'₹4,000–8,000',     tags:['Weekend','Ganesha'],       description:'Eight self-manifested Ganesha temples around Pune. Completable in a weekend.' },
  { id:'jyotirlinga', name:'12 Jyotirlingas',     region:'All India',   temple_count:12, duration_days:'15–21 days', budget_range:'₹60,000–1,50,000', tags:['Lifetime','Shiva'],        description:'The 12 self-manifested Shiva shrines across India — a lifetime pilgrimage.' },
]
