// How sure are we? Three tiers, each with a rule that cannot be bypassed by a single user.
export type Tier = 'verified' | 'corroborated' | 'reported'

/** Independent families needed before a report is called "corroborated". */
export const CORROBORATION_MIN = 3

export const TIER_INFO: Record<Tier, { label: string; color: string; rule: string }> = {
  verified: { label: 'Verified', color: '#15803d', rule: 'Confirmed against a temple trust, community body, published text or a named elder, and recorded by our team with the evidence shown.' },
  corroborated: { label: 'Corroborated', color: '#1d4ed8', rule: `Reported separately by ${CORROBORATION_MIN} or more different families, but not yet confirmed by a source.` },
  reported: { label: 'Reported', color: '#C0570A', rule: `Reported by fewer than ${CORROBORATION_MIN} families. Treat as a lead to check with your elders, not as an answer.` },
}

export const EVIDENCE_TYPES: { id: string; label: string }[] = [
  { id: 'temple-trust', label: 'Temple trust or committee' },
  { id: 'community-body', label: 'Community body / samaj record' },
  { id: 'published-text', label: 'Published book or text' },
  { id: 'named-elder', label: 'Named community elder or priest' },
]

export const norm = (s: unknown) =>
  String(s ?? '').normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9ऀ-ॿ઀-૿]+/g, ' ').trim()

export const splitList = (s: unknown) => String(s ?? '').split(/[,;/\n]+/).map(norm).filter(Boolean)

export const tierFromFamilies = (distinctFamilies: number): Tier => (distinctFamilies >= CORROBORATION_MIN ? 'corroborated' : 'reported')

/** Community match is forgiving: "Khadayata" matches "Khadayata Vanik (Gaudan)". */
export const sameCommunity = (a: string, b: string) => {
  const x = norm(a), y = norm(b)
  return !x || !y || x.includes(y) || y.includes(x)
}
