const express = require('express');
const router = express.Router();
const { addTask, viewTasks, deleteTask, markAsCompleted } = require('../controllers/todoController');
const { authenticateToken } = require('../middleware/userMiddleware');

// POST /task/tasks - create a new task (authenticated)
router.post('/add', authenticateToken, addTask);

// GET /task/tasks - get all tasks for logged-in user
router.get('/tasks', authenticateToken, viewTasks);

// DELETE router for individual tasks
router.delete('/delete/:id', authenticateToken, deleteTask); 

// Future: PUT /task/update/:id - update task details (e.g., mark as completed, change description)
router.put('/update/:id', authenticateToken, markAsCompleted); 

module.exports = router;