const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

let page = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')

// Find footer start and end
const start = page.lastIndexOf('<footer')
const end = page.lastIndexOf('</footer>') + '</footer>'.length

const newFooter = `<footer className="footer">
        <img src="/dd-logo.png" alt="DivyaDarshanam" style={{height:64,width:'auto',margin:'0 auto 12px',display:'block'}} />
        <p style={{fontWeight:700,color:'#8B1A1A',fontSize:16,marginBottom:4}}>DivyaDarshanam</p>
        <p>\u00A9 2026 DivyaDarshanam \u00B7 Built with \uD83D\uDE4F for pilgrims across India</p>

        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/team">Our Team</a>
          <a href="/stories">Pilgrim Stories</a>
          <a href="/contact">Contact Us</a>
          <a href="/volunteer">Be a Volunteer</a>
        </div>

        <hr />
        <p style={{fontSize:12,marginBottom:10,letterSpacing:'.06em',textTransform:'uppercase',fontWeight:600,color:'#A89B8C'}}>Conceptualized & Developed by</p>
        <a href="https://dynaimers.com" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',marginBottom:16}}>
          <img src="/dynaimers-logo.jpg" alt="Dynaimers Consulting" style={{height:32,width:'auto',display:'block'}} />
        </a>
        <div className="footer-nav">
          <a href="/explore">Explore</a>
          <a href="/manifest">Manifest</a>
          <a href="/plan">Plan Yatra</a>
          <a href="/auth/signin">Sign In</a>
        </div>
      </footer>`

page = page.slice(0, start) + newFooter + page.slice(end)
fs.writeFileSync(path.join(P, 'app/page.tsx'), page, 'utf8')
console.log('Footer updated')

process.chdir(P)
execSync('git add "app/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: footer HTML with all 5 links"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done!')
