import { Schema, model, models, Document } from 'mongoose'

export interface IUser extends Document {
  name?: string
  email: string
  email_verified?: Date
  image?: string
  password?: string         // Hashed — only for email/password accounts
  provider: string          // 'google' | 'credentials'
  temples_visited: number
  yatra_count: number
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    phone:      { type: String, default: '' },
  name:            { type: String },
    email:           { type: String, required: true, unique: true, lowercase: true },
    email_verified:  { type: Date },
    image:           { type: String },
    password:        { type: String },   // bcrypt hash — never store plain text
    provider:        { type: String, default: 'credentials' },
    temples_visited: { type: Number, default: 0 },
    yatra_count:     { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const User = models.User || model<IUser>('User', UserSchema)
