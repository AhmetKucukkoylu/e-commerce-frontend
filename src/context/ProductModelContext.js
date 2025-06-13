import React, { createContext, useContext, useState } from "react";
import axios from "../services/axiosInstance";

const ProductModelContext = createContext();

export const ProductModelProvider = ({ children }) => {
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ürünün modellerini getir
  const getModels = async (productId) => {
    setLoading(true);
    const res = await axios.get(`/products/${productId}/models`);
    setModels(res.data.data);
    setLoading(false);
    return res.data.data;
  };

  // Ürüne model ekle
  const createModel = async (productId, model_name) => {
    const res = await axios.post(`/products/${productId}/models`, { model_name });
    setModels((prev) => [...prev, res.data.data]);
    return res.data.data;
  };

  // Modelin renklerini getir
  const getColors = async (modelId) => {
    setLoading(true);
    const res = await axios.get(`/models/${modelId}/colors`);
    setColors(res.data.data);
    setLoading(false);
    return res.data.data;
  };

  // Modele renk ekle
  const createColor = async (modelId, color, stock, price_adjustment) => {
    const res = await axios.post(`/models/${modelId}/colors`, { color, stock, price_adjustment });
    setColors((prev) => [...prev, res.data.data]);
    return res.data.data;
  };

  return (
    <ProductModelContext.Provider
      value={{
        models,
        colors,
        loading,
        getModels,
        createModel,
        getColors,
        createColor,
      }}
    >
      {children}
    </ProductModelContext.Provider>
  );
};

export const useProductModels = () => useContext(ProductModelContext); 