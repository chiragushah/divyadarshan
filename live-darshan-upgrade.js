const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { execSync } = require('child_process')

// Run from project directory
process.chdir('C:\\Users\\chira\\Downloads\\divyadarshan')
require('dotenv').config({ path: '.env.local' })

const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const write = (rel, content) => {
  const full = path.join(P, rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content, 'utf8')
  console.log('  wrote:', rel)
}

// ── Temple live stream data ───────────────────────────────────
// channelId = YouTube channel ID for RSS feed
// directUrl = official website stream (Option 2)
// ytChannel  = YouTube channel handle URL
const TEMPLE_STREAMS = [
  {
    slug: 'tirumala-venkateswara-temple',
    channelId: 'UCTboTRX74UydvU_cBdm_cCQ',
    ytChannel: 'https://www.youtube.com/@SVBCTTD',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'kashi-vishwanath-temple',
    channelId: 'UCrSMxFXKVqNi5VEGbNhbkIw',
    ytChannel: 'https://www.youtube.com/@ShreeKashiVishwanathMandir',
    directUrl: 'https://shrikashivishwanath.org/online/live_darshan',
    streamType: 'both',
  },
  {
    slug: 'somnath-temple',
    channelId: 'UCwIfMHVZFWFxBpBXBKpD-jA',
    ytChannel: 'https://www.youtube.com/c/SomnathTempleOfficialChannel',
    directUrl: 'https://www.somnath.org/live.html',
    streamType: 'both',
  },
  {
    slug: 'shirdi-sai-baba-samadhi',
    channelId: 'UCfabWGLn8OmV7zOEIKReDIg',
    ytChannel: 'https://www.youtube.com/channel/UCfabWGLn8OmV7zOEIKReDIg',
    directUrl: 'https://www.sai.org.in/live-darshan',
    streamType: 'both',
  },
  {
    slug: 'siddhivinayak-temple',
    channelId: 'UC5xt2x0LYrNjq5K3w3cMJPQ',
    ytChannel: 'https://www.youtube.com/@SiddhivinayakTemple',
    directUrl: 'https://www.siddhivinayak.org/live/',
    streamType: 'both',
  },
  {
    slug: 'ram-lalla-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/@ShriRamJanmabhoomi',
    directUrl: 'https://srjbtkshetra.org/live-darshan',
    streamType: 'direct',
  },
  {
    slug: 'kedarnath-temple',
    channelId: 'UC1fnBM7e-VMUjMEQ3FYEZaQ',
    ytChannel: 'https://www.youtube.com/@BKTCKedarnath',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'badrinath-temple',
    channelId: 'UC1fnBM7e-VMUjMEQ3FYEZaQ',
    ytChannel: 'https://www.youtube.com/@BKTCKedarnath',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'mahakaleshwar-temple',
    channelId: 'UCXhail7h5FDRbHprlR56nIw',
    ytChannel: 'https://www.youtube.com/c/bhaktilive1',
    directUrl: 'https://mahakaleshwar.nic.in/live.php',
    streamType: 'both',
  },
  {
    slug: 'vaishno-devi-shrine',
    channelId: null,
    ytChannel: 'https://www.youtube.com/@VaishnoDevi',
    directUrl: 'https://www.maavaishnodevi.org/darshaan.aspx',
    streamType: 'direct',
  },
  {
    slug: 'golden-temple-amritsar',
    channelId: 'UCFhKCQrwdAFmB9cLFPkr6Kg',
    ytChannel: 'https://www.youtube.com/@SGPCAmritsar',
    directUrl: 'https://www.sgpc.net/live-telecast/',
    streamType: 'both',
  },
  {
    slug: 'jagannath-temple-puri',
    channelId: null,
    ytChannel: 'https://www.youtube.com/@JagannathTemple',
    directUrl: 'https://www.jagannath.nic.in/live.aspx',
    streamType: 'direct',
  },
  {
    slug: 'meenakshi-amman-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/@MeenakshiAmmanTemple',
    directUrl: 'https://www.maduraimeenakshi.org/live',
    streamType: 'direct',
  },
  {
    slug: 'guruvayur-krishna-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/@GuruvayurDevaswom',
    directUrl: 'https://www.guruvayurdevaswom.in/live',
    streamType: 'direct',
  },
  {
    slug: 'haridwar-har-ki-pauri',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=haridwar+ganga+aarti+live',
    directUrl: null,
    streamType: 'youtube',
  },
]

async function main() {
  console.log('\n[1/3] Updating MongoDB with stream data...')
  await mongoose.connect(process.env.MONGODB_URI)
  const db = mongoose.connection.db.collection('temples')

  for (const t of TEMPLE_STREAMS) {
    const update = {
      live_channel_id: t.channelId || null,
      live_direct_url: t.directUrl || null,
      live_yt_channel: t.ytChannel,
      live_stream_type: t.streamType,
      live_url: t.directUrl || t.ytChannel,
    }
    await db.updateOne({ slug: t.slug }, { $set: update })
    console.log(`  updated: ${t.slug}`)
  }
  await mongoose.disconnect()
  console.log('  MongoDB done')

  // ── 2. API route for YouTube RSS live detection ───────────
  console.log('\n[2/3] Creating API route for live feed...')
  write('app/api/live-feed/route.ts', `import { NextRequest, NextResponse } from 'next/server'

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
    const rssUrl = \`https://www.youtube.com/feeds/videos.xml?channel_id=\${channelId}\`
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
                   xml.toLowerCase().includes('\u0932\u093e\u0907\u0935') ||
                   xml.toLowerCase().includes('\u0c32\u0c48\u0c35\u0c4d')

    return NextResponse.json({
      videoId: videoIds[0],
      isLive,
      allVideoIds: videoIds.slice(0, 3),
    })
  } catch (err) {
    return NextResponse.json({ videoId: null, isLive: false })
  }
}
`)

  // ── 3. LiveDarshanPlayer component ───────────────────────
  console.log('\n[3/3] Creating LiveDarshanPlayer component...')
  write('components/temple/LiveDarshanPlayer.tsx', `'use client'
import { useState, useEffect } from 'react'

interface Props {
  channelId?: string | null
  directUrl?: string | null
  ytChannel?: string | null
  streamType?: string
  templeName: string
}

export default function LiveDarshanPlayer({
  channelId, directUrl, ytChannel, streamType, templeName
}: Props) {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'direct' | 'youtube'>(
    streamType === 'direct' ? 'direct' : 'youtube'
  )

  useEffect(() => {
    if (!channelId) { setLoading(false); return }
    fetch(\`/api/live-feed?channelId=\${channelId}\`)
      .then(r => r.json())
      .then(data => {
        if (data.videoId) setVideoId(data.videoId)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [channelId])

  const hasYouTube = !!channelId || !!ytChannel
  const hasDirect  = !!directUrl

  return (
    <div style={{ background: '#000', borderRadius: 12, overflow: 'hidden', border: '1.5px solid #222' }}>
      {/* Tabs */}
      {hasDirect && hasYouTube && (
        <div style={{ display: 'flex', background: '#111', borderBottom: '1px solid #222' }}>
          <button onClick={() => setActiveTab('direct')}
            style={{ flex: 1, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
              background: activeTab === 'direct' ? '#8B1A1A' : 'transparent',
              color: activeTab === 'direct' ? 'white' : '#888' }}>
            \uD83D\uDD34 Official Stream
          </button>
          <button onClick={() => setActiveTab('youtube')}
            style={{ flex: 1, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
              background: activeTab === 'youtube' ? '#8B1A1A' : 'transparent',
              color: activeTab === 'youtube' ? 'white' : '#888' }}>
            \uD83D\uDCFA YouTube Live
          </button>
        </div>
      )}

      {/* Player */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', gap: 12 }}>
            <div style={{ fontSize: 40 }}>\uD83D\uDED5</div>
            <p style={{ color: '#888', fontSize: 13 }}>Connecting to live stream...</p>
          </div>
        )}

        {!loading && activeTab === 'direct' && hasDirect && (
          <iframe
            src={directUrl!}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="camera; microphone; autoplay; encrypted-media"
            allowFullScreen
            title={\`\${templeName} Live Darshan\`}
          />
        )}

        {!loading && activeTab === 'youtube' && (
          <>
            {videoId ? (
              <iframe
                src={\`https://www.youtube-nocookie.com/embed/\${videoId}?autoplay=0&rel=0&modestbranding=1\`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={\`\${templeName} Live Darshan\`}
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', gap: 16, padding: 24 }}>
                <div style={{ fontSize: 48 }}>\uD83D\uDE4F</div>
                <p style={{ color: '#ccc', fontSize: 15, fontWeight: 600, textAlign: 'center' }}>{templeName}</p>
                <p style={{ color: '#888', fontSize: 13, textAlign: 'center' }}>Live stream may not be active right now</p>
                {ytChannel && (
                  <a href={ytChannel} target="_blank" rel="noopener noreferrer"
                    style={{ background: '#FF0000', color: 'white', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                    Watch on YouTube
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer info */}
      <div style={{ background: '#111', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#666', fontSize: 11 }}>
          {activeTab === 'direct' ? 'Official Temple Stream' : 'YouTube Live \u00B7 No ads on sacred content'}
        </span>
        {ytChannel && activeTab === 'youtube' && (
          <a href={ytChannel} target="_blank" rel="noopener noreferrer"
            style={{ color: '#FF0000', fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>
            Open in YouTube \u2192
          </a>
        )}
        {directUrl && activeTab === 'direct' && (
          <a href={directUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: '#C0570A', fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>
            Open official site \u2192
          </a>
        )}
      </div>
    </div>
  )
}
`)

  // Push
  console.log('\nPushing to GitHub...')
  execSync('git add -A', { stdio: 'inherit' })
  execSync('git commit -m "feat: live darshan upgrade - direct streams + YouTube RSS + proper player"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
  console.log('\nDone! Vercel deploying in ~2 mins.')
}

main().catch(console.error)
