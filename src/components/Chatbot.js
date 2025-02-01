import React, { useState } from "react";
import Layout from "./Layout";
import "../styles/Chatbot.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I can help you plan your trip. Where do you want to go?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = "unique_user_id"; // Replace with actual session/user ID logic

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
  
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setLoading(true);
  
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/chat`, {
          user_id: userId,
        user_input: userInput,
      });
  
      const botResponse = response.data.response || "Sorry, something went wrong.";
      
      // Save Markdown-formatted itinerary to localStorage
      if (response.data.response) {
        localStorage.setItem("markdownItinerary", botResponse); // Save formatted response
      }
  
      setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: "Sorry, something went wrong. Please try again!" }]);
      console.error(error);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };
    
  return (
    <Layout pageTitle="Your Personal Travel Guide">
      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === "bot" ? "bot" : "user"}`}
            >
              {message.sender === "bot" ? (
                <ReactMarkdown>{message.text}</ReactMarkdown>
              ) : (
                message.text
              )}
            </div>
          ))}
          {loading && <div className="chat-message bot">Typing...</div>}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;