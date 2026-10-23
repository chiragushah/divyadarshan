// A slim invocation strip above the navigation bar: ॥ श्री गणेशाय नमः ॥
function Flourish({ flip }: { flip?: boolean }) {
  return (
    <svg width="120" height="14" viewBox="0 0 120 14" aria-hidden style={{ transform: flip ? 'scaleX(-1)' : undefined, flexShrink: 0 }} className="gs-flourish">
      <defs>
        <linearGradient id={flip ? 'gsf2' : 'gsf1'} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="78" y2="0">
          <stop offset="0" stopColor="#E9C46A" stopOpacity="0" />
          <stop offset="1" stopColor="#F4D58D" />
        </linearGradient>
      </defs>
      <path d="M0 7 H78" stroke={`url(#${flip ? 'gsf2' : 'gsf1'})`} strokeWidth="1" />
      <path d="M78 7 C86 1, 94 1, 98 7 C94 13, 86 13, 78 7 Z" fill="none" stroke="#F4D58D" strokeWidth="1" />
      <circle cx="108" cy="7" r="2.2" fill="#F4D58D" />
      <circle cx="116" cy="7" r="1.2" fill="#F4D58D" opacity=".7" />
    </svg>
  )
}

export default function GaneshaStrip() {
  return (
    <div
      role="note"
      aria-label="Shri Ganeshaya Namah"
      style={{ background: 'linear-gradient(90deg, #5c0f0f 0%, #8B1A1A 35%, #A3350F 50%, #8B1A1A 65%, #5c0f0f 100%)', borderBottom: '1px solid rgba(244,213,141,0.45)', padding: '5px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}
    >
      <style>{`@media (max-width: 520px) { .gs-flourish { display: none; } }`}</style>
      <Flourish />
      <span
        lang="sa"
        style={{
          fontFamily: "var(--font-deva), 'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif",
          fontWeight: 600, fontSize: 19, lineHeight: 1.5, letterSpacing: '.04em', whiteSpace: 'nowrap',
          background: 'linear-gradient(180deg, #FFF1C9 0%, #F4D58D 45%, #E0A93B 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
          textShadow: '0 0 12px rgba(244,213,141,0.25)',
        }}
      >
        ॥ श्री गणेशाय नमः ॥
      </span>
      <Flourish flip />
    </div>
  )
}
