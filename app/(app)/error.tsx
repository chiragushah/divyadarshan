'use client'
import { useEffect } from 'react'

// Friendly fallback instead of a blank "Application error" page.
// Most often seen when a tab was left open across a new release — a reload fixes it.
export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('[DivyaDarshanam] page error:', error) }, [error])
  return (
    <div style={{ maxWidth: 520, margin: '15vh auto', padding: 24, textAlign: 'center' }}>
      <h1 className="font-serif" style={{ fontSize: 26, color: 'var(--crimson)', marginBottom: 8 }}>Something went wrong on this page</h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 18 }}>
        We may have just released an update. Reload to get the latest version — your account and saved data are safe.
      </p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 18 }}>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Reload page</button>
        <button className="btn btn-secondary" onClick={() => reset()}>Try again</button>
        <a className="btn btn-ghost" href="/explore">Back to Explore</a>
      </div>
      <p style={{ color: 'var(--muted2)', fontSize: 11, wordBreak: 'break-word' }}>
        Details: {error?.message || 'unknown'}{error?.digest ? ` · ref ${error.digest}` : ''}
      </p>
    </div>
  )
}
