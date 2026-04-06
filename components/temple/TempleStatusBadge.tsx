'use client'

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

interface Props {
  open_months?: number[]
  closed_months?: number[]
  seasonal_note?: string
  is_seasonal?: boolean
  size?: 'sm' | 'md'
}

export default function TempleStatusBadge({ open_months, closed_months, seasonal_note, is_seasonal, size = 'md' }: Props) {
  if (!is_seasonal && !open_months?.length && !closed_months?.length) return null

  const now = new Date()
  const currentMonth = now.getMonth() + 1 // 1-12

  let isOpen = true
  let statusText = 'Open Year Round'
  let statusColor = '#166534'
  let statusBg = '#DCFCE7'
  let statusBorder = '#86EFAC'

  if (open_months && open_months.length > 0) {
    isOpen = open_months.includes(currentMonth)
    if (isOpen) {
      // Find when it closes
      const futureClosedMonths = closed_months?.filter(m => m > currentMonth) || []
      const closesIn = futureClosedMonths.length > 0 ? MONTH_NAMES[futureClosedMonths[0] - 1] : null
      statusText = closesIn ? `Open · Closes ${closesIn}` : 'Currently Open'
      statusColor = '#166534'
      statusBg = '#DCFCE7'
      statusBorder = '#86EFAC'
    } else {
      // Find when it opens next
      const futureOpenMonths = open_months.filter(m => m > currentMonth)
      const opensIn = futureOpenMonths.length > 0 ? MONTH_NAMES[futureOpenMonths[0] - 1] : MONTH_NAMES[open_months[0] - 1]
      statusText = `Closed · Opens ${opensIn}`
      statusColor = '#991B1B'
      statusBg = '#FEE2E2'
      statusBorder = '#FECACA'
    }
  }

  const openMonthNames = open_months?.map(m => MONTH_NAMES[m-1]).join(', ')

  return (
    <div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: size === 'sm' ? '4px 10px' : '6px 14px',
        borderRadius: 100, background: statusBg,
        border: `1.5px solid ${statusBorder}`,
        fontSize: size === 'sm' ? 12 : 13, fontWeight: 700, color: statusColor,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor, display: 'inline-block', flexShrink: 0 }} />
        {statusText}
      </div>
      {openMonthNames && (
        <div style={{ fontSize: 11, color: '#6B5B4E', marginTop: 4 }}>
          Open: {openMonthNames}
        </div>
      )}
      {seasonal_note && (
        <div style={{ fontSize: 11, color: '#6B5B4E', marginTop: 2, fontStyle: 'italic' }}>
          {seasonal_note}
        </div>
      )}
    </div>
  )
}
