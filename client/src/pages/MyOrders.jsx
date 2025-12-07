import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ordersAPI } from '../utils/api';
import { Package } from 'lucide-react';

const MyOrders = () => {
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            fetchOrders();
      }, []);

      const fetchOrders = async () => {
            try {
                  const { data } = await ordersAPI.getMyOrders();
                  setOrders(data);
            } catch (error) {
                  console.error('Error fetching orders:', error);
            } finally {
                  setLoading(false);
            }
      };

      const getStatusColor = (status) => {
            const colors = {
                  pending: 'text-yellow-500',
                  processing: 'text-blue-500',
                  shipped: 'text-purple-500',
                  delivered: 'text-green-500',
                  cancelled: 'text-red-500'
            };
            return colors[status] || 'text-gray-500';
      };

      if (loading) {
            return (
                  <div className="min-h-screen flex items-center justify-center pt-20">
                        <div className="text-xl">Loading orders...</div>
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
                              My Orders
                        </motion.h1>

                        {orders.length === 0 ? (
                              <div className="text-center py-20">
                                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <p className="text-xl text-gray-400">No orders yet</p>
                              </div>
                        ) : (
                              <div className="space-y-4">
                                    {orders.map((order, index) => (
                                          <motion.div
                                                key={order._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="glass-card p-6 rounded-xl"
                                          >
                                                <div className="flex justify-between items-start mb-4">
                                                      <div>
                                                            <p className="text-sm text-gray-400">Order ID: {order._id}</p>
                                                            <p className="text-sm text-gray-400">
                                                                  {new Date(order.createdAt).toLocaleDateString()}
                                                            </p>
                                                      </div>
                                                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                            {order.status.toUpperCase()}
                                                      </span>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                      {order.items.map((item) => (
                                                            <div key={item._id} className="flex justify-between text-sm">
                                                                  <span>{item.name} x{item.quantity}</span>
                                                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                            </div>
                                                      ))}
                                                </div>

                                                <div className="border-t border-white/10 pt-4">
                                                      <div className="flex justify-between font-bold">
                                                            <span>Total:</span>
                                                            <span className="text-accent-cyan">${order.totalAmount.toFixed(2)}</span>
                                                      </div>
                                                </div>
                                          </motion.div>
                                    ))}
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default MyOrders;
