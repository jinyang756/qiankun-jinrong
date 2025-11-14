const { calculateFillPrice, engineConfig } = require('./index.js');
const Decimal = require('decimal.js');

// 模拟行情数据
const marketData = {
  '600000': { last: 12.50, bid: 12.49, ask: 12.51, high: 12.60, low: 12.40 },
  '000001': { last: 15.20, bid: 15.19, ask: 15.21, high: 15.30, low: 15.10 }
};

// 获取行情数据
exports.getMarketData = (symbol) => {
  return marketData[symbol] || null;
};

// 计算交易费用
exports.calculateFee = (amount, feeRate) => {
  const fee = new Decimal(amount).mul(feeRate);
  return fee.toDecimalPlaces(2).toNumber();
};

// 执行交易
exports.executeTrade = (order) => {
  // 获取行情数据
  const quote = this.getMarketData(order.symbol);
  if (!quote) {
    return { success: false, error: '无法获取行情数据' };
  }

  // 计算成交价格
  const filledOrder = calculateFillPrice(order, quote, null, engineConfig);

  // 计算交易费用
  const fee = this.calculateFee(
    new Decimal(filledOrder.fillPrice).mul(filledOrder.quantity).toNumber(),
    engineConfig.fees.commission
  );

  // 返回交易结果
  return {
    success: true,
    order: {
      ...filledOrder,
      fee: fee
    }
  };
};