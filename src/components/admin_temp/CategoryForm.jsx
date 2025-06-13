import React, { useState } from "react";
import { useCategories } from "../../context/CategoryContext";
import { FiPlusCircle } from "react-icons/fi";
import "./CategoryManagerModern.css";

const CategoryForm = () => {
  const { addCategory } = useCategories();
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addCategory({ name: newName.trim() });
    setNewName("");
  };

  return (
    <form onSubmit={handleSubmit} className="category-form-modern">
      <input
        type="text"
        placeholder="Yeni kategori adı"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="category-input"
      />
      <button type="submit" className="category-btn">
        <FiPlusCircle style={{ marginRight: 8, fontSize: 20 }} /> Ekle
      </button>
    </form>
  );
};

export default CategoryForm;
