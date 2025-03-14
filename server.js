const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require('./config/database');

// Import routes
const destinationRoutes = require('./routes/destinationRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API routes
app.use('/api/v1/destinations', destinationRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/reviews', reviewRoutes);

// Serve static files from the React app build directory
// Note: You need to run 'npm run build' first to create this directory
app.use(express.static(path.join(__dirname, 'build')));

// For any request that doesn't match an API route or static file, send the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});