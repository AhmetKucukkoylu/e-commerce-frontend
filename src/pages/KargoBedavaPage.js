import React from "react";

const KargoBedavaPage = () => (
  <div style={{ maxWidth: 600, margin: "2rem auto", padding: 32, background: "#f7fff7", borderRadius: 16, boxShadow: "0 2px 16px #0001" }}>
    <h1>Kargo Bedava!</h1>
    <p>Belirli bir tutarın üzerindeki alışverişlerinizde kargo ücretsizdir. Kampanya detayları ve koşulları için müşteri hizmetlerimizle iletişime geçebilirsiniz.</p>
    <ul>
      <li>250 TL ve üzeri alışverişlerde geçerlidir.</li>
      <li>Kampanya sadece yurt içi gönderilerde geçerlidir.</li>
      <li>İade edilen ürünlerde kargo bedeli düşülebilir.</li>
    </ul>
  </div>
);

export default KargoBedavaPage; 