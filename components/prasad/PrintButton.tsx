'use client'
import { Printer } from 'lucide-react'

export default function PrintButton() {
  return (
    <button className="btn btn-primary no-print" onClick={() => window.print()} style={{ display: 'inline-flex', gap: 7, alignItems: 'center' }}>
      <Printer size={16} /> Print or save as PDF
    </button>
  )
}
