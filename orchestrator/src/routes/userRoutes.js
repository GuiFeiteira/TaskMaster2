const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', userService.createUser);

router.use(verifyToken);
router.get('/', userService.getAllUsers);
router.put('/:id', userService.updateUser);
router.delete('/:id', userService.deleteUser);

// Rota para buscar um único usuário por ID
router.get('/:id', userService.getUserById);

module.exports = router;
