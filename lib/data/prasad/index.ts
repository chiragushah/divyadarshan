import type { PrasadRecipe, RecipeVariant } from './types'
import d0 from './dishes/panchamrit'
import d1 from './dishes/charanamrit'
import d2 from './dishes/panakam'
import d3 from './dishes/thandai'
import d4 from './dishes/pana'
import d5 from './dishes/ugadi-pachadi'
import d6 from './dishes/modak'
import d7 from './dishes/puran-poli'
import d8 from './dishes/gujiya'
import d9 from './dishes/panjiri'
import d10 from './dishes/makhan-mishri'
import d11 from './dishes/tilgul'
import d12 from './dishes/laddu'
import d13 from './dishes/kheer-payasam'
import d14 from './dishes/halwa-sheera'
import d15 from './dishes/sweet-pongal'
import d16 from './dishes/thekua'
import d17 from './dishes/aravana-payasam'
import d18 from './dishes/appam'
import d19 from './dishes/pitha'
import d20 from './dishes/ghewar'
import d21 from './dishes/khaja'
import d22 from './dishes/narali-bhat'
import d23 from './dishes/narkel-naru-sandesh'
import d24 from './dishes/sev-ravo'
import d25 from './dishes/karthigai-pori'
import d26 from './dishes/kheel-batasha'
import d27 from './dishes/diwali-faral'
import d28 from './dishes/lohri-til-rewari'
import d29 from './dishes/sunthavda'
import d30 from './dishes/pinda'
import d31 from './dishes/puliyodarai'
import d32 from './dishes/ven-pongal'
import d33 from './dishes/khichdi-bhog'
import d34 from './dishes/labra'
import d35 from './dishes/dalma'
import d36 from './dishes/sundal'
import d37 from './dishes/kosambari'
import d38 from './dishes/gopalkala'
import d39 from './dishes/krishna-snacks'
import d40 from './dishes/kanya-pujan'
import d41 from './dishes/tahiri-akha'
import d42 from './dishes/chhappan-bhog'
import d43 from './dishes/annakut'
import d44 from './dishes/puri-mahaprasad'
import { FESTIVAL_PRASAD } from './festivalPrasad'
import type { PrasadEntry } from './festivalPrasad'

export type { PrasadRecipe, RecipeVariant } from './types'
export type { PrasadEntry } from './festivalPrasad'
export { FESTIVAL_PRASAD } from './festivalPrasad'

export const PRASAD_RECIPES: PrasadRecipe[] = [
  d0,
  d1,
  d2,
  d3,
  d4,
  d5,
  d6,
  d7,
  d8,
  d9,
  d10,
  d11,
  d12,
  d13,
  d14,
  d15,
  d16,
  d17,
  d18,
  d19,
  d20,
  d21,
  d22,
  d23,
  d24,
  d25,
  d26,
  d27,
  d28,
  d29,
  d30,
  d31,
  d32,
  d33,
  d34,
  d35,
  d36,
  d37,
  d38,
  d39,
  d40,
  d41,
  d42,
  d43,
  d44,
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
