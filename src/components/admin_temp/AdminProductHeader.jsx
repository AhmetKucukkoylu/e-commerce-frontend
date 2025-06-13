import React from "react";

const AdminProductHeader = ({ onAddClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
      }}
    >
      
      <button
        onClick={onAddClick}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        + Yeni Ürün
      </button>
    </div>
  );
};

export default AdminProductHeader;
