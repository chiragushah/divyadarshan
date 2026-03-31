import { Schema, model, models, Document, Types } from 'mongoose'

export interface IReview extends Document {
  user_id: Types.ObjectId
  temple_id: Types.ObjectId
  rating: number
  body: string
  pilgrim_tips?: string
  visit_month?: string
  helpful_count: number
  helpful_by: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    user_id:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
    temple_id:     { type: Schema.Types.ObjectId, ref: 'Temple', required: true },
    rating:        { type: Number, required: true, min: 1, max: 5 },
    body:          { type: String, required: true },
    pilgrim_tips:  { type: String },
    visit_month:   { type: String },
    helpful_count: { type: Number, default: 0 },
    helpful_by:    { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true }
)

// One review per user per temple
ReviewSchema.index({ user_id: 1, temple_id: 1 }, { unique: true })
ReviewSchema.index({ temple_id: 1, createdAt: -1 })

// Auto-update temple rating after save or delete
async function updateTempleRating(templeId: Types.ObjectId) {
  const { Temple } = await import('./Temple')
  const stats = await Review.aggregate([
    { $match: { temple_id: templeId } },
    { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ])
  await Temple.findByIdAndUpdate(templeId, {
    rating_avg: stats[0]?.avg ? Math.round(stats[0].avg * 10) / 10 : 0,
    rating_count: stats[0]?.count || 0,
  })
}

ReviewSchema.post('save', async function () {
  await updateTempleRating(this.temple_id)
})
ReviewSchema.post('deleteOne', { document: true }, async function () {
  await updateTempleRating(this.temple_id)
})

export const Review = models.Review || model<IReview>('Review', ReviewSchema)
