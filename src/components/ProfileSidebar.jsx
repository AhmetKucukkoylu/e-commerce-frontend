import React from "react";
import { FiUser, FiBox, FiMapPin, FiGift, FiMessageCircle, FiLogOut, FiTag, FiLayers, FiBarChart2 } from "react-icons/fi";
import "./ProfilePageModern.css";

const userMenu = [
  { key: "account", label: "Hesap Bilgilerim", icon: <FiUser /> },
  { key: "orders", label: "Siparişlerim", icon: <FiBox /> },
  { key: "addresses", label: "Adreslerim", icon: <FiMapPin /> },
  { key: "draws", label: "Çekilişlerim", icon: <FiGift /> },
  { key: "reviews", label: "Yorumlarım", icon: <FiMessageCircle /> },
];

const adminMenu = [
  { key: "account", label: "Hesap Bilgileri", icon: <FiUser /> },
  { key: "campaigns", label: "Kampanyalar", icon: <FiTag /> },
  { key: "categories", label: "Kategoriler", icon: <FiLayers /> },
  { key: "stats", label: "İstatistikler", icon: <FiBarChart2 /> },
];

const ProfileSidebar = ({ selected, setSelected, logout, user }) => {
  const isAdmin = user?.role === "admin";
  const menu = isAdmin ? adminMenu : userMenu;

  return (
    <aside className="profile-sidebar">
      <nav>
        <ul>
          {menu.map((item) => (
            <li
              key={item.key}
              className={selected === item.key ? "active" : ""}
              onClick={() => setSelected(item.key)}
            >
              <span className="profile-sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </li>
          ))}
          <li className="logout" onClick={logout}>
            <span className="profile-sidebar-icon"><FiLogOut /></span>
            <span>Çıkış</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar; 