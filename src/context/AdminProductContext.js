import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "../services/axiosInstance";

const AdminProductContext = createContext();

export const useAdminProducts = () => useContext(AdminProductContext);

export const AdminProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Admin ürünleri getir
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/products/admin/all");
      setProducts(res.data);
    } catch (err) {
      setError("Ürünler alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  // Ürün ekle
  const addProduct = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/products", data);
      setProducts((prev) => [...prev, res.data.product || res.data]);
    } catch (err) {
      setError("Ürün eklenemedi");
    } finally {
      setLoading(false);
    }
  };

  // Ürün güncelle
  const updateProduct = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`/products/${id}`, data);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? res.data.product || res.data : p))
      );
    } catch (err) {
      setError("Ürün güncellenemedi");
    } finally {
      setLoading(false);
    }
  };

  // Ürün sil
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Ürün silinemedi");
    } finally {
      setLoading(false);
    }
  };

  // Ürün görünürlüğünü değiştir
  const toggleVisibility = async (id, is_visible) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`/products/admin/${id}/visibility`, { is_visible });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? res.data.product || res.data : p))
      );
    } catch (err) {
      setError("Görünürlük değiştirilemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <AdminProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleVisibility,
      }}
    >
      {children}
    </AdminProductContext.Provider>
  );
};
