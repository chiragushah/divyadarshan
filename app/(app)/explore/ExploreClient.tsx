'use client'
import RecommendTempleButton from '@/components/RecommendTempleButton'
export const dynamic = 'force-dynamic'
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
  1:  [{ festival: 'Makar Sankranti', deities: ['Surya','Vishnu'], states: ['Gujarat','Tamil Nadu','Andhra Pradesh'], desc: 'Sun temples and Vishnu temples are especially auspicious this month.' }],
  2:  [{ festival: 'Maha Shivratri', deities: ['Shiva'], states: ['Uttar Pradesh','Madhya Pradesh','Karnataka','Tamil Nadu'], desc: 'The great night of Shiva - visit Jyotirlinga temples for blessings.' }],
  3:  [{ festival: 'Holi & Ram Navami', deities: ['Krishna','Rama','Vishnu'], states: ['Uttar Pradesh','Rajasthan','Madhya Pradesh'], desc: 'Visit Krishna temples in Vrindavan and Ram temples across the country.' }],
  4:  [{ festival: 'Chaitra Navratri & Ram Navami', deities: ['Durga','Shakti','Devi','Rama','Vishnu'], states: ['Gujarat','Rajasthan','West Bengal','Himachal Pradesh','Uttar Pradesh'], desc: 'Devi temples during the nine holy nights, and Ram temples for Ram Navami.' }],
  5:  [{ festival: 'Akshaya Tritiya', deities: ['Vishnu','Lakshmi'], states: ['Odisha','Maharashtra','Kerala'], desc: 'An auspicious day for Vishnu and Lakshmi worship.' }],
  6:  [{ festival: 'Jagannath Rath Yatra', deities: ['Vishnu','Krishna'], states: ['Odisha'], desc: 'Lord Jagannath chariot festival - visit Puri and nearby Vishnu temples.' }],
  7:  [{ festival: 'Guru Purnima', deities: ['Shiva','Vishnu'], states: ['Uttar Pradesh','Maharashtra','Karnataka'], desc: 'Pay respects to divine gurus - sacred to all traditions.' }],
  8:  [{ festival: 'Janmashtami & Onam', deities: ['Krishna','Vishnu'], states: ['Uttar Pradesh','Rajasthan','Kerala','Tamil Nadu'], desc: "Krishna's birthday - Mathura, Vrindavan and Kerala temples celebrate grandly." }],
  9:  [{ festival: 'Ganesh Chaturthi', deities: ['Ganesha'], states: ['Maharashtra','Karnataka','Andhra Pradesh','Tamil Nadu'], desc: 'Ganesha temples across India celebrate with great fervour.' }],
  10: [{ festival: 'Navratri & Dussehra', deities: ['Durga','Shakti','Devi','Rama'], states: ['Gujarat','West Bengal','Himachal Pradesh','Karnataka'], desc: 'Goddess temples light up for nine nights.' }],
  11: [{ festival: 'Diwali & Kartik Purnima', deities: ['Lakshmi','Vishnu','Rama'], states: ['Uttar Pradesh','Rajasthan','Gujarat','Maharashtra'], desc: 'Lakshmi temples are especially auspicious.' }],
  12: [{ festival: 'Vaikunta Ekadashi', deities: ['Vishnu','Balaji','Venkateshwara'], states: ['Tamil Nadu','Andhra Pradesh','Karnataka','Kerala'], desc: 'The most sacred day for Vishnu worship.' }],
}

const INDIAN_KEYWORDS = [
  'temple','mandir','mandap','devasthan','deul','vithal','vitthal','vithoba','pandurang',
  'shiva','shankar','mahadev','ganesh','ganapati','vinayak','ram','hanuman','maruti',
  'devi','durga','mata','ambika','ambaji','amba','vishnu','laxmi','lakshmi','narayan',
  'krishna','balaji','tirupati','venkatesh','murugan','ayyappa','jagannath','kali',
  'bhavani','swami','math','peetham','kshetram','sai','dattatreya','panduranga',
  'perumal','kovil','amman','pillayar','subramanya',
  'jain','digambar','shvetambar','tirthankar','mahavir',
  'gurudwara','gurdwara','sahib','darbar',
  'buddha','buddhist','vihara','monastery','gompa','stupa','bodhi',
]

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLon = (lon2-lon1)*Math.PI/180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
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

  const [userCoords,    setUserCoords]    = useState<{ lat: number; lon: number } | null>(null)
  const [locationError, setLocationError] = useState('')
  const [locLoading,    setLocLoading]    = useState(false)
  const [nearbyTemples, setNearbyTemples] = useState<any[]>([])
  const [radiusKm,      setRadiusKm]      = useState(10)
  const [retryKey,      setRetryKey]      = useState(0)

  const currentMonth   = new Date().getMonth() + 1
  const monthFestivals = MONTH_FESTIVALS[currentMonth] || []

  const update = (key: string, value: string) => {
    const p = new URLSearchParams()
    Object.entries(activeFilters).forEach(([k, v]) => { if (v) p.set(k, v) })
    if (value) p.set(key, value); else p.delete(key)
    p.delete('page')
    router.push(`${pathname}?${p.toString()}`)
  }

  async function fetchNearby(lat: number, lon: number, radius: number) {
    setLocLoading(true)
    setLocationError('')
    try {
      const res  = await fetch(`/api/nearby?lat=${lat}&lon=${lon}&radius=${radius}`)
      const data = await res.json()
      const results = (data.elements || [])
        .map((el: any) => {
          const elLat = el.lat ?? el.center?.lat
          const elLon = el.lon ?? el.center?.lon
          const name  = el.tags?.name || el.tags?.['name:en'] || el.tags?.['name:hi']
            || el.tags?.['name:mr'] || el.tags?.['name:gu'] || el.tags?.['name:ta']
            || el.tags?.['name:te'] || el.tags?.['name:kn'] || el.tags?.['name:ml'] || ''
          if (!name || !elLat || !elLon) return null
          const nameLow  = name.toLowerCase()
          const religion = (el.tags?.religion || '').toLowerCase()
          // Only exclude clearly non-Indian religions (churches, mosques, synagogues)
          const SKIP_RELIGIONS = ['christian', 'muslim', 'jewish', 'islam', 'bahai', 'zoroastrian']
          if (SKIP_RELIGIONS.includes(religion)) return null
          // Must have a name
          if (!name) return null
          return {
            id: el.id, name,
            address: [el.tags?.['addr:street'], el.tags?.['addr:city'] || el.tags?.['addr:district']].filter(Boolean).join(', '),
            city:  el.tags?.['addr:city']  || el.tags?.['addr:district'] || '',
            state: el.tags?.['addr:state'] || '',
            deity: el.tags?.deity || el.tags?.['deity:name'] || '',
            distance: getDistance(lat, lon, elLat, elLon),
            lat: elLat, lon: elLon,
          }
        })
        .filter(Boolean)
        .sort((a: any, b: any) => a.distance - b.distance)
      setNearbyTemples(results)
    } catch (err: any) {
      try {
        const fb = await fetch(`/api/temples?nearby=1&lat=${lat}&lon=${lon}&radius=${radius}`)
        const fd = await fb.json()
        if (fd.temples?.length > 0) {
          setNearbyTemples(fd.temples.map((t: any) => ({ ...t, lon: t.lon ?? t.lng })))
        } else {
          setLocationError('No temples found nearby. Try increasing the search radius.')
        }
      } catch {
        setLocationError('Could not fetch nearby temples. Please try again.')
      }
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
      () => { setLocationError('Could not get your location. Please allow location access and try again.'); setLocLoading(false) },
      { timeout: 10000 }
    )
  }, [activeTab, retryKey])

  const seasonalTemples = (() => {
    if (!monthFestivals.length) return initialTemples
    const deities    = monthFestivals.flatMap(f => f.deities).map(d => d.toLowerCase())
    const festStates = monthFestivals.flatMap(f => f.states)
    return [...initialTemples]
      .map(t => {
        const td = ((t as any).deity || '').toLowerCase()
        const ts = (t as any).state || ''
        const tc = ((t as any).categories || []).join(' ').toLowerCase()
        return { ...t, _score: (deities.some(d => td.includes(d)) ? 2 : 0) + (festStates.includes(ts) ? 1 : 0) + (deities.some(d => tc.includes(d)) ? 1 : 0) }
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

      <div className="border-b bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 flex gap-0 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id}
              onClick={() => update('tab', tab.id === 'directory' ? '' : tab.id)}
              className="px-5 py-3.5 text-sm whitespace-nowrap border-b-2 transition-all"
              style={{ borderColor: activeTab===tab.id?'var(--crimson)':'transparent', color: activeTab===tab.id?'var(--crimson)':'var(--muted)', fontFamily:'var(--font-sans)', fontWeight: activeTab===tab.id?'600':'400' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {activeTab === 'nearby' && (
          <div>
            {locLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div style={{ fontSize: 40 }}>📍</div>
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Finding sacred places near you…</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Hindu temples · Jain temples · Gurudwaras · Buddhist sites</p>
              </div>
            )}
            {locationError && (
              <div className="card card-p text-center py-12">
                <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
                <p className="font-serif text-xl font-medium mb-2">Location access needed</p>
                <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{locationError}</p>
                <button className="btn btn-primary" onClick={() => { setUserCoords(null); setNearbyTemples([]); setLocationError(''); setRetryKey(k => k+1) }}>Try Again</button>
              </div>
            )}
            {!locLoading && !locationError && userCoords && (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 20 }}>📍</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{nearbyTemples.length} sacred places found</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>Within {radiusKm}km · via OpenStreetMap</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>Radius:</span>
                    {[10,25,50,100].map(r => (
                      <button key={r} onClick={() => { setRadiusKm(r); if (userCoords) fetchNearby(userCoords.lat, userCoords.lon, r) }}
                        className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                        style={{ background: radiusKm===r?'var(--crimson)':'var(--bg)', color: radiusKm===r?'white':'var(--muted)', border: `1px solid ${radiusKm===r?'var(--crimson)':'var(--border)'}` }}>
                        {r}km
                      </button>
                    ))}
                  </div>
                </div>
                {nearbyTemples.length === 0 ? (
                  <div className="text-center py-16">
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🛕</div>
                    <p className="text-sm" style={{ color: 'var(--muted2)' }}>No sacred places found within {radiusKm}km. Try a larger radius.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nearbyTemples.map((temple: any) => (
                      <div key={temple.id} className="card card-p flex items-start gap-4" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-xl"
                          style={{ width:56, height:56, background:'var(--pastel-red)', border:'1.5px solid #FFCCCC' }}>
                          <span style={{ fontSize: 20 }}>🛕</span>
                          <span style={{ fontSize:10, fontWeight:700, color:'var(--crimson)' }}>
                            {temple.distance < 1 ? `${Math.round(temple.distance*1000)}m` : `${temple.distance.toFixed(1)}km`}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-semibold text-sm leading-tight mb-1" style={{ color:'var(--ink)' }}>{temple.name}</p>
                          {(temple.address || temple.city || temple.state) && (
                            <p className="text-xs mb-1 line-clamp-1" style={{ color:'var(--muted)' }}>
                              {temple.address || [temple.city, temple.state].filter(Boolean).join(', ')}
                            </p>
                          )}
                          {temple.deity && (
                            <span className="inline-block px-2 py-0.5 rounded-full text-xs mb-1"
                              style={{ background:'rgba(192,87,10,0.08)', color:'var(--saffron)' }}>
                              {temple.deity}
                            </span>
                          )}
                          <a href={`https://www.google.com/maps/search/?api=1&query=${temple.lat},${temple.lon}`}
                            target="_blank" rel="noopener"
                            className="block text-xs mt-1 underline" style={{ color:'var(--crimson)' }}>
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

        {activeTab === 'seasonal' && (
          <div>
            {monthFestivals.map((f, i) => (
              <div key={i} className="rounded-2xl p-5 mb-6 flex gap-4 items-start"
                style={{ background:'linear-gradient(135deg,#FFF5F0,#FFF8F0)', border:'1.5px solid #FFD9B3' }}>
                <div style={{ fontSize:36, flexShrink:0 }}>🪔</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:'var(--saffron)' }}>
                    {new Date().toLocaleString('default',{month:'long'})} · Auspicious Occasion
                  </div>
                  <h2 className="font-serif text-2xl font-semibold mb-1" style={{ color:'var(--ink)' }}>{f.festival}</h2>
                  <p className="text-sm" style={{ color:'var(--muted)' }}>{f.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {f.deities.map(d => (
                      <span key={d} className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background:'rgba(192,87,10,0.1)', color:'var(--saffron)', border:'1px solid rgba(192,87,10,0.2)' }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold" style={{ color:'var(--ink)' }}>Recommended temples this month</p>
              <p className="text-xs" style={{ color:'var(--muted)' }}>{seasonalTemples.length} temples</p>
            </div>
            {seasonalTemples.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {seasonalTemples.map((temple: any) => <TempleCard key={temple.id} temple={temple} />)}
              </div>
            ) : (
              <div className="text-center py-16 text-sm" style={{ color:'var(--muted2)' }}>No specific temples found for this month.</div>
            )}
          </div>
        )}

        {(activeTab === 'directory' || activeTab === 'darshan') && (
          <>
            <div className="flex flex-wrap gap-3 mb-6">
              <input type="text" placeholder="Search temples, cities, deities..."
                defaultValue={activeFilters.q||''} className="input flex-1 min-w-[200px] max-w-sm"
                onChange={e => { clearTimeout((window as any)._st); (window as any)._st = setTimeout(()=>update('q',e.target.value),400) }} />
              <select className="input w-auto" value={activeFilters.state||''} onChange={e=>update('state',e.target.value)}>
                <option value="">All States</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select className="input w-auto" value={activeFilters.deity||''} onChange={e=>update('deity',e.target.value)}>
                <option value="">All Deities</option>
                {['Shiva','Vishnu','Durga/Shakti','Ganesha','Krishna','Rama','Murugan','Hanuman'].map(d=>(
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {Object.values(activeFilters).some(Boolean) && (
                <button onClick={()=>router.push('/explore')} className="btn btn-ghost btn-sm text-xs">Clear filters x</button>
              )}
            </div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm" style={{ color:'var(--muted)' }}>
                {activeFilters.category && <><strong style={{ color:'var(--crimson)' }}>{activeFilters.category}</strong> · </>}
                {total.toLocaleString()} temples
                {activeTab==='darshan' && <span className="ml-2" style={{ color:'var(--live)' }}>🔴 Live only</span>}
              </p>
              {activeFilters.category && (
                <button onClick={()=>update('category','')} className="text-xs" style={{ color:'var(--crimson)' }}>Clear filter x</button>
              )}
            </div>
            {initialTemples.length===0 ? (
              <div className="text-center py-16 text-sm" style={{ color:'var(--muted2)' }}>
                No temples found. <button onClick={()=>router.push('/explore')} className="underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {initialTemples.map(temple => <TempleCard key={temple.id} temple={temple} />)}
              </div>
            )}
            {total > 48 && (
              <div className="flex justify-center gap-2 mt-10">
                {page>1 && <button onClick={()=>update('page',String(page-1))} className="btn btn-secondary btn-sm">Previous</button>}
                <span className="btn btn-ghost btn-sm" style={{ color:'var(--muted)' }}>Page {page} of {Math.ceil(total/48)}</span>
                {page<Math.ceil(total/48) && <button onClick={()=>update('page',String(page+1))} className="btn btn-secondary btn-sm">Next</button>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
