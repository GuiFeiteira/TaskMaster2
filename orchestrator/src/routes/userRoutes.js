const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/', userService.createUser);

router.use(verifyToken);
router.get('/', userService.getAllUsers);
router.put('/:id', userService.updateUser);
router.delete('/:id', userService.deleteUser);

module.exports = router;
