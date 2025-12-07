import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
      const [formData, setFormData] = useState({
            email: '',
            password: ''
      });
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);
      const { login } = useAuth();
      const navigate = useNavigate();

      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            const result = await login(formData.email, formData.password);

            if (result.success) {
                  navigate('/');
            } else {
                  setError(result.error);
            }
            setLoading(false);
      };

      return (
            <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md"
                  >
                        <div className="glass-card p-8 rounded-2xl">
                              <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                                    Welcome Back
                              </h2>

                              {error && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
                                          <AlertCircle className="w-5 h-5" />
                                          <span className="text-sm">{error}</span>
                                    </div>
                              )}

                              <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                          <label className="block text-sm font-medium mb-2">Email</label>
                                          <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                      type="email"
                                                      name="email"
                                                      value={formData.email}
                                                      onChange={handleChange}
                                                      required
                                                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors"
                                                      placeholder="your@email.com"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <label className="block text-sm font-medium mb-2">Password</label>
                                          <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                      type="password"
                                                      name="password"
                                                      value={formData.password}
                                                      onChange={handleChange}
                                                      required
                                                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors"
                                                      placeholder="••••••••"
                                                />
                                          </div>
                                    </div>

                                    <button
                                          type="submit"
                                          disabled={loading}
                                          className="w-full py-3 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                    >
                                          {loading ? 'Logging in...' : 'Login'}
                                    </button>
                              </form>

                              <p className="mt-6 text-center text-sm text-gray-400">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-accent-cyan hover:underline">
                                          Sign up
                                    </Link>
                              </p>

                              <div className="mt-4 p-3 bg-accent-purple/10 border border-accent-purple/30 rounded-lg">
                                    <p className="text-xs text-center text-gray-300">
                                          <strong>Admin Login:</strong> sajid@admin.com / sajid786
                                    </p>
                              </div>
                        </div>
                  </motion.div>
            </div>
      );
};

export default Login;
