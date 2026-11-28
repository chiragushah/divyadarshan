// Illustrative AI-generated photographs of each prasad (public/prasad/<dish-id>.jpg).
// A dish without a file simply shows no picture. Add the id here when the file is added.
const HAVE = new Set<string>(["annakut", "appam", "aravana-payasam", "charanamrit", "chhappan-bhog", "dalma", "diwali-faral", "ghewar", "gopalkala", "gujiya", "halwa-sheera", "kanya-pujan", "karthigai-pori", "khaja", "kheel-batasha", "kheer-payasam", "khichdi-bhog", "kosambari", "krishna-snacks", "labra", "laddu", "lohri-til-rewari", "makhan-mishri", "modak", "narali-bhat", "narkel-naru-sandesh", "pana", "panakam", "panchamrit", "panjiri", "pinda", "pitha", "puliyodarai", "puran-poli", "puri-mahaprasad", "sev-ravo", "sundal", "sunthavda", "sweet-pongal", "tahiri-akha", "thandai", "thekua", "tilgul", "ugadi-pachadi", "ven-pongal"])

export function prasadImage(dishId: string): string | null {
  return HAVE.has(dishId) ? `/prasad/${dishId}.jpg` : null
}
