import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import KuldeviSubmitForm from '@/components/kuldevi/KuldeviSubmitForm'

export const metadata: Metadata = { title: 'Add your family’s kuldevi | DivyaDarshanam' }

export default function SubmitKuldeviPage() {
  return (
    <div className="max-w-3xl mx-auto" style={{ padding: '28px 24px 60px' }}>
      <Link href="/kuldevi" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--crimson)', textDecoration: 'none', fontSize: 13, fontWeight: 600, marginBottom: 14 }}><ArrowLeft size={15} /> Kuldevi directory</Link>
      <h1 className="font-serif" style={{ fontSize: 32, fontWeight: 600, marginBottom: 6 }}>Add your family’s kuldevi</h1>
      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 22 }}>
        Many kuldevi temples exist only in what families remember. Share what you know, and it can help other families trace their own. Please share only what you are sure of, and tell us how sure you are.
      </p>
      <KuldeviSubmitForm />
    </div>
  )
}
