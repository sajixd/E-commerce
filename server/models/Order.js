const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
      product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
      },
      name: String,
      price: Number,
      quantity: {
            type: Number,
            required: true,
            min: 1
      }
});

const orderSchema = new mongoose.Schema({
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
      },
      items: [orderItemSchema],
      totalAmount: {
            type: Number,
            required: true,
            min: 0
      },
      status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
      },
      shippingAddress: {
            address: String,
            city: String,
            postalCode: String,
            country: String
      }
}, {
      timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
