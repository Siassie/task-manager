const prisma = require('../src/prisma');

// Add a task
const addTask = async (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const taskData = {
            title,
            description: description || '',
            completed: false,
            user: { connect: { id: req.user.id } } // connect to existing user
        };

        // Optional: store dueDate if Prisma schema has it
        if (dueDate) {
            const dateObj = new Date(dueDate);
            if (isNaN(dateObj.getTime())) {
                return res.status(400).json({ message: 'Invalid dueDate. Use YYYY-MM-DD format.' });
            }
            taskData.dueDate = dateObj; // requires Prisma Task.dueDate DateTime? field
        }

        const newTask = await prisma.task.create({
            data: taskData
        });

        console.log(`Task added by user ${req.user.name}`);
        return res.status(201).json({ task: newTask });

    } catch (err) {
        console.error('Add task error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all tasks for logged-in user
const viewTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.id },
            orderBy: { id: 'asc' } // or dueDate if added
        });

        return res.status(200).json({ tasks });
    } catch (err) {
        console.error('View tasks error', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addTask, viewTasks };