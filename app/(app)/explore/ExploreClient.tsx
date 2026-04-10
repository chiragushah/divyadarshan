'use client'
import RecommendTempleButton from '@/components/RecommendTempleButton'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import TempleCard from '@/components/temple/TempleCard'
import type { Temple } from '@/types'

const TABS = [
  { id: 'directory', label: 'All Temples' },
  { id: 'darshan',   label: '🔴 Live Darshan' },
  { id: 'nearby',    label: '📍 Nearby' },
  { id: 'seasonal',  label: '📅 This Month' },
]

const MONTH_FESTIVALS: Record<number, { festival: string; deities: string[]; states: string[]; desc: string }[]> = {
  1:  [{ festival: 'Makar Sankranti', deities: ['Surya', 'Vishnu'], states: ['Gujarat', 'Tamil Nadu', 'Andhra Pradesh'], desc: 'Sun temples and Vishnu temples are especially auspicious this month.' }],
  2:  [{ festival: 'Maha Shivratri', deities: ['Shiva'], states: ['Uttar Pradesh', 'Madhya Pradesh', 'Karnataka', 'Tamil Nadu'], desc: 'The great night of Shiva — visit Jyotirlinga temples for blessings.' }],
  3:  [{ festival: 'Holi & Ram Navami', deities: ['Krishna', 'Rama', 'Vishnu'], states: ['Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh'], desc: 'Visit Krishna temples in Vrindavan and Ram temples across the country.' }],
  4:  [{ festival: 'Hanuman Jayanti & Akshaya Tritiya', deities: ['Hanuman', 'Vishnu', 'Lakshmi', 'Rama'], states: ['Uttar Pradesh', 'Rajasthan', 'Maharashtra', 'Karnataka', 'Gujarat'], desc: 'Hanuman Jayanti on April 12 — visit Hanuman temples across India. Akshaya Tritiya on April 30 — auspicious for Vishnu and Lakshmi temples.' }],
  5:  [{ festival: 'Akshaya Tritiya', deities: ['Vishnu', 'Lakshmi'], states: ['Odisha', 'Maharashtra', 'Kerala'], desc: 'An auspicious day for Vishnu and Lakshmi worship.' }],
  6:  [{ festival: 'Jagannath Rath Yatra', deities: ['Vishnu', 'Krishna'], states: ['Odisha'], desc: 'Lord Jagannath chariot festival — visit Puri and nearby Vishnu temples.' }],
  7:  [{ festival: 'Guru Purnima', deities: ['Shiva', 'Vishnu'], states: ['Uttar Pradesh', 'Maharashtra', 'Karnataka'], desc: 'Pay respects to divine gurus — sacred to all traditions.' }],
  8:  [{ festival: 'Janmashtami & Onam', deities: ['Krishna', 'Vishnu'], states: ['Uttar Pradesh', 'Rajasthan', 'Kerala', 'Tamil Nadu'], desc: "Krishna's birthday — Mathura, Vrindavan and Kerala temples celebrate grandly." }],
  9:  [{ festival: 'Ganesh Chaturthi', deities: ['Ganesha'], states: ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu'], desc: 'Ganesha temples across India celebrate with great fervour.' }],
  10: [{ festival: 'Navratri & Dussehra', deities: ['Durga', 'Shakti', 'Devi', 'Rama'], states: ['Gujarat', 'West Bengal', 'Himachal Pradesh', 'Karnataka'], desc: 'Goddess temples light up for nine nights.' }],
  11: [{ festival: 'Diwali & Kartik Purnima', deities: ['Lakshmi', 'Vishnu', 'Rama'], states: ['Uttar Pradesh', 'Rajasthan', 'Gujarat', 'Maharashtra'], desc: 'Lakshmi temples are especially auspicious.' }],
  12: [{ festival: 'Vaikunta Ekadashi', deities: ['Vishnu', 'Balaji', 'Venkateshwara'], states: ['Tamil Nadu', 'Andhra Pradesh', 'Karnataka', 'Kerala'], desc: 'The most sacred day for Vishnu worship.' }],
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

interface Props {
  initialTemples: Temple[]
  total: number
  page: number
  states: string[]
  activeFilters: Record<string, string | undefined>
}

export default function ExploreClient({ initialTemples, total, page, states, activeFilters }: Props) {
  const router   = useRouter()
  const pathname = usePathname()
  const activeTab = activeFilters.tab || 'directory'

  const [userCoords,     setUserCoords]     = useState<{ lat: number; lon: number } | null>(null)
  const [locationError,  setLocationError]  = useState('')
  const [locLoading,     setLocLoading]     = useState(false)
  const [nearbyTemples,  setNearbyTemples]  = useState<any[]>([])
  const [radiusKm,       setRadiusKm]       = useState(10)

  const currentMonth   = new Date().getMonth() + 1
  const monthFestivals = MONTH_FESTIVALS[currentMonth] || []

  const update = (key: string, value: string) => {
    const p = new URLSearchParams()
    Object.entries(activeFilters).forEach(([k, v]) => { if (v) p.set(k, v) })
    if (value) p.set(key, value); else p.delete(key)
    if (key !== 'page') p.delete('page')
    router.push(`${pathname}?${p.toString()}`)
  }

  async function fetchNearby(lat: number, lon: number, radius: number) {
    setLocLoading(true)
    setLocationError('')
    try {
      // Query both our DB and Overpass simultaneously
      const [dbRes, overpassRes] = await Promise.allSettled([
        // Our DB - Haversine search
        fetch(`/api/temples?nearby=1&lat=${lat}&lon=${lon}&radius=${radius}&limit=48`),
        // Overpass API - local area temples
        fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: `data=${encodeURIComponent(`[out:json][timeout:25];(node["amenity"="place_of_worship"](around:${radius * 1000},${lat},${lon});way["amenity"="place_of_worship"](around:${radius * 1000},${lat},${lon});node["historic"="temple"](around:${radius * 1000},${lat},${lon}););out center tags 60;`)}`,
        })
      ])

      // Process DB results
      let dbTemples: any[] = []
      if (dbRes.status === 'fulfilled' && dbRes.value.ok) {
        const dbData = await dbRes.value.json()
        dbTemples = (dbData.temples || []).map((t: any) => ({
          ...t,
          _source: 'db',
          distance_km: t.distance_km,
        }))
      }

      // Process Overpass results
      let overpassTemples: any[] = []
      if (overpassRes.status === 'fulfilled' && overpassRes.value.ok) {
        const data = await overpassRes.value.json()
        const hinduKeywords = ['temple','mandir','mandap','devasthan','shiva','ganesh','vishnu','devi','durga','krishna','rama','hanuman','gurudwara','jain','church','mosque','masjid','basadi']
        const dbSlugs = new Set(dbTemples.map((t: any) => t.slug).filter(Boolean))
        const dbNames = new Set(dbTemples.map((t: any) => t.name?.toLowerCase()).filter(Boolean))

        overpassTemples = (data.elements || [])
          .filter((el: any) => {
            const name = el.tags?.name || el.tags?.['name:en'] || el.tags?.['name:hi'] || ''
            if (!name || name.length < 3) return false
            if (dbNames.has(name.toLowerCase())) return false // skip if already in DB
            const religion = (el.tags?.religion || '').toLowerCase()
            const nameLow = name.toLowerCase()
            return religion === 'hindu' || religion === 'sikh' || religion === 'jain' || religion === 'buddhist' ||
              hinduKeywords.some(kw => nameLow.includes(kw))
          })
          .map((el: any) => {
            const name = el.tags?.name || el.tags?.['name:en'] || el.tags?.['name:hi'] || 'Temple'
            const elLat = el.lat || el.center?.lat
            const elLon = el.lon || el.center?.lon
            const distKm = elLat && elLon
              ? Math.round(Math.sqrt(Math.pow((elLat - lat) * 111, 2) + Math.pow((elLon - lon) * 111 * Math.cos(lat * Math.PI / 180), 2)) * 10) / 10
              : null
            return {
              id: el.id?.toString(),
              name,
              city: el.tags?.['addr:city'] || el.tags?.['addr:district'] || '',
              state: el.tags?.['addr:state'] || '',
              deity: el.tags?.deity || '',
              image_url: '',
              blob_image_url: '',
              slug: '',
              _source: 'overpass',
              distance_km: distKm,
            }
          })
          .slice(0, 20) // limit overpass results
      }

      // Combine: DB temples first (with full info), then Overpass (local discovery)
      const combined = [...dbTemples, ...overpassTemples]
        .sort((a: any, b: any) => (a.distance_km || 999) - (b.distance_km || 999))
        .slice(0, 48)

      if (combined.length > 0) {
        setNearbyTemples(combined)
        setLocationError('')
      } else {
        setLocationError('No temples found nearby. Try increasing the search radius.')
      }
    } catch (err: any) {
      console.error('Nearby fetch error:', err)
      setLocationError('Could not fetch nearby temples. Please try again.')
    } finally {
      setLocLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab !== 'nearby') return
    if (userCoords) return
    setLocLoading(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        setUserCoords({ lat: latitude, lon: longitude })
        fetchNearby(latitude, longitude, radiusKm)
      },
      () => {
        setLocationError('Could not get your location. Please allow location access and try again.')
        setLocLoading(false)
      },
      { timeout: 10000 }
    )
  }, [activeTab])

  const seasonalTemples = (() => {
    if (!monthFestivals.length) return initialTemples
    const deities    = monthFestivals.flatMap(f => f.deities).map(d => d.toLowerCase())
    const festStates = monthFestivals.flatMap(f => f.states)
    return [...initialTemples]
      .map(t => {
        const templeDeity = ((t as any).deity || '').toLowerCase()
        const templeState = (t as any).state || ''
        const templeCats  = ((t as any).categories || []).join(' ').toLowerCase()
        const deityScore  = deities.some(d => templeDeity.includes(d)) ? 2 : 0
        const stateScore  = festStates.includes(templeState) ? 1 : 0
        const catScore    = deities.some(d => templeCats.includes(d)) ? 1 : 0
        return { ...t, _score: deityScore + stateScore + catScore }
      })
      .filter((t: any) => t._score > 0)
      .sort((a: any, b: any) => b._score - a._score)
      .slice(0, 24)
  })()

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <RecommendTempleButton variant="banner" />
      </div>
      {/* Tab bar */}
      <div className="border-b bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 flex gap-0 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id}
              onClick={() => { const p = new URLSearchParams(); const newTab = tab.id === 'directory' ? '' : tab.id; if (newTab) p.set('tab', newTab); router.push(pathname + '?' + p.toString()); }}
              className="px-5 py-3.5 text-sm whitespace-nowrap border-b-2 transition-all"
              style={{
                borderColor: activeTab === tab.id ? 'var(--crimson)' : 'transparent',
                color: activeTab === tab.id ? 'var(--crimson)' : 'var(--muted)',
                fontFamily: 'var(--font-sans)',
                fontWeight: activeTab === tab.id ? '600' : '400',
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* NEARBY TAB */}
        {activeTab === 'nearby' && (
          <div>
            {locLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div style={{ fontSize: 40 }}>📍</div>
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Finding temples near you…</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Searching OpenStreetMap for Hindu temples in your area</p>
              </div>
            )}
            {locationError && (
              <div className="card card-p text-center py-12">
                <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
                <p className="font-serif text-xl font-medium mb-2">Location access needed</p>
                <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{locationError}</p>
                <button className="btn btn-primary" onClick={() => { setUserCoords(null); setNearbyTemples([]); }}>Try Again</button>
              </div>
            )}
            {!locLoading && !locationError && userCoords && (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 20 }}>📍</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{nearbyTemples.length} temples found nearby</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>Within {radiusKm}km · via OpenStreetMap</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>Radius:</span>
                    {[5, 10, 25, 50].map(r => (
                      <button key={r}
                        onClick={() => { setRadiusKm(r); if (userCoords) fetchNearby(userCoords.lat, userCoords.lon, r) }}
                        className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                        style={{
                          background: radiusKm === r ? 'var(--crimson)' : 'var(--bg)',
                          color: radiusKm === r ? 'white' : 'var(--muted)',
                          border: `1px solid ${radiusKm === r ? 'var(--crimson)' : 'var(--border)'}`,
                        }}>
                        {r}km
                      </button>
                    ))}
                  </div>
                </div>
                {nearbyTemples.length === 0 ? (
                  <div className="text-center py-16">
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🛕</div>
                    <p className="text-sm" style={{ color: 'var(--muted2)' }}>No temples found within {radiusKm}km. Try a larger radius.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nearbyTemples.map((temple: any) => (
                      <div key={temple.id} className="card card-p flex items-start gap-4" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl"
                          style={{ width: 56, height: 56, background: 'var(--pastel-red)', border: '1.5px solid #FFCCCC' }}>
                          <span style={{ fontSize: 20 }}>🛕</span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--crimson)' }}>
                            {temple.distance < 1 ? `${Math.round(temple.distance * 1000)}m` : `${temple.distance.toFixed(1)}km`}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-semibold text-sm leading-tight mb-1" style={{ color: 'var(--ink)' }}>{temple.name}</p>
                          {(temple.address || temple.city || temple.state) && (
                            <p className="text-xs mb-1 line-clamp-1" style={{ color: 'var(--muted)' }}>
                              {temple.address || [temple.city, temple.state].filter(Boolean).join(', ')}
                            </p>
                          )}
                          {temple.deity && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-xs mb-1"
                              style={{ background: 'rgba(192,87,10,0.08)', color: 'var(--saffron)' }}>{temple.deity}</span>
                          )}
                          <a href={`https://www.google.com/maps/search/?api=1&query=${temple.lat},${temple.lon}`}
                            target="_blank" rel="noopener" className="block text-xs mt-1 underline" style={{ color: 'var(--crimson)' }}>
                            Get Directions →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* THIS MONTH TAB */}
        {activeTab === 'seasonal' && (
          <div>
            {monthFestivals.map((f, i) => (
              <div key={i} className="rounded-2xl p-5 mb-6 flex gap-4 items-start"
                style={{ background: 'linear-gradient(135deg, #FFF5F0, #FFF8F0)', border: '1.5px solid #FFD9B3' }}>
                <div style={{ fontSize: 36, flexShrink: 0 }}>🪔</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--saffron)' }}>
                    {new Date().toLocaleString('default', { month: 'long' })} · Auspicious Occasion
                  </div>
                  <h2 className="font-serif text-2xl font-semibold mb-1" style={{ color: 'var(--ink)' }}>{f.festival}</h2>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{f.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {f.deities.map(d => (
                      <span key={d} className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: 'rgba(192,87,10,0.1)', color: 'var(--saffron)', border: '1px solid rgba(192,87,10,0.2)' }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Recommended temples to visit this month</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{seasonalTemples.length} temples</p>
            </div>
            {seasonalTemples.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {seasonalTemples.map((temple: any) => <TempleCard key={temple.id} temple={temple} />)}
              </div>
            ) : (
              <div className="text-center py-16 text-sm" style={{ color: 'var(--muted2)' }}>No specific temples found for this month.</div>
            )}
          </div>
        )}

        {/* DIRECTORY / DARSHAN TABS */}
        {(activeTab === 'directory' || activeTab === 'darshan') && (
          <>
            <div className="flex flex-wrap gap-3 mb-6">
              <input type="text" placeholder="Search temples, cities, deities…"
                defaultValue={activeFilters.q || ''} className="input flex-1 min-w-[200px] max-w-sm"
                onChange={e => {
                  clearTimeout((window as any)._st)
                  ;(window as any)._st = setTimeout(() => update('q', e.target.value), 400)
                }} />
              <select className="input w-auto" value={activeFilters.state || ''} onChange={e => update('state', e.target.value)}>
                <option value="">All States</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select className="input w-auto" value={activeFilters.deity || ''} onChange={e => update('deity', e.target.value)}>
                <option value="">All Deities</option>
                {['Shiva','Vishnu','Durga/Shakti','Ganesha','Krishna','Rama','Murugan','Hanuman'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select className="input w-auto" value={activeFilters.religion || ''} onChange={e => update('religion', e.target.value)}>
                <option value="">All Religions</option>
                <optgroup label="Hindu">
                  <option value="hindu">All Hindu</option>
                  <option value="shaiva">Shaiva (Shiva)</option>
                  <option value="vaishnava">Vaishnava (Vishnu/Krishna)</option>
                  <option value="shakta">Shakta (Devi/Durga)</option>
                  <option value="smarta">Smarta / Mixed</option>
                  <option value="ganapatya">Ganapatya (Ganesha)</option>
                  <option value="saura">Saura (Surya/Sun)</option>
                  <option value="skanda">Skanda (Murugan/Kartikeya)</option>
                  <option value="nath">Nath Sampradaya</option>
                  <option value="ramakrishna">Ramakrishna Mission</option>
                  <option value="iskcon">ISKCON / Vaishnava</option>
                </optgroup>
                <optgroup label="Other Dharmic">
                  <option value="jain">Jain</option>
                  <option value="buddhist">Buddhist</option>
                  <option value="sikh">Sikh</option>
                  <option value="swaminarayan">Swaminarayan</option>
                </optgroup>
              </select>
              {Object.values(activeFilters).some(Boolean) && (
                <button onClick={() => router.push('/explore')} className="btn btn-ghost btn-sm text-xs">Clear filters ×</button>
              )}
            </div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {activeFilters.category && <><strong style={{ color: 'var(--crimson)' }}>{activeFilters.category}</strong> · </>}
                {total.toLocaleString()} temples
                {activeTab === 'darshan' && <span className="ml-2" style={{ color: 'var(--live)' }}>🔴 Live only</span>}
              </p>
              {activeFilters.category && (
                <button onClick={() => update('category', '')} className="text-xs" style={{ color: 'var(--crimson)' }}>Clear filter ×</button>
              )}
            </div>
            {initialTemples.length === 0 ? (
              <div className="text-center py-16 text-sm" style={{ color: 'var(--muted2)' }}>
                No temples found. <button onClick={() => router.push('/explore')} className="underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {initialTemples.map(temple => <TempleCard key={temple.id} temple={temple} />)}
              </div>
            )}
            {total > 48 && (
              <div className="flex justify-center gap-2 mt-10">
                {page > 1 && <button onClick={() => update('page', String(page - 1))} className="btn btn-secondary btn-sm">← Previous</button>}
                <span className="btn btn-ghost btn-sm" style={{ color: 'var(--muted)' }}>Page {page} of {Math.ceil(total / 48)}</span>
                {page < Math.ceil(total / 48) && <button onClick={() => update('page', String(page + 1))} className="btn btn-secondary btn-sm">Next →</button>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
