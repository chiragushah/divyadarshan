import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'

// ─── MONGOOSE CONNECTION ──────────────────────────────────
// Singleton pattern — reuses connection across serverless invocations
// This is critical for Next.js to avoid connection exhaustion

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env.local file')
}

// Global cache to survive hot reloads in dev
declare global {
  var mongoose_cache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

let cached = global.mongoose_cache

if (!cached) {
  cached = global.mongoose_cache = { conn: null, promise: null }
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,         // Keep 10 connections open
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,               // Use IPv4 — avoids some Atlas connection issues
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

// ─── NATIVE MONGODB CLIENT (for NextAuth adapter) ─────────
// NextAuth needs the native MongoClient, not Mongoose

declare global {
  var mongodb_client_promise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  if (!global.mongodb_client_promise) {
    const client = new MongoClient(MONGODB_URI)
    global.mongodb_client_promise = client.connect()
  }
  clientPromise = global.mongodb_client_promise
} else {
  const client = new MongoClient(MONGODB_URI)
  clientPromise = client.connect()
}

export { clientPromise }
export default connectDB
