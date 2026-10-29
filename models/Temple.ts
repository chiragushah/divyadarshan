import mongoose, { Schema, model, models, Document } from 'mongoose'

export interface IPooja {
  name: string           // e.g. "Rudrabhishek", "Sahasranamarchana"
  description: string    // what it is, significance
  price?: string         // e.g. "₹500", "₹1,100 – ₹5,100"
  duration?: string      // e.g. "45 minutes", "2 hours"
  booking_url?: string   // link to book online if available
  is_famous?: boolean    // mark as "temple's most famous pooja"
  best_for?: string      // e.g. "wealth", "health", "marriage", "moksha"
}

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
  live_status?: 'official' | 'channel' | 'unverified' | 'none'   // verified by us? (missing = unverified if has_live)
  live_verified_at?: Date
  live_note?: string
  live_schedule?: ILiveSlot[]
  poojas?: IPooja[]              // ← Recommended poojas at this temple
  lat?: number
  lng?: number
  image_url?: string
  open_months?: number[]       // e.g. [5,6,7,8,9,10,11] = May-Nov open
  closed_months?: number[]     // e.g. [11,12,1,2,3,4] = Nov-Apr closed
  seasonal_note?: string       // e.g. "Opens on Akshaya Tritiya, closes on Bhai Dooj"
  is_seasonal?: boolean
  // Open-data import (basic listings)
  is_basic?: boolean            // true = sparse record from open data; details not yet verified
  data_source?: string          // e.g. "Wikidata"
  source_url?: string
  licence?: string
  import_batch?: string
  wikidata_id?: string
  wikipedia_url?: string
  district?: string
  native_name?: string
  name_hindi?: string
  deity_source?: string         // "Wikidata" | "Inferred from name" | "Curated"
  name_source?: string
  heritage_status?: string
  part_of?: string
  description_source?: string
  description_source_url?: string
  image_credit?: string
  image_credit_url?: string
  enriched_at?: Date
  enrich_status?: string
  rating_avg: number
  rating_count: number
  createdAt: Date
  updatedAt: Date
}

const PoojaSchema = new Schema<IPooja>({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: String },
  duration:    { type: String },
  booking_url: { type: String },
  is_famous:   { type: Boolean, default: false },
  best_for:    { type: String },
}, { _id: false })

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
    live_status:          { type: String, enum: ['official', 'channel', 'unverified', 'none'], index: true },
    live_verified_at:     { type: Date },
    live_note:            { type: String },
    live_schedule:        { type: [LiveSlotSchema], default: [] },
    poojas:               { type: [PoojaSchema], default: [] },  // ← Recommended poojas
    lat:                  { type: Number },
    lng:                  { type: Number },
    image_url:            { type: String },
    is_basic:             { type: Boolean, index: true },
    data_source:          { type: String },
    source_url:           { type: String },
    licence:              { type: String },
    import_batch:         { type: String, index: true },
    wikidata_id:          { type: String, index: true, sparse: true },
    wikipedia_url:        { type: String },
    district:             { type: String },
    native_name:          { type: String },
    name_hindi:           { type: String },
    deity_source:         { type: String },
    name_source:          { type: String },
    heritage_status:      { type: String },
    part_of:              { type: String },
    description_source:   { type: String },
    description_source_url: { type: String },
    image_credit:         { type: String },
    image_credit_url:     { type: String },
    enriched_at:          { type: Date },
    enrich_status:        { type: String },
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
