import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { festivalOptions } from '@/lib/prasad/festivalOptions'
import PlanClient from '@/components/prasad/PlanClient'

export const metadata: Metadata = {
  title: 'Plan my puja — one shopping list for all your prasad | DivyaDarshanam',
  description: 'Combine several prasad recipes into a single scaled shopping list, share it on WhatsApp, and get a reminder before the festival.',
}

export default function PlanPage() {
  const festivals = festivalOptions()
  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #C0570A 100%)', color: 'white' }}>
        <div className="max-w-4xl mx-auto" style={{ padding: '28px 24px 44px' }}>
          <Link href="/festivals/prasad" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            <ArrowLeft size={15} /> Prasad recipes
          </Link>
          <h1 className="font-serif" style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 600, lineHeight: 1.1, color: 'white' }}>Plan my puja</h1>
          <p style={{ fontSize: 16, maxWidth: 620, lineHeight: 1.7, marginTop: 12, color: 'rgba(255,255,255,0.93)' }}>
            Pick the prasad, set how many people you are feeding, and get one combined shopping list — then a reminder before the festival.
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-8" style={{ marginTop: -22 }}>
        <PlanClient festivals={festivals} />
      </div>
    </div>
  )
}
