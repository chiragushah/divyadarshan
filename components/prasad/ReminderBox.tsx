'use client'
import { useEffect, useMemo, useState } from 'react'
import { Bell, CalendarPlus, Mail, Trash2 } from 'lucide-react'
import { buildMultiICS } from '@/lib/festivalDates'
import { buildShoppingList, shoppingText, type BasketItem } from '@/lib/prasad/merge'
import { SERVING_PRESETS } from '@/lib/prasad/scale'

export interface FestOpt { slug: string; name: string; iso: string; display: string; approx: boolean }

interface Props {
  festivals: FestOpt[]
  items: BasketItem[]
  fixedSlug?: string
  selectable?: boolean       // let the user tick which recipes and pick servings (festival page)
  accent?: string
}

async function api(method: string, body?: any) {
  const res = await fetch('/api/prasad-reminders', { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
  const ct = res.headers.get('content-type') || ''
  if (res.redirected || !ct.includes('json')) return { status: 401, data: { error: 'Please sign in to use email reminders.' } as any }
  return { status: res.status, data: await res.json() as any }
}

export default function ReminderBox({ festivals, items, fixedSlug, selectable, accent = '#8B1A1A' }: Props) {
  const [slug, setSlug] = useState(fixedSlug || festivals[0]?.slug || '')
  const [days, setDays] = useState(7)
  const [servings, setServings] = useState(11)
  const [picked, setPicked] = useState<Record<string, boolean>>({})
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [existing, setExisting] = useState<any>(null)

  useEffect(() => { setPicked(Object.fromEntries(items.map(i => [i.key, true]))) }, [items])

  const fest = festivals.find(f => f.slug === slug)
  const chosen = useMemo(() => items
    .filter(i => !selectable || picked[i.key])
    .map(i => (selectable ? { ...i, servings } : i)), [items, picked, selectable, servings])

  useEffect(() => {
    let live = true
    setExisting(null)
    if (!slug) return
    api('GET').then(r => { if (live && r.status === 200) setExisting((r.data.reminders || []).find((x: any) => x.festival_slug === slug) || null) }).catch(() => {})
    return () => { live = false }
  }, [slug, msg])

  const dateOk = !!fest?.iso
  const chip = (active: boolean): React.CSSProperties => ({ padding: '6px 12px', borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: `1.5px solid ${active ? accent : 'var(--ivory3)'}`, background: active ? accent : 'white', color: active ? 'white' : 'var(--ink2)' })

  const download = () => {
    if (!fest || !dateOk || !chosen.length) return
    const fd = new Date(fest.iso + 'T00:00:00')
    const shop = new Date(fd.getTime() - days * 86400000)
    const list = buildShoppingList(chosen)
    const events = [
      { title: `Buy prasad ingredients for ${fest.name}`, date: shop, description: shoppingText(`Shopping list for ${fest.name}`, list), url: `https://divyadarshanam.org/festivals/${fest.slug}`, alarmAt9am: true },
      { title: `${fest.name}${fest.approx ? ' (date approximate)' : ''}`, date: fd, description: `Prasad plan: ${chosen.map(c => c.title).join(', ')}`, url: `https://divyadarshanam.org/festivals/${fest.slug}` },
    ]
    const blob = new Blob([buildMultiICS(events)], { type: 'text/calendar;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob); a.download = `${fest.slug}-prasad-shopping.ics`
    document.body.appendChild(a); a.click(); a.remove()
    setMsg({ ok: true, text: 'Calendar file downloaded — open it to add the shopping-day reminder and the festival day.' })
  }

  const save = async () => {
    if (!fest || !chosen.length) return
    setBusy(true); setMsg(null)
    try {
      const r = await api('POST', { festival_slug: slug, days_before: days, items: chosen.map(c => ({ dish: c.dish, variant: c.variant, servings: c.servings })) })
      setMsg(r.status === 201 ? { ok: true, text: `Done — we will email you the shopping list ${days === 0 ? 'on the day' : `${days} day${days > 1 ? 's' : ''} before`} ${fest.name}.` } : { ok: false, text: r.data.error || 'Could not save the reminder.' })
    } catch { setMsg({ ok: false, text: 'Could not reach the server. Please try again.' }) }
    setBusy(false)
  }

  const remove = async () => { setBusy(true); await api('DELETE', { festival_slug: slug }); setExisting(null); setMsg({ ok: true, text: 'Email reminder removed.' }); setBusy(false) }

  return (
    <div className="card card-p" style={{ borderTop: `4px solid ${accent}` }}>
      <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Bell size={18} style={{ color: accent }} /> Remind me with the shopping list
      </h3>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 14px' }}>
        Get the combined ingredient list before the festival — by email, or as a calendar reminder on your phone.
      </p>

      {!fixedSlug && (
        <label style={{ display: 'block', marginBottom: 12 }}>
          <span className="section-title" style={{ display: 'block', marginBottom: 6 }}>Festival</span>
          <select value={slug} onChange={e => { setSlug(e.target.value); setMsg(null) }} className="input" style={{ width: '100%', maxWidth: 420 }}>
            {festivals.map(f => <option key={f.slug} value={f.slug}>{f.name} — {f.display}</option>)}
          </select>
        </label>
      )}

      {selectable && (
        <div style={{ marginBottom: 12 }}>
          <span className="section-title" style={{ display: 'block', marginBottom: 6 }}>Recipes to include</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {items.map(i => (
              <label key={i.key} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={!!picked[i.key]} onChange={e => setPicked(p => ({ ...p, [i.key]: e.target.checked }))} /> {i.title}
              </label>
            ))}
          </div>
          <div style={{ marginTop: 10 }}>
            <span className="section-title" style={{ display: 'block', marginBottom: 6 }}>Servings of each</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SERVING_PRESETS.map(n => <button key={n} style={chip(servings === n)} onClick={() => setServings(n)}>{n}</button>)}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: 14 }}>
        <span className="section-title" style={{ display: 'block', marginBottom: 6 }}>Remind me</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[14, 7, 3, 2, 1, 0].map(d => <button key={d} style={chip(days === d)} onClick={() => setDays(d)}>{d === 0 ? 'On the day' : `${d} day${d > 1 ? 's' : ''} before`}</button>)}
        </div>
        {fest && dateOk && <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '8px 0 0' }}>{fest.name}: {fest.display}{fest.approx ? ' — approximate, confirm locally' : ''}</p>}
        {fest && !dateOk && <p style={{ fontSize: 12.5, color: '#9a3412', margin: '8px 0 0' }}>This festival has no fixed calendar date in our data, so a date reminder cannot be set for it.</p>}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" disabled={busy || !dateOk || !chosen.length} onClick={save} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, opacity: dateOk && chosen.length ? 1 : 0.5 }}><Mail size={16} /> Email me the list</button>
        <button className="btn btn-secondary" disabled={!dateOk || !chosen.length} onClick={download} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, opacity: dateOk && chosen.length ? 1 : 0.5 }}><CalendarPlus size={16} /> Add to my calendar</button>
        {existing && <button className="btn btn-secondary" disabled={busy} onClick={remove} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><Trash2 size={15} /> Remove email reminder</button>}
      </div>
      {existing && <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '10px 0 0' }}>An email reminder is already set for this festival ({existing.days_before === 0 ? 'on the day' : `${existing.days_before} days before`}). Saving again replaces it.</p>}
      {!chosen.length && <p style={{ fontSize: 12.5, color: '#9a3412', margin: '10px 0 0' }}>Add or tick at least one recipe first.</p>}
      {msg && <p role="status" style={{ fontSize: 13.5, margin: '12px 0 0', color: msg.ok ? '#15803d' : '#b91c1c', fontWeight: 600 }}>{msg.text}</p>}
    </div>
  )
}
