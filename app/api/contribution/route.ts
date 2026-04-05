import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { Contribution } from '@/models/Contribution'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, city, occupation, amount, interest, message } = body

    if (!name || !email || !amount) {
      return NextResponse.json({ error: 'Name, email and amount are required' }, { status: 400 })
    }
    if (amount < 5000) {
      return NextResponse.json({ error: 'Minimum contribution is Rs. 5,000' }, { status: 400 })
    }

    await connectDB()
    const session = await getServerSession(authOptions)
    const is_member = !!session?.user?.email

    const contribution = await Contribution.create({
      name, email, phone, city, occupation, amount, interest, message, is_member
    })

    // ── Send email notification ────────────────────────────────────────────
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER || process.env.EMAIL_FROM,
          pass: process.env.SMTP_PASS || process.env.EMAIL_PASSWORD,
        },
      })

      const amountFormatted = new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(amount)

      await transporter.sendMail({
        from: `"DivyaDarshan" <${process.env.SMTP_USER || process.env.EMAIL_FROM}>`,
        to: 'chirag@dynaimers.com',
        subject: `Interested in contribution - ${name}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body{font-family:'Inter',Arial,sans-serif;background:#FDFAF6;margin:0;padding:0;}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);}
  .hdr{background:#8B1A1A;padding:28px 32px;}
  .hdr h1{color:white;font-size:22px;margin:0;font-family:Georgia,serif;}
  .hdr p{color:rgba(237,224,196,0.8);font-size:13px;margin:6px 0 0;}
  .body{padding:28px 32px;}
  .amount-box{background:#FFF0F0;border:2px solid #8B1A1A;border-radius:12px;padding:16px 20px;margin-bottom:24px;text-align:center;}
  .amount-box .lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#C0570A;margin-bottom:4px;}
  .amount-box .val{font-size:32px;font-weight:700;color:#8B1A1A;font-family:Georgia,serif;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;}
  .field{background:#F8F4EE;border-radius:8px;padding:12px 14px;}
  .field .lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#A89B8C;margin-bottom:4px;}
  .field .val{font-size:14px;color:#1A0A00;font-weight:500;}
  .msg{background:#F8F4EE;border-radius:8px;padding:14px;margin-bottom:20px;}
  .msg .lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#A89B8C;margin-bottom:6px;}
  .msg .val{font-size:13px;color:#1A0A00;line-height:1.6;}
  .tag{display:inline-block;padding:4px 12px;border-radius:100px;font-size:12px;font-weight:600;}
  .member{background:#DCFCE7;color:#166534;}
  .visitor{background:#FEF3C7;color:#92400E;}
  .footer{background:#F8F4EE;padding:16px 32px;font-size:12px;color:#A89B8C;text-align:center;}
</style></head>
<body>
<div class="wrap">
  <div class="hdr">
    <h1>New Contribution Interest</h1>
    <p>Someone wants to support DivyaDarshan's mission</p>
  </div>
  <div class="body">
    <div class="amount-box">
      <div class="lbl">Contribution Amount</div>
      <div class="val">${amountFormatted}</div>
    </div>
    <div class="grid">
      <div class="field"><div class="lbl">Full Name</div><div class="val">${name}</div></div>
      <div class="field"><div class="lbl">Email</div><div class="val">${email}</div></div>
      <div class="field"><div class="lbl">Phone</div><div class="val">${phone || '—'}</div></div>
      <div class="field"><div class="lbl">City</div><div class="val">${city || '—'}</div></div>
      <div class="field"><div class="lbl">Occupation</div><div class="val">${occupation || '—'}</div></div>
      <div class="field"><div class="lbl">Interest Area</div><div class="val">${interest || '—'}</div></div>
      <div class="field"><div class="lbl">Registered Member</div><div class="val"><span class="tag ${is_member?'member':'visitor'}">${is_member ? 'Yes — Registered' : 'Not yet registered'}</span></div></div>
      <div class="field"><div class="lbl">Received</div><div class="val">${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })}</div></div>
    </div>
    ${message ? `<div class="msg"><div class="lbl">Message from ${name}</div><div class="val">${message}</div></div>` : ''}
  </div>
  <div class="footer">DivyaDarshan · India's Temple Explorer · divyadarshan.in</div>
</div>
</body>
</html>
        `,
      })
    } catch(emailErr) {
      console.error('Email send failed:', emailErr)
      // Don't fail the API if email fails
    }

    return NextResponse.json({ success: true, id: contribution._id })
  } catch(err) {
    console.error('Contribution error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  await connectDB()
  const contributions = await Contribution.find().sort({ createdAt: -1 }).limit(200).lean()
  return NextResponse.json({ contributions })
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json()
  await connectDB()
  await Contribution.updateOne({ _id: id }, { status })
  return NextResponse.json({ success: true })
}
