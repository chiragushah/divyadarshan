import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, ShieldCheck, Users, Clock } from 'lucide-react'
import { KULDEVI, getKuldevi } from '@/lib/data/kuldevi'

export function generateStaticParams() { return KULDEVI.map(k => ({ slug: k.slug })) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const k = getKuldevi(params.slug)
  return k ? { title: `${k.name} — ${k.place}, ${k.state} | Kuldevi Directory`, description: k.summary.slice(0, 160) } : {}
}

export default function KuldeviDetail({ params }: { params: { slug: string } }) {
  const k = getKuldevi(params.slug)
  if (!k) notFound()
  const sourced = k.confidence === 'sourced'
  const related = (k.related || []).map(getKuldevi).filter(Boolean)
  return (
    <div className="max-w-4xl mx-auto" style={{ padding: '28px 24px 60px' }}>
      <Link href="/kuldevi" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--crimson)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 14 }}><ArrowLeft size={15} /> Kuldevi directory</Link>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', fontSize: 12, fontWeight: 700, borderRadius: 100, padding: '4px 12px', background: sourced ? '#ecfdf5' : '#fff7ed', color: sourced ? '#047857' : '#C0570A' }}>
          {sourced ? <><ShieldCheck size={13} /> Sourced</> : <><Users size={13} /> Family-shared · unverified</>}
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, borderRadius: 100, padding: '4px 12px', background: 'var(--ivory2)', color: 'var(--muted)' }}>{k.kind}</span>
      </div>
      <h1 className="font-serif" style={{ fontSize: 'clamp(28px, 4.5vw, 38px)', fontWeight: 600, lineHeight: 1.15 }}>{k.name}</h1>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--muted)', fontSize: 14, margin: '6px 0 16px' }}><MapPin size={15} /> {k.place}{k.district && !k.district.startsWith('Not yet') ? `, ${k.district}` : ''}, {k.state} · {k.communities.join(', ')}</div>
      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink2)', marginBottom: 20 }}>{k.summary}</p>

      <div style={{ background: sourced ? '#f0fdf4' : '#fffbeb', border: `1px solid ${sourced ? '#bbf7d0' : '#fde68a'}`, borderRadius: 12, padding: '12px 16px', fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>
        <strong>{sourced ? 'How sure are we? ' : 'Please note: '}</strong>{k.confidenceNote}
      </div>

      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>What we know</h2>
      <dl style={{ display: 'grid', gap: 12, marginBottom: 26 }}>
        {k.facts.map(f => (
          <div key={f.label} style={{ borderLeft: '3px solid var(--saffron)', paddingLeft: 12 }}>
            <dt style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>{f.label}</dt>
            <dd style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink2)', margin: '2px 0 0' }}>{f.value}</dd>
          </div>
        ))}
      </dl>

      {k.timings && (
        <>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, display: 'flex', gap: 8, alignItems: 'center' }}><Clock size={18} /> Daily timings</h2>
          <div className="card" style={{ marginBottom: 26, overflow: 'hidden' }}>
            {k.timings.map((t, i) => (
              <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 16px', fontSize: 14, background: i % 2 ? 'var(--ivory2)' : 'white' }}>
                <span style={{ fontWeight: 600 }}>{t.label}</span><span style={{ color: 'var(--ink2)' }}>{t.value}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Sources</h2>
      <ul style={{ paddingLeft: 18, fontSize: 14, lineHeight: 1.8, marginBottom: 26 }}>
        {k.sources.map(s => <li key={s.title}>{s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--crimson)' }}>{s.title}</a> : s.title}</li>)}
      </ul>

      {related.length > 0 && (
        <p style={{ fontSize: 14, marginBottom: 20 }}>Related: {related.map((r: any, i) => <span key={r.slug}>{i > 0 && ' · '}<Link href={`/kuldevi/${r.slug}`} style={{ color: 'var(--crimson)', fontWeight: 600 }}>{r.name}</Link></span>)}</p>
      )}

      <div style={{ background: 'var(--ivory2)', border: '1px solid var(--ivory3)', borderRadius: 14, padding: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Know something we don’t?</div>
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 12px' }}>Families are the best source for a kuldevi. Add what your family knows, and tell us how sure you are.</p>
        <Link href="/kuldevi/submit" className="btn btn-primary">Add your family’s kuldevi</Link>
      </div>
    </div>
  )
}
