// lib/export/planExport.ts
// Rich branded PDF and DOCX export for DivyaDarshan yatra plans
import jsPDF from 'jspdf'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, ShadingType, TableCell, TableRow, Table, WidthType, Header, ImageRun } from 'docx'

// ── Brand colors (RGB) ──────────────────────────────────────────────────────
const C = {
  crimson:   [139, 26,  26 ] as [number,number,number],
  saffron:   [192, 87,  10 ] as [number,number,number],
  gold:      [212, 160, 23 ] as [number,number,number],
  darkBg:    [26,  10,  0  ] as [number,number,number],
  ivory:     [253, 248, 242] as [number,number,number],
  ivoryDark: [240, 228, 210] as [number,number,number],
  white:     [255, 255, 255] as [number,number,number],
  ink:       [30,  15,  0  ] as [number,number,number],
  muted:     [120, 90,  60 ] as [number,number,number],
}

// ── Parse itinerary into days ────────────────────────────────────────────────
function parseDays(text: string) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const days: { title: string; lines: string[] }[] = []
  let current: { title: string; lines: string[] } | null = null
  for (const line of lines) {
    const clean = line.replace(/^[*#>•\-]+\s*/g, '').trim()
    if (/^(day\s*\d+|\d+[:\.])/i.test(clean) && clean.length < 80) {
      if (current) days.push(current)
      current = { title: clean, lines: [] }
    } else if (current && clean.length > 4) {
      current.lines.push(clean)
    } else if (!current && clean.length > 10) {
      if (!days.length) days.push({ title: 'Overview', lines: [] })
      days[0].lines.push(clean)
    }
  }
  if (current) days.push(current)
  return days
}

// ── Fix text: remove emojis + fix symbols ─────────────────────────────────
function cleanText(t: string): string {
  return t
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
    .replace(/[\u{2600}-\u{26FF}]/gu, '')
    .replace(/[\u{2700}-\u{27BF}]/gu, '')
    .replace(/\*\*/g, '')
    .replace(/##?\s*/g, '')
    .replace(/Rs\.?\s*/gi, 'Rs. ')
    .replace(/₹/g, 'Rs.')
    .replace(/[→►▸]/g, '->')
    .trim()
}

// ── PDF EXPORT ───────────────────────────────────────────────────────────────
export async function downloadPlanAsPDF(
  itinerary: string,
  form: { from: string; to: string; days: number; pilgrims: number; mode: string; deity?: string }
) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210, H = 297, M = 14
  let y = 0

  const rgb = (c: [number,number,number]) => doc.setTextColor(c[0], c[1], c[2])
  const fill = (c: [number,number,number]) => doc.setFillColor(c[0], c[1], c[2])
  const draw = (c: [number,number,number]) => doc.setDrawColor(c[0], c[1], c[2])

  const newPage = () => {
    doc.addPage()
    y = 0
    // Saffron top bar
    fill(C.saffron)
    doc.rect(0, 0, W, 1.8, 'F')
    // Bottom footer
    fill(C.darkBg)
    doc.rect(0, H - 12, W, 12, 'F')
    rgb(C.gold)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('DivyaDarshan  |  India\'s Temple Explorer  |  divyadarshan.in', W / 2, H - 4.5, { align: 'center' })
    rgb(C.muted)
    doc.text(`${form.from} -> ${form.to}`, W - M, H - 4.5, { align: 'right' })
    y = 5
  }

  const checkY = (needed: number) => {
    if (y + needed > H - 16) newPage()
  }

  // ── COVER PAGE ─────────────────────────────────────────────────────────────
  // Dark header band
  fill(C.darkBg)
  doc.rect(0, 0, W, 58, 'F')

  // Saffron accent lines
  fill(C.saffron)
  doc.rect(0, 58, W, 1.5, 'F')
  fill(C.gold)
  doc.rect(0, 60, W, 0.5, 'F')

  // Logo area (white rounded rect)
  fill(C.white)
  doc.roundedRect(M, 8, 72, 36, 4, 4, 'F')

  // Logo text (since image may not be base64 available client-side)
  rgb(C.crimson)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('DivyaDarshan', M + 8, 24)
  rgb(C.saffron)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text("INDIA'S TEMPLE EXPLORER", M + 8, 31)

  // YATRA PLAN title badge (right side)
  fill(C.crimson)
  doc.roundedRect(W - 80, 10, 66, 20, 3, 3, 'F')
  rgb(C.white)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('YATRA PLAN', W - 47, 18, { align: 'center' })
  rgb(C.gold)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  doc.text('Generated on  ' + today, W - 47, 25, { align: 'center' })

  // Route info card
  fill(C.white)
  doc.roundedRect(M, 68, W - M * 2, 36, 4, 4, 'F')
  draw(C.ivoryDark)
  doc.setLineWidth(0.3)
  doc.roundedRect(M, 68, W - M * 2, 36, 4, 4, 'S')

  // Saffron left bar on card
  fill(C.saffron)
  doc.roundedRect(M, 68, 1.5, 36, 1, 1, 'F')

  rgb(C.muted)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.text('FROM', M + 8, 79)
  doc.text('TO', M + 8, 94)

  rgb(C.ink)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(form.from, M + 26, 79)
  rgb(C.crimson)
  doc.setFontSize(15)
  doc.text(form.to, M + 26, 94)

  // Trip details row
  const details = [
    { label: 'DAYS', value: String(form.days) },
    { label: 'PILGRIMS', value: String(form.pilgrims) },
    { label: 'MODE', value: form.mode },
    ...(form.deity ? [{ label: 'DEITY', value: form.deity }] : []),
  ]
  let dx = M + 4
  fill(C.ivory)
  doc.rect(M, 110, W - M * 2, 18, 'F')
  for (const d of details.slice(0, 4)) {
    rgb(C.muted)
    doc.setFontSize(6.5)
    doc.setFont('helvetica', 'bold')
    doc.text(d.label, dx, 118)
    rgb(C.ink)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(d.value, dx, 124)
    dx += 44
  }

  // Saffron divider
  fill(C.saffron)
  doc.rect(M, 134, W - M * 2, 0.8, 'F')
  fill(C.gold)
  doc.rect(M, 135.2, W - M * 2, 0.3, 'F')

  y = 142

  // ── DAY SECTIONS ─────────────────────────────────────────────────────────
  const days = parseDays(itinerary)

  for (let i = 0; i < days.length; i++) {
    const day = days[i]
    checkY(28)

    // Day header band
    fill(C.crimson)
    doc.rect(M, y, W - M * 2, 10, 'F')
    // Saffron accent
    fill(C.saffron)
    doc.rect(M, y + 10, W - M * 2, 0.8, 'F')

    // Day number circle
    fill(C.gold)
    doc.circle(M + 6, y + 5, 4.5, 'F')
    rgb(C.darkBg)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text(String(i + 1), M + 6, y + 7.5, { align: 'center' })

    // Day title
    rgb(C.white)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(cleanText(day.title), M + 14, y + 7)
    y += 12

    // Day content
    fill(C.ivory)
    const contentStart = y
    doc.rect(M, y, W - M * 2, 4, 'F') // will be extended
    y += 4

    for (const line of day.lines) {
      checkY(16)
      const cleaned = cleanText(line)
      if (!cleaned) continue

      // Detect special lines
      const isTip = /^tip[:]/i.test(cleaned)
      const isStay = /^stay[:]/i.test(cleaned)
      const isTime = /^(morning|afternoon|evening|night)[:]/i.test(cleaned)

      if (isTip) {
        fill([255, 248, 220])
        doc.rect(M + 4, y - 1, W - M * 2 - 8, 8, 'F')
        draw(C.gold)
        doc.setLineWidth(0.3)
        doc.rect(M + 4, y - 1, W - M * 2 - 8, 8, 'S')
        rgb(C.saffron)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text('TIP  ', M + 7, y + 4.5)
        rgb(C.ink)
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(8)
        const tipText = doc.splitTextToSize(cleaned.replace(/^tip[:]/i, '').trim(), W - M * 2 - 30)
        doc.text(tipText, M + 18, y + 4.5)
        y += Math.max(8, tipText.length * 4.5) + 2
      } else if (isStay) {
        fill([232, 245, 233])
        doc.rect(M + 4, y - 1, W - M * 2 - 8, 8, 'F')
        rgb([27, 94, 32])
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.text('STAY  ', M + 7, y + 4.5)
        rgb(C.ink)
        doc.setFont('helvetica', 'normal')
        doc.text(cleaned.replace(/^stay[:]/i, '').trim(), M + 22, y + 4.5)
        y += 10
      } else if (isTime) {
        // Time-tagged line
        const colonIdx = cleaned.indexOf(':')
        const timeLabel = cleaned.slice(0, colonIdx).toUpperCase()
        const content = cleaned.slice(colonIdx + 1).trim()
        // Dot indicator
        fill(C.saffron)
        doc.circle(M + 8, y + 2, 1.5, 'F')
        rgb(C.saffron)
        doc.setFontSize(7.5)
        doc.setFont('helvetica', 'bold')
        doc.text(timeLabel, M + 12, y + 4)
        rgb(C.ink)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        const wrapped = doc.splitTextToSize(content, W - M * 2 - 38)
        doc.text(wrapped, M + 38, y + 4)
        // Saffron timeline line
        draw(C.ivoryDark)
        doc.setLineWidth(0.5)
        doc.line(M + 8, y + 3.5, M + 8, y + 4 + wrapped.length * 4.5)
        y += Math.max(8, wrapped.length * 4.5) + 2
      } else {
        // Regular bullet
        fill(C.crimson)
        doc.circle(M + 8, y + 2, 1, 'F')
        rgb(C.ink)
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        const wrapped = doc.splitTextToSize(cleaned, W - M * 2 - 20)
        doc.text(wrapped, M + 13, y + 4)
        y += Math.max(7, wrapped.length * 4.5) + 1
      }
    }

    // Bottom border on content
    fill(C.ivoryDark)
    doc.rect(M, y, W - M * 2, 0.5, 'F')
    y += 6
  }

  // ── SUMMARY SECTION ────────────────────────────────────────────────────────
  checkY(48)
  fill(C.darkBg)
  doc.rect(M, y, W - M * 2, 10, 'F')
  fill(C.saffron)
  doc.rect(M, y + 10, W - M * 2, 0.8, 'F')
  rgb(C.white)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('PILGRIMAGE SUMMARY', M + 8, y + 7)
  y += 14

  // Extract budget line
  const budgetLine = itinerary.split('\n').find(l =>
    /budget|cost|per person/i.test(l)
  )
  const budgetText = budgetLine
    ? cleanText(budgetLine).replace(/[*#]+/g, '').trim()
    : 'Estimated budget available on request'

  fill(C.ivory)
  doc.rect(M, y, W - M * 2, 26, 'F')
  draw(C.saffron)
  doc.setLineWidth(0.4)
  doc.rect(M, y, W - M * 2, 26, 'S')
  fill(C.saffron)
  doc.rect(M, y, 1.5, 26, 'F')

  rgb(C.crimson)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL BUDGET ESTIMATE', M + 8, y + 9)
  rgb(C.ink)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(budgetText, M + 8, y + 19)
  y += 32

  // Footer on last page
  fill(C.darkBg)
  doc.rect(0, H - 12, W, 12, 'F')
  rgb(C.gold)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text('DivyaDarshan  |  India\'s Temple Explorer  |  divyadarshan.in', W / 2, H - 4.5, { align: 'center' })
  rgb(C.saffron)
  doc.text('Plan your next yatra at divyadarshan-psi.vercel.app', W - M, H - 4.5, { align: 'right' })

  // Save
  const filename = `DivyaDarshan-Yatra-${form.to.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`
  doc.save(filename)
}

// ── WORD EXPORT ───────────────────────────────────────────────────────────────
export async function downloadPlanAsWord(
  itinerary: string,
  form: { from: string; to: string; days: number; pilgrims: number; mode: string; deity?: string }
) {
  const days = parseDays(itinerary)
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  const children: Paragraph[] = []

  // Title
  children.push(new Paragraph({
    children: [new TextRun({ text: 'YATRA PLAN', bold: true, size: 36, color: '8B1A1A', font: 'Arial' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: 'C0570A', space: 4 } },
  }))

  children.push(new Paragraph({
    children: [new TextRun({ text: 'DivyaDarshan - India\'s Temple Explorer', size: 18, color: 'C0570A', font: 'Arial', italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }))

  // Route box
  children.push(new Paragraph({
    children: [
      new TextRun({ text: 'FROM:  ', bold: true, size: 20, color: '888888', font: 'Arial' }),
      new TextRun({ text: form.from, bold: true, size: 22, color: '1A0A00', font: 'Arial' }),
    ],
    spacing: { before: 100, after: 60 },
    indent: { left: 360 },
    border: { left: { style: BorderStyle.THICK, size: 12, color: 'C0570A', space: 8 } },
  }))

  children.push(new Paragraph({
    children: [
      new TextRun({ text: 'TO:       ', bold: true, size: 20, color: '888888', font: 'Arial' }),
      new TextRun({ text: form.to, bold: true, size: 24, color: '8B1A1A', font: 'Arial' }),
    ],
    spacing: { after: 100 },
    indent: { left: 360 },
    border: { left: { style: BorderStyle.THICK, size: 12, color: 'C0570A', space: 8 } },
  }))

  // Trip details
  children.push(new Paragraph({
    children: [
      new TextRun({ text: `  ${form.days} Days  |  ${form.pilgrims} Pilgrim${form.pilgrims > 1 ? 's' : ''}  |  ${form.mode}${form.deity ? '  |  ' + form.deity : ''}  |  Generated: ${today}`, size: 17, color: '555555', font: 'Arial' }),
    ],
    shading: { type: ShadingType.SOLID, color: 'FDF8F2' },
    spacing: { before: 100, after: 300 },
    indent: { left: 200, right: 200 },
  }))

  // Day sections
  for (let i = 0; i < days.length; i++) {
    const day = days[i]

    // Day heading
    children.push(new Paragraph({
      children: [
        new TextRun({ text: `  Day ${i + 1}  `, bold: true, size: 24, color: 'FFFFFF', font: 'Arial' }),
        new TextRun({ text: `  ${cleanText(day.title)}  `, bold: true, size: 22, color: 'FFFFFF', font: 'Arial' }),
      ],
      shading: { type: ShadingType.SOLID, color: '8B1A1A' },
      spacing: { before: 300, after: 40 },
    }))

    // Saffron underline
    children.push(new Paragraph({
      children: [new TextRun({ text: '', size: 4 })],
      shading: { type: ShadingType.SOLID, color: 'C0570A' },
      spacing: { after: 120 },
    }))

    // Lines
    for (const line of day.lines) {
      const cleaned = cleanText(line)
      if (!cleaned) continue

      const isTip = /^tip[:]/i.test(cleaned)
      const isStay = /^stay[:]/i.test(cleaned)

      if (isTip) {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: 'TIP   ', bold: true, size: 18, color: 'C0570A', font: 'Arial' }),
            new TextRun({ text: cleaned.replace(/^tip[:]/i, '').trim(), size: 18, color: '555555', italics: true, font: 'Arial' }),
          ],
          shading: { type: ShadingType.SOLID, color: 'FFFBEA' },
          spacing: { before: 80, after: 80 },
          indent: { left: 360, right: 200 },
          border: { left: { style: BorderStyle.SINGLE, size: 8, color: 'D4A017', space: 6 } },
        }))
      } else if (isStay) {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: 'STAY   ', bold: true, size: 18, color: '1B5E20', font: 'Arial' }),
            new TextRun({ text: cleaned.replace(/^stay[:]/i, '').trim(), size: 18, color: '333333', font: 'Arial' }),
          ],
          shading: { type: ShadingType.SOLID, color: 'E8F5E9' },
          spacing: { before: 80, after: 80 },
          indent: { left: 360 },
          border: { left: { style: BorderStyle.SINGLE, size: 8, color: '2E7D32', space: 6 } },
        }))
      } else {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: '  ->  ', bold: true, size: 18, color: 'C0570A', font: 'Arial' }),
            new TextRun({ text: cleaned, size: 18, color: '1A0A00', font: 'Arial' }),
          ],
          spacing: { before: 60, after: 60 },
          indent: { left: 280 },
        }))
      }
    }

    children.push(new Paragraph({
      children: [new TextRun({ text: '', size: 6 })],
      shading: { type: ShadingType.SOLID, color: 'F0E8DC' },
      spacing: { after: 160 },
    }))
  }

  // Budget section
  const budgetLine = itinerary.split('\n').find(l => /budget|cost|per person/i.test(l))
  const budgetText = budgetLine
    ? cleanText(budgetLine).replace(/[*#]+/g, '').trim()
    : 'Estimated budget available on request'

  children.push(new Paragraph({
    children: [new TextRun({ text: 'BUDGET SUMMARY', bold: true, size: 22, color: 'FFFFFF', font: 'Arial' })],
    shading: { type: ShadingType.SOLID, color: '1A0A00' },
    spacing: { before: 300, after: 40 },
  }))
  children.push(new Paragraph({
    children: [new TextRun({ text: budgetText, bold: true, size: 20, color: '8B1A1A', font: 'Arial' })],
    shading: { type: ShadingType.SOLID, color: 'FDF8F2' },
    spacing: { after: 400 },
    indent: { left: 360 },
    border: { left: { style: BorderStyle.THICK, size: 12, color: 'C0570A', space: 8 } },
  }))

  // Footer
  children.push(new Paragraph({
    children: [new TextRun({ text: 'DivyaDarshan  |  India\'s Temple Explorer  |  divyadarshan-psi.vercel.app  |  Planned with love for pilgrims', size: 16, color: 'AAAAAA', italics: true, font: 'Arial' })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 200 },
    border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'C0570A', space: 6 } },
  }))

  const doc = new Document({
    sections: [{ children }],
    styles: {
      default: {
        document: { run: { font: 'Arial', size: 20 } }
      }
    }
  })

  const buffer = await Packer.toBuffer(doc)
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `DivyaDarshan-Yatra-${form.to.replace(/[^a-zA-Z0-9]/g, '-')}.docx`
  a.click()
  URL.revokeObjectURL(url)
}
