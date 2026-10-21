import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// ─────────────────────────────────────────────────────────────────────────────
// Re-resolve temple images whose stored URL is dead. Pulls the current lead
// image from Wikipedia (runs on Vercel, which can reach the API) and updates
// image_url; falls back to a verified deity image so none can end up blank.
// Dry-run by default; apply with ?apply=1&token=.
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN = '8e11eb8dc59a58b87f'

// slug → { wiki article title, deity for fallback }
const TARGETS: Record<string, { wiki: string; deity: string }> = {
  'kamakhya-devi-temple': { wiki: 'Kamakhya_Temple', deity: 'Durga' },
  'kanaka-durga-temple': { wiki: 'Kanaka_Durga_Temple', deity: 'Durga' },
  'kalighat-kali-temple': { wiki: 'Kalighat_Temple', deity: 'Durga' },
}

const FALLBACK: Record<string, string> = {
  shakti: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Durga_Temple%2C_Varanasi.jpg/800px-Durga_Temple%2C_Varanasi.jpg',
  shiva: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Kashi_Vishwanath_Temple.jpg/800px-Kashi_Vishwanath_Temple.jpg',
  vishnu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ranganathaswamy-Temple-Srirangam-2015-11-14.jpg/800px-Ranganathaswamy-Temple-Srirangam-2015-11-14.jpg',
  krishna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Vrindavan_ISKCON_temple.jpg/800px-Vrindavan_ISKCON_temple.jpg',
  ganesha: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Dagdusheth_Halwai_Ganapati_Temple_Pune.jpg/800px-Dagdusheth_Halwai_Ganapati_Temple_Pune.jpg',
}
function fallbackFor(deity: string): string {
  const d = (deity || '').toLowerCase()
  if (d.includes('ganesh')) return FALLBACK.ganesha
  if (d.includes('krishna')) return FALLBACK.krishna
  if (d.includes('vishnu') || d.includes('rama')) return FALLBACK.vishnu
  if (d.includes('durga') || d.includes('kali') || d.includes('devi') || d.includes('lakshmi') || d.includes('shakti')) return FALLBACK.shakti
  return FALLBACK.shiva
}

async function resolveWiki(title: string): Promise<string | null> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 8000)
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, {
      headers: { 'User-Agent': 'DivyaDarshanam/1.0 (https://divyadarshanam.org; contact@divyadarshanam.org)' },
      signal: ctrl.signal,
    })
    clearTimeout(timer)
    if (!res.ok) return null
    const json: any = await res.json()
    const src: string | undefined = json?.thumbnail?.source || json?.originalimage?.source
    return src ? src.replace(/\/\d+px-/, '/800px-') : null
  } catch { return null }
}

function esc(s: any): string {
  return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const apply = url.searchParams.get('apply') === '1'
  const authed = (url.searchParams.get('token') || '') === TOKEN

  try {
    await connectDB()
    const slugs = Object.keys(TARGETS)
    const temples = await Temple.find({ slug: { $in: slugs } }).select('slug name deity image_url').lean() as any[]

    const rows: { slug: string; name: string; from: string; to: string; src: string }[] = []
    for (const slug of slugs) {
      const t = temples.find(x => x.slug === slug)
      if (!t) { rows.push({ slug, name: '(not found)', from: '—', to: '—', src: 'missing' }); continue }
      const wikiImg = await resolveWiki(TARGETS[slug].wiki)
      const to = wikiImg || fallbackFor(TARGETS[slug].deity)
      rows.push({ slug, name: t.name, from: t.image_url || '(none)', to, src: wikiImg ? 'Wikipedia' : 'deity fallback' })
    }

    let updated = 0
    if (apply && authed) {
      for (const r of rows) {
        if (r.to === '—') continue
        await Temple.updateOne({ slug: r.slug }, { $set: { image_url: r.to } })
        updated++
      }
    }

    const body = rows.map(r => `
      <tr>
        <td class="nm">${esc(r.name)}<div class="sub">${esc(r.slug)} · via ${esc(r.src)}</div></td>
        <td class="old">${esc(r.from)}</td>
        <td class="new">${esc(r.to)}</td>
      </tr>`).join('')

    const mode = apply ? (authed ? 'APPLIED' : 'APPLY BLOCKED (no valid token)') : 'DRY RUN (preview only — nothing changed)'
    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Refresh temple images — ${esc(mode)}</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:960px;margin:0 auto;padding:24px;color:#1a1a1a}
  h1{font-size:21px;margin:0 0 6px} .mode{display:inline-block;padding:4px 10px;border-radius:6px;font-size:13px;font-weight:700;margin-bottom:14px}
  .dry{background:#fff7ed;color:#b45309;border:1px solid #fed7aa} .live{background:#dcfce7;color:#15803d;border:1px solid #86efac}
  table{border-collapse:collapse;width:100%;font-size:12px} th,td{border:1px solid #eadfce;padding:7px 9px;text-align:left;vertical-align:top} th{background:#faf6ef}
  td.nm{font-weight:600;color:#8B1A1A} .sub{color:#888;font-size:11px;font-weight:400;margin-top:2px}
  td.old{color:#b91c1c;word-break:break-all;max-width:300px} td.new{color:#15803d;word-break:break-all;max-width:300px}
  .note{color:#888;font-size:12px;margin-top:16px} code{background:#f5f0e8;padding:1px 5px;border-radius:4px}
  img.prev{height:60px;border-radius:4px;margin-top:4px;display:block}
</style></head><body>
<h1>Refresh Temple Images</h1>
<div class="mode ${apply && authed ? 'live' : 'dry'}">${esc(mode)}</div>
${apply && authed ? `<p style="font-size:13px;color:#15803d"><b>Updated ${updated} temple image(s).</b></p>` : ''}
<table><tr><th>Temple</th><th>Old (broken)</th><th>New</th></tr>${body}</table>
<p class="note">Preview is safe. Apply with <code>?apply=1&amp;token=…</code>. New images render through your Wikimedia image-proxy on the temple pages.</p>
</body></html>`
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  } catch (e: any) {
    return new Response(`Refresh-images failed: ${esc(e?.message || 'unknown error')}`, { status: 500, headers: { 'content-type': 'text/plain' } })
  }
}
