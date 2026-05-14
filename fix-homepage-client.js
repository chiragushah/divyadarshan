const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

let page = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')

// 1. Add 'use client' at top
if (!page.startsWith("'use client'")) {
  page = "'use client'\n" + page
}

// 2. Remove onMouseEnter/onMouseLeave handlers (not allowed in server components)
page = page.replace(/\s*onMouseEnter=\{[^}]+\}/g, '')
page = page.replace(/\s*onMouseLeave=\{[^}]+\}/g, '')

// 3. Remove metadata export (not allowed in client components)
page = page.replace(/import type \{ Metadata \} from 'next'\n/, '')
page = page.replace(/export const metadata[^;]+;?\n\n/s, '')

// 4. Add CSS hover via stylesheet instead
page = page.replace(
  '.temple-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.1);border-color:#C0570A33}',
  '.temple-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.1);border-color:rgba(192,87,10,0.2)}'
)

fs.writeFileSync(path.join(P, 'app/page.tsx'), page, 'utf8')

// 5. Create a separate metadata file
const metadataFile = `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "DivyaDarshanam \u2014 India's Complete Temple & Pilgrimage Companion",
  description: 'Discover 422 sacred temples across India. AI yatra planning, Sankalp manifestation, Navagraha shanti, live darshan, community verified data.',
}
`
fs.writeFileSync(path.join(P, 'app/metadata.ts'), metadataFile, 'utf8')
console.log('OK: Fixed client component issues')

process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: homepage as client component, remove onMouseEnter handlers"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
