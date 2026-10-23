import { Schema, model, models, type Model } from 'mongoose'

// "Ask this temple to stream" — one vote per signed-in user per temple.
const StreamRequestSchema = new Schema(
  {
    temple_slug: { type: String, required: true, index: true },
    user_email:  { type: String, required: true, lowercase: true },
  },
  { timestamps: true }
)
StreamRequestSchema.index({ temple_slug: 1, user_email: 1 }, { unique: true })
export const StreamRequest: Model<any> = models.StreamRequest || model('StreamRequest', StreamRequestSchema)
