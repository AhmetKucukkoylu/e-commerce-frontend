import React, { useEffect, useState } from "react";
import { useUserReviews } from "../../context/UserReviewContext";

const UserReviewEditModal = () => {
  const {
    editingReview,
    setEditingReview,
    updateUserReview,
  } = useUserReviews();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (editingReview) {
      setRating(editingReview.rating || 5);
      setComment(editingReview.comment || "");
      setPhotoUrl(editingReview.photo_url || "");
    }
  }, [editingReview]);

  if (!editingReview) return null;

  const handleClose = () => setEditingReview(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateUserReview(editingReview.id, {
      rating,
      comment,
      photo_url: photoUrl,
    });

    handleClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h3>Yorumu Güncelle</h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                style={{
                  fontSize: "1.5rem",
                  background: "none",
                  border: "none",
                  color: star <= rating ? "orange" : "#ccc",
                  cursor: "pointer",
                }}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem" }}
            placeholder="Yorumunuz"
          />

          <input
            type="text"
            placeholder="Fotoğraf URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            style={{ width: "100%", marginBottom: "1rem" }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Güncelle</button>
            <button type="button" onClick={handleClose}>
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserReviewEditModal;
