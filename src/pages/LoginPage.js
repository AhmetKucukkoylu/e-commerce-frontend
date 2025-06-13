import React, { useState } from "react";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result.success) {
      navigate(result.user.role === "admin" ? "/admin" : "/");
    } else {
      alert(result.error);
    }
  };

  return (
    <Modal>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Giriş Yap</h2>

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

        <button type="submit" disabled={loading}>
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="login-links-row">
          <Link to="/forgot-password">Şifremi Unuttum</Link>
          <Link to="/register">Kayıt Ol</Link>
        </div>

        <div className="divider">veya</div>

        {/* ✅ Yeni Google Login butonu */}
        <GoogleLoginButton />
      </form>
    </Modal>
  );
};

export default LoginPage;
