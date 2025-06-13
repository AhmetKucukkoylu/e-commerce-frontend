import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";
import ProductList from "../components/ProductList/ProductList";
import CampaignDetailCard from "../components/CampaignDetailCard";

const CampaignsByCategory = () => {
  const { categoryId } = useParams();
  const { fetchCampaignsByCategory } = useCampaigns();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCampaignsByCategory(categoryId);
      setCampaigns(data);
    };
    fetchData();
  }, [categoryId, fetchCampaignsByCategory]);

  return (
    <div>
      <h1>Kategoriye Ait Kampanyalar</h1>
      {selectedCampaign && <CampaignDetailCard campaign={selectedCampaign} />}
      {campaigns.length === 0 ? (
        <p>Bu kategoriye ait kampanya bulunamadı.</p>
      ) : (
        <ul>
          {campaigns.map((c) => (
            <li key={c.id} style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontWeight: 600,
                  cursor: "pointer",
                  color: selectedCampaign?.id === c.id ? "#2196f3" : "#222",
                  textDecoration: selectedCampaign?.id === c.id ? "underline" : "none"
                }}
                onClick={() => setSelectedCampaign(c)}
              >
                {c.title}
              </span>
              <span style={{ color: "#444", marginLeft: 8 }}>- {c.description}</span>
            </li>
          ))}
        </ul>
      )}
      <hr />
      <h2>Bu Kategorideki Ürünler</h2>
      <ProductList selectedCategoryId={categoryId} />
    </div>
  );
};

export default CampaignsByCategory; 