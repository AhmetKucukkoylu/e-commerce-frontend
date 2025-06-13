import React from "react";
import CampaignForm from "../components/admin_temp/CampaignForm";
import CampaignList from "../components/admin_temp/CampaignList";
import AdminSidebar from "../components/admin/AdminSidebar";
import Footer from "../components/Footer/Footer";

const AdminCampaigns = () => {
  return (
    <>
      <div className="admin-dashboard-container">
        <AdminSidebar />
        <main className="admin-dashboard-main">
          <h2 style={{marginBottom: '2rem'}}>Kampanya Yönetimi</h2>
          <CampaignForm />
          <CampaignList />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminCampaigns;
