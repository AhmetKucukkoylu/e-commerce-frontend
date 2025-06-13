import React from "react";
import { FiUsers, FiShoppingCart, FiDollarSign, FiBox } from "react-icons/fi";
import "./AdminDashboard.css";

const metricsList = [
  { key: "totalUsers", label: "Kullanıcı", icon: <FiUsers />, color: "#1976d2" },
  { key: "totalOrders", label: "Sipariş", icon: <FiShoppingCart />, color: "#43a047" },
  { key: "totalRevenue", label: "Gelir", icon: <FiDollarSign />, color: "#fbc02d" },
  { key: "totalProducts", label: "Ürün", icon: <FiBox />, color: "#7b1fa2" },
];

const AdminMetricsCards = ({ metrics, loading, error }) => (
  <div className="admin-metrics-cards">
    {loading ? (
      <div className="admin-metrics-loading">Yükleniyor...</div>
    ) : error ? (
      <div className="admin-metrics-error">{error}</div>
    ) : metrics ? (
      metricsList.map((m) => (
        <div className="admin-metric-card" key={m.key} style={{ borderTop: `4px solid ${m.color}` }}>
          <div className="admin-metric-icon" style={{ color: m.color }}>{m.icon}</div>
          <div className="admin-metric-label">{m.label}</div>
          <div className="admin-metric-value">{metrics[m.key]?.toLocaleString?.() ?? '-'}</div>
        </div>
      ))
    ) : null}
  </div>
);

export default AdminMetricsCards; 