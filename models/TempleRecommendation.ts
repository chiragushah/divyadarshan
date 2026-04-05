import { Schema, model, models, Document } from 'mongoose'

export interface ITempleRecommendation extends Document {
  name: string; state: string; city: string; deity: string; type: string
  description: string; address: string; timing: string; best_time: string
  dress_code: string; festivals: string; has_live: boolean; live_url: string
  website: string; lat: string; lng: string; image_url: string
  recommender_name: string; recommender_email: string; recommender_phone: string
  recommender_note: string; is_member: boolean
  status: 'pending' | 'approved' | 'rejected' | 'added'
  admin_note: string; createdAt: Date
}

const TempleRecommendationSchema = new Schema<ITempleRecommendation>({
  name:              { type: String, required: true },
  state:             { type: String, required: true },
  city:              { type: String, required: true },
  deity:             { type: String, required: true },
  type:              { type: String, default: '' },
  description:       { type: String, default: '' },
  address:           { type: String, default: '' },
  timing:            { type: String, default: '' },
  best_time:         { type: String, default: '' },
  dress_code:        { type: String, default: '' },
  festivals:         { type: String, default: '' },
  has_live:          { type: Boolean, default: false },
  live_url:          { type: String, default: '' },
  website:           { type: String, default: '' },
  lat:               { type: String, default: '' },
  lng:               { type: String, default: '' },
  image_url:         { type: String, default: '' },
  recommender_name:  { type: String, required: true },
  recommender_email: { type: String, required: true },
  recommender_phone: { type: String, default: '' },
  recommender_note:  { type: String, default: '' },
  is_member:         { type: Boolean, default: false },
  status:            { type: String, enum: ['pending','approved','rejected','added'], default: 'pending' },
  admin_note:        { type: String, default: '' },
}, { timestamps: true })

export const TempleRecommendation = models.TempleRecommendation || model<ITempleRecommendation>('TempleRecommendation', TempleRecommendationSchema)
