import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
      const [isDark, setIsDark] = useState(true);
      const [isMobileOpen, setIsMobileOpen] = useState(false);
      const { logout } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();

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
            navigate('/');
      };

      const navItems = [
            { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/admin/products', icon: Package, label: 'Products' },
            { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
      ];

      const isActive = (path) => {
            if (path === '/admin' && location.pathname === '/admin') return true;
            if (path !== '/admin' && location.pathname.startsWith(path)) return true;
            return false;
      };

      return (
            <>
                  {/* Mobile Menu Button */}
                  <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-accent-purple rounded-lg text-white"
                  >
                        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>

                  {/* Sidebar */}
                  <div className={`fixed inset-y-0 left-0 z-40 w-64 glass border-r transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="flex flex-col h-full">
                              {/* Logo */}
                              <div className="h-16 flex items-center px-6 border-b border-white/10">
                                    <Link to="/admin" className="text-2xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                                          NEXUS Admin
                                    </Link>
                              </div>

                              {/* Nav Links */}
                              <nav className="flex-1 px-4 py-6 space-y-2">
                                    {navItems.map((item) => (
                                          <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path)
                                                            ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20'
                                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                                      }`}
                                          >
                                                <item.icon className="w-5 h-5" />
                                                <span className="font-medium">{item.label}</span>
                                          </Link>
                                    ))}
                              </nav>

                              {/* Bottom Actions */}
                              <div className="p-4 border-t border-white/10 space-y-2">
                                    <button
                                          onClick={toggleTheme}
                                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-colors"
                                    >
                                          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                          <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                                    </button>
                                    <button
                                          onClick={handleLogout}
                                          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                    >
                                          <LogOut className="w-5 h-5" />
                                          <span className="font-medium">Logout</span>
                                    </button>
                              </div>
                        </div>
                  </div>

                  {/* Overlay for mobile */}
                  {isMobileOpen && (
                        <div
                              onClick={() => setIsMobileOpen(false)}
                              className="md:hidden fixed inset-0 bg-black/50 z-30"
                        />
                  )}
            </>
      );
};

export default AdminSidebar;
