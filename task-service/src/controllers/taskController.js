const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status, userId: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json({ message: 'Tarefa eliminada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao eliminar tarefa' });
  }
};
