// src/components/checkout/CartSummary.jsx
import React from "react";

const CartSummary = ({ items, total }) => {
  return (
    <div>
      <h3>Sepet Özeti:</h3>
      {items.map((item) => (
        <p key={item.id}>
          {item.title || item.product?.name} x {item.quantity} = {(item.price * item.quantity).toFixed(2)} ₺
        </p>
      ))}
      <p><strong>Toplam:</strong> {total.toFixed(2)} ₺</p>
    </div>
  );
};

export default CartSummary;
