'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTracker() {
  const pathname = usePathname()
  const startTime = useRef(Date.now())
  const lastPath = useRef(pathname)

  const sendView = async (page: string, duration_sec: number) => {
    if (duration_sec < 2) return // ignore bounces under 2 seconds
    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, duration_sec, referrer: document.referrer }),
    }).catch(() => {})
  }

  useEffect(() => {
    // When path changes, log the previous page
    if (lastPath.current !== pathname) {
      const duration_sec = Math.round((Date.now() - startTime.current) / 1000)
      sendView(lastPath.current, duration_sec)
      lastPath.current = pathname
      startTime.current = Date.now()
    }
  }, [pathname])

  useEffect(() => {
    // Log when user leaves (tab close, navigate away)
    const handleUnload = () => {
      const duration_sec = Math.round((Date.now() - startTime.current) / 1000)
      navigator.sendBeacon('/api/analytics/pageview',
        JSON.stringify({ page: pathname, duration_sec, referrer: document.referrer })
      )
    }
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') handleUnload()
    })
    return () => window.removeEventListener('visibilitychange', handleUnload)
  }, [pathname])

  return null
}
