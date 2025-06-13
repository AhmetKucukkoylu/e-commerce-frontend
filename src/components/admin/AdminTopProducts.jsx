import React from "react";
import "./AdminDashboard.css";

const AdminTopProducts = ({ topSellers, topWished, loading }) => (
  <div className="admin-top-products-grid">
    <div className="admin-top-products-card">
      <div className="admin-top-products-title" style={{ color: "#1976d2" }}>En Çok Satanlar</div>
      {loading ? (
        <div className="admin-metrics-loading">Yükleniyor...</div>
      ) : (
        <ul className="admin-top-products-list">
          {topSellers?.map((p, i) => (
            <li key={p.id || i}>
              <span className="admin-top-product-rank">{i + 1}.</span>
              <span className="admin-top-product-name">{p.name}</span>
              <span className="admin-top-product-value">{p.totalSold?.toLocaleString?.() ?? "-"} satış</span>
            </li>
          ))}
        </ul>
      )}
    </div>
    <div className="admin-top-products-card">
      <div className="admin-top-products-title" style={{ color: "#1976d2" }}>En Çok İstenenler</div>
      {loading ? (
        <div className="admin-metrics-loading">Yükleniyor...</div>
      ) : (
        <ul className="admin-top-products-list">
          {topWished?.map((p, i) => (
            <li key={p.id || i}>
              <span className="admin-top-product-rank">{i + 1}.</span>
              <span className="admin-top-product-name">{p.name}</span>
              <span className="admin-top-product-value">{p.totalWished?.toLocaleString?.() ?? "-"} istek</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default AdminTopProducts; 