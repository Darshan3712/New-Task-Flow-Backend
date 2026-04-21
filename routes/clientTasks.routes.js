// ── routes/clientTasks.routes.js ─────────────────────────────────────────────

const express     = require('express');
const router      = express.Router();
const auth        = require('../middleware/auth');
const requireRole = require('../middleware/requireRole');
const ctrl        = require('../controllers/clientTasks.controller');

router.get   ('/',                auth, ctrl.getClientTasks);
router.post  ('/',                auth, ctrl.createClientTask);
router.put   ('/:id',             auth, ctrl.updateClientTask);
router.delete('/:id',             auth, requireRole.adminOrAbove, ctrl.deleteClientTask);
router.post  ('/:id/comments',    auth, ctrl.addComment);

module.exports = router;
