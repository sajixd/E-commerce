import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
      const [added, setAdded] = useState(false);
      const { addToCart } = useCart();
      const { isAuthenticated } = useAuth();
      const navigate = useNavigate();

      const handleAddToCart = async () => {
            if (!isAuthenticated) {
                  navigate('/login');
                  return;
            }

            const result = await addToCart(product._id, 1);
            if (result.success) {
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
            }
      };

      return (
            <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative glass-card p-4 rounded-2xl overflow-hidden"
            >
                  <div className="aspect-square rounded-xl bg-white/5 mb-4 overflow-hidden relative">
                        <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <button
                                    onClick={handleAddToCart}
                                    className={`p-3 rounded-full transition-all ${added
                                                ? 'bg-green-500'
                                                : 'bg-accent-cyan hover:bg-accent-cyan/80'
                                          }`}
                              >
                                    {added ? (
                                          <Check className="w-5 h-5 text-white" />
                                    ) : (
                                          <ShoppingCart className="w-5 h-5 text-white" />
                                    )}
                              </button>
                        </div>
                  </div>

                  <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                        <span className="text-accent-purple font-bold text-xl">${product.price}</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">{product.category}</span>
                  </div>
                  {product.stock < 10 && product.stock > 0 && (
                        <p className="text-xs text-yellow-500 mt-2">Only {product.stock} left!</p>
                  )}
                  {product.stock === 0 && (
                        <p className="text-xs text-red-500 mt-2">Out of stock</p>
                  )}
            </motion.div>
      );
};

export default ProductCard;
