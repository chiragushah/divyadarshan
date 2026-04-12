// Fix nearby filter - show all places of worship, default 10km
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const P = 'C:\\Users\\chira\\Downloads\\divyadarshanam'
const filePath = path.join(P, 'app/(app)/explore/ExploreClient.tsx')

let content = fs.readFileSync(filePath, 'utf8')

// 1. Change default radius from 10 to 10 (keep) but reorder buttons so 10km is first
content = content.replace(
  `const [radiusKm,      setRadiusKm]      = useState(10)`,
  `const [radiusKm,      setRadiusKm]      = useState(10)`
)

// 2. Change radius buttons order - put 10 first so it looks selected by default
content = content.replace(
  `{[5,10,25,50].map(r => (`,
  `{[10,25,50,100].map(r => (`
)

// 3. Remove the entire isIndian filter block - replace with simple exclude-only logic
// Overpass already filters to places of worship near India, just exclude non-Indian religions
const strictFilter = /\/\/ Include if: known Indian religion OR name matches Indian keyword[\s\S]*?if \(!isIndian\) return null/
const looseFilter = `// Only exclude clearly non-Indian religions (churches, mosques, synagogues)
          const SKIP_RELIGIONS = ['christian', 'muslim', 'jewish', 'islam', 'bahai', 'zoroastrian']
          if (SKIP_RELIGIONS.includes(religion)) return null
          // Must have a name
          if (!name) return null`

content = content.replace(strictFilter, looseFilter)

// Also fix the old &&  version if fix-filter didn't work
const andFilter = /const EXCLUDE = \['christian','muslim','jewish','islam'\][\s\S]*?if \(!isIndian\) return null/
content = content.replace(andFilter, looseFilter)

// Fallback: fix original strict && version
const originalStrict = /const isIndian = \['hindu','jain','sikh','buddhist',''\]\.includes\(religion\)\s*&&[\s\S]*?if \(!isIndian\) return null/
content = content.replace(originalStrict, looseFilter)

fs.writeFileSync(filePath, content, 'utf8')
console.log('OK: Filter loosened, radius buttons updated to [10,25,50,100]')

process.chdir(P)
execSync('git add "app/(app)/explore/ExploreClient.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: loosen nearby filter, radius buttons 10/25/50/100km"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
