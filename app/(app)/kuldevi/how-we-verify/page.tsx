import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TIER_INFO, CORROBORATION_MIN, EVIDENCE_TYPES } from '@/lib/kuldeviTrust'

export const metadata: Metadata = {
  title: 'How we verify kuldevi information | DivyaDarshanam',
  description: 'The three levels of trust used in the Kuldevi directory, what counts as evidence, and how to report a mistake.',
}

export default function HowWeVerify() {
  return (
    <div className="max-w-3xl mx-auto" style={{ padding: '28px 24px 60px' }}>
      <Link href="/kuldevi" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--crimson)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 14 }}><ArrowLeft size={15} /> Kuldevi directory</Link>
      <h1 className="font-serif" style={{ fontSize: 32, fontWeight: 600, marginBottom: 8 }}>How we verify</h1>
      <p style={{ fontSize: 15.5, lineHeight: 1.8, color: 'var(--ink2)' }}>
        A kuldevi is not decided by community alone — it follows a family’s gotra, lineage and ancestral village. Other websites show a single answer with no source. We do the opposite: every answer says how sure we are, and why.
      </p>

      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, margin: '24px 0 10px' }}>Three levels of trust</h2>
      {(['verified', 'corroborated', 'reported'] as const).map(t => (
        <div key={t} style={{ borderLeft: `5px solid ${TIER_INFO[t].color}`, background: 'var(--ivory2)', borderRadius: 10, padding: '12px 16px', marginBottom: 10 }}>
          <strong style={{ color: TIER_INFO[t].color, fontSize: 16 }}>{TIER_INFO[t].label}</strong>
          <p style={{ fontSize: 14.5, lineHeight: 1.7, margin: '4px 0 0', color: 'var(--ink2)' }}>{TIER_INFO[t].rule}</p>
        </div>
      ))}

      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, margin: '24px 0 10px' }}>What counts as evidence</h2>
      <ul style={{ fontSize: 14.5, lineHeight: 1.9, paddingLeft: 20, color: 'var(--ink2)' }}>
        {EVIDENCE_TYPES.map(e => <li key={e.id}>{e.label}</li>)}
      </ul>
      <p style={{ fontSize: 14.5, lineHeight: 1.8, color: 'var(--ink2)' }}>
        A verified entry always shows its evidence type, the named source (the trust, the book, or the elder and role), what was confirmed, and the date. An entry cannot be marked verified without them. A website, a social-media post or a single family’s word is never enough on its own.
      </p>

      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, margin: '24px 0 10px' }}>Rules we follow</h2>
      <ul style={{ fontSize: 14.5, lineHeight: 1.9, paddingLeft: 20, color: 'var(--ink2)' }}>
        <li>“Corroborated” counts <strong>different</strong> families, never repeat posts from the same account ({CORROBORATION_MIN} needed).</li>
        <li>If we do not have enough information, we say “not enough information yet” instead of guessing.</li>
        <li>We do not copy other websites’ tables. Their sources are not shown, so we cannot check them.</li>
        <li>Your gotra and surname searches are not saved to your account. Families’ names and contact details are never shown.</li>
        <li>An entry that turns out to be wrong is withdrawn, with the reason recorded.</li>
      </ul>

      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, margin: '24px 0 10px' }}>Found a mistake?</h2>
      <p style={{ fontSize: 14.5, lineHeight: 1.8, color: 'var(--ink2)' }}>
        Every result has a “Something wrong? Tell us” link. Tell us what your family knows, and we check it. Always confirm with your family elders or priest before any ritual decision — this directory is a way to find leads and records, not a substitute for them.
      </p>
      <Link href="/kuldevi/submit" className="btn btn-primary" style={{ marginTop: 10, display: 'inline-block' }}>Add your family’s kuldevi</Link>
    </div>
  )
}
