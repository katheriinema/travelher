import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Layout from "./Layout";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <Layout pageTitle="Your Profile">
      <div className="profile-container">
        {user ? (
          <>
            <img
              src={user.photo || "/assets/pfp.png"}
              alt={`${user.name}'s profile`}
              className="profile-photo"
            />
            <h1>{user.name}</h1>
            <h2>{user.email}</h2>
            <div className="profile-bubble-container">
              <div className="profile-bubble">
                <strong>Name:</strong> {user.name}
              </div>
              <div className="profile-bubble">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="profile-bubble">
                <strong>Member Since:</strong> {/* Add membership date here if available */}
                January 2025
              </div>
            </div>
          </>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
