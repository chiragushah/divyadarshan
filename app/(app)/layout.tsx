import { Suspense } from 'react'
import Navbar from '@/components/nav/Navbar'
import ContributionBanner from '@/components/ContributionBanner'
import FilterBar from '@/components/filters/FilterBar'
import PageTracker from '@/components/analytics/PageTracker'
import AnnouncementBanner from '@/components/layout/AnnouncementBanner'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
      <PageTracker />
      <main className="min-h-screen" style={{ background: 'var(--ivory)' }}>
        {children}
      </main>
    <ContributionBanner />
    </>
  )
}
import Footer from '@/components/Footer'

// inside return, after {children}:
<Footer />