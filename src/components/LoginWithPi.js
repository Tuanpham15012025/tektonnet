import React, { useEffect, useState } from 'react';

const LoginWithPi = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = () => {
    if (!window.Pi) {
      alert("Vui lòng mở ứng dụng trong Pi Browser để sử dụng tính năng này.");
      return;
    }

    window.Pi.authenticate(
      ['username', 'payments'], // quyền yêu cầu
      function (auth) {
        if (auth && auth.user) {
          console.log('User info:', auth.user);
          setUserInfo(auth.user);
        } else {
          setLoginError('Không thể lấy thông tin người dùng.');
        }
      }
    );
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
