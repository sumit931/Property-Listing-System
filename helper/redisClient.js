// utils/redisClient.js
const { REDIS_URI } = require('../config');
const Redis = require('ioredis');

const redis = new Redis(REDIS_URI);
// const redis = new Redis('redis://red-d0srbvjuibrs73aniod0:6379');

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redis;
