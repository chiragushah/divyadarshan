'use client'
// Updated messaging — Contribute to DivyaDarshanam
import { useState } from 'react'
import ContributionModal from './ContributionModal'
import { Heart } from 'lucide-react'

export default function ContributionBanner() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        data-contribution-btn="true"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', bottom: 28, right: 24, zIndex: 998,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'linear-gradient(135deg, #8B1A1A, #C0570A)',
          color: 'white', border: 'none', borderRadius: 100,
          padding: '12px 20px', fontWeight: 700, fontSize: 14,
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(139,26,26,0.35)',
          transition: 'all 0.2s', fontFamily: 'inherit',
          animation: 'pulse-btn 3s ease-in-out infinite',
        }}>
        💛
        Contribute to DivyaDarshanam
      </button>
      <style>{`
        @keyframes pulse-btn {
          0%, 100% { box-shadow: 0 4px 20px rgba(139,26,26,0.35); }
          50% { box-shadow: 0 4px 32px rgba(192,87,10,0.55); transform: translateY(-2px); }
        }
      `}</style>
      {open && <ContributionModal onClose={() => setOpen(false)} />}
    </>
  )
}
