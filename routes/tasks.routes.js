// ── routes/tasks.routes.js ────────────────────────────────────────────────────

const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const ctrl    = require('../controllers/tasks.controller');

// GET /api/tasks/all              — full task map (all projects)
router.get('/all', auth, ctrl.getAllTasks);

// GET /api/tasks/project/:id      — all tasks for one project
router.get('/project/:projectId', auth, ctrl.getProjectTasks);

// GET    /api/tasks/:projectId/:date  — tasks for one day
// PUT    /api/tasks/:projectId/:date  — save/overwrite tasks for one day
// DELETE /api/tasks/:projectId/:date  — clear tasks for one day
router.get   ('/:projectId/:date', auth, ctrl.getDayTasks);
router.put   ('/:projectId/:date', auth, ctrl.saveDayTasks);
router.delete('/:projectId/:date', auth, ctrl.deleteDayTasks);

module.exports = router;
