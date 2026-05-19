const fs = require('fs'), path = require('path'), { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const clientPath = path.join(P, 'app/(app)/explore/ExploreClient.tsx')

let src = fs.readFileSync(clientPath, 'utf8')
const lines = src.split('\n')

// Find the filter bar — it contains "Sacred Circuits", "Heritage", "By Terrain", "By Story"
// Look for the wrapping div and add a conditional hide when activeTab === 'nearby'
const filterLineIdx = lines.findIndex(l =>
  l.includes('Sacred Circuits') || l.includes('By Terrain') || l.includes('By Story')
)
console.log('Filter bar found at line:', filterLineIdx + 1)
console.log('Context:', lines.slice(Math.max(0, filterLineIdx-4), filterLineIdx+3).join('\n'))

// Find the opening div/nav that wraps the filter tabs — scan back from filterLineIdx
let wrapperLineIdx = filterLineIdx
for (let i = filterLineIdx; i >= Math.max(0, filterLineIdx - 10); i--) {
  const t = lines[i].trim()
  if (t.startsWith('<div') || t.startsWith('<nav') || t.startsWith('<ul')) {
    wrapperLineIdx = i
    break
  }
}
console.log('\nWrapper div at line:', wrapperLineIdx + 1, ':', lines[wrapperLineIdx])

// Wrap the filter section with a conditional
// Strategy: add {activeTab !== 'nearby' && ( before the wrapper, and )} after its closing tag
// Find the closing tag of the wrapper by matching indent level
const wrapperLine = lines[wrapperLineIdx]
const wrapperIndent = wrapperLine.match(/^(\s*)/)[1].length

// Find closing tag at same indent
let closingIdx = wrapperLineIdx + 1
for (let i = wrapperLineIdx + 1; i < lines.length; i++) {
  const t = lines[i].trim()
  const indent = lines[i].match(/^(\s*)/)[1].length
  if (indent === wrapperIndent && (t.startsWith('</div') || t.startsWith('</nav') || t.startsWith('</ul'))) {
    closingIdx = i
    break
  }
}
console.log('Closing tag at line:', closingIdx + 1, ':', lines[closingIdx])

// Build new lines
const indent = ' '.repeat(wrapperIndent)
const newLines = [
  ...lines.slice(0, wrapperLineIdx),
  `${indent}{activeTab !== 'nearby' && (`,
  ...lines.slice(wrapperLineIdx, closingIdx + 1),
  `${indent})}`,
  ...lines.slice(closingIdx + 1),
]

fs.writeFileSync(clientPath, newLines.join('\n'), 'utf8')
console.log('\n✅ Filter bar hidden when Nearby tab is active')

process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: hide category filters when Nearby tab active"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('✅ Deployed!')
