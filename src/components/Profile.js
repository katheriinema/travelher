import React from "react";
import Layout from "./Layout";
import "../styles/Profile.css";

const Profile = () => {
  return (
    <Layout pageTitle="Your Profile">
      <div className="profile-content">
        <h2>Welcome to your profile!</h2>
        <p>Manage your account details here.</p>
      </div>
    </Layout>
  );
};

export default Profile;
