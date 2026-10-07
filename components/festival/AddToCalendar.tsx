'use client'
import { useState } from 'react'
import { CalendarPlus, Check } from 'lucide-react'
import { buildICS } from '@/lib/festivalDates'

export default function AddToCalendar({ title, dateISO, description, url, compact }:
  { title: string; dateISO: string; description?: string; url?: string; compact?: boolean }) {
  const [done, setDone] = useState(false)

  function handle() {
    try {
      const ics = buildICS({ title, date: new Date(dateISO), description, url })
      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
      const href = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = href
      a.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(href), 1000)
      setDone(true)
      setTimeout(() => setDone(false), 2500)
    } catch { /* no-op */ }
  }

  return (
    <button onClick={handle}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
        padding: compact ? '5px 11px' : '7px 14px', borderRadius: 8,
        fontSize: compact ? 12 : 13, fontWeight: 600,
        border: '1.5px solid var(--crimson)',
        background: done ? 'var(--crimson)' : 'white',
        color: done ? 'white' : 'var(--crimson)',
        transition: 'all .15s', whiteSpace: 'nowrap',
      }}>
      {done ? <><Check size={14} /> Reminder added</> : <><CalendarPlus size={14} /> Add reminder</>}
    </button>
  )
}
