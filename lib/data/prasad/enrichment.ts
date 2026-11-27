// Extra editorial layers on top of the recipes: where each dish comes from,
// and per-version nutrition and fasting notes. Data lives in enrichment.data.ts.
import { DISH_INFO, VARIANT_INFO } from './enrichment.data'

export interface DishInfo {
  origin: string                                   // history of the dish and its place in worship (sourced)
  temples?: { name: string; place: string; note: string }[]   // temples/institutions known for it
  sources?: string[]
}

export interface VariantInfo {
  nutrition?: {
    portion: string        // "1 modak (about 55 g)"
    kcal: number
    carbs_g: number
    protein_g: number
    fat_g: number
    sugar_g?: number
  }
  allergens?: string[]     // "Milk", "Tree nuts (cashew)", "Gluten"
  fasting?: string         // vrat / ekadashi / navratri guidance for this exact recipe
  jain?: string            // what to change for a Jain household, if anything
  diabetic?: string        // practical note on sugar load and portion
}

export function dishInfo(dish: string): DishInfo | undefined {
  return DISH_INFO[dish]
}
export function variantInfo(dish: string, variant: string): VariantInfo | undefined {
  return VARIANT_INFO[dish + '/' + variant]
}
