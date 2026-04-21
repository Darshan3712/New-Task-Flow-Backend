// ── middleware/requireRole.js ─────────────────────────────────────────────────
// Role-based access guard. Call after auth() middleware.
//
// Usage:
//   router.get('/admins', auth, requireRole('superadmin'), controller.getAdmins)
//   router.get('/employees', auth, requireRole('admin', 'superadmin'), controller.getEmployees)

const ROLE_RANK = { employee: 1, client: 1, admin: 2, superadmin: 3 };

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
}

// Shorthand: require at least admin rank
requireRole.adminOrAbove = requireRole('admin', 'superadmin');

module.exports = requireRole;
