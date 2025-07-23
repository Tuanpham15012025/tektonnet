import React from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { userInfo, login, logout } = useAuth();

  const handleLogin = () => {
    if (!window.Pi) {
      alert("Vui lòng mở bằng Pi Browser để đăng nhập.");
      return;
    }

    window.Pi.authenticate(['username', 'payments'], (auth) => {
      if (auth && auth.user) {
        login(auth.user);
      } else {
        alert('Đăng nhập thất bại. Vui lòng thử lại.');
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Đăng nhập với Pi</h1>

      {userInfo ? (
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="mb-2">✅ Xin chào: <strong>{userInfo.username}</strong></p>
          <p>UID: {userInfo.uid}</p>
          <button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={logout}
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded"
          onClick={handleLogin}
        >
          Đăng nhập với Pi
        </button>
      )}
    </div>
  );
};

export default LoginPage;
