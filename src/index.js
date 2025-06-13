// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </SearchProvider>
  </React.StrictMode>
);

reportWebVitals();
