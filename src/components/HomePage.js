import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";
import saveUserToDatabase from "../utils/saveUserToDatabase"; // Function to save user info to Firestore
import SpinningSphere from "./SpinningSphere";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // Trigger Google sign-in popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("User signed in:", user);
  
      // Save user info to Firestore, but don't block navigation if it fails
      saveUserToDatabase(user).catch((error) => {
        console.error("Error saving user to database:", error);
      });
  
      // Navigate to the chatbot after login
      navigate("/chatbot");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Failed to log in. Please try again.");
    }
  };
  
  return (
    <div className="homepage-container">
      {/* Add SpinningSphere at the top */}
      <SpinningSphere />
      <h1 className="homepage-header">Welcome to TravelHer</h1>
      <p className="welcome-message">Empowering solo women travelers worldwide!</p>
      <button className="start-button" onClick={handleGoogleLogin}>
        Start Your Travels Now
      </button>
    </div>
  );
};

export default HomePage;
