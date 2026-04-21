// ── models/Task.js ────────────────────────────────────────────────────────────
// One document per (projectId, date) pair.
// entries[] is the list of tasks for that day.

const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  id:          { type: String, required: true },   // UUID from frontend
  title:       { type: String, default: '' },
  description: { type: String, default: '' },
  employeeIds: { type: [String], default: [] },
  serviceIds:  { type: [String], default: [] },
  status:      { type: String, enum: ['gray', 'yellow', 'green', 'red'], default: 'gray' },
  updatedAt:   { type: String, default: '' },
}, { _id: false });

const taskSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  date:      { type: String, required: true }, // 'YYYY-MM-DD'
  entries:   { type: [entrySchema], default: [] },
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

// Unique constraint: one document per project+date
taskSchema.index({ projectId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Task', taskSchema);
