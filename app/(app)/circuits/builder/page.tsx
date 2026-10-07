import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Route, Sparkles } from 'lucide-react'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
import { buildCircuit, circuitMapsUrl } from '@/lib/nearbyCircuit'
import NearbyCircuit from '@/components/temple/NearbyCircuit'
import CircuitBuilderForm from '@/components/circuit/CircuitBuilderForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Circuit Builder — temples near you | DivyaDarshanam',
  description: 'Enter any city or use your location and instantly get a temple circuit within 100–300 km, sequenced into a sensible route with distances and a day estimate.',
}

export default async function CircuitBuilderPage({ searchParams }:
  { searchParams: { lat?: string; lng?: string; radius?: string; place?: string } }) {
  const lat = searchParams.lat ? parseFloat(searchParams.lat) : NaN
  const lng = searchParams.lng ? parseFloat(searchParams.lng) : NaN
  const radius = Math.min(300, Math.max(50, parseInt(searchParams.radius || '200', 10) || 200))
  const place = (searchParams.place || '').trim()
  const hasPoint = !isNaN(lat) && !isNaN(lng)

  let circuit = null as ReturnType<typeof buildCircuit> | null
  let mapsUrl = ''
  if (hasPoint) {
    await connectDB()
    const dLat = radius / 111 + 0.1
    const dLng = dLat / Math.max(0.2, Math.cos((lat * Math.PI) / 180))
    const candidates = await Temple.find({
      lat: { $gte: lat - dLat, $lte: lat + dLat, $ne: null },
      lng: { $gte: lng - dLng, $lte: lng + dLng, $ne: null },
    }).select('slug name deity city state lat lng has_live image_url blob_image_url').limit(200).lean() as any[]
    const built = buildCircuit({ name: place || 'your location', lat, lng }, candidates as any, radius, 10)
    if (built.count > 0) { circuit = built; mapsUrl = circuitMapsUrl({ lat, lng }, built.stops) }
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #C0570A 100%)', color: 'white', padding: '40px 24px 48px' }}>
        <div className="max-w-3xl mx-auto">
          <Link href="/circuits" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: 13, marginBottom: 14 }}>
            <ArrowLeft size={15} /> Pilgrimage circuits
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', opacity: 0.85 }}>Circuit Builder</div>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 100, background: 'rgba(255,255,255,.2)' }}>New</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 12, color: 'white' }}>
            Temples you can cover in one trip
          </h1>
          <p style={{ fontSize: 15.5, maxWidth: 620, lineHeight: 1.7, color: 'rgba(255,255,255,0.92)' }}>
            Tell us where you&rsquo;re starting and how far you&rsquo;ll go — we&rsquo;ll find every temple in range and sequence
            them into a sensible route, nearest first. A circuit from <em>anywhere</em>, not just the famous ones.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <CircuitBuilderForm initialCity={place === 'My location' ? '' : place} initialRadius={radius} />

        {/* Result */}
        <div style={{ marginTop: 24 }}>
          {hasPoint && circuit && (
            <NearbyCircuit
              circuit={circuit}
              mapsUrl={mapsUrl}
              anchorName={place || 'your location'}
              title={`Your circuit from ${place || 'your location'}`}
              showBadge={false}
            />
          )}

          {hasPoint && !circuit && (
            <div className="card card-p" style={{ textAlign: 'center', marginTop: 8 }}>
              <Route size={28} style={{ color: 'var(--muted2)', margin: '0 auto 8px' }} />
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>
                No temples in our directory within {radius} km of {place || 'that point'} yet. Try a larger radius, or a nearby city.
              </p>
            </div>
          )}

          {!hasPoint && (
            <div className="card card-p" style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Sparkles size={18} style={{ color: 'var(--saffron)', flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65 }}>
                  Pick a city (or use your location) and a radius above, then tap <strong>Build my circuit</strong>.
                  You&rsquo;ll get an ordered list of temples with the distance for each leg, the total by road, a rough
                  number of days, and a one-tap Google Maps route for the whole trip.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
