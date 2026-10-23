import Link from 'next/link'
import { ChefHat } from 'lucide-react'
import { getRecipe, getVariant, recipeHref } from '@/lib/data/prasad'
import { TEMPLE_PRASAD, festivalPrasadFor } from '@/lib/data/prasad/templePrasad'

export default function TemplePrasad({ slug, templeName, state }: { slug: string; templeName: string; state?: string }) {
  const signature = (TEMPLE_PRASAD[slug] || []).flatMap(s => {
    const r = getRecipe(s.dish); if (!r) return []
    return [{ r, v: getVariant(r, s.variant), note: s.note }]
  })
  const festival = festivalPrasadFor(slug, state, (TEMPLE_PRASAD[slug] || []).map(s => `${s.dish}/${s.variant}`)).flatMap(s => {
    const r = getRecipe(s.dish); if (!r) return []
    return [{ r, v: getVariant(r, s.variant), festival: s.festival }]
  })
  if (!signature.length && !festival.length) return null

  const card = (key: string, href: string, region: string, title: string, note: string, tag?: string) => (
    <Link key={key} href={href} className="card" style={{ textDecoration: 'none', padding: 14, display: 'flex', flexDirection: 'column', gap: 5, borderTop: '3px solid #8B1A1A' }}>
      <span style={{ alignSelf: 'flex-start', fontSize: 11.5, fontWeight: 700, color: '#8B1A1A', background: '#8B1A1A12', border: '1px solid #8B1A1A33', borderRadius: 100, padding: '2px 10px' }}>{tag || region}</span>
      <span className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{title}</span>
      <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{note}</span>
      <span style={{ fontSize: 12.5, color: 'var(--crimson)', fontWeight: 600 }}>Cook it at home →</span>
    </Link>
  )

  return (
    <div className="mb-8">
      <h2 className="font-serif text-2xl font-medium mb-1" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ChefHat size={22} style={{ color: '#8B1A1A' }} /> Prasad of {templeName}</h2>
      {signature.length > 0 && (
        <>
          <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, margin: '4px 0 12px' }}>
            What this temple is known for, with a home recipe. Temples keep their own exact methods, so treat these as home versions.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: festival.length ? 18 : 0 }}>
            {signature.map(({ r, v, note }) => card(r.id + v.id, recipeHref(r.id, v.id), v.region, v.title, note, 'Signature prasad'))}
          </div>
        </>
      )}
      {festival.length > 0 && (
        <>
          <div className="section-title" style={{ margin: '4px 0 10px' }}>Prasad of festivals celebrated here</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {festival.map(({ r, v, festival: fn }) => card(r.id + v.id + fn, recipeHref(r.id, v.id), v.region, v.title, `Offered at ${fn}, a festival celebrated at this temple.`))}
          </div>
        </>
      )}
    </div>
  )
}
