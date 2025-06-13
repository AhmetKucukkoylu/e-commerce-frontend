import React, { createContext, useContext, useState } from "react";
import axios from "../services/axiosInstance";

const AdminFilterContext = createContext();

export const useAdminFilters = () => useContext(AdminFilterContext);

export const AdminFilterProvider = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOption, setSortOption] = useState("Varsayılan");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Admin ürün arama fonksiyonu
  const searchAdminProducts = async (params = {}) => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/products/search", {
        params: {
          q: params.q ?? searchTerm,
          category: params.category ?? categoryFilter,
          min_price: params.min_price ?? priceRange[0],
          max_price: params.max_price ?? priceRange[1],
          in_stock: params.in_stock,
        },
      });
      setResults(res.data || []);
    } catch (err) {
      console.error("Admin arama başarısız:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminFilterContext.Provider
      value={{
        categoryFilter,
        setCategoryFilter,
        priceRange,
        setPriceRange,
        sortOption,
        setSortOption,
        searchTerm,
        setSearchTerm,
        results,
        setResults,
        loading,
        searchAdminProducts,
      }}
    >
      {children}
    </AdminFilterContext.Provider>
  );
};
