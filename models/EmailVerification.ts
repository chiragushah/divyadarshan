import { Schema, model, models, type Model } from 'mongoose'

// One live confirmation link per email address. Only the SHA-256 of the token is stored.
const EmailVerificationSchema = new Schema(
  {
    email:       { type: String, required: true, lowercase: true, unique: true },
    token_hash:  { type: String, required: true, index: true },
    expires_at:  { type: Date, required: true },
    last_sent_at:{ type: Date, required: true },
    sent_day:    { type: String, default: '' },     // YYYY-MM-DD of the counter below
    sent_today:  { type: Number, default: 0 },
  },
  { timestamps: true }
)
EmailVerificationSchema.index({ expires_at: 1 }, { expireAfterSeconds: 7 * 24 * 3600 })   // tidy up long-dead tokens
export const EmailVerification: Model<any> = models.EmailVerification || model('EmailVerification', EmailVerificationSchema)
