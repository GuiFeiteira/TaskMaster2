const { registerUser, authenticateUser } = require('../services/auth.service');

const register = async (req, res, next) => {
  console.log('Register controller called with body:', req.body);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log('Missing required fields:', { name, email, password });
      return res.status(400).json({ error: 'Nome, email e password são obrigatórios' });
    }

    console.log('Calling registerUser service with:', { name, email });
    const result = await registerUser({ name, email, password });
    console.log('Registration successful:', result);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in register controller:', error);
    if (error.message === 'Email já está em uso') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log('Login controller called with body:', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('Missing required fields:', { email, password });
      return res.status(400).json({ error: 'Email e password são obrigatórios' });
    }

    console.log('Calling authenticateUser service with:', { email });
    const result = await authenticateUser(email, password);
    console.log('Login successful:', result);
    res.json(result);
  } catch (error) {
    console.error('Error in login controller:', error);
    if (error.message === 'Credenciais inválidas') {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
};

module.exports = { register, login };
