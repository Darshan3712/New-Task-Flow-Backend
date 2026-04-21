// ── controllers/tasks.controller.js ──────────────────────────────────────────
// Calendar tasks: one DB document per (projectId, date).
// The frontend expects a map of { "projectId_date": entries[] }.

const Task = require('../models/Task');

// GET /api/tasks/all
// Returns the full task map: { "projectId_date": entries[] }
async function getAllTasks(req, res, next) {
  try {
    const all = await Task.find();
    const map = {};
    all.forEach(doc => {
      map[`${doc.projectId}_${doc.date}`] = doc.entries;
    });
    res.json(map);
  } catch (err) { next(err); }
}

// GET /api/tasks/project/:projectId
// Returns a task map for a single project: { "date": entries[] }
async function getProjectTasks(req, res, next) {
  try {
    const docs = await Task.find({ projectId: req.params.projectId });
    const map  = {};
    docs.forEach(doc => { map[doc.date] = doc.entries; });
    res.json(map);
  } catch (err) { next(err); }
}

// GET /api/tasks/:projectId/:date
async function getDayTasks(req, res, next) {
  try {
    const { projectId, date } = req.params;
    const doc = await Task.findOne({ projectId, date });
    res.json(doc ? doc.entries : []);
  } catch (err) { next(err); }
}

// PUT /api/tasks/:projectId/:date
// Upserts the entries[] for a specific project+date
async function saveDayTasks(req, res, next) {
  try {
    const { projectId, date } = req.params;
    const entries = req.body; // array of task entry objects

    const doc = await Task.findOneAndUpdate(
      { projectId, date },
      { $set: { entries } },
      { new: true, upsert: true }
    );
    res.json(doc.entries);
  } catch (err) { next(err); }
}

// DELETE /api/tasks/:projectId/:date
async function deleteDayTasks(req, res, next) {
  try {
    const { projectId, date } = req.params;
    await Task.findOneAndDelete({ projectId, date });
    res.json({ success: true });
  } catch (err) { next(err); }
}

module.exports = { getAllTasks, getProjectTasks, getDayTasks, saveDayTasks, deleteDayTasks };
