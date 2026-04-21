// ── models/Project.js ─────────────────────────────────────────────────────────

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  serviceIds: { type: [String], default: [] }, // IDs of linked services
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    },
  },
});

module.exports = mongoose.model('Project', projectSchema);
