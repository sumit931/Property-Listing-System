const express = require('express');
const connectDB = require('./db');
const config = require('./config');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Property Listing API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
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
