import React, { useState } from "react";
import "../styles/Review.css";

function ReviewCard({ cityReview }) {
  const { city, title, image, rating, reviews } = cityReview;
  const [newReview, setNewReview] = useState("");

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleAddReview = () => {
    if (newReview.trim() !== "") {
      alert(`New review for ${title}, ${city}: ${newReview}`);
      setNewReview("");
    }
  };

  return (
    <div className="review-card">
      <img src={image} alt={`Image of ${title}`} className="city-image" />
      <div className="place-details">
        <h2>
          {title}, {city}
        </h2>
        <div className="rating">
          <span>{rating}</span> ★
        </div>
        <ul className="reviews-list">
          {reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
        <textarea
          className="review-input"
          placeholder={`Write your review for ${title}...`}
          value={newReview}
          onChange={handleReviewChange}
        />
        <button className="add-review-button" onClick={handleAddReview}>
          Add Review
        </button>
      </div>
    </div>
  );
}

export default ReviewCard;