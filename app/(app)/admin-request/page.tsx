'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Loader2, CheckCircle, Clock, XCircle, Shield } from 'lucide-react'

export default function AdminRequestPage() {
  const { data: session, status } = useSession()
  const [existing, setExisting] = useState<any>(null)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [success, setSuccess]   = useState(false)
  const [form, setForm] = useState({ reason: '', organisation: '' })

  useEffect(() => {
    if (status === 'authenticated') checkExisting()
    if (status !== 'loading') setLoading(false)
  }, [status])

  async function checkExisting() {
    const res = await fetch('/api/admin-request?mine=1')
    const data = await res.json()
    setExisting(data.request)
    setLoading(false)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.reason.trim()) return
    setSaving(true)
    const res = await fetch('/api/admin-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (data.request) { setExisting(data.request); setSuccess(true) }
    setSaving(false)
  }

  if (status === 'unauthenticated') return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-4">🔐</div>
      <h1 className="font-serif text-3xl font-medium mb-3">Sign in required</h1>
      <Link href="/auth/signin" className="btn btn-primary">Sign In</Link>
    </div>
  )

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 size={24} className="animate-spin" style={{ color: 'var(--crimson)' }} />
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--pastel-red)', border: '1.5px solid #FFCCCC', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Shield size={28} style={{ color: 'var(--crimson)' }} />
        </div>
        <div className="section-title">Admin Access</div>
        <h1 className="font-serif text-3xl font-medium mb-2">Request Admin Panel</h1>
        <p className="text-sm" style={{ color: 'var(--muted)', maxWidth: 400, margin: '0 auto' }}>
          Admin access lets you manage temples, create group yatra plans, push announcements and view analytics.
        </p>
      </div>

      {/* Status card if already requested */}
      {existing ? (
        <div className="card card-p text-center">
          {existing.status === 'pending' && (
            <>
              <Clock size={40} style={{ color: '#F59E0B', margin: '0 auto 12px' }} />
              <h2 className="font-serif text-2xl font-medium mb-2">Request Pending</h2>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                Your request has been submitted and is under review. We'll notify you once it's approved.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ background: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E' }}>
                <Clock size={12} /> Under Review
              </div>
            </>
          )}
          {existing.status === 'approved' && (
            <>
              <CheckCircle size={40} style={{ color: '#16A34A', margin: '0 auto 12px' }} />
              <h2 className="font-serif text-2xl font-medium mb-2">Access Approved! 🎉</h2>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                You now have admin access to DivyaDarshan.
              </p>
              <Link href="/admin/dashboard" className="btn btn-primary">
                Open Admin Dashboard →
              </Link>
            </>
          )}
          {existing.status === 'rejected' && (
            <>
              <XCircle size={40} style={{ color: '#DC2626', margin: '0 auto 12px' }} />
              <h2 className="font-serif text-2xl font-medium mb-2">Request Not Approved</h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Your request was not approved. Contact us at admin@divyadarshan.in for more information.
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="card card-p">
          {success ? (
            <div className="text-center py-6">
              <CheckCircle size={40} style={{ color: '#16A34A', margin: '0 auto 12px' }} />
              <h2 className="font-serif text-2xl font-medium mb-2">Request Submitted!</h2>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                We'll review your request and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2 className="font-serif text-xl font-medium mb-6">Submit Access Request</h2>

              {/* Who's requesting */}
              <div className="flex items-center gap-3 p-3 rounded-xl mb-6"
                style={{ background: 'var(--bg)', border: '1.5px solid var(--border)' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--crimson), var(--saffron))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 700, fontSize: 16,
                }}>
                  {session?.user?.name?.[0] || 'U'}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{session?.user?.name}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{session?.user?.email}</div>
                </div>
              </div>

              <div className="mb-4">
                <label className="label">Organisation / Role (optional)</label>
                <input className="input" placeholder="e.g. Temple Trust, Travel Agency, Independent"
                  value={form.organisation}
                  onChange={e => setForm(f => ({ ...f, organisation: e.target.value }))} />
              </div>

              <div className="mb-6">
                <label className="label">Why do you need admin access? *</label>
                <textarea className="input h-32 resize-none"
                  placeholder="e.g. I manage group yatras for a pilgrim community of 500+ members and need to create and publish group travel plans..."
                  value={form.reason} required
                  onChange={e => setForm(f => ({ ...f, reason: e.target.value }))} />
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                  Be specific — this helps us review faster.
                </p>
              </div>

              {/* What you get */}
              <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--pastel-red)', border: '1.5px solid #FFCCCC' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--crimson)' }}>Admin access includes:</p>
                <div className="grid grid-cols-2 gap-1">
                  {['Create group yatra plans', 'Push announcements', 'View analytics', 'Manage temples', 'Review users', 'Moderate reviews'].map(f => (
                    <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--crimson)' }}>
                      <span>✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={saving || !form.reason.trim()} className="btn btn-primary w-full justify-center">
                {saving ? <><Loader2 size={14} className="animate-spin" /> Submitting…</> : 'Submit Request →'}
              </button>
            </form>
          )}
        </div>
      )}

      <p className="text-center text-xs mt-6" style={{ color: 'var(--muted)' }}>
        Questions? Contact <a href="mailto:admin@divyadarshan.in" style={{ color: 'var(--crimson)' }}>admin@divyadarshan.in</a>
      </p>
    </div>
  )
}
