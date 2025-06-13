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

// Session ID'yi temizle (kullanıcı giriş yaptığında)
const clearSessionId = () => {
  localStorage.removeItem("sessionId");
};

// Global axios örneği
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Her istekten önce token veya session ID'yi ekle
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Şu endpoint'lerde token ekleme
    const noAuthNeeded = ["/auth/register", "/auth/onboard", "/auth/login"];

    const isNoAuthRoute = noAuthNeeded.some((path) =>
      config.url?.includes(path)
    );

    if (token && !isNoAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (!isNoAuthRoute) {
      // Token yoksa session ID ekle
      const sessionId = getSessionId();
      config.headers['X-Session-ID'] = sessionId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Backend'den gelen session ID'yi sakla
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

// Export edilecek fonksiyonlar
axiosInstance.clearSessionId = clearSessionId;
axiosInstance.getSessionId = getSessionId;

export default axiosInstance;
