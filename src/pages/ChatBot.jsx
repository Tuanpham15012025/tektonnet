import { useState, useEffect, useRef } from 'react';

export default function ChatBot({ username = 'Guest' }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hi ${username}, how can I assist your construction project today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: '⚠️ Sorry, something went wrong with the AI assistant.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">💬 AI Construction Assistant</h2>

      <div className="h-96 overflow-y-auto border border-gray-300 rounded-md p-4 bg-gray-50 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-3 py-2 rounded-lg shadow-sm max-w-xs whitespace-pre-wrap ${
                msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 text-center italic">Thinking...</div>
        )}
        <div ref={scrollRef}></div>
      </div>

      <div className="mt-4 flex gap-2">
        <textarea
          rows={2}
          className="flex-1 border border-gray-300 rounded-md p-2 resize-none"
          value={input}
          placeholder="Ask about building materials, techniques, estimates..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded ${
            loading || !input.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
