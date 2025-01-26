import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation between tabs
import "../App.css";
const pfp = "/assets/pfp.png";

const Onboarding = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to TravelHer! What's your name?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const navigate = useNavigate(); // To switch between routes (tabs)

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
    <div className="onboarding-container">
      {/* Header */}
      <header className="header">
        <div className="profile-icon" onClick={() => navigate("/profile")}>
          <img src={pfp} alt="User Profile" />
        </div>
        <h1>Your Personal Travel Assistant</h1>
      </header>

      {/* Chat Window */}
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

      {/* Bottom Tab Navigation */}
      <div className="bottom-tabs">
        <button onClick={() => navigate("/onboarding")} className="tab">
          Onboarding
        </button>
        <button onClick={() => navigate("/reviews")} className="tab">
          Reviews
        </button>
        <button onClick={() => navigate("/profile")} className="tab">
          Profile
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
