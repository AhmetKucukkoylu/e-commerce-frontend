import React from "react";
import { useCategories } from "../context/CategoryContext";
import { useTags } from "../context/TagContext";
import { useCampaigns } from "../context/CampaignContext";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import Footer from "../components/Footer/Footer";
import ShopByCategorySection from "../components/ShopByCategorySection";
import BestSellersSection from "../components/BestSellersSection";
import CampaignSlider from "../components/CampaignSlider";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { categories } = useCategories();
  const { tags } = useTags();
  const { fetchCampaignsByCategory, fetchCampaignsByTag } = useCampaigns();
  const [allCampaigns, setAllCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      let campaignsArr = [];
      // Kategori kampanyaları
      for (const cat of categories) {
        const catCampaigns = await fetchCampaignsByCategory(cat.id);
        catCampaigns.forEach((c) => {
          campaignsArr.push({
            ...c,
            type: "category",
            categoryId: cat.id,
            title: c.title,
            description: c.description
          });
        });
      }
      // Etiket kampanyaları
      for (const tag of tags) {
        const tagCampaigns = await fetchCampaignsByTag(tag.id);
        tagCampaigns.forEach((c) => {
          campaignsArr.push({
            ...c,
            type: "tag",
            tagId: tag.id,
            title: c.title,
            description: c.description
          });
        });
      }
      setAllCampaigns(campaignsArr);
    };
    fetchAll();
    // eslint-disable-next-line
  }, [categories, tags]);

  return (
    <div>
      <main className="homepage-main">
        <CampaignSlider campaigns={allCampaigns} />
        <ShopByCategorySection categories={categories} onCategoryClick={id => navigate(`/category/${id}`)} />
        <BestSellersSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
