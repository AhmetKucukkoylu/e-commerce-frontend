import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [appliedCouponCampaign, setAppliedCouponCampaign] = useState(null);
  const [appliedAutoCampaign, setAppliedAutoCampaign] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [autoDiscount, setAutoDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sepeti temizle
  const clearCartState = () => {
    setCartItems([]);
    setTotal(0);
    setDiscount(0);
    setFinalTotal(0);
    setAppliedCouponCampaign(null);
    setAppliedAutoCampaign(null);
    setCouponDiscount(0);
    setAutoDiscount(0);
  };

  // Sepeti sunucudan getir - hem kayıtlı hem kayıtlı olmayan kullanıcılar için
  const getCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/cart");

      setCartItems(res.data.items || []);
      setTotal(res.data.total || 0);
      setDiscount(res.data.totalDiscount || 0);
      setFinalTotal(res.data.finalTotal || 0);
      setAppliedCouponCampaign(res.data.appliedCouponCampaign || null);
      setAppliedAutoCampaign(res.data.appliedAutoCampaign || null);
      setCouponDiscount(res.data.couponDiscount || 0);
      setAutoDiscount(res.data.autoDiscount || 0);
    } catch (err) {
      console.error("Sepet alınamadı:", err);
      clearCartState();
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post("/cart", { product_id: productId, quantity: 1 });
      await getCart();
      return { success: true, message: "Ürün sepete eklendi" };
    } catch (err) {
      console.error("Ürün sepete eklenemedi:", err);
      const errorMessage = err.response?.data?.error || "Ürün sepete eklenirken bir hata oluştu.";
      return { success: false, message: errorMessage };
    }
  };

  const increaseQuantity = async (cartItemId) => {
    try {
      const item = cartItems.find((item) => item.id === cartItemId);
      if (!item) return { success: false, message: "Ürün bulunamadı" };

      await axios.put(`/cart/${cartItemId}`, { quantity: item.quantity + 1 });
      await getCart();
      return { success: true };
    } catch (err) {
      console.error("Adet artırılamadı:", err);
      return { success: false, message: err.response?.data?.error || "Adet artırılamadı" };
    }
  };

  const decreaseQuantity = async (cartItemId) => {
    try {
      const item = cartItems.find((item) => item.id === cartItemId);
      if (!item) return { success: false, message: "Ürün bulunamadı" };

      if (item.quantity === 1) {
        return await removeFromCart(cartItemId);
      } else {
        await axios.put(`/cart/${cartItemId}`, { quantity: item.quantity - 1 });
        await getCart();
        return { success: true };
      }
    } catch (err) {
      console.error("Adet azaltılamadı:", err);
      return { success: false, message: err.response?.data?.error || "Adet azaltılamadı" };
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`/cart/${cartItemId}`);
      await getCart();
      return { success: true, message: "Ürün sepetten kaldırıldı" };
    } catch (err) {
      console.error("Ürün sepetten silinemedi:", err);
      return { success: false, message: err.response?.data?.error || "Ürün sepetten silinemedi" };
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("/cart");
      await getCart();
      return { success: true, message: "Sepet temizlendi" };
    } catch (err) {
      console.error("Sepet temizlenemedi:", err);
      return { success: false, message: err.response?.data?.error || "Sepet temizlenemedi" };
    }
  };

  // Kupon/kampanya uygula - sadece kayıtlı kullanıcılar için
  const applyCampaign = async (code) => {
    if (!token) {
      return { 
        success: false, 
        message: "Kampanya uygulamak için giriş yapmalısınız" 
      };
    }
    
    try {
      await axios.post("/cart/apply-coupon", { couponCode: code });
      await getCart();
      return { success: true, message: "Kampanya başarıyla uygulandı" };
    } catch (err) {
      console.error("Kampanya uygulanamadı:", err);
      return {
        success: false,
        message: err.response?.data?.error || "Kampanya kodu geçerli değil",
      };
    }
  };

  // Sipariş oluştur
  const createOrder = async (orderData) => {
    if (!token) {
      return { 
        success: false, 
        message: "Sipariş vermek için giriş yapmalısınız" 
      };
    }

    try {
      const response = await axios.post("/orders", {
        ...orderData,
        items: cartItems.map(item => ({
          product_id: item.crud.id,
          quantity: item.quantity,
          unit_price: item.crud.price
        })),
        total_amount: finalTotal
      });
      
      // Sipariş başarılı olursa sepeti temizle
      await clearCart();
      
      return { 
        success: true, 
        message: "Sipariş başarıyla oluşturuldu",
        orderId: response.data.id 
      };
    } catch (err) {
      console.error("Sipariş oluşturulamadı:", err);
      return {
        success: false,
        message: err.response?.data?.error || "Sipariş oluşturulurken bir hata oluştu",
      };
    }
  };

  // CampaignSummary için uygun veri
  const campaigns = {
    auto: appliedAutoCampaign
      ? [{ title: appliedAutoCampaign.title, amount: autoDiscount }]
      : [],
    code: appliedCouponCampaign
      ? { code: appliedCouponCampaign.code, amount: couponDiscount }
      : null,
  };

  // Kullanıcı durumu değiştiğinde sepeti getir
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCart();
    }, 100); // Kısa delay ile session/token'ın hazır olmasını bekle

    return () => clearTimeout(timeoutId);
  }, [token]); // token değiştiğinde sepeti yeniden getir

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        discount,
        finalTotal,
        couponDiscount,
        autoDiscount,
        appliedCouponCampaign,
        appliedAutoCampaign,
        campaigns,
        loading,
        getCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        applyCampaign,
        createOrder,
        // Computed values
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        isEmpty: cartItems.length === 0,
        hasDiscount: discount > 0,
        isGuest: !token
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
