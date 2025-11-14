const Decimal = require('decimal.js');

// 风险控制配置
const riskConfig = {
  // 用户级限额
  userLimits: {
    maxSingleOrderAmount: 100000,  // 单笔订单最大金额
    maxDailyOrderAmount: 500000,   // 每日订单最大金额
    maxPositionValue: 1000000      // 最大持仓市值
  },
  
  // 代理人级限额
  agentLimits: {
    maxMembers: 100,               // 最大会员数
    maxAgentPositionValue: 5000000 // 代理人总持仓市值上限
  },
  
  // 全局限额
  globalLimits: {
    maxSystemPositionValue: 100000000 // 系统总持仓市值上限
  },
  
  // 其他风控设置
  enableBlacklist: true,           // 启用黑名单
  enableSTCheck: true,             // 启用ST股票检查
  enableLimitUpCheck: true,        // 启用涨跌停检查
  maxDailyLoss: 10000,             // 单日最大亏损
  
  // 新增风控设置
  positionLimits: {
    maxSharesPerSymbol: 10000,     // 单只股票最大持仓数量
    maxPositions: 50               // 最大持仓股票数
  },
  
  // 熔断机制
  circuitBreaker: {
    enabled: true,                 // 启用熔断机制
    lossThreshold: 5000,           // 亏损阈值
    freezeDuration: 300            // 冻结时长(秒)
  }
};

// 用户风控状态
const userRiskStatus = new Map();

// 检查订单风险
exports.checkOrderRisk = (order, userProfile) => {
  const errors = [];
  
  // 检查单笔订单金额
  const orderAmount = new Decimal(order.price).mul(order.quantity);
  if (orderAmount.gt(riskConfig.userLimits.maxSingleOrderAmount)) {
    errors.push('单笔订单金额超过限制');
  }
  
  // 检查是否在黑名单中
  if (riskConfig.enableBlacklist && userProfile.blacklisted) {
    errors.push('用户在黑名单中');
  }
  
  // 检查ST股票
  if (riskConfig.enableSTCheck && order.symbol.endsWith('ST')) {
    errors.push('禁止交易ST股票');
  }
  
  // 检查用户是否被熔断冻结
  const userId = userProfile.id;
  const riskStatus = userRiskStatus.get(userId);
  if (riskStatus && riskStatus.frozenUntil) {
    const now = Date.now();
    if (now < riskStatus.frozenUntil) {
      errors.push('用户交易已被熔断冻结');
    } else {
      // 冻结时间已过，清除冻结状态
      userRiskStatus.delete(userId);
    }
  }
  
  return {
    passed: errors.length === 0,
    errors
  };
};

// 检查持仓风险
exports.checkPositionRisk = (positionValue, userProfile, agentProfile, positions = []) => {
  const errors = [];
  
  // 检查用户持仓市值
  if (positionValue > riskConfig.userLimits.maxPositionValue) {
    errors.push('用户持仓市值超过限制');
  }
  
  // 检查单只股票持仓数量
  positions.forEach(position => {
    if (position.quantity > riskConfig.positionLimits.maxSharesPerSymbol) {
      errors.push(`股票${position.symbol}持仓数量超过限制`);
    }
  });
  
  // 检查持仓股票数
  if (positions.length > riskConfig.positionLimits.maxPositions) {
    errors.push('持仓股票数超过限制');
  }
  
  // 检查代理人总持仓市值
  if (agentProfile && agentProfile.totalPositionValue > riskConfig.agentLimits.maxAgentPositionValue) {
    errors.push('代理人总持仓市值超过限制');
  }
  
  return {
    passed: errors.length === 0,
    errors
  };
};

// 检查全局风险
exports.checkGlobalRisk = (totalPositionValue) => {
  const errors = [];
  
  // 检查系统总持仓市值
  if (totalPositionValue > riskConfig.globalLimits.maxSystemPositionValue) {
    errors.push('系统总持仓市值超过限制');
  }
  
  return {
    passed: errors.length === 0,
    errors
  };
};

// 更新用户亏损状态
exports.updateUserLoss = (userId, loss) => {
  if (!riskConfig.circuitBreaker.enabled) {
    return { triggered: false };
  }
  
  // 获取用户当前风险状态
  let riskStatus = userRiskStatus.get(userId) || { 
    totalLoss: 0, 
    frozenUntil: null 
  };
  
  // 累计亏损
  riskStatus.totalLoss += loss;
  
  // 检查是否触发熔断
  let triggered = false;
  if (riskStatus.totalLoss >= riskConfig.circuitBreaker.lossThreshold) {
    // 触发熔断
    const freezeDuration = riskConfig.circuitBreaker.freezeDuration * 1000; // 转换为毫秒
    riskStatus.frozenUntil = Date.now() + freezeDuration;
    triggered = true;
    
    console.log(`用户${userId}触发熔断机制，冻结时长${riskConfig.circuitBreaker.freezeDuration}秒`);
  }
  
  // 更新用户风险状态
  userRiskStatus.set(userId, riskStatus);
  
  return { 
    triggered,
    totalLoss: riskStatus.totalLoss,
    frozenUntil: riskStatus.frozenUntil
  };
};

// 获取用户风险状态
exports.getUserRiskStatus = (userId) => {
  return userRiskStatus.get(userId) || { totalLoss: 0, frozenUntil: null };
};

// 获取风险配置
exports.getRiskConfig = () => {
  return riskConfig;
};

// 更新风险配置
exports.updateRiskConfig = (newConfig) => {
  Object.assign(riskConfig, newConfig);
  return riskConfig;
};