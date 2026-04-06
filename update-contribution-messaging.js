// update-contribution-messaging.js
const fs = require('fs')

// ── 1. ContributionBanner.tsx ─────────────────────────────────────────────────
let banner = fs.readFileSync('components/ContributionBanner.tsx', 'utf8')

banner = banner.replace(
  '<Heart size={16} fill="white"/>',
  '💛'
)
banner = banner.replace(
  'Partner With Us',
  'Contribute to DivyaDarshan'
)
banner = banner.replace(
  "'use client'",
  "'use client'\n// Updated messaging — Contribute to DivyaDarshan"
)

fs.writeFileSync('components/ContributionBanner.tsx', banner, 'utf8')
console.log('✅ ContributionBanner: updated')

// ── 2. ContributionModal.tsx ──────────────────────────────────────────────────
let modal = fs.readFileSync('components/ContributionModal.tsx', 'utf8')

// Header section
modal = modal.replace(
  `<div style={{ fontSize:11, fontWeight:700, letterSpacing:'.15em', color:'rgba(237,224,196,0.7)', textTransform:'uppercase', marginBottom:6 }}>Partner With Us</div>`,
  `<div style={{ fontSize:11, fontWeight:700, letterSpacing:'.15em', color:'rgba(237,224,196,0.7)', textTransform:'uppercase', marginBottom:6 }}>Donate Wisely · Support Entrepreneurs</div>`
)

modal = modal.replace(
  `<h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:'white', margin:'0 0 6px' }}>Support DivyaDarshan's Mission</h2>`,
  `<h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:'white', margin:'0 0 6px' }}>Contribute to DivyaDarshan</h2>`
)

modal = modal.replace(
  `<p style={{ color:'rgba(237,224,196,0.85)', fontSize:13, lineHeight:1.6, margin:0 }}>
          This is not a donation — it is a contribution towards building India's most trusted temple platform for pilgrims.
        </p>`,
  `<p style={{ color:'rgba(237,224,196,0.85)', fontSize:13, lineHeight:1.6, margin:0 }}>
          Donate wisely — support entrepreneurs who create real impact, not middlemen.
        </p>`
)

// Noble cause section heading
modal = modal.replace(
  `<h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:'#8B1A1A', marginBottom:12 }}>Where Your Contribution Goes</h3>`,
  `<h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:'#8B1A1A', marginBottom:12 }}>Where Every Rupee Goes</h3>`
)

// Important note - update the blue disclaimer box
modal = modal.replace(
  `<strong>Important:</strong> DivyaDarshan is not a trust or NGO. This is a voluntary contribution to support our platform's growth. We believe in transparent, community-funded development. You are partnering with a mission, not making a charitable donation.`,
  `<strong>Donate Wisely:</strong> DivyaDarshan is not a trust or NGO — we are entrepreneurs building India's most trusted pilgrimage platform. Your contribution goes directly to temple volunteers, old age home collaborations and technology — zero middlemen, zero administrative cuts. You fund builders, not bureaucracy.`
)

// Step 1 button text
modal = modal.replace(
  `<Heart size={18}/> I Want to Contribute →`,
  `💛 Yes, I Want to Contribute →`
)

// Submit button
modal = modal.replace(
  `<Heart size={16}/>
                  {loading ? 'Submitting…' : \`Submit — \${fmtINR(finalAmount)}\`}`,
  `💛
                  {loading ? 'Submitting…' : \`Contribute \${fmtINR(finalAmount)}\`}`
)

// Success screen
modal = modal.replace(
  `<h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:'#8B1A1A', marginBottom:12 }}>Thank You, {form.name.split(' ')[0]}!</h2>`,
  `<h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:'#8B1A1A', marginBottom:12 }}>Thank You for Donating Wisely! 🙏</h2>`
)

modal = modal.replace(
  `<p style={{ fontSize:13, color:'#8B1A1A', fontStyle:'italic' }}>
          "Together, we can make India's sacred temples accessible to every pilgrim across the world."
        </p>`,
  `<p style={{ fontSize:13, color:'#8B1A1A', fontStyle:'italic', lineHeight:1.7 }}>
          "Donate wisely — support entrepreneurs, not middlemen. Your contribution funds real builders creating lasting impact for every pilgrim in India."
        </p>`
)

// Bottom disclaimer
modal = modal.replace(
  `By submitting, our team will contact you within 24 hours. No payment is collected now.`,
  `Donate wisely — 100% goes to our mission. No middlemen, no admin cuts. Our team will contact you within 24 hours.`
)

fs.writeFileSync('components/ContributionModal.tsx', modal, 'utf8')
console.log('✅ ContributionModal: messaging updated')

// ── 3. Update the page title / any other references ───────────────────────────
// Check if there's a contributions page
const paths = [
  'app/(app)/contribute/page.tsx',
  'app/(app)/contribution/page.tsx',
]
paths.forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8')
    c = c.replace(/Partner With Us/g, 'Contribute to DivyaDarshan')
    c = c.replace(/Support DivyaDarshan's Mission/g, 'Donate Wisely — Support Entrepreneurs')
    fs.writeFileSync(p, c, 'utf8')
    console.log(`✅ ${p}: updated`)
  }
})

// ── 4. Update admin navbar reference if any ───────────────────────────────────
const adminPath = 'app/admin/dashboard/page.tsx'
let admin = fs.readFileSync(adminPath, 'utf8')
admin = admin.replace(
  "label:'Contributions'",
  "label:'Contributions'"  // keep as is in admin - it's fine
)
// Update the admin contributions header text
admin = admin.replace(
  `<span style={{ fontSize:12, color:C.muted2 }}>Sorted by latest first</span>`,
  `<span style={{ fontSize:12, color:C.muted2 }}>Donate Wisely campaign — sorted by latest</span>`
)
fs.writeFileSync(adminPath, admin, 'utf8')
console.log('✅ Admin dashboard: subtitle updated')

console.log('\n🎉 All messaging updated! Summary of changes:')
console.log('   Button:  "Contribute to DivyaDarshan"')
console.log('   Tagline: "Donate Wisely — Support Entrepreneurs, Not Middlemen"')
console.log('   Disclaimer: Updated to reflect entrepreneur/builder framing')
console.log('   Success screen: "Thank You for Donating Wisely!"')
console.log('\nNow run:')
console.log('git add components/ContributionBanner.tsx components/ContributionModal.tsx app/admin/dashboard/page.tsx')
console.log('git commit -m "feat: update contribution messaging — Donate Wisely branding"')
console.log('git push origin main')
