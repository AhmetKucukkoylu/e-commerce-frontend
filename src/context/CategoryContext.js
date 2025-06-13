import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./AuthContext";

const CategoryContext = createContext();

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Kategoriler alınamadı:", err);
    }
  };

  const addCategory = async (newCategory) => {
    try {
      const res = await axios.post("/categories", newCategory, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setCategories((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Kategori eklenemedi:", err);
    }
  };

  const updateCategory = async (id, updatedData) => {
    try {
      const res = await axios.put(`/categories/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? res.data : cat))
      );
    } catch (err) {
      console.error("Kategori güncellenemedi:", err);
    }
  };
  const deleteCategory = async (id) => {
  try {
    await axios.delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  } catch (err) {
    console.error("Kategori silinemedi:", err);
    throw new Error(err?.response?.data?.error || "Kategori silinemedi.");
  }
};

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        getCategories,
        deleteCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
