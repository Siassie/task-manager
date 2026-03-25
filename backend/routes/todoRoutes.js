const express = require('express');
const router = express.Router();
const { addTask, viewTasks } = require('../controllers/todoController');
const { authenticateToken } = require('../middleware/userMiddleware');

// POST /task/tasks - create a new task (authenticated)
router.post('/add', authenticateToken, addTask);

// GET /task/tasks - get all tasks for logged-in user
router.get('/tasks', authenticateToken, viewTasks);

module.exports = router;