// ─────────────────────────────────────────────────────────────────────────
//  Prasad recipes — editorial reference content for DivyaDarshanam.
//  One PrasadRecipe = one dish (e.g. "Modak"). Each dish has several
//  variants, because the same prasad is made differently by state and by
//  community (Ukadiche modak in Maharashtra vs Kozhukattai in Tamil Nadu).
//  Every variant is a complete, cookable, fully explained recipe.
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
  // Each item is "quantity ingredient". Add an explanation after an em dash:
  //   "1 cup (150 g) fine rice flour — ambemohar if you can find it; coarse flour cracks"
  // The page renders the part after " — " as a muted explanatory note.
  items: string[]
}

// A method step is either a plain sentence (legacy) or a fully explained step.
export interface MethodStepDetail {
  title: string         // short imperative: "Make the hot-water dough"
  text: string          // what to do: exact heat, quantities, technique, timing (2–5 sentences)
  why?: string          // the reason behind the step — what goes wrong if skipped
  cue?: string          // how you know it is done: colour, smell, sound, texture
}
export type MethodStep = string | MethodStepDetail

export interface Troubleshoot {
  problem: string       // "The shell cracks while pleating"
  fix: string           // cause + remedy
}

export interface RecipeVariant {
  id: string            // url-safe, unique within the dish: 'maharashtra'
  region: string        // state / region: 'Maharashtra'
  culture: string       // community / tradition: 'Konkan & Deshastha households'
  title: string         // local name of this version: 'Ukadiche Modak'
  intro: string         // what makes THIS version different, 2–3 sentences
  story?: string        // origin, who makes it, when, what it means in this tradition (2–3 short paragraphs, separated by \n\n)
  serves: string        // '4–5 people (about 12 modaks)'
  prep: string          // '30 min'
  cook: string          // '20 min'
  equipment?: string[]  // "Heavy-bottomed kadai — thin pans scorch jaggery"
  ingredients: IngredientGroup[]
  mise?: string[]       // "Before you start": things to wash, soak, grind, measure ahead
  method: MethodStep[]
  offering: string      // how it is offered: quantity, timing, rules (summary)
  ritual?: string[]     // the offering in detail, step by step: when, how, what is said/done, how it is distributed
  serving?: string      // how to serve, what to serve with, portion
  storage?: string      // how long it keeps, how to store, reheating
  troubleshooting?: Troubleshoot[]
  variations?: string[] // household / sub-regional variations, substitutions, fasting-friendly and Jain adaptations
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
