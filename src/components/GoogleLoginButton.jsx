import React, { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import axios from "../services/axiosInstance";

const GoogleLoginButton = () => {
  const buttonRef = useRef(null);
  const { login } = useAuth();

  useEffect(() => {
    if (!window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      width: 260,
    });
  }, []);

  const handleCredentialResponse = async (response) => {
    const credential = response.credential;

    try {
      const decoded = jwtDecode(credential); // opsiyonel olarak görüntüleyebilirsin
      console.log("Google user decoded:", decoded);

      const res = await axios.post("/auth/google-login", { credential });

      const { token, user } = res.data;
      login({ userData: user, token });

      alert("Google ile giriş başarılı");
    } catch (err) {
      console.error("Google login hatası:", err);
      alert("Google login başarısız");
    }
  };

  return <div ref={buttonRef}></div>;
};

export default GoogleLoginButton;
