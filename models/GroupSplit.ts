import { Schema, model, models, Document, Types } from 'mongoose'

// Embedded expense document
const ExpenseSchema = new Schema({
  description: { type: String, required: true },
  amount:      { type: Number, required: true },
  paid_by:     { type: String, required: true },
  split_type:  { type: String, default: 'equal' },
  created_at:  { type: Date, default: Date.now },
}, { _id: true })

export interface IGroupSplit extends Document {
  user_id: Types.ObjectId
  yatra_name: string
  members: string[]
  expenses: Array<{
    _id: Types.ObjectId
    description: string
    amount: number
    paid_by: string
    split_type: string
    created_at: Date
  }>
  createdAt: Date
  updatedAt: Date
}

const GroupSplitSchema = new Schema<IGroupSplit>(
  {
    user_id:    { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    yatra_name: { type: String, required: true },
    members:    { type: [String], default: [] },
    expenses:   { type: [ExpenseSchema], default: [] },
  },
  { timestamps: true }
)

export const GroupSplit = models.GroupSplit || model<IGroupSplit>('GroupSplit', GroupSplitSchema)
