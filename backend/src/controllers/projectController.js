import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = { isActive: true };
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    const projects = await Project.find(query).sort({ displayOrder: 1, createdAt: -1 });
    return res.status(200).json({ success: true, count: projects.length, projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, message: 'Project created', project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.status(200).json({ success: true, message: 'Project updated', project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
