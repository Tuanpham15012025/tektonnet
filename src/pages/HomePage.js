import React, { useEffect, useState } from "react";

function HomePage() {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initPiSDK = async () => {
      if (!window.Pi) {
        setError("❌ Pi SDK không khả dụng. Vui lòng mở trong Pi Browser.");
        return;
      }

      try {
        // ✅ BƯỚC 1: Khởi tạo SDK
        window.Pi.init({ version: 2 });

        // ✅ BƯỚC 2: Xác thực người dùng
        const scopes = ['username', 'payments'];
        const authResult = await window.Pi.authenticate(scopes, (payment) => {
          console.log("🔁 Payment pending:", payment);
        });

        console.log("✅ Pi Auth Success:", authResult);
        setUsername(authResult.user.username);
      } catch (err) {
        console.error("❌ Auth Error:", err);
        setError("Lỗi đăng nhập: " + err.message);
      }
    };

    initPiSDK();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🔐 Đăng nhập Pi Network</h1>

      {username ? (
        <p>👋 Xin chào, <strong>{username}</strong>! Bạn đã đăng nhập thành công.</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>⏳ Đang đăng nhập bằng Pi SDK...</p>
      )}
    </div>
  );
}

export default HomePage;
