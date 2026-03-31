import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://divyadarshan.in'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/auth/', '/yatra/', '/profile/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
