'use client'
import RecommendTempleButton from '@/components/RecommendTempleButton'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import TempleCard from '@/components/temple/TempleCard'
import { CalendarDays, Flame, Landmark, Map, MapPin, Radio } from 'lucide-react'
import type { Temple } from '@/types'

const TABS: { id: string; icon?: React.ReactNode; label: string }[] = [
  { id: 'directory', label: 'All Temples' },
  { id: 'darshan',   icon: <Radio size={15} />,       label: 'Live Darshan' },
  { id: 'nearby',    icon: <MapPin size={15} />,      label: 'Nearby' },
  { id: 'seasonal',  icon: <CalendarDays size={15} />, label: 'This Month' },
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

// Compass bearing (0-360°, 0=North) from point 1 to point 2
function getBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (d: number) => d * Math.PI / 180
  const φ1 = toRad(lat1), φ2 = toRad(lat2), Δλ = toRad(lon2 - lon1)
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
}

// Direction options: label + center bearing. 'any' = no direction preference.
const DIRECTIONS: { id: string; label: string; bearing: number | null }[] = [
  { id: 'any', label: 'Any direction', bearing: null },
  { id: 'N',  label: 'North ↑',      bearing: 0 },
  { id: 'NE', label: 'North-East ↗', bearing: 45 },
  { id: 'E',  label: 'East →',       bearing: 90 },
  { id: 'SE', label: 'South-East ↘', bearing: 135 },
  { id: 'S',  label: 'South ↓',      bearing: 180 },
  { id: 'SW', label: 'South-West ↙', bearing: 225 },
  { id: 'W',  label: 'West ←',       bearing: 270 },
  { id: 'NW', label: 'North-West ↖', bearing: 315 },
]

// Smallest angle (0-180) between two bearings
function angleDiff(a: number, b: number): number {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
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
  const [radiusKm,      setRadiusKm]      = useState(100)
  const [retryKey,      setRetryKey]      = useState(0)
  const [nearbySort,    setNearbySort]    = useState<'distance' | 'name'>('distance')
  const [nearbyType,    setNearbyType]    = useState('')
  const [heading,       setHeading]       = useState('any')  // direction of travel

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
    setNearbyTemples([])
    try {
      const res = await fetch(`/api/nearby?lat=${lat}&lon=${lon}&radius=${radius}`)
      const data = await res.json()
      if (data.places && data.places.length > 0) {
        setNearbyTemples(data.places)
      } else {
        try {
          const fb = await fetch(`/api/temples?nearby=1&lat=${lat}&lon=${lon}&radius=${radius}`)
          const fd = await fb.json()
          const dbT = fd.temples || fd.data || []
          if (dbT.length > 0) {
            setNearbyTemples(dbT)
          } else {
            setLocationError('No sacred places found nearby. Try a larger radius.')
          }
        } catch {
          setLocationError('No sacred places found nearby. Try a larger radius.')
        }
      }
    } catch (err: any) {
      setLocationError('Could not fetch nearby temples. Please check your connection.')
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

  // Deity/type options present in the current results
  const nearbyTypes = useMemo(() => {
    const set = new Set<string>()
    nearbyTemples.forEach((t: any) => { const v = (t.deity || t.type || '').trim(); if (v) set.add(v) })
    return Array.from(set).sort()
  }, [nearbyTemples])

  // Apply type filter, compute "on the way" flag, then sort for display.
  const visibleNearby = useMemo(() => {
    const dir = DIRECTIONS.find(d => d.id === heading)
    const centerBearing = dir?.bearing ?? null

    let list = nearbyTemples.map((t: any) => {
      let onWay = false
      let bearingDiff = 999
      if (centerBearing !== null && userCoords && typeof t.lat === 'number' && typeof t.lon === 'number') {
        const b = getBearing(userCoords.lat, userCoords.lon, t.lat, t.lon)
        bearingDiff = angleDiff(b, centerBearing)
        onWay = bearingDiff <= 45  // within a 90° cone toward the chosen direction
      }
      return { ...t, _onWay: onWay, _bearingDiff: bearingDiff }
    })

    if (nearbyType) list = list.filter((t: any) => (t.deity || t.type || '') === nearbyType)

    const byChoice = (a: any, b: any) =>
      nearbySort === 'name'
        ? String(a.name).localeCompare(String(b.name))
        : (a.distance ?? 0) - (b.distance ?? 0)

    if (centerBearing !== null) {
      // On-the-way temples first (then by chosen sort); others after.
      list.sort((a: any, b: any) => {
        if (a._onWay !== b._onWay) return a._onWay ? -1 : 1
        return byChoice(a, b)
      })
    } else {
      list.sort(byChoice)
    }
    return list
  }, [nearbyTemples, nearbyType, nearbySort, heading, userCoords])

  const onWayCount = useMemo(() => visibleNearby.filter((t: any) => t._onWay).length, [visibleNearby])

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
              onClick={() => {
                if (tab.id === 'nearby') {
                  const p = new URLSearchParams()
                  p.set('tab', 'nearby')
                  router.push(pathname + '?' + p.toString())
                } else {
                  update('tab', tab.id === 'directory' ? '' : tab.id)
                }
              }}
              className="px-5 py-3.5 text-sm whitespace-nowrap border-b-2 transition-all"
              style={{ borderColor: activeTab===tab.id?'var(--crimson)':'transparent', color: activeTab===tab.id?'var(--crimson)':'var(--muted)', fontFamily:'var(--font-sans)', fontWeight: activeTab===tab.id?'600':'400' }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>{tab.icon}{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {activeTab === 'nearby' && (
          <div>
            {locLoading && (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <MapPin size={40} style={{ color: 'var(--crimson)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Finding sacred places near you…</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Hindu temples · Jain temples · Gurudwaras · Buddhist sites</p>
              </div>
            )}
            {locationError && (
              <div className="card card-p text-center py-12">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><Map size={40} style={{ color: 'var(--crimson)' }} /></div>
                <p className="font-serif text-xl font-medium mb-2">Location access needed</p>
                <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{locationError}</p>
                <button className="btn btn-primary" onClick={() => { setUserCoords(null); setNearbyTemples([]); setLocationError(''); setRetryKey(k => k+1) }}>Try Again</button>
              </div>
            )}
            {!locLoading && !locationError && userCoords && (
              <>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={20} style={{ color: 'var(--crimson)' }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                        {visibleNearby.length} sacred places found
                        {heading !== 'any' && onWayCount > 0 && (
                          <span style={{ color: 'var(--crimson)' }}> · {onWayCount} on your way</span>
                        )}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>Within {radiusKm}km · from DivyaDarshanam</p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="card card-p mb-6 flex flex-col gap-4">
                  {/* Direction of travel */}
                  <div className="flex items-start gap-3 flex-wrap">
                    <span className="text-xs font-semibold mt-1" style={{ color: 'var(--muted)', minWidth: 70 }}>Heading</span>
                    <div className="flex items-center gap-2 flex-wrap flex-1">
                      {DIRECTIONS.map(d => (
                        <button key={d.id} onClick={() => setHeading(d.id)}
                          className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                          style={{ background: heading===d.id?'var(--crimson)':'var(--bg)', color: heading===d.id?'white':'var(--muted)', border: `1px solid ${heading===d.id?'var(--crimson)':'var(--border)'}` }}>
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Radius slider */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-semibold" style={{ color: 'var(--muted)', minWidth: 70 }}>Radius</span>
                    <input
                      type="range" min={5} max={500} step={5} value={radiusKm}
                      onChange={e => setRadiusKm(parseInt(e.target.value))}
                      onMouseUp={() => { if (userCoords) fetchNearby(userCoords.lat, userCoords.lon, radiusKm) }}
                      onTouchEnd={() => { if (userCoords) fetchNearby(userCoords.lat, userCoords.lon, radiusKm) }}
                      className="flex-1 min-w-[160px]"
                      style={{ accentColor: 'var(--crimson)' }}
                    />
                    <span className="text-sm font-semibold" style={{ color: 'var(--crimson)', minWidth: 60, textAlign: 'right' }}>{radiusKm} km</span>
                  </div>

                  {/* Type filter + sort */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-semibold" style={{ color: 'var(--muted)', minWidth: 70 }}>Deity / Type</span>
                    <select className="input w-auto" value={nearbyType} onChange={e => setNearbyType(e.target.value)}>
                      <option value="">All types</option>
                      {nearbyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    <span className="text-xs font-semibold ml-auto" style={{ color: 'var(--muted)' }}>Sort by</span>
                    {([['distance','Distance'],['name','Name']] as const).map(([val, label]) => (
                      <button key={val} onClick={() => setNearbySort(val)}
                        className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                        style={{ background: nearbySort===val?'var(--crimson)':'var(--bg)', color: nearbySort===val?'white':'var(--muted)', border: `1px solid ${nearbySort===val?'var(--crimson)':'var(--border)'}` }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {visibleNearby.length === 0 ? (
                  <div className="text-center py-16">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><Landmark size={40} style={{ color: 'var(--muted2)' }} /></div>
                    <p className="text-sm" style={{ color: 'var(--muted2)' }}>
                      {nearbyType
                        ? `No ${nearbyType} temples within ${radiusKm}km. Try clearing the filter or widening the radius.`
                        : `No sacred places found within ${radiusKm}km. Try a larger radius.`}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleNearby.map((temple: any) => {
                      const img = temple.blob_image_url || temple.image_url || ''
                      const href = temple.slug ? `/temple/${temple.slug}` : null
                      const Card = (
                        <div className="card overflow-hidden h-full flex flex-col transition-all hover:shadow-md"
                          style={{ borderColor: temple._onWay ? 'var(--crimson)' : 'var(--border)', borderWidth: temple._onWay ? 1.5 : 1 }}>
                          <div className="relative" style={{ aspectRatio: '16/10', background: 'var(--pastel-red)' }}>
                            {img ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={img} alt={temple.name} loading="lazy"
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center"><Landmark size={40} style={{ color: 'var(--saffron)' }} /></div>
                            )}
                            {temple._onWay && (
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
                                style={{ background: 'var(--crimson)', color: 'white' }}>
                                On your way
                              </span>
                            )}
                            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold"
                              style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
                              {temple.distance < 1 ? `${Math.round(temple.distance*1000)} m` : `${temple.distance.toFixed(1)} km`}
                            </span>
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <p className="font-serif font-semibold text-sm leading-tight mb-1" style={{ color:'var(--ink)' }}>{temple.name}</p>
                            {(temple.address || temple.city || temple.state) && (
                              <p className="text-xs mb-2 line-clamp-1" style={{ color:'var(--muted)' }}>
                                {temple.address || [temple.city, temple.state].filter(Boolean).join(', ')}
                              </p>
                            )}
                            {(temple.deity || temple.type) && (
                              <span className="inline-block self-start px-2 py-0.5 rounded-full text-xs mb-2"
                                style={{ background:'rgba(192,87,10,0.08)', color:'var(--saffron)' }}>
                                {temple.deity || temple.type}
                              </span>
                            )}
                            <div className="mt-auto flex items-center gap-3 pt-1">
                              {href && <span className="text-xs font-semibold" style={{ color:'var(--crimson)' }}>View temple →</span>}
                              <a href={`https://www.google.com/maps/search/?api=1&query=${temple.lat},${temple.lon}`}
                                target="_blank" rel="noopener"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs underline" style={{ color:'var(--muted)' }}>
                                Directions
                              </a>
                            </div>
                          </div>
                        </div>
                      )
                      return href
                        ? <Link key={temple.id || temple._id} href={href} className="block h-full">{Card}</Link>
                        : <div key={temple.id || temple._id} className="h-full">{Card}</div>
                    })}
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
                <div style={{ flexShrink:0, display:'flex' }}><Flame size={32} style={{ color:'var(--saffron)' }} /></div>
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
                {activeTab==='darshan' && <span className="ml-2" style={{ color:'var(--live)', display:'inline-flex', alignItems:'center', gap:4 }}><Radio size={13} /> Live only</span>}
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
