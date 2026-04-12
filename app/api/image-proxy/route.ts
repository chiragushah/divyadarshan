import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url', { status: 400 })

  // Only allow Wikimedia URLs for security
  if (!url.includes('wikimedia.org') && !url.includes('wikipedia.org')) {
    return new NextResponse('Only Wikimedia URLs allowed', { status: 403 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'DivyaDarshanam/1.0 (https://divyadarshanam.in; contact@divyadarshanam.in)',
        'Referer': 'https://divyadarshanam.in',
      },
    })

    if (!res.ok) return new NextResponse('Failed to fetch image', { status: res.status })

    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const buffer = await res.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800', // 1 day browser, 7 days CDN
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    return new NextResponse('Error fetching image', { status: 500 })
  }
}
