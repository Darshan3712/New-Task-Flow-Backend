// ── config/db.js ──────────────────────────────────────────────────────────────
// Connects to MongoDB then triggers the superadmin seed.

const mongoose = require('mongoose');
const { seedSuperAdmin } = require('./seed');

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected');
  await seedSuperAdmin();
}

module.exports = { connectDB };
