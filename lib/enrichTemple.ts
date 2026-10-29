// Enrich a basic listing from Wikipedia / Wikimedia Commons (free-licensed content only, always credited).
// Runs on the server (Vercel can reach these APIs). Never throws: returns what it found.
const UA = { 'User-Agent': 'DivyaDarshanam/1.0 (https://divyadarshanam.org; contact@divyadarshanam.org)' }

let netErrors = 0   // counts real network failures (as opposed to "this page does not exist")
async function getJson(url: string, ms = 7000): Promise<any | null> {
  const ctrl = new AbortController(); const timer = setTimeout(() => ctrl.abort(), ms)
  try { const r = await fetch(url, { headers: UA, signal: ctrl.signal }); if (r.status >= 500 || r.status === 429) netErrors++; return r.ok ? await r.json() : null }
  catch { netErrors++; return null } finally { clearTimeout(timer) }
}

/** File name on Commons from an upload.wikimedia.org URL, or null if the image is not a Commons (free) file. */
export function commonsFileName(src: string): string | null {
  const m = src.split('?')[0].match(/\/wikipedia\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+)/i)
  return m ? decodeURIComponent(m[1]) : null
}

export function trimExtract(text: string, max = 800): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max); const i = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('। '))
  return (i > 200 ? cut.slice(0, i + 1) : cut.replace(/\s+\S*$/, '') + '…')
}

const stripHtml = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/\s+/g, ' ').trim()

async function commonsCredit(file: string) {
  const page = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`
  const j = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent('File:' + file)}&prop=imageinfo&iiprop=extmetadata&format=json&origin=*`)
  const md = j?.query?.pages ? (Object.values(j.query.pages)[0] as any)?.imageinfo?.[0]?.extmetadata : null
  const licence = md?.LicenseShortName?.value ? stripHtml(md.LicenseShortName.value) : ''
  const artist = md?.Artist?.value ? stripHtml(md.Artist.value).slice(0, 80) : ''
  if (/fair use|non-free/i.test(licence)) return null          // never use non-free images
  const text = ['Photo', artist && `by ${artist}`, licence && `(${licence})`, 'via Wikimedia Commons'].filter(Boolean).join(' ')
  return { text, url: page }
}

export interface EnrichInput { name: string; wikipedia_url?: string; wikidata_id?: string; description?: string }
export interface EnrichPatch {
  extended_description?: string; description_source?: string; description_source_url?: string
  image_url?: string; image_credit?: string; image_credit_url?: string
  enriched_at: Date; enrich_status: 'ok' | 'partial' | 'no-source' | 'retry'
}

export async function enrichTemple(t: EnrichInput): Promise<EnrichPatch> {
  const patch: EnrichPatch = { enriched_at: new Date(), enrich_status: 'no-source' }
  const before = netErrors
  let imageFile: string | null = null

  // 1) Wikipedia article: summary + lead image
  if (t.wikipedia_url) {
    const title = t.wikipedia_url.split('/wiki/')[1]
    const j = title ? await getJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`) : null
    if (j && j.type !== 'disambiguation' && j.extract) {
      const facts = t.description ? `\n\n${t.description}` : ''
      patch.extended_description = trimExtract(j.extract) + facts
      patch.description_source = 'Wikipedia (CC BY-SA 4.0)'
      patch.description_source_url = j.content_urls?.desktop?.page || t.wikipedia_url
      const src: string | undefined = j.originalimage?.source || j.thumbnail?.source
      if (src) imageFile = commonsFileName(src)
    }
  }
  // 2) Otherwise the image Wikidata lists for the item (always a Commons file)
  if (!imageFile && t.wikidata_id) {
    const j = await getJson(`https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${encodeURIComponent(t.wikidata_id)}&property=P18&format=json&origin=*`)
    const v = j?.claims?.P18?.[0]?.mainsnak?.datavalue?.value
    if (typeof v === 'string') imageFile = v
  }
  if (imageFile) {
    const credit = await commonsCredit(imageFile)
    if (credit) {
      patch.image_url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(imageFile)}?width=800`
      patch.image_credit = credit.text; patch.image_credit_url = credit.url
    }
  }
  patch.enrich_status = patch.extended_description && patch.image_url ? 'ok' : (patch.extended_description || patch.image_url) ? 'partial' : 'no-source'
  // Nothing found AND the network misbehaved: do not mark as processed, so it is tried again later.
  if (patch.enrich_status !== 'ok' && netErrors > before && !patch.extended_description && !patch.image_url) patch.enrich_status = 'retry'
  return patch
}
