const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');
const { verifyToken } = require('../middlewares/auth.middleware');

router.use(verifyToken);

// Rotas de tarefas
router.get('/', taskService.getAllTasks);
router.post('/', taskService.createTask);
router.put('/:id', taskService.updateTask);
router.delete('/:id', taskService.deleteTask);

module.exports = router;
