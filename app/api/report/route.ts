import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

const ReportSchema = new mongoose.Schema({
  temple_slug:  { type: String, required: true },
  temple_name:  { type: String, default: '' },
  field:        { type: String, required: true },
  issue:        { type: String, required: true },
  correct_info: { type: String, default: '' },
  user_email:   { type: String, default: 'anonymous' },
  status:       { type: String, enum: ['new','reviewed','fixed','dismissed'], default: 'new' },
  source:       { type: String, default: 'report_button' },
}, { timestamps: true })

const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema)

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await req.json()
  await connectDB()
  await Report.create({
    ...body,
    user_email: session?.user?.email || 'anonymous',
  })
  return NextResponse.json({ success: true })
}

export async function GET() {
  await connectDB()
  const reports = await Report.find().sort({ createdAt: -1 }).limit(200).lean()
  return NextResponse.json({ reports })
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json()
  await connectDB()
  await Report.updateOne({ _id: id }, { status })
  return NextResponse.json({ success: true })
}
