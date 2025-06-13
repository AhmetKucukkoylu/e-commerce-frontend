// src/components/cart/CampaignSummary.jsx
import React from "react";

const CampaignSummary = ({ campaigns }) => {
  if (!campaigns) return null;

  const hasActiveCampaigns = 
    (campaigns.auto && campaigns.auto.length > 0) || 
    campaigns.code;

  if (!hasActiveCampaigns) return null;

  return (
    <div className="campaign-summary">
      <h4 className="campaign-title">🎉 Aktif Kampanyalar</h4>
      
      <div className="campaign-list">
        {campaigns.auto?.length > 0 && (
          <>
            {campaigns.auto.map((camp, index) => (
              <div key={index} className="campaign-item auto-campaign">
                <div className="campaign-info">
                  <span className="campaign-badge">OTOMATIK</span>
                  <span className="campaign-name">{camp.title}</span>
                </div>
                <span className="campaign-discount">-{camp.amount.toLocaleString()} ₺</span>
              </div>
            ))}
          </>
        )}

        {campaigns.code && (
          <div className="campaign-item coupon-campaign">
            <div className="campaign-info">
              <span className="campaign-badge coupon">KUPON</span>
              <span className="campaign-name">{campaigns.code.code}</span>
            </div>
            <span className="campaign-discount">-{campaigns.code.amount.toLocaleString()} ₺</span>
          </div>
        )}
      </div>

      <div className="campaign-note">
        <p>✨ Tebrikler! Kampanyalarınız otomatik olarak sepetinize uygulandı.</p>
      </div>
    </div>
  );
};

export default CampaignSummary;
