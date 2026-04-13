const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// Fix wrong logo filename in SignInForm
let c = fs.readFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), 'utf8')
c = c.replace(/\/divyadarshanam-logo\.png/g, '/dd-logo.png')
c = c.replace(/\/divyadarshan-logo\.png/g, '/dd-logo.png')
// Make logo bigger
c = c.replace(/height:72/g, 'height:90')
c = c.replace(/height: 72/g, 'height: 90')
fs.writeFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), c, 'utf8')
console.log('OK: SignInForm fixed')

// Add tagline below logo
c = c.replace(
  `<img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height:90, width:'auto', objectFit:'contain' }} />`,
  `<img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height:90, width:'auto', objectFit:'contain' }} />
              <div style={{fontSize:'8px',fontWeight:700,color:'#B8860B',letterSpacing:'0.18em',textTransform:'uppercase',textAlign:'center',marginTop:4}}>Be A Temple Explorer</div>`
)
fs.writeFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), c, 'utf8')
console.log('OK: tagline added')

process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: signin logo dd-logo.png + bigger + tagline"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done!')
