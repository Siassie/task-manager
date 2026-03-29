import React, { useState, useEffect } from "react";

const CompletedTaskCard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // start as true
  const [error, setError] = useState("");

  // Fetch tasks from API
  const fetchTasks = async () => {
    const token = localStorage.getItem("token"); // grab fresh token
    if (!token) {
      setError("No token found. Please login.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/todo/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // JWT auth
        },
      });

      const data = await response.json();
      console.log("TASKS FROM API:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      setTasks(data.tasks || []); // Prisma returns { tasks: [...] }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-wrap gap-4">
      {tasks.length === 0 && <p>No tasks found.</p>}

      {tasks
        .filter((t) => t.completed)
        .map((t) => (
          <div key={t.id} className="w-64 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold">{t.title}</h3>
            <p>{t.description}</p>
            <small>
              {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : ""}
            </small>
          </div>
        ))}
    </div>
  );
};

export default CompletedTaskCard;