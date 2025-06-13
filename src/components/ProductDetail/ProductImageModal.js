import React from "react";
import { useProductDetail } from "../../context/ProductDetailContext";

const ProductImageModal = () => {
  const { product, setImageModalOpen } = useProductDetail();

  if (!product) return null;

  return (
    <div
      onClick={() => setImageModalOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <img
        src={product.image_url}
        alt={product.name}
        style={{
          maxHeight: "90%",
          maxWidth: "90%",
          borderRadius: "8px",
          boxShadow: "0 0 20px rgba(255,255,255,0.2)",
        }}
      />
    </div>
  );
};

export default ProductImageModal;
