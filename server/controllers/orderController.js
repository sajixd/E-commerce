const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
      try {
            const { shippingAddress } = req.body;

            // Get user's cart
            const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

            if (!cart || cart.items.length === 0) {
                  return res.status(400).json({ message: 'Cart is empty' });
            }

            // Calculate total and prepare order items
            let totalAmount = 0;
            const orderItems = cart.items.map(item => {
                  const itemTotal = item.product.price * item.quantity;
                  totalAmount += itemTotal;

                  return {
                        product: item.product._id,
                        name: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity
                  };
            });

            // Create order
            const order = await Order.create({
                  user: req.user.id,
                  items: orderItems,
                  totalAmount,
                  shippingAddress
            });

            // Clear cart after order
            cart.items = [];
            await cart.save();

            res.status(201).json(order);
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
      try {
            const orders = await Order.find({ user: req.user.id })
                  .populate('items.product')
                  .sort({ createdAt: -1 });

            res.json(orders);
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
      try {
            const order = await Order.findById(req.params.id)
                  .populate('user', 'name email')
                  .populate('items.product');

            if (order) {
                  // Check if user owns this order or is admin
                  if (order.user._id.toString() === req.user.id || req.user.role === 'admin') {
                        res.json(order);
                  } else {
                        res.status(403).json({ message: 'Not authorized to view this order' });
                  }
            } else {
                  res.status(404).json({ message: 'Order not found' });
            }
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
      try {
            const orders = await Order.find({})
                  .populate('user', 'name email')
                  .populate('items.product')
                  .sort({ createdAt: -1 });

            res.json(orders);
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
      try {
            const { status } = req.body;
            const order = await Order.findById(req.params.id);

            if (order) {
                  order.status = status;
                  const updatedOrder = await order.save();
                  res.json(updatedOrder);
            } else {
                  res.status(404).json({ message: 'Order not found' });
            }
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};
