import mongoose, { Schema, model, models, Document } from 'mongoose'

export interface ITemple extends Document {
  slug: string
  name: string
  state: string
  city: string
  deity: string
  type: string
  description: string
  festivals?: string
  timing?: string
  best_time?: string
  dress_code?: string
  categories: string[]
  has_live: boolean
  live_url?: string
  lat?: number
  lng?: number
  image_url?: string
  rating_avg: number
  rating_count: number
  createdAt: Date
  updatedAt: Date
}

const TempleSchema = new Schema<ITemple>(
  {
    slug:         { type: String, required: true, unique: true, index: true },
    name:         { type: String, required: true },
    state:        { type: String, required: true, index: true },
    city:         { type: String, required: true },
    deity:        { type: String, required: true, index: true },
    type:         { type: String, required: true },
    description:  { type: String, required: true },
    festivals:    { type: String },
    timing:       { type: String },
    best_time:    { type: String },
    dress_code:   { type: String },
    categories:   { type: [String], default: [], index: true },
    has_live:     { type: Boolean, default: false, index: true },
    live_url:     { type: String },
    lat:          { type: Number },
    lng:          { type: Number },
    image_url:    { type: String },
    rating_avg:   { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    // Compound indexes for common query patterns
    // e.g. state + deity filter
  }
)

// Full-text search index — enables $text queries
TempleSchema.index(
  { name: 'text', city: 'text', state: 'text', deity: 'text', description: 'text', type: 'text' },
  { weights: { name: 10, deity: 5, city: 4, state: 3, type: 2, description: 1 }, name: 'temple_text_search' }
)

// Compound index for geo-nearby queries
TempleSchema.index({ lat: 1, lng: 1 })

// Prevent model recompilation in hot-reload
export const Temple = models.Temple || model<ITemple>('Temple', TempleSchema)
