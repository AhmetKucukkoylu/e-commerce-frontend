import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import axios from "../services/axiosInstance";
import GoogleLoginButton from "../components/GoogleLoginButton"; // ✅ eklendi

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor");
      return;
    }

    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
        name,
      });

      alert("Kayıt başarılı");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      alert(err.response?.data?.error || "Kayıt başarısız");
    }
  };

  return (
    <Modal>
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Kayıt Ol</h2>

        <input
          type="text"
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre Tekrar"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Kayıt Ol</button>

        <div className="form-note">
          <span>Zaten hesabınız var mı?</span>
          <Link to="/login">Giriş Yap</Link>
        </div>

        <div className="divider">veya</div>

        {/* ✅ Google ile devam bileşeni */}
        <GoogleLoginButton />
      </form>
    </Modal>
  );
};

export default RegisterPage;
