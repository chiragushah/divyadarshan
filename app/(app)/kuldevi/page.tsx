import type { Metadata } from 'next'
import Link from 'next/link'
import { KULDEVI } from '@/lib/data/kuldevi'
import KuldeviIndexClient from '@/components/kuldevi/KuldeviIndexClient'

export const metadata: Metadata = {
  title: 'Kuldevi Directory — find your family deity | DivyaDarshanam',
  description: 'Trace your kuldevi or kuldevta: temples, communities and traditions, each labelled with how well it is sourced. Families can add what only they know.',
}

export default function KuldeviPage() {
  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #C0570A 100%)', color: 'white' }}>
        <div className="max-w-6xl mx-auto" style={{ padding: '34px 24px 46px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', opacity: 0.9 }}>Kuldevi directory</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 600, lineHeight: 1.1, marginTop: 6, color: 'white' }}>Find your family’s deity</h1>
          <p style={{ fontSize: 16, maxWidth: 720, lineHeight: 1.7, marginTop: 14, color: 'rgba(255,255,255,0.93)' }}>
            A kuldevi follows the family — its gotra, lineage and ancestral village — not just the community. So every entry here shows where its information comes from and how sure we are, and families can add what only they know.
          </p>
          <Link href="/kuldevi/submit" className="btn" style={{ marginTop: 18, background: 'white', color: 'var(--crimson)', fontWeight: 700, display: 'inline-block' }}>Add your family’s kuldevi</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto" style={{ padding: '26px 24px 60px' }}>
        <KuldeviIndexClient curated={KULDEVI} />
      </div>
    </div>
  )
}
