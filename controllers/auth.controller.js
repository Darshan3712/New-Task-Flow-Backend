// ── controllers/auth.controller.js ───────────────────────────────────────────

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// Build the JWT payload that the frontend decodes (see AuthContext.jsx)
function buildTokenPayload(user) {
  return {
    id:                 user._id.toString(),
    name:               user.name,
    role:               user.role,
    designation:        user.designation   || '',
    assignedServiceIds: user.assignedServiceIds || [],
    assignedProjectIds: user.assignedProjectIds || [],
    projectId:          user.projectId     || null,
    isSenior:           !!user.isSenior,
  };
}

// POST /api/auth/login
async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const user = await User.findOne({ username: username.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(buildTokenPayload(user), process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
