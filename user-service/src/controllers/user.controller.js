const userService = require('../services/user.service');

const create = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e password são obrigatórios' });
    }

    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.message === 'Email já está em uso') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    if (err.message === 'Utilizador não encontrado') {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate at least one field is provided
    if (!name && !email && !password) {
      return res.status(400).json({ error: 'Pelo menos um campo deve ser fornecido para atualização' });
    }

    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    if (err.message === 'Utilizador não encontrado') {
      return res.status(404).json({ error: err.message });
    }
    if (err.message === 'Email já está em uso') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  } catch (err) {
    if (err.message === 'Utilizador não encontrado') {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.userId);
    res.json(user);
  } catch (err) {
    if (err.message === 'Utilizador não encontrado') {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
};

module.exports = { create, list, get, update, remove, getProfile };
