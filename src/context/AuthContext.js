// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // LocalStorage'dan yükle
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Giriş
  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      
      // Guest session'ı temizle
      axios.clearSessionId();
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.response?.data?.error || "Giriş başarısız");
      return { success: false, error: err.response?.data?.error || "Giriş başarısız" };
    } finally {
      setLoading(false);
    }
  };

  // Kayıt
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("/auth/register", userData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      
      // Guest session'ı temizle
      axios.clearSessionId();
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.response?.data?.error || "Kayıt başarısız");
      return { success: false, error: err.response?.data?.error || "Kayıt başarısız" };
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const googleLogin = async (googleToken) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("/auth/google-login", { token: googleToken });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      
      // Guest session'ı temizle
      axios.clearSessionId();
      
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.response?.data?.error || "Google ile giriş başarısız");
      return { success: false, error: err.response?.data?.error || "Google ile giriş başarısız" };
    } finally {
      setLoading(false);
    }
  };

  // Şifremi Unuttum
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("/auth/forgot-password", { email });
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Şifre sıfırlama başarısız");
      return { success: false, error: err.response?.data?.error || "Şifre sıfırlama başarısız" };
    } finally {
      setLoading(false);
    }
  };

  // Şifre Sıfırla
  const resetPassword = async (resetData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("/auth/reset-password", resetData);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Şifre sıfırlama başarısız");
      return { success: false, error: err.response?.data?.error || "Şifre sıfırlama başarısız" };
    } finally {
      setLoading(false);
    }
  };

  // Çıkış
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Session ID'yi temizleme - yeni guest session başlayacak
  };

  // Kullanıcı güncelle (ör: profil güncelleme)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user, token, loading, error,
        login, register, googleLogin,
        forgotPassword, resetPassword,
        logout, updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);