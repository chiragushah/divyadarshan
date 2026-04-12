'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function OfflinePage() {
  const [cachedPages, setCachedPages] = useState<string[]>([])
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check what pages are available in cache
    if ('caches' in window) {
      caches.open('divyadarshanam-v2-pages').then(cache => {
        cache.keys().then(keys => {
          const pages = keys
            .map(k => new URL(k.url).pathname)
            .filter(p => p !== '/offline' && p !== '/')
          setCachedPages(pages)
          setChecking(false)
        })
      }).catch(() => setChecking(false))
    } else {
      setChecking(false)
    }
  }, [])

  const PAGE_LABELS: Record<string, string> = {
    '/explore':      '🛕 Temple Directory',
    '/plan':         '�UDDE0 AI Yatra Planner',
    '/manifest':     '🙏 Manifest',
    '/yatra/goals':  '💰 Savings Goals',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, background: '#FDFAF6', padding: 24, textAlign: 'center' }}>
      
      <div style={{ fontSize: 72 }}>🛕</div>
      
      <div>
        <h1 style={{ fontSize: 28, color: '#8B1A1A', fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>
          You are offline
        </h1>
        <p style={{ color: '#6B5B4E', maxWidth: 340, lineHeight: 1.7, margin: '0 auto' }}>
          No internet connection. Your previously visited pages are still available below.
        </p>
      </div>

      {/* Cached pages available offline */}
      {!checking && cachedPages.length > 0 && (
        <div style={{ width: '100%', maxWidth: 360 }}>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#A89B8C', marginBottom: 10 }}>
            Available offline
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {cachedPages.map(p => (
              <Link key={p} href={p}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 10, background: 'white', border: '1.5px solid #E8E0D4', textDecoration: 'none', color: '#1A1A1A', fontSize: 14, fontWeight: 500 }}>
                <span style={{ fontSize: 18 }}>{PAGE_LABELS[p]?.split(' ')[0] || '📍'}</span>
                {PAGE_LABELS[p]?.slice(2) || p}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => window.location.reload()}
          style={{ background: '#8B1A1A', color: 'white', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
          Try Again
        </button>
        <Link href="/"
          style={{ background: 'white', color: '#8B1A1A', border: '1.5px solid #8B1A1A', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
          Go Home
        </Link>
      </div>

      <p style={{ fontSize: 11, color: '#C0B4A8', maxWidth: 300 }}>
        DivyaDarshanam works offline for pages you have visited before. Visit more pages while online to expand offline access.
      </p>
    </div>
  )
}
