// DivyaDarshan Service Worker v2
// Strategy: Cache-first for static, Network-first for pages, Offline fallback

const CACHE_VERSION = 'divyadarshan-v2'
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
  '/divyadarshan-logo.png',
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
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|ico)$/) ||
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
    self.registration.showNotification(data.title || 'DivyaDarshan', {
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
