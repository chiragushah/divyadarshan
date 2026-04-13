const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

console.log('Fixing SignInForm.tsx...')
let c = fs.readFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), 'utf8')

// Remove the broken injected logo string
c = c.replace(/\}\}><img src="\/dd-logo\.png"[\s\S]*?>Be A Temple Explorer<\/span>/g, '}}>')

// Now find "Begin your yatra" text in JSX and add logo before it cleanly
// Find the right panel div and inject logo before the h1
c = c.replace(
  /(<div[^>]*right[^>]*>[\s\S]*?)(<h1)/,
  `$1<div style={{textAlign:'center',marginBottom:24}}>
              <img src="/dd-logo.png" alt="DivyaDarshanam" style={{height:80,width:'auto',objectFit:'contain',margin:'0 auto',display:'block'}} />
              <span style={{fontFamily:"'Inter',sans-serif",fontSize:'8px',fontWeight:700,color:'#B8860B',letterSpacing:'0.18em',textTransform:'uppercase',display:'block',marginTop:4}}>Be A Temple Explorer</span>
            </div>
            $2`
)

fs.writeFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), c, 'utf8')
console.log('OK')

process.chdir(P)
execSync('git add "app/auth/signin/SignInForm.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: restore SignInForm - clean logo injection"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
