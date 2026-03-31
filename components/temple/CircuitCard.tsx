import Link from 'next/link'

interface Circuit {
  id: string
  name: string
  region: string
  temple_count: number
  duration_days: string
  budget_range: string
  tags: string[]
  description: string
}

export default function CircuitCard({ circuit }: { circuit: Circuit }) {
  return (
    <Link href={`/circuit/${circuit.id}`}
      className="card card-p group hover:-translate-y-1 transition-all duration-200 flex flex-col block">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-serif font-bold flex-shrink-0"
          style={{ background: 'var(--crimson)', color: 'rgba(255,255,255,.5)' }}>
          {circuit.temple_count}
        </div>
        <div>
          <h3 className="font-serif text-lg font-medium leading-tight" style={{ color: 'var(--ink)' }}>
            {circuit.name}
          </h3>
          <p className="text-xs" style={{ color: 'var(--muted2)' }}>{circuit.region}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed flex-1 mb-3" style={{ color: 'var(--muted)' }}>
        {circuit.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {circuit.tags.map(tag => (
          <span key={tag} className="badge-gold text-[9px]">{tag}</span>
        ))}
      </div>

      <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border)' }}>
        <div style={{ color: 'var(--muted2)' }}>
          {circuit.duration_days} · {circuit.budget_range}
        </div>
        <span className="font-semibold" style={{ color: 'var(--crimson)' }}>Explore →</span>
      </div>
    </Link>
  )
}
