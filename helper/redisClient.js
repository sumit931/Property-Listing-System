// utils/redisClient.js
const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1', // or your Redis server
  port: 6379,
  maxRetriesPerRequest: null, // Optional, depending on behavior
  enableReadyCheck: false     // Optional, depending on use-case
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redis;
