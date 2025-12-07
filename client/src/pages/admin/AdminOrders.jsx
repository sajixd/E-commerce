import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ordersAPI } from '../../utils/api';
import { Search, ChevronDown, Filter } from 'lucide-react';

const AdminOrders = () => {
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);
      const [searchTerm, setSearchTerm] = useState('');
      const [statusFilter, setStatusFilter] = useState('all');

      useEffect(() => {
            fetchOrders();
      }, []);

      const fetchOrders = async () => {
            try {
                  const { data } = await ordersAPI.getAll();
                  setOrders(data);
            } catch (error) {
                  console.error('Error fetching orders:', error);
            } finally {
                  setLoading(false);
            }
      };

      const updateOrderStatus = async (orderId, newStatus) => {
            try {
                  await ordersAPI.updateStatus(orderId, newStatus);
                  // Optimistic update
                  setOrders(orders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                  ));
            } catch (error) {
                  console.error('Error updating order:', error);
                  fetchOrders(); // Revert on error
            }
      };

      const filteredOrders = orders.filter(order => {
            const matchesSearch =
                  order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

            return matchesSearch && matchesStatus;
      });

      const getStatusColor = (status) => {
            switch (status) {
                  case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
                  case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
                  case 'shipped': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
                  case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
                  case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
                  default: return 'bg-gray-500/10 text-gray-500';
            }
      };

      if (loading) return <div className="text-center py-20">Loading orders...</div>;

      return (
            <div>
                  <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold mb-8"
                  >
                        Orders Management
                  </motion.h1>

                  <div className="glass-card rounded-xl overflow-hidden">
                        {/* Filters Board */}
                        <div className="p-6 border-b border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                          type="text"
                                          placeholder="Search by ID, name, or email..."
                                          value={searchTerm}
                                          onChange={(e) => setSearchTerm(e.target.value)}
                                          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors"
                                    />
                              </div>

                              <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <select
                                          value={statusFilter}
                                          onChange={(e) => setStatusFilter(e.target.value)}
                                          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors appearance-none"
                                    >
                                          <option value="all">All Statuses</option>
                                          <option value="pending">Pending</option>
                                          <option value="processing">Processing</option>
                                          <option value="shipped">Shipped</option>
                                          <option value="delivered">Delivered</option>
                                          <option value="cancelled">Cancelled</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                              </div>

                              <div className="flex items-center justify-end text-gray-400 text-sm">
                                    Showing {filteredOrders.length} orders
                              </div>
                        </div>

                        {/* Orders Table */}
                        <div className="overflow-x-auto">
                              <table className="w-full">
                                    <thead className="bg-white/5">
                                          <tr>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Order Details</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Customer</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Items</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Date/Time</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Status</th>
                                          </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                          {filteredOrders.map((order) => (
                                                <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                                      <td className="py-4 px-6">
                                                            <div className="flex flex-col">
                                                                  <span className="font-mono text-sm text-accent-cyan">#{order._id.slice(-8)}</span>
                                                                  <span className="text-lg font-bold mt-1">${order.totalAmount.toFixed(2)}</span>
                                                            </div>
                                                      </td>
                                                      <td className="py-4 px-6">
                                                            <div className="flex flex-col">
                                                                  <span className="font-medium text-white">{order.user?.name || 'Unknown'}</span>
                                                                  <span className="text-xs text-gray-500">{order.user?.email}</span>
                                                            </div>
                                                      </td>
                                                      <td className="py-4 px-6">
                                                            <div className="flex flex-col gap-1">
                                                                  {order.items.slice(0, 2).map((item, i) => (
                                                                        <span key={i} className="text-xs text-gray-400">
                                                                              {item.quantity}x {item.product?.name || item.name}
                                                                        </span>
                                                                  ))}
                                                                  {order.items.length > 2 && (
                                                                        <span className="text-xs text-accent-cyan">
                                                                              +{order.items.length - 2} more items
                                                                        </span>
                                                                  )}
                                                            </div>
                                                      </td>
                                                      <td className="py-4 px-6">
                                                            <div className="flex flex-col text-sm text-gray-400">
                                                                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                                  <span className="text-xs">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                                            </div>
                                                      </td>
                                                      <td className="py-4 px-6">
                                                            <div className="relative">
                                                                  <select
                                                                        value={order.status}
                                                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                                        className={`appearance-none w-32 pl-3 pr-8 py-1.5 rounded-full text-xs font-medium border focus:outline-none cursor-pointer ${getStatusColor(order.status)}`}
                                                                  >
                                                                        <option value="pending">Pending</option>
                                                                        <option value="processing">Processing</option>
                                                                        <option value="shipped">Shipped</option>
                                                                        <option value="delivered">Delivered</option>
                                                                        <option value="cancelled">Cancelled</option>
                                                                  </select>
                                                                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-50" />
                                                            </div>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                        {filteredOrders.length === 0 && (
                              <div className="p-12 text-center text-gray-500">
                                    No orders found matching your criteria
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default AdminOrders;
