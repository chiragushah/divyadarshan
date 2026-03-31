import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, Announcement } from '@/models'

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  return !!(await AdminSession.findOne({ token, expires_at: { $gt: new Date() } }))
}

export async function GET() {
  await connectDB()
  const ann = await Announcement.findOne({
    active: true,
    $or: [{ expires_at: null }, { expires_at: { $gt: new Date() } }]
  }).sort({ createdAt: -1 })
  return NextResponse.json({ announcement: ann })
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const body = await req.json()
  await Announcement.updateMany({}, { active: false })
  const ann = await Announcement.create({ ...body, active: true })
  return NextResponse.json({ announcement: ann })
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  await Announcement.updateMany({}, { active: false })
  return NextResponse.json({ success: true })
}
