import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import "../styles/Itinerary.css";

const Itinerary = ({ userId }) => {
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/itineraries/${userId}`
        );
        setItinerary(response.data);
      } catch (err) {
        console.error("Error fetching itinerary:", err);
        setError("Failed to load itinerary. Please try again.");
      }
    };

    fetchItinerary();
  }, [userId]);

  return (
    <Layout pageTitle="Your Itinerary">
      <div className="itinerary-content">
        {error ? (
          <p className="error-message">{error}</p>
        ) : itinerary ? (
          <div className="itinerary-details">
            <h2>Destination: {itinerary.destination}</h2>
            <p>Duration: {itinerary.duration} days</p>
            <h3>Activities:</h3>
            <ul>
              {itinerary.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
            <h3>Schedule:</h3>
            <pre className="schedule">
              {JSON.stringify(itinerary.schedule, null, 2)}
            </pre>
          </div>
        ) : (
          <p>Loading itinerary...</p>
        )}
      </div>
    </Layout>
  );
};

export default Itinerary;
