import type { Metadata } from 'next'
import { FESTIVALS } from '@/lib/data/festivals'
import FestivalsClient from './FestivalsClient'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Festivals of India — Significance, Rituals & Temples | DivyaDarshanam',
  description:
    'A detailed guide to the festivals of India — their significance, how they are celebrated, the food and prasad, dances, the deity worshipped and the temples to visit for each.',
}

// Turn a stored temple image into a loadable URL (proxy Wikimedia, pass Blob URLs through).
function resolveImg(url?: string): string {
  if (!url) return ''
  if (url.includes('wikimedia.org') || url.includes('wikipedia.org')) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`
  }
  return url
}

export default async function FestivalsPage() {
  // Use the real photo of each festival's lead temple (from the temples DB) as its image.
  let imgBySlug: Record<string, string> = {}
  try {
    await connectDB()
    const slugs = [...new Set(
      FESTIVALS.map(f => f.temples.find(t => t.slug)?.slug).filter(Boolean) as string[]
    )]
    const temples = await Temple.find({ slug: { $in: slugs } })
      .select('slug image_url blob_image_url').lean()
    for (const t of temples as any[]) {
      imgBySlug[t.slug] = resolveImg(t.blob_image_url || t.image_url)
    }
  } catch {
    imgBySlug = {}
  }

  const festivals = FESTIVALS.map(f => {
    const s = f.temples.find(t => t.slug)?.slug
    return { ...f, heroImage: (s && imgBySlug[s]) || '' }
  })

  return <FestivalsClient festivals={festivals} />
}
