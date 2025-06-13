import React, { createContext, useContext, useState } from "react";

const AdminUIContext = createContext();

export const useAdminUI = () => useContext(AdminUIContext);

export const AdminUIProvider = ({ children }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <AdminUIContext.Provider
      value={{
        editingProduct,
        setEditingProduct,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </AdminUIContext.Provider>
  );
};
