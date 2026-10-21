import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'

// ─────────────────────────────────────────────────────────────────────────────
// One-time fix for broken official_website links (from the link-check report).
// Matched by the temple's EXACT current URL, so it only touches the intended
// records. Replacements were verified to load; empty string clears a dead link.
// Dry-run by default; apply with ?apply=1&token=.
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN = '8e11eb8dc59a58b87f'

// current broken URL  →  new value ('' clears the dead link)
const CHANGES: Record<string, string> = {
  'https://tirupati.org': 'https://www.tirumala.org',
  'https://kamakhyatemple.in': 'https://kamakhya.assam.gov.in',
  'https://ambajimandir.org': 'https://ambajitemple.in',
  'https://jwalajitemple.org': '',
  'https://shriamarnathjishrine.com': 'https://www.jksasb.nic.in',
  'https://chamundeshwaritemple.com': 'https://chamundeshwaritemple.in',
  'https://www.srikrishnamatha.org': '',
  'https://mahakaleshwar.nic.in': 'https://shrimahakaleshwar.com',
  'https://www.shrisaibabasansthan.org': 'https://sai.org.in',
  'https://jagannath.nic.in': 'https://www.shreejagannatha.in',
  'https://www.arunachaleswarar.org': '',
  'https://www.thanjavur.tn.gov.in': '',
  'https://www.thillainatarajan.in': '',
  'https://www.kanchikamakshi.com': '',
  'https://maduraimeenakshi.org': 'https://maduraimeenakshi.hrce.tn.gov.in',
  'https://aadhinamurugantemple.tnhrce.in': '',
  'https://www.rameswaramtemple.tnhrce.in': '',
  'https://yadagiriguttatemple.org': 'https://yadagiriguttatemple.telangana.gov.in',
  'https://www.bankebihari.org': '',
  'https://www.gorakhnathmandirtrust.org': '',
  'https://www.mathura.nic.in': '',
  // Second pass: replacements that themselves proved unreachable/unsafe.
  // Kamakhya subdomain does not resolve (ENOTFOUND); Mahakaleshwar site has a
  // broken SSL chain. No dependable official site for either → clear. (Amarnath
  // jksasb.nic.in is kept: it is the genuine official site and only times out
  // from datacenters, working fine for real visitors.)
  'https://kamakhya.assam.gov.in': '',
  'https://shrimahakaleshwar.com': '',
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
    const keys = Object.keys(CHANGES)
    const temples = await Temple.find({ official_website: { $in: keys } })
      .select('slug name state city official_website').lean() as any[]

    let replaced = 0, cleared = 0
    const rows = temples.map(t => {
      const next = CHANGES[t.official_website]
      const action = next ? 'replace' : 'clear'
      return { t, from: t.official_website, to: next, action }
    }).sort((a, b) => a.action.localeCompare(b.action))

    if (apply && authed) {
      for (const r of rows) {
        await Temple.updateOne({ slug: r.t.slug }, { $set: { official_website: r.to } })
        if (r.to) replaced++; else cleared++
      }
    }

    const body = rows.map(r => `
      <tr>
        <td class="nm"><a href="/temple/${esc(r.t.slug)}" target="_blank">${esc(r.t.name)}</a>
          <div class="sub">${esc([r.t.city, r.t.state].filter(Boolean).join(', '))}</div></td>
        <td class="old">${esc(r.from)}</td>
        <td>${r.to ? `<span class="rep">→ ${esc(r.to)}</span>` : `<span class="clr">cleared (dead link removed)</span>`}</td>
      </tr>`).join('')

    const mode = apply ? (authed ? 'APPLIED' : 'APPLY BLOCKED (no valid token)') : 'DRY RUN (preview only — nothing changed)'
    const missing = keys.filter(k => !temples.some(t => t.official_website === k))

    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Fix official links — ${esc(mode)}</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:960px;margin:0 auto;padding:24px;color:#1a1a1a}
  h1{font-size:21px;margin:0 0 4px} .mode{display:inline-block;padding:4px 10px;border-radius:6px;font-size:13px;font-weight:700;margin-bottom:14px}
  .dry{background:#fff7ed;color:#b45309;border:1px solid #fed7aa} .live{background:#dcfce7;color:#15803d;border:1px solid #86efac}
  table{border-collapse:collapse;width:100%;font-size:13px;margin-bottom:12px}
  th,td{border:1px solid #eadfce;padding:7px 9px;text-align:left;vertical-align:top} th{background:#faf6ef}
  td.nm a{color:#8B1A1A;font-weight:600;text-decoration:none} .sub{color:#888;font-size:11px;margin-top:2px}
  td.old{color:#b91c1c;text-decoration:line-through;word-break:break-all;max-width:260px}
  .rep{color:#15803d;font-weight:600;word-break:break-all} .clr{color:#b45309}
  .note{color:#888;font-size:12px;margin-top:18px;line-height:1.6} code{background:#f5f0e8;padding:1px 5px;border-radius:4px}
</style></head><body>
<h1>Fix Official Website Links</h1>
<div class="mode ${apply && authed ? 'live' : 'dry'}">${esc(mode)}</div>
<p style="font-size:13px;color:#555">${rows.length} matching records · ${rows.filter(r => r.to).length} to replace · ${rows.filter(r => !r.to).length} to clear${apply && authed ? ` · <b>applied: ${replaced} replaced, ${cleared} cleared</b>` : ''}</p>
<table><tr><th>Temple</th><th>Old (broken)</th><th>New</th></tr>${body}</table>
${missing.length ? `<p class="note">Note: ${missing.length} mapped URL(s) matched no record (already changed or different): ${missing.map(esc).join(', ')}</p>` : ''}
<p class="note">Preview is safe. To apply: add <code>?apply=1&amp;token=…</code> to the URL. Re-running is safe — once a URL is fixed it no longer matches.</p>
</body></html>`
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  } catch (e: any) {
    return new Response(`Fix-links failed: ${esc(e?.message || 'unknown error')}`, { status: 500, headers: { 'content-type': 'text/plain' } })
  }
}
