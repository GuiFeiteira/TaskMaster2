const axios = require('axios');

const USER_URL = 'http://user-service:3002';

exports.getAllUsers = async (req, res) => {
  try {
    const response = await axios.get(`${USER_URL}/users`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao obter utilizadores' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const response = await axios.post(`${USER_URL}/users`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao criar utilizador' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const response = await axios.put(`${USER_URL}/users/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao atualizar utilizador' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const response = await axios.delete(`${USER_URL}/users/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao eliminar utilizador' });
  }
};
