import React, { useEffect } from "react";
import { AdminStatsProvider, useAdminStats } from "../context/AdminStatsContext";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminMetricsCards from "../components/admin/AdminMetricsCards";
import AdminRevenueChart from "../components/admin/AdminRevenueChart";
import AdminTopProducts from "../components/admin/AdminTopProducts";
import "../components/admin/AdminDashboard.css";
import Footer from "../components/Footer/Footer";

const DashboardContent = () => {
  const {
    fetchMetrics, fetchRevenue, fetchMonthlyRevenue, fetchTopSellers, fetchTopWished,
    metrics, revenue, monthlyRevenue, topSellers, topWished, loading, error
  } = useAdminStats();

  useEffect(() => {
    fetchMetrics();
    fetchRevenue();
    fetchMonthlyRevenue();
    fetchTopSellers();
    fetchTopWished();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="admin-dashboard-main">
      <AdminMetricsCards metrics={metrics} loading={loading} error={error} />
      <AdminRevenueChart data={monthlyRevenue} loading={loading} />
      <AdminTopProducts topSellers={topSellers} topWished={topWished} loading={loading} />
    </div>
  );
};

const AdminDashboardPage = () => (
  <AdminStatsProvider>
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <DashboardContent />
    </div>
    <Footer />
  </AdminStatsProvider>
);

export default AdminDashboardPage; 