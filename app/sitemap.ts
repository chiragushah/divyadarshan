import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://divyadarshan.in'

  await connectDB()
  const temples = await Temple.find().select('slug updatedAt').lean()

  const templeUrls: MetadataRoute.Sitemap = temples.map(t => ({
    url: `${base}/temple/${t.slug}`,
    lastModified: t.updatedAt ? new Date(t.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                        lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/explore`,           lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/circuits`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/plan`,              lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/plan/budget`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/plan/checklist`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/plan/calendar`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.7 },
  ]

  return [...staticPages, ...templeUrls]
}
