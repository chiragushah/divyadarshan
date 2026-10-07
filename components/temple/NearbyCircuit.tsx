import Link from 'next/link'
import { Route, MapPin, Navigation, CalendarDays, Radio } from 'lucide-react'
import type { Circuit } from '@/lib/nearbyCircuit'

export default function NearbyCircuit({ circuit, mapsUrl, anchorName }:
  { circuit: Circuit; mapsUrl: string; anchorName: string }) {
  if (!circuit.count) return null

  return (
    <div className="mb-8">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
        <h2 className="font-serif text-2xl font-medium" style={{ margin: 0 }}>Build a Circuit from Here</h2>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 100, background: 'var(--crimson)', color: 'white' }}>New</span>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--muted2)' }}>
        {circuit.count} temple{circuit.count > 1 ? 's' : ''} you can cover within {circuit.radiusKm} km of {anchorName}, in a sensible order
      </p>

      {/* Summary strip */}
      <div className="card" style={{ padding: 14, marginBottom: 14, display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center', background: 'rgba(192,87,10,.06)', border: '1.5px solid rgba(192,87,10,.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
          <Route size={16} style={{ color: 'var(--saffron)' }} /> {circuit.count} stops
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
          <Navigation size={16} style={{ color: 'var(--saffron)' }} /> ~{circuit.roadKm} km by road
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
          <CalendarDays size={16} style={{ color: 'var(--saffron)' }} /> plan {circuit.daysText}
        </div>
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noopener"
            style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: 'var(--crimson)', color: 'white', textDecoration: 'none' }}>
            <Navigation size={14} /> Open route in Maps
          </a>
        )}
      </div>

      {/* Ordered stops */}
      <div style={{ position: 'relative' }}>
        {circuit.stops.map((s, i) => (
          <div key={s.slug} style={{ display: 'flex', gap: 12, paddingBottom: i < circuit.stops.length - 1 ? 14 : 0 }}>
            {/* Rail + number */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--crimson)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{s.order}</div>
              {i < circuit.stops.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 2 }} />}
            </div>
            {/* Card */}
            <Link href={`/temple/${s.slug}`} className="card" style={{ flex: 1, padding: '12px 14px', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{s.name}</span>
                  {s.has_live && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, fontWeight: 700, color: '#B42318' }}><Radio size={11} /> LIVE</span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <MapPin size={11} style={{ verticalAlign: '-1px', marginRight: 3 }} />
                  {[s.city, s.state].filter(Boolean).join(', ')}{s.deity ? ` · ${s.deity.split(/[;(]/)[0].trim()}` : ''}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--crimson)' }}>{s.legKm} km</div>
                <div style={{ fontSize: 11, color: 'var(--muted2)' }}>{i === 0 ? 'from here' : 'next leg'}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, color: 'var(--muted2)', lineHeight: 1.55, marginTop: 12 }}>
        <MapPin size={12} style={{ verticalAlign: '-1px', marginRight: 4 }} />
        Auto-generated from temple locations and sequenced nearest-first. Distances are approximate by road; confirm actual routes and road conditions before you travel.
      </p>
    </div>
  )
}
