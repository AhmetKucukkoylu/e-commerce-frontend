// context/ProductContext.js
import { createContext, useContext, useState, useCallback } from "react";
import axios from "../services/axiosInstance";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tüm ürünleri getir (public veya admin)
  const fetchProducts = useCallback(async (isAdmin = false) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdmin ? "/products/admin/all" : "/products";
      const res = await axios.get(endpoint);
      setProducts(res.data);
    } catch (err) {
      setError("Ürünler alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  // Ürün detayı getir (public veya admin)
  const fetchProductById = useCallback(async (id, isAdmin = false) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = isAdmin ? `/products/admin/${id}` : `/products/${id}`;
      const res = await axios.get(endpoint);
      setProduct(res.data);
    } catch (err) {
      setError("Ürün detayı alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  // Ürün arama/filtreleme (public)
  const searchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/products/search", { params });
      setProducts(res.data);
    } catch (err) {
      setError("Arama başarısız");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        loading,
        error,
        fetchProducts,
        fetchProductById,
        searchProducts,
        setProducts, // opsiyonel: manuel güncelleme için
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
