// src/components/checkout/CheckoutForm.jsx
import React from "react";

const CheckoutForm = ({ form, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "2rem" }}>
      <div>
        <label>Ad Soyad:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Adres:</label>
        <textarea
          name="address"
          value={form.address}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Telefon:</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: "1rem" }}>
        Siparişi Tamamla
      </button>
    </form>
  );
};

export default CheckoutForm;
