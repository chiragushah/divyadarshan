import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

const VerificationSchema = new mongoose.Schema({
  temple_slug:  String,
  temple_name:  String,
  user_email:   String,
  answers:      Object,
  rating:       Number,
  createdAt:    { type: Date, default: Date.now },
})

const Verification = mongoose.models.Verification || mongoose.model('Verification', VerificationSchema)

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await req.json()
  await connectDB()

  await Verification.create({
    temple_slug: body.temple_slug,
    temple_name: body.temple_name,
    user_email:  session?.user?.email || 'anonymous',
    answers:     body.answers,
    rating:      body.rating,
  })

  // If any answer is false, auto-create a report
  const falseAnswers = Object.entries(body.answers || {})
    .filter(([, v]) => v === false)
    .map(([k]) => k.replace('_accurate',''))

  if (falseAnswers.length > 0) {
    const ReportSchema = new mongoose.Schema({ temple_slug: String, temple_name: String, field: String, issue: String, correct_info: String, status: { type: String, default: 'new' }, source: String }, { timestamps: true })
    const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema)
    for (const field of falseAnswers) {
      await Report.create({
        temple_slug: body.temple_slug,
        temple_name: body.temple_name,
        field,
        issue: 'Reported as inaccurate by a pilgrim who visited this temple',
        source: 'post_visit_verification',
      })
    }
  }

  return NextResponse.json({ success: true })
}

export async function GET() {
  await connectDB()
  const VerificationModel = mongoose.models.Verification || mongoose.model('Verification', VerificationSchema)
  const verifications = await VerificationModel.find().sort({ createdAt: -1 }).limit(200).lean()
  return NextResponse.json({ verifications })
}
