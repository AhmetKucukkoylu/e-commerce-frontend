// components/ProductCard/WishlistIcon.js
import React from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WishlistIcon = ({ product }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const toggle = (e) => {
    e.stopPropagation();
    if (!user) return navigate("/login");

    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  return (
    <div
      className="wishlist-icon"
      onClick={toggle}
      title="Favorilere ekle/kaldır"
    >
      {isInWishlist(product.id) ? "❤️" : "🤍"}
    </div>
  );
};

export default WishlistIcon;
