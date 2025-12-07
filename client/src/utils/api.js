import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
      baseURL: API_URL,
      headers: {
            'Content-Type': 'application/json'
      }
});

// Add token to requests
api.interceptors.request.use(
      (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                  config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

export default api;

// Auth API
export const authAPI = {
      register: (userData) => api.post('/auth/register', userData),
      login: (credentials) => api.post('/auth/login', credentials),
      getMe: () => api.get('/auth/me')
};

// Products API
export const productsAPI = {
      getAll: () => api.get('/products'),
      getById: (id) => api.get(`/products/${id}`),
      create: (productData) => api.post('/products', productData),
      update: (id, productData) => api.put(`/products/${id}`, productData),
      delete: (id) => api.delete(`/products/${id}`)
};

// Cart API
export const cartAPI = {
      getCart: () => api.get('/cart'),
      addToCart: (productId, quantity) => api.post('/cart', { productId, quantity }),
      updateItem: (productId, quantity) => api.put(`/cart/${productId}`, { quantity }),
      removeItem: (productId) => api.delete(`/cart/${productId}`),
      clearCart: () => api.delete('/cart')
};

// Orders API
export const ordersAPI = {
      create: (orderData) => api.post('/orders', orderData),
      getMyOrders: () => api.get('/orders/myorders'),
      getById: (id) => api.get(`/orders/${id}`),
      getAll: () => api.get('/orders'),
      updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};
