// Quantity parsing and scaling for recipe ingredient lines.
// Only the LEADING quantity of a line (and a metric figure in the first
// parenthesis) is scaled — "soaked for 30 minutes" is never touched.

const FRAC: Record<string, number> = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': 0.125, '⅜': 0.375 }
const NUM = String.raw`(?:\d+\s+\d\/\d|\d+\/\d+|\d+[½¼¾⅓⅔⅛⅜]|[½¼¾⅓⅔⅛⅜]|\d+(?:\.\d+)?)`
const RANGE = String.raw`${NUM}(?:\s*(?:–|-|to)\s*${NUM})?`
const UNIT = String.raw`(?:cups?|tbsp|tsp|tablespoons?|teaspoons?|kg|g|gm|grams?|ml|l|litres?|liters?|oz|lb|pinch(?:es)?|handfuls?|cloves?|sticks?|sprigs?|leaves|leaf|pods?|pieces?|inch|cm)`
const LEAD = new RegExp(String.raw`^(\s*)(${RANGE})(\s*)(${UNIT}\b)?(\s*\([^)]*\))?`, 'i')

export function parseNumber(tok: string): number {
  const t = tok.trim()
  if (/^\d+\s+\d\/\d$/.test(t)) { const [w, f] = t.split(/\s+/); const [a, b] = f.split('/'); return +w + +a / +b }
  if (/^\d+\/\d+$/.test(t)) { const [a, b] = t.split('/'); return +a / +b }
  const m = t.match(/^(\d+)?([½¼¾⅓⅔⅛⅜])$/)
  if (m) return (m[1] ? +m[1] : 0) + FRAC[m[2]]
  return parseFloat(t)
}

function niceFraction(n: number): string {
  const whole = Math.floor(n + 1e-9)
  const frac = n - whole
  const opts: [number, string][] = n < 1 ? [[0, ''], [0.125, '⅛'], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾'], [1, '']] : [[0, ''], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾'], [1, '']]
  let best = opts[0], d = 9
  for (const o of opts) { const dd = Math.abs(frac - o[0]); if (dd < d) { d = dd; best = o } }
  let w = whole
  if (best[0] === 1) w += 1
  const f = best[1]
  if (w === 0 && !f) return n > 0 ? '⅛' : '0'
  return `${w ? w : ''}${f}`
}

export function formatQty(n: number, unit: string): string {
  const u = unit.toLowerCase()
  if (['g', 'gm', 'gram', 'grams', 'ml'].includes(u)) {
    if (n >= 100) return String(Math.round(n / 5) * 5)
    return String(Math.round(n))
  }
  const isCount = !u || /^(pods?|cloves?|leaves|leaf|pieces?|sticks?|sprigs?|pinch(?:es)?|handfuls?)$/.test(u)
  if (isCount && n >= 5) return String(Math.round(n))
  if (n >= 20) return String(Math.round(n))
  if (n >= 10) return String(Math.round(n * 2) / 2).replace(/\.5$/, '½')
  return niceFraction(n)
}

function rangeParts(r: string): number[] {
  return r.split(/\s*(?:–|-|\bto\b)\s*/i).map(parseNumber)
}

interface Lead { pre: string; nums: number[]; unit: string; paren: string; rest: string; gap: string }

export function parseLead(line: string): Lead | null {
  const m = line.match(LEAD)
  if (!m) return null
  const nums = rangeParts(m[2])
  if (nums.some(n => !isFinite(n))) return null
  const unit = m[4] || ''
  // "2 inch piece" / "3 cm" are sizes, not amounts
  if (/^(inch|cm)$/i.test(unit)) return null
  return { pre: m[1], nums, gap: m[3], unit, paren: m[5] || '', rest: line.slice(m[0].length) }
}

// Scale a quantity+unit pair, returning display text for the amount and the unit to show.
function scaleQty(nums: number[], unit: string, factor: number): { qty: string; unit: string } {
  const scaled = nums.map(n => n * factor)
  const hi = scaled[scaled.length - 1]
  const u = unit.toLowerCase()
  if (/^(tsp|teaspoons?)$/.test(u) && hi >= 3) return { qty: scaled.map(s => formatQty(s / 3, 'tbsp')).join('–'), unit: 'tbsp' }
  if (/^(tbsp|tablespoons?)$/.test(u) && hi >= 8) return { qty: scaled.map(s => formatQty(s / 16, 'cup')).join('–'), unit: 'cup' }
  if (/^(g|gm|grams?)$/.test(u) && hi >= 1000) return { qty: scaled.map(s => String(Math.round(s / 100) / 10)).join('–'), unit: 'kg' }
  if (u === 'ml' && hi >= 1000) return { qty: scaled.map(s => String(Math.round(s / 100) / 10)).join('–'), unit: 'litres' }
  return { qty: scaled.map(s => formatQty(s, unit)).join('–'), unit }
}

function plural(unit: string, qty: string): string {
  const many = !/^(½|¼|⅓|⅔|¾|⅛|1|0)$/.test(qty) && !/^[\d.]+$/.test(qty) ? true : parseFloat(qty) > 1 || /^\d+[½¼¾⅓⅔⅛]/.test(qty)
  if (/^cups?$/i.test(unit)) return many ? 'cups' : 'cup'
  if (/^tbsp$/i.test(unit) || /^tsp$/i.test(unit)) return unit
  return unit
}

// Any "(… 100 g …)" style parenthetical in the main text is scaled too, so cup and gram figures stay in step.
function scaleParens(text: string, factor: number): string {
  return text.replace(/\(([^)]*)\)/g, (all, inner: string) => {
    const re = new RegExp(String.raw`(${RANGE})(\s*)(${UNIT})\b`, 'gi')
    let changed = false
    const out = inner.replace(re, (m, r: string, sp: string, un: string) => {
      if (/^(inch|cm)$/i.test(un)) return m
      const ns = rangeParts(r)
      if (ns.some(n => !isFinite(n))) return m
      changed = true
      const sc = scaleQty(ns, un, factor)
      return `${sc.qty}${sp}${plural(sc.unit, sc.qty)}`
    })
    return changed ? `(${out})` : all
  })
}

export function scaleLine(line: string, factor: number): string {
  if (Math.abs(factor - 1) < 1e-9) return line
  const k = line.indexOf(' — ')
  const main = k > -1 ? line.slice(0, k) : line
  const note = k > -1 ? line.slice(k) : ''
  const lead = parseLead(main)
  if (!lead) return line
  const sc = scaleQty(lead.nums, lead.unit, factor)
  const unitOut = lead.unit ? plural(sc.unit, sc.qty) : ''
  const head = `${lead.pre}${sc.qty}${lead.unit ? lead.gap + unitOut : lead.gap}`
  return scaleParens(`${head}${lead.paren}${lead.rest}`, factor) + note
}

/** First whole number in a "serves" string: "4–5 people (about 12 modaks)" → 4 */
export function baseServings(serves: string): number {
  const m = serves.match(/\d+/)
  const n = m ? parseInt(m[0], 10) : 4
  return n > 0 ? n : 4
}

export const SERVING_PRESETS = [5, 11, 21, 51, 108]
