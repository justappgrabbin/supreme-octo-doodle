import { useState } from "react";
import { sendMessage } from "./chat";

export default function App() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a setup assistant for my app." }
  ]);
  const [input, setInput] = useState("");

  async function handleSend() {
    if (!input.trim()) return;

    const updated = [...messages, { role: "user", content: input }];
    setMessages(updated);
    setInput("");

    const reply = await sendMessage(updated);
    setMessages([...updated, { role: "assistant", content: reply }]);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Paper Chat</h2>

      <div style={{ minHeight: 300, marginBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type..."
        style={{ width: "70%" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
