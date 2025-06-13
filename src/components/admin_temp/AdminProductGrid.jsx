import React from "react";
import { useAdminProducts } from "../../context/AdminProductContext";
import { useAdminUI } from "../../context/AdminUIContext";
import { useAdminFilters } from "../../context/AdminFilterContext";
import ProductCard from "../ProductCard/ProductCard";

const AdminProductGrid = () => {
  const { products, loading, toggleVisibility } = useAdminProducts();
  const { setEditingProduct, setShowForm } = useAdminUI();
  const { categoryFilter, priceRange, sortOption } = useAdminFilters();

  if (loading) return <p>Yükleniyor...</p>;

  const filteredProducts = products
    .filter((p) => !categoryFilter || p.category_id === categoryFilter)
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortOption) {
        case "FiyatArtan":
          return a.price - b.price;
        case "FiyatAzalan":
          return b.price - a.price;
        case "StokAz":
          return a.stock - b.stock;
        case "StokÇok":
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

  return (
    <div style={gridStyle}>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={(p) => {
            setEditingProduct(p);
            setShowForm(true);
          }}
          onToggleVisibility={toggleVisibility}
        />
      ))}
    </div>
  );
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "1rem",
  marginTop: "2rem",
};

export default AdminProductGrid;
