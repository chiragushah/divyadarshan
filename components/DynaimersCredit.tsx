// Credit line shown at the bottom of every page (rendered once, from the root layout).
export default function DynaimersCredit() {
  return (
    <footer
      aria-label="Credits"
      style={{ borderTop: '1px solid #E8E0D2', background: '#FFFFFF', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap', textAlign: 'center' }}
    >
      <span style={{ fontSize: 13, color: '#6b5f55' }}>Conceptualized and developed by</span>
      <a href="https://www.dynaimers.com" target="_blank" rel="noopener noreferrer" aria-label="Dynaimers — Aiming Towards Dynamics (opens www.dynaimers.com)" style={{ display: 'inline-flex', alignItems: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dynaimers-credit.png" alt="Dynaimers — Aiming Towards Dynamics" width={133} height={30} style={{ height: 30, width: 'auto' }} />
      </a>
      <a href="https://www.dynaimers.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: '#8B1A1A', textDecoration: 'none' }}>www.dynaimers.com</a>
    </footer>
  )
}
