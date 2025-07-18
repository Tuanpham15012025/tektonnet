// src/components/ChatBot.jsx
import React, { useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { from: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();
    setMessages([...newMessages, { from: 'bot', text: data.reply }]);
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">AI Chat Assistant</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2 bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${msg.from === 'user' ? 'bg-blue-200' : 'bg-green-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">Send</button>
      </div>
    </div>
  );
}
