import { Routes, Route } from 'react-router-dom';
import LoginCard from './components/Login';
import SignupCard from './components/signupCard';
import AddTask from './components/AddTask';
import TaskCard from './components/TaskCard';

function App() {
  return (
    <div className="flex flex-row gap-4 justify-center items-center min-h-screen bg-gray-100">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex-row">
              <TaskCard />
            </div>
          }
        />

        <Route path="/task/add" element={<AddTask title="Add Task" />} />
        <Route path="/signup" element={<SignupCard title="Sign Up" />} />
        <Route path="/login" element={<LoginCard title="Login" />} />
      </Routes>
    </div>
  );
}

export default App;