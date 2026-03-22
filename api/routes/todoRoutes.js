const express = require('express');
const { addTask, viewTasks } = require('../controllers/todoController');

const router = express.Router();

router.post('/add', addTask);
router.get('/all', viewTasks)

module.exports = router;
