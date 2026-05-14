const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

let c = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')
// Fix unescaped apostrophes in JS strings
c = c.replace("India's most visited temple.", "India\\'s most visited temple.")
c = c.replace("daughter's marriage", "daughter\\'s marriage")
fs.writeFileSync(path.join(P, 'app/page.tsx'), c, 'utf8')
console.log('Fixed')

process.chdir(P)
execSync('git add "app/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: escape apostrophes in page.tsx strings"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done!')
