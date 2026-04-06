// fix-explore.js
const fs = require('fs')

let c = fs.readFileSync('app/(app)/explore/ExploreClient.tsx', 'utf8')

// Remove the dynamic import line and const we added
c = c.replace("import dynamic from 'next/dynamic'\n", '')
c = c.replace("const RecommendTempleButton = dynamic(() => import('@/components/RecommendTempleButton'), { ssr: false })\n", '')

// Add a simple import instead (client component, no ssr issue)
c = c.replace(
  "'use client'",
  "'use client'\nimport RecommendTempleButton from '@/components/RecommendTempleButton'"
)

fs.writeFileSync('app/(app)/explore/ExploreClient.tsx', c, 'utf8')
console.log('✅ Fixed!')
console.log('Has RecommendTempleButton import:', c.includes("import RecommendTempleButton"))
console.log('Has duplicate dynamic:', (c.match(/import dynamic/g)||[]).length)
