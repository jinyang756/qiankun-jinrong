// Engine Core 核心模块
const Decimal = require('decimal.js');

// 模拟撮合引擎配置
const engineConfig = {
  executionMode: 'manual-approval',
  fillPriceSource: 'MID',
  slippageBps: 10,
  tradingTime: 'follow-a-share',
  tPlusOne: true,
  fees: {
    commission: 0.0005,  // 0.05%
    stampDuty: 0.001,    // 0.1%
    transferFee: 0.00002 // 0.002%
  }
};

// 审批通过计算成交价
function calculateFillPrice(order, quote, overridePrice, cfg = engineConfig) {
  const base = new Decimal(overridePrice || quote.mid || quote.last);
  const slip = new Decimal(cfg.slippageBps || 10).div(10000);
  const signed = order.type === 'BUY' ? Decimal.add(1, slip) : Decimal.sub(1, slip);
  const fill = base.mul(signed).toDecimalPlaces(2);
  return {
    ...order,
    status: 'FILLED',
    fillPrice: fill.toNumber(),
    filledAt: Date.now()
  };
}

// 导出交易引擎模块
const tradeEngine = require('./tradeEngine.js');

// 导出风险控制模块
const riskControl = require('./riskControl.js');

module.exports = {
  engineConfig,
  calculateFillPrice,
  Decimal,
  tradeEngine,
  riskControl
};