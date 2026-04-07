import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "DivyaDarshan — India's Complete Temple & Pilgrimage Companion",
  description: 'Discover 362 sacred temples across India. AI yatra planning, live darshan, Sankalp manifestation, pilgrimage circuits, savings goals and community verified data.',
}

const FEATURES = [
  {
    icon: '🙏', title: 'Manifest — Write Your Sankalp',
    desc: 'Set sacred intentions with deity guidance, Navagraha shlokas and YouTube pronunciation links. Mark fulfilment and plan your gratitude yatra.',
    href: '/manifest', tag: 'New',
  },
  {
    icon: '🤖', title: 'AI Yatra Planner',
    desc: 'Tell our AI your destination, days and budget. Get a complete day-by-day pilgrimage itinerary with temple sequences, timings, accommodation and insider tips.',
    href: '/plan', tag: '',
  },
  {
    icon: '📺', title: 'Live Darshan',
    desc: 'Watch live darshan from 46+ major temples — Tirupati, Kashi Vishwanath, Kedarnath, Vaishno Devi and more, anytime from anywhere in the world.',
    href: '/explore?tab=darshan', tag: '',
  },
  {
    icon: '🛕', title: '362 Verified Temples',
    desc: 'Every temple has facilities info, wheelchair access, how to reach, nearby places, dress code, timings and festivals — verified by our pilgrim community.',
    href: '/explore', tag: '',
  },
  {
    icon: '🪐', title: 'Navagraha Shanti Guide',
    desc: 'Complete mantras for all 9 planets with Sanskrit shlokas, transliteration, meanings and YouTube links for correct pronunciation.',
    href: '/manifest?tab=navagraha', tag: 'New',
  },
  {
    icon: '💰', title: 'Yatra Savings Goals',
    desc: 'Set a monthly savings target for your dream pilgrimage. Track deposits, plan budgets and link to FinVerse to earn interest while your fund grows.',
    href: '/yatra/goals', tag: '',
  },
  {
    icon: '📔', title: 'Pilgrimage Journal',
    desc: 'Log every temple you visit. Build a lifetime pilgrimage passport — a permanent spiritual record of your sacred journey across India.',
    href: '/yatra/journal', tag: '',
  },
  {
    icon: '👥', title: 'Group Yatra Planner',
    desc: 'Organise family pilgrimages with seat tracking, expense splitting and instant WhatsApp sharing. Open or private group yatras.',
    href: '/yatra/group', tag: '',
  },
  {
    icon: '✅', title: 'Community Data Verification',
    desc: 'Pilgrims who visit temples verify accuracy of timings, facilities and directions. Your experience helps thousands of future pilgrims.',
    href: '/explore', tag: 'New',
  },
]

const STATS = [
  { number: '362', label: 'Sacred Temples' },
  { number: '46', label: 'Live Darshan Streams' },
  { number: '28', label: 'States Covered' },
  { number: '100%', label: 'Free to Use' },
]

const DEITIES = [
  { name: 'Ganesha', emoji: '🐘', desc: 'New beginnings' },
  { name: 'Shiva', emoji: '🔱', desc: 'Healing & peace' },
  { name: 'Lakshmi', emoji: '🌸', desc: 'Wealth & abundance' },
  { name: 'Durga', emoji: '⚔️', desc: 'Strength & protection' },
  { name: 'Krishna', emoji: '🪈', desc: 'Love & devotion' },
  { name: 'Hanuman', emoji: '💪', desc: 'Courage & health' },
  { name: 'Saraswati', emoji: '📚', desc: 'Knowledge & wisdom' },
  { name: 'Parvati', emoji: '🌙', desc: 'Marriage & family' },
]

const TESTIMONIALS = [
  { quote: 'The AI planner gave me a complete Char Dham itinerary in 2 minutes. It knew which temple opens first in the season.', name: 'Ramesh Kulkarni', loc: 'Pune' },
  { quote: 'The Manifest feature is unlike anything I have seen. I wrote my Sankalp, dedicated it to Siddhivinayak, and kept faith. It worked.', name: 'Priya Sharma', loc: 'Mumbai' },
  { quote: 'First app that actually understands what a pilgrim needs — not just a tourist. I have visited 23 Jyotirlingas using it.', name: 'Savitri Deshpande', loc: 'Nashik' },
  { quote: 'The Navagraha shlokas with YouTube links changed my daily morning routine. I now chant correctly with the right pronunciation.', name: 'Vikram Mehta', loc: 'Ahmedabad' },
]

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", color: '#1A0A00', background: '#FDFAF6' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(160deg, #8B1A1A 0%, #3D0000 60%, #1A0A00 100%)', color: 'white', padding: '80px 24px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(192,87,10,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,26,26,0.2) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 24, color: '#FFD4B0' }}>
            🙏 India's Most Complete Temple Platform
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20, letterSpacing: '-0.02em' }}>
            Every Sacred Temple.<br />
            <span style={{ color: '#FFD4B0' }}>One Divine Companion.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 19px)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, marginBottom: 36, maxWidth: 580, margin: '0 auto 36px' }}>
            362 temples. AI pilgrimage planning. Sacred Sankalp manifestation. Navagraha shanti. Live darshan. All free. All for pilgrims.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'white', color: '#8B1A1A', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              🛕 Explore Temples
            </Link>
            <Link href="/manifest" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              🙏 Write Your Sankalp
            </Link>
            <Link href="/plan" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              🤖 Plan My Yatra
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'white', borderBottom: '1.5px solid #F0EAE4' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#8B1A1A' }}>{s.number}</div>
              <div style={{ fontSize: 13, color: '#A89B8C', fontWeight: 500, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifest Feature — Prominent */}
      <section style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFF0E8)', borderBottom: '1.5px solid #FFD4B0', padding: '60px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ background: '#8B1A1A', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '.08em' }}>New Feature</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 38px)', color: '#8B1A1A', marginBottom: 16, lineHeight: 1.3 }}>
                Manifest — The Ancient Art of Sankalp
              </h2>
              <p style={{ fontSize: 15, color: '#4A3728', lineHeight: 1.85, marginBottom: 20 }}>
                Long before "manifestation" entered modern vocabulary, India had <strong>Sankalp</strong> — a sacred vow made before a deity. Write your intention, dedicate it to the right deity, and commit to a gratitude yatra when it manifests.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {['9 deities with Sanskrit shlokas + YouTube pronunciation links', 'Navagraha Shanti mantras for all 9 planets with beej mantras', 'Private intention journal with fulfilment tracking', 'Gratitude Yatra planning when your Sankalp manifests'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#C0570A', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#4A3728' }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/manifest" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: '#8B1A1A', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                🙏 Explore Manifest
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {DEITIES.map(d => (
                <div key={d.name} style={{ background: 'white', border: '1.5px solid #FFD4B0', borderRadius: 14, padding: '16px 14px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{d.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#8B1A1A' }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: '#A89B8C', marginTop: 3 }}>{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Features */}
      <section style={{ padding: '70px 24px', background: '#FDFAF6' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', color: '#C0570A', marginBottom: 12 }}>Everything You Need</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 36px)', color: '#8B1A1A', marginBottom: 14 }}>Built for the Modern Pilgrim</h2>
            <p style={{ color: '#6B5B4E', maxWidth: 520, margin: '0 auto', lineHeight: 1.7, fontSize: 15 }}>From intention to yatra to gratitude — DivyaDarshan is with you at every step of your spiritual journey.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FEATURES.map(f => (
              <Link key={f.title} href={f.href} style={{ background: 'white', border: '1.5px solid #E8E0D4', borderRadius: 16, padding: '24px 22px', textDecoration: 'none', transition: 'all 0.2s', display: 'block', position: 'relative' }}>
                {f.tag && <span style={{ position: 'absolute', top: 16, right: 16, background: '#FFF0F0', color: '#8B1A1A', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, border: '1px solid #FECACA' }}>{f.tag}</span>}
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: '#8B1A1A', marginBottom: 10, lineHeight: 1.3 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#6B5B4E', lineHeight: 1.75 }}>{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: 'white', borderTop: '1.5px solid #F0EAE4', padding: '70px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.15em', color: '#C0570A', marginBottom: 12 }}>Pilgrim Stories</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 4vw, 34px)', color: '#8B1A1A' }}>From Fellow Pilgrims</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: '#FFF8F0', border: '1.5px solid #FFD4B0', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 14, color: '#C0570A' }}>"</div>
                <p style={{ fontSize: 14, color: '#4A3728', lineHeight: 1.85, marginBottom: 20, fontStyle: 'italic' }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#8B1A1A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: '#1A0A00' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#A89B8C' }}>{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #8B1A1A, #3D0000)', padding: '70px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🛕</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 4vw, 38px)', color: 'white', marginBottom: 16, lineHeight: 1.3 }}>
            Begin Your Sacred Journey
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Join thousands of pilgrims who plan their yatras, write their sankalpas and track their spiritual journey on DivyaDarshan. Free forever.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/signup" style={{ padding: '14px 32px', background: 'white', color: '#8B1A1A', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Create Free Account
            </Link>
            <Link href="/explore" style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.12)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Explore Temples
            </Link>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 20 }}>No credit card. No ads. No spam. Pure pilgrimage. 🙏</p>
        </div>
      </section>

    </main>
  )
}
