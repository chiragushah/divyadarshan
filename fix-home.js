const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// ── 1. Fix landing page - white bg + logo size ────────────────
console.log('[1/3] Fixing app/page.tsx...')
let home = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')
home = home
  // White background everywhere
  .replace(/#FDFAF6/g, '#FFFFFF')
  .replace(/#FAF7F2/g, '#FFFFFF')
  .replace(/#FBF7F2/g, '#FFFFFF')
  .replace(/background:#F[A-F0-9]{5}/g, 'background:#FFFFFF')
  // Fix navbar height to fit logo properly  
  .replace(/height:80px/g, 'height:100px')
  .replace(/height: 80px/g, 'height: 100px')
  // Fix TilakLogo size - reduce so it fits navbar
  .replace(/height:110/g, 'height:90')
  .replace(/height: 110/g, 'height: 90')
  .replace(/height:140/g, 'height:90')
  .replace(/height: 140/g, 'height: 90')
fs.writeFileSync(path.join(P, 'app/page.tsx'), home, 'utf8')
console.log('  OK')

// ── 2. Fix globals.css - white bg ─────────────────────────────
console.log('[2/3] Fixing globals.css...')
let css = fs.readFileSync(path.join(P, 'app/globals.css'), 'utf8')
css = css
  .replace(/#FDFAF6/g, '#FFFFFF')
  .replace(/#FAF7F2/g, '#FFFFFF')
  .replace(/bg-ivory-100/g, 'bg-white')
  .replace(/ivory-100/g, 'white')
fs.writeFileSync(path.join(P, 'app/globals.css'), css, 'utf8')
console.log('  OK')

// ── 3. Fix Logo.tsx - right size for navbar ───────────────────
console.log('[3/3] Fixing Logo.tsx sizes...')
fs.writeFileSync(path.join(P, 'components/Logo.tsx'), `interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const h: Record<string, number> = { sm: 60, md: 80, lg: 120 }
  const height = h[size] || 80

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

// ── Push ──────────────────────────────────────────────────────
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: pure white bg + logo properly sized in navbar"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
