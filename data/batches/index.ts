import b1 from './batch-1.json'

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
]
