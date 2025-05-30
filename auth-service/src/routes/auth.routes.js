const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const { verifyToken } = require('../utils/jwt');

router.post('/register', (req, res, next) => {
  console.log('Register route hit:', {
    body: req.body,
    headers: req.headers,
    method: req.method,
    url: req.url
  });
  register(req, res, next);
});

router.post('/login', login);

router.post('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    verifyToken(token);
    res.status(200).json({ message: 'Token válido' });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

module.exports = router;
