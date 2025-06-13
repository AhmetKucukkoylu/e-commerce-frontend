import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SpecialSlider = ({ sliders }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % sliders.length);
  const prev = () => setCurrent((prev) => (prev - 1 + sliders.length) % sliders.length);

  const handleClick = () => {
    navigate(sliders[current].link);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
      <div
        style={{
          background: sliders[current].bgColor,
          borderRadius: 24,
          padding: "3rem 2rem",
          minWidth: 400,
          cursor: "pointer",
          boxShadow: "0 2px 16px #0001"
        }}
        onClick={handleClick}
      >
        <h1 style={{ textAlign: "center", margin: 0 }}>{sliders[current].title}</h1>
        <p style={{ textAlign: "center", margin: 0 }}>{sliders[current].description}</p>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={prev} style={{ marginRight: 8 }}>&lt;</button>
        <button onClick={next}>&gt;</button>
      </div>
      <div style={{ marginTop: 8 }}>
        {sliders.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: idx === current ? "#2196f3" : "#ccc",
              margin: "0 3px"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialSlider; 