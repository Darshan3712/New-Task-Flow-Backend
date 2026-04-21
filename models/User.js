// ── models/User.js ────────────────────────────────────────────────────────────
// Covers all four roles: superadmin, admin, employee, client.
// - passwordHash : bcrypt hash used for login verification (never sent to frontend)
// - password     : plaintext kept for the admin-panel "show/copy credentials" feature

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  username:     { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  password:     { type: String, default: '' },   // plaintext — for admin display only
  role:         { type: String, enum: ['superadmin', 'admin', 'employee', 'client'], required: true },

  // ── Employee-specific ────────────────────────────────────────────────────
  designation:        { type: String,   default: '' },
  assignedServiceIds: { type: [String], default: [] },
  assignedProjectIds: { type: [String], default: [] },
  canCreateTasks:     { type: Boolean,  default: true },
  readOnlyAccess:     { type: Boolean,  default: false },
  canComment:         { type: Boolean,  default: true },
  isSenior:           { type: Boolean,  default: false },

  // ── Client-specific ──────────────────────────────────────────────────────
  projectId: { type: String, default: null },

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.passwordHash; // NEVER expose bcrypt hash to frontend
    },
  },
});

module.exports = mongoose.model('User', userSchema);
