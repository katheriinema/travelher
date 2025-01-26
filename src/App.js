import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Onboarding from "./components/Onboarding";
import Itinerary from "./components/Itinerary";
import "./App.css"; // Import your CSS file

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/itinerary" element={<Itinerary userId={1} />} />
        <Route path="*" element={<Navigate to="/home" replace />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
