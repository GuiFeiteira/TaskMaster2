const axios = require('axios');

const AUTH_URL = 'http://auth-service:3001';

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    await axios.post(`${AUTH_URL}/verify`, {}, { headers: { Authorization: token } });
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
