import React, { useEffect, useState } from 'react';

const LoginWithPi = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (window.Pi) {
      window.Pi.init({ version: "2.0", sandbox: true })
        .then(() => {
          console.log("✅ Pi SDK initialized");
        })
        .catch((err) => {
          console.error("Pi.init() failed:", err);
        });
    } else {
      console.warn("⚠️ Pi SDK not found. Please open this app inside the Pi Browser.");
    }
  }, []);

  const handleLogin = async () => {
    try {
      if (!window.Pi) throw new Error("Pi SDK not available");

      const scopes = ['username', 'payments'];
      const auth = await window.Pi.authenticate(scopes);

      console.log("✅ Login success:", auth.user);
      setUserInfo(auth.user);
    } catch (error) {
      console.error("❌ Login failed:", error);
      setLoginError("Initialization or login failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center">Login with Pi</h1>

      {userInfo ? (
        <div className="p-4 bg-white rounded-xl shadow-md text-center">
          <p className="mb-2">✅ Đăng nhập thành công!</p>
          <p><strong>Pi Username:</strong> {userInfo.username}</p>
          <p><strong>UID:</strong> {userInfo.uid}</p>
        </div>
      ) : (
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Đăng nhập với Pi
        </button>
      )}

      {loginError && (
        <p className="mt-4 text-red-600 font-semibold">{loginError}</p>
      )}
    </div>
  );
};

export default LoginWithPi;
