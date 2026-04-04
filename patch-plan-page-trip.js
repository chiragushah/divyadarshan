// patch-plan-page-trip.js
const fs = require('fs')

const filePath = 'app/(app)/plan/page.tsx'
let content = fs.readFileSync(filePath, 'utf8')

// 1. Add imports
if (!content.includes('PlanMyTripModal')) {
  content = content.replace(
    `import PlanActionBar from '@/components/PlanActionBar'`,
    `import PlanActionBar from '@/components/PlanActionBar'
import PlanMyTripModal from '@/components/PlanMyTripModal'`
  )
  console.log('✅ Added PlanMyTripModal import')
}

// 2. Add useSession import
if (!content.includes('useSession')) {
  content = content.replace(
    `import { useState, useEffect, Suspense } from 'react'`,
    `import { useState, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'`
  )
  console.log('✅ Added useSession import')
}

// 3. Add showPlanModal state inside PlannerForm function
if (!content.includes('showPlanModal')) {
  content = content.replace(
    `  const [error, setError]     = useState('')`,
    `  const [error, setError]     = useState('')
  const [showPlanModal, setShowPlanModal] = useState(false)
  const { data: session } = useSession()`
  )
  console.log('✅ Added showPlanModal state and session')
}

// 4. Add Plan My Trip CTA section after FinVerse CTA and before closing result div
const finverseCTA = `          {/* FinVerse CTA */}
          <div className="mt-4 rounded-xl p-4 flex items-center justify-between gap-4"
            style={{ background: 'var(--ivory2)', border: '1px solid var(--border)' }}>`

const planMyTripCTA = `          {/* Plan My Trip — Premium CTA */}
          <div className="mt-4 rounded-2xl overflow-hidden"
            style={{ border: '2px solid var(--crimson)' }}>
            <div style={{ background: 'var(--crimson)', padding: '16px 20px' }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: 'rgba(237,224,196,0.7)' }}>Premium Service</div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Want us to plan this trip for you?
                  </h3>
                  <p className="text-sm mt-1" style={{ color: 'rgba(237,224,196,0.8)' }}>
                    Our travel experts handle hotels, darshan slots, trains and local guides — end to end.
                  </p>
                </div>
                <span style={{ fontSize: 36, flexShrink: 0 }}>🛕</span>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  '✓ Personalised itinerary',
                  '✓ Hotel & train bookings',
                  '✓ VIP darshan slots',
                  '✓ Local guide coordination',
                ].map(f => (
                  <span key={f} style={{
                    background: 'rgba(255,255,255,0.12)',
                    color: 'white', fontSize: 11, fontWeight: 600,
                    padding: '3px 10px', borderRadius: 20,
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>{f}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--ivory2)', padding: '14px 20px' }}
              className="flex items-center justify-between gap-4">
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                No payment now · Expert contacts you in 24 hrs · Pay only after approval
              </p>
              <button
                onClick={() => setShowPlanModal(true)}
                className="btn btn-primary whitespace-nowrap"
                style={{ background: 'var(--crimson)', flexShrink: 0 }}>
                Plan My Trip →
              </button>
            </div>
          </div>

          {/* FinVerse CTA */}
          <div className="mt-4 rounded-xl p-4 flex items-center justify-between gap-4"
            style={{ background: 'var(--ivory2)', border: '1px solid var(--border)' }}>`

if (!content.includes('Plan My Trip — Premium CTA')) {
  content = content.replace(finverseCTA, planMyTripCTA)
  console.log('✅ Added Plan My Trip CTA section')
}

// 5. Add modal at the end of the result block, before closing PlannerForm div
const closingDiv = `    </div>
  )
}

// Wrap in Suspense`

const withModal = `    </div>

      {/* Plan My Trip Modal */}
      {showPlanModal && (
        <PlanMyTripModal
          form={form}
          itinerary={result}
          user={session?.user}
          onClose={() => setShowPlanModal(false)}
        />
      )}
  )
}

// Wrap in Suspense`

if (!content.includes('Plan My Trip Modal')) {
  content = content.replace(closingDiv, withModal)
  console.log('✅ Added PlanMyTripModal usage')
}

fs.writeFileSync(filePath, content, 'utf8')
console.log('\n🎉 Plan page patched successfully!')
