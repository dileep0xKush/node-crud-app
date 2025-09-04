const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth routes
router.get('/', authController.showLogin);
router.get('/register', authController.showRegister);

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/logout', authController.logoutUser);

module.exports = router;
