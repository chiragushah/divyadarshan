import mongoose from 'mongoose'

// ── Search Log ────────────────────────────────────
const SearchLogSchema = new mongoose.Schema({
  user_id:    { type: String, default: 'anonymous' },
  user_email: { type: String, default: '' },
  query:      { type: String, required: true },
  provider:   { type: String, default: 'groq' },
  results:    { type: Number, default: 0 },
  duration_ms:{ type: Number, default: 0 },
}, { timestamps: true })

// ── AI Usage Log ──────────────────────────────────
const AIUsageSchema = new mongoose.Schema({
  user_id:       { type: String, default: 'anonymous' },
  user_email:    { type: String, default: '' },
  feature:       { type: String, enum: ['planner', 'search', 'checklist'], required: true },
  provider:      { type: String, enum: ['claude', 'groq', 'gemini'], required: true },
  prompt_tokens: { type: Number, default: 0 },
  response_tokens:{ type: Number, default: 0 },
  duration_ms:   { type: Number, default: 0 },
  destination:   String,
  success:       { type: Boolean, default: true },
  error_msg:     String,
}, { timestamps: true })

// ── Page View Log ─────────────────────────────────
const PageViewSchema = new mongoose.Schema({
  user_id:      { type: String, default: 'anonymous' },
  user_email:   { type: String, default: '' },
  page:         { type: String, required: true },
  duration_sec: { type: Number, default: 0 },
  referrer:     String,
  device:       String,
  city:         String,
  country:      { type: String, default: 'IN' },
}, { timestamps: true })

// ── FinVerse Click Log ────────────────────────────
const FinVerseClickSchema = new mongoose.Schema({
  user_id:    { type: String, default: 'anonymous' },
  user_email: { type: String, default: '' },
  source:     String,   // which page/button
  campaign:   String,
}, { timestamps: true })

// ── Announcement ──────────────────────────────────
const AnnouncementSchema = new mongoose.Schema({
  message:    { type: String, required: true },
  type:       { type: String, enum: ['info', 'success', 'warning'], default: 'info' },
  active:     { type: Boolean, default: true },
  created_by: { type: String, default: 'admin' },
  expires_at: Date,
}, { timestamps: true })

// ── Admin Session ─────────────────────────────────
const AdminSessionSchema = new mongoose.Schema({
  token:      { type: String, required: true, unique: true },
  email:      { type: String, required: true },
  expires_at: { type: Date, required: true },
  ip:         String,
}, { timestamps: true })

export const SearchLog      = mongoose.models.SearchLog      || mongoose.model('SearchLog',      SearchLogSchema)
export const AIUsageLog     = mongoose.models.AIUsageLog     || mongoose.model('AIUsageLog',     AIUsageSchema)
export const PageViewLog    = mongoose.models.PageViewLog    || mongoose.model('PageViewLog',    PageViewSchema)
export const FinVerseClick  = mongoose.models.FinVerseClick  || mongoose.model('FinVerseClick',  FinVerseClickSchema)
export const Announcement   = mongoose.models.Announcement   || mongoose.model('Announcement',   AnnouncementSchema)
export const AdminSession   = mongoose.models.AdminSession   || mongoose.model('AdminSession',   AdminSessionSchema)
