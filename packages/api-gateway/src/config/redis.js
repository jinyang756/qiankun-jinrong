const redis = require('redis');

// 创建Redis客户端
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

client.on('error', (err) => {
  console.error('Redis连接错误:', err);
});

client.on('connect', () => {
  console.log('Redis连接成功');
});

module.exports = client;