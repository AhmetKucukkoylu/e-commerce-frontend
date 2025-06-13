import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useUserProfile } from "../context/UserProfileContext";
import ProfileSidebar from "../components/ProfileSidebar";
import "../components/ProfilePageModern.css";

const ProfilePage = () => {
  const { user, updateUser, logout } = useAuth();
  const { updateProfile } = useUserProfile();
  const [selected, setSelected] = useState("account");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, address } = formData;
    const result = await updateProfile({ name, phone, address });
    if (result.success) {
      updateUser({ ...user, name, phone, address });
      setEditing(false);
      alert("Profil güncellendi");
    } else {
      alert(result.message || "Profil güncellenemedi");
    }
  };

  return (
    <div>
      <div className="profile-modern-container">
        <ProfileSidebar selected={selected} setSelected={setSelected} logout={logout} user={user} />
        <div className="profile-modern-content">
          {selected === "account" && (
            <div>
              <h2>Hesap Bilgilerim</h2>
              {editing ? (
                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="profile-form-row">
                    <div className="profile-form-group">
                      <label>Ad Soyad</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Email</label>
                      <input type="email" name="email" value={formData.email} readOnly tabIndex={-1} style={{ background: '#f5f7fa', color: '#888' }} />
                    </div>
                  </div>
                  <div className="profile-form-row">
                    <div className="profile-form-group">
                      <label>Telefon</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="profile-form-group">
                      <label>Adres</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="profile-form-actions">
                    <button type="submit" className="profile-btn-primary">Kaydet</button>
                    <button type="button" className="profile-btn-secondary" onClick={() => setEditing(false)}>Vazgeç</button>
                  </div>
                </form>
              ) : (
                <div className="profile-info-view">
                  <div><b>Ad Soyad:</b> {user?.name}</div>
                  <div><b>Email:</b> {user?.email}</div>
                  <div><b>Telefon:</b> {user?.phone || "-"}</div>
                  <div><b>Adres:</b> {user?.address || "-"}</div>
                  <button className="profile-btn-primary" onClick={() => setEditing(true)}>Profili Düzenle</button>
                </div>
              )}
            </div>
          )}
          {selected === "orders" && <div><h2>Siparişlerim</h2><p>Burada siparişleriniz listelenecek.</p></div>}
          {selected === "addresses" && <div><h2>Adreslerim</h2><p>Burada adresleriniz listelenecek.</p></div>}
          {selected === "draws" && <div><h2>Çekilişlerim</h2><p>Burada çekilişleriniz listelenecek.</p></div>}
          {selected === "reviews" && <div><h2>Yorumlarım</h2><p>Burada yorumlarınız listelenecek.</p></div>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
