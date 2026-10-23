// "Buy online" search links for shopping-list items. These are plain search links.
// Affiliate-ready: set NEXT_PUBLIC_AMAZON_TAG (Amazon Associates tag) in Vercel and the Amazon
// link carries it automatically. Nothing is earned or tracked unless that is set.
export interface Store { id: string; name: string; href: (q: string) => string }

const tag = process.env.NEXT_PUBLIC_AMAZON_TAG

export const STORES: Store[] = [
  { id: 'bigbasket', name: 'BigBasket', href: q => `https://www.bigbasket.com/ps/?q=${encodeURIComponent(q)}` },
  { id: 'blinkit', name: 'Blinkit', href: q => `https://blinkit.com/s/?q=${encodeURIComponent(q)}` },
  { id: 'amazon', name: 'Amazon', href: q => `https://www.amazon.in/s?k=${encodeURIComponent(q)}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}` },
  { id: 'jiomart', name: 'JioMart', href: q => `https://www.jiomart.com/search/${encodeURIComponent(q)}` },
]

export const HAS_AFFILIATE = !!tag

/** Clean an ingredient name into a good store search ("grated jaggery" → "jaggery"). */
export function searchTerm(name: string): string {
  return name.replace(/\b(grated|crushed|powdered|roasted|toasted|chopped|sliced|cooked|soaked|boiled|dry|dried|thick|thin|extra)\b/gi, '').replace(/\s+/g, ' ').trim() || name
}

/** Things nobody buys online. */
export function buyable(name: string): boolean {
  return !/^(water|ice|banana leaf|banana leaves|bilva leaves|tulsi leaves|durva|dub|flowers?|petals)$/i.test(name.trim())
}
