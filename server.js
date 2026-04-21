// ── Entry point ───────────────────────────────────────────────────────────────
// Loads env, connects to MongoDB, then starts Express.

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { connectDB } = require('./config/db');

const app = express();

// ── Global middleware ─────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',                      // local dev (Vite)
  'https://shankaraonlinesolutions.com',        // production frontend
  'https://www.shankaraonlinesolutions.com',   // production with www
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth',         require('./routes/auth.routes'));
app.use('/api/users',        require('./routes/users.routes'));
app.use('/api/projects',     require('./routes/projects.routes'));
app.use('/api/services',     require('./routes/services.routes'));
app.use('/api/tasks',        require('./routes/tasks.routes'));
app.use('/api/client-tasks', require('./routes/clientTasks.routes'));
app.use('/api/settings',     require('./routes/settings.routes'));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err.message);
  process.exit(1);
});
