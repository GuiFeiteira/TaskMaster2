const express = require('express');
const controller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', controller.create);
router.get('/', authMiddleware, controller.list);
router.get('/profile', authMiddleware, controller.getProfile);
router.get('/:id', authMiddleware, controller.get);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.remove);

module.exports = router;
