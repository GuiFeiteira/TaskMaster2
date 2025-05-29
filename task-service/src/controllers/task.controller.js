const taskService = require('../services/task.service');

const create = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    
    // Validate required fields
    if (!title || !description || !dueDate) {
      return res.status(400).json({ error: 'Title, description and due date are required' });
    }

    const task = await taskService.createTask({
      title,
      description,
      dueDate,
      priority,
      status,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    if (err.message === 'Invalid status value' || err.message === 'Invalid priority value') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const tasks = await taskService.getUserTasks(req.user.id);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to access this task' });
    }
    res.json(task);
  } catch (err) {
    if (err.message === 'Task not found') {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    
    // Validate at least one field is provided
    if (!title && !description && !dueDate && !priority && !status) {
      return res.status(400).json({ error: 'At least one field must be provided for update' });
    }

    const updatedTask = await taskService.updateTask(req.params.id, req.user.id, req.body);
    res.json(updatedTask);
  } catch (err) {
    if (err.message === 'Task not found') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Not authorized to update this task') {
      return res.status(403).json({ error: err.message });
    }
    if (err.message === 'Invalid status value' || err.message === 'Invalid priority value') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    if (err.message === 'Task not found') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Not authorized to delete this task') {
      return res.status(403).json({ error: err.message });
    }
    next(err);
  }
};

module.exports = { create, list, get, update, remove }; 