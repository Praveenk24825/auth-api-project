require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Root route for simple server check
app.get('/', (req, res) => {
  res.send('Auth API is running!');
});

// Get PORT from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Missing');
});
