import React, { useEffect, useState } from "react";

function HomePage() {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loginWithPi = async () => {
      if (!window.Pi) {
        setError("❌ Pi SDK không khả dụng. Hãy mở ứng dụng trong Pi Browser.");
        return;
      }

      try {
        const scopes = ['username', 'payments'];

        const authResult = await window.Pi.authenticate(scopes, (payment) => {
          console.log("🔁 Incomplete payment:", payment);
        });

        console.log("✅ Pi Auth Result:", authResult);
        setUsername(authResult.user.username);
      } catch (err) {
        console.error("❌ Lỗi đăng nhập:", err);
        setError("Lỗi đăng nhập: " + err.message);
      }
    };

    loginWithPi();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🔐 Đăng nhập Pi Network</h1>

      {username ? (
        <p>👋 Xin chào, <strong>{username}</strong>! Bạn đã đăng nhập thành công với Pi.</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>⏳ Đang đăng nhập bằng Pi SDK...</p>
      )}
    </div>
  );
}

export default HomePage;
