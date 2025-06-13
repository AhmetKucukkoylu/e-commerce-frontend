import React from "react";
import { useAdminFilters } from "../../context/AdminFilterContext";
import "./AdminProductFiltersModern.css";

const AdminProductFilters = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    priceRange,
    setPriceRange,
    sortOption,
    setSortOption,
  } = useAdminFilters();

  return (
    <div className="admin-product-filters-modern">
      <label className="filter-label">Kategori ID:</label>
      <input
        type="number"
        value={categoryFilter || ""}
        onChange={(e) => setCategoryFilter(Number(e.target.value) || null)}
        placeholder="Tümü"
        className="filter-input"
      />
      <label className="filter-label">Fiyat Aralığı:</label>
      <input
        type="number"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
        className="filter-input"
      />
      <span className="filter-sep">-</span>
      <input
        type="number"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        className="filter-input"
      />
      <label className="filter-label">Sırala:</label>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="filter-input"
      >
        <option value="Varsayılan">Varsayılan</option>
        <option value="FiyatArtan">Fiyat (Artan)</option>
        <option value="FiyatAzalan">Fiyat (Azalan)</option>
        <option value="StokAz">Stok (Azalan)</option>
        <option value="StokÇok">Stok (Artan)</option>
      </select>
    </div>
  );
};

const filterStyle = {
  display: "flex",
  gap: "2rem",
  marginTop: "1rem",
  alignItems: "center",
  flexWrap: "wrap",
};

export default AdminProductFilters;
