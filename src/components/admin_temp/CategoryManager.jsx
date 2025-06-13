import React from "react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import "./CategoryManagerModern.css";

const CategoryManager = () => {
  return (
    <div className="category-manager-modern">
      <h2 className="category-manager-title">Kategori Yönetimi</h2>
      <CategoryForm />
      <CategoryList />
    </div>
  );
};

export default CategoryManager;
