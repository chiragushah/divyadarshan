'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { relativeTime } from '@/lib/utils'
import type { Review } from '@/types'

export default function ReviewsSection({ templeId, templeName }: { templeId: number; templeName: string }) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ rating: 5, body: '', pilgrim_tips: '', visit_month: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/reviews?temple_id=${templeId}`)
      .then(r => r.json())
      .then(d => { setReviews(d.data || []); setLoading(false) })
  }, [templeId])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.body.trim()) return
    setSubmitting(true)
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temple_id: templeId, ...form }),
    })
    const { data } = await res.json()
    if (data) {
      setReviews(prev => [data, ...prev.filter(r => r.user_id !== session?.user?.id)])
      setShowForm(false)
      setForm({ rating: 5, body: '', pilgrim_tips: '', visit_month: '' })
    }
    setSubmitting(false)
  }

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-2xl font-medium">Pilgrim Reviews</h2>
          {avgRating && <p className="text-sm" style={{ color: 'var(--muted2)' }}>★ {avgRating} · {reviews.length} reviews</p>}
        </div>
        {session
          ? <button onClick={() => setShowForm(f => !f)} className="btn btn-secondary btn-sm">{showForm ? 'Cancel' : 'Write a review'}</button>
          : <Link href="/auth/signin" className="btn btn-secondary btn-sm">Sign in to review</Link>}
      </div>

      {/* Write Review Form */}
      {showForm && (
        <form onSubmit={submit} className="card card-p mb-6">
          <h3 className="font-serif text-lg font-medium mb-4">Your Experience at {templeName}</h3>

          {/* Star rating */}
          <div className="mb-4">
            <label className="label">Rating</label>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <button key={s} type="button"
                  onClick={() => setForm(f => ({ ...f, rating: s }))}
                  className="text-2xl transition-transform hover:scale-110">
                  {s <= form.rating ? '★' : '☆'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="label">Your Experience</label>
            <textarea
              className="input h-28 resize-none"
              placeholder="Share your darshan experience, what moved you, what to know before visiting…"
              value={form.body}
              onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
              required />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="label">Pilgrim Tips (optional)</label>
              <textarea className="input h-20 resize-none" placeholder="Practical tips for other pilgrims…"
                value={form.pilgrim_tips} onChange={e => setForm(f => ({ ...f, pilgrim_tips: e.target.value }))} />
            </div>
            <div>
              <label className="label">Month of Visit</label>
              <select className="input" value={form.visit_month} onChange={e => setForm(f => ({ ...f, visit_month: e.target.value }))}>
                <option value="">Select month…</option>
                {['January','February','March','April','May','June','July','August','September','October','November','December'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => <div key={i} className="skeleton h-24 rounded-xl" />)}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 text-sm" style={{ color: 'var(--muted2)' }}>
          No reviews yet. Be the first pilgrim to share your experience.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="card card-p">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 overflow-hidden"
                    style={{ background: 'var(--ivory2)', color: 'var(--crimson)' }}>
                    {(review as any).user?.avatar_url
                      ? <img src={(review as any).user.avatar_url} alt="" className="w-full h-full object-cover" />
                      : ((review as any).user?.name?.[0] || 'P')}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                      {(review as any).user?.name || 'Anonymous Pilgrim'}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--muted2)' }}>
                      {review.visit_month && `Visited ${review.visit_month} · `}
                      {relativeTime(review.created_at)}
                    </div>
                  </div>
                </div>
                <div className="stars text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              </div>
              <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--muted)' }}>{review.body}</p>
              {review.pilgrim_tips && (
                <div className="mt-2 px-3 py-2 rounded-lg text-xs" style={{ background: 'var(--ivory2)', color: 'var(--muted)' }}>
                  💡 <strong>Tip:</strong> {review.pilgrim_tips}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
