import React, { useState } from "react";

const AddTask = ({ title }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due, setDue] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddTask = async () => {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/todo/add", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // ✅ include JWT
                },
                body: JSON.stringify({ title: taskTitle, description, dueDate: due })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to add task");
                return;
            }

            console.log("Task added", data.task);
            alert("Task added!");
            setTaskTitle('');
            setDescription('');
            setDue('');
        } catch (err) {
            console.error(err);
            setError('Error occurred when trying to add task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-md w-100'>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <label>Task</label>
            <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="rounded-lg w-full p-2 mb-4 border border-gray-300"
            />

            <label>Description</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg w-full p-2 mb-4 border border-gray-300"
            />

            <label>Due Date (YYYY-MM-DD)</label>
            <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="rounded-lg w-full p-2 mb-4 border border-gray-300"
            />

            <button
                onClick={handleAddTask}
                disabled={loading}
                className={`bg-blue-500 rounded-lg w-full p-2 text-white hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {loading ? "Adding..." : "Add Task"}
            </button>
        </div>
    )
}

export default AddTask;