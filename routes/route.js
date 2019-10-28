const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');

router.get('/', userController.getAll);
router.get('/:userId', userController.getById);
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;
