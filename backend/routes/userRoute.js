const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/userMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/profile', authenticateToken, getProfile);

module.exports = router;