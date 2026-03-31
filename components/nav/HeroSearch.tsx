'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Loader2 } from 'lucide-react'

export default function HeroSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setResults([]); setShowDropdown(false); return }
    setLoading(true)
    try {
      const res = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await res.json()
      setResults(data.results || [])
      setShowDropdown(true)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setQuery(q)
    const timer = setTimeout(() => search(q), 400)
    return () => clearTimeout(timer)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`)
      setShowDropdown(false)
    }
  }

  const handleSelect = (result: any) => {
    if (result.slug) router.push(`/temple/${result.slug}`)
    else router.push(`/explore?q=${encodeURIComponent(result.name)}`)
    setShowDropdown(false)
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: 'rgba(255,255,255,.95)' }}>
          <div className="pl-5 flex-shrink-0" style={{ color: 'var(--muted2)' }}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
          </div>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            placeholder="Search temples, deities, states, circuits…"
            className="flex-1 px-4 py-4 text-sm bg-transparent outline-none"
            style={{ color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
          />
          <button type="submit"
            className="m-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--crimson)', color: '#FAF7F2', fontFamily: 'var(--font-sans)' }}>
            Search
          </button>
        </div>
      </form>

      {/* Search dropdown */}
      {showDropdown && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-2xl z-50"
          style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
          {results.map((r: any, i: number) => (
            <button key={i} onClick={() => handleSelect(r)}
              className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-ivory-100 transition-colors border-b last:border-b-0"
              style={{ borderColor: 'var(--border)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-serif font-bold flex-shrink-0"
                style={{ background: 'var(--ivory2)', color: 'var(--crimson)' }}>
                {(r.name || r.deity || '🛕').charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: 'var(--ink)' }}>{r.name}</div>
                <div className="text-xs" style={{ color: 'var(--muted2)' }}>
                  {r.city || r.state}{r.deity ? ` · ${r.deity}` : ''}{r.why_match ? ` — ${r.why_match}` : ''}
                </div>
              </div>
              {r.has_live && (
                <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ background: '#FFEBEE', color: 'var(--live)' }}>Live</span>
              )}
            </button>
          ))}
          <button className="w-full text-left px-4 py-2.5 text-xs font-medium"
            style={{ color: 'var(--crimson)', borderTop: '1px solid var(--border)' }}
            onClick={() => { router.push(`/explore?q=${encodeURIComponent(query)}`); setShowDropdown(false) }}>
            See all results for "{query}" →
          </button>
        </div>
      )}
    </div>
  )
}
