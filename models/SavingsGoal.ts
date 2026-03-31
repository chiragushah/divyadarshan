import { Schema, model, models, Document, Types } from 'mongoose'

// ─── DEPOSIT ─────────────────────────────────────────────
export interface IDeposit {
  amount: number
  note?: string
  deposited_at: Date
}

const DepositSchema = new Schema<IDeposit>({
  amount:       { type: Number, required: true },
  note:         { type: String },
  deposited_at: { type: Date, default: Date.now },
})

// ─── SAVINGS GOAL ────────────────────────────────────────
export interface ISavingsGoal extends Document {
  user_id: Types.ObjectId
  yatra_name: string
  target_amount: number
  current_amount: number
  monthly_target: number
  deadline?: Date
  finverse_linked: boolean
  finverse_url?: string
  deposits: IDeposit[]
  createdAt: Date
  updatedAt: Date
}

const SavingsGoalSchema = new Schema<ISavingsGoal>(
  {
    user_id:         { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    yatra_name:      { type: String, required: true },
    target_amount:   { type: Number, required: true },
    current_amount:  { type: Number, default: 0 },
    monthly_target:  { type: Number, default: 0 },
    deadline:        { type: Date },
    finverse_linked: { type: Boolean, default: false },
    finverse_url:    { type: String },
    deposits:        { type: [DepositSchema], default: [] },
  },
  { timestamps: true }
)

SavingsGoalSchema.index({ user_id: 1, createdAt: -1 })

export const SavingsGoal = models.SavingsGoal || model<ISavingsGoal>('SavingsGoal', SavingsGoalSchema)
