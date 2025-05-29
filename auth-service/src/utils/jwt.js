const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { signToken, verifyToken };
