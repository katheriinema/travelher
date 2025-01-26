import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      {error ? (
        <p>{error}</p>
      ) : itinerary ? (
        <div>
          <h2>Itinerary for {itinerary.destination}</h2>
          <p>Duration: {itinerary.duration} days</p>
          <h3>Activities:</h3>
          <ul>
            {itinerary.activities && itinerary.activities.length > 0 ? (
              itinerary.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))
            ) : (
              <p>No activities planned yet.</p>
            )}
          </ul>
          <h3>Schedule:</h3>
          {itinerary.schedule ? (
            <pre>{JSON.stringify(itinerary.schedule, null, 2)}</pre>
          ) : (
            <p>Schedule is not available yet.</p>
          )}
        </div>
      ) : (
        <p>Loading itinerary...</p>
      )}
    </div>
  );
};

export default Itinerary;
