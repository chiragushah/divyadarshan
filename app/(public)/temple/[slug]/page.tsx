import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
import ReviewsSection from '@/components/temple/ReviewsSection'

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
  toilets: '🚻', parking: '🅿️', drinking_water: '💧', prasad: '🪔',
  cloak_room: '🧳', accommodation: '🏨', wheelchair: '♿', atm: '🏧',
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
          {/* ── MAIN ───────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video flex items-center justify-center relative"
              style={{ background:'linear-gradient(135deg, var(--crimson), var(--crim-lt))' }}>
              {t.image_url
                ? <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" />
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
            <p className="text-sm mb-6" style={{ color:'var(--muted2)' }}>
              {t.deity} · {t.type} · {t.city}, {t.state}
            </p>

            {/* Description */}
            <p className="text-base leading-relaxed mb-4" style={{ color:'var(--muted)' }}>
              {t.extended_description || t.description}
            </p>

            {t.has_live && t.live_url && (
              <a href={t.live_url} target="_blank" rel="noopener"
                className="btn btn-primary mb-8 flex items-center gap-2 w-fit">
                <span className="live-dot" /> Watch Live Darshan
              </a>
            )}

            {/* ── FACILITIES ─────────────────── */}
            {Object.keys(facilities).length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-medium mb-1">Facilities & Amenities</h2>
                <p className="text-sm mb-4" style={{ color:'var(--muted2)' }}>
                  What to expect when you visit
                </p>

                {/* Toilets banner — prominent */}
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
                            <span className="fac-icon">{FACILITY_ICONS[key] || '📌'}</span>
                            <span className="fac-label">{FACILITY_LABELS[key] || key}</span>
                          </div>
                          <div className="fac-value">{String(val)}</div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            {/* ── NEARBY PLACES ──────────────── */}
            {nearby.length > 0 && (
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-medium mb-1">Places Nearby</h2>
                <p className="text-sm mb-4" style={{ color:'var(--muted2)' }}>
                  Extend your visit — temples, heritage, nature
                </p>
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
              </div>
            )}

            <ReviewsSection templeId={t.id} templeName={t.name} />
          </div>

          {/* ── SIDEBAR ───────────────────────── */}
          <div className="space-y-4">
            <div className="card card-p">
              <h3 className="font-serif text-xl font-medium mb-4">Temple Information</h3>
              {[
                { label:'Timing',    value:t.timing },
                { label:'Best Time', value:t.best_time },
                { label:'Deity',     value:t.deity },
                { label:'Type',      value:t.type },
                { label:'Dress Code',value:t.dress_code },
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
                        <span style={{ fontSize:14 }}>{FACILITY_ICONS[key] || '📌'}</span>
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

            <div className="card card-p" style={{ background:'var(--crimson)' }}>
              <h3 className="font-serif text-lg font-medium mb-2 text-white">Plan Your Yatra</h3>
              <p className="text-xs mb-4" style={{ color:'rgba(237,224,196,.7)' }}>
                Get a complete AI-planned itinerary to {t.name}.
              </p>
              <Link href={`/plan?destination=${encodeURIComponent(t.name)}`}
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
