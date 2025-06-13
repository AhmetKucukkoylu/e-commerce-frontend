import React from "react";
import { useAuth } from "../../context/AuthContext";

const ReviewItem = ({ review }) => {
  const { user } = useAuth();
  const isOwner = user?.id === review.user_id;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "6px",
        backgroundColor: isOwner ? "#f0f8ff" : "#fff",
      }}
    >
      <p><strong>Puan:</strong> {"⭐".repeat(review.rating)}</p>
      {review.comment && <p><strong>Yorum:</strong> {review.comment}</p>}
      {review.photo_url && (
        <img
          src={review.photo_url}
          alt="yorum görseli"
          style={{ maxWidth: "150px", borderRadius: "4px", marginTop: "0.5rem" }}
        />
      )}
      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        {review.users?.name && <span>{review.users.name} | </span>}
        {new Date(review.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default ReviewItem;
