'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBanner() {
  const [ann, setAnn] = useState<any>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetch('/api/admin/announcement')
      .then(r => r.json())
      .then(d => { if (d.announcement) setAnn(d.announcement) })
      .catch(() => {})
  }, [])

  if (!ann || dismissed) return null

  const bg = ann.type === 'success'
    ? 'rgba(16,185,129,.12)'
    : ann.type === 'warning'
    ? 'rgba(245,158,11,.12)'
    : 'rgba(59,130,246,.1)'

  const border = ann.type === 'success'
    ? '1px solid rgba(16,185,129,.25)'
    : ann.type === 'warning'
    ? '1px solid rgba(245,158,11,.25)'
    : '1px solid rgba(59,130,246,.2)'

  const color = ann.type === 'success' ? '#065F46' : ann.type === 'warning' ? '#92400E' : '#1E3A5F'

  return (
    <div style={{ background: bg, border: `border-bottom: ${border}`, borderBottom: border, padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <p style={{ fontSize: 13, color, fontWeight: 500, flex: 1, textAlign: 'center' }}>
        {ann.message}
      </p>
      <button onClick={() => setDismissed(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color, opacity: .6, flexShrink: 0 }}>
        <X size={15} />
      </button>
    </div>
  )
}
