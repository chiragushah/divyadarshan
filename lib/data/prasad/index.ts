import type { PrasadRecipe, RecipeVariant } from './types'
import { DRINK_RECIPES } from './drinks'
import { SWEETS_1 } from './sweets1'
import { SWEETS_2 } from './sweets2'
import { SWEETS_3 } from './sweets3'
import { SAVOURY } from './savoury'
import { MENUS } from './menus'
import { FESTIVAL_PRASAD } from './festivalPrasad'
import type { PrasadEntry } from './festivalPrasad'

export type { PrasadRecipe, RecipeVariant } from './types'
export type { PrasadEntry } from './festivalPrasad'
export { FESTIVAL_PRASAD } from './festivalPrasad'

export const PRASAD_RECIPES: PrasadRecipe[] = [
  ...DRINK_RECIPES,
  ...SWEETS_1,
  ...SWEETS_2,
  ...SWEETS_3,
  ...SAVOURY,
  ...MENUS,
]

const BY_ID = new Map(PRASAD_RECIPES.map(r => [r.id, r]))

export function getRecipe(id: string): PrasadRecipe | undefined {
  return BY_ID.get(id)
}

export function getVariant(recipe: PrasadRecipe, variantId?: string | null): RecipeVariant {
  return recipe.variants.find(v => v.id === variantId) || recipe.variants[0]
}

/** Every festival (slug + the variant it uses) that offers this dish. */
export function festivalsFor(dishId: string): { festival: string; variant?: string }[] {
  const out: { festival: string; variant?: string }[] = []
  for (const [festival, fp] of Object.entries(FESTIVAL_PRASAD)) {
    for (const e of fp.entries) {
      if (e.kind === 'recipe' && e.dish === dishId) out.push({ festival, variant: e.variant })
    }
  }
  return out
}

export function entriesForFestival(slug: string): { intro?: string; entries: PrasadEntry[] } | undefined {
  return FESTIVAL_PRASAD[slug]
}

export function recipeHref(dish: string, variant?: string, from?: string): string {
  const qs = new URLSearchParams()
  if (variant) qs.set('v', variant)
  if (from) qs.set('from', from)
  const q = qs.toString()
  return `/festivals/prasad/${dish}${q ? `?${q}` : ''}`
}
