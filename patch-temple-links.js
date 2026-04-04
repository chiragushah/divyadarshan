// patch-temple-links.js
const fs = require('fs')

const filePath = 'app/(public)/temple/[slug]/page.tsx'
let content = fs.readFileSync(filePath, 'utf8')

// ── New "Find & Book" section to insert in sidebar ────────────────────────
const newSection = `
            {/* ── Find & Book Online ── */}
            <div className="card card-p">
              <h3 className="font-serif text-lg font-medium mb-3">Find & Book Online</h3>
              <div className="space-y-2">

                {/* TripAdvisor */}
                <a href={\`https://www.tripadvisor.in/Search?q=\${encodeURIComponent(t.name + ' ' + t.city)}\`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors hover:opacity-90"
                  style={{ background:'#00AA6C', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🟢</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:700, fontSize:12, color:'white' }}>TripAdvisor Reviews</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,0.8)' }}>Read traveller reviews & tips</div>
                  </div>
                  <span style={{ color:'white', fontSize:12 }}>→</span>
                </a>

                {/* Google Maps */}
                <a href={\`https://www.google.com/maps/search/\${encodeURIComponent(t.name + ' ' + t.city + ' ' + t.state)}\`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(66,133,244,0.08)', border:'1px solid rgba(66,133,244,0.2)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🗺️</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Google Maps</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>Directions & street view</div>
                  </div>
                  <span style={{ color:'#4285F4', fontSize:12 }}>→</span>
                </a>

                {/* Hotels - MakeMyTrip */}
                <a href={\`https://www.makemytrip.com/hotels/hotel-listing/?checkin=\${new Date().toISOString().slice(0,10).replace(/-/g,'')}&checkout=\${new Date(Date.now()+86400000).toISOString().slice(0,10).replace(/-/g,'')}&city=\${encodeURIComponent(t.city)}&country=IN&searchText=\${encodeURIComponent(t.city)}\`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(0,81,186,0.06)', border:'1px solid rgba(0,81,186,0.15)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🏨</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Hotels in {t.city}</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via MakeMyTrip</div>
                  </div>
                  <span style={{ color:'#0051BA', fontSize:12 }}>→</span>
                </a>

                {/* Hotels - Google Hotels */}
                <a href={\`https://www.google.com/travel/hotels/\${encodeURIComponent(t.city + ', ' + t.state + ', India')}\`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(52,168,83,0.06)', border:'1px solid rgba(52,168,83,0.15)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🏩</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Google Hotels</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>Compare prices near {t.city}</div>
                  </div>
                  <span style={{ color:'#34A853', fontSize:12 }}>→</span>
                </a>

                {/* Trains - IRCTC */}
                <a href="https://www.irctc.co.in/nget/train-search"
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(0,100,0,0.06)', border:'1px solid rgba(0,100,0,0.15)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🚂</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Trains to {t.city}</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via IRCTC</div>
                  </div>
                  <span style={{ color:'#006400', fontSize:12 }}>→</span>
                </a>

                {/* Bus - RedBus */}
                <a href={\`https://www.redbus.in/bus-tickets/bus-to-\${encodeURIComponent(t.city.toLowerCase().replace(/ /g,'-'))}\`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(210,43,43,0.06)', border:'1px solid rgba(210,43,43,0.15)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🚌</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Bus to {t.city}</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via RedBus</div>
                  </div>
                  <span style={{ color:'#D22B2B', fontSize:12 }}>→</span>
                </a>

                {/* Flights - Google Flights */}
                <a href={\`https://www.google.com/flights?q=flights+to+\${encodeURIComponent(t.city + ' ' + t.state + ' India')}\`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(251,188,4,0.08)', border:'1px solid rgba(251,188,4,0.25)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>✈️</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Flights to {t.state}</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via Google Flights</div>
                  </div>
                  <span style={{ color:'#FBBC04', fontSize:12 }}>→</span>
                </a>

                {/* Cab - Ola */}
                <a href={\`https://book.olacabs.com/?serviceType=p2p&drop=\${encodeURIComponent(t.name + ', ' + t.city)}\`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
                  style={{ background:'rgba(0,0,0,0.04)', border:'1px solid rgba(0,0,0,0.1)', textDecoration:'none' }}>
                  <span style={{ fontSize:18 }}>🚖</span>
                  <div className="flex-1">
                    <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Book a Cab</div>
                    <div style={{ fontSize:10, color:'var(--muted2)' }}>via Ola</div>
                  </div>
                  <span style={{ color:'var(--muted)', fontSize:12 }}>→</span>
                </a>

              </div>
            </div>`

// Insert before the "Plan Your Yatra" crimson card in sidebar
const insertBefore = `            <div className="card card-p" style={{ background:'var(--crimson)' }}>`

if (content.includes(insertBefore)) {
  content = content.replace(insertBefore, newSection + '\n\n' + insertBefore)
  console.log('✅ Added Find & Book Online section to sidebar')
} else {
  console.log('❌ Could not find insertion point. Please check the file manually.')
  process.exit(1)
}

// Also update Temple Information card to include entry_fee and governance
if (!content.includes('entry_fee') && content.includes("{ label:'Dress Code',value:t.dress_code }")) {
  content = content.replace(
    "{ label:'Dress Code',value:t.dress_code },",
    "{ label:'Dress Code',value:t.dress_code },\n                { label:'Entry Fee', value:t.entry_fee },\n                { label:'Governed By', value:t.governance },"
  )
  console.log('✅ Added entry_fee and governance to Temple Information card')
}

// Add Contact & Visit card (website, phone, wikipedia) before Find & Book
const contactSection = `
            {/* Contact & Visit */}
            {(t.website || t.official_website || t.phone || t.wikipedia_url) && (
              <div className="card card-p">
                <h3 className="font-serif text-lg font-medium mb-3">Contact & Visit</h3>
                <div className="space-y-2">
                  {(t.website || t.official_website) && (
                    <a href={t.website || t.official_website} target="_blank" rel="noopener"
                      className="flex items-center gap-3 p-2.5 rounded-xl"
                      style={{ background:'rgba(192,87,10,0.06)', border:'1px solid rgba(192,87,10,0.15)', textDecoration:'none' }}>
                      <span style={{ fontSize:18 }}>🌐</span>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Official Website</div>
                        <div style={{ fontSize:10, color:'var(--muted2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                          {(t.website || t.official_website || '').replace(/https?:\\/\\//,'').replace(/\\/$/,'')}
                        </div>
                      </div>
                      <span style={{ color:'var(--saffron)', fontSize:12 }}>→</span>
                    </a>
                  )}
                  {t.phone && (
                    <a href={\`tel:\${t.phone.replace(/[^0-9+]/g,'')}\`}
                      className="flex items-center gap-3 p-2.5 rounded-xl"
                      style={{ background:'rgba(22,163,74,0.06)', border:'1px solid rgba(22,163,74,0.15)', textDecoration:'none' }}>
                      <span style={{ fontSize:18 }}>📞</span>
                      <div>
                        <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Phone</div>
                        <div style={{ fontSize:11, color:'var(--muted2)' }}>{t.phone}</div>
                      </div>
                    </a>
                  )}
                  {t.wikipedia_url && (
                    <a href={t.wikipedia_url} target="_blank" rel="noopener"
                      className="flex items-center gap-3 p-2.5 rounded-xl"
                      style={{ background:'rgba(59,130,246,0.06)', border:'1px solid rgba(59,130,246,0.15)', textDecoration:'none' }}>
                      <span style={{ fontSize:18 }}>📖</span>
                      <div className="flex-1">
                        <div style={{ fontWeight:600, fontSize:12, color:'var(--ink)' }}>Wikipedia</div>
                        <div style={{ fontSize:10, color:'var(--muted2)' }}>Full history & details</div>
                      </div>
                      <span style={{ color:'#3b82f6', fontSize:12, marginLeft:'auto' }}>→</span>
                    </a>
                  )}
                </div>
              </div>
            )}\n`

// Insert contact section before Find & Book section
if (!content.includes('Contact & Visit')) {
  content = content.replace(
    '\n            {/* ── Find & Book Online ── */}',
    contactSection + '\n            {/* ── Find & Book Online ── */'
  )
  console.log('✅ Added Contact & Visit section')
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('\n🎉 Temple detail page fully updated!')
console.log('\nNow run:')
console.log('git add "app/(public)/temple/[slug]/page.tsx"')
console.log('git commit -m "feat: add TripAdvisor, hotels, trains, buses, flights, cab links to every temple"')
console.log('git push origin main')
