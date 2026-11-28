// Illustrative AI-generated photographs of each prasad (public/prasad/<dish-id>.jpg).
// A dish without a file simply shows no picture. Add the id here when the file is added.
const HAVE = new Set<string>(["annakut", "appam", "aravana-payasam", "chhappan-bhog", "dalma", "diwali-faral", "ghewar", "gopalkala", "halwa-sheera", "kanya-pujan", "karthigai-pori", "khaja", "kheel-batasha", "kheer-payasam", "khichdi-bhog", "kosambari", "krishna-snacks", "labra", "lohri-til-rewari", "narali-bhat", "narkel-naru-sandesh", "pana", "panakam", "pitha", "puliyodarai", "puri-mahaprasad", "sev-ravo", "sundal", "sunthavda", "sweet-pongal", "tahiri-akha", "thekua", "ven-pongal"])

export function prasadImage(dishId: string): string | null {
  return HAVE.has(dishId) ? `/prasad/${dishId}.jpg` : null
}
