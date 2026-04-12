// Shared security utilities for DivyaDarshanam

const rateLimitStore = new Map()

export function rateLimit(ip, action, options) {
  const limit = (options && options.limit) || 10
  const windowMs = (options && options.windowMs) || 60000
  const key = action + ':' + ip
  const now = Date.now()
  const entry = rateLimitStore.get(key)
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    if (rateLimitStore.size > 1000) {
      for (const [k, v] of rateLimitStore) {
        if (now > v.resetAt) rateLimitStore.delete(k)
      }
    }
    return { allowed: true, remaining: limit - 1, resetIn: windowMs }
  }
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now }
  }
  entry.count++
  return { allowed: true, remaining: limit - entry.count, resetIn: entry.resetAt - now }
}

export function sanitizeQuery(input) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[\$\{\}\(\)\[\]\|\*\+\?\.\^\\]/g, '\\$&')
    .slice(0, 200)
    .trim()
}

export function sanitizeText(input, maxLen) {
  if (typeof input !== 'string') return ''
  maxLen = maxLen || 500
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'`]/g, '')
    .slice(0, maxLen)
    .trim()
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

export function isValidPassword(password) {
  if (password.length < 8)  return { valid: false, reason: 'Password must be at least 8 characters' }
  if (password.length > 128) return { valid: false, reason: 'Password too long' }
  return { valid: true }
}

export function getIP(req) {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

export function rateLimitResponse(resetIn) {
  const seconds = Math.ceil(resetIn / 1000)
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please wait ' + seconds + ' seconds.' }),
    {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': String(seconds) },
    }
  )
}

export async function parseBody(req, maxBytes) {
  maxBytes = maxBytes || 50000
  const contentLength = req.headers.get('content-length')
  if (contentLength && parseInt(contentLength) > maxBytes) {
    throw new Error('Request body too large')
  }
  const text = await req.text()
  if (text.length > maxBytes) throw new Error('Request body too large')
  return JSON.parse(text)
}