import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../services/axiosInstance';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // ✅ Favorileri backend'den al
  const getWishlist = async () => {
    if (!token) return;
    try {
      const res = await axios.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Backend'den gelen veri: [{id, product: {id, name, image_url, price}}]
      const mapped = res.data.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image_url: item.product.image_url
      }));
      setWishlist(mapped);
    } catch (err) {
      console.error("Favoriler alınamadı:", err);
    }
  };

  const addToWishlist = async (product) => {
    if (!token) return;
    try {
      await axios.post("/wishlist", { product_id: product.id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist((prev) => {
        if (prev.find((p) => p.id === product.id)) return prev;
        return [...prev, product];
      });
    } catch (err) {
      console.error("Favori eklenemedi:", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) return;
    try {
      await axios.delete(`/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("Favori silinemedi:", err);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  useEffect(() => {
    getWishlist();
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
