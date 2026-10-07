// ─────────────────────────────────────────────────────────────────────────────
// Auto Circuit engine — build a do-it-in-one-trip temple circuit within a radius.
//
// Given an anchor temple and a pool of candidate temples (with lat/lng), this
// finds every temple inside the radius and sequences them into a sensible
// travel order (nearest-neighbour from the anchor). Pure geometry on
// coordinates we already store, so the distances are always correct — we label
// them as approximate by road (straight-line × a road factor), never as live.
// ─────────────────────────────────────────────────────────────────────────────

export interface GeoTemple {
  slug: string
  name: string
  deity?: string
  city?: string
  state?: string
  lat: number
  lng: number
  has_live?: boolean
  image_url?: string
  blob_image_url?: string
}

export interface CircuitStop extends GeoTemple {
  order: number
  legKm: number          // straight-line from the previous stop
  cumulativeKm: number   // straight-line running total from the anchor
  fromAnchorKm: number   // straight-line direct from the anchor
}

export interface Circuit {
  anchorName: string
  radiusKm: number
  count: number
  stops: CircuitStop[]
  totalKm: number        // straight-line path total
  roadKm: number         // approx by road (× road factor)
  daysText: string
}

const ROAD_FACTOR = 1.25

export function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371
  const dLat = (bLat - aLat) * Math.PI / 180
  const dLng = (bLng - aLng) * Math.PI / 180
  const la1 = aLat * Math.PI / 180
  const la2 = bLat * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

function daysFor(stops: number, roadKm: number): string {
  if (stops <= 2) return '1–2 days'
  if (stops <= 4) return '2–3 days'
  if (stops <= 6) return roadKm > 500 ? '3–5 days' : '3–4 days'
  return '4–6 days'
}

export function buildCircuit(
  anchor: { name: string; lat: number; lng: number },
  candidates: GeoTemple[],
  radiusKm = 200,
  maxStops = 8,
): Circuit {
  // Valid, in-radius candidates with their direct distance from the anchor.
  const pool = candidates
    .filter(c => typeof c.lat === 'number' && typeof c.lng === 'number' && (c.lat || c.lng))
    .map(c => ({ ...c, fromAnchorKm: haversineKm(anchor.lat, anchor.lng, c.lat, c.lng) }))
    .filter(c => c.fromAnchorKm > 0.3 && c.fromAnchorKm <= radiusKm)

  // Nearest-neighbour ordering starting at the anchor.
  const stops: CircuitStop[] = []
  let curLat = anchor.lat, curLng = anchor.lng
  let cumulative = 0
  const remaining = [...pool]
  while (stops.length < maxStops && remaining.length) {
    let bestI = 0, bestD = Infinity
    for (let i = 0; i < remaining.length; i++) {
      const d = haversineKm(curLat, curLng, remaining[i].lat, remaining[i].lng)
      if (d < bestD) { bestD = d; bestI = i }
    }
    const next = remaining.splice(bestI, 1)[0]
    cumulative += bestD
    stops.push({
      ...next,
      order: stops.length + 1,
      legKm: Math.round(bestD),
      cumulativeKm: Math.round(cumulative),
      fromAnchorKm: Math.round(next.fromAnchorKm),
    })
    curLat = next.lat; curLng = next.lng
  }

  const totalKm = Math.round(cumulative)
  const roadKm = Math.round(cumulative * ROAD_FACTOR)
  return {
    anchorName: anchor.name,
    radiusKm,
    count: stops.length,
    stops,
    totalKm,
    roadKm,
    daysText: daysFor(stops.length, roadKm),
  }
}

// A Google Maps directions URL that chains the anchor → all stops in order.
export function circuitMapsUrl(anchor: { lat: number; lng: number }, stops: CircuitStop[]): string {
  if (!stops.length) return ''
  const origin = `${anchor.lat},${anchor.lng}`
  const dest = `${stops[stops.length - 1].lat},${stops[stops.length - 1].lng}`
  const waypoints = stops.slice(0, -1).map(s => `${s.lat},${s.lng}`).join('|')
  const base = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`
  return waypoints ? `${base}&waypoints=${encodeURIComponent(waypoints)}` : base
}
