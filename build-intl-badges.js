// build-intl-badges.js
const fs = require('fs')

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE 1: International Traveler in AI Planner
// ═══════════════════════════════════════════════════════════════════════════

let plan = fs.readFileSync('app/(app)/plan/page.tsx', 'utf8')

// Add is_international + country to form state
plan = plan.replace(
  `    auspicious_date: '',`,
  `    auspicious_date: '',
    is_international: false,
    country: '',`
)

// Add country list constant after the AUSPICIOUS_COLORS block
const COUNTRIES = `
  const COUNTRIES = [
    'United States','United Kingdom','Canada','Australia','New Zealand',
    'United Arab Emirates','Singapore','Malaysia','Germany','France',
    'Netherlands','Switzerland','Sweden','Japan','Hong Kong','South Africa',
    'Bahrain','Kuwait','Qatar','Oman','Kenya','Tanzania','Mauritius',
    'Sri Lanka','Nepal','Bangladesh','Fiji','Trinidad & Tobago','Other',
  ]
`
plan = plan.replace(
  `  const upcomingDates = AUSPICIOUS_DATES`,
  COUNTRIES + `  const upcomingDates = AUSPICIOUS_DATES`
)

// Add international toggle UI after the "Starting City" input block
const INTL_UI = `            {/* International Traveller Toggle */}
            <div className="md:col-span-2">
              <div style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderRadius:12, border:'1.5px solid', borderColor: form.is_international ? '#1E40AF' : 'var(--border)', background: form.is_international ? '#EFF6FF' : 'var(--ivory2)', cursor:'pointer', transition:'all 0.2s' }}
                onClick={() => set('is_international', !form.is_international)}>
                <div style={{ width:20, height:20, borderRadius:4, border:'2px solid', borderColor: form.is_international ? '#1E40AF' : 'var(--border)', background: form.is_international ? '#1E40AF' : 'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }}>
                  {form.is_international && <span style={{ color:'white', fontSize:13, fontWeight:700 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color: form.is_international ? '#1E40AF' : 'var(--ink)' }}>
                    ✈️ I am travelling from outside India
                  </div>
                  <div style={{ fontSize:12, color:'var(--muted2)', marginTop:2 }}>
                    AI will include international flights, forex, visa tips and NRI-friendly hotels
                  </div>
                </div>
              </div>
              {form.is_international && (
                <div style={{ marginTop:10 }}>
                  <label className="label">Your Country</label>
                  <select className="input" value={form.country} onChange={e => set('country', e.target.value)}>
                    <option value="">Select your country…</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              )}
            </div>`

// Insert after Starting City input group closing </div>
plan = plan.replace(
  `            </div>
            <div>
              <label className="label">Destination / Yatra</label>`,
  `            </div>
            ${INTL_UI}
            <div>
              <label className="label">Destination / Yatra</label>`
)

// Enhance the notes sent to AI for international travelers
plan = plan.replace(
  `form.auspicious_date ? \`IMPORTANT: The pilgrim wants to travel on or around \${form.auspicious_date}`,
  `form.is_international ? \`INTERNATIONAL TRAVELLER FROM \${form.country || 'abroad'}: Include (1) best international airports to fly into India for this destination (2) approximate international flight costs in USD and INR (3) recommended arrival city and onward train/flight to destination (4) currency exchange tips (5) SIM card and travel insurance advice (6) NRI-friendly accommodation options (7) any visa requirements to note (8) total trip budget in both USD and INR.\` : '',
            form.auspicious_date ? \`IMPORTANT: The pilgrim wants to travel on or around \${form.auspicious_date}`
)

// Also change mode options to include Flight for international
plan = plan.replace(
  `<option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="Car / Road">Car / Road</option>
              <option value="Bus">Bus</option>`,
  `<option value="Train">Train</option>
              <option value="Flight">Flight</option>
              <option value="International Flight + Train">International Flight + Train</option>
              <option value="International Flight + Car">International Flight + Car</option>
              <option value="Car / Road">Car / Road</option>
              <option value="Bus">Bus</option>`
)

fs.writeFileSync('app/(app)/plan/page.tsx', plan, 'utf8')
console.log('✅ Feature 1: International traveler support added to planner')
console.log('   Has is_international:', plan.includes('is_international'))
console.log('   Has country selector:', plan.includes('COUNTRIES'))


// ═══════════════════════════════════════════════════════════════════════════
// FEATURE 2: Contribution Badges (Bronze/Silver/Gold/Platinum)
// ═══════════════════════════════════════════════════════════════════════════

// 2a. Create badge utility
fs.mkdirSync('lib', { recursive: true })
fs.writeFileSync('lib/badges.ts', `// lib/badges.ts
// Badge calculation for DivyaDarshan contributors

export interface Badge {
  id:       string
  name:     string
  emoji:    string
  color:    string
  bg:       string
  border:   string
  minAmount: number   // minimum confirmed contribution amount
  minRecs:   number   // OR minimum approved temple recommendations
  perks:    string[]
}

export const BADGES: Badge[] = [
  {
    id:        'bronze',
    name:      'Bronze Partner',
    emoji:     '🥉',
    color:     '#92400E',
    bg:        '#FEF3C7',
    border:    '#D97706',
    minAmount: 5000,
    minRecs:   3,
    perks: [
      'Partner badge on your profile',
      'Early access to new features',
      'Credited on contributors page',
    ],
  },
  {
    id:        'silver',
    name:      'Silver Partner',
    emoji:     '🥈',
    color:     '#374151',
    bg:        '#F3F4F6',
    border:    '#6B7280',
    minAmount: 25000,
    minRecs:   10,
    perks: [
      'All Bronze perks',
      'Priority support from our team',
      'Quarterly impact reports',
      'Special Silver Partner yatra programs',
    ],
  },
  {
    id:        'gold',
    name:      'Gold Partner',
    emoji:     '🥇',
    color:     '#92400E',
    bg:        '#FFFBEB',
    border:    '#F59E0B',
    minAmount: 50000,
    minRecs:   25,
    perks: [
      'All Silver perks',
      'Name on DivyaDarshan website permanently',
      'Exclusive Gold yatra experiences',
      'Direct line to founding team',
      'Annual recognition ceremony invite',
    ],
  },
  {
    id:        'platinum',
    name:      'Platinum Partner',
    emoji:     '💎',
    color:     '#1E3A5F',
    bg:        '#EFF6FF',
    border:    '#3B82F6',
    minAmount: 100000,
    minRecs:   50,
    perks: [
      'All Gold perks',
      'Co-create DivyaDarshan features',
      'Advisory board membership',
      'Revenue share on referred users',
      'Lifetime premium access',
      'Personal yatra planning by our team',
    ],
  },
]

export function getBadge(contributionAmount: number, approvedRecs: number): Badge | null {
  // Check from highest to lowest
  for (let i = BADGES.length - 1; i >= 0; i--) {
    const b = BADGES[i]
    if (contributionAmount >= b.minAmount || approvedRecs >= b.minRecs) {
      return b
    }
  }
  return null
}

export function getNextBadge(current: Badge | null): Badge | null {
  if (!current) return BADGES[0]
  const idx = BADGES.findIndex(b => b.id === current.id)
  return idx < BADGES.length - 1 ? BADGES[idx + 1] : null
}

export function getProgress(contributionAmount: number, approvedRecs: number, target: Badge): number {
  const amtProgress = Math.min(100, (contributionAmount / target.minAmount) * 100)
  const recProgress = Math.min(100, (approvedRecs / target.minRecs) * 100)
  return Math.max(amtProgress, recProgress)
}
`)
console.log('✅ lib/badges.ts created')

// 2b. Create BadgeCard component
fs.writeFileSync('components/BadgeCard.tsx', `'use client'
import { BADGES, getBadge, getNextBadge, getProgress, Badge } from '@/lib/badges'

interface Props {
  contributionAmount: number
  approvedRecs: number
  compact?: boolean
}

export default function BadgeCard({ contributionAmount, approvedRecs, compact = false }: Props) {
  const current = getBadge(contributionAmount, approvedRecs)
  const next = getNextBadge(current)
  const progress = next ? getProgress(contributionAmount, approvedRecs, next) : 100

  const fmtINR = (n: number) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(n)

  if (compact) {
    if (!current) return (
      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:100, background:'#F8F4EE', border:'1px solid #E8E0D4', fontSize:12, color:'#A89B8C' }}>
        🛕 No badge yet — contribute or recommend temples to earn one
      </div>
    )
    return (
      <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, background:current.bg, border:\`1.5px solid \${current.border}\`, fontSize:13, fontWeight:700, color:current.color }}>
        {current.emoji} {current.name}
      </div>
    )
  }

  return (
    <div style={{ background:'white', border:'1.5px solid #E8E0D4', borderRadius:16, padding:24 }}>
      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'#A89B8C', marginBottom:16 }}>Your Partner Badge</div>

      {/* All badges */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:24 }}>
        {BADGES.map(b => {
          const earned = current && (BADGES.indexOf(b) <= BADGES.indexOf(current))
          return (
            <div key={b.id} style={{ textAlign:'center', padding:'14px 8px', borderRadius:12, background: earned ? b.bg : '#F8F4EE', border:\`2px solid \${earned ? b.border : '#E8E0D4'}\`, transition:'all 0.2s', opacity: earned ? 1 : 0.5 }}>
              <div style={{ fontSize:28, marginBottom:6, filter: earned ? 'none' : 'grayscale(100%)' }}>{b.emoji}</div>
              <div style={{ fontSize:11, fontWeight:700, color: earned ? b.color : '#A89B8C' }}>{b.name}</div>
              <div style={{ fontSize:10, color:'#A89B8C', marginTop:2 }}>{fmtINR(b.minAmount)}</div>
              <div style={{ fontSize:10, color:'#A89B8C' }}>or {b.minRecs} recs</div>
              {earned && <div style={{ fontSize:10, fontWeight:700, color:b.color, marginTop:4 }}>✓ Earned</div>}
            </div>
          )
        })}
      </div>

      {/* Current status */}
      {current ? (
        <div style={{ background:current.bg, border:\`1.5px solid \${current.border}\`, borderRadius:12, padding:16, marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <span style={{ fontSize:32 }}>{current.emoji}</span>
            <div>
              <div style={{ fontWeight:700, fontSize:16, color:current.color }}>{current.name}</div>
              <div style={{ fontSize:12, color:'#6B5B4E' }}>Thank you for supporting DivyaDarshan's mission 🙏</div>
            </div>
          </div>
          <div style={{ fontSize:12, fontWeight:600, color:current.color, marginBottom:6 }}>Your perks:</div>
          {current.perks.map(p => (
            <div key={p} style={{ fontSize:12, color:'#6B5B4E', padding:'3px 0', display:'flex', gap:6 }}>
              <span style={{ color:current.color }}>✓</span> {p}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background:'#FFF8F0', border:'1px solid #FFD4B0', borderRadius:12, padding:16, marginBottom:16 }}>
          <div style={{ fontWeight:600, fontSize:14, color:'#C0570A', marginBottom:4 }}>No badge yet</div>
          <div style={{ fontSize:13, color:'#6B5B4E' }}>
            Contribute <strong>Rs.5,000+</strong> or get <strong>3 temples approved</strong> to earn your Bronze badge.
          </div>
        </div>
      )}

      {/* Progress to next */}
      {next && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ fontSize:12, fontWeight:600, color:'#6B5B4E' }}>Progress to {next.emoji} {next.name}</span>
            <span style={{ fontSize:12, fontWeight:700, color:next.color }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height:8, background:'#F3F4F6', borderRadius:100, overflow:'hidden', marginBottom:8 }}>
            <div style={{ height:'100%', width:\`\${progress}%\`, background:\`linear-gradient(90deg, \${next.border}, \${next.color})\`, borderRadius:100, transition:'width 1s ease' }} />
          </div>
          <div style={{ fontSize:11, color:'#A89B8C' }}>
            Reach {fmtINR(next.minAmount)} contribution <strong>or</strong> {next.minRecs} approved temple recommendations
          </div>
          <div style={{ fontSize:11, color:'#6B5B4E', marginTop:6 }}>
            You have: {fmtINR(contributionAmount)} contributed · {approvedRecs} temples approved
          </div>
        </div>
      )}

      {!next && current && (
        <div style={{ textAlign:'center', padding:'12px', background:'#EFF6FF', borderRadius:10, fontSize:13, color:'#1E40AF', fontWeight:600 }}>
          💎 You have reached our highest tier — Platinum Partner!
        </div>
      )}
    </div>
  )
}
`)
console.log('✅ components/BadgeCard.tsx created')

// 2c. Add API to get user badge data
fs.mkdirSync('app/api/user-badge', { recursive: true })
fs.writeFileSync('app/api/user-badge/route.ts', `import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { Contribution } from '@/models/Contribution'
import { TempleRecommendation } from '@/models/TempleRecommendation'
import { getBadge } from '@/lib/badges'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ badge: null, amount: 0, recs: 0 })

  await connectDB()

  const contributions = await Contribution.find({
    email: session.user.email,
    status: 'confirmed'
  }).lean()

  const recs = await TempleRecommendation.find({
    recommender_email: session.user.email,
    status: { $in: ['approved', 'added'] }
  }).lean()

  const totalAmount = contributions.reduce((s: number, c: any) => s + (c.amount || 0), 0)
  const approvedRecs = recs.length
  const badge = getBadge(totalAmount, approvedRecs)

  return NextResponse.json({ badge, amount: totalAmount, recs: approvedRecs })
}
`)
console.log('✅ app/api/user-badge/route.ts created')

// 2d. Add BadgeCard to profile page
let profile = fs.readFileSync('app/(app)/profile/page.tsx', 'utf8')
if (!profile.includes('BadgeCard')) {
  // Add import
  profile = profile.replace(
    "'use client'",
    `'use client'
import { useEffect, useState } from 'react'
import BadgeCard from '@/components/BadgeCard'`
  )

  // Add state and fetch after existing useEffect or useState
  const badgeState = `
  const [badgeData, setBadgeData] = useState({ amount: 0, recs: 0, badge: null as any })
  useEffect(() => {
    fetch('/api/user-badge').then(r => r.json()).then(d => setBadgeData(d)).catch(() => {})
  }, [])
`

  // Insert after first useState
  const firstUseState = profile.indexOf('useState(')
  const lineEnd = profile.indexOf('\n', firstUseState)
  profile = profile.slice(0, lineEnd + 1) + badgeState + profile.slice(lineEnd + 1)

  // Add BadgeCard before the closing of main content
  // Find a good insertion point - before the last </div> in return
  profile = profile.replace(
    '</main>',
    `  <div style={{ maxWidth:800, margin:'0 auto', padding:'0 24px 40px' }}>
        <BadgeCard contributionAmount={badgeData.amount} approvedRecs={badgeData.recs} />
      </div>
    </main>`
  )

  if (!profile.includes('</main>')) {
    // Try alternate - insert before last closing div
    const lastDiv = profile.lastIndexOf('</div>')
    profile = profile.slice(0, lastDiv) +
      `<div style={{ maxWidth:800, margin:'32px auto 0', padding:'0 24px 40px' }}>
        <BadgeCard contributionAmount={badgeData.amount} approvedRecs={badgeData.recs} />
      </div>` +
      profile.slice(lastDiv)
  }

  fs.writeFileSync('app/(app)/profile/page.tsx', profile, 'utf8')
  console.log('✅ Profile page: BadgeCard added')
} else {
  console.log('⏭️  Profile already has BadgeCard')
}

// 2e. Add badge progress to ContributionModal success screen
let modal = fs.readFileSync('components/ContributionModal.tsx', 'utf8')
if (!modal.includes('Bronze')) {
  modal = modal.replace(
    `<p style={{ fontSize:13, color:'#8B1A1A', fontStyle:'italic' }}>
          "Together, we can make India's sacred temples accessible to every pilgrim across the world."
        </p>`,
    `<p style={{ fontSize:13, color:'#8B1A1A', fontStyle:'italic' }}>
          "Together, we can make India's sacred temples accessible to every pilgrim across the world."
        </p>
        <div style={{ marginTop:12, padding:'10px 14px', background:'#FEF3C7', borderRadius:10, border:'1px solid #D97706' }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#92400E', marginBottom:4 }}>Your path to a Partner Badge:</div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {[['🥉','Bronze','Rs.5K+'],['🥈','Silver','Rs.25K+'],['🥇','Gold','Rs.50K+'],['💎','Platinum','Rs.1L+']].map(([emoji,name,amt]) => (
              <div key={name} style={{ fontSize:11, color:'#92400E' }}>{emoji} {name} {amt}</div>
            ))}
          </div>
        </div>`
  )
  fs.writeFileSync('components/ContributionModal.tsx', modal, 'utf8')
  console.log('✅ ContributionModal: badge preview added to success screen')
}

console.log('\n🎉 Both features built! Now run:')
console.log('git add .')
console.log('git commit -m "feat: international traveler planner + contribution badges"')
console.log('git push origin main')
