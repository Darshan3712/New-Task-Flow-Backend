// ── controllers/users.controller.js ──────────────────────────────────────────

const bcrypt = require('bcryptjs');
const User   = require('../models/User');

// Helper: hash password and return only the hash (never store plain text)
async function hashPwd(plain) {
  return { passwordHash: await bcrypt.hash(plain, 10) };
}

// ── Admins ────────────────────────────────────────────────────────────────────
async function getAdmins(req, res, next) {
  try {
    const admins = await User.find({ role: 'admin' }).lean({ virtuals: true });
    res.json(admins.map(a => ({ ...a, id: a._id.toString(), _id: undefined, __v: undefined, passwordHash: undefined })));
  } catch (err) { next(err); }
}

async function createAdmin(req, res, next) {
  try {
    const { name, username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });
    const pwd = await hashPwd(password);
    const admin = await User.create({ name, username, password, ...pwd, role: 'admin' });
    res.status(201).json(admin);
  } catch (err) { next(err); }
}

async function updateAdmin(req, res, next) {
  try {
    const update = { ...req.body };
    if (update.password) Object.assign(update, await hashPwd(update.password));
    const admin = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!admin) return res.status(404).json({ message: 'Not found' });
    res.json(admin);
  } catch (err) { next(err); }
}

async function deleteAdmin(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
}

// ── Employees ─────────────────────────────────────────────────────────────────
async function getEmployees(req, res, next) {
  try {
    const employees = await User.find({ role: 'employee' });
    const isAdmin = ['admin', 'superadmin'].includes(req.user?.role);
    // Strip plaintext password for non-admin callers (e.g. employees reading the list)
    const result = employees.map(emp => {
      const obj = emp.toJSON();
      if (!isAdmin) delete obj.password;
      return obj;
    });
    res.json(result);
  } catch (err) { next(err); }
}

async function createEmployee(req, res, next) {
  try {
    const { name, username, password, ...rest } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });
    const pwd = await hashPwd(password);
    const emp = await User.create({ name, username, password, ...pwd, role: 'employee', ...rest });
    res.status(201).json(emp);
  } catch (err) { next(err); }
}

async function updateEmployee(req, res, next) {
  try {
    const update = { ...req.body };
    if (update.password) Object.assign(update, await hashPwd(update.password));
    const emp = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!emp) return res.status(404).json({ message: 'Not found' });
    res.json(emp);
  } catch (err) { next(err); }
}

async function deleteEmployee(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
}

// ── Clients ───────────────────────────────────────────────────────────────────
async function getClients(req, res, next) {
  try {
    const clients = await User.find({ role: 'client' });
    res.json(clients);
  } catch (err) { next(err); }
}

async function createClient(req, res, next) {
  try {
    const { name, username, password, projectId } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });
    const pwd = await hashPwd(password);
    const client = await User.create({ name, username, password, ...pwd, role: 'client', projectId });
    res.status(201).json(client);
  } catch (err) { next(err); }
}

async function updateClient(req, res, next) {
  try {
    const update = { ...req.body };
    if (update.password) Object.assign(update, await hashPwd(update.password));
    const client = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!client) return res.status(404).json({ message: 'Not found' });
    res.json(client);
  } catch (err) { next(err); }
}

async function deleteClient(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
}

module.exports = {
  getAdmins, createAdmin, updateAdmin, deleteAdmin,
  getEmployees, createEmployee, updateEmployee, deleteEmployee,
  getClients, createClient, updateClient, deleteClient,
};
