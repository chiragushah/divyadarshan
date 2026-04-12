// DivyaDarshanam - Performance + PWA offline mode
// Touches: next.config.js, public/sw.js, app/offline/page.tsx
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshanam'

// ── 1. next.config.js ─────────────────────────────────────────
console.log('[1/4] Updating next.config.js...')
const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ── Performance: Image optimization ──────────────────────────
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: '*.vercel-storage.com' },
      { protocol: 'https', hostname: '*.blob.vercel-storage.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },

  // ── Performance: HTTP headers ─────────────────────────────────
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: '/:path*\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|woff|woff2|ttf|otf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Cache JS/CSS chunks for 1 year (they are content-hashed)
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Service worker must not be cached
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        // Security headers on all pages
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },

  // ── Performance: Compression ──────────────────────────────────
  compress: true,

  // ── Performance: Powered by header ───────────────────────────
  poweredByHeader: false,
}

module.exports = nextConfig
`
fs.writeFileSync(path.join(P, 'next.config.js'), nextConfig, 'utf8')
console.log('  OK')

// ── 2. public/sw.js ───────────────────────────────────────────
console.log('[2/4] Upgrading service worker...')
const sw = `// DivyaDarshanam Service Worker v2
// Strategy: Cache-first for static, Network-first for pages, Offline fallback

const CACHE_VERSION = 'divyadarshanam-v2'
const STATIC_CACHE  = CACHE_VERSION + '-static'
const PAGE_CACHE    = CACHE_VERSION + '-pages'
const IMG_CACHE     = CACHE_VERSION + '-images'

// Pages to pre-cache on install
const PRECACHE_PAGES = [
  '/',
  '/explore',
  '/plan',
  '/manifest',
  '/offline',
]

// Static assets to pre-cache
const PRECACHE_STATIC = [
  '/divyadarshanam-logo.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
]

// ── Install: pre-cache critical resources ────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => 
        cache.addAll(PRECACHE_STATIC).catch(() => {})
      ),
      caches.open(PAGE_CACHE).then(cache =>
        cache.addAll(PRECACHE_PAGES).catch(() => {})
      ),
    ]).then(() => self.skipWaiting())
  )
})

// ── Activate: clean up old caches ────────────────────────────
self.addEventListener('activate', e => {
  const VALID = [STATIC_CACHE, PAGE_CACHE, IMG_CACHE]
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !VALID.includes(k)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  )
})

// ── Fetch: smart caching strategy ────────────────────────────
self.addEventListener('fetch', e => {
  const { request } = e
  const url = new URL(request.url)

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // Skip API calls - always go to network
  if (url.pathname.startsWith('/api/')) return

  // Skip Next.js internals
  if (url.pathname.startsWith('/_next/webpack-hmr')) return

  // Images: Cache-first with 7 day TTL
  if (
    url.pathname.match(/\\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/) ||
    url.pathname.startsWith('/_next/image')
  ) {
    e.respondWith(
      caches.open(IMG_CACHE).then(async cache => {
        const cached = await cache.match(request)
        if (cached) return cached
        try {
          const res = await fetch(request)
          if (res.ok) cache.put(request, res.clone())
          return res
        } catch {
          return cached || new Response('', { status: 404 })
        }
      })
    )
    return
  }

  // Static assets: Cache-first (they are content-hashed)
  if (url.pathname.startsWith('/_next/static/')) {
    e.respondWith(
      caches.open(STATIC_CACHE).then(async cache => {
        const cached = await cache.match(request)
        if (cached) return cached
        const res = await fetch(request)
        if (res.ok) cache.put(request, res.clone())
        return res
      })
    )
    return
  }

  // Pages: Network-first, fallback to cache, then offline page
  e.respondWith(
    fetch(request)
      .then(res => {
        if (res.ok) {
          const clone = res.clone()
          caches.open(PAGE_CACHE).then(cache => cache.put(request, clone))
        }
        return res
      })
      .catch(async () => {
        const cached = await caches.match(request)
        if (cached) return cached
        // For temple pages, return the cached explore page
        if (url.pathname.startsWith('/temple/')) {
          const exploreCached = await caches.match('/explore')
          if (exploreCached) return exploreCached
        }
        return caches.match('/offline')
      })
  )
})

// ── Push notifications ────────────────────────────────────────
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {}
  e.waitUntil(
    self.registration.showNotification(data.title || 'DivyaDarshanam', {
      body:  data.body  || 'Your yatra awaits',
      icon:  '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      data:  { url: data.url || '/' },
      vibrate: [100, 50, 100],
    })
  )
})

self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/'))
})
`
fs.writeFileSync(path.join(P, 'public/sw.js'), sw, 'utf8')
console.log('  OK')

// ── 3. app/offline/page.tsx ───────────────────────────────────
console.log('[3/4] Upgrading offline page...')
const offlinePage = `'use client'
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
    '/explore':      '\uD83D\uDED5 Temple Directory',
    '/plan':         '\uD83E\UDDE0 AI Yatra Planner',
    '/manifest':     '\uD83D\uDE4F Manifest',
    '/yatra/goals':  '\uD83D\uDCB0 Savings Goals',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, background: '#FDFAF6', padding: 24, textAlign: 'center' }}>
      
      <div style={{ fontSize: 72 }}>\uD83D\uDED5</div>
      
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
                <span style={{ fontSize: 18 }}>{PAGE_LABELS[p]?.split(' ')[0] || '\uD83D\uDCCD'}</span>
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
`
fs.writeFileSync(path.join(P, 'app/offline/page.tsx'), offlinePage, 'utf8')
console.log('  OK')

// ── 4. Push ───────────────────────────────────────────────────
console.log('[4/4] Pushing to GitHub...')
process.chdir(P)
execSync('git add "next.config.js" "public/sw.js" "app/offline/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "perf+pwa: image optimization, caching headers, smart SW v2, offline page"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
