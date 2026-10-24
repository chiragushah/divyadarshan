import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession } from '@/models'
import { KuldeviSubmission } from '@/models/Kuldevi'

export const dynamic = 'force-dynamic'

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  return !!(await (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }))
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const items = await KuldeviSubmission.find({}).sort({ createdAt: -1 }).limit(500).lean()
  return NextResponse.json({ items })
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id, status, moderator_note } = await req.json().catch(() => ({}))
  if (!id || !['pending', 'approved', 'rejected'].includes(status)) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  const doc = await KuldeviSubmission.findByIdAndUpdate(id, { status, moderator_note: String(moderator_note || '').slice(0, 400), reviewed_at: new Date() }, { new: true })
  return NextResponse.json({ item: doc })
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await req.json().catch(() => ({}))
  await KuldeviSubmission.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
