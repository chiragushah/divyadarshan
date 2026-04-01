import mongoose, { Schema, model, models, Document } from 'mongoose'

export interface ILiveSlot {
  day: 'everyday' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
  time: string   // e.g. "06:00", "12:00", "19:00"
  label?: string // e.g. "Morning Aarti", "Noon Darshan", "Sandhya Aarti"
}

export interface ITemple extends Document {
  slug: string
  name: string
  state: string
  city: string
  deity: string
  type: string
  description: string
  extended_description?: string
  nearby_places?: string[]
  how_to_reach?: Record<string, string>
  facilities?: Record<string, string>
  festivals?: string
  timing?: string
  best_time?: string
  dress_code?: string
  official_website?: string
  categories: string[]
  has_live: boolean
  live_url?: string
  live_schedule?: ILiveSlot[]   // ← NEW: structured schedule for live darshan
  lat?: number
  lng?: number
  image_url?: string
  rating_avg: number
  rating_count: number
  createdAt: Date
  updatedAt: Date
}

const LiveSlotSchema = new Schema<ILiveSlot>({
  day:   { type: String, default: 'everyday' },
  time:  { type: String, required: true },
  label: { type: String },
}, { _id: false })

const TempleSchema = new Schema<ITemple>(
  {
    slug:                 { type: String, required: true, unique: true, index: true },
    name:                 { type: String, required: true },
    state:                { type: String, required: true, index: true },
    city:                 { type: String, required: true },
    deity:                { type: String, required: true, index: true },
    type:                 { type: String, required: true },
    description:          { type: String, required: true },
    extended_description: { type: String },
    nearby_places:        { type: [String], default: [] },
    how_to_reach:         { type: Schema.Types.Mixed },
    facilities:           { type: Schema.Types.Mixed },
    festivals:            { type: String },
    timing:               { type: String },
    best_time:            { type: String },
    dress_code:           { type: String },
    official_website:     { type: String },
    categories:           { type: [String], default: [], index: true },
    has_live:             { type: Boolean, default: false, index: true },
    live_url:             { type: String },
    live_schedule:        { type: [LiveSlotSchema], default: [] },  // ← NEW
    lat:                  { type: Number },
    lng:                  { type: Number },
    image_url:            { type: String },
    rating_avg:           { type: Number, default: 0 },
    rating_count:         { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Full-text search index
TempleSchema.index(
  { name: 'text', city: 'text', state: 'text', deity: 'text', description: 'text', type: 'text' },
  { weights: { name: 10, deity: 5, city: 4, state: 3, type: 2, description: 1 }, name: 'temple_text_search' }
)

// Geo index
TempleSchema.index({ lat: 1, lng: 1 })

export const Temple = models.Temple || model<ITemple>('Temple', TempleSchema)
