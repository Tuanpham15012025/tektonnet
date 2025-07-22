// src/components/PiLoginPopup.jsx
import React, { useState } from "react";

export default function PiLoginPopup() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!window?.Pi) {
      return alert("Pi SDK not loaded. Please use Pi Browser.");
    }

    try {
      const scopes = ['username', 'payments'];
      const authResult = await window.Pi.authenticate(scopes, (authData) => {
        console.log('onIncompletePaymentFound', authData);
      });
      setUser(authResult.user);
      setError(null);
    } catch (err) {
      setError(err.message || "Login failed.");
      setUser(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="text-center mt-4">
      {!user ? (
        <button
          onClick={handleLogin}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Login with Pi
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-700 mb-2">
            Logged in as <strong>{user?.username}</strong>
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
