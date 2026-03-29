import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ProfileCard() {
    const token = localStorage.getItem("token");

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUserInfo = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:5000/user/profile`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Profile fetch failed.");
                setLoading(false);
                return;
            }

            setUser(data.user);
            setLoading(false);

        } catch (err) {
            console.log(err);
            setError('Server error. Try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        handleUserInfo(); // replace with real user ID
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white shadow-md rounded-lg p-6 w-80 border border-gray-200 hover:shadow-lg transition">

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {user && (
                    <div className="flex flex-col">
                        <label>Name</label>
                        <input className="input" defaultValue={user.name} />

                        <label>Surname</label>
                        <input className="input" defaultValue={user.surname} />

                        <label>Email</label>
                        <input className="input" defaultValue={user.email} />

                        <label>Password</label>
                        <input type="password" className="input" />

                        <button className='bg-blue-500 rounded-lg w-full p-2 text-white hover:bg-blue-600 transition'>
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileCard;