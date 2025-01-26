import React, { useState } from "react";
import Layout from "./Layout";
import "../styles/Chatbot.css";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I can help you plan your trip. Where do you want to go?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];

    try {
      // Example: Send the last user input to the backend
      const response = await axios.post("http://localhost:5000/generate-itinerary", {
        destination: "Paris", // Hardcoded for now; replace with user input later
        duration: "7 days",
        season: "Summer",
        activities: ["Sightseeing", "Food and Drink"],
      });

      newMessages.push({ sender: "bot", text: response.data.response });
    } catch (error) {
      newMessages.push({ sender: "bot", text: "Sorry, something went wrong. Please try again!" });
      console.error(error);
    }

    setMessages(newMessages);
    setUserInput(""); // Clear input
  };

  return (
    <Layout pageTitle="Chatbot">
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
