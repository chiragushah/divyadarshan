import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'

// Read-only coverage audit: are temples in/around a city populated, and how complete?
// Matches by city/name text AND by proximity (within radius km of the city centre),
// so temples with coarse/missing city labels are still caught via their coordinates.

const CITY_CENTERS: Record<string, { lat: number; lng: number }> = {
  Pune: { lat: 18.5204, lng: 73.8567 },
  Mumbai: { lat: 19.0760, lng: 72.8777 },
}

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371, dLat = (bLat - aLat) * Math.PI / 180, dLng = (bLng - aLng) * Math.PI / 180
  const la1 = aLat * Math.PI / 180, la2 = bLat * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

function esc(s: any): string {
  return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))
}

const FIELDS = [
  { key: 'deity', label: 'Deity', ok: (t: any) => !!(t.deity && String(t.deity).trim()) },
  { key: 'description', label: 'Description', ok: (t: any) => !!(t.description && String(t.description).trim().length >= 80) },
  { key: 'image', label: 'Image', ok: (t: any) => !!(t.blob_image_url || t.image_url) },
  { key: 'timing', label: 'Timing', ok: (t: any) => !!(t.timing && String(t.timing).trim()) },
  { key: 'how_to_reach', label: 'How to reach', ok: (t: any) => !!(t.how_to_reach && typeof t.how_to_reach === 'object' && Object.keys(t.how_to_reach).length) },
  { key: 'poojas', label: 'Poojas', ok: (t: any) => Array.isArray(t.poojas) && t.poojas.length > 0 },
  { key: 'facilities', label: 'Facilities', ok: (t: any) => !!(t.facilities && typeof t.facilities === 'object' && Object.keys(t.facilities).length) },
  { key: 'coords', label: 'Coords', ok: (t: any) => typeof t.lat === 'number' && typeof t.lng === 'number' && (t.lat || t.lng) },
  { key: 'nearby', label: 'Nearby', ok: (t: any) => Array.isArray(t.nearby_places) && t.nearby_places.length > 0 },
]

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const citiesParam = url.searchParams.get('cities') || 'Pune,Mumbai'
  const radius = Math.min(200, Math.max(10, parseInt(url.searchParams.get('radius') || '70', 10) || 70))
  const cities = citiesParam.split(',').map(s => s.trim()).filter(Boolean)

  try {
    await connectDB()
    const all = await Temple.find({})
      .select('slug name city state deity description timing how_to_reach poojas facilities lat lng nearby_places image_url blob_image_url has_live live_url')
      .lean() as any[]

    const sections = cities.map(city => {
      const center = CITY_CENTERS[city]
      const re = new RegExp(city, 'i')
      const matched = all.map(t => {
        const byText = re.test(t.city || '') || re.test(t.name || '') || re.test(t.state || '')
        let dist: number | null = null
        if (center && typeof t.lat === 'number' && typeof t.lng === 'number' && (t.lat || t.lng)) {
          dist = haversineKm(center.lat, center.lng, t.lat, t.lng)
        }
        const byProx = dist !== null && dist <= radius
        return { t, byText, byProx, dist }
      }).filter(x => x.byText || x.byProx)
        .sort((a, b) => (a.dist ?? 9999) - (b.dist ?? 9999))
      return { city, center, matched }
    })

    const rows = (m: any) => m.matched.map((x: any) => {
      const t = x.t
      const done = FIELDS.filter(f => f.ok(t)).length
      const pct = Math.round((done / FIELDS.length) * 100)
      const cells = FIELDS.map(f => `<td class="c ${f.ok(t) ? 'y' : 'n'}">${f.ok(t) ? '✓' : '—'}</td>`).join('')
      const barColor = pct >= 80 ? '#15803d' : pct >= 50 ? '#b45309' : '#b91c1c'
      return `<tr>
        <td class="nm"><a href="/temple/${esc(t.slug)}" target="_blank">${esc(t.name)}</a>
          <div class="sub">${esc(t.city || '—')}${t.state ? ', ' + esc(t.state) : ''}${x.dist !== null ? ` · ${Math.round(x.dist)} km` : ''} · <span class="tag">${x.byText ? 'name/city' : 'nearby'}</span></div></td>
        ${cells}
        <td class="pct"><b style="color:${barColor}">${pct}%</b></td>
      </tr>`
    }).join('')

    const head = `<tr><th>Temple</th>${FIELDS.map(f => `<th class="c">${f.label}</th>`).join('')}<th>Complete</th></tr>`

    const body = sections.map(s => {
      const n = s.matched.length
      const avg = n ? Math.round(s.matched.reduce((a: number, x: any) => a + FIELDS.filter(f => f.ok(x.t)).length, 0) / n / FIELDS.length * 100) : 0
      return `<section>
        <h2>${esc(s.city)} <span class="count">${n} temple${n === 1 ? '' : 's'} ${s.center ? `(within ${radius} km or name/city match)` : '(name/city match)'} · avg ${avg}% complete</span></h2>
        ${n ? `<table>${head}${rows(s)}</table>` : `<p class="empty">No temples found in or within ${radius} km of ${esc(s.city)}. This likely means they aren’t in the directory yet.</p>`}
      </section>`
    }).join('')

    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Temple coverage audit — ${esc(cities.join(', '))}</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:1100px;margin:0 auto;padding:24px;color:#1a1a1a}
  h1{font-size:22px;margin:0 0 4px} .lede{color:#666;font-size:14px;margin:0 0 20px}
  h2{font-size:17px;margin:26px 0 10px} .count{font-weight:400;font-size:13px;color:#777}
  table{border-collapse:collapse;width:100%;font-size:13px;margin-bottom:8px}
  th,td{border:1px solid #eadfce;padding:7px 9px;text-align:left} th{background:#faf6ef;font-weight:700}
  th.c,td.c{text-align:center;width:46px} td.c.y{color:#15803d;font-weight:700} td.c.n{color:#cbb;}
  td.nm a{color:#8B1A1A;font-weight:600;text-decoration:none} .sub{color:#888;font-size:11px;margin-top:2px}
  .tag{background:#f0eadf;border-radius:4px;padding:1px 5px;font-size:10px;color:#9a7b4f}
  .pct{text-align:center} .empty{color:#b45309;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:12px}
  .note{color:#888;font-size:12px;margin-top:20px;line-height:1.5}
</style></head><body>
<h1>Temple Coverage Audit</h1>
<p class="lede">Live from the database · ${esc(cities.join(' & '))} · generated ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
${body}
<p class="note">A ✓ means the field is filled. “nearby” = found by coordinates within ${radius} km (its city label may differ); “name/city” = its text matched.<br>
Change scope with <code>?cities=Pune,Mumbai,Nashik&amp;radius=70</code>. Total temples in directory: ${all.length}.</p>
</body></html>`

    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  } catch (e: any) {
    return new Response(`Audit failed: ${esc(e?.message || 'unknown error')}`, { status: 500, headers: { 'content-type': 'text/plain' } })
  }
}
