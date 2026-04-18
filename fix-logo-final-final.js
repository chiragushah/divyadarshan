const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// ── Logo.tsx - bigger, orange text, no tagline ────────────────
console.log('[1/3] Updating Logo.tsx...')
fs.writeFileSync(path.join(P, 'components/Logo.tsx'), `interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const h: Record<string, number> = { sm: 80, md: 110, lg: 150 }
  const height = h[size] || 110

  return (
    <div className={className} style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
      <img
        src="/dd-logo.png"
        alt="DivyaDarshanam"
        style={{ height: height, width:'auto', display:'block', objectFit:'contain' }}
      />
    </div>
  )
}
`, 'utf8')
console.log('  OK')

// ── Landing page TilakLogo - bigger, no tagline ───────────────
console.log('[2/3] Updating app/page.tsx TilakLogo...')
let home = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')
home = home.replace(
  /function TilakLogo\(\) \{[\s\S]*?\n\}/,
  `function TilakLogo() {
  return (
    <a href="/" style={{ display:'flex', flexDirection:'column', alignItems:'center', textDecoration:'none' }}>
      <img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height:110, width:'auto', objectFit:'contain' }} />
    </a>
  )
}`
)
fs.writeFileSync(path.join(P, 'app/page.tsx'), home, 'utf8')
console.log('  OK')

// ── SignInForm - bigger logo, no tagline ──────────────────────
console.log('[3/3] Updating SignInForm.tsx...')
let signin = fs.readFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), 'utf8')
// Fix logo size
signin = signin.replace(/height:90/g, 'height:110').replace(/height: 90/g, 'height: 110')
// Remove tagline div if present
signin = signin.replace(/<div style=\{[^}]*Be A Temple Explorer[^}]*\}[^<]*<\/div>/g, '')
fs.writeFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), signin, 'utf8')
console.log('  OK')

// ── Push ──────────────────────────────────────────────────────
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: logo bigger, no tagline, orange color text"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
