import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ReviewCard from "./ReviewCard";
import "../styles/Review.css";

const Reviews = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCity, setCurrentCity] = useState("Determining location...");

  const reviewCards = [
    {
      city: "Mexico City",
      title: "Monumento a la Revolución",
      image: "/assets/reviews.png", // Correct path for image in public folder
      rating: 4.5,
      reviews: [
        "Amazing city with beautiful landmarks! - Mira",
        "Great food and culture. - Sofi",
      ],
    },
    {
      city: "Mexico City",
      title: "Chapultepec Castle",
      image: "/assets/review2.png", // Correct path for image in public folder
      rating: 5.0,
      reviews: [
        "Breathtaking view from the top! Super safe! - Lauren",
        "A must-visit iconic spot. - Maria",
      ],
    },
  ];

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % reviewCards.length);
  };

  const handlePrevious = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + reviewCards.length) % reviewCards.length
    );
  };

  useEffect(() => {
    // Fetch the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Use OpenCageData or another reverse geocoding service
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || "Unknown location";
            setCurrentCity(city);
          } catch (error) {
            console.error("Error fetching location:", error);
            setCurrentCity("Unable to determine location");
          }
        },
        () => {
          setCurrentCity("Location permissions denied");
        }
      );
    } else {
      setCurrentCity("Geolocation not supported by this browser");
    }
  }, []);

  return (
    <Layout pageTitle="Reviews">
      {/* Current location pin */}
      <div className="current-location">
        <p>Your Current Location: {currentCity}</p>
      </div>

      <div className="reviews-content">
        <h2>Find and Share Reviews</h2>
        <p>
          Browse reviews from other women travelers and share your own
          experiences.
        </p>
        <div className="review-container">
          <button className="nav-button prev" onClick={handlePrevious}>
            ←
          </button>
          <ReviewCard cityReview={reviewCards[currentCardIndex]} />
          <button className="nav-button next" onClick={handleNext}>
            →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;
