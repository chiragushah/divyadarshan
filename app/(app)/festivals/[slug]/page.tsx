import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin } from 'lucide-react'
import { FESTIVALS, getFestival, templeHref } from '@/lib/data/festivals'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return FESTIVALS.map(f => ({ slug: f.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const f = getFestival(params.slug)
  if (!f) return { title: 'Festival — DivyaDarshanam' }
  return {
    title: `${f.name} — Significance, Rituals, Food, Dance & Temples | DivyaDarshanam`,
    description: f.significance.slice(0, 160),
  }
}

export default function FestivalDetailPage({ params }: Props) {
  const f = getFestival(params.slug)
  if (!f) notFound()

  const facts: { label: string; value: string }[] = [
    { label: 'Deity worshipped', value: f.deity },
    { label: 'When', value: f.whenText },
    { label: 'Hindu calendar', value: f.calendarBasis },
    { label: 'Duration', value: f.duration },
    { label: 'Celebrated in', value: f.regionText },
  ]

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${f.accent} 0%, ${f.accent}cc 100%)`, color: 'white', padding: '28px 24px 48px' }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/festivals" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
            <ArrowLeft size={15} /> All festivals
          </Link>
          <div style={{ fontSize: 48, lineHeight: 1 }}>{f.emoji}</div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', opacity: 0.9, marginTop: 14 }}>
            {f.season} · {f.deityGroup}
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 600, lineHeight: 1.1, marginTop: 4, color: 'white' }}>{f.name}</h1>
          {f.alsoKnown && <p style={{ fontSize: 15, opacity: 0.9, marginTop: 6, fontStyle: 'italic' }}>{f.alsoKnown}</p>}
          {f.greeting && (
            <div style={{ marginTop: 16, display: 'inline-block', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 16px', borderRadius: 100, fontSize: 15, fontWeight: 600 }}>
              {f.greeting}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Quick facts */}
        <div className="card card-p" style={{ marginTop: -36, marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 18 }}>
            {facts.map(fact => (
              <div key={fact.label}>
                <div className="section-title" style={{ marginBottom: 4 }}>{fact.label}</div>
                <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.45 }}>{fact.value}</div>
              </div>
            ))}
          </div>
          {f.deityNote && (
            <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--ivory3)', lineHeight: 1.65 }}>
              {f.deityNote}
            </p>
          )}
        </div>

        {/* Significance */}
        <Section title="Significance — why we celebrate" accent={f.accent}>
          <p style={{ fontSize: 15.5, color: 'var(--ink2)', lineHeight: 1.8 }}>{f.significance}</p>
        </Section>

        {/* How to celebrate vs how it is celebrated */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 18, marginBottom: 28 }}>
          <ListCard title="How it should be celebrated" subtitle="The traditional / prescribed way" items={f.howToCelebrate} accent={f.accent} icon="📜" />
          <ListCard title="How it is celebrated" subtitle="Living customs, region by region" items={f.howCelebrated} accent={f.accent} icon="🎉" />
        </div>

        {/* Food & Prasad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 18, marginBottom: 28 }}>
          <TagCard title="Festive food" subtitle="What is cooked & eaten" items={f.food} accent={f.accent} icon="🍲" />
          <TagCard title="Prasad & offerings" subtitle="What is offered to the deity" items={f.prasad} accent={f.accent} icon="🪔" />
        </div>

        {/* Dance */}
        <Section title="Dance & performing arts" accent={f.accent} icon="💃">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {f.dance.map((d, i) => (
              <div key={i} style={{ background: 'var(--ivory2)', borderRadius: 12, padding: 16, border: '1px solid var(--ivory3)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{d.name}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{d.note}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Temples to visit */}
        <Section title="Temples to visit for this festival" accent={f.accent} icon="🛕">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {f.temples.map((t, i) => (
              <Link key={i} href={templeHref(t)} className="card" style={{ textDecoration: 'none', padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <MapPin size={16} style={{ color: f.accent, flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35 }}>{t.name}</span>
                </div>
                {t.place && <div style={{ fontSize: 13, color: 'var(--muted)', paddingLeft: 24 }}>{t.place}</div>}
                <span style={{ fontSize: 12, color: 'var(--crimson)', fontWeight: 600, paddingLeft: 24, marginTop: 2 }}>
                  {t.slug ? 'View temple →' : 'Find on DivyaDarshanam →'}
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {/* Tip */}
        {f.tip && (
          <div className="card card-p" style={{ background: 'var(--ivory2)', borderLeft: `4px solid ${f.accent}`, marginBottom: 28 }}>
            <div className="section-title" style={{ marginBottom: 6 }}>💡 Insider tip</div>
            <p style={{ fontSize: 14.5, color: 'var(--ink2)', lineHeight: 1.7, margin: 0 }}>{f.tip}</p>
          </div>
        )}

        {/* Footer nav */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <Link href="/festivals" className="btn btn-secondary">← All festivals</Link>
          <Link href="/explore" className="btn btn-primary">Explore temples</Link>
          <Link href="/plan/calendar" className="btn btn-ghost">Festival calendar</Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children, accent, icon }: { title: string; children: React.ReactNode; accent: string; icon?: string }) {
  return (
    <div className="card card-p" style={{ marginBottom: 28 }}>
      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        {icon && <span style={{ fontSize: 22 }}>{icon}</span>}
        <span style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 2 }}>{title}</span>
      </h2>
      {children}
    </div>
  )
}

function ListCard({ title, subtitle, items, accent, icon }: { title: string; subtitle: string; items: string[]; accent: string; icon: string }) {
  return (
    <div className="card card-p">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h3 className="font-serif" style={{ fontSize: 18, fontWeight: 600 }}>{title}</h3>
      </div>
      <div className="section-title" style={{ marginBottom: 14 }}>{subtitle}</div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink2)', lineHeight: 1.6 }}>
            <span style={{ color: accent, fontWeight: 800, flexShrink: 0 }}>›</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TagCard({ title, subtitle, items, accent, icon }: { title: string; subtitle: string; items: string[]; accent: string; icon: string }) {
  return (
    <div className="card card-p">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <h3 className="font-serif" style={{ fontSize: 18, fontWeight: 600 }}>{title}</h3>
      </div>
      <div className="section-title" style={{ marginBottom: 14 }}>{subtitle}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((it, i) => (
          <span key={i} style={{
            background: `${accent}12`, color: 'var(--ink2)', border: `1px solid ${accent}33`,
            padding: '7px 12px', borderRadius: 10, fontSize: 13, lineHeight: 1.4,
          }}>{it}</span>
        ))}
      </div>
    </div>
  )
}
