const express = require('express');
const connectDB = require('./db');
const config = require('./config');
const cors = require('cors');

const app = express();

// CORS middleware configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://property-listing-system.vercel.app'], // Add your frontend URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Property Listing API' });
});

// Register routes
app.use('/auth', require('./api/auth/auth.controller'));
app.use('/listingProperty', require('./api/listingProperty/listingProperty.controller'));
app.use('/favProperty', require('./api/favProperty/favProperty.controller'));
app.use('/recommendProperty', require('./api/recommendProperty/recommendProperty.controller'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  res.status(500).json({ message: 'Something went wrong!' });
});

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    app.listen(config.PORT, () => {
      console.log(`Server running at http://localhost:${config.PORT}/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
