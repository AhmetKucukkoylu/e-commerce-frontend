import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useReviews } from "../../context/ReviewContext";
import { useNavigate } from "react-router-dom";
import "./ReviewForm.css";

const ReviewForm = ({ productId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    userReview,
    submitReview,
    deleteReview,
    loading,
    error,
  } = useReviews();

  const [rating, setRating] = useState(userReview?.rating || 5);
  const [comment, setComment] = useState(userReview?.comment || "");
  const [photoUrl, setPhotoUrl] = useState(userReview?.photo_url || "");

  if (!user) {
    return (
      <div className="review-form-login">
        <p>Yorum yapmak için giriş yapmalısınız.</p>
        <button className="review-form-login-btn" onClick={() => navigate("/login")}>Giriş Yap</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitReview({ productId, rating, comment, photo_url: photoUrl });
  };

  const handleDelete = async () => {
    await deleteReview(productId);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4 className="review-form-title">{userReview ? "Yorumunu Güncelle" : "Yorum Yap"}</h4>
      <div className="review-form-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className={`star-btn${star <= rating ? " active" : ""}`}
            aria-label={`${star} yıldız`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        rows={3}
        placeholder="Yorumunuzu yazın..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="review-form-textarea"
      />
      <input
        type="text"
        placeholder="Fotoğraf URL (isteğe bağlı)"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        className="review-form-input"
      />
      {error && <p className="review-form-error">{error}</p>}
      <div className="review-form-btn-row">
        <button type="submit" className="review-form-submit-btn" disabled={loading}>
          {userReview ? "Güncelle" : "Gönder"}
        </button>
        {userReview && (
          <button type="button" className="review-form-delete-btn" onClick={handleDelete} disabled={loading}>
            Sil
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
