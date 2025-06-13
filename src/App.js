import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Header
import Header from "./components/Header/Header";

// Sayfalar
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";
import AdminPage from "./pages/AdminPage";
import MyReviewsPage from "./components/MyReviews/MyReviewsPage";
import AdminCampaigns from "./pages/AdminCampaigns";
import CategoryPage from "./pages/CategoryPage";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminCategories from "./pages/AdminCategories";
import CampaignsByCategory from "./pages/CampaignsByCategory";
import CampaignsByTag from "./pages/CampaignsByTag";
import KargoBedavaPage from "./pages/KargoBedavaPage";

// Modal
import ChangePasswordModal from "./components/ChangePasswordModal";

// Context Provider'lar
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrderProvider } from "./context/OrderContext";
import { CampaignProvider } from "./context/CampaignContext";
import { CategoryProvider } from "./context/CategoryContext";
import { AdminOrdersProvider } from "./context/AdminOrdersContext";
import { ProductProvider } from "./context/ProductContext";
import { ReviewProvider } from "./context/ReviewContext";
import { UserReviewProvider } from "./context/UserReviewContext";
import { UserProfileProvider } from "./context/UserProfileContext";

// Yeni context'ler
import { AdminProductProvider } from "./context/AdminProductContext";
import { AdminUIProvider } from "./context/AdminUIContext";
import { AdminFilterProvider } from "./context/AdminFilterContext";
import { ProductDetailProvider } from "./context/ProductDetailContext";
import { TagProvider } from "./context/TagContext";

// Route korumaları
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

// Stil
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <CategoryProvider>
                  <TagProvider>
                    <CampaignProvider>
                      <ProductProvider>
                        <ReviewProvider>
                          <Router>
                            <Header />
                            <Routes>
                              {/* Genel Sayfalar */}
                              <Route path="/" element={<HomePage />} />
                              <Route path="/login" element={<LoginPage />} />
                              <Route path="/register" element={<RegisterPage />} />
                              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                              <Route path="/reset-password" element={<ResetPasswordPage />} />
                              <Route path="/cart" element={<CartPage />} />
                              <Route path="/product/:id" element={<ProductDetailProvider><ProductDetailPage /></ProductDetailProvider>} />
                              <Route path="/category/:id" element={<CategoryPage />} />
                              <Route path="/campaigns/category/:categoryId" element={<CampaignsByCategory />} />
                              <Route path="/campaigns/tag/:tagId" element={<CampaignsByTag />} />
                              <Route path="/kargo-bedava" element={<KargoBedavaPage />} />

                              {/* Giriş Gerektiren Sayfalar */}
                              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                              <Route
                                path="/profile/my-reviews"
                                element={
                                  <PrivateRoute>
                                    <UserReviewProvider>
                                      <MyReviewsPage />
                                    </UserReviewProvider>
                                  </PrivateRoute>
                                }
                              />
                              <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
                              <Route path="/orders" element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
                              <Route path="/wishlist" element={<PrivateRoute><WishlistPage /></PrivateRoute>} />
                              <Route path="/change-password" element={<PrivateRoute><ChangePasswordModal /></PrivateRoute>} />

                              {/* Admin Panel */}
                              <Route
                                path="/admin"
                                element={
                                  <AdminRoute>
                                    <AdminUIProvider>
                                      <AdminProductProvider>
                                        <AdminFilterProvider>
                                          <AdminPage />
                                        </AdminFilterProvider>
                                      </AdminProductProvider>
                                    </AdminUIProvider>
                                  </AdminRoute>
                                }
                              />
                              <Route
                                path="/admin/campaigns"
                                element={
                                  <AdminRoute>
                                    <CampaignProvider>
                                      <AdminCampaigns />
                                    </CampaignProvider>
                                  </AdminRoute>
                                }
                              />
                              <Route
                                path="/admin/orders"
                                element={
                                  <AdminRoute>
                                    <AdminOrdersProvider>
                                      <AdminOrders />
                                    </AdminOrdersProvider>
                                  </AdminRoute>
                                }
                              />
                              <Route
                                path="/admin/dashboard"
                                element={
                                  <AdminRoute>
                                    <AdminDashboardPage />
                                  </AdminRoute>
                                }
                              />
                              <Route
                                path="/admin/categories"
                                element={
                                  <AdminRoute>
                                    <AdminCategories />
                                  </AdminRoute>
                                }
                              />
                            </Routes>
                          </Router>
                        </ReviewProvider>
                      </ProductProvider>
                    </CampaignProvider>
                  </TagProvider>
                </CategoryProvider>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
