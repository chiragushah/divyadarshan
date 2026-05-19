const fs = require('fs'), path = require('path')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const src = fs.readFileSync(path.join(P, 'app/(app)/explore/ExploreClient.tsx'), 'utf8')
// Write it here so I can read it
fs.writeFileSync(path.join(P, 'ExploreClient-BACKUP.tsx'), src, 'utf8')
console.log('Total lines:', src.split('\n').length)
console.log('\n=== Lines 1-30 ===')
src.split('\n').slice(0,30).forEach((l,i)=>console.log(i+1+'|'+l))
console.log('\n=== Lines 60-140 (fetchNearby area) ===')
src.split('\n').slice(59,140).forEach((l,i)=>console.log(60+i+'|'+l))
console.log('\n=== Filter bar (search for Sacred/Terrain) ===')
src.split('\n').forEach((l,i)=>{
  if(l.includes('Sacred Circuits')||l.includes('By Terrain')||l.includes('Heritage')||l.includes('By Story')||l.includes('activeTab !=='))
    console.log(i+1+'|'+l)
})
