import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
      const context = useContext(CartContext);
      if (!context) {
            throw new Error('useCart must be used within CartProvider');
      }
      return context;
};

export const CartProvider = ({ children }) => {
      const [cart, setCart] = useState({ items: [] });
      const [loading, setLoading] = useState(false);
      const { isAuthenticated } = useAuth();

      useEffect(() => {
            if (isAuthenticated) {
                  fetchCart();
            } else {
                  setCart({ items: [] });
            }
      }, [isAuthenticated]);

      const fetchCart = async () => {
            try {
                  setLoading(true);
                  const { data } = await cartAPI.getCart();
                  setCart(data);
            } catch (error) {
                  console.error('Error fetching cart:', error);
            } finally {
                  setLoading(false);
            }
      };

      const addToCart = async (productId, quantity = 1) => {
            try {
                  const { data } = await cartAPI.addToCart(productId, quantity);
                  setCart(data);
                  return { success: true };
            } catch (error) {
                  return {
                        success: false,
                        error: error.response?.data?.message || 'Failed to add to cart'
                  };
            }
      };

      const updateQuantity = async (productId, quantity) => {
            try {
                  const { data } = await cartAPI.updateItem(productId, quantity);
                  setCart(data);
            } catch (error) {
                  console.error('Error updating cart:', error);
            }
      };

      const removeItem = async (productId) => {
            try {
                  const { data } = await cartAPI.removeItem(productId);
                  setCart(data);
            } catch (error) {
                  console.error('Error removing item:', error);
            }
      };

      const clearCart = async () => {
            try {
                  await cartAPI.clearCart();
                  setCart({ items: [] });
            } catch (error) {
                  console.error('Error clearing cart:', error);
            }
      };

      const cartCount = cart.items?.reduce((total, item) => total + item.quantity, 0) || 0;
      const cartTotal = cart.items?.reduce((total, item) =>
            total + (item.product?.price || 0) * item.quantity, 0) || 0;

      const value = {
            cart,
            loading,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
            fetchCart,
            cartCount,
            cartTotal
      };

      return (
            <CartContext.Provider value={value}>
                  {children}
            </CartContext.Provider>
      );
};
