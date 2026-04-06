// fix-profile-imports.js
const fs = require('fs')

let p = fs.readFileSync('app/(app)/profile/page.tsx', 'utf8')

// Remove the duplicate import we added at top
p = p.replace("import { useEffect, useState } from 'react'\nimport BadgeCard from '@/components/BadgeCard'\n", "import BadgeCard from '@/components/BadgeCard'\n")

// Make sure BadgeCard import is right after 'use client'
if (!p.includes("import BadgeCard")) {
  p = p.replace("'use client'\n", "'use client'\nimport BadgeCard from '@/components/BadgeCard'\n")
}

fs.writeFileSync('app/(app)/profile/page.tsx', p, 'utf8')
console.log('✅ Fixed!')
console.log('Lines 1-8:')
console.log(p.split('\n').slice(0, 8).join('\n'))
