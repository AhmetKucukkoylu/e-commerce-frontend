import axios from './axiosInstance';

// Ürünün modellerini getir
export const fetchProductModels = (productId) =>
  axios.get(`/products/${productId}/models`).then(res => res.data.data);

// Ürüne model ekle
export const addProductModel = (productId, model_name) =>
  axios.post(`/products/${productId}/models`, { model_name }).then(res => res.data.data);

// Modelin renklerini getir
export const fetchModelColors = (modelId) =>
  axios.get(`/models/${modelId}/colors`).then(res => res.data.data);

// Modele renk ekle
export const addModelColor = (modelId, color, stock, price_adjustment) =>
  axios.post(`/models/${modelId}/colors`, { color, stock, price_adjustment }).then(res => res.data.data); 