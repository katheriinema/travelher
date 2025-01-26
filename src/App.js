import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Onboarding from "./components/Onboarding";
import Itinerary from "./components/Itinerary";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/itinerary" element={<Itinerary userId={1} />} />
        <Route path="*" element={<HomePage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
