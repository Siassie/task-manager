import React, { useState } from "react";

function LoginCard({ title }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      console.log("Login successful", data); // you get the token here
      alert("Login successful!");

      // optional: save token to localStorage
      localStorage.setItem("token", data.token);

    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-80 border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <label htmlFor="email" className="text-base text-gray-500">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg w-full p-2 mb-4 border border-gray-300"
      />

      <label htmlFor="password" className="text-base text-gray-500">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-lg w-full p-2 mb-4 border border-gray-300"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className={`bg-blue-500 rounded-lg w-full p-2 text-white hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default LoginCard;