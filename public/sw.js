const CACHE = 'divyadarshan-v1'
const STATIC = ['/','/explore','/plan','/yatra/goals','/offline']

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  if (e.request.url.includes('/api/')) return
  e.respondWith(
    fetch(e.request).then(res => {
      const clone = res.clone()
      caches.open(CACHE).then(cache => cache.put(e.request, clone))
      return res
    }).catch(() => caches.match(e.request).then(cached => cached || caches.match('/offline')))
  )
})

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : {}
  e.waitUntil(self.registration.showNotification(data.title || 'DivyaDarshan', {
    body: data.body || 'Your yatra awaits',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    data: { url: data.url || '/' }
  }))
})

self.addEventListener('notificationclick', e => {
  e.notification.close()
  e.waitUntil(clients.openWindow(e.notification.data && e.notification.data.url || '/'))
})