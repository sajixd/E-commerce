import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ordersAPI, productsAPI } from '../../utils/api';
import { Package, DollarSign, TrendingUp, ShoppingBag, Eye, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
      const [stats, setStats] = useState({
            totalOrders: 0,
            totalRevenue: 0,
            pendingOrders: 0,
            deliveredOrders: 0
      });
      const [recentOrders, setRecentOrders] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            fetchData();
      }, []);

      const fetchData = async () => {
            try {
                  const [ordersRes] = await Promise.all([
                        ordersAPI.getAll()
                  ]);

                  const orders = ordersRes.data;

                  setStats({
                        totalOrders: orders.length,
                        totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
                        pendingOrders: orders.filter(o => o.status === 'pending').length,
                        deliveredOrders: orders.filter(o => o.status === 'delivered').length
                  });

                  // Get 5 most recent orders
                  setRecentOrders(orders.slice(0, 5));
            } catch (error) {
                  console.error('Error fetching dashboard data:', error);
            } finally {
                  setLoading(false);
            }
      };

      if (loading) {
            return (
                  <div className="flex items-center justify-center h-[50vh]">
                        <div className="text-xl">Loading dashboard...</div>
                  </div>
            );
      }

      const StatCard = ({ icon: Icon, label, value, color, delay }) => (
            <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay }}
                  className="glass-card p-6 rounded-xl relative overflow-hidden group"
            >
                  <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
                        <Icon className="w-24 h-24 transform rotate-12 translate-x-4 -translate-y-4" />
                  </div>
                  <div className="relative z-10">
                        <div className={`p-3 rounded-lg w-fit mb-4 ${color.replace('text-', 'bg-')}/10 ${color}`}>
                              <Icon className="w-8 h-8" />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">{label}</p>
                        <h3 className="text-3xl font-bold mt-1">{value}</h3>
                  </div>
            </motion.div>
      );

      return (
            <div>
                  <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold mb-8"
                  >
                        Dashboard Overview
                  </motion.h1>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                              icon={ShoppingBag}
                              label="Total Orders"
                              value={stats.totalOrders}
                              color="text-accent-cyan"
                              delay={0}
                        />
                        <StatCard
                              icon={DollarSign}
                              label="Total Revenue"
                              value={`$${stats.totalRevenue.toFixed(2)}`}
                              color="text-accent-purple"
                              delay={0.1}
                        />
                        <StatCard
                              icon={TrendingUp}
                              label="Pending Orders"
                              value={stats.pendingOrders}
                              color="text-yellow-500"
                              delay={0.2}
                        />
                        <StatCard
                              icon={Package}
                              label="Delivered Orders"
                              value={stats.deliveredOrders}
                              color="text-green-500"
                              delay={0.3}
                        />
                  </div>

                  {/* Recent Orders Preview */}
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card rounded-xl overflow-hidden"
                  >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                              <h2 className="text-xl font-bold">Recent Orders</h2>
                              <Link
                                    to="/admin/orders"
                                    className="flex items-center gap-2 text-sm text-accent-cyan hover:text-accent-purple transition-colors"
                              >
                                    View All <ArrowRight className="w-4 h-4" />
                              </Link>
                        </div>

                        <div className="overflow-x-auto">
                              <table className="w-full">
                                    <thead className="bg-white/5">
                                          <tr>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Order ID</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Customer</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Total</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                                          </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                          {recentOrders.map((order) => (
                                                <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                                      <td className="py-4 px-6 text-sm font-mono text-gray-400">#{order._id.slice(-6)}</td>
                                                      <td className="py-4 px-6 text-sm">{order.user?.name || 'Guest'}</td>
                                                      <td className="py-4 px-6 text-sm font-bold text-accent-cyan">${order.totalAmount.toFixed(2)}</td>
                                                      <td className="py-4 px-6">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-500/10 text-green-500' :
                                                                        order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                                              'bg-blue-500/10 text-blue-500'
                                                                  }`}>
                                                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </span>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                        {recentOrders.length === 0 && (
                              <div className="p-8 text-center text-gray-400">
                                    No orders found
                              </div>
                        )}
                  </motion.div>
            </div>
      );
};

export default AdminDashboard;
