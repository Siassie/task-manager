const todo = require('../model/todoModel');

const addTask = async(request, response) => {
    const { task, discription, dueDate } = request.body;

    if (!task || !dueDate) {
        return response.status(401).json({
            message: 'Missing required fields'
        });
    };

    const dateObj = new Date(dueDate);

    if (isNaN(dateObj.getDate())) { 
        return response.status(401).json({
            message: 'Due date is not in the correct format. Please use a valid date (YYYY-MM-DD).'
        });
    }

    // This converts "2026-03-26T00:00:00.000Z" to "2026-03-26"
    const formattedDate = dateObj.toISOString().split('T')[0];

    const completed = false;

    const newTask = {
        id: Date.now(),
        task,
        discription,
        date: formattedDate, // Now stores "YYYY-MM-DD"
        completed
    };

    todo.push(newTask);

    return response.status(200).json({ newTask });
};

const viewTasks = async(request, response) => {
    if (todo.length === 0) {
        return response.status(401).json({
            message: "No tasks found"
        });
    };

    return response.status(200).json({
        tasks: todo
    });
};

module.exports = { addTask, viewTasks };