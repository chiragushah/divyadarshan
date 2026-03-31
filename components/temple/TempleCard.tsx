import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Temple } from '@/types'

interface Props {
  temple: Partial<Temple>
  compact?: boolean
}

export default function TempleCard({ temple, compact }: Props) {
  const initial = temple.name?.charAt(0) || '🛕'

  if (compact) {
    return (
      <Link href={`/temple/${temple.slug}`}
        className="card group overflow-hidden hover:-translate-y-0.5 transition-all duration-200 block">
        {/* Thumbnail */}
        <div className="relative aspect-video flex items-center justify-center text-3xl font-serif font-bold"
          style={{ background: 'linear-gradient(135deg, var(--crimson), var(--crim-lt))' }}>
          {temple.image_url
            ? <img src={temple.image_url} alt={temple.name} className="w-full h-full object-cover absolute inset-0" />
            : <span style={{ color: 'rgba(255,255,255,.25)' }}>{initial}</span>}
          {temple.has_live && (
            <span className="absolute top-2 left-2 badge-live text-[10px] px-1.5 py-0.5 rounded">
              <span className="live-dot w-1.5 h-1.5" /> Live
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-serif text-sm font-medium leading-tight truncate" style={{ color: 'var(--ink)' }}>
            {temple.name}
          </h3>
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted2)' }}>
            {temple.city}, {temple.state}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/temple/${temple.slug}`}
      className="card group overflow-hidden hover:-translate-y-1 transition-all duration-200 flex flex-col block">
      {/* Thumbnail */}
      <div className="relative h-44 flex items-center justify-center text-5xl font-serif font-bold"
        style={{ background: 'linear-gradient(135deg, var(--crimson), var(--crim-lt))' }}>
        {temple.image_url
          ? <img src={temple.image_url} alt={temple.name} className="w-full h-full object-cover absolute inset-0" />
          : <span style={{ color: 'rgba(255,255,255,.2)' }}>{initial}</span>}

        {/* Overlays */}
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,.5), transparent)' }} />
        {temple.has_live && (
          <span className="absolute top-3 left-3 badge-live">
            <span className="live-dot" /> Live
          </span>
        )}
        {temple.rating_avg && temple.rating_avg > 0 && (
          <span className="absolute bottom-2 right-3 text-xs font-semibold" style={{ color: '#EDD9A3' }}>
            ★ {temple.rating_avg}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {/* Categories */}
        {temple.categories && temple.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {temple.categories.slice(0, 2).map(cat => (
              <span key={cat} className="badge-gold text-[9px]">{cat}</span>
            ))}
          </div>
        )}

        <h3 className="font-serif text-lg font-medium leading-tight mb-0.5" style={{ color: 'var(--ink)' }}>
          {temple.name}
        </h3>
        <p className="text-xs mb-3" style={{ color: 'var(--muted2)' }}>
          {temple.deity} · {temple.city}, {temple.state}
        </p>

        {temple.description && (
          <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: 'var(--muted)' }}>
            {temple.description}
          </p>
        )}

        <div className="mt-3 pt-3 border-t flex items-center justify-between"
          style={{ borderColor: 'var(--border)' }}>
          <span className="text-xs" style={{ color: 'var(--muted2)' }}>
            Best: {temple.best_time || 'Oct–Mar'}
          </span>
          <span className="text-xs font-semibold" style={{ color: 'var(--crimson)' }}>
            View temple →
          </span>
        </div>
      </div>
    </Link>
  )
}
