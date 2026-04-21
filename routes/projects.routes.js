// ── routes/projects.routes.js ─────────────────────────────────────────────────

const express     = require('express');
const router      = express.Router();
const auth        = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const ctrl        = require('../controllers/projects.controller');

router.get   ('/',    auth,                        ctrl.getProjects);
router.post  ('/',    auth, requireRole.adminOrAbove, ctrl.createProject);
router.put   ('/:id', auth, requireRole.adminOrAbove, ctrl.updateProject);
router.delete('/:id', auth, requireRole.adminOrAbove, ctrl.deleteProject);

module.exports = router;
