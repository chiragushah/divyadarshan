'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChefHat, Search } from 'lucide-react'
import type { DietTag } from '@/lib/data/prasad/diet'

export interface IndexDish { id: string; name: string; summary: string; category: string; variants: { id: string; region: string; tags: DietTag[] }[] }

const FILTERS: { id: DietTag; label: string; hint: string }[] = [
  { id: 'jain', label: 'Jain-friendly', hint: 'No onion, garlic, root vegetables, fresh ginger or honey' },
  { id: 'vegan', label: 'Vegan', hint: 'No milk, ghee, curd, khoa, butter or honey' },
  { id: 'vrat', label: 'Fasting-friendly', hint: 'No grains or pulses (Ekadashi-style). Use rock salt if needed' },
  { id: 'no-onion-garlic', label: 'No onion or garlic', hint: 'Free of onion and garlic' },
]

export default function RecipeIndexClient({ dishes, order }: { dishes: IndexDish[]; order: string[] }) {
  const [on, setOn] = useState<DietTag[]>([])
  const [q, setQ] = useState('')

  const toggle = (t: DietTag) => setOn(x => (x.includes(t) ? x.filter(y => y !== t) : [...x, t]))
  const fits = (tags: DietTag[]) => on.every(t => tags.includes(t))

  const view = useMemo(() => {
    const query = q.trim().toLowerCase()
    return dishes
      .map(d => ({ ...d, vs: d.variants.filter(v => fits(v.tags)) }))
      .filter(d => d.vs.length > 0)
      .filter(d => !query || `${d.name} ${d.summary} ${d.variants.map(v => v.region).join(' ')}`.toLowerCase().includes(query))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishes, on, q])

  const totalVariants = view.reduce((a, d) => a + d.vs.length, 0)
  const groups = order.map(cat => ({ cat, items: view.filter(d => d.category === cat) })).filter(g => g.items.length)

  return (
    <>
      <div className="card" style={{ padding: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Search size={18} style={{ color: 'var(--muted2)', flexShrink: 0 }} />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search a prasad or a state — modak, Kerala, kheer…" className="input" style={{ border: 'none', flex: 1, padding: '4px 0' }} />
      </div>

      <div style={{ marginBottom: 6 }}>
        <div className="section-title" style={{ marginBottom: 8 }}>Dietary needs</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {FILTERS.map(f => {
            const a = on.includes(f.id)
            return (
              <button key={f.id} onClick={() => toggle(f.id)} title={f.hint} aria-pressed={a}
                style={{ padding: '8px 15px', borderRadius: 100, fontSize: 13.5, fontWeight: 700, cursor: 'pointer', border: `1.5px solid ${a ? '#166534' : 'var(--ivory3)'}`, background: a ? '#166534' : 'white', color: a ? 'white' : 'var(--ink2)' }}>
                {f.label}
              </button>
            )
          })}
          {on.length > 0 && <button onClick={() => setOn([])} style={{ background: 'none', border: 'none', color: 'var(--crimson)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Clear</button>}
        </div>
        {on.length > 0 && (
          <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6, margin: '10px 0 0' }}>
            {on.map(t => FILTERS.find(f => f.id === t)!.hint).join(' · ')}. Tags describe each recipe <em>as written</em>; families and temples differ, so please check the ingredients against your own rules.
          </p>
        )}
      </div>

      <p style={{ fontSize: 13, color: 'var(--muted2)', margin: '14px 0 20px' }}>{view.length} prasad · {totalVariants} regional versions{on.length || q ? ' match' : ''}</p>

      {groups.map(g => (
        <section key={g.cat} style={{ marginBottom: 36 }}>
          <h2 className="font-serif" style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
            <span style={{ borderBottom: '3px solid var(--crimson)', paddingBottom: 2 }}>{g.cat}</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 16 }}>
            {g.items.map(r => (
              <div key={r.id} className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link href={`/festivals/prasad/${r.id}${r.vs.length < r.variants.length ? `?v=${r.vs[0].id}` : ''}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ChefHat size={16} style={{ color: 'var(--crimson)', flexShrink: 0 }} />
                  <span className="font-serif" style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</span>
                </Link>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>{r.summary}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  {r.vs.map(v => (
                    <Link key={v.id} href={`/festivals/prasad/${r.id}?v=${v.id}`} style={{ textDecoration: 'none', fontSize: 11.5, fontWeight: 600, color: 'var(--crimson)', background: '#8B1A1A12', border: '1px solid #8B1A1A33', borderRadius: 100, padding: '2px 9px' }}>
                      {v.region.split(' (')[0]}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      {groups.length === 0 && (
        <div className="card card-p" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)' }}>Nothing matches that combination. Try removing a filter — for example, Vegan and Fasting-friendly together are rare because most prasad uses ghee.</p>
        </div>
      )}
    </>
  )
}
