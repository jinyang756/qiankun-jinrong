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
  maxDailyLoss: 10000              // 单日最大亏损
};

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
  
  return {
    passed: errors.length === 0,
    errors
  };
};

// 检查持仓风险
exports.checkPositionRisk = (positionValue, userProfile, agentProfile) => {
  const errors = [];
  
  // 检查用户持仓市值
  if (positionValue > riskConfig.userLimits.maxPositionValue) {
    errors.push('用户持仓市值超过限制');
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

// 获取风险配置
exports.getRiskConfig = () => {
  return riskConfig;
};

// 更新风险配置
exports.updateRiskConfig = (newConfig) => {
  Object.assign(riskConfig, newConfig);
  return riskConfig;
};