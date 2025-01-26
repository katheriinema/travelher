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
    <div className="place-item">
      <img src={image} alt={city} className="city-image" />
      <div className="place-details">
        <h2>{city}</h2>
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
          value={newReview}
          onChange={handleReviewChange}
          placeholder={`Write your review for ${city}...`}
        ></textarea>
        <button className="add-review-button" onClick={handleAddReview}>Add Review</button>
      </div>
    </div>
  );
}

export default ReviewCard;
