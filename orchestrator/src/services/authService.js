const axios = require('axios');

const AUTH_URL = 'http://auth-service:3001';

exports.login = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_URL}/auth/login`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao autenticar' });
  }
};

exports.register = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_URL}/auth/register`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { error: 'Erro ao registar' });
  }
};
