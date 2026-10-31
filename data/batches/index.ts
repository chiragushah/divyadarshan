import b1 from './batch-1.json'
import b2 from './batch-2.json'
import b3 from './batch-3.json'
import b4 from './batch-4.json'
import b5 from './batch-5.json'

export interface BatchItem {
  slug: string
  official_website: string | null
  description: string | null
  timings_official: string | null
  sources: { url: string; what_it_supports: string }[]
  notes: string | null
}
export interface Batch { id: string; title: string; items: BatchItem[] }

// Add each approved batch here. Nothing is applied automatically; an admin applies a batch from /admin/temple-batches.
export const BATCHES: Batch[] = [
  { id: 'batch-1', title: 'Batch 1: Maharashtra, Gujarat, Rajasthan (well-known temples)', items: b1 as unknown as BatchItem[] },
  { id: 'batch-2', title: 'Batch 2: Ashtavinayak, Jejuri, Akkalkot, Alandi, Shani Shingnapur and more', items: b2 as unknown as BatchItem[] },
  { id: 'batch-3', title: 'Batch 3: Official websites you supplied (checked)', items: b3 as unknown as BatchItem[] },
  { id: 'batch-4', title: 'Batch 4: Mahur, Lenyadri, Dehu, Ellora, Elephanta, Dwarka, Girnar, Ahmedabad, Kesariyaji, Jaipur, Jeen Mata', items: b4 as unknown as BatchItem[] },
  { id: 'batch-5', title: 'Batch 5: Ambaji, Dwarka, Trimbak, Siddhivinayak, Shirdi, Dagdusheth, Dilwara, Ranakpur, Ashtavinayak and more (25 temples)', items: b5 as unknown as BatchItem[] },
]
