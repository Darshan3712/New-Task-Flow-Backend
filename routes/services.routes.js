// ── routes/services.routes.js ─────────────────────────────────────────────────

const express     = require('express');
const router      = express.Router();
const auth        = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const ctrl        = require('../controllers/services.controller');

router.get   ('/',    auth,                           ctrl.getServices);
router.post  ('/',    auth, requireRole.adminOrAbove, ctrl.createService);
router.put   ('/:id', auth, requireRole.adminOrAbove, ctrl.updateService);
router.delete('/:id', auth, requireRole.adminOrAbove, ctrl.deleteService);

module.exports = router;
