// components/ProductCard/AdminCardControls.js
import React from "react";

const AdminCardControls = ({ product, onEdit, onDelete, onToggleVisibility }) => {
  return (
    <div className="admin-controls">
      <button className="admin-btn ghost" onClick={() => onEdit?.(product)}>✏ Düzenle</button>
      <button className="admin-btn" onClick={() => onToggleVisibility?.(product.id)}>
        {product.is_visible ? "👁 Gizle" : "👁 Göster"}
      </button>
      <button className="admin-btn danger" onClick={() => onDelete?.(product.id)}>
        🗑 Sil
      </button>
    </div>
  );
};

export default AdminCardControls;
