import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { KuldeviSubmission } from '@/models/Kuldevi'

export const dynamic = 'force-dynamic'

const PUBLIC_FIELDS = 'display_name deity_name deity_kind other_names deity_form village taluka district state how_to_reach community subgroup surnames main_seat customs visit_times story source_basis confidence createdAt'
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[<>]/g, '').replace(/\s+\n/g, '\n').trim().slice(0, max)
const hasLink = (s: string) => /(https?:\/\/|www\.|@\w+\.\w+)/i.test(s)
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export async function GET(req: NextRequest) {
  await connectDB()
  const q = (req.nextUrl.searchParams.get('q') || '').trim().slice(0, 60)
  const filter: any = { status: 'approved' }
  if (q) {
    const r = new RegExp(esc(q), 'i')
    filter.$or = ['deity_name', 'other_names', 'village', 'district', 'community', 'subgroup', 'surnames', 'main_seat'].map(k => ({ [k]: r }))
  }
  const approved = await KuldeviSubmission.find(filter).sort({ createdAt: -1 }).limit(60).select(PUBLIC_FIELDS).lean()
  let mine: any[] = []
  const s = await getServerSession(authOptions)
  const email = s?.user?.email?.toLowerCase()
  if (email) mine = await KuldeviSubmission.find({ user_email: email }).sort({ createdAt: -1 }).select(PUBLIC_FIELDS + ' status moderator_note').lean()
  return NextResponse.json({ approved, mine })
}

export async function POST(req: NextRequest) {
  const s = await getServerSession(authOptions)
  const email = s?.user?.email?.toLowerCase()
  if (!email) return NextResponse.json({ error: 'Please sign in to add your family’s kuldevi.' }, { status: 401 })
  const b = await req.json().catch(() => ({}))

  const d = {
    deity_name: clean(b.deity_name, 80), other_names: clean(b.other_names, 120), deity_form: clean(b.deity_form, 200),
    village: clean(b.village, 80), taluka: clean(b.taluka, 80), district: clean(b.district, 80), state: clean(b.state, 60),
    how_to_reach: clean(b.how_to_reach, 600),
    community: clean(b.community, 80), subgroup: clean(b.subgroup, 80), surnames: clean(b.surnames, 160), main_seat: clean(b.main_seat, 160),
    customs: clean(b.customs, 1500), visit_times: clean(b.visit_times, 400), story: clean(b.story, 1500),
    source_basis: clean(b.source_basis, 60),
  }
  const kind = ['Kuldevi', 'Kuldevta', 'Both'].includes(b.deity_kind) ? b.deity_kind : 'Kuldevi'
  const confidence = ['sure', 'fairly', 'unsure'].includes(b.confidence) ? b.confidence : 'fairly'

  const errors: Record<string, string> = {}
  if (d.deity_name.length < 3) errors.deity_name = 'Enter the deity’s name as your family says it.'
  if (d.village.length < 2) errors.village = 'Enter the village or town.'
  if (d.district.length < 2) errors.district = 'Enter the district.'
  if (d.state.length < 2) errors.state = 'Enter the state.'
  if (d.how_to_reach.length < 20) errors.how_to_reach = 'Say how to reach it (20+ characters): nearest town, road or landmark.'
  if (d.community.length < 3) errors.community = 'Enter your community.'
  if (d.customs.length < 30) errors.customs = 'Describe the family’s customs (30+ characters).'
  if (d.source_basis.length < 3) errors.source_basis = 'Tell us how you know this.'
  if (!b.consent) errors.consent = 'Please confirm before sending.'
  for (const [k, v] of Object.entries(d)) if (v && hasLink(v)) errors[k] = 'Please remove web links and email addresses.'
  if (Object.keys(errors).length) return NextResponse.json({ error: 'Please fix the highlighted fields.', errors }, { status: 422 })

  await connectDB()
  if ((await KuldeviSubmission.countDocuments({ user_email: email, status: 'pending' })) >= 5)
    return NextResponse.json({ error: 'You already have 5 entries waiting for review. Please wait for those first.' }, { status: 429 })
  if (await KuldeviSubmission.findOne({ user_email: email, deity_name: d.deity_name, village: d.village }))
    return NextResponse.json({ error: 'You have already sent this deity and village.' }, { status: 409 })

  const first = (s?.user?.name || '').trim().split(/\s+/)[0]
  const doc = await KuldeviSubmission.create({
    ...d, deity_kind: kind, confidence, user_email: email, user_id: (s?.user as any)?.id || '',
    display_name: b.show_name && first ? `Shared by ${first}'s family` : 'Shared by a family', status: 'pending',
  })
  return NextResponse.json({ success: true, id: String(doc._id) }, { status: 201 })
}
