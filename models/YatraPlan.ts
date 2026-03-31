import { Schema, model, models, Document, Types } from 'mongoose'

export interface IYatraPlan extends Document {
  user_id?: Types.ObjectId
  title: string
  destination: string
  itinerary: string
  days?: number
  pilgrims?: number
  is_public: boolean
  view_count: number
  createdAt: Date
  updatedAt: Date
}

const YatraPlanSchema = new Schema<IYatraPlan>(
  {
    user_id:     { type: Schema.Types.ObjectId, ref: 'User' },
    title:       { type: String, required: true },
    destination: { type: String, required: true },
    itinerary:   { type: String, required: true },
    days:        { type: Number },
    pilgrims:    { type: Number },
    is_public:   { type: Boolean, default: false },
    view_count:  { type: Number, default: 0 },
  },
  { timestamps: true }
)

YatraPlanSchema.index({ user_id: 1 })
YatraPlanSchema.index({ is_public: 1, createdAt: -1 })

export const YatraPlan = models.YatraPlan || model<IYatraPlan>('YatraPlan', YatraPlanSchema)
