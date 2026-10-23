'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Copy, MessageCircle, Printer, ShoppingBasket, Trash2, Check } from 'lucide-react'
import { loadBasket, saveBasket, removeFromBasket } from '@/lib/prasad/basket'
import { buildShoppingList, shoppingText, type BasketItem } from '@/lib/prasad/merge'
import { SERVING_PRESETS } from '@/lib/prasad/scale'
import ReminderBox, { type FestOpt } from './ReminderBox'
import { STORES, HAS_AFFILIATE, searchTerm, buyable } from '@/lib/prasad/shop'

const CHK = 'dd_shop_checked_v1'

export default function PlanClient({ festivals }: { festivals: FestOpt[] }) {
  const [items, setItems] = useState<BasketItem[] | null>(null)
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setItems(loadBasket())
    try { setChecked(JSON.parse(localStorage.getItem(CHK) || '{}')) } catch { /* ignore */ }
  }, [])

  const list = useMemo(() => (items ? buildShoppingList(items) : []), [items])
  const cats = Array.from(new Set(list.map(l => l.category)))
  const text = useMemo(() => shoppingText('My puja shopping list', list), [list])

  const update = (next: BasketItem[]) => { setItems(next); saveBasket(next) }
  const setServ = (key: string, n: number) => update((items || []).map(i => (i.key === key ? { ...i, servings: Math.max(1, Math.min(1000, n)) } : i)))
  const tick = (k: string) => {
    const next = { ...checked, [k]: !checked[k] }
    setChecked(next)
    try { localStorage.setItem(CHK, JSON.stringify(next)) } catch { /* ignore */ }
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* ignore */ }
  }

  if (items === null) return <p style={{ color: 'var(--muted)' }}>Loading your plan…</p>

  if (!items.length) {
    return (
      <div className="card card-p" style={{ textAlign: 'center', padding: 36 }}>
        <ShoppingBasket size={36} style={{ color: 'var(--crimson)', marginBottom: 10 }} />
        <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Your puja plan is empty</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 460, margin: '0 auto 18px', lineHeight: 1.7, fontSize: 14.5 }}>
          Open any prasad recipe, choose how many people you are serving, and tap “Add to Plan my puja”. Add several — modak, panchamrit, kheer — and this page combines them into one shopping list.
        </p>
        <Link href="/festivals/prasad" className="btn btn-primary">Browse prasad recipes</Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section className="card card-p">
        <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>What you are making ({items.length})</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(i => (
            <div key={i.key} style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '12px 14px', background: 'var(--ivory2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <Link href={`/festivals/prasad/${i.dish}?v=${i.variant}`} style={{ fontWeight: 700, color: 'var(--ink)', textDecoration: 'none', fontSize: 15 }}>{i.title}</Link>
                <button onClick={() => { removeFromBasket(i.key); setItems((items || []).filter(x => x.key !== i.key)) }} aria-label={`Remove ${i.title}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b91c1c', display: 'inline-flex', gap: 5, alignItems: 'center', fontSize: 13, fontWeight: 600 }}><Trash2 size={14} /> Remove</button>
              </div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 12.5, color: 'var(--muted)', marginRight: 4 }}>Servings:</span>
                {Array.from(new Set([i.baseServes, ...SERVING_PRESETS])).sort((a, b) => a - b).map(n => (
                  <button key={n} onClick={() => setServ(i.key, n)} style={{ padding: '4px 11px', borderRadius: 100, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', border: `1.5px solid ${i.servings === n ? 'var(--crimson)' : 'var(--ivory3)'}`, background: i.servings === n ? 'var(--crimson)' : 'white', color: i.servings === n ? 'white' : 'var(--ink2)' }}>{n}</button>
                ))}
                <input aria-label={`Servings for ${i.title}`} inputMode="numeric" value={i.servings} onChange={e => { const n = parseInt(e.target.value.replace(/\D/g, ''), 10); if (n) setServ(i.key, n) }} style={{ width: 62, padding: '4px 8px', borderRadius: 100, border: '1.5px solid var(--ivory3)', fontSize: 12.5, fontWeight: 700 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card card-p" id="print-list">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 6 }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600 }}>One shopping list</h2>
          <div className="no-print" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={copy} style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>{copied ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy</>}</button>
            <a className="btn btn-secondary" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><MessageCircle size={15} /> WhatsApp</a>
            <button className="btn btn-secondary" onClick={() => window.print()} style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Printer size={15} /> Print</button>
          </div>
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 16px' }}>
          Same ingredients from different recipes are added together when the units match. If an item shows twice (for example “ghee” and “cow ghee”), add them yourself. Quantities are a starting point — check each recipe before you shop.
        </p>
        <p className="no-print" style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6, margin: '-8px 0 16px' }}>
          Under each item are search links to online grocers. We have no tie-up with any of them yet; prices and availability are theirs.{HAS_AFFILIATE ? ' Some links are affiliate links — we may earn a small commission at no cost to you.' : ''}
        </p>
        {cats.map(c => (
          <div key={c} style={{ marginBottom: 18 }}>
            <div className="section-title" style={{ marginBottom: 6 }}>{c}</div>
            {list.filter(l => l.category === c).map(l => {
              const id = l.name
              return (
                <label key={id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid var(--ivory3)', cursor: 'pointer', opacity: checked[id] ? 0.45 : 1 }}>
                  <input type="checkbox" checked={!!checked[id]} onChange={() => tick(id)} style={{ marginTop: 4 }} />
                  <span style={{ flex: 1, fontSize: 14.5, textDecoration: checked[id] ? 'line-through' : 'none' }}>
                    <strong style={{ textTransform: 'capitalize' }}>{l.name}</strong>{l.qty && <span style={{ color: 'var(--crimson)', fontWeight: 700 }}> — {l.qty}</span>}
                    {l.from.length > 0 && <span style={{ display: 'block', fontSize: 12, color: 'var(--muted)' }}>for {l.from.join(', ')}</span>}
                    {buyable(l.name) && (
                      <span className="no-print" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 5 }}>
                        {STORES.map(st => (
                          <a key={st.id} href={st.href(searchTerm(l.name))} target="_blank" rel="noopener noreferrer sponsored" onClick={e => e.stopPropagation()}
                            style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--crimson)', border: '1px solid #8B1A1A33', background: '#8B1A1A0d', borderRadius: 100, padding: '2px 9px', textDecoration: 'none' }}>{st.name}</a>
                        ))}
                      </span>
                    )}
                  </span>
                </label>
              )
            })}
          </div>
        ))}
      </section>

      <div className="no-print"><ReminderBox festivals={festivals} items={items} /></div>

      <style>{`@media print { .no-print, nav, header, footer { display: none !important; } #print-list { box-shadow: none !important; border: none !important; } }`}</style>
    </div>
  )
}
