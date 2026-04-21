// ── controllers/settings.controller.js ───────────────────────────────────────

const SystemSettings = require('../models/SystemSettings');

// GET /api/settings
async function getSettings(req, res, next) {
  try {
    const settings = await SystemSettings.getSingleton();
    res.json(settings);
  } catch (err) { next(err); }
}

// PUT /api/settings  (superadmin only)
async function updateSettings(req, res, next) {
  try {
    const settings = await SystemSettings.getSingleton();
    Object.assign(settings, req.body);
    await settings.save();
    res.json(settings);
  } catch (err) { next(err); }
}

module.exports = { getSettings, updateSettings };
