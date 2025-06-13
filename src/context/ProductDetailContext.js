import { createContext, useContext, useState, useCallback } from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./AuthContext";

const ProductDetailContext = createContext();

export const ProductDetailProvider = ({ children }) => {
  const { user, token } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  const fetchProduct = useCallback(async (productId) => {
    setLoading(true);
    setProduct(null);
    setHasPurchased(false);
    setError(null);
    try {
      // Ürün bilgisi
      const endpoint = user?.role === "admin"
        ? `/products/admin/${productId}`
        : `/products/${productId}`;
      const res = await axios.get(endpoint);
      setProduct(res.data);

      // Satın alım kontrolü
      if (user && token) {
        const purchaseCheck = await axios.get(`/products/${productId}/has-purchased`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Backend response: { purchased: true/false }
        setHasPurchased(!!purchaseCheck.data.purchased);
      }
    } catch (err) {
      setError("Ürün veya satın alma bilgisi alınamadı");
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  return (
    <ProductDetailContext.Provider
      value={{
        product,
        loading,
        error,
        isImageModalOpen,
        setImageModalOpen,
        fetchProduct,
        hasPurchased,
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};

export const useProductDetail = () => useContext(ProductDetailContext);
