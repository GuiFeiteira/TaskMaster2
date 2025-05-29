const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Task routes
router.post('/', taskController.create);
router.get('/', taskController.list);
router.get('/:id', taskController.get);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.remove);

module.exports = router; 