// build-pwa.js
const fs = require('fs')
const { execSync } = require('child_process')

// ── 1. Service Worker ─────────────────────────────────────────────────────────
const swContent = [
  "const CACHE = 'divyadarshan-v1'",
  "const STATIC = ['/','/explore','/plan','/yatra/goals','/offline']",
  "",
  "self.addEventListener('install', e => {",
  "  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting()))",
  "})",
  "",
  "self.addEventListener('activate', e => {",
  "  e.waitUntil(",
  "    caches.keys().then(keys =>",
  "      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))",
  "    ).then(() => self.clients.claim())",
  "  )",
  "})",
  "",
  "self.addEventListener('fetch', e => {",
  "  if (e.request.method !== 'GET') return",
  "  if (e.request.url.includes('/api/')) return",
  "  e.respondWith(",
  "    fetch(e.request).then(res => {",
  "      const clone = res.clone()",
  "      caches.open(CACHE).then(cache => cache.put(e.request, clone))",
  "      return res",
  "    }).catch(() => caches.match(e.request).then(cached => cached || caches.match('/offline')))",
  "  )",
  "})",
  "",
  "self.addEventListener('push', e => {",
  "  const data = e.data ? e.data.json() : {}",
  "  e.waitUntil(self.registration.showNotification(data.title || 'DivyaDarshan', {",
  "    body: data.body || 'Your yatra awaits',",
  "    icon: '/icons/icon-192x192.png',",
  "    badge: '/icons/icon-72x72.png',",
  "    data: { url: data.url || '/' }",
  "  }))",
  "})",
  "",
  "self.addEventListener('notificationclick', e => {",
  "  e.notification.close()",
  "  e.waitUntil(clients.openWindow(e.notification.data && e.notification.data.url || '/'))",
  "})",
].join('\n')

fs.writeFileSync('public/sw.js', swContent)
console.log('OK public/sw.js')

// ── 2. Offline page ───────────────────────────────────────────────────────────
fs.mkdirSync('app/offline', { recursive: true })
const offlineLines = [
  "export default function OfflinePage() {",
  "  return (",
  "    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, background:'#FDFAF6', padding:24, textAlign:'center' }}>",
  "      <div style={{ fontSize:64 }}>&#128701;</div>",
  "      <h1 style={{ fontSize:28, color:'#8B1A1A' }}>You are offline</h1>",
  "      <p style={{ color:'#6B5B4E', maxWidth:320, lineHeight:1.7 }}>",
  "        No internet connection. Previously visited pages are still available. Connect to continue planning.",
  "      </p>",
  "      <button onClick={() => window.location.reload()} style={{ background:'#8B1A1A', color:'white', border:'none', borderRadius:10, padding:'12px 28px', fontWeight:700, fontSize:14, cursor:'pointer' }}>",
  "        Try Again",
  "      </button>",
  "    </div>",
  "  )",
  "}",
].join('\n')
fs.writeFileSync('app/offline/page.tsx', offlineLines)
console.log('OK app/offline/page.tsx')

// ── 3. PWAInstaller component ─────────────────────────────────────────────────
const pwaLines = [
  "'use client'",
  "import { useEffect, useState } from 'react'",
  "",
  "export default function PWAInstaller() {",
  "  const [prompt, setPrompt] = useState(null)",
  "  const [show, setShow] = useState(false)",
  "  const [installed, setInstalled] = useState(false)",
  "",
  "  useEffect(() => {",
  "    if ('serviceWorker' in navigator) {",
  "      navigator.serviceWorker.register('/sw.js').catch(console.error)",
  "    }",
  "    if (window.matchMedia('(display-mode: standalone)').matches) {",
  "      setInstalled(true); return",
  "    }",
  "    const handler = function(e) {",
  "      e.preventDefault(); setPrompt(e)",
  "      setTimeout(function() { setShow(true) }, 30000)",
  "    }",
  "    window.addEventListener('beforeinstallprompt', handler)",
  "    return function() { window.removeEventListener('beforeinstallprompt', handler) }",
  "  }, [])",
  "",
  "  const install = async function() {",
  "    if (!prompt) return",
  "    prompt.prompt()",
  "    const result = await prompt.userChoice",
  "    if (result.outcome === 'accepted') setInstalled(true)",
  "    setShow(false)",
  "  }",
  "",
  "  if (!show || installed) return null",
  "",
  "  return (",
  "    <div style={{ position:'fixed', bottom:80, left:16, right:16, zIndex:9990, background:'white', borderRadius:16, padding:'16px 20px', boxShadow:'0 8px 32px rgba(0,0,0,0.15)', border:'1.5px solid #E8E0D4', display:'flex', alignItems:'center', gap:14 }}>",
  "      <img src='/divyadarshan-logo.png' alt='DivyaDarshan' style={{ width:44, height:44, objectFit:'contain', flexShrink:0 }} />",
  "      <div style={{ flex:1 }}>",
  "        <div style={{ fontWeight:700, fontSize:14, color:'#1A0A00' }}>Install DivyaDarshan</div>",
  "        <div style={{ fontSize:12, color:'#6B5B4E', marginTop:2 }}>Add to home screen for quick access to your yatra</div>",
  "      </div>",
  "      <div style={{ display:'flex', gap:8 }}>",
  "        <button onClick={function(){ setShow(false) }} style={{ padding:'8px 12px', borderRadius:8, border:'1px solid #E8E0D4', background:'white', fontSize:12, color:'#6B5B4E', cursor:'pointer' }}>Later</button>",
  "        <button onClick={install} style={{ padding:'8px 16px', borderRadius:8, border:'none', background:'#8B1A1A', color:'white', fontSize:12, fontWeight:700, cursor:'pointer' }}>Install</button>",
  "      </div>",
  "    </div>",
  "  )",
  "}",
].join('\n')
fs.writeFileSync('components/PWAInstaller.tsx', pwaLines)
console.log('OK components/PWAInstaller.tsx')

// ── 4. Icons ──────────────────────────────────────────────────────────────────
fs.mkdirSync('public/icons', { recursive: true })
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==', 'base64')
var sizes = [72, 96, 128, 144, 152, 192, 384, 512]
sizes.forEach(function(s) { fs.writeFileSync('public/icons/icon-' + s + 'x' + s + '.png', PNG) })
;['explore','plan','journal'].forEach(function(n) { fs.writeFileSync('public/icons/shortcut-' + n + '.png', PNG) })
console.log('OK public/icons: placeholder icons created')

// Try sharp for proper icons
try {
  execSync('npm install sharp --save-dev --silent 2>nul', { stdio: 'pipe', timeout: 60000 })
  var sharp = require('sharp')
  sizes.forEach(function(s) {
    sharp('public/divyadarshan-logo.png')
      .resize(s, s, { fit: 'contain', background: { r:253, g:248, b:242, alpha:1 } })
      .png()
      .toFile('public/icons/icon-' + s + 'x' + s + '.png')
      .then(function() { if(s===192) console.log('OK sharp icons generated') })
      .catch(function(){})
  })
} catch(e) {
  console.log('  (sharp unavailable, using placeholders — icons will work but show as small dots)')
}

// ── 5. Update manifest ────────────────────────────────────────────────────────
var manifest = {
  name: "DivyaDarshan - India's Temple Explorer",
  short_name: "DivyaDarshan",
  description: "Explore 370+ temples, plan your yatra with AI, discover live darshan",
  start_url: "/",
  display: "standalone",
  background_color: "#FDFAF6",
  theme_color: "#8B1A1A",
  orientation: "portrait-primary",
  icons: sizes.map(function(s) {
    var obj = { src: '/icons/icon-' + s + 'x' + s + '.png', sizes: s + 'x' + s, type: 'image/png' }
    if (s === 192 || s === 512) obj.purpose = 'any maskable'
    return obj
  }),
  categories: ["travel","lifestyle","navigation","religion"],
  shortcuts: [
    { name:"Explore Temples", short_name:"Explore", url:"/explore", icons:[{ src:"/icons/shortcut-explore.png", sizes:"96x96" }] },
    { name:"AI Planner",      short_name:"Plan",    url:"/plan",    icons:[{ src:"/icons/shortcut-plan.png",    sizes:"96x96" }] },
    { name:"My Yatra",        short_name:"Yatra",   url:"/yatra",   icons:[{ src:"/icons/shortcut-journal.png", sizes:"96x96" }] }
  ]
}
fs.writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2))
console.log('OK public/manifest.json updated')

// ── 6. Add PWAInstaller to layout ─────────────────────────────────────────────
var layout = fs.readFileSync('app/layout.tsx', 'utf8')
if (!layout.includes('PWAInstaller')) {
  layout = layout.replace(
    "import './globals.css'",
    "import './globals.css'\nimport PWAInstaller from '@/components/PWAInstaller'"
  )
  layout = layout.replace('</body>', '      <PWAInstaller />\n      </body>')
  fs.writeFileSync('app/layout.tsx', layout, 'utf8')
  console.log('OK app/layout.tsx: PWAInstaller added')
} else {
  console.log('SKIP PWAInstaller already in layout')
}

console.log('\nAll done! Now run:')
console.log('git add .')
console.log('git commit -m "feat: PWA with service worker, offline page and install prompt"')
console.log('git push origin main')
