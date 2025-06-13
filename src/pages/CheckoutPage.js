import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useOrders } from "../context/OrderContext";

// Yeni bileşenler
import CheckoutForm from "../components/checkout/CheckoutForm";
import CartSummary from "../components/checkout/CartSummary";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { addOrder } = useOrders();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Sepetiniz boş. Sipariş verilemez.");
      return;
    }

    const newOrder = {
      date: new Date().toISOString(),
      name: form.name,
      phone: form.phone,
      address: form.address,
      items: cartItems,
      total,
    };

    addOrder(newOrder);
    clearCart();

    alert("Siparişiniz başarıyla oluşturuldu!");
    navigate("/");
  };

  return (
    <div>
      <div className="checkout-container">
        <h2>Siparişi Tamamla</h2>

        <CheckoutForm form={form} onChange={handleChange} onSubmit={handleSubmit} />
        <CartSummary items={cartItems} total={total} />
      </div>
    </div>
  );
};

export default CheckoutPage;
