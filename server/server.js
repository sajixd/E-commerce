const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS package zaroori
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

// --- MIDDLEWARE ORDER FIX: Body Parser FIRST, then CORS ---
// 1. Body parser middleware should be first to parse incoming requests
app.use(express.json());

// 2. CORS Configuration
// Tumhara Live Frontend URL
const allowedOrigin = 'https://e-commerce-0k1j.onrender.com'; 

// CORS Options, jo Frontend ko allow karega aur credentials (cookies) bhi accept karega
const corsOptions = {
    origin: allowedOrigin,
    // Agar tum cookies ya sessions use karte ho, toh yeh zaroori hai
    credentials: true, 
    optionsSuccessStatus: 200
};

// CORS middleware use karo specific options ke saath
app.use(cors(corsOptions)); 
// --- MIDDLEWARE ORDER FIX END ---

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