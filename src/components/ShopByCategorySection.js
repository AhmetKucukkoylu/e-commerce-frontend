import React from "react";
import "./ShopByCategorySection.css";

const ShopByCategorySection = ({ categories = [], onCategoryClick }) => {
  // Eğer categories bir dizi değilse veya boşsa bileşen gösterilmesin
  if (!Array.isArray(categories)) return null;

  return (
    <section className="shop-by-category-section">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-cards">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => onCategoryClick?.(cat.id)}
          >
            <div className="category-card-img">
              {/* Kategori resmi varsa göster, yoksa placeholder harf */}
              {cat.image ? (
                <img src={cat.image} alt={cat.name} />
              ) : (
                <div className="category-placeholder">
                  {cat.name?.[0] || "?"}
                </div>
              )}
            </div>
            <div className="category-card-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategorySection;
