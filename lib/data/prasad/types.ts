// ─────────────────────────────────────────────────────────────────────────
//  Prasad recipes — editorial reference content for DivyaDarshanam.
//  One PrasadRecipe = one dish (e.g. "Modak"). Each dish has several
//  variants, because the same prasad is made differently by state and by
//  community (Ukadiche modak in Maharashtra vs Kozhukattai in Tamil Nadu).
//  Every variant is a complete, cookable recipe.
// ─────────────────────────────────────────────────────────────────────────

export type RecipeCategory =
  | 'Sweet'
  | 'Drink'
  | 'Rice & Grain'
  | 'Savoury'
  | 'Offering mix'
  | 'Full offering (bhog menu)'

export interface IngredientGroup {
  group?: string        // e.g. "For the filling"
  items: string[]       // "1 cup (200 g) rice flour", ...
}

export interface RecipeVariant {
  id: string            // url-safe, unique within the dish: 'maharashtra'
  region: string        // state / region: 'Maharashtra'
  culture: string       // community / tradition: 'Konkan & Deshastha households'
  title: string         // local name of this version: 'Ukadiche Modak'
  intro: string         // what makes THIS version different, 2–3 sentences
  serves: string        // '4–5 people (about 21 modaks)'
  prep: string          // '30 min'
  cook: string          // '20 min'
  ingredients: IngredientGroup[]
  method: string[]      // numbered steps, complete sentences
  offering: string      // how it is offered: quantity, timing, rules
  tips: string[]        // texture, substitutions, common mistakes
  differs?: string      // one-line "what changes elsewhere" for the compare table
  seeAlso?: { dish: string; variant?: string; label: string }[]   // component recipes on this site
}

export interface PrasadRecipe {
  id: string            // url slug: 'modak'
  name: string          // 'Modak'
  alsoCalled?: string   // other names, incl. native script
  category: RecipeCategory
  summary: string       // one line for cards
  meaning: string       // significance + why it differs from place to place
  variants: RecipeVariant[]
}
