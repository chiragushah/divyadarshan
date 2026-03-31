export default function StatsBar() {
  return (
    <div className="border-b" style={{ background: 'var(--white)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <div className="font-serif text-2xl font-medium" style={{ color: 'var(--crimson)' }}>
                {s.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const STATS = [
  { value: '350+', label: 'Sacred Temples' },
  { value: '56',   label: 'Live Darshan Streams' },
  { value: '12',   label: 'Pilgrimage Circuits' },
  { value: '28',   label: 'States Covered' },
]
