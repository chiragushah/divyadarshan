'use client'
import { useEffect, useState } from 'react'

interface LiveSlot {
  day: string
  time: string   // "HH:MM" 24hr
  label?: string
}

interface Props {
  liveUrl?: string
  liveSchedule?: LiveSlot[]
  timing?: string  // fallback: raw timing string e.g. "5:00 AM – 12:00 PM, 4:00 PM – 9:00 PM"
}

// Default darshan slots used when no schedule is configured
const DEFAULT_SLOTS: LiveSlot[] = [
  { day: 'everyday', time: '05:00', label: 'Morning Aarti' },
  { day: 'everyday', time: '12:00', label: 'Madhyahna Darshan' },
  { day: 'everyday', time: '19:00', label: 'Sandhya Aarti' },
]

const DAY_MAP: Record<number, string> = {
  0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri', 6: 'sat',
}

function parseTime(t: string): { h: number; m: number } {
  const [h, m] = t.split(':').map(Number)
  return { h: h || 0, m: m || 0 }
}

function minutesNow(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}

function slotMinutes(slot: LiveSlot): number {
  const { h, m } = parseTime(slot.time)
  return h * 60 + m
}

// A slot is "live" for 45 minutes from its start time
const LIVE_WINDOW_MINUTES = 45

function getStatus(slots: LiveSlot[], now: Date): {
  isLive: boolean
  liveLabel?: string
  nextTime?: string
  nextLabel?: string
  nextDay?: string
} {
  const todayKey = DAY_MAP[now.getDay()]
  const nowMin   = minutesNow(now)

  const todaySlots = slots.filter(s => s.day === 'everyday' || s.day === todayKey)
    .sort((a, b) => slotMinutes(a) - slotMinutes(b))

  // Check if currently live
  for (const slot of todaySlots) {
    const start = slotMinutes(slot)
    if (nowMin >= start && nowMin < start + LIVE_WINDOW_MINUTES) {
      return { isLive: true, liveLabel: slot.label }
    }
  }

  // Find next slot today
  const nextToday = todaySlots.find(s => slotMinutes(s) > nowMin + LIVE_WINDOW_MINUTES)
  if (nextToday) {
    const { h, m } = parseTime(nextToday.time)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12  = h % 12 || 12
    const mm   = String(m).padStart(2, '0')
    return {
      isLive: false,
      nextTime: `${h12}:${mm} ${ampm}`,
      nextLabel: nextToday.label,
      nextDay: 'Today',
    }
  }

  // Find next slot tomorrow
  const tomorrowKey = DAY_MAP[(now.getDay() + 1) % 7]
  const tomorrowSlots = slots
    .filter(s => s.day === 'everyday' || s.day === tomorrowKey)
    .sort((a, b) => slotMinutes(a) - slotMinutes(b))

  if (tomorrowSlots.length > 0) {
    const next = tomorrowSlots[0]
    const { h, m } = parseTime(next.time)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12  = h % 12 || 12
    const mm   = String(m).padStart(2, '0')
    return {
      isLive: false,
      nextTime: `${h12}:${mm} ${ampm}`,
      nextLabel: next.label,
      nextDay: 'Tomorrow',
    }
  }

  return { isLive: false }
}

export default function LiveDarshanStatus({ liveUrl, liveSchedule, timing }: Props) {
  const [status, setStatus] = useState<ReturnType<typeof getStatus> | null>(null)

  const slots = (liveSchedule && liveSchedule.length > 0) ? liveSchedule : DEFAULT_SLOTS

  useEffect(() => {
    const update = () => setStatus(getStatus(slots, new Date()))
    update()
    const interval = setInterval(update, 30_000) // refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (!status) return null

  if (status.isLive) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: 'rgba(22,163,74,.08)',
        border: '1.5px solid rgba(22,163,74,.25)',
        borderRadius: 12,
        marginBottom: 16,
      }}>
        <span className="live-dot" style={{ width: 10, height: 10, flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#166534' }}>
            🔴 Live Darshan is ON right now
          </div>
          {status.liveLabel && (
            <div style={{ fontSize: 11, color: '#166534', opacity: .75, marginTop: 2 }}>
              {status.liveLabel}
            </div>
          )}
        </div>
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noopener"
            style={{
              marginLeft: 'auto',
              padding: '5px 12px',
              background: '#166534',
              color: 'white',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: 'none',
              flexShrink: 0,
            }}>
            Watch Live →
          </a>
        )}
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      background: 'rgba(192,87,10,.06)',
      border: '1.5px solid rgba(192,87,10,.2)',
      borderRadius: 12,
      marginBottom: 16,
    }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>📺</span>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--saffron)' }}>
          Live Darshan not available right now
        </div>
        {status.nextTime ? (
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            Next: <strong style={{ color: 'var(--ink)' }}>{status.nextDay} at {status.nextTime}</strong>
            {status.nextLabel && <span style={{ color: 'var(--muted2)' }}> — {status.nextLabel}</span>}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            Check the temple&apos;s official website for schedule
          </div>
        )}
      </div>
      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener"
          style={{
            marginLeft: 'auto',
            padding: '5px 12px',
            background: 'transparent',
            color: 'var(--saffron)',
            border: '1px solid rgba(192,87,10,.3)',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            textDecoration: 'none',
            flexShrink: 0,
          }}>
          Set Reminder
        </a>
      )}
    </div>
  )
}
