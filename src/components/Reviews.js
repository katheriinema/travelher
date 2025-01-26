import React, { useState } from 'react';
import "../App.css";

function ReviewCard({ cityReview }) {
  const { city, image, rating, reviews } = cityReview;
  const [newReview, setNewReview] = useState('');

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleAddReview = () => {
    if (newReview.trim() !== '') {
      alert(`New review for ${city}: ${newReview}`);
      setNewReview('');
    }
  };

  return (
    <div>
      <div className="header">
        <h1 className="centered-text">Places Recommended For You</h1>
      </div>
      <div className="place-item">
        <img
          src="C:/TravelHER/TravelHERback/monument%20mexico.jpg"
          alt="Monumento a la Revolución"
          className="city-image"
        />
        <div className="place-details">
          <h2>Monumento a la Revolución</h2>
          <div className="rating">
            <span>4.5</span> ★
          </div>
          <ul className="reviews-list">
            <li>Amazing city with beautiful landmarks!</li>
            <li>Great food and culture. - Sofi</li>
          </ul>
          <textarea
            className="review-input"
            placeholder="Write your review for Monumento a la Revolución..."
            value={review}
            onChange={handleReviewChange}
          />
          <button className="add-review-button" onClick={handleAddReview}>
            Add Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityReviewCard;
