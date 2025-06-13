import React from "react";
import { useCampaigns } from "../../context/CampaignContext";
import { useCategories } from "../../context/CategoryContext";
import { FiTrash2, FiTag } from "react-icons/fi";
import "../admin/AdminDashboard.css";
import "./CampaignsModern.css";

const CampaignList = () => {
  const { campaigns, deleteCampaign } = useCampaigns();
  const { categories } = useCategories();

  const getCategoryName = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "Kategori Yok";
  };

  if (campaigns.length === 0) {
    return <p>Hiç kampanya bulunamadı.</p>;
  }

  return (
    <div className="campaigns-grid-modern">
      {campaigns.map((camp) => (
        <div key={camp.id} className="campaign-card-modern">
          <div className="campaign-card-header">
            <FiTag className="campaign-card-icon" />
            <h4 className="campaign-card-title">{camp.name}</h4>
          </div>
          <div className="campaign-card-info">
            <span><strong>İndirim:</strong> %{camp.discount_percent}</span>
            <span><strong>Min. Tutar:</strong> {camp.min_order_price || 0} ₺</span>
            <span><strong>Kategori:</strong> {getCategoryName(camp.category_id)}</span>
          </div>
          <button className="campaign-btn danger" onClick={() => deleteCampaign(camp.id)}>
            <FiTrash2 style={{ marginRight: 6, fontSize: 18 }} /> Sil
          </button>
        </div>
      ))}
    </div>
  );
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "1rem",
};

const cardStyle = {
  border: "1px solid #ccc",
  padding: "1rem",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

export default CampaignList;
