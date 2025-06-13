import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get("/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Siparişler alınamadı:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    if (!token) return { success: false, message: "Giriş yapmalısınız" };
    try {
      const res = await axios.post("/orders", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await getOrders();
      return { success: true, order: res.data };
    } catch (err) {
      console.error("Sipariş oluşturulamadı:", err);
      return { success: false, message: err.response?.data?.error || "Hata oluştu" };
    }
  };

  const cancelOrder = async (orderId) => {
    if (!token) return;
    try {
      await axios.patch(`/orders/${orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await getOrders();
    } catch (err) {
      console.error("Sipariş iptal edilemedi:", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, [token]);

  return (
    <OrderContext.Provider value={{ orders, loading, getOrders, placeOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
