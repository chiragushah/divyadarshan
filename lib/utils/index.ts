import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format Indian currency
export function formatINR(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}

// Generate URL-safe slug from temple name
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Haversine distance between two lat/lng points
export function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// FinVerse deep link builder
export function finverseLink(params: {
  action: 'savings' | 'budget' | 'invest'
  amount?: number
  goal_name?: string
  utm_content?: string
}): string {
  const base = process.env.NEXT_PUBLIC_FINVERSE_URL || 'https://finverse.app'
  const utm = {
    utm_source: 'divyadarshan',
    utm_medium: 'app',
    utm_campaign: 'yatra_fund',
    utm_content: params.utm_content || params.action,
  }
  const query = new URLSearchParams({
    ...utm,
    ...(params.amount ? { amount: String(params.amount) } : {}),
    ...(params.goal_name ? { goal: params.goal_name } : {}),
  })
  return `${base}/${params.action}?${query}`
}

// 80G tax saving calculation
export function calc80G(donations: Array<{ amount: number; eighty_g: string }>): {
  total: number
  deductible: number
  tax_saving: number
} {
  const total = donations.reduce((s, d) => s + d.amount, 0)
  const deductible = donations.reduce((s, d) => {
    if (d.eighty_g === '50%') return s + d.amount * 0.5
    if (d.eighty_g === '100%') return s + d.amount
    return s
  }, 0)
  return { total, deductible, tax_saving: Math.round(deductible * 0.3) }
}

// Group split settlement (greedy algorithm)
export function calculateSettlements(
  members: string[],
  expenses: Array<{ amount: number; paid_by: string }>
): Array<{ from: string; to: string; amount: number }> {
  const n = members.length
  if (n < 2) return []

  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const perHead = total / n

  const balance: Record<string, number> = {}
  members.forEach(m => (balance[m] = 0))
  expenses.forEach(e => {
    balance[e.paid_by] = (balance[e.paid_by] || 0) + e.amount
    members.forEach(m => (balance[m] -= e.amount / n))
  })

  const creditors = members
    .filter(m => balance[m] > 0.5)
    .map(m => ({ m, b: balance[m] }))
    .sort((a, b) => b.b - a.b)

  const debtors = members
    .filter(m => balance[m] < -0.5)
    .map(m => ({ m, b: -balance[m] }))
    .sort((a, b) => b.b - a.b)

  const settlements: Array<{ from: string; to: string; amount: number }> = []
  let ci = 0, di = 0
  while (ci < creditors.length && di < debtors.length) {
    const pay = Math.min(creditors[ci].b, debtors[di].b)
    if (pay > 0.5) settlements.push({ from: debtors[di].m, to: creditors[ci].m, amount: Math.round(pay) })
    creditors[ci].b -= pay
    debtors[di].b -= pay
    if (creditors[ci].b < 0.5) ci++
    if (debtors[di].b < 0.5) di++
  }
  return settlements
}

// Month names for seasonal features
export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

// Relative time (e.g. "2 days ago")
export function relativeTime(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}
