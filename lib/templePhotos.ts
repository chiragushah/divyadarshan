// Finds freely licensed photos for temples from Wikipedia / Wikimedia Commons. Runs on the live server (which can reach Wikipedia).
export const GENERIC_MARKERS = ['Durga_Temple%2C_Varanasi', 'Kashi_Vishwanath_Temple.jpg', 'Ranganathaswamy-Temple-Srirangam', 'Vrindavan_ISKCON_temple', 'Dagdusheth_Halwai_Ganapati_Temple_Pune']
export const isGeneric = (u?: string | null) => !!u && GENERIC_MARKERS.some(m => u.includes(m))

export interface Candidate { title: string; page_url: string; image_url: string; license: string; credit: string; credit_url: string; match: boolean }

const UA = { 'User-Agent': 'DivyaDarshanam/1.0 (https://divyadarshanam.org; contact@divyadarshanam.org)' }
const STOP = new Set(['temple', 'mandir', 'shri', 'sri', 'shree', 'devi', 'the', 'of', 'in', 'at', 'ji', 'dham', 'mata', 'maharaj', 'swami', 'temples', 'mandirs'])
const tokens = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w))
const strip = (h: string) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim()
const OK_LICENSE = /^(CC[ -]BY|CC0|Public domain|PD|GFDL|Attribution|FAL|GNU Free)/i

async function j(url: string): Promise<any> {
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 9000)
  try { const r = await fetch(url, { headers: UA, signal: ctrl.signal }); return r.ok ? await r.json() : null } catch { return null } finally { clearTimeout(t) }
}

export async function findPhotos(name: string, city: string, state: string): Promise<Candidate[]> {
  const q = `${name} ${city && city !== state ? city : ''} ${state}`.replace(/\s+/g, ' ').trim()
  const s = await j(`https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=4&prop=pageimages|info&piprop=thumbnail|name&pithumbsize=800&inprop=url`)
  const pages: any[] = Object.values(s?.query?.pages || {}).sort((a: any, b: any) => (a.index || 0) - (b.index || 0))
  const want = tokens(name)
  const out: Candidate[] = []
  for (const p of pages) {
    if (!p.pageimage || !p.thumbnail?.source) continue
    const file = 'File:' + p.pageimage
    const m = await j(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(file)}&prop=imageinfo&iiprop=extmetadata|url&iiextmetadatafilter=LicenseShortName|Artist|Credit|UsageTerms`)
    const info: any = (Object.values(m?.query?.pages || {})[0] as any)?.imageinfo?.[0]
    const md = info?.extmetadata || {}
    const license = strip(md.LicenseShortName?.value || '')
    if (!license || !OK_LICENSE.test(license)) continue
    const artist = strip(md.Artist?.value || '') || 'Wikimedia Commons contributor'
    const src = String(p.thumbnail.source).split('?')[0].replace('://thumb.wikimedia.org/', '://upload.wikimedia.org/').replace(/\/\d+px-/, '/800px-')
    const title: string = p.title
    const tt = new Set(tokens(title))
    out.push({
      title, page_url: p.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`, image_url: src, license,
      credit: `${artist.slice(0, 80)} / ${license}`, credit_url: info?.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(file)}`,
      match: want.length > 0 && want.some(w => tt.has(w)),
    })
  }
  return out
}
