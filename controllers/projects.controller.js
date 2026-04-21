// ── controllers/projects.controller.js ───────────────────────────────────────

const Project = require('../models/Project');

async function getProjects(req, res, next) {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    res.json(projects);
  } catch (err) { next(err); }
}

async function createProject(req, res, next) {
  try {
    const { name, serviceIds = [] } = req.body;
    const project = await Project.create({ name, serviceIds });
    res.status(201).json(project);
  } catch (err) { next(err); }
}

async function updateProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) { next(err); }
}

async function deleteProject(req, res, next) {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
}

module.exports = { getProjects, createProject, updateProject, deleteProject };
