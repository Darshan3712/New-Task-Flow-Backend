// ── models/ClientTask.js ──────────────────────────────────────────────────────
// Task requests submitted by clients. Comments are embedded for simplicity.

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id:         { type: String, required: true }, // UUID
  authorId:   { type: String, required: true },
  authorName: { type: String, required: true },
  authorRole: { type: String, required: true },
  text:       { type: String, required: true },
  createdAt:  { type: String, required: true },
}, { _id: false });

const clientTaskSchema = new mongoose.Schema({
  clientId:           { type: String, required: true },
  projectId:          { type: String, required: true },
  title:              { type: String, required: true, trim: true },
  description:        { type: String, default: '' },
  requiredBy:         { type: String, default: null },  // 'YYYY-MM-DD' string
  status:             { type: String, enum: ['gray', 'yellow', 'green', 'red'], default: 'gray' },
  assignedEmployeeId: { type: String, default: null },
  serviceId:          { type: String, default: null },
  assignedDate:       { type: String, default: null },
  comments:           { type: [commentSchema], default: [] },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(_doc, ret) {
      ret.id        = ret._id.toString();
      ret.createdAt = ret.createdAt?.toISOString?.() ?? ret.createdAt;
      delete ret._id;
      delete ret.__v;
    },
  },
});

module.exports = mongoose.model('ClientTask', clientTaskSchema);
