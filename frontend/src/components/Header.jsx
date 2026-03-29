import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header style={styles.header}>
      <NavLink to="/" className="font-bold text-lg">
        Task Manager
      </NavLink>
      <nav className="flex gap-4">
        <NavLink to="/task/all">Tasks</NavLink>
        <NavLink to="/task/add">Add Task</NavLink>
        <NavLink to="/task/completed">Completed Tasks</NavLink>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    background: "#f0f0f0",
    color: "#333",
  },
};