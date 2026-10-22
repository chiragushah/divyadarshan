import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChefHat } from 'lucide-react'
import { PRASAD_RECIPES, recipeHref } from '@/lib/data/prasad'
import type { RecipeCategory } from '@/lib/data/prasad/types'

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
  const groups = ORDER.map(cat => ({ cat, items: PRASAD_RECIPES.filter(r => r.category === cat) })).filter(g => g.items.length)

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
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {groups.map(g => (
          <section key={g.cat} style={{ marginBottom: 36 }}>
            <h2 className="font-serif" style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
              <span style={{ borderBottom: '3px solid var(--crimson)', paddingBottom: 2 }}>{g.cat}</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 16 }}>
              {g.items.map(r => (
                <Link key={r.id} href={recipeHref(r.id)} className="card" style={{ textDecoration: 'none', padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ChefHat size={16} style={{ color: 'var(--crimson)', flexShrink: 0 }} />
                    <span className="font-serif" style={{ fontSize: 19, fontWeight: 600, color: 'var(--ink)' }}>{r.name}</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55, margin: 0 }}>{r.summary}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                    {r.variants.map(v => (
                      <span key={v.id} style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--crimson)', background: '#8B1A1A12', border: '1px solid #8B1A1A33', borderRadius: 100, padding: '2px 9px' }}>
                        {v.region.split(' (')[0]}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
