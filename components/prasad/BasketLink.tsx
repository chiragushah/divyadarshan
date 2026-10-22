'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingBasket } from 'lucide-react'
import { loadBasket } from '@/lib/prasad/basket'

export default function BasketLink({ light }: { light?: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const upd = () => setN(loadBasket().length)
    upd()
    window.addEventListener('dd-basket', upd)
    window.addEventListener('storage', upd)
    return () => { window.removeEventListener('dd-basket', upd); window.removeEventListener('storage', upd) }
  }, [])
  return (
    <Link
      href="/festivals/prasad/plan"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 100, fontSize: 13.5, fontWeight: 700, textDecoration: 'none',
        background: light ? 'rgba(255,255,255,0.18)' : 'var(--crimson)', color: 'white',
        border: light ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--crimson)',
      }}
    >
      <ShoppingBasket size={16} /> Plan my puja{n > 0 ? ` (${n})` : ''}
    </Link>
  )
}
