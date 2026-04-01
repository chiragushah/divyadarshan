'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function MarkVisited({ templeSlug, templeName }: { templeSlug: string; templeName: string }) {
  const { data: session } = useSession()
  const [visited, setVisited] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!session?.user) return
    fetch(`/api/visits?slug=${templeSlug}`)
      .then(r => r.json())
      .then(d => setVisited((d.visits || []).length > 0))
  }, [session, templeSlug])

  const toggle = async () => {
    if (!session?.user || loading) return
    setLoading(true)
    await fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temple_slug: templeSlug, temple_name: templeName, visit_date: new Date().toISOString().split('T')[0] }),
    })
    setVisited(v => !v)
    setLoading(false)
  }

  if (!session?.user) return null

  return (
    <button onClick={toggle} disabled={loading}
      className={`flex items-center gap-1.5 text-xs transition-all px-3 py-1.5 rounded-full border ${
        visited ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'
      }`}>
      {loading ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
      {visited ? 'Visited ✓' : 'Mark as Visited'}
    </button>
  )
}
