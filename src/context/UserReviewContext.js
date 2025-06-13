import { createContext, useContext, useState, useCallback } from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./AuthContext";

const UserReviewContext = createContext();

export const UserReviewProvider = ({ children }) => {
  const { token } = useAuth();

  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState("");

  const fetchUserReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("/users/me/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserReviews(res.data || []);
    } catch (err) {
      console.error("Yorumlar alınamadı:", err);
      setUserReviews([]);
      setError("Yorumlar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const deleteUserReview = async (productId, reviewId) => {
    try {
      await axios.delete(`/products/${productId}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("Silme hatası:", err);
      setError("Yorum silinemedi.");
    }
  };

  const updateUserReview = async (productId, reviewId, { rating, comment, photo_url }) => {
    try {
      await axios.put(
        `/products/${productId}/reviews/${reviewId}`,
        { rating, comment, photo_url },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUserReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, rating, comment, photo_url } : r
        )
      );
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      setError("Yorum güncellenemedi.");
    }
  };

  const createUserReview = async (productId, { rating, comment, photo_url }) => {
    try {
      const res = await axios.post(
        `/products/${productId}/reviews`,
        { rating, comment, photo_url },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserReviews((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Yorum eklenemedi:", err);
      setError("Yorum eklenemedi.");
    }
  };

  return (
    <UserReviewContext.Provider
      value={{
        userReviews,
        loading,
        error,
        editingReview,
        setEditingReview,
        fetchUserReviews,
        deleteUserReview,
        updateUserReview,
        createUserReview,
      }}
    >
      {children}
    </UserReviewContext.Provider>
  );
};

export const useUserReviews = () => useContext(UserReviewContext);
