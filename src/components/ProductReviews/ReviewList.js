import React from "react";
import { useReviews } from "../../context/ReviewContext";
import ReviewItem from "./ReviewItem";

const ReviewList = () => {
  const { reviews } = useReviews();

  if (!reviews || reviews.length === 0) {
    return <p>Henüz yorum yapılmamış.</p>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
