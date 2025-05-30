const axios = require('axios');

const TASK_URL = 'http://task-service:3003';

const handleError = (err, res, defaultMessage) => {
  const status = err.response?.status || 500;
  const message = err.response?.data?.error || defaultMessage;
  res.status(status).json({ error: message });
};

exports.getAllTasks = async (req, res) => {
  try {
    const response = await axios.get(`${TASK_URL}/tasks`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao obter tarefas');
  }
};

exports.createTask = async (req, res) => {
  try {
    const response = await axios.post(`${TASK_URL}/tasks`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao criar tarefa');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const response = await axios.put(`${TASK_URL}/tasks/${req.params.id}`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao atualizar tarefa');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const response = await axios.delete(`${TASK_URL}/tasks/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao eliminar tarefa');
  }
};

