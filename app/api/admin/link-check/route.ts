import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// ─────────────────────────────────────────────────────────────────────────────
// Read-only checker for temples' official_website links. Visits each link from
// the server and reports which are dead (DNS/timeout/4xx/5xx), which are
// bot-blocked (401/403/429 — may still work in a real browser), and which are OK.
// Scope with ?state=Gujarat, page with ?offset=&limit=, filter ?only=broken.
// ─────────────────────────────────────────────────────────────────────────────

function esc(s: any): string {
  return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))
}

function normalizeUrl(raw: string): string | null {
  let u = String(raw || '').trim()
  if (!u || /^(n\/a|none|-|tbd|na)$/i.test(u)) return null
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u
  try { new URL(u); return u } catch { return null }
}

type Result = { status: string; cls: 'ok' | 'broken' | 'blocked'; detail: string }

async function checkOne(url: string, timeoutMs: number): Promise<Result> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DivyaDarshanam-LinkCheck/1.0; +https://divyadarshanam.org)',
        'Accept': 'text/html,application/xhtml+xml',
      },
    })
    clearTimeout(timer)
    const s = res.status
    if (s >= 200 && s < 400) return { status: String(s), cls: 'ok', detail: 'reachable' }
    if (s === 401 || s === 403 || s === 429) return { status: String(s), cls: 'blocked', detail: 'bot-blocked (may work in a browser)' }
    return { status: String(s), cls: 'broken', detail: `HTTP ${s}` }
  } catch (e: any) {
    clearTimeout(timer)
    const msg = String(e?.name === 'AbortError' ? 'timeout' : (e?.cause?.code || e?.code || e?.message || 'network error'))
    return { status: msg, cls: 'broken', detail: msg }
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const stateParam = url.searchParams.get('state') || ''
  const only = url.searchParams.get('only') || '' // 'broken' to show only problems
  const offset = Math.max(0, parseInt(url.searchParams.get('offset') || '0', 10) || 0)
  const limit = Math.min(300, Math.max(10, parseInt(url.searchParams.get('limit') || '160', 10) || 160))
  const timeoutMs = 7000
  const concurrency = 14
  const deadlineAt = Date.now() + 48000 // soft stop so the function returns in time

  try {
    await connectDB()
    const q: Record<string, any> = { official_website: { $nin: [null, '', 'N/A', 'n/a', '-'] } }
    if (stateParam) q.state = stateParam
    const temples = await Temple.find(q)
      .select('slug name state city official_website')
      .sort({ state: 1, name: 1 })
      .lean() as any[]

    const totalWithSite = temples.length
    const noSiteCount = await Temple.countDocuments(
      stateParam
        ? { state: stateParam, $or: [{ official_website: { $in: [null, '', 'N/A', 'n/a', '-'] } }, { official_website: { $exists: false } }] }
        : { $or: [{ official_website: { $in: [null, '', 'N/A', 'n/a', '-'] } }, { official_website: { $exists: false } }] }
    )

    const slice = temples.slice(offset, offset + limit)

    // Checked results, concurrency-limited with a soft deadline.
    const rows: { t: any; raw: string; url: string | null; r: Result | null }[] =
      slice.map(t => ({ t, raw: t.official_website, url: normalizeUrl(t.official_website), r: null }))

    let idx = 0
    let hitDeadline = false
    async function worker() {
      while (true) {
        const i = idx++
        if (i >= rows.length) return
        const row = rows[i]
        if (!row.url) { row.r = { status: 'invalid', cls: 'broken', detail: 'not a valid URL' }; continue }
        if (Date.now() > deadlineAt) { hitDeadline = true; return }
        row.r = await checkOne(row.url, timeoutMs)
      }
    }
    await Promise.all(Array.from({ length: concurrency }, () => worker()))

    const checked = rows.filter(r => r.r)
    const broken = checked.filter(r => r.r!.cls === 'broken')
    const blocked = checked.filter(r => r.r!.cls === 'blocked')
    const ok = checked.filter(r => r.r!.cls === 'ok')
    const notChecked = rows.filter(r => !r.r)

    const rowHtml = (list: typeof rows, badge: string) => list.map(r => `
      <tr>
        <td class="nm"><a href="/temple/${esc(r.t.slug)}" target="_blank">${esc(r.t.name)}</a>
          <div class="sub">${esc([r.t.city, r.t.state].filter(Boolean).join(', '))}</div></td>
        <td class="url">${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.raw)}</a>` : esc(r.raw)}</td>
        <td class="st"><span class="${badge}">${esc(r.r ? r.r.detail : 'not checked')}</span></td>
      </tr>`).join('')

    const section = (title: string, list: typeof rows, badge: string) => list.length
      ? `<h2>${esc(title)} <span class="count">${list.length}</span></h2>
         <table><tr><th>Temple</th><th>Official link</th><th>Result</th></tr>${rowHtml(list, badge)}</table>`
      : ''

    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Official-link check${stateParam ? ' — ' + esc(stateParam) : ''}</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:1000px;margin:0 auto;padding:24px;color:#1a1a1a}
  h1{font-size:21px;margin:0 0 4px} h2{font-size:16px;margin:24px 0 8px}
  .lede{color:#666;font-size:13px;margin:0 0 8px} .count{font-weight:400;color:#888;font-size:13px}
  table{border-collapse:collapse;width:100%;font-size:13px;margin-bottom:10px}
  th,td{border:1px solid #eadfce;padding:7px 9px;text-align:left;vertical-align:top} th{background:#faf6ef}
  td.nm a{color:#8B1A1A;font-weight:600;text-decoration:none} .sub{color:#888;font-size:11px;margin-top:2px}
  td.url{word-break:break-all;max-width:360px} td.url a{color:#1d4ed8;text-decoration:none}
  .bad{color:#b91c1c;font-weight:700} .blk{color:#b45309;font-weight:600} .good{color:#15803d}
  .summary{background:#faf6ef;border:1px solid #eadfce;border-radius:8px;padding:12px 14px;font-size:13px;line-height:1.7;margin-bottom:8px}
  .note{color:#888;font-size:12px;margin-top:20px;line-height:1.6;border-top:1px solid #eadfce;padding-top:12px}
  code{background:#f5f0e8;padding:1px 5px;border-radius:4px}
</style></head><body>
<h1>Official Website Link Check${stateParam ? ' — ' + esc(stateParam) : ''}</h1>
<p class="lede">Live from the database · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
<div class="summary">
  <b>${broken.length}</b> broken · <b>${blocked.length}</b> bot-blocked (may still work) · <b>${ok.length}</b> OK
  &nbsp;|&nbsp; checked ${checked.length} of ${slice.length} shown (${totalWithSite} temples have a link; ${noSiteCount} have none)
  ${hitDeadline || notChecked.length ? `<br><span class="blk">Time budget reached — ${notChecked.length} not checked this run. Re-run with <code>?offset=${offset + checked.length}</code> to continue.</span>` : ''}
</div>
${section('Broken — need fixing or removing', broken, 'bad')}
${only === 'broken' ? '' : section('Bot-blocked — likely fine, worth a manual look', blocked, 'blk')}
${only === 'broken' ? '' : section('Working', ok, 'good')}
<p class="note">
Scope to a state with <code>?state=Gujarat</code>, show only problems with <code>?only=broken</code>, page with <code>?offset=&amp;limit=</code>.<br>
"Bot-blocked" means the site answered 401/403/429 to an automated visit — it usually still opens fine in a browser, so treat those as lower priority.
</p>
</body></html>`

    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  } catch (e: any) {
    return new Response(`Link check failed: ${esc(e?.message || 'unknown error')}`, { status: 500, headers: { 'content-type': 'text/plain' } })
  }
}
