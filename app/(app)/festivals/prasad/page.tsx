import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PRASAD_RECIPES } from '@/lib/data/prasad'
import type { RecipeCategory } from '@/lib/data/prasad/types'
import { dietFor } from '@/lib/data/prasad/diet'
import RecipeIndexClient from '@/components/prasad/RecipeIndexClient'
import BasketLink from '@/components/prasad/BasketLink'

export const metadata: Metadata = {
  title: 'Prasad Recipes — State-wise & Tradition-wise | DivyaDarshanam',
  description:
    'Detailed recipes for the prasad offered at India’s festivals — modak, puran poli, panchamrit, payasam, pongal, thekua, kada prasad and more — each in the versions made by different states and communities.',
}

const ORDER: RecipeCategory[] = [
  'Sweet',
  'Drink',
  'Rice & Grain',
  'Savoury',
  'Offering mix',
  'Full offering (bhog menu)',
]

export default function PrasadIndexPage() {
  const total = PRASAD_RECIPES.reduce((a, r) => a + r.variants.length, 0)
  const dishes = PRASAD_RECIPES.map(r => ({ id: r.id, name: r.name, summary: r.summary, category: r.category as string, variants: r.variants.map(v => ({ id: v.id, region: v.region, tags: dietFor(r.id, v.id) })) }))

  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #C0570A 100%)', color: 'white' }}>
        <div className="max-w-6xl mx-auto" style={{ padding: '32px 24px 48px' }}>
          <Link href="/festivals" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 18 }}>
            <ArrowLeft size={15} /> All festivals
          </Link>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', opacity: 0.9 }}>Prasad recipe book</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 600, lineHeight: 1.1, marginTop: 6, color: 'white' }}>
            One prasad, many kitchens
          </h1>
          <p style={{ fontSize: 16, maxWidth: 700, lineHeight: 1.7, marginTop: 14, color: 'rgba(255,255,255,0.93)' }}>
            The same offering is cooked differently in every state and community. Each recipe here comes in the versions
            made across India, with full ingredients, method, and how it is offered.
          </p>
          <div style={{ marginTop: 16, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
            {PRASAD_RECIPES.length} prasad &nbsp;·&nbsp; {total} regional versions
          </div>
          <div style={{ marginTop: 16 }}><BasketLink light /></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <RecipeIndexClient dishes={dishes} order={ORDER as string[]} />
      </div>
    </div>
  )
}
