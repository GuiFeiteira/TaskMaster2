const Task = require('../models/task.model');

const createTask = async (taskData) => {
  // Validate status and priority
  if (taskData.status && !['pending', 'in_progress', 'completed'].includes(taskData.status)) {
    throw new Error('Invalid status value');
  }
  if (taskData.priority && !['low', 'medium', 'high'].includes(taskData.priority)) {
    throw new Error('Invalid priority value');
  }

  const task = new Task(taskData);
  await task.save();
  return task;
};

const getUserTasks = async (userId) => {
  return Task.find({ userId })
    .sort({ createdAt: -1 })
    .select('-__v');
};

const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId).select('-__v');
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

const updateTask = async (taskId, userId, updateData) => {
  // Verify task ownership
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  if (task.userId.toString() !== userId) {
    throw new Error('Not authorized to update this task');
  }

  // Validate status and priority
  if (updateData.status && !['pending', 'in_progress', 'completed'].includes(updateData.status)) {
    throw new Error('Invalid status value');
  }
  if (updateData.priority && !['low', 'medium', 'high'].includes(updateData.priority)) {
    throw new Error('Invalid priority value');
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-__v');

  return updatedTask;
};

const deleteTask = async (taskId, userId) => {
  // Verify task ownership
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  if (task.userId.toString() !== userId) {
    throw new Error('Not authorized to delete this task');
  }

  await Task.findByIdAndDelete(taskId);
  return { message: 'Task deleted successfully' };
};

module.exports = {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask
}; 