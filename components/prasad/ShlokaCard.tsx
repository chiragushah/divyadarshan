import { Volume2, Flower2 } from 'lucide-react'
import { listenHref, type ShlokaSet, type Shloka } from '@/lib/data/prasad/shlokas'

function One({ s, accent }: { s: Shloka; accent: string }) {
  return (
    <div style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '14px 16px', background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>{s.title}</div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{s.when}</div>
        </div>
        <a href={listenHref(s.listen)} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', gap: 6, alignItems: 'center', textDecoration: 'none', fontSize: 13, fontWeight: 700, color: accent, border: `1.5px solid ${accent}55`, borderRadius: 100, padding: '5px 12px', background: `${accent}0d` }}>
          <Volume2 size={14} /> Listen
        </a>
      </div>
      <p lang="sa" style={{ fontSize: 19, lineHeight: 1.9, color: 'var(--ink)', margin: '12px 0 6px', whiteSpace: 'pre-line', fontFamily: "'Noto Serif Devanagari', 'Noto Sans Devanagari', serif" }}>{s.devanagari}</p>
      <p style={{ fontSize: 13.5, fontStyle: 'italic', color: 'var(--ink2)', lineHeight: 1.7, margin: '0 0 8px', whiteSpace: 'pre-line' }}>{s.iast}</p>
      <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.7, margin: '0 0 6px' }}><strong>Meaning: </strong>{s.meaning}</p>
      <div style={{ fontSize: 12, color: 'var(--muted)' }}>Source: {s.source}</div>
    </div>
  )
}

export default function ShlokaCard({ set, accent, deityLabel }: { set: ShlokaSet; accent: string; deityLabel?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Flower2 size={18} style={{ color: accent }} /> Words for the offering
      </h3>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 12px' }}>
        {deityLabel ? `For ${deityLabel}, then the` : 'The'} verses commonly said when food is offered. Say one or all, as your family does.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {set.deity && <One s={set.deity} accent={accent} />}
        {set.universal.map(s => <One key={s.id} s={s} accent={accent} />)}
      </div>
      <p style={{ fontSize: 12, color: 'var(--muted2)', lineHeight: 1.6, margin: '10px 0 0' }}>
        “Listen” opens a YouTube search for recordings of the verse — we link to search results rather than a single recording, so please pick one by a trained reciter. Wording and pronunciation vary by lineage; if your family or priest recites differently, follow them.
      </p>
    </div>
  )
}
