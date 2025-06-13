import React, { useState } from "react";
import "./Slider.css";

const slides = [
  {
    title: "%50'ye Varan İndirimler!",
    desc: "Seçili ürünlerde büyük fırsatlar seni bekliyor.",
    bg: "#ffb74d"
  },
  {
    title: "Yeni Sezon Ürünleri",
    desc: "En yeni teknolojik ürünler burada!",
    bg: "#90caf9"
  },
  {
    title: "Kargo Bedava!",
    desc: "Belirli tutar üzeri alışverişlerde ücretsiz kargo.",
    bg: "#a5d6a7"
  }
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="slider-container">
      <button className="slider-arrow left" onClick={prev}>&lt;</button>
      <div className="slider-content" style={{ background: slides[index].bg }}>
        <h3>{slides[index].title}</h3>
        <p>{slides[index].desc}</p>
      </div>
      <button className="slider-arrow right" onClick={next}>&gt;</button>
      <div className="slider-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider; 