// Run this to see the current fetchNearby function in ExploreClient.tsx
const fs = require('fs')
const path = require('path')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

const file = fs.readFileSync(
  path.join(P, 'app/(app)/explore/ExploreClient.tsx'), 'utf8'
)

// Extract the nearby / fetchNearby / overpass section
const lines = file.split('\n')
lines.forEach((line, i) => {
  if (line.includes('Overpass') || line.includes('overpass') ||
      line.includes('fetchNearby') || line.includes('nearby') ||
      line.includes('geolocation') || line.includes('radius') ||
      line.includes('around:')) {
    console.log(`Line ${i+1}: ${line}`)
  }
})
