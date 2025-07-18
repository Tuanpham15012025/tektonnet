// src/components/ChatBubble.js
function ChatBubble({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div className={`text-sm p-2 rounded-lg max-w-[75%] ${isUser ? "bg-blue-100 ml-auto" : "bg-gray-200"}`}>
      <span>{text}</span>
    </div>
  );
}

export default ChatBubble;
