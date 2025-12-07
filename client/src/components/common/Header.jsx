import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
      const { userInfo, logout } = useAuth();

      return (
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                  <Link to="/" className="text-2xl font-bold">MERN Shop</Link>

                  <nav className="flex gap-4 items-center">
                        <Link to="/cart" className="hover:text-gray-300">Cart</Link>

                        {userInfo ? (
                              <div className="flex gap-4 items-center">
                                    <span className="text-gray-300">Welcome, {userInfo.name}</span>

                                    {/* ADMIN ONLY LINK */}
                                    {userInfo.role === 'admin' && (
                                          <Link
                                                to="/admin/dashboard"
                                                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                                          >
                                                Admin Panel
                                          </Link>
                                    )}

                                    <button
                                          onClick={logout}
                                          className="text-sm border border-gray-500 px-2 py-1 rounded hover:bg-gray-700"
                                    >
                                          Logout
                                    </button>
                              </div>
                        ) : (
                              <Link to="/login" className="hover:text-gray-300">Login</Link>
                        )}
                  </nav>
            </header>
      );
};

export default Header;
