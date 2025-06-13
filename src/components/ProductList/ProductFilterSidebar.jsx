import React from "react";
import "./ProductFilterSidebar.css";

const ProductFilterSidebar = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sortOption,
  onSortChange,
  onResetFilters
}) => (
  <aside className="product-filter-sidebar">
    <div className="filter-title">Filtreler</div>
    <div className="filter-group">
      <label>Kategori</label>
      <select value={selectedCategory || ""} onChange={e => onCategoryChange(e.target.value)}>
        <option value="">Tümü</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
    <div className="filter-group">
      <label>Fiyat Aralığı</label>
      <div className="filter-price-row">
        <input type="number" className="filter-price-input" value={minPrice} onChange={e => onMinPriceChange(Number(e.target.value))} placeholder="Min" />
        <span>-</span>
        <input type="number" className="filter-price-input" value={maxPrice} onChange={e => onMaxPriceChange(Number(e.target.value))} placeholder="Max" />
      </div>
    </div>
    <div className="filter-group">
      <label>Sırala</label>
      <select value={sortOption} onChange={e => onSortChange(e.target.value)}>
        <option value="Varsayılan">Varsayılan</option>
        <option value="Artan">Fiyat (Artan)</option>
        <option value="Azalan">Fiyat (Azalan)</option>
      </select>
    </div>
    <button className="filter-reset-btn" onClick={onResetFilters}>Filtreleri Temizle</button>
  </aside>
);

export default ProductFilterSidebar; 