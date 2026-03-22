import React, { useState, useEffect } from 'react'

const TaskCard = () => {
    const [ tasks, setTasks ] = useState([]);
    const [ error, setError ] = useState('');
    const [ loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/todo/all');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch tasks");
                };

                setTasks(data.tasks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []); // runs once when component mounts
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="flex flex-wrap gap-4">
            {tasks.map((t) => (
                <div
                key={t.id}
                className="w-64 bg-white p-4 rounded-lg shadow-lg"
                >
                <h3 className="font-bold">{t.task}</h3>
                <p>{t.discription}</p>
                <small>{t.date}</small>
                </div>
            ))}
        </div>
    );
};

export default TaskCard;