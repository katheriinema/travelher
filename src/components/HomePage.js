import React from "react";
import { useNavigate } from "react-router-dom";
import SpinningSphere from "./SpinningSphere";
import "../App.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/onboarding");
  };

  return (
    <div className="App">
      <header className="App-header">
        <SpinningSphere />
        <h1>Welcome to TravelHer</h1>
        <p>Empowering solo women travelers worldwide!</p>
        <button className="start-button" onClick={handleStartClick}>
          Start Your Travels Now
        </button>
      </header>
    </div>
  );
};

export default HomePage;
