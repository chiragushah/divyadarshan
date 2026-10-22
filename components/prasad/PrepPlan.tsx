import Link from 'next/link'
import { CalendarClock, ShoppingBasket, Moon, Sun, Flame } from 'lucide-react'
import { getRecipe, getVariant, recipeHref } from '@/lib/data/prasad'
import { baseServings } from '@/lib/prasad/scale'

// Server component: turns the festival's recipes into a countdown plan.
const PERISHABLE = /\b(milk|curd|yogurt|buttermilk|paneer|khoa|mawa|cream|butter|banana|mango|coconut|lemon|lime|leaf|leaves|tulsi|mint|coriander|curry|pumpkin|potato|carrot|radish|jackfruit|pomegranate|fruit|flower|petal|cucumber|tomato|chilli|chillies|ginger|neem|bilva|durva|dub)\b/i
const OVERNIGHT = /\b(soak|overnight|night before|ferment|set the curd|set curd|sprout|marinat|dry[- ]roast|cool completely|rest(ed)? for)\b/i

interface Entry { dish: string; variant?: string }

export default function PrepPlan({ festivalName, slug, accent, entries, date, approx }: {
  festivalName: string; slug: string; accent: string; entries: Entry[]; date: Date | null; approx: boolean
}) {
  const rows = entries
    .map(e => { const r = getRecipe(e.dish); if (!r) return null; return { r, v: getVariant(r, e.variant) } })
    .filter((x): x is NonNullable<typeof x> => !!x)
  if (!rows.length) return null

  const fmt = (offset: number) => {
    if (!date) return ''
    const d = new Date(date.getTime() - offset * 86400000)
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  const dry: { who: string; items: string[] }[] = []
  const fresh: { who: string; items: string[] }[] = []
  const eve: { who: string; items: string[] }[] = []
  for (const { r, v } of rows) {
    const who = `${r.name} · ${v.region.split(' (')[0]}`
    const names = v.ingredients.flatMap(g => g.items.map(i => i.split(' — ')[0]))
    dry.push({ who, items: names.filter(n => !PERISHABLE.test(n)) })
    fresh.push({ who, items: names.filter(n => PERISHABLE.test(n)) })
    eve.push({ who, items: (v.mise || []).map(m => m.split(' — ')[0]).filter(m => OVERNIGHT.test(m)) })
  }
  const dayOrder = [...rows].sort((a, b) => minutes(b.v.cook) - minutes(a.v.cook))

  const stage = (icon: React.ReactNode, when: string, offset: number, title: string, body: React.ReactNode) => (
    <div style={{ display: 'flex', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: accent, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
        <div style={{ flex: 1, width: 2, background: `${accent}33`, marginTop: 4 }} />
      </div>
      <div style={{ flex: 1, paddingBottom: 22, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: '.08em', textTransform: 'uppercase' }}>{when}{date && offset >= 0 ? ` · ${fmt(offset)}` : ''}</div>
        <div className="font-serif" style={{ fontSize: 18, fontWeight: 600, margin: '2px 0 8px' }}>{title}</div>
        {body}
      </div>
    </div>
  )

  const lists = (src: { who: string; items: string[] }[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {src.filter(s => s.items.length).map(s => (
        <details key={s.who} style={{ background: 'var(--ivory2)', border: '1px solid var(--ivory3)', borderRadius: 10, padding: '8px 12px' }}>
          <summary style={{ cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{s.who} <span style={{ color: 'var(--muted)', fontWeight: 400 }}>({s.items.length} items)</span></summary>
          <ul style={{ margin: '8px 0 2px', paddingLeft: 18, fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.6 }}>{s.items.map((i, k) => <li key={k}>{i}</li>)}</ul>
        </details>
      ))}
    </div>
  )

  const eveItems = eve.filter(e => e.items.length)

  return (
    <section style={{ marginBottom: 32 }}>
      <h2 className="font-serif" style={{ fontSize: 24, fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
        <CalendarClock size={22} style={{ color: accent }} />
        <span style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 2 }}>Prep plan — what to do and when</span>
      </h2>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, margin: '8px 0 18px' }}>
        A countdown for cooking the prasad above for {festivalName}{date ? ` (${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}${approx ? ', approximate — confirm locally' : ''})` : ''}. Tap a recipe to see its items.
      </p>
      <div className="card card-p">
        {stage(<ShoppingBasket size={18} />, 'A week before', 7, 'Buy the dry goods and pantry items', lists(dry))}
        {stage(<ShoppingBasket size={18} />, 'Two days before', 2, 'Buy the fresh and perishable items', lists(fresh))}
        {stage(<Moon size={18} />, 'The night before', 1, eveItems.length ? 'Soak, set and prepare' : 'Lay out and measure',
          eveItems.length ? lists(eve) : <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.7, margin: 0 }}>None of these recipes needs overnight soaking. Wash and dry the vessels, measure out the dry ingredients, and keep the puja items ready.</p>)}
        {stage(<Sun size={18} />, 'Morning of the festival', 0, 'Cook in this order — longest first', (
          <ol style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: 'var(--ink2)', lineHeight: 1.75 }}>
            {dayOrder.map(({ r, v }) => (
              <li key={r.id + v.id}>
                <Link href={recipeHref(r.id, v.id, slug)} style={{ color: accent, fontWeight: 700, textDecoration: 'none' }}>{r.name} · {v.region.split(' (')[0]}</Link>
                <span style={{ color: 'var(--muted)' }}> — prep {v.prep}, cook {v.cook} (serves {baseServings(v.serves)} as written)</span>
              </li>
            ))}
          </ol>
        ))}
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: accent, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Flame size={18} /></div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: '.08em', textTransform: 'uppercase' }}>At the time of puja</div>
            <div className="font-serif" style={{ fontSize: 18, fontWeight: 600, margin: '2px 0 4px' }}>Offer, then share</div>
            <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.7, margin: 0 }}>Each recipe page gives the offering steps and the verses to say. Keep prasad covered until it is offered, and share it only after.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function minutes(s: string): number {
  const h = s.match(/(\d+(?:\.\d+)?)\s*(?:h|hour|hr)/i)
  const m = s.match(/(\d+)\s*(?:min|m\b)/i)
  return (h ? parseFloat(h[1]) * 60 : 0) + (m ? parseInt(m[1], 10) : 0) || parseInt(s, 10) || 0
}
