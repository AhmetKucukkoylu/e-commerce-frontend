import React from "react";
import "./AdminDashboard.css";

const AdminRevenueChart = ({ data, loading }) => {
  if (loading) return <div className="admin-metrics-loading">Yükleniyor...</div>;
  if (!data || !Array.isArray(data.months)) return null;

  // Basit bar chart için max değeri bul
  const max = Math.max(...data.months.map((m) => m.revenue), 1);

  return (
    <div className="admin-revenue-chart-card">
      <div className="admin-revenue-chart-title">Aylık Gelir</div>
      <div className="admin-revenue-chart-bars">
        {data.months.map((m) => (
          <div key={m.month} className="admin-revenue-bar-group">
            <div
              className="admin-revenue-bar"
              style={{ height: `${(m.revenue / max) * 120}px`, background: "#1976d2" }}
              title={`${m.month}: ${m.revenue.toLocaleString()} ₺`}
            ></div>
            <div className="admin-revenue-bar-label">{m.month}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRevenueChart; 