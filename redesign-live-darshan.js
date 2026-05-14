const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

console.log('Rewriting LiveDarshanStatus.tsx...')

const component = `'use client'
import { useEffect, useState } from 'react'

interface LiveSlot {
  day: string
  time: string
  label?: string
}

interface Props {
  liveUrl?: string
  liveSchedule?: LiveSlot[]
  templeName?: string
  deity?: string
}

const DEFAULT_SLOTS: LiveSlot[] = [
  { day: 'everyday', time: '05:00', label: 'Mangala Aarti' },
  { day: 'everyday', time: '07:00', label: 'Morning Darshan' },
  { day: 'everyday', time: '12:00', label: 'Madhyahna Aarti' },
  { day: 'everyday', time: '19:00', label: 'Sandhya Aarti' },
  { day: 'everyday', time: '20:30', label: 'Shayan Aarti' },
]

const DAY_MAP: Record<number, string> = {
  0:'sun',1:'mon',2:'tue',3:'wed',4:'thu',5:'fri',6:'sat'
}

const LIVE_WINDOW = 50 // minutes

function toMin(t: string) {
  const [h, m] = t.split(':').map(Number)
  return (h||0)*60+(m||0)
}

function fmt(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return \`\${h%12||12}:\${String(m).padStart(2,'0')} \${ampm}\`
}

function nowMin(d: Date) { return d.getHours()*60+d.getMinutes() }

function getStatus(slots: LiveSlot[], now: Date) {
  const todayKey = DAY_MAP[now.getDay()]
  const nm = nowMin(now)
  const todaySlots = slots
    .filter(s => s.day==='everyday' || s.day===todayKey)
    .sort((a,b) => toMin(a.time)-toMin(b.time))

  for (const s of todaySlots) {
    const start = toMin(s.time)
    if (nm >= start && nm < start+LIVE_WINDOW) return { isLive:true, slot:s, nextSlot:null, nextDay:'' }
  }

  const next = todaySlots.find(s => toMin(s.time) > nm)
  if (next) return { isLive:false, slot:null, nextSlot:next, nextDay:'Today' }

  const tomorrow = DAY_MAP[(now.getDay()+1)%7]
  const tmrSlots = slots.filter(s => s.day==='everyday'||s.day===tomorrow).sort((a,b)=>toMin(a.time)-toMin(b.time))
  if (tmrSlots.length) return { isLive:false, slot:null, nextSlot:tmrSlots[0], nextDay:'Tomorrow' }

  return { isLive:false, slot:null, nextSlot:DEFAULT_SLOTS[0], nextDay:'Tomorrow' }
}

// Countdown timer
function useCountdown(targetMin: number|null) {
  const [remaining, setRemaining] = useState('')
  useEffect(() => {
    if (targetMin===null) return
    const tick = () => {
      const now = new Date()
      const nm = nowMin(now)
      let diff = targetMin - nm
      if (diff < 0) diff += 24*60
      const h = Math.floor(diff/60)
      const m = diff%60
      setRemaining(h>0 ? \`\${h}h \${m}m\` : \`\${m} min\`)
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [targetMin])
  return remaining
}

export default function LiveDarshanStatus({ liveUrl, liveSchedule, templeName, deity }: Props) {
  const slots = liveSchedule?.length ? liveSchedule : DEFAULT_SLOTS
  const [status, setStatus] = useState<ReturnType<typeof getStatus>|null>(null)
  const [showSchedule, setShowSchedule] = useState(false)

  useEffect(() => {
    const tick = () => setStatus(getStatus(slots, new Date()))
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  const countdown = useCountdown(status?.nextSlot ? toMin(status.nextSlot.time) : null)

  if (!status) return null

  return (
    <div style={{ marginBottom: 24 }}>
      {status.isLive ? (
        /* ── LIVE NOW ── */
        <div style={{
          background: 'linear-gradient(135deg, #0d1f0d, #1a3a1a)',
          border: '1.5px solid rgba(34,197,94,0.4)',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {/* Live banner */}
          <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(34,197,94,0.15)',
                border: '2px solid rgba(34,197,94,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>
                \uD83D\uDED5
              </div>
              <span style={{
                position: 'absolute', top: -2, right: -2,
                width: 14, height: 14, borderRadius: '50%',
                background: '#22c55e',
                border: '2px solid #0d1f0d',
                animation: 'pulse 2s ease infinite',
              }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{
                  background: '#22c55e', color: 'white',
                  fontSize: 9, fontWeight: 800, letterSpacing: '.12em',
                  padding: '2px 7px', borderRadius: 100, textTransform: 'uppercase',
                }}>LIVE NOW</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                  {status.slot?.label || 'Darshan in progress'}
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>
                \uD83D\uDD34 Live Darshan is streaming right now
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>
                Stream active for the next {LIVE_WINDOW-(nowMin(new Date())-toMin(status.slot?.time||'00:00'))} min approx.
              </div>
            </div>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{
                flexShrink: 0,
                background: '#22c55e', color: 'white',
                padding: '10px 18px', borderRadius: 10,
                fontSize: 13, fontWeight: 700, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                \u25B6 Watch Live
              </a>
            )}
          </div>

          {/* Today schedule strip */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '10px 20px', display: 'flex', gap: 8, overflowX: 'auto' }}>
            {slots.filter(s=>s.day==='everyday').map((s,i) => {
              const sm = toMin(s.time)
              const nm = nowMin(new Date())
              const isNow = nm>=sm && nm<sm+LIVE_WINDOW
              return (
                <div key={i} style={{
                  flexShrink: 0,
                  padding: '5px 12px', borderRadius: 8,
                  background: isNow ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.05)',
                  border: \`1px solid \${isNow ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}\`,
                }}>
                  <div style={{ fontSize: 10, color: isNow ? '#22c55e' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                    {isNow ? '\u25CF LIVE' : fmt(s.time)}
                  </div>
                  <div style={{ fontSize: 11, color: isNow ? 'white' : 'rgba(255,255,255,0.6)', fontWeight: 500, marginTop: 1 }}>
                    {s.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* ── NOT LIVE ── */
        <div style={{
          background: '#fff',
          border: '1.5px solid #F0EDE8',
          borderRadius: 16,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(192,87,10,0.08)',
              border: '1.5px solid rgba(192,87,10,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, flexShrink: 0,
            }}>
              \uD83D\uDCFA
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1A0A00', marginBottom: 3 }}>
                Live Darshan not streaming now
              </div>
              {status.nextSlot && (
                <div style={{ fontSize: 13, color: '#6B5B4E' }}>
                  Next: <strong style={{ color: '#8B1A1A' }}>
                    {status.nextDay} {fmt(status.nextSlot.time)}
                  </strong>
                  <span style={{ color: '#A89B8C' }}> \u2014 {status.nextSlot.label}</span>
                  {countdown && (
                    <span style={{
                      marginLeft: 8,
                      background: '#FFF5F0', color: '#C0570A',
                      fontSize: 11, fontWeight: 700,
                      padding: '2px 8px', borderRadius: 100, border: '1px solid #FFD4B8',
                    }}>
                      in {countdown}
                    </span>
                  )}
                </div>
              )}
            </div>
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{
                flexShrink: 0,
                background: '#8B1A1A', color: 'white',
                padding: '8px 16px', borderRadius: 10,
                fontSize: 12, fontWeight: 700, textDecoration: 'none',
              }}>
                \uD83D\uDD14 Open Channel
              </a>
            )}
          </div>

          {/* Aarti schedule */}
          <div style={{ borderTop: '1px solid #F0EDE8', background: '#FDFAF6' }}>
            <button onClick={() => setShowSchedule(!showSchedule)}
              style={{
                width: '100%', padding: '10px 20px',
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6B5B4E' }}>
                \uD83D\uDD52 Today's Darshan Schedule
              </span>
              <span style={{ fontSize: 12, color: '#A89B8C' }}>{showSchedule ? '\u25B2 Hide' : '\u25BC View all'}</span>
            </button>

            {showSchedule && (
              <div style={{ padding: '0 20px 16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 8 }}>
                {slots.filter(s=>s.day==='everyday').map((s,i) => {
                  const nm = nowMin(new Date())
                  const sm = toMin(s.time)
                  const isPast = nm > sm + LIVE_WINDOW
                  const isNext = status.nextSlot?.time === s.time
                  return (
                    <div key={i} style={{
                      padding: '10px 12px', borderRadius: 10,
                      background: isNext ? '#FFF5F0' : isPast ? '#F8F8F8' : 'white',
                      border: \`1px solid \${isNext ? '#FFD4B8' : '#F0EDE8'}\`,
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: isNext ? '#C0570A' : isPast ? '#C0B4A8' : '#1A0A00' }}>
                        {fmt(s.time)}
                        {isNext && <span style={{ marginLeft: 6, fontSize: 9, background: '#C0570A', color: 'white', padding: '1px 6px', borderRadius: 100 }}>NEXT</span>}
                        {isPast && <span style={{ marginLeft: 6, fontSize: 9, color: '#C0B4A8' }}>Done</span>}
                      </div>
                      <div style={{ fontSize: 11, color: isNext ? '#C0570A' : '#A89B8C', marginTop: 2 }}>{s.label}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{\`
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.5; transform:scale(1.4); }
        }
      \`}</style>
    </div>
  )
}
`

fs.writeFileSync(path.join(P, 'components/temple/LiveDarshanStatus.tsx'), component, 'utf8')
console.log('OK: LiveDarshanStatus.tsx rewritten')

process.chdir(P)
execSync('git add "components/temple/LiveDarshanStatus.tsx"', { stdio: 'inherit' })
execSync('git commit -m "feat: beautiful live darshan status - countdown timer, schedule, honest status"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
