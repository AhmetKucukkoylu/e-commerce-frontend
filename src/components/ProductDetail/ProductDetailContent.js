import React from "react";
import { useProductDetail } from "../../context/ProductDetailContext";
import ProductImageModal from "./ProductImageModal";
import ProductInfoCard from "./ProductInfoCard";
import ProductActionButtons from "./ProductActionButtons";
import ProductReviews from "../ProductReviews/ProductReviews";
import SimilarProductsSection from "./SimilarProductsSection";
import "./ProductDetailContent.css";

const ProductDetailContent = () => {
  const {
    product,
    loading,
    isImageModalOpen,
    setImageModalOpen,
    hasPurchased,
  } = useProductDetail();

  if (loading) {
    return <div className="product-detail-loading">Yükleniyor...</div>;
  }

  if (!product) {
    return <div className="product-detail-loading">Ürün bulunamadı.</div>;
  }

  return (
    <div className="product-detail-main">
      <div className="product-detail-card">
        <div className="product-detail-image-area">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-detail-image"
            onClick={() => setImageModalOpen(true)}
          />
        </div>
        <div className="product-detail-info-area">
          <ProductInfoCard product={product} hasPurchased={hasPurchased} />
          <ProductActionButtons product={product} />
        </div>
      </div>
      {isImageModalOpen && <ProductImageModal />}
      <SimilarProductsSection product={product} />
      <div className="product-detail-reviews-area">
        <ProductReviews
          productId={product.id}
          averageRating={product.averageRating || 0}
        />
      </div>
    </div>
  );
};

export default ProductDetailContent;
