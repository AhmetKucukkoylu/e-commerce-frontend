// client/src/services/axiosInstance.js

import axios from "axios";

// Session ID yönetimi
const getSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const generateSessionId = () => {
  return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

const clearSessionId = () => {
  localStorage.removeItem("sessionId");
};

// ✅ BACKEND ADRESİ .env DOSYASINDAN ALINIYOR + "/api" EKLENİYOR
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// İstek öncesi interceptor: Token veya Session ID ekleniyor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const noAuthNeeded = ["/auth/register", "/auth/onboard", "/auth/login"];
    const isNoAuthRoute = noAuthNeeded.some((path) =>
      config.url?.includes(path)
    );

    if (token && !isNoAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (!isNoAuthRoute) {
      const sessionId = getSessionId();
      config.headers['X-Session-ID'] = sessionId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Yanıt sonrası interceptor: Session ID güncelleniyor
axiosInstance.interceptors.response.use(
  (response) => {
    const sessionId = response.headers['x-session-id'];
    if (sessionId) {
      localStorage.setItem("sessionId", sessionId);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

// Yardımcı fonksiyonları dışarı aç
axiosInstance.clearSessionId = clearSessionId;
axiosInstance.getSessionId = getSessionId;

export default axiosInstance;
