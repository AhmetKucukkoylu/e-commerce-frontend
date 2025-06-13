import React from "react";

// Yeni context hook'ları
import { useAdminUI } from "../context/AdminUIContext";

// Bileşenler
import ProductForm from "../components/admin_temp/ProductForm";
import AdminProductHeader from "../components/admin_temp/AdminProductHeader";
import AdminProductFilters from "../components/admin_temp/AdminProductFilters";
import AdminProductGrid from "../components/admin_temp/AdminProductGrid";

const AdminPage = () => {
  const { editingProduct, showForm, setShowForm } = useAdminUI();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Ürün Yönetimi</h2>
      <AdminProductHeader onAddClick={() => setShowForm(true)} />
      <AdminProductFilters />

      {showForm && <ProductForm onClose={() => setShowForm(false)} />}

      {/* Not: editingProduct desteği ileride düzenleme için entegre edilecek */}

      <AdminProductGrid />
    </div>
  );
};

export default AdminPage;
