const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// ── 1. Logo.tsx - clean component using new SVG ───────────────
console.log('[1/4] Writing Logo.tsx...')
fs.writeFileSync(path.join(P, 'components/Logo.tsx'), `interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const heights: Record<string, number> = { sm: 32, md: 42, lg: 60 }
  const h = heights[size] || 42

  // mark = icon only, no text
  if (variant === 'mark') {
    return (
      <div className={className} style={{ lineHeight: 0 }}>
        <img
          src="/divyadarshanam-logo.svg"
          alt="Divya Darshanam"
          style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>
    )
  }

  // horizontal / full = full logo with text baked in
  return (
    <div className={\`flex items-center \${className}\`} style={{ lineHeight: 0, flexShrink: 0 }}>
      <img
        src="/divyadarshanam-logo.svg"
        alt="Divya Darshanam"
        style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
      />
    </div>
  )
}
`, 'utf8')
console.log('  OK')

// ── 2. Fix landing page TilakLogo + all other references ──────
console.log('[2/4] Fixing all logo references...')
const filesToFix = [
  'app/page.tsx',
  'app/auth/signup/page.tsx',
  'app/admin/dashboard/page.tsx',
  'app/auth/signin/page.tsx',
]

filesToFix.forEach(rel => {
  const full = path.join(P, rel)
  if (!fs.existsSync(full)) return
  let content = fs.readFileSync(full, 'utf8')
  const orig = content
  content = content
    .replace(/\/divyadarshan-logo\.png/g,   '/divyadarshanam-logo.svg')
    .replace(/\/divyadarshanam-logo\.png/g,  '/divyadarshanam-logo.svg')
    .replace(/\/divyadarshanam-logo\.svg/g,  '/divyadarshanam-logo.svg')
  if (content !== orig) {
    fs.writeFileSync(full, content, 'utf8')
    console.log('  fixed:', rel)
  }
})

// ── 3. Fix manifest.json icon if it references png ───────────
console.log('[3/4] Fixing manifest.json...')
const manifestPath = path.join(P, 'public/manifest.json')
if (fs.existsSync(manifestPath)) {
  let manifest = fs.readFileSync(manifestPath, 'utf8')
  // Keep PNG icons for manifest (SVG not supported as PWA icon)
  console.log('  SKIP: manifest keeps PNG icons (SVG not valid for PWA)')
}

// ── 4. Push ───────────────────────────────────────────────────
console.log('[4/4] Pushing to GitHub...')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
try {
  execSync('git commit -m "feat: new DivyaDarshanam SVG logo deployed everywhere"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
  console.log('\nDone! Vercel deploying in ~2 mins.')
} catch(e) {
  console.log('Nothing new to commit - SVG file needs to be copied first')
  console.log('Make sure you copied divyadarshanam-logo.svg to public/ folder')
}
