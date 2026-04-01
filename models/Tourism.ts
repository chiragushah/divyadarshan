import mongoose from 'mongoose'

// ── Yatra Package ─────────────────────────────────────
const PackageSchema = new mongoose.Schema({
  slug:          { type: String, required: true, unique: true },
  title:         { type: String, required: true },
  subtitle:      String,
  circuit:       String,        // e.g. "Char Dham", "12 Jyotirlinga"
  duration_days: { type: Number, required: true },
  price_from:    { type: Number, required: true },
  price_to:      Number,
  temples:       [String],      // temple slugs
  states:        [String],
  highlights:    [String],
  inclusions:    [String],
  exclusions:    [String],
  itinerary:     [{
    day: Number,
    title: String,
    description: String,
    temples: [String],
  }],
  difficulty:    { type: String, enum: ['Easy','Moderate','Challenging','Strenuous'], default: 'Moderate' },
  best_months:   [String],
  group_size:    String,
  image_url:     String,
  is_featured:   { type: Boolean, default: false },
  is_active:     { type: Boolean, default: true },
  enquiry_count: { type: Number, default: 0 },
}, { timestamps: true })

// ── Enquiry ───────────────────────────────────────────
const EnquirySchema = new mongoose.Schema({
  type:          { type: String, enum: ['package','custom','guide','corporate'], default: 'package' },
  package_slug:  String,
  package_title: String,
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  phone:         String,
  city:          String,
  pilgrims:      Number,
  travel_date:   String,
  budget:        String,
  message:       String,
  user_id:       String,
  user_email:    String,
  status:        { type: String, enum: ['new','contacted','converted','closed'], default: 'new' },
  notes:         String,        // admin notes
}, { timestamps: true })

// ── Festival Alert Subscription ───────────────────────
const FestivalAlertSchema = new mongoose.Schema({
  user_id:    String,
  user_email: { type: String, required: true },
  festivals:  [String],         // ['Mahashivratri','Navratri',...]
  temples:    [String],         // temple slugs to watch
  days_before:{ type: Number, default: 7 },
  channel:    { type: String, enum: ['email','push','both'], default: 'email' },
  active:     { type: Boolean, default: true },
}, { timestamps: true })

// ── Data Report (correction request) ─────────────────
const DataReportSchema = new mongoose.Schema({
  temple_id:    String,
  temple_name:  String,
  temple_slug:  String,
  field:        { type: String, enum: ['timing','facilities','image','directions','description','website','phone','other'] },
  issue:        { type: String, required: true },
  correct_info: String,
  reporter_email: String,
  reporter_id:  String,
  status:       { type: String, enum: ['pending','reviewed','fixed','rejected'], default: 'pending' },
  admin_note:   String,
  is_verified_visit: { type: Boolean, default: false },
}, { timestamps: true })

// ── Verified Visit ────────────────────────────────────
const VerifiedVisitSchema = new mongoose.Schema({
  user_id:     { type: String, required: true },
  user_email:  { type: String, required: true },
  temple_slug: { type: String, required: true },
  visit_date:  String,
  photo_urls:  [String],
  review:      String,
  rating:      Number,
  tips:        String,          // tips for other pilgrims
  verified:    { type: Boolean, default: false }, // admin verified
}, { timestamps: true })

export const Package        = mongoose.models.Package        || mongoose.model('Package',        PackageSchema)
export const Enquiry        = mongoose.models.Enquiry        || mongoose.model('Enquiry',        EnquirySchema)
export const FestivalAlert  = mongoose.models.FestivalAlert  || mongoose.model('FestivalAlert',  FestivalAlertSchema)
export const DataReport     = mongoose.models.DataReport     || mongoose.model('DataReport',     DataReportSchema)
export const VerifiedVisit  = mongoose.models.VerifiedVisit  || mongoose.model('VerifiedVisit',  VerifiedVisitSchema)
