import { Schema, model, models, Document, Types } from 'mongoose'

export interface IJournalEntry extends Document {
  user_id: Types.ObjectId
  temple_id?: Types.ObjectId
  temple_name: string
  visit_date: Date
  note?: string
  feeling: string
  stars: number
  photo_url?: string
  deity?: string
  state?: string
  createdAt: Date
  updatedAt: Date
}

const JournalSchema = new Schema<IJournalEntry>(
  {
    user_id:     { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    temple_id:   { type: Schema.Types.ObjectId, ref: 'Temple' },
    temple_name: { type: String, required: true },
    visit_date:  { type: Date, required: true },
    note:        { type: String },
    feeling:     { type: String, default: 'Peaceful' },
    stars:       { type: Number, default: 5, min: 1, max: 5 },
    photo_url:   { type: String },
    deity:       { type: String },
    state:       { type: String },
  },
  { timestamps: true }
)

JournalSchema.index({ user_id: 1, visit_date: -1 })

export const JournalEntry = models.JournalEntry || model<IJournalEntry>('JournalEntry', JournalSchema)
