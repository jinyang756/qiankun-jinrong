const security = require('../middleware/security');

// 启用2FA
exports.enableTwoFactor = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!userId) {
      return res.status(400).json({ error: '用户未登录' });
    }
    
    const key = security.enableTwoFactor(userId);
    
    res.json({ 
      message: '2FA已启用', 
      key,
      qrCodeUrl: `otpauth://totp/SimulatedTrading:${userId}?secret=${key}&issuer=SimulatedTrading`
    });
  } catch (error) {
    console.error('启用2FA失败:', error);
    res.status(500).json({ error: '启用2FA失败' });
  }
};

// 禁用2FA
exports.disableTwoFactor = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!userId) {
      return res.status(400).json({ error: '用户未登录' });
    }
    
    security.disableTwoFactor(userId);
    
    res.json({ message: '2FA已禁用' });
  } catch (error) {
    console.error('禁用2FA失败:', error);
    res.status(500).json({ error: '禁用2FA失败' });
  }
};

// 获取2FA状态
exports.getTwoFactorStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!userId) {
      return res.status(400).json({ error: '用户未登录' });
    }
    
    const status = security.getTwoFactorStatus(userId);
    
    res.json({ status });
  } catch (error) {
    console.error('获取2FA状态失败:', error);
    res.status(500).json({ error: '获取2FA状态失败' });
  }
};

// 添加IP到白名单
exports.addIPToWhitelist = async (req, res) => {
  try {
    const { ip } = req.body;
    
    if (!ip) {
      return res.status(400).json({ error: 'IP地址不能为空' });
    }
    
    security.addIPToWhitelist(ip);
    
    res.json({ message: `IP地址 ${ip} 已添加到白名单` });
  } catch (error) {
    console.error('添加IP到白名单失败:', error);
    res.status(500).json({ error: '添加IP到白名单失败' });
  }
};

// 从白名单移除IP
exports.removeIPFromWhitelist = async (req, res) => {
  try {
    const { ip } = req.body;
    
    if (!ip) {
      return res.status(400).json({ error: 'IP地址不能为空' });
    }
    
    security.removeIPFromWhitelist(ip);
    
    res.json({ message: `IP地址 ${ip} 已从白名单移除` });
  } catch (error) {
    console.error('从白名单移除IP失败:', error);
    res.status(500).json({ error: '从白名单移除IP失败' });
  }
};

// 获取白名单
exports.getIPWhitelist = async (req, res) => {
  try {
    const whitelist = security.getIPWhitelist();
    
    res.json({ whitelist });
  } catch (error) {
    console.error('获取IP白名单失败:', error);
    res.status(500).json({ error: '获取IP白名单失败' });
  }
};