// components/Header/Header.js
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import { FiShoppingCart, FiHeart, FiPackage, FiUser, FiSearch, FiSettings, FiLogOut, FiBarChart2, FiBox, FiGift, FiLayers } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems, itemCount } = useCart();
  const { wishlist } = useWishlist();
  const { searchProducts, products } = useProduct();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchRef = useRef();
  const profileRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Arama işlevi
  const handleSearch = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
    
    if (value.trim().length > 1) {
      await searchProducts({ q: value });
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // Dışarı tıklanınca dropdownları kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Admin için özel header
  if (user?.role === "admin") {
    return (
      <header className="header">
        <div className="header-left">
          <Link to="/admin" className="header-logo">Dijital Kare</Link>
          <nav className="nav-links">
            <Link to="/admin" className="nav-link">
              <FiBox className="icon" />
              <span>Ürünler</span>
            </Link>
            <Link to="/admin/orders" className="nav-link">
              <FiPackage className="icon" />
              <span>Siparişler</span>
            </Link>
            <Link to="/admin/campaigns" className="nav-link">
              <FiGift className="icon" />
              <span>Kampanyalar</span>
            </Link>
            <Link to="/admin/categories" className="nav-link">
              <FiLayers className="icon" />
              <span>Kategoriler</span>
            </Link>
            <Link to="/admin/dashboard" className="nav-link">
              <FiBarChart2 className="icon" />
              <span>İstatistikler</span>
            </Link>
          </nav>
        </div>

        <div className="header-center">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FiSearch />
            </button>
          </form>
        </div>

        <div className="header-right">
          <div className="profile-dropdown" ref={dropdownRef}>
            <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
              <FiUser className="icon" />
              <span>{user.name || "Admin"}</span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/admin/dashboard" className="dropdown-item">
                  <FiBarChart2 className="dropdown-icon" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/admin/profile" className="dropdown-item">
                  <FiSettings className="dropdown-icon" />
                  <span>Ayarlar</span>
                </Link>
                <button onClick={logout} className="dropdown-item logout-btn">
                  <FiLogOut className="dropdown-icon" />
                  <span>Çıkış</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Normal kullanıcı header'ı
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">Dijital Kare</Link>
      </div>

      <div className="header-center" ref={searchRef}>
        <div className="search-container">
          <input
            type="text"
            placeholder="150+'den fazla üründe ara"
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="search-button">ARA</button>

          {showDropdown && products.length > 0 && (
            <div className="search-dropdown">
              {products.slice(0, 6).map(product => (
                <div
                  key={product.id}
                  className="search-item"
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setSearch("");
                    setShowDropdown(false);
                  }}
                >
                  <img src={product.image || product.image_url} alt={product.name} />
                  <div className="search-item-info">
                    <h4>{product.name}</h4>
                    <p>{product.description?.slice(0, 60)}</p>
                  </div>
                  <span className="search-item-price">{product.price?.toLocaleString()} ₺</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <Link to="/cart" className="nav-link cart-link">
              <div className="cart-wrapper">
                <FiShoppingCart className="icon" />
                <span className="badge">{itemCount}</span>
              </div>
              <span>Sepetim</span>
            </Link>
            
            <Link to="/wishlist" className="nav-link">
              <FiHeart className="icon" style={{ color: wishlist.length > 0 ? "#e53935" : "inherit" }} />
              <span>Favoriler</span>
            </Link>
            
            <Link to="/orders" className="nav-link">
              <FiPackage className="icon" />
              <span>Siparişler</span>
            </Link>

            <div className="profile-menu" ref={profileRef}>
              <button 
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <FiUser className="icon" />
                <span>Profil</span>
              </button>

              {showProfileMenu && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                    Profili Düzenle
                  </Link>
                  <Link to="/change-password" onClick={() => setShowProfileMenu(false)}>
                    Şifre Değiştir
                  </Link>
                  <Link to="/profile/my-reviews" onClick={() => setShowProfileMenu(false)}>
                    Yorumlarım
                  </Link>
                  <button onClick={logout} className="logout-btn">
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/cart" className="nav-link cart-link">
              <div className="cart-wrapper">
                <FiShoppingCart className="icon" />
                <span className="badge">{itemCount}</span>
              </div>
              <span>Sepetim</span>
            </Link>
            <Link to="/login" className="nav-link">Giriş</Link>
            <Link to="/register" className="nav-link register-btn">Kayıt Ol</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
