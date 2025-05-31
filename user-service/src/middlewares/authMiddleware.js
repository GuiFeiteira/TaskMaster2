const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('User Service Auth Middleware - Authorization header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  console.log('User Service Auth Middleware - Extracted token:', token);

  if (!token) {
    console.log('User Service Auth Middleware - No token provided');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Certifica-te que estás a usar a mesma secret
    console.log('User Service Auth Middleware - Decoded token:', decoded);
    req.user = decoded; // Guarda os dados do utilizador
    next();
  } catch (error) {
    console.error('User Service Auth Middleware - Token verification failed:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token inválido' });
    }
    // Handle other potential errors during verification if necessary
    res.status(403).json({ message: 'Token inválido' }); // Default to 403 for verification errors
  }
};

module.exports = authMiddleware;
