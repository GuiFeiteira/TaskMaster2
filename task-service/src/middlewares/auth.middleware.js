const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const authMiddleware = async (req, res, next) => {
  try {
    console.log('Task Service Auth Middleware - JWT_SECRET:', JWT_SECRET);
    console.log('Task Service Auth Middleware - Authorization header:', req.headers.authorization);
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Task Service Auth Middleware - No token or invalid format');
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Task Service Auth Middleware - Token:', token);
    
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Task Service Auth Middleware - Decoded token:', decoded);
    
    req.user = {
      id: decoded.userId || decoded.id,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    console.error('Task Service Auth Middleware - Error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    next(error);
  }
};

module.exports = authMiddleware; 