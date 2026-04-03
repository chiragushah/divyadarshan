import { Schema, model, models, Document } from 'mongoose'

export interface IAdminRequest extends Document {
  user_email: string
  user_name: string
  reason: string
  organisation?: string
  status: 'pending' | 'approved' | 'rejected'
  reviewed_by?: string
  reviewed_at?: Date
  createdAt: Date
  updatedAt: Date
}

const AdminRequestSchema = new Schema<IAdminRequest>({
  user_email:   { type: String, required: true, unique: true },
  user_name:    { type: String, required: true },
  reason:       { type: String, required: true },
  organisation: { type: String },
  status:       { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewed_by:  { type: String },
  reviewed_at:  { type: Date },
}, { timestamps: true })

export const AdminRequest = models.AdminRequest || model<IAdminRequest>('AdminRequest', AdminRequestSchema)
