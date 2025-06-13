import { createContext, useContext, useState, useCallback } from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./AuthContext";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { user, token } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Yorumları getir
  const fetchReviews = useCallback(async (productId) => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`/products/${productId}/reviews`);
      setReviews(res.data || []);

      if (user) {
        const existing = res.data.find((r) => r.user_id === user.id);
        setUserReview(existing || null);
      } else {
        setUserReview(null);
      }
    } catch (err) {
      console.error("Yorumlar alınamadı:", err);
      setReviews([]);
      setUserReview(null);
      setError("Yorumlar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Yorum ekle/güncelle
  const submitReview = async ({ productId, rating, comment, photo_url }) => {
    if (!token) {
      setError("Giriş yapmalısınız.");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (userReview) {
        // Güncelle
        await axios.put(
          `/products/${productId}/reviews/${userReview.id}`,
          { rating, comment, photo_url },
          config
        );
      } else {
        // Yeni yorum
        await axios.post(
          `/products/${productId}/reviews`,
          { rating, comment, photo_url },
          config
        );
      }

      await fetchReviews(productId); // Güncel listeyi çek
    } catch (err) {
      console.error("Yorum gönderilemedi:", err);
      setError(err.response?.data?.error || "Yorum gönderilirken hata oluştu.");
    }
  };

  // Yorum sil
  const deleteReview = async (productId) => {
    if (!token || !userReview) return;

    try {
      await axios.delete(`/products/${productId}/reviews/${userReview.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchReviews(productId);
    } catch (err) {
      console.error("Yorum silinemedi:", err);
      setError("Yorum silinirken bir hata oluştu.");
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        userReview,
        loading,
        error,
        fetchReviews,
        submitReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewContext);
