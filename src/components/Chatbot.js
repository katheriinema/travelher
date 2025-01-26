import React, { useState } from "react";
import Layout from "./Layout";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to TravelHer! What's your name?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    const botResponse = getBotResponse(userInput);

    if (botResponse) {
      newMessages.push({ sender: "bot", text: botResponse });
    }

    setMessages(newMessages);
    setUserInput(""); // Clear input field
  };

  const getBotResponse = (input) => {
    if (input.toLowerCase().includes("hi") || input.toLowerCase().includes("hello")) {
      return "Hello! It's great to meet you. Where are you planning to travel?";
    }
    if (input.toLowerCase().includes("paris")) {
      return "Paris is a wonderful choice! Do you prefer sightseeing or relaxing activities?";
    }
    return "I'm here to help! Tell me more about your travel preferences.";
  };

  return (
    <Layout pageTitle="Your Personal Travel Assistant">
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === "bot" ? "bot" : "user"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
