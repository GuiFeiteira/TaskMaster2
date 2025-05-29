const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/', userService.createUser);

// Protected routes
router.use(authMiddleware.verifyToken);
router.get('/', userService.getAllUsers);
router.put('/:id', userService.updateUser);
router.delete('/:id', userService.deleteUser);

module.exports = router;
