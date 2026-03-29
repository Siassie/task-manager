import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./pages/Home";
import AddTaskPage from "./pages/AddTaskPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CompletedTasksPage from "./pages/CompletedTasksPage";
import AllTasksPage from "./pages/AllTasksPage";

function App() {
  return (
    <Routes>

      {/* App routes (with header) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/task/all" element={<AllTasksPage />} />
        <Route path="/task/add" element={<AddTaskPage />} />
        <Route path="/task/completed" element={<CompletedTasksPage />} />
      </Route>

      {/* Auth routes (no header) */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />

      <Route
        path="/signup"
        element={
          <AuthLayout>
            <SignupPage />
          </AuthLayout>
        }
      />

    </Routes>
  );
}

export default App;