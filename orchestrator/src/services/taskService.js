const axios = require('axios');

const TASK_URL = 'http://task-service:3003';

exports.getAllTasks = async (req, res) => {
  try {
    const response = await axios.get(`${TASK_URL}/tasks`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao obter tarefas' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const response = await axios.post(`${TASK_URL}/tasks`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao criar tarefa' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const response = await axios.put(`${TASK_URL}/tasks/${req.params.id}`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao atualizar tarefa' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const response = await axios.delete(`${TASK_URL}/tasks/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao eliminar tarefa' });
  }
};

