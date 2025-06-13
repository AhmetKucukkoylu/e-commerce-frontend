import React from "react";
import { useCategories } from "../../context/CategoryContext";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "./CategoryManagerModern.css";

const CategoryList = () => {
  const { categories, deleteCategory, updateCategory } = useCategories();

  const handleNameChange = (id, newName) => {
    if (!newName.trim()) return;
    updateCategory(id, { name: newName.trim() });
  };

  return (
    <ul className="category-list-modern">
      {categories.map((cat) => (
        <li key={cat.id} className="category-card-modern">
          <span className="category-name">{cat.name}</span>
          <div className="category-actions">
            <button
              className="category-btn ghost"
              title="Düzenle"
              onClick={() => {
                const yeni = prompt("Yeni ad:", cat.name);
                if (yeni !== null) handleNameChange(cat.id, yeni);
              }}
            >
              <FiEdit2 />
            </button>
            <button
              className="category-btn danger"
              title="Sil"
              onClick={() => deleteCategory(cat.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
