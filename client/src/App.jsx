import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import Hero from './components/common/Hero';
import FeaturedProducts from './components/common/FeaturedProducts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

// Admin Route wrapper
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Wrap admin pages in AdminLayout
  return isAdmin ? <AdminLayout>{children}</AdminLayout> : <Navigate to="/" />;
};

// Protected route wrapper (requires authentication)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-cyan/30">
      {/* Show Navbar for all non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public/User routes */}
        <Route path="/" element={
          <>
            <Hero />
            <FeaturedProducts />
          </>
        } />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />

        {/* Protected user routes */}
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        } />
        <Route path="/admin/orders" element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
