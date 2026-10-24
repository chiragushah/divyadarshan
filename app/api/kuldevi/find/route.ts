import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { KuldeviSubmission, KuldeviLink } from '@/models/Kuldevi'
import { norm, splitList, sameCommunity, tierFromFamilies } from '@/lib/kuldeviTrust'

export const dynamic = 'force-dynamic'

// Honest lookup: verified links first, then family reports grouped by deity with a count of DIFFERENT families.
// Never returns a single "the answer", and never returns anyone's email.
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const community = (sp.get('community') || '').slice(0, 80)
  const gotra = norm((sp.get('gotra') || '').slice(0, 60))
  const surname = norm((sp.get('surname') || '').slice(0, 60))
  if (gotra.length < 2 && surname.length < 2) return NextResponse.json({ error: 'Enter a gotra or a surname (at least 2 letters).' }, { status: 400 })

  await connectDB()
  const [links, subs] = await Promise.all([
    KuldeviLink.find({ status: 'active' }).limit(3000).lean() as Promise<any[]>,
    KuldeviSubmission.find({ status: 'approved' }).limit(3000).select('deity_name village district state community subgroup surnames confidence user_email').lean() as Promise<any[]>,
  ])

  const hit = (g: string, sn: string) => {
    const on: string[] = []
    if (gotra && norm(g) && (norm(g) === gotra || norm(g).includes(gotra) || gotra.includes(norm(g)))) on.push('gotra')
    if (surname && splitList(sn).includes(surname)) on.push('surname')
    return on
  }

  const verified = links
    .filter(l => sameCommunity(l.community, community))
    .map(l => ({ l, on: hit(l.gotra, l.surnames) }))
    .filter(x => x.on.length)
    .map(({ l, on }) => ({
      id: String(l._id), deity_name: l.deity_name, kuldevi_slug: l.kuldevi_slug || '', community: l.community, gotra: l.gotra, state: l.state,
      evidence_type: l.evidence_type, evidence_source: l.evidence_source, evidence_note: l.evidence_note, verified_on: l.verified_on, matched_on: on,
    }))

  const groups = new Map<string, { deity_name: string; village: string; district: string; state: string; community: string; emails: Set<string>; sure: number; on: Set<string> }>()
  for (const s of subs) {
    if (!sameCommunity(s.community, community)) continue
    const on = hit(s.subgroup || '', s.surnames || '')
    if (!on.length) continue
    const key = norm(s.deity_name) + '|' + norm(s.village)
    const g = groups.get(key) || { deity_name: s.deity_name, village: s.village, district: s.district, state: s.state, community: s.community, emails: new Set<string>(), sure: 0, on: new Set<string>() }
    g.emails.add(String(s.user_email)); if (s.confidence === 'sure') g.sure++; on.forEach(o => g.on.add(o))
    groups.set(key, g)
  }
  const verifiedDeities = new Set(verified.map(v => norm(v.deity_name)))
  const reported = Array.from(groups.values())
    .map(g => ({ deity_name: g.deity_name, village: g.village, district: g.district, state: g.state, community: g.community, families: g.emails.size, very_sure: g.sure, tier: tierFromFamilies(g.emails.size), matched_on: Array.from(g.on), also_verified: verifiedDeities.has(norm(g.deity_name)) }))
    .sort((a, b) => b.families - a.families)
    .slice(0, 12)

  return NextResponse.json({ verified, reported })
}
