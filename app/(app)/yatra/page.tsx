export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'My Yatra — DivyaDarshanam' }

export default function YatraPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="section-title">Your Pilgrimage Life</div>
      <h1 className="font-serif text-4xl font-medium mb-2">My Yatra</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--muted)' }}>Your personal pilgrimage hub — journal, savings, planning, and memories.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {YATRA_SECTIONS.map(s => (
          <Link key={s.href} href={s.href}
            className="card card-p group hover:-translate-y-1 transition-all duration-200 flex flex-col block">
            <div className="text-3xl mb-3">{s.icon}</div>
            <h2 className="font-serif text-xl font-medium mb-1.5">{s.title}</h2>
            <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>{s.desc}</p>
            <div className="mt-4 text-xs font-semibold" style={{ color: 'var(--crimson)' }}>{s.cta} →</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const YATRA_SECTIONS = [
  { icon: '📖', title: 'My Journal', desc: 'Log every temple visit with photos, feelings and star ratings. Your lifetime pilgrimage diary.', cta: 'Open journal', href: '/yatra/journal' },
  { icon: '💰', title: 'Savings Goals', desc: 'Set monthly targets for your next yatra. Track deposits and link to FinVerse for real savings.', cta: 'View goals', href: '/yatra/goals' },
  { icon: '👥', title: 'Group Split', desc: 'Plan group yatras fairly. Log expenses, calculate who owes what, share on WhatsApp.', cta: 'Split expenses', href: '/yatra/split' },
  { icon: '⭐', title: 'Temple Reviews', desc: 'Read and write reviews from the pilgrim community. Share what moved you.', cta: 'View reviews', href: '/yatra/reviews' },
]
