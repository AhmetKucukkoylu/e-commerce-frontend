import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "../services/axiosInstance";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Geçersiz bağlantı");
      return;
    }

    try {
        await axios.post("/auth/reset-password", {
        token,
        newPassword,
      });

      alert("Şifreniz başarıyla güncellendi");
      navigate("/login");
    } catch (err) {
      console.error("Şifre sıfırlama hatası:", err);
      alert(err.response?.data?.error || "Bir hata oluştu");
    }
  };

  return (
    <Modal>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Yeni Şifre Oluştur</h2>

        <input
          type="password"
          placeholder="Yeni şifre"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Şifreyi Güncelle</button>
      </form>
    </Modal>
  );
};

export default ResetPasswordPage;
