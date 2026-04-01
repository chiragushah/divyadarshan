'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Loader2, MapPin, Clock, Users, Star, IndianRupee, Phone } from 'lucide-react'

const DIFFICULTIES: Record<string, string> = {
  'Easy': 'bg-green-100 text-green-800',
  'Moderate': 'bg-yellow-100 text-yellow-800',
  'Challenging': 'bg-orange-100 text-orange-800',
  'Strenuous': 'bg-red-100 text-red-800',
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/api/packages').then(r => r.json()).then(d => {
      setPackages(d.packages || [])
      setLoading(false)
    })
  }, [])

  const circuits = ['all', ...Array.from(new Set(packages.map((p: any) => p.circuit).filter(Boolean)))]
  const filtered = filter === 'all' ? packages : packages.filter(p => p.circuit === filter)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="section-label">Curated Pilgrimages</div>
        <h1 className="font-serif text-4xl font-medium mb-3">Yatra Packages</h1>
        <p className="text-base max-w-2xl" style={{ color: 'var(--muted)' }}>
          Carefully planned pilgrimage circuits — temples, stays, transport and guidance all organised. 
          Tell us your travel dates and we handle everything.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {circuits.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === c
                ? 'text-white' : 'border'
            }`}
            style={filter === c
              ? { background: 'var(--crimson)', border: '1px solid var(--crimson)' }
              : { borderColor: 'var(--border)', color: 'var(--muted)' }
            }>
            {c === 'all' ? 'All Packages' : c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 gap-3" style={{ color: 'var(--muted)' }}>
          <Loader2 size={20} className="animate-spin" /> Loading packages...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg: any) => (
            <Link key={pkg._id} href={`/packages/${pkg.slug}`}
              className="card overflow-hidden hover:-translate-y-1 transition-all block group">
              {/* Image */}
              <div className="h-48 relative overflow-hidden" style={{ background: 'var(--crimson)' }}>
                {pkg.image_url && (
                  <img src={pkg.image_url} alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {pkg.is_featured && (
                  <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded"
                    style={{ background: 'var(--gold-lt)', color: 'var(--crimson)' }}>
                    ⭐ Featured
                  </span>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white font-serif text-lg font-medium leading-tight">{pkg.title}</div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>{pkg.subtitle}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted2)' }}>
                    <Clock size={13} /> {pkg.duration_days} days
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted2)' }}>
                    <MapPin size={13} /> {pkg.states?.slice(0,2).join(', ')}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted2)' }}>
                    <Star size={13} /> {pkg.temples?.length || 0} temples
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted2)' }}>
                    <Users size={13} /> {pkg.group_size}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs" style={{ color: 'var(--muted2)' }}>From </span>
                    <span className="font-serif text-xl font-medium" style={{ color: 'var(--crimson)' }}>
                      ₹{pkg.price_from.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted2)' }}>/person</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFFICULTIES[pkg.difficulty] || ''}`}>
                    {pkg.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Custom Package CTA */}
      <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: 'var(--crimson)' }}>
        <h2 className="font-serif text-2xl font-medium text-white mb-2">Need a Custom Yatra?</h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(237,224,196,.7)' }}>
          Tell us your temples, dates, budget and group size. We plan everything.
        </p>
        <Link href="/packages/custom"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
          style={{ background: 'var(--gold-lt)', color: 'var(--crimson)' }}>
          <Phone size={15} /> Request Custom Package
        </Link>
      </div>
    </div>
  )
}
