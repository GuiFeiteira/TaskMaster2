const { registerUser, authenticateUser } = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e password são obrigatórios' });
    }

    const result = await registerUser({ name, email, password });
    res.status(201).json(result);
  } catch (error) {
    if (error.message === 'Email já está em uso') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password são obrigatórios' });
    }

    const result = await authenticateUser(email, password);
    res.json(result);
  } catch (error) {
    if (error.message === 'Credenciais inválidas') {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
};

module.exports = { register, login };
