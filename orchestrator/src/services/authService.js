const axios = require('axios');

const AUTH_URL = 'http://auth-service:3001';

const handleError = (err, res, defaultMessage) => {
  const status = err.response?.status || 500;
  const message = err.response?.data?.error || defaultMessage;
  res.status(status).json({ error: message });
};

exports.login = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_URL}/auth/login`, req.body);
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao autenticar');
  }
};

exports.register = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_URL}/auth/register`, req.body);
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao registar');
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_URL}/auth/verify`, {}, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    handleError(err, res, 'Erro ao verificar token');
  }
};
