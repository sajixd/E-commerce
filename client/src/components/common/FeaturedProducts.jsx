import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { productsAPI } from '../../utils/api';

const FeaturedProducts = () => {
      const [products, setProducts] = useState([]);

      useEffect(() => {
            fetchProducts();
      }, []);

      const fetchProducts = async () => {
            try {
                  const { data } = await productsAPI.getAll();
                  // Show first 4 products as featured
                  setProducts(data.slice(0, 4));
            } catch (error) {
                  console.error('Error fetching products:', error);
            }
      };

      return (
            <section className="py-20 px-4 max-w-7xl mx-auto">
                  <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold mb-10 flex items-center gap-4 text-foreground"
                  >
                        <span className="w-10 h-1 bg-accent-cyan rounded-full"></span>
                        Featured Drops
                  </motion.h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                              <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                              >
                                    <ProductCard product={product} />
                              </motion.div>
                        ))}
                  </div>
            </section>
      );
};

export default FeaturedProducts;
