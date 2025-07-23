import React, { useState } from 'react';

const LoginWithPi = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (typeof window.Pi === "undefined") {
      alert("⚠️ Pi SDK is not available. Please open this app inside Pi Browser.");
      return;
    }

    setLoading(true);
    setLoginError(null);

    try {
      const scopes = ['username', 'payments'];

      window.Pi.authenticate(scopes, function(auth) {
        if (auth && auth.user) {
          console.log("✅ Pi Auth Success:", auth);
          setUserInfo(auth.user);
        } else {
          console.warn("⚠️ No user info returned:", auth);
          setLoginError("Login failed. Please try again.");
        }
      });
    } catch (error) {
      console.error("❌ Pi login error:", error);
      setLoginError("Unexpected error. Try again in Pi Browser.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center">🔐 Login with Pi</h1>

      {userInfo ? (
        <div className="p-4 bg-white rounded-xl shadow text-center">
          <p className="mb-2">✅ Đăng nhập thành công!</p>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>UID:</strong> {userInfo.uid}</p>
        </div>
      ) : (
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-5 rounded shadow"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập với Pi"}
        </button>
      )}

      {loginError && (
        <p className="mt-4 text-red-600 font-semibold">{loginError}</p>
      )}
    </div>
  );
};

export default LoginWithPi;
