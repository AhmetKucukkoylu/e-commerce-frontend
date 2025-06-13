// src/components/cart/CouponBox.jsx
import React, { useState } from "react";

const CouponBox = ({ onApply, value, onChange }) => {
  const [couponCode, setCouponCode] = useState(value || "");
  const [message, setMessage] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    if (!couponCode.trim()) {
      setMessage("Lütfen bir kupon kodu giriniz.");
      return;
    }

    setIsApplying(true);
    setMessage("");
    
    try {
      const result = await onApply(couponCode);
      if (result.success) {
        setMessage("✅ Kupon başarıyla uygulandı!");
        setCouponCode("");
        if (onChange) onChange("");
      } else {
        setMessage("❌ " + result.message);
      }
    } catch (error) {
      setMessage("❌ Kupon uygulanırken bir hata oluştu.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCouponCode(value);
    if (onChange) onChange(value);
    if (message) setMessage(""); // Mesajı temizle
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <div className="coupon-section">
      <h4 className="coupon-title">Kupon Kodu</h4>
      
      <div className="coupon-input-group">
        <input
          type="text"
          className="coupon-input"
          placeholder="Kupon kodunuzu giriniz"
          value={value !== undefined ? value : couponCode}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isApplying}
        />
        <button 
          className="coupon-apply-btn"
          onClick={handleApply}
          disabled={isApplying || !couponCode.trim()}
        >
          {isApplying ? (
            <>
              <span className="spinner"></span>
              Uygulanıyor...
            </>
          ) : (
            "Uygula"
          )}
        </button>
      </div>

      {message && (
        <div className={`coupon-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="coupon-info">
        <p>💡 Kupon kodlarınız ile %10'a varan indirimler kazanın!</p>
      </div>
    </div>
  );
};

export default CouponBox;
