// Add Deep Dive tab to temple page - YouTube embed search, zero API cost
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const P = 'C:\\Users\\chira\\Downloads\\divyadarshanam'
const filePath = path.join(P, 'app/(public)/temple/[slug]/page.tsx')

let content = fs.readFileSync(filePath, 'utf8')

// ── 1. Add DeepDive component before the closing of TemplePage ──
// We inject it right before the <ReviewsSection> line

const deepDiveComponent = `
{/* ── DEEP DIVE TAB ─────────────────────────────── */}
<DeepDiveSection name={t.name} deity={t.deity} city={t.city} state={t.state} />
`

// Insert before ReviewsSection
content = content.replace(
  '<ReviewsSection templeId={t.id} templeName={t.name} />',
  deepDiveComponent + '\n            <ReviewsSection templeId={t.id} templeName={t.name} />'
)

// ── 2. Add the DeepDiveSection function before TemplePage ──
const deepDiveFunction = `
// ── Deep Dive Section ─────────────────────────────────────────
function DeepDiveSection({ name, deity, city, state }: { name: string; deity: string; city: string; state: string }) {
  const enc = (s: string) => encodeURIComponent(s)
  const templeQ  = enc(name)
  const deityQ   = enc(deity)
  const locationQ = enc(city + ' ' + state)

  const videos = [
    {
      label: name + ' — Temple Tour & Darshan',
      query: name + ' temple tour darshan',
      desc:  'Virtual darshan and full temple walkthrough',
      icon:  '\uD83D\uDD4D',
    },
    {
      label: name + ' — History & Significance',
      query: name + ' temple history significance documentary',
      desc:  'Historical background and spiritual importance',
      icon:  '\uD83C\uDFDB\uFE0F',
    },
    {
      label: deity + ' — Stories & Legends',
      query: deity + ' god stories legends mythology hindi',
      desc:  'Ancient stories and lesser-known legends',
      icon:  '\uD83D\uDCDA',
    },
    {
      label: deity + ' — Unknown Facts',
      query: deity + ' unknown facts secrets temple',
      desc:  'Surprising facts most pilgrims never know',
      icon:  '\u2728',
    },
    {
      label: name + ' — Aarti & Rituals',
      query: name + ' aarti rituals pooja ceremony',
      desc:  'Sacred rituals and daily aarti ceremony',
      icon:  '\uD83D\uDD6F\uFE0F',
    },
    {
      label: deity + ' — Devotional Bhajans',
      query: deity + ' bhajan kirtan devotional songs',
      desc:  'Soulful bhajans and devotional music',
      icon:  '\uD83C\uDFB5',
    },
  ]

  const articles = [
    {
      label: 'Wikipedia — ' + name,
      url:   'https://en.wikipedia.org/wiki/' + enc(name.replace(/ /g, '_')),
      desc:  'Full history, architecture and significance',
      icon:  '\uD83D\uDCD6',
      color: '#3366cc',
    },
    {
      label: 'Google — ' + deity + ' Mythology',
      url:   'https://www.google.com/search?q=' + deityQ + '+mythology+legends+story',
      desc:  'Deep dive into deity stories and symbolism',
      icon:  '\uD83D\uDD0D',
      color: '#4285F4',
    },
    {
      label: 'Google — ' + name + ' Unknown Facts',
      url:   'https://www.google.com/search?q=' + templeQ + '+temple+unknown+facts+secrets+history',
      desc:  'Hidden stories and fascinating lesser-known facts',
      icon:  '\uD83E\uDD2F',
      color: '#EA4335',
    },
    {
      label: 'Spotify — ' + deity + ' Podcast',
      url:   'https://open.spotify.com/search/' + deityQ + '%20temple%20mythology/podcasts',
      desc:  'Podcasts on mythology, spirituality and temple stories',
      icon:  '\uD83C\uDFA7',
      color: '#1DB954',
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="font-serif text-2xl font-medium mb-1">Deep Dive</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--muted2)' }}>
        Videos, stories, unknown facts and podcasts about {name} and {deity}
      </p>

      {/* YouTube embeds */}
      <div className="mb-6">
        <h3 className="font-serif text-lg font-medium mb-3" style={{ color: 'var(--ink)' }}>
          \uD83C\uDFA5 Watch
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {videos.map((v, i) => (
            <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1.5px solid var(--border)', background: '#fff' }}>
              {/* YouTube search embed - plays directly on site */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                <iframe
                  src={\`https://www.youtube.com/embed?listType=search&list=\${encodeURIComponent(v.query)}&rel=0&modestbranding=1\`}
                  title={v.label}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>
                  {v.icon} {v.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted2)' }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles & Podcasts */}
      <div>
        <h3 className="font-serif text-lg font-medium mb-3" style={{ color: 'var(--ink)' }}>
          \uD83D\uDCDA Read & Listen
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
          {articles.map((a, i) => (
            <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--border)', textDecoration: 'none', background: '#fff', transition: 'border-color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = a.color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{a.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{a.label}</div>
                <div style={{ fontSize: 11, color: 'var(--muted2)', lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

`

// Insert the DeepDiveSection function right before "export default async function TemplePage"
content = content.replace(
  'export default async function TemplePage',
  deepDiveFunction + 'export default async function TemplePage'
)

fs.writeFileSync(filePath, content, 'utf8')
console.log('OK: Deep Dive section added to temple page')

// Push
process.chdir(P)
execSync('git add "app/(public)/temple/[slug]/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "feat: Deep Dive tab on temple pages - YouTube embed + articles + podcasts"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
console.log('Test at: https://divyadarshan-psi.vercel.app/temple/kedarnath-temple')
