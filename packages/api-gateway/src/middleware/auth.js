// 身份验证中间件
exports.authenticate = (req, res, next) => {
  // 检查请求头中的Authorization字段
  const authHeader = req.headers['authorization'];
  
  // 如果没有Authorization头，返回401错误
  if (!authHeader) {
    return res.status(401).json({ error: '未提供身份验证信息' });
  }
  
  // 验证token（这里简化处理，实际应用中需要验证JWT token）
  const token = authHeader.split(' ')[1];
  if (!token || token !== 'valid-token') {
    return res.status(401).json({ error: '身份验证失败' });
  }
  
  // 将用户信息添加到请求对象中
  req.user = {
    id: 'U001',
    role: 'MEMBER',
    agentId: 'A001'
  };
  
  // 继续处理请求
  next();
};

// 角色授权中间件
exports.authorize = (roles = []) => {
  return (req, res, next) => {
    // 如果不需要特定角色，继续处理请求
    if (roles.length === 0) {
      return next();
    }
    
    // 检查用户角色是否在允许的角色列表中
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: '权限不足' });
    }
    
    // 继续处理请求
    next();
  };
};

// 数据隔离中间件
exports.dataIsolation = (req, res, next) => {
  // 将用户信息添加到请求上下文中，用于数据查询时的隔离
  req.context = {
    userId: req.user.id,
    role: req.user.role,
    agentId: req.user.agentId
  };
  
  // 继续处理请求
  next();
};