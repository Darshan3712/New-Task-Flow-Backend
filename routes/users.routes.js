// ── routes/users.routes.js ────────────────────────────────────────────────────
// Handles admins, employees, and clients under /api/users.

const express      = require('express');
const router       = express.Router();
const auth         = require('../middleware/auth');
const requireRole  = require('../middleware/requireRole');
const ctrl         = require('../controllers/users.controller');

// ── Admins (superadmin only) ──────────────────────────────────────────────────
router.get   ('/admins',      auth, requireRole('superadmin'),           ctrl.getAdmins);
router.post  ('/admins',      auth, requireRole('superadmin'),           ctrl.createAdmin);
router.put   ('/admins/:id',  auth, requireRole('superadmin'),           ctrl.updateAdmin);
router.delete('/admins/:id',  auth, requireRole('superadmin'),           ctrl.deleteAdmin);

// ── Employees (admin+) ────────────────────────────────────────────────────────
router.get   ('/employees',      auth, requireRole.adminOrAbove,         ctrl.getEmployees);
router.post  ('/employees',      auth, requireRole.adminOrAbove,         ctrl.createEmployee);
router.put   ('/employees/:id',  auth, requireRole.adminOrAbove,         ctrl.updateEmployee);
router.delete('/employees/:id',  auth, requireRole.adminOrAbove,         ctrl.deleteEmployee);

// ── Clients (admin+) ──────────────────────────────────────────────────────────
router.get   ('/clients',      auth, requireRole.adminOrAbove,           ctrl.getClients);
router.post  ('/clients',      auth, requireRole.adminOrAbove,           ctrl.createClient);
router.put   ('/clients/:id',  auth, requireRole.adminOrAbove,           ctrl.updateClient);
router.delete('/clients/:id',  auth, requireRole.adminOrAbove,           ctrl.deleteClient);

module.exports = router;
