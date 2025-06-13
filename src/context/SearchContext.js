import { createContext, useContext, useState } from "react";
import axios from "../services/axiosInstance";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: null,
    min_price: null,
    max_price: null,
    in_stock: false,
  });

  // Arama fonksiyonu
  const searchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const res = await axios.get("/products/search", {
        params: {
          q: params.q ?? searchTerm,
          category: params.category ?? filters.category,
          min_price: params.min_price ?? filters.min_price,
          max_price: params.max_price ?? filters.max_price,
          in_stock: params.in_stock ?? filters.in_stock,
        },
      });
      setResults(res.data || []);
    } catch (err) {
      console.error("Arama başarısız:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        results,
        setResults,
        loading,
        filters,
        setFilters,
        searchProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
