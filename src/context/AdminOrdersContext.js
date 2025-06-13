import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axiosInstance";

// Context oluştur
const AdminOrdersContext = createContext();

// Provider bileşeni
export const AdminOrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Siparişleri API'den çek
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/orders/all");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Admin siparişleri alınamadı:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // İlk yüklemede veriyi getir
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <AdminOrdersContext.Provider value={{ orders, loading, refetch: fetchOrders }}>
      {children}
    </AdminOrdersContext.Provider>
  );
};

// Hook olarak kullanıma aç
export const useAdminOrders = () => useContext(AdminOrdersContext);
