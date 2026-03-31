import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
import ReviewsSection from '@/components/temple/ReviewsSection'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectDB()
  const temple = await Temple.findOne({ slug: params.slug }).select('name state city deity description').lean()
  if (!temple) return { title: 'Temple Not Found' }
  return {
    title: `${temple.name} — ${temple.city}, ${temple.state}`,
    description: `${temple.name} in ${temple.city}, ${temple.state}. Dedicated to ${temple.deity}. ${temple.description.slice(0, 140)}...`,
    openGraph: {
      title: `${temple.name} | DivyaDarshan`,
      description: temple.description.slice(0, 160),
    },
  }
}

export async function generateStaticParams() {
  await connectDB()
  const temples = await Temple.find().select('slug').lean()
  return temples.map(t => ({ slug: t.slug }))
}

export default async function TemplePage({ params }: Props) {
  await connectDB()
  const temple = await Temple.findOne({ slug: params.slug }).lean()
  if (!temple) notFound()

  const related = await Temple.find({
    categories: { $in: temple.categories || [] },
    _id: { $ne: temple._id },
  })
    .select('slug name state city deity has_live rating_avg image_url')
    .limit(4)
    .lean()

  const t = { ...temple, id: temple._id.toString() }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 flex items-center gap-1.5" style={{ color: 'var(--muted2)' }}>
        <Link href="/">Home</Link> /
        <Link href="/explore">Temples</Link> /
        <Link href={`/explore?state=${t.state}`}>{t.state}</Link> /
        <span style={{ color: 'var(--ink)' }}>{t.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2">
          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden mb-6 aspect-video flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, var(--crimson), var(--crim-lt))' }}>
            {t.image_url
              ? <img src={t.image_url} alt={t.name} className="w-full h-full object-cover" />
              : <span className="text-8xl font-serif font-bold" style={{ color: 'rgba(255,255,255,.15)' }}>{t.name.charAt(0)}</span>}
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
          <p className="text-sm mb-6" style={{ color: 'var(--muted2)' }}>
            {t.deity} · {t.type} · {t.city}, {t.state}
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>{t.description}</p>

          {t.has_live && t.live_url && (
            <a href={t.live_url} target="_blank" rel="noopener" className="btn btn-primary mb-8 flex items-center gap-2 w-fit">
              <span className="live-dot" /> Watch Live Darshan
            </a>
          )}

          <ReviewsSection templeId={t.id} templeName={t.name} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card card-p">
            <h3 className="font-serif text-xl font-medium mb-4">Temple Information</h3>
            {[
              { label: 'Timing', value: t.timing },
              { label: 'Best Time', value: t.best_time },
              { label: 'Deity', value: t.deity },
              { label: 'Type', value: t.type },
              { label: 'Dress Code', value: t.dress_code },
            ].filter(i => i.value).map(info => (
              <div key={info.label} className="py-2.5 border-b flex justify-between gap-3" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted2)' }}>{info.label}</span>
                <span className="text-sm text-right" style={{ color: 'var(--ink)' }}>{info.value}</span>
              </div>
            ))}
          </div>

          {t.festivals && (
            <div className="card card-p">
              <h3 className="font-serif text-lg font-medium mb-3">Festivals</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{t.festivals}</p>
            </div>
          )}

          <div className="card card-p" style={{ background: 'var(--crimson)' }}>
            <h3 className="font-serif text-lg font-medium mb-2 text-white">Plan Your Yatra</h3>
            <p className="text-xs mb-4" style={{ color: 'rgba(237,224,196,.7)' }}>Get a complete AI-planned itinerary to {t.name}.</p>
            <Link href={`/plan?destination=${encodeURIComponent(t.name)}`}
              className="btn w-full justify-center text-sm" style={{ background: 'var(--gold-lt)', color: 'var(--crimson)' }}>
              Generate Itinerary →
            </Link>
            <Link href={`/yatra/goals?yatra=${encodeURIComponent(t.name)}`}
              className="btn btn-ghost w-full justify-center text-xs mt-2" style={{ color: 'rgba(237,224,196,.6)' }}>
              + Set Savings Goal
            </Link>
          </div>

          {t.rating_count > 0 && (
            <div className="card card-p text-center">
              <div className="font-serif text-4xl font-medium" style={{ color: 'var(--crimson)' }}>{t.rating_avg}</div>
              <div className="stars text-lg my-1">{'★'.repeat(Math.round(t.rating_avg))}{'☆'.repeat(5 - Math.round(t.rating_avg))}</div>
              <div className="text-xs" style={{ color: 'var(--muted2)' }}>{t.rating_count} reviews</div>
            </div>
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
                  style={{ background: 'linear-gradient(135deg, var(--crimson), var(--crim-lt))' }}>
                  {r.image_url
                    ? <img src={r.image_url} alt={r.name} className="w-full h-full object-cover absolute inset-0" />
                    : <span style={{ color: 'rgba(255,255,255,.2)' }}>{r.name.charAt(0)}</span>}
                  {r.has_live && <span className="absolute top-1.5 left-1.5 badge-live text-[9px]"><span className="live-dot w-1.5 h-1.5" /> Live</span>}
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium font-serif truncate">{r.name}</h4>
                  <p className="text-xs" style={{ color: 'var(--muted2)' }}>{r.state}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
