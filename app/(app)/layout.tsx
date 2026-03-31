import PageTracker from '@/components/analytics/PageTracker'
import { Suspense } from 'react'
import Navbar from '@/components/nav/Navbar'
import FilterBar from '@/components/filters/FilterBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <PageTracker />
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
      <main className="min-h-screen" style={{ background: 'var(--ivory)' }}>
        {children}
      </main>
    </>
  )
}
