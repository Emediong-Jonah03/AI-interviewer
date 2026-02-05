import { useState } from "react";
import Navigation from "./components/navigation/navigation";
import UserMessage from "./components/navigation/user";
import AIMessage from "./components/navigation/ai";
import ChatInput from "./components/navigation/chatInput";
import "./index.css";

interface Message {
  id: number;
  type: "user" | "ai";
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "user",
      text: "How do I create a React component?",
    },
    {
      id: 2,
      type: "ai",
      text: "To create a React component, you can use either a function or a class. Here's a simple functional component example: function MyComponent() { return <div>Hello World</div>; }. Functional components are the modern approach and work great with React Hooks for state management.",
    },
    {
      id: 3,
      type: "user",
      text: "Can you show me an example with useState?",
    },
    {
      id: 4,
      type: "ai",
      text: "Sure! Here's an example using useState: import { useState } from 'react'; function Counter() { const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>Count: {count}</button>; }. The useState hook lets you add state to functional components.",
    },
  ]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text,
    };

    setMessages((prev) => [...prev, newUserMessage]);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        text: "I received your message! This is a simulated AI response. In a real application, this would connect to an AI API.",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-bg">
      <Navigation />

      {/* Chat Container */}
      <section className="sm:ml-72 md:ml-80 lg:ml-[20%] p-6 pt-20 sm:pt-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) =>
            msg.type === "user" ? (
              <UserMessage key={msg.id} text={msg.text} />
            ) : (
              <AIMessage key={msg.id} text={msg.text} />
            )
          )}
        </div>
      </section>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </main>
  );
}

export default App;