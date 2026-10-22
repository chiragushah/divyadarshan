// Server-side: turn saved reminder items into a shopping list.
import { getRecipe, getVariant } from '@/lib/data/prasad'
import { baseServings } from './scale'
import type { BasketItem } from './merge'

export function itemsToBasket(items: { dish: string; variant: string; servings: number }[]): BasketItem[] {
  const out: BasketItem[] = []
  for (const it of items) {
    const r = getRecipe(it.dish)
    if (!r) continue
    const v = getVariant(r, it.variant)
    out.push({
      key: `${r.id}/${v.id}`, dish: r.id, variant: v.id, title: `${r.name} (${v.region})`, region: v.region,
      baseServes: baseServings(v.serves), servings: it.servings || baseServings(v.serves),
      lines: v.ingredients.flatMap(g => g.items.map(i => i.split(' — ')[0])),
    })
  }
  return out
}
