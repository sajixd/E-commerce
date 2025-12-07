import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { productsAPI } from '../../utils/api';
import { Plus, Trash2, Edit, Search, Image as ImageIcon } from 'lucide-react';

const AdminProducts = () => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [showForm, setShowForm] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const [formData, setFormData] = useState({
            name: '',
            description: '',
            price: '',
            category: '',
            image: '',
            stock: ''
      });

      useEffect(() => {
            fetchProducts();
      }, []);

      const fetchProducts = async () => {
            try {
                  const { data } = await productsAPI.getAll();
                  setProducts(data);
            } catch (error) {
                  console.error('Error fetching products:', error);
            } finally {
                  setLoading(false);
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await productsAPI.create({
                        ...formData,
                        price: parseFloat(formData.price),
                        stock: parseInt(formData.stock)
                  });
                  setShowForm(false);
                  setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' });
                  fetchProducts();
            } catch (error) {
                  console.error('Error adding product:', error);
            }
      };

      const handleDelete = async (id) => {
            if (window.confirm('Are you sure you want to delete this product?')) {
                  try {
                        await productsAPI.delete(id);
                        fetchProducts();
                  } catch (error) {
                        console.error('Error deleting product:', error);
                  }
            }
      };

      const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (loading) return <div className="text-center py-20">Loading products...</div>;

      return (
            <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <motion.h1
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-3xl font-bold"
                        >
                              Products Management
                        </motion.h1>

                        <button
                              onClick={() => setShowForm(!showForm)}
                              className="flex items-center gap-2 px-6 py-2.5 bg-accent-purple rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-accent-purple/20"
                        >
                              <Plus className="w-5 h-5" />
                              Add New Product
                        </button>
                  </div>

                  {/* Add Product Form */}
                  {showForm && (
                        <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="glass-card p-6 rounded-xl mb-8 overflow-hidden"
                        >
                              <h2 className="text-xl font-bold mb-6">Add New Product</h2>
                              <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Product Name</label>
                                                <input
                                                      type="text"
                                                      value={formData.name}
                                                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                      required
                                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors"
                                                      placeholder="e.g. Neon Cyber Headset"
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Category</label>
                                                <input
                                                      type="text"
                                                      value={formData.category}
                                                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                      required
                                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors"
                                                      placeholder="e.g. Audio"
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Price ($)</label>
                                                <input
                                                      type="number"
                                                      step="0.01"
                                                      value={formData.price}
                                                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                      required
                                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors"
                                                      placeholder="0.00"
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Stock Quantity</label>
                                                <input
                                                      type="number"
                                                      value={formData.stock}
                                                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                      required
                                                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors"
                                                      placeholder="0"
                                                />
                                          </div>
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-400">Image URL</label>
                                          <input
                                                type="url"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors"
                                                placeholder="https://..."
                                          />
                                    </div>

                                    <div className="space-y-2">
                                          <label className="text-sm font-medium text-gray-400">Description</label>
                                          <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                required
                                                rows="3"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors"
                                                placeholder="Product description..."
                                          />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                          <button
                                                type="submit"
                                                className="px-6 py-2.5 bg-accent-cyan rounded-lg font-medium hover:opacity-90 transition-opacity"
                                          >
                                                Publish Product
                                          </button>
                                          <button
                                                type="button"
                                                onClick={() => setShowForm(false)}
                                                className="px-6 py-2.5 bg-white/5 rounded-lg font-medium hover:bg-white/10 transition-colors"
                                          >
                                                Cancel
                                          </button>
                                    </div>
                              </form>
                        </motion.div>
                  )}

                  {/* Products List */}
                  <div className="glass-card rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                              <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                          type="text"
                                          placeholder="Search products..."
                                          value={searchTerm}
                                          onChange={(e) => setSearchTerm(e.target.value)}
                                          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-accent-cyan outline-none transition-colors"
                                    />
                              </div>
                              <span className="text-sm text-gray-400">
                                    Showing {filteredProducts.length} items
                              </span>
                        </div>

                        <div className="overflow-x-auto">
                              <table className="w-full">
                                    <thead className="bg-white/5">
                                          <tr>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Product</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Category</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Price</th>
                                                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Stock</th>
                                                <th className="text-right py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
                                          </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                          {filteredProducts.map((product) => (
                                                <tr key={product._id} className="hover:bg-white/5 transition-colors">
                                                      <td className="py-4 px-6">
                                                            <div className="flex items-center gap-4">
                                                                  <img
                                                                        src={product.image}
                                                                        alt={product.name}
                                                                        className="w-12 h-12 rounded-lg object-cover bg-white/10"
                                                                  />
                                                                  <div>
                                                                        <h3 className="font-medium text-white">{product.name}</h3>
                                                                        <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                                                              {product.description}
                                                                        </p>
                                                                  </div>
                                                            </div>
                                                      </td>
                                                      <td className="py-4 px-6 text-sm">
                                                            <span className="px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                                                                  {product.category}
                                                            </span>
                                                      </td>
                                                      <td className="py-4 px-6 text-sm font-bold text-accent-cyan">
                                                            ${product.price}
                                                      </td>
                                                      <td className="py-4 px-6 text-sm">
                                                            <span className={`px-2 py-1 rounded ${product.stock > 10 ? 'text-green-500 bg-green-500/10' :
                                                                        product.stock > 0 ? 'text-yellow-500 bg-yellow-500/10' :
                                                                              'text-red-500 bg-red-500/10'
                                                                  }`}>
                                                                  {product.stock} in stock
                                                            </span>
                                                      </td>
                                                      <td className="py-4 px-6 text-right">
                                                            <button
                                                                  onClick={() => handleDelete(product._id)}
                                                                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                                  title="Delete Product"
                                                            >
                                                                  <Trash2 className="w-5 h-5" />
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
};

export default AdminProducts;
