'use client'
import { useEffect, useState } from 'react'

const DEFAULT_STATS = [
  { value: '59', label: 'Sacred Temples' },
  { value: '56', label: 'Live Darshan Streams' },
  { value: '12', label: 'Pilgrimage Circuits' },
  { value: '28', label: 'States Covered' },
]

export default function StatsBar() {
  const [templeCount, setTempleCount] = useState('59')

  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(d => { if (d.temples) setTempleCount(String(d.temples)) })
      .catch(() => {})
  }, [])

  const stats = [
    { value: templeCount, label: 'Sacred Temples' },
    { value: '56', label: 'Live Darshan Streams' },
    { value: '12', label: 'Pilgrimage Circuits' },
    { value: '28', label: 'States Covered' },
  ]

  return (
    <div className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--ivory2)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-around flex-wrap gap-4">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <div className="font-serif text-2xl font-medium" style={{ color: 'var(--crimson)', lineHeight: 1 }}>{s.value}</div>
            <div className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: 'var(--muted2)', letterSpacing: '.08em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
