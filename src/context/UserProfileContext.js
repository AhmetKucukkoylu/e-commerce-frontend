import { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./AuthContext";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Profil bilgisini backend'den çek
  const fetchProfile = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Profil alınamadı:", err);
    } finally {
      setLoading(false);
    }
  };

  // Profil bilgisini güncelle (isim, email, telefon, adres vs.)
  const updateProfile = async (data) => {
    if (!token) return { success: false, message: "Giriş yapmalısınız" };
    try {
      const res = await axios.put("/users/profile", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.user);
      return { success: true };
    } catch (err) {
      console.error("Profil güncellenemedi:", err);
      return { success: false, message: err.response?.data?.error || "Hata oluştu" };
    }
  };

  // Sadece adresi güncelle
  const updateAddress = async (address) => {
    if (!token) return { success: false, message: "Giriş yapmalısınız" };
    try {
      const res = await axios.put(
        "/users/profile",
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data.user);
      return { success: true };
    } catch (err) {
      console.error("Adres güncellenemedi:", err);
      return { success: false, message: err.response?.data?.error || "Hata oluştu" };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return (
    <UserProfileContext.Provider value={{ profile, loading, fetchProfile, updateProfile, updateAddress }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext); 