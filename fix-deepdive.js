const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshanam'

// ── 1. Create separate client component file ──────────────────
console.log('[1/3] Creating DeepDiveSection client component...')

const componentFile = `'use client'

interface Props {
  name: string
  deity: string
  city: string
  state: string
}

export default function DeepDiveSection({ name, deity, city, state }: Props) {
  const enc = (s: string) => encodeURIComponent(s)

  const videos = [
    { label: name + ' \u2014 Temple Tour & Darshan',      query: name + ' temple tour darshan',                      desc: 'Virtual darshan and full temple walkthrough',         icon: '\uD83D\uDD4D' },
    { label: name + ' \u2014 History & Significance',     query: name + ' temple history significance documentary',   desc: 'Historical background and spiritual importance',       icon: '\uD83C\uDFDB\uFE0F' },
    { label: deity + ' \u2014 Stories & Legends',         query: deity + ' god stories legends mythology hindi',      desc: 'Ancient stories and lesser-known legends',             icon: '\uD83D\uDCDA' },
    { label: deity + ' \u2014 Unknown Facts',             query: deity + ' unknown facts secrets temple',             desc: 'Surprising facts most pilgrims never know',           icon: '\u2728' },
    { label: name + ' \u2014 Aarti & Rituals',            query: name + ' aarti rituals pooja ceremony',             desc: 'Sacred rituals and daily aarti ceremony',             icon: '\uD83D\uDD6F\uFE0F' },
    { label: deity + ' \u2014 Devotional Bhajans',        query: deity + ' bhajan kirtan devotional songs',          desc: 'Soulful bhajans and devotional music',                icon: '\uD83C\uDFB5' },
  ]

  const articles = [
    { label: 'Wikipedia \u2014 ' + name,               url: 'https://en.wikipedia.org/wiki/' + enc(name.replace(/ /g,'_')),                                       desc: 'Full history, architecture and significance',      icon: '\uD83D\uDCD6', color: '#3366cc' },
    { label: 'Google \u2014 ' + deity + ' Mythology',  url: 'https://www.google.com/search?q=' + enc(deity) + '+mythology+legends+story',                        desc: 'Deep dive into deity stories and symbolism',       icon: '\uD83D\uDD0D', color: '#4285F4' },
    { label: name + ' \u2014 Unknown Facts',           url: 'https://www.google.com/search?q=' + enc(name) + '+temple+unknown+facts+secrets+history',            desc: 'Hidden stories and fascinating lesser-known facts', icon: '\uD83E\uDD2F', color: '#EA4335' },
    { label: 'Spotify \u2014 ' + deity + ' Podcast',  url: 'https://open.spotify.com/search/' + enc(deity + ' temple mythology') + '/podcasts',                 desc: 'Podcasts on mythology, spirituality & stories',    icon: '\uD83C\uDFA7', color: '#1DB954' },
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
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                <iframe
                  src={\`https://www.youtube.com/embed?listType=search&list=\${enc(v.query)}&rel=0&modestbranding=1\`}
                  title={v.label}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{v.icon} {v.label}</div>
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
        <style>{\`
          .deepdive-link { transition: border-color 0.15s, box-shadow 0.15s; }
          .deepdive-link:hover { border-color: var(--crimson) !important; box-shadow: 0 2px 8px rgba(139,26,26,0.08); }
        \`}</style>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
          {articles.map((a, i) => (
            <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="deepdive-link"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--border)', textDecoration: 'none', background: '#fff' }}>
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

fs.mkdirSync(path.join(P, 'components/temple'), { recursive: true })
fs.writeFileSync(path.join(P, 'components/temple/DeepDiveSection.tsx'), componentFile, 'utf8')
console.log('  OK: components/temple/DeepDiveSection.tsx created')

// ── 2. Fix temple page - import client component, remove inline function ──
console.log('[2/3] Updating temple page...')

let page = fs.readFileSync(path.join(P, 'app/(public)/temple/[slug]/page.tsx'), 'utf8')

// Add import after existing imports
page = page.replace(
  `import LiveDarshanStatus from '@/components/temple/LiveDarshanStatus'`,
  `import LiveDarshanStatus from '@/components/temple/LiveDarshanStatus'
import DeepDiveSection from '@/components/temple/DeepDiveSection'`
)

// Remove the inline DeepDiveSection function that was added before (has server component issue)
page = page.replace(
  /\n\/\/ ── Deep Dive Section ──[\s\S]*?export default async function TemplePage/,
  'export default async function TemplePage'
)

fs.writeFileSync(path.join(P, 'app/(public)/temple/[slug]/page.tsx'), page, 'utf8')
console.log('  OK: temple page updated')

// ── 3. Push ───────────────────────────────────────────────────
console.log('[3/3] Pushing to GitHub...')
process.chdir(P)
execSync('git add "components/temple/DeepDiveSection.tsx" "app/(public)/temple/[slug]/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: DeepDiveSection as proper client component"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
console.log('Test: https://divyadarshan-psi.vercel.app/temple/kedarnath-temple')
