import { Schema, model, models, Document, Types } from 'mongoose'

export interface ISankalp extends Document {
  user_id?: Types.ObjectId
  user_email?: string
  user_name?: string
  intention: string
  deity: string
  category: string
  timeline: string
  temple_slug?: string
  temple_name?: string
  gratitude_yatra: boolean
  privacy: 'private' | 'anonymous' | 'public'
  status: 'active' | 'fulfilled' | 'released'
  fulfilled_note?: string
  fulfilled_at?: Date
  createdAt: Date
}

const SankalpSchema = new Schema<ISankalp>({
  user_id:        { type: Schema.Types.ObjectId, ref: 'User' },
  user_email:     { type: String, default: '' },
  user_name:      { type: String, default: 'Anonymous Pilgrim' },
  intention:      { type: String, required: true },
  deity:          { type: String, required: true },
  category:       { type: String, default: '' },
  timeline:       { type: String, default: '' },
  temple_slug:    { type: String, default: '' },
  temple_name:    { type: String, default: '' },
  gratitude_yatra:{ type: Boolean, default: false },
  privacy:        { type: String, enum: ['private','anonymous','public'], default: 'private' },
  status:         { type: String, enum: ['active','fulfilled','released'], default: 'active' },
  fulfilled_note: { type: String, default: '' },
  fulfilled_at:   { type: Date },
}, { timestamps: true })

export const Sankalp = models.Sankalp || model<ISankalp>('Sankalp', SankalpSchema)
