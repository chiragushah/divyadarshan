// What we can honestly say about a temple's live darshan.
//   verified   — we checked a real stream (temple's own site/app, or its official channel)
//   unverified — a stream is *reported* but nobody on our side has confirmed it
//   none       — no live stream known
export type LiveTier = 'verified' | 'unverified' | 'none'

export function liveTier(t: { has_live?: boolean; live_status?: string }): LiveTier {
  if (t.live_status === 'official' || t.live_status === 'channel') return 'verified'
  if (t.live_status === 'none') return 'none'
  if (t.live_status === 'unverified') return 'unverified'
  return t.has_live ? 'unverified' : 'none'
}

export const STATUS_LABEL: Record<string, string> = {
  official: 'Official stream',
  channel: 'Verified channel',
  unverified: 'Reported, not verified',
  none: 'No live stream',
}

/** A stream link must be a real destination — never a YouTube search page. */
export function isRealStreamUrl(u?: string): boolean {
  if (!u) return false
  try {
    const x = new URL(u)
    if (!/^https?:$/.test(x.protocol)) return false
    if (/youtube\.com$/.test(x.hostname.replace(/^www\./, '')) && x.pathname.startsWith('/results')) return false
    return true
  } catch { return false }
}

/** Make a temple record safe to show: `has_live` is true ONLY for streams we verified. */
export function honestLive<T extends { has_live?: boolean; live_status?: string }>(t: T): T {
  return { ...t, has_live: liveTier(t) === 'verified' }
}
