import { computePrep, type PrepInput } from '@/lib/templePrep'
import { Flower2, Shirt, Backpack, Ban, ListChecks, Info } from 'lucide-react'

function Block({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8, color: 'var(--ink)', fontWeight: 700, fontSize: 13 }}>
        <span style={{ color: 'var(--saffron)', display: 'flex' }}>{icon}</span> {title}
      </div>
      {children}
    </div>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
      {items.map((s, i) => <li key={i} style={{ marginBottom: 5 }}>{s}</li>)}
    </ul>
  )
}

export default function KnowBeforeYouGo({ temple }: { temple: PrepInput }) {
  const p = computePrep(temple)

  return (
    <div className="mb-8">
      <h2 className="font-serif text-2xl font-medium mb-1">Know Before You Go</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--muted2)' }}>
        What to offer, what to wear, what to carry — and the darshan etiquette
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
        <Block icon={<Flower2 size={16} />} title="Customary offerings">
          <List items={p.offerings} />
          {p.offeringNote && (
            <p style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 8, marginBottom: 0, fontStyle: 'italic' }}>{p.offeringNote}</p>
          )}
        </Block>

        <Block icon={<Shirt size={16} />} title="Dress code">
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{p.dress}</p>
        </Block>

        <Block icon={<Backpack size={16} />} title="What to carry">
          <List items={p.carry} />
        </Block>

        <Block icon={<Ban size={16} />} title="What to avoid">
          <List items={p.avoid} />
        </Block>

        <Block icon={<ListChecks size={16} />} title="Darshan etiquette">
          <List items={p.etiquette} />
        </Block>
      </div>

      <p style={{ fontSize: 11, color: 'var(--muted2)', lineHeight: 1.55, marginTop: 10 }}>
        <Info size={12} style={{ verticalAlign: '-1px', marginRight: 4 }} />
        General guidance based on the deity and temple customs. Individual temples may have their own rules — always follow the signage and the priests on site.
      </p>
    </div>
  )
}
