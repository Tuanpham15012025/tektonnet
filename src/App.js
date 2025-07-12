// src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [userPayload, setUserPayload] = useState(null);

  const handleLogin = async () => {
    if (!window?.Pi) {
      alert("Pi SDK not loaded. Please open via Pi Browser.");
      return;
    }

    window.Pi.authenticate(["username", "payment"], function (auth) {
      console.log("Pi authentication result:", auth);
      setUsername(auth.user.username);
      setUserPayload(auth);
    });
  };

  useEffect(() => {
    document.title = "TektonNet – Pi Super App for Construction";
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f0f0f0", minHeight: "100vh" }}>
      <h1>👷‍♂️ Welcome to TektonNet</h1>
      <p>A construction-tech Super App powered by the Pi Network.</p>

      {!username ? (
        <button onClick={handleLogin} style={{ padding: "10px 20px", marginTop: "20px" }}>
          🔐 Login with Pi
        </button>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h3>Hello, @{username}</h3>
          <pre style={{ background: "#fff", padding: "10px", borderRadius: "5px" }}>
            {JSON.stringify(userPayload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
