import { computeBestTime, type BestTimeInput } from '@/lib/bestTime'
import { Clock, CalendarDays, Sun, Moon, TriangleAlert, Sparkles, Info, CircleCheck } from 'lucide-react'

export default function BestTimeToVisit({ temple }: { temple: BestTimeInput }) {
  const r = computeBestTime(temple)

  return (
    <div className="mb-8">
      <h2 className="font-serif text-2xl font-medium mb-1">Best Time to Visit</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--muted2)' }}>
        When to go for the calmest darshan — and the days to avoid
      </p>

      {/* Headline recommendation */}
      <div className="card" style={{ padding: 16, marginBottom: 14, background: 'rgba(192,87,10,.06)', border: '1.5px solid rgba(192,87,10,.2)' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <Sparkles size={18} style={{ color: 'var(--saffron)', flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink)', margin: 0 }}>{r.overall}</p>
        </div>
      </div>

      {/* Quietest vs busiest days */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 14 }}>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8, color: '#166534', fontWeight: 700, fontSize: 13 }}>
            <CircleCheck size={16} /> Quietest days
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {r.quietDays.map(d => (
              <span key={d} style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 100, background: '#DCFCE7', color: '#166534' }}>{d}</span>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8, color: '#B42318', fontWeight: 700, fontSize: 13 }}>
            <TriangleAlert size={16} /> Busiest days
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {r.busyDays.map(d => (
              <span key={d} style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 100, background: '#FEE4E2', color: '#B42318' }}>{d}</span>
            ))}
            <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 100, background: '#FEE4E2', color: '#B42318' }}>Weekends</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 14 }}>{r.deityNote}</p>

      {/* Daily rhythm */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 14 }}>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8, color: 'var(--ink)', fontWeight: 700, fontSize: 13 }}>
            <Sun size={16} style={{ color: 'var(--saffron)' }} /> Best windows in the day
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
            {r.dailyBest.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
          </ul>
        </div>
        <div className="card" style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8, color: 'var(--ink)', fontWeight: 700, fontSize: 13 }}>
            <Clock size={16} style={{ color: '#B42318' }} /> When it’s busiest
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
            {r.dailyAvoid.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
          </ul>
        </div>
      </div>

      {/* Temple's own timing / curated best-time note, if present */}
      {(r.templeTiming || r.templeBestTime) && (
        <div className="card" style={{ padding: 14, marginBottom: 14 }}>
          {r.templeTiming && (
            <div style={{ fontSize: 13, color: 'var(--ink)', marginBottom: r.templeBestTime ? 6 : 0 }}>
              <Clock size={14} style={{ verticalAlign: '-2px', marginRight: 6, color: 'var(--saffron)' }} />
              <strong>Timings:</strong> {r.templeTiming}
            </div>
          )}
          {r.templeBestTime && (
            <div style={{ fontSize: 13, color: 'var(--ink)' }}>
              <Info size={14} style={{ verticalAlign: '-2px', marginRight: 6, color: 'var(--saffron)' }} />
              <strong>Note:</strong> {r.templeBestTime}
            </div>
          )}
        </div>
      )}

      {/* Lunar / eclipse rush */}
      <div className="card" style={{ padding: 14, marginBottom: 14, display: 'flex', gap: 10 }}>
        <Moon size={16} style={{ color: 'var(--crimson)', flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{r.lunarNote}</p>
      </div>

      {/* Seasonal */}
      {r.seasonalNote && (
        <div className="card" style={{ padding: 14, marginBottom: 14, display: 'flex', gap: 10, background: 'rgba(192,87,10,.06)', border: '1.5px solid rgba(192,87,10,.2)' }}>
          <CalendarDays size={16} style={{ color: 'var(--saffron)', flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>{r.seasonalNote}</p>
        </div>
      )}

      {/* Festival peaks for THIS temple */}
      {r.festivalPeaks.length > 0 && (
        <div className="card" style={{ padding: 14, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10, color: 'var(--ink)', fontWeight: 700, fontSize: 13 }}>
            <CalendarDays size={16} style={{ color: '#B42318' }} /> Festival peaks — expect very large crowds
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {r.festivalPeaks.map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13, paddingBottom: 8, borderBottom: i < r.festivalPeaks.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{f.name}</span>
                <span style={{ color: 'var(--muted2)', textAlign: 'right', flexShrink: 0 }}>{f.when}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--muted2)', marginTop: 10, marginBottom: 0 }}>
            Dates shift each year with the Hindu calendar — confirm locally before planning.
          </p>
        </div>
      )}

      {/* Honesty footer — never pretend this is a live reading */}
      <p style={{ fontSize: 11, color: 'var(--muted2)', lineHeight: 1.55, marginTop: 4 }}>
        <Info size={12} style={{ verticalAlign: '-1px', marginRight: 4 }} />
        This is typical-pattern guidance based on the deity’s traditional days, the festival calendar and the temple’s season — not a live wait-time reading. Actual crowds vary with weather, local events and special darshans.
      </p>
    </div>
  )
}
