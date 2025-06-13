import React from "react";
import { FiBarChart2, FiBox, FiClipboard, FiGift, FiLayers } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "./AdminDashboard.css";

const menu = [
  { key: "dashboard", label: "Dashboard", icon: <FiBarChart2 />, path: "/admin/dashboard" },
  { key: "products", label: "Ürünler", icon: <FiBox />, path: "/admin" },
  { key: "orders", label: "Siparişler", icon: <FiClipboard />, path: "/admin/orders" },
  { key: "campaigns", label: "Kampanyalar", icon: <FiGift />, path: "/admin/campaigns" },
  { key: "categories", label: "Kategoriler", icon: <FiLayers />, path: "/admin/categories" },
];

const AdminSidebar = () => {
  const location = useLocation();
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-title">Yönetim</div>
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.key} className={location.pathname === item.path ? "active" : ""}>
              <Link to={item.path}>
                <span className="admin-sidebar-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar; 