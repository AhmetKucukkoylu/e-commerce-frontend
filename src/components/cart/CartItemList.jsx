// src/components/cart/CartItemList.jsx
import React from "react";

const CartItemList = ({ items, onDecrease, onIncrease, onRemove }) => {
  if (!items.length) {
    return (
      <div className="empty-cart-message">
        <p>Sepetinizde henüz ürün bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="cart-items-container">
      {items.map((item) => (
        <div key={item.id} className="cart-item-card">
          <img 
            src={item.crud.image_url || "/placeholder-image.png"} 
            alt={item.crud.name}
            className="cart-item-img"
            onError={(e) => {
              e.target.src = "/placeholder-image.png";
            }}
          />
          
          <div className="cart-item-info">
            <h4 className="cart-item-name">{item.crud.name}</h4>
            <p className="cart-item-price">{item.crud.price.toLocaleString()} ₺</p>
            <p className="cart-item-description">
              {item.crud.description?.slice(0, 80)}...
            </p>
          </div>

          <div className="cart-item-qty">
            <button 
              className="qty-btn" 
              onClick={() => onDecrease(item.id)} 
              aria-label="Azalt"
              disabled={item.quantity <= 1}
            >
              –
            </button>
            <span className="qty-display">{item.quantity}</span>
            <button 
              className="qty-btn" 
              onClick={() => onIncrease(item.id)} 
              aria-label="Arttır"
            >
              +
            </button>
          </div>

          <div className="cart-item-total">
            {(item.crud.price * item.quantity).toLocaleString()} ₺
          </div>

          <button 
            className="cart-item-remove" 
            onClick={() => onRemove(item.id)} 
            aria-label="Ürünü sepetten kaldır"
            title="Sepetten Kaldır"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
