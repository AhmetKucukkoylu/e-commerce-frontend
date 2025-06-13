import React from "react";

const labelStyle = {
  fontWeight: 600,
  color: "#2196f3",
  minWidth: 110,
  display: "inline-block"
};

const valueStyle = {
  color: "#222",
  fontWeight: 500
};

const rowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  margin: "8px 0"
};

const badgeStyle = {
  display: "inline-block",
  background: "#e3f2fd",
  color: "#1976d2",
  borderRadius: 8,
  padding: "2px 10px",
  fontWeight: 600,
  fontSize: 15,
  marginLeft: 6
};

const CampaignDetailCard = ({ campaign }) => {
  if (!campaign) return null;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 4px 32px #2196f322",
        padding: "2.5rem 2rem 2rem 2rem",
        maxWidth: 520,
        margin: "2rem auto 2.5rem auto",
        textAlign: "center",
        position: "relative",
        border: "1.5px solid #e3f2fd"
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 10, color: "#1976d2" }}>
        {campaign.title}
      </h1>
      <div style={{
        color: "#444",
        fontSize: 18,
        marginBottom: 18,
        background: "#f7fafd",
        borderRadius: 12,
        padding: "12px 10px"
      }}>
        {campaign.description}
      </div>
      <div style={{ margin: "0 auto", maxWidth: 340 }}>
        <div style={rowStyle}>
          <span style={labelStyle}>İndirim:</span>
          <span style={badgeStyle}>
            {campaign.discount_type === "percentage"
              ? `%${campaign.discount_value}`
              : `${campaign.discount_value}₺`}
          </span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Başlangıç:</span>
          <span style={valueStyle}>{new Date(campaign.start_date).toLocaleDateString()}</span>
        </div>
        <div style={rowStyle}>
          <span style={labelStyle}>Bitiş:</span>
          <span style={valueStyle}>{new Date(campaign.end_date).toLocaleDateString()}</span>
        </div>
        {campaign.min_order_amount > 0 && (
          <div style={rowStyle}>
            <span style={labelStyle}>Min. Sepet:</span>
            <span style={badgeStyle}>{campaign.min_order_amount}₺</span>
          </div>
        )}
        {campaign.code && (
          <div style={rowStyle}>
            <span style={labelStyle}>Kod:</span>
            <span style={badgeStyle}>{campaign.code}</span>
            <button
              style={{
                marginLeft: 8,
                background: "#2196f3",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "2px 10px",
                cursor: "pointer",
                fontWeight: 600
              }}
              onClick={() => navigator.clipboard.writeText(campaign.code)}
            >
              Kopyala
            </button>
          </div>
        )}
        <div style={rowStyle}>
          <span style={labelStyle}>Durum:</span>
          <span style={{
            ...badgeStyle,
            background: campaign.is_active ? "#c8e6c9" : "#ffcdd2",
            color: campaign.is_active ? "#388e3c" : "#c62828"
          }}>
            {campaign.is_active ? "Aktif" : "Pasif"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailCard; 