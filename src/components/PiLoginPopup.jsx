import React, { useState } from "react";

export default function PiLoginPopup() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    if (!window.Pi) {
      alert("Pi SDK is not available. Please run this in Pi Browser.");
      return;
    }

    try {
      const scopes = ['username', 'payments'];
      const result = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(result.user);
      setLoggedIn(true);
    } catch (error) {
      console.error("Pi Login failed", error);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const onIncompletePaymentFound = (payment) => {
    console.log("Found incomplete payment:", payment);
  };

  return (
    <div className="mt-4">
      {loggedIn ? (
        <div className="text-sm text-gray-700">
          👋 Hello, <strong>{user?.username}</strong>
          <button
            onClick={handleLogout}
            className="ml-4 text-red-500 underline hover:text-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
        >
          Login with Pi
        </button>
      )}
    </div>
  );
}
