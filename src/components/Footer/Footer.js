import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>&copy; {new Date().getFullYear()} Dijital Kare</span>
      <span className="footer-sep">|</span>
      <span>Tüm hakları saklıdır.</span>
    </div>
  </footer>
);

export default Footer; 