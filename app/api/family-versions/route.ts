import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { FamilyVersion } from '@/models/Prasad'
import { getRecipe } from '@/lib/data/prasad'

export const dynamic = 'force-dynamic'

const PUBLIC_FIELDS = 'display_name family community place title what_differs ingredient_changes method_changes offering_custom story createdAt'
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[<>]/g, '').replace(/\s+\n/g, '\n').trim().slice(0, max)
const hasLink = (s: string) => /(https?:\/\/|www\.|\.com\b|\.in\b|\.org\b|@\w+\.\w+)/i.test(s)

export async function GET(req: NextRequest) {
  const dish = req.nextUrl.searchParams.get('dish') || ''
  const variant = req.nextUrl.searchParams.get('variant') || ''
  if (!dish || !variant) return NextResponse.json({ error: 'dish and variant are required' }, { status: 400 })
  await connectDB()
  const approved = await FamilyVersion.find({ dish, variant, status: 'approved' }).sort({ createdAt: -1 }).limit(30).select(PUBLIC_FIELDS).lean()
  let mine: any[] = []
  const s = await getServerSession(authOptions)
  const email = s?.user?.email?.toLowerCase()
  if (email) mine = await FamilyVersion.find({ dish, variant, user_email: email }).sort({ createdAt: -1 }).select(PUBLIC_FIELDS + ' status moderator_note').lean()
  return NextResponse.json({ approved, mine })
}

export async function POST(req: NextRequest) {
  const s = await getServerSession(authOptions)
  const email = s?.user?.email?.toLowerCase()
  if (!email) return NextResponse.json({ error: 'Please sign in to share your family’s version.' }, { status: 401 })
  const b = await req.json().catch(() => ({}))

  const dish = clean(b.dish, 60), variant = clean(b.variant, 80)
  const r = getRecipe(dish)
  if (!r || !r.variants.some(v => v.id === variant)) return NextResponse.json({ error: 'Unknown recipe' }, { status: 400 })

  const d = {
    family: clean(b.family, 80), community: clean(b.community, 80), place: clean(b.place, 80),
    title: clean(b.title, 80), what_differs: clean(b.what_differs, 600),
    ingredient_changes: clean(b.ingredient_changes, 1200), method_changes: clean(b.method_changes, 1500),
    offering_custom: clean(b.offering_custom, 800), story: clean(b.story, 1500),
  }
  const errors: Record<string, string> = {}
  if (d.family.length < 3) errors.family = 'Tell us the family or household (at least 3 letters).'
  if (d.title.length < 3) errors.title = 'Give your version a short name.'
  if (d.what_differs.length < 30) errors.what_differs = 'Describe what is different in at least a sentence or two (30+ characters).'
  if (d.ingredient_changes.length < 20) errors.ingredient_changes = 'List the ingredient changes (20+ characters) — write “none” in a sentence if unchanged.'
  if (d.method_changes.length < 20) errors.method_changes = 'Describe the method changes (20+ characters).'
  if (!b.consent) errors.consent = 'Please confirm this is your family’s own tradition, in your own words.'
  for (const [k, v] of Object.entries(d)) if (v && hasLink(v)) errors[k] = 'Please remove web links and email addresses.'
  if (Object.keys(errors).length) return NextResponse.json({ error: 'Please fix the highlighted fields.', errors }, { status: 422 })

  await connectDB()
  const pending = await FamilyVersion.countDocuments({ user_email: email, status: 'pending' })
  if (pending >= 5) return NextResponse.json({ error: 'You already have 5 versions waiting for review. Please wait for those first.' }, { status: 429 })
  const dup = await FamilyVersion.findOne({ user_email: email, dish, variant, title: d.title })
  if (dup) return NextResponse.json({ error: 'You have already shared a version with this name.' }, { status: 409 })

  const first = (s?.user?.name || '').trim().split(/\s+/)[0]
  const display_name = b.show_name && first ? `${first}, ${d.family}` : d.family
  const doc = await FamilyVersion.create({ ...d, dish, variant, user_email: email, user_id: (s?.user as any)?.id || '', display_name, status: 'pending' })
  return NextResponse.json({ success: true, id: String(doc._id) }, { status: 201 })
}
