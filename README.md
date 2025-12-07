# E-Commerce Project

A full-stack e-commerce application with a modern frontend and robust backend.

## Technologies Used

### Frontend
- **React** - UI library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express** - Web framework for building REST APIs
- **MongoDB** - NoSQL database for storing data
- **JWT** - Authentication token system

## Project Features

- User authentication (signup/login)
- Product browsing and filtering
- Shopping cart functionality
- Order management
- Admin dashboard for managing products and orders
- Role-based access control (User/Admin)

## Project Structure

```
ecommerce-devops-project/
├── client/          # Frontend React application
├── server/          # Backend Node.js/Express API
└── README.md        # This file
```

## Getting Started

### Prerequisites
- Node.js installed on your system
- MongoDB connection

### Installation

1. **Install Client Dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Setup Environment Variables**
   - Create a `.env` file in the server folder
   - Add necessary environment variables (database URL, JWT secret, etc.)

### Running the Project

1. **Start the Backend Server**
   ```bash
   cd server
   npm start
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and backend at `http://localhost:5000` (or your configured port).

## API Endpoints

- **Auth** - `/api/auth` (login, signup)
- **Products** - `/api/products` (get, create, update, delete)
- **Cart** - `/api/cart` (add to cart, remove items)
- **Orders** - `/api/orders` (create, view orders)

## License

This project is open source and available under the MIT License.
