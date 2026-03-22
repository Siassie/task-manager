import React, { useState } from "react";

const AddTask = ({ title }) => {
    const [ task, setTask ] = useState('');
    const [ discription, setDiscription ] = useState('');
    const [ due, setDue ] = useState('');
    const [ error, setError ] = useState('');
    const [ loading, setLoading] = useState(false);

    const handelAddTask = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/todo/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task, discription, dueDate: due })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Task added");
                setLoading(false);
                return;
            };

            console.log("Task added", data); // you get the token here
            alert("Task added");
        } catch {
            setError(data.message || 'Error occured when trying to add task');
            setLoading(false);
            return;
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-md w-100'>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <label htmlFor="task" className="text-base text-gray-500">Task</label>
            <input
                id="task"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="rounded-lg w-full p-2 mb-4 border border-gray-300"
            />

            <label htmlFor="discription" className="text-base text-gray-500">Discription</label>
            <input
                id="discription"
                type="text"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
                className="rounded-lg w-full p-2 mb-4 border border-gray-300"
            />

            <label htmlFor="due" className="text-base text-gray-500">Due Date - YYYY-MM-DD</label>
            <input
                id="due"
                type="due"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="rounded-lg w-full p-2 mb-4 border border-gray-300"
            />

            <button
                onClick={handelAddTask}
                disabled={loading}
                className={`bg-blue-500 rounded-lg w-full p-2 text-white hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    )
}

export default AddTask;