require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost: ${PORT}`);
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Missing');
});
