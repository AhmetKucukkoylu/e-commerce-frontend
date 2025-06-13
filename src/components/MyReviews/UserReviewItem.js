import React from "react";
import { useUserReviews } from "../../context/UserReviewContext";

const UserReviewItem = ({ review }) => {
  const { deleteUserReview, setEditingReview } = useUserReviews();

  const handleDelete = () => {
    if (window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) {
      deleteUserReview(review.id);
    }
  };

  const handleEdit = () => {
    setEditingReview(review);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "#fff",
      }}
    >
      <p><strong>Ürün ID:</strong> {review.product_id}</p>
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
        {new Date(review.created_at).toLocaleString()}
      </p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button onClick={handleEdit}>Düzenle</button>
        <button onClick={handleDelete} style={{ color: "red" }}>
          Sil
        </button>
      </div>
    </div>
  );
};

export default UserReviewItem;
