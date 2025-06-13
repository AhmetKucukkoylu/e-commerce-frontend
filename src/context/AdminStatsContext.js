import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "../services/axiosInstance";

const AdminStatsContext = createContext();

export const AdminStatsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(null);
  const [topSellers, setTopSellers] = useState([]);
  const [topWished, setTopWished] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Genel metrikler
  const fetchMetrics = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await axios.get("/api/admin/metrics");
      setMetrics(data);
    } catch (err) {
      setError(err.response?.data?.error || "Metrikler alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  // Toplam gelir ve istatistikler
  const fetchRevenue = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await axios.get("/api/admin/revenue");
      setRevenue(data);
    } catch (err) {
      setError(err.response?.data?.error || "Gelir alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  // Aylık gelir
  const fetchMonthlyRevenue = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await axios.get("/api/admin/revenue/monthly");
      setMonthlyRevenue(data);
    } catch (err) {
      setError(err.response?.data?.error || "Aylık gelir alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  // En çok satan ürünler
  const fetchTopSellers = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await axios.get("/api/admin/products/top-sellers");
      setTopSellers(data);
    } catch (err) {
      setError(err.response?.data?.error || "En çok satanlar alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  // En çok istenen ürünler
  const fetchTopWished = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await axios.get("/api/admin/products/top-wished");
      setTopWished(data);
    } catch (err) {
      setError(err.response?.data?.error || "En çok istenenler alınamadı");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AdminStatsContext.Provider
      value={{
        metrics, revenue, monthlyRevenue, topSellers, topWished,
        loading, error,
        fetchMetrics, fetchRevenue, fetchMonthlyRevenue, fetchTopSellers, fetchTopWished
      }}
    >
      {children}
    </AdminStatsContext.Provider>
  );
};

export const useAdminStats = () => useContext(AdminStatsContext); 