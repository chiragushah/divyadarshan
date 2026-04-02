import { Schema, model, models, Document } from 'mongoose'

export interface IGroupMember {
  name: string           // e.g. "Chirag Shah" or "Mumbai Group"
  city: string           // Starting city
  persons: number        // Number of persons
  travel_plan?: string   // AI generated travel plan for this group
  estimated_cost?: number
  is_assigned: boolean   // true = admin assigned, false = open to join
  joined_by?: string[]   // emails of users who joined (open mode)
}

export interface IGroupYatraPlan extends Document {
  title: string
  temple_slug: string
  temple_name: string
  destination: string
  travel_dates: string       // e.g. "15-20 June 2026"
  description?: string
  mode: 'open' | 'assigned'  // open = anyone can join, assigned = specific people
  members: IGroupMember[]
  total_persons: number
  combined_itinerary?: string // Full group itinerary
  status: 'draft' | 'published' | 'completed'
  created_by: string          // admin email
  created_at: Date
  updated_at: Date
}

const GroupMemberSchema = new Schema<IGroupMember>({
  name:           { type: String, required: true },
  city:           { type: String, required: true },
  persons:        { type: Number, required: true, default: 1 },
  travel_plan:    { type: String },
  estimated_cost: { type: Number },
  is_assigned:    { type: Boolean, default: false },
  joined_by:      { type: [String], default: [] },
}, { _id: false })

const GroupYatraPlanSchema = new Schema<IGroupYatraPlan>({
  title:               { type: String, required: true },
  temple_slug:         { type: String, required: true },
  temple_name:         { type: String, required: true },
  destination:         { type: String, required: true },
  travel_dates:        { type: String, required: true },
  description:         { type: String },
  mode:                { type: String, enum: ['open', 'assigned'], default: 'open' },
  members:             { type: [GroupMemberSchema], default: [] },
  total_persons:       { type: Number, default: 0 },
  combined_itinerary:  { type: String },
  status:              { type: String, enum: ['draft', 'published', 'completed'], default: 'draft' },
  created_by:          { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const GroupYatraPlan = models.GroupYatraPlan || model<IGroupYatraPlan>('GroupYatraPlan', GroupYatraPlanSchema)
