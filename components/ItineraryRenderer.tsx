'use client'

interface Props { text: string }

type Block =
  | { type: 'day';   num: number; title: string; items: string[] }
  | { type: 'tips';  items: string[] }
  | { type: 'cost';  items: string[] }
  | { type: 'note';  text: string }

function parseItinerary(text: string): Block[] {
  const lines = text.split('\n').filter(l => l.trim())
  const blocks: Block[] = []
  let current: Block | null = null

  for (const raw of lines) {
    const line = raw.trim().replace(/^\*+/, "").replace(/\*+$/, "")

    // Day heading
    const dayMatch = line.match(/^(day\s*(\d+))[:\-–—]?\s*(.*)?$/i)
    if (dayMatch) {
      if (current) blocks.push(current)
      current = {
        type: 'day',
        num: parseInt(dayMatch[2]),
        title: dayMatch[3]?.trim() || `Day ${dayMatch[2]}`,
        items: [],
      }
      continue
    }

    // Tips / Notes / Important section
    if (/^(tips|important|notes|things to|do note|remember|before you)/i.test(line)) {
      if (current) blocks.push(current)
      current = { type: 'tips', items: [] }
      continue
    }

    // Cost / Budget section
    if (/^(cost|budget|expense|estimated|total cost)/i.test(line)) {
      if (current) blocks.push(current)
      current = { type: 'cost', items: [] }
      continue
    }

    // Add item to current block
    if (current) {
      const clean = line.replace(/^[-•*✓→▸◆\d+\.\s]+/, '').trim()
      if (clean && (current.type === 'day' || current.type === 'tips' || current.type === 'cost')) {
        current.items.push(line)
      }
    } else if (line.length > 10) {
      blocks.push({ type: 'note', text: line })
    }
  }

  if (current) blocks.push(current)
  return blocks
}

function renderLine(line: string) {
  // Bold **text**
  const parts = line.split(/\*\*(.*?)\*\*/g)
  return parts.map((p, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: 'var(--crimson)', fontWeight: 600 }}>{p}</strong>
      : p
  )
}

function getTimeEmoji(item: string) {
  const l = item.toLowerCase()
  if (l.includes('morning') || l.includes('am') || l.includes('dawn') || l.includes('sunrise')) return '🌅'
  if (l.includes('afternoon') || l.includes('noon') || l.includes('lunch')) return '☀️'
  if (l.includes('evening') || l.includes('sunset') || l.includes('aarti')) return '🌆'
  if (l.includes('night') || l.includes('dinner') || l.includes('pm')) return '🌙'
  if (l.includes('temple') || l.includes('darshan') || l.includes('puja')) return '🛕'
  if (l.includes('hotel') || l.includes('stay') || l.includes('check')) return '🏨'
  if (l.includes('train') || l.includes('flight') || l.includes('bus') || l.includes('travel')) return '🚂'
  if (l.includes('food') || l.includes('eat') || l.includes('prasad') || l.includes('breakfast')) return '🍽️'
  if (l.includes('trek') || l.includes('walk') || l.includes('hike')) return '🥾'
  if (l.includes('₹') || l.includes('cost') || l.includes('budget')) return '💰'
  return '📍'
}

const DAY_COLORS = [
  { bg: '#FFF5F5', border: '#FFCCCC', accent: '#8B1A1A', light: '#FDE8E8' },
  { bg: '#FFF8F0', border: '#FFD9B3', accent: '#C0570A', light: '#FDEBD0' },
  { bg: '#F0FDF4', border: '#BBF7D0', accent: '#15803D', light: '#DCFCE7' },
  { bg: '#F0F7FF', border: '#BFDBFE', accent: '#1D4ED8', light: '#DBEAFE' },
  { bg: '#FAF5FF', border: '#E9D5FF', accent: '#7C3AED', light: '#EDE9FE' },
  { bg: '#FFF0F9', border: '#FBCFE8', accent: '#BE185D', light: '#FCE7F3' },
  { bg: '#F0FDFA', border: '#99F6E4', accent: '#0F766E', light: '#CCFBF1' },
]

export default function ItineraryRenderer({ text }: Props) {
  const blocks = parseItinerary(text)
  if (!blocks.length) return null

  const dayBlocks = blocks.filter(b => b.type === 'day') as Extract<Block, { type: 'day' }>[]
  const tipBlocks = blocks.filter(b => b.type === 'tips') as Extract<Block, { type: 'tips' }>[]
  const costBlocks = blocks.filter(b => b.type === 'cost') as Extract<Block, { type: 'cost' }>[]
  const noteBlocks = blocks.filter(b => b.type === 'note') as Extract<Block, { type: 'note' }>[]

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>

      {/* Intro notes */}
      {noteBlocks.slice(0, 1).map((b, i) => (
        <p key={i} style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24 }}>
          {renderLine(b.text)}
        </p>
      ))}

      {/* Day cards */}
      {dayBlocks.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
          {dayBlocks.map((day, i) => {
            const col = DAY_COLORS[i % DAY_COLORS.length]
            return (
              <div key={i} style={{
                border: `1.5px solid ${col.border}`,
                borderRadius: 12,
                overflow: 'hidden',
                background: col.bg,
              }}>
                {/* Day header */}
                <div style={{
                  background: col.light,
                  borderBottom: `1.5px solid ${col.border}`,
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: col.accent, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {day.num}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: col.accent, opacity: 0.7 }}>
                      Day {day.num}
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, color: '#111', lineHeight: 1.2 }}>
                      {day.title || `Day ${day.num}`}
                    </div>
                  </div>
                </div>

                {/* Day items */}
                <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {day.items.map((item, j) => {
                    const clean = item.replace(/^[-•*✓→▸◆\d+\.\s]+/, '').trim()
                    const emoji = getTimeEmoji(clean)
                    return (
                      <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{emoji}</span>
                        <span style={{ fontSize: 14, color: '#333', lineHeight: 1.65 }}>
                          {renderLine(clean)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tips */}
      {tipBlocks.map((block, i) => (
        <div key={i} style={{
          border: '1.5px solid #FDE68A',
          borderLeft: '4px solid #F59E0B',
          borderRadius: 10,
          background: '#FFFBEB',
          padding: '14px 18px',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#92400E', marginBottom: 10 }}>
            💡 Tips & Notes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {block.items.map((item, j) => {
              const clean = item.replace(/^[-•*✓→▸◆\d+\.\s]+/, '').trim()
              return (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#F59E0B', fontSize: 12, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 14, color: '#78350F', lineHeight: 1.6 }}>{renderLine(clean)}</span>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Cost */}
      {costBlocks.map((block, i) => (
        <div key={i} style={{
          border: '1.5px solid #BBF7D0',
          borderLeft: '4px solid #16A34A',
          borderRadius: 10,
          background: '#F0FDF4',
          padding: '14px 18px',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#166534', marginBottom: 10 }}>
            💰 Budget Estimate
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {block.items.map((item, j) => {
              const clean = item.replace(/^[-•*✓→▸◆\d+\.\s]+/, '').trim()
              return (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#16A34A', fontSize: 12, marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontSize: 14, color: '#14532D', lineHeight: 1.6 }}>{renderLine(clean)}</span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
