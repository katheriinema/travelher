import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import Itinerary from "./components/Itinerary";
import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to TravelHer</h1>
          <p>Empowering solo women travelers worldwide!</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/itinerary" element={<Itinerary userId={1} />} />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>TravelHer © 2025. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
