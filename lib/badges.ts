// lib/badges.ts
// Badge calculation for DivyaDarshanam contributors

export interface Badge {
  id:       string
  name:     string
  emoji:    string
  color:    string
  bg:       string
  border:   string
  minAmount: number   // minimum confirmed contribution amount
  minRecs:   number   // OR minimum approved temple recommendations
  perks:    string[]
}

export const BADGES: Badge[] = [
  {
    id:        'bronze',
    name:      'Bronze Partner',
    emoji:     '🥉',
    color:     '#92400E',
    bg:        '#FEF3C7',
    border:    '#D97706',
    minAmount: 5000,
    minRecs:   3,
    perks: [
      'Partner badge on your profile',
      'Early access to new features',
      'Credited on contributors page',
    ],
  },
  {
    id:        'silver',
    name:      'Silver Partner',
    emoji:     '🥈',
    color:     '#374151',
    bg:        '#F3F4F6',
    border:    '#6B7280',
    minAmount: 25000,
    minRecs:   10,
    perks: [
      'All Bronze perks',
      'Priority support from our team',
      'Quarterly impact reports',
      'Special Silver Partner yatra programs',
    ],
  },
  {
    id:        'gold',
    name:      'Gold Partner',
    emoji:     '🥇',
    color:     '#92400E',
    bg:        '#FFFBEB',
    border:    '#F59E0B',
    minAmount: 50000,
    minRecs:   25,
    perks: [
      'All Silver perks',
      'Name on DivyaDarshanam website permanently',
      'Exclusive Gold yatra experiences',
      'Direct line to founding team',
      'Annual recognition ceremony invite',
    ],
  },
  {
    id:        'platinum',
    name:      'Platinum Partner',
    emoji:     '💎',
    color:     '#1E3A5F',
    bg:        '#EFF6FF',
    border:    '#3B82F6',
    minAmount: 100000,
    minRecs:   50,
    perks: [
      'All Gold perks',
      'Co-create DivyaDarshanam features',
      'Advisory board membership',
      'Revenue share on referred users',
      'Lifetime premium access',
      'Personal yatra planning by our team',
    ],
  },
]

export function getBadge(contributionAmount: number, approvedRecs: number): Badge | null {
  // Check from highest to lowest
  for (let i = BADGES.length - 1; i >= 0; i--) {
    const b = BADGES[i]
    if (contributionAmount >= b.minAmount || approvedRecs >= b.minRecs) {
      return b
    }
  }
  return null
}

export function getNextBadge(current: Badge | null): Badge | null {
  if (!current) return BADGES[0]
  const idx = BADGES.findIndex(b => b.id === current.id)
  return idx < BADGES.length - 1 ? BADGES[idx + 1] : null
}

export function getProgress(contributionAmount: number, approvedRecs: number, target: Badge): number {
  const amtProgress = Math.min(100, (contributionAmount / target.minAmount) * 100)
  const recProgress = Math.min(100, (approvedRecs / target.minRecs) * 100)
  return Math.max(amtProgress, recProgress)
}
