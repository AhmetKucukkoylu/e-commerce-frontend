// components/ProductList/ProductList.js
import React, { useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";
import "./ProductList.css";

import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductGrid from "./ProductGrid";

const ProductList = ({ selectedCategoryId: propCategoryId = null, selectedTagId: propTagId = null }) => {
  const { searchTerm } = useSearch();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { categories } = useCategories();
  const { products, loading, fetchProducts } = useProduct();

  const [selectedCategoryId, setSelectedCategoryId] = useState(propCategoryId);
  const [selectedTagId, setSelectedTagId] = useState(propTagId);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortOption, setSortOption] = useState("Varsayılan");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    fetchProducts(isAdmin);
  }, [fetchProducts, isAdmin]);

  useEffect(() => {
    if (propCategoryId !== null) {
      setSelectedCategoryId(propCategoryId);
    }
    if (propTagId !== null) {
      setSelectedTagId(propTagId);
    }
  }, [propCategoryId, propTagId]);

  const filtered = products
    .filter((p) => isAdmin || p.is_visible)
    .filter((p) => selectedCategoryId === null || p.category_id === Number(selectedCategoryId))
    .filter((p) => selectedTagId === null || (Array.isArray(p.tag_ids) && p.tag_ids.includes(Number(selectedTagId))))
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => p.price >= minPrice && p.price <= maxPrice)
    .filter((p) => !inStockOnly || p.stock > 0)
    .sort((a, b) => {
      if (sortOption === "Artan") return a.price - b.price;
      if (sortOption === "Azalan") return b.price - a.price;
      return 0;
    });

  const handleResetFilters = () => {
    if (!propCategoryId) setSelectedCategoryId(null);
    setMinPrice(0);
    setMaxPrice(10000);
    setSortOption("Varsayılan");
    setInStockOnly(false);
  };

  const handleEdit = (product) => console.log("Düzenle", product);
  const handleDelete = (id) => console.log("Sil", id);
  const handleToggleVisibility = (id) => console.log("Görünürlük değiştir", id);

  if (loading) return <p style={{ padding: "2rem" }}>Ürünler yükleniyor...</p>;

  return (
    <div className="product-list-layout">
      <ProductFilterSidebar
        categories={categories}
        selectedCategory={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        sortOption={sortOption}
        onSortChange={setSortOption}
        inStockOnly={inStockOnly}
        onInStockChange={setInStockOnly}
        onResetFilters={handleResetFilters}
      />
      <div className="product-list-grid-area">
        <ProductGrid
          products={filtered}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleVisibility={handleToggleVisibility}
        />
      </div>
    </div>
  );
};

export default ProductList;
