import Navbar from '@/components/nav/Navbar'
import ContributionBanner from '@/components/ContributionBanner'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: 'var(--ivory)' }}>
        {children}
      </main>
    </>
  )
}
