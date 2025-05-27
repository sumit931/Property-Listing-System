const jwt = require('jsonwebtoken');
const config = require("../config");
// require('dotenv').config(); // Ensure .env is loaded

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from header

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Add decoded user info to req object
    next(); // Allow request to proceed
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;
