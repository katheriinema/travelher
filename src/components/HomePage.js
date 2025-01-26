import React from "react";
import { useNavigate } from "react-router-dom";
import SpinningSphere from "./SpinningSphere";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      {/* Add SpinningSphere at the top */}
      <SpinningSphere />
      <h1 className="homepage-header">Welcome to TravelHer</h1>
      <p className="welcome-message">Empowering solo women travelers worldwide!</p>
      <button className="start-button" onClick={() => navigate("/chatbot")}>
        Start Your Travels Now
      </button>
    </div>
  );
};

export default HomePage;
