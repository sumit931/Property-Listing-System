require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry : process.env.JWT_EXPIRES_IN 
}; 