// components/ProductReviews/ProductReviews.js
import React, { useEffect } from "react";
import { useReviews } from "../../context/ReviewContext";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

const ProductReviews = ({ productId, averageRating }) => {
  const { fetchReviews, loading, reviews } = useReviews();

  useEffect(() => {
    if (productId) {
      fetchReviews(productId);
    }
  }, [productId, fetchReviews]);

  if (loading) return <p>Yorumlar yükleniyor...</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>
        Yorumlar ({reviews.length}){" "}
        {reviews.length > 0 && (
          <span style={{ fontWeight: "normal", fontSize: "0.95rem", color: "#666" }}>
            – {renderStars(averageRating)} ({averageRating.toFixed(1)} / 5)
          </span>
        )}
      </h3>

      <ReviewList />
      <ReviewForm productId={productId} />
    </div>
  );
};

const renderStars = (value) => {
  const full = Math.floor(value);
  const half = value % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
};

export default ProductReviews;
