import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SLIDE_INTERVAL = 4000;

const COLORS = [
  "#FFD166", // canlı sarı
  "#06D6A0", // canlı yeşil
  "#118AB2", // canlı mavi
  "#EF476F", // canlı pembe/kırmızı
  "#8338EC", // canlı mor
  "#FF8C42", // turuncu
  "#43AA8B", // yeşil
  "#3A86FF", // mavi
];

const arrowBtnStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 48,
  height: 48,
  borderRadius: "50%",
  background: "#fff",
  boxShadow: "0 2px 8px #0002",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  color: "#2196f3",
  cursor: "pointer",
  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
  zIndex: 2
};

const arrowBtnHover = {
  background: "#2196f3",
  color: "#fff",
  boxShadow: "0 4px 16px #2196f355"
};

const CampaignSlider = ({ campaigns }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(null); // "left" | "right" | null
  const intervalRef = useRef();

  useEffect(() => {
    // Otomatik kaydırma
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % campaigns.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [campaigns.length]);

  // Ok ile kaydırınca timer sıfırlansın
  const manualSlide = (dir) => {
    clearInterval(intervalRef.current);
    setCurrent((prev) => {
      if (dir === "left") return (prev - 1 + campaigns.length) % campaigns.length;
      return (prev + 1) % campaigns.length;
    });
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % campaigns.length);
    }, SLIDE_INTERVAL);
  };

  if (!campaigns || campaigns.length === 0) return null;

  const currentCampaign = campaigns[current];
  if (!currentCampaign) return null;
  const bgColor = currentCampaign.color || COLORS[current % COLORS.length];

  const handleClick = () => {
    if (currentCampaign.type === "category") {
      navigate(`/campaigns/category/${currentCampaign.categoryId}`);
    } else if (currentCampaign.type === "tag") {
      navigate(`/campaigns/tag/${currentCampaign.tagId}`);
    }
  };

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", margin: "3rem auto 2.5rem auto", minHeight: 320 }}>
      {/* Sol ok */}
      <button
        style={{
          ...arrowBtnStyle,
          left: "calc(50% - 350px)",
          ...(hovered === "left" ? arrowBtnHover : {})
        }}
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => manualSlide("left")}
        aria-label="Önceki kampanya"
      >
        &#60;
      </button>
      {/* Slider içeriği */}
      <div
        style={{
          background: bgColor,
          borderRadius: 32,
          boxShadow: "0 4px 32px #0001",
          padding: "3.5rem 2.5rem 2.5rem 2.5rem",
          minWidth: 480,
          maxWidth: 700,
          minHeight: 220,
          width: 700,
          textAlign: "center",
          cursor: "pointer",
          transition: "box-shadow 0.2s, background 0.2s"
        }}
        onClick={handleClick}
      >
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 18 }}>{currentCampaign.title}</h2>
        <div style={{ color: "#222", fontSize: 20, fontWeight: 400 }}>{currentCampaign.description}</div>
      </div>
      {/* Sağ ok */}
      <button
        style={{
          ...arrowBtnStyle,
          right: "calc(50% - 350px)",
          ...(hovered === "right" ? arrowBtnHover : {})
        }}
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => manualSlide("right")}
        aria-label="Sonraki kampanya"
      >
        &#62;
      </button>
      {/* Noktalar */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, display: "flex", justifyContent: "center", gap: 7 }}>
        {campaigns.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: idx === current ? "#2196f3" : "#ccc",
              margin: "0 2px",
              border: idx === current ? "2px solid #2196f3" : "2px solid #eee",
              transition: "background 0.2s, border 0.2s"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignSlider; 