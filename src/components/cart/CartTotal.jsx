// src/components/cart/CartTotal.jsx
import React from "react";
import CouponBox from "./CouponBox";
import CampaignSummary from "./CampaignSummary";

const CartTotal = ({
  cartItems,
  total,
  finalTotal,
  loading,
  onClear,
  onPlaceOrder,
  isGuest = false,
  campaigns,
  onApplyCoupon,
  couponCode,
  onCouponChange
}) => {
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.crud?.price || 0) * item.quantity,
    0
  );

  const totalDiscount = subtotal - finalTotal;

  return (
    <div className="cart-total-section">
      <div className="summary-rows">
        <div className="summary-row">
          <span>Ara Toplam:</span>
          <span className="amount">{subtotal.toLocaleString()} ₺</span>
        </div>
        
        {totalDiscount > 0 && (
          <div className="summary-row discount">
            <span>İndirim:</span>
            <span className="amount discount-amount">-{totalDiscount.toLocaleString()} ₺</span>
          </div>
        )}
        
        <div className="summary-row total">
          <span>Toplam:</span>
          <span className="amount">{(finalTotal || total).toLocaleString()} ₺</span>
        </div>
      </div>

      {/* Kampanya ve Kupon Bölümü */}
      <div className="cart-discounts">
        {/* Aktif Kampanyalar */}
        <CampaignSummary campaigns={campaigns} />

        {/* Kupon Kodu */}
        <CouponBox 
          onApply={onApplyCoupon}
          value={couponCode}
          onChange={onCouponChange}
        />
      </div>

      <div className="cart-actions">
        <button 
          className="cart-action-btn primary"
          onClick={onPlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Sipariş oluşturuluyor...
            </>
          ) : isGuest ? (
            "Giriş Yaparak Sipariş Ver"
          ) : (
            "Siparişi Tamamla"
          )}
        </button>

        <button 
          className="cart-action-btn danger" 
          onClick={onClear}
          disabled={loading}
        >
          Sepeti Temizle
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
