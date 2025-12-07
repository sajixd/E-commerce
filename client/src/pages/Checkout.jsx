import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../utils/api';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Checkout = () => {
      const { cart, cartTotal, clearCart } = useCart();
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      const [success, setSuccess] = useState(false);
      const [formData, setFormData] = useState({
            address: '',
            city: '',
            postalCode: '',
            country: ''
      });

      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            try {
                  await ordersAPI.create({ shippingAddress: formData });
                  setSuccess(true);
                  await clearCart();

                  setTimeout(() => {
                        navigate('/orders');
                  }, 2000);
            } catch (err) {
                  setError(err.response?.data?.message || 'Failed to create order');
            } finally {
                  setLoading(false);
            }
      };

      if (success) {
            return (
                  <div className="min-h-screen flex items-center justify-center pt-20 px-4">
                        <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center"
                        >
                              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                              <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
                              <p className="text-gray-400">Redirecting to your orders...</p>
                        </motion.div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen pt-20 px-4">
                  <div className="max-w-4xl mx-auto py-12">
                        <motion.h1
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-4xl font-bold mb-8"
                        >
                              Checkout
                        </motion.h1>

                        <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                    <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>

                                    {error && (
                                          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500">
                                                <AlertCircle className="w-5 h-5" />
                                                <span className="text-sm">{error}</span>
                                          </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                          <div>
                                                <label className="block text-sm font-medium mb-2">Address</label>
                                                <input
                                                      type="text"
                                                      name="address"
                                                      value={formData.address}
                                                      onChange={handleChange}
                                                      required
                                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors"
                                                      placeholder="123 Main St"
                                                />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium mb-2">City</label>
                                                <input
                                                      type="text"
                                                      name="city"
                                                      value={formData.city}
                                                      onChange={handleChange}
                                                      required
                                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors"
                                                      placeholder="New York"
                                                />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium mb-2">Postal Code</label>
                                                <input
                                                      type="text"
                                                      name="postalCode"
                                                      value={formData.postalCode}
                                                      onChange={handleChange}
                                                      required
                                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors"
                                                      placeholder="10001"
                                                />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium mb-2">Country</label>
                                                <input
                                                      type="text"
                                                      name="country"
                                                      value={formData.country}
                                                      onChange={handleChange}
                                                      required
                                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent-cyan transition-colors"
                                                      placeholder="USA"
                                                />
                                          </div>

                                          <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-3 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                                          >
                                                {loading ? 'Placing Order...' : 'Place Order'}
                                          </button>
                                    </form>
                              </div>

                              <div>
                                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                                    <div className="glass-card p-6 rounded-xl space-y-4">
                                          {cart.items?.map((item) => (
                                                <div key={item.product._id} className="flex justify-between">
                                                      <span>{item.product.name} x{item.quantity}</span>
                                                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                          ))}
                                          <div className="border-t border-white/10 pt-4">
                                                <div className="flex justify-between text-xl font-bold">
                                                      <span>Total:</span>
                                                      <span className="text-accent-cyan">${cartTotal.toFixed(2)}</span>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Checkout;
