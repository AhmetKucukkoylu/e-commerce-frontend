import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../components/cart/CartPage.css";
import Footer from "../components/Footer/Footer";

// Yeni bileşenler
import CartItemList from "../components/cart/CartItemList";
import CartTotal from "../components/cart/CartTotal";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    applyCampaign,
    createOrder,
    campaigns,
    total,
    finalTotal,
    loading: cartLoading,
    isEmpty,
    isGuest
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const handlePlaceOrder = async () => {
    if (isGuest) {
      // Guest kullanıcı için giriş sayfasına yönlendir
      if (window.confirm("Sipariş vermek için giriş yapmanız gerekiyor. Giriş sayfasına yönlendirilmek ister misiniz?")) {
        navigate("/login");
      }
      return;
    }

    setLoading(true);
    const result = await createOrder({
      // Sipariş bilgileri buraya eklenebilir
      delivery_address: user?.address || "",
      notes: ""
    });
    setLoading(false);

    if (result.success) {
      alert(result.message);
      navigate("/orders");
    } else {
      alert("Sipariş oluşturulamadı: " + result.message);
    }
  };

  const handleApplyCoupon = async (code) => {
    if (isGuest) {
      if (window.confirm("Kupon kodlarını kullanmak için giriş yapmanız gerekiyor. Giriş sayfasına yönlendirilmek ister misiniz?")) {
        navigate("/login");
      }
      return { success: false, message: "Giriş yapmanız gerekiyor." };
    }

    const result = await applyCampaign(code);
    return result;
  };

  const handleClearCart = async () => {
    if (window.confirm("Sepeti temizlemek istediğinizden emin misiniz?")) {
      const result = await clearCart();
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    const result = await removeFromCart(cartItemId);
    if (!result.success) {
      alert(result.message);
    }
  };

  const handleIncreaseQuantity = async (cartItemId) => {
    const result = await increaseQuantity(cartItemId);
    if (!result.success) {
      alert(result.message);
    }
  };

  const handleDecreaseQuantity = async (cartItemId) => {
    const result = await decreaseQuantity(cartItemId);
    if (!result.success) {
      alert(result.message);
    }
  };

  if (cartLoading) {
    return (
      <div className="cart-container">
        <div className="loading">
          <span className="spinner"></span>
          Sepet yükleniyor...
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Sepetiniz Boş</h2>
          <p>Sepetinizde henüz ürün bulunmamaktadır.</p>
          <button 
            onClick={() => navigate("/")} 
            className="continue-shopping-btn"
          >
            Alışverişe Devam Et
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div className="cart-container">
        <div className="cart-columns">
          {/* Sol Sütun: Ürün Listesi */}
          <div className="cart-left">
            <h2 className="cart-title">
              Sepetim ({cartItems.length} ürün)
              {isGuest && <span className="guest-info"> - Misafir</span>}
            </h2>
            <CartItemList
              items={cartItems}
              onDecrease={handleDecreaseQuantity}
              onIncrease={handleIncreaseQuantity}
              onRemove={handleRemoveItem}
            />
          </div>
          
          {/* Sağ Sütun: Sipariş Özeti */}
          <div className="cart-right">
            <div className="cart-summary-card">
              <h3 className="summary-title">Sipariş Özeti</h3>
              
              <CartTotal
                cartItems={cartItems}
                total={total}
                finalTotal={finalTotal}
                loading={loading}
                onClear={handleClearCart}
                onPlaceOrder={handlePlaceOrder}
                isGuest={isGuest}
                campaigns={campaigns}
                onApplyCoupon={handleApplyCoupon}
                couponCode={couponCode}
                onCouponChange={setCouponCode}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
