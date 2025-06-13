import React from "react";
import { useProduct } from "../context/ProductContext";
import "./BestSellersSection.css";

const BestSellersSection = () => {
  const { products } = useProduct();
  // En çok satanları seçmek için örnek: rating veya salesCount'a göre sıralama
  const bestSellers = [...products]
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 6);

  return (
    <section className="best-sellers-section">
      <h2 className="section-title">Best Sellers</h2>
      <div className="best-sellers-grid">
        {bestSellers.map((product) => (
          <div key={product.id} className="best-seller-card">
            <div className="best-seller-img">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="best-seller-info">
              <div className="best-seller-name">{product.name}</div>
              <div className="best-seller-price">{product.price} ₺</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellersSection; 