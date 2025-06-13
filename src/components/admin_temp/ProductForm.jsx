import React, { useState, useEffect } from "react";
import { useAdminProducts } from "../../context/AdminProductContext";
import { useAdminUI } from "../../context/AdminUIContext";
import ProductFormFields from "./ProductFormFields";
import { FiSave, FiXCircle } from "react-icons/fi";
import "./ProductFormModern.css";

const ProductForm = ({ onClose }) => {
  const { addProduct, updateProduct } = useAdminProducts();
  const {
    showForm,
    setShowForm,
    editingProduct,
    setEditingProduct,
  } = useAdminUI();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image_url: "",
    category_id: "",
  });

  // editingProduct varsa formu onunla doldur
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        image_url: editingProduct.image_url || "",
        category_id: editingProduct.category_id || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
        category_id: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingProduct) {
      await updateProduct(editingProduct.id, formData);
    } else {
      await addProduct(formData);
    }

    setShowForm(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form-modern">
      <h3 className="product-form-title">{editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h3>
      <ProductFormFields product={formData} onChange={handleChange} />
      <div className="product-form-actions">
        <button type="submit" className="product-btn">
          <FiSave style={{ marginRight: 8, fontSize: 20 }} /> {editingProduct ? "Güncelle" : "Kaydet"}
        </button>
        <button type="button" className="product-btn danger" onClick={handleCancel}>
          <FiXCircle style={{ marginRight: 8, fontSize: 20 }} /> İptal
        </button>
      </div>
    </form>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  padding: "1rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
  marginTop: "1rem",
  maxWidth: "400px",
};

export default ProductForm;
