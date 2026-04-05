// add-recommend-button.js
const fs = require('fs')

// ── Add to ExploreClient.tsx ───────────────────────────────────────────────
let explore = fs.readFileSync('app/(app)/explore/ExploreClient.tsx', 'utf8')

// Add import
if (!explore.includes('RecommendTempleButton')) {
  explore = explore.replace(
    "'use client'",
    `'use client'\nimport dynamic from 'next/dynamic'\nconst RecommendTempleButton = dynamic(() => import('@/components/RecommendTempleButton'), { ssr: false })`
  )
  console.log('✅ Import added to ExploreClient')
}

// Add banner before the search/filter section
// Find first return( and the first <div inside it
if (!explore.includes('RecommendTempleButton')) {
  // Find a good place to insert - after the main wrapper div opens
  const insertAfter = 'className="max-w-6xl mx-auto px-6 py-8">'
  const altInsert = 'className="max-w-5xl mx-auto px-6 py-8">'
  const alt2Insert = 'style={{ maxWidth:'

  let inserted = false

  if (explore.includes(insertAfter)) {
    explore = explore.replace(
      insertAfter,
      insertAfter + '\n        <RecommendTempleButton variant="banner" />'
    )
    inserted = true
  } else if (explore.includes(altInsert)) {
    explore = explore.replace(
      altInsert,
      altInsert + '\n        <RecommendTempleButton variant="banner" />'
    )
    inserted = true
  }

  if (!inserted) {
    // Find first <div after return and add there
    const returnIdx = explore.indexOf('return (')
    if (returnIdx > -1) {
      const firstDiv = explore.indexOf('<div', returnIdx)
      const firstDivClose = explore.indexOf('>', firstDiv)
      const insertPos = firstDivClose + 1
      explore = explore.slice(0, insertPos) + '\n      <RecommendTempleButton variant="banner" />' + explore.slice(insertPos)
      inserted = true
    }
  }

  if (inserted) {
    console.log('✅ RecommendTempleButton banner added to ExploreClient')
  } else {
    console.log('⚠️  Could not auto-insert — adding manually near top of JSX')
  }
}

fs.writeFileSync('app/(app)/explore/ExploreClient.tsx', explore, 'utf8')

// ── Also add to temple listing page ──────────────────────────────────────────
// Add a floating "Recommend a Temple" link to the navbar for easy access
let navbar = fs.readFileSync('components/nav/Navbar.tsx', 'utf8')
if (!navbar.includes('RecommendTemple') && !navbar.includes('recommend')) {
  // Add a small link in the nav items
  navbar = navbar.replace(
    `{ href: "/explore", label: "Temple Directory", desc: "Browse 350+ sacred temples" },`,
    `{ href: "/explore", label: "Temple Directory", desc: "Browse 350+ sacred temples" },
      { href: "/explore#recommend", label: "Recommend a Temple", desc: "Know a temple we are missing?" },`
  )
  fs.writeFileSync('components/nav/Navbar.tsx', navbar, 'utf8')
  console.log('✅ Navbar: Recommend a Temple link added under Explore')
}

// ── Create a standalone /recommend-temple page ────────────────────────────────
fs.mkdirSync('app/(app)/recommend-temple', { recursive: true })
fs.writeFileSync('app/(app)/recommend-temple/page.tsx', `import type { Metadata } from 'next'
import RecommendTemplePage from './RecommendTemplePage'

export const metadata: Metadata = {
  title: 'Recommend a Temple — DivyaDarshan',
  description: 'Know a sacred temple not in our directory? Recommend it and help pilgrims discover it.',
}

export default function Page() {
  return <RecommendTemplePage />
}
`)

fs.writeFileSync('app/(app)/recommend-temple/RecommendTemplePage.tsx', `'use client'
import { useState } from 'react'
import RecommendTempleModal from '@/components/RecommendTempleModal'
import RecommendTempleButton from '@/components/RecommendTempleButton'
import Link from 'next/link'

export default function RecommendTemplePage() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ maxWidth:800, margin:'0 auto', padding:'40px 24px', fontFamily:"'Inter',sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom:32 }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', color:'#C0570A', marginBottom:8 }}>Community</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, color:'#8B1A1A', marginBottom:12 }}>Recommend a Temple</h1>
        <p style={{ fontSize:16, color:'#6B5B4E', lineHeight:1.7 }}>
          Know a sacred temple that is not yet in our directory? Help thousands of pilgrims discover it.
          Our team will verify the details and add it to DivyaDarshan.
        </p>
      </div>

      {/* How it works */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:40 }}>
        {[
          { step:'1', icon:'📝', title:'Fill the Form', desc:'Share temple name, location, deity and any details you know' },
          { step:'2', icon:'🔍', title:'We Verify', desc:'Our team of volunteers confirms the details on ground' },
          { step:'3', icon:'🛕', title:'Temple Added', desc:'The temple goes live on DivyaDarshan for all pilgrims' },
        ].map(item => (
          <div key={item.step} style={{ background:'white', border:'1.5px solid #E8E0D4', borderRadius:14, padding:20, textAlign:'center' }}>
            <div style={{ width:32, height:32, background:'#8B1A1A', color:'white', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, margin:'0 auto 12px' }}>{item.step}</div>
            <div style={{ fontSize:28, marginBottom:8 }}>{item.icon}</div>
            <div style={{ fontWeight:700, fontSize:14, color:'#1A0A00', marginBottom:4 }}>{item.title}</div>
            <div style={{ fontSize:12, color:'#6B5B4E', lineHeight:1.6 }}>{item.desc}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background:'linear-gradient(135deg,#FFF8F0,#FFE8D0)', border:'1.5px solid #C0570A', borderRadius:16, padding:32, textAlign:'center', marginBottom:32 }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🛕</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:'#8B1A1A', marginBottom:8 }}>Ready to recommend?</h2>
        <p style={{ color:'#6B5B4E', marginBottom:20, lineHeight:1.6 }}>
          Even basic details like temple name and city are enough to get started.
          You will be credited when the temple is added.
        </p>
        <button onClick={() => setOpen(true)} style={{ background:'#8B1A1A', color:'white', border:'none', borderRadius:12, padding:'14px 32px', fontWeight:700, fontSize:16, cursor:'pointer', fontFamily:'inherit' }}>
          + Recommend a Temple
        </button>
      </div>

      <p style={{ textAlign:'center', fontSize:13, color:'#A89B8C' }}>
        <Link href="/explore" style={{ color:'#C0570A', textDecoration:'none' }}>← Back to Temple Directory</Link>
      </p>

      {open && <RecommendTempleModal onClose={() => setOpen(false)} />}
    </div>
  )
}
`)
console.log('✅ /recommend-temple page created')

// ── Update navbar to link to the page ────────────────────────────────────────
let navbar2 = fs.readFileSync('components/nav/Navbar.tsx', 'utf8')
navbar2 = navbar2.replace(
  `{ href: "/explore#recommend", label: "Recommend a Temple", desc: "Know a temple we are missing?" },`,
  `{ href: "/recommend-temple", label: "Recommend a Temple", desc: "Know a temple we are missing?" },`
)
fs.writeFileSync('components/nav/Navbar.tsx', navbar2, 'utf8')
console.log('✅ Navbar: links to /recommend-temple page')

console.log('\n🎉 Done! Now run:')
console.log('git add .')
console.log('git commit -m "feat: recommend-temple page + banner on explore + navbar link"')
console.log('git push origin main')
