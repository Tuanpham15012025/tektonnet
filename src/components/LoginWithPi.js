import React, { useState, useEffect } from "react";

const LoginWithPi = () => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    if (!window.Pi) {
      alert("⚠️ Please open this app in the Pi Browser to login with Pi.");
      return;
    }

    window.Pi.authenticate(['username', 'payments'], (authResult) => {
      if (authResult && authResult.user) {
        setUser(authResult.user);
        console.log("✅ User:", authResult.user);
      } else {
        setLoginError("❌ Login failed. Please try again.");
        console.error("Login failed", authResult);
      }
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="text-center my-6">
      {user ? (
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="font-semibold text-green-600">✅ Logged in as: {user.username}</p>
          <button
            onClick={handleLogout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Login with Pi
        </button>
      )}

      {loginError && (
        <p className="text-red-500 mt-3">{loginError}</p>
      )}
    </div>
  );
};

export default LoginWithPi;
