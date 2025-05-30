const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  console.log('Auth Middleware - JWT_SECRET:', process.env.JWT_SECRET);
  console.log('Auth Middleware - Authorization header:', req.headers.authorization);

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Auth Middleware - Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth Middleware - Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Auth Middleware - Error:', err.message);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}; 