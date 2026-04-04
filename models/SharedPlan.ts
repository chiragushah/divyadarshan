import { Schema, model, models, Document } from 'mongoose'

export interface ISharedPlan extends Document {
  from: string; to: string; days: number; pilgrims: number
  mode: string; deity: string; itinerary: string
  shared_by: string; shared_with: string; message: string
  read: boolean; createdAt: Date
}

const SharedPlanSchema = new Schema<ISharedPlan>({
  from:        { type: String, required: true },
  to:          { type: String, required: true },
  days:        { type: Number, default: 3 },
  pilgrims:    { type: Number, default: 2 },
  mode:        { type: String, default: 'Mixed' },
  deity:       { type: String, default: '' },
  itinerary:   { type: String, required: true },
  shared_by:   { type: String, required: true },
  shared_with: { type: String, required: true },
  message:     { type: String, default: '' },
  read:        { type: Boolean, default: false },
}, { timestamps: true })

export const SharedPlan = models.SharedPlan || model<ISharedPlan>('SharedPlan', SharedPlanSchema)
