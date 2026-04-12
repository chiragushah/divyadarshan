// recommend-step1.js - creates model and API
const fs = require('fs')

// ── 1. MongoDB Model ──────────────────────────────────────────────────────────
fs.writeFileSync('models/TempleRecommendation.ts',
`import { Schema, model, models, Document } from 'mongoose'

export interface ITempleRecommendation extends Document {
  name: string; state: string; city: string; deity: string; type: string
  description: string; address: string; timing: string; best_time: string
  dress_code: string; festivals: string; has_live: boolean; live_url: string
  website: string; lat: string; lng: string; image_url: string
  recommender_name: string; recommender_email: string; recommender_phone: string
  recommender_note: string; is_member: boolean
  status: 'pending' | 'approved' | 'rejected' | 'added'
  admin_note: string; createdAt: Date
}

const TempleRecommendationSchema = new Schema<ITempleRecommendation>({
  name:              { type: String, required: true },
  state:             { type: String, required: true },
  city:              { type: String, required: true },
  deity:             { type: String, required: true },
  type:              { type: String, default: '' },
  description:       { type: String, default: '' },
  address:           { type: String, default: '' },
  timing:            { type: String, default: '' },
  best_time:         { type: String, default: '' },
  dress_code:        { type: String, default: '' },
  festivals:         { type: String, default: '' },
  has_live:          { type: Boolean, default: false },
  live_url:          { type: String, default: '' },
  website:           { type: String, default: '' },
  lat:               { type: String, default: '' },
  lng:               { type: String, default: '' },
  image_url:         { type: String, default: '' },
  recommender_name:  { type: String, required: true },
  recommender_email: { type: String, required: true },
  recommender_phone: { type: String, default: '' },
  recommender_note:  { type: String, default: '' },
  is_member:         { type: Boolean, default: false },
  status:            { type: String, enum: ['pending','approved','rejected','added'], default: 'pending' },
  admin_note:        { type: String, default: '' },
}, { timestamps: true })

export const TempleRecommendation = models.TempleRecommendation || model<ITempleRecommendation>('TempleRecommendation', TempleRecommendationSchema)
`)
console.log('✅ models/TempleRecommendation.ts')

// ── 2. API Route ──────────────────────────────────────────────────────────────
fs.mkdirSync('app/api/recommend-temple', { recursive: true })
fs.writeFileSync('app/api/recommend-temple/route.ts',
`import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { TempleRecommendation } from '@/models/TempleRecommendation'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, state, city, deity, recommender_name, recommender_email } = body
    if (!name || !state || !city || !deity || !recommender_name || !recommender_email) {
      return NextResponse.json({ error: 'Temple name, state, city, deity and your contact details are required' }, { status: 400 })
    }
    await connectDB()
    const session = await getServerSession(authOptions)
    const is_member = !!session?.user?.email
    const rec = await TempleRecommendation.create({ ...body, is_member })

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })
      await transporter.sendMail({
        from: \`"DivyaDarshanam" <\${process.env.SMTP_USER}>\`,
        to: 'chirag@dynaimers.com',
        subject: \`New Temple Recommendation - \${name} (\${city}, \${state})\`,
        html: \`<h2>New Temple Recommendation</h2>
          <p><b>Temple:</b> \${name}</p>
          <p><b>Deity:</b> \${deity}</p>
          <p><b>Location:</b> \${city}, \${state}</p>
          <p><b>Recommended by:</b> \${recommender_name} (\${recommender_email})</p>
          \${body.recommender_phone ? \`<p><b>Phone:</b> \${body.recommender_phone}</p>\` : ''}
          \${body.description ? \`<p><b>Description:</b> \${body.description}</p>\` : ''}
          \${body.recommender_note ? \`<p><b>Note:</b> \${body.recommender_note}</p>\` : ''}
          <p><b>Registered member:</b> \${is_member ? 'Yes' : 'No'}</p>\`,
      })
    } catch(e) { console.error('Email failed:', e) }

    return NextResponse.json({ success: true, id: rec._id })
  } catch(err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET() {
  await connectDB()
  const recs = await TempleRecommendation.find().sort({ createdAt: -1 }).limit(200).lean()
  return NextResponse.json({ recommendations: recs })
}

export async function PATCH(req: NextRequest) {
  const { id, status, admin_note } = await req.json()
  await connectDB()
  await TempleRecommendation.updateOne({ _id: id }, { status, ...(admin_note ? { admin_note } : {}) })
  if (status === 'added') {
    try {
      const rec = await TempleRecommendation.findById(id).lean() as any
      if (rec) {
        const { Temple } = await import('@/models')
        const slug = rec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/, '')
        const exists = await Temple.findOne({ slug })
        if (!exists) {
          await Temple.create({
            name: rec.name, slug, state: rec.state, city: rec.city,
            deity: rec.deity, type: rec.type, description: rec.description,
            address: rec.address, timing: rec.timing, best_time: rec.best_time,
            dress_code: rec.dress_code, festivals: rec.festivals,
            has_live: rec.has_live, live_url: rec.live_url,
            website: rec.website, image_url: rec.image_url,
            lat: parseFloat(rec.lat) || 0, lng: parseFloat(rec.lng) || 0,
            categories: [], rating_avg: 0, rating_count: 0,
          })
        }
      }
    } catch(e) { console.error('Auto-add failed:', e) }
  }
  return NextResponse.json({ success: true })
}
`)
console.log('✅ app/api/recommend-temple/route.ts')

// ── 3. Patch admin stats API ──────────────────────────────────────────────────
const statsPath = 'app/api/admin/stats/route.ts'
if (fs.existsSync(statsPath)) {
  let stats = fs.readFileSync(statsPath, 'utf8')
  if (!stats.includes('recommendations')) {
    const code = `
  if (type === 'recommendations') {
    try {
      const { TempleRecommendation } = await import('@/models/TempleRecommendation')
      const recommendations = await TempleRecommendation.find().sort({ createdAt: -1 }).limit(200).lean()
      return NextResponse.json({ recommendations })
    } catch(e) { return NextResponse.json({ recommendations: [] }) }
  }
`
    const idx = stats.lastIndexOf('\n  return NextResponse.json(')
    if (idx > -1) {
      stats = stats.slice(0, idx) + code + stats.slice(idx)
      fs.writeFileSync(statsPath, stats, 'utf8')
      console.log('✅ Stats API: recommendations added')
    }
  }
}

console.log('\nStep 1 done! Now download and run recommend-step2.js')
