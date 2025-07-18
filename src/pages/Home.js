import React, { useState } from 'react';

const Home = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to TektonNet! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const callOpenAI = async (userInput) => {
    setLoading(true);

    const systemPrompt = "You are a helpful assistant for a smart construction app called TektonNet. Always respond in English.";

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userInput },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, no response.';

      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Error calling OpenAI API.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    callOpenAI(input);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
          🏗️ Welcome to TektonNet
        </h1>

        <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            👷 Smart construction platform with AI
          </h2>
          <p className="text-gray-600">
            Get technical support, smart tools, and Pi payment integration in one place.
          </p>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">💬 AI Chat Assistant</h3>
          <div className="h-60 overflow-y-auto border rounded-lg p-3 mb-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  msg.from === 'bot' ? 'text-blue-600' : 'text-gray-800 text-right'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-blue-400">Typing...</div>}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Type your question..."
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
