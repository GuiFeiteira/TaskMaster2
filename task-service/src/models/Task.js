const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'pending' },
  userId: { type: String, required: true }  // ID do utilizador dono da tarefa
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
