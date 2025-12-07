import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/common/ProductCard';
import { productsAPI } from '../utils/api';

const Products = () => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);

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

      if (loading) {
            return (
                  <div className="min-h-screen flex items-center justify-center pt-20">
                        <div className="text-xl">Loading products...</div>
                  </div>
            );
      }

      return (
            <div className="min-h-screen pt-20 px-4">
                  <div className="max-w-7xl mx-auto py-12">
                        <motion.h1
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-4xl font-bold mb-8 flex items-center gap-4"
                        >
                              <span className="w-10 h-1 bg-accent-cyan rounded-full"></span>
                              All Products
                        </motion.h1>

                        {products.length === 0 ? (
                              <div className="text-center py-20">
                                    <p className="text-xl text-gray-400">No products available yet.</p>
                                    <p className="text-sm text-gray-500 mt-2">Check back soon!</p>
                              </div>
                        ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {products.map((product, index) => (
                                          <motion.div
                                                key={product._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                          >
                                                <ProductCard product={product} />
                                          </motion.div>
                                    ))}
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default Products;
