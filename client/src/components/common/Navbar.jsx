import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, Moon, Sun, LogOut, Package, LayoutDashboard, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
      const [isDark, setIsDark] = useState(true);
      const [showUserMenu, setShowUserMenu] = useState(false);
      const { user, isAuthenticated, isAdmin, logout } = useAuth();
      const { cartCount } = useCart();
      const navigate = useNavigate();

      useEffect(() => {
            if (isDark) {
                  document.documentElement.classList.add('dark');
            } else {
                  document.documentElement.classList.remove('dark');
            }
      }, [isDark]);

      const toggleTheme = () => setIsDark(!isDark);

      const handleLogout = () => {
            logout();
            setShowUserMenu(false);
            navigate('/');
      };

      return (
            <motion.nav
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  className="fixed w-full z-50 glass border-b"
            >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                              <div className="flex items-center">
                                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                                          NEXUS
                                    </Link>
                              </div>
                              <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                          <Link to="/" className="text-foreground hover:text-accent-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                                          <Link to="/products" className="text-foreground hover:text-accent-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">Products</Link>
                                          <Link to="/about" className="text-foreground hover:text-accent-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
                                    </div>
                              </div>
                              <div className="flex items-center gap-4 text-foreground">
                                    <button
                                          onClick={toggleTheme}
                                          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                                    >
                                          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                    </button>

                                    {isAuthenticated && !isAdmin && (
                                          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors relative">
                                                <ShoppingCart className="w-5 h-5" />
                                                {cartCount > 0 && (
                                                      <span className="absolute -top-1 -right-1 bg-accent-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                            {cartCount}
                                                      </span>
                                                )}
                                          </Link>
                                    )}

                                    {isAuthenticated ? (
                                          <div className="relative">
                                                <button
                                                      onClick={() => setShowUserMenu(!showUserMenu)}
                                                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                                                >
                                                      <User className="w-5 h-5" />
                                                </button>

                                                {showUserMenu && (
                                                      <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg py-2">
                                                            <div className="px-4 py-2 border-b border-white/10">
                                                                  <p className="font-medium">{user?.name}</p>
                                                                  <p className="text-xs text-gray-400">{user?.email}</p>
                                                            </div>
                                                            {!isAdmin && (
                                                                  <Link
                                                                        to="/orders"
                                                                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 transition-colors"
                                                                        onClick={() => setShowUserMenu(false)}
                                                                  >
                                                                        <Package className="w-4 h-4" />
                                                                        My Orders
                                                                  </Link>
                                                            )}
                                                            {isAdmin && (
                                                                  <Link
                                                                        to="/admin"
                                                                        className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 transition-colors"
                                                                        onClick={() => setShowUserMenu(false)}
                                                                  >
                                                                        <LayoutDashboard className="w-4 h-4" />
                                                                        Admin Panel
                                                                  </Link>
                                                            )}
                                                            <button
                                                                  onClick={handleLogout}
                                                                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 transition-colors w-full text-left text-red-500"
                                                            >
                                                                  <LogOut className="w-4 h-4" />
                                                                  Logout
                                                            </button>
                                                      </div>
                                                )}
                                          </div>
                                    ) : (
                                          <Link
                                                to="/login"
                                                className="px-4 py-2 bg-accent-purple rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                                          >
                                                Login
                                          </Link>
                                    )}
                              </div>
                        </div>
                  </div>
            </motion.nav>
      );
};

export default Navbar;
