import { Schema, model, models, Document } from 'mongoose'

export interface IContribution extends Document {
  name: string
  email: string
  phone: string
  city: string
  occupation: string
  amount: number
  interest: string
  message: string
  status: 'new' | 'contacted' | 'confirmed' | 'declined'
  is_member: boolean
  createdAt: Date
}

const ContributionSchema = new Schema<IContribution>({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, default: '' },
  city:       { type: String, default: '' },
  occupation: { type: String, default: '' },
  amount:     { type: Number, required: true, min: 5000 },
  interest:   { type: String, default: '' },
  message:    { type: String, default: '' },
  status:     { type: String, enum: ['new','contacted','confirmed','declined'], default: 'new' },
  is_member:  { type: Boolean, default: false },
}, { timestamps: true })

export const Contribution = models.Contribution || model<IContribution>('Contribution', ContributionSchema)
