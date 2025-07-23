import React, { useState } from "react";

const LoginPopup = ({ onClose, onLoginSuccess }) => {
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!window?.Pi) {
      setError("⚠️ Pi SDK is not available. Please open in the Pi Browser.");
      return;
    }

    try {
      window.Pi.authenticate(['username'], function (auth) {
        if (auth && auth.user) {
          onLoginSuccess(auth.user);
          onClose();
        } else {
          setError("❌ Login failed. Please try again.");
        }
      });
    } catch (err) {
      setError("❌ Unexpected error: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">🔐 Login with Pi</h2>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-3"
          onClick={handleLogin}
        >
          Authenticate
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
