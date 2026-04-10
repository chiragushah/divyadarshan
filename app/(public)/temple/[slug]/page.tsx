import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
import LiveDarshanPlayer from '@/components/temple/LiveDarshanPlayer'
import ReviewsSection from '@/components/temple/ReviewsSection'
import TempleStatusBadge from '@/components/temple/TempleStatusBadge'
import DataConfidenceBadge from '@/components/temple/DataConfidenceBadge'
import ReportButton from '@/components/temple/ReportButton'
import MarkVisited from '@/components/temple/MarkVisited'
import LiveDarshanStatus from '@/components/temple/LiveDarshanStatus'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectDB()
  const temple = await Temple.findOne({ slug: params.slug }).select('name state city deity description').lean() as any
  if (!temple) return { title: 'Temple Not Found' }
  return {
    title: `${temple.name} — ${temple.city}, ${temple.state} | DivyaDarshan`,
    description: `${temple.name} in ${temple.city}, ${temple.state}. Dedicated to ${temple.deity}. ${temple.description?.slice(0, 140)}...`,
    openGraph: { title: `${temple.name} | DivyaDarshan`, description: temple.description?.slice(0, 160) },
  }
}

export async function generateStaticParams() {
  await connectDB()
  const temples = await Temple.find().select('slug').lean() as any[]
  return temples.map((t: any) => ({ slug: t.slug }))
}

const FACILITY_ICONS: Record<string, string> = {
  toilets: '🚻', parking: '🅿️', drinking_water: '🚰', prasad: '🍬',
  cloak_room: '🎒', accommodation: '🏨', wheelchair: '♿', atm: '🏧',
  medical: '🏥', free_meals: '🍱',
}
const FACILITY_LABELS: Record<string, string> = {
  toilets: 'Toilets', parking: 'Parking', drinking_water: 'Drinking Water', prasad: 'Prasad',
  cloak_room: 'Cloak Room', accommodation: 'Stay', wheelchair: 'Wheelchair', atm: 'ATM',
  medical: 'Medical', free_meals: 'Free Meals',
}

export default async function TemplePage({ params }: Props) {
  await connectDB()
  const temple = await Temple.findOne({ slug: params.slug }).lean() as any
  if (!temple) notFound()

  const related = await Temple.find({
    categories: { $in: temple.categories || [] },
    _id: { $ne: temple._id },
  }).select('slug name state city deity has_live rating_avg image_url').limit(4).lean() as any[]

  const t = { ...temple, id: temple._id.toString() }
  const facilities = t.facilities || {}
  const nearby = t.nearby_places || []

  return (
    <>
      <style>{`
        .fac-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; }
        .fac-item { background:#fff; border:1.5px solid var(--border); border-radius:10px; padding:12px; }
        .fac-item.yes { border-color:rgba(22,163,74,.25); background:rgba(22,163,74,.03); }
        .fac-item.partial { border-color:rgba(234,179,8,.25); background:rgba(234,179,8,.03); }
        .fac-item.no { border-color:rgba(239,68,68,.2); background:rgba(239,68,68,.02); }
        .fac-header { display:flex; align-items:center; gap:8px; margin-bottom:5px; }
        .fac-icon { font-size:18px; }
        .fac-label { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--muted2); }
        .fac-value { font-size:12px; line-height:1.55; color:var(--ink); }
        .nearby-list { list-style:none; padding:0; }
        .nearby-item { display:flex; align-items:flex-start; gap:8px; padding:8px 0; border-bottom:1px solid var(--border); font-size:13px; color:var(--muted); line-height:1.5; }
        .nearby-item:last-child { border-bottom:none; }
        .nearby-dot { width:6px; height:6px; border-radius:50%; background:var(--crimson); margin-top:5px; flex-shrink:0; }
        .toilet-banner { background:linear-gradient(135deg,rgba(22,163,74,.08),rgba(22,163,74,.04)); border:1.5px solid rgba(22,163,74,.2); border-radius:12px; padding:14px 16px; margin-bottom:12px; }
        .book-btn { display:flex; align-items:center; gap:10px; padding:10px 12px; border:1.5px solid var(--border); border-radius:10px; text-decoration:none; transition:border-color .2s; }
        .book-btn:hover { border-color:var(--crimson); }
        @media(max-width:600px){ .fac-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs mb-6 flex items-center gap-1.5" style={{ color:'var(--muted2)' }}>
          <Link href="/">Home</Link> /
          <Link href="/explore">Temples</Link> /
          <Link href={`/explore?state=${t.state}`}>{t.state}</Link> /
          <span style={{ color:'var(--ink)' }}>{t.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* —— MAIN ————————————————————————————————— */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video flex items-center justify-center relative"
              style={{ background:'linear-gradient(135deg, var(--crimson), var(--crim-lt))' }}>
              {t.image_url
                ? <img src={t.image_url.includes('wikimedia') ? `/api/image-proxy?url=${encodeURIComponent(t.image_url)}` : t.image_url} alt={t.name} className="w-full h-full object-cover" />
                : <span className="text-8xl font-serif font-bold" style={{ color:'rgba(255,255,255,.15)' }}>{t.name.charAt(0)}</span>}
              {t.has_live && (
                <div className="absolute top-4 left-4">
                  <span className="badge-live px-3 py-1.5 text-xs font-semibold rounded-lg">
                    <span className="live-dot" /> Live Darshan Available
                  </span>
                </div>
              )}
            </div>

            {/* Categories */}
            {(t.categories?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {t.categories.map((cat: string) => (
                  <Link key={cat} href={`/explore?category=${encodeURIComponent(cat)}`} className="badge-gold">{cat}</Link>
                ))}
              </div>
            )}

            <h1 className="font-serif text-4xl font-medium mb-2">{t.name}</h1>
            {(t.is_seasonal || t.open_months?.length > 0) && (
              <div className="mb-3">
                <TempleStatusBadge
                  open_months={t.open_months}
                  closed_months={t.closed_months}
                  seasonal_note={t.seasonal_note}
                  is_seasonal={t.is_seasonal}
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" style={{ color:'var(--muted2)' }}>{t.deity} · {t.type} · {t.city}, {t.state}</p>
              <MarkVisited templeSlug={t.slug} templeName={t.name} />
              <DataConfidenceBadge />
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed mb-4" style={{ color:'var(--muted)' }}>
              {t.extended_description || t.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <ReportButton templeSlug={t.slug} templeName={t.name} />
              <span className="text-xs px-2 py-1 rounded" style={{ background:'var(--sandstone)', color:'var(--muted2)' }}>
                Last updated: {new Date(t.updatedAt || t.createdAt || Date.now()).toLocaleDateString('en-IN', { month:'short', year:'numeric' })}
              </span>
            </div>

            {t.has_live && (
              <LiveDarshanStatus
                liveUrl={t.live_url}
                liveSchedule={t.live_schedule}
                timing={t.timing}
              />
            )}

            {/* —— FACILITIES ——————————————————————— */}
            {Object.keys(facilities).length > 0 && (
              {/* Google Maps */}
              {t.lat && t.lng && (
                <div style={{ marginBottom: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.name + ' ' + t.city + ' ' + t.state)}&center=${t.lat},${t.lng}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#fff', border:'1.5px solid var(--border)', borderRadius:10, padding:'10px 18px', textDecoration:'none', fontSize:13, fontWeight:600, color:'var(--ink)' }}
                  >
                    📍 View on Google Maps
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#fff', border:'1.5px solid var(--border)', borderRadius:10, padding:'10px 18px', textDecoration:'none', fontSize:13, fontWeight:600, color:'var(--ink)' }}
                  >
                    🧭 Get Directions
                  </a>
                </div>
              )}

              <div className="mb-8">
              {/* Live Darshan Player */}
              {t.has_live && t.live_url && (
                <LiveDarshanPlayer
                  liveUrl={t.live_url}
                  templeName={t.name}
                  channelId={(t as any).youtube_channel_id}
                />
              )}
                <h2 className="font-serif text-2xl font-medium mb-1">Facilities & Amenities</h2>
                <p className="text-sm mb-4" style={{ color:'var(--muted2)' }}>
                  What to expect when you visit
                </p>

                {facilities.toilets && (
                  <div className="toilet-banner">
                    <div className="flex items-start gap-3">
                      <span style={{ fontSize:24 }}>🚻</span>
                      <div>
                        <div style={{ fontWeight:700, fontSize:13, marginBottom:4, color:'#166534' }}>Toilet Facilities</div>
                        <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6 }}>{facilities.toilets}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="fac-grid">
                  {Object.entries(facilities)
                    .filter(([k]) => k !== 'toilets')
                    .map(([key, val]: [string, any]) => {
                      const isYes = String(val).startsWith('✅')
                      const isNo  = String(val).startsWith('❌')
                      return (
                        <div key={key} className={`fac-item ${isYes?'yes':isNo?'no':'partial'}`}>
                          <div className="fac-header">
                            <span className="fac-icon">{FACILITY_ICONS[key] || '📎'}</span>
                            <span className="fac-label">{FACILITY_LABELS[key] || key}</span>
                          </div>
                          <div className="fac-value">{String(val)}</div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            {/* —— NEARBY PLACES ———————————————————— */}
            {nearby.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-medium mb-1">Places Nearby</h2>
                <p className="text-sm mb-4" style={{ color:'var(--muted2)' }}>
                  Extend your visit — temples, heritage, nature and more
                </p>
                <style>{`
                  .nearby-type-temple   { background:rgba(192,87,10,.1);  color:#7a3a08; }
                  .nearby-type-heritage { background:rgba(109,40,217,.1); color:#4c1d95; }
                  .nearby-type-nature   { background:rgba(22,163,74,.1);  color:#166534; }
                  .nearby-type-food     { background:rgba(234,179,8,.15); color:#78350f; }
                  .nearby-type-market   { background:rgba(59,130,246,.1); color:#1e40af; }
                  .nearby-type-ashram   { background:rgba(190,18,60,.1);  color:#9f1239; }
                  .nearby-type-default  { background:rgba(120,113,108,.1);color:#44403c; }
                  .nearby-rich-item { display:grid; grid-template-columns:36px 1fr; gap:12px; padding:12px 0; border-bottom:1px solid var(--border); align-items:flex-start; }
                  .nearby-rich-item:last-child { border-bottom:none; }
                  .nearby-type-badge { font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; padding:2px 7px; border-radius:4px; display:inline-block; margin-bottom:3px; }
                `}</style>

                {(() => {
                  const TYPE_ICONS: Record<string,string> = {
                    temple:'🛕', heritage:'🏛️', nature:'🌿', food:'🍽️', market:'🛍️', ashram:'🧘', default:'📍'
                  }
                  const TYPE_LABELS: Record<string,string> = {
                    temple:'Temple', heritage:'Heritage', nature:'Nature', food:'Food & Stay', market:'Market', ashram:'Ashram', default:'Nearby'
                  }
                  // Support both old string[] and new object[] format
                {/* Google Maps Embed */}
                {t.lat && t.lng && (
                  <div style={{ borderRadius:12, overflow:'hidden', border:'1.5px solid var(--border)', marginBottom:16 }}>
                    <iframe
                      src={`https://www.google.com/maps?q=${t.lat},${t.lng}&z=15&output=embed`}
                      width="100%" height="260"
                      style={{ border:'none', display:'block' }}
                      allowFullScreen loading="lazy"
                      title={`Map of ${t.name}`}
                    />
                  </div>
                )}

                  const isRich = nearby.length > 0 && typeof nearby[0] === 'object'

                  if (isRich) {
                    // Group by type
                    const grouped: Record<string, any[]> = {}
                    nearby.forEach((p: any) => {
                      const t = p.type || 'default'
                      if (!grouped[t]) grouped[t] = []
                      grouped[t].push(p)
                    })
                    const order = ['temple','heritage','nature','ashram','food','market','default']
                    const sorted = order.filter(k => grouped[k]).flatMap(k => grouped[k])

                    return (
                      <div className="card card-p" style={{ padding:0, overflow:'hidden' }}>
                        {/* Type filter pills */}
                        <div style={{ padding:'12px 16px', borderBottom:'1px solid var(--border)', display:'flex', flexWrap:'wrap', gap:6 }}>
                          {Object.keys(grouped).map(type => (
                            <span key={type} className={`nearby-type-badge nearby-type-${type}`}>
                              {TYPE_ICONS[type] || '📍'} {TYPE_LABELS[type] || type} ({grouped[type].length})
                            </span>
                          ))}
                        </div>
                        <div style={{ padding:'0 16px' }}>
                          {sorted.map((place: any, i: number) => (
                            <div key={i} className="nearby-rich-item">
                              <div style={{
                                width:36, height:36, borderRadius:10, display:'flex',
                                alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0,
                                background:'var(--ivory2)',
                              }}>
                                {TYPE_ICONS[place.type] || '📍'}
                              </div>
                              <div>
                                <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:2 }}>
                                  <span style={{ fontWeight:700, fontSize:13, color:'var(--ink)' }}>{place.name}</span>
                                  {place.distance && (
                                    <span style={{ fontSize:11, color:'var(--muted2)', background:'var(--ivory2)', padding:'1px 7px', borderRadius:4 }}>
                                      📍 {place.distance}
                                    </span>
                                  )}
                                </div>
                                {place.description && (
                                  <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.6 }}>{place.description}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  // Fallback: old plain string format
                  return (
                    <div className="card card-p">
                      <ul className="nearby-list">
                        {nearby.map((place: string, i: number) => (
                          <li key={i} className="nearby-item">
                            <span className="nearby-dot" />
                            <span>{place}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* —— HOW TO REACH ————————————————————— */}
            {t.how_to_reach && Object.keys(t.how_to_reach).length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-medium mb-1">How to Reach</h2>
                <p className="text-sm mb-4" style={{ color:'var(--muted2)' }}>
                  Airport, trains, buses, taxi costs — everything you need
                </p>
                <div className="card card-p" style={{ padding:0, overflow:'hidden' }}>
                  {[
                    { key:'by_air',     label:'By Air',         icon:'✈️' },
                    { key:'by_train',   label:'By Train',       icon:'🚅' },
                    { key:'by_bus',     label:'By Bus',         icon:'🚌' },
                    { key:'by_taxi',    label:'By Taxi / Auto', icon:'🚕' },
                    { key:'local_tips', label:'Local Tips',     icon:'💡' },
                  ].filter(item => t.how_to_reach[item.key]).map((item, idx, arr) => (
                    <div key={item.key} style={{
                      padding:'14px 18px',
                      borderBottom: idx < arr.length-1 ? '1px solid var(--border)' : 'none',
                      display:'grid',
                      gridTemplateColumns:'32px 1fr',
                      gap:12,
                      alignItems:'flex-start',
                    }}>
                      <span style={{ fontSize:20, marginTop:1 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted2)', marginBottom:4 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize:13, lineHeight:1.65, color:'var(--ink)' }}>
                          {t.how_to_reach[item.key]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* —— RECOMMENDED POOJAS ——————————————— */}
            {t.poojas && t.poojas.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-medium mb-1">Recommended Poojas</h2>
                <p className="text-sm mb-4" style={{ color:'var(--muted2)' }}>
                  Sacred rituals this temple is known for
                </p>
                <style>{`
                  .pooja-card { border:1.5px solid var(--border); border-radius:12px; padding:14px 16px; background:#fff; margin-bottom:10px; }
                  .pooja-card.famous { border-color:rgba(192,87,10,.3); background:rgba(192,87,10,.03); }
                  .pooja-badge { display:inline-block; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; padding:2px 8px; border-radius:4px; margin-bottom:6px; }
                  .pooja-badge.famous { background:rgba(192,87,10,.12); color:var(--saffron); }
                  .pooja-badge.regular { background:rgba(22,101,52,.1); color:#166534; }
                  .pooja-meta { display:flex; flex-wrap:wrap; gap:10px; margin-top:8px; }
                  .pooja-meta-item { display:flex; align-items:center; gap:4px; font-size:11px; color:var(--muted2); }
                `}</style>
                <div>
                  {t.poojas.map((pooja: any, i: number) => (
                    <div key={i} className={`pooja-card${pooja.is_famous ? ' famous' : ''}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div>
                            <span className={`pooja-badge ${pooja.is_famous ? 'famous' : 'regular'}`}>
                              {pooja.is_famous ? '⭐ Most Famous' : '🪔 Recommended'}
                            </span>
                          </div>
                          <div style={{ fontWeight:700, fontSize:15, color:'var(--ink)', marginBottom:4 }}>
                            {pooja.name}
                          </div>
                          <div style={{ fontSize:13, lineHeight:1.65, color:'var(--muted)' }}>
                            {pooja.description}
                          </div>
                          {pooja.best_for && (
                            <div style={{ fontSize:11, marginTop:6, color:'var(--muted2)' }}>
                              🙏 Best for: <strong style={{ color:'var(--ink)' }}>{pooja.best_for}</strong>
                            </div>
                          )}
                          <div className="pooja-meta">
                            {pooja.price && (
                              <span className="pooja-meta-item">
                                💰 <strong style={{ color:'var(--ink)' }}>{pooja.price}</strong>
                              </span>
                            )}
                            {pooja.duration && (
                              <span className="pooja-meta-item">
                                ⏱️ {pooja.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        {pooja.booking_url && (
                          <a href={pooja.booking_url} target="_blank" rel="noopener"
                            style={{
                              flexShrink:0, padding:'6px 14px',
                              background:'var(--crimson)', color:'white',
                              borderRadius:8, fontSize:12, fontWeight:600,
                              textDecoration:'none', whiteSpace:'nowrap',
                            }}>
                            Book →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* —— BOOK & AFFILIATE ———————————————— */}
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-medium mb-1">Plan & Book</h2>
              <p className="text-sm mb-4" style={{ color:'var(--muted2)' }}>Hotels, trains, buses — everything for your yatra</p>

              {/* Darshan booking for major temples */}
              {t.official_website && (t.slug === 'tirumala-venkateswara-temple' || t.slug === 'vaishno-devi-shrine' || t.slug === 'shirdi-sai-baba-samadhi' || t.slug === 'kedarnath-temple') && (
                <a href={
                  t.slug === 'tirumala-venkateswara-temple' ? 'https://tirupati.org/darshan' :
                  t.slug === 'vaishno-devi-shrine' ? 'https://maavaishnodevi.org/registration' :
                  t.slug === 'shirdi-sai-baba-samadhi' ? 'https://online.shrisaibabasansthan.org' :
                  t.slug === 'kedarnath-temple' ? 'https://registrationandtouristcare.uk.gov.in' : '#'
                } target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-3 rounded-xl mb-3 text-sm font-medium"
                  style={{ background:'rgba(192,87,10,.08)', border:'1.5px solid rgba(192,87,10,.2)', color:'var(--saffron)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🎟️</span>
                  <div>
                    <div style={{ fontWeight:700 }}>Book Official Darshan Slot</div>
                    <div style={{ fontSize:11, opacity:.7 }}>Skip the queue — book online in advance</div>
                  </div>
                  <span className="ml-auto">→</span>
                </a>
              )}

              {/* Affiliate buttons — hover handled via CSS .book-btn class */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                {t.booking_links?.hotels && (
                  <a href={t.booking_links.hotels} target="_blank" rel="noopener" className="book-btn">
                    <span style={{ fontSize:20 }}>🏨</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:'var(--ink)' }}>Hotels Nearby</div>
                      <div style={{ fontSize:10, color:'var(--muted2)' }}>via MakeMyTrip</div>
                    </div>
                  </a>
                )}
                {t.booking_links?.trains && (
                  <a href={t.booking_links.trains} target="_blank" rel="noopener" className="book-btn">
                    <span style={{ fontSize:20 }}>🚅</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:'var(--ink)' }}>Train Tickets</div>
                      <div style={{ fontSize:10, color:'var(--muted2)' }}>via IRCTC</div>
                    </div>
                  </a>
                )}
              </div>

              {/* Plan Yatra CTA — for accurate trains, buses, flights */}
              <Link
                href={`/plan?destination=${encodeURIComponent(t.name)}&city=${encodeURIComponent(t.city||'')}&state=${encodeURIComponent(t.state||'')}&deity=${encodeURIComponent(t.deity||'')}`}
                className="flex items-center gap-3 p-3 rounded-xl mb-3 text-sm font-medium"
                style={{ background:'rgba(192,87,10,.08)', border:'1.5px solid rgba(192,87,10,.2)', color:'var(--saffron)', textDecoration:'none' }}>
                <span style={{ fontSize:18 }}>🗺️</span>
                <div>
                  <div style={{ fontWeight:700 }}>Plan your full journey</div>
                  <div style={{ fontSize:11, opacity:.7 }}>Get trains, buses & flights based on your starting city</div>
                </div>
                <span className="ml-auto">→</span>
              </Link>

              {/* FinVerse Savings CTA */}
              <div className="mt-3 p-3 rounded-xl" style={{ background:'linear-gradient(135deg, var(--crimson), #4a0a0a)', color:'white' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div style={{ fontWeight:700, fontSize:13 }}>💰 Save for this Yatra</div>
                    <div style={{ fontSize:11, opacity:.75, marginTop:2 }}>Open a dedicated yatra savings fund on FinVerse. Earn interest while you save.</div>
                  </div>
                  <a href={`https://finverse.app?utm_source=divyadarshan&utm_temple=${t.slug}`}
                    target="_blank" rel="noopener"
                    style={{ flexShrink:0, marginLeft:12, padding:'6px 12px', background:'rgba(255,255,255,.15)', borderRadius:8, fontSize:11, fontWeight:600, color:'white', textDecoration:'none', border:'1px solid rgba(255,255,255,.2)' }}>
                    Open Fund →
                  </a>
                </div>
              </div>
            </div>

            <ReviewsSection templeId={t.id} templeName={t.name} />
          </div>

          {/* —— SIDEBAR ————————————————————————————— */}
          <div className="space-y-4">
            <div className="card card-p">
              <h3 className="font-serif text-xl font-medium mb-4">Temple Information</h3>
              {[
                { label:'Timing',    value:t.timing },
                { label:'Best Time', value:t.best_time },
                { label:'Deity',     value:t.deity },
                { label:'Type',      value:t.type },
                { label:'Dress Code',value:t.dress_code },
                { label:'Entry Fee', value:t.entry_fee },
                { label:'Governed By', value:t.governance },
              ].filter(i => i.value).map(info => (
                <div key={info.label} className="py-2.5 border-b flex justify-between gap-3"
                  style={{ borderColor:'var(--border)' }}>
                  <span className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color:'var(--muted2)' }}>{info.label}</span>
                  <span className="text-sm text-right" style={{ color:'var(--ink)' }}>{info.value}</span>
                </div>
              ))}
            </div>

            {/* Quick facilities summary in sidebar */}
            {Object.keys(facilities).length > 0 && (
              <div className="card card-p">
                <h3 className="font-serif text-lg font-medium mb-3">Quick Facilities Check</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {Object.entries(facilities).map(([key, val]: [string, any]) => {
                    const isYes = String(val).startsWith('✅')
                    const isNo = String(val).startsWith('❌')
                    return (
                      <div key={key} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11 }}>
                        <span style={{ fontSize:14 }}>{FACILITY_ICONS[key] || '📎'}</span>
                        <span style={{ color: isYes ? '#166534' : isNo ? '#991B1B' : '#92400E', fontWeight:500 }}>
                          {FACILITY_LABELS[key] || key}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {t.festivals && (
              <div className="card card-p">
                <h3 className="font-serif text-lg font-medium mb-3">Festivals</h3>
                <p className="text-sm leading-relaxed" style={{ color:'var(--muted)' }}>{t.festivals}</p>
              </div>
            )}


            {/* Contact & Visit */}
            {(t.website || t.official_website || t.phone || t.wikipedia_url) && (
              <div className="card card-p">
                <h3 className="font-serif text-lg font-medium mb-3">Contact & Visit</h3>
                <div className="space-y-2">
                  {(t.website || t.official_website) && (
                    <a href={t.website || t.official_website} target="_blank" rel="noopener"
                      className="flex items-center gap-3 p-2.5 rounded-xl"
                      style={{ background:'rgba(192,87,10,0.06)', border:'1px solid rgba(192,87,10,0.15)', textDecoration:'none' }}>
                      <span style={{ fontSize:18 }}>🌐</span>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Official Website</div>
                        <div style={{ fontSize:10, color:'var(--muted2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                          {(t.website || t.official_website || '').replace('https://','').replace('http://','')}
                        </div>
                      </div>
                      <span style={{ color:'var(--saffron)', fontSize:12 }}>→</span>
                    </a>
                  )}
                  {t.phone && (
                    <a href={`tel:${t.phone.replace(/[^0-9+]/g,'')}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl"
                      style={{ background:'rgba(22,163,74,0.06)', border:'1px solid rgba(22,163,74,0.15)', textDecoration:'none' }}>
                      <span style={{ fontSize:18 }}>📞</span>
                      <div>
                        <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Phone</div>
                        <div style={{ fontSize:11, color:'var(--muted2)' }}>{t.phone}</div>
                      </div>
                    </a>
                  )}
                  {t.wikipedia_url && (
                    <a href={t.wikipedia_url} target="_blank" rel="noopener"
                      className="flex items-center gap-3 p-2.5 rounded-xl"
                      style={{ background:'rgba(59,130,246,0.06)', border:'1px solid rgba(59,130,246,0.15)', textDecoration:'none' }}>
                      <span style={{ fontSize:18 }}>📖</span>
                      <div className="flex-1">
                        <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Wikipedia</div>
                        <div style={{ fontSize:10, color:'var(--muted2)' }}>Full history & details</div>
                      </div>
                      <span style={{ color:'#3b82f6', fontSize:12, marginLeft:'auto' }}>→</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Find & Book Online */}
            <div className="card card-p">
              <h3 className="font-serif text-lg font-medium mb-3">Find & Book Online</h3>
              <div className="space-y-2">

                {/* TripAdvisor */}
                <a href={`https://www.google.com/search?q=${encodeURIComponent(t.name + " " + t.city)}+reviews+temple`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors hover:opacity-90"
                  style={{ background:'#4285F4', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>⭐</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:700, fontSize:12, color:'white' }}>Google Reviews</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.8)' }}>Read traveller reviews & tips</div>
                  </div>
                  <span style={{ color:'white', fontSize:12 }}>→</span>
                </a>

                {/* Google Maps */}
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.name + ' ' + t.city + ' ' + t.state)}`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(66,133,244,0.08)', border:'1px solid rgba(66,133,244,0.2)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🗺️</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Google Maps</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>Directions & street view</div>
                  </div>
                  <span style={{ color:'#4285F4', fontSize:12 }}>→</span>
                </a>

                {/* Hotels - MakeMyTrip */}
                

                {/* Hotels - Google Hotels */}
                <a href={`https://www.google.com/travel/hotels/${encodeURIComponent(t.city + ', ' + t.state + ', India')}`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(52,168,83,0.06)', border:'1px solid rgba(52,168,83,0.15)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🏩</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Google Hotels</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>Compare prices near {t.city}</div>
                  </div>
                  <span style={{ color:'#34A853', fontSize:12 }}>→</span>
                </a>

                {/* Trains - IRCTC */}
                <a href="https://www.irctc.co.in/nget/train-search"
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(0,100,0,0.06)', border:'1px solid rgba(0,100,0,0.15)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🚂</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Trains to {t.city}</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via IRCTC</div>
                  </div>
                  <span style={{ color:'#006400', fontSize:12 }}>→</span>
                </a>

                {/* Bus - RedBus */}
                <a href={`https://www.google.com/search?q=bus+to+${encodeURIComponent(t.city)}+India`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(210,43,43,0.06)', border:'1px solid rgba(210,43,43,0.15)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🚌</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Bus to {t.city}</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via RedBus</div>
                  </div>
                  <span style={{ color:'#D22B2B', fontSize:12 }}>→</span>
                </a>

                {/* Flights - Google Flights */}
                <a href={`https://www.google.com/flights?q=flights+to+${encodeURIComponent(t.city + ' ' + t.state + ' India')}`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(251,188,4,0.08)', border:'1px solid rgba(251,188,4,0.25)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>✈️</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Flights to {t.state}</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via Google Flights</div>
                  </div>
                  <span style={{ color:'#FBBC04', fontSize:12 }}>→</span>
                </a>

                {/* Cab - Ola */}
                <a href={`https://book.olacabs.com/?serviceType=p2p&drop=${encodeURIComponent(t.name + ', ' + t.city)}`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(0,0,0,0.04)', border:'1px solid rgba(0,0,0,0.1)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🚖</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Book a Cab</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via Ola</div>
                  </div>
                  <span style={{ color:'var(--muted)', fontSize:12 }}>→</span>
                </a>

              </div>
            </div>

            <div className="card card-p" style={{ background:'var(--crimson)' }}>
              <h3 className="font-serif text-lg font-medium mb-2 text-white">Plan Your Yatra</h3>
              <p className="text-xs mb-4" style={{ color:'rgba(237,224,196,.7)' }}>
                Get a complete AI-planned itinerary to {t.name}.
              </p>
              <Link href={`/plan?destination=${encodeURIComponent(t.name)}&city=${encodeURIComponent(t.city || '')}&state=${encodeURIComponent(t.state || '')}&deity=${encodeURIComponent(t.deity || '')}`}
                className="btn w-full justify-center text-sm"
                style={{ background:'var(--gold-lt)', color:'var(--crimson)' }}>
                Generate Itinerary →
              </Link>
              <Link href={`/yatra/goals?yatra=${encodeURIComponent(t.name)}`}
                className="btn btn-ghost w-full justify-center text-xs mt-2"
                style={{ color:'rgba(237,224,196,.6)' }}>
                + Set Savings Goal
              </Link>
            </div>

            {t.rating_count > 0 && (
              <div className="card card-p text-center">
                <div className="font-serif text-4xl font-medium" style={{ color:'var(--crimson)' }}>{t.rating_avg}</div>
                <div className="stars text-lg my-1">{'★'.repeat(Math.round(t.rating_avg))}{'☆'.repeat(5-Math.round(t.rating_avg))}</div>
                <div className="text-xs" style={{ color:'var(--muted2)' }}>{t.rating_count} reviews</div>
              </div>
            )}

            {t.official_website && (
              <a href={t.official_website} target="_blank" rel="noopener"
                className="card card-p flex items-center gap-3 hover:border-saffron transition-colors"
                style={{ textDecoration:'none' }}>
                <span style={{ fontSize:22 }}>🌐</span>
                <div>
                  <div style={{ fontWeight:600, fontSize:13, color:'var(--ink)' }}>Official Website</div>
                  <div style={{ fontSize:11, color:'var(--muted2)', wordBreak:'break-all' }}>{t.official_website.replace('https://','')}</div>
                </div>
              </a>
            )}

            {t.lat && t.lng && (
              <a href={`https://maps.google.com/?q=${t.lat},${t.lng}&query=${encodeURIComponent(t.name)}`}
                target="_blank" rel="noopener"
                className="card card-p flex items-center gap-3 hover:border-saffron transition-colors"
                style={{ textDecoration:'none' }}>
                <span style={{ fontSize:24 }}>📍</span>
                <div>
                  <div style={{ fontWeight:600, fontSize:13, color:'var(--ink)' }}>Get Directions</div>
                  <div style={{ fontSize:11, color:'var(--muted2)' }}>{t.city}, {t.state}</div>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="section-title">You may also like</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              {related.map((r: any) => (
                <Link key={r._id.toString()} href={`/temple/${r.slug}`}
                  className="card group overflow-hidden hover:-translate-y-1 transition-all block">
                  <div className="h-28 flex items-center justify-center text-3xl font-serif font-bold relative"
                    style={{ background:'linear-gradient(135deg, var(--crimson), var(--crim-lt))' }}>
                    {r.image_url
                      ? <img src={r.image_url} alt={r.name} className="w-full h-full object-cover absolute inset-0" />
                      : <span style={{ color:'rgba(255,255,255,.2)' }}>{r.name.charAt(0)}</span>}
                    {r.has_live && (
                      <span className="absolute top-1.5 left-1.5 badge-live text-[9px]">
                        <span className="live-dot w-1.5 h-1.5" /> Live
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-medium font-serif truncate">{r.name}</h4>
                    <p className="text-xs" style={{ color:'var(--muted2)' }}>{r.state}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
