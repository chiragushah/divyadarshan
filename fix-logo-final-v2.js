const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

console.log('============================================')
console.log(' DivyaDarshanam - Final Logo Fix')
console.log('============================================')

// ── 1. Logo.tsx - simple, clean, works everywhere ────────────
console.log('\n[1/5] Writing Logo.tsx...')
fs.writeFileSync(path.join(P, 'components/Logo.tsx'), `interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const h: Record<string, number> = { sm: 36, md: 48, lg: 68 }
  const tagS: Record<string, string> = { sm: '6.5px', md: '8px', lg: '10px' }
  const height = h[size] || 48

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, gap: 2 }}>
      <img
        src="/dd-logo.png"
        alt="DivyaDarshanam"
        style={{ height: height, width: 'auto', display: 'block', objectFit: 'contain' }}
      />
      {variant !== 'mark' && (
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: tagS[size],
          fontWeight: 700,
          color: '#B8860B',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>Be A Temple Explorer</span>
      )}
    </div>
  )
}
`, 'utf8')
console.log('  OK')

// ── 2. Fix app/page.tsx TilakLogo ────────────────────────────
console.log('\n[2/5] Fixing app/page.tsx...')
let homePage = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')
// Replace TilakLogo function entirely with import of Logo component
if (!homePage.includes("import Logo from")) {
  homePage = homePage.replace(
    "import Link from 'next/link'",
    "import Link from 'next/link'\nimport Logo from '@/components/Logo'"
  )
}
// Replace TilakLogo usage with Logo component
homePage = homePage.replace(/<TilakLogo\s*\/>/g, '<Logo size="md" />')
// Fix any direct img references to old logos
homePage = homePage
  .replace(/src="\/divyadarshan-logo\.png"/g, 'src="/dd-logo.png"')
  .replace(/src="\/divyadarshanam-logo\.png"/g, 'src="/dd-logo.png"')
  .replace(/src="\/divyadarshanam-logo\.svg"/g, 'src="/dd-logo.png"')
  .replace(/src="\/dynaimers-logo\.png"/g, 'src="/dynaimers-logo.jpg"')
fs.writeFileSync(path.join(P, 'app/page.tsx'), homePage, 'utf8')
console.log('  OK')

// ── 3. Fix auth/signup page ───────────────────────────────────
console.log('\n[3/5] Fixing auth/signup/page.tsx...')
const signupPath = path.join(P, 'app/auth/signup/page.tsx')
if (fs.existsSync(signupPath)) {
  let signup = fs.readFileSync(signupPath, 'utf8')
  signup = signup
    .replace(/src="\/divyadarshan-logo\.png"/g, 'src="/dd-logo.png"')
    .replace(/src="\/divyadarshanam-logo\.png"/g, 'src="/dd-logo.png"')
    .replace(/src="\/divyadarshanam-logo\.svg"/g, 'src="/dd-logo.png"')
  fs.writeFileSync(signupPath, signup, 'utf8')
  console.log('  OK')
}

// ── 4. Fix admin/dashboard page ───────────────────────────────
console.log('\n[4/5] Fixing admin/dashboard/page.tsx...')
const adminPath = path.join(P, 'app/admin/dashboard/page.tsx')
if (fs.existsSync(adminPath)) {
  let admin = fs.readFileSync(adminPath, 'utf8')
  admin = admin
    .replace(/src="\/divyadarshan-logo\.png"/g, 'src="/dd-logo.png"')
    .replace(/src="\/divyadarshanam-logo\.png"/g, 'src="/dd-logo.png"')
    .replace(/src="\/divyadarshanam-logo\.svg"/g, 'src="/dd-logo.png"')
  fs.writeFileSync(adminPath, admin, 'utf8')
  console.log('  OK')
}

// ── 5. Push everything ────────────────────────────────────────
console.log('\n[5/5] Pushing to GitHub...')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
try {
  execSync('git commit -m "fix: new gold DivyaDarshanam logo everywhere - dd-logo.png"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
  console.log('\n============================================')
  console.log(' DONE - Vercel deploying in ~2 mins')
  console.log('============================================')
} catch(e) {
  console.log('Nothing to commit - already up to date')
}
