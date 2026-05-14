const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// Copy sankalp banner to public
fs.copyFileSync(
  path.join(__dirname, 'sankalp-banner.png'),
  path.join(P, 'public/sankalp-banner.png')
)
console.log('OK: sankalp-banner.png copied')

// Replace the sankalp section in page.tsx
let page = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')

const oldSankalp = `      <div className="sankalp">
        <div className="sankalp-inner">
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(255,215,0,0.6)',marginBottom:12}}>Sacred Intention</div>
          <h2>Write Your Sankalp.<br />Trust the Divine.</h2>
          <p>In Indian tradition, a Sankalp is a sacred vow made to a deity. Write your deepest wish, dedicate it to the right god, and commit to a gratitude yatra when it manifests.</p>
          <a href="/manifest" className="sankalp-cta">&#x1F64F; Write Your Sankalp Now</a>
        </div>
      </div>`

const newSankalp = `      <div style={{width:'100%',position:'relative',lineHeight:0}}>
        <img src="/sankalp-banner.png" alt="I Chose My Sankalp, I Manifested My Destiny" style={{width:'100%',height:'auto',display:'block'}} />
        <div style={{position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',zIndex:2}}>
          <a href="/manifest" style={{display:'inline-flex',alignItems:'center',gap:8,background:'#8B1A1A',color:'white',padding:'14px 32px',borderRadius:100,fontSize:15,fontWeight:800,textDecoration:'none',boxShadow:'0 4px 20px rgba(139,26,26,0.4)',whiteSpace:'nowrap'}}>
            &#x1F64F; Write Your Sankalp Now &rarr;
          </a>
        </div>
      </div>`

page = page.replace(oldSankalp, newSankalp)
fs.writeFileSync(path.join(P, 'app/page.tsx'), page, 'utf8')
console.log('OK: sankalp section updated')

process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "feat: sankalp section replaced with new banner image"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
