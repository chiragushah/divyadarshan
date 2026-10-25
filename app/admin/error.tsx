'use client'
// Safety net for admin pages: show what went wrong instead of a blank screen.
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ maxWidth: 560, margin: '12vh auto', padding: 24, textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 22, color: '#8B1A1A', marginBottom: 8 }}>This admin page hit a problem</h1>
      <p style={{ color: '#666', fontSize: 14, marginBottom: 16 }}>Your data is safe. Reload the page, or go back to the dashboard.</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => window.location.reload()} style={{ padding: '9px 16px', borderRadius: 8, border: 'none', background: '#8B1A1A', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Reload</button>
        <button onClick={() => reset()} style={{ padding: '9px 16px', borderRadius: 8, border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>Try again</button>
        <a href="/admin/dashboard" style={{ padding: '9px 16px', borderRadius: 8, border: '1px solid #ccc', color: '#333', textDecoration: 'none' }}>Dashboard</a>
      </div>
      <p style={{ color: '#999', fontSize: 11.5, wordBreak: 'break-word' }}>Details: {error?.message || 'unknown'}{error?.digest ? ` · ref ${error.digest}` : ''}</p>
    </div>
  )
}
