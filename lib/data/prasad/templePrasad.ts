// Signature prasad of well-known temples, linked to the matching recipe version.
// Only entries we are confident about are listed. The recipes are HOME versions:
// temples keep their own exact methods (Tirupati's laddu recipe is a closely held secret).
import { FESTIVALS } from '@/lib/data/festivals'
import { entriesForFestival, getRecipe } from './index'

export interface TempleDish { dish: string; variant: string; note: string }

export const TEMPLE_PRASAD: Record<string, TempleDish[]> = {
  'tirumala-venkateswara-temple': [
    { dish: 'laddu', variant: 'tirupati', note: 'The Tirupati laddu is the best-known temple prasad in India. This is a home version — the temple’s exact recipe is not public.' },
    { dish: 'puliyodarai', variant: 'andhra-pulihora', note: 'Tamarind rice (pulihora) is a regular offering and is also served as prasad at the temple.' },
  ],
  'jagannath-temple-puri': [
    { dish: 'puri-mahaprasad', variant: 'odisha-puri', note: 'Mahaprasad, cooked in earthen pots in the temple kitchens and offered as Abhada. A home-scale guide to the dishes.' },
    { dish: 'khaja', variant: 'odisha-puri', note: 'Khaja, the layered sweet of Puri, sold near the temple and offered as prasad.' },
  ],
  'palani-murugan-temple': [
    { dish: 'panchamrit', variant: 'palani-tamil', note: 'Palani Panchamritam is the famous prasad of the hill temple.' },
  ],
  'sabarimala-ayyappa-temple': [
    { dish: 'aravana-payasam', variant: 'kerala', note: 'Aravana payasam is the signature prasad of Sabarimala.' },
    { dish: 'appam', variant: 'kerala-unniyappam', note: 'Appam (unniyappam) is offered alongside the aravana.' },
  ],
  'guruvayur-krishna-temple': [
    { dish: 'kheer-payasam', variant: 'kerala-ada-pradhaman', note: 'Payasam is central to Guruvayur’s offerings; palpayasam and ada pradhaman are both made for Krishna.' },
  ],
  'siddhivinayak-temple': [
    { dish: 'modak', variant: 'maharashtra', note: 'Modak is Ganesha’s own offering and is widely made for Siddhivinayak; laddu is also common.' },
  ],
  'ashtavinayak-siddhatek-temple': [{ dish: 'modak', variant: 'maharashtra', note: 'Modak is the traditional Ganesha offering at the Ashtavinayak temples.' }],
  'ashtavinayak-morgaon-temple': [{ dish: 'modak', variant: 'maharashtra', note: 'Modak is the traditional Ganesha offering at the Ashtavinayak temples.' }],
  'golden-temple-amritsar': [
    { dish: 'halwa-sheera', variant: 'sikh-kada-prasad', note: 'Karah Prashad, the sacred pudding served at every gurdwara, equal parts flour, ghee and sugar.' },
  ],
  'sankat-mochan-hanuman-temple': [
    { dish: 'laddu', variant: 'north-boondi', note: 'Besan laddus are the offering Varanasi’s Sankat Mochan is known for.' },
  ],
  'hanuman-garhi-temple': [
    { dish: 'laddu', variant: 'north-boondi', note: 'Laddus are the usual offering to Hanuman at Ayodhya.' },
  ],
  'krishna-janmabhoomi-temple': [
    { dish: 'makhan-mishri', variant: 'braj', note: 'Makhan-mishri is the traditional Braj offering to Krishna, especially at Janmashtami.' },
    { dish: 'panjiri', variant: 'braj-dhaniya', note: 'Dhaniya panjiri is the Janmashtami prasad of Mathura and Vrindavan.' },
  ],
  'banke-bihari-temple': [
    { dish: 'makhan-mishri', variant: 'braj', note: 'Makhan-mishri is the classic Braj bhog for Bal Krishna.' },
  ],
  'dakshineswar-kali-temple': [
    { dish: 'khichdi-bhog', variant: 'bengal-bhoger-khichuri', note: 'Bhoger khichuri is the Bengali temple bhog; the temple’s own bhog varies by the day.' },
  ],
}

const STATE_HINT: Record<string, RegExp> = {
  'Uttar Pradesh': /uttar pradesh|\bup\b|braj|purvanchal|awadh/i,
  Maharashtra: /maharashtra|konkan/i,
  'Tamil Nadu': /tamil/i,
  'Andhra Pradesh': /andhra/i,
  Telangana: /telangana|andhra/i,
  Karnataka: /karnataka/i,
  Kerala: /kerala/i,
  Odisha: /odisha/i,
  'West Bengal': /bengal/i,
  Punjab: /punjab|sikh/i,
  Rajasthan: /rajasthan/i,
  Gujarat: /gujarat/i,
  Bihar: /bihar/i,
  Assam: /assam/i,
  Goa: /goa|konkan/i,
}

/** Recipes from festivals celebrated at this temple, shown only in the version cooked in the temple's own state. */
export function festivalPrasadFor(templeSlug: string, state: string | undefined, exclude: string[] = []): { dish: string; variant: string; festival: string }[] {
  const re = state ? STATE_HINT[state] : undefined
  if (!re) return []
  const out: { dish: string; variant: string; festival: string }[] = []
  const seen = new Set(exclude)
  for (const f of FESTIVALS) {
    if (!f.temples.some(t => t.slug === templeSlug)) continue
    for (const e of entriesForFestival(f.slug)?.entries || []) {
      if (e.kind !== 'recipe') continue
      const r = getRecipe(e.dish)
      const v = r?.variants.find(x => re.test(x.region) || re.test(x.culture))
      if (!r || !v) continue
      const key = `${r.id}/${v.id}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ dish: r.id, variant: v.id, festival: f.name })
    }
  }
  return out.slice(0, 6)
}
