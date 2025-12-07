const Product = require('../models/Product');

const products = [
      {
            name: 'Neon Cyber Headset',
            description: 'Premium wireless headset with RGB lighting and spatial audio. Perfect for gaming and music.',
            price: 299.99,
            category: 'Audio',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
            stock: 15
      },
      {
            name: 'Holographic Smartwatch',
            description: 'Next-gen smartwatch with holographic display and health monitoring features.',
            price: 499.99,
            category: 'Wearables',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
            stock: 20
      },
      {
            name: 'Quantum Processor',
            description: 'Ultra-fast quantum processor for next-generation computing needs.',
            price: 899.99,
            category: 'Tech',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
            stock: 8
      },
      {
            name: 'Cyber Lens Camera',
            description: 'Professional mirrorless camera with AI-powered features and 8K video.',
            price: 1299.99,
            category: 'Photography',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
            stock: 12
      },
      {
            name: 'Neural Keyboard',
            description: 'Mechanical keyboard with customizable RGB and neural typing prediction.',
            price: 199.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
            stock: 25
      },
      {
            name: 'Plasma Mouse',
            description: 'Ergonomic gaming mouse with plasma lighting and 20,000 DPI sensor.',
            price: 89.99,
            category: 'Accessories',
            image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=800',
            stock: 30
      },
      {
            name: 'Infinity Monitor',
            description: 'Ultra-wide curved monitor with 240Hz refresh rate and HDR support.',
            price: 799.99,
            category: 'Displays',
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
            stock: 10
      },
      {
            name: 'Vortex Drone',
            description: 'Professional drone with 4K camera and 45-minute flight time.',
            price: 1499.99,
            category: 'Drones',
            image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800',
            stock: 5
      }
];

const seedProducts = async () => {
      try {
            // Check if products already exist
            const count = await Product.countDocuments();

            if (count === 0) {
                  await Product.insertMany(products);
                  console.log('✅ Products seeded successfully');
            } else {
                  console.log('✅ Products already exist');
            }
      } catch (error) {
            console.error('Error seeding products:', error.message);
      }
};

module.exports = seedProducts;
