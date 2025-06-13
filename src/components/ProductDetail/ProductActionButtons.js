import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProductModels } from "../../context/ProductModelContext";
import "./ProductActionButtons.css";

const ProductActionButtons = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { models, colors, getModels, getColors, loading } = useProductModels();

  const [selectedModelId, setSelectedModelId] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Seçili varyasyonun stok miktarı
  const selectedColorObj = colors.find(c => c.color === selectedColor);
  const selectedColorStock = selectedColorObj ? selectedColorObj.stock : null;

  useEffect(() => {
    if (product?.id) {
      getModels(product.id);
    }
  }, [product?.id]);

  useEffect(() => {
    if (selectedModelId) {
      getColors(selectedModelId);
      setSelectedColor("");
    }
  }, [selectedModelId]);

  const handleWishlistToggle = () => {
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  const handleAddToCart = () => {
    if (!selectedModelId || !selectedColor) return;
    addToCart(product.id, {
      modelId: selectedModelId,
      color: selectedColor,
    });
  };

  return (
    <div className="product-action-buttons">
      <button
        className={`fav-btn ${isInWishlist(product.id) ? "active" : ""}`}
        onClick={handleWishlistToggle}
        title={isInWishlist(product.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
      >
        {isInWishlist(product.id) ? "❤️" : "🤍"}
      </button>
      <div className="variant-selectors">
        <select
          className="variant-dropdown"
          value={selectedModelId}
          onChange={e => setSelectedModelId(e.target.value)}
        >
          <option value="">Model seçiniz</option>
          {models.map(model => (
            <option key={model.id} value={model.id}>{model.model_name}</option>
          ))}
        </select>
        <select
          className="variant-dropdown"
          value={selectedColor}
          onChange={e => setSelectedColor(e.target.value)}
          disabled={!selectedModelId || loading}
        >
          <option value="">Renk seçiniz</option>
          {colors.map(color => (
            <option key={color.id} value={color.color} disabled={color.stock <= 0}>
              {color.color}
            </option>
          ))}
        </select>
      </div>
      {/* Seçili renk varyasyonunun stok miktarı */}
      {selectedColor && (
        <div className="variant-stock-info">
          {selectedColorStock > 0 ? (
            <span>Stok: {selectedColorStock}</span>
          ) : (
            <span style={{ color: '#dc2626' }}>Stokta Yok</span>
          )}
        </div>
      )}
      <button
        className="add-cart-btn"
        onClick={handleAddToCart}
        disabled={
          !selectedModelId || !selectedColor || !selectedColorStock || selectedColorStock <= 0
        }
      >
        {selectedColor && selectedColorStock <= 0
          ? "Stokta Yok"
          : "Sepete Ekle"}
      </button>
    </div>
  );
};

export default ProductActionButtons;
