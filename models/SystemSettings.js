// ── models/SystemSettings.js ──────────────────────────────────────────────────
// Singleton — only one document ever exists in this collection.
// Use SystemSettings.getSingleton() to always get or create it.

const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  adminCanComment:         { type: Boolean, default: true },
  employeeCanComment:      { type: Boolean, default: true },
  adminCanManageEmployees: { type: Boolean, default: true },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
});

// Helper: always get-or-create the single settings document
settingsSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) doc = await this.create({});
  return doc;
};

module.exports = mongoose.model('SystemSettings', settingsSchema);
