// ─── TEMPLE ──────────────────────────────────────────────
export interface Temple {
  id: number
  slug: string
  name: string
  state: string
  city: string
  deity: string
  type: string
  description: string
  festivals: string
  timing: string
  best_time: string
  dress_code: string
  categories: string[]
  has_live: boolean
  live_url: string | null
  lat: number | null
  lng: number | null
  image_url: string | null
  rating_avg: number
  rating_count: number
  created_at: string
}

export interface TempleWithDistance extends Temple {
  distance_km: number
}

// ─── CIRCUIT ─────────────────────────────────────────────
export interface Circuit {
  id: string
  slug: string
  name: string
  region: string
  description: string
  temple_count: number
  duration_days: string
  budget_range: string
  tags: string[]
  stops: CircuitStop[]
}

export interface CircuitStop {
  order: number
  name: string
  location: string
  temple_id?: number
}

// ─── USER ────────────────────────────────────────────────
export interface UserProfile {
  id: string
  name: string
  email: string
  avatar_url: string | null
  temples_visited: number
  yatra_count: number
  created_at: string
}

// ─── JOURNAL ─────────────────────────────────────────────
export interface JournalEntry {
  id: string
  user_id: string
  temple_id: number | null
  temple_name: string
  visit_date: string
  note: string | null
  feeling: string
  stars: number
  photo_url: string | null
  deity: string | null
  state: string | null
  created_at: string
  temple?: Temple
}

// ─── SAVINGS GOAL ────────────────────────────────────────
export interface SavingsGoal {
  id: string
  user_id: string
  yatra_name: string
  target_amount: number
  current_amount: number
  monthly_target: number
  deadline: string | null
  finverse_linked: boolean
  created_at: string
  updated_at: string
}

export interface GoalDeposit {
  id: string
  goal_id: string
  amount: number
  note: string | null
  deposited_at: string
}

// ─── REVIEW ──────────────────────────────────────────────
export interface Review {
  id: string
  user_id: string
  temple_id: number
  rating: number
  body: string
  pilgrim_tips: string | null
  visit_month: string | null
  helpful_count: number
  created_at: string
  user?: UserProfile
  temple?: Temple
}

// ─── GROUP SPLIT ─────────────────────────────────────────
export interface GroupSplit {
  id: string
  user_id: string
  yatra_name: string
  members: string[]
  expenses: Expense[]
  created_at: string
  updated_at: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  paid_by: string
  split_type: 'equal'
  created_at: string
}

export interface Settlement {
  from: string
  to: string
  amount: number
}

// ─── DONATION ────────────────────────────────────────────
export interface Donation {
  id: string
  user_id: string
  temple_name: string
  amount: number
  date: string
  eighty_g_eligible: '50%' | '100%' | 'no'
  note: string | null
  created_at: string
}

// ─── AI ──────────────────────────────────────────────────
export type AIProvider = 'groq' | 'gemini' | 'claude'
export type AITask = 'search' | 'planner' | 'checklist' | 'chat' | 'seasonal'

export interface AIResponse {
  content: string
  provider: AIProvider
  model: string
  tokens_used?: number
}

export interface PlannerInput {
  from: string
  to: string
  mode: string
  days: number
  pilgrims: number
  deity?: string
  notes?: string
}

export interface ChecklistInput {
  destination: string
  mode: string
  days: number
  season: string
  pilgrim_type: string
  special_needs?: string
}

// ─── API RESPONSES ───────────────────────────────────────
export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  has_more: boolean
}

// ─── FILTER STATE ────────────────────────────────────────
export interface TempleFilters {
  query: string
  state: string
  deity: string
  type: string
  category: string
  has_live: boolean
}

// ─── NAV ─────────────────────────────────────────────────
export interface NavGroup {
  id: string
  label: string
  items: NavItem[]
}

export interface NavItem {
  id: string
  label: string
  description: string
  href: string
  icon: string
}
