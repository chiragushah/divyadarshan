'use client'
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
    fetch(`/api/live-feed?channelId=${channelId}`)
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
            🔴 Official Stream
          </button>
          <button onClick={() => setActiveTab('youtube')}
            style={{ flex: 1, padding: '10px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
              background: activeTab === 'youtube' ? '#8B1A1A' : 'transparent',
              color: activeTab === 'youtube' ? 'white' : '#888' }}>
            📺 YouTube Live
          </button>
        </div>
      )}

      {/* Player */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        {loading && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', gap: 12 }}>
            <div style={{ fontSize: 40 }}>🛕</div>
            <p style={{ color: '#888', fontSize: 13 }}>Connecting to live stream...</p>
          </div>
        )}

        {!loading && activeTab === 'direct' && hasDirect && (
          <iframe
            src={directUrl!}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="camera; microphone; autoplay; encrypted-media"
            allowFullScreen
            title={`${templeName} Live Darshan`}
          />
        )}

        {!loading && activeTab === 'youtube' && (
          <>
            {videoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${templeName} Live Darshan`}
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', gap: 16, padding: 24 }}>
                <div style={{ fontSize: 48 }}>🙏</div>
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
          {activeTab === 'direct' ? 'Official Temple Stream' : 'YouTube Live · No ads on sacred content'}
        </span>
        {ytChannel && activeTab === 'youtube' && (
          <a href={ytChannel} target="_blank" rel="noopener noreferrer"
            style={{ color: '#FF0000', fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>
            Open in YouTube →
          </a>
        )}
        {directUrl && activeTab === 'direct' && (
          <a href={directUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: '#C0570A', fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>
            Open official site →
          </a>
        )}
      </div>
    </div>
  )
}
