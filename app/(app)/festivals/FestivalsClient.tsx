'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import type { Festival } from '@/lib/data/festivals'
import { DEITY_GROUPS, SEASONS } from '@/lib/data/festivals'

type FestivalWithImage = Festival & { heroImage?: string }

export default function FestivalsClient({ festivals }: { festivals: FestivalWithImage[] }) {
  const [q, setQ] = useState('')
  const [deity, setDeity] = useState('')
  const [season, setSeason] = useState('')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return festivals.filter(f => {
      if (deity && f.deityGroup !== deity) return false
      if (season && f.season !== season) return false
      if (query) {
        const hay = `${f.name} ${f.alsoKnown || ''} ${f.deity} ${f.significance} ${f.regionText}`.toLowerCase()
        if (!hay.includes(query)) return false
      }
      return true
    })
  }, [festivals, q, deity, season])

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #8B1A1A 0%, #C0570A 100%)',
        color: 'white', padding: '48px 24px 56px',
      }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>
            Festivals of India
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 14, color: 'white' }}>
            The living festivals of Bharat
          </h1>
          <p style={{ fontSize: 16, maxWidth: 680, lineHeight: 1.7, color: 'rgba(255,255,255,0.92)' }}>
            For every great festival — what it means, how it is traditionally observed, how it is actually celebrated
            across regions, the food and prasad, the dances, the deity worshipped, and exactly which temples to visit.
          </p>
          <div style={{ marginTop: 18, display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
            <span>{festivals.length} major festivals</span>
            <span>·</span>
            <span>Linked to temples you can visit</span>
            <span>·</span>
            <span>Food, prasad &amp; dance for each</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="card" style={{ padding: 14, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Search size={18} style={{ color: 'var(--muted2)', flexShrink: 0 }} />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search a festival, deity or region — Diwali, Shiva, Kerala…"
            className="input"
            style={{ border: 'none', flex: 1, padding: '4px 0' }}
          />
        </div>

        {/* Filters */}
        <div style={{ marginBottom: 8 }}>
          <div className="section-title" style={{ marginBottom: 8 }}>Deity worshipped</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <Chip active={deity === ''} onClick={() => setDeity('')}>All</Chip>
            {DEITY_GROUPS.map(d => (
              <Chip key={d} active={deity === d} onClick={() => setDeity(deity === d ? '' : d)}>{d}</Chip>
            ))}
          </div>
          <div className="section-title" style={{ marginBottom: 8 }}>Season</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
            <Chip active={season === ''} onClick={() => setSeason('')}>All year</Chip>
            {SEASONS.map(s => (
              <Chip key={s} active={season === s} onClick={() => setSeason(season === s ? '' : s)}>{s}</Chip>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--muted2)', marginBottom: 16 }}>
          Showing {filtered.length} of {festivals.length} festivals
        </p>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
          {filtered.map(f => (
            <Link key={f.slug} href={`/festivals/${f.slug}`} className="card" style={{ textDecoration: 'none', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Accent header */}
              <div style={{
                position: 'relative', height: 150, overflow: 'hidden',
                background: `linear-gradient(135deg, ${f.accent}, ${f.accent}cc)`,
              }}>
                {f.heroImage && (
                  <img src={f.heroImage} alt="" loading="lazy"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.25) 100%)' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 18px', color: 'white' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', opacity: 0.92 }}>
                    {f.dates2026 ? `2026 · ${f.dates2026.split('(')[0].split(';')[0].trim()}` : `${f.season} · ${f.whenText.split('(')[0].trim()}`}
                  </div>
                  <div className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 4, color: 'white', lineHeight: 1.15, textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>{f.name}</div>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: '14px 18px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {f.alsoKnown && (
                  <div style={{ fontSize: 12, color: 'var(--muted2)', marginBottom: 8, fontStyle: 'italic' }}>{f.alsoKnown}</div>
                )}
                <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {f.significance}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span className="badge-gold" style={{ fontSize: 10 }}>{f.deity.split(/[;(]/)[0].trim()}</span>
                  <span style={{ fontSize: 12, color: 'var(--crimson)', fontWeight: 600, marginLeft: 'auto' }}>Read full guide →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card card-p" style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ color: 'var(--muted)' }}>No festivals match your filters. Try clearing them.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer',
        border: `1.5px solid ${active ? 'var(--crimson)' : '#E8E8E8'}`,
        background: active ? 'var(--crimson)' : 'white',
        color: active ? 'white' : 'var(--ink2)',
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  )
}
