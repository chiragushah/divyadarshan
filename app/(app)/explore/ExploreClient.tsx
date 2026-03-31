'use client'
import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import TempleCard from '@/components/temple/TempleCard'
import type { Temple } from '@/types'

const TABS = [
  { id: 'directory', label: 'All Temples' },
  { id: 'darshan',   label: '🔴 Live Darshan' },
  { id: 'nearby',    label: '📍 Nearby' },
  { id: 'seasonal',  label: '📅 This Month' },
]

interface Props {
  initialTemples: Temple[]
  total: number
  page: number
  states: string[]
  activeFilters: Record<string, string | undefined>
}

export default function ExploreClient({ initialTemples, total, page, states, activeFilters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeTab = activeFilters.tab || 'directory'

  const update = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString())
    if (value) p.set(key, value); else p.delete(key)
    p.delete('page')
    router.push(`${pathname}?${p.toString()}`)
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="border-b bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 flex gap-0 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab.id}
              onClick={() => update('tab', tab.id === 'directory' ? '' : tab.id)}
              className="px-5 py-3.5 text-sm whitespace-nowrap border-b-2 transition-all"
              style={{
                borderColor: activeTab === tab.id ? 'var(--crimson)' : 'transparent',
                color: activeTab === tab.id ? 'var(--crimson)' : 'var(--muted)',
                fontFamily: 'var(--font-sans)',
                fontWeight: activeTab === tab.id ? '600' : '400',
              }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="Search temples, cities, deities…"
            defaultValue={activeFilters.q || ''}
            className="input flex-1 min-w-[200px] max-w-sm"
            onChange={e => {
              clearTimeout((window as any)._st)
              ;(window as any)._st = setTimeout(() => update('q', e.target.value), 400)
            }}
          />
          <select className="input w-auto" value={activeFilters.state || ''} onChange={e => update('state', e.target.value)}>
            <option value="">All States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="input w-auto" value={activeFilters.deity || ''} onChange={e => update('deity', e.target.value)}>
            <option value="">All Deities</option>
            {['Shiva', 'Vishnu', 'Durga/Shakti', 'Ganesha', 'Krishna', 'Rama', 'Murugan', 'Hanuman'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {Object.values(activeFilters).some(Boolean) && (
            <button onClick={() => router.push('/explore')} className="btn btn-ghost btn-sm text-xs">
              Clear filters ×
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {activeFilters.category && <><strong style={{ color: 'var(--crimson)' }}>{activeFilters.category}</strong> · </>}
            {total.toLocaleString()} temples
          </p>
          {activeFilters.category && (
            <button onClick={() => update('category', '')} className="text-xs" style={{ color: 'var(--crimson)' }}>
              Clear filter ×
            </button>
          )}
        </div>

        {/* Grid */}
        {initialTemples.length === 0 ? (
          <div className="text-center py-16 text-sm" style={{ color: 'var(--muted2)' }}>
            No temples found. <button onClick={() => router.push('/explore')} className="underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {initialTemples.map(temple => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > 48 && (
          <div className="flex justify-center gap-2 mt-10">
            {page > 1 && (
              <button onClick={() => update('page', String(page - 1))} className="btn btn-secondary btn-sm">← Previous</button>
            )}
            <span className="btn btn-ghost btn-sm" style={{ color: 'var(--muted)' }}>
              Page {page} of {Math.ceil(total / 48)}
            </span>
            {page < Math.ceil(total / 48) && (
              <button onClick={() => update('page', String(page + 1))} className="btn btn-secondary btn-sm">Next →</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
