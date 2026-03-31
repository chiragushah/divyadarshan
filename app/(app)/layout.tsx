import { Suspense } from 'react'
import Navbar from '@/components/nav/Navbar'
import FilterBar from '@/components/filters/FilterBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
      <main className="min-h-screen" style={{ background: 'var(--ivory)' }}>
        {children}
      </main>
    </>
  )
}
