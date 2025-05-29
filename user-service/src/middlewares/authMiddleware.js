const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Certifica-te que estás a usar a mesma secret
    req.user = decoded; // Guarda os dados do utilizador
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
