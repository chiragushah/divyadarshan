import nodemailer from 'nodemailer'

export interface MailResult { ok: boolean; error?: string }

/** Sends one email through the same SMTP settings the reminder emails use. Never throws. */
export async function sendMail(opts: { to: string; subject: string; html: string; text: string }): Promise<MailResult> {
  const user = process.env.SMTP_USER || process.env.EMAIL_FROM
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD
  if (!user || !pass) return { ok: false, error: 'not-configured' }
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user, pass },
    })
    await transporter.sendMail({ from: `"DivyaDarshanam" <${user}>`, to: opts.to, subject: opts.subject, html: opts.html, text: opts.text })
    return { ok: true }
  } catch (e: any) {
    console.error('sendMail failed', opts.to, e?.message || e)
    return { ok: false, error: 'send-failed' }
  }
}
