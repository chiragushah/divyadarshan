'use client'
// v2 - no external branding
import { useState } from 'react'

interface Props {
  liveUrl: string
  templeName: string
  channelId?: string
}

function extractYouTubeEmbed(url: string, channelId?: string): string | null {
  if (!url) return null

  // Already a channel ID
  if (channelId) {
    return `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1`
  }

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&mute=1`

  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&mute=1`

  // youtube.com/@ChannelHandle/live or youtube.com/channel/ID/live
  const channelMatch = url.match(/youtube\.com\/(channel\/|@)([^/?]+)/)
  if (channelMatch) {
    // Use the handle-based live embed
    const handle = channelMatch[2]
    return `https://www.youtube.com/embed?listType=user_uploads&list=${handle}&autoplay=1&mute=1`
  }

  // youtube.com/results (search) — can't embed, open in new tab
  if (url.includes('results?search_query')) return null

  return null
}

export default function LiveDarshanPlayer({ liveUrl, templeName, channelId }: Props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  const embedUrl = extractYouTubeEmbed(liveUrl, channelId)
  const isSearchUrl = liveUrl?.includes('results?search_query')

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a0a0a 0%, #2d0f0f 100%)',
      borderRadius: 16,
      overflow: 'hidden',
      border: '1.5px solid rgba(139,26,26,0.3)',
      marginBottom: 32,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{
          width: 10, height: 10, borderRadius: '50%',
          background: '#ef4444',
          boxShadow: '0 0 8px #ef4444',
          animation: 'pulse 2s infinite',
          flexShrink: 0,
        }} />
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>LIVE DARSHAN</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginLeft: 4 }}>
          {templeName}
        </span>

      </div>

      {/* Player Area */}
      {!showPlayer ? (
        // Thumbnail / Click to play
        <div
          onClick={() => setShowPlayer(true)}
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: embedUrl ? 'pointer' : 'default',
            background: 'rgba(0,0,0,0.3)',
            gap: 12,
          }}
        >
          {/* Temple deity icon */}
          <div style={{ fontSize: 48 }}>🛕</div>

          {embedUrl ? (
            <>
              <div style={{
                background: '#ef4444',
                color: '#fff',
                borderRadius: 50,
                width: 56, height: 56,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
                boxShadow: '0 4px 20px rgba(239,68,68,0.5)',
              }}>▶</div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: 0 }}>
                Watch Live Darshan
              </p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, margin: 0 }}>
                Available during aarti timings • 5:00 AM · 12:00 PM · 7:00 PM
              </p>
            </>
          ) : (
            <>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0, textAlign: 'center', padding: '0 20px' }}>
                Live darshan available on YouTube
              </p>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  padding: '10px 24px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                🔴 Watch Live on YouTube
              </a>
            </>
          )}
        </div>
      ) : (
        // Embedded player
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
          {!isLoaded && !hasError && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)', fontSize: 14,
            }}>
              Loading live stream...
            </div>
          )}
          {hasError ? (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 12,
            }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                Live stream unavailable on DivyaDarshan
              </p>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#ef4444', color: '#fff',
                  padding: '10px 24px', borderRadius: 8,
                  textDecoration: 'none', fontSize: 13, fontWeight: 600,
                }}
              >
                🔴 Watch on YouTube
              </a>
            </div>
          ) : (
            <iframe
              src={embedUrl!}
              style={{
                width: '100%', height: '100%',
                border: 'none',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              title={`${templeName} Live Darshan`}
            />
          )}
        </div>
      )}

      {/* Footer note */}
      <div style={{
        padding: '10px 20px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
          🙏 Live stream from the temple's official channel • Available during aarti timings
        </span>
      </div>
    </div>
  )
}
