const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

router.post('/login', authService.login);
router.post('/register', authService.register);
router.post('/verify', authService.verifyToken);

module.exports = router;
