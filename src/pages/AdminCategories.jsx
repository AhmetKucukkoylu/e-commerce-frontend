import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import CategoryManager from "../components/admin_temp/CategoryManager";
import Footer from "../components/Footer/Footer";

const AdminCategories = () => {
  return (
    <>
      <div className="admin-dashboard-container">
        <AdminSidebar />
        <main className="admin-dashboard-main">
          <CategoryManager />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminCategories; 