// Fix: restore OR logic for Indian temple detection
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const P = 'C:\\Users\\chira\\Downloads\\divyadarshanam'
const filePath = path.join(P, 'app/(app)/explore/ExploreClient.tsx')

let content = fs.readFileSync(filePath, 'utf8')

// Replace the AND filter (too strict) with correct OR logic
const oldFilter = `const isIndian = ['hindu','jain','sikh','buddhist',''].includes(religion)
            && INDIAN_KEYWORDS.some(kw => nameLow.includes(kw))
          if (!isIndian) return null`

const newFilter = `// Include if: known Indian religion OR name matches Indian keyword
          // Exclude: churches, mosques, synagogues etc
          const EXCLUDE = ['christian','muslim','jewish','islam']
          if (EXCLUDE.includes(religion)) return null
          const isIndian = ['hindu','jain','sikh','buddhist'].includes(religion)
            || INDIAN_KEYWORDS.some(kw => nameLow.includes(kw))
          if (!isIndian) return null`

content = content.replace(oldFilter, newFilter)
fs.writeFileSync(filePath, content, 'utf8')
console.log('Filter fixed')

process.chdir(P)
execSync('git add "app/(app)/explore/ExploreClient.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: restore OR filter logic for nearby temples"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
