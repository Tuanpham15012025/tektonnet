import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [piUser, setPiUser] = useState(null);

  const handlePiLogin = async () => {
    if (window?.Pi) {
      try {
        const authResult = await window.Pi.authenticate({
          onIncompletePaymentFound: (payment) => {
            console.warn("Incomplete payment found:", payment);
          },
        });
        setPiUser(authResult.user);
        alert(`👋 Welcome ${authResult.user.username}`);
      } catch (error) {
        console.error("Pi Login failed:", error);
        alert("Login failed. Please try again.");
      }
    } else {
      alert("⚠️ Please open this app in the Pi Browser.");
    }
  };

  useEffect(() => {
    if (window.Pi) {
      console.log("✅ Pi SDK available");
    } else {
      console.warn("⚠️ Pi SDK not available");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 text-gray-800 font-sans">
      <header className="text-center mt-4 mb-6">
        <h1 className="text-4xl font-bold mb-2">🏗️ Welcome to TektonNet</h1>
        <p className="text-lg text-gray-600">👷 Smart construction platform with AI</p>
      </header>

      <main className="w-full max-w-2xl space-y-6">
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-3">📌 About TektonNet</h2>
          <p>
            TektonNet is a smart construction DApp on Pi Network, built with React and Pi SDK.
            Phase 1 features include <strong>Pi Login, expert consultation</strong>, and <strong>basic site tools</strong>.
            Phase 2 adds <strong>AI-powered inspections</strong> and <strong>document templates</strong>.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold">🔗 Access TektonNet</h2>
          <a
            href="https://tektonnet.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
          >
            Launch App
          </a>
          <div className="mt-4">
            <button
              onClick={handlePiLogin}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
            >
              {piUser ? `👋 ${piUser.username}` : "Login with Pi"}
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold">💛 Support Pi Testing/Donation</h2>
          <p className="mt-2 break-all text-sm font-mono text-gray-700">
            GBS4UAXWRA2VA233EJQDR5HICLPVX7X5F2VDNNQPKQZM3V7FO2OGZR3N
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">💬 AI Chat Assistant</h2>
          <p className="text-gray-600 mb-3">Ask AI for construction help, documents, or advice.</p>
          <Link
            to="/chat"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Chat Assistant
          </Link>
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 mt-10">
        &copy; 2025 TektonNet. Powered by Pi Network.
      </footer>
    </div>
  );
}
