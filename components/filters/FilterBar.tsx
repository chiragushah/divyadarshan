'use client'
import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const FILTER_GROUPS = [
  {
    id: 'circuits', label: 'Sacred Circuits',
    options: [
      { cat: 'Jyotirlinga', label: '12 Jyotirlingas' },
      { cat: 'Char Dham', label: 'Char Dham' },
      { cat: 'Shakti Peetha', label: '51 Shakti Peethas' },
      { cat: 'Divya Desam', label: '108 Divya Desams' },
      { cat: 'Pancha Bhuta', label: 'Pancha Bhuta' },
      { cat: 'Ashtavinayak', label: 'Ashtavinayak' },
      { cat: 'Navagraha', label: 'Navagraha' },
    ],
  },
  {
    id: 'heritage', label: 'Heritage',
    options: [
      { cat: 'UNESCO', label: 'UNESCO Heritage' },
      { cat: 'Cave', label: 'Cave Temples' },
      { cat: 'Unusual', label: 'Unusual & Rare' },
    ],
  },
  {
    id: 'terrain', label: 'By Terrain',
    options: [
      { cat: 'Hilltop', label: 'Hilltop' },
      { cat: 'Coastal', label: 'Coastal' },
      { cat: 'Forest', label: 'Forest' },
    ],
  },
  {
    id: 'story', label: 'By Story',
    options: [
      { cat: 'Mahabharata', label: 'Mahabharata' },
      { cat: 'Ramayana', label: 'Ramayana' },
    ],
  },
]

export default function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  // Only show on explore page
  if (!pathname.startsWith('/explore')) return null

  const activeCategory = searchParams.get('category') || ''
  const activeGroup = FILTER_GROUPS.find(g => g.options.some(o => o.cat === activeCategory))

  const setFilter = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (cat) params.set('category', cat)
    else params.delete('category')
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
    setOpenGroup(null)
  }

  return (
    <div className="sticky top-[52px] z-40 border-b" style={{ background: 'var(--white)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 flex items-stretch">
        {/* All */}
        <button
          onClick={() => setFilter('')}
          className={cn(
            'px-4 py-3 text-sm font-medium border-b-2 transition-all',
            !activeCategory ? 'border-crimson-800 font-semibold' : 'border-transparent hover:text-gray-900',
          )}
          style={{ color: !activeCategory ? 'var(--crimson)' : 'var(--muted)', fontFamily: 'var(--font-sans)' }}>
          All
        </button>

        {FILTER_GROUPS.map(group => {
          const isGroupActive = group.options.some(o => o.cat === activeCategory)
          return (
            <div key={group.id} className="relative"
              onMouseEnter={() => setOpenGroup(group.id)}
              onMouseLeave={() => setOpenGroup(null)}>
              <button className={cn(
                'flex items-center gap-1.5 px-4 py-3 text-sm border-b-2 transition-all whitespace-nowrap',
                isGroupActive ? 'border-crimson-800 font-semibold' : 'border-transparent hover:text-gray-900',
              )} style={{
                color: isGroupActive ? 'var(--crimson)' : 'var(--muted)',
                fontFamily: 'var(--font-sans)',
              }}>
                {isGroupActive ? activeCategory.split(' ').slice(-1)[0] : group.label}
                <span className="text-[8px] opacity-50">▾</span>
              </button>

              {openGroup === group.id && (
                <div className="absolute top-full left-0 min-w-[200px] py-1.5 rounded-b-xl z-50"
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderTop: '2px solid var(--crimson)', boxShadow: '0 8px 24px rgba(18,10,6,.12)' }}>
                  {group.options.map(opt => (
                    <button key={opt.cat} onClick={() => setFilter(opt.cat)}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-left hover:bg-ivory-100 transition-colors text-sm"
                      style={{ color: opt.cat === activeCategory ? 'var(--crimson)' : 'var(--ink)', fontWeight: opt.cat === activeCategory ? '600' : '400', fontFamily: 'var(--font-sans)' }}>
                      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', opt.cat === activeCategory ? 'bg-crimson-800' : 'bg-stone-300')} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
