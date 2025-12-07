const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true
      },
      description: {
            type: String,
            required: [true, 'Please add a description']
      },
      price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: 0
      },
      category: {
            type: String,
            required: [true, 'Please add a category']
      },
      image: {
            type: String,
            required: [true, 'Please add an image URL']
      },
      stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0
      }
}, {
      timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
