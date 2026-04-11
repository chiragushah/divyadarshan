'use client'

interface Props {
  name: string
  deity: string
  city: string
  state: string
}

export default function DeepDiveSection({ name, deity, city, state }: Props) {
  const enc = (s: string) => encodeURIComponent(s)
  const ytSearch = (q: string) => `https://www.youtube.com/results?search_query=${enc(q)}`
  const ytEmbed  = (q: string) => `https://www.youtube.com/embed/videoseries?list=PLrEnWoR732-CN09YykVef6TMVZdmQK_0A&listType=search&query=${enc(q)}`

  const videos = [
    {
      label: 'Temple Tour & Darshan',
      query: name + ' temple tour darshan 4k',
      desc:  'Virtual darshan and full temple walkthrough',
      icon:  '🕍',
      bg:    'linear-gradient(135deg, #8B1A1A, #C0570A)',
    },
    {
      label: 'History & Significance',
      query: name + ' temple history significance',
      desc:  'Historical background and spiritual importance',
      icon:  '🏛️',
      bg:    'linear-gradient(135deg, #1a3a8b, #0a70c0)',
    },
    {
      label: deity + ' Stories & Legends',
      query: deity + ' god stories legends mythology',
      desc:  'Ancient stories and lesser-known legends',
      icon:  '📚',
      bg:    'linear-gradient(135deg, #5b1a8b, #a00ac0)',
    },
    {
      label: deity + ' Unknown Facts',
      query: deity + ' unknown facts secrets interesting',
      desc:  'Surprising facts most pilgrims never know',
      icon:  '✨',
      bg:    'linear-gradient(135deg, #1a6b3a, #0a9c50)',
    },
    {
      label: 'Aarti & Rituals',
      query: name + ' aarti rituals morning evening ceremony',
      desc:  'Sacred rituals and daily aarti ceremony',
      icon:  '🕯️',
      bg:    'linear-gradient(135deg, #8b6a1a, #c09a0a)',
    },
    {
      label: deity + ' Bhajans & Kirtans',
      query: deity + ' bhajan kirtan devotional songs',
      desc:  'Soulful bhajans and devotional music',
      icon:  '🎵',
      bg:    'linear-gradient(135deg, #8b1a5a, #c00a7a)',
    },
  ]

  const links = [
    {
      label: 'Wikipedia',
      sub:   name,
      url:   'https://en.wikipedia.org/wiki/' + enc(name.replace(/ /g, '_')),
      desc:  'Full history, architecture and significance',
      icon:  '📖',
      color: '#3366cc',
      bg:    'rgba(51,102,204,0.06)',
    },
    {
      label: 'Mythology & Legends',
      sub:   deity + ' stories',
      url:   'https://www.google.com/search?q=' + enc(deity + ' mythology legends ancient story'),
      desc:  'Deep dive into deity stories and symbolism',
      icon:  '🔍',
      color: '#4285F4',
      bg:    'rgba(66,133,244,0.06)',
    },
    {
      label: 'Unknown Facts',
      sub:   name + ' secrets',
      url:   'https://www.google.com/search?q=' + enc(name + ' temple unknown facts secrets history'),
      desc:  'Hidden stories most pilgrims never hear',
      icon:  '🤯',
      color: '#EA4335',
      bg:    'rgba(234,67,53,0.06)',
    },
    {
      label: 'Spotify Podcasts',
      sub:   deity + ' spirituality',
      url:   'https://open.spotify.com/search/' + enc(deity + ' temple mythology'),
      desc:  'Podcasts on mythology and temple stories',
      icon:  '🎧',
      color: '#1DB954',
      bg:    'rgba(29,185,84,0.06)',
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="font-serif text-2xl font-medium mb-1">Deep Dive</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--muted2)' }}>
        Explore videos, stories, unknown facts and podcasts about {name} and {deity}
      </p>

      {/* YouTube Video Cards */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span style={{ fontSize: 20 }}>🎥</span>
          <h3 className="font-serif text-lg font-medium" style={{ color: 'var(--ink)' }}>Watch on YouTube</h3>
          <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ background: '#FF0000', color: 'white', fontWeight: 700 }}>YouTube</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {videos.map((v, i) => (
            <a key={i} href={ytSearch(v.query)} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none', borderRadius: 12, overflow: 'hidden', border: '1.5px solid var(--border)', background: '#fff', display: 'block', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
              {/* Thumbnail placeholder */}
              <div style={{ height: 140, background: v.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative' }}>
                <div style={{ fontSize: 36 }}>{v.icon}</div>
                {/* Play button overlay */}
                <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.7)', borderRadius: 6, padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  <span style={{ fontSize: 10, color: 'white', fontWeight: 600 }}>Watch</span>
                </div>
                {/* YouTube logo */}
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <svg height="14" viewBox="0 0 90 20" fill="white" opacity="0.8"><text x="0" y="16" fontSize="14" fontWeight="bold">YouTube</text></svg>
                </div>
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 3, lineHeight: 1.4 }}>{v.label}</div>
                <div style={{ fontSize: 11, color: 'var(--muted2)', lineHeight: 1.5 }}>{v.desc}</div>
                <div style={{ fontSize: 10, color: '#FF0000', marginTop: 6, fontWeight: 600 }}>Open in YouTube →</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Read & Listen */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span style={{ fontSize: 20 }}>📚</span>
          <h3 className="font-serif text-lg font-medium" style={{ color: 'var(--ink)' }}>Read & Listen</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {links.map((a, i) => (
            <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderRadius: 12, border: '1.5px solid var(--border)', textDecoration: 'none', background: a.bg, transition: 'border-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = a.color}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
              <div className="min-w-0">
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: a.color, fontWeight: 600, marginBottom: 2 }}>{a.sub}</div>
                <div style={{ fontSize: 11, color: 'var(--muted2)', lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
