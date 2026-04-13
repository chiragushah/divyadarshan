const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

console.log('============================================')
console.log(' DivyaDarshanam - Logo Fix Everywhere')
console.log('============================================')

// Helper
const write = (rel, content) => {
  fs.writeFileSync(path.join(P, rel), content, 'utf8')
  console.log('  OK:', rel)
}

const fix = (rel) => {
  const full = path.join(P, rel)
  if (!fs.existsSync(full)) { console.log('  SKIP (not found):', rel); return }
  let c = fs.readFileSync(full, 'utf8')
  const orig = c
  c = c
    .replace(/src="\/divyadarshan-logo\.png"/g,  'src="/dd-logo.png"')
    .replace(/src="\/divyadarshanam-logo\.png"/g, 'src="/dd-logo.png"')
    .replace(/src="\/divyadarshanam-logo\.svg"/g, 'src="/dd-logo.png"')
  if (c !== orig) { fs.writeFileSync(full, c, 'utf8'); console.log('  fixed:', rel) }
  else console.log('  ok:', rel)
}

// ── 1. Logo.tsx - BIGGER, prominent ──────────────────────────
console.log('\n[1/7] Logo.tsx...')
write('components/Logo.tsx', `interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const h: Record<string, number> = { sm: 52, md: 68, lg: 96 }
  const tagS: Record<string, string> = { sm: '7px', md: '9px', lg: '12px' }
  const height = h[size] || 68

  return (
    <div className={className} style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0, gap:3 }}>
      <img
        src="/dd-logo.png"
        alt="DivyaDarshanam"
        width={height * 2}
        height={height * 2}
        style={{ height:height, width:'auto', display:'block', objectFit:'contain' }}
      />
      {variant !== 'mark' && (
        <span style={{
          fontFamily:"'Inter',sans-serif",
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
`)

// ── 2. Navbar - bigger logo, taller navbar ────────────────────
console.log('\n[2/7] Navbar.tsx...')
let navbar = fs.readFileSync(path.join(P, 'components/nav/Navbar.tsx'), 'utf8')
navbar = navbar
  .replace(/height: 64/g, 'height: 80')
  .replace(/height: 72/g, 'height: 80')
  .replace(/size="sm"/g, 'size="sm"')  // keep mobile small
  .replace(/size="md"/g, 'size="md"')  // desktop medium (now 68px)
fs.writeFileSync(path.join(P, 'components/nav/Navbar.tsx'), navbar, 'utf8')
console.log('  OK')

// ── 3. app/page.tsx - landing page ───────────────────────────
console.log('\n[3/7] app/page.tsx...')
let home = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')
// Add Logo import if missing
if (!home.includes("import Logo from '@/components/Logo'")) {
  home = home.replace("import Link from 'next/link'", "import Link from 'next/link'\nimport Logo from '@/components/Logo'")
}
// Replace TilakLogo with Logo
home = home.replace(/<TilakLogo\s*\/>/g, '<Logo size="lg" />')
// Fix any direct img src references
home = home
  .replace(/src="\/divyadarshan-logo\.png"/g, 'src="/dd-logo.png"')
  .replace(/src="\/divyadarshanam-logo\.png"/g, 'src="/dd-logo.png"')
  .replace(/src="\/divyadarshanam-logo\.svg"/g, 'src="/dd-logo.png"')
  .replace(/src="\/dynaimers-logo\.png"/g, 'src="/dynaimers-logo.jpg"')
fs.writeFileSync(path.join(P, 'app/page.tsx'), home, 'utf8')
console.log('  OK')

// ── 4. Fix auth pages ─────────────────────────────────────────
console.log('\n[4/7] Auth pages...')
fix('app/auth/signup/page.tsx')
fix('app/auth/signin/page.tsx')

// Also fix signin to show bigger logo
const signinPath = path.join(P, 'app/auth/signin/page.tsx')
if (fs.existsSync(signinPath)) {
  let signin = fs.readFileSync(signinPath, 'utf8')
  // Replace small logo img with bigger one
  signin = signin
    .replace(/style=\{\{ height:\s*\d+/g, (m) => m.replace(/height:\s*\d+/, 'height: 80'))
    .replace(/src="\/divyadarshan-logo\.png"/g, 'src="/dd-logo.png"')
    .replace(/src="\/divyadarshanam-logo\.png"/g, 'src="/dd-logo.png"')
    .replace(/src="\/divyadarshanam-logo\.svg"/g, 'src="/dd-logo.png"')
  // Add Logo import if not present
  if (!signin.includes("import Logo from '@/components/Logo'") && signin.includes('<img')) {
    signin = signin.replace(
      /(<img[^>]*dd-logo\.png[^>]*>)/,
      '<img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height:80, width:"auto", objectFit:"contain", display:"block", margin:"0 auto" }} />'
    )
  }
  fs.writeFileSync(signinPath, signin, 'utf8')
  console.log('  fixed signin size')
}

// ── 5. Fix admin pages ────────────────────────────────────────
console.log('\n[5/7] Admin pages...')
fix('app/admin/dashboard/page.tsx')
fix('app/admin/page.tsx')

// ── 6. Fix Footer ─────────────────────────────────────────────
console.log('\n[6/7] Footer.tsx...')
fix('components/Footer.tsx')

// ── 7. Push ───────────────────────────────────────────────────
console.log('\n[7/7] Pushing to GitHub...')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
try {
  execSync('git commit -m "fix: logo bigger + visible everywhere - dd-logo.png"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
  console.log('\n============================================')
  console.log(' DONE! Vercel deploying in ~2 mins')
  console.log('============================================')
} catch(e) {
  // Force a change to ensure commit goes through
  fs.appendFileSync(path.join(P, 'components/Logo.tsx'), '\n// v2\n', 'utf8')
  execSync('git add -A', { stdio: 'inherit' })
  execSync('git commit -m "fix: logo bigger + visible everywhere v2"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
  console.log('\nDone!')
}
