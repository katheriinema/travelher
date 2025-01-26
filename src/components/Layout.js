import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";

// Example in Layout.js
<nav>
  <Link to="/chatbot">Chatbot</Link>
  <Link to="/itinerary">Itinerary</Link>
  <Link to="/current-location">Your Current Location</Link>
</nav>;

const Layout = ({ children, pageTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div className="profile-icon" onClick={() => navigate("/profile")}>
          <img src="/assets/pfp.png" alt="Profile" />
        </div>
        <h1 style={{ color: "#f5a1b8" }}>{pageTitle}</h1> {/* Ensures consistent dusty pink */}
      </div>

      {/* Main Content */}
      <div className="main-content">{children}</div>

      {/* Bottom Tabs */}
      <div className="bottom-tabs">
        <button
          onClick={() => navigate("/chatbot")}
          className={`tab ${location.pathname === "/chatbot" ? "active-tab" : ""}`}
        >
          Chatbot
        </button>
        <button
          onClick={() => navigate("/reviews")}
          className={`tab ${location.pathname === "/reviews" ? "active-tab" : ""}`}
        >
          Reviews
        </button>
        <button
          onClick={() => navigate("/itinerary")}
          className={`tab ${location.pathname === "/itinerary" ? "active-tab" : ""}`}
        >
          Itinerary
        </button>
      </div>
    </div>
  );
};

export default Layout;
