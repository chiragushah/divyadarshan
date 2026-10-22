// Combine ingredient lines from several recipes into one shopping list.
import { parseLead, scaleLine, formatQty } from './scale'

export interface BasketItem {
  key: string            // `${dish}/${variant}`
  dish: string
  variant: string
  title: string
  region: string
  baseServes: number
  servings: number       // chosen number of servings
  lines: string[]        // unscaled ingredient lines (main text only)
}

export interface ShopLine { name: string; qty: string; from: string[]; category: string }

type Fam = 'vol' | 'wt' | 'ml' | 'count'
const TO_BASE: Record<string, { fam: Fam; mult: number }> = {
  tsp: { fam: 'vol', mult: 1 }, teaspoon: { fam: 'vol', mult: 1 }, teaspoons: { fam: 'vol', mult: 1 },
  tbsp: { fam: 'vol', mult: 3 }, tablespoon: { fam: 'vol', mult: 3 }, tablespoons: { fam: 'vol', mult: 3 },
  cup: { fam: 'vol', mult: 48 }, cups: { fam: 'vol', mult: 48 },
  g: { fam: 'wt', mult: 1 }, gm: { fam: 'wt', mult: 1 }, gram: { fam: 'wt', mult: 1 }, grams: { fam: 'wt', mult: 1 }, kg: { fam: 'wt', mult: 1000 },
  ml: { fam: 'ml', mult: 1 }, l: { fam: 'ml', mult: 1000 }, litre: { fam: 'ml', mult: 1000 }, litres: { fam: 'ml', mult: 1000 }, liter: { fam: 'ml', mult: 1000 }, liters: { fam: 'ml', mult: 1000 },
}

const CATS: [string, RegExp][] = [
  ['Dairy', /\b(milk|ghee|curd|yogurt|butter|paneer|khoa|mawa|cream|buttermilk|malai)\b/],
  ['Fresh produce & leaves', /\b(banana|mango|coconut|lemon|lime|leaves|leaf|tulsi|mint|coriander|ginger|chilli|chili|pumpkin|potato|carrot|radish|jackfruit|pomegranate|fruit|flower|petal|curry leaf|neem|cucumber|tomato)\b/],
  ['Dry fruits & nuts', /\b(almond|cashew|raisin|pista|pistachio|walnut|peanut|makhana|dates?|dry fruit|charoli|chironji|poppy|melon seed|fig|apricot|nuts?)\b/],
  ['Sugar, jaggery & sweeteners', /\b(sugar|jaggery|honey|mishri|batasha|candy|syrup|gur)\b/],
  ['Grains, flours & pulses', /\b(rice|flour|atta|maida|besan|suji|rava|semolina|dal|gram|urad|moong|chana|wheat|sabudana|sago|oats|poha|vermicelli|beaten|puffed|sesame|til|lentil)\b/],
  ['Spices & flavourings', /\b(cardamom|elaichi|saffron|kesar|clove|cinnamon|pepper|cumin|jeera|mustard|turmeric|asafoetida|hing|nutmeg|salt|camphor|rose|kewra|tamarind|fennel|ajwain|chilli powder|coriander seed|spice|masala|vanilla|nutmeg)\b/],
]

export function categoryOf(name: string): string {
  const n = name.toLowerCase()
  for (const [c, re] of CATS) if (re.test(n)) return c
  return 'Other & to taste'
}

function normName(rest: string): string {
  return rest
    .replace(/\([^)]*\)/g, ' ')
    .split(/,|;| – |\bor\b/i)[0]
    .replace(/^\s*(of|x)\s+/i, '')
    .replace(/\b(fresh|freshly|good|quality|fine|finely|thick|thin|ripe|raw|large|medium|small|ground|powdered|pure|organic|homemade)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

export function buildShoppingList(items: BasketItem[]): ShopLine[] {
  const acc = new Map<string, { name: string; amounts: Map<Fam, number>; plain: string[]; from: Set<string> }>()
  for (const it of items) {
    const factor = it.servings / it.baseServes
    for (const raw of it.lines) {
      const main = raw.split(' — ')[0]
      const scaled = scaleLine(main, factor)
      const lead = parseLead(scaled.replace(/½/g, '.5')) // quick path unusable for fractions; reparse below
      const l2 = parseLead(scaled)
      const lead2 = l2 || lead
      let name: string, fam: Fam | null = null, amount = 0
      if (lead2) {
        const unit = lead2.unit.toLowerCase()
        const hi = lead2.nums[lead2.nums.length - 1]
        name = normName(lead2.rest)
        const conv = TO_BASE[unit]
        if (conv) { fam = conv.fam; amount = hi * conv.mult }
        else { fam = 'count'; amount = hi }
        if (!name) name = normName(lead2.paren.replace(/[()]/g, ''))
      } else {
        name = normName(main)
      }
      if (!name) continue
      const e = acc.get(name) || { name, amounts: new Map(), plain: [], from: new Set<string>() }
      if (fam) e.amounts.set(fam, (e.amounts.get(fam) || 0) + amount)
      else if (!e.plain.includes(main)) e.plain.push(main)
      e.from.add(it.title)
      acc.set(name, e)
    }
  }
  const out: ShopLine[] = []
  acc.forEach(e => {
    const parts: string[] = []
    const v = e.amounts.get('vol'); if (v) parts.push(fmtVol(v))
    const w = e.amounts.get('wt'); if (w) parts.push(w >= 1000 ? `${Math.round(w / 100) / 10} kg` : `${formatQty(w, 'g')} g`)
    const m = e.amounts.get('ml'); if (m) parts.push(m >= 1000 ? `${Math.round(m / 100) / 10} litres` : `${formatQty(m, 'ml')} ml`)
    const c = e.amounts.get('count'); if (c) parts.push(formatQty(c, ''))
    if (!parts.length && e.plain.length) parts.push('as needed')
    out.push({ name: e.name, qty: parts.join(' + '), from: Array.from(e.from), category: categoryOf(e.name) })
  })
  return out.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
}

function fmtVol(tsp: number): string {
  if (tsp >= 48) return `${formatQty(tsp / 48, 'cup')} cup${tsp / 48 > 1.2 ? 's' : ''}`
  if (tsp >= 3) return `${formatQty(tsp / 3, 'tbsp')} tbsp`
  return `${formatQty(tsp, 'tsp')} tsp`
}

export function shoppingText(title: string, list: ShopLine[]): string {
  const cats = Array.from(new Set(list.map(l => l.category)))
  const parts = [title, '']
  for (const c of cats) {
    parts.push(c.toUpperCase())
    for (const l of list.filter(x => x.category === c)) parts.push(`• ${l.name}${l.qty ? ' — ' + l.qty : ''}`)
    parts.push('')
  }
  parts.push('From DivyaDarshanam · divyadarshanam.org')
  return parts.join('\n')
}
