import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Chatbot from "./components/Chatbot";
import Itinerary from "./components/Itinerary";
import Profile from "./components/Profile";
import Reviews from "./components/Reviews";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/itinerary" element={<Itinerary userId={1} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="*" element={<HomePage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
