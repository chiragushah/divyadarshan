'use client'
// v3 - clean card with aarti schedule, no broken iframe

interface Props {
  liveUrl: string
  templeName: string
  channelId?: string
}

const AARTI_SCHEDULE: Record<string, { time: string; name: string }[]> = {
  'Kashi Vishwanath Temple': [
    { time: '2:30 AM', name: 'Mangala Aarti' },
    { time: '11:15 AM', name: 'Bhog Aarti' },
    { time: '12:20 PM', name: 'Saptarishi Aarti' },
    { time: '7:00 PM', name: 'Sandhya Aarti' },
    { time: '10:30 PM', name: 'Shringaar Aarti' },
  ],
  'Tirupati Venkateswara Temple': [
    { time: '5:30 AM', name: 'Thiruvanandal' },
    { time: '9:00 AM', name: 'Viswarupa Darshanam' },
    { time: '12:00 PM', name: 'Noon Darshan' },
    { time: '6:00 PM', name: 'Doopa Darshanam' },
  ],
  'Shirdi Sai Baba Temple': [
    { time: '5:00 AM', name: 'Kakad Aarti' },
    { time: '12:00 PM', name: 'Madhyan Aarti' },
    { time: '6:00 PM', name: 'Dhoop Aarti' },
    { time: '10:30 PM', name: 'Shej Aarti' },
  ],
  default: [
    { time: '5:00 AM', name: 'Morning Aarti' },
    { time: '12:00 PM', name: 'Madhyan Aarti' },
    { time: '7:00 PM', name: 'Sandhya Aarti' },
  ],
}

function getNextAarti(schedule: { time: string; name: string }[]) {
  const now = new Date()
  const currentMins = now.getHours() * 60 + now.getMinutes()
  for (const aarti of schedule) {
    const [h, m] = aarti.time.split(':').map(Number)
    const aartiMins = h * 60 + m
    if (aartiMins > currentMins) return aarti
  }
  return schedule[0] // tomorrow's first aarti
}

export default function LiveDarshanPlayer({ liveUrl, templeName }: Props) {
  const schedule = AARTI_SCHEDULE[templeName] || AARTI_SCHEDULE.default
  const nextAarti = getNextAarti(schedule)

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 100%)',
      borderRadius: 16,
      overflow: 'hidden',
      border: '1.5px solid rgba(139,26,26,0.3)',
      marginBottom: 32,
    }}>
      {/* Header */}
      <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444', animation: 'livepulse 2s infinite', flexShrink: 0 }} />
        <style>{`@keyframes livepulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '.05em' }}>LIVE DARSHAN</span>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>•</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{templeName}</span>
      </div>

      {/* Main content */}
      <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ fontSize: 56 }}>🛕</div>

        {/* Next aarti */}
        <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 20px', textAlign: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>Next Darshan</div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{nextAarti.time}</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 }}>{nextAarti.name}</div>
        </div>

        {/* Aarti schedule */}
        <div style={{ width: '100%', maxWidth: 320 }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10, textAlign: 'center' }}>Today's Aarti Schedule</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {schedule.map((a, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{a.name}</span>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Watch button */}
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#fff',
            padding: '13px 32px',
            borderRadius: 10,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 20px rgba(239,68,68,0.3)',
            marginTop: 4,
          }}
        >
          🔴 Watch Live Darshan
        </a>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, margin: 0, textAlign: 'center' }}>
          Live stream active during aarti timings
        </p>
      </div>
    </div>
  )
}
