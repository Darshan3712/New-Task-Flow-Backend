// ── controllers/services.controller.js ───────────────────────────────────────

const Service = require('../models/Service');

async function getServices(req, res, next) {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (err) { next(err); }
}

async function createService(req, res, next) {
  try {
    const { name, description = '' } = req.body;
    const service = await Service.create({ name, description });
    res.status(201).json(service);
  } catch (err) { next(err); }
}

async function updateService(req, res, next) {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: 'Not found' });
    res.json(service);
  } catch (err) { next(err); }
}

async function deleteService(req, res, next) {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
}

module.exports = { getServices, createService, updateService, deleteService };
