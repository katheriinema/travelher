import React from "react";
import Layout from "./Layout";
import "../styles/Review.css";

const Reviews = () => {
  return (
    <Layout pageTitle="Reviews">
      <div className="reviews-content">
        <h2>Find and Share Reviews</h2>
        <p>
          Browse reviews from other women travelers and share your own
          experiences.
        </p>
        <ul className="reviews-list">
          <li>
            <strong>Paris:</strong> "Loved the Eiffel Tower! Safe and easy to
            explore solo." - Jane
          </li>
          <li>
            <strong>Tokyo:</strong> "Great public transport and helpful locals.
            Highly recommend!" - Maria
          </li>
          <li>
            <strong>New York:</strong> "Be mindful of busy areas, but plenty of
            amazing sights to see." - Sophie
          </li>
        </ul>
        <button className="add-review-button">Add Your Review</button>
      </div>
    </Layout>
  );
};

export default Reviews;
