'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, LocateFixed, Search, Loader2 } from 'lucide-react'
import { CITIES, findCity } from '@/lib/cityCoords'

export default function CircuitBuilderForm({ initialCity = '', initialRadius = 200 }:
  { initialCity?: string; initialRadius?: number }) {
  const router = useRouter()
  const [city, setCity] = useState(initialCity)
  const [radius, setRadius] = useState(initialRadius)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')

  function go(lat: number, lng: number, place: string) {
    router.push(`/circuits/builder?lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}&radius=${radius}&place=${encodeURIComponent(place)}`)
  }

  function submitCity() {
    setError('')
    const c = findCity(city)
    if (!c) { setError('Pick a city from the list — or use your location.'); return }
    go(c.lat, c.lng, c.name)
  }

  function useLocation() {
    setError('')
    if (!('geolocation' in navigator)) { setError('Location is not available on this device.'); return }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      pos => { setLocating(false); go(pos.coords.latitude, pos.coords.longitude, 'My location') },
      () => { setLocating(false); setError('Could not get your location — try typing a city instead.') },
      { enableHighAccuracy: false, timeout: 8000 },
    )
  }

  return (
    <div className="card" style={{ padding: 18 }}>
      <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>Where are you starting from?</label>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 220, border: '1.5px solid var(--border)', borderRadius: 10, padding: '0 12px', background: 'white' }}>
          <MapPin size={16} style={{ color: 'var(--muted2)', flexShrink: 0 }} />
          <input
            list="dd-cities" value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') submitCity() }}
            placeholder="Type a city — Pune, Varanasi, Madurai…"
            style={{ border: 'none', outline: 'none', flex: 1, padding: '11px 0', fontSize: 14, background: 'transparent' }} />
          <datalist id="dd-cities">
            {CITIES.map(c => <option key={c.name} value={c.name} />)}
          </datalist>
        </div>
        <button onClick={useLocation} disabled={locating}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: '1.5px solid var(--border)', background: 'white', color: 'var(--ink)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {locating ? <Loader2 size={15} className="animate-spin" /> : <LocateFixed size={15} />} Use my location
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: 8 }}>How far will you travel?</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {[100, 200, 300].map(r => (
            <button key={r} onClick={() => setRadius(r)}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                border: `1.5px solid ${radius === r ? 'var(--crimson)' : 'var(--border)'}`,
                background: radius === r ? 'var(--crimson)' : 'white',
                color: radius === r ? 'white' : 'var(--ink2)',
              }}>
              {r} km
            </button>
          ))}
        </div>
      </div>

      <button onClick={submitCity}
        style={{ marginTop: 16, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 0', borderRadius: 10, fontSize: 15, fontWeight: 700, border: 'none', background: 'var(--crimson)', color: 'white', cursor: 'pointer' }}>
        <Search size={16} /> Build my circuit
      </button>

      {error && <p style={{ fontSize: 13, color: '#B42318', marginTop: 10, marginBottom: 0 }}>{error}</p>}
    </div>
  )
}
