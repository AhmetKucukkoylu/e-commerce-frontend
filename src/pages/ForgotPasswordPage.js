import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "../services/axiosInstance";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/forgot-password", { email });
      alert("Şifre sıfırlama bağlantısı gönderildi.");
    } catch (err) {
      console.error("Şifre sıfırlama hatası:", err);
      alert(err.response?.data?.error || "İşlem başarısız");
    }
  };

  return (
    <Modal>
      <form className="login-form" onSubmit={handleReset}>
        <h2>Şifre Sıfırla</h2>

        <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Şifre Sıfırla</button>

        <div className="login-links-row">
          <Link to="/login">Giriş Yap</Link>
          <Link to="/register">Kayıt Ol</Link>
        </div>
      </form>
    </Modal>
  );
};

export default ForgotPasswordPage;
