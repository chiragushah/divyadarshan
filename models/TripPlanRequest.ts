import { Schema, model, models, Document } from 'mongoose'

export interface ITripPlanRequest extends Document {
  // User info
  name:         string
  email:        string
  phone:        string
  city:         string

  // Trip details
  from:         string
  to:           string
  days:         number
  pilgrims:     number
  mode:         string
  deity:        string
  budget:       string
  special_notes: string

  // AI itinerary they already generated
  ai_itinerary: string

  // Status
  status:       'new' | 'contacted' | 'confirmed' | 'completed'
  admin_notes:  string
  quoted_price: string

  createdAt:    Date
  updatedAt:    Date
}

const TripPlanRequestSchema = new Schema<ITripPlanRequest>({
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String, default: '' },
  city:          { type: String, default: '' },
  from:          { type: String, required: true },
  to:            { type: String, required: true },
  days:          { type: Number, default: 3 },
  pilgrims:      { type: Number, default: 2 },
  mode:          { type: String, default: 'Mixed' },
  deity:         { type: String, default: '' },
  budget:        { type: String, default: '' },
  special_notes: { type: String, default: '' },
  ai_itinerary:  { type: String, default: '' },
  status:        { type: String, enum: ['new','contacted','confirmed','completed'], default: 'new' },
  admin_notes:   { type: String, default: '' },
  quoted_price:  { type: String, default: '' },
}, { timestamps: true })

export const TripPlanRequest = models.TripPlanRequest || model<ITripPlanRequest>('TripPlanRequest', TripPlanRequestSchema)
