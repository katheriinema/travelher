import React, { useState } from "react";
import Layout from "./Layout";
import ReviewCard from "./ReviewCard";
import "../styles/Review.css";

const Reviews = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

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

  return (
    <Layout pageTitle="Reviews">
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
