import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

console.log('SignupCard rendering'); // Add this line

function SignupCard({ title }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Register failed");
        setLoading(false);
        return;
      }

      console.log("Register successful", data);
      if (response.ok) {
        localStorage.setItem("token", data.token); // optional
        alert("Signup successful!");
        navigate("/login"); // redirect to login page
      }
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

      <label htmlFor="name" className="text-base text-gray-500">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-lg w-full p-2 mb-4 border border-gray-300"
      />

      <label htmlFor="surname" className="text-base text-gray-500">Surname</label>
      <input
        id="surname"
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className="rounded-lg w-full p-2 mb-4 border border-gray-300"
      />

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
        onClick={handleSignup} // ✅ correct handler
        disabled={loading}
        className={`bg-blue-500 rounded-lg w-full p-2 text-white hover:bg-blue-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
}

export default SignupCard;