
import React, { useState } from 'react';
import './chat_win.css';

function ChatWindow() {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState('');       


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse = await sendToFlask(input);


    const botMessage = { sender: 'bot', text: botResponse };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setInput(''); 
  };

  
  const sendToFlask = async (question) => {
  try {
    console.log("Sending question to Flask:", question); 
    const response = await fetch('http://localhost:5001/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    // Check response
    if (!response.ok) {
      console.error("Response error:", response.status, response.statusText);
      return 'Sorry, there was an issue getting the response from the server.';
    }


    const data = await response.json();
    console.log("Received response from Flask:", data); 
    return data.answer;
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, there was an issue getting the response from the server.';
  }
};


  return (
    <div className="chat-window">
      <div className="chat-header">FAQ Chatbot</div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;
