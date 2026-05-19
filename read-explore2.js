const fs = require('fs'), path = require('path')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const src = fs.readFileSync(path.join(P, 'app/(app)/explore/ExploreClient.tsx'), 'utf8')
const lines = src.split('\n')
console.log('=== Lines 140-333 ===')
lines.slice(139).forEach((l,i)=>console.log(140+i+'|'+l))
