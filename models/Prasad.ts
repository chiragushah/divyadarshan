import { Schema, model, models, type Model } from 'mongoose'

// "Remind me N days before <festival> with the shopping list"
const PrasadReminderSchema = new Schema(
  {
    user_id:       { type: String, default: '' },
    user_email:    { type: String, required: true, lowercase: true },
    festival_slug: { type: String, required: true },
    items: [{
      dish:     { type: String, required: true },
      variant:  { type: String, required: true },
      servings: { type: Number, default: 5 },
      _id: false,
    }],
    days_before:   { type: Number, default: 7, min: 0, max: 30 },
    active:        { type: Boolean, default: true },
    last_sent_for: { type: String, default: '' },   // festival date (YYYY-MM-DD) last emailed for
  },
  { timestamps: true }
)
PrasadReminderSchema.index({ user_email: 1, festival_slug: 1 }, { unique: true })
export const PrasadReminder: Model<any> = models.PrasadReminder || model('PrasadReminder', PrasadReminderSchema)

// "My family's version" — household variations, held for moderation before they show publicly.
const FamilyVersionSchema = new Schema(
  {
    dish:          { type: String, required: true, index: true },
    variant:       { type: String, required: true, index: true },
    user_id:       { type: String, default: '' },
    user_email:    { type: String, required: true, lowercase: true },
    display_name:  { type: String, required: true },       // as it will be shown
    family:        { type: String, required: true },       // "The Iyers of Palakkad"
    community:     { type: String, default: '' },
    place:         { type: String, default: '' },
    title:         { type: String, required: true },
    what_differs:  { type: String, required: true },
    ingredient_changes: { type: String, required: true },
    method_changes:     { type: String, required: true },
    offering_custom:    { type: String, default: '' },
    story:         { type: String, default: '' },
    status:        { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    moderator_note:{ type: String, default: '' },
    reviewed_at:   { type: Date },
  },
  { timestamps: true }
)
export const FamilyVersion: Model<any> = models.FamilyVersion || model('FamilyVersion', FamilyVersionSchema)
