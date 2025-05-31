const axios = require('axios');

const USER_URL = 'http://user-service:3002';

const handleError = (err, res, defaultMessage) => {
  const status = err.response?.status || 500;
  const message = err.response?.data?.error || defaultMessage;
  res.status(status).json({ error: message });
};

exports.getAllUsers = async (req, res) => {
  try {
    const response = await axios.get(`${USER_URL}/users`);
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao obter utilizadores');
  }
};

exports.createUser = async (req, res) => {
  try {
    const response = await axios.post(`${USER_URL}/users`, req.body);
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao criar utilizador');
  }
};

exports.updateUser = async (req, res) => {
  try {
    const response = await axios.put(`${USER_URL}/users/${req.params.id}`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao atualizar utilizador');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const response = await axios.delete(`${USER_URL}/users/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao eliminar utilizador');
  }
};

// Função para buscar um único usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const response = await axios.get(`${USER_URL}/users/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao obter utilizador por ID');
  }
};
