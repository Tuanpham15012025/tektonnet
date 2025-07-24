import React, { useState } from 'react';

const LoginWithPi = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!window.Pi) {
      alert("⚠️ Vui lòng mở app trong Pi Browser.");
      return;
    }

    try {
      // ✅ Init SDK trước khi sử dụng bất kỳ method nào
      await window.Pi.init({ version: 2 }); // nếu bạn dùng sandbox thì thêm environment: "sandbox"

      // Sau khi init, mới được authenticate
      window.Pi.authenticate(['username', 'payments'], (auth) => {
        if (auth?.user) {
          console.log("✅ Logged in:", auth.user);
          setUser(auth.user);
        } else {
          setError("Login failed. Please try again.");
        }
      });
    } catch (e) {
      console.error("❌ Error during Pi.init or login:", e);
      setError("Initialization or login failed.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setError("");
    alert("✅ Logged out.");
  };

  return (
    <div className="text-center mt-3">
      {user ? (
        <>
          <p className="text-green-600 font-semibold mb-1">✅ Welcome, @{user.username}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Login with Pi
        </button>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default LoginWithPi;
