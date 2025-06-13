import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axiosInstance";

const TagContext = createContext();

export const useTags = () => useContext(TagContext);

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    try {
      const res = await axios.get("/tags");
      setTags(res.data || []);
    } catch (err) {
      console.error("Etiketler alınamadı:", err);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <TagContext.Provider value={{ tags, getTags }}>
      {children}
    </TagContext.Provider>
  );
}; 