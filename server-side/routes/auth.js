const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/users',authController.getAllUsers)
router.get('/users/:username', authController.getUserById)
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.use(authController.authorize);

module.exports = router;