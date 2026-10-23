'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ChefHat, Check, Minus, Plus, Scale, ShoppingBasket, Timer, X, Eye, Sun, ChevronLeft, ChevronRight, AlertTriangle, MessageCircle, Printer, Link2 } from 'lucide-react'
import type { IngredientGroup } from '@/lib/data/prasad/types'
import { scaleLine, SERVING_PRESETS } from '@/lib/prasad/scale'
import { loadBasket, upsertBasket, removeFromBasket } from '@/lib/prasad/basket'

export interface KitStep { title: string; text: string; why?: string; cue?: string }

interface Props {
  dish: string
  variantId: string
  title: string
  region: string
  accent: string
  serves: string
  baseServes: number
  ingredients: IngredientGroup[]
  mise: string[]
  steps: KitStep[]
  offering: string
  ritual: string[]
}

// ───────────────────────── timers ─────────────────────────
interface TimerHit { label: string; seconds: number }
const TIME_RE = /(\d+(?:\.\d+)?)(?:\s*[–-]\s*(\d+(?:\.\d+)?))?\s*(seconds?|secs?|minutes?|mins?|hours?|hrs?)\b/gi

function findTimers(...texts: (string | undefined)[]): TimerHit[] {
  const out: TimerHit[] = []
  const seen = new Set<string>()
  for (const t of texts) {
    if (!t) continue
    TIME_RE.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = TIME_RE.exec(t))) {
      const u = m[3].toLowerCase()
      const mult = u.startsWith('h') ? 3600 : u.startsWith('s') ? 1 : 60
      const lo = parseFloat(m[1])
      const seconds = Math.round(lo * mult)
      if (seconds < 10 || seconds > 6 * 3600) continue
      const label = m[0].replace(/\s+/g, ' ')
      if (seen.has(label)) continue
      seen.add(label)
      out.push({ label, seconds })
    }
  }
  return out.slice(0, 4)
}

function fmtClock(s: number): string {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60
  return (h ? `${h}:${String(m).padStart(2, '0')}` : `${m}`) + `:${String(sec).padStart(2, '0')}`
}

function beep() {
  try {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext
    const ctx = new AC()
    for (let i = 0; i < 3; i++) {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.frequency.value = 880; o.connect(g); g.connect(ctx.destination)
      const t0 = ctx.currentTime + i * 0.45
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.4, t0 + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35)
      o.start(t0); o.stop(t0 + 0.4)
    }
  } catch { /* no audio */ }
  try { navigator.vibrate?.([300, 150, 300, 150, 300]) } catch { /* ignore */ }
}

interface RunTimer { id: number; label: string; endAt: number; done: boolean; step: string }

// ───────────────────────── main ─────────────────────────
export default function RecipeKit(p: Props) {
  const key = `${p.dish}/${p.variantId}`
  const [servings, setServings] = useState(p.baseServes)
  const [custom, setCustom] = useState('')
  const [inPlan, setInPlan] = useState(false)
  const [cook, setCook] = useState(false)
  const factor = servings / p.baseServes

  useEffect(() => {
    setServings(p.baseServes); setCustom('')
    const found = loadBasket().find(x => x.key === key)
    if (found) { setServings(found.servings); setInPlan(true) } else setInPlan(false)
  }, [key, p.baseServes])

  const flatLines = useMemo(() => p.ingredients.flatMap(g => g.items), [p.ingredients])

  const togglePlan = () => {
    if (inPlan) { removeFromBasket(key); setInPlan(false); return }
    upsertBasket({ key, dish: p.dish, variant: p.variantId, title: p.title, region: p.region, baseServes: p.baseServes, servings, lines: flatLines.map(l => l.split(' — ')[0]) })
    setInPlan(true)
  }
  const pageUrl = () => `${typeof window !== 'undefined' ? window.location.origin : 'https://divyadarshanam.org'}/festivals/prasad/${p.dish}?v=${p.variantId}`
  const waText = () => {
    const lines = p.ingredients.flatMap(g => g.items.map(i => '• ' + scaleLine(i, factor).split(' — ')[0]))
    return `*${p.title}* — ${p.region}\nQuantities for ${servings}\n\n${lines.join('\n')}\n\nFull recipe with every step explained:\n${pageUrl()}`
  }
  const [copied, setCopied] = useState(false)
  const copyLink = async () => { try { await navigator.clipboard.writeText(pageUrl()); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* ignore */ } }

  // keep a saved plan entry in step with the servings control
  useEffect(() => {
    if (!inPlan) return
    const cur = loadBasket().find(x => x.key === key)
    if (cur && cur.servings !== servings) upsertBasket({ ...cur, servings })
  }, [servings, inPlan, key])

  const applyCustom = (v: string) => {
    setCustom(v)
    const n = parseInt(v, 10)
    if (n >= 1 && n <= 1000) setServings(n)
  }

  const chip = (active: boolean): React.CSSProperties => ({
    padding: '7px 13px', borderRadius: 100, fontSize: 13, fontWeight: 700, cursor: 'pointer',
    border: `1.5px solid ${active ? p.accent : 'var(--ivory3)'}`, background: active ? p.accent : 'white', color: active ? 'white' : 'var(--ink2)',
  })

  return (
    <>
      {/* toolbar */}
      <div style={{ background: `${p.accent}0d`, border: `1px solid ${p.accent}33`, borderRadius: 14, padding: 16, marginBottom: 18 }}>
        <div className="section-title" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Scale size={14} style={{ color: p.accent }} /> How many are you serving?
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <button style={chip(servings === p.baseServes && !custom)} onClick={() => { setServings(p.baseServes); setCustom('') }}>As written ({p.baseServes})</button>
          {SERVING_PRESETS.filter(n => n !== p.baseServes).map(n => (
            <button key={n} style={chip(servings === n && !custom)} onClick={() => { setServings(n); setCustom('') }}>{n}</button>
          ))}
          <input
            inputMode="numeric" value={custom} onChange={e => applyCustom(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="Other" aria-label="Number of servings"
            style={{ width: 74, padding: '7px 10px', borderRadius: 100, border: `1.5px solid ${custom ? p.accent : 'var(--ivory3)'}`, fontSize: 13, fontWeight: 700 }}
          />
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '8px 0 0', lineHeight: 1.55 }}>
          Written for <strong>{p.serves}</strong>. {factor !== 1 && <>Showing quantities for <strong>{servings}</strong> (×{Math.round(factor * 100) / 100}). </>}
          {factor > 3 && <span style={{ color: '#9a3412' }}>For a big batch, cook in several rounds of the written size rather than one huge pot — sugar syrups, doughs and tempering do not scale in a straight line, and spices usually need less than the maths says.</span>}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 }}>
          <button onClick={() => setCook(true)} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><ChefHat size={16} /> Start cook mode</button>
          <button onClick={togglePlan} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            {inPlan ? <><Check size={16} /> In your puja plan — remove</> : <><ShoppingBasket size={16} /> Add to “Plan my puja”</>}
          </button>
          {inPlan && <Link href="/festivals/prasad/plan" className="btn btn-secondary">View shopping list</Link>}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          <a href={`https://wa.me/?text=${encodeURIComponent(waText())}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><MessageCircle size={16} /> Share on WhatsApp</a>
          <Link href={`/festivals/prasad/${p.dish}/card?v=${p.variantId}&s=${servings}`} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><Printer size={16} /> Printable card</Link>
          <button onClick={copyLink} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>{copied ? <><Check size={16} /> Link copied</> : <><Link2 size={16} /> Copy link</>}</button>
        </div>
      </div>

      {/* ingredients (scaled) */}
      <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Scale size={18} style={{ color: p.accent }} /> Ingredients {factor !== 1 && <span style={{ fontSize: 13, color: p.accent, fontWeight: 700 }}>· for {servings}</span>}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 26 }}>
        {p.ingredients.map((g, gi) => (
          <div key={gi} style={{ background: 'var(--ivory2)', border: '1px solid var(--ivory3)', borderRadius: 12, padding: 16 }}>
            {g.group && <div style={{ fontSize: 13.5, fontWeight: 700, color: p.accent, marginBottom: 8 }}>{g.group}</div>}
            <Lines items={g.items.map(i => scaleLine(i, factor))} accent={p.accent} />
          </div>
        ))}
      </div>

      {cook && <CookMode {...p} servings={servings} factor={factor} onClose={() => setCook(false)} />}
    </>
  )
}

function Lines({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
      {items.map((it, i) => {
        const k = it.indexOf(' — ')
        const main = k > -1 ? it.slice(0, k) : it
        const note = k > -1 ? it.slice(k + 3) : ''
        return (
          <li key={i} style={{ display: 'flex', gap: 9, fontSize: 14, color: 'var(--ink2)', lineHeight: 1.6 }}>
            <span aria-hidden style={{ width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0, marginTop: 9 }} />
            <span>
              <span style={{ color: 'var(--ink)' }}>{main}</span>
              {note && <span style={{ display: 'block', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginTop: 1 }}>{note}</span>}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

// ───────────────────────── cook mode ─────────────────────────
function CookMode(p: Props & { servings: number; factor: number; onClose: () => void }) {
  // pages: 0 = gather, 1..n = steps, n+1 = offer
  const n = p.steps.length
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(1) // 0 = large, 1 = larger, 2 = largest
  const [timers, setTimers] = useState<RunTimer[]>([])
  const [now, setNow] = useState(Date.now())
  const [awake, setAwake] = useState<'on' | 'off' | 'unsupported'>('off')
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [showWhy, setShowWhy] = useState(false)
  const idRef = useRef(1)
  const lockRef = useRef<any>(null)
  const touch = useRef<number | null>(null)

  // wake lock
  useEffect(() => {
    let cancelled = false
    const acquire = async () => {
      try {
        const nav: any = navigator
        if (!nav.wakeLock) { setAwake('unsupported'); return }
        lockRef.current = await nav.wakeLock.request('screen')
        if (!cancelled) setAwake('on')
        lockRef.current.addEventListener?.('release', () => { if (!cancelled) setAwake('off') })
      } catch { setAwake('off') }
    }
    acquire()
    const vis = () => { if (document.visibilityState === 'visible') acquire() }
    document.addEventListener('visibilitychange', vis)
    return () => { cancelled = true; document.removeEventListener('visibilitychange', vis); try { lockRef.current?.release() } catch { /* ignore */ } }
  }, [])

  // body scroll lock + keys
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') p.onClose()
      if (e.key === 'ArrowRight') setPage(x => Math.min(n + 1, x + 1))
      if (e.key === 'ArrowLeft') setPage(x => Math.max(0, x - 1))
    }
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', key) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n])

  // timer tick
  useEffect(() => {
    if (!timers.some(t => !t.done)) return
    const h = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(h)
  }, [timers])
  useEffect(() => {
    const finished = timers.filter(t => !t.done && t.endAt <= now)
    if (finished.length) {
      beep()
      setTimers(ts => ts.map(t => (!t.done && t.endAt <= now ? { ...t, done: true } : t)))
    }
  }, [now, timers])

  const startTimer = useCallback((hit: TimerHit, step: string) => {
    setTimers(ts => [...ts, { id: idRef.current++, label: hit.label, endAt: Date.now() + hit.seconds * 1000, done: false, step }])
    setNow(Date.now())
  }, [])

  const fontPx = [20, 25, 31][size]
  const st = page >= 1 && page <= n ? p.steps[page - 1] : null
  const hits = st ? findTimers(st.text, st.cue) : []
  const scaledAll = p.ingredients.map(g => ({ group: g.group, items: g.items.map(i => scaleLine(i, p.factor)) }))

  const btn: React.CSSProperties = { background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.28)', borderRadius: 100, padding: '8px 14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }

  return (
    <div
      role="dialog" aria-modal="true" aria-label={`Cook mode — ${p.title}`}
      onTouchStart={e => { touch.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touch.current == null) return
        const dx = e.changedTouches[0].clientX - touch.current; touch.current = null
        if (Math.abs(dx) > 80) setPage(x => dx < 0 ? Math.min(n + 1, x + 1) : Math.max(0, x - 1))
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#1a1210', color: '#fdf6ec', display: 'flex', flexDirection: 'column' }}
    >
      {/* top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.14)', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.7, fontWeight: 700 }}>
            Cook mode · {page === 0 ? 'Gather' : page === n + 1 ? 'Offer' : `Step ${page} of ${n}`}
          </div>
          <div className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>{p.title} <span style={{ opacity: 0.7, fontSize: 14 }}>· for {p.servings}</span></div>
        </div>
        <button style={btn} onClick={() => setSize(s => Math.max(0, s - 1))} aria-label="Smaller text"><Minus size={14} /> A</button>
        <button style={btn} onClick={() => setSize(s => Math.min(2, s + 1))} aria-label="Bigger text"><Plus size={14} /> A</button>
        <span title={awake === 'on' ? 'Screen will stay on' : awake === 'unsupported' ? 'This browser cannot keep the screen on' : 'Screen may dim'} style={{ ...btn, background: 'transparent', cursor: 'default', opacity: 0.85 }}>
          <Sun size={14} /> {awake === 'on' ? 'Screen stays on' : awake === 'unsupported' ? 'Screen may dim' : 'Screen may dim'}
        </span>
        <button style={{ ...btn, background: '#8B1A1A', borderColor: '#8B1A1A' }} onClick={p.onClose}><X size={15} /> Close</button>
      </div>

      {/* progress */}
      <div style={{ height: 4, background: 'rgba(255,255,255,0.12)' }}>
        <div style={{ height: 4, width: `${(page / (n + 1)) * 100}%`, background: p.accent === '#8B1A1A' ? '#E07A3F' : p.accent, transition: 'width .25s' }} />
      </div>

      {/* body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '22px 20px 12px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', fontSize: fontPx, lineHeight: 1.6 }}>
          {page === 0 && (
            <>
              <h2 className="font-serif" style={{ fontSize: fontPx + 8, fontWeight: 600, color: 'white', marginBottom: 6 }}>Gather everything first</h2>
              <p style={{ fontSize: fontPx - 6, opacity: 0.75, marginBottom: 16 }}>Tap an item to tick it off. Quantities are for {p.servings}.</p>
              {scaledAll.map((g, gi) => (
                <div key={gi} style={{ marginBottom: 18 }}>
                  {g.group && <div style={{ fontWeight: 700, color: '#F4B183', marginBottom: 6, fontSize: fontPx - 3 }}>{g.group}</div>}
                  {g.items.map((it, i) => {
                    const id = `${gi}-${i}`
                    const main = it.split(' — ')[0]
                    return (
                      <button key={id} onClick={() => setChecked(c => ({ ...c, [id]: !c[id] }))}
                        style={{ display: 'flex', gap: 12, alignItems: 'flex-start', width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'inherit', fontSize: fontPx - 3, padding: '8px 0', cursor: 'pointer', textDecoration: checked[id] ? 'line-through' : 'none', opacity: checked[id] ? 0.45 : 1, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ width: 26, height: 26, flexShrink: 0, borderRadius: 7, border: '2px solid rgba(255,255,255,0.5)', background: checked[id] ? '#4ade80' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                          {checked[id] && <Check size={16} color="#1a1210" />}
                        </span>
                        <span>{main}</span>
                      </button>
                    )
                  })}
                </div>
              ))}
              {p.mise.length > 0 && (
                <>
                  <h3 className="font-serif" style={{ fontSize: fontPx + 2, fontWeight: 600, color: 'white', margin: '24px 0 8px' }}>Before you start</h3>
                  <ul style={{ paddingLeft: 22, margin: 0, fontSize: fontPx - 4 }}>{p.mise.map((m, i) => <li key={i} style={{ marginBottom: 8 }}>{m.split(' — ')[0]}{m.includes(' — ') && <div style={{ opacity: 0.7, fontSize: fontPx - 7 }}>{m.split(' — ').slice(1).join(' — ')}</div>}</li>)}</ul>
                </>
              )}
            </>
          )}

          {st && (
            <>
              <div style={{ display: 'inline-flex', width: 46, height: 46, borderRadius: '50%', background: p.accent === '#8B1A1A' ? '#C0570A' : p.accent, color: 'white', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>{page}</div>
              {st.title && <h2 className="font-serif" style={{ fontSize: fontPx + 8, fontWeight: 600, color: 'white', marginBottom: 12, lineHeight: 1.25 }}>{st.title}</h2>}
              <p style={{ margin: '0 0 18px' }}>{st.text}</p>
              {st.cue && (
                <div style={{ display: 'flex', gap: 10, background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.4)', borderRadius: 12, padding: '12px 16px', fontSize: fontPx - 3, marginBottom: 16 }}>
                  <Eye size={22} style={{ flexShrink: 0, marginTop: 4 }} /> <span><strong>It’s right when: </strong>{st.cue}</span>
                </div>
              )}
              {hits.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                  {hits.map(h => (
                    <button key={h.label} onClick={() => startTimer(h, st.title || `Step ${page}`)}
                      style={{ ...btn, background: '#C0570A', borderColor: '#C0570A', fontSize: Math.min(fontPx - 4, 20), padding: '12px 20px' }}>
                      <Timer size={18} /> Start timer · {h.label}
                    </button>
                  ))}
                </div>
              )}
              {st.why && (
                <div>
                  <button onClick={() => setShowWhy(s => !s)} style={{ ...btn, fontSize: 13 }}>{showWhy ? 'Hide' : 'Why this step?'}</button>
                  {showWhy && <p style={{ fontSize: fontPx - 5, opacity: 0.85, marginTop: 10 }}>{st.why}</p>}
                </div>
              )}
            </>
          )}

          {page === n + 1 && (
            <>
              <h2 className="font-serif" style={{ fontSize: fontPx + 8, fontWeight: 600, color: 'white', marginBottom: 10 }}>Now offer it</h2>
              <p style={{ margin: '0 0 16px' }}>{p.offering}</p>
              {p.ritual.length > 0 && (
                <ol style={{ paddingLeft: 24, margin: 0, fontSize: fontPx - 3 }}>
                  {p.ritual.map((r, i) => <li key={i} style={{ marginBottom: 12 }}>{r}</li>)}
                </ol>
              )}
              <p style={{ fontSize: fontPx - 7, opacity: 0.65, marginTop: 20 }}>The offering verses are on the recipe page, under “Words for the offering”.</p>
            </>
          )}
        </div>
      </div>

      {/* timers */}
      {timers.length > 0 && (
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.14)', background: '#241915' }}>
          {timers.map(t => {
            const left = Math.max(0, Math.ceil((t.endAt - now) / 1000))
            return (
              <div key={t.id} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 12, background: t.done ? '#b91c1c' : 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                {t.done ? <AlertTriangle size={20} /> : <Timer size={20} />}
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{t.done ? 'Time’s up' : fmtClock(left)}</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{t.step} · {t.label}</div>
                </div>
                <button aria-label="Dismiss timer" onClick={() => setTimers(ts => ts.filter(x => x.id !== t.id))} style={{ ...btn, padding: '4px 8px' }}><X size={14} /></button>
              </div>
            )
          })}
        </div>
      )}

      {/* nav */}
      <div style={{ display: 'flex', gap: 12, padding: '12px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
        <button disabled={page === 0} onClick={() => { setPage(x => Math.max(0, x - 1)); setShowWhy(false) }}
          style={{ ...btn, flex: 1, justifyContent: 'center', padding: '16px', fontSize: 18, opacity: page === 0 ? 0.35 : 1 }}><ChevronLeft size={22} /> Back</button>
        {page < n + 1 ? (
          <button onClick={() => { setPage(x => Math.min(n + 1, x + 1)); setShowWhy(false) }}
            style={{ ...btn, flex: 2, justifyContent: 'center', padding: '16px', fontSize: 18, background: p.accent === '#8B1A1A' ? '#C0570A' : p.accent, borderColor: 'transparent' }}>
            {page === 0 ? 'Start cooking' : page === n ? 'Ready to offer' : 'Next step'} <ChevronRight size={22} />
          </button>
        ) : (
          <button onClick={p.onClose} style={{ ...btn, flex: 2, justifyContent: 'center', padding: '16px', fontSize: 18, background: '#15803d', borderColor: 'transparent' }}><Check size={20} /> Done</button>
        )}
      </div>
    </div>
  )
}
