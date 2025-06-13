// components/ProductList/FilterPanel.js
import React from "react";

const FilterPanel = ({
  minPrice,
  maxPrice,
  sortOption,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onResetFilters
}) => (
  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
    <input
      type="number"
      value={minPrice}
      onChange={(e) => onMinPriceChange(Number(e.target.value))}
      placeholder="Min Fiyat"
    />
    <input
      type="number"
      value={maxPrice}
      onChange={(e) => onMaxPriceChange(Number(e.target.value))}
      placeholder="Max Fiyat"
    />
    <select value={sortOption} onChange={(e) => onSortChange(e.target.value)}>
      <option>Varsayılan</option>
      <option>Artan</option>
      <option>Azalan</option>
    </select>
    <button onClick={onResetFilters}>Filtreleri Temizle</button>
  </div>
);

export default FilterPanel;
