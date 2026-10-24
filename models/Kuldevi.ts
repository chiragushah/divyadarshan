import { Schema, model, models, type Model } from 'mongoose'

// Family-submitted kuldevi / kuldevta entries. Held for moderation; only "approved" is public.
const KuldeviSubmissionSchema = new Schema(
  {
    user_id:       { type: String, default: '' },
    user_email:    { type: String, required: true, lowercase: true },
    display_name:  { type: String, default: '' },
    deity_name:    { type: String, required: true },
    deity_kind:    { type: String, enum: ['Kuldevi', 'Kuldevta', 'Both'], default: 'Kuldevi' },
    other_names:   { type: String, default: '' },
    deity_form:    { type: String, default: '' },
    village:       { type: String, required: true },
    taluka:        { type: String, default: '' },
    district:      { type: String, required: true },
    state:         { type: String, required: true },
    how_to_reach:  { type: String, required: true },
    community:     { type: String, required: true },
    subgroup:      { type: String, default: '' },        // gotra / sub-group as the family names it
    surnames:      { type: String, default: '' },
    main_seat:     { type: String, default: '' },        // connection to a larger/common temple
    customs:       { type: String, required: true },
    visit_times:   { type: String, default: '' },
    story:         { type: String, default: '' },
    source_basis:  { type: String, required: true },
    confidence:    { type: String, enum: ['sure', 'fairly', 'unsure'], default: 'fairly' },
    status:        { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true },
    moderator_note:{ type: String, default: '' },
    reviewed_at:   { type: Date },
  },
  { timestamps: true }
)
export const KuldeviSubmission: Model<any> = models.KuldeviSubmission || model('KuldeviSubmission', KuldeviSubmissionSchema)

// A VERIFIED link: community + gotra/surname → deity. Created only by an admin, and only with evidence.
const KuldeviLinkSchema = new Schema(
  {
    community:       { type: String, required: true, index: true },
    gotra:           { type: String, default: '' },
    surnames:        { type: String, default: '' },          // comma-separated
    deity_name:      { type: String, required: true },
    kuldevi_slug:    { type: String, default: '' },          // curated page, if one exists
    state:           { type: String, default: '' },
    evidence_type:   { type: String, enum: ['temple-trust', 'community-body', 'published-text', 'named-elder'], required: true },
    evidence_source: { type: String, required: true },       // who/what: trust name, book title, elder's name and role
    evidence_note:   { type: String, required: true },       // what exactly was confirmed, and how
    verified_on:     { type: Date, required: true },
    verified_by:     { type: String, default: '' },
    status:          { type: String, enum: ['active', 'withdrawn'], default: 'active', index: true },
    withdraw_reason: { type: String, default: '' },
  },
  { timestamps: true }
)
export const KuldeviLink: Model<any> = models.KuldeviLink || model('KuldeviLink', KuldeviLinkSchema)

// "This looks wrong" reports from visitors
const KuldeviFlagSchema = new Schema(
  {
    user_email: { type: String, required: true, lowercase: true },
    target:     { type: String, enum: ['verified', 'reported', 'page'], default: 'reported' },
    ref:        { type: String, default: '' },
    deity_name: { type: String, required: true },
    community:  { type: String, default: '' },
    gotra:      { type: String, default: '' },
    reason:     { type: String, required: true },
    status:     { type: String, enum: ['open', 'resolved'], default: 'open', index: true },
    admin_note: { type: String, default: '' },
  },
  { timestamps: true }
)
export const KuldeviFlag: Model<any> = models.KuldeviFlag || model('KuldeviFlag', KuldeviFlagSchema)
