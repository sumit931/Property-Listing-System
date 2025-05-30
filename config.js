require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry : process.env.JWT_EXPIRES_IN,
    CACHE_TTL : parseInt(process.env.CACHE_TTL, 10),
    PROPERTY_CACHE_TTL : parseInt(process.env.PROPERTY_CACHE_TTL, 10)
}; 