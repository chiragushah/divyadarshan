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
