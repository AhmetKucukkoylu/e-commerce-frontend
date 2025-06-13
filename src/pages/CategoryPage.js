import React from "react";
import { useParams } from "react-router-dom";
import { useCategories } from "../context/CategoryContext";
import ProductList from "../components/ProductList/ProductList";
import Header from "../components/Header/Header";

const CategoryPage = () => {
  const { id } = useParams();
  const categoryId = Number(id);
  const { categories } = useCategories();

  const currentCategory = categories.find((cat) => cat.id === categoryId);

  return (
    <div>
      <div className="category-container">
        <main style={{ padding: "1rem" }}>
          <h2>
            {currentCategory ? currentCategory.name : "Kategori"} Ürünleri
          </h2>
          <ProductList selectedCategoryId={categoryId} />
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
