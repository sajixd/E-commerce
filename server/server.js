const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
const seedProducts = require('./utils/seedProducts');

dotenv.config();

// Connect to Database
connectDB().then(() => {
      // Seed admin and products after DB connection
      seedAdmin();
      seedProducts();
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
      res.send('API is running...');
});

// Import Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
