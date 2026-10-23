import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRecipe, getVariant, recipeHref } from '@/lib/data/prasad'
import { baseServings, scaleLine } from '@/lib/prasad/scale'
import { dietFor, DIET_LABEL } from '@/lib/data/prasad/diet'
import PrintButton from '@/components/prasad/PrintButton'

interface Props { params: { id: string }; searchParams: { v?: string; s?: string } }

export function generateMetadata({ params, searchParams }: Props): Metadata {
  const r = getRecipe(params.id)
  if (!r) return { title: 'Recipe card — DivyaDarshanam' }
  const v = getVariant(r, searchParams.v)
  return { title: `${v.title} — recipe card | DivyaDarshanam`, robots: { index: false } }
}

// One printable page: ingredients scaled to the chosen servings, the method in short, and how it is offered.
export default function RecipeCardPage({ params, searchParams }: Props) {
  const recipe = getRecipe(params.id)
  if (!recipe) notFound()
  const v = getVariant(recipe, searchParams.v)
  const base = baseServings(v.serves)
  const asked = parseInt(searchParams.s || '', 10)
  const servings = asked >= 1 && asked <= 1000 ? asked : base
  const factor = servings / base
  const tags = dietFor(recipe.id, v.id)

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', padding: '24px 16px' }}>
      <style>{`@media print { nav, header, footer, .no-print { display: none !important; } body, main { background: white !important; } #card { box-shadow: none !important; border: none !important; margin: 0 !important; max-width: none !important; padding: 0 !important; } @page { margin: 14mm; } }`}</style>
      <div className="no-print" style={{ maxWidth: 760, margin: '0 auto 14px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <Link href={recipeHref(recipe.id, v.id)} className="btn btn-secondary">← Back to full recipe</Link>
        <PrintButton />
        <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>On a phone, choose “Save as PDF” in the print screen to keep a copy or share it.</span>
      </div>

      <article id="card" style={{ maxWidth: 760, margin: '0 auto', background: 'white', border: '1px solid #e5dccb', borderRadius: 14, padding: '28px 30px', boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}>
        <div style={{ borderBottom: '3px solid #8B1A1A', paddingBottom: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8B1A1A' }}>Prasad recipe · {v.region}</div>
          <h1 className="font-serif" style={{ fontSize: 32, fontWeight: 600, margin: '4px 0 2px', color: '#1a1210' }}>{v.title}</h1>
          <div style={{ fontSize: 13, color: '#6b5f55' }}>{v.culture}</div>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 13.5, marginTop: 10, color: '#2d2520' }}>
            <span><strong>Quantities for:</strong> {servings}{factor !== 1 ? ` (written for ${base})` : ''}</span>
            <span><strong>Prep:</strong> {v.prep}</span>
            <span><strong>Cook:</strong> {v.cook}</span>
          </div>
          {tags.length > 0 && <div style={{ fontSize: 12, color: '#166534', marginTop: 6 }}>{tags.map(t => DIET_LABEL[t]).join(' · ')}</div>}
        </div>

        <h2 className="font-serif" style={{ fontSize: 19, fontWeight: 600, margin: '0 0 8px' }}>Ingredients</h2>
        <div style={{ columnWidth: 260, columnGap: 28, marginBottom: 18 }}>
          {v.ingredients.map((g, gi) => (
            <div key={gi} style={{ breakInside: 'avoid', marginBottom: 10 }}>
              {g.group && <div style={{ fontSize: 13, fontWeight: 700, color: '#8B1A1A', marginBottom: 3 }}>{g.group}</div>}
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.65, color: '#2d2520' }}>
                {g.items.map((i, k) => <li key={k}>{scaleLine(i, factor).split(' — ')[0]}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="font-serif" style={{ fontSize: 19, fontWeight: 600, margin: '0 0 8px' }}>Method</h2>
        <ol style={{ margin: '0 0 18px', paddingLeft: 20, fontSize: 13.5, lineHeight: 1.7, color: '#2d2520' }}>
          {v.method.map((st, i) => {
            const d = typeof st === 'string' ? { title: '', text: st } : st
            return <li key={i} style={{ marginBottom: 6, breakInside: 'avoid' }}>{d.title && <strong>{d.title}. </strong>}{d.text}</li>
          })}
        </ol>

        <div style={{ background: '#fbf3ea', borderLeft: '4px solid #8B1A1A', borderRadius: 8, padding: '10px 14px', fontSize: 13.5, lineHeight: 1.65, color: '#2d2520', breakInside: 'avoid' }}>
          <strong>How it is offered: </strong>{v.offering}
        </div>

        <div style={{ marginTop: 18, paddingTop: 10, borderTop: '1px solid #e5dccb', fontSize: 11.5, color: '#8a7d70', display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <span>Full recipe with the reasons behind each step, timers and verses: divyadarshanam.org/festivals/prasad/{recipe.id}</span>
          <span>Follow your own family’s or temple’s custom.</span>
        </div>
      </article>
    </div>
  )
}
