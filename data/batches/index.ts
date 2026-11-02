import b1 from './batch-1.json'
import b2 from './batch-2.json'
import b3 from './batch-3.json'
import b4 from './batch-4.json'
import b5 from './batch-5.json'
import b6 from './batch-6.json'
import b7 from './batch-7.json'
import b8 from './batch-8.json'
import b9 from './batch-9.json'
import b10 from './batch-10.json'
import b11 from './batch-11.json'
import b12 from './batch-12.json'
import b13 from './batch-13.json'
import b14 from './batch-14.json'
import b15 from './batch-15.json'
import b16 from './batch-16.json'
import b17 from './batch-17.json'
import b18 from './batch-18.json'

export interface BatchItem {
  slug: string
  official_website: string | null
  description: string | null
  timings_official: string | null
  sources: { url: string; what_it_supports: string }[]
  notes: string | null
  /** Correction of text this earlier batch applied: replaces the live description only if it still equals that batch's text. */
  replaces_batch?: string
  /** Present only for a temple that is not on the portal yet; applying the batch creates it with just these verified basics. */
  /** Exact old text currently live; the verified description replaces it only while the live text is still exactly this (so nothing edited since is lost). */
  replaces_live?: string
  /** Corrections to location or website fields. Each is applied only while the live value is still `from`. */
  set_fields?: { field: 'city' | 'state' | 'district' | 'official_website'; from: string | null; to: string }[]
  /** Verified practical details. timing replaces the live placeholder; how_to_reach is added only while the live value is empty. */
  set_details?: { timing?: string | null; timing_source?: string | null; how_to_reach?: Record<string, string> | null }
  new_temple?: { name: string; city: string; district?: string | null; state: string; deity: string; type: string; lat?: number | null; lng?: number | null }
}
export interface Batch { id: string; title: string; items: BatchItem[] }

// Add each approved batch here. Nothing is applied automatically; an admin applies a batch from /admin/temple-batches.
export const BATCHES: Batch[] = [
  { id: 'batch-1', title: 'Batch 1: Maharashtra, Gujarat, Rajasthan (well-known temples)', items: b1 as unknown as BatchItem[] },
  { id: 'batch-2', title: 'Batch 2: Ashtavinayak, Jejuri, Akkalkot, Alandi, Shani Shingnapur and more', items: b2 as unknown as BatchItem[] },
  { id: 'batch-3', title: 'Batch 3: Official websites you supplied (checked)', items: b3 as unknown as BatchItem[] },
  { id: 'batch-4', title: 'Batch 4: Mahur, Lenyadri, Dehu, Ellora, Elephanta, Dwarka, Girnar, Ahmedabad, Kesariyaji, Jaipur, Jeen Mata', items: b4 as unknown as BatchItem[] },
  { id: 'batch-5', title: 'Batch 5: Ambaji, Dwarka, Trimbak, Siddhivinayak, Shirdi, Dagdusheth, Dilwara, Ranakpur, Ashtavinayak and more (25 temples)', items: b5 as unknown as BatchItem[] },
  { id: 'batch-6', title: 'Batch 6: Corrections to Batches 2 and 4 (from the independent QC audit)', items: b6 as unknown as BatchItem[] },
  { id: 'batch-7', title: 'Batch 7: Pune and Mumbai temples, Swaminarayan mandirs, Mount Abu and more (29 temples)', items: b7 as unknown as BatchItem[] },
  { id: 'batch-8', title: 'Batch 8: Corrections to Batch 1 (from the independent QC audit)', items: b8 as unknown as BatchItem[] },
  { id: 'batch-9', title: 'Batch 9: remaining Maharashtra, Gujarat and Rajasthan temples (39 temples)', items: b9 as unknown as BatchItem[] },
  { id: 'batch-10', title: 'Batch 10: 45 NEW temples in Maharashtra, Gujarat and Rajasthan (creates new pages)', items: b10 as unknown as BatchItem[] },
  { id: 'batch-11', title: 'Batch 11: Replace old unsourced text with verified descriptions (81 temples)', items: b11 as unknown as BatchItem[] },
  { id: 'batch-12', title: 'Batch 12: Location and website corrections (22 temples)', items: b12 as unknown as BatchItem[] },
  { id: 'batch-13', title: 'Batch 13: Shirwal Caves description (1 temple, missed by Batch 11)', items: b13 as unknown as BatchItem[] },
  { id: 'batch-14', title: 'Batch 14: Verified descriptions for 60 more temples (Maharashtra, Gujarat, Rajasthan, Goa, Karnataka)', items: b14 as unknown as BatchItem[] },
  { id: 'batch-15', title: 'Batch 15: Verified descriptions for 73 temples (Tamil Nadu, Kerala, Andhra Pradesh, Telangana)', items: b15 as unknown as BatchItem[] },
  { id: 'batch-16', title: 'Batch 16: Verified descriptions for 76 temples (Uttar Pradesh, Madhya Pradesh, Delhi, Haryana, Uttarakhand)', items: b16 as unknown as BatchItem[] },
  { id: 'batch-17', title: 'Batch 17: Verified descriptions for 79 temples (Himachal, Punjab, West Bengal, Odisha, Bihar, Jharkhand, Assam, J&K, Chhattisgarh, Arunachal, Tripura)', items: b17 as unknown as BatchItem[] },
  { id: 'batch-18', title: 'Batch 18: Official timings for 30 temples and how-to-reach for 43 new temples (details only, no descriptions)', items: b18 as unknown as BatchItem[] },
]
