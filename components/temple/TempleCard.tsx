'use client'
import Link from 'next/link'
import type { Temple } from '@/types'

interface Props {
  temple: Partial<Temple>
  compact?: boolean
}

// Deity-based gradient colors for fallback
function getBg(deity?: string): string {
  const d = (deity || '').toLowerCase()
  if (d.includes('shiva') || d.includes('shankar')) return 'linear-gradient(135deg,#6B1010,#3D0808)'
  if (d.includes('vishnu') || d.includes('venkat') || d.includes('balaji') || d.includes('narayan')) return 'linear-gradient(135deg,#1a4a7a,#0d2a4a)'
  if (d.includes('krishna') || d.includes('jagannath') || d.includes('vithal')) return 'linear-gradient(135deg,#1a3a6b,#2d1a5e)'
  if (d.includes('durga') || d.includes('kali') || d.includes('shakti') || d.includes('devi') || d.includes('amba')) return 'linear-gradient(135deg,#7a1a3a,#4a0a20)'
  if (d.includes('ganesha') || d.includes('ganesh') || d.includes('vinayak')) return 'linear-gradient(135deg,#7a4a1a,#4a2a0a)'
  if (d.includes('rama') || d.includes('hanuman')) return 'linear-gradient(135deg,#7a3a1a,#4a1a08)'
  if (d.includes('murugan') || d.includes('subramanya')) return 'linear-gradient(135deg,#3a1a6b,#1a0a40)'
  if (d.includes('lakshmi')) return 'linear-gradient(135deg,#7a6a1a,#4a3a08)'
  if (d.includes('jain') || d.includes('multiple')) return 'linear-gradient(135deg,#2a5a3a,#1a3a2a)'
  return 'linear-gradient(135deg,var(--crimson),#6B3030)'
}

function TempleImage({ url, name, deity, liveLabel, ratingLabel, height = 'h-44' }:
  { url?: string; name?: string; deity?: string; liveLabel?: boolean; ratingLabel?: number; height?: string }) {
  const initial = name?.charAt(0) || '🛕'
  return (
    <div className={`relative ${height} flex items-center justify-center text-5xl font-serif font-bold overflow-hidden`}
      style={{ background: getBg(deity) }}>
      {url && (
        <img
          src={url}
          alt={name || ''}
          className="w-full h-full object-cover absolute inset-0"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      )}
      {!url && (
        <span style={{ color: 'rgba(255,255,255,.2)', fontSize: '3rem', position: 'relative', zIndex: 1 }}>
          {initial}
        </span>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-16"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,.5), transparent)' }} />
      {liveLabel && (
        <span className="absolute top-3 left-3 badge-live" style={{ zIndex: 2 }}>
          <span className="live-dot" /> Live
        </span>
      )}
      {ratingLabel && ratingLabel > 0 ? (
        <span className="absolute bottom-2 right-3 text-xs font-semibold" style={{ color: '#EDD9A3', zIndex: 2 }}>
          ★ {ratingLabel}
        </span>
      ) : null}
    </div>
  )
}

export default function TempleCard({ temple, compact }: Props) {
  if (compact) {
    return (
      <Link href={`/temple/${temple.slug}`}
        className="card group overflow-hidden hover:-translate-y-0.5 transition-all duration-200 block">
        <TempleImage url={temple.image_url} name={temple.name} deity={temple.deity}
          liveLabel={temple.has_live} height="aspect-video" />
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
      <TempleImage url={temple.image_url} name={temple.name} deity={temple.deity}
        liveLabel={temple.has_live} ratingLabel={temple.rating_avg} />

      <div className="p-4 flex-1 flex flex-col">
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
