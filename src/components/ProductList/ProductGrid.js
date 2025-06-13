// components/ProductList/ProductGrid.js
import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({ products, isAdmin, onEdit, onDelete, onToggleVisibility }) => {
  if (products.length === 0) {
    return <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>Ürün bulunamadı.</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={isAdmin ? onEdit : undefined}
          onDelete={isAdmin ? onDelete : undefined}
          onToggleVisibility={isAdmin ? onToggleVisibility : undefined}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
