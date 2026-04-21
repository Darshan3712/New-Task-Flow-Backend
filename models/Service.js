// ── models/Service.js ─────────────────────────────────────────────────────────

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, default: '' },
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

module.exports = mongoose.model('Service', serviceSchema);
