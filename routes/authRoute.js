const express = require('express');
const router = express.Router();
const authUserController = require('../controllers/authController');

router.get('/', authUserController.getAll);
router.put('/:userId', authUserController.updateEmail);
router.delete('/:userId', authUserController.deleteById);

module.exports = router;
