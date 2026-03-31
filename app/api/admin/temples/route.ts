import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, Temple } from '@/models'

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  return !!(await AdminSession.findOne({ token, expires_at: { $gt: new Date() } }))
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const temples = await Temple.find().sort({ name: 1 }).select('name state city deity type has_live rating_avg rating_count slug').lean()
  return NextResponse.json({ temples })
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const body = await req.json()
  const slug = slugify(body.name)
  const temple = await Temple.create({ ...body, slug })
  return NextResponse.json({ temple })
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id, ...updates } = await req.json()
  const temple = await Temple.findByIdAndUpdate(id, updates, { new: true })
  return NextResponse.json({ temple })
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { id } = await req.json()
  await Temple.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
