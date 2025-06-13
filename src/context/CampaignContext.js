import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./AuthContext";

const CampaignContext = createContext();

export const useCampaigns = () => useContext(CampaignContext);

export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const { user } = useAuth();

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("/campaigns");
      setCampaigns(res.data || []);
    } catch (err) {
      console.error("Kampanyalar alınamadı:", err);
    }
  };

  const createCampaign = async (newCampaign) => {
    try {
      const res = await axios.post("/campaigns", newCampaign, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setCampaigns((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Kampanya oluşturulamadı:", err);
    }
  };

  const updateCampaign = async (id, updatedData) => {
    try {
      const res = await axios.put(`/campaigns/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );
    } catch (err) {
      console.error("Kampanya güncellenemedi:", err);
    }
  };

  const deleteCampaign = async (id) => {
    try {
      await axios.delete(`/campaigns/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Kampanya silinemedi:", err);
    }
  };

  // Kategoriye göre kampanyaları çek
  const fetchCampaignsByCategory = async (categoryId) => {
    try {
      const res = await axios.get(`/campaigns?categoryId=${categoryId}`);
      return res.data || [];
    } catch (err) {
      console.error("Kategoriye göre kampanyalar alınamadı:", err);
      return [];
    }
  };

  // Etikete göre kampanyaları çek
  const fetchCampaignsByTag = async (tagId) => {
    try {
      const res = await axios.get(`/campaigns?tagId=${tagId}`);
      return res.data || [];
    } catch (err) {
      console.error("Etikete göre kampanyalar alınamadı:", err);
      return [];
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        fetchCampaigns,
        fetchCampaignsByCategory,
        fetchCampaignsByTag,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
