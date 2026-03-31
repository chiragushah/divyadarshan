import Navbar from '@/components/nav/Navbar'
import FilterBar from '@/components/filters/FilterBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <FilterBar />
      <main className="min-h-screen" style={{ background: 'var(--ivory)' }}>
        {children}
      </main>
    </>
  )
}
