import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60 // cache 60 seconds

// Fetch YouTube channel RSS to get latest/live video - no API key needed!
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const channelId = searchParams.get('channelId')

  if (!channelId) {
    return NextResponse.json({ error: 'channelId required' }, { status: 400 })
  }

  try {
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    const res = await fetch(rssUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      return NextResponse.json({ videoId: null, isLive: false })
    }

    const xml = await res.text()

    // Extract video IDs from RSS
    const videoIds = [...xml.matchAll(/yt:videoId>([^<]+)</g)].map(m => m[1])
    if (!videoIds.length) {
      return NextResponse.json({ videoId: null, isLive: false })
    }

    // Check if the latest video is a live stream by checking its title/description
    const isLive = xml.toLowerCase().includes('live') ||
                   xml.toLowerCase().includes('लाइव') ||
                   xml.toLowerCase().includes('లైవ్')

    return NextResponse.json({
      videoId: videoIds[0],
      isLive,
      allVideoIds: videoIds.slice(0, 3),
    })
  } catch (err) {
    return NextResponse.json({ videoId: null, isLive: false })
  }
}
