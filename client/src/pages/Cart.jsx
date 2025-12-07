import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
      const { cart, updateQuantity, removeItem, cartTotal, loading } = useCart();
      const { isAuthenticated } = useAuth();
      const navigate = useNavigate();

      if (!isAuthenticated) {
            return (
                  <div className="min-h-screen flex items-center justify-center pt-20 px-4">
                        <div className="text-center">
                              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                              <h2 className="text-2xl font-bold mb-2">Please Login</h2>
                              <p className="text-gray-400 mb-6">You need to be logged in to view your cart</p>
                              <button
                                    onClick={() => navigate('/login')}
                                    className="px-6 py-3 bg-accent-purple rounded-lg hover:opacity-90 transition-opacity"
                              >
                                    Go to Login
                              </button>
                        </div>
                  </div>
            );
      }

      if (loading) {
            return (
                  <div className="min-h-screen flex items-center justify-center pt-20">
                        <div className="text-xl">Loading cart...</div>
                  </div>
            );
      }

      if (!cart.items || cart.items.length === 0) {
            return (
                  <div className="min-h-screen flex items-center justify-center pt-20 px-4">
                        <div className="text-center">
                              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                              <p className="text-gray-400 mb-6">Add some products to get started!</p>
                              <button
                                    onClick={() => navigate('/products')}
                                    className="px-6 py-3 bg-accent-purple rounded-lg hover:opacity-90 transition-opacity"
                              >
                                    Browse Products
                              </button>
                        </div>
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
                              Shopping Cart
                        </motion.h1>

                        <div className="space-y-4 mb-8">
                              {cart.items.map((item, index) => (
                                    <motion.div
                                          key={item.product._id}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: index * 0.1 }}
                                          className="glass-card p-4 rounded-xl flex items-center gap-4"
                                    >
                                          <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                          />

                                          <div className="flex-1">
                                                <h3 className="font-bold text-lg">{item.product.name}</h3>
                                                <p className="text-accent-purple font-bold">${item.product.price}</p>
                                          </div>

                                          <div className="flex items-center gap-3">
                                                <button
                                                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                                >
                                                      <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <button
                                                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                      className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                                                >
                                                      <Plus className="w-4 h-4" />
                                                </button>
                                          </div>

                                          <button
                                                onClick={() => removeItem(item.product._id)}
                                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                          >
                                                <Trash2 className="w-5 h-5" />
                                          </button>
                                    </motion.div>
                              ))}
                        </div>

                        <div className="glass-card p-6 rounded-xl">
                              <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold">Total:</span>
                                    <span className="text-2xl font-bold text-accent-cyan">${cartTotal.toFixed(2)}</span>
                              </div>
                              <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full py-3 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-lg font-medium hover:opacity-90 transition-opacity"
                              >
                                    Proceed to Checkout
                              </button>
                        </div>
                  </div>
            </div>
      );
};

export default Cart;
