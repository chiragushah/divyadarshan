import { Schema, model, models, Document } from 'mongoose'

export interface IDestination {
  temple_name: string
  city: string
  state: string
  slug?: string
  sequence: number  // Day order e.g. Day 1 = Yamunotri, Day 3 = Gangotri
  nights: number    // Nights to spend here
}

export interface ITravelGroup {
  name: string           // "Chirag Shah" or "Mumbai Group"
  city: string           // Starting city
  persons: number
  seats?: number         // For open mode — total seats available
  travel_plan?: string   // AI plan for this group to reach first destination
  estimated_cost?: number
  is_assigned: boolean   // true = specific people, false = open seats
  joined_by?: string[]   // emails of users who joined
}

export interface IGroupYatraPlan extends Document {
  title: string
  destinations: IDestination[]  // Multiple temples/destinations
  travel_dates: string
  duration_days: number
  description?: string
  what_included?: string        // What's included in the plan
  mode: 'open' | 'assigned'
  groups: ITravelGroup[]        // Travel groups from different cities
  total_persons: number
  total_seats?: number          // For open mode
  combined_itinerary?: string   // Full multi-destination itinerary
  highlights?: string[]         // Key highlights
  status: 'draft' | 'published' | 'completed'
  created_by: string
  organiser_name?: string
  created_at: Date
  updated_at: Date
}

const DestinationSchema = new Schema<IDestination>({
  temple_name: { type: String, required: true },
  city:        { type: String, required: true },
  state:       { type: String, required: true },
  slug:        { type: String },
  sequence:    { type: Number, required: true },
  nights:      { type: Number, default: 1 },
}, { _id: false })

const TravelGroupSchema = new Schema<ITravelGroup>({
  name:           { type: String, required: true },
  city:           { type: String, required: true },
  persons:        { type: Number, required: true, default: 1 },
  seats:          { type: Number },
  travel_plan:    { type: String },
  estimated_cost: { type: Number },
  is_assigned:    { type: Boolean, default: false },
  joined_by:      { type: [String], default: [] },
}, { _id: false })

const GroupYatraPlanSchema = new Schema<IGroupYatraPlan>({
  title:              { type: String, required: true },
  destinations:       { type: [DestinationSchema], default: [] },
  travel_dates:       { type: String, required: true },
  duration_days:      { type: Number, default: 1 },
  description:        { type: String },
  what_included:      { type: String },
  mode:               { type: String, enum: ['open', 'assigned'], default: 'open' },
  groups:             { type: [TravelGroupSchema], default: [] },
  total_persons:      { type: Number, default: 0 },
  total_seats:        { type: Number },
  combined_itinerary: { type: String },
  highlights:         { type: [String], default: [] },
  status:             { type: String, enum: ['draft', 'published', 'completed'], default: 'draft' },
  created_by:         { type: String, required: true },
  organiser_name:     { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const GroupYatraPlan = models.GroupYatraPlan || model<IGroupYatraPlan>('GroupYatraPlan', GroupYatraPlanSchema)
