import React from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Modal = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={() => navigate("/")}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
