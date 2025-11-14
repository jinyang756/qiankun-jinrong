// IP白名单配置
const ipWhitelist = new Set([
  '127.0.0.1',
  '::1',
  '192.168.1.100',
  '10.0.0.1'
]);

// 2FA配置
const twoFactorConfig = {
  enabled: true,
  issuer: 'SimulatedTrading',
  algorithm: 'sha1',
  digits: 6,
  period: 30
};

// 存储用户2FA密钥
const userTwoFactorKeys = new Map();

// 存储用户2FA状态
const userTwoFactorStatus = new Map();

// IP白名单检查中间件
const ipWhitelistMiddleware = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  
  // 如果白名单为空，则允许所有IP
  if (ipWhitelist.size === 0) {
    return next();
  }
  
  // 检查IP是否在白名单中
  if (ipWhitelist.has(clientIP)) {
    return next();
  }
  
  console.warn(`IP地址 ${clientIP} 不在白名单中`);
  return res.status(403).json({ error: '访问被拒绝：IP地址不在白名单中' });
};

// 2FA验证中间件
const twoFactorMiddleware = (req, res, next) => {
  // 如果2FA未启用，则跳过验证
  if (!twoFactorConfig.enabled) {
    return next();
  }
  
  const userId = req.user?.id;
  
  // 如果用户未登录，则跳过验证
  if (!userId) {
    return next();
  }
  
  // 检查用户是否需要2FA验证
  const requires2FA = userTwoFactorStatus.get(userId)?.enabled;
  
  if (!requires2FA) {
    return next();
  }
  
  // 检查请求头中是否包含2FA令牌
  const token = req.headers['x-2fa-token'];
  
  if (!token) {
    return res.status(401).json({ 
      error: '需要提供2FA令牌', 
      require2FA: true 
    });
  }
  
  // 验证2FA令牌
  if (verifyTwoFactorToken(userId, token)) {
    return next();
  }
  
  return res.status(401).json({ error: '2FA令牌无效' });
};

// 生成2FA密钥
const generateTwoFactorKey = (userId) => {
  // 在实际应用中，这里会生成一个真正的2FA密钥
  // 这里我们使用一个模拟的密钥
  const key = `SECRET_KEY_${userId}_${Date.now()}`;
  userTwoFactorKeys.set(userId, key);
  return key;
};

// 验证2FA令牌
const verifyTwoFactorToken = (userId, token) => {
  // 在实际应用中，这里会使用speakeasy等库来验证令牌
  // 这里我们使用一个简单的模拟验证
  const key = userTwoFactorKeys.get(userId);
  
  if (!key) {
    return false;
  }
  
  // 模拟验证逻辑
  // 在实际应用中，应该使用适当的TOTP算法
  const expectedToken = generateMockToken(key);
  return token === expectedToken;
};

// 生成模拟令牌（仅用于演示）
const generateMockToken = (key) => {
  // 这只是一个模拟实现，实际应用中应该使用标准的TOTP算法
  const timestamp = Math.floor(Date.now() / 1000 / twoFactorConfig.period);
  return (timestamp % 1000000).toString().padStart(6, '0');
};

// 启用用户2FA
const enableTwoFactor = (userId) => {
  const key = generateTwoFactorKey(userId);
  userTwoFactorStatus.set(userId, { enabled: true, key });
  return key;
};

// 禁用用户2FA
const disableTwoFactor = (userId) => {
  userTwoFactorKeys.delete(userId);
  userTwoFactorStatus.set(userId, { enabled: false });
};

// 获取用户2FA状态
const getTwoFactorStatus = (userId) => {
  return userTwoFactorStatus.get(userId) || { enabled: false };
};

// 添加IP到白名单
const addIPToWhitelist = (ip) => {
  ipWhitelist.add(ip);
};

// 从白名单移除IP
const removeIPFromWhitelist = (ip) => {
  ipWhitelist.delete(ip);
};

// 获取白名单
const getIPWhitelist = () => {
  return Array.from(ipWhitelist);
};

module.exports = {
  ipWhitelistMiddleware,
  twoFactorMiddleware,
  enableTwoFactor,
  disableTwoFactor,
  getTwoFactorStatus,
  addIPToWhitelist,
  removeIPFromWhitelist,
  getIPWhitelist,
  twoFactorConfig
};