// ── config/seed.js ────────────────────────────────────────────────────────────
// Runs once on startup — creates the superadmin account if it doesn't exist.
// Credentials are read from environment variables:
//   SEED_ADMIN_USERNAME  (default: superadmin)
//   SEED_ADMIN_PASSWORD  (default: superadmin123)

const bcrypt = require('bcryptjs');
const User   = require('../models/User');

async function seedSuperAdmin() {
  const exists = await User.findOne({ role: 'superadmin' });
  if (exists) return; // already seeded — do nothing

  const username    = process.env.SEED_ADMIN_USERNAME || 'superadmin';
  const rawPassword = process.env.SEED_ADMIN_PASSWORD || 'superadmin123';
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  await User.create({
    name:         'Super Admin',
    username:     username,
    passwordHash,
    role:         'superadmin',
  });

  console.log(`✅ Superadmin seeded  →  username: ${username}  |  password: ${rawPassword}`);
}

module.exports = { seedSuperAdmin };
