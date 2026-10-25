import { promises as dns } from 'dns'

// Common throw-away mailbox providers. Not exhaustive — the MX check and the audit page catch the rest.
export const DISPOSABLE = new Set([
  'mailinator.com','guerrillamail.com','guerrillamail.net','guerrillamail.org','guerrillamailblock.com','sharklasers.com','grr.la','10minutemail.com','10minutemail.net','20minutemail.com',
  'tempmail.com','temp-mail.org','temp-mail.io','tempmail.net','tempmailo.com','tempail.com','throwawaymail.com','yopmail.com','yopmail.net','yopmail.fr','trashmail.com','trashmail.net',
  'getnada.com','nada.email','maildrop.cc','dispostable.com','fakeinbox.com','mailnesia.com','mintemail.com','mohmal.com','moakt.com','emailondeck.com','spamgourmet.com','mytemp.email',
  'burnermail.io','discard.email','discardmail.com','fakemail.net','fakemailgenerator.com','harakirimail.com','incognitomail.com','inboxkitten.com','linshiyouxiang.net','mailcatch.com',
  'mailforspam.com','mailnull.com','mailsac.com','mailtemp.net','minuteinbox.com','mvrht.net','owlymail.com','spambox.us','tmail.ws','tmpmail.net','tmpmail.org','tmpeml.com','trbvm.com',
  'vomoto.com','wegwerfmail.de','yepmail.net','zetmail.com','cuvox.de','dayrep.com','einrot.com','fleckens.hu','gustr.com','jourrapide.com','rhyta.com','superrito.com','teleworm.us',
  'armyspy.com','emailfake.com','email-fake.com','crazymailing.com','tempinbox.com','1secmail.com','1secmail.net','1secmail.org','esiix.com','wwjmp.com','xojxe.com','vjuum.com','laafd.com',
])

const BIG_PROVIDERS = new Set(['gmail.com','googlemail.com','yahoo.com','yahoo.in','yahoo.co.in','outlook.com','hotmail.com','live.com','icloud.com','me.com','rediffmail.com','proton.me','protonmail.com','aol.com','msn.com'])

export const domainOf = (email: string) => (email.split('@')[1] || '').toLowerCase().trim()
export const isDisposable = (email: string) => { const d = domainOf(email); return DISPOSABLE.has(d) || Array.from(DISPOSABLE).some(x => d.endsWith('.' + x)) }
export const isBigProvider = (email: string) => BIG_PROVIDERS.has(domainOf(email))

/** Does the local part look machine-generated (e.g. "xkqpzvbntrw83", "a1b2c3d4e5f6g7")? A hint, never proof. */
export function looksRandom(email: string): boolean {
  const local = (email.split('@')[0] || '').toLowerCase().replace(/[._+-]/g, '')
  if (local.length < 9) return false
  const letters = local.replace(/[^a-z]/g, '')
  const digits = local.replace(/[^0-9]/g, '')
  const vowels = (letters.match(/[aeiou]/g) || []).length
  if (digits.length / local.length > 0.5) return true
  if (letters.length >= 9 && vowels / letters.length < 0.2) return true
  if (/[^aeiou0-9]{7,}/.test(local)) return true
  if (/(.)\1{4,}/.test(local)) return true
  if (/(?:[a-z]\d){4,}/.test(local)) return true
  return false
}

const cache = new Map<string, { ok: boolean; at: number }>()
/** True if the domain can receive mail. Fails OPEN (true) on network trouble so real people are never blocked by our DNS problems. */
export async function hasMailServer(domain: string): Promise<boolean> {
  const d = domain.toLowerCase()
  if (!d || !d.includes('.')) return false
  if (BIG_PROVIDERS.has(d)) return true
  const hit = cache.get(d); if (hit && Date.now() - hit.at < 6 * 3600_000) return hit.ok
  const withTimeout = <T,>(p: Promise<T>) => Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(Object.assign(new Error('timeout'), { code: 'ETIMEOUT' })), 2500))])
  let ok = true
  try {
    const mx = await withTimeout(dns.resolveMx(d))
    ok = mx.length > 0
  } catch (e: any) {
    if (e?.code === 'ENOTFOUND' || e?.code === 'ENODATA') {
      try { const a = await withTimeout(dns.resolve4(d)); ok = a.length > 0 } catch (e2: any) { ok = !(e2?.code === 'ENOTFOUND' || e2?.code === 'ENODATA') }
    } else ok = true
  }
  cache.set(d, { ok, at: Date.now() })
  return ok
}
