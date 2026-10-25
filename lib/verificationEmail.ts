const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))

export const VERIFY_HOURS = 24

/** A branded, table-based email (works in Gmail, Outlook and phone mail apps) plus a plain-text twin. */
export function verificationEmail(name: string, link: string) {
  const first = esc((name || '').trim().split(/\s+/)[0] || 'friend')
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#F6F1E9">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F1E9;padding:28px 12px"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E8DCC8;font-family:Arial,Helvetica,sans-serif;color:#1A0A00">
    <tr><td style="height:5px;background:linear-gradient(90deg,#8B1A1A,#C0570A,#8B1A1A);font-size:0;line-height:0">&nbsp;</td></tr>
    <tr><td style="padding:30px 34px 6px;text-align:center">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:bold;color:#8B1A1A;letter-spacing:-0.3px">DivyaDarshanam</div>
      <div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#9A8F80;margin-top:4px">Your pilgrimage companion</div>
    </td></tr>
    <tr><td style="padding:22px 34px 4px">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#1A0A00;margin-bottom:10px">Welcome, ${first} 🙏</div>
      <div style="font-size:15px;line-height:1.7;color:#4A3F35">Please confirm your email address to activate your account. It takes one tap.</div>
    </td></tr>
    <tr><td align="center" style="padding:24px 34px 10px">
      <a href="${link}" style="display:inline-block;background:#8B1A1A;color:#FFFFFF;text-decoration:none;font-weight:bold;font-size:16px;padding:14px 34px;border-radius:10px">Confirm my email</a>
    </td></tr>
    <tr><td style="padding:6px 34px 0;text-align:center;font-size:12.5px;color:#7A6F62">This link works for ${VERIFY_HOURS} hours and can be used once.</td></tr>
    <tr><td style="padding:22px 34px 0">
      <div style="font-size:12.5px;line-height:1.6;color:#7A6F62;border-top:1px solid #EFE6D6;padding-top:16px">Button not working? Copy this link into your browser:<br><a href="${link}" style="color:#C0570A;word-break:break-all">${link}</a></div>
    </td></tr>
    <tr><td style="padding:18px 34px 26px">
      <div style="font-size:12.5px;line-height:1.6;color:#7A6F62">Didn't create this account? You can safely ignore this email — nothing will be activated and the request expires on its own.</div>
    </td></tr>
    <tr><td style="background:#FAF6EE;padding:14px 34px;text-align:center;font-size:11.5px;color:#9A8F80;border-top:1px solid #EFE6D6">Conceptualized &amp; developed by Dynaimers Consulting Pvt. Ltd. · www.dynaimers.com</td></tr>
  </table>
</td></tr></table></body></html>`
  const text = `Welcome to DivyaDarshanam, ${(name || '').trim().split(/\s+/)[0] || 'friend'}.\n\nPlease confirm your email to activate your account:\n${link}\n\nThis link works for ${VERIFY_HOURS} hours and can be used once.\nDidn't create this account? Ignore this email — nothing will be activated.\n\nDivyaDarshanam · Conceptualized & developed by Dynaimers Consulting Pvt. Ltd.`
  return { subject: 'Confirm your email — DivyaDarshanam', html, text }
}
