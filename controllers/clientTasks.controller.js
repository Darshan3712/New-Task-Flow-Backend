// ── controllers/clientTasks.controller.js ────────────────────────────────────

const { v4: uuidv4 } = require('uuid');
const ClientTask     = require('../models/ClientTask');

// GET /api/client-tasks
async function getClientTasks(req, res, next) {
  try {
    const tasks = await ClientTask.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { next(err); }
}

// POST /api/client-tasks
async function createClientTask(req, res, next) {
  try {
    const { clientId, projectId, title, description, requiredBy } = req.body;
    const task = await ClientTask.create({
      clientId, projectId, title,
      description: description || '',
      requiredBy:  requiredBy  || null,
    });
    res.status(201).json(task);
  } catch (err) { next(err); }
}

// PUT /api/client-tasks/:id
async function updateClientTask(req, res, next) {
  try {
    const task = await ClientTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json(task);
  } catch (err) { next(err); }
}

// DELETE /api/client-tasks/:id
async function deleteClientTask(req, res, next) {
  try {
    await ClientTask.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
}

// POST /api/client-tasks/:id/comments
async function addComment(req, res, next) {
  try {
    const { authorId, authorName, authorRole, text } = req.body;
    const newComment = {
      id:         uuidv4(),
      authorId, authorName, authorRole, text,
      createdAt:  new Date().toISOString(),
    };
    const task = await ClientTask.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: newComment } },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json(task);
  } catch (err) { next(err); }
}

module.exports = { getClientTasks, createClientTask, updateClientTask, deleteClientTask, addComment };
