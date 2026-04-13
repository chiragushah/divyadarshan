const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const write = (rel, content) => { fs.writeFileSync(path.join(P, rel), content, 'utf8'); console.log('  OK:', rel) }

// ── 1. Fix TilakLogo in app/page.tsx - make bigger ───────────
console.log('\n[1/3] Fixing landing page logo size...')
let home = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')
// Make TilakLogo bigger and add tagline
home = home.replace(
  `function TilakLogo() {
  return (
    <a href="/" className="nav-brand" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
      <img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height:88, width:'auto', objectFit:'contain' }} />
    </a>
  )
}`,
  `function TilakLogo() {
  return (
    <a href="/" className="nav-brand" style={{ display:'flex', flexDirection:'column', alignItems:'center', textDecoration:'none', gap:4 }}>
      <img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height:72, width:'auto', objectFit:'contain' }} />
      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'8px', fontWeight:700, color:'#B8860B', letterSpacing:'0.18em', textTransform:'uppercase', whiteSpace:'nowrap' }}>Be A Temple Explorer</span>
    </a>
  )
}`
)
fs.writeFileSync(path.join(P, 'app/page.tsx'), home, 'utf8')
console.log('  OK')

// ── 2. Fix SignInForm.tsx - add logo at top ───────────────────
console.log('\n[2/3] Adding logo to SignInForm.tsx...')
let signin = fs.readFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), 'utf8')

// Find the right panel (right side) and add logo if not present
if (!signin.includes('dd-logo.png')) {
  // Add logo at the top of the right panel - find the "Begin your yatra" heading
  signin = signin.replace(
    /<h1[^>]*>Begin your yatra<\/h1>/,
    `<div style={{ textAlign:'center', marginBottom:24 }}>
          <img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height:80, width:'auto', objectFit:'contain', margin:'0 auto', display:'block' }} />
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'8px', fontWeight:700, color:'#B8860B', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginTop:4 }}>Be A Temple Explorer</span>
        </div>
        <h1 style={{ fontSize:28, fontWeight:700, color:'#1A0A00', marginBottom:8 }}>Begin your yatra</h1>`
  )

  // If that didn't work, try finding another pattern
  if (!signin.includes('dd-logo.png')) {
    signin = signin.replace(
      'Begin your yatra',
      `___LOGO___Begin your yatra`
    )
    signin = signin.replace(
      '___LOGO___',
      `<div style={{ textAlign:'center', marginBottom:20 }}><img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height:80, width:'auto', objectFit:'contain', margin:'0 auto', display:'block' }} /><span style={{ fontSize:'8px', fontWeight:700, color:'#B8860B', letterSpacing:'0.18em', textTransform:'uppercase', display:'block', marginTop:4 }}>Be A Temple Explorer</span></div>`
    )
  }
}
fs.writeFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), signin, 'utf8')
console.log('  OK')

// ── 3. Fix signup page logo size ─────────────────────────────
console.log('\n[3/3] Fixing signup page logo...')
const signupPath = path.join(P, 'app/auth/signup/page.tsx')
if (fs.existsSync(signupPath)) {
  let signup = fs.readFileSync(signupPath, 'utf8')
  if (!signup.includes('dd-logo.png')) {
    signup = signup
      .replace(/src="\/divyadarshan-logo\.png"/g, 'src="/dd-logo.png"')
      .replace(/src="\/divyadarshanam-logo\.png"/g, 'src="/dd-logo.png"')
      .replace(/src="\/divyadarshanam-logo\.svg"/g, 'src="/dd-logo.png"')
  }
  // Make logo bigger on signup
  signup = signup.replace(/height:\s*72/g, 'height: 90')
  signup = signup.replace(/height:\s*60/g, 'height: 90')
  fs.writeFileSync(signupPath, signup, 'utf8')
  console.log('  OK')
}

// ── Push ──────────────────────────────────────────────────────
console.log('\nPushing...')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
try {
  execSync('git commit -m "fix: logo size + signin logo + tagline everywhere"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
} catch(e) {
  fs.appendFileSync(path.join(P, 'components/Logo.tsx'), '// updated\n', 'utf8')
  execSync('git add -A', { stdio: 'inherit' })
  execSync('git commit -m "fix: force logo update"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
}
console.log('\nDone! Vercel deploying in ~2 mins.')
