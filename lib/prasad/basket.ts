'use client'
// The "Plan my puja" basket lives in the browser (localStorage) — no sign-in needed.
import type { BasketItem } from './merge'

const KEY = 'dd_puja_basket_v1'

export function loadBasket(): BasketItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch { return [] }
}

export function saveBasket(items: BasketItem[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* private mode etc. */ }
  try { window.dispatchEvent(new Event('dd-basket')) } catch { /* ignore */ }
}

export function upsertBasket(item: BasketItem) {
  const cur = loadBasket().filter(x => x.key !== item.key)
  saveBasket([...cur, item])
}

export function removeFromBasket(key: string) {
  saveBasket(loadBasket().filter(x => x.key !== key))
}
