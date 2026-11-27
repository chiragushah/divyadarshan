import type { RecipeVariant } from './types'
import type { DietTag } from './diet'
// Additional regional versions, appended to the dish's own variants by index.ts.
export const EXTRA_VARIANTS: Record<string, RecipeVariant[]> = {}
export const EXTRA_DIET: Record<string, DietTag[]> = {}
