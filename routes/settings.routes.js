// ── routes/settings.routes.js ─────────────────────────────────────────────────

const express     = require('express');
const router      = express.Router();
const auth        = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const ctrl        = require('../controllers/settings.controller');

router.get('/', auth,                            ctrl.getSettings);
router.put('/', auth, requireRole('superadmin'), ctrl.updateSettings);

module.exports = router;
